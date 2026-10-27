import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquareText, ClipboardPenLine, UsersRound, Eye } from 'lucide-react';

const ICONS = { MessageSquareText, ClipboardPenLine, UsersRound, Eye };
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './Qualitative.css';

/* 解决方案 · 定性研究 —— 2026-10-27 第二张。

   版式沿用进入市场：灰 → 深灰 → 黑 → 灰收尾，无图无视频，主按钮用荧光黄。
   文案来源（逐条可查）：
     · 眉标、说明句 = 导航里的定性条目（publicPageCopy.js:20974）
     · 三个做法 = 同一条 note 的三个词（深访 / 座谈会 / 观察）
     · 四步骨架 = MMI 案例文档的四段结构（Objective → Methodology → Sample → Outcome）
     · 其余短句是这一轮新写的，业主没点头的不算数 */

const copy = {
  'en-US': {
    group: 'Qualitative research',
    title: 'Find out why first, then decide what to do.',
    lede: 'Interviews, groups and observation.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'What we run',
    methods: [
      { icon: 'MessageSquareText', title: 'Interviews', body: 'One to one, in person, by phone or online. Hard-to-reach people come through the community and referrals.' },
      { icon: 'UsersRound', title: 'Groups', body: 'A small group around one topic, so views can be tested against each other.' },
      { icon: 'Eye', title: 'Observation', body: 'At home, in store or on site: what people actually do, not what they say they do.' },
    ],
    processLabel: 'How a study runs',
    process: [
      { k: '01', title: 'The decision', body: 'Name the decision the study has to support.' },
      { k: '02', title: 'The method', body: 'Pick the format and the sessions for that question, not from a template.' },
      { k: '03', title: 'The sample', body: 'Fix who is asked, in which cities, and how many.' },
      { k: '04', title: 'The output', body: 'Hand back the judgement and the quotes that support it.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    group: 'Qualitative research',
    title: 'Find out why first, then decide what to do.',
    lede: 'Interviews, groups and observation.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'What we run',
    methods: [
      { icon: MessageSquareText, title: 'Interviews', body: 'One to one, in person, by phone or online. Hard-to-reach people come through the community and referrals.' },
      { icon: UsersRound, title: 'Groups', body: 'A small group around one topic, so views can be tested against each other.' },
      { icon: Eye, title: 'Observation', body: 'At home, in store or on site: what people actually do, not what they say they do.' },
    ],
    processLabel: 'How a study runs',
    process: [
      { k: '01', title: 'The decision', body: 'Name the decision the study has to support.' },
      { k: '02', title: 'The method', body: 'Pick the format and the sessions for that question, not from a template.' },
      { k: '03', title: 'The sample', body: 'Fix who is asked, in which cities, and how many.' },
      { k: '04', title: 'The output', body: 'Hand back the judgement and the quotes that support it.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    group: '定性研究',
    title: '先弄清楚为什么，再决定做什么。',
    lede: '深访、座谈会与观察。',
    free: '免费开始',
    action: '联系销售',
    methodsLabel: '我们怎么做',
    methods: [
      { icon: MessageSquareText, title: '深访', body: '一对一，面访、电话或线上。难约的人通过社群和转介绍去找。' },
      { icon: UsersRound, title: '座谈会', body: '一组人围着一个话题谈，让观点互相碰。' },
      { icon: Eye, title: '观察', body: '到家里、店里或工地，看人实际怎么做，而不是他们说自己怎么做。' },
    ],
    processLabel: '一项研究怎么跑',
    process: [
      { k: '01', title: '目的', body: '先说清这项研究要支撑哪个决定。' },
      { k: '02', title: '方法', body: '按这个问题选做法和场次，不套模板。' },
      { k: '03', title: '样本', body: '定清楚问谁、在哪些城市、多少人。' },
      { k: '04', title: '产出', body: '交回能直接上会的判断，和支撑它的原话。' },
    ],
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    group: '定性研究',
    title: '先弄清楚為什麼，再決定做什麼。',
    lede: '深訪、座談會與觀察。',
    free: '免費開始',
    action: '聯繫銷售',
    methodsLabel: '我們怎麼做',
    methods: [
      { icon: MessageSquareText, title: '深訪', body: '一對一，面訪、電話或線上。難約的人透過社群和轉介紹去找。' },
      { icon: UsersRound, title: '座談會', body: '一群人圍著一個話題談，讓觀點互相碰。' },
      { icon: Eye, title: '觀察', body: '到家裡、店裡或工地，看人實際怎麼做，而不是他們說自己怎麼做。' },
    ],
    processLabel: '一項研究怎麼跑',
    process: [
      { k: '01', title: '目的', body: '先說清這項研究要支撐哪個決定。' },
      { k: '02', title: '方法', body: '按這個問題選做法和場次，不套模板。' },
      { k: '03', title: '樣本', body: '定清楚問誰、在哪些城市、多少人。' },
      { k: '04', title: '產出', body: '交回能直接上會的判斷，和支撐它的原話。' },
    ],
    contactTitle: ['告訴我們你的想法，', '我們討論下一步怎麼走。'],
  },
  "de": {
  "group": "Kvalitative Forschung",
  "title": "Erst herausfinden, warum, dann entscheiden, was zu tun ist.",
  "lede": "Tiefeninterviews, Fokusgruppen und Beobachtung.",
  "free": "Kostenlos starten",
  "action": "Vertrieb kontaktieren",
  "methodsLabel": "Was wir durchführen",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Tiefeninterviews",
      "body": "Eins zu eins, persönlich, per Telefon oder online. Schwer erreichbare Personen kommen über die Community und über Empfehlungen."
    },
    {
      "icon": "UsersRound",
      "title": "Fokusgruppen",
      "body": "Eine kleine Gruppe zu einem Thema, sodass Sichtweisen gegeneinander geprüft werden können."
    },
    {
      "icon": "Eye",
      "title": "Beobachtung",
      "body": "Zu Hause, im Laden oder vor Ort: was Menschen tatsächlich tun, verglichen damit, was sie darüber sagen."
    }
  ],
  "processLabel": "So läuft eine Studie ab",
  "process": [
    {
      "k": "01",
      "title": "Die Entscheidung",
      "body": "Benennen Sie die Entscheidung, die die Studie stützen soll."
    },
    {
      "k": "02",
      "title": "Die Methode",
      "body": "Format und Termine richten sich nach dieser Frage."
    },
    {
      "k": "03",
      "title": "Die Stichprobe",
      "body": "Legen Sie fest, wer gefragt wird, in welchen Städten und wie viele."
    },
    {
      "k": "04",
      "title": "Das Ergebnis",
      "body": "Übergeben Sie das Urteil und die Zitate, die es stützen."
    }
  ],
  "contactTitle": [
    "Sagen Sie uns, was Sie vorhaben, ",
    "und wir klären gemeinsam den nächsten Schritt."
  ]
},
  "fr": {
  "group": "Recherche qualitative",
  "title": "Comprendre d'abord le pourquoi, puis décider quoi faire.",
  "lede": "Entretiens approfondis, groupes de discussion et observation.",
  "free": "Commencer gratuitement",
  "action": "Contacter le service commercial",
  "methodsLabel": "Ce que nous réalisons",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Entretiens approfondis",
      "body": "En tête-à-tête, en personne, par téléphone ou en ligne. Les personnes difficiles à joindre sont recrutées via la communauté et les recommandations."
    },
    {
      "icon": "UsersRound",
      "title": "Groupes de discussion",
      "body": "Un petit groupe autour d'un thème, pour confronter les points de vue."
    },
    {
      "icon": "Eye",
      "title": "Observation",
      "body": "À domicile, en magasin ou sur site : ce que les gens font réellement, comparé à ce qu'ils en disent."
    }
  ],
  "processLabel": "Comment se déroule une étude",
  "process": [
    {
      "k": "01",
      "title": "La décision",
      "body": "Nommez la décision que l'étude doit appuyer."
    },
    {
      "k": "02",
      "title": "La méthode",
      "body": "Choisir le format et les séances en fonction de cette question."
    },
    {
      "k": "03",
      "title": "L'échantillon",
      "body": "Fixer qui est interrogé, dans quelles villes et combien de personnes."
    },
    {
      "k": "04",
      "title": "Le livrable",
      "body": "Remettre le jugement et les citations qui le soutiennent."
    }
  ],
  "contactTitle": [
    "Dites-nous ce que vous avez en tête, ",
    "et nous définirons ensemble l'étape suivante."
  ]
},
  "nl": {
  "group": "Kwalitatief onderzoek",
  "title": "Eerst nagaan waarom, dan beslissen wat er moet gebeuren.",
  "lede": "Diepte-interviews, focusgroepen en observatie.",
  "free": "Gratis starten",
  "action": "Contact opnemen met sales",
  "methodsLabel": "Wat wij uitvoeren",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Diepte-interviews",
      "body": "Een-op-een, persoonlijk, telefonisch of online. Moeilijk bereikbare mensen komen via de community en via doorverwijzingen."
    },
    {
      "icon": "UsersRound",
      "title": "Focusgroepen",
      "body": "Een kleine groep rond één onderwerp, zodat standpunten tegen elkaar kunnen worden getoetst."
    },
    {
      "icon": "Eye",
      "title": "Observatie",
      "body": "Thuis, in de winkel of op locatie: wat mensen feitelijk doen, vergeleken met wat ze daarover zeggen."
    }
  ],
  "processLabel": "Hoe een onderzoek verloopt",
  "process": [
    {
      "k": "01",
      "title": "De beslissing",
      "body": "Benoem de beslissing die het onderzoek moet ondersteunen."
    },
    {
      "k": "02",
      "title": "De methode",
      "body": "Kies de vorm en de sessies op basis van die vraag."
    },
    {
      "k": "03",
      "title": "De steekproef",
      "body": "Leg vast wie wordt bevraagd, in welke steden en hoeveel mensen."
    },
    {
      "k": "04",
      "title": "Het resultaat",
      "body": "Lever het oordeel op, met de citaten die het onderbouwen."
    }
  ],
  "contactTitle": [
    "Vertel ons wat u in gedachten hebt, ",
    "en we bepalen samen de volgende stap."
  ]
},
  "da": {
  "group": "Kvalitative undersøgelser",
  "title": "Find ud af hvorfor først, og beslut derefter, hvad der skal ske.",
  "lede": "Dybdeinterviews, fokusgrupper og observation.",
  "free": "Start gratis",
  "action": "Kontakt salg",
  "methodsLabel": "Det gennemfører vi",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Dybdeinterviews",
      "body": "En til en, fysisk, på telefon eller online. Svært tilgængelige personer rekrutteres via fællesskaber og anbefalinger."
    },
    {
      "icon": "UsersRound",
      "title": "Fokusgrupper",
      "body": "En lille gruppe om ét emne, så synspunkter kan prøves mod hinanden."
    },
    {
      "icon": "Eye",
      "title": "Observation",
      "body": "Hjemme, i butikken eller på stedet: hvad folk faktisk gør, sammenlignet med hvad de siger."
    }
  ],
  "processLabel": "Sådan forløber en undersøgelse",
  "process": [
    {
      "k": "01",
      "title": "Beslutningen",
      "body": "Navngiv den beslutning, undersøgelsen skal understøtte."
    },
    {
      "k": "02",
      "title": "Metoden",
      "body": "Vælg format og sessioner ud fra spørgsmålet."
    },
    {
      "k": "03",
      "title": "Stikprøven",
      "body": "Fastlæg hvem der spørges, i hvilke byer og hvor mange."
    },
    {
      "k": "04",
      "title": "Resultatet",
      "body": "Aflever vurderingen og de citater, der underbygger den."
    }
  ],
  "contactTitle": [
    "Fortæl os, hvad du har i tankerne, ",
    "så finder vi næste skridt sammen."
  ]
},
  "es": {
  "group": "Investigación cualitativa",
  "title": "Primero entender por qué, después decidir qué hacer.",
  "lede": "Entrevistas en profundidad, grupos de discusión y observación.",
  "free": "Empezar gratis",
  "action": "Contactar con ventas",
  "methodsLabel": "Qué métodos aplicamos",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Entrevistas en profundidad",
      "body": "Uno a uno, en persona, por teléfono o en línea. Las personas difíciles de contactar se reclutan mediante la comunidad y recomendaciones."
    },
    {
      "icon": "UsersRound",
      "title": "Grupos de discusión",
      "body": "Un grupo pequeño en torno a un tema, para contrastar los puntos de vista."
    },
    {
      "icon": "Eye",
      "title": "Observación",
      "body": "En casa, en la tienda o en el lugar de trabajo: lo que las personas hacen de verdad, comparado con lo que dicen hacer."
    }
  ],
  "processLabel": "Cómo se desarrolla un estudio",
  "process": [
    {
      "k": "01",
      "title": "La decisión",
      "body": "Defina la decisión que el estudio debe respaldar."
    },
    {
      "k": "02",
      "title": "El método",
      "body": "Elija el formato y las sesiones en función de esa pregunta."
    },
    {
      "k": "03",
      "title": "La muestra",
      "body": "Determine a quién se pregunta, en qué ciudades y a cuántas personas."
    },
    {
      "k": "04",
      "title": "El entregable",
      "body": "Entregue el juicio y las citas que lo respaldan."
    }
  ],
  "contactTitle": [
    "Cuéntenos qué tiene en mente, ",
    "y definiremos juntos el siguiente paso."
  ]
},
  "fi": {
  "group": "Laadullinen tutkimus",
  "title": "Selvitä ensin syy, päätä sitten mitä tehdään.",
  "lede": "Syvähaastattelut, fokusryhmät ja havainnointi.",
  "free": "Aloita ilmaiseksi",
  "action": "Ota yhteyttä myyntiin",
  "methodsLabel": "Mitä toteutamme",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Syvähaastattelut",
      "body": "Kahden kesken, paikan päällä, puhelimessa tai verkossa. Vaikeasti tavoitettavat henkilöt löytyvät yhteisön ja suositusten kautta."
    },
    {
      "icon": "UsersRound",
      "title": "Fokusryhmät",
      "body": "Pieni ryhmä yhden aiheen ympärillä, jolloin näkemyksiä voi testata toisiaan vasten."
    },
    {
      "icon": "Eye",
      "title": "Havainnointi",
      "body": "Kotona, kaupassa tai kohteessa: mitä ihmiset todella tekevät, verrattuna heidän kertomaansa."
    }
  ],
  "processLabel": "Näin tutkimus etenee",
  "process": [
    {
      "k": "01",
      "title": "Päätös",
      "body": "Nimeä päätös, jota tutkimuksen on tuettava."
    },
    {
      "k": "02",
      "title": "Menetelmä",
      "body": "Valitse muoto ja tapaamiset tämän kysymyksen mukaan."
    },
    {
      "k": "03",
      "title": "Otos",
      "body": "Määritä, keitä kysytään, missä kaupungeissa ja kuinka monta."
    },
    {
      "k": "04",
      "title": "Tuotos",
      "body": "Luovuta arvio ja sitä tukevat sitaatit."
    }
  ],
  "contactTitle": [
    "Kerro meille, mitä sinulla on mielessä, ",
    "niin mietimme seuraavan askeleen yhdessä."
  ]
},
  "it": {
  "group": "Ricerca qualitativa",
  "title": "Prima capire il perché, poi decidere cosa fare.",
  "lede": "Interviste in profondità, focus group e osservazione.",
  "free": "Inizia gratis",
  "action": "Contatta il reparto vendite",
  "methodsLabel": "Cosa realizziamo",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Interviste in profondità",
      "body": "Uno a uno, di persona, al telefono o online. Le persone difficili da raggiungere arrivano tramite la community e le segnalazioni."
    },
    {
      "icon": "UsersRound",
      "title": "Focus group",
      "body": "Un piccolo gruppo su un tema, per mettere a confronto i punti di vista."
    },
    {
      "icon": "Eye",
      "title": "Osservazione",
      "body": "A casa, in negozio o in cantiere: ciò che le persone fanno davvero, rispetto a ciò che dichiarano."
    }
  ],
  "processLabel": "Come si svolge uno studio",
  "process": [
    {
      "k": "01",
      "title": "La decisione",
      "body": "Individuare la decisione che lo studio deve sostenere."
    },
    {
      "k": "02",
      "title": "Il metodo",
      "body": "Scegliere formato e sessioni in base a quella domanda."
    },
    {
      "k": "03",
      "title": "Il campione",
      "body": "Definire chi viene intervistato, in quali città e quante persone."
    },
    {
      "k": "04",
      "title": "Il risultato",
      "body": "Consegnare il giudizio e le citazioni che lo sostengono."
    }
  ],
  "contactTitle": [
    "Ci racconti cosa ha in mente, ",
    "e definiremo insieme il passo successivo."
  ]
},
  "ja": {
  "group": "定性調査",
  "title": "まず理由を把握し、そのうえで何をするかを決めます。",
  "lede": "デプスインタビュー、グループインタビュー、観察。",
  "free": "無料で始める",
  "action": "営業に問い合わせる",
  "methodsLabel": "実施する手法",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "デプスインタビュー",
      "body": "1対1で、対面・電話・オンラインにより実施します。接触が難しい相手には、コミュニティと紹介を通じて参加いただきます。"
    },
    {
      "icon": "UsersRound",
      "title": "グループインタビュー",
      "body": "ひとつのテーマについて少人数で話し合い、意見を相互に検証します。"
    },
    {
      "icon": "Eye",
      "title": "観察",
      "body": "自宅、店舗、現場で、人々が実際に行う行動を確認します。本人の発言との比較も行います。"
    }
  ],
  "processLabel": "調査の進め方",
  "process": [
    {
      "k": "01",
      "title": "目的",
      "body": "この調査が支える意思決定を明確にします。"
    },
    {
      "k": "02",
      "title": "手法",
      "body": "その問いに合わせて実施形式と回数を選びます。"
    },
    {
      "k": "03",
      "title": "サンプル",
      "body": "誰に、どの都市で、何人に聞くかを定めます。"
    },
    {
      "k": "04",
      "title": "成果物",
      "body": "判断と、その根拠となる発言を提出します。"
    }
  ],
  "contactTitle": [
    "ご検討中の内容をお聞かせいただければ、",
    "次のステップを一緒に整理します。"
  ]
},
  "ko": {
  "group": "정성 조사",
  "title": "이유를 먼저 파악한 뒤 무엇을 할지 결정합니다.",
  "lede": "심층 인터뷰, 포커스 그룹, 관찰.",
  "free": "무료로 시작하기",
  "action": "영업팀에 문의",
  "methodsLabel": "수행하는 방법",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "심층 인터뷰",
      "body": "1대1로 대면, 전화, 온라인에서 진행합니다. 접촉이 어려운 대상은 커뮤니티와 소개를 통해 모집합니다."
    },
    {
      "icon": "UsersRound",
      "title": "포커스 그룹",
      "body": "하나의 주제를 놓고 소규모 집단이 논의하여 관점을 상호 검증합니다."
    },
    {
      "icon": "Eye",
      "title": "관찰",
      "body": "가정, 매장, 현장에서 사람들이 실제로 하는 행동을 확인합니다. 본인이 말하는 내용과 비교합니다."
    }
  ],
  "processLabel": "조사 진행 방식",
  "process": [
    {
      "k": "01",
      "title": "목적",
      "body": "이 조사가 뒷받침할 의사결정을 먼저 정합니다."
    },
    {
      "k": "02",
      "title": "방법",
      "body": "해당 질문에 맞춰 진행 방식과 회차를 정합니다."
    },
    {
      "k": "03",
      "title": "표본",
      "body": "누구에게, 어느 도시에서, 몇 명에게 물을지 정합니다."
    },
    {
      "k": "04",
      "title": "산출물",
      "body": "판단과 그 근거가 되는 발언을 전달합니다."
    }
  ],
  "contactTitle": [
    "검토 중인 내용을 알려 주시면, ",
    "다음 단계를 함께 정리하겠습니다."
  ]
},
  "no": {
  "group": "Kvalitative undersøkelser",
  "title": "Finn ut hvorfor først, og bestem deretter hva som skal gjøres.",
  "lede": "Dybdeintervjuer, fokusgrupper og observasjon.",
  "free": "Start gratis",
  "action": "Kontakt salg",
  "methodsLabel": "Dette gjennomfører vi",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Dybdeintervjuer",
      "body": "En til en, fysisk, på telefon eller nett. Personer som er vanskelige å nå, rekrutteres via fellesskapet og anbefalinger."
    },
    {
      "icon": "UsersRound",
      "title": "Fokusgrupper",
      "body": "En liten gruppe om ett tema, slik at synspunkter kan prøves mot hverandre."
    },
    {
      "icon": "Eye",
      "title": "Observasjon",
      "body": "Hjemme, i butikken eller på stedet: hva folk faktisk gjør, sammenlignet med hva de sier."
    }
  ],
  "processLabel": "Slik gjennomføres en undersøkelse",
  "process": [
    {
      "k": "01",
      "title": "Beslutningen",
      "body": "Navngi beslutningen undersøkelsen skal understøtte."
    },
    {
      "k": "02",
      "title": "Metoden",
      "body": "Velg format og sesjoner ut fra spørsmålet."
    },
    {
      "k": "03",
      "title": "Utvalget",
      "body": "Fastsett hvem som spørres, i hvilke byer og hvor mange."
    },
    {
      "k": "04",
      "title": "Resultatet",
      "body": "Lever vurderingen og sitatene som underbygger den."
    }
  ],
  "contactTitle": [
    "Fortell oss hva du har i tankene, ",
    "så finner vi neste steg sammen."
  ]
},
  "pt": {
  "group": "Pesquisa qualitativa",
  "title": "Primeiro entender por quê, depois decidir o que fazer.",
  "lede": "Entrevistas em profundidade, grupos focais e observação.",
  "free": "Começar gratuitamente",
  "action": "Falar com vendas",
  "methodsLabel": "O que realizamos",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Entrevistas em profundidade",
      "body": "Um a um, presencial, por telefone ou on-line. Pessoas difíceis de alcançar são recrutadas pela comunidade e por indicações."
    },
    {
      "icon": "UsersRound",
      "title": "Grupos focais",
      "body": "Um grupo pequeno em torno de um tema, para confrontar pontos de vista."
    },
    {
      "icon": "Eye",
      "title": "Observação",
      "body": "Em casa, na loja ou no local: o que as pessoas fazem de fato, em comparação com o que dizem."
    }
  ],
  "processLabel": "Como um estudo acontece",
  "process": [
    {
      "k": "01",
      "title": "A decisão",
      "body": "Definir a decisão que o estudo deve sustentar."
    },
    {
      "k": "02",
      "title": "O método",
      "body": "Escolher o formato e as sessões conforme essa pergunta."
    },
    {
      "k": "03",
      "title": "A amostra",
      "body": "Definir quem será ouvido, em quais cidades e quantas pessoas."
    },
    {
      "k": "04",
      "title": "O resultado",
      "body": "Entregar o julgamento e as citações que o sustentam."
    }
  ],
  "contactTitle": [
    "Conte-nos o que tem em mente, ",
    "e definiremos juntos o próximo passo."
  ]
},
  "ru": {
  "group": "Качественные исследования",
  "title": "Сначала понять почему, затем решить, что делать.",
  "lede": "Глубинные интервью, фокус-группы и наблюдение.",
  "free": "Начать бесплатно",
  "action": "Связаться с отделом продаж",
  "methodsLabel": "Что мы проводим",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Глубинные интервью",
      "body": "Один на один, лично, по телефону или онлайн. Труднодоступных респондентов находим через сообщество и по рекомендациям."
    },
    {
      "icon": "UsersRound",
      "title": "Фокус-группы",
      "body": "Небольшая группа по одной теме: мнения сопоставляются между собой."
    },
    {
      "icon": "Eye",
      "title": "Наблюдение",
      "body": "Дома, в магазине или на объекте: что люди делают на самом деле, в сравнении с тем, что говорят."
    }
  ],
  "processLabel": "Как проходит исследование",
  "process": [
    {
      "k": "01",
      "title": "Решение",
      "body": "Назвать решение, которое должно опираться на исследование."
    },
    {
      "k": "02",
      "title": "Метод",
      "body": "Выбрать формат и количество сессий под этот вопрос."
    },
    {
      "k": "03",
      "title": "Выборка",
      "body": "Определить, кого спрашиваем, в каких городах и сколько человек."
    },
    {
      "k": "04",
      "title": "Результат",
      "body": "Передать вывод и цитаты, которые его подтверждают."
    }
  ],
  "contactTitle": [
    "Расскажите, что вы задумали, ",
    "и мы вместе определим следующий шаг."
  ]
},
  "sv": {
  "group": "Kvalitativa undersökningar",
  "title": "Ta reda på varför först, bestäm sedan vad som ska göras.",
  "lede": "Djupintervjuer, fokusgrupper och observation.",
  "free": "Börja gratis",
  "action": "Kontakta säljteamet",
  "methodsLabel": "Det här genomför vi",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Djupintervjuer",
      "body": "En mot en, på plats, per telefon eller online. Personer som är svåra att nå rekryteras via communityn och tips."
    },
    {
      "icon": "UsersRound",
      "title": "Fokusgrupper",
      "body": "En liten grupp kring ett tema, så att synsätt kan prövas mot varandra."
    },
    {
      "icon": "Eye",
      "title": "Observation",
      "body": "Hemma, i butiken eller på plats: vad människor faktiskt gör, jämfört med vad de säger."
    }
  ],
  "processLabel": "Så går en undersökning till",
  "process": [
    {
      "k": "01",
      "title": "Beslutet",
      "body": "Namnge beslutet som undersökningen ska stötta."
    },
    {
      "k": "02",
      "title": "Metoden",
      "body": "Välj format och sessioner utifrån frågan."
    },
    {
      "k": "03",
      "title": "Urvalet",
      "body": "Fastställ vilka som tillfrågas, i vilka städer och hur många."
    },
    {
      "k": "04",
      "title": "Resultatet",
      "body": "Lämna över bedömningen och citaten som stöder den."
    }
  ],
  "contactTitle": [
    "Berätta vad du har i åtanke, ",
    "så tar vi fram nästa steg tillsammans."
  ]
},
  "tr": {
  "group": "Nitel araştırma",
  "title": "Önce nedenini ortaya koyun, sonra ne yapılacağına karar verin.",
  "lede": "Derinlemesine görüşmeler, odak grupları ve gözlem.",
  "free": "Ücretsiz başlayın",
  "action": "Satış ekibiyle iletişime geçin",
  "methodsLabel": "Yürüttüğümüz çalışmalar",
  "methods": [
    {
      "icon": "MessageSquareText",
      "title": "Derinlemesine görüşmeler",
      "body": "Bire bir, yüz yüze, telefonla veya çevrimiçi görüşmeler yapılır. Ulaşılması zor kişilere topluluk ve referanslar aracılığıyla ulaşılır."
    },
    {
      "icon": "UsersRound",
      "title": "Odak grupları",
      "body": "Tek bir konu etrafında küçük bir grupla çalışılır; böylece görüşler karşılıklı olarak sınanır."
    },
    {
      "icon": "Eye",
      "title": "Gözlem",
      "body": "Evde, mağazada veya sahada insanların gerçekte ne yaptığı gözlemlenir ve söyledikleriyle karşılaştırılır."
    }
  ],
  "processLabel": "Bir araştırma nasıl yürür",
  "process": [
    {
      "k": "01",
      "title": "Karar",
      "body": "Araştırmanın destekleyeceği kararı tanımlayın."
    },
    {
      "k": "02",
      "title": "Yöntem",
      "body": "Biçimi ve oturumları bu soruya göre seçin."
    },
    {
      "k": "03",
      "title": "Örneklem",
      "body": "Kime sorulacağını, hangi şehirlerde ve kaç kişiyle çalışılacağını belirleyin."
    },
    {
      "k": "04",
      "title": "Çıktı",
      "body": "Değerlendirmeyi ve onu destekleyen alıntıları teslim edin."
    }
  ],
  "contactTitle": [
    "Aklınızdakini bize anlatın, ",
    "sonraki adımı birlikte belirleyelim."
  ]
}
};

