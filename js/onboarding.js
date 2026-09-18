/* =========================================================
           LANGUAGE PICKER
           ========================================================= */
        function initLangPicker() {
            const overlay = document.getElementById('lang-picker-overlay');
            if (!overlay) return;
            // Если язык уже выбран — сразу скрываем
            if (state.lang) {
                overlay.style.display = 'none';
                return;
            }
            overlay.classList.remove('hide');
        }

        function pickLang(lang, skip) {
            state.lang = lang;
            if (skip) state.onboardingDone = true;
            save();
            const overlay = document.getElementById('lang-picker-overlay');
            if (overlay) {
                overlay.classList.add('hide');
                setTimeout(() => { overlay.style.display = 'none'; }, 420);
            }
            // Применяем язык и обновляем onboarding nav кнопки
            if (typeof applyLang === 'function') applyLang();
            if (skip) {
                // Пользователь нажал Skip — сразу открываем приложение
                if (typeof switchView === 'function') switchView('home');
                return;
            }
            // Запускаем онбординг если нужно
            if (!state.onboardingDone) {
                startOnboarding(false);
            }
        }

        function updateLangPillsUI() {
            const ru = document.getElementById('langPillRu');
            const en = document.getElementById('langPillEn');
            if (ru) ru.classList.toggle('active', state.lang === 'ru');
            if (en) en.classList.toggle('active', state.lang === 'en');
        }

