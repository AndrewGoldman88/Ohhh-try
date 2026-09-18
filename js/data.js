/* =========================================================
           STATE & DATA
           ========================================================= */
        const RANKS = [
            { day: 0, name: "Спящий", aura: "Если ты здесь то путь уже начат.Это уже поступок." },
            { day: 1, name: "Пробуждённый", aura: "Первый шаг сделан. Голова чуть яснее обычного, не поддавайся искушениям." },
            { day: 3, name: "Искра", aura: "Внутри разгорается спокойствие. Мелкие раздражители задевают меньше, чем раньше." },
            { day: 7, name: "Стойкий", aura: "Неделя чистоты позади. Сон крепче, взгляд твёрже, решения — увереннее." },
            { day: 9, name: "Уверенный", aura: "Люди подсознательно тянутся к тебе. Голос звучит увереннее, спина сама держится ровно." },
            { day: 14, name: "Победитель", aura: "Импульсы больше не управляют тобой — ты управляешь ими. До этого дня доходят немногие." },
            { day: 20, name: "Страж Порога", aura: "Ты стоишь у порога, через который проходят единицы. Окружающие боятся нового тебя." },
            { day: 25, name: "Закалённый в Пламени", aura: "Ну вот ты и здесь. 25 дней чистой силы, ты уже не узнаёшь себя, нет пути назад." },
            { day: 30, name: "Повелитель Реальности", aura: "Удача идёт рядом, будто сама выбрала тебя в союзники. Люди неожиданно легко соглашаются с тем, что ты говоришь — реальность словно прогибается под твоё намерение." },
            { day: 35, name: "Носитель Печати", aura: "На тебе — незримая печать. Перед тобой открываются все двери, все с тобой согласны, ты лидер." },
            { day: 40, name: "Столп Огненный", aura: "Ты сам стал ориентиром для других, как столп в пустыне. В трудную минуту на тебя смотрят и находят направление." },
            { day: 45, name: "Голос из Пустыни", aura: "Твои слова звучат иначе — тише, но их слышат сильнее. Сказанное тобой запоминают надолго, будто оно было пророчеством." },
            { day: 50, name: "Держатель Ключей", aura: "Двери, которые раньше казались запертыми, открываются будто сами. Возможности находят тебя быстрее, чем ты успеваешь их искать." },
            { day: 55, name: "Царь-Жрец", aura: "В тебе сходятся власть и служение. Ты решаешь, не советуясь со страхом, и ведёшь, не спрашивая разрешения." },
            { day: 60, name: "Судья Врат", aura: "Ясность мышления такая, что решения принимаются мгновенно и без сожалений. Ты видишь суть раньше, чем другие успевают задать вопрос." },
            { day: 65, name: "Наследник Завета", aura: "Дисциплина перестала быть подвигом — она стала правом, заслуженным усилием. То, что требовало борьбы, теперь просто есть." },
            { day: 70, name: "Хранитель Скрижали", aura: "Твоё слово стало весомым, как высеченное в камне. Люди запоминают обещания, которые ты даёшь, потому что чувствуют — ты их сдержишь." },
            { day: 75, name: "Архонт", aura: "Харизма ощущается физически — комната словно меняется, когда входишь ты. Ты не просишь внимания, оно приходит само." },
            { day: 80, name: "Пробуждённый Демиург", aura: "Ты чувствуешь, что формируешь обстоятельства вокруг себя, а не подстраиваешься под них. Мир вокруг откликается на твою волю быстрее обычного." },
            { day: 85, name: "Носитель Логоса", aura: "Твоя речь обретает вес закона. То, что ты называешь правдой, другие начинают считать очевидным." },
            { day: 90, name: "Повелитель Разума", aura: "Полный контроль над импульсами. Дисциплина стала второй натурой — не подвигом, а просто тем, кто ты есть." },
            { day: 95, name: "Венценосец", aura: "Ты носишь невидимый венец. Люди подчиняются твоей воле раньше, чем успевают решить, стоит ли это делать." },
            { day: 100, name: "Легенда", aura: "Три цифры на счётчике. Ты прошёл путь, который бросают девяносто девять из ста — и стал живым доказательством, что это возможно." },
            { day: 105, name: "Первенец Пути", aura: "Ты открыл дорогу, по которой раньше не проходил. Всё, что случится дальше — уже территория, которую до тебя почти никто не видел." },
            { day: 110, name: "Эон Незыблемости", aura: "Время будто течёт иначе. Суета вокруг больше не задевает тебя — ты действуешь из центра, а не из края бури." },
            { day: 115, name: "Пастырь", aura: "Люди инстинктивно тянутся за твоим примером, даже не зная твоей истории. Ты ведёшь просто тем, что есть." },
            { day: 120, name: "Монах-Король", aura: "Путь без конца и без гонки. Ты больше не считаешь дни — ты просто живёшь ими, и в этом вся сила." },
            { day: 125, name: "Хранитель Внутреннего Огня", aura: "Огонь, который ты нёс всё это время, стал источником, а не испытанием. Ты греешь им других, не теряя себя." },
            { day: 130, name: "Архонт Второго Круга", aura: "Твоё присутствие меняет расклад ещё до того, как ты произнёс слово. Люди меняют планы, просто узнав, что придёшь ты." },
            { day: 135, name: "Провидец", aura: "Ты видишь на несколько шагов вперёд там, где другие видят только следующий час. Совпадения вокруг тебя перестают быть случайными." },
            { day: 140, name: "Носитель Трона", aura: "Власть над собой стала властью над обстоятельствами. То, что раньше просилось само, теперь предлагается тебе первым." },
            { day: 145, name: "Немыслимый", aura: "Люди перестают понимать, как ты это делаешь — и перестают спрашивать. Твой путь стал легендой раньше, чем закончился." },
            { day: 150, name: "Архонт Вечности", aura: "Ты достиг ступени, о которой другие только читают. Дальше нет уровней — есть только то, кем ты решишь быть каждый следующий день." }
        ];

        /* =========================================================
           RANK IMAGES (картинки для рангов в центре круга)
           -----------------------------------------------------------
           КАК ДОБАВИТЬ/ЗАМЕНИТЬ КАРТИНКУ ДЛЯ РАНГА:
           1. Назови PNG-файл по номеру minDay ранга, например rank_20.png
              (номера minDay смотри в списке ниже, они совпадают с day
              из массива RANKS выше).
           2. Закинь файл в папку assets/ranks/ рядом с остальными.
           3. Больше ничего менять не нужно — картинка сама подставится
              и в сам силуэт, и в глитч-эффект вокруг него (эффект уже
              растёт сам по себе от 0 к 100 дню — см. buildSigil()).

           Если для текущего дня подходящего диапазона нет —
           показывается DEFAULT_SIGIL_IMG (assets/ranks/default.png).
           ========================================================= */
        const DEFAULT_SIGIL_IMG = "assets/ranks/default.png";
        const RANK_IMAGES = [
            // Спящий — день 0
            { minDay: 0, maxDay: 0, src: "assets/ranks/rank_0.png"},
            // Пробуждённый — дни 1–2
            { minDay: 1, maxDay: 2, src: "assets/ranks/rank_1.png"},
            // Искра — дни 3-6
			{ minDay: 3, maxDay: 6, src: "assets/ranks/rank_3.png"},
			//Стойкий - дни 7-8
			{ minDay: 7, maxDay: 8, src: "assets/ranks/rank_7.png"},
			//Уверенный - дни 9-13
			{ minDay: 9, maxDay: 13, src: "assets/ranks/rank_9.png"},
			//Победитель - дни 14-19
			{ minDay: 14, maxDay: 19, src: "assets/ranks/rank_14.png"},
            //Страж порога - дни 20-24
			{ minDay: 20, maxDay: 24, src: "assets/ranks/rank_20.png"},
			//Закалённый в Пламени - дни 25-29
			{ minDay: 25, maxDay: 29, src: "assets/ranks/rank_25.png"},
			//Повелитель реальности - дни 30-34
			{ minDay: 30, maxDay: 34, src: "assets/ranks/rank_30.png"},
			//Носитель печати - дни 35-39
			{ minDay: 35, maxDay: 39, src: "assets/ranks/rank_35.png"},
			//Столп огненнный - дни 40-44
			{ minDay: 40, maxDay: 44, src: "assets/ranks/rank_40.png"},
			//Голос из пустыни - дни 45
			{ minDay: 45, maxDay: 49, src: "assets/ranks/rank_45.png"},
            // Держатель Ключей - дни 50-54
            { minDay: 50, maxDay: 54, src: "assets/ranks/rank_50.png"},
            // Царь-Жрец - дни 55-59
            { minDay: 55, maxDay: 59, src: "assets/ranks/rank_55.png"},
            // Судья Врат - дни 60-64
            { minDay: 60, maxDay: 64, src: "assets/ranks/rank_60.png"},
            // Наследник Завета - дни 65-69
            { minDay: 65, maxDay: 69, src: "assets/ranks/rank_65.png"},
            // Хранитель Скрижали - дни 70-74
            { minDay: 70, maxDay: 74, src: "assets/ranks/rank_70.png"},
            // Архонт - дни 75-79
            { minDay: 75, maxDay: 79, src: "assets/ranks/rank_75.png"},
            // Пробуждённый Демиург - дни 80-84
            { minDay: 80, maxDay: 84, src: "assets/ranks/rank_80.png"},
            // Носитель Логоса - дни 85-89
            { minDay: 85, maxDay: 89, src: "assets/ranks/rank_85.png"},
            // Повелитель Разума - дни 90-94
            { minDay: 90, maxDay: 94, src: "assets/ranks/rank_90.png"},
            // Венценосец - дни 95-99
            { minDay: 95, maxDay: 99, src: "assets/ranks/rank_95.png"},
            // Легенда - дни 100-104
            { minDay: 100, maxDay: 104, src: "assets/ranks/rank_100.png"},
            // Первенец Пути - дни 105-109
            { minDay: 105, maxDay: 109, src: "assets/ranks/rank_105.png"},
            // Эон Незыблемости - дни 110-114
            { minDay: 110, maxDay: 114, src: "assets/ranks/rank_110.png"},
            // Пастырь - дни 115-119
            { minDay: 115, maxDay: 119, src: "assets/ranks/rank_115.png"},
            // Монах-Король - дни 120-124
            { minDay: 120, maxDay: 124, src: "assets/ranks/rank_120.png"},
            // Хранитель Внутреннего Огня - дни 125-129
            { minDay: 125, maxDay: 129, src: "assets/ranks/rank_125.png"},
            // Архонт Второго Круга - дни 130-134
            { minDay: 130, maxDay: 134, src: "assets/ranks/rank_130.png"},
            // Провидец - дни 135-139
            { minDay: 135, maxDay: 139, src: "assets/ranks/rank_135.png"},
            // Носитель Трона - дни 140-144
            { minDay: 140, maxDay: 144, src: "assets/ranks/rank_140.png"},
            // Немыслимый - дни 145-149
            { minDay: 145, maxDay: 149, src: "assets/ranks/rank_145.png"},
            // Архонт Вечности - дни 150+
            { minDay: 150, maxDay: Infinity, src: "assets/ranks/rank_150.png"},
			// Пример добавления картинки для следующего ранга:
            // { minDay: 20, maxDay: 24, src: "assets/ranks/rank_20.png" },
        ];
