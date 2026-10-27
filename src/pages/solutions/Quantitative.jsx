import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ClipboardList, ClipboardPenLine, ChartSpline } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import heroImage from '../../assets/home/crosswalk.jpg';
import QuantitativePlans from './QuantitativePlans';
import './Quantitative.css';

/* 解决方案 · 定量研究 —— 2026-10-27。

   首屏按业主给的参考稿：左边眉标 + 56 大字 + 一段小字 + 邮箱框 + 按钮，
   右边一张图；下面三段是商定的梯子（自助与代投 / 定制问卷 / 品牌追踪），
   案头研究按业主的话砍掉。
   文案来源：
     · 眉标、大字、小字 = 业主 2026-10-27 亲口给的
     · 三段的正文 = 上一轮我写的，等业主改
   图片是占位（home/crosswalk.jpg），业主给了自己的图就换这一行。 */

const copy = {
  'en-US': {
    eyebrow: 'Choose the quantitative track that fits you',
    statement: ['Gather the evidence, then decide. Ask the right question, reach the right sample, and the data reads as a decision.'],
    title: 'Every decision, backed by evidence.',
    lede: 'From a self-serve research platform, to a comprehensive survey run with our researchers, to an expert-led custom study — we fit the format to your needs and your budget.',
    placeholder: 'Your work email',
    submit: 'Book a demo',
    note: 'After you submit, you will receive news, tips and events from GuanyiSearch. Read our',
    privacy: 'privacy policy',
    noteEnd: 'You can unsubscribe at any time.',
    plansLink: 'See plans and pricing',
    done: 'Received. We will be in touch shortly.',
    error: 'Could not send. Please try again.',
    sections: [
      {
        id: 'self-serve', icon: 'ClipboardList', kicker: '01 · Self-serve and fielding',
        title: 'You write the questionnaire. We field it.',
        body: 'Send the questionnaire and the audience definition; we put it to the community and hand back the data. Preliminary data within 48 hours, and the report is ours to write too.',
        points: ['Preliminary data in 48 hours', 'Community sample, not bought traffic', 'The report comes from us'],
      },
      {
        id: 'custom', icon: 'ClipboardPenLine', kicker: '02 · Custom survey',
        title: 'The questionnaire is designed around the decision.',
        body: 'Agree what has to be answered first, then the audience, the cities and the questions. Design, fieldwork and the report are one piece of work.',
        points: ['Questions follow from the decision', 'Sample and quality control in one plan', 'A report the team can use directly'],
      },
      {
        id: 'tracker', icon: 'ChartSpline', kicker: '03 · Brand tracker',
        title: 'A fixed questionnaire, run in waves.',
        body: 'Awareness, consideration, usage and advertising recall, on the same questions at a fixed interval. What you read is the trend between waves; not a daily index, and no sector benchmarks.',
        points: ['Waves by month or by quarter', 'Same questions, so the trend holds', 'Custom to your category, not a syndicated index'],
      },
    ],
    closing: ['Tell us what you have in mind,', 'and we will work out the next step together.'],
    free: 'Start for free',
    action: 'Contact sales',
  },
  'en-GB': {
    eyebrow: 'Choose the quantitative track that fits you',
    statement: ['Gather the evidence, then decide. Ask the right question, reach the right sample, and the data reads as a decision.'],
    title: 'Every decision, backed by evidence.',
    lede: 'From a self-serve research platform, to a comprehensive survey run with our researchers, to an expert-led custom study — we fit the format to your needs and your budget.',
    placeholder: 'Your work email',
    submit: 'Book a demo',
    note: 'After you submit, you will receive news, tips and events from GuanyiSearch. Read our',
    privacy: 'privacy policy',
    noteEnd: 'You can unsubscribe at any time.',
    plansLink: 'See plans and pricing',
    done: 'Received. We will be in touch shortly.',
    error: 'Could not send. Please try again.',
    sections: [
      {
        id: 'self-serve', icon: 'ClipboardList', kicker: '01 · Self-serve and fielding',
        title: 'You write the questionnaire. We field it.',
        body: 'Send the questionnaire and the audience definition; we put it to the community and hand back the data. Preliminary data within 48 hours, and the report is ours to write too.',
        points: ['Preliminary data in 48 hours', 'Community sample, not bought traffic', 'The report comes from us'],
      },
      {
        id: 'custom', icon: 'ClipboardPenLine', kicker: '02 · Custom survey',
        title: 'The questionnaire is designed around the decision.',
        body: 'Agree what has to be answered first, then the audience, the cities and the questions. Design, fieldwork and the report are one piece of work.',
        points: ['Questions follow from the decision', 'Sample and quality control in one plan', 'A report the team can use directly'],
      },
      {
        id: 'tracker', icon: 'ChartSpline', kicker: '03 · Brand tracker',
        title: 'A fixed questionnaire, run in waves.',
        body: 'Awareness, consideration, usage and advertising recall, on the same questions at a fixed interval. What you read is the trend between waves; not a daily index, and no sector benchmarks.',
        points: ['Waves by month or by quarter', 'Same questions, so the trend holds', 'Custom to your category, not a syndicated index'],
      },
    ],
    closing: ['Tell us what you have in mind,', 'and we will work out the next step together.'],
    free: 'Start for free',
    action: 'Contact sales',
  },
  'zh-CN': {
    eyebrow: '选择专属于您的定量研究方案',
    statement: ['聚数成据，据以决断。把问题问对，把样本找对，把数据读成一份能上会的判断。'],
    title: '让每一次决策都有事实依据。',
    lede: '从自助式调研平台，到与研究人员协作开展的综合调查，再到专家主导的定制项目，我们按您的需求和预算来配。',
    placeholder: '输入公司邮箱',
    submit: '预约演示',
    note: '提交后，你会收到来自 GuanyiSearch 的资讯、技巧与活动。了解详情请参阅',
    privacy: '隐私政策',
    noteEnd: '你可以随时退订。',
    plansLink: '查看方案与价格',
    done: '已收到，我们会尽快联系你。',
    error: '提交失败，请稍后再试。',
    sections: [
      {
        id: 'self-serve', icon: 'ClipboardList', kicker: '01 · 自助与代投',
        title: '问卷你自己出，样本我们来投。',
        body: '把问卷和人群条件发过来，我们投到社群，把数据交回去。初步数据最快 48 小时；报告也由我们出，定价跟定制一样。',
        points: ['最快 48 小时看到初步数据', '样本来自社群，不是买来的流量', '报告同样由我们写'],
      },
      {
        id: 'custom', icon: 'ClipboardPenLine', kicker: '02 · 定制问卷',
        title: '问卷按那个决定来设计。',
        body: '先确认要回答什么，再定人群、城市和题目。设计、执行和报告是一件事，不拆开卖。',
        points: ['题目从决定倒推', '样本和质检在同一份方案里定', '交回能直接上会的报告'],
      },
      {
        id: 'tracker', icon: 'ChartSpline', kicker: '03 · 品牌追踪',
        title: '固定题组，按波次跑。',
        body: '认知、考虑、使用与广告认知，同一套题、固定间隔反复测。看的是波次之间的趋势；不是日更指数，也不做行业基准。',
        points: ['按月或按季度开波次', '题不变，趋势才可比', '按你的品类定制，不做行业指数'],
      },
    ],
    closing: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
    free: '免费开始',
    action: '联系销售',
  },
  "de": {
  "eyebrow": "Wählen Sie den passenden quantitativen Ansatz.",
  "statement": [
    "Erst die Belege sammeln, dann entscheiden. Die richtige Frage stellen, die richtige Stichprobe erreichen, und die Daten werden zur Entscheidungsgrundlage."
  ],
  "title": "Jede Entscheidung mit Belegen.",
  "lede": "Von einer Self-Service-Plattform für Forschung über eine umfassende Umfrage mit unserem Forschungsteam bis hin zu einer individuellen Studie unter fachlicher Leitung: Wir richten das Format an Ihrem Bedarf und Ihrem Budget aus.",
  "placeholder": "Geschäftliche E-Mail-Adresse",
  "submit": "Demo buchen",
  "note": "Nach dem Absenden erhalten Sie Neuigkeiten, Tipps und Veranstaltungen von GuanyiSearch. Lesen Sie unsere",
  "privacy": "Datenschutzrichtlinie",
  "noteEnd": "Sie können sich jederzeit abmelden.",
  "plansLink": "Pläne und Preise ansehen",
  "done": "Ihre Anfrage ist eingegangen. Wir melden uns in Kürze.",
  "error": "Senden fehlgeschlagen. Bitte versuchen Sie es erneut.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Self-Service und Feldarbeit",
      "title": "Sie schreiben den Fragebogen. Wir übernehmen die Feldarbeit.",
      "body": "Sie senden den Fragebogen und die Definition der Zielgruppe; wir legen beides der Community vor und liefern die Daten zurück. Vorläufige Daten innerhalb von 48 Stunden; auch den Bericht schreiben wir.",
      "points": [
        "Vorläufige Daten in 48 Stunden",
        "Stichprobe aus der Community, kein eingekaufter Traffic",
        "Der Bericht kommt von uns"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Maßgeschneiderte Umfrage",
      "title": "Der Fragebogen richtet sich nach der Entscheidung.",
      "body": "Zuerst wird festgelegt, was beantwortet werden muss, dann die Zielgruppe, die Städte und die Fragen. Konzeption, Feldarbeit und Bericht sind eine Leistung.",
      "points": [
        "Die Fragen ergeben sich aus der Entscheidung",
        "Stichprobe und Qualitätskontrolle in einem Plan",
        "Ein Bericht, den das Team direkt nutzen kann"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Markentracking",
      "title": "Ein fester Fragebogen, in Wellen erhoben.",
      "body": "Bekanntheit, Abwägung, Nutzung und Werbeerinnerung, mit denselben Fragen in festem Abstand. Ausgewertet wird der Trend zwischen den Wellen; kein Tagesindex und keine Branchenbenchmarks.",
      "points": [
        "Wellen monatlich oder quartalsweise",
        "Gleiche Fragen, damit der Trend vergleichbar bleibt",
        "Auf Ihre Kategorie zugeschnitten, kein syndizierter Index"
      ]
    }
  ],
  "closing": [
    "Sagen Sie uns, was Sie vorhaben,",
    "und wir klären gemeinsam den nächsten Schritt."
  ],
  "free": "Kostenlos starten",
  "action": "Vertrieb kontaktieren"
},
  "fr": {
  "eyebrow": "Choisissez le parcours quantitatif qui vous convient.",
  "statement": [
    "Rassembler les preuves, puis décider. Poser la bonne question, atteindre le bon échantillon, et les données se traduisent en décision."
  ],
  "title": "Chaque décision, appuyée par des preuves.",
  "lede": "D’une plateforme de recherche en libre-service à une enquête complète menée avec nos chercheurs, puis à une étude sur mesure pilotée par des experts, nous adaptons le format à vos besoins et à votre budget.",
  "placeholder": "Votre e-mail professionnel",
  "submit": "Demander une démo",
  "note": "Après l’envoi, vous recevrez des actualités, des conseils et des événements de GuanyiSearch. Consultez notre",
  "privacy": "politique de confidentialité",
  "noteEnd": "Vous pouvez vous désabonner à tout moment.",
  "plansLink": "Voir les offres et les tarifs",
  "done": "Bien reçu. Nous vous contacterons prochainement.",
  "error": "L’envoi a échoué. Veuillez réessayer.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Libre-service et terrain",
      "title": "Vous rédigez le questionnaire. Nous prenons en charge le terrain.",
      "body": "Vous nous envoyez le questionnaire et la définition de l’audience ; nous le soumettons à la communauté et vous rendons les données. Données préliminaires sous 48 heures ; le rapport est également rédigé par nos soins.",
      "points": [
        "Données préliminaires sous 48 heures",
        "Échantillon issu de la communauté, pas de trafic acheté",
        "Le rapport est rédigé par nos soins"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Enquête sur mesure",
      "title": "Le questionnaire est conçu à partir de la décision.",
      "body": "On définit d’abord ce qui doit être répondu, puis l’audience, les villes et les questions. Conception, terrain et rapport forment un seul travail.",
      "points": [
        "Les questions découlent de la décision",
        "Échantillon et contrôle qualité dans un seul plan",
        "Un rapport directement utilisable par l’équipe"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Suivi de marque",
      "title": "Un questionnaire fixe, administré par vagues.",
      "body": "Notoriété, considération, usage et mémorisation publicitaire, avec les mêmes questions à intervalle fixe. L’analyse porte sur la tendance entre les vagues ; pas d’indice quotidien, et pas de référence sectorielle.",
      "points": [
        "Vagues mensuelles ou trimestrielles",
        "Les mêmes questions, pour une tendance comparable",
        "Adapté à votre catégorie, pas un indice syndiqué"
      ]
    }
  ],
  "closing": [
    "Dites-nous ce que vous envisagez,",
    "et nous définirons ensemble la prochaine étape."
  ],
  "free": "Commencer gratuitement",
  "action": "Contacter le service commercial"
},
  "nl": {
  "eyebrow": "Kies het kwantitatieve traject dat bij u past.",
  "statement": [
    "Eerst bewijs verzamelen, dan beslissen. Stel de juiste vraag, bereik de juiste steekproef, en de data leiden tot een beslissing."
  ],
  "title": "Elke beslissing, onderbouwd met bewijs.",
  "lede": "Van een selfserviceplatform voor onderzoek, via een uitgebreide enquête met onze onderzoekers, tot een onderzoek op maat onder leiding van experts: wij stemmen de vorm af op uw behoefte en uw budget.",
  "placeholder": "Uw zakelijke e-mailadres",
  "submit": "Demo aanvragen",
  "note": "Na verzending ontvangt u nieuws, tips en evenementen van GuanyiSearch. Lees ons",
  "privacy": "privacybeleid",
  "noteEnd": "U kunt zich op elk moment afmelden.",
  "plansLink": "Bekijk plannen en prijzen",
  "done": "Ontvangen. We nemen snel contact met u op.",
  "error": "Verzenden is niet gelukt. Probeer het opnieuw.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Selfservice en veldwerk",
      "title": "U schrijft de vragenlijst. Wij doen het veldwerk.",
      "body": "U stuurt de vragenlijst en de definitie van de doelgroep; wij leggen beide voor aan de community en leveren de data terug. Voorlopige data binnen 48 uur; ook het rapport schrijven wij.",
      "points": [
        "Voorlopige data binnen 48 uur",
        "Steekproef uit de community, geen ingekocht verkeer",
        "Het rapport komt van ons"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Enquête op maat",
      "title": "De vragenlijst wordt rond de beslissing opgezet.",
      "body": "Eerst wordt vastgelegd wat beantwoord moet worden, daarna de doelgroep, de steden en de vragen. Ontwerp, veldwerk en rapport zijn één opdracht.",
      "points": [
        "De vragen volgen uit de beslissing",
        "Steekproef en kwaliteitscontrole in één plan",
        "Een rapport dat het team direct kan gebruiken"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Merktracking",
      "title": "Een vaste vragenlijst, in golven afgenomen.",
      "body": "Bekendheid, overweging, gebruik en reclameherinnering, met dezelfde vragen op een vast interval. Wat u leest is de trend tussen de golven; geen dagelijkse index en geen sectorbenchmarks.",
      "points": [
        "Golven per maand of per kwartaal",
        "Dezelfde vragen, zodat de trend vergelijkbaar blijft",
        "Op maat voor uw categorie, geen gesyndiceerde index"
      ]
    }
  ],
  "closing": [
    "Vertel ons wat u in gedachten hebt,",
    "en we bepalen samen de volgende stap."
  ],
  "free": "Gratis starten",
  "action": "Contact met verkoop"
},
  "da": {
  "eyebrow": "Vælg det kvantitative spor, der passer til dig.",
  "statement": [
    "Indsaml evidensen, og træf derefter beslutningen. Stil det rigtige spørgsmål, find den rigtige stikprøve, og dataene bliver til en beslutning."
  ],
  "title": "Hver beslutning understøttet af evidens.",
  "lede": "Fra selvbetjent undersøgelsesplatform over en omfattende undersøgelse med vores forskere til et skræddersyet studie ledet af eksperter: vi tilpasser formatet til dit behov og dit budget.",
  "placeholder": "Din arbejds-e-mail",
  "submit": "Book en demo",
  "note": "Når du har sendt, modtager du nyheder, tips og arrangementer fra GuanyiSearch. Læs vores",
  "privacy": "privatlivspolitik",
  "noteEnd": "Du kan altid afmelde dig.",
  "plansLink": "Se planer og priser",
  "done": "Modtaget. Vi kontakter dig snart.",
  "error": "Kunne ikke sende. Prøv igen.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Selvbetjening og feltarbejde",
      "title": "Du skriver spørgeskemaet. Vi står for feltarbejdet.",
      "body": "Du sender spørgeskemaet og definitionen af målgruppen; vi sender det ud til fællesskabet og leverer dataene tilbage. Foreløbige data inden for 48 timer; rapporten skriver vi også.",
      "points": [
        "Foreløbige data inden for 48 timer",
        "Stikprøve fra fællesskabet, ikke købt trafik",
        "Rapporten kommer fra os"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Skræddersyet undersøgelse",
      "title": "Spørgeskemaet bygges op omkring beslutningen.",
      "body": "Først fastlægges det, der skal svares på, derefter målgruppen, byerne og spørgsmålene. Design, feltarbejde og rapport er én opgave.",
      "points": [
        "Spørgsmålene følger af beslutningen",
        "Stikprøve og kvalitetskontrol i én plan",
        "En rapport, som teamet kan bruge direkte"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Brandtracking",
      "title": "Et fast spørgeskema, gennemført i bølger.",
      "body": "Kendskab, overvejelse, brug og reklameerindring, med de samme spørgsmål i et fast interval. Det, du aflæser, er tendensen mellem bølgerne; ikke et dagligt indeks, og ingen branchebenchmarks.",
      "points": [
        "Bølger pr. måned eller pr. kvartal",
        "De samme spørgsmål, så tendensen kan sammenlignes",
        "Tilpasset din kategori, ikke et syndikeret indeks"
      ]
    }
  ],
  "closing": [
    "Fortæl os, hvad du har i tankerne,",
    "så finder vi næste skridt sammen."
  ],
  "free": "Start gratis",
  "action": "Kontakt salg"
},
  "es": {
  "eyebrow": "Elige el enfoque cuantitativo que encaja contigo.",
  "statement": [
    "Reunir las pruebas y después decidir. Haz la pregunta correcta, llega a la muestra correcta y los datos se convierten en una decisión."
  ],
  "title": "Cada decisión, respaldada por pruebas.",
  "lede": "Ya sea una plataforma de investigación de autoservicio, una encuesta completa realizada con nuestros investigadores o un estudio a medida dirigido por expertos, adaptamos el formato a tus necesidades y a tu presupuesto.",
  "placeholder": "Tu correo electrónico de trabajo",
  "submit": "Solicitar una demo",
  "note": "Después de enviar, recibirás noticias, consejos y eventos de GuanyiSearch. Consulta nuestra",
  "privacy": "política de privacidad",
  "noteEnd": "Puedes darte de baja en cualquier momento.",
  "plansLink": "Ver planes y precios",
  "done": "Recibido. Nos pondremos en contacto en breve.",
  "error": "No se pudo enviar. Vuelve a intentarlo.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Autoservicio y trabajo de campo",
      "title": "Tú escribes el cuestionario. Nosotros hacemos el trabajo de campo.",
      "body": "Envías el cuestionario y la definición del público; los llevamos a la comunidad y te devolvemos los datos. Datos preliminares en 48 horas; el informe también lo escribimos nosotros.",
      "points": [
        "Datos preliminares en 48 horas",
        "Muestra de la comunidad, no tráfico comprado",
        "El informe lo redactamos nosotros"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Encuesta a medida",
      "title": "El cuestionario se diseña en torno a la decisión.",
      "body": "Primero se acuerda qué hay que responder, después el público, las ciudades y las preguntas. Diseño, trabajo de campo e informe son un solo trabajo.",
      "points": [
        "Las preguntas se derivan de la decisión",
        "Muestra y control de calidad en un solo plan",
        "Un informe que el equipo puede usar directamente"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Seguimiento de marca",
      "title": "Un cuestionario fijo, aplicado por oleadas.",
      "body": "Conocimiento, consideración, uso y recuerdo publicitario, con las mismas preguntas a intervalos fijos. Lo que se lee es la tendencia entre oleadas; no un índice diario, y sin referencias del sector.",
      "points": [
        "Oleadas mensuales o trimestrales",
        "Las mismas preguntas, para que la tendencia se mantenga",
        "A medida para tu categoría, no un índice sindicado"
      ]
    }
  ],
  "closing": [
    "Cuéntanos qué tienes en mente,",
    "y definimos juntos el siguiente paso."
  ],
  "free": "Empieza gratis",
  "action": "Contacta con ventas"
},
  "fi": {
  "eyebrow": "Valitse sinulle sopiva kvantitatiivinen polku.",
  "statement": [
    "Kerää todisteet ja päätä sitten. Kysy oikea kysymys, tavoita oikea otos, niin data muuttuu päätökseksi."
  ],
  "title": "Jokainen päätös perustuu todisteisiin.",
  "lede": "Itsepalvelualustasta tutkijoidemme kanssa toteutettavaan laajaan kyselyyn ja edelleen asiantuntijoiden vetämään räätälöityyn tutkimukseen: sovitamme muodon tarpeisiisi ja budjettiisi.",
  "placeholder": "Työsähköpostisi",
  "submit": "Varaa esittely",
  "note": "Lähettämisen jälkeen saat GuanyiSearchilta uutisia, vinkkejä ja tapahtumia. Lue",
  "privacy": "tietosuojaseloste",
  "noteEnd": "Voit peruuttaa tilauksen milloin tahansa.",
  "plansLink": "Katso paketit ja hinnat",
  "done": "Vastaanotettu. Olemme yhteydessä pian.",
  "error": "Lähetys epäonnistui. Yritä uudelleen.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Itsepalvelu ja kenttätyö",
      "title": "Sinä kirjoitat kyselyn. Me teemme kenttätyön.",
      "body": "Lähetä kysely ja kohderyhmän määritelmä; me viemme ne yhteisöön ja palautamme datan. Alustavat tiedot 48 tunnin kuluessa; raportin kirjoitamme myös me.",
      "points": [
        "Alustavat tiedot 48 tunnissa",
        "Otos yhteisöstä, ei ostettua liikennettä",
        "Raportti tulee meiltä"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Räätälöity kysely",
      "title": "Kysely rakennetaan päätöksen ympärille.",
      "body": "Ensin sovitaan, mihin on vastattava, sitten kohderyhmä, kaupungit ja kysymykset. Suunnittelu, kenttätyö ja raportti ovat yksi kokonaisuus.",
      "points": [
        "Kysymykset johdetaan päätöksestä",
        "Otos ja laadunvalvonta samassa suunnitelmassa",
        "Raportti, jota tiimi voi käyttää suoraan"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Brändiseuranta",
      "title": "Kiinteä kysely, toteutettuna aaltoina.",
      "body": "Tunnettuus, harkinta, käyttö ja mainonnan muistaminen samoilla kysymyksillä kiintein väliajoin. Luettava asia on aaltojen välinen trendi; ei päivittäistä indeksiä eikä toimialan vertailukohtia.",
      "points": [
        "Aallot kuukausittain tai neljännesvuosittain",
        "Samat kysymykset, jotta trendi pysyy vertailukelpoisena",
        "Kategoriaasi räätälöity, ei syndikoitu indeksi"
      ]
    }
  ],
  "closing": [
    "Kerro, mitä sinulla on mielessä,",
    "niin mietimme seuraavan askeleen yhdessä."
  ],
  "free": "Aloita ilmaiseksi",
  "action": "Ota yhteyttä myyntiin"
},
  "it": {
  "eyebrow": "Scegli il percorso quantitativo più adatto a te.",
  "statement": [
    "Raccogliere le prove, poi decidere. Fai la domanda giusta, raggiungi il campione giusto e i dati diventano una decisione."
  ],
  "title": "Ogni decisione, sostenuta da prove.",
  "lede": "Da una piattaforma di ricerca self-service a un’indagine completa condotta con i nostri ricercatori, fino a uno studio su misura guidato da esperti: adattiamo il formato alle tue esigenze e al tuo budget.",
  "placeholder": "La tua email di lavoro",
  "submit": "Prenota una demo",
  "note": "Dopo l’invio riceverai notizie, suggerimenti ed eventi da GuanyiSearch. Leggi la nostra",
  "privacy": "informativa sulla privacy",
  "noteEnd": "Puoi annullare l’iscrizione in qualsiasi momento.",
  "plansLink": "Vedi piani e prezzi",
  "done": "Ricevuto. Ti contatteremo a breve.",
  "error": "Invio non riuscito. Riprova.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Self-service e rilevazione",
      "title": "Scrivi tu il questionario. La rilevazione la facciamo noi.",
      "body": "Ci invii il questionario e la definizione del pubblico; lo sottoponiamo alla community e ti restituiamo i dati. Dati preliminari entro 48 ore; anche il rapporto lo scriviamo noi.",
      "points": [
        "Dati preliminari entro 48 ore",
        "Campione dalla community, non traffico acquistato",
        "Il rapporto lo scriviamo noi"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Sondaggio su misura",
      "title": "Il questionario si costruisce intorno alla decisione.",
      "body": "Prima si concorda a cosa bisogna rispondere, poi il pubblico, le città e le domande. Progettazione, rilevazione e rapporto sono un unico lavoro.",
      "points": [
        "Le domande derivano dalla decisione",
        "Campione e controllo qualità in un unico piano",
        "Un rapporto che il team può usare direttamente"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Monitoraggio del brand",
      "title": "Un questionario fisso, somministrato a ondate.",
      "body": "Notorietà, considerazione, uso e ricordo pubblicitario, con le stesse domande a intervalli fissi. Quello che si legge è la tendenza tra le ondate; non un indice giornaliero e nessun benchmark di settore.",
      "points": [
        "Ondate mensili o trimestrali",
        "Le stesse domande, così la tendenza resta confrontabile",
        "Su misura per la tua categoria, non un indice sindacato"
      ]
    }
  ],
  "closing": [
    "Raccontaci cosa hai in mente,",
    "e definiamo insieme il prossimo passo."
  ],
  "free": "Inizia gratis",
  "action": "Contatta il reparto vendite"
},
  "ja": {
  "eyebrow": "目的に合う定量調査の選択",
  "statement": [
    "根拠を集めてから決定します。問いを正しく立て、サンプルを正しく選べば、データは意思決定につながります。"
  ],
  "title": "根拠に基づくすべての意思決定",
  "lede": "セルフサービス型の調査プラットフォームから、研究員と進める包括的な調査、専門家が主導するカスタム調査まで、ご要望とご予算に合わせて形式を決めます。",
  "placeholder": "勤務先のメールアドレス",
  "submit": "デモを予約する",
  "note": "送信後、GuanyiSearch からお知らせ、ヒント、イベント情報をお届けします。詳しくは",
  "privacy": "プライバシーポリシー",
  "noteEnd": "配信はいつでも停止できます。",
  "plansLink": "プランと料金を見る",
  "done": "受け付けました。担当者からすぐにご連絡します。",
  "error": "送信できませんでした。もう一度お試しください。",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · セルフサービスと実査",
      "title": "アンケートは貴社が作成し、実査は当社が行います。",
      "body": "アンケートと対象者の定義をお送りいただければ、当社がコミュニティに配信し、データをお返しします。速報データは48時間以内、レポートの作成も当社が行います。",
      "points": [
        "48時間以内の速報データ",
        "コミュニティのサンプルを使用し、購入したトラフィックは使いません",
        "レポートは当社が作成します"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · カスタム調査",
      "title": "アンケートはその意思決定を中心に設計します。",
      "body": "まず何に答えるかを決め、次に対象者、都市、質問を定めます。設計、実査、レポートは一つの業務です。",
      "points": [
        "質問は意思決定から導きます",
        "サンプルと品質管理を一つの計画にまとめます",
        "チームがそのまま使えるレポート"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · ブランドトラッキング",
      "title": "ウェーブ単位で実施する固定アンケート",
      "body": "認知、検討、利用、広告想起を、同じ質問で一定の間隔ごとに測ります。読むのはウェーブ間のトレンドです。日次の指数は扱わず、業界ベンチマークも行いません。",
      "points": [
        "月次または四半期ごとのウェーブ",
        "同じ質問なので、トレンドを比較できます",
        "カテゴリに合わせて設計し、共通の指数は使いません"
      ]
    }
  ],
  "closing": [
    "ご検討中の内容をお聞かせください。",
    "次のステップを一緒に整理します。"
  ],
  "free": "無料で始める",
  "action": "営業に問い合わせる"
},
  "ko": {
  "eyebrow": "목적에 맞는 정량 조사 선택",
  "statement": [
    "근거를 모은 뒤 결정합니다. 질문을 올바르게 세우고 표본을 올바르게 확보하면 데이터는 결정으로 이어집니다."
  ],
  "title": "근거에 기반한 모든 결정",
  "lede": "셀프서비스 리서치 플랫폼부터 연구진과 함께하는 종합 설문, 전문가가 주도하는 맞춤 조사까지, 필요와 예산에 맞춰 형식을 정합니다.",
  "placeholder": "회사 이메일",
  "submit": "데모 예약",
  "note": "제출하시면 GuanyiSearch에서 소식, 팁, 이벤트 안내를 보내 드립니다. 자세한 내용은",
  "privacy": "개인정보 처리방침",
  "noteEnd": "언제든지 구독을 해지할 수 있습니다.",
  "plansLink": "요금제와 가격 보기",
  "done": "접수되었습니다. 곧 연락드리겠습니다.",
  "error": "전송하지 못했습니다. 다시 시도해 주십시오.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · 셀프서비스와 실사",
      "title": "설문지는 귀사가 작성하고, 실사는 저희가 진행합니다.",
      "body": "설문지와 대상자 정의를 보내 주시면 저희가 커뮤니티에 배포하고 데이터를 돌려드립니다. 잠정 데이터는 48시간 이내에 제공하며, 보고서 작성도 저희가 맡습니다.",
      "points": [
        "48시간 이내 잠정 데이터",
        "커뮤니티 표본을 사용하며, 구매한 트래픽은 사용하지 않습니다",
        "보고서는 저희가 작성합니다"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · 맞춤 설문",
      "title": "설문지는 그 결정을 중심으로 설계합니다.",
      "body": "먼저 무엇에 답해야 하는지 정하고, 이어서 대상자, 도시, 질문을 정합니다. 설계, 실사, 보고서는 하나의 작업입니다.",
      "points": [
        "질문은 결정에서 도출합니다",
        "표본과 품질 관리를 하나의 계획으로 정리합니다",
        "팀이 바로 사용할 수 있는 보고서"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · 브랜드 트래킹",
      "title": "고정된 설문지를 웨이브 단위로 실시합니다.",
      "body": "인지도, 고려, 사용, 광고 회상을 동일한 질문으로 일정한 간격에 측정합니다. 확인하는 것은 웨이브 간의 추세입니다. 일별 지수는 다루지 않으며, 업종 벤치마크도 제공하지 않습니다.",
      "points": [
        "월별 또는 분기별 웨이브",
        "같은 질문이므로 추세를 비교할 수 있습니다",
        "카테고리에 맞춰 설계하며, 공통 지수는 사용하지 않습니다"
      ]
    }
  ],
  "closing": [
    "하고 싶은 내용을 알려 주십시오.",
    "다음 단계를 함께 정리하겠습니다."
  ],
  "free": "무료로 시작하기",
  "action": "영업팀에 문의"
},
  "no": {
  "eyebrow": "Velg det kvantitative sporet som passer deg.",
  "statement": [
    "Samle bevisene, og bestem deretter. Still det riktige spørsmålet, nå det riktige utvalget, og dataene blir en beslutning."
  ],
  "title": "Hver beslutning, støttet av bevis.",
  "lede": "Fra en selvbetjeningsplattform for undersøkelser, via en omfattende undersøkelse med våre forskere, til en skreddersydd studie ledet av eksperter: vi tilpasser formatet til behovet og budsjettet ditt.",
  "placeholder": "Jobb-e-posten din",
  "submit": "Book en demo",
  "note": "Når du har sendt inn, mottar du nyheter, tips og arrangementer fra GuanyiSearch. Les vår",
  "privacy": "personvernerklæring",
  "noteEnd": "Du kan melde deg av når som helst.",
  "plansLink": "Se planer og priser",
  "done": "Mottatt. Vi tar kontakt snart.",
  "error": "Kunne ikke sende. Prøv igjen.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Selvbetjening og feltarbeid",
      "title": "Du skriver spørreskjemaet. Vi gjennomfører feltarbeidet.",
      "body": "Du sender spørreskjemaet og definisjonen av målgruppen; vi legger det ut i fellesskapet og leverer dataene tilbake. Foreløpige data innen 48 timer; rapporten skriver vi også.",
      "points": [
        "Foreløpige data innen 48 timer",
        "Utvalg fra fellesskapet, ikke kjøpt trafikk",
        "Rapporten kommer fra oss"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Skreddersydd undersøkelse",
      "title": "Spørreskjemaet bygges rundt beslutningen.",
      "body": "Først avklares det som skal besvares, deretter målgruppen, byene og spørsmålene. Design, feltarbeid og rapport er én oppgave.",
      "points": [
        "Spørsmålene følger av beslutningen",
        "Utvalg og kvalitetskontroll i én plan",
        "En rapport teamet kan bruke direkte"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Merkevaretracking",
      "title": "Et fast spørreskjema, gjennomført i bølger.",
      "body": "Kjennskap, vurdering, bruk og reklameerindring, med de samme spørsmålene i et fast intervall. Det du leser, er trenden mellom bølgene; ikke en daglig indeks, og ingen bransjebenchmarks.",
      "points": [
        "Bølger per måned eller per kvartal",
        "De samme spørsmålene, slik at trenden holder",
        "Tilpasset kategorien din, ikke en syndikert indeks"
      ]
    }
  ],
  "closing": [
    "Fortell oss hva du har i tankene,",
    "så finner vi neste steg sammen."
  ],
  "free": "Start gratis",
  "action": "Kontakt salg"
},
  "pt": {
  "eyebrow": "Escolha o percurso quantitativo à sua medida.",
  "statement": [
    "Reunir as provas e depois decidir. Faça a pergunta certa, chegue à amostra certa e os dados transformam-se numa decisão."
  ],
  "title": "Cada decisão, sustentada por provas.",
  "lede": "Uma plataforma de investigação em autosserviço, um inquérito completo realizado com os nossos investigadores ou um estudo à medida conduzido por especialistas: ajustamos o formato às suas necessidades e ao seu orçamento.",
  "placeholder": "O seu e-mail profissional",
  "submit": "Marcar uma demo",
  "note": "Após o envio, receberá notícias, dicas e eventos da GuanyiSearch. Consulte a nossa",
  "privacy": "política de privacidade",
  "noteEnd": "Pode cancelar a subscrição a qualquer momento.",
  "plansLink": "Ver planos e preços",
  "done": "Recebido. Entraremos em contacto em breve.",
  "error": "Não foi possível enviar. Tente novamente.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Autosserviço e trabalho de campo",
      "title": "O questionário é seu; o trabalho de campo é nosso.",
      "body": "Envie o questionário e a definição do público; nós levamos ambos à comunidade e devolvemos os dados. Dados preliminares em 48 horas; o relatório também é escrito por nós.",
      "points": [
        "Dados preliminares em 48 horas",
        "Amostra da comunidade, sem tráfego comprado",
        "O relatório é escrito por nós"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Inquérito à medida",
      "title": "O questionário é concebido em torno da decisão.",
      "body": "Primeiro define-se o que tem de ser respondido, depois o público, as cidades e as perguntas. Conceção, trabalho de campo e relatório são um único trabalho.",
      "points": [
        "As perguntas decorrem da decisão",
        "Amostra e controlo de qualidade num único plano",
        "Um relatório que a equipa pode usar diretamente"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Tracking de marca",
      "title": "Um questionário fixo, aplicado em ondas.",
      "body": "Notoriedade, consideração, utilização e recordação publicitária, com as mesmas perguntas a intervalos fixos. O que se lê é a tendência entre ondas; não um índice diário, e sem referências do setor.",
      "points": [
        "Ondas mensais ou trimestrais",
        "As mesmas perguntas, para que a tendência se mantenha",
        "À medida da sua categoria, não um índice sindicado"
      ]
    }
  ],
  "closing": [
    "Diga-nos o que tem em mente,",
    "e definimos o próximo passo em conjunto."
  ],
  "free": "Começar grátis",
  "action": "Contactar vendas"
},
  "ru": {
  "eyebrow": "Выберите подходящий количественный формат.",
  "statement": [
    "Сначала собрать данные, затем решить. Задать верный вопрос, найти верную выборку, и данные становятся решением."
  ],
  "title": "Каждое решение опирается на доказательства.",
  "lede": "Платформа для самостоятельных исследований, комплексный опрос с нашими исследователями или индивидуальное исследование под руководством экспертов: мы подбираем формат под ваши задачи и бюджет.",
  "placeholder": "Ваш рабочий e-mail",
  "submit": "Записаться на демо",
  "note": "После отправки вы получите новости, советы и приглашения на мероприятия от GuanyiSearch. Подробности:",
  "privacy": "политика конфиденциальности",
  "noteEnd": "Вы можете отписаться в любое время.",
  "plansLink": "Посмотреть тарифы и цены",
  "done": "Заявка получена. Мы свяжемся с вами в ближайшее время.",
  "error": "Не удалось отправить. Попробуйте ещё раз.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Самостоятельный запуск и полевая работа",
      "title": "Вы составляете анкету. Мы проводим полевой этап.",
      "body": "Вы присылаете анкету и определение аудитории; мы размещаем её в сообществе и возвращаем данные. Предварительные данные в течение 48 часов; отчёт мы тоже пишем.",
      "points": [
        "Предварительные данные за 48 часов",
        "Выборка из сообщества, без купленного трафика",
        "Отчёт готовим мы"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Индивидуальное исследование",
      "title": "Анкета строится вокруг решения.",
      "body": "Сначала фиксируем, на что нужно ответить, затем аудиторию, города и вопросы. Дизайн, полевой этап и отчёт — одна работа.",
      "points": [
        "Вопросы вытекают из решения",
        "Выборка и контроль качества в одном плане",
        "Отчёт, который команда может использовать напрямую"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Трекинг бренда",
      "title": "Фиксированная анкета, волнами.",
      "body": "Знание бренда, рассмотрение, использование и запоминаемость рекламы, одни и те же вопросы через фиксированный интервал. Анализируется тренд между волнами; это не ежедневный индекс, и отраслевых бенчмарков нет.",
      "points": [
        "Волны раз в месяц или раз в квартал",
        "Одни и те же вопросы, поэтому тренд сопоставим",
        "Под вашу категорию, без синдицированного индекса"
      ]
    }
  ],
  "closing": [
    "Расскажите, что вы задумали,",
    "и мы вместе определим следующий шаг."
  ],
  "free": "Начать бесплатно",
  "action": "Связаться с продажами"
},
  "sv": {
  "eyebrow": "Välj det kvantitativa spår som passar dig.",
  "statement": [
    "Samla bevisen och besluta sedan. Ställ rätt fråga, nå rätt urval, och data blir ett beslut."
  ],
  "title": "Varje beslut med underlag.",
  "lede": "Från en självbetjäningsplattform för undersökningar till en omfattande undersökning med våra forskare och vidare till en skräddarsydd studie ledd av experter: vi anpassar formatet efter dina behov och din budget.",
  "placeholder": "Din arbetsmejl",
  "submit": "Boka en demo",
  "note": "När du har skickat får du nyheter, tips och evenemang från GuanyiSearch. Läs vår",
  "privacy": "integritetspolicy",
  "noteEnd": "Du kan avregistrera dig när som helst.",
  "plansLink": "Se planer och priser",
  "done": "Mottaget. Vi hör av oss inom kort.",
  "error": "Det gick inte att skicka. Försök igen.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Självbetjäning och fältarbete",
      "title": "Du skriver enkäten. Vi genomför fältarbetet.",
      "body": "Du skickar enkäten och definitionen av målgruppen; vi lägger ut den i communityt och lämnar tillbaka data. Preliminära data inom 48 timmar; rapporten skriver vi också.",
      "points": [
        "Preliminära data inom 48 timmar",
        "Urval från communityt, inte köpt trafik",
        "Rapporten kommer från oss"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Skräddarsydd undersökning",
      "title": "Enkäten utformas utifrån beslutet.",
      "body": "Först bestäms vad som ska besvaras, sedan målgrupp, städer och frågor. Design, fältarbete och rapport är ett och samma arbete.",
      "points": [
        "Frågorna följer av beslutet",
        "Urval och kvalitetskontroll i en plan",
        "En rapport som teamet kan använda direkt"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Varumärkestracking",
      "title": "En fast enkät, genomförd i vågor.",
      "body": "Kännedom, övervägande, användning och reklamminne, med samma frågor på fasta intervall. Det du läser är trenden mellan vågorna; inte ett dagligt index, och inga branschbenchmark.",
      "points": [
        "Vågor per månad eller per kvartal",
        "Samma frågor, så att trenden håller",
        "Anpassat efter din kategori, inte ett syndikerat index"
      ]
    }
  ],
  "closing": [
    "Berätta vad du har i åtanke,",
    "så tar vi fram nästa steg tillsammans."
  ],
  "free": "Starta gratis",
  "action": "Kontakta sälj"
},
  "tr": {
  "eyebrow": "Size uygun nicel araştırma yolunu seçin.",
  "statement": [
    "Önce kanıtları toplayın, sonra karar verin. Doğru soruyu sorun, doğru örnekleme ulaşın; veriler bir karara dönüşür."
  ],
  "title": "Her karar kanıtla desteklenir.",
  "lede": "Self servis bir araştırma platformu, araştırmacılarımızla yürütülen kapsamlı bir anket ya da uzmanların yönettiği özel bir çalışma: formatı ihtiyaçlarınıza ve bütçenize göre belirliyoruz.",
  "placeholder": "İş e-posta adresiniz",
  "submit": "Demo talep edin",
  "note": "Gönderdikten sonra GuanyiSearch’ten haberler, ipuçları ve etkinlikler alırsınız. Ayrıntılar:",
  "privacy": "gizlilik politikası",
  "noteEnd": "İstediğiniz zaman abonelikten çıkabilirsiniz.",
  "plansLink": "Planları ve fiyatları görün",
  "done": "Alındı. Kısa süre içinde sizinle iletişime geçeceğiz.",
  "error": "Gönderilemedi. Lütfen tekrar deneyin.",
  "sections": [
    {
      "id": "self-serve",
      "icon": "ClipboardList",
      "kicker": "01 · Self servis ve saha çalışması",
      "title": "Anketi siz yazarsınız. Saha çalışmasını biz yürütürüz.",
      "body": "Anketi ve hedef kitle tanımını gönderirsiniz; biz bunları topluluğa sunar ve verileri geri iletiriz. Ön veriler 48 saat içinde; raporu da biz yazarız.",
      "points": [
        "48 saat içinde ön veriler",
        "Topluluk kaynaklı örneklem; satın alınmış trafik kullanılmaz",
        "Raporu biz hazırlarız"
      ]
    },
    {
      "id": "custom",
      "icon": "ClipboardPenLine",
      "kicker": "02 · Özel anket",
      "title": "Anket, verilecek kararın etrafında tasarlanır.",
      "body": "Önce neyin yanıtlanması gerektiği, ardından hedef kitle, şehirler ve sorular belirlenir. Tasarım, saha çalışması ve rapor tek bir iştir.",
      "points": [
        "Sorular karardan türetilir",
        "Örneklem ve kalite kontrolü tek planda",
        "Ekibin doğrudan kullanabileceği bir rapor"
      ]
    },
    {
      "id": "tracker",
      "icon": "ChartSpline",
      "kicker": "03 · Marka takibi",
      "title": "Sabit bir anket, dalgalar hâlinde uygulanır.",
      "body": "Bilinirlik, değerlendirme, kullanım ve reklam hatırlanması, aynı sorularla sabit aralıklarla ölçülür. Okunan şey dalgalar arasındaki eğilimdir; günlük bir endeks değildir ve sektör kıyaslamaları yapılmaz.",
      "points": [
        "Aylık veya üç aylık dalgalar",
        "Aynı sorular, böylece eğilim karşılaştırılabilir kalır",
        "Kategorinize özel hazırlanır; sendike endeks kullanılmaz"
      ]
    }
  ],
  "closing": [
    "Aklınızdakini bize anlatın,",
    "sonraki adımı birlikte belirleyelim."
  ],
  "free": "Ücretsiz başlayın",
  "action": "Satışla iletişime geçin"
}
};