export default function Qualitative() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['qualitative'];
  const t = { ...base, group: entry?.title || base.group, lede: entry?.note || base.lede };
  usePageTitle(t.group);

  return (
    <main className="qual-page">
      <section className="qu-hero">
        <p className="qu-eyebrow">{t.group}</p>
        <h1 className="qu-title">{t.title}</h1>
        <p className="qu-lede">{t.lede}</p>
        <div className="qu-actions">
          <Link className="qu-action qu-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qu-action qu-action--quiet" to={withLanguage('/business/access', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="qu-methods" aria-labelledby="qu-methods-title">
        <p className="qu-eyebrow" id="qu-methods-title">{t.methodsLabel}</p>
        <ul>
          {t.methods.map((item) => {
            const Icon = ICONS[item.icon] || MessageSquareText;
            return (
              <li key={item.title}>
                <Icon size={23} strokeWidth={1.65} aria-hidden="true" />
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="qu-process" aria-labelledby="qu-process-title">
        <p className="qu-eyebrow qu-eyebrow--light" id="qu-process-title">{t.processLabel}</p>
        <ol>
          {t.process.map((step) => (
            <li key={step.k}>
              <span>{step.k}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="qu-contact" aria-labelledby="qu-contact-title">
        <h2 id="qu-contact-title" className="qu-contact-title">
          {t.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <div className="qu-actions">
          <Link className="qu-action qu-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qu-action qu-action--quiet" to={withLanguage('/business/access', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
