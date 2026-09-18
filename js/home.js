/* =========================================================
           RENDER HOME
           ========================================================= */

        // DEV TOOL ОТКЛЮЧЕН
let testRankDay = null;

function getDisplayedRankDay() {
    return currentDay();
}

function populateRankTestSelect() {
    const select = document.getElementById('rankTestSelect');
    if (select) {
        select.parentElement.style.display = 'none';
    }
}

function setTestRank(value) {
    return;
}

function resetTestRank() {
    return;
}

        function buildSigil() {
            const dPrecise = currentDayPrecise();
            const d = Math.floor(dPrecise);
            const rankDisplayDay = getDisplayedRankDay();
            const cx = 125,
                cy = 125,
                r = 100;
            const nr = nextRankL(d);
            const prevThreshold = rankForDayL(d).day;
            const nextThreshold = nr ? nr.day : prevThreshold + 30;
            const progress = nr ? Math.min(1, (dPrecise - prevThreshold) / (nextThreshold - prevThreshold)) : 1;
            const circumference = 2 * Math.PI * r;
            const dash = circumference * progress;

            const svg = `
            <svg viewBox="0 0 250 250">
              <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
              <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" style="stroke:var(--line)" stroke-width="3"/>
              <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#8B5CF6" stroke-width="3"
                stroke-dasharray="${dash} ${circumference}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})" filter="url(#glow)"/>
            </svg>`;

            // Интенсивность глитч-эффекта растёт сама по себе с ростом
            // дня (d): чем дальше по пути, тем сильнее дрожание и короче
            // цикл анимации. Работает одинаково для любой картинки ранга,
            // ничего дополнительно настраивать не нужно.
            const t = Math.min(1, rankDisplayDay / 100);
            const gx = (3 + t * 4).toFixed(1);
            const gy = (2 + t * 2).toFixed(1);
            const gdur = (3 - t * 2.6).toFixed(2);
            // RGB-сдвиг сделан отдельными копиями картинки, а не CSS-масками.
            // Маски с url(...) нестабильны для обычных файлов PNG в некоторых
            // браузерах/PWA: после смены ранга они могут просто не отрисоваться.
            const imgSrc = rankImageForDay(rankDisplayDay);
            const glitch = `
            <div class="glitch-stack">
              <img src="${imgSrc}" alt="" class="glitch-rgb r" style="--x:${gx}px;--y:${gy}px;animation-duration:${gdur}s">
              <img src="${imgSrc}" alt="" class="glitch-rgb g" style="--x:${gx}px;--y:${gy}px;animation-duration:${gdur}s;animation-delay:.08s">
              <img src="${imgSrc}" alt="" class="glitch-rgb b" style="--x:${gx}px;--y:${gy}px;animation-duration:${gdur}s;animation-delay:.15s">
            </div>`;

            const sigilWrap = document.getElementById('sigilWrap');
            sigilWrap.innerHTML = svg + glitch + '<img id="sigilImg" src="' + imgSrc + '" alt="sigil" class="sigil-img" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:72%;height:auto;z-index:2;pointer-events:none;filter:drop-shadow(0 0 20px rgba(139,92,246,0.3));transition:filter 0.6s ease;">';

            const sigilImg = document.getElementById('sigilImg');
            if (sigilImg) sigilImg.onerror = () => { sigilImg.onerror = null; sigilImg.src = DEFAULT_SIGIL_IMG; };

            const ep = elapsedParts();
            document.getElementById('dayNum').textContent = d;
            const dayWord = (state.lang === 'en')
                ? (d === 1 ? 'day' : 'days')
                : (d === 1 ? 'день' : 'дней');
            document.getElementById('daySub').textContent = `${dayWord} · ${ep.clock}`;
        }

        function renderHome() {
            buildSigil();
            const actualDay = currentDay();
            const d = getDisplayedRankDay();
            const rank = rankForDayL(d);
            const nr = nextRankL(d);
            document.getElementById('rankName').textContent = rank.name;
            if (nr) {
                const daysLeft = nr.day - actualDay;
                document.getElementById('rankNext').textContent = state.lang === 'en'
                    ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} until «${nr.name}»`
                    : `до ранга «${nr.name}» — ${daysLeft} дн.`;
            } else {
                document.getElementById('rankNext').textContent = state.lang === 'en'
                    ? 'highest rank reached'
                    : 'высшая ступень пути';
            }
            document.getElementById('auraText').textContent = rank.aura;

            const idx = dailyTaskIndex();
            document.getElementById('taskText').textContent = getDailyTasks()[idx];
            const done = !!state.taskDone[todayKey()];
            document.getElementById('taskCheck').classList.toggle('done', done);
            document.getElementById('taskText').classList.toggle('done', done);

            document.getElementById('sexBtn').style.display = state.mode === 'nofap' ? 'flex' : 'none';
            renderMoodScale();
            renderWheelTaskCard();
        }

        function toggleTask() {
            const key = todayKey();
            state.taskDone[key] = !state.taskDone[key];
            if (state.taskDone[key]) vibrate(15);
            save();
            renderHome();
        }

        function updateDayProgress() {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const end = new Date(start.getTime() + 86400000);
            const pct = Math.min(1, Math.max(0, (now - start) / (end - start)));
            const circumference = 2 * Math.PI * 118;
            const offset = circumference * (1 - pct);
            const ring = document.getElementById('dayProgressRing');
            if (ring) ring.style.strokeDashoffset = offset;
        }
