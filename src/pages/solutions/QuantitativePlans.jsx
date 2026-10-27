import { Link } from 'react-router-dom';
import { ArrowRight, Check, ClipboardList, UsersRound, ChartSpline } from 'lucide-react';

const ICONS = { ClipboardList, UsersRound, ChartSpline };
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './QuantitativePlans.css';

/* 解决方案 · 定量研究 · 方案与计价 —— 2026-10-27。

   三张卡，业主定的口径：
     01 自助服务   眉标「基于平台的问卷建设」，从 $200 起，按钮「获取演示」
     02 定制研究   眉标与小字取研究端「申请研究支持」弹窗里的原文，按范围
     03 品牌追踪   眉标与小字用前面商定的那句，按范围
   后两张卡的按钮是「联系我们」。 */

const copy = {
  'en-US': {
    group: 'Plans and pricing',
    title: 'Choose your plan.',
    lede: 'Three ways to work, matched to the research question and its scale.',
    plans: [
      {
        icon: 'ClipboardList',
        kicker: 'Platform questionnaire',
        name: 'Self-serve',
        body: 'Build the questionnaire in the editor, or send us yours and we field it.',
        price: 'From US$200',
        priceNote: 'per study',
        points: ['Targeted by profile', 'Real respondents, checked by hand', 'Preliminary data in 48 hours', 'Results in the dashboard', 'Several studies in one workspace'],
        action: 'Book a demo',
        to: '/business/register',
        primary: true,
      },
      {
        icon: 'UsersRound',
        kicker: 'Custom questionnaire',
        name: 'Custom survey',
        body: 'Questionnaire designed to the research objective, with sampling, fieldwork and delivery handled as one piece of work.',
        price: 'Based on scope',
        priceNote: 'quoted per project',
        points: ['Designed around the objective', 'Scope and quote agreed first', 'Research expert support', 'Real respondents, checked by hand', 'Quota and sample structure', 'Progress in one workspace'],
        action: 'Contact us',
        to: '/business/access',
        primary: false,
      },
      {
        icon: 'ChartSpline',
        kicker: 'Brand tracker',
        name: 'Brand tracking',
        body: 'Brand health measured on a fixed questionnaire, wave by wave, with comparable trend output across periods.',
        price: 'Based on scope',
        priceNote: 'quoted per wave plan',
        points: ['Quarterly or biannual waves', 'Unaided and aided awareness', 'Consideration, usage and NPS', 'Real respondents, checked by hand', 'Research expert support', 'Pre- and post-campaign comparison', 'Trend across waves'],
        action: 'Contact us',
        to: '/business/access',
        primary: false,
      },
    ],
  },
  'en-GB': {
    group: 'Plans and pricing',
    title: 'Choose your plan.',
    lede: 'Three ways to work, matched to the research question and its scale.',
    plans: [
      {
        icon: 'ClipboardList',
        kicker: 'Platform questionnaire',
        name: 'Self-serve',
        body: 'Build the questionnaire in the editor, or send us yours and we field it.',
        price: 'From US$200',
        priceNote: 'per study',
        points: ['Targeted by profile', 'Real respondents, checked by hand', 'Preliminary data in 48 hours', 'Results in the dashboard', 'Several studies in one workspace'],
        action: 'Book a demo',
        to: '/business/register',
        primary: true,
      },
      {
        icon: 'UsersRound',
        kicker: 'Custom questionnaire',
        name: 'Custom survey',
        body: 'Questionnaire designed to the research objective, with sampling, fieldwork and delivery handled as one piece of work.',
        price: 'Based on scope',
        priceNote: 'quoted per project',
        points: ['Designed around the objective', 'Scope and quote agreed first', 'Research expert support', 'Real respondents, checked by hand', 'Quota and sample structure', 'Progress in one workspace'],
        action: 'Contact us',
        to: '/business/access',
        primary: false,
      },
      {
        icon: 'ChartSpline',
        kicker: 'Brand tracker',
        name: 'Brand tracking',
        body: 'Brand health measured on a fixed questionnaire, wave by wave, with comparable trend output across periods.',
        price: 'Based on scope',
        priceNote: 'quoted per wave plan',
        points: ['Quarterly or biannual waves', 'Unaided and aided awareness', 'Consideration, usage and NPS', 'Real respondents, checked by hand', 'Research expert support', 'Pre- and post-campaign comparison', 'Trend across waves'],
        action: 'Contact us',
        to: '/business/access',
        primary: false,
      },
    ],
  },
  'zh-CN': {
    group: '方案与价格',
    title: '选择你的方案。',
    lede: '三种做法，按研究目标与规模来选。',
    plans: [
      {
        icon: 'ClipboardList',
        kicker: '基于平台的问卷建设',
        name: '自助服务',
        body: '使用问卷编辑器创建问卷，或向我们发送您的问卷。',
        price: '从 $200 起',
        priceNote: '单项研究',
        points: ['按画像定向投放', '真人样本，人工核验', '48 小时见初步数据', '仪表盘里看结果', '同一工作区管理多项研究'],
        action: '获取演示',
        to: '/business/register',
        primary: true,
      },
      {
        icon: 'UsersRound',
        kicker: '定制问卷',
        name: '定制问卷服务',
        body: '从研究目标出发设计问卷，抽样、执行与交付作为一件事完成。',
        price: '基于项目范围',
        priceNote: '按项目报价',
        points: ['按研究目标设计问卷', '方案与报价先确认', '研究专家支持', '真人样本，人工核验', '配额与样本结构', '执行进度同工作区'],
        action: '联系我们',
        to: '/business/access',
        primary: false,
      },
      {
        icon: 'ChartSpline',
        kicker: '品牌追踪',
        name: '定制品牌追踪',
        body: '以固定题组按波次追踪品牌健康指标，输出跨期可比的趋势。',
        price: '基于项目范围',
        priceNote: '按波次方案报价',
        points: ['季度或半年一波', '未提示与提示认知', '考虑、使用与推荐意愿', '真人样本，人工核验', '研究专家支持', '投放前后对比', '跨期趋势'],
        action: '联系我们',
        to: '/business/access',
        primary: false,
      },
    ],
  },
  'zh-Hant': {
    group: '方案與價格',
    title: '選擇你的方案。',
    lede: '三種做法，按研究目標與規模來選。',
    plans: [
      {
        icon: 'ClipboardList',
        kicker: '基於平台的問卷建設',
        name: '自助服務',
        body: '使用問卷編輯器創建問卷，或向我們發送您的問卷。',
        price: '從 $200 起',
        priceNote: '單項研究',
        points: ['按畫像定向投放', '真人樣本，人工核驗', '48 小時見初步資料', '儀表盤裡看結果', '同一工作區管理多項研究'],
        action: '獲取演示',
        to: '/business/register',
        primary: true,
      },
      {
        icon: 'UsersRound',
        kicker: '定製問卷',
        name: '定製問卷服務',
        body: '從研究目標出發設計問卷，抽樣、執行與交付作為一件事完成。',
        price: '基於專案範圍',
        priceNote: '按專案報價',
        points: ['按研究目標設計問卷', '方案與報價先確認', '研究專家支持', '真人樣本，人工核驗', '配額與樣本結構', '執行進度同工作區'],
        action: '聯繫我們',
        to: '/business/access',
        primary: false,
      },
      {
        icon: 'ChartSpline',
        kicker: '品牌追蹤',
        name: '定製品牌追蹤',
        body: '以固定題組按波次追蹤品牌健康指標，輸出跨期可比的趨勢。',
        price: '基於專案範圍',
        priceNote: '按波次方案報價',
        points: ['季度或半年一波', '未提示與提示認知', '考慮、使用與推薦意願', '真人樣本，人工核驗', '研究專家支持', '投放前後對比', '跨期趨勢'],
        action: '聯繫我們',
        to: '/business/access',
        primary: false,
      },
    ],
  },
  "de": {
    "group": "Pläne und Preise",
    "title": "Wählen Sie Ihren Plan.",
    "lede": "Drei Arbeitsweisen, abgestimmt auf die Forschungsfrage und ihren Umfang.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Fragebogen auf der Plattform",
        "name": "Self-Service",
        "body": "Erstellen Sie den Fragebogen im Editor oder senden Sie uns Ihren Fragebogen, und wir führen die Feldarbeit durch.",
        "price": "From US$200",
        "priceNote": "pro Studie",
        "points": [
          "Gezielte Ansprache nach Profil",
          "Echte Befragte, manuell geprüft",
          "Vorläufige Daten nach 48 Stunden",
          "Ergebnisse im Dashboard",
          "Mehrere Studien in einem Arbeitsbereich"
        ],
        "action": "Demo buchen",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Individueller Fragebogen",
        "name": "Individuelle Umfrage",
        "body": "Der Fragebogen wird auf das Forschungsziel zugeschnitten; Stichprobenziehung, Feldarbeit und Lieferung werden als eine Leistung erbracht.",
        "price": "Based on scope",
        "priceNote": "Angebot pro Projekt",
        "points": [
          "Auf das Ziel zugeschnitten",
          "Umfang und Angebot zuerst abgestimmt",
          "Unterstützung durch Forschungsexperten",
          "Echte Befragte, manuell geprüft",
          "Quoten und Stichprobenstruktur",
          "Fortschritt in einem Arbeitsbereich"
        ],
        "action": "Kontakt aufnehmen",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Marken-Tracker",
        "name": "Marken-Tracking",
        "body": "Die Markengesundheit wird mit einem festen Fragebogen Welle für Welle gemessen, mit vergleichbaren Trendauswertungen über die Perioden.",
        "price": "Based on scope",
        "priceNote": "Angebot pro Wellenplan",
        "points": [
          "Vierteljährliche oder halbjährliche Wellen",
          "Ungestützte und gestützte Bekanntheit",
          "Erwägung, Nutzung und NPS",
          "Echte Befragte, manuell geprüft",
          "Unterstützung durch Forschungsexperten",
          "Vergleich vor und nach der Kampagne",
          "Trend über die Wellen"
        ],
        "action": "Kontakt aufnehmen",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "fr": {
    "group": "Formules et tarifs",
    "title": "Choisissez votre formule.",
    "lede": "Trois façons de travailler, adaptées à la question de recherche et à son ampleur.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Questionnaire sur la plateforme",
        "name": "Libre-service",
        "body": "Créez le questionnaire dans l'éditeur, ou envoyez-nous le vôtre et nous assurons la collecte.",
        "price": "From US$200",
        "priceNote": "par étude",
        "points": [
          "Ciblage par profil",
          "Répondants réels, vérifiés manuellement",
          "Premières données en 48 heures",
          "Résultats dans le tableau de bord",
          "Plusieurs études dans un même espace de travail"
        ],
        "action": "Demander une démo",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Questionnaire sur mesure",
        "name": "Enquête sur mesure",
        "body": "Questionnaire conçu à partir de l'objectif de recherche ; l'échantillonnage, le terrain et la livraison sont traités comme une seule prestation.",
        "price": "Based on scope",
        "priceNote": "devis par projet",
        "points": [
          "Conçu autour de l'objectif",
          "Périmètre et devis validés au préalable",
          "Appui d'experts en recherche",
          "Répondants réels, vérifiés manuellement",
          "Quotas et structure d'échantillon",
          "Avancement dans un même espace de travail"
        ],
        "action": "Nous contacter",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Baromètre de marque",
        "name": "Suivi de marque",
        "body": "La santé de la marque est mesurée sur un questionnaire fixe, vague par vague, avec des tendances comparables d'une période à l'autre.",
        "price": "Based on scope",
        "priceNote": "devis par plan de vagues",
        "points": [
          "Vagues trimestrielles ou semestrielles",
          "Notoriété spontanée et assistée",
          "Considération, usage et NPS",
          "Répondants réels, vérifiés manuellement",
          "Appui d'experts en recherche",
          "Comparaison avant et après campagne",
          "Tendance entre les vagues"
        ],
        "action": "Nous contacter",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "nl": {
    "group": "Pakketten en prijzen",
    "title": "Kies uw pakket.",
    "lede": "Drie manieren van werken, afgestemd op de onderzoeksvraag en de omvang ervan.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Vragenlijst op het platform",
        "name": "Zelfservice",
        "body": "Bouw de vragenlijst in de editor, of stuur ons uw eigen vragenlijst en wij voeren het veldwerk uit.",
        "price": "From US$200",
        "priceNote": "per onderzoek",
        "points": [
          "Selectie op profiel",
          "Echte respondenten, handmatig gecontroleerd",
          "Voorlopige gegevens binnen 48 uur",
          "Resultaten in het dashboard",
          "Meerdere onderzoeken in één werkruimte"
        ],
        "action": "Demo aanvragen",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Vragenlijst op maat",
        "name": "Enquête op maat",
        "body": "Vragenlijst opgesteld op basis van het onderzoeksdoel; steekproef, veldwerk en oplevering worden als één opdracht uitgevoerd.",
        "price": "Based on scope",
        "priceNote": "offerte per project",
        "points": [
          "Ontworpen rond het doel",
          "Omvang en offerte eerst afgestemd",
          "Ondersteuning van onderzoeksdeskundigen",
          "Echte respondenten, handmatig gecontroleerd",
          "Quota en steekproefopbouw",
          "Voortgang in één werkruimte"
        ],
        "action": "Contact opnemen",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Merkmonitor",
        "name": "Merkmonitoring",
        "body": "Merkgezondheid wordt gemeten met een vaste vragenlijst, golf voor golf, met vergelijkbare trenduitvoer over perioden.",
        "price": "Based on scope",
        "priceNote": "offerte per golfplan",
        "points": [
          "Golven per kwartaal of half jaar",
          "Ongeholpen en geholpen bekendheid",
          "Overweging, gebruik en NPS",
          "Echte respondenten, handmatig gecontroleerd",
          "Ondersteuning van onderzoeksdeskundigen",
          "Vergelijking voor en na de campagne",
          "Trend over de golven"
        ],
        "action": "Contact opnemen",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "da": {
    "group": "Planer og priser",
    "title": "Vælg din plan.",
    "lede": "Tre måder at arbejde på, tilpasset forskningsspørgsmålet og dets omfang.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Spørgeskema på platformen",
        "name": "Selvbetjening",
        "body": "Byg spørgeskemaet i editoren, eller send os dit eget, og vi gennemfører feltarbejdet.",
        "price": "From US$200",
        "priceNote": "pr. undersøgelse",
        "points": [
          "Målrettet efter profil",
          "Rigtige respondenter, kontrolleret manuelt",
          "Foreløbige data inden for 48 timer",
          "Resultater i dashboardet",
          "Flere undersøgelser i ét arbejdsområde"
        ],
        "action": "Book en demo",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Tilpasset spørgeskema",
        "name": "Tilpasset undersøgelse",
        "body": "Spørgeskemaet designes ud fra forskningsformålet, og stikprøve, feltarbejde og levering udføres som én opgave.",
        "price": "Based on scope",
        "priceNote": "tilbud pr. projekt",
        "points": [
          "Designet omkring formålet",
          "Omfang og tilbud aftalt først",
          "Støtte fra forskningseksperter",
          "Rigtige respondenter, kontrolleret manuelt",
          "Kvoter og stikprøvestruktur",
          "Fremdrift i ét arbejdsområde"
        ],
        "action": "Kontakt os",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Brandtracker",
        "name": "Brandtracking",
        "body": "Brandsundhed måles på et fast spørgeskema, bølge for bølge, med sammenlignelige trendoutput på tværs af perioder.",
        "price": "Based on scope",
        "priceNote": "tilbud pr. bølgeplan",
        "points": [
          "Kvartalsvise eller halvårlige bølger",
          "Uhjulpen og hjulpen kendskab",
          "Overvejelse, brug og NPS",
          "Rigtige respondenter, kontrolleret manuelt",
          "Støtte fra forskningseksperter",
          "Sammenligning før og efter kampagne",
          "Trend på tværs af bølger"
        ],
        "action": "Kontakt os",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "es": {
    "group": "Planes y precios",
    "title": "Elige tu plan.",
    "lede": "Tres formas de trabajar, ajustadas a la pregunta de investigación y a su escala.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Cuestionario en la plataforma",
        "name": "Autoservicio",
        "body": "Crea el cuestionario en el editor o envíanos el tuyo y nosotros realizamos el trabajo de campo.",
        "price": "From US$200",
        "priceNote": "por estudio",
        "points": [
          "Segmentado por perfil",
          "Encuestados reales, verificados manualmente",
          "Datos preliminares en 48 horas",
          "Resultados en el panel",
          "Varios estudios en un mismo espacio de trabajo"
        ],
        "action": "Solicitar una demo",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Cuestionario a medida",
        "name": "Encuesta a medida",
        "body": "Cuestionario diseñado a partir del objetivo de la investigación; el muestreo, el trabajo de campo y la entrega se realizan como un solo servicio.",
        "price": "Based on scope",
        "priceNote": "presupuesto por proyecto",
        "points": [
          "Diseñado en torno al objetivo",
          "Alcance y presupuesto acordados primero",
          "Apoyo de expertos en investigación",
          "Encuestados reales, verificados manualmente",
          "Cuotas y estructura de la muestra",
          "Progreso en un mismo espacio de trabajo"
        ],
        "action": "Contactar",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Monitor de marca",
        "name": "Seguimiento de marca",
        "body": "La salud de la marca se mide con un cuestionario fijo, ola por ola, con resultados de tendencia comparables entre periodos.",
        "price": "Based on scope",
        "priceNote": "presupuesto por plan de olas",
        "points": [
          "Olas trimestrales o semestrales",
          "Conocimiento espontáneo y sugerido",
          "Consideración, uso y NPS",
          "Encuestados reales, verificados manualmente",
          "Apoyo de expertos en investigación",
          "Comparación antes y después de la campaña",
          "Tendencia entre olas"
        ],
        "action": "Contactar",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "fi": {
    "group": "Paketit ja hinnat",
    "title": "Valitse pakettisi.",
    "lede": "Kolme tapaa tehdä työtä tutkimuskysymyksen ja sen laajuuden mukaan.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Kysely alustalla",
        "name": "Itsepalvelu",
        "body": "Rakenna kysely editorissa tai lähetä meille oma kyselysi, niin me toteutamme kenttätyön.",
        "price": "From US$200",
        "priceNote": "tutkimusta kohden",
        "points": [
          "Kohdennus profiilin mukaan",
          "Oikeat vastaajat, tarkistettu käsin",
          "Alustavat tiedot 48 tunnissa",
          "Tulokset hallintapaneelissa",
          "Useita tutkimuksia samassa työtilassa"
        ],
        "action": "Varaa esittely",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Räätälöity kysely",
        "name": "Räätälöity tutkimus",
        "body": "Kysely suunnitellaan tutkimustavoitteen pohjalta, ja otanta, kenttätyö ja toimitus tehdään yhtenä kokonaisuutena.",
        "price": "Based on scope",
        "priceNote": "tarjous projektia kohden",
        "points": [
          "Suunniteltu tavoitteen ympärille",
          "Laajuus ja tarjous sovitaan ensin",
          "Tutkimusasiantuntijoiden tuki",
          "Oikeat vastaajat, tarkistettu käsin",
          "Kiintiöt ja otannan rakenne",
          "Edistyminen samassa työtilassa"
        ],
        "action": "Ota yhteyttä",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Brändiseuranta",
        "name": "Brändin seuranta",
        "body": "Brändin terveyttä mitataan kiinteällä kyselyllä aalto aallolta, ja tuloksena on vertailukelpoinen kehitys eri jaksojen välillä.",
        "price": "Based on scope",
        "priceNote": "tarjous aaltosuunnitelmaa kohden",
        "points": [
          "Neljännesvuosi- tai puolivuosiaallot",
          "Spontaani ja autettu tunnettuus",
          "Harkinta, käyttö ja NPS",
          "Oikeat vastaajat, tarkistettu käsin",
          "Tutkimusasiantuntijoiden tuki",
          "Vertailu ennen kampanjaa ja sen jälkeen",
          "Kehitys aaltojen välillä"
        ],
        "action": "Ota yhteyttä",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "it": {
    "group": "Piani e prezzi",
    "title": "Scegli il tuo piano.",
    "lede": "Tre modi di lavorare, adattati alla domanda di ricerca e alla sua scala.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Questionario sulla piattaforma",
        "name": "Self-service",
        "body": "Crea il questionario nell'editor oppure inviaci il tuo e noi gestiamo la rilevazione.",
        "price": "From US$200",
        "priceNote": "per studio",
        "points": [
          "Mirato per profilo",
          "Rispondenti reali, verificati manualmente",
          "Dati preliminari in 48 ore",
          "Risultati nella dashboard",
          "Più studi in un unico spazio di lavoro"
        ],
        "action": "Richiedi una demo",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Questionario su misura",
        "name": "Indagine su misura",
        "body": "Questionario progettato a partire dall'obiettivo di ricerca; campionamento, rilevazione e consegna gestiti come un'unica attività.",
        "price": "Based on scope",
        "priceNote": "preventivo per progetto",
        "points": [
          "Progettato intorno all'obiettivo",
          "Perimetro e preventivo concordati prima",
          "Supporto di esperti di ricerca",
          "Rispondenti reali, verificati manualmente",
          "Quote e struttura del campione",
          "Avanzamento in un unico spazio di lavoro"
        ],
        "action": "Contattaci",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Monitor di marca",
        "name": "Monitoraggio della marca",
        "body": "La salute della marca è misurata con un questionario fisso, onda per onda, con output di trend confrontabili tra periodi.",
        "price": "Based on scope",
        "priceNote": "preventivo per piano di onde",
        "points": [
          "Onde trimestrali o semestrali",
          "Notorietà spontanea e sollecitata",
          "Considerazione, utilizzo e NPS",
          "Rispondenti reali, verificati manualmente",
          "Supporto di esperti di ricerca",
          "Confronto prima e dopo la campagna",
          "Trend tra le onde"
        ],
        "action": "Contattaci",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "ja": {
    "group": "料金プラン",
    "title": "プランの選択",
    "lede": "研究課題とその規模に合わせた3つの進め方です。",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "プラットフォームでのアンケート作成",
        "name": "セルフサービス",
        "body": "エディターでアンケートを作成するか、お客様のアンケートをお送りいただければ、当社が調査を実施します。",
        "price": "From US$200",
        "priceNote": "1調査あたり",
        "points": [
          "プロフィールによるターゲティング",
          "実在の回答者を人手で確認",
          "48時間以内に暫定データ",
          "ダッシュボードで結果を確認",
          "1つのワークスペースで複数調査を管理"
        ],
        "action": "デモを申し込む",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "オーダーメイドのアンケート",
        "name": "カスタム調査",
        "body": "研究目的に基づいてアンケートを設計し、サンプリング、実査、納品を一つの業務として行います。",
        "price": "Based on scope",
        "priceNote": "プロジェクトごとの見積もり",
        "points": [
          "目的に沿った設計",
          "範囲と見積もりを事前に合意",
          "研究専門家のサポート",
          "実在の回答者を人手で確認",
          "クォータとサンプル構成",
          "同一ワークスペースでの進捗確認"
        ],
        "action": "お問い合わせ",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "ブランドトラッカー",
        "name": "ブランドトラッキング",
        "body": "固定のアンケートでブランドの健全性をウェーブごとに測定し、期間をまたいで比較できるトレンドを出力します。",
        "price": "Based on scope",
        "priceNote": "ウェーブ計画ごとの見積もり",
        "points": [
          "四半期または半年ごとのウェーブ",
          "非誘導・誘導認知",
          "検討、利用、NPS",
          "実在の回答者を人手で確認",
          "研究専門家のサポート",
          "キャンペーン前後の比較",
          "ウェーブ間のトレンド"
        ],
        "action": "お問い合わせ",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "ko": {
    "group": "요금제",
    "title": "요금제를 선택하십시오.",
    "lede": "연구 질문과 규모에 맞춘 세 가지 진행 방식입니다.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "플랫폼 설문 작성",
        "name": "셀프서비스",
        "body": "편집기에서 설문을 작성하시거나 보유하신 설문을 보내주시면 당사가 조사를 수행합니다.",
        "price": "From US$200",
        "priceNote": "연구 1건 기준",
        "points": [
          "프로필 기반 타기팅",
          "실제 응답자를 수작업으로 검증",
          "48시간 내 예비 데이터",
          "대시보드에서 결과 확인",
          "한 워크스페이스에서 여러 연구 관리"
        ],
        "action": "데모 신청",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "맞춤 설문",
        "name": "맞춤 조사",
        "body": "연구 목표에 맞춰 설문을 설계하고 표본 추출, 실사, 납품을 하나의 작업으로 수행합니다.",
        "price": "Based on scope",
        "priceNote": "프로젝트별 견적",
        "points": [
          "목표에 맞춘 설계",
          "범위와 견적을 먼저 합의",
          "연구 전문가 지원",
          "실제 응답자를 수작업으로 검증",
          "할당량과 표본 구조",
          "동일 워크스페이스에서 진행 상황 확인"
        ],
        "action": "문의하기",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "브랜드 트래커",
        "name": "브랜드 트래킹",
        "body": "고정 설문으로 브랜드 건전성을 웨이브별로 측정하고 기간 간 비교 가능한 추세를 제공합니다.",
        "price": "Based on scope",
        "priceNote": "웨이브 계획별 견적",
        "points": [
          "분기 또는 반기 웨이브",
          "비보조 및 보조 인지도",
          "고려, 사용, NPS",
          "실제 응답자를 수작업으로 검증",
          "연구 전문가 지원",
          "캠페인 전후 비교",
          "웨이브 간 추세"
        ],
        "action": "문의하기",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "no": {
    "group": "Planer og priser",
    "title": "Velg planen din.",
    "lede": "Tre måter å arbeide på, tilpasset forskningsspørsmålet og omfanget av det.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Spørreskjema på plattformen",
        "name": "Selvbetjening",
        "body": "Bygg spørreskjemaet i editoren, eller send oss ditt eget, så gjennomfører vi feltarbeidet.",
        "price": "From US$200",
        "priceNote": "per studie",
        "points": [
          "Målrettet etter profil",
          "Ekte respondenter, kontrollert manuelt",
          "Foreløpige data innen 48 timer",
          "Resultater i dashbordet",
          "Flere studier i ett arbeidsområde"
        ],
        "action": "Book en demo",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Tilpasset spørreskjema",
        "name": "Tilpasset undersøkelse",
        "body": "Spørreskjemaet utformes etter forskningsformålet, og utvalg, feltarbeid og levering utføres som én oppgave.",
        "price": "Based on scope",
        "priceNote": "tilbud per prosjekt",
        "points": [
          "Utformet rundt formålet",
          "Omfang og tilbud avtalt først",
          "Støtte fra forskningseksperter",
          "Ekte respondenter, kontrollert manuelt",
          "Kvoter og utvalgsstruktur",
          "Fremdrift i ett arbeidsområde"
        ],
        "action": "Kontakt oss",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Merkevaretracker",
        "name": "Merkevaresporing",
        "body": "Merkevarens helse måles med et fast spørreskjema, bølge for bølge, med sammenlignbare trendresultater på tvers av perioder.",
        "price": "Based on scope",
        "priceNote": "tilbud per bølgeplan",
        "points": [
          "Kvartalsvise eller halvårlige bølger",
          "Uhjulpet og hjulpet kjennskap",
          "Vurdering, bruk og NPS",
          "Ekte respondenter, kontrollert manuelt",
          "Støtte fra forskningseksperter",
          "Sammenligning før og etter kampanje",
          "Trend på tvers av bølger"
        ],
        "action": "Kontakt oss",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "pt": {
    "group": "Planos e preços",
    "title": "Escolha seu plano.",
    "lede": "Três formas de trabalhar, ajustadas à pergunta de pesquisa e à sua escala.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Questionário na plataforma",
        "name": "Autoatendimento",
        "body": "Monte o questionário no editor ou envie o seu e nós conduzimos o campo.",
        "price": "From US$200",
        "priceNote": "por estudo",
        "points": [
          "Segmentado por perfil",
          "Respondentes reais, verificados manualmente",
          "Dados preliminares em 48 horas",
          "Resultados no painel",
          "Vários estudos em um mesmo espaço de trabalho"
        ],
        "action": "Agendar uma demonstração",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Questionário sob medida",
        "name": "Pesquisa sob medida",
        "body": "Questionário desenhado a partir do objetivo da pesquisa; amostragem, campo e entrega tratados como um único serviço.",
        "price": "Based on scope",
        "priceNote": "orçamento por projeto",
        "points": [
          "Desenhado em torno do objetivo",
          "Escopo e orçamento acordados antes",
          "Apoio de especialistas em pesquisa",
          "Respondentes reais, verificados manualmente",
          "Cotas e estrutura da amostra",
          "Progresso em um mesmo espaço de trabalho"
        ],
        "action": "Fale conosco",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Monitor de marca",
        "name": "Acompanhamento de marca",
        "body": "A saúde da marca é medida com um questionário fixo, onda a onda, com resultados de tendência comparáveis entre períodos.",
        "price": "Based on scope",
        "priceNote": "orçamento por plano de ondas",
        "points": [
          "Ondas trimestrais ou semestrais",
          "Conhecimento espontâneo e estimulado",
          "Consideração, uso e NPS",
          "Respondentes reais, verificados manualmente",
          "Apoio de especialistas em pesquisa",
          "Comparação antes e depois da campanha",
          "Tendência entre ondas"
        ],
        "action": "Fale conosco",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "ru": {
    "group": "Планы и цены",
    "title": "Выберите план.",
    "lede": "Три способа работы, подобранные под исследовательский вопрос и его масштаб.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Анкета на платформе",
        "name": "Самообслуживание",
        "body": "Создайте анкету в редакторе или пришлите нам свою, а мы проведём полевой этап.",
        "price": "From US$200",
        "priceNote": "за исследование",
        "points": [
          "Нацеливание по профилю",
          "Реальные респонденты, ручная проверка",
          "Предварительные данные за 48 часов",
          "Результаты в панели",
          "Несколько исследований в одном рабочем пространстве"
        ],
        "action": "Заказать демо",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Индивидуальная анкета",
        "name": "Индивидуальное исследование",
        "body": "Анкета разрабатывается под задачу исследования; выборка, полевой этап и сдача выполняются как одна работа.",
        "price": "Based on scope",
        "priceNote": "смета на проект",
        "points": [
          "Разработка под задачу",
          "Объём и смета согласуются заранее",
          "Поддержка экспертов по исследованиям",
          "Реальные респонденты, ручная проверка",
          "Квоты и структура выборки",
          "Прогресс в одном рабочем пространстве"
        ],
        "action": "Связаться с нами",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Бренд-трекер",
        "name": "Отслеживание бренда",
        "body": "Здоровье бренда измеряется по фиксированной анкете, волна за волной, с сопоставимыми трендами за разные периоды.",
        "price": "Based on scope",
        "priceNote": "смета на план волн",
        "points": [
          "Волны раз в квартал или полгода",
          "Спонтанная и подсказанная известность",
          "Рассмотрение, использование и NPS",
          "Реальные респонденты, ручная проверка",
          "Поддержка экспертов по исследованиям",
          "Сравнение до и после кампании",
          "Тренд между волнами"
        ],
        "action": "Связаться с нами",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "sv": {
    "group": "Planer och priser",
    "title": "Välj din plan.",
    "lede": "Tre sätt att arbeta, anpassade efter forskningsfrågan och dess omfattning.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Frågeformulär på plattformen",
        "name": "Självbetjäning",
        "body": "Bygg frågeformuläret i editorn eller skicka oss ditt eget så genomför vi fältarbetet.",
        "price": "From US$200",
        "priceNote": "per studie",
        "points": [
          "Riktat efter profil",
          "Riktiga respondenter, manuellt kontrollerade",
          "Preliminära data inom 48 timmar",
          "Resultat i instrumentpanelen",
          "Flera studier i en arbetsyta"
        ],
        "action": "Boka en demo",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Anpassat frågeformulär",
        "name": "Anpassad undersökning",
        "body": "Frågeformuläret utformas efter forskningssyftet, och urval, fältarbete och leverans utförs som en och samma uppgift.",
        "price": "Based on scope",
        "priceNote": "offert per projekt",
        "points": [
          "Utformat kring syftet",
          "Omfattning och offert avtalas först",
          "Stöd från forskningsexperter",
          "Riktiga respondenter, manuellt kontrollerade",
          "Kvoter och urvalsstruktur",
          "Framdrift i en arbetsyta"
        ],
        "action": "Kontakta oss",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Varumärkestracker",
        "name": "Varumärkesspårning",
        "body": "Varumärkets hälsa mäts med ett fast frågeformulär, våg för våg, med jämförbara trendresultat över perioder.",
        "price": "Based on scope",
        "priceNote": "offert per vågplan",
        "points": [
          "Kvartalsvisa eller halvårsvisa vågor",
          "Ohjälpt och hjälpt kännedom",
          "Övervägande, användning och NPS",
          "Riktiga respondenter, manuellt kontrollerade",
          "Stöd från forskningsexperter",
          "Jämförelse före och efter kampanj",
          "Trend mellan vågor"
        ],
        "action": "Kontakta oss",
        "to": "/business/access",
        "primary": false
      }
    ]
  },
  "tr": {
    "group": "Planlar ve fiyatlar",
    "title": "Planınızı seçin.",
    "lede": "Araştırma sorusuna ve ölçeğine göre üç çalışma yolu.",
    "plans": [
      {
        "icon": "ClipboardList",
        "kicker": "Platformda anket",
        "name": "Self servis",
        "body": "Anketi düzenleyicide oluşturun veya kendi anketinizi bize gönderin, saha çalışmasını biz yürütelim.",
        "price": "From US$200",
        "priceNote": "çalışma başına",
        "points": [
          "Profile göre hedefleme",
          "Gerçek katılımcılar, elle doğrulanır",
          "48 saat içinde ön veriler",
          "Sonuçlar panoda",
          "Tek çalışma alanında birden fazla araştırma"
        ],
        "action": "Demo talep edin",
        "to": "/business/register",
        "primary": true
      },
      {
        "icon": "UsersRound",
        "kicker": "Özel anket",
        "name": "Özel araştırma",
        "body": "Anket araştırma hedefine göre tasarlanır; örnekleme, saha çalışması ve teslim tek bir iş olarak yürütülür.",
        "price": "Based on scope",
        "priceNote": "proje başına teklif",
        "points": [
          "Hedefe göre tasarım",
          "Kapsam ve teklif önce onaylanır",
          "Araştırma uzmanı desteği",
          "Gerçek katılımcılar, elle doğrulanır",
          "Kota ve örneklem yapısı",
          "Tek çalışma alanında ilerleme"
        ],
        "action": "Bize ulaşın",
        "to": "/business/access",
        "primary": false
      },
      {
        "icon": "ChartSpline",
        "kicker": "Marka takipçisi",
        "name": "Marka takibi",
        "body": "Marka sağlığı sabit bir anketle dalga dalga ölçülür ve dönemler arasında karşılaştırılabilir trend çıktısı üretilir.",
        "price": "Based on scope",
        "priceNote": "dalga planı başına teklif",
        "points": [
          "Üç aylık veya altı aylık dalgalar",
          "Kendiliğinden ve hatırlatmalı bilinirlik",
          "Değerlendirme, kullanım ve NPS",
          "Gerçek katılımcılar, elle doğrulanır",
          "Araştırma uzmanı desteği",
          "Kampanya öncesi ve sonrası karşılaştırma",
          "Dalgalar arası trend"
        ],
        "action": "Bize ulaşın",
        "to": "/business/access",
        "primary": false
      }
    ]
  }
};

export default function QuantitativePlans() {
  const { language } = useLanguage();
  const t = copy[language] || copy['en-US'];
  usePageTitle(`${t.group} · ${t.title}`);

  return (
    <section className="plans-page" aria-labelledby="plans-title">
      <section className="pl-hero">
        <p className="pl-eyebrow">{t.group}</p>
        <h2 id="plans-title" className="pl-title">{t.title}</h2>
        <p className="pl-lede">{t.lede}</p>
      </section>

      <section className="pl-grid" aria-label={t.title}>
        {t.plans.map((plan) => {
          const Icon = ICONS[plan.icon] || ClipboardList;
          return (
            <article key={plan.name} className={`pl-card${plan.primary ? ' pl-card--lead' : ''}`}>
              <Icon size={23} strokeWidth={1.65} aria-hidden="true" />
              <p className="pl-kicker">{plan.kicker}</p>
              <h2>{plan.name}</h2>
              <p className="pl-body">{plan.body}</p>
              <p className="pl-price">{plan.price}</p>
              <p className="pl-price-note">{plan.priceNote}</p>
              <ul className="pl-points">
                {plan.points.map((point) => (
                  <li key={point}>
                    <Check size={14} strokeWidth={2} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                className={`pl-action${plan.primary ? ' pl-action--solid' : ' pl-action--quiet'}`}
                to={withLanguage(plan.to, language)}
              >
                {plan.action}
                <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </section>
    </section>
  );
}
