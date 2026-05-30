/* =========================================================
   ElectroWave Radio — приложение (Vanilla JS, без зависимостей)
   ========================================================= */
(() => {
  'use strict';

  const RR = 'https://radiorecord.hostingradio.ru/';

  // Свои станции: положите stations.json рядом с сайтом (или передайте ?manifest=URL).
  // Формат — см. stations.example.json. Манифест может ссылаться на файлы/потоки на вашем сервере.
  const MANIFEST_URL = 'stations.json';

  /* ---------- Каталог станций ----------
     rr:true  — Radio Record (поддерживает API текущего трека)
     secure:false — поток по HTTP (на HTTPS-странице будет недоступен) */
  const STATIONS = [
    // House / Techno
    st('rr_edm',       'Radio Record «EDM»',          'EDM / Dance',     ['EDM','House'],   RR+'club96.aacp',      'Главный танцпол Radio Record: свежие EDM-хиты, биг-рум и хаус-боевики без пауз.'),
    st('rr_techno',    'Radio Record «Techno»',       'Techno',          ['Techno'],        RR+'techno96.aacp',    'Гипнотический бит и индустриальные текстуры — техно для тёмных танцполов и долгих сетов.'),
    st('rr_techouse',  'Radio Record «Tech House»',   'Tech House',      ['House','Techno'],RR+'techouse96.aacp',  'Упругие басовые лупы и грувовый бит на стыке хауса и техно.'),
    st('rr_househits', 'Radio Record «House Hits»',   'House',           ['House','EDM'],   RR+'househits96.aacp', 'Только проверенные хаус-хиты: то, что звучит на главных сценах прямо сейчас.'),
    st('rr_houseclss', 'Radio Record «House Classics»','Classic House',  ['House'],         RR+'houseclss96.aacp', 'Золотая классика хауса 90-х и 2000-х — от чикагских корней до вокальных гимнов.'),
    st('rr_jackin',    'Radio Record «Bass House»',   'Bass / Jackin House',['House'],      RR+'jackin96.aacp',    'Джекин-грув и жирные басы — энергичный хаус с характером.'),
    st('rr_afro',      'Radio Record «Afro House»',   'Afro House',      ['House'],         RR+'afro64.aacp',      'Тёплые перкуссии, этнические мотивы и глубокий грув афро-хауса.'),
    st('rr_fut',       'Radio Record «Future House»', 'Future House',    ['House'],         RR+'fut96.aacp',       'Металлические басы и футуристичный саунд-дизайн нового поколения хауса.'),
    st('rr_vip',       'Radio Record «VIP House»',    'Vocal / VIP House',['House'],        RR+'vip96.aacp',       'Премиальная подборка вокального и глубокого хауса для вечеров с настроением.'),

    // Trance / Progressive
    st('rr_tm',        'Radio Record «Trancemission»','Trance',          ['Trance'],        RR+'tm96.aacp',        'Флагманский транс-канал Radio Record: мощные брейкдауны и взлётные мелодии.'),
    st('rr_trancehits','Radio Record «Trance Classics»','Classic Trance',['Trance'],        RR+'trancehits96.aacp','Бессмертные транс-гимны конца 90-х и 2000-х, под которые рос целый жанр.'),
    st('rr_uplift',    'Radio Record «Uplifting»',    'Uplifting Trance',['Trance'],        RR+'uplift96.aacp',    'Эмоциональный аплифтинг с парящими лидами и эпическими кульминациями.'),
    st('rr_asot',      'Radio Record «A State of Trance»','Trance (ASOT)',['Trance'],       RR+'asot64.aacp',      'A State of Trance — легендарное радиошоу и подборка от Армина ван Бюрена.'),
    st('rr_armin',     'Radio Record «Armin van Buuren»','Trance',       ['Trance'],        RR+'armin96.aacp',     'Персональный канал короля транса: лучшие сеты и треки Армина ван Бюрена.'),
    st('rr_tiesto',    'Radio Record «Tiesto»',       'Trance / EDM',    ['Trance','EDM'],  RR+'tiesto96.aacp',    'От классического транса до большого EDM — эволюция звучания Tiësto.'),
    st('rr_garrix',    'Radio Record «Martin Garrix»','EDM / Big Room',  ['EDM','Trance'],  RR+'martingarrix64.aacp','Фестивальные биг-рум боевики и мелодичный EDM от Мартина Гаррикса.'),
    st('rr_progr',     'Radio Record «Progressive»',  'Progressive',     ['Trance','House'],RR+'progr96.aacp',     'Долгие нарастания и гипнотический грув прогрессив-хауса и транса.'),
    st('rr_trancehouse','Radio Record «Trancehouse»', 'Trance House',    ['Trance','House'],RR+'trancehouse96.aacp','Мелодика транса встречает грув хауса — идеально для тёплых сетов.'),

    // Drum & Bass / Breaks
    st('rr_drumhits',  "Radio Record «D'n'B Classics»",'Drum & Bass',    ['DnB'],           RR+'drumhits96.aacp',  'Классика драм-н-бэйса: разломанные брейки и глубокий саб-бас на 174 BPM.'),
    st('rr_neuro',     'Radio Record «Neurofunk»',    'Neurofunk',       ['DnB'],           RR+'neurofunk96.aacp', 'Тёмный, техничный нейрофанк с роботизированными басами и хирургическим звуком.'),
    st('rr_liquid',    'Radio Record «Liquid Funk»',  'Liquid DnB',      ['DnB'],           RR+'liquidfunk96.aacp','Мелодичный и атмосферный ликвид: джазовые аккорды поверх стремительных брейков.'),
    st('rr_jungle',    'Radio Record «Jungle»',       'Jungle',          ['DnB'],           RR+'jungle96.aacp',    'Корни жанра: рваные брейкбиты, рагга-вокалы и саб-бас прямиком из 90-х.'),
    st('rr_breaks',    'Radio Record «Breaks»',       'Breakbeat',       ['DnB'],           RR+'brks96.aacp',      'Упругий брейкбит и биг-бит — танцевальная электроника с фанковым изломом.'),

    // Synthwave / Ambient / Chill
    st('rr_synth',     'Radio Record «Synthwave»',    'Synthwave',       ['Synthwave'],     RR+'synth96.aacp',     'Неоновая ностальгия 80-х: аналоговые синтезаторы и саундтрек к несуществующим боевикам.'),
    st('rr_ambient',   'Radio Record «Ambient»',      'Ambient',         ['Ambient'],       RR+'ambient96.aacp',   'Бесконечные текстуры и дроны для концентрации, отдыха и глубокого погружения.'),
    st('rr_lofi',      'Radio Record «Lo-Fi»',        'Lo-Fi',           ['Chillout','Ambient'],RR+'lofi96.aacp',  'Тёплый винтажный лоу-фай с хрустом плёнки — фон для работы и учёбы.'),
    st('rr_chil',      'Radio Record «Chill-Out»',    'Chillout',        ['Chillout','Ambient'],RR+'chil96.aacp',  'Расслабленные ритмы и мягкие гармонии для пауз и долгих вечеров.'),
    st('rr_dream',     'Radio Record «Dream Dance»',  'Dream Trance',    ['Trance','Chillout'],RR+'dream96.aacp',  'Мечтательный дрим-транс 90-х — воздушные мелодии и мягкий бит.'),
    st('rw_one',       'Retrowave.One Radio',         'Retrowave / Cyberpunk',['Synthwave'],'https://waveretro.ru:8443/stream','Независимое радио синтвейва, ретровейва, киберпанка и sovietwave. Прямой HTTPS-поток.', {rr:false}),
    st('dt_one',       'Discover Trance',             'Trance',          ['Trance'],        'http://paris.discovertrance.com:8006/;stream.nsv','Зарубежное транс-радио с многочасовыми диджей-сетами. Поток вещает по HTTP.', {rr:false, secure:false}),

    // Electro / Dubstep / Hardstyle / Bass
    st('rr_elect',     'Radio Record «Electro»',      'Electro House',   ['House','EDM'],   RR+'elect96.aacp',     'Жёсткий электро-хаус с пилящими синтами в духе Justice и эпохи блог-хауса.'),
    st('rr_dub',       'Radio Record «Dubstep»',      'Dubstep',         ['EDM'],           RR+'dub96.aacp',       'Тяжёлый wobble-бас и драматичные дропы — дабстеп во всей мощи.'),
    st('rr_teo',       'Radio Record «Hardstyle»',    'Hardstyle',       ['EDM'],           RR+'teo96.aacp',       'Жёсткие удары, пронзительные лиды и реверс-бас — энергия больших хард-сцен.'),
    st('rr_hbass',     'Radio Record «Hard Bass»',    'Hard Bass / Rave',['EDM'],           RR+'hbass96.aacp',     'Бескомпромиссный хард-бас и памповый рейв-звук на максимальной громкости.'),
    st('rr_darkside',  'Radio Record «Darkside»',     'Darkstep / Neuro',['DnB'],           RR+'darkside96.aacp',  'Тёмная сторона драм-н-бэйса: агрессивные басы и мрачная атмосфера.'),
    st('rr_hypno',     'Radio Record «Hypnotic»',     'Hypnotic Techno', ['Techno'],        RR+'hypno96.aacp',     'Зацикленный гипнотический техно-грув, уводящий в транс на долгие часы.'),
    st('rr_ps',        'Radio Record «Pirate Station»','Rave / Bass',    ['DnB','EDM'],     RR+'ps96.aacp',        'Легендарный рейв-бренд Radio Record: драм-н-бэйс, дабстеп и тяжёлый бас.'),

    // GOA / PSY / Minimal
    st('rr_goa',       'Radio Record «GOA/PSY»',      'Goa / Psytrance', ['Trance'],        RR+'goa96.aacp',       'Психоделический транс с кислотными арпеджио и плотным гоа-грувом.'),
    st('rr_mini',      'Radio Record «Minimal/Tech»', 'Minimal / Tech',  ['Techno','House'],RR+'mini96.aacp',      'Минимализм и микро-детали: лаконичный тек-хаус для ценителей грува.'),

    // EDM / Big Room / Festival
    st('rr_top100',    'Radio Record «TOP 100 EDM»',  'EDM Hits',        ['EDM'],           RR+'top100edm96.aacp', 'Сотня самых горячих EDM-треков планеты — главные хиты больших сцен.'),
    st('rr_guetta',    'Radio Record «David Guetta»', 'EDM / House',     ['EDM','House'],   RR+'guetta96.aacp',    'Поп-хаус и танцевальные хиты от Дэвида Гетты и его коллабораций.'),
    st('rr_ultra',     'Radio Record «Ultra Music Festival»','Festival EDM',['EDM'],        RR+'ultra64.aacp',     'Звук главной фестивальной сцены мира — лайвы и эксклюзивы Ultra.'),
    st('rr_rave',      'Radio Record «Rave FM»',      'Rave / EDM',      ['EDM'],           RR+'rave96.aacp',      'Чистая рейв-энергия: фестивальные дропы и боевики для танцпола.'),
  ];

  function st(id, name, genre, tags, url, desc, opts) {
    opts = opts || {};
    const rr = opts.rr !== false;
    const secure = opts.secure !== false && !url.startsWith('http://');
    // префикс Radio Record вычисляем из имени потока: club96.aacp -> club
    let prefix = null;
    if (rr) {
      const base = url.split('/').pop().split('.')[0];
      prefix = base.replace(/\d+$/, '');
    }
    return { id, name, genre, tags, url, desc, rr, secure, prefix, status: 'idle', track: '', icon: null, type: 'live' };
  }

  const FILTERS = ['Все','House','Techno','Trance','Synthwave','Ambient','EDM','DnB','Chillout'];

  const GENRES = [
    { name:'House',        bpm:'118–130 BPM', era:'Чикаго · 1980-е',     match:{pill:'House'},      desc:'Фундамент танцевальной музыки: четыре удара в такте, грувовый бас и душевные вокалы. Из чикагских клубов хаус разошёлся по миру десятками поджанров.' },
    { name:'Techno',       bpm:'125–150 BPM', era:'Детройт · 1980-е',    match:{pill:'Techno'},     desc:'Машинный, гипнотический и футуристичный жанр, рождённый в Детройте. Основа андеграундной клубной культуры от Берлина до Токио.' },
    { name:'Trance',       bpm:'130–145 BPM', era:'Германия · 1990-е',   match:{pill:'Trance'},     desc:'Эмоциональная мелодичная электроника с парящими лидами и мощными брейкдаунами. Музыка больших эмоций и стадионных кульминаций.' },
    { name:'Drum & Bass',  bpm:'160–180 BPM', era:'Британия · 1990-е',   match:{pill:'DnB'},        desc:'Стремительные разломанные брейки и глубокий саб-бас. Британское изобретение, выросшее из джангла и рейв-культуры.' },
    { name:'Dubstep',      bpm:'138–142 BPM', era:'Лондон · 2000-е',     match:{search:'Dubstep'},  desc:'Полутёмный звук с акцентом на саб-бас и качающийся wobble. От интроспективного UK-саунда до яростного бростепа.' },
    { name:'Ambient',      bpm:'без ритма',   era:'1970-е',              match:{pill:'Ambient'},    desc:'Музыка как атмосфера и пространство: текстуры, дроны и тишина вместо ритма. Изобретение Брайана Ино, ставшее философией.' },
    { name:'Synthwave',    bpm:'80–120 BPM',  era:'2000-е · ретро-80-е', match:{pill:'Synthwave'},  desc:'Ностальгический оммаж саундтрекам и видеоиграм 80-х. Аналоговые синтезаторы, неон и киберпанк-эстетика.' },
    { name:'EDM',          bpm:'125–150 BPM', era:'2010-е',              match:{pill:'EDM'},        desc:'Зонтичный термин для фестивальной танцевальной музыки: биг-рум, электро-хаус и мелодик. Звук главных сцен Tomorrowland и Ultra.' },
    { name:'Hardstyle',    bpm:'150–160 BPM', era:'Нидерланды · 2000-е', match:{search:'Hardstyle'},desc:'Жёсткие искажённые удары, реверс-бас и пронзительные мелодии. Энергия больших хард-данс-арен.' },
    { name:'Minimal',      bpm:'120–130 BPM', era:'1990–2000-е',         match:{search:'Minimal'},  desc:'«Меньше значит больше»: лаконичные петли, микро-детали и гипнотический грув. Интеллектуальная сторона техно и хауса.' },
  ];

  const EVENTS = [
    { name:'Berghain',          place:'Берлин, Германия',     desc:'Самый культовый техно-клуб мира с почти мифическим фейс-контролем и бескомпромиссным звуком в бывшей электростанции.' },
    { name:'Awakenings',        place:'Амстердам, Нидерланды',desc:'Главный техно-бренд Нидерландов: масштабные опен-эйры и фестивали с лучшими артистами жанра.' },
    { name:'Ultra Music Festival',place:'Майами, США',        desc:'Одна из главных фестивальных площадок планеты и витрина большого EDM и хауса.' },
    { name:'Tomorrowland',      place:'Бом, Бельгия',         desc:'Сказочный EDM-фестиваль с фантастическими сценами, собирающий сотни тысяч гостей со всего мира.' },
    { name:'Burning Man',       place:'Невада, США',          desc:'Город-эксперимент в пустыне, где электронная музыка звучит на арт-кар-вечеринках под открытым небом.' },
    { name:'MONA / Mofo',       place:'Хобарт, Австралия',    desc:'Фестиваль при музее старого и нового искусства, соединяющий авангардную электронику и современное искусство.' },
    { name:'ПИКНИК «Афиши»',    place:'Москва, Россия',       desc:'Крупнейший городской музыкальный фестиваль России с традиционно сильной электронной программой.' },
  ];

  const TRACKS = [
    { artist:'Kraftwerk',                 title:'Trans-Europe Express',          year:'1977' },
    { artist:'Donna Summer',              title:'I Feel Love',                   year:'1977' },
    { artist:'Rhythim Is Rhythim',        title:'Strings of Life',               year:'1987' },
    { artist:'Frankie Knuckles',          title:'Your Love',                     year:'1987' },
    { artist:'Orbital',                   title:'Chime',                         year:'1990' },
    { artist:'The Prodigy',               title:'Out of Space',                  year:'1992' },
    { artist:'Aphex Twin',                title:'Selected Ambient Works 85–92',  year:'1992' },
    { artist:'Faithless',                 title:'Insomnia',                      year:'1995' },
    { artist:'Robert Miles',              title:'Children',                      year:'1995' },
    { artist:'Underworld',                title:'Born Slippy .NUXX',             year:'1995' },
    { artist:'Daft Punk',                 title:'Around the World',              year:'1997' },
    { artist:'The Chemical Brothers',     title:"Block Rockin' Beats",           year:'1997' },
    { artist:'Deadmau5',                  title:'Strobe',                        year:'2009' },
    { artist:'Avicii',                    title:'Levels',                        year:'2011' },
    { artist:'Eric Prydz',                title:'Opus',                          year:'2015' },
  ];

  const ARTISTS = [
    { name:'Kraftwerk',          style:'Electro · пионеры',     desc:'Немецкие первопроходцы, заложившие основы всей электронной поп-музыки. Их роботизированный звук 70-х предопределил техно, хип-хоп и синти-поп.' },
    { name:'Giorgio Moroder',    style:'Disco · synth',         desc:'Итальянский продюсер, отец электронного диско. Его «I Feel Love» с Донной Саммер в 1977-м открыл дорогу всей танцевальной электронике.' },
    { name:'Daft Punk',          style:'French house',          desc:'Французский дуэт, превративший хаус в большое поп-явление. Альбомы Homework и Discovery — эталон, а шоу в шлемах изменили представление о концертах.' },
    { name:'Aphex Twin',         style:'IDM · ambient',         desc:'Ричард Д. Джеймс — гений и провокатор интеллектуальной электроники. От нежнейшего эмбиента до жёсткого дрилл-н-бэйса он раздвинул границы жанра.' },
    { name:'The Chemical Brothers',style:'Big beat',            desc:'Британский дуэт, сделавший биг-бит стадионным звуком 90-х. Мастера психоделических лайвов и масштабных визуальных шоу.' },
    { name:'Fatboy Slim',        style:'Big beat',              desc:'Норман Кук довёл биг-бит до поп-вершин хитами вроде «Praise You». Один из самых узнаваемых диджеев Британии.' },
    { name:'The Prodigy',        style:'Breakbeat · rave',      desc:'Самая яростная электронная группа в истории. От рейв-корней до панк-энергии The Fat of the Land — они взрывали стадионы по всему миру.' },
    { name:'Underworld',         style:'Electronica · techno',  desc:'Британцы, чей «Born Slippy» стал гимном поколения после «На игле». Их лайвы — образец живой электроники.' },
    { name:'Orbital',            style:'Techno · electronica',  desc:'Братья Хартнолл превратили рейв-музыку в концертное искусство. Их выступления в фонариках-очках — легенда фестивалей.' },
    { name:'Massive Attack',     style:'Trip-hop',              desc:'Бристольские основоположники трип-хопа. Альбомы Blue Lines и Mezzanine — мрачная, кинематографичная классика.' },
    { name:'Carl Cox',           style:'Techno · house',        desc:'Легендарный британский диджей и посол техно-культуры. Его резиденции на Ибице вошли в историю клубной сцены.' },
    { name:'Jeff Mills',         style:'Detroit techno',        desc:'«The Wizard» из Детройта — икона минималистичного, космического техно и виртуоз диджеинга на трёх вертушках.' },
    { name:'Richie Hawtin',      style:'Minimal techno',        desc:'Под псевдонимом Plastikman переопределил минимал-техно. Новатор, соединивший клубную музыку с передовыми технологиями.' },
    { name:'Laurent Garnier',    style:'Techno · house',        desc:'Французский мэтр, один из главных проповедников техно в Европе. Его сеты — урок музыкальной драматургии.' },
    { name:'Sven Väth',          style:'Techno · trance',       desc:'Немецкий диджей-марафонец и основатель Cocoon. Душа франкфуртской и ибицкой сцены на протяжении десятилетий.' },
    { name:'Dave Clarke',        style:'Techno',                desc:'«Барон техно» из Британии — бескомпромиссный диджей с жёстким, заряженным звучанием и острым языком.' },
    { name:'Armin van Buuren',   style:'Trance',                desc:'Многократный №1 мирового диджей-рейтинга и голос транса. Его радиошоу A State of Trance слушают миллионы в десятках стран.' },
    { name:'Tiësto',             style:'Trance · EDM',          desc:'Голландец, прошедший путь от классического транса до большого EDM. Один из первых диджеев-суперзвёзд планетарного масштаба.' },
    { name:'Paul van Dyk',       style:'Trance',                desc:'Берлинский пионер транса с инженерным подходом к звуку. Лауреат премий и автор гимнов жанра.' },
    { name:'Ferry Corsten',      style:'Trance',                desc:'Голландский продюсер у истоков транса под множеством псевдонимов (System F, Gouryella). Мастер мелодии и энергии.' },
    { name:'Above & Beyond',     style:'Trance',                desc:'Британское трио и лейбл Anjunabeats — синоним эмоционального транса. Их шоу Group Therapy собирают стадионы.' },
    { name:'Deadmau5',           style:'Progressive house',     desc:'Канадец в мышиной маске, мастер прогрессив-хауса и сложного саунд-дизайна. Трек «Strobe» — современная классика жанра.' },
    { name:'Eric Prydz',         style:'Progressive · techno',  desc:'Швед, известный как Pryda и Cirez D. Перфекционист звука и автор грандиозных аудиовизуальных шоу HOLO и EPIC.' },
    { name:'John Digweed',       style:'Progressive house',     desc:'Британский диджей и со-автор серии Northern Exposure. Эталон длинных гипнотических прогрессив-сетов.' },
  ];

  /* ---------- Состояние ---------- */
  const audioEngine = {
    audio: new Audio(),
    currentStation: null,
    history: [],            // [{stationId, stationName, track, timestamp}]
    volume: 0.8,
    isPlaying: false,
    useWebAudio: false,
    probed: false,
    probing: false,         // идёт CORS-проба
    userPaused: false,      // пауза по воле пользователя (а не обрыв)
    reconnectAttempts: 0,
    reconnectTimer: null,
    trackFails: 0,          // подряд неудачных треков в плейлисте
  };
  audioEngine.audio.preload = 'none';
  audioEngine.audio.volume = audioEngine.volume;

  let audioContext = null, analyser = null, sourceNode = null, freqData = null;
  let activeFilter = 'Все';
  let searchTerm = '';
  let modalOpen = false;
  let sortMode = 'default';
  let onlineOnly = false;
  let favoritesOnly = false;
  const favorites = new Set();
  const stationById = Object.fromEntries(STATIONS.map(s => [s.id, s]));

  /* ---------- Хранилище (opt-in localStorage) ---------- */
  const SK = { consent:'ew_consent', theme:'ew_theme', volume:'ew_volume', favorites:'ew_favorites' };
  let persistEnabled = false;
  const lsGet = k => { try { return localStorage.getItem(k); } catch(_) { return null; } };
  const lsSet = (k,v) => { try { localStorage.setItem(k,v); } catch(_){} };
  const lsDel = k => { try { localStorage.removeItem(k); } catch(_){} };
  function persist(key, val){ if (persistEnabled) lsSet(key, val); }
  function loadPersisted(){
    if (lsGet(SK.consent) !== '1') return;
    persistEnabled = true;
    const th = lsGet(SK.theme);
    if (th === 'dark' || th === 'light') document.documentElement.setAttribute('data-theme', th);
    const vol = parseFloat(lsGet(SK.volume));
    if (!isNaN(vol)) audioEngine.volume = Math.min(1, Math.max(0, vol));
    try { (JSON.parse(lsGet(SK.favorites)) || []).forEach(id => { if (stationById[id]) favorites.add(id); }); } catch(_){}
  }
  function setPersist(on){
    persistEnabled = on;
    if (on){
      lsSet(SK.consent, '1');
      lsSet(SK.theme, currentTheme());
      lsSet(SK.volume, String(audioEngine.volume));
      lsSet(SK.favorites, JSON.stringify([...favorites]));
      toast('Настройки будут сохраняться в этом браузере');
    } else {
      Object.values(SK).forEach(lsDel);
      toast('Сохранённые настройки удалены');
    }
  }

  /* ---------- Утилиты ---------- */
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function monogram(name){
    const clean = name.replace(/Radio Record|«|»/g,'').trim();
    const m = clean.match(/[A-ZА-Я0-9]/g);
    return (m ? m.slice(0,2).join('') : clean.slice(0,2)).toUpperCase();
  }
  function plural(n, one, few, many){
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  /* =======================================================
     РЕНДЕР КАТАЛОГА
     ======================================================= */
  function renderFilters(){
    const wrap = $('#filterPills');
    wrap.innerHTML = FILTERS.map(f =>
      `<button class="pill" type="button" data-filter="${esc(f)}" aria-pressed="${f==='Все'}">${esc(f)}</button>`
    ).join('');
    wrap.addEventListener('click', e => {
      const b = e.target.closest('[data-filter]'); if (!b) return;
      setFilter(b.dataset.filter);
    });
  }

  function cardHTML(s){
    const fav = favorites.has(s.id);
    const badge = s.custom ? `<span class="sc-badge">${s.type==='playlist'?'мой плейлист':'моя станция'}</span>` : '';
    return `
      <article class="station-card${s.custom?' is-custom':''}" id="st-${s.id}" data-id="${esc(s.id)}" data-tags="${esc(s.tags.join(' '))}" data-name="${esc(s.name.toLowerCase())}">
        <div class="sc-top">
          <span class="sc-monogram" aria-hidden="true"><span class="sc-monogram-text">${esc(monogram(s.name))}</span></span>
          <span class="sc-status" data-state="checking" role="status">
            <span class="dot" aria-hidden="true"></span><span class="sc-status-text">проверка…</span>
          </span>
        </div>
        <h3 class="sc-name">${esc(s.name)}</h3>
        <div class="sc-tags"><span class="sc-tag">${esc(s.genre)}</span>${badge}</div>
        <p class="sc-desc">${esc(s.desc)}</p>
        <p class="sc-now" data-now hidden><b>${s.type==='playlist'?'Трек':'В эфире'}</b><span></span></p>
        <div class="sc-actions">
          <button class="sc-play" type="button" data-play="${esc(s.id)}" aria-label="Слушать ${esc(s.name)}">
            <svg class="ic-play" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <svg class="ic-pause" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>
            <span class="sc-eqmini" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            <span class="sc-play-label">Слушать</span>
          </button>
          <button class="sc-detail" type="button" data-detail="${esc(s.id)}">Подробнее</button>
          <button class="sc-fav${fav?' is-fav':''}" type="button" data-fav="${esc(s.id)}" aria-pressed="${fav}" aria-label="${fav?'Убрать из избранного':'Добавить в избранное'}" title="В избранное">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3.4l2.5 5.4 5.9.6-4.4 4 1.2 5.8L12 21.3 6.8 19.2 8 13.4 3.6 9.4l5.9-.6z"/></svg>
          </button>
        </div>
      </article>`;
  }

  let statusObserver = null, gridBound = false;
  function ensureStatusObserver(){
    if (statusObserver || !('IntersectionObserver' in window)) return;
    statusObserver = new IntersectionObserver((entries, o) => {
      entries.forEach(en => { if (en.isIntersecting) { queueStatusCheck(en.target.dataset.id); o.unobserve(en.target); } });
    }, { rootMargin: '200px' });
  }
  function observeForStatus(cards){
    ensureStatusObserver();
    if (statusObserver) cards.forEach(c => c && statusObserver.observe(c));
    else cards.forEach(c => c && queueStatusCheck(c.dataset.id));
  }
  function renderStations(){
    const grid = $('#stationsGrid');
    grid.innerHTML = STATIONS.map(cardHTML).join('');
    if (!gridBound){
      grid.addEventListener('click', e => {
        const p = e.target.closest('[data-play]');
        const d = e.target.closest('[data-detail]');
        const f = e.target.closest('[data-fav]');
        if (f) { toggleFavorite(f.dataset.fav); }
        else if (p) { onPlayClick(p.dataset.play); }
        else if (d) { selectStation(d.dataset.detail, false); openModal(); }
      });
      gridBound = true;
    }
    observeForStatus($$('.station-card', grid));
  }
  // добавление станций из манифеста без перепривязки слушателей
  function appendStations(list){
    if (!list.length) return;
    $('#stationsGrid').insertAdjacentHTML('beforeend', list.map(cardHTML).join(''));
    list.forEach(s => { if (s.icon) applyIcon(s); });
    observeForStatus(list.map(s => document.getElementById('st-'+s.id)));
    if (sortMode !== 'default') sortStations();
    applyFilter();
  }

  function renderGenres(){
    $('#genreGrid').innerHTML = GENRES.map((g,i) => `
      <button class="genre-card" type="button" data-genre="${i}">
        <h3>${esc(g.name)} <span class="bpm">${esc(g.bpm)}</span></h3>
        <p>${esc(g.desc)}</p>
        <span class="era">${esc(g.era)}</span>
      </button>`).join('');
    $('#genreGrid').addEventListener('click', e => {
      const b = e.target.closest('[data-genre]'); if (!b) return;
      const g = GENRES[+b.dataset.genre];
      if (g.match.pill) { setFilter(g.match.pill); $('#stationSearch').value=''; searchTerm=''; applyFilter(); }
      else { setFilter('Все'); $('#stationSearch').value = g.match.search; searchTerm = g.match.search.toLowerCase(); applyFilter(); }
      $('#stations').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function renderEvents(){
    $('#eventsGrid').innerHTML = EVENTS.map(e => `
      <article class="event-card">
        <h3>${esc(e.name)}</h3>
        <span class="place">${esc(e.place)}</span>
        <p>${esc(e.desc)}</p>
      </article>`).join('');
  }

  function renderTracks(){
    $('#tracksList').innerHTML = TRACKS.map(t => `
      <li class="track-item">
        <span class="ti-text"><span class="ti-main">${esc(t.title)}</span> — <span class="ti-artist">${esc(t.artist)}</span></span>
        <span class="ti-year">${esc(t.year)}</span>
      </li>`).join('');
  }

  function renderArtists(){
    $('#artistsGrid').innerHTML = ARTISTS.map(a => `
      <article class="artist-card">
        <span class="a-style">${esc(a.style)}</span>
        <h3>${esc(a.name)}</h3>
        <p>${esc(a.desc)}</p>
      </article>`).join('');
  }

  /* =======================================================
     ФИЛЬТР И ПОИСК
     ======================================================= */
  function setFilter(f){
    activeFilter = f;
    $$('#filterPills .pill').forEach(p => p.setAttribute('aria-pressed', String(p.dataset.filter === f)));
    applyFilter();
  }
  function applyFilter(){
    let visible = 0, checking = 0;
    STATIONS.forEach(s => {
      const card = document.getElementById('st-'+s.id);
      const okTag = activeFilter === 'Все' || s.tags.includes(activeFilter);
      const okSearch = !searchTerm || s.name.toLowerCase().includes(searchTerm) || s.genre.toLowerCase().includes(searchTerm);
      const okOnline = !onlineOnly || s.status === 'online';
      const okFav = !favoritesOnly || favorites.has(s.id);
      const show = okTag && okSearch && okOnline && okFav;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
      if (onlineOnly && okTag && okSearch && okFav && (s.status === 'checking' || s.status === 'idle')) checking++;
    });
    const empty = $('#stationsEmpty');
    empty.hidden = visible !== 0;
    if (visible === 0) {
      empty.textContent = favoritesOnly && favorites.size === 0
        ? 'В избранном пока пусто — добавьте станции звёздочкой.'
        : (onlineOnly && checking > 0 ? 'Проверяем доступность станций…' : 'По вашему запросу станций не найдено.');
    }
    const rc = $('#resultsCount');
    if (rc) rc.textContent = `${visible} ${plural(visible,'станция','станции','станций')}`;
  }
  function getPlaylist(){
    // порядок как на экране (с учётом сортировки и фильтров)
    const vis = $$('#stationsGrid .station-card')
      .filter(c => !c.classList.contains('is-hidden'))
      .map(c => stationById[c.dataset.id]).filter(Boolean);
    return vis.length ? vis : STATIONS;
  }

  /* =======================================================
     АУДИО-ДВИЖОК
     ======================================================= */
  function onPlayClick(id){
    if (audioEngine.currentStation && audioEngine.currentStation.id === id) {
      togglePlay();
    } else {
      selectStation(id, true);
    }
  }

  function selectStation(id, autoplay){
    const s = stationById[id];
    if (!s) return;
    clearReconnect();
    audioEngine.userPaused = false;
    audioEngine.trackFails = 0;
    // при переходе на другую плейлист-станцию начинаем с первого трека
    if (s.type === 'playlist' && (!audioEngine.currentStation || audioEngine.currentStation.id !== s.id)) s.trackIndex = 0;

    // HTTP-поток на HTTPS-странице — заблокирован браузером (mixed content)
    if (!s.secure && location.protocol === 'https:') {
      audioEngine.currentStation = s;
      updateNowPlayingUI(s, '');
      setPlayerStatus('error', 'Только в приложении');
      toast('Этот поток вещает по HTTP и доступен только в приложении.');
      reflectActiveCards();
      return;
    }

    audioEngine.currentStation = s;
    updateNowPlayingUI(s, s.track || '');
    reflectActiveCards();
    if (autoplay) play();
  }

  function play(){
    const s = audioEngine.currentStation;
    if (!s) return;
    audioEngine.userPaused = false;
    if (!s.secure && location.protocol === 'https:') {
      setPlayerStatus('error', 'Только в приложении');
      toast('Этот поток вещает по HTTP и доступен только в приложении.');
      return;
    }
    setPlayerStatus('loading', 'Подключение…');

    // первый запуск — пробуем Web Audio с CORS; при ошибке откатываемся
    if (!audioEngine.probed) {
      probeAndPlay(s);
      return;
    }
    startStream(s);
  }

  function startStream(s){
    const a = audioEngine.audio;
    if (s.type === 'playlist' && s.tracks && s.tracks.length){
      const t = s.tracks[s.trackIndex] || s.tracks[0];
      a.src = t.src;
      s.track = t.artist ? `${t.artist} — ${t.title}` : t.title;
      setTrackText($('#mpTrack'), s.track);
      setTrackText($('#pmTrack'), s.track);
      updateMediaSession();
      highlightPlaylist();
    } else {
      a.src = s.url;
    }
    a.volume = audioEngine.volume;
    const p = a.play();
    if (p && p.catch) p.catch(err => {
      // автозапуск/сеть — показываем паузу, пользователь нажмёт снова
      if (err && err.name === 'NotAllowedError') setPlayerStatus('idle', 'Нажмите Play');
    });
  }

  // Проба возможностей Web Audio (CORS). Выполняется один раз после жеста пользователя.
  function probeAndPlay(s){
    audioEngine.probed = true;
    audioEngine.probing = true;
    setTimeout(() => { audioEngine.probing = false; }, 10000);   // страховка
    const a = audioEngine.audio;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        audioContext = new Ctx();
        if (audioContext.state === 'suspended') audioContext.resume();
        a.crossOrigin = 'anonymous';
        const onFirstPlay = () => {
          a.removeEventListener('playing', onFirstPlay);
          audioEngine.probing = false;
          if (sourceNode) return;
          try {
            sourceNode = audioContext.createMediaElementSource(a);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 128;                 // 64 частотных полосы
            analyser.smoothingTimeConstant = 0.78;
            freqData = new Uint8Array(analyser.frequencyBinCount);
            sourceNode.connect(analyser);
            analyser.connect(audioContext.destination);
            audioEngine.useWebAudio = true;
          } catch (_) { audioEngine.useWebAudio = false; }
        };
        const onProbeError = () => {
          a.removeEventListener('error', onProbeError);
          audioEngine.probing = false;
          // CORS не сработал — навсегда отключаем Web Audio, играем напрямую
          a.crossOrigin = null;
          audioEngine.useWebAudio = false;
          try { a.load(); } catch(_){}
          startStream(s);
        };
        a.addEventListener('playing', onFirstPlay, { once: true });
        a.addEventListener('error', onProbeError, { once: true });
        startStream(s);
        return;
      }
    } catch (_) { /* fallthrough */ }
    audioEngine.probing = false;
    audioEngine.useWebAudio = false;
    startStream(s);
  }

  function togglePlay(){
    if (!audioEngine.currentStation) {
      // ничего не выбрано — запускаем первую станцию из списка
      const list = getPlaylist();
      if (list.length) selectStation(list[0].id, true);
      return;
    }
    if (audioEngine.isPlaying) {
      audioEngine.userPaused = true;
      clearReconnect();
      audioEngine.audio.pause();
    } else {
      audioEngine.userPaused = false;
      if (audioContext && audioContext.state === 'suspended') audioContext.resume();
      if (!audioEngine.audio.src) play();
      else audioEngine.audio.play().catch(()=>{});
    }
  }

  function stepStation(dir){
    const list = getPlaylist();
    if (!list.length) return;
    let idx = audioEngine.currentStation ? list.findIndex(s => s.id === audioEngine.currentStation.id) : -1;
    idx = (idx + dir + list.length) % list.length;
    selectStation(list[idx].id, true);
  }

  const persistVolume = debounce(() => persist(SK.volume, String(audioEngine.volume)), 500);
  function setVolume(v){
    audioEngine.volume = Math.min(1, Math.max(0, v));
    audioEngine.audio.volume = audioEngine.volume;
    const pct = Math.round(audioEngine.volume * 100);
    $('#mpVolume').value = pct; $('#pmVolume').value = pct; $('#pmVolVal').textContent = pct + '%';
    persistVolume();
  }

  // события аудио-элемента
  const a = audioEngine.audio;
  a.addEventListener('playing', () => {
    audioEngine.isPlaying = true; audioEngine.userPaused = false; audioEngine.trackFails = 0; clearReconnect();
    reflectPlayState(); setPlayerStatus('online', 'В эфире'); startViz(); updateMediaSession();
    const cur = audioEngine.currentStation;
    if (cur && cur.type === 'playlist') pushHistory(cur, cur.track || '');
  });
  a.addEventListener('pause',   () => {
    audioEngine.isPlaying = false; reflectPlayState(); updateMediaSession();
    if (audioEngine.currentStation && audioEngine.userPaused) setPlayerStatus('idle', 'Пауза');
  });
  a.addEventListener('waiting', () => { if (audioEngine.isPlaying || !audioEngine.reconnectTimer) setPlayerStatus('loading', 'Буферизация…'); });
  a.addEventListener('stalled', () => { if (!audioEngine.reconnectTimer) setPlayerStatus('loading', 'Ожидание потока…'); });
  a.addEventListener('error',   () => {
    audioEngine.isPlaying = false; reflectPlayState();
    if (audioEngine.probing) return;                              // пробу обрабатывает probeAndPlay
    const s = audioEngine.currentStation;
    if (!s || audioEngine.userPaused) { setPlayerStatus('error', 'Нет сигнала'); return; }
    if (!s.secure && location.protocol === 'https:') { setPlayerStatus('error', 'Только в приложении'); return; }
    if (s.type === 'playlist'){                                   // битый/недоступный файл — пропускаем трек
      audioEngine.trackFails = (audioEngine.trackFails || 0) + 1;
      if (audioEngine.trackFails < s.tracks.length){
        setPlayerStatus('loading', 'Пропуск трека…');
        setTimeout(() => { if (!audioEngine.userPaused) stepTrack(1); }, 700);
      } else {
        audioEngine.trackFails = 0;
        setPlayerStatus('error', 'Файлы недоступны');
      }
      return;
    }
    scheduleReconnect();                                          // обрыв потока — переподключаемся
  });
  a.addEventListener('ended', () => {                             // только файлы заканчиваются
    const s = audioEngine.currentStation;
    if (s && s.type === 'playlist') stepTrack(1);                 // авто-переход + зацикливание
    else if (s && !audioEngine.userPaused) scheduleReconnect();
  });

  /* ---------- Авто-переподключение при обрыве ---------- */
  const RECONNECT_MAX = 6;
  function scheduleReconnect(){
    if (audioEngine.reconnectTimer) return;
    if (audioEngine.reconnectAttempts >= RECONNECT_MAX) {
      audioEngine.reconnectAttempts = 0;
      setPlayerStatus('error', 'Нет сигнала');
      toast('Не удалось переподключиться к потоку.');
      return;
    }
    audioEngine.reconnectAttempts++;
    const delay = Math.min(8000, 1000 * Math.pow(2, audioEngine.reconnectAttempts - 1)); // 1,2,4,8,8,8с
    setPlayerStatus('loading', `Переподключение… (${audioEngine.reconnectAttempts})`);
    audioEngine.reconnectTimer = setTimeout(() => {
      audioEngine.reconnectTimer = null;
      if (audioEngine.userPaused || !audioEngine.currentStation) return;
      try { startStream(audioEngine.currentStation); } catch(_) { scheduleReconnect(); }
    }, delay);
  }
  function clearReconnect(){
    if (audioEngine.reconnectTimer) { clearTimeout(audioEngine.reconnectTimer); audioEngine.reconnectTimer = null; }
    audioEngine.reconnectAttempts = 0;
  }

  /* =======================================================
     ОБНОВЛЕНИЕ UI ПЛЕЕРА
     ======================================================= */
  function reflectActiveCards(){
    const cur = audioEngine.currentStation;
    $$('.station-card').forEach(c => c.classList.toggle('is-active', !!cur && c.dataset.id === cur.id));
    $('#miniPlayer').classList.toggle('is-active', !!cur);
    $('#miniPlayer').classList.toggle('is-empty', !cur);
  }
  function reflectPlayState(){
    const cur = audioEngine.currentStation;
    $('#miniPlayer').classList.toggle('is-playing', audioEngine.isPlaying);
    $$('.station-card').forEach(c => c.classList.toggle('is-playing', audioEngine.isPlaying && !!cur && c.dataset.id === cur.id));
    const lbl = audioEngine.isPlaying ? 'Пауза' : 'Воспроизвести';
    $('#mpPlay').setAttribute('aria-label', lbl);
    $('#pmPlay').setAttribute('aria-label', lbl);
  }
  function setPlayerStatus(state, text){
    const el = $('#mpStatus'); el.dataset.state = state; $('.mp-status-text', el).textContent = text;
  }
  function updateNowPlayingUI(s, track){
    const isPl = s.type === 'playlist';
    const first = isPl && s.tracks[0] ? (s.tracks[0].artist ? `${s.tracks[0].artist} — ${s.tracks[0].title}` : s.tracks[0].title) : '';
    const placeholder = isPl ? (first || '—') : 'Идёт настройка эфира…';
    $('#mpMonogram').textContent = monogram(s.name);
    $('#mpStation').textContent = s.name;
    setTrackText($('#mpTrack'), track || placeholder);
    // модал
    $('#pmMonogram').textContent = monogram(s.name);
    $('#pmStation').textContent = s.name;
    $('#pmGenre').textContent = s.genre;
    $('#pmDesc').textContent = s.desc;
    setTrackText($('#pmTrack'), track || (isPl ? placeholder : '—'));
    $('#pmPrevTrack').setAttribute('aria-label', isPl ? 'Предыдущий трек' : 'Предыдущая станция');
    $('#pmNextStation').setAttribute('aria-label', isPl ? 'Следующий трек' : 'Следующая станция');
    setCoverIcon($('#mpCover'), s);
    renderPlaylist(s);
    reflectFavButtons();
    updateMediaSession();
  }
  // присвоение текста трека + marquee для длинных строк
  function setTrackText(el, text){
    el.textContent = text;
    requestAnimationFrame(() => {
      const overflow = el.scrollWidth > el.parentElement.clientWidth + 4;
      el.classList.toggle('is-marquee', overflow && text.length > 24);
    });
  }

  /* =======================================================
     ИСТОРИЯ (в памяти вкладки)
     ======================================================= */
  function pushHistory(s, track){
    const last = audioEngine.history[0];
    if (last && last.stationId === s.id && last.track === track) return;
    audioEngine.history.unshift({ stationId: s.id, stationName: s.name, track, timestamp: Date.now() });
    if (audioEngine.history.length > 50) audioEngine.history.length = 50;
    if (modalOpen) renderHistory();
  }
  function renderHistory(){
    const list = $('#pmHistory');
    const items = audioEngine.history.slice(0, 10);
    if (!items.length) { list.innerHTML = '<li class="pm-history-empty">История появится во время прослушивания.</li>'; return; }
    list.innerHTML = '';
    items.forEach(h => {
      const li = document.createElement('li');
      const t = document.createElement('span'); t.className = 'h-time';
      t.textContent = new Date(h.timestamp).toLocaleTimeString('ru-RU', { hour:'2-digit', minute:'2-digit' });
      const st = document.createElement('span'); st.className = 'h-station'; st.textContent = monogram(h.stationName);
      st.title = h.stationName;
      const tr = document.createElement('span'); tr.className = 'h-track'; tr.textContent = h.track;
      li.append(t, st, tr); list.appendChild(li);
    });
  }

  /* =======================================================
     ВИЗУАЛИЗАТОР (Web Audio API + симуляция)
     ======================================================= */
  const BARS = 64;
  const barVals = new Float32Array(BARS);
  let vizRAF = null, accentColor = '#1f9bd6';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function refreshAccent(){
    const c = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    if (c) accentColor = c;
  }
  function ctxOf(canvas){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || 80, h = canvas.clientHeight || 38;
    if (canvas.width !== Math.round(w*dpr) || canvas.height !== Math.round(h*dpr)) {
      canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr);
    }
    const ctx = canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
    return { ctx, w, h };
  }
  function drawBars(canvas){
    if (!canvas.clientWidth || canvas.offsetParent === null) return;   // скрытый canvas — не рисуем
    const { ctx, w, h } = ctxOf(canvas);
    ctx.clearRect(0,0,w,h);
    const gap = 2, bw = (w - gap*(BARS-1)) / BARS;
    ctx.fillStyle = accentColor;
    for (let i=0;i<BARS;i++){
      const bh = Math.max(1, barVals[i]*h);
      const x = i*(bw+gap), y = h-bh, r = Math.min(bw/2, 2);
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, [r,r,0,0]);
      else ctx.rect(x, y, bw, bh);
      ctx.globalAlpha = 0.55 + 0.45*barVals[i];
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function computeBars(time){
    if (audioEngine.isPlaying && audioEngine.useWebAudio && analyser) {
      analyser.getByteFrequencyData(freqData);
      for (let i=0;i<BARS;i++) barVals[i] = (freqData[i]||0)/255;
    } else if (audioEngine.isPlaying && !reduceMotion) {
      const vol = 0.35 + audioEngine.volume*0.65;
      for (let i=0;i<BARS;i++){
        const shape = Math.pow(1 - i/BARS, 0.55);          // бас выше
        const wob = 0.5 + 0.5*Math.sin(time*0.004 + i*0.5) * Math.sin(time*0.0021 + i*0.17);
        const target = Math.min(1, shape * vol * (0.45 + 0.55*wob) + Math.random()*0.06);
        barVals[i] += (target - barVals[i]) * 0.35;
      }
    } else {
      for (let i=0;i<BARS;i++) barVals[i] += (0 - barVals[i]) * 0.18;  // плавное затухание
    }
  }
  function vizLoop(time){
    computeBars(time);
    drawBars($('#mpEq'));
    if (modalOpen) drawBars($('#pmEq'));
    const settled = !audioEngine.isPlaying && barVals.every(v => v < 0.01);
    if (settled && !modalOpen) { vizRAF = null; return; }
    vizRAF = requestAnimationFrame(vizLoop);
  }
  function startViz(){ if (vizRAF == null) vizRAF = requestAnimationFrame(vizLoop); }

  /* =======================================================
     ПРОВЕРКА ОНЛАЙН/ОФЛАЙН
     ======================================================= */
  const statusQueue = [];
  let activeChecks = 0;
  const MAX_CHECKS = 5;
  const checked = new Set();

  function queueStatusCheck(id){
    if (checked.has(id)) return; checked.add(id);
    statusQueue.push(id); pumpStatus();
  }
  function pumpStatus(){
    while (activeChecks < MAX_CHECKS && statusQueue.length){
      checkStatus(statusQueue.shift());
    }
  }
  function setCardStatus(id, state, text){
    const card = document.getElementById('st-'+id); if (!card) return;
    const el = $('.sc-status', card); el.dataset.state = state;
    $('.sc-status-text', el).textContent = text;
    const s = stationById[id]; if (s) s.status = state;
    if (onlineOnly) applyFilter();           // открыть/скрыть по мере проверки
    if (sortMode === 'online') scheduleSort();
  }
  function checkStatus(id){
    const s = stationById[id];
    if (!s) return;
    if (!s.secure && location.protocol === 'https:') {
      setCardStatus(id, 'offline', 'только HTTP'); pumpStatus(); return;
    }
    activeChecks++;
    setCardStatus(id, 'checking', 'проверка…');
    const test = new Audio();
    test.preload = 'auto'; test.muted = true; test.volume = 0;
    let done = false;
    const finish = (state, text) => {
      if (done) return; done = true;
      clearTimeout(timer);
      try { test.pause(); test.src = ''; test.load(); } catch(_){}
      setCardStatus(id, state, text);
      activeChecks--; pumpStatus();
    };
    const ok = () => finish('online', 'в эфире');
    test.addEventListener('canplay', ok, { once:true });
    test.addEventListener('loadeddata', ok, { once:true });
    test.addEventListener('playing', ok, { once:true });
    test.addEventListener('error', () => finish('offline', 'офлайн'), { once:true });
    const timer = setTimeout(() => finish('offline', 'нет ответа'), 8000);
    try { test.src = s.url; test.load(); } catch(_) { finish('offline','офлайн'); }
  }

  /* =======================================================
     ТЕКУЩИЙ ТРЕК (Radio Record API, polling 30с)
     ======================================================= */
  let prefixToId = null;
  let metadataDisabled = false;

  async function fetchStationIndex(){
    try {
      const r = await fetch('https://www.radiorecord.ru/api/stations/', { mode:'cors' });
      if (!r.ok) throw 0;
      const data = await r.json();
      const arr = (data.result && (data.result.stations || data.result)) || [];
      prefixToId = {};
      const iconByPrefix = {};
      arr.forEach(x => {
        if (!x || x.prefix == null) return;
        prefixToId[String(x.prefix)] = x.id;
        let ic = x.icon_fill_colored || x.icon_fill || x.icon || x.new_icon || x.svg_fill || '';
        if (ic && ic.startsWith('/')) ic = 'https://www.radiorecord.ru' + ic;
        if (ic) iconByPrefix[String(x.prefix)] = ic;
      });
      // подставляем настоящие логотипы станций
      STATIONS.forEach(s => {
        if (s.prefix && iconByPrefix[s.prefix]) { s.icon = iconByPrefix[s.prefix]; applyIcon(s); }
      });
    } catch(_) { prefixToId = {}; }
  }
  async function pollNowPlaying(){
    if (metadataDisabled) return;
    try {
      if (prefixToId === null) await fetchStationIndex();
      const r = await fetch('https://www.radiorecord.ru/api/stations/now/', { mode:'cors' });
      if (!r.ok) throw 0;
      const data = await r.json();
      const items = (data.result) || [];
      const byId = {}, byPrefix = {};
      items.forEach(it => {
        if (!it) return;
        const track = formatTrack(it.track || it.song || it);
        if (it.id != null) byId[it.id] = track;
        if (it.prefix != null) byPrefix[String(it.prefix)] = track;
      });
      STATIONS.forEach(s => {
        if (!s.rr || !s.prefix) return;
        let track = byPrefix[s.prefix];
        if (track == null && prefixToId && prefixToId[s.prefix] != null) track = byId[prefixToId[s.prefix]];
        if (track) applyTrack(s, track);
      });
    } catch(_) {
      metadataDisabled = true;   // CORS/сеть недоступны — больше не пытаемся
    }
  }
  function formatTrack(t){
    if (!t) return '';
    if (typeof t === 'string') return t.trim();
    const artist = (t.artist || t.singer || '').trim();
    const song = (t.song || t.title || t.track || '').trim();
    if (artist && song) return artist + ' — ' + song;
    return (song || artist || '').trim();
  }
  function applyTrack(s, track){
    if (!track || s.track === track) return;
    s.track = track;
    const card = document.getElementById('st-'+s.id);
    if (card){ const now = $('[data-now]', card); now.hidden = false; $('span', now).textContent = track; }
    if (audioEngine.currentStation && audioEngine.currentStation.id === s.id){
      setTrackText($('#mpTrack'), track);
      setTrackText($('#pmTrack'), track);
      updateMediaSession();
      if (audioEngine.isPlaying) pushHistory(s, track);
    }
  }

  /* =======================================================
     СВОИ СТАНЦИИ (JSON-манифест на вашем сервере)
     ======================================================= */
  function slug(str){ return String(str).toLowerCase().replace(/[^a-zа-я0-9]+/gi,'-').replace(/^-+|-+$/g,'').slice(0,40) || 'st'; }
  function normalizeManifestStation(raw){
    if (!raw || typeof raw !== 'object' || !raw.name) return null;
    let id = 'usr_' + slug(raw.id || raw.name);
    if (stationById[id]) { let n = 2; while (stationById[id+'-'+n]) n++; id = id+'-'+n; }
    const name  = String(raw.name).slice(0,120);
    const genre = String(raw.genre || 'Моя станция').slice(0,60);
    const tags  = Array.isArray(raw.tags) && raw.tags.length ? raw.tags.map(t => String(t).slice(0,24)).slice(0,6) : [genre];
    const desc  = String(raw.description || raw.desc || 'Пользовательская станция.').slice(0,400);
    const icon  = typeof raw.icon === 'string' && /^https?:\/\//.test(raw.icon) ? raw.icon : null;
    const https = location.protocol === 'https:';

    if (Array.isArray(raw.tracks) && raw.tracks.length){
      const tracks = raw.tracks.map(t => ({
        title:  String((t && (t.title || t.name)) || 'Без названия').slice(0,160),
        artist: String((t && t.artist) || '').slice(0,160),
        src:    String((t && (t.src || t.url || t.file)) || ''),
      })).filter(t => /^https?:\/\//.test(t.src));
      if (!tracks.length) return null;
      const secure = !https || tracks.every(t => !t.src.startsWith('http://'));
      return { id, name, genre, tags, url: tracks[0].src, desc, rr:false, secure, prefix:null,
               status:'idle', track:'', icon, type:'playlist', tracks, trackIndex:0, custom:true };
    }
    const stream = String(raw.stream || raw.url || '');
    if (/^https?:\/\//.test(stream)){
      const secure = !https || !stream.startsWith('http://');
      return { id, name, genre, tags, url: stream, desc, rr:false, secure, prefix:null,
               status:'idle', track:'', icon, type:'live', custom:true };
    }
    return null;
  }
  let manifestLoaded = false;
  async function loadManifest(){
    if (manifestLoaded) return;          // защита от повторной загрузки
    manifestLoaded = true;
    const url = new URLSearchParams(location.search).get('manifest') || MANIFEST_URL;
    if (!url) return;
    let data;
    try {
      const r = await fetch(url, { cache:'no-cache' });
      if (!r.ok) return;                  // манифеста нет — это нормально, тихо выходим
      data = await r.json();
    } catch(_) { return; }
    const list = Array.isArray(data) ? data : (data.stations || []);
    const added = [];
    list.forEach(raw => {
      const s = normalizeManifestStation(raw);
      if (s){ STATIONS.push(s); stationById[s.id] = s; added.push(s); }
    });
    if (!added.length) return;
    appendStations(added);
    const eyebrow = $('.hero-eyebrow');
    if (eyebrow){ const n = STATIONS.length;
      eyebrow.innerHTML = `<span class="live-dot" aria-hidden="true"></span> ${n} ${plural(n,'станция','станции','станций')} · только электроника`; }
  }

  /* =======================================================
     ПЛЕЙЛИСТ-СТАНЦИИ (файлы с вашего сервера)
     ======================================================= */
  function stepTrack(dir){
    const s = audioEngine.currentStation;
    if (!s || s.type !== 'playlist' || !s.tracks.length){ stepStation(dir); return; }
    s.trackIndex = (s.trackIndex + dir + s.tracks.length) % s.tracks.length;
    clearReconnect(); audioEngine.userPaused = false; audioEngine.trackFails = 0;
    startStream(s);
  }
  function playTrackIndex(idx){
    const s = audioEngine.currentStation;
    if (!s || s.type !== 'playlist' || !s.tracks.length) return;
    s.trackIndex = ((idx % s.tracks.length) + s.tracks.length) % s.tracks.length;
    clearReconnect(); audioEngine.userPaused = false; audioEngine.trackFails = 0;
    startStream(s);
  }
  function renderPlaylist(s){
    const wrap = $('#pmPlaylistWrap'), list = $('#pmPlaylist');
    if (!wrap || !list) return;
    if (!s || s.type !== 'playlist'){ wrap.hidden = true; list.innerHTML = ''; return; }
    wrap.hidden = false;
    list.innerHTML = s.tracks.map((t,i) => `
      <li class="pm-pl-item${i===s.trackIndex?' is-current':''}" data-track="${i}" role="button" tabindex="0">
        <span class="pl-idx" aria-hidden="true">${i+1}</span>
        <span class="pl-meta"><span class="pl-title">${esc(t.title)}</span>${t.artist?` <span class="pl-artist">${esc(t.artist)}</span>`:''}</span>
        <span class="pl-eq" aria-hidden="true"><i></i><i></i><i></i></span>
      </li>`).join('');
  }
  function highlightPlaylist(){
    const s = audioEngine.currentStation;
    if (!s || s.type !== 'playlist') return;
    $$('#pmPlaylist .pm-pl-item').forEach((li,i) => li.classList.toggle('is-current', i === s.trackIndex));
  }

  /* =======================================================
     МОДАЛЬНЫЙ ПЛЕЕР И ПОЛИТИКА
     ======================================================= */
  const playerModal = $('#playerModal');
  const privacyModal = $('#privacyModal');

  function openModal(){
    if (!audioEngine.currentStation) return;
    renderHistory();
    renderPlaylist(audioEngine.currentStation);
    if (typeof playerModal.showModal === 'function') playerModal.showModal();
    else playerModal.setAttribute('open','');
    modalOpen = true; startViz();
  }
  function closeModal(){ playerModal.close ? playerModal.close() : playerModal.removeAttribute('open'); }
  playerModal.addEventListener('close', () => { modalOpen = false; });
  $('#pmClose').addEventListener('click', closeModal);

  function openPrivacy(){ if (typeof privacyModal.showModal === 'function') privacyModal.showModal(); else privacyModal.setAttribute('open',''); }
  $('#privacyClose').addEventListener('click', () => privacyModal.close ? privacyModal.close() : privacyModal.removeAttribute('open'));
  $$('[data-open-privacy]').forEach(b => b.addEventListener('click', openPrivacy));

  // share
  $('#pmShare').addEventListener('click', async () => {
    const s = audioEngine.currentStation; if (!s) return;
    const url = location.origin + location.pathname + '#st-' + s.id;
    try { await navigator.clipboard.writeText(url); toast('Ссылка на станцию скопирована'); }
    catch(_) { toast(url); }
  });

  function toast(msg){
    const el = $('#liveToast'); el.textContent = '';
    requestAnimationFrame(() => { el.textContent = msg; });
    showFlash(msg);
  }
  let flashEl = null, flashTimer = null;
  function showFlash(msg){
    if (!flashEl){
      flashEl = document.createElement('div'); flashEl.className = 'ew-flash';
      flashEl.style.cssText = 'position:fixed;left:50%;bottom:calc(var(--player-h) + 16px);transform:translateX(-50%);z-index:300;background:var(--text);color:var(--bg);padding:.6rem 1rem;border-radius:10px;font-size:.85rem;box-shadow:var(--shadow-md);opacity:0;transition:opacity .25s,transform .25s;max-width:90vw;text-align:center;pointer-events:none';
      document.body.appendChild(flashEl);
    }
    flashEl.textContent = msg;
    requestAnimationFrame(() => { flashEl.style.opacity='1'; flashEl.style.transform='translateX(-50%) translateY(-6px)'; });
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => { flashEl.style.opacity='0'; flashEl.style.transform='translateX(-50%)'; }, 2600);
  }

  /* =======================================================
     ТЕМА
     ======================================================= */
  function currentTheme(){
    const explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    $('#themeToggle').setAttribute('aria-pressed', String(t === 'dark'));
    refreshAccent();
    persist(SK.theme, t);
  }
  $('#themeToggle').addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!['dark','light'].includes(document.documentElement.getAttribute('data-theme'))) refreshAccent();
  });

  /* =======================================================
     НАВИГАЦИЯ (мобильное меню)
     ======================================================= */
  const nav = $('#mainNav'), navToggle = $('#navToggle');
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('is-open'); navToggle.setAttribute('aria-expanded','false'); } });

  /* =======================================================
     SCROLL-REVEAL
     ======================================================= */
  function initReveal(){
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(e => e.classList.add('in-view')); return; }
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in-view'); o.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(e => obs.observe(e));
  }

  /* =======================================================
     HERO — осциллограф на canvas
     ======================================================= */
  function initHero(){
    const canvas = $('#heroCanvas');
    let raf = null, t = 0, visible = true;
    function resize(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth*dpr);
      canvas.height = Math.round(canvas.clientHeight*dpr);
      const ctx = canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function frame(){
      const ctx = canvas.getContext('2d');
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0,0,w,h);
      const waves = [
        { amp: h*0.16, freq: 0.012, speed: 0.018, y: h*0.5,  alpha: 0.55, lw: 2 },
        { amp: h*0.10, freq: 0.02,  speed: -0.026, y: h*0.55, alpha: 0.3,  lw: 1.5 },
        { amp: h*0.22, freq: 0.008, speed: 0.012, y: h*0.45, alpha: 0.18, lw: 1 },
      ];
      ctx.strokeStyle = accentColor;
      waves.forEach(wv => {
        ctx.globalAlpha = wv.alpha; ctx.lineWidth = wv.lw;
        ctx.beginPath();
        for (let x=0; x<=w; x+=4){
          const env = Math.sin(x*0.0016 + t*0.01);           // огибающая
          const y = wv.y + Math.sin(x*wv.freq + t*wv.speed) * wv.amp * env;
          x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      t += 1;
      raf = requestAnimationFrame(frame);
    }
    function start(){ if (raf==null && visible && !reduceMotion) frame(); }
    function stop(){ if (raf!=null){ cancelAnimationFrame(raf); raf=null; } }
    resize();
    window.addEventListener('resize', debounce(() => { resize(); }, 200));
    if ('IntersectionObserver' in window){
      new IntersectionObserver(es => { visible = es[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0 })
        .observe(canvas);
    }
    if (reduceMotion){ // статичный кадр
      resize(); const ctx = canvas.getContext('2d'); const w=canvas.clientWidth,h=canvas.clientHeight;
      ctx.strokeStyle=accentColor; ctx.globalAlpha=0.4; ctx.beginPath();
      for(let x=0;x<=w;x+=4){ const y=h*0.5+Math.sin(x*0.012)*h*0.12; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);} ctx.stroke();
    } else start();
  }

  /* =======================================================
     ПРИВЯЗКА УПРАВЛЕНИЯ
     ======================================================= */
  function wireControls(){
    $('#mpPlay').addEventListener('click', togglePlay);
    $('#pmPlay').addEventListener('click', togglePlay);
    $('#mpPrev').addEventListener('click', () => stepStation(-1));
    $('#mpNext').addEventListener('click', () => stepStation(1));
    $('#pmPrevTrack').addEventListener('click', () => stepTrack(-1));   // плейлист: трек; стрим: станция
    $('#pmNextStation').addEventListener('click', () => stepTrack(1));
    $('#pmPlaylist').addEventListener('click', e => {
      const li = e.target.closest('[data-track]'); if (li) playTrackIndex(+li.dataset.track);
    });
    $('#pmPlaylist').addEventListener('keydown', e => {
      const li = e.target.closest('[data-track]');
      if (li && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); playTrackIndex(+li.dataset.track); }
    });
    $('#mpCover').addEventListener('click', openModal);
    $('#mpStation').addEventListener('click', openModal);
    $('#mpExpand').addEventListener('click', openModal);
    $('#mpVolume').addEventListener('input', e => setVolume(e.target.value/100));
    $('#pmVolume').addEventListener('input', e => setVolume(e.target.value/100));

    // поиск с дебаунсом 300мс
    const onSearch = debounce(val => { searchTerm = val.trim().toLowerCase(); applyFilter(); }, 300);
    $('#stationSearch').addEventListener('input', e => onSearch(e.target.value));

    // избранное / только онлайн / сортировка
    $('#favToggle').addEventListener('click', () => {
      favoritesOnly = !favoritesOnly;
      $('#favToggle').setAttribute('aria-pressed', String(favoritesOnly));
      applyFilter();
    });
    $('#onlineToggle').addEventListener('click', () => {
      onlineOnly = !onlineOnly;
      $('#onlineToggle').setAttribute('aria-pressed', String(onlineOnly));
      if (onlineOnly) STATIONS.forEach(s => queueStatusCheck(s.id));   // проверить все станции
      applyFilter();
    });
    $('#sortSelect').addEventListener('change', e => { sortMode = e.target.value; sortStations(); });
    $('#pmFav').addEventListener('click', () => { const s = audioEngine.currentStation; if (s) toggleFavorite(s.id); });

    // запомнить настройки (opt-in localStorage)
    $('#rememberToggle').addEventListener('change', e => setPersist(e.target.checked));

    $('#heroPlay').addEventListener('click', () => {
      $('#stations').scrollIntoView({ behavior:'smooth', block:'start' });
      const list = getPlaylist();
      const first = list.find(s => s.secure || location.protocol !== 'https:') || list[0];
      if (first) selectStation(first.id, true);
    });

    // клавиатура: пробел — play/pause (только когда станция уже выбрана и фокус не на интерактиве)
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' && audioEngine.currentStation &&
          !/INPUT|TEXTAREA|BUTTON|A|SELECT/.test(document.activeElement.tagName)) {
        e.preventDefault(); togglePlay();
      }
    });
  }

  /* =======================================================
     MEDIA SESSION (экран блокировки / аппаратные кнопки)
     ======================================================= */
  function setupMediaSession(){
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    const set = (act, fn) => { try { ms.setActionHandler(act, fn); } catch(_){} };
    set('play',  () => { if (!audioEngine.isPlaying) togglePlay(); });
    set('pause', () => { if (audioEngine.isPlaying) togglePlay(); });
    set('previoustrack', () => stepTrack(-1));   // плейлист → трек, иначе → станция
    set('nexttrack',     () => stepTrack(1));
    set('stop', () => { audioEngine.userPaused = true; clearReconnect(); audioEngine.audio.pause(); });
  }
  function updateMediaSession(){
    if (!('mediaSession' in navigator)) return;
    const s = audioEngine.currentStation; if (!s) return;
    try {
      const track = s.track || '';
      if (typeof window.MediaMetadata === 'function') {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: track || s.name,
          artist: track ? s.name : s.genre,
          album: 'ElectroWave Radio',
          artwork: s.icon ? [96,128,256,512].map(sz => ({ src: s.icon, sizes: `${sz}x${sz}`, type: 'image/png' })) : []
        });
      }
      navigator.mediaSession.playbackState = audioEngine.isPlaying ? 'playing' : 'paused';
    } catch(_){}
  }

  /* =======================================================
     ИЗБРАННОЕ
     ======================================================= */
  function toggleFavorite(id){
    if (!stationById[id]) return;
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    persist(SK.favorites, JSON.stringify([...favorites]));
    reflectFavButtons();
    if (favoritesOnly) applyFilter();
  }
  function reflectFavButtons(){
    $$('#stationsGrid [data-fav]').forEach(b => {
      const on = favorites.has(b.dataset.fav);
      b.classList.toggle('is-fav', on);
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? 'Убрать из избранного' : 'Добавить в избранное');
    });
    const pf = $('#pmFav'), cur = audioEngine.currentStation;
    if (pf){
      const on = !!(cur && favorites.has(cur.id));
      pf.classList.toggle('is-fav', on);
      pf.setAttribute('aria-pressed', String(on));
      pf.setAttribute('aria-label', on ? 'Убрать из избранного' : 'Добавить в избранное');
    }
  }

  /* =======================================================
     СОРТИРОВКА
     ======================================================= */
  function sortStations(){
    const grid = $('#stationsGrid'); if (!grid) return;
    let order;
    if (sortMode === 'az') order = [...STATIONS].sort((x,y) => x.name.localeCompare(y.name, 'ru'));
    else if (sortMode === 'genre') order = [...STATIONS].sort((x,y) => x.genre.localeCompare(y.genre, 'ru') || x.name.localeCompare(y.name, 'ru'));
    else if (sortMode === 'online') {
      const rank = { online:0, checking:1, idle:2, offline:3 };
      order = [...STATIONS].map((s,i) => ({s,i})).sort((p,q) => (rank[p.s.status] ?? 2) - (rank[q.s.status] ?? 2) || p.i - q.i).map(o => o.s);
    } else order = STATIONS;
    const frag = document.createDocumentFragment();
    order.forEach(s => { const c = document.getElementById('st-'+s.id); if (c) frag.appendChild(c); });
    grid.appendChild(frag);
  }
  let _sortTimer = null;
  function scheduleSort(){ clearTimeout(_sortTimer); _sortTimer = setTimeout(sortStations, 250); }

  /* =======================================================
     ЛОГОТИПЫ СТАНЦИЙ
     ======================================================= */
  function ensureIconImg(container, s){
    if (!s.icon || $('.station-icon', container)) return;
    const img = new Image();
    img.className = 'station-icon'; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.referrerPolicy = 'no-referrer';
    img.addEventListener('load', () => container.classList.add('has-icon'));
    img.addEventListener('error', () => { img.remove(); });
    img.src = s.icon;
    container.appendChild(img);
  }
  function applyIcon(s){
    if (!s.icon) return;
    const card = document.getElementById('st-'+s.id);
    if (card){ const mono = $('.sc-monogram', card); if (mono) ensureIconImg(mono, s); }
    if (audioEngine.currentStation && audioEngine.currentStation.id === s.id) setCoverIcon($('#mpCover'), s);
  }
  function setCoverIcon(coverEl, s){
    if (!coverEl) return;
    const existing = $('.station-icon', coverEl);
    if (existing) existing.remove();
    coverEl.classList.remove('has-icon');
    if (s && s.icon) ensureIconImg(coverEl, s);
  }

  /* =======================================================
     ИНИЦИАЛИЗАЦИЯ
     ======================================================= */
  function init(){
    loadPersisted();              // opt-in: тема/громкость/избранное (если разрешено)
    refreshAccent();
    renderFilters();
    renderStations();
    renderGenres();
    renderEvents();
    renderTracks();
    renderArtists();
    wireControls();
    initReveal();
    initHero();
    setupMediaSession();
    setVolume(audioEngine.volume);
    applyFilter();                // первичный подсчёт результатов

    // синхронизация состояния органов управления
    $('#themeToggle').setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    $('#rememberToggle').checked = persistEnabled;

    // динамический счётчик станций в hero
    const eyebrow = $('.hero-eyebrow');
    if (eyebrow){
      const n = STATIONS.length;
      eyebrow.innerHTML = `<span class="live-dot" aria-hidden="true"></span> ${n} ${plural(n,'станция','станции','станций')} · только электроника`;
    }

    // свои станции из манифеста (best-effort)
    loadManifest();

    // метаданные текущего трека (best-effort, не блокирует UI)
    pollNowPlaying();
    setInterval(pollNowPlaying, 30000);

    // deep-link на станцию
    if (location.hash.startsWith('#st-')){
      const s = stationById[location.hash.slice(4)];
      if (s){ const c = document.getElementById('st-'+s.id); if (c) c.scrollIntoView({ block:'center' }); }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