function rankImageForDay(d) {
            for (const item of RANK_IMAGES) {
                if (d >= item.minDay && d <= item.maxDay) return item.src;
            }
            return DEFAULT_SIGIL_IMG;
        }

        const QUOTES = [
            "Дисциплина — это выбор между тем, что хочешь сейчас, и тем, что хочешь больше всего.",
            "Каждый день без импульса — кирпич в фундаменте того, кем ты становишься.",
            "Слабость приходит волной. Волна всегда откатывает — если ты не бежишь ей навстречу.",
            "Ты не сдерживаешься. Ты копишь энергию для того, что важнее.",
            "Никто не увидит этот день в календаре. Но ты его почувствуешь во всём остальном.",
            "Комфорт и рост не живут в одной комнате. Выбирай, где ты сегодня.",
            "Импульс длится минуты. Гордость за то, что устоял — годы.",
            "Ты уже не тот, кем был в первый день. Не разменивай это на пять минут.",
            "Тяга — это не приказ. Это просто громкое предложение, которое можно не принять.",
            "Сильные не те, у кого нет искушений. А те, кто раз за разом выбирает иначе.",
            "Твоё будущее «я» либо поблагодарит тебя сегодня, либо спросит — почему нет.",
            "Путь не требует идеальности. Он требует, чтобы ты не сдался именно сегодня.",
            "Энергия, которую ты не тратишь впустую, обязательно найдёт, куда пойти дальше.",
            "Ты тренируешь не только привычку — ты тренируешь способность держать слово перед собой.",
            "Однажды это перестанет быть борьбой и станет просто тем, кто ты есть."
        ];

        const DAILY_TASKS = [
            "Убери телефон подальше от кровати перед сном.",
            "Если увидишь провокационный контент — сразу закрывай вкладку, без промедления.",
            "Сделай 20 отжиманий в момент, когда почувствуешь тягу.",
            "Прими сегодня прохладный душ утром или вечером.",
            "Сегодня без лишней необходимости не прикасайся к телу.",
            "Проведи первые 30 минут после пробуждения без телефона.",
            "Сходи на прогулку без наушников — просто побудь с мыслями.",
            "Отпишись сегодня от одного аккаунта, который провоцирует тягу.",
            "Скажи вслух перед зеркалом, зачем ты идёшь этим путём — один раз, чётко.",
            "Ложись спать сегодня на 30 минут раньше обычного.",
            "Заполни вечер делом — книга, спорт, хобби, а не бесцельный скроллинг.",
            "Если пришла тяга — не борись взглядом, встань и займись чем-то физическим.",
            "Не проверяй соцсети в первый час после пробуждения.",
            "Выпиши от руки три причины, зачем ты идёшь этим путём.",
            "Заблокируй один сайт или приложение, которое чаще всего провоцирует.",
            "Сделай короткую тренировку сразу как встанешь.",
            "Если пришла тяга — засеки 10 минут и просто переживи их, ничего не делая.",
            "Напиши в дневник одно честное предложение о своём состоянии.",
            "Избегай сегодня одиночества в комнате дольше часа — выйди туда, где есть люди.",
            "Замени вечерний скроллинг на 15 минут чтения.",
            "Держи руки занятыми весь вечер — работа, хобби, спорт.",
            "Если увидел провоцирующую рекламу — сразу переводи взгляд, не задерживайся.",
            "Позвони или напиши другу — живое общение снижает тягу лучше, чем кажется.",
            "Постарайся выспаться сегодня минимум 7 часов — усталость частая причина срывов.",
            "Сходи в зал или на длинную прогулку.",
            "Пересмотри подписки — убери те, что провоцируют тягу.",
            "Если пришла мысль сорваться — вспомни, сколько дней уже пройдено, и не обнуляй одним решением.",
            "Практикуй 2 минуты медленного дыхания, если почувствуешь напряжение.",
            "Сегодня думай не про всю дистанцию, а только про «ещё один день».",
            "Найди сегодня 15 минут тишины без экрана — просто посиди с собой."
        ];

        const WHEEL_TASKS = [
            { type: 'easy', label: 'ЛЁГКОЕ', text: 'Отжимания от пола — 15 раз', desc: 'Стандартные отжимания. Спина прямая, опускайся до касания груди пола. Дыши ровно.' },
            { type: 'breath', label: 'ДЫХАНИЕ', text: 'Дыхание 4-7-8 — 3 цикла', desc: 'Вдох носом на 4 счёта. Задержи дыхание на 7. Выдох ртом на 8. Повтори 3 раза.' },
            { type: 'hard', label: 'СЛОЖНОЕ', text: 'Отжимания — 50 раз', desc: 'Выполни 50 отжиманий. Можно разбить на подходы: 20-15-15 с отдыхом 30 секунд.' },
            { type: 'hard', label: 'СЛОЖНОЕ', text: 'Планка — 2 минуты', desc: 'Удерживай планку на предплечьях или прямых руках. Спина и ноги — одна линия.' },
            { type: 'breath', label: 'ДЫХАНИЕ', text: 'Коробочное дыхание — 5 мин', desc: 'Вдох 4 секунды, пауза 4 секунды, выдох 4 секунды, пауза 4 секунды. 5 минут без остановки.' },
            { type: 'breath', label: 'ДЫХАНИЕ', text: 'Дыхание Вим Хофа — 3 раунда', desc: '30 глубоких вдохов. Выдохни всё и задержи на максимум. Затем вдохни и задержи 15 секунд. 3 раунда.' },
            { type: 'exercise', label: 'ТЕЛО', text: 'Приседания — 30 раз', desc: 'Стандартные приседания. Колени не выходят за носки, спина прямая, опускайся до параллели с полом.' },
            { type: 'exercise', label: 'ТЕЛО', text: 'Бёрпи — 20 раз', desc: 'Из стоя — упор лёжа с прыжком, отжимание, прыжок к рукам, взрывной прыжок вверх с хлопком.' }
        ];

        const RELAPSE_REASONS = [
            { id: 'boredom', label: 'Скука, нечем заняться' },
            { id: 'stress', label: 'Стресс и тревога' },
            { id: 'social', label: 'Соцсети / контент' },
            { id: 'loneliness', label: 'Одиночество вечером' },
            { id: 'alcohol', label: 'Алкоголь' },
            { id: 'fatigue', label: 'Усталость перед сном' },
            { id: 'conflict', label: 'Ссора или конфликт' },
            { id: 'temptation', label: 'Флирт / провоцирующая ситуация' },
            { id: 'impulse', label: 'Импульс без явной причины' },
            { id: 'custom', label: 'Свой вариант' }
        ];

        const SEX_FEELINGS = [
            "Энергия сохранилась, чувствую себя нормально",
            "Лёгкая усталость, но в целом хорошо",
            "Опустошение, упадок сил",
            "Чувствую вину или сожаление",
            "Сложно сказать / нейтрально"
        ];

        const COSMETIC_REWARDS = [
            // ── МАТРИЧНЫЙ ДОЖДЬ ────────────────────────────────────────
            { id: 'matrix_rain', type: 'matrix_rain', day: 15, color: '#00ff41', label: 'Матричный дождь', labelEn: 'Matrix Rain' },

            // ── ЧАСТИЦЫ ────────────────────────────────────────────────
            { id: 'particles_violet', type: 'particles', day: 3,  color: '#8B5CF6', direction: 'down',  label: 'Фиолетовые искры',  labelEn: 'Violet Sparks',    style: 'sparks' },
            { id: 'particles_gold',   type: 'particles', day: 9,  color: '#D4AF37', direction: 'up',    label: 'Золотые искры',      labelEn: 'Golden Sparks',    style: 'sparks' },
            { id: 'particles_orange', type: 'particles', day: 20, color: '#F97316', direction: 'up',    label: 'Пламя',              labelEn: 'Flame',            style: 'flame'  },
            { id: 'particles_red',    type: 'particles', day: 25, color: '#DC2626', direction: 'up',    label: 'Алые искры',         labelEn: 'Crimson Sparks',   style: 'sparks' },
            { id: 'particles_stars',  type: 'particles', day: 35, color: '#E2E8F0', direction: 'up',    label: 'Звёздная пыль',      labelEn: 'Stardust',         style: 'stars'  },
            { id: 'particles_logos',  type: 'mystic',    day: 85, color: '#C4B5FD', direction: 'up',    label: 'Логос',              labelEn: 'Logos',            style: 'logos'  },

            // ── СВЕЧЕНИЕ ФОНА ──────────────────────────────────────────
            { id: 'bg_teal',     type: 'bg', day: 7,   glow1: 'rgba(45,212,191,0.26)',  glow2: 'rgba(45,140,191,0.14)',  swatch: '#2DD4BF', label: 'Глубокий отблеск',   labelEn: 'Deep Glow'          },
            { id: 'bg_violet',   type: 'bg', day: 14,  glow1: 'rgba(139,92,246,0.32)',  glow2: 'rgba(91,63,160,0.16)',   swatch: '#8B5CF6', label: 'Глубокий фиолет',    labelEn: 'Deep Violet'        },
            { id: 'bg_ice',      type: 'bg', day: 22,  glow1: 'rgba(56,189,248,0.28)',  glow2: 'rgba(14,116,144,0.14)', swatch: '#38BDF8',  label: 'Ледяное сияние',     labelEn: 'Ice Glow'           },
            { id: 'bg_royal',    type: 'bg', day: 30,  glow1: 'rgba(212,175,55,0.28)',  glow2: 'rgba(139,92,246,0.16)', swatch: '#D4AF37',  label: 'Королевское сияние', labelEn: 'Royal Glow'         },
            { id: 'bg_amethyst', type: 'bg', day: 40,  glow1: 'rgba(167,139,250,0.30)', glow2: 'rgba(109,40,217,0.18)', swatch: '#A78BFA', label: 'Аметист',            labelEn: 'Amethyst'           },
            { id: 'bg_crimson',  type: 'bg', day: 45,  glow1: 'rgba(224,60,60,0.26)',   glow2: 'rgba(122,38,32,0.14)', swatch: '#C0392B',  label: 'Багровый отблеск',   labelEn: 'Crimson Glow'       },
            { id: 'bg_night',    type: 'bg', day: 50,  glow1: 'rgba(30,58,138,0.34)',   glow2: 'rgba(7,89,133,0.18)',  swatch: '#1E3A8A',  label: 'Ночное небо',        labelEn: 'Night Sky'          },
            { id: 'bg_emerald',  type: 'bg', day: 60,  glow1: 'rgba(16,185,129,0.26)',  glow2: 'rgba(6,95,70,0.14)',   swatch: '#10B981', label: 'Изумрудное сияние',  labelEn: 'Emerald Glow'       },
            { id: 'bg_dawn',     type: 'bg', day: 70,  glow1: 'rgba(251,113,133,0.24)', glow2: 'rgba(234,179,8,0.18)', swatch: '#FB7185', label: 'Рассвет',            labelEn: 'Dawn'               },
            { id: 'bg_rose',     type: 'bg', day: 75,  glow1: 'rgba(236,72,153,0.24)',  glow2: 'rgba(157,23,77,0.12)', swatch: '#EC4899', label: 'Розовый отблеск',    labelEn: 'Rose Glow'          },
            { id: 'bg_copper',   type: 'bg', day: 90,  glow1: 'rgba(199,120,74,0.26)',  glow2: 'rgba(120,66,38,0.14)', swatch: '#C7784A', label: 'Медное сияние',      labelEn: 'Copper Glow'        },
            { id: 'bg_alchemist',type: 'bg', day: 100, glow1: 'rgba(212,175,55,0.35)',  glow2: 'rgba(199,120,74,0.22)',swatch: '#D4AF37', label: 'Алхимик',            labelEn: 'Alchemist'          },
            { id: 'bg_abyss',    type: 'bg', day: 120, glow1: 'rgba(15,23,42,0.95)',    glow2: 'rgba(30,58,138,0.22)', swatch: '#0F172A', label: 'Бездна',             labelEn: 'Abyss'              }
        ];

        const ONBOARDING = [{
            type: "mode",
            q: "Выбери свой режим пути",
            key: "mode",
            options: [
                { id: "full", label: "Полное воздержание", desc: "Semen retention. Любая разрядка — соло, с партнёром, любая — считается срывом." },
                { id: "nofap", label: "NoFap", desc: "Секс с партнёром не считается срывом. Срывом остаются соло-разрядка и порно." }
            ]
        }, {
            q: "Сколько дней ты уже воздерживаешься?",
            key: "streak_start",
            setsStreak: true,
            options: [
                { label: "Только начинаю сегодня", days: 0 },
                { label: "3–7 дней", days: 5 },
                { label: "8–14 дней", days: 11 },
                { label: "15–29 дней", days: 20 },
                { label: "30–59 дней", days: 35 },
                { label: "60+ дней", days: 65 }
            ]
        }, {
            q: "Что чаще всего приводит тебя к срыву?",
            key: "trigger",
            options: ["Скука, нечем заняться", "Стресс и тревога", "Соцсети и контент", "Одиночество вечером",
                "Усталость перед сном"
            ]
        }, {
            q: "В какое время суток тебе тяжелее всего?",
            key: "time",
            options: ["Утро", "День", "Вечер", "Ночь перед сном"]
        }, {
            q: "Как ты себя чувствуешь сразу после срыва?",
            key: "after_feel",
            options: ["Стыд и вина", "Пустота и апатия", "Злость на себя", "Быстро забываю и живу дальше"]
        }, {
            q: "Как долго держится это состояние после срыва?",
            key: "after_duration",
            options: ["Пару часов", "Весь день", "Несколько дней", "Почти не проходит"]
        }, {
            q: "Что помогает тебе не сорваться в трудный момент?",
            key: "helps",
            options: ["Физическая активность", "Холодный душ", "Работа или учёба", "Разговор с кем-то", "Пока не знаю"]
        }, {
            q: "Что для тебя главная причина этого пути?",
            key: "why_main",
            options: ["Больше энергии и концентрации", "Уверенность в себе", "Духовная причина", "Отношения с партнёром",
                "Вызов самому себе"
            ]
        }, {
            q: "Ты уже пробовал раньше?",
            key: "tried_before",
            options: ["Да, много раз срывался", "Раз или два", "Это моя первая попытка", "Держусь стабильно, ищу инструмент"]
        }, {
            q: "Сколько дней хочешь продержаться как первую цель?",
            key: "goal",
            options: ["7 дней", "30 дней", "90 дней", "Без ограничений — сколько получится"]
        }, {
            q: "Что для тебя важнее всего в этом приложении?",
            key: "priority",
            options: ["Дисциплина и структура", "Мотивация и поддержка", "Статистика и прогресс",
                "Понимание своих триггеров"
            ]
        }];
        const OB_FINAL_TEXT = "Путь, который ты выбрал — не про запрет. Он про то, кем ты становишься день за днём.\n\nТело — не враг. Это инструмент, который либо служит тебе, либо управляет тобой. Каждый день — это голос, который ты подаёшь за одну из этих версий себя.\n\nСчитай не дни воздержания. Считай дни, в которые ты сдержал слово перед собой.\n\nДальше — твой путь.";

        const DAY_MS = 86400000;

        /* =========================================================
           ENGLISH CONTENT
           ========================================================= */
        const RANKS_EN = [
            { day: 0,   name: "Dormant",                   aura: "If you're here, the path has already begun. That alone is an act of will." },
            { day: 1,   name: "Awakened",                  aura: "First step taken. Head a little clearer than usual — don't give in to temptation." },
            { day: 3,   name: "Ember",                     aura: "A quiet calm is kindling inside. Small irritations bother you less than before." },
            { day: 7,   name: "Steadfast",                 aura: "One week of clarity behind you. Sleep deeper, gaze sharper, decisions more certain." },
            { day: 9,   name: "Confident",                 aura: "People are drawn to you without knowing why. Your voice carries more weight, your posture holds itself." },
            { day: 14,  name: "Victor",                    aura: "Impulses no longer command you — you command them. Few make it this far." },
            { day: 20,  name: "Guardian of the Threshold", aura: "You stand at a gate few ever reach. Those around you sense the new version of you — and it unsettles them." },
            { day: 25,  name: "Forged in Flame",           aura: "Here you are. 25 days of pure strength. You no longer recognise yourself — there is no way back." },
            { day: 30,  name: "Lord of Reality",           aura: "Luck walks beside you, as if it chose you as an ally. People agree with you unexpectedly easily — reality bends to your intention." },
            { day: 35,  name: "Bearer of the Seal",        aura: "An invisible seal rests on you. Every door opens, every voice agrees — you are the one who leads." },
            { day: 40,  name: "Pillar of Fire",            aura: "You have become a landmark for others, like a pillar in the desert. In hard moments people look to you and find direction." },
            { day: 45,  name: "Voice from the Wilderness", aura: "Your words sound different — quieter, yet heard more clearly. What you say is remembered long, as if it were prophecy." },
            { day: 50,  name: "Keeper of Keys",            aura: "Doors that once seemed locked open on their own. Opportunities find you faster than you can seek them." },
            { day: 55,  name: "Priest-King",               aura: "In you power and service converge. You decide without consulting fear, and lead without asking permission." },
            { day: 60,  name: "Judge of Gates",            aura: "Such clarity of mind that decisions come instantly and without regret. You see the core before others even form the question." },
            { day: 65,  name: "Heir of the Covenant",      aura: "Discipline is no longer a feat — it has become a right, earned by effort. What once required struggle now simply is." },
            { day: 70,  name: "Keeper of the Tablets",     aura: "Your word carries the weight of stone. People remember the promises you make because they feel — you will keep them." },
            { day: 75,  name: "Archon",                    aura: "Charisma is felt physically — the room shifts when you enter. You don't ask for attention; it comes on its own." },
            { day: 80,  name: "Awakened Demiurge",         aura: "You feel yourself shaping circumstances rather than adapting to them. The world around you responds to your will faster than usual." },
            { day: 85,  name: "Bearer of the Logos",       aura: "Your speech takes on the weight of law. What you call truth, others begin to treat as obvious." },
            { day: 90,  name: "Master of the Mind",        aura: "Full command over impulse. Discipline has become second nature — not an achievement, simply who you are." },
            { day: 95,  name: "The Crowned",               aura: "You wear an invisible crown. People yield to your will before they have decided whether to." },
            { day: 100, name: "Legend",                    aura: "Three digits on the counter. You have walked a path that ninety-nine in a hundred abandon — and become living proof it is possible." },
            { day: 105, name: "Firstborn of the Path",     aura: "You have opened a road no one had walked before. Everything ahead is territory almost no one has ever seen." },
            { day: 110, name: "Aeon of the Immovable",     aura: "Time seems to flow differently. The noise around you no longer touches you — you act from the centre, not the edge of the storm." },
            { day: 115, name: "The Shepherd",              aura: "People instinctively follow your example, not even knowing your story. You lead simply by being." },
            { day: 120, name: "Monk-King",                 aura: "A path without end and without race. You no longer count the days — you simply live them, and that is the whole power." },
            { day: 125, name: "Keeper of the Inner Fire",  aura: "The flame you have carried all this time has become a source, not a trial. You warm others with it without losing yourself." },
            { day: 130, name: "Archon of the Second Circle", aura: "Your presence shifts the dynamic before you have said a word. People change plans just learning you are coming." },
            { day: 135, name: "Seer",                      aura: "You see several steps ahead where others see only the next hour. Coincidences around you stop being accidental." },
            { day: 140, name: "Bearer of the Throne",      aura: "Mastery over self has become mastery over circumstance. What once had to be sought now offers itself to you first." },
            { day: 145, name: "The Unthinkable",           aura: "People stop trying to understand how you do it — and stop asking. Your path became a legend before it ended." },
            { day: 150, name: "Archon of Eternity",        aura: "You have reached a rank others only read about. Beyond here there are no levels — only who you choose to be each next day." }
        ];

        const QUOTES_EN = [
            "Discipline is choosing between what you want now and what you want most.",
            "Every day without the impulse is a brick in the foundation of who you are becoming.",
            "Weakness arrives in waves. The wave always recedes — if you don't run toward it.",
            "You are not holding back. You are storing energy for what matters more.",
            "No one will see this day on a calendar. But you will feel it in everything else.",
            "Comfort and growth don't share a room. Choose where you live today.",
            "The urge lasts minutes. The pride of having held — years.",
            "You are already not who you were on day one. Don't trade that for five minutes.",
            "A craving is not a command. It's just a loud suggestion you can decline.",
            "The strong are not those without temptation. They are those who keep choosing differently.",
            "Your future self will either thank you today, or ask — why didn't you?",
            "The path doesn't demand perfection. It demands that you don't quit today.",
            "Energy you don't waste will always find somewhere to go.",
            "You are training not only a habit — you are training the ability to keep your word to yourself.",
            "One day this will stop being a fight and simply become who you are."
        ];

        const DAILY_TASKS_EN = [
            "Put your phone away from the bed before sleep.",
            "If you see provocative content — close the tab immediately, no hesitation.",
            "Do 20 push-ups the moment you feel an urge.",
            "Take a cool shower this morning or evening.",
            "Today, avoid touching your body out of habit.",
            "Spend the first 30 minutes after waking without your phone.",
            "Go for a walk without headphones — just be with your thoughts.",
            "Unfollow one account today that triggers the urge.",
            "Say out loud in front of a mirror why you walk this path — once, clearly.",
            "Go to sleep 30 minutes earlier than usual tonight.",
            "Fill your evening with purpose — a book, exercise, a hobby, not mindless scrolling.",
            "If an urge comes — don't fight it with your eyes, stand up and do something physical.",
            "Don't check social media in the first hour after waking.",
            "Write down by hand three reasons why you walk this path.",
            "Block one website or app that most often triggers you.",
            "Do a short workout right after you get up.",
            "If an urge comes — set a 10-minute timer and just outlast it, doing nothing.",
            "Write one honest sentence in your journal about how you feel.",
            "Avoid being alone in a room for more than an hour — go somewhere with people.",
            "Replace evening scrolling with 15 minutes of reading.",
            "Keep your hands busy all evening — work, a hobby, exercise.",
            "If you see a provocative ad — look away immediately, don't linger.",
            "Call or text a friend — real connection reduces urges better than you'd think.",
            "Try to get at least 7 hours of sleep — fatigue is a common relapse trigger.",
            "Go to the gym or take a long walk.",
            "Review your subscriptions — remove those that trigger the urge.",
            "If the thought of relapsing comes — remember how many days you've walked, and don't erase them with one decision.",
            "Practice 2 minutes of slow breathing if you feel tension rising.",
            "Today, don't think about the full distance — just think 'one more day'.",
            "Find 15 minutes of silence without a screen today — just sit with yourself."
        ];

        const WHEEL_TASKS_EN = [
            { type: 'easy',    label: 'EASY',      text: 'Push-ups — 15 reps',           desc: 'Standard push-ups. Back straight, lower until your chest touches the floor. Breathe steadily.' },
            { type: 'breath',  label: 'BREATHING', text: '4-7-8 breathing — 3 cycles',   desc: 'Inhale through nose for 4 counts. Hold for 7. Exhale through mouth for 8. Repeat 3 times.' },
            { type: 'hard',    label: 'HARD',      text: 'Push-ups — 50 reps',           desc: 'Complete 50 push-ups. You can split into sets: 20-15-15 with 30 seconds rest.' },
            { type: 'hard',    label: 'HARD',      text: 'Plank — 2 minutes',            desc: 'Hold a plank on forearms or straight arms. Back and legs form one straight line.' },
            { type: 'breath',  label: 'BREATHING', text: 'Box breathing — 5 min',        desc: 'Inhale 4 sec, hold 4 sec, exhale 4 sec, hold 4 sec. 5 minutes without stopping.' },
            { type: 'breath',  label: 'BREATHING', text: 'Wim Hof breathing — 3 rounds', desc: '30 deep breaths. Exhale fully and hold as long as you can. Then inhale and hold 15 seconds. 3 rounds.' },
            { type: 'exercise',label: 'BODY',      text: 'Squats — 30 reps',             desc: "Standard squats. Knees don't go past toes, back straight, lower to parallel with the floor." },
            { type: 'exercise',label: 'BODY',      text: 'Burpees — 20 reps',            desc: 'From standing — jump to plank, push-up, jump feet to hands, explosive jump up with a clap.' }
        ];

        const RELAPSE_REASONS_EN = [
            { id: 'boredom',    label: 'Boredom, nothing to do' },
            { id: 'stress',     label: 'Stress and anxiety' },
            { id: 'social',     label: 'Social media / content' },
            { id: 'loneliness', label: 'Loneliness in the evening' },
            { id: 'alcohol',    label: 'Alcohol' },
            { id: 'fatigue',    label: 'Fatigue before sleep' },
            { id: 'conflict',   label: 'Argument or conflict' },
            { id: 'temptation', label: 'Flirting / provocative situation' },
            { id: 'impulse',    label: 'Impulse with no clear reason' },
            { id: 'custom',     label: 'My own reason' }
        ];

        const SEX_FEELINGS_EN = [
            "Energy held, feeling fine",
            "Slight tiredness, but overall good",
            "Drained, low energy",
            "Feeling guilty or regretful",
            "Hard to say / neutral"
        ];

        const ONBOARDING_EN = [{
            type: "mode", q: "Choose your path mode", key: "mode",
            options: [
                { id: "full",  label: "Full abstinence", desc: "Semen retention. Any release — solo, with a partner, any — counts as a relapse." },
                { id: "nofap", label: "NoFap",           desc: "Sex with a partner doesn't count as a relapse. Solo release and porn still do." }
            ]
        }, {
            q: "How many days have you been abstaining?", key: "streak_start", setsStreak: true,
            options: [
                { label: "Starting today", days: 0 }, { label: "3–7 days", days: 5 },
                { label: "8–14 days", days: 11 },     { label: "15–29 days", days: 20 },
                { label: "30–59 days", days: 35 },    { label: "60+ days", days: 65 }
            ]
        }, {
            q: "What most often leads you to relapse?", key: "trigger",
            options: ["Boredom, nothing to do", "Stress and anxiety", "Social media and content", "Loneliness in the evening", "Tiredness before sleep"]
        }, {
            q: "What time of day is hardest for you?", key: "time",
            options: ["Morning", "Afternoon", "Evening", "Night before sleep"]
        }, {
            q: "How do you feel right after a relapse?", key: "after_feel",
            options: ["Shame and guilt", "Emptiness and apathy", "Anger at myself", "I move on quickly"]
        }, {
            q: "How long does that feeling last after a relapse?", key: "after_duration",
            options: ["A few hours", "The whole day", "Several days", "It barely goes away"]
        }, {
            q: "What helps you not relapse in a hard moment?", key: "helps",
            options: ["Physical activity", "Cold shower", "Work or studying", "Talking to someone", "Not sure yet"]
        }, {
            q: "What is your main reason for this path?", key: "why_main",
            options: ["More energy and focus", "Self-confidence", "Spiritual reason", "Relationship with a partner", "A challenge to myself"]
        }, {
            q: "Have you tried this before?", key: "tried_before",
            options: ["Yes, relapsed many times", "Once or twice", "This is my first attempt", "I've been steady — just looking for a tool"]
        }, {
            q: "How many days do you want to reach as your first goal?", key: "goal",
            options: ["7 days", "30 days", "90 days", "No limit — as long as I can"]
        }, {
            q: "What matters most to you in this app?", key: "priority",
            options: ["Discipline and structure", "Motivation and support", "Stats and progress", "Understanding my triggers"]
        }];

        const OB_FINAL_TEXT_EN = "The path you have chosen is not about restriction. It's about who you become, day by day.\n\nYour body is not the enemy. It's a tool — one that either serves you, or runs you. Every day is a vote you cast for one of those two versions of yourself.\n\nDon't count days of abstinence. Count days on which you kept your word to yourself.\n\nFrom here — your path.";

        /* ── Геттеры по языку ── */
        function isEn()           { return typeof state !== 'undefined' && state.lang === 'en'; }
        function getRanks()       { return isEn() ? RANKS_EN           : RANKS; }
        function getQuotes()      { return isEn() ? QUOTES_EN          : QUOTES; }
        function getDailyTasks()  { return isEn() ? DAILY_TASKS_EN     : DAILY_TASKS; }
        function getWheelTasks()  { return isEn() ? WHEEL_TASKS_EN     : WHEEL_TASKS; }
        function getRelReasons()  { return isEn() ? RELAPSE_REASONS_EN : RELAPSE_REASONS; }
        function getSexFeelings() { return isEn() ? SEX_FEELINGS_EN    : SEX_FEELINGS; }
        function getOnboarding()  { return isEn() ? ONBOARDING_EN      : ONBOARDING; }
        function rewardLabel(r)   { return isEn() && r.labelEn ? r.labelEn : r.label; }
        function rankForDayL(d)   { const ranks = getRanks(); let res = ranks[0]; for (const item of ranks) { if (d >= item.day) res = item; else break; } return res; }
        function nextRankL(d)     { for (const item of getRanks()) { if (item.day > d) return item; } return null; }