/* =========================================================
           ONBOARDING
           ========================================================= */
        let obIndex = 0;
        let obAnswers = {};
        let obSelectedIndexByStep = {};

        function startOnboarding(replay) {
            obIndex = 0;
            obAnswers = {};
            obSelectedIndexByStep = {};
            buildOnboardingProgress();
            renderOnboardingStep();
            document.getElementById('onboarding-overlay').classList.add('show');
        }

        function buildOnboardingProgress() {
            const total = getOnboarding().length + 1;
            const wrap = document.getElementById('obProgress');
            wrap.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('div');
                dot.className = 'ob-dot';
                wrap.appendChild(dot);
            }
            updateProgressDots();
        }

        function updateProgressDots() {
            const dots = document.querySelectorAll('.ob-dot');
            dots.forEach((d, i) => {
                d.classList.remove('done', 'active');
                if (i < obIndex) d.classList.add('done');
                else if (i === obIndex) d.classList.add('active');
            });
        }

        function renderOnboardingStep() {
            updateProgressDots();
            const body = document.getElementById('obBody');
            const nextBtn = document.getElementById('obNextBtn');
            const backBtn = document.getElementById('obBackBtn');
            const skipBtn = document.getElementById('obSkipBtn');

            backBtn.style.visibility = obIndex > 0 ? 'visible' : 'hidden';
            backBtn.textContent = t('ob_back');
            skipBtn.textContent = t('ob_skip');

            if (obIndex < getOnboarding().length) {
                const step = getOnboarding()[obIndex];
                const chosenIdx = obSelectedIndexByStep[obIndex];
                let opts;
                if (step.type === 'mode') {
                    opts = step.options.map((opt, i) =>
                        `<button class="ob-option ob-option-mode ${chosenIdx===i?'selected':''}" data-i="${i}" onclick="selectOption(${i})">
                    <div class="ob-option-title">${opt.label}</div>
                    <div class="ob-option-desc">${opt.desc}</div>
                  </button>`
                    ).join('');
                } else {
                    opts = step.options.map((opt, i) => {
                        const label = typeof opt === 'string' ? opt : opt.label;
                        return `<button class="ob-option ${chosenIdx===i?'selected':''}" data-i="${i}" onclick="selectOption(${i})">${label}</button>`;
                    }).join('');
                }
                body.innerHTML = `<div class="ob-step active">
              <div class="ob-eyebrow">${t('ob_step')(obIndex+1, getOnboarding().length)}</div>
              <div class="ob-question">${step.q}</div>
              <div class="ob-options">${opts}</div>
            </div>`;
                nextBtn.textContent = t('ob_next');
                nextBtn.style.display = 'block';
                nextBtn.classList.toggle('enabled', chosenIdx !== undefined);
                skipBtn.style.display = 'block';
            } else {
                const finalText = typeof OB_FINAL_TEXT_EN !== 'undefined' && state.lang === 'en'
                    ? OB_FINAL_TEXT_EN : OB_FINAL_TEXT;
                body.innerHTML = `<div class="ob-step active ob-final">
              <div class="ob-eyebrow">${t('ob_guidance')}</div>
              <div class="ob-question">${t('ob_before_start')}</div>
              <div class="ob-final-text">${finalText.replace(/\\n/g,'<br><br>')}</div>
              <button class="ob-start-btn" onclick="finishOnboarding()">${t('ob_start_btn')}</button>
            </div>`;
                nextBtn.style.display = 'none';
                skipBtn.style.display = 'none';
            }
        }

        function selectOption(i) {
            const step = getOnboarding()[obIndex];
            document.querySelectorAll('.ob-option').forEach(el => el.classList.remove('selected'));
            document.querySelectorAll(`.ob-option[data-i="${i}"]`)[0].classList.add('selected');
            obSelectedIndexByStep[obIndex] = i;
            const opt = step.options[i];
            if (step.type === 'mode') {
                obAnswers['mode'] = opt.id;
            } else {
                obAnswers[step.key] = typeof opt === 'string' ? opt : opt.label;
                if (step.setsStreak && typeof opt !== 'string') {
                    obAnswers['_streakDays'] = opt.days;
                }
            }
            document.getElementById('obNextBtn').classList.add('enabled');
        }

        function obBack() {
            if (obIndex <= 0) return;
            obIndex--;
            renderOnboardingStep();
        }

        function obNext() {
            if (!document.getElementById('obNextBtn').classList.contains('enabled')) return;
            obIndex++;
            renderOnboardingStep();
        }

        function skipOnboarding() { finishOnboarding(true); }

        function finishOnboarding(skipped) {
            state.onboarding = obAnswers;
            state.onboardingDone = true;
            if (!skipped && (obAnswers['mode'] === 'full' || obAnswers['mode'] === 'nofap')) {
                state.mode = obAnswers['mode'];
            }
            if (!skipped && typeof obAnswers['_streakDays'] === 'number') {
                const days = obAnswers['_streakDays'];
                const newStart = new Date(Date.now() - days * DAY_MS);
                state.startDate = newStart.toISOString();
            }
            save();
            vibrate(20);
            document.getElementById('onboarding-overlay').classList.remove('show');
            switchView('home');
            if (!skipped) {
                showToast(t('toast_onboarding_done'));
            }
        }


        /* =========================================================
           NOTIFICATION ENGINE
           ---------------------------------------------------------
           В обычном HTML-файле браузер не может гарантированно будить
           страницу, когда она полностью закрыта. Поэтому движок
           проверяет расписание при открытом приложении и при возврате
           во вкладку. При наличии разрешения использует Web Notification.
           ========================================================= */
        function defaultNotificationSettings() {
            return { enabled:false, morning:true, evening:true, ranks:true, task:true, quotes:false, morningTime:'09:00', eveningTime:'21:00', sent:{} };
        }

        function getNotificationSettings() {
            if (!state.notifications) state.notifications = defaultNotificationSettings();
            const d = defaultNotificationSettings();
            state.notifications = Object.assign(d, state.notifications);
            if (!state.notifications.sent) state.notifications.sent = {};
            return state.notifications;
        }

        function updateNotificationSetting(key, value) {
            const n = getNotificationSettings();
            n[key] = value;
            save();
            updateNotificationUI();
            if (key === 'enabled' && value) requestNotificationPermission();
            notificationEngineTick();
        }

        function notificationPermissionState() {
            if (!('Notification' in window)) return 'unsupported';
            return Notification.permission;
        }

        async function requestNotificationPermission() {
            if (!('Notification' in window)) {
                showToast(t('toast_no_notifications'));
                updateNotificationUI();
                return;
            }
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    getNotificationSettings().enabled = true;
                    save();
                    showToast(t('toast_notifications_on'));
                } else if (permission === 'denied') {
                    showToast(t('toast_notifications_denied'));
                }
            } catch (e) { showToast(t('toast_notifications_error')); }
            updateNotificationUI();
        }

        function updateNotificationUI() {
            const n = getNotificationSettings();
            const ids = { enabled:'notifyMaster', morning:'notifyMorning', evening:'notifyEvening', ranks:'notifyRanks', task:'notifyTask', quotes:'notifyQuotes' };
            Object.keys(ids).forEach(k => { const el=document.getElementById(ids[k]); if(el) el.checked=!!n[k]; });
            const mt=document.getElementById('notifyMorningTime'); if(mt) mt.value=n.morningTime || '09:00';
            const et=document.getElementById('notifyEveningTime'); if(et) et.value=n.eveningTime || '21:00';
            const dot=document.getElementById('notifyStatusDot'), text=document.getElementById('notifyStatusText');
            if (!dot || !text) return;
            const p=notificationPermissionState();
            dot.className='notification-dot '+(p==='granted'?'ok':p==='denied'?'warn':'');
            text.textContent = p==='granted' ? t('notify_status_granted') : p==='denied' ? t('notify_status_denied') : p==='unsupported' ? t('notify_status_unsupported') : t('notify_status_pending');
        }

        function notificationNowKey() {
            const d=new Date();
            return d.toISOString().slice(0,10);
        }

        function notificationAt(time) {
            const [h,m]=String(time||'09:00').split(':').map(Number);
            const d=new Date();
            return d.getHours()===h && d.getMinutes()===m;
        }

        function notificationWasSent(key) { return !!getNotificationSettings().sent[key]; }
        function markNotificationSent(key) {
            const n=getNotificationSettings(); n.sent[key]=Date.now();
            const keys=Object.keys(n.sent); if(keys.length>120) keys.slice(0, keys.length-120).forEach(k=>delete n.sent[k]);
            save();
        }

        function showAppNotification(title, body, tag) {
            if (document.hidden) { /* native notification is the useful path here */ }
            if (notificationPermissionState()==='granted') {
                try { new Notification(title, { body, tag:tag||'put-path', icon:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpolygon points=%2250,6 90,28 90,72 50,94 10,72 10,28%22 fill=%22%230A0B0F%22 stroke=%22%238B5CF6%22 stroke-width=%224%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2214%22 fill=%22%23D4AF37%22/%3E%3C/svg%3E' }); } catch(e) {}
            }
            showToast(title + ' — ' + body);
            vibrate([25,40,25]);
        }

        function sendTestNotification() {
            if (notificationPermissionState()!=='granted') { requestNotificationPermission(); return; }
            showAppNotification(t('notif_test_title'), t('notif_test_body'), 'put-test');
        }

        function notificationEngineTick() {
            const n=getNotificationSettings();
            if (!n.enabled || notificationPermissionState()!=='granted') return;
            const d=currentDay();
            const dateKey=notificationNowKey();

            if (n.morning && notificationAt(n.morningTime)) {
                const key='morning:'+dateKey;
                if(!notificationWasSent(key)) {
                    markNotificationSent(key);
                    showAppNotification(t('notif_morning_title'), t('notif_morning_body')(d), 'put-morning');
                }
            }
            if (n.evening && notificationAt(n.eveningTime)) {
                const key='evening:'+dateKey;
                if(!notificationWasSent(key)) {
                    markNotificationSent(key);
                    showAppNotification(t('notif_evening_title'), t('notif_evening_body'), 'put-evening');
                }
            }

            const next=nextRank(d);
            if (n.ranks && next && next.day-d===1) {
                const key='rank-before:'+next.day+':'+dateKey;
                if(!notificationWasSent(key)) {
                    markNotificationSent(key);
                    showAppNotification(t('notif_rank_before_title'), t('notif_rank_before_body')(next.name), 'put-rank-before');
                }
            }
            if (n.ranks) {
                const rank=rankForDay(d);
                if(rank && rank.day===d) {
                    const key='rank-up:'+d;
                    if(!notificationWasSent(key)) {
                        markNotificationSent(key);
                        showAppNotification(t('notif_rank_up_title'), t('notif_rank_up_body')(rank.name), 'put-rank-up');
                    }
                }
            }

            if (n.task) {
                const taskKey = new Date().toISOString().slice(0,10);
                const done = state.taskDone && state.taskDone[taskKey];
                if (!done && d>=0 && new Date().getHours()>=12) {
                    const key='task:'+taskKey;
                    if(!notificationWasSent(key)) {
                        markNotificationSent(key);
                        showAppNotification(t('notif_task_title'), t('notif_task_body'), 'put-task');
                    }
                }
            }

            if (n.quotes && notificationAt(n.morningTime)) {
                const key='quote:'+dateKey;
                if(!notificationWasSent(key)) {
                    markNotificationSent(key);
                    const q=getQuotes()[Math.floor(Math.random()*getQuotes().length)];
                    showAppNotification(t('notif_quote_title'), q, 'put-quote');
                }
            }
        }
