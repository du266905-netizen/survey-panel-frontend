import { Link } from 'react-router-dom';
import {
  ArrowRight, ClipboardPenLine, FilePenLine, Sparkles, Route, LayoutDashboard,
} from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './MarketEntry.css';

/* 图标留在组件里，文案里只写名字；渲染时在这里换成组件。 */
const ICONS = { ClipboardPenLine, FilePenLine, Sparkles, Route, LayoutDashboard };

/* 解决方案 · 进入市场 —— 2026-10-27 第一张，故意做短。

   文案全部来自已有的东西：眉标和标题来自 Solutions 导航，说明句就是那条
   note（Size, audience and route to market）的中文，按钮和三个方法名也都在
   站里出现过。没有新写的判断句、没有数字、没有案例——数据和案例等业主给，
   到了往 me-methods 后面加段就行。

   版式按业主定的：灰屏 → 更深一档的灰 → 黑。首屏 80 字，整屏就一句。 */

/* 十个行业，绕着首屏那句大字转。名字和链接取行业页自己的文案。
   轨道不是正圆：每条卡自己的半径、起始角、周期都不一样，看起来是散着的，
   但半径都落在文字框之外，转到哪儿都不会压到标题。 */
const industryKeys = ['automotive', 'travel', 'consumer', 'healthcare', 'finance', 'social', 'industrial', 'tech', 'media', 'ecommerce'];