export default function Quantitative() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['quantitative'];
  const t = { ...base, group: entry?.title || '定量研究' };
  usePageTitle(t.group);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // 预约演示 = 研究端注册页（业主 2026-10-27 定）；邮箱带过去，注册那页会自动填上。
  const submit = (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    navigate(`${withLanguage('/business/register', language)}&email=${encodeURIComponent(value)}`);
  };

  return (
    <main className="quant-page">
      <section className="qn-hero">
        <div className="qn-hero-copy">
          <p className="qn-eyebrow">{t.eyebrow}</p>
          <h1 className="qn-title">{t.title}</h1>
          <p className="qn-lede">{t.lede}</p>

          <form className="qn-demo" onSubmit={submit}>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
            />
            <button type="submit">{t.submit}</button>
          </form>

          <p className="qn-note">
            {t.note}{' '}
            <Link to={withLanguage('/privacy', language)}>{t.privacy}</Link>
            {['zh-CN', 'zh-Hant', 'ja'].includes(language) ? '。' : '. '}
            {t.noteEnd}
          </p>

        </div>

        <figure className="qn-hero-visual">
          <img src={heroImage} alt="" />
        </figure>
      </section>

      <QuantitativePlans />

      <section className="qn-contact" aria-labelledby="qn-contact-title">
        <h2 id="qn-contact-title" className="qn-contact-title">
          {(t.closing || []).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div className="qn-actions">
          <Link className="qn-action qn-action--primary" to={withLanguage('/business/register', language)}>
            {t.free || 'Start for free'}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qn-action qn-action--quiet" to={withLanguage('/business/access', language)}>
            {t.action || 'Contact sales'}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