const copy = {
  'en-US': {
    group: 'Market entry',
    title: 'A clear brief is where good research starts.',
    lede: 'Size, audience and route to market.',
    free: 'Start for free',
    action: 'Contact sales',
    platformLabel: 'The platform',
    platformTitle: 'One set of tools, from question to report.',
    platform: [
      { icon: 'ClipboardPenLine', title: 'Questionnaire design', body: 'Bring the decision and the people who matter; we prepare a focused questionnaire.' },
      { icon: 'FilePenLine', title: 'Questionnaire editor', body: 'Edit questions, add logic and preview in the editor; a revision is not a meeting.' },
      { icon: 'Sparkles', title: 'AI assist', body: 'Draft with AI and check the logic; the judgement stays with people.' },
      { icon: 'Route', title: 'Custom research', body: 'Agree the format, participants, timing and deliverables before the work starts.' },
      { icon: 'LayoutDashboard', title: 'One workspace', body: 'The brief, the confirmed plan, progress and next steps stay in one place.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
  },
  'en-GB': {
    group: 'Market entry',
    title: 'A clear brief is where good research starts.',
    lede: 'Size, audience and route to market.',
    free: 'Start for free',
    action: 'Contact sales',
    platformLabel: 'The platform',
    platformTitle: 'One set of tools, from question to report.',
    platform: [
      { icon: ClipboardPenLine, title: 'Questionnaire design', body: 'Bring the decision and the people who matter; we prepare a focused questionnaire.' },
      { icon: FilePenLine, title: 'Questionnaire editor', body: 'Edit questions, add logic and preview in the editor; a revision is not a meeting.' },
      { icon: Sparkles, title: 'AI assist', body: 'Draft with AI and check the logic; the judgement stays with people.' },
      { icon: Route, title: 'Custom research', body: 'Agree the format, participants, timing and deliverables before the work starts.' },
      { icon: LayoutDashboard, title: 'One workspace', body: 'The brief, the confirmed plan, progress and next steps stay in one place.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
  },
  'zh-CN': {
    group: '进入市场',
    title: '清晰的需求，是好研究的起点。',
    lede: '规模、受众与进入路径。',
    free: '免费开始',
    action: '联系销售',
    platformLabel: '研究平台',
    platformTitle: '一套工具，从问题到报告。',
    platform: [
      { icon: ClipboardPenLine, title: '问卷设计', body: '带来你的决策和重要的人群，我们为项目准备聚焦的问卷。' },
      { icon: FilePenLine, title: '问卷编辑器', body: '在编辑器里改题、加逻辑、预览，改一版不用等一次会议。' },
      { icon: Sparkles, title: 'AI 辅助', body: '用 AI 起草初稿、检查逻辑，判断留给人。' },
      { icon: Route, title: '定制研究', body: '先定形式、参与者、时间与交付物，再开工。' },
      { icon: LayoutDashboard, title: '统一工作区', body: '需求、确认的方案、进度和下一步，都在一个工作区里。' },
    ],
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
  },
  'zh-Hant': {
    group: '進入市場',
    title: '清晰的需求，是好研究的起點。',
    lede: '規模、受眾與進入路徑。',
    free: '免費開始',
    action: '聯繫銷售',
    platformLabel: '研究平台',
    platformTitle: '一套工具，從問題到報告。',
    platform: [
      { icon: ClipboardPenLine, title: '問卷設計', body: '帶來你的決策和重要的人群，我們為專案準備聚焦的問卷。' },
      { icon: FilePenLine, title: '問卷編輯器', body: '在編輯器裡改題、加邏輯、預覽，改一版不用等一次會議。' },
      { icon: Sparkles, title: 'AI 輔助', body: '用 AI 起草初稿、檢查邏輯，判斷留給人。' },
      { icon: Route, title: '定製研究', body: '先定形式、參與者、時間與交付物，再開工。' },
      { icon: LayoutDashboard, title: '統一工作區', body: '需求、確認的方案、進度與下一步，都在一個工作區裡。' },
    ],
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
  },
  "de": {
  "group": "Markteintritt",
  "title": "Ein klares Briefing ist der Anfang guter Forschung.",
  "lede": "Größe, Zielgruppe und Weg in den Markt.",
  "free": "Kostenlos starten",
  "action": "Vertrieb kontaktieren",
  "platformLabel": "Die Plattform",
  "platformTitle": "Ein Werkzeugkasten, von der Frage bis zum Bericht.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Fragebogenentwicklung",
      "body": "Die Entscheidungsfrage und die relevanten Personen mitbringen; wir erstellen einen fokussierten Fragebogen."
    },
    {
      "icon": "FilePenLine",
      "title": "Fragebogen-Editor",
      "body": "Fragen bearbeiten, Logik ergänzen und im Editor eine Vorschau ansehen; eine Überarbeitung braucht kein Meeting."
    },
    {
      "icon": "Sparkles",
      "title": "KI-Unterstützung",
      "body": "Mit KI entwerfen und die Logik prüfen; die Beurteilung bleibt bei den Menschen."
    },
    {
      "icon": "Route",
      "title": "Individuelle Forschung",
      "body": "Format, Teilnehmende, Zeitplan und Liefergegenstände vor dem Start abstimmen."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Ein Arbeitsbereich",
      "body": "Briefing, bestätigter Plan, Fortschritt und nächste Schritte bleiben an einem Ort."
    }
  ],
  "contactTitle": [
    "Sagen Sie uns, was Sie vorhaben, ",
    "und wir klären den nächsten Schritt gemeinsam."
  ],
  "methodsLabel": "Methoden",
  "methods": [
    {
      "label": "Qualitativ",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Quantitativ",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Mixed Methods",
      "to": "/how-it-works"
    }
  ]
},
  "fr": {
  "group": "Entrée sur le marché",
  "title": "Un brief clair est le point de départ d’une bonne étude.",
  "lede": "Taille, audience et accès au marché.",
  "free": "Commencer gratuitement",
  "action": "Contacter les ventes",
  "platformLabel": "La plateforme",
  "platformTitle": "Un ensemble d’outils, de la question au rapport.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Conception de questionnaire",
      "body": "Apportez la décision à prendre et les personnes concernées ; nous préparons un questionnaire ciblé."
    },
    {
      "icon": "FilePenLine",
      "title": "Éditeur de questionnaire",
      "body": "Modifiez les questions, ajoutez de la logique et prévisualisez dans l’éditeur ; une révision ne demande pas de réunion."
    },
    {
      "icon": "Sparkles",
      "title": "Assistance IA",
      "body": "Rédigez avec l’IA et vérifiez la logique ; le jugement reste aux personnes."
    },
    {
      "icon": "Route",
      "title": "Étude sur mesure",
      "body": "Définissez le format, les participants, le calendrier et les livrables avant le début des travaux."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Un espace de travail",
      "body": "Le brief, le plan validé, l’avancement et les prochaines étapes restent au même endroit."
    }
  ],
  "contactTitle": [
    "Dites-nous ce que vous avez en tête, ",
    "et nous définirons la prochaine étape ensemble."
  ],
  "methodsLabel": "Méthodes",
  "methods": [
    {
      "label": "Qualitative",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Quantitative",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Méthodes mixtes",
      "to": "/how-it-works"
    }
  ]
},
  "nl": {
  "group": "Toetreding tot de markt",
  "title": "Een duidelijke briefing is het startpunt van goed onderzoek.",
  "lede": "Omvang, doelgroep en route naar de markt.",
  "free": "Gratis starten",
  "action": "Contact opnemen met sales",
  "platformLabel": "Het platform",
  "platformTitle": "Eén set tools, van vraag tot rapport.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Vragenlijstontwerp",
      "body": "De beslissing en de relevante mensen meebrengen; wij maken een gerichte vragenlijst."
    },
    {
      "icon": "FilePenLine",
      "title": "Vragenlijsteditor",
      "body": "Vragen aanpassen, logica toevoegen en previewen in de editor; een revisie vraagt geen vergadering."
    },
    {
      "icon": "Sparkles",
      "title": "AI-hulp",
      "body": "Met AI een eerste versie maken en de logica controleren; de beoordeling blijft bij mensen."
    },
    {
      "icon": "Route",
      "title": "Onderzoek op maat",
      "body": "Vorm, deelnemers, timing en opleveringen afspreken voordat het werk begint."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Eén werkruimte",
      "body": "De briefing, het bevestigde plan, de voortgang en de volgende stappen staan op één plek."
    }
  ],
  "contactTitle": [
    "Vertel ons wat u voor ogen hebt, ",
    "en we bepalen samen de volgende stap."
  ],
  "methodsLabel": "Methoden",
  "methods": [
    {
      "label": "Kwalitatief",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Kwantitatief",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Gemengde methoden",
      "to": "/how-it-works"
    }
  ]
},
  "da": {
  "group": "Markedsadgang",
  "title": "En klar briefing er udgangspunktet for en god undersøgelse.",
  "lede": "Størrelse, målgruppe og vej til markedet.",
  "free": "Start gratis",
  "action": "Kontakt salg",
  "platformLabel": "Platformen",
  "platformTitle": "Ét værktøjssæt, fra spørgsmål til rapport.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Spørgeskemadesign",
      "body": "Tag beslutningen og de relevante personer med; vi udarbejder et fokuseret spørgeskema."
    },
    {
      "icon": "FilePenLine",
      "title": "Spørgeskemaeditor",
      "body": "Rediger spørgsmål, tilføj logik og forhåndsvis i editoren; en revision kræver ikke et møde."
    },
    {
      "icon": "Sparkles",
      "title": "AI-hjælp",
      "body": "Lav et udkast med AI og kontroller logikken; vurderingen bliver hos mennesker."
    },
    {
      "icon": "Route",
      "title": "Skræddersyet undersøgelse",
      "body": "Aftal form, deltagere, timing og leverancer før arbejdet begynder."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Ét arbejdsområde",
      "body": "Briefing, den bekræftede plan, fremdrift og næste skridt står på ét sted."
    }
  ],
  "contactTitle": [
    "Fortæl os, hvad du har i tankerne, ",
    "og så finder vi næste skridt sammen."
  ],
  "methodsLabel": "Metoder",
  "methods": [
    {
      "label": "Kvalitativ",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Kvantitativ",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Mixed methods",
      "to": "/how-it-works"
    }
  ]
},
  "es": {
  "group": "Entrada al mercado",
  "title": "Un brief claro es el punto de partida de una buena investigación.",
  "lede": "Tamaño, audiencia y ruta al mercado.",
  "free": "Empezar gratis",
  "action": "Contactar con ventas",
  "platformLabel": "La plataforma",
  "platformTitle": "Un conjunto de herramientas, de la pregunta al informe.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Diseño de cuestionarios",
      "body": "Trae la decisión que hay que tomar y a las personas relevantes; preparamos un cuestionario centrado."
    },
    {
      "icon": "FilePenLine",
      "title": "Editor de cuestionarios",
      "body": "Edita preguntas, añade lógica y previsualiza en el editor; una revisión no requiere una reunión."
    },
    {
      "icon": "Sparkles",
      "title": "Asistencia con IA",
      "body": "Redacta con IA y revisa la lógica; el criterio sigue en manos de las personas."
    },
    {
      "icon": "Route",
      "title": "Investigación a medida",
      "body": "Acuerda el formato, los participantes, los plazos y los entregables antes de empezar."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Un espacio de trabajo",
      "body": "El brief, el plan confirmado, el avance y los siguientes pasos permanecen en un mismo lugar."
    }
  ],
  "contactTitle": [
    "Cuéntanos qué tienes en mente, ",
    "y veremos el siguiente paso juntos."
  ],
  "methodsLabel": "Métodos",
  "methods": [
    {
      "label": "Cualitativa",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Cuantitativa",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Métodos mixtos",
      "to": "/how-it-works"
    }
  ]
},
  "fi": {
  "group": "Markkinoille tulo",
  "title": "Selkeä brief on hyvän tutkimuksen lähtökohta.",
  "lede": "Koko, kohderyhmä ja reitti markkinoille.",
  "free": "Aloita ilmaiseksi",
  "action": "Ota yhteyttä myyntiin",
  "platformLabel": "Alusta",
  "platformTitle": "Yksi työkalukokonaisuus, kysymyksestä raporttiin.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Kyselylomakkeen suunnittelu",
      "body": "Tuo päätettävä asia ja tärkeät henkilöt; me valmistelemme kohdennetun kyselylomakkeen."
    },
    {
      "icon": "FilePenLine",
      "title": "Kyselylomakkeen editori",
      "body": "Muokkaa kysymyksiä, lisää logiikkaa ja esikatsele editorissa; versiointi ei vaadi palaveria."
    },
    {
      "icon": "Sparkles",
      "title": "Tekoälytuki",
      "body": "Luonnostele tekoälyllä ja tarkista logiikka; arviointi jää ihmisille."
    },
    {
      "icon": "Route",
      "title": "Räätälöity tutkimus",
      "body": "Sovi muoto, osallistujat, aikataulu ja tuotokset ennen työn alkua."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Yksi työtila",
      "body": "Brief, vahvistettu suunnitelma, edistyminen ja seuraavat askeleet ovat yhdessä paikassa."
    }
  ],
  "contactTitle": [
    "Kerro meille, mitä ajattelet, ",
    "niin mietimme seuraavan askeleen yhdessä."
  ],
  "methodsLabel": "Menetelmät",
  "methods": [
    {
      "label": "Laadullinen",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Määrällinen",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Monimenetelmä",
      "to": "/how-it-works"
    }
  ]
},
  "it": {
  "group": "Ingresso nel mercato",
  "title": "Un brief chiaro è il punto di partenza di una buona ricerca.",
  "lede": "Dimensione, pubblico e percorso verso il mercato.",
  "free": "Inizia gratis",
  "action": "Contatta le vendite",
  "platformLabel": "La piattaforma",
  "platformTitle": "Un unico set di strumenti, dalla domanda al report.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Progettazione del questionario",
      "body": "Porta la decisione da prendere e le persone rilevanti; prepariamo un questionario mirato."
    },
    {
      "icon": "FilePenLine",
      "title": "Editor del questionario",
      "body": "Modifica le domande, aggiungi logica e visualizza l’anteprima nell’editor; una revisione non richiede una riunione."
    },
    {
      "icon": "Sparkles",
      "title": "Supporto IA",
      "body": "Redigi con l’IA e verifica la logica; il giudizio resta alle persone."
    },
    {
      "icon": "Route",
      "title": "Ricerca su misura",
      "body": "Concorda formato, partecipanti, tempi e output prima dell’inizio del lavoro."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Un unico workspace",
      "body": "Il brief, il piano confermato, l’avanzamento e i prossimi passi restano in un unico posto."
    }
  ],
  "contactTitle": [
    "Raccontaci cosa hai in mente, ",
    "e definiremo il prossimo passo insieme."
  ],
  "methodsLabel": "Metodi",
  "methods": [
    {
      "label": "Qualitativa",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Quantitativa",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Metodi misti",
      "to": "/how-it-works"
    }
  ]
},
  "ja": {
  "group": "市場参入",
  "title": "明確な依頼内容が、よい調査の出発点です。",
  "lede": "規模、対象者、市場への経路です。",
  "free": "無料で始める",
  "action": "営業に問い合わせる",
  "platformLabel": "プラットフォーム",
  "platformTitle": "質問からレポートまでを支える一つのツール群",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "アンケート設計",
      "body": "判断したいテーマと重要な関係者をお知らせください。当社が焦点を絞ったアンケートをご用意します。"
    },
    {
      "icon": "FilePenLine",
      "title": "アンケートエディタ",
      "body": "エディタで質問の編集、ロジックの追加、プレビューができます。修正版の確認に会議は要りません。"
    },
    {
      "icon": "Sparkles",
      "title": "AI 支援",
      "body": "AI で下書きを作成し、ロジックを確認します。判断は人が行います。"
    },
    {
      "icon": "Route",
      "title": "カスタム調査",
      "body": "形式、参加者、スケジュール、成果物を作業開始前に合意します。"
    },
    {
      "icon": "LayoutDashboard",
      "title": "一つのワークスペース",
      "body": "依頼内容、確定した計画、進捗、次のステップを一か所にまとめます。"
    }
  ],
  "contactTitle": [
    "ご検討中の内容をお聞かせください。",
    "次のステップは一緒に整理します。"
  ],
  "methodsLabel": "手法",
  "methods": [
    {
      "label": "定性調査",
      "to": "/solutions/qualitative"
    },
    {
      "label": "定量調査",
      "to": "/solutions/quantitative"
    },
    {
      "label": "ミックスメソッド",
      "to": "/how-it-works"
    }
  ]
},
  "ko": {
  "group": "시장 진입",
  "title": "명확한 브리프가 좋은 리서치의 출발점입니다.",
  "lede": "규모, 대상, 시장 진입 경로입니다.",
  "free": "무료로 시작하기",
  "action": "영업팀 문의",
  "platformLabel": "플랫폼",
  "platformTitle": "질문부터 보고서까지 하나의 도구 세트로 지원합니다.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "설문 설계",
      "body": "의사결정과 중요한 관계자를 알려 주시면 집중된 설문을 준비합니다."
    },
    {
      "icon": "FilePenLine",
      "title": "설문 편집기",
      "body": "편집기에서 질문을 수정하고 로직을 추가하며 미리 볼 수 있습니다. 수정본 검토에 회의가 필요하지 않습니다."
    },
    {
      "icon": "Sparkles",
      "title": "AI 지원",
      "body": "AI로 초안을 작성하고 로직을 확인합니다. 판단은 사람이 합니다."
    },
    {
      "icon": "Route",
      "title": "맞춤 리서치",
      "body": "작업을 시작하기 전에 형식, 참여자, 일정, 산출물을 합의합니다."
    },
    {
      "icon": "LayoutDashboard",
      "title": "하나의 워크스페이스",
      "body": "브리프, 확정된 계획, 진행 상황, 다음 단계를 한곳에서 관리합니다."
    }
  ],
  "contactTitle": [
    "생각하고 계신 내용을 알려 주세요.",
    "다음 단계는 함께 정리하겠습니다."
  ],
  "methodsLabel": "방법론",
  "methods": [
    {
      "label": "정성 조사",
      "to": "/solutions/qualitative"
    },
    {
      "label": "정량 조사",
      "to": "/solutions/quantitative"
    },
    {
      "label": "혼합 방법",
      "to": "/how-it-works"
    }
  ]
},
  "no": {
  "group": "Markedsinngang",
  "title": "En tydelig brief er utgangspunktet for en god undersøkelse.",
  "lede": "Størrelse, målgruppe og vei til markedet.",
  "free": "Start gratis",
  "action": "Kontakt salg",
  "platformLabel": "Plattformen",
  "platformTitle": "Ett sett verktøy, fra spørsmål til rapport.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Spørreskjemadesign",
      "body": "Ta med beslutningen og de relevante personene; vi lager et fokusert spørreskjema."
    },
    {
      "icon": "FilePenLine",
      "title": "Spørreskjemaeditor",
      "body": "Rediger spørsmål, legg til logikk og forhåndsvis i editoren; en revisjon krever ikke et møte."
    },
    {
      "icon": "Sparkles",
      "title": "AI-hjelp",
      "body": "Lag utkast med AI og kontroller logikken; vurderingen blir hos menneskene."
    },
    {
      "icon": "Route",
      "title": "Tilpasset undersøkelse",
      "body": "Avtal form, deltakere, tidspunkt og leveranser før arbeidet starter."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Ett arbeidsområde",
      "body": "Briefen, den bekreftede planen, fremdriften og neste steg finnes på ett sted."
    }
  ],
  "contactTitle": [
    "Fortell oss hva du tenker på, ",
    "så finner vi neste steg sammen."
  ],
  "methodsLabel": "Metoder",
  "methods": [
    {
      "label": "Kvalitativ",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Kvantitativ",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Mixed methods",
      "to": "/how-it-works"
    }
  ]
},
  "pt": {
  "group": "Entrada no mercado",
  "title": "Um briefing claro é o ponto de partida de uma boa pesquisa.",
  "lede": "Dimensão, público e caminho para o mercado.",
  "free": "Começar grátis",
  "action": "Falar com vendas",
  "platformLabel": "A plataforma",
  "platformTitle": "Um conjunto de ferramentas, da pergunta ao relatório.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Desenho do questionário",
      "body": "Traga a decisão a tomar e as pessoas relevantes; preparamos um questionário focado."
    },
    {
      "icon": "FilePenLine",
      "title": "Editor de questionários",
      "body": "Edite perguntas, adicione lógica e pré-visualize no editor; uma revisão não exige uma reunião."
    },
    {
      "icon": "Sparkles",
      "title": "Assistência de IA",
      "body": "Redija com IA e verifique a lógica; o julgamento fica com as pessoas."
    },
    {
      "icon": "Route",
      "title": "Pesquisa personalizada",
      "body": "Defina o formato, os participantes, os prazos e as entregas antes do início do trabalho."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Um espaço de trabalho",
      "body": "O briefing, o plano confirmado, o progresso e os próximos passos ficam no mesmo lugar."
    }
  ],
  "contactTitle": [
    "Conte-nos o que tem em mente, ",
    "e definimos o próximo passo em conjunto."
  ],
  "methodsLabel": "Métodos",
  "methods": [
    {
      "label": "Qualitativa",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Quantitativa",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Métodos mistos",
      "to": "/how-it-works"
    }
  ]
},
  "ru": {
  "group": "Выход на рынок",
  "title": "Понятный бриф — начало хорошего исследования.",
  "lede": "Размер, аудитория и путь на рынок.",
  "free": "Начать бесплатно",
  "action": "Связаться с отделом продаж",
  "platformLabel": "Платформа",
  "platformTitle": "Один набор инструментов — от вопроса до отчёта.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Дизайн анкеты",
      "body": "Расскажите о решении и о ключевых людях; мы подготовим сфокусированную анкету."
    },
    {
      "icon": "FilePenLine",
      "title": "Редактор анкеты",
      "body": "Меняйте вопросы, добавляйте логику и просматривайте результат в редакторе; правка не требует встречи."
    },
    {
      "icon": "Sparkles",
      "title": "Помощь ИИ",
      "body": "Составьте черновик с помощью ИИ и проверьте логику; решение остаётся за людьми."
    },
    {
      "icon": "Route",
      "title": "Заказное исследование",
      "body": "Согласуйте формат, участников, сроки и результаты до начала работы."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Единое рабочее пространство",
      "body": "Бриф, утверждённый план, прогресс и следующие шаги остаются в одном месте."
    }
  ],
  "contactTitle": [
    "Расскажите, что вы задумали, ",
    "и мы вместе определим следующий шаг."
  ],
  "methodsLabel": "Методы",
  "methods": [
    {
      "label": "Качественные",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Количественные",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Смешанные методы",
      "to": "/how-it-works"
    }
  ]
},
  "sv": {
  "group": "Marknadsinträde",
  "title": "En tydlig brief är utgångspunkten för en bra undersökning.",
  "lede": "Storlek, målgrupp och väg till marknaden.",
  "free": "Starta gratis",
  "action": "Kontakta sälj",
  "platformLabel": "Plattformen",
  "platformTitle": "En uppsättning verktyg, från fråga till rapport.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Enkätdesign",
      "body": "Ta med beslutet och de viktiga personerna; vi tar fram en fokuserad enkät."
    },
    {
      "icon": "FilePenLine",
      "title": "Enkätredigerare",
      "body": "Redigera frågor, lägg till logik och förhandsgranska i redigeraren; en revidering kräver inget möte."
    },
    {
      "icon": "Sparkles",
      "title": "AI-hjälp",
      "body": "Skriv utkast med AI och kontrollera logiken; bedömningen stannar hos människorna."
    },
    {
      "icon": "Route",
      "title": "Anpassad undersökning",
      "body": "Kom överens om format, deltagare, tidplan och leveranser innan arbetet börjar."
    },
    {
      "icon": "LayoutDashboard",
      "title": "En arbetsyta",
      "body": "Briefen, den bekräftade planen, läget och nästa steg finns på ett ställe."
    }
  ],
  "contactTitle": [
    "Berätta vad du har i åtanke, ",
    "så tar vi fram nästa steg tillsammans."
  ],
  "methodsLabel": "Metoder",
  "methods": [
    {
      "label": "Kvalitativ",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Kvantitativ",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Blandade metoder",
      "to": "/how-it-works"
    }
  ]
},
  "tr": {
  "group": "Pazara giriş",
  "title": "Net bir brief, iyi araştırmanın başlangıç noktasıdır.",
  "lede": "Büyüklük, hedef kitle ve pazara giriş yolu.",
  "free": "Ücretsiz başla",
  "action": "Satış ekibiyle iletişime geç",
  "platformLabel": "Platform",
  "platformTitle": "Sorudan rapora kadar tek bir araç seti.",
  "platform": [
    {
      "icon": "ClipboardPenLine",
      "title": "Anket tasarımı",
      "body": "Kararı ve önemli kişileri getirin; odaklı bir anket hazırlarız."
    },
    {
      "icon": "FilePenLine",
      "title": "Anket düzenleyici",
      "body": "Soruları düzenleyin, mantık ekleyin ve düzenleyicide önizleyin; bir revizyon toplantı gerektirmez."
    },
    {
      "icon": "Sparkles",
      "title": "AI desteği",
      "body": "AI ile taslak oluşturun ve mantığı kontrol edin; değerlendirme insanlarda kalır."
    },
    {
      "icon": "Route",
      "title": "Özel araştırma",
      "body": "Çalışma başlamadan önce biçim, katılımcılar, zamanlama ve çıktılar üzerinde anlaşın."
    },
    {
      "icon": "LayoutDashboard",
      "title": "Tek çalışma alanı",
      "body": "Brief, onaylanmış plan, ilerleme ve sonraki adımlar tek bir yerde durur."
    }
  ],
  "contactTitle": [
    "Aklınızdaki konuyu bize anlatın, ",
    "sonraki adımı birlikte belirleyelim."
  ],
  "methodsLabel": "Yöntemler",
  "methods": [
    {
      "label": "Nitel",
      "to": "/solutions/qualitative"
    },
    {
      "label": "Nicel",
      "to": "/solutions/quantitative"
    },
    {
      "label": "Karma yöntem",
      "to": "/how-it-works"
    }
  ]
}
};

export default function MarketEntry() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  // 标题和说明句跟导航面板用同一份译文（chromeCopy.items['market-entry']），
  // 改一处两边一起改，不会再出现「受众 / 人群」这种对不上的情况。
  const entry = publicCopy.chrome?.items?.['market-entry'];
  const t = { ...base, group: entry?.title || base.group, lede: entry?.note || base.lede };
  usePageTitle(t.group);

  return (
    <main className="market-entry-page">
      <section className="me-hero">
        <p className="me-eyebrow">{t.group}</p>
        <h1 className="me-title">{t.title}</h1>
        <p className="me-lede">{t.lede}</p>
        <div className="me-actions">
          <Link className="me-action me-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="me-action me-action--quiet" to={withLanguage('/business/access', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>

      </section>

      <section className="me-methods" aria-labelledby="me-methods-title">
        <p className="me-eyebrow me-eyebrow--light" id="me-methods-title">{t.methodsLabel}</p>
        <ul>
          {t.methods.map((method) => (
            <li key={method.label}>
              <Link to={withLanguage(method.to, language)}>
                {method.label}
                <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="me-platform" aria-labelledby="me-platform-title">
        <p className="me-eyebrow me-eyebrow--light">{t.platformLabel}</p>
        <h2 id="me-platform-title" className="me-platform-title">{t.platformTitle}</h2>
        <ul className="me-platform-grid">
          {t.platform.map((item) => {
            const Icon = ICONS[item.icon] || ClipboardPenLine;
            return (
              <li key={item.title}>
                <Icon size={23} strokeWidth={1.65} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="me-contact" aria-labelledby="me-contact-title">
        <h2 id="me-contact-title" className="me-contact-title">
          {t.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <div className="me-actions">
          <Link className="me-action me-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="me-action me-action--quiet" to={withLanguage('/business/access', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
