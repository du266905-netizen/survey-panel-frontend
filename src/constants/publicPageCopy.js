/* Public page copy — entered into the language library 2026-10-25.

   These used to live as `const copy = {...}` inside each page file. The pages
   now read them through `useLanguage().publicCopy.pages`, so one library holds
   the copy, the language switch and the fallback:

     pages.about                  /about
     pages.access                 /access (the homepage chooser, mounted as a page)
     pages.industries.<slug>      the ten industry pages

   en-US is the source language; zh-CN and zh-Hant are maintained alongside it.
   Every other language has its own entered translation; anything missing falls
   back to English. Edit copy here, not in the page components. */

export const aboutCopy = {
  "en-US": {
    "eyebrow": "About us",
    "theme": "Your opinions shape the world.",
    "whoEyebrow": "Who we are",
    "humanEyebrow": "Human first",
    "body": "We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.",
    "storyTitle": "Rooted in China, connected to the world.",
    "points": [
      {
        "num": "01",
        "title": "A Chinese foundation",
        "body": "The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples."
      },
      {
        "num": "02",
        "title": "Regional partners",
        "body": "Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it."
      },
      {
        "num": "03",
        "title": "Always extending",
        "body": "As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view."
      }
    ]
  },
  "en-GB": {
    "eyebrow": "About us",
    "theme": "Your opinions shape the world.",
    "whoEyebrow": "Who we are",
    "humanEyebrow": "Human first",
    "body": "We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.",
    "storyTitle": "Rooted in China, connected to the world.",
    "points": [
      {
        "num": "01",
        "title": "A Chinese foundation",
        "body": "The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples."
      },
      {
        "num": "02",
        "title": "Regional partners",
        "body": "Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it."
      },
      {
        "num": "03",
        "title": "Always extending",
        "body": "As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view."
      }
    ]
  },
  "zh-CN": {
    "eyebrow": "关于我们",
    "theme": "你的观点影响世界。",
    "whoEyebrow": "我们是谁",
    "humanEyebrow": "以人为本",
    "body": "我们是一家跨区域的信息洞察研究公司，致力于打造开放、共生、可持续的生态社区。我们连接参与者、研究发起人与组织，围绕商业、文化、日常生活与公共议题，让真实的声音转化为清晰的判断——为更好的决策，也为更好的世界。",
    "storyTitle": "立足中国，连接世界",
    "points": [
      {
        "num": "01",
        "title": "中国根基",
        "body": "团队长期专注市场研究，在中国建立了稳定的社区与调研网络，能够触达真实、可验证的样本。"
      },
      {
        "num": "02",
        "title": "区域伙伴",
        "body": "在大中华区、亚太、中东、欧洲与北美，我们与当地研究伙伴长期协作，让每个市场都由熟悉当地的人执行。"
      },
      {
        "num": "03",
        "title": "持续拓展",
        "body": "根据研究需要，我们持续拓展主要市场的伙伴与参与者覆盖；从一个具体的地方出发，连接更广的研究视野。"
      }
    ]
  },
  "zh-Hant": {
    "eyebrow": "關於我們",
    "theme": "你的觀點影響世界。",
    "whoEyebrow": "我們是誰",
    "humanEyebrow": "以人為本",
    "body": "我們是一家跨區域的資訊洞察研究公司，致力於打造開放、共生、可持續的生態社區。我們連結參與者、研究發起人與組織，圍繞商業、文化、日常生活與公共議題，讓真實的聲音轉化為清晰的判斷——為更好的決策，也為更好的世界。",
    "storyTitle": "立足中國，連接世界",
    "points": [
      {
        "num": "01",
        "title": "中國根基",
        "body": "團隊長期專注市場研究，在中國建立了穩定的社區與調研網絡，能夠觸達真實、可驗證的樣本。"
      },
      {
        "num": "02",
        "title": "區域伙伴",
        "body": "在大中華區、亞太、中東、歐洲與北美，我們與當地研究伙伴長期協作，讓每個市場都由熟悉當地的人執行。"
      },
      {
        "num": "03",
        "title": "持續拓展",
        "body": "根據研究需要，我們持續拓展主要市場的伙伴與參與者覆蓋；從一個具體的地方出發，連接更廣的研究視野。"
      }
    ]
  },
  "de": {
    "humanBody": "Wir glauben, dass echte Menschen immer der Ausgangspunkt jeder Forschung sind. KI kann endlose Inhalte erzeugen, die echt wirken. Doch sie kann niemals einen bestimmten Menschen in einem bestimmten Moment nachbilden, der sagt, was er wirklich denkt. Hinter jedem Umfrageergebnis steht ein Mensch, der sich entschieden hat, eine Sichtweise zu teilen. Diese einzelnen Stimmen machen Insights vertrauenswürdig. Wir nutzen Matching und Echtzeitdaten, um Ihre Zeit zu respektieren, Ihre Wirkung zu zeigen und jede Vergütungsregel klar und fair zu halten. Menschenzentriert bedeutet nicht, Technik abzulehnen. Es bedeutet, Technik in den Dienst der Menschen zu stellen.",
    "eyebrow": "Über uns",
    "theme": "Ihre Meinungen prägen die Welt.",
    "whoEyebrow": "Wer wir sind",
    "humanEyebrow": "Der Mensch zuerst",
    "body": "Wir sind ein regional übergreifendes Marktforschungs- und Insight-Unternehmen und bauen eine offene, vernetzte und nachhaltige Forschungsgemeinschaft auf. Wir verbinden Teilnehmende, Auftraggeber und Organisationen aus Wirtschaft, Kultur, Alltag und öffentlichen Fragen und übersetzen echte Stimmen in klare Urteile – für bessere Entscheidungen und eine bessere Welt.",
    "storyTitle": "In China verwurzelt, weltweit vernetzt.",
    "points": [
      {
        "num": "01",
        "title": "Chinesisches Fundament",
        "body": "Das Team arbeitet seit Jahren in der Marktforschung und hat in China eine stabile Community und ein Forschungsnetzwerk aufgebaut, das echte, überprüfbare lokale Stichproben erreicht."
      },
      {
        "num": "02",
        "title": "Regionale Partner",
        "body": "In Greater China, dem asiatisch-pazifischen Raum, dem Nahen Osten, Europa und Nordamerika arbeiten wir mit lokalen Forschungspartnern, sodass jeder Markt von Menschen vor Ort betreut wird."
      },
      {
        "num": "03",
        "title": "Ständige Erweiterung",
        "body": "Je nach Studie erweitern wir die Abdeckung von Partnern und Teilnehmenden in wichtigen Märkten – ausgehend von einem konkreten Ort mit Blick auf ein weiteres Feld."
      }
    ]
  },
  "fr": {
    "humanBody": "Nous croyons que les personnes réelles seront toujours le point de départ de la recherche. L'IA peut générer un contenu infini qui semble réel. Mais elle ne pourra jamais recréer une personne précise, à un moment précis, exprimant ce qu'elle pense vraiment. Derrière chaque résultat d'enquête se trouve une personne qui a choisi de partager un point de vue. Ces voix individuelles rendent l'insight digne de confiance. Nous utilisons le matching et des données en temps réel pour respecter votre temps, montrer votre impact et garder chaque règle de récompense claire et équitable. Être centré sur l'humain ne signifie pas rejeter la technologie. Cela signifie mettre la technologie au service des personnes.",
    "eyebrow": "À propos",
    "theme": "Vos opinions façonnent le monde.",
    "whoEyebrow": "Qui nous sommes",
    "humanEyebrow": "L'humain d'abord",
    "body": "Nous sommes une entreprise d'études et d'insights à l'échelle interrégionale, qui construit une communauté de recherche ouverte, interconnectée et durable. Nous relions participants, commanditaires et organisations autour du commerce, de la culture, du quotidien et des questions publiques, en transformant des voix réelles en jugements clairs — pour de meilleures décisions et un monde meilleur.",
    "storyTitle": "Ancrés en Chine, connectés au monde.",
    "points": [
      {
        "num": "01",
        "title": "Un ancrage chinois",
        "body": "L'équipe se consacre depuis des années aux études de marché et a bâti en Chine une communauté et un réseau de recherche stables, capables d'atteindre des échantillons locaux réels et vérifiables."
      },
      {
        "num": "02",
        "title": "Des partenaires régionaux",
        "body": "En Grande Chine, en Asie-Pacifique, au Moyen-Orient, en Europe et en Amérique du Nord, nous travaillons avec des partenaires locaux, afin que chaque marché soit mené par des personnes qui le connaissent."
      },
      {
        "num": "03",
        "title": "Toujours en extension",
        "body": "Selon les besoins de l'étude, nous étendons la couverture des partenaires et des participants sur les grands marchés — en partant d'un lieu précis pour rejoindre une vision plus large."
      }
    ]
  },
  "nl": {
    "humanBody": "Wij geloven dat echte mensen altijd het startpunt van onderzoek zijn. AI kan eindeloos veel content maken die echt lijkt. Maar zij kan nooit een bepaald persoon op een bepaald moment nabootsen die zegt wat hij werkelijk vindt. Achter elk enquêteresultaat staat iemand die ervoor koos een perspectief te delen. Die afzonderlijke stemmen maken inzicht betrouwbaar. We gebruiken matching en realtime data om uw tijd te respecteren, uw impact te laten zien en elke beloningsregel helder en eerlijk te houden. Mensgericht betekent niet dat we technologie afwijzen. Het betekent dat technologie mensen dient.",
    "eyebrow": "Over ons",
    "theme": "Uw mening vormt de wereld.",
    "whoEyebrow": "Wie we zijn",
    "humanEyebrow": "De mens voorop",
    "body": "Wij zijn een interregionaal insight- en onderzoeksbedrijf en bouwen aan een open, verbonden en duurzame onderzoeksgemeenschap. We verbinden deelnemers, opdrachtgevers en organisaties rond handel, cultuur, dagelijks leven en publieke vragen, en vertalen echte stemmen naar heldere oordelen — voor betere beslissingen en een betere wereld.",
    "storyTitle": "Geworteld in China, verbonden met de wereld.",
    "points": [
      {
        "num": "01",
        "title": "Een Chinese basis",
        "body": "Het team richt zich al jaren op marktonderzoek en heeft in China een stabiele community en een onderzoeksnetwerk opgebouwd, met toegang tot echte, verifieerbare lokale steekproeven."
      },
      {
        "num": "02",
        "title": "Regionale partners",
        "body": "In Groot-China, Azië-Pacific, het Midden-Oosten, Europa en Noord-Amerika werken we met lokale onderzoekspartners, zodat elke markt wordt uitgevoerd door mensen die die markt kennen."
      },
      {
        "num": "03",
        "title": "Altijd in uitbreiding",
        "body": "Afhankelijk van het onderzoek breiden we de dekking van partners en deelnemers in belangrijke markten uit — vanuit een concrete plek naar een breder perspectief."
      }
    ]
  },
  "da": {
    "humanBody": "Vi mener, at rigtige mennesker altid er udgangspunktet for research. AI kan skabe uendeligt indhold, der ser ægte ud. Men den kan aldrig genskabe et bestemt menneske i et bestemt øjeblik, der siger, hvad det virkelig mener. Bag hvert undersøgelsesresultat står et menneske, der valgte at dele et perspektiv. De enkelte stemmer gør indsigt værd at stole på. Vi bruger matching og realtidsdata til at respektere din tid, vise din effekt og holde hver belønningsregel klar og fair. Menneskecentreret betyder ikke at afvise teknologi. Det betyder at lade teknologi tjene mennesker.",
    "eyebrow": "Om os",
    "theme": "Dine holdninger former verden.",
    "whoEyebrow": "Hvem vi er",
    "humanEyebrow": "Mennesket først",
    "body": "Vi er en tværregional insight- og analysevirksomhed, der opbygger et åbent, sammenkoblet og bæredygtigt forskningsfællesskab. Vi forbinder deltagere, opdragsgivere og organisationer på tværs af handel, kultur, hverdag og offentlige spørgsmål og omsætter rigtige stemmer til klare vurderinger — for bedre beslutninger og en bedre verden.",
    "storyTitle": "Forankret i Kina, forbundet med verden.",
    "points": [
      {
        "num": "01",
        "title": "Et kinesisk fundament",
        "body": "Teamet har arbejdet med markedsanalyse i årevis og har opbygget et stabilt fællesskab og forskningsnetværk i Kina med adgang til rigtige, verificerbare lokale stikprøver."
      },
      {
        "num": "02",
        "title": "Regionale partnere",
        "body": "I Stor-Kina, Asien-Stillehavet, Mellemøsten, Europa og Nordamerika arbejder vi med lokale forskningspartnere, så hvert marked drives af mennesker, der kender det."
      },
      {
        "num": "03",
        "title": "Altid under udvidelse",
        "body": "Afhængigt af undersøgelsen udvider vi dækningen af partnere og deltagere på store markeder — med udgangspunkt i et konkret sted og blik for et bredere perspektiv."
      }
    ]
  },
  "es": {
    "humanBody": "Creemos que las personas reales son siempre el punto de partida de la investigación. La IA puede generar contenido infinito que parece real. Pero nunca podrá recrear a una persona concreta, en un momento concreto, expresando lo que piensa de verdad. Detrás de cada resultado de encuesta hay una persona que decidió compartir una perspectiva. Esas voces individuales hacen que el insight merezca confianza. Usamos matching y datos en tiempo real para respetar tu tiempo, mostrar tu impacto y mantener cada regla de recompensa clara y justa. Estar centrado en las personas no significa rechazar la tecnología. Significa poner la tecnología al servicio de las personas.",
    "eyebrow": "Sobre nosotros",
    "theme": "Tus opiniones dan forma al mundo.",
    "whoEyebrow": "Quiénes somos",
    "humanEyebrow": "Las personas primero",
    "body": "Somos una empresa interregional de investigación e insight que construye una comunidad de investigación abierta, interconectada y sostenible. Conectamos a participantes, clientes y organizaciones en torno a los negocios, la cultura, la vida cotidiana y las cuestiones públicas, y convertimos voces reales en juicios claros — para mejores decisiones y un mundo mejor.",
    "storyTitle": "Con raíces en China, conectados con el mundo.",
    "points": [
      {
        "num": "01",
        "title": "Una base china",
        "body": "El equipo lleva años centrado en la investigación de mercados y ha construido en China una comunidad y una red de investigación estables, con acceso a muestras locales reales y verificables."
      },
      {
        "num": "02",
        "title": "Socios regionales",
        "body": "En la Gran China, Asia-Pacífico, Oriente Medio, Europa y Norteamérica trabajamos con socios locales, de modo que cada mercado lo ejecutan personas que lo conocen."
      },
      {
        "num": "03",
        "title": "Siempre ampliando",
        "body": "Según lo exige cada estudio, ampliamos la cobertura de socios y participantes en los principales mercados — partiendo de un lugar concreto hacia una visión más amplia."
      }
    ]
  },
  "fi": {
    "humanBody": "Uskomme, että todelliset ihmiset ovat aina tutkimuksen lähtökohta. Tekoäly voi tuottaa loputtomasti sisältöä, joka näyttää aidolta. Mutta se ei voi koskaan toisintaa tiettyä ihmistä tietyssä hetkessä kertomassa, mitä hän todella ajattelee. Jokaisen kyselytuloksen takana on ihminen, joka päätti jakaa näkökulman. Juuri nämä yksittäiset äänet tekevät insighsistä luotettavaa. Käytämme matchausta ja reaaliaikaista dataa, jotta kunnioitamme aikaasi, näytämme vaikutuksesi ja pidämme jokaisen palkitsemissäännön selkeänä ja reiluna. Ihmiskeskeisyys ei tarkoita teknologian hylkäämistä. Se tarkoittaa, että teknologia palvelee ihmisiä.",
    "eyebrow": "Tietoa meistä",
    "theme": "Näkemyksesi muokkaavat maailmaa.",
    "whoEyebrow": "Keitä olemme",
    "humanEyebrow": "Ihminen ensin",
    "body": "Olemme alueiden välinen insight- ja tutkimusyritys, joka rakentaa avointa, verkottunutta ja kestävää tutkimusyhteisöä. Yhdistämme osallistujat, tutkimuksen tilaajat ja organisaatiot liiketoiminnan, kulttuurin, arjen ja julkisten kysymysten ympärille ja muunnamme aidot äänet selkeiksi arvioiksi — parempien päätösten ja paremman maailman puolesta.",
    "storyTitle": "Juuret Kiinassa, yhteydet maailmaan.",
    "points": [
      {
        "num": "01",
        "title": "Kiinalainen perusta",
        "body": "Tiimi on keskittynyt markkinatutkimukseen vuosia ja rakentanut Kiinaan vakaan yhteisön ja tutkimusverkoston, joka tavoittaa aitoja, todennettavia paikallisia otoksia."
      },
      {
        "num": "02",
        "title": "Alueelliset kumppanit",
        "body": "Suur-Kiinassa, Aasian ja Tyynenmeren alueella, Lähi-idässä, Euroopassa ja Pohjois-Amerikassa teemme yhteistyötä paikallisten tutkimuskumppaneiden kanssa, jotta jokaisen markkinan toteuttavat sen tuntevat ihmiset."
      },
      {
        "num": "03",
        "title": "Jatkuvasti laajeneva",
        "body": "Tutkimuksen tarpeen mukaan laajennamme kumppanien ja osallistujien kattavuutta keskeisillä markkinoilla — lähtien tietystä paikasta ja yhdistyen laajempaan näkymään."
      }
    ]
  },
  "it": {
    "humanBody": "Crediamo che le persone reali siano sempre il punto di partenza della ricerca. L'IA può generare contenuti infiniti che sembrano reali. Ma non potrà mai ricreare una persona precisa, in un momento preciso, che esprime ciò che pensa davvero. Dietro ogni risultato di indagine c'è una persona che ha scelto di condividere un punto di vista. Sono queste voci individuali a rendere l'insight degno di fiducia. Usiamo matching e dati in tempo reale per rispettare il tuo tempo, mostrare il tuo impatto e mantenere ogni regola di ricompensa chiara ed equa. Essere centrati sulle persone non significa rifiutare la tecnologia. Significa mettere la tecnologia al servizio delle persone.",
    "eyebrow": "Su di noi",
    "theme": "Le tue opinioni danno forma al mondo.",
    "whoEyebrow": "Chi siamo",
    "humanEyebrow": "Le persone prima di tutto",
    "body": "Siamo un'azienda interregionale di ricerche e insight che costruisce una comunità di ricerca aperta, interconnessa e sostenibile. Colleghiamo partecipanti, committenti e organizzazioni intorno a business, cultura, vita quotidiana e questioni pubbliche, trasformando voci reali in giudizi chiari — per decisioni migliori e un mondo migliore.",
    "storyTitle": "Radici in Cina, connessi al mondo.",
    "points": [
      {
        "num": "01",
        "title": "Una base cinese",
        "body": "Il team si occupa da anni di ricerche di mercato e ha costruito in Cina una comunità e una rete di ricerca stabili, con accesso a campioni locali reali e verificabili."
      },
      {
        "num": "02",
        "title": "Partner regionali",
        "body": "Nella Grande Cina, in Asia-Pacifico, in Medio Oriente, in Europa e in Nord America lavoriamo con partner di ricerca locali, così ogni mercato è gestito da persone che lo conoscono."
      },
      {
        "num": "03",
        "title": "Sempre in espansione",
        "body": "In base alle esigenze dello studio, ampliamo la copertura di partner e partecipanti nei principali mercati — partendo da un luogo concreto verso una prospettiva più ampia."
      }
    ]
  },
  "ja": {
    "humanBody": "私たちは、実在する人が研究の出発点であり続けると考えています。AI は本物に見えるコンテンツを無限に生成できます。しかし、ある特定の人が、ある特定の瞬間に、本当に考えていることを語る姿を再現することはできません。すべての調査結果の背後には、視点を共有することを選んだ人がいます。その一人ひとりの声が、インサイトを信頼できるものにします。私たちはマッチングとリアルタイムデータを使い、あなたの時間を尊重し、影響を可視化し、報酬ルールを明確で公平に保ちます。人間中心とは、技術を拒むことではありません。技術を人のために働かせることです。",
    "eyebrow": "会社概要",
    "theme": "あなたの意見が世界を形づくる。",
    "whoEyebrow": "私たちについて",
    "humanEyebrow": "人を中心に",
    "body": "私たちは地域を越えて活動するインサイト・リサーチ会社で、開かれた相互につながり、持続可能なリサーチコミュニティをつくっています。参加者、調査依頼者、組織をビジネス、文化、日常生活、公共の問いのもとで結び、実際の声を明確な判断に変えていきます — よりよい意思決定と、よりよい世界のために。",
    "storyTitle": "中国に根ざし、世界とつながる。",
    "points": [
      {
        "num": "01",
        "title": "中国での基盤",
        "body": "チームは長年マーケットリサーチに取り組み、中国で安定したコミュニティと調査ネットワークを築き、実在し検証可能な現地サンプルに到達できます。"
      },
      {
        "num": "02",
        "title": "地域パートナー",
        "body": "大中華圏、アジア太平洋、中東、欧州、北米では現地の調査パートナーと協働し、各市場をその市場を知る人びとが担当します。"
      },
      {
        "num": "03",
        "title": "拡大を続ける",
        "body": "調査の必要に応じて、主要市場でのパートナーと参加者のカバレッジを広げています — 特定の場所から始め、より広い視野へ。"
      }
    ]
  },
  "ko": {
    "humanBody": "우리는 실제 사람이 언제나 연구의 출발점이라고 믿습니다. AI는 실제처럼 보이는 콘텐츠를 끝없이 만들 수 있습니다. 하지만 특정한 사람이 특정한 순간에 자신이 진짜로 생각하는 것을 말하는 모습을 재현할 수는 없습니다. 모든 설문 결과 뒤에는 관점을 나누기로 선택한 사람이 있습니다. 그 개별적인 목소리가 인사이트를 신뢰할 수 있게 만듭니다. 우리는 매칭과 실시간 데이터로 당신의 시간을 존중하고, 영향력을 보여 주며, 모든 보상 규칙을 명확하고 공정하게 유지합니다. 사람 중심은 기술을 거부하는 것이 아닙니다. 기술이 사람을 위해 일하게 하는 것입니다.",
    "eyebrow": "회사 소개",
    "theme": "당신의 의견이 세상을 만듭니다.",
    "whoEyebrow": "우리는 누구인가",
    "humanEyebrow": "사람이 먼저",
    "body": "우리는 지역을 넘어 활동하는 인사이트·리서치 기업으로, 열려 있고 상호 연결된 지속 가능한 리서치 커뮤니티를 만들어 갑니다. 비즈니스, 문화, 일상, 공공 의제 전반에서 참여자·의뢰자·조직을 연결하고, 실제 목소리를 명확한 판단으로 바꿉니다 — 더 나은 결정과 더 나은 세상을 위해.",
    "storyTitle": "중국에 뿌리를 두고 세계와 연결되다.",
    "points": [
      {
        "num": "01",
        "title": "중국 기반",
        "body": "팀은 오랫동안 시장조사에 집중해 왔으며, 중국에서 안정적인 커뮤니티와 조사 네트워크를 구축해 실제로 검증 가능한 현지 표본에 접근합니다."
      },
      {
        "num": "02",
        "title": "지역 파트너",
        "body": "중화권, 아시아태평양, 중동, 유럽, 북미에서 현지 조사 파트너와 협력해 각 시장을 그 시장을 아는 사람들이 수행합니다."
      },
      {
        "num": "03",
        "title": "계속 확장",
        "body": "조사 필요에 따라 주요 시장에서 파트너와 참여자 범위를 넓혀 왔습니다 — 특정한 지점에서 시작해 더 넓은 시야로 이어갑니다."
      }
    ]
  },
  "no": {
    "humanBody": "Vi mener at ekte mennesker alltid er utgangspunktet for forskning. AI kan lage uendelig mye innhold som ser ekte ut. Men den kan aldri gjenskape et bestemt menneske i et bestemt øyeblikk som sier hva det virkelig mener. Bak hvert undersøkelsesresultat står et menneske som valgte å dele et perspektiv. De enkelte stemmene gjør innsikt verdt å stole på. Vi bruker matching og samtidsdata for å respektere tiden din, vise effekten din og holde hver belønningsregel klar og rettferdig. Menneskesentrert betyr ikke å avvise teknologi. Det betyr å la teknologi tjene mennesker.",
    "eyebrow": "Om oss",
    "theme": "Dine meninger former verden.",
    "whoEyebrow": "Hvem vi er",
    "humanEyebrow": "Mennesket først",
    "body": "Vi er et tverrregionalt innsikts- og forskningsselskap som bygger et åpent, sammenkoblet og bærekraftig forskningsfellesskap. Vi knytter sammen deltakere, oppdragsgivere og organisasjoner på tvers av næringsliv, kultur, hverdag og offentlige spørsmål, og gjør ekte stemmer om til klare vurderinger — for bedre beslutninger og en bedre verden.",
    "storyTitle": "Forankret i Kina, knyttet til verden.",
    "points": [
      {
        "num": "01",
        "title": "Et kinesisk fundament",
        "body": "Teamet har arbeidet med markedsundersøkelser i mange år og har bygget et stabilt fellesskap og forskningsnettverk i Kina, med tilgang til ekte, etterprøvbare lokale utvalg."
      },
      {
        "num": "02",
        "title": "Regionale partnere",
        "body": "I Stor-Kina, Asia-Stillehavet, Midtøsten, Europa og Nord-Amerika samarbeider vi med lokale forskningspartnere, slik at hvert marked drives av mennesker som kjenner det."
      },
      {
        "num": "03",
        "title": "Alltid under utvidelse",
        "body": "Etter behov i studien utvider vi dekningen av partnere og deltakere i viktige markeder — med utgangspunkt i et konkret sted og blikk for et bredere perspektiv."
      }
    ]
  },
  "pt": {
    "humanBody": "Acreditamos que as pessoas reais são sempre o ponto de partida da investigação. A IA pode gerar conteúdo infinito que parece real. Mas nunca conseguirá recriar uma pessoa concreta, num momento concreto, a expressar o que realmente pensa. Por trás de cada resultado de inquérito está uma pessoa que decidiu partilhar uma perspetiva. São essas vozes individuais que tornam o insight digno de confiança. Usamos matching e dados em tempo real para respeitar o seu tempo, mostrar o seu impacto e manter cada regra de recompensa clara e justa. Estar centrado nas pessoas não significa rejeitar a tecnologia. Significa pôr a tecnologia ao serviço das pessoas.",
    "eyebrow": "Sobre nós",
    "theme": "As suas opiniões moldam o mundo.",
    "whoEyebrow": "Quem somos",
    "humanEyebrow": "As pessoas primeiro",
    "body": "Somos uma empresa inter-regional de estudos e insight que constrói uma comunidade de investigação aberta, interligada e sustentável. Ligamos participantes, clientes e organizações em torno dos negócios, da cultura, do quotidiano e das questões públicas, transformando vozes reais em juízos claros — para melhores decisões e um mundo melhor.",
    "storyTitle": "Enraizados na China, ligados ao mundo.",
    "points": [
      {
        "num": "01",
        "title": "Uma base chinesa",
        "body": "A equipa dedica-se há anos à investigação de mercado e construiu na China uma comunidade e uma rede de investigação estáveis, com acesso a amostras locais reais e verificáveis."
      },
      {
        "num": "02",
        "title": "Parceiros regionais",
        "body": "Na Grande China, Ásia-Pacífico, Médio Oriente, Europa e América do Norte trabalhamos com parceiros locais, para que cada mercado seja executado por quem o conhece."
      },
      {
        "num": "03",
        "title": "Sempre a alargar",
        "body": "Consoante o estudo, alargamos a cobertura de parceiros e participantes nos principais mercados — partindo de um lugar concreto para uma visão mais ampla."
      }
    ]
  },
  "ru": {
    "humanBody": "Мы считаем, что реальные люди всегда остаются отправной точкой исследования. ИИ может создавать бесконечный контент, который выглядит настоящим. Но он никогда не воссоздаст конкретного человека в конкретный момент, говорящего, что он действительно думает. За каждым результатом опроса стоит человек, который решил поделиться своей точкой зрения. Именно эти отдельные голоса делают инсайт заслуживающим доверия. Мы используем мэтчинг и данные в реальном времени, чтобы уважать ваше время, показывать ваше влияние и сохранять каждое правило вознаграждения ясным и справедливым. Человекоцентричность — это не отказ от технологий. Это значит, что технологии служат людям.",
    "eyebrow": "О нас",
    "theme": "Ваши мнения формируют мир.",
    "whoEyebrow": "Кто мы",
    "humanEyebrow": "Человек прежде всего",
    "body": "Мы — межрегиональная исследовательская компания и компания в области инсайтов, которая строит открытое, взаимосвязанное и устойчивое исследовательское сообщество. Мы соединяем участников, заказчиков и организации в сферах бизнеса, культуры, повседневной жизни и общественных вопросов и превращаем реальные голоса в ясные суждения — ради лучших решений и лучшего мира.",
    "storyTitle": "Укоренены в Китае, связаны с миром.",
    "points": [
      {
        "num": "01",
        "title": "Китайская основа",
        "body": "Команда много лет занимается маркетинговыми исследованиями и создала в Китае устойчивое сообщество и исследовательскую сеть с доступом к реальным, проверяемым локальным выборкам."
      },
      {
        "num": "02",
        "title": "Региональные партнёры",
        "body": "В Большом Китае, Азиатско-Тихоокеанском регионе, на Ближнем Востоке, в Европе и Северной Америке мы работаем с местными исследовательскими партнёрами, чтобы каждый рынок вели те, кто его знает."
      },
      {
        "num": "03",
        "title": "Постоянное расширение",
        "body": "В зависимости от задачи исследования мы расширяем охват партнёров и участников на ключевых рынках — от конкретного места к более широкому взгляду."
      }
    ]
  },
  "sv": {
    "humanBody": "Vi tror att verkliga människor alltid är utgångspunkten för forskning. AI kan skapa oändligt mycket innehåll som ser äkta ut. Men den kan aldrig återskapa en specifik människa i ett specifikt ögonblick som säger vad hen verkligen tycker. Bakom varje undersökningsresultat står en människa som valde att dela ett perspektiv. De enskilda rösterna gör insikt värt att lita på. Vi använder matchning och realtidsdata för att respektera din tid, visa din påverkan och hålla varje belöningsregel tydlig och rättvis. Människocentrerat betyder inte att avvisa teknik. Det betyder att låta teknik tjäna människor.",
    "eyebrow": "Om oss",
    "theme": "Dina åsikter formar världen.",
    "whoEyebrow": "Vilka vi är",
    "humanEyebrow": "Människan först",
    "body": "Vi är ett tvärregionalt insight- och undersökningsföretag som bygger en öppen, sammankopplad och hållbar forskningsgemenskap. Vi knyter samman deltagare, uppdragsgivare och organisationer inom näringsliv, kultur, vardag och offentliga frågor och gör verkliga röster till tydliga bedömningar — för bättre beslut och en bättre värld.",
    "storyTitle": "Rotade i Kina, kopplade till världen.",
    "points": [
      {
        "num": "01",
        "title": "En kinesisk grund",
        "body": "Teamet har i många år arbetat med marknadsundersökningar och har byggt upp en stabil gemenskap och ett forskningsnätverk i Kina, med tillgång till verkliga och verifierbara lokala urval."
      },
      {
        "num": "02",
        "title": "Regionala partner",
        "body": "I Stor-Kina, Asien-Stillahavsområdet, Mellanöstern, Europa och Nordamerika arbetar vi med lokala undersökningspartner, så att varje marknad drivs av människor som känner den."
      },
      {
        "num": "03",
        "title": "Ständigt växande",
        "body": "Beroende på studien utökar vi täckningen av partner och deltagare på viktiga marknader — med utgångspunkt i en konkret plats och blick för ett bredare perspektiv."
      }
    ]
  },
  "tr": {
    "humanBody": "Gerçek insanların her zaman araştırmanın başlangıç noktası olduğuna inanıyoruz. Yapay zekâ gerçek görünen sonsuz içerik üretebilir. Ancak belirli bir kişiyi, belirli bir anda, gerçekten düşündüğünü söylerken asla yeniden yaratamaz. Her anket sonucunun arkasında bakış açısını paylaşmayı seçen bir insan vardır. Bu bireysel sesler içgörüyü güvenilir kılar. Eşleştirme ve gerçek zamanlı verilerle zamanınıza saygı duyuyor, etkinizi gösteriyor ve her ödül kuralını açık ve adil tutuyoruz. İnsan odaklı olmak teknolojiyi reddetmek değildir. Teknolojinin insanlara hizmet etmesini sağlamaktır.",
    "eyebrow": "Hakkımızda",
    "theme": "Görüşleriniz dünyayı şekillendirir.",
    "whoEyebrow": "Biz kimiz",
    "humanEyebrow": "Önce insan",
    "body": "Bölgeler arası bir içgörü ve araştırma şirketiyiz; açık, birbirine bağlı ve sürdürülebilir bir araştırma topluluğu kuruyoruz. Katılımcıları, araştırma talebinde bulunanları ve kurumları ticaret, kültür, günlük yaşam ve kamusal konular etrafında bir araya getiriyor, gerçek sesleri net yargılara dönüştürüyoruz — daha iyi kararlar ve daha iyi bir dünya için.",
    "storyTitle": "Çin'de köklü, dünyayla bağlantılı.",
    "points": [
      {
        "num": "01",
        "title": "Çin'de bir temel",
        "body": "Ekip yıllardır pazar araştırmasına odaklanıyor ve Çin'de istikrarlı bir topluluk ile araştırma ağı kurdu; gerçek ve doğrulanabilir yerel örneklere ulaşabiliyor."
      },
      {
        "num": "02",
        "title": "Bölgesel ortaklar",
        "body": "Büyük Çin, Asya-Pasifik, Orta Doğu, Avrupa ve Kuzey Amerika'da yerel araştırma ortaklarıyla çalışıyoruz; böylece her pazarı o pazarı tanıyan kişiler yürütüyor."
      },
      {
        "num": "03",
        "title": "Sürekli genişleyen",
        "body": "Araştırmanın gereğine göre önemli pazarlarda ortak ve katılımcı kapsamını genişletiyoruz — belirli bir yerden başlayıp daha geniş bir bakışa uzanıyoruz."
      }
    ]
  }
};

export const accessEntryCopy = {
  "zh-CN": {
    "title": "让每一次判断\n都有事实依据。",
    "note": "准备好加入我们了吗？\n共同打造开放、共生、可持续的研究生态。"
  },
  "zh-Hant": {
    "title": "讓每一次判斷\n都有事實依據。",
    "note": "準備好加入我們了嗎？\n共同打造開放、共生、可持續的研究生態。"
  },
  "en": {
    "title": "Let every judgement\nrest on evidence.",
    "note": "Ready to join us?\nTogether we build an open, interconnected and sustainable research ecosystem."
  },
  "de": {
    "title": "Jedes Urteil\nruht auf Belegen.",
    "note": "Bereit, Teil davon zu werden?\nGemeinsam bauen wir ein offenes, vernetztes und nachhaltiges Forschungsökosystem."
  },
  "fr": {
    "title": "Chaque jugement\nrepose sur des preuves.",
    "note": "Prêt à nous rejoindre ?\nEnsemble, nous construisons un écosystème de recherche ouvert, interconnecté et durable."
  },
  "nl": {
    "title": "Elk oordeel\nrust op bewijs.",
    "note": "Klaar om mee te doen?\nSamen bouwen we een open, verbonden en duurzaam onderzoeksecosysteem."
  },
  "da": {
    "title": "Hver vurdering\nhviler på evidens.",
    "note": "Klar til at være med?\nSammen bygger vi et åbent, sammenkoblet og bæredygtigt forskningsøkosystem."
  },
  "es": {
    "title": "Cada juicio\nse apoya en pruebas.",
    "note": "¿Listo para unirte?\nJuntos construimos un ecosistema de investigación abierto, interconectado y sostenible."
  },
  "fi": {
    "title": "Jokainen arvio\nperustuu näyttöön.",
    "note": "Valmis liittymään?\nRakennamme yhdessä avointa, verkottunutta ja kestävää tutkimusekosysteemiä."
  },
  "it": {
    "title": "Ogni giudizio\nsi basa su prove.",
    "note": "Pronto a unirsi a noi?\nInsieme costruiamo un ecosistema di ricerca aperto, interconnesso e sostenibile."
  },
  "ja": {
    "title": "すべての判断を\n事実にもとづかせる。",
    "note": "参加しませんか。\n開かれ、相互につながり、持続可能なリサーチの生態系を共につくります。"
  },
  "ko": {
    "title": "모든 판단이\n사실에 근거하도록.",
    "note": "함께하시겠습니까?\n열려 있고 상호 연결된 지속 가능한 리서치 생태계를 함께 만듭니다."
  },
  "no": {
    "title": "Hver vurdering\nhviler på bevis.",
    "note": "Klar til å bli med?\nSammen bygger vi et åpent, sammenkoblet og bærekraftig forskningsøkosystem."
  },
  "pt": {
    "title": "Cada juízo\nassenta em provas.",
    "note": "Pronto para se juntar a nós?\nJuntos construímos um ecossistema de investigação aberto, interligado e sustentável."
  },
  "ru": {
    "title": "Пусть каждое суждение\nопирается на факты.",
    "note": "Готовы присоединиться?\nВместе мы строим открытую, взаимосвязанную и устойчивую исследовательскую экосистему."
  },
  "sv": {
    "title": "Varje bedömning\nvilar på bevis.",
    "note": "Redo att vara med?\nTillsammans bygger vi ett öppet, sammankopplat och hållbart forskningsekosystem."
  },
  "tr": {
    "title": "Her yargı\nkanıta dayansın.",
    "note": "Bize katılmaya hazır mısınız?\nBirlikte açık, birbirine bağlı ve sürdürülebilir bir araştırma ekosistemi kuruyoruz."
  },
  "en-GB": {
    "title": "Let every judgement\nrest on evidence.",
    "note": "Ready to join us?\nTogether we build an open, interconnected and sustainable research ecosystem."
  }
};

export const industryCopy = {
  "automotive": {
    "en-US": {
      "kicker": "Industries",
      "title": "Automotive",
      "lead": "Research for car and two-wheeler manufacturers, importers and dealer groups: concept, pricing, launch and channel studies.",
      "introKicker": "How we work",
      "intro": [
        "A vehicle programme commits investment years before market response is known. Our work is to reduce that uncertainty with evidence that can be presented to a board.",
        "Category, powertrain and channel have fragmented at the same time. There are more nameplates and more price points, and the purchase often begins online and completes at a dealer that does not hold the model in stock. A single tracker no longer covers the category.",
        "Each study is designed around the decision it has to support: which features justify their cost, what price range is sustainable, whether the network can deliver what the launch promises, and what conditions would make a buyer choose electric. Design, sample and reporting are set by that question.",
        "Deliverables are built to be used: cross-tabs with weights stated, verbatims that explain the numbers, and a clear separation between what the data supports and what it does not."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Concept and configuration",
          "frame": "What the product should be, and what each feature is worth.",
          "cards": [
            {
              "title": "Feature validation",
              "body": "Interior layout, HMI and driver-assistance features are tested with owners and considerers before tooling, within a defined price context.",
              "methods": "Concept and A/B testing · owners and considerers"
            },
            {
              "title": "Pricing and configuration",
              "body": "Price sensitivity and trade-off models establish what each feature is worth and which configuration supports the intended price.",
              "methods": "Willingness-to-pay and conjoint models · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Launch and communication",
          "frame": "Whether the message is understood before media spend is committed.",
          "cards": [
            {
              "title": "Pre-launch message testing",
              "body": "Which proposition is understood, believed and remembered by the buyers the launch depends on, tested before the campaign is produced.",
              "methods": "Online survey and CATI · target buyers"
            },
            {
              "title": "Campaign and asset pre-testing",
              "body": "Creative, dealer promotions and digital assets tested for recall and purchase intent before media is committed.",
              "methods": "Concept and A/B testing · media assets"
            }
          ]
        },
        {
          "n": "03",
          "name": "In market and channel",
          "frame": "Whether the network can complete the sale, deliver the vehicle and keep the buyer.",
          "cards": [
            {
              "title": "Dealer and channel performance",
              "body": "Satisfaction, standards and training take-up across the network, and where a sale is lost at the counter.",
              "methods": "CATI · dealer and distributor interviews"
            },
            {
              "title": "Online to forecourt",
              "body": "The path from first search to test drive, and where consideration is lost before the visit.",
              "methods": "Online survey · recent buyers and considerers"
            },
            {
              "title": "Two-wheeler networks",
              "body": "Coverage, parts availability and service standards in scooter and motorcycle channels, gathered by telephone across the network.",
              "methods": "CATI and field visits · dealers, service points"
            }
          ]
        },
        {
          "n": "04",
          "name": "Electrification",
          "frame": "Cars and two-wheelers face different barriers, and are studied separately.",
          "cards": [
            {
              "title": "Cars: adoption and charging",
              "body": "Private buyers weigh range, charging access and price; fleets weigh total cost of ownership. Results are reported by market.",
              "methods": "Online and CATI · owners, considerers, fleet managers"
            },
            {
              "title": "Two-wheelers: electrification and the network",
              "body": "We examine the trade-off between purchase price and running cost, the choice between home charging and battery swapping, and service coverage for the products sold.",
              "methods": "Online and CATI · riders, dealers, fleet operators"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by city, dealer type or buyer segment. Used where the list is defined and the sample is large."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes, run one to one by the research team, used to understand how a decision is made and what it rests on."
        ],
        [
          "Concept and A/B testing",
          "Two or more executions tested on comparable samples, with one variable changed at a time, before tooling or media spend."
        ],
        [
          "Dealer network census",
          "A telephone census of the dealer and distributor network, covering coverage, parts availability and training take-up."
        ],
        [
          "B2B panels",
          "A sample recruited in advance: decision-makers inside client organisations, screened by company size, sector and role."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "汽车",
      "lead": "面向汽车与两轮车整车厂、进口商与经销商集团，提供概念、定价、上市与渠道研究。",
      "introKicker": "我们如何做",
      "intro": [
        "一个车型项目在了解市场反应之前，就已经投入数年。我们的工作是用可以拿到会上陈述的证据，降低这段时间的不确定性。",
        "品类、动力形式与渠道同时碎片化：车系更多、价格带更多，购买往往从线上开始，最后完成于一家没有现车的经销商。一份追踪研究已经覆盖不了整个品类。",
        "每项研究都围绕它要支撑的决定来设计：哪些配置能证明自己的成本、什么价格区间站得住、渠道能不能交付上市承诺、什么条件下买家会选择电动。设计、样本与报告由这个问题决定。",
        "交付物以可用为标准：标明权重的交叉表、能解释数字的原话，并明确区分数据支持与不支持的结论。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "概念与配置",
          "frame": "产品应具备什么，以及每一项配置的价值。",
          "cards": [
            {
              "title": "功能验证",
              "body": "在开模之前，用车主与潜在买家测试内饰布局、车机交互与驾驶辅助功能，并在明确的价格条件下进行。",
              "methods": "概念与 A/B 测试 · 车主与考虑者"
            },
            {
              "title": "定价与配置",
              "body": "价格敏感度与权衡模型确定每项配置值多少、哪种配置组合支撑得住目标价格。",
              "methods": "支付意愿与联合分析模型 · 电话访问"
            }
          ]
        },
        {
          "n": "02",
          "name": "上市与传播",
          "frame": "在媒介预算花出去之前，信息是否被理解。",
          "cards": [
            {
              "title": "上市信息测试",
              "body": "测试上市所依赖的买家是否理解、相信并记住某个主张，在广告制作之前完成。",
              "methods": "线上问卷与电话访问 · 目标买家"
            },
            {
              "title": "广告与素材前测",
              "body": "在媒介投放之前，测试创意、促销物料与数字素材的记忆度与购买意向。",
              "methods": "概念与 A/B 测试 · 媒介素材"
            }
          ]
        },
        {
          "n": "03",
          "name": "在售与渠道",
          "frame": "渠道能否完成销售、交付车辆并留住买家。",
          "cards": [
            {
              "title": "经销商与渠道效能",
              "body": "整个网络的满意度、标准执行与培训落地，以及成交在柜台环节流失的位置。",
              "methods": "电话访问 · 经销商与分销商访谈"
            },
            {
              "title": "从线上到展厅",
              "body": "从第一次搜索到试驾的路径，以及到店之前意向在哪一步流失。",
              "methods": "线上问卷 · 近期买家与考虑者"
            },
            {
              "title": "两轮车渠道",
              "body": "两轮车渠道的覆盖、配件可得性与服务标准，通过电话对网络逐家询问。",
              "methods": "电话访问与实地走访 · 经销商、服务点"
            }
          ]
        },
        {
          "n": "04",
          "name": "电动化",
          "frame": "汽车和两轮车面对的阻力不同，分开研究。",
          "cards": [
            {
              "title": "汽车：采用与充电",
              "body": "私人买家关注续航、充电条件与价格；车队关注总持有成本。结果按市场分别报告。",
              "methods": "线上与电话访问 · 车主、考虑者、车队管理者"
            },
            {
              "title": "两轮车：电动化与网络",
              "body": "比较购车价与使用成本的取舍、在家充电与门店换电的选择，以及所售产品的服务覆盖。",
              "methods": "线上与电话访问 · 骑手、经销商、车队运营方"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "电话访问（CATI）",
          "按脚本执行电话访问，配额按城市、门店类型或买家群体设定。用于名单明确、样本量大的项目。"
        ],
        [
          "深度访谈",
          "由研究人员一对一进行 45–60 分钟的深度访谈，用于理解受访者如何做出判断，以及依据是什么。"
        ],
        [
          "概念与 A/B 测试",
          "把两个或多个方案放在可比样本上测试，每次只改变一个变量，在开模或投放之前给出结论。"
        ],
        [
          "经销商网络普查",
          "对经销商与分销商网络做电话普查，覆盖范围、配件可得性与培训落地。"
        ],
        [
          "企业决策者样本",
          "样本预先招募：企业内部的采购、技术与业务决策者，按公司规模、行业和职位筛选。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "汽車",
      "lead": "面向汽車與兩輪車車廠、進口商與經銷商集團，提供概念、定價、上市與渠道研究。",
      "introKicker": "我們如何做",
      "intro": [
        "一個車型專案在了解市場反應之前，就已經投入數年。我們的工作是用可以拿到會上陳述的證據，降低這段時間的不確定性。",
        "品類、動力形式與渠道同時碎片化：車系更多、價格帶更多，購買往往從線上開始，最後完成於一家沒有現車的經銷商。一份追蹤研究已經覆蓋不了整個品類。",
        "每項研究都圍繞它要支撐的決定來設計：哪些配置能證明自己的成本、什麼價格區間站得住、渠道能不能交付上市承諾、什麼條件下買家會選擇電動。設計、樣本與報告由這個問題決定。",
        "交付物以可用為標準：標明權重的交叉表、能解釋數字的話，並明確區分資料支持與不支持的結論。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "概念與配置",
          "frame": "產品應具備什麼，以及每一項配置的價值。",
          "cards": [
            {
              "title": "功能驗證",
              "body": "在開模之前，用車主與潛在買家測試內飾佈局、車機互動與駕駛輔助功能，並在明確的價格條件下進行。",
              "methods": "概念與 A/B 測試 · 車主與考慮者"
            },
            {
              "title": "定價與配置",
              "body": "價格敏感度與權衡模型確定每項配置值多少、哪種配置組合支撐得住目標價格。",
              "methods": "支付意願與聯合分析模型 · 電話訪問"
            }
          ]
        },
        {
          "n": "02",
          "name": "上市與傳播",
          "frame": "在媒介預算花出去之前，訊息是否被理解。",
          "cards": [
            {
              "title": "上市訊息測試",
              "body": "測試上市所依賴的買家是否理解、相信並記住某個主張，在廣告製作之前完成。",
              "methods": "線上問卷與電話訪問 · 目標買家"
            },
            {
              "title": "廣告與素材前測",
              "body": "在媒介投放之前，測試創意、促銷物料與數位素材的記憶度與購買意願。",
              "methods": "概念與 A/B 測試 · 媒介素材"
            }
          ]
        },
        {
          "n": "03",
          "name": "在售與渠道",
          "frame": "渠道能否完成銷售、交付車輛並留住買家。",
          "cards": [
            {
              "title": "經銷商與渠道效能",
              "body": "整個網絡的滿意度、標準執行與培訓落地，以及成交在櫃台環節流失的位置。",
              "methods": "電話訪問 · 經銷商與分銷商訪談"
            },
            {
              "title": "從線上到展廳",
              "body": "從第一次搜尋到試駕的路徑，以及到店之前意願在哪一步流失。",
              "methods": "線上問卷 · 近期買家與考慮者"
            },
            {
              "title": "兩輪車渠道",
              "body": "兩輪車渠道的覆蓋、配件可得性與服務標準，透過電話對網絡逐家詢問。",
              "methods": "電話訪問與實地走訪 · 經銷商、服務點"
            }
          ]
        },
        {
          "n": "04",
          "name": "電動化",
          "frame": "汽車和兩輪車面對的阻力不同，分開研究。",
          "cards": [
            {
              "title": "汽車：採用與充電",
              "body": "私人買家關注續航、充電條件與價格；車隊關注總持有成本。結果按市場分別報告。",
              "methods": "線上與電話訪問 · 車主、考慮者、車隊管理者"
            },
            {
              "title": "兩輪車：電動化與網絡",
              "body": "比較購車價與使用成本的取捨、在家充電與門店換電的選擇，以及所售產品的服務覆蓋。",
              "methods": "線上與電話訪問 · 騎手、經銷商、車隊營運方"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "電話訪問（CATI）",
          "按腳本執行電話訪問，配額按城市、門店類型或買家群體設定。用於名單明確、樣本量大的專案。"
        ],
        [
          "深度訪談",
          "由研究人員一對一進行 45–60 分鐘的深度訪談，用於理解受訪者如何做出判斷，以及依據是什麼。"
        ],
        [
          "概念與 A/B 測試",
          "把兩個或多個方案放在可比樣本上測試，每次只改變一個變數，在開模或投放之前給出結論。"
        ],
        [
          "經銷商網絡普查",
          "對經銷商與分銷商網絡做電話普查，涵蓋覆蓋範圍、配件可得性與培訓落地。"
        ],
        [
          "企業決策者樣本",
          "樣本預先招募：企業內部的採購、技術與業務決策者，按公司規模、行業和職位篩選。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "de": {
      "kicker": "Branchen",
      "title": "Automobil",
      "lead": "Forschung für Auto- und Zweiradhersteller, Importeure und Händlergruppen: Konzept-, Preis-, Launch- und Kanalstudien.",
      "introKicker": "So arbeiten wir",
      "intro": [
        "Ein Fahrzeugprogramm bindet Investitionen Jahre, bevor die Marktreaktion bekannt ist. Unsere Aufgabe ist es, diese Unsicherheit mit Belegen zu verringern, die sich einem Vorstand präsentieren lassen.",
        "Kategorie, Antrieb und Kanal haben sich gleichzeitig aufgefächert. Es gibt mehr Modellreihen und mehr Preispunkte, und der Kauf beginnt oft online und endet bei einem Händler, der das Modell nicht vorrätig hat. Ein einzelner Tracker deckt die Kategorie nicht mehr ab.",
        "Jede Studie wird um die Entscheidung herum konzipiert, die sie stützen soll: welche Ausstattungen ihren Preis rechtfertigen, welche Preisspanne tragfähig ist, ob das Netz liefern kann, was der Launch verspricht, und unter welchen Bedingungen ein Käufer elektrisch wählt. Design, Stichprobe und Bericht folgen dieser Frage.",
        "Ergebnisse sind zum Gebrauch gemacht: Kreuztabellen mit ausgewiesenen Gewichten, Verbatims, die die Zahlen erklären, und eine klare Trennung zwischen dem, was die Daten stützen, und dem, was nicht."
      ],
      "stagesKicker": "Was wir untersuchen",
      "stages": [
        {
          "n": "01",
          "name": "Konzept und Konfiguration",
          "frame": "Was das Produkt sein soll und was jede Ausstattung wert ist.",
          "cards": [
            {
              "title": "Ausstattungsvalidierung",
              "body": "Innenraumlayout, HMI und Fahrassistenzsysteme werden mit Besitzern und Interessenten vor dem Werkzeugbau und innerhalb eines definierten Preisrahmens getestet.",
              "methods": "Konzept- und A/B-Tests · Besitzer und Interessenten"
            },
            {
              "title": "Preis und Konfiguration",
              "body": "Preissensitivität und Trade-off-Modelle zeigen, was jede Ausstattung wert ist und welche Konfiguration den Zielpreis trägt.",
              "methods": "Zahlungsbereitschafts- und Conjoint-Modelle · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Launch und Kommunikation",
          "frame": "Ob die Botschaft verstanden wird, bevor Mediabudgets gebunden sind.",
          "cards": [
            {
              "title": "Botschaftstest vor dem Launch",
              "body": "Welches Angebot von den Käufern, auf die der Launch angewiesen ist, verstanden, geglaubt und erinnert wird — getestet, bevor die Kampagne produziert wird.",
              "methods": "Online-Befragung und CATI · Zielkäufer"
            },
            {
              "title": "Kampagnen- und Material-Pretest",
              "body": "Kreation, Händleraktionen und digitale Assets werden auf Erinnerung und Kaufabsicht getestet, bevor Media gebucht wird.",
              "methods": "Konzept- und A/B-Tests · Media-Assets"
            }
          ]
        },
        {
          "n": "03",
          "name": "Im Markt und im Kanal",
          "frame": "Ob das Netz den Verkauf abschließen, das Fahrzeug liefern und den Käufer halten kann.",
          "cards": [
            {
              "title": "Händler- und Kanalleistung",
              "body": "Zufriedenheit, Standards und Trainingsannahme im Netz — und wo ein Verkauf am Tresen verloren geht.",
              "methods": "CATI · Händler- und Distributoreninterviews"
            },
            {
              "title": "Online bis zum Hof",
              "body": "Der Weg von der ersten Suche bis zur Probefahrt — und wo die Erwägung vor dem Besuch verloren geht.",
              "methods": "Online-Befragung · kürzliche Käufer und Interessenten"
            },
            {
              "title": "Zweiradnetzwerke",
              "body": "Abdeckung, Teileverfügbarkeit und Servicestandards in Roller- und Motorradkanälen, telefonisch im gesamten Netz erhoben.",
              "methods": "CATI und Feldbesuche · Händler, Servicestellen"
            }
          ]
        },
        {
          "n": "04",
          "name": "Elektrifizierung",
          "frame": "Autos und Zweiräder stehen vor unterschiedlichen Hürden und werden getrennt untersucht.",
          "cards": [
            {
              "title": "Autos: Akzeptanz und Laden",
              "body": "Privatkäufer wägen Reichweite, Ladezugang und Preis ab; Flotten wägen die Gesamtbetriebskosten ab. Ergebnisse werden je Markt berichtet.",
              "methods": "Online und CATI · Besitzer, Interessenten, Flottenmanager"
            },
            {
              "title": "Zweiräder: Elektrifizierung und Netz",
              "body": "Wir untersuchen die Abwägung zwischen Kaufpreis und Betriebskosten, die Wahl zwischen Heimladen und Akkuwechsel sowie die Serviceabdeckung für die verkauften Produkte.",
              "methods": "Online und CATI · Fahrer, Händler, Flottenbetreiber"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Was jede Methode ist und wann wir sie einsetzen.",
      "methods": [
        [
          "CATI",
          "Standardisierte Telefoninterviews mit Quoten nach Stadt, Händlertyp oder Käufersegment. Eingesetzt, wo die Liste definiert und die Stichprobe groß ist."
        ],
        [
          "Tiefeninterviews",
          "Tiefeninterviews von 45 bis 60 Minuten, eins zu eins vom Forschungsteam geführt, um zu verstehen, wie eine Entscheidung entsteht und worauf sie beruht."
        ],
        [
          "Konzept- und A/B-Tests",
          "Zwei oder mehr Umsetzungen werden auf vergleichbaren Stichproben getestet, jeweils eine Variable verändert, vor Werkzeugbau oder Mediabuchung."
        ],
        [
          "Händlernetz-Vollerhebung",
          "Eine telefonische Vollerhebung des Händler- und Distributorennetzes zu Abdeckung, Teileverfügbarkeit und Trainingsannahme."
        ],
        [
          "B2B-Panels",
          "Eine vorab rekrutierte Stichprobe: Entscheider in Kundenorganisationen, gescreent nach Unternehmensgröße, Branche und Rolle."
        ]
      ],
      "ctaTitle": "Sagen Sie uns, welche Entscheidung diese Forschung stützen soll.",
      "ctaBody": "Sie erhalten die Ergebnisse, die Belege dahinter und den empfohlenen nächsten Schritt.",
      "ctaPrimary": "Mit dem Forschungsteam sprechen",
      "ctaSecondary": "Mitmachen"
    },
    "fr": {
      "kicker": "Secteurs",
      "title": "Automobile",
      "lead": "Études pour les constructeurs automobiles et de deux-roues, les importateurs et les groupes de concessionnaires : concepts, prix, lancement et canaux.",
      "introKicker": "Notre méthode",
      "intro": [
        "Un programme véhicule engage des investissements des années avant que la réaction du marché soit connue. Notre travail consiste à réduire cette incertitude avec des preuves présentables à un conseil d'administration.",
        "Catégorie, motorisation et canal se sont fragmentés en même temps. Il y a plus de modèles et plus de niveaux de prix, et l'achat commence souvent en ligne pour se conclure chez un concessionnaire qui n'a pas le modèle en stock. Un seul tracker ne couvre plus la catégorie.",
        "Chaque étude est conçue autour de la décision qu'elle doit éclairer : quels équipements justifient leur coût, quelle fourchette de prix est tenable, si le réseau peut livrer ce que le lancement promet, et à quelles conditions un acheteur choisirait l'électrique. Design, échantillon et rapport découlent de cette question.",
        "Les livrables sont faits pour être utilisés : tableaux croisés avec pondérations indiquées, verbatims qui expliquent les chiffres, et séparation claire entre ce que les données soutiennent et ce qu'elles ne soutiennent pas."
      ],
      "stagesKicker": "Ce que nous étudions",
      "stages": [
        {
          "n": "01",
          "name": "Concept et configuration",
          "frame": "Ce que le produit doit être et ce que vaut chaque équipement.",
          "cards": [
            {
              "title": "Validation des équipements",
              "body": "L'aménagement intérieur, l'IHM et les aides à la conduite sont testés auprès de propriétaires et de prospects avant l'outillage, dans un cadre de prix défini.",
              "methods": "Tests de concept et A/B · propriétaires et prospects"
            },
            {
              "title": "Prix et configuration",
              "body": "La sensibilité au prix et les modèles d'arbitrage établissent la valeur de chaque équipement et la configuration qui soutient le prix visé.",
              "methods": "Modèles de disposition à payer et conjoint · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lancement et communication",
          "frame": "Si le message est compris avant que les budgets médias soient engagés.",
          "cards": [
            {
              "title": "Test du message avant lancement",
              "body": "Quelle proposition est comprise, crue et retenue par les acheteurs dont dépend le lancement, testée avant la production de la campagne.",
              "methods": "Enquête en ligne et CATI · acheteurs ciblés"
            },
            {
              "title": "Pré-test de campagne et de supports",
              "body": "Créations, promotions concessionnaires et supports numériques testés sur la mémorisation et l'intention d'achat avant l'achat média.",
              "methods": "Tests de concept et A/B · supports médias"
            }
          ]
        },
        {
          "n": "03",
          "name": "Sur le marché et dans le canal",
          "frame": "Si le réseau peut conclure la vente, livrer le véhicule et fidéliser l'acheteur.",
          "cards": [
            {
              "title": "Performance des concessionnaires et du canal",
              "body": "Satisfaction, standards et appropriation des formations dans le réseau, et où une vente se perd au comptoir.",
              "methods": "CATI · entretiens concessionnaires et distributeurs"
            },
            {
              "title": "De l'online au parc",
              "body": "Le parcours de la première recherche à l'essai, et où l'intention se perd avant la visite.",
              "methods": "Enquête en ligne · acheteurs récents et prospects"
            },
            {
              "title": "Réseaux deux-roues",
              "body": "Couverture, disponibilité des pièces et standards de service dans les canaux scooter et moto, collectés par téléphone sur l'ensemble du réseau.",
              "methods": "CATI et visites terrain · concessionnaires, points service"
            }
          ]
        },
        {
          "n": "04",
          "name": "Électrification",
          "frame": "Voitures et deux-roues rencontrent des obstacles différents et sont étudiés séparément.",
          "cards": [
            {
              "title": "Voitures : adoption et recharge",
              "body": "Les particuliers pèsent l'autonomie, l'accès à la recharge et le prix ; les flottes pèsent le coût total de possession. Les résultats sont présentés par marché.",
              "methods": "En ligne et CATI · propriétaires, prospects, gestionnaires de flotte"
            },
            {
              "title": "Deux-roues : électrification et réseau",
              "body": "Nous examinons l'arbitrage entre prix d'achat et coût d'usage, le choix entre recharge à domicile et échange de batterie, et la couverture service des produits vendus.",
              "methods": "En ligne et CATI · usagers, concessionnaires, exploitants de flotte"
            }
          ]
        }
      ],
      "methodsKicker": "Méthodes",
      "methodsLead": "Ce qu'est chaque méthode et quand nous l'utilisons.",
      "methods": [
        [
          "CATI",
          "Entretiens téléphoniques scriptés, avec quotas par ville, type de concessionnaire ou segment d'acheteurs. Utilisés lorsque la liste est définie et l'échantillon important."
        ],
        [
          "Entretiens approfondis",
          "Entretiens approfondis de 45 à 60 minutes, menés en tête-à-tête par l'équipe, pour comprendre comment une décision se prend et sur quoi elle repose."
        ],
        [
          "Tests de concept et A/B",
          "Deux exécutions ou plus testées sur des échantillons comparables, une variable modifiée à la fois, avant outillage ou achat média."
        ],
        [
          "Recensement du réseau",
          "Un recensement téléphonique du réseau de concessionnaires et distributeurs, couvrant la couverture, la disponibilité des pièces et l'appropriation des formations."
        ],
        [
          "Panels B2B",
          "Un échantillon recruté à l'avance : décideurs au sein des organisations clientes, filtrés par taille, secteur et fonction."
        ]
      ],
      "ctaTitle": "Dites-nous quelle décision cette étude doit éclairer.",
      "ctaBody": "Vous recevez les résultats, les preuves qui les sous-tendent et la prochaine étape recommandée.",
      "ctaPrimary": "Parler à l'équipe",
      "ctaSecondary": "Nous rejoindre"
    },
    "nl": {
      "kicker": "Sectoren",
      "title": "Automotive",
      "lead": "Onderzoek voor fabrikanten van auto's en tweewielers, importeurs en dealergroepen: concept-, prijs-, lanceer- en kanaalstudies.",
      "introKicker": "Zo werken we",
      "intro": [
        "Een voertuigprogramma legt investeringen vast jaren voordat de marktreactie bekend is. Ons werk is die onzekerheid te verkleinen met bewijs dat aan een raad van bestuur kan worden voorgelegd.",
        "Categorie, aandrijving en kanaal zijn tegelijk gefragmenteerd. Er zijn meer modellen en meer prijspunten, en de aankoop begint vaak online en eindigt bij een dealer die het model niet op voorraad heeft. Eén tracker dekt de categorie niet meer.",
        "Elke studie wordt opgebouwd rond de beslissing die zij moet ondersteunen: welke uitrusting de kosten rechtvaardigt, welke prijsband houdbaar is, of het netwerk kan leveren wat de lancering belooft, en onder welke voorwaarden een koper elektrisch kiest. Ontwerp, steekproef en rapportage volgen die vraag.",
        "Opleveringen zijn gemaakt om te gebruiken: kruistabellen met vermelde wegingen, verbatims die de cijfers verklaren, en een duidelijk onderscheid tussen wat de data ondersteunen en wat niet."
      ],
      "stagesKicker": "Wat we onderzoeken",
      "stages": [
        {
          "n": "01",
          "name": "Concept en configuratie",
          "frame": "Wat het product moet zijn en wat elke functie waard is.",
          "cards": [
            {
              "title": "Validatie van functies",
              "body": "Interieurindeling, HMI en rijassistentie worden getest bij eigenaren en overwegers vóór de matrijsbouw, binnen een afgebakende prijscontext.",
              "methods": "Concept- en A/B-tests · eigenaren en overwegers"
            },
            {
              "title": "Prijs en configuratie",
              "body": "Prijsgevoeligheid en trade-offmodellen bepalen wat elke functie waard is en welke configuratie de beoogde prijs ondersteunt.",
              "methods": "Betalingsbereidheids- en conjointmodellen · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lancering en communicatie",
          "frame": "Of de boodschap wordt begrepen voordat mediabudget wordt vastgelegd.",
          "cards": [
            {
              "title": "Boodschaptest vóór de lancering",
              "body": "Welk aanbod wordt begrepen, geloofd en onthouden door de kopers waarvan de lancering afhangt — getest voordat de campagne wordt geproduceerd.",
              "methods": "Online-enquête en CATI · doelkopers"
            },
            {
              "title": "Pretest van campagne en middelen",
              "body": "Creatie, dealeracties en digitale middelen getest op herinnering en koopintentie voordat media wordt ingekocht.",
              "methods": "Concept- en A/B-tests · mediamiddelen"
            }
          ]
        },
        {
          "n": "03",
          "name": "In de markt en het kanaal",
          "frame": "Of het netwerk de verkoop kan afronden, het voertuig kan leveren en de koper kan behouden.",
          "cards": [
            {
              "title": "Prestaties van dealers en kanalen",
              "body": "Tevredenheid, standaarden en training in het netwerk, en waar een verkoop bij de balie verloren gaat.",
              "methods": "CATI · interviews met dealers en distributeurs"
            },
            {
              "title": "Online naar de showroom",
              "body": "Het pad van eerste zoekopdracht tot proefrit, en waar de overweging vóór het bezoek verloren gaat.",
              "methods": "Online-enquête · recente kopers en overwegers"
            },
            {
              "title": "Tweewielernetwerken",
              "body": "Dekking, onderdelenbeschikbaarheid en servicenormen in scooter- en motorfietskanalen, telefonisch verzameld in het hele netwerk.",
              "methods": "CATI en veldbezoeken · dealers, servicepunten"
            }
          ]
        },
        {
          "n": "04",
          "name": "Elektrificatie",
          "frame": "Auto's en tweewielers kennen verschillende drempels en worden apart onderzocht.",
          "cards": [
            {
              "title": "Auto's: adoptie en laden",
              "body": "Particuliere kopers wegen actieradius, laadtoegang en prijs; wagenparken wegen total cost of ownership. Resultaten worden per markt gerapporteerd.",
              "methods": "Online en CATI · eigenaren, overwegers, vlootbeheerders"
            },
            {
              "title": "Tweewielers: elektrificatie en netwerk",
              "body": "We onderzoeken de afweging tussen aankoopprijs en gebruikskosten, de keuze tussen thuis laden en accuwissel, en de servicedekking voor de verkochte producten.",
              "methods": "Online en CATI · berijders, dealers, vlootbeheerders"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Wat elke methode is en wanneer we die gebruiken.",
      "methods": [
        [
          "CATI",
          "Gescripte telefonische interviews, met quota naar stad, dealertype of koperssegment. Gebruikt waar de lijst gedefinieerd is en de steekproef groot."
        ],
        [
          "Diepte-interviews",
          "Diepte-interviews van 45 tot 60 minuten, één op één door het onderzoeksteam gevoerd, om te begrijpen hoe een beslissing tot stand komt en waarop zij rust."
        ],
        [
          "Concept- en A/B-tests",
          "Twee of meer uitvoeringen getest op vergelijkbare steekproeven, met één variabele per keer, vóór matrijsbouw of mediakoop."
        ],
        [
          "Volledige dealerinventarisatie",
          "Een telefonische inventarisatie van het dealer- en distributienetwerk, met dekking, onderdelenbeschikbaarheid en training."
        ],
        [
          "B2B-panels",
          "Een vooraf geworven steekproef: beslissers binnen klantorganisaties, gescreend op bedrijfsgrootte, sector en rol."
        ]
      ],
      "ctaTitle": "Vertel ons welke beslissing dit onderzoek moet ondersteunen.",
      "ctaBody": "U ontvangt de resultaten, het bewijs erachter en de aanbevolen volgende stap.",
      "ctaPrimary": "Praat met het onderzoeksteam",
      "ctaSecondary": "Doe mee"
    },
    "da": {
      "kicker": "Brancher",
      "title": "Biler og køretøjer",
      "lead": "Research for bil- og tohjulsproducenter, importører og forhandlergrupper: koncept-, pris-, launch- og kanalstudier.",
      "introKicker": "Sådan arbejder vi",
      "intro": [
        "Et køretøjsprogram binder investeringer år før markedsreaktionen er kendt. Vores arbejde er at reducere den usikkerhed med belæg, der kan fremlægges for en bestyrelse.",
        "Kategori, drivlinje og kanal er fragmenteret samtidig. Der er flere modeller og flere prispunkter, og købet begynder ofte online og slutter hos en forhandler, der ikke har modellen på lager. Én tracker dækker ikke længere kategorien.",
        "Hver undersøgelse designes om den beslutning, den skal understøtte: hvilket udstyr der retfærdiggør sin pris, hvilket prisinterval der er holdbart, om netværket kan levere det, lanceringen lover, og under hvilke betingelser en køber vælger el. Design, stikprøve og rapportering følger det spørgsmål.",
        "Leverancer er bygget til brug: krydstabeller med angivne vægte, verbatims der forklarer tallene, og en klar adskillelse mellem det, data understøtter, og det, de ikke gør."
      ],
      "stagesKicker": "Hvad vi undersøger",
      "stages": [
        {
          "n": "01",
          "name": "Koncept og konfiguration",
          "frame": "Hvad produktet skal være, og hvad hver funktion er værd.",
          "cards": [
            {
              "title": "Validering af udstyr",
              "body": "Interiørlayout, HMI og køreassistancesystemer testes med ejere og overvejere før værktøjsfremstilling, inden for en defineret prisramme.",
              "methods": "Koncept- og A/B-test · ejere og overvejere"
            },
            {
              "title": "Pris og konfiguration",
              "body": "Prisfølsomhed og trade-off-modeller fastslår, hvad hvert udstyr er værd, og hvilken konfiguration der understøtter den tilsigtede pris.",
              "methods": "Betalingsvilje- og conjointmodeller · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Launch og kommunikation",
          "frame": "Om budskabet forstås, før mediebudgettet bindes.",
          "cards": [
            {
              "title": "Budskabstest før launch",
              "body": "Hvilket tilbud der forstås, tror på og huskes af de købere, lanceringen afhænger af — testet før kampagnen produceres.",
              "methods": "Onlineundersøgelse og CATI · målkøbere"
            },
            {
              "title": "Prætest af kampagne og materialer",
              "body": "Kreativt materiale, forhandlerkampagner og digitale assets testes for genkaldelse og købsintention, før medier bookes.",
              "methods": "Koncept- og A/B-test · mediemateriale"
            }
          ]
        },
        {
          "n": "03",
          "name": "På markedet og i kanalen",
          "frame": "Om netværket kan gennemføre salget, levere køretøjet og holde på køberen.",
          "cards": [
            {
              "title": "Forhandler- og kanalperformance",
              "body": "Tilfredshed, standarder og træningsoptag i netværket, og hvor et salg går tabt ved disken.",
              "methods": "CATI · interviews med forhandlere og distributører"
            },
            {
              "title": "Online til forhandler",
              "body": "Vejen fra første søgning til prøvetur, og hvor overvejelsen går tabt før besøget.",
              "methods": "Onlineundersøgelse · nylige købere og overvejere"
            },
            {
              "title": "Tohjulsnetværk",
              "body": "Dækning, reservedels tilgængelighed og servicestandarder i scooter- og motorcykelkanaler, indsamlet telefonisk i hele netværket.",
              "methods": "CATI og feltbesøg · forhandlere, servicepunkter"
            }
          ]
        },
        {
          "n": "04",
          "name": "Elektrificering",
          "frame": "Biler og tohjulere har forskellige barrierer og undersøges hver for sig.",
          "cards": [
            {
              "title": "Biler: udbredelse og opladning",
              "body": "Private købere afvejer rækkevidde, adgang til opladning og pris; flåder afvejer totalomkostninger. Resultater rapporteres pr. marked.",
              "methods": "Online og CATI · ejere, overvejere, flådechefer"
            },
            {
              "title": "Tohjulere: elektrificering og netværk",
              "body": "Vi undersøger afvejningen mellem købspris og driftsomkostninger, valget mellem hjemmeopladning og batteriskift samt servicedækningen for de solgte produkter.",
              "methods": "Online og CATI · kørere, forhandlere, flådeoperatører"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hvad hver metode er, og hvornår vi bruger den.",
      "methods": [
        [
          "CATI",
          "Scriptede telefoninterviews med kvoter efter by, forhandlertype eller købersegment. Bruges, hvor listen er defineret, og stikprøven er stor."
        ],
        [
          "Dybdeinterviews",
          "Dybdeinterviews på 45-60 minutter, gennemført en til en af researchteamet, for at forstå, hvordan en beslutning tages, og hvad den hviler på."
        ],
        [
          "Koncept- og A/B-test",
          "To eller flere udførelser testes på sammenlignelige stikprøver med én variabel ændret ad gangen, før værktøj eller mediekøb."
        ],
        [
          "Fuld optælling af forhandlernetværk",
          "En telefonisk optælling af forhandler- og distributørnetværket med dækning, reservedels tilgængelighed og træningsoptag."
        ],
        [
          "B2B-panels",
          "En stikprøve rekrutteret på forhånd: beslutningstagere i kundeorganisationer, screenet efter virksomhedsstørrelse, sektor og rolle."
        ]
      ],
      "ctaTitle": "Fortæl os, hvilken beslutning denne research skal understøtte.",
      "ctaBody": "Du får resultaterne, belægget bag dem og det anbefalede næste skridt.",
      "ctaPrimary": "Tal med researchteamet",
      "ctaSecondary": "Vær med"
    },
    "es": {
      "kicker": "Sectores",
      "title": "Automoción",
      "lead": "Investigación para fabricantes de automóviles y de dos ruedas, importadores y grupos de concesionarios: estudios de concepto, precio, lanzamiento y canal.",
      "introKicker": "Cómo trabajamos",
      "intro": [
        "Un programa de vehículos compromete inversiones años antes de conocer la reacción del mercado. Nuestro trabajo es reducir esa incertidumbre con pruebas que puedan presentarse a un consejo.",
        "Categoría, motorización y canal se han fragmentado a la vez. Hay más modelos y más niveles de precio, y la compra suele empezar en línea y terminar en un concesionario que no tiene el modelo en stock. Un solo tracker ya no cubre la categoría.",
        "Cada estudio se diseña en torno a la decisión que debe sostener: qué equipamiento justifica su coste, qué franja de precio es sostenible, si la red puede cumplir lo que promete el lanzamiento y en qué condiciones un comprador elegiría eléctrico. El diseño, la muestra y el informe se derivan de esa pregunta.",
        "Los entregables están hechos para usarse: tablas cruzadas con ponderaciones declaradas, verbatims que explican las cifras y una separación clara entre lo que los datos sostienen y lo que no."
      ],
      "stagesKicker": "Qué estudiamos",
      "stages": [
        {
          "n": "01",
          "name": "Concepto y configuración",
          "frame": "Qué debe ser el producto y cuánto vale cada equipamiento.",
          "cards": [
            {
              "title": "Validación de equipamiento",
              "body": "El diseño interior, la HMI y las ayudas a la conducción se prueban con propietarios e interesados antes de la industrialización, dentro de un contexto de precio definido.",
              "methods": "Pruebas de concepto y A/B · propietarios e interesados"
            },
            {
              "title": "Precio y configuración",
              "body": "La sensibilidad al precio y los modelos de trade-off establecen cuánto vale cada equipamiento y qué configuración sostiene el precio previsto.",
              "methods": "Modelos de disposición a pagar y conjoint · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lanzamiento y comunicación",
          "frame": "Si el mensaje se entiende antes de comprometer la inversión en medios.",
          "cards": [
            {
              "title": "Prueba del mensaje antes del lanzamiento",
              "body": "Qué propuesta entienden, creen y recuerdan los compradores de los que depende el lanzamiento, probada antes de producir la campaña.",
              "methods": "Encuesta online y CATI · compradores objetivo"
            },
            {
              "title": "Pretest de campaña y piezas",
              "body": "Creatividades, promociones de concesionarios y piezas digitales probadas en recuerdo e intención de compra antes de comprar medios.",
              "methods": "Pruebas de concepto y A/B · piezas de medios"
            }
          ]
        },
        {
          "n": "03",
          "name": "En mercado y canal",
          "frame": "Si la red puede cerrar la venta, entregar el vehículo y retener al comprador.",
          "cards": [
            {
              "title": "Rendimiento de concesionarios y canal",
              "body": "Satisfacción, estándares y adopción de formación en la red, y dónde se pierde una venta en el mostrador.",
              "methods": "CATI · entrevistas con concesionarios y distribuidores"
            },
            {
              "title": "De lo online al concesionario",
              "body": "El recorrido desde la primera búsqueda hasta la prueba de conducción y dónde se pierde la consideración antes de la visita.",
              "methods": "Encuesta online · compradores recientes e interesados"
            },
            {
              "title": "Redes de dos ruedas",
              "body": "Cobertura, disponibilidad de repuestos y estándares de servicio en canales de scooter y moto, recogidos por teléfono en toda la red.",
              "methods": "CATI y visitas de campo · concesionarios, puntos de servicio"
            }
          ]
        },
        {
          "n": "04",
          "name": "Electrificación",
          "frame": "Coches y dos ruedas afrontan barreras distintas y se estudian por separado.",
          "cards": [
            {
              "title": "Coches: adopción y carga",
              "body": "Los compradores particulares sopesan autonomía, acceso a la carga y precio; las flotas, el coste total de propiedad. Los resultados se presentan por mercado.",
              "methods": "Online y CATI · propietarios, interesados, gestores de flota"
            },
            {
              "title": "Dos ruedas: electrificación y red",
              "body": "Examinamos el equilibrio entre precio de compra y coste de uso, la elección entre carga doméstica e intercambio de batería, y la cobertura de servicio de los productos vendidos.",
              "methods": "Online y CATI · usuarios, concesionarios, operadores de flota"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "Qué es cada método y cuándo lo usamos.",
      "methods": [
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, con cuotas por ciudad, tipo de concesionario o segmento de compradores. Se usan cuando la lista está definida y la muestra es grande."
        ],
        [
          "Entrevistas en profundidad",
          "Entrevistas en profundidad de 45 a 60 minutos, realizadas uno a uno por el equipo, para entender cómo se toma una decisión y en qué se apoya."
        ],
        [
          "Pruebas de concepto y A/B",
          "Dos o más ejecuciones probadas en muestras comparables, cambiando una variable cada vez, antes de la industrialización o la compra de medios."
        ],
        [
          "Censo de la red de concesionarios",
          "Un censo telefónico de la red de concesionarios y distribuidores, que cubre cobertura, disponibilidad de repuestos y adopción de formación."
        ],
        [
          "Paneles B2B",
          "Una muestra reclutada de antemano: decisores dentro de organizaciones cliente, filtrados por tamaño, sector y función."
        ]
      ],
      "ctaTitle": "Cuéntenos qué decisión debe sostener esta investigación.",
      "ctaBody": "Recibe los resultados, las pruebas que los sostienen y el siguiente paso recomendado.",
      "ctaPrimary": "Hablar con el equipo",
      "ctaSecondary": "Únete"
    },
    "fi": {
      "kicker": "Toimialat",
      "title": "Autoala",
      "lead": "Tutkimusta auto- ja kaksipyörävalmistajille, maahantuojille ja jälleenmyyjäryhmille: konsepti-, hinta-, lanseeraus- ja kanavatutkimukset.",
      "introKicker": "Näin työskentelemme",
      "intro": [
        "Ajoneuvo-ohjelma sitoo investointeja vuosia ennen kuin markkinareaktio tunnetaan. Tehtävämme on vähentää tätä epävarmuutta näytöllä, joka voidaan esittää hallitukselle.",
        "Kategoria, voimalinja ja kanava ovat pirstoutuneet samaan aikaan. Malleja ja hintapisteitä on enemmän, ja osto alkaa usein verkossa ja päättyy jälleenmyyjällä, jolla ei ole mallia varastossa. Yksi tracker ei enää kata kategoriaa.",
        "Jokainen tutkimus rakennetaan sen päätöksen ympärille, jota sen on tuettava: mitkä varusteet perustelevat hintansa, mikä hintahaarukka on kestävä, pystyykö verkosto toimittamaan sen, mitä lanseeraus lupaa, ja millä ehdoilla ostaja valitsisi sähkön. Suunnittelu, otos ja raportointi seuraavat tätä kysymystä.",
        "Tuotokset on tehty käytettäviksi: ristitaulukot, joissa painot on ilmoitettu, verbatim-sitaatit, jotka selittävät luvut, ja selkeä ero sen välillä, mitä data tukee ja mitä ei."
      ],
      "stagesKicker": "Mitä tutkimme",
      "stages": [
        {
          "n": "01",
          "name": "Konsepti ja konfiguraatio",
          "frame": "Mikä tuotteen tulisi olla ja mitä kukin ominaisuus on arvoinen.",
          "cards": [
            {
              "title": "Ominaisuuksien validointi",
              "body": "Sisätilan sommittelu, HMI ja kuljettajan avustinjärjestelmät testataan omistajilla ja harkitsevilla ennen työkalujen valmistusta määritellyssä hintakehyksessä.",
              "methods": "Konsepti- ja A/B-testaus · omistajat ja harkitsevat"
            },
            {
              "title": "Hinta ja konfiguraatio",
              "body": "Hintasensitiivisyys ja trade-off-mallit osoittavat, mitä kukin ominaisuus on arvoinen ja mikä konfiguraatio tukee tavoiteltua hintaa.",
              "methods": "Maksuhalukkuus- ja conjoint-mallit · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lanseeraus ja viestintä",
          "frame": "Ymmärretäänkö viesti ennen mediasatsausta.",
          "cards": [
            {
              "title": "Viestin testaus ennen lanseerausta",
              "body": "Minkä tarjouksen lanseerauksen kannalta keskeiset ostajat ymmärtävät, uskovat ja muistavat — testattuna ennen kampanjan tuotantoa.",
              "methods": "Verkkokysely ja CATI · kohdeostajat"
            },
            {
              "title": "Kampanjan ja materiaalien esitestaus",
              "body": "Mainonta, jälleenmyyjäkampanjat ja digitaaliset materiaalit testataan muistettavuuden ja ostoaikeen osalta ennen mediasatsausta.",
              "methods": "Konsepti- ja A/B-testaus · mediamateriaalit"
            }
          ]
        },
        {
          "n": "03",
          "name": "Markkinassa ja kanavassa",
          "frame": "Pystyykö verkosto viimeistelemään kaupan, toimittamaan ajoneuvon ja pitämään ostajan.",
          "cards": [
            {
              "title": "Jälleenmyyjien ja kanavan suorituskyky",
              "body": "Tyytyväisyys, standardit ja koulutusten käyttöönotto verkostossa sekä se, missä kauppa häviää tiskillä.",
              "methods": "CATI · jälleenmyyjä- ja jakelijahaastattelut"
            },
            {
              "title": "Verkosta myymälään",
              "body": "Polku ensimmäisestä hausta koeajoon ja se, missä harkinta katoaa ennen käyntiä.",
              "methods": "Verkkokysely · äskettäin ostaneet ja harkitsevat"
            },
            {
              "title": "Kaksipyöräverkostot",
              "body": "Kattavuus, osien saatavuus ja palvelustandardit skootteri- ja moottoripyöräkanavissa, kerättynä puhelimitse koko verkostosta.",
              "methods": "CATI ja kenttäkäynnit · jälleenmyyjät, huoltopisteet"
            }
          ]
        },
        {
          "n": "04",
          "name": "Sähköistyminen",
          "frame": "Autot ja kaksipyöräiset kohtaavat erilaisia esteitä ja niitä tutkitaan erikseen.",
          "cards": [
            {
              "title": "Autot: käyttöönotto ja lataus",
              "body": "Yksityisostajat punnitsevat toimintamatkaa, latausmahdollisuutta ja hintaa; yritysasiakkaat kokonaiskustannuksia. Tulokset raportoidaan markkinoittain.",
              "methods": "Verkko ja CATI · omistajat, harkitsevat, kalustopäälliköt"
            },
            {
              "title": "Kaksipyöräiset: sähköistyminen ja verkosto",
              "body": "Tarkastelemme ostohinnan ja käyttökustannusten välistä vaihtokauppaa, valintaa kotilatauksen ja akunvaihdon välillä sekä myytyjen tuotteiden huoltokattavuutta.",
              "methods": "Verkko ja CATI · kuljettajat, jälleenmyyjät, kalustonhaltijat"
            }
          ]
        }
      ],
      "methodsKicker": "Menetelmät",
      "methodsLead": "Mikä kukin menetelmä on ja milloin käytämme sitä.",
      "methods": [
        [
          "CATI",
          "Käsikirjoitetut puhelinhaastattelut, kiintiöt kaupungin, jälleenmyyjätyypin tai ostajasegmentin mukaan. Käytetään, kun lista on määritelty ja otos suuri."
        ],
        [
          "Syvähaastattelut",
          "45–60 minuutin syvähaastattelut, jotka tutkimustiimi tekee kahdestaan, jotta ymmärretään, miten päätös syntyy ja mihin se perustuu."
        ],
        [
          "Konsepti- ja A/B-testaus",
          "Kaksi tai useampia toteutuksia testataan vertailukelpoisilla otoksilla, yhtä muuttujaa kerrallaan, ennen työkaluja tai mediasatsausta."
        ],
        [
          "Jälleenmyyjäverkoston kartoitus",
          "Puhelimitse tehty jälleenmyyjä- ja jakelijaverkoston kartoitus, joka kattaa kattavuuden, osien saatavuuden ja koulutusten käyttöönoton."
        ],
        [
          "B2B-paneelit",
          "Ennakkoon rekrytoitu otos: asiakasorganisaatioiden päätöksentekijät, seulottu yrityksen koon, toimialan ja roolin mukaan."
        ]
      ],
      "ctaTitle": "Kerro meille, mitä päätöstä tämän tutkimuksen on tuettava.",
      "ctaBody": "Saat tulokset, niiden taustalla olevan näytön ja suositellun seuraavan askeleen.",
      "ctaPrimary": "Keskustele tutkimustiimin kanssa",
      "ctaSecondary": "Liity mukaan"
    },
    "it": {
      "kicker": "Settori",
      "title": "Automotive",
      "lead": "Ricerche per produttori di auto e due ruote, importatori e gruppi di concessionari: studi su concept, prezzo, lancio e canale.",
      "introKicker": "Come lavoriamo",
      "intro": [
        "Un programma veicolo impegna investimenti anni prima che la reazione del mercato sia nota. Il nostro lavoro è ridurre questa incertezza con prove presentabili a un consiglio di amministrazione.",
        "Categoria, motorizzazione e canale si sono frammentati contemporaneamente. Ci sono più modelli e più livelli di prezzo, e l'acquisto spesso inizia online e si conclude presso un concessionario che non ha il modello in stock. Un singolo tracker non copre più la categoria.",
        "Ogni studio è costruito attorno alla decisione che deve sostenere: quali dotazioni giustificano il loro costo, quale fascia di prezzo è sostenibile, se la rete può mantenere ciò che il lancio promette e a quali condizioni un acquirente sceglierebbe l'elettrico. Disegno, campione e report discendono da quella domanda.",
        "I deliverable sono fatti per essere usati: tabelle incrociate con pesi dichiarati, verbatim che spiegano i numeri e una chiara separazione tra ciò che i dati sostengono e ciò che no."
      ],
      "stagesKicker": "Cosa studiamo",
      "stages": [
        {
          "n": "01",
          "name": "Concept e configurazione",
          "frame": "Cosa deve essere il prodotto e quanto vale ogni dotazione.",
          "cards": [
            {
              "title": "Validazione delle dotazioni",
              "body": "Layout degli interni, HMI e sistemi di assistenza alla guida vengono testati con proprietari e potenziali acquirenti prima dell'attrezzaggio, entro un contesto di prezzo definito.",
              "methods": "Test di concept e A/B · proprietari e potenziali acquirenti"
            },
            {
              "title": "Prezzo e configurazione",
              "body": "Sensibilità al prezzo e modelli di trade-off stabiliscono quanto vale ogni dotazione e quale configurazione sostiene il prezzo previsto.",
              "methods": "Modelli di disponibilità a pagare e conjoint · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lancio e comunicazione",
          "frame": "Se il messaggio è compreso prima di impegnare il budget media.",
          "cards": [
            {
              "title": "Test del messaggio pre-lancio",
              "body": "Quale proposta è compresa, creduta e ricordata dagli acquirenti da cui dipende il lancio, testata prima di produrre la campagna.",
              "methods": "Indagine online e CATI · acquirenti target"
            },
            {
              "title": "Pre-test di campagna e materiali",
              "body": "Creatività, promozioni dei concessionari e asset digitali testati su ricordo e intenzione d'acquisto prima dell'acquisto media.",
              "methods": "Test di concept e A/B · asset media"
            }
          ]
        },
        {
          "n": "03",
          "name": "Sul mercato e nel canale",
          "frame": "Se la rete può completare la vendita, consegnare il veicolo e trattenere l'acquirente.",
          "cards": [
            {
              "title": "Performance di concessionari e canale",
              "body": "Soddisfazione, standard e adozione della formazione nella rete, e dove si perde una vendita al banco.",
              "methods": "CATI · interviste a concessionari e distributori"
            },
            {
              "title": "Dall'online al concessionario",
              "body": "Il percorso dalla prima ricerca al test drive e dove la considerazione si perde prima della visita.",
              "methods": "Indagine online · acquirenti recenti e potenziali"
            },
            {
              "title": "Reti due ruote",
              "body": "Copertura, disponibilità ricambi e standard di servizio nei canali scooter e moto, raccolti per telefono su tutta la rete.",
              "methods": "CATI e visite sul campo · concessionari, punti service"
            }
          ]
        },
        {
          "n": "04",
          "name": "Elettrificazione",
          "frame": "Auto e due ruote affrontano barriere diverse e vengono studiati separatamente.",
          "cards": [
            {
              "title": "Auto: adozione e ricarica",
              "body": "Gli acquirenti privati valutano autonomia, accesso alla ricarica e prezzo; le flotte valutano il costo totale di proprietà. I risultati sono riportati per mercato.",
              "methods": "Online e CATI · proprietari, potenziali acquirenti, fleet manager"
            },
            {
              "title": "Due ruote: elettrificazione e rete",
              "body": "Esaminiamo il trade-off tra prezzo d'acquisto e costo di esercizio, la scelta tra ricarica domestica e cambio batteria, e la copertura di servizio dei prodotti venduti.",
              "methods": "Online e CATI · motociclisti, concessionari, gestori di flotte"
            }
          ]
        }
      ],
      "methodsKicker": "Metodi",
      "methodsLead": "Che cos'è ogni metodo e quando lo usiamo.",
      "methods": [
        [
          "CATI",
          "Interviste telefoniche scriptate, con quote per città, tipo di concessionario o segmento di acquirenti. Usate quando la lista è definita e il campione è ampio."
        ],
        [
          "Interviste in profondità",
          "Interviste in profondità di 45-60 minuti, condotte uno a uno dal team di ricerca, per capire come nasce una decisione e su cosa si basa."
        ],
        [
          "Test di concept e A/B",
          "Due o più esecuzioni testate su campioni comparabili, con una variabile cambiata alla volta, prima dell'attrezzaggio o dell'acquisto media."
        ],
        [
          "Censimento della rete",
          "Un censimento telefonico della rete di concessionari e distributori, che copre copertura, disponibilità ricambi e adozione della formazione."
        ],
        [
          "Panel B2B",
          "Un campione reclutato in anticipo: decisori all'interno delle organizzazioni clienti, selezionati per dimensione, settore e ruolo."
        ]
      ],
      "ctaTitle": "Dicci quale decisione deve sostenere questa ricerca.",
      "ctaBody": "Ricevi i risultati, le prove che li sostengono e il prossimo passo consigliato.",
      "ctaPrimary": "Parla con il team di ricerca",
      "ctaSecondary": "Unisciti"
    },
    "ja": {
      "kicker": "業界",
      "title": "自動車",
      "lead": "自動車・二輪車のメーカー、輸入販売会社、ディーラーグループ向けの調査：コンセプト、価格、発売、チャネルの各調査。",
      "introKicker": "進め方",
      "intro": [
        "車両プログラムは、市場の反応がわかる何年も前に投資を確定します。私たちの仕事は、取締役会に提示できる証拠によってその不確実性を下げることです。",
        "カテゴリー、パワートレイン、チャネルが同時に細分化しました。モデルも価格帯も増え、購入はオンラインで始まり、在庫のないディーラーで終わることが少なくありません。単一のトラッカーではカテゴリーを覆えません。",
        "各調査は、それが支えるべき意思決定を中心に設計します。どの装備がコストに見合うのか、どの価格帯が持続可能か、ネットワークが発売の約束を果たせるか、どの条件なら購入者が電動車を選ぶのか。設計・サンプル・報告はこの問いから決まります。",
        "成果物は使われるために作ります。ウェイトを明記したクロス集計、数字を説明するバーバティム、データが支えることと支えないことを明確に分けた記述。"
      ],
      "stagesKicker": "調査する内容",
      "stages": [
        {
          "n": "01",
          "name": "コンセプトと構成",
          "frame": "製品はどうあるべきか、各装備にいくらの価値があるか。",
          "cards": [
            {
              "title": "装備の検証",
              "body": "内装レイアウト、HMI、運転支援機能を、金型投資の前に、価格の前提を定めたうえで所有者と検討者にテストします。",
              "methods": "コンセプト／A/Bテスト · 所有者と検討者"
            },
            {
              "title": "価格と構成",
              "body": "価格感度とトレードオフモデルで、各装備の価値と、想定価格を支える構成を明らかにします。",
              "methods": "支払意思額・コンジョイントモデル · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "発売とコミュニケーション",
          "frame": "媒体費を確定する前に、メッセージが理解されるか。",
          "cards": [
            {
              "title": "発売前のメッセージテスト",
              "body": "発売が依存する購入者に、どの提案が理解され、信じられ、記憶されるかを、キャンペーン制作前にテストします。",
              "methods": "オンライン調査とCATI · 対象購入者"
            },
            {
              "title": "キャンペーンと素材の事前テスト",
              "body": "クリエイティブ、販促、デジタル素材を、媒体費確定前に想起と購買意向でテストします。",
              "methods": "コンセプト／A/Bテスト · 広告素材"
            }
          ]
        },
        {
          "n": "03",
          "name": "市場とチャネル",
          "frame": "ネットワークが販売を完了し、車両を納入し、購入者をつなぎとめられるか。",
          "cards": [
            {
              "title": "ディーラーとチャネルの実績",
              "body": "ネットワーク全体の満足度、基準、研修の定着、そして店頭で失われる販売はどこか。",
              "methods": "CATI · ディーラーと販社へのインタビュー"
            },
            {
              "title": "オンラインから店頭まで",
              "body": "最初の検索から試乗までの経路、来店前に検討が失われる地点。",
              "methods": "オンライン調査 · 最近の購入者と検討者"
            },
            {
              "title": "二輪車ネットワーク",
              "body": "スクーター・バイクチャネルのカバレッジ、部品供給、サービス基準を、ネットワーク全体に電話で確認します。",
              "methods": "CATIと訪問 · ディーラー、サービス拠点"
            }
          ]
        },
        {
          "n": "04",
          "name": "電動化",
          "frame": "四輪と二輪では障壁が異なるため、別々に調査します。",
          "cards": [
            {
              "title": "四輪：普及と充電",
              "body": "個人購入者は航続距離、充電環境、価格を、法人は総保有コストを比べます。結果は市場別に報告します。",
              "methods": "オンラインとCATI · 所有者、検討者、車両管理者"
            },
            {
              "title": "二輪：電動化とネットワーク",
              "body": "購入価格と維持費のトレードオフ、自宅充電とバッテリー交換の選択、販売製品のサービス網を調べます。",
              "methods": "オンラインとCATI · 利用者、ディーラー、車両事業者"
            }
          ]
        }
      ],
      "methodsKicker": "手法",
      "methodsLead": "各手法の内容と、使う場面。",
      "methods": [
        [
          "CATI",
          "スクリプトに沿った電話調査。都市、ディーラー種別、購入者セグメントで割り付けます。リストが確定し、サンプルが大きい場合に使います。"
        ],
        [
          "デプスインタビュー",
          "45〜60分のデプスインタビュー。調査チームが1対1で行い、意思決定がどうなされ、何に支えられているかを理解します。"
        ],
        [
          "コンセプト／A/Bテスト",
          "2つ以上の案を同等のサンプルで、一度に1変数だけ変えて、金型投資や媒体費の前にテストします。"
        ],
        [
          "ディーラー網の全数調査",
          "ディーラー・販社ネットワークへの電話全数調査。カバレッジ、部品供給、研修の定着を確認します。"
        ],
        [
          "B2Bパネル",
          "事前に募集したサンプル。クライアント組織内の意思決定者を、企業規模、業種、役割でスクリーニングします。"
        ]
      ],
      "ctaTitle": "この調査が支えるべき意思決定をお聞かせください。",
      "ctaBody": "結果、その根拠、推奨する次の一手をお渡しします。",
      "ctaPrimary": "調査チームに相談する",
      "ctaSecondary": "参加する"
    },
    "ko": {
      "kicker": "산업",
      "title": "자동차",
      "lead": "완성차·이륜차 제조사, 수입사, 딜러 그룹을 위한 조사: 콘셉트, 가격, 출시, 채널 연구.",
      "introKicker": "일하는 방식",
      "intro": [
        "차량 프로그램은 시장 반응이 알려지기 몇 년 전에 투자를 확정합니다. 우리의 일은 이사회에 제시할 수 있는 근거로 그 불확실성을 줄이는 것입니다.",
        "카테고리, 파워트레인, 채널이 동시에 분화했습니다. 모델과 가격대가 늘었고, 구매는 온라인에서 시작해 재고가 없는 딜러에서 끝나는 경우가 많습니다. 단일 트래커로는 카테고리를 더 이상 덮지 못합니다.",
        "각 조사는 그것이 뒷받침해야 할 결정을 중심으로 설계합니다. 어떤 사양이 비용을 정당화하는지, 어느 가격대가 지속 가능한지, 네트워크가 출시의 약속을 이행할 수 있는지, 어떤 조건에서 구매자가 전동차를 선택하는지. 설계, 표본, 보고는 이 질문에서 나옵니다.",
        "결과물은 쓰이도록 만듭니다. 가중치를 명시한 교차표, 숫자를 설명하는 베버팀, 데이터가 뒷받침하는 것과 그렇지 않은 것을 분명히 나눈 서술."
      ],
      "stagesKicker": "무엇을 조사하는가",
      "stages": [
        {
          "n": "01",
          "name": "콘셉트와 구성",
          "frame": "제품이 무엇이어야 하며 각 사양이 얼마의 가치가 있는가.",
          "cards": [
            {
              "title": "사양 검증",
              "body": "실내 레이아웃, HMI, 운전자 지원 기능을 금형 투자 전에, 가격 맥락을 정한 상태에서 소유자와 검토자에게 테스트합니다.",
              "methods": "콘셉트·A/B 테스트 · 소유자와 검토자"
            },
            {
              "title": "가격과 구성",
              "body": "가격 민감도와 트레이드오프 모델로 각 사양의 가치와 목표 가격을 뒷받침하는 구성을 밝힙니다.",
              "methods": "지불의향·컨조인트 모델 · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "출시와 커뮤니케이션",
          "frame": "미디어 예산을 집행하기 전에 메시지가 이해되는가.",
          "cards": [
            {
              "title": "출시 전 메시지 테스트",
              "body": "출시가 의존하는 구매자에게 어떤 제안이 이해되고 믿어지고 기억되는지를 캠페인 제작 전에 테스트합니다.",
              "methods": "온라인 조사와 CATI · 목표 구매자"
            },
            {
              "title": "캠페인·소재 사전 테스트",
              "body": "크리에이티브, 딜러 프로모션, 디지털 소재를 미디어 집행 전에 회상과 구매의향으로 테스트합니다.",
              "methods": "콘셉트·A/B 테스트 · 미디어 소재"
            }
          ]
        },
        {
          "n": "03",
          "name": "시장과 채널",
          "frame": "네트워크가 판매를 완료하고 차량을 인도하며 구매자를 유지할 수 있는가.",
          "cards": [
            {
              "title": "딜러·채널 성과",
              "body": "네트워크 전반의 만족도, 기준, 교육 정착, 그리고 매장에서 판매가 사라지는 지점.",
              "methods": "CATI · 딜러·유통사 인터뷰"
            },
            {
              "title": "온라인에서 전시장까지",
              "body": "첫 검색에서 시승까지의 경로, 방문 전에 고려가 끊기는 지점.",
              "methods": "온라인 조사 · 최근 구매자와 검토자"
            },
            {
              "title": "이륜차 네트워크",
              "body": "스쿠터·모터사이클 채널의 커버리지, 부품 공급, 서비스 기준을 네트워크 전체에 전화로 확인합니다.",
              "methods": "CATI와 현장 방문 · 딜러, 서비스 거점"
            }
          ]
        },
        {
          "n": "04",
          "name": "전동화",
          "frame": "사륜과 이륜은 장벽이 달라 별도로 조사합니다.",
          "cards": [
            {
              "title": "사륜: 도입과 충전",
              "body": "개인 구매자는 주행거리, 충전 접근성, 가격을 따지고 법인은 총소유비용을 따집니다. 결과는 시장별로 보고합니다.",
              "methods": "온라인과 CATI · 소유자, 검토자, 차량 관리자"
            },
            {
              "title": "이륜: 전동화와 네트워크",
              "body": "구매 가격과 운용비의 트레이드오프, 가정 충전과 배터리 교환의 선택, 판매 제품의 서비스 범위를 살핍니다.",
              "methods": "온라인과 CATI · 이용자, 딜러, 차량 운영자"
            }
          ]
        }
      ],
      "methodsKicker": "방법",
      "methodsLead": "각 방법이 무엇이고 언제 쓰는가.",
      "methods": [
        [
          "CATI",
          "스크립트 기반 전화 조사. 도시, 딜러 유형, 구매자 세그먼트로 할당합니다. 명단이 정해져 있고 표본이 클 때 사용합니다."
        ],
        [
          "심층 인터뷰",
          "45~60분 심층 인터뷰. 조사팀이 1대1로 진행하며, 결정이 어떻게 이뤄지고 무엇에 근거하는지 이해합니다."
        ],
        [
          "콘셉트·A/B 테스트",
          "두 개 이상의 안을 동등한 표본에서 한 번에 한 변수만 바꿔 금형 투자나 미디어 집행 전에 테스트합니다."
        ],
        [
          "딜러망 전수 조사",
          "딜러·유통 네트워크에 대한 전화 전수 조사. 커버리지, 부품 공급, 교육 정착을 확인합니다."
        ],
        [
          "B2B 패널",
          "사전 모집 표본. 고객 조직 내 의사결정자를 기업 규모, 업종, 직무로 선별합니다."
        ]
      ],
      "ctaTitle": "이 조사가 뒷받침해야 할 결정을 알려주세요.",
      "ctaBody": "결과, 그 근거, 권장하는 다음 단계를 받습니다.",
      "ctaPrimary": "조사팀과 상담하기",
      "ctaSecondary": "참여하기"
    },
    "no": {
      "kicker": "Bransjer",
      "title": "Biler og kjøretøy",
      "lead": "Forskning for bil- og tohjulsprodusenter, importører og forhandlergrupper: konsept-, pris-, lanserings- og kanalstudier.",
      "introKicker": "Slik arbeider vi",
      "intro": [
        "Et kjøretøyprogram binder investeringer år før markedsreaksjonen er kjent. Vårt arbeid er å redusere den usikkerheten med belegg som kan legges fram for et styre.",
        "Kategori, drivlinje og kanal er fragmentert samtidig. Det er flere modeller og flere prispunkter, og kjøpet starter ofte på nett og avsluttes hos en forhandler som ikke har modellen på lager. Én tracker dekker ikke lenger kategorien.",
        "Hver studie designes rundt beslutningen den skal støtte: hvilket utstyr som forsvarer kostnaden, hvilket prisintervall som er bærekraftig, om nettverket kan levere det lanseringen lover, og under hvilke betingelser en kjøper velger el. Design, utvalg og rapportering følger dette spørsmålet.",
        "Leveransene er laget for bruk: kryss tabeller med oppgitte vekter, verbatimer som forklarer tallene, og et klart skille mellom det dataene støtter og det de ikke støtter."
      ],
      "stagesKicker": "Hva vi undersøker",
      "stages": [
        {
          "n": "01",
          "name": "Konsept og konfigurasjon",
          "frame": "Hva produktet skal være, og hva hver funksjon er verdt.",
          "cards": [
            {
              "title": "Validering av utstyr",
              "body": "Interiørlayout, HMI og førerassistansesystemer testes med eiere og vurderende før verktøybygging, innenfor en definert prisramme.",
              "methods": "Konsept- og A/B-testing · eiere og vurderende"
            },
            {
              "title": "Pris og konfigurasjon",
              "body": "Prisfølsomhet og trade-off-modeller fastslår hva hvert utstyr er verdt, og hvilken konfigurasjon som støtter den tiltenkte prisen.",
              "methods": "Betalingsvillighets- og conjointmodeller · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lansering og kommunikasjon",
          "frame": "Om budskapet forstås før mediebudsjettet bindes.",
          "cards": [
            {
              "title": "Budskapstest før lansering",
              "body": "Hvilket tilbud som forstås, tror på og huskes av kjøperne lanseringen avhenger av — testet før kampanjen produseres.",
              "methods": "Nettundersøkelse og CATI · målkjøpere"
            },
            {
              "title": "Forhåndstest av kampanje og materiale",
              "body": "Kreativt materiale, forhandlerkampanjer og digitale ressurser testes for gjenkalling og kjøpsintensjon før medier bookes.",
              "methods": "Konsept- og A/B-testing · mediemateriell"
            }
          ]
        },
        {
          "n": "03",
          "name": "I markedet og i kanalen",
          "frame": "Om nettverket kan fullføre salget, levere kjøretøyet og beholde kjøperen.",
          "cards": [
            {
              "title": "Forhandler- og kanalytelse",
              "body": "Tilfredshet, standarder og opptak av opplæring i nettverket, og hvor et salg går tapt i disken.",
              "methods": "CATI · intervjuer med forhandlere og distributører"
            },
            {
              "title": "Fra nett til forhandler",
              "body": "Veien fra første søk til prøvekjøring, og hvor vurderingen går tapt før besøket.",
              "methods": "Nettundersøkelse · nylige kjøpere og vurderende"
            },
            {
              "title": "Tohjulsnettverk",
              "body": "Dekning, deletilgjengelighet og servicestandarder i scooter- og motorsykkelkanaler, samlet per telefon i hele nettverket.",
              "methods": "CATI og feltbesøk · forhandlere, servicepunkter"
            }
          ]
        },
        {
          "n": "04",
          "name": "Elektrifisering",
          "frame": "Biler og tohjulere møter ulike barrierer og undersøkes hver for seg.",
          "cards": [
            {
              "title": "Biler: utbredelse og lading",
              "body": "Private kjøpere veier rekkevidde, ladetilgang og pris; flåter veier totalkostnad. Resultatene rapporteres per marked.",
              "methods": "Nett og CATI · eiere, vurderende, flåteledere"
            },
            {
              "title": "Tohjulere: elektrifisering og nettverk",
              "body": "Vi undersøker avveiningen mellom kjøpspris og driftskostnad, valget mellom hjemmelading og batteribytte, og servicedekningen for produktene som selges.",
              "methods": "Nett og CATI · førere, forhandlere, flåteoperatører"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hva hver metode er, og når vi bruker den.",
      "methods": [
        [
          "CATI",
          "Skriptede telefonintervjuer med kvoter etter by, forhandlertype eller kjøpersegment. Brukes der listen er definert og utvalget er stort."
        ],
        [
          "Dybdeintervjuer",
          "Dybdeintervjuer på 45–60 minutter, gjennomført en til en av forskerteamet, for å forstå hvordan en beslutning tas og hva den hviler på."
        ],
        [
          "Konsept- og A/B-testing",
          "To eller flere utførelser testes på sammenlignbare utvalg, med én variabel endret om gangen, før verktøy eller mediekjøp."
        ],
        [
          "Fulltelling av forhandlernettverket",
          "En telefonisk fulltelling av forhandler- og distributørnettverket, som dekker dekning, deletilgjengelighet og opptak av opplæring."
        ],
        [
          "B2B-paneler",
          "Et utvalg rekruttert på forhånd: beslutningstakere i kundeorganisasjoner, screenet etter selskapsstørrelse, sektor og rolle."
        ]
      ],
      "ctaTitle": "Fortell oss hvilken beslutning denne forskningen skal støtte.",
      "ctaBody": "Du får funnene, belegget bak dem og anbefalt neste steg.",
      "ctaPrimary": "Snakk med forskerteamet",
      "ctaSecondary": "Bli med"
    },
    "pt": {
      "kicker": "Setores",
      "title": "Automóvel",
      "lead": "Investigação para fabricantes de automóveis e de duas rodas, importadores e grupos de concessionários: estudos de conceito, preço, lançamento e canal.",
      "introKicker": "Como trabalhamos",
      "intro": [
        "Um programa de veículos compromete investimento anos antes de a reação do mercado ser conhecida. O nosso trabalho é reduzir essa incerteza com provas que possam ser apresentadas a um conselho.",
        "Categoria, motorização e canal fragmentaram-se ao mesmo tempo. Há mais modelos e mais níveis de preço, e a compra começa muitas vezes online e termina num concessionário que não tem o modelo em stock. Um único tracker já não cobre a categoria.",
        "Cada estudo é desenhado em torno da decisão que tem de sustentar: que equipamento justifica o seu custo, que faixa de preço é sustentável, se a rede consegue cumprir o que o lançamento promete e em que condições um comprador escolheria elétrico. Desenho, amostra e relatório decorrem dessa pergunta.",
        "Os entregáveis são feitos para serem usados: tabelas cruzadas com ponderações declaradas, verbatims que explicam os números e uma separação clara entre o que os dados sustentam e o que não sustentam."
      ],
      "stagesKicker": "O que estudamos",
      "stages": [
        {
          "n": "01",
          "name": "Conceito e configuração",
          "frame": "O que o produto deve ser e quanto vale cada equipamento.",
          "cards": [
            {
              "title": "Validação de equipamento",
              "body": "Layout interior, HMI e sistemas de assistência à condução são testados com proprietários e potenciais compradores antes do ferramental, num contexto de preço definido.",
              "methods": "Testes de conceito e A/B · proprietários e potenciais compradores"
            },
            {
              "title": "Preço e configuração",
              "body": "A sensibilidade ao preço e os modelos de trade-off estabelecem quanto vale cada equipamento e que configuração sustenta o preço pretendido.",
              "methods": "Modelos de disponibilidade a pagar e conjoint · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lançamento e comunicação",
          "frame": "Se a mensagem é compreendida antes de o investimento em media ser assumido.",
          "cards": [
            {
              "title": "Teste de mensagem antes do lançamento",
              "body": "Que proposta é compreendida, acreditada e recordada pelos compradores de quem o lançamento depende, testada antes de a campanha ser produzida.",
              "methods": "Inquérito online e CATI · compradores-alvo"
            },
            {
              "title": "Pré-teste de campanha e materiais",
              "body": "Criatividade, promoções de concessionários e materiais digitais testados em recordação e intenção de compra antes do investimento em media.",
              "methods": "Testes de conceito e A/B · materiais de media"
            }
          ]
        },
        {
          "n": "03",
          "name": "No mercado e no canal",
          "frame": "Se a rede consegue concluir a venda, entregar o veículo e reter o comprador.",
          "cards": [
            {
              "title": "Desempenho de concessionários e canal",
              "body": "Satisfação, padrões e adesão à formação na rede, e onde se perde uma venda no balcão.",
              "methods": "CATI · entrevistas a concessionários e distribuidores"
            },
            {
              "title": "Do online ao concessionário",
              "body": "O percurso da primeira pesquisa ao test drive, e onde a consideração se perde antes da visita.",
              "methods": "Inquérito online · compradores recentes e potenciais"
            },
            {
              "title": "Redes de duas rodas",
              "body": "Cobertura, disponibilidade de peças e padrões de serviço nos canais de scooter e moto, recolhidos por telefone em toda a rede.",
              "methods": "CATI e visitas de campo · concessionários, pontos de serviço"
            }
          ]
        },
        {
          "n": "04",
          "name": "Eletrificação",
          "frame": "Automóveis e duas rodas enfrentam barreiras diferentes e são estudados separadamente.",
          "cards": [
            {
              "title": "Automóveis: adoção e carregamento",
              "body": "Os compradores particulares pesam autonomia, acesso ao carregamento e preço; as frotas pesam o custo total de propriedade. Os resultados são reportados por mercado.",
              "methods": "Online e CATI · proprietários, potenciais compradores, gestores de frota"
            },
            {
              "title": "Duas rodas: eletrificação e rede",
              "body": "Examinamos o trade-off entre preço de compra e custo de utilização, a escolha entre carregamento doméstico e troca de bateria, e a cobertura de serviço dos produtos vendidos.",
              "methods": "Online e CATI · utilizadores, concessionários, operadores de frota"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "O que é cada método e quando o usamos.",
      "methods": [
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, com quotas por cidade, tipo de concessionário ou segmento de comprador. Usadas quando a lista está definida e a amostra é grande."
        ],
        [
          "Entrevistas em profundidade",
          "Entrevistas em profundidade de 45 a 60 minutos, conduzidas um a um pela equipa, para compreender como se toma uma decisão e em que assenta."
        ],
        [
          "Testes de conceito e A/B",
          "Duas ou mais execuções testadas em amostras comparáveis, com uma variável alterada de cada vez, antes do ferramental ou do investimento em media."
        ],
        [
          "Censo da rede de concessionários",
          "Um censo telefónico da rede de concessionários e distribuidores, que cobre cobertura, disponibilidade de peças e adesão à formação."
        ],
        [
          "Painéis B2B",
          "Uma amostra recrutada antecipadamente: decisores dentro de organizações cliente, filtrados por dimensão, setor e função."
        ]
      ],
      "ctaTitle": "Diga-nos que decisão esta investigação tem de sustentar.",
      "ctaBody": "Recebe os resultados, as provas que os sustentam e o próximo passo recomendado.",
      "ctaPrimary": "Falar com a equipa",
      "ctaSecondary": "Junte-se a nós"
    },
    "ru": {
      "kicker": "Отрасли",
      "title": "Автомобили",
      "lead": "Исследования для производителей автомобилей и двухколёсной техники, импортёров и дилерских групп: концепция, цена, запуск и каналы.",
      "introKicker": "Как мы работаем",
      "intro": [
        "Программа выпуска модели связывает инвестиции за годы до того, как станет известна реакция рынка. Наша задача — снизить эту неопределённость доказательствами, которые можно представить совету директоров.",
        "Категория, силовая установка и канал фрагментировались одновременно. Моделей и ценовых точек стало больше, покупка часто начинается онлайн и заканчивается у дилера, у которого нет модели в наличии. Один трекер больше не покрывает категорию.",
        "Каждое исследование строится вокруг решения, которое оно должно поддержать: какие опции оправдывают свою цену, какой диапазон цен устойчив, сможет ли сеть выполнить обещания запуска и при каких условиях покупатель выберет электромобиль. Дизайн, выборка и отчёт следуют из этого вопроса.",
        "Результаты сделаны для использования: кросс-таблицы с указанными весами, вербатимы, объясняющие цифры, и чёткое разделение того, что данные подтверждают, а что нет."
      ],
      "stagesKicker": "Что мы изучаем",
      "stages": [
        {
          "n": "01",
          "name": "Концепция и комплектация",
          "frame": "Каким должен быть продукт и сколько стоит каждая опция.",
          "cards": [
            {
              "title": "Проверка опций",
              "body": "Компоновка салона, HMI и системы помощи водителю тестируются с владельцами и рассматривающими покупку до запуска оснастки, в заданном ценовом контексте.",
              "methods": "Тестирование концепций и A/B · владельцы и рассматривающие"
            },
            {
              "title": "Цена и комплектация",
              "body": "Ценовая чувствительность и модели trade-off показывают, сколько стоит каждая опция и какая комплектация поддерживает целевую цену.",
              "methods": "Модели готовности платить и конджойнт · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Запуск и коммуникация",
          "frame": "Понимают ли сообщение до того, как зафиксирован медиабюджет.",
          "cards": [
            {
              "title": "Тест сообщения до запуска",
              "body": "Какое предложение понимают, принимают и запоминают покупатели, от которых зависит запуск, — тест до производства кампании.",
              "methods": "Онлайн-опрос и CATI · целевые покупатели"
            },
            {
              "title": "Претест кампании и материалов",
              "body": "Креатив, дилерские акции и digital-материалы тестируются на узнаваемость и намерение купить до закупки медиа.",
              "methods": "Тестирование концепций и A/B · медиаматериалы"
            }
          ]
        },
        {
          "n": "03",
          "name": "На рынке и в канале",
          "frame": "Может ли сеть закрыть продажу, передать автомобиль и удержать покупателя.",
          "cards": [
            {
              "title": "Работа дилеров и канала",
              "body": "Удовлетворённость, стандарты и усвоение обучения в сети, и где продажа теряется у стойки.",
              "methods": "CATI · интервью с дилерами и дистрибьюторами"
            },
            {
              "title": "От онлайна до салона",
              "body": "Путь от первого поиска до тест-драйва и где теряется интерес до визита.",
              "methods": "Онлайн-опрос · недавние покупатели и рассматривающие"
            },
            {
              "title": "Сети двухколёсной техники",
              "body": "Покрытие, наличие запчастей и стандарты сервиса в каналах скутеров и мотоциклов, собранные по телефону по всей сети.",
              "methods": "CATI и выезды · дилеры, сервисные точки"
            }
          ]
        },
        {
          "n": "04",
          "name": "Электрификация",
          "frame": "У автомобилей и двухколёсной техники разные барьеры, поэтому их изучают отдельно.",
          "cards": [
            {
              "title": "Автомобили: распространение и зарядка",
              "body": "Частные покупатели взвешивают запас хода, доступ к зарядке и цену; корпоративные — совокупную стоимость владения. Результаты подаются по рынкам.",
              "methods": "Онлайн и CATI · владельцы, рассматривающие, руководители автопарков"
            },
            {
              "title": "Двухколёсная техника: электрификация и сеть",
              "body": "Мы изучаем компромисс между ценой покупки и стоимостью эксплуатации, выбор между домашней зарядкой и заменой батареи, а также сервисное покрытие проданной техники.",
              "methods": "Онлайн и CATI · водители, дилеры, операторы парков"
            }
          ]
        }
      ],
      "methodsKicker": "Методы",
      "methodsLead": "Что представляет собой каждый метод и когда мы его применяем.",
      "methods": [
        [
          "CATI",
          "Телефонные интервью по скрипту с квотами по городу, типу дилера или сегменту покупателей. Применяются там, где список определён, а выборка велика."
        ],
        [
          "Глубинные интервью",
          "Глубинные интервью по 45–60 минут, которые исследовательская команда проводит один на один, чтобы понять, как принимается решение и на чём оно держится."
        ],
        [
          "Тестирование концепций и A/B",
          "Два и более исполнения тестируются на сопоставимых выборках с изменением одной переменной за раз, до оснастки или закупки медиа."
        ],
        [
          "Перепись дилерской сети",
          "Телефонная перепись дилерской и дистрибьюторской сети: покрытие, наличие запчастей и усвоение обучения."
        ],
        [
          "B2B-панели",
          "Выборка, набранная заранее: руководители внутри клиентских организаций, отобранные по размеру компании, отрасли и роли."
        ]
      ],
      "ctaTitle": "Расскажите, какое решение должно поддержать это исследование.",
      "ctaBody": "Вы получаете результаты, доказательства за ними и рекомендуемый следующий шаг.",
      "ctaPrimary": "Поговорить с командой",
      "ctaSecondary": "Присоединиться"
    },
    "sv": {
      "kicker": "Branscher",
      "title": "Bilar",
      "lead": "Undersökningar för biltillverkare, tvåhjulstillverkare, importörer och återförsäljargrupper: koncept-, pris-, lanserings- och kanalstudier.",
      "introKicker": "Så arbetar vi",
      "intro": [
        "Ett fordonsprogram binder investeringar år innan marknadsreaktionen är känd. Vårt arbete är att minska den osäkerheten med underlag som kan läggas fram för en styrelse.",
        "Kategori, drivlina och kanal har fragmenterats samtidigt. Det finns fler modeller och fler prispunkter, och köpet börjar ofta online och avslutas hos en handlare som inte har modellen i lager. En enda tracker täcker inte längre kategorin.",
        "Varje studie byggs kring det beslut den ska stödja: vilken utrustning som motiverar sitt pris, vilket prisintervall som är hållbart, om nätverket kan leverera det lanseringen lovar och under vilka villkor en köpare väljer el. Design, urval och rapportering följer den frågan.",
        "Leveranserna är gjorda för att användas: korstabeller med angivna vikter, verbatims som förklarar siffrorna och en tydlig separation mellan vad data stöder och vad de inte gör."
      ],
      "stagesKicker": "Vad vi undersöker",
      "stages": [
        {
          "n": "01",
          "name": "Koncept och konfiguration",
          "frame": "Vad produkten ska vara och vad varje funktion är värd.",
          "cards": [
            {
              "title": "Validering av utrustning",
              "body": "Interiörlayout, HMI och förarstödsystem testas med ägare och övervägare före verktygsframställning, inom en definierad prisram.",
              "methods": "Koncept- och A/B-test · ägare och övervägare"
            },
            {
              "title": "Pris och konfiguration",
              "body": "Priskänslighet och trade-off-modeller fastställer vad varje utrustning är värd och vilken konfiguration som stöder det avsedda priset.",
              "methods": "Betalningsvilja- och conjointmodeller · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lansering och kommunikation",
          "frame": "Om budskapet förstås innan medieinvesteringen binds.",
          "cards": [
            {
              "title": "Budskapstest före lansering",
              "body": "Vilket erbjudande som förstås, tror på och kommer ihåg av köparna lanseringen är beroende av — testat innan kampanjen produceras.",
              "methods": "Onlineundersökning och CATI · målköpare"
            },
            {
              "title": "Förtest av kampanj och material",
              "body": "Kreativt material, återförsäljarkampanjer och digitala tillgångar testas för erinran och köpintention innan media köps.",
              "methods": "Koncept- och A/B-test · mediematerial"
            }
          ]
        },
        {
          "n": "03",
          "name": "På marknaden och i kanalen",
          "frame": "Om nätverket kan slutföra försäljningen, leverera fordonet och behålla köparen.",
          "cards": [
            {
              "title": "Återförsäljar- och kanalprestanda",
              "body": "Nöjdhet, standarder och utbildningsupptag i nätverket, och var en försäljning tappas vid disken.",
              "methods": "CATI · intervjuer med handlare och distributörer"
            },
            {
              "title": "Från online till hall",
              "body": "Vägen från första sökning till provkörning, och var övervägandet tappas före besöket.",
              "methods": "Onlineundersökning · senaste köpare och övervägare"
            },
            {
              "title": "Tvåhjulsnätverk",
              "body": "Täckning, reservdelstillgång och servicestandarder i scooter- och motorcykelkanaler, insamlade per telefon i hela nätverket.",
              "methods": "CATI och fältbesök · handlare, servicepunkter"
            }
          ]
        },
        {
          "n": "04",
          "name": "Elektrifiering",
          "frame": "Bilar och tvåhjulingar möter olika hinder och undersöks separat.",
          "cards": [
            {
              "title": "Bilar: spridning och laddning",
              "body": "Privatköpare väger räckvidd, laddtillgång och pris; flottor väger total ägandekostnad. Resultaten rapporteras per marknad.",
              "methods": "Online och CATI · ägare, övervägare, flottchefer"
            },
            {
              "title": "Tvåhjulingar: elektrifiering och nätverk",
              "body": "Vi undersöker avvägningen mellan inköpspris och driftkostnad, valet mellan hemmaladdning och batteribyte, samt service­täckningen för de sålda produkterna.",
              "methods": "Online och CATI · förare, handlare, flottoperatörer"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Vad varje metod är och när vi använder den.",
      "methods": [
        [
          "CATI",
          "Skriptade telefonintervjuer med kvoter efter stad, handlartyp eller köparsegment. Används där listan är definierad och urvalet är stort."
        ],
        [
          "Djupintervjuer",
          "Djupintervjuer på 45–60 minuter, genomförda en mot en av forskarteamet, för att förstå hur ett beslut fattas och vad det vilar på."
        ],
        [
          "Koncept- och A/B-test",
          "Två eller fler utföranden testas på jämförbara urval, med en variabel ändrad i taget, före verktyg eller medieköp."
        ],
        [
          "Fullräkning av återförsäljarnätet",
          "En telefonisk fullräkning av återförsäljar- och distributörsnätet, som täcker täckning, reservdelstillgång och utbildningsupptag."
        ],
        [
          "B2B-paneler",
          "Ett urval rekryterat i förväg: beslutsfattare inom kundorganisationer, screenade efter företagsstorlek, sektor och roll."
        ]
      ],
      "ctaTitle": "Berätta vilket beslut den här undersökningen ska stödja.",
      "ctaBody": "Du får resultaten, underlaget bakom dem och rekommenderat nästa steg.",
      "ctaPrimary": "Prata med forskarteamet",
      "ctaSecondary": "Var med"
    },
    "tr": {
      "kicker": "Sektörler",
      "title": "Otomotiv",
      "lead": "Otomobil ve iki tekerlekli araç üreticileri, ithalatçılar ve bayi grupları için araştırma: konsept, fiyat, lansman ve kanal çalışmaları.",
      "introKicker": "Nasıl çalışıyoruz",
      "intro": [
        "Bir araç programı, pazar tepkisi bilinmeden yıllar önce yatırımı bağlar. Bizim işimiz bu belirsizliği, bir yönetim kuruluna sunulabilecek kanıtlarla azaltmaktır.",
        "Kategori, aktarma organı ve kanal aynı anda parçalandı. Daha fazla model ve daha fazla fiyat noktası var; satın alma çoğu zaman çevrimiçi başlıyor ve modeli stokta olmayan bir bayide tamamlanıyor. Tek bir tracker artık kategoriyi kapsamıyor.",
        "Her çalışma, desteklemesi gereken kararın etrafında tasarlanır: hangi donanım maliyetini haklı çıkarıyor, hangi fiyat aralığı sürdürülebilir, ağ lansmanın vaadini yerine getirebilir mi ve bir alıcı hangi koşullarda elektrikli seçer. Tasarım, örneklem ve rapor bu sorudan türetilir.",
        "Çıktılar kullanılmak için yapılır: ağırlıkları belirtilmiş çapraz tablolar, sayıları açıklayan verbatimler ve verinin neyi desteklediği ile desteklemediğinin net ayrımı."
      ],
      "stagesKicker": "Neyi inceliyoruz",
      "stages": [
        {
          "n": "01",
          "name": "Konsept ve konfigürasyon",
          "frame": "Ürünün ne olması gerektiği ve her donanımın değerinin ne olduğu.",
          "cards": [
            {
              "title": "Donanım doğrulama",
              "body": "İç mekân yerleşimi, HMI ve sürüş destek sistemleri, kalıp yatırımından önce, tanımlı bir fiyat bağlamında sahipler ve değerlendirenlerle test edilir.",
              "methods": "Konsept ve A/B testi · sahipler ve değerlendirenler"
            },
            {
              "title": "Fiyat ve konfigürasyon",
              "body": "Fiyat duyarlılığı ve trade-off modelleri, her donanımın değerini ve hedeflenen fiyatı hangi konfigürasyonun desteklediğini ortaya koyar.",
              "methods": "Ödeme istekliliği ve conjoint modelleri · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Lansman ve iletişim",
          "frame": "Medya bütçesi bağlanmadan önce mesajın anlaşılıp anlaşılmadığı.",
          "cards": [
            {
              "title": "Lansman öncesi mesaj testi",
              "body": "Lansmanın bağlı olduğu alıcıların hangi öneriyi anladığı, inandığı ve hatırladığı — kampanya üretilmeden önce test edilir.",
              "methods": "Çevrimiçi anket ve CATI · hedef alıcılar"
            },
            {
              "title": "Kampanya ve materyal ön testi",
              "body": "Yaratıcı çalışmalar, bayi promosyonları ve dijital materyaller, medya satın alınmadan önce hatırlanma ve satın alma niyeti açısından test edilir.",
              "methods": "Konsept ve A/B testi · medya materyalleri"
            }
          ]
        },
        {
          "n": "03",
          "name": "Pazarda ve kanalda",
          "frame": "Ağın satışı tamamlayıp tamamlayamadığı, aracı teslim edip edemediği ve alıcıyı elde tutup tutamadığı.",
          "cards": [
            {
              "title": "Bayi ve kanal performansı",
              "body": "Ağ genelinde memnuniyet, standartlar ve eğitim benimsemesi; satışın tezgâhta nerede kaybedildiği.",
              "methods": "CATI · bayi ve distribütör görüşmeleri"
            },
            {
              "title": "Çevrimiçiden showroom'a",
              "body": "İlk aramadan test sürüşüne giden yol ve ziyaret öncesi değerlendirmenin nerede kaybolduğu.",
              "methods": "Çevrimiçi anket · son alıcılar ve değerlendirenler"
            },
            {
              "title": "İki tekerlekli ağları",
              "body": "Scooter ve motosiklet kanallarında kapsama, yedek parça bulunabilirliği ve servis standartları, ağ genelinde telefonla toplanır.",
              "methods": "CATI ve saha ziyaretleri · bayiler, servis noktaları"
            }
          ]
        },
        {
          "n": "04",
          "name": "Elektrikleşme",
          "frame": "Otomobiller ve iki tekerlekliler farklı engellerle karşılaşır ve ayrı ayrı incelenir.",
          "cards": [
            {
              "title": "Otomobiller: benimseme ve şarj",
              "body": "Bireysel alıcılar menzili, şarj erişimini ve fiyatı tartar; filolar toplam sahip olma maliyetini tartar. Sonuçlar pazar bazında raporlanır.",
              "methods": "Çevrimiçi ve CATI · sahipler, değerlendirenler, filo yöneticileri"
            },
            {
              "title": "İki tekerlekliler: elektrikleşme ve ağ",
              "body": "Satın alma fiyatı ile işletme maliyeti arasındaki dengeyi, evde şarj ile batarya değişimi arasındaki seçimi ve satılan ürünlerin servis kapsamını inceliyoruz.",
              "methods": "Çevrimiçi ve CATI · sürücüler, bayiler, filo operatörleri"
            }
          ]
        }
      ],
      "methodsKicker": "Yöntemler",
      "methodsLead": "Her yöntemin ne olduğu ve ne zaman kullandığımız.",
      "methods": [
        [
          "CATI",
          "Şehir, bayi türü veya alıcı segmentine göre kotası belirlenmiş, senaryolu telefon görüşmeleri. Listenin tanımlı ve örneklemin büyük olduğu yerlerde kullanılır."
        ],
        [
          "Derinlemesine görüşmeler",
          "Araştırma ekibinin bire bir yürüttüğü 45-60 dakikalık derinlemesine görüşmeler; bir kararın nasıl alındığını ve neye dayandığını anlamak için."
        ],
        [
          "Konsept ve A/B testi",
          "İki veya daha fazla uygulama, karşılaştırılabilir örneklemlerde, her seferinde tek değişken değiştirilerek, kalıp veya medya harcamasından önce test edilir."
        ],
        [
          "Bayi ağı sayımı",
          "Bayi ve distribütör ağının telefonla tam sayımı: kapsama, yedek parça bulunabilirliği ve eğitim benimsemesi."
        ],
        [
          "B2B panelleri",
          "Önceden toplanmış bir örneklem: müşteri kuruluşlarındaki karar vericiler, şirket büyüklüğü, sektör ve role göre elenir."
        ]
      ],
      "ctaTitle": "Bu araştırmanın hangi kararı desteklemesi gerektiğini bize anlatın.",
      "ctaBody": "Bulguları, arkalarındaki kanıtları ve önerilen sonraki adımı alırsınız.",
      "ctaPrimary": "Araştırma ekibiyle konuşun",
      "ctaSecondary": "Katılın"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Automotive",
      "lead": "Research for car and two-wheeler manufacturers, importers and dealer groups: concept, pricing, launch and channel studies.",
      "introKicker": "How we work",
      "intro": [
        "A vehicle programme commits investment years before market response is known. Our work is to reduce that uncertainty with evidence that can be presented to a board.",
        "Category, powertrain and channel have fragmented at the same time. There are more nameplates and more price points, and the purchase often begins online and completes at a dealer that does not hold the model in stock. A single tracker no longer covers the category.",
        "Each study is designed around the decision it has to support: which features justify their cost, what price range is sustainable, whether the network can deliver what the launch promises, and what conditions would make a buyer choose electric. Design, sample and reporting are set by that question.",
        "Deliverables are built to be used: cross-tabs with weights stated, verbatims that explain the numbers, and a clear separation between what the data supports and what it does not."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Concept and configuration",
          "frame": "What the product should be, and what each feature is worth.",
          "cards": [
            {
              "title": "Feature validation",
              "body": "Interior layout, HMI and driver-assistance features are tested with owners and considerers before tooling, within a defined price context.",
              "methods": "Concept and A/B testing · owners and considerers"
            },
            {
              "title": "Pricing and configuration",
              "body": "Price sensitivity and trade-off models establish what each feature is worth and which configuration supports the intended price.",
              "methods": "Willingness-to-pay and conjoint models · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Launch and communication",
          "frame": "Whether the message is understood before media spend is committed.",
          "cards": [
            {
              "title": "Pre-launch message testing",
              "body": "Which proposition is understood, believed and remembered by the buyers the launch depends on, tested before the campaign is produced.",
              "methods": "Online survey and CATI · target buyers"
            },
            {
              "title": "Campaign and asset pre-testing",
              "body": "Creative, dealer promotions and digital assets tested for recall and purchase intent before media is committed.",
              "methods": "Concept and A/B testing · media assets"
            }
          ]
        },
        {
          "n": "03",
          "name": "In market and channel",
          "frame": "Whether the network can complete the sale, deliver the vehicle and keep the buyer.",
          "cards": [
            {
              "title": "Dealer and channel performance",
              "body": "Satisfaction, standards and training take-up across the network, and where a sale is lost at the counter.",
              "methods": "CATI · dealer and distributor interviews"
            },
            {
              "title": "Online to forecourt",
              "body": "The path from first search to test drive, and where consideration is lost before the visit.",
              "methods": "Online survey · recent buyers and considerers"
            },
            {
              "title": "Two-wheeler networks",
              "body": "Coverage, parts availability and service standards in scooter and motorcycle channels, gathered by telephone across the network.",
              "methods": "CATI and field visits · dealers, service points"
            }
          ]
        },
        {
          "n": "04",
          "name": "Electrification",
          "frame": "Cars and two-wheelers face different barriers, and are studied separately.",
          "cards": [
            {
              "title": "Cars: adoption and charging",
              "body": "Private buyers weigh range, charging access and price; fleets weigh total cost of ownership. Results are reported by market.",
              "methods": "Online and CATI · owners, considerers, fleet managers"
            },
            {
              "title": "Two-wheelers: electrification and the network",
              "body": "We examine the trade-off between purchase price and running cost, the choice between home charging and battery swapping, and service coverage for the products sold.",
              "methods": "Online and CATI · riders, dealers, fleet operators"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by city, dealer type or buyer segment. Used where the list is defined and the sample is large."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes, run one to one by the research team, used to understand how a decision is made and what it rests on."
        ],
        [
          "Concept and A/B testing",
          "Two or more executions tested on comparable samples, with one variable changed at a time, before tooling or media spend."
        ],
        [
          "Dealer network census",
          "A telephone census of the dealer and distributor network, covering coverage, parts availability and training take-up."
        ],
        [
          "B2B panels",
          "A sample recruited in advance: decision-makers inside client organisations, screened by company size, sector and role."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    }
  },
  "travel": {
    "en-US": {
      "kicker": "Industries",
      "title": "Travel & transportation",
      "lead": "Research for destination organisations, hotel groups, transport operators and travel retail: who travels, how the trip is decided, and what brings them back.",
      "introKicker": "How we work",
      "intro": [
        "A trip is decided in stages, and each stage belongs to a different party: the destination, the carrier, the hotel, the agent.",
        "We study the traveller across those stages: what puts a destination on the shortlist, what decides the booking, what happens on arrival, and what is said afterwards.",
        "Each study is designed around the decision it has to support: which source market to open, which segment to target, and where the journey loses the traveller. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Destination and audience",
          "frame": "Who travels, why, and from where.",
          "cards": [
            {
              "title": "Source markets and segments",
              "body": "Segment travellers by origin market, purpose and spend, and size each group before a market is opened.",
              "methods": "Online survey · CATI"
            },
            {
              "title": "Destination perception",
              "body": "Establish what the destination is known for, and what keeps it off the shortlist.",
              "methods": "Online survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "02",
          "name": "Decision and booking",
          "frame": "How the shortlist becomes a booking.",
          "cards": [
            {
              "title": "Trip decisions",
              "body": "Follow the trip from destination shortlist to booking, and the points where a destination or operator drops out.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Price and season",
              "body": "Test price expectations and seasonality against the destinations that compete for the same trip.",
              "methods": "Price tests · online survey"
            }
          ]
        },
        {
          "n": "03",
          "name": "Arrival and stay",
          "frame": "What happens once the traveller arrives.",
          "cards": [
            {
              "title": "Transport and arrival",
              "body": "Study how travellers choose to get there, and what that choice does to the rest of the trip.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Experience and stay",
              "body": "Assess the stay, the service and the local experience against what the destination promised.",
              "methods": "In-depth interviews · online survey"
            }
          ]
        },
        {
          "n": "04",
          "name": "Advocacy and return",
          "frame": "Whether they come back, and whether they recommend it.",
          "cards": [
            {
              "title": "Recommendation and repeat",
              "body": "Measure advocacy and repeat visits, and establish why travellers do not return.",
              "methods": "Tracking · online survey"
            },
            {
              "title": "Traveller profile over time",
              "body": "Track how the traveller profile changes by market and by season.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Traveller survey",
          "Survey of past or intended travellers, with quotas by source market, purpose and spend."
        ],
        [
          "Destination interviews",
          "Depth interviews of 45 to 60 minutes with travellers and trade partners, run one to one by the research team."
        ],
        [
          "Online tracking",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by market, segment or trip type."
        ],
        [
          "Price tests",
          "Price expectations and seasonality tested against the destinations competing for the same trip."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "旅游与交通",
      "lead": "面向目的地机构、酒店集团、交通运营方与旅游零售：谁会来、一趟行程如何被决定、又是什么让人再来。",
      "introKicker": "我们如何做",
      "intro": [
        "一趟行程分几步决定，每一步属于不同的一方：目的地、承运方、酒店、代理。",
        "我们沿着这几步研究旅行者：什么让一个目的地进入备选、什么决定了预订、抵达之后发生什么、回去之后怎么说。",
        "每项研究都围绕它要支撑的决定来设计：开哪个客源市场、瞄准哪类客群、行程在哪一步失去旅行者。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "目的地与客群",
          "frame": "谁会来、为什么来、从哪里来。",
          "cards": [
            {
              "title": "客源市场与客群",
              "body": "按客源市场、出行目的与消费水平划分旅行者，并在开市场之前把每一群的规模算清。",
              "methods": "线上问卷 · 电话访问"
            },
            {
              "title": "目的地认知",
              "body": "确定目的地以什么被记住，又是什么让它进不了备选。",
              "methods": "线上问卷 · 深度访谈"
            }
          ]
        },
        {
          "n": "02",
          "name": "决策与预订",
          "frame": "从备选到下单，中间经过哪几步。",
          "cards": [
            {
              "title": "出行决策",
              "body": "跟着一趟行程走：从目的地备选到预订，以及目的地或运营商在哪一步掉出局。",
              "methods": "线上问卷 · 深度访谈"
            },
            {
              "title": "价格与季节",
              "body": "对照争夺同一趟行程的其他目的地，测试价格预期与季节波动。",
              "methods": "价格测试 · 线上问卷"
            }
          ]
        },
        {
          "n": "03",
          "name": "到达与停留",
          "frame": "抵达之后，实际发生什么。",
          "cards": [
            {
              "title": "交通与到达",
              "body": "研究旅行者如何选择到达方式，以及这个选择如何影响整趟行程。",
              "methods": "线上问卷 · 深度访谈"
            },
            {
              "title": "体验与住宿",
              "body": "对照目的地所做的承诺，评估住宿、服务与当地体验。",
              "methods": "深度访谈 · 线上问卷"
            }
          ]
        },
        {
          "n": "04",
          "name": "口碑与复访",
          "frame": "会不会再来，会不会推荐。",
          "cards": [
            {
              "title": "推荐与复访",
              "body": "测量推荐意愿与复访，并确定旅行者不再回来的原因。",
              "methods": "追踪 · 线上问卷"
            },
            {
              "title": "客群结构变化",
              "body": "追踪旅行者结构如何随市场与季节变化。",
              "methods": "追踪 · 电话访问"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "旅行者问卷",
          "面向曾到访或计划到访的旅行者的问卷，配额按客源市场、出行目的与消费水平设定。"
        ],
        [
          "目的地深度访谈",
          "与旅行者及同业伙伴进行 45–60 分钟的一对一访谈，由研究人员执行。"
        ],
        [
          "在线追踪",
          "按月或按季的追踪，指标固定，变化可对照同一套基数来读。"
        ],
        [
          "电话访问（CATI）",
          "按脚本执行电话访问，配额按市场、客群或行程类型设定。"
        ],
        [
          "价格测试",
          "对照争夺同一趟行程的目的地，测试价格预期与季节波动。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "旅遊與交通",
      "lead": "面向目的地機構、酒店集團、交通營運方與旅遊零售：誰會來、一趟行程如何被決定、又是什麼讓人再來。",
      "introKicker": "我們如何做",
      "intro": [
        "一趟行程分幾步決定，每一步屬於不同的一方：目的地、承運方、酒店、代理。",
        "我們沿著這幾步研究旅行者：什麼讓一個目的地進入備選、什麼決定了預訂、抵達之後發生什麼、回去之後怎麼說。",
        "每項研究都圍繞它要支撐的決定來設計：開哪個客源市場、瞄準哪類客群、行程在哪一步失去旅行者。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "目的地與客群",
          "frame": "誰會來、為什麼來、從哪裡來。",
          "cards": [
            {
              "title": "客源市場與客群",
              "body": "按客源市場、出行目的與消費水準劃分旅行者，並在開市場之前把每一群的規模算清。",
              "methods": "線上問卷 · 電話訪問"
            },
            {
              "title": "目的地認知",
              "body": "確定目的地以什麼被記住，又是什麼讓它進不了備選。",
              "methods": "線上問卷 · 深度訪談"
            }
          ]
        },
        {
          "n": "02",
          "name": "決策與預訂",
          "frame": "從備選到下單，中間經過哪幾步。",
          "cards": [
            {
              "title": "出行決策",
              "body": "跟著一趟行程走：從目的地備選到預訂，以及目的地或營運商在哪一步掉出局。",
              "methods": "線上問卷 · 深度訪談"
            },
            {
              "title": "價格與季節",
              "body": "對照爭奪同一趟行程的其他目的地，測試價格預期與季節波動。",
              "methods": "價格測試 · 線上問卷"
            }
          ]
        },
        {
          "n": "03",
          "name": "到達與停留",
          "frame": "抵達之後，實際發生什麼。",
          "cards": [
            {
              "title": "交通與到達",
              "body": "研究旅行者如何選擇到達方式，以及這個選擇如何影響整趟行程。",
              "methods": "線上問卷 · 深度訪談"
            },
            {
              "title": "體驗與住宿",
              "body": "對照目的地所做的承諾，評估住宿、服務與當地體驗。",
              "methods": "深度訪談 · 線上問卷"
            }
          ]
        },
        {
          "n": "04",
          "name": "口碑與復訪",
          "frame": "會不會再來，會不會推薦。",
          "cards": [
            {
              "title": "推薦與復訪",
              "body": "測量推薦意願與復訪，並確定旅行者不再回來的原因。",
              "methods": "追蹤 · 線上問卷"
            },
            {
              "title": "客群結構變化",
              "body": "追蹤旅行者結構如何隨市場與季節變化。",
              "methods": "追蹤 · 電話訪問"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "旅行者問卷",
          "面向曾到訪或計劃到訪的旅行者的問卷，配額按客源市場、出行目的與消費水準設定。"
        ],
        [
          "目的地深度訪談",
          "與旅行者及同業夥伴進行 45–60 分鐘的一對一訪談，由研究人員執行。"
        ],
        [
          "線上追蹤",
          "按月或按季的追蹤，指標固定，變化可對照同一套基數來讀。"
        ],
        [
          "電話訪問（CATI）",
          "按腳本執行電話訪問，配額按市場、客群或行程類型設定。"
        ],
        [
          "價格測試",
          "對照爭奪同一趟行程的目的地，測試價格預期與季節波動。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Travel & transportation",
      "lead": "Research for destination organisations, hotel groups, transport operators and travel retail: who travels, how the trip is decided, and what brings them back.",
      "introKicker": "How we work",
      "intro": [
        "A trip is decided in stages, and each stage belongs to a different party: the destination, the carrier, the hotel, the agent.",
        "We study the traveller across those stages: what puts a destination on the shortlist, what decides the booking, what happens on arrival, and what is said afterwards.",
        "Each study is designed around the decision it has to support: which source market to open, which segment to target, and where the journey loses the traveller. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Destination and audience",
          "frame": "Who travels, why, and from where.",
          "cards": [
            {
              "title": "Source markets and segments",
              "body": "Segment travellers by origin market, purpose and spend, and size each group before a market is opened.",
              "methods": "Online survey · CATI"
            },
            {
              "title": "Destination perception",
              "body": "Establish what the destination is known for, and what keeps it off the shortlist.",
              "methods": "Online survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "02",
          "name": "Decision and booking",
          "frame": "How the shortlist becomes a booking.",
          "cards": [
            {
              "title": "Trip decisions",
              "body": "Follow the trip from destination shortlist to booking, and the points where a destination or operator drops out.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Price and season",
              "body": "Test price expectations and seasonality against the destinations that compete for the same trip.",
              "methods": "Price tests · online survey"
            }
          ]
        },
        {
          "n": "03",
          "name": "Arrival and stay",
          "frame": "What happens once the traveller arrives.",
          "cards": [
            {
              "title": "Transport and arrival",
              "body": "Study how travellers choose to get there, and what that choice does to the rest of the trip.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Experience and stay",
              "body": "Assess the stay, the service and the local experience against what the destination promised.",
              "methods": "In-depth interviews · online survey"
            }
          ]
        },
        {
          "n": "04",
          "name": "Advocacy and return",
          "frame": "Whether they come back, and whether they recommend it.",
          "cards": [
            {
              "title": "Recommendation and repeat",
              "body": "Measure advocacy and repeat visits, and establish why travellers do not return.",
              "methods": "Tracking · online survey"
            },
            {
              "title": "Traveller profile over time",
              "body": "Track how the traveller profile changes by market and by season.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Traveller survey",
          "Survey of past or intended travellers, with quotas by source market, purpose and spend."
        ],
        [
          "Destination interviews",
          "Depth interviews of 45 to 60 minutes with travellers and trade partners, run one to one by the research team."
        ],
        [
          "Online tracking",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by market, segment or trip type."
        ],
        [
          "Price tests",
          "Price expectations and seasonality tested against the destinations competing for the same trip."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "de": {
      "kicker": "Branchen",
      "title": "Reisen und Verkehr",
      "lead": "Forschung für Destinationen, Hotelgruppen, Verkehrsbetriebe und Travel Retail: wer reist, wie die Reise entschieden wird und was zur Rückkehr bewegt.",
      "introKicker": "So arbeiten wir",
      "intro": [
        "Eine Reise wird in Etappen entschieden, und jede Etappe gehört zu einem anderen Akteur: Destination, Carrier, Hotel, Agentur.",
        "Wir untersuchen den Reisenden über diese Etappen hinweg: Was bringt eine Destination auf die Auswahlliste, was entscheidet die Buchung, was geschieht bei der Ankunft, und was wird danach gesagt.",
        "Jede Studie wird um die Entscheidung herum konzipiert, die sie stützen soll: welchen Quellmarkt zu öffnen, welches Segment zu adressieren und wo die Reise den Reisenden verliert. Design, Stichprobe und Bericht folgen dieser Frage."
      ],
      "stagesKicker": "Was wir untersuchen",
      "stages": [
        {
          "n": "01",
          "name": "Destination und Zielgruppe",
          "frame": "Wer reist, warum und woher.",
          "cards": [
            {
              "title": "Quellmärkte und Segmente",
              "body": "Reisende nach Herkunftsmarkt, Reisezweck und Ausgaben segmentieren und jede Gruppe beziffern, bevor ein Markt geöffnet wird.",
              "methods": "Online-Befragung · CATI"
            },
            {
              "title": "Destinationswahrnehmung",
              "body": "Erheben, wofür die Destination bekannt ist und was sie von der Auswahlliste fernhält.",
              "methods": "Online-Befragung · Tiefeninterviews"
            }
          ]
        },
        {
          "n": "02",
          "name": "Entscheidung und Buchung",
          "frame": "Wie aus der Auswahlliste eine Buchung wird.",
          "cards": [
            {
              "title": "Reiseentscheidungen",
              "body": "Die Reise von der Auswahlliste bis zur Buchung verfolgen und die Punkte, an denen eine Destination oder ein Anbieter herausfällt.",
              "methods": "Online-Befragung · Tiefeninterviews"
            },
            {
              "title": "Preis und Saison",
              "body": "Preiserwartungen und Saisonalität gegen die Destinationen testen, die um dieselbe Reise konkurrieren.",
              "methods": "Preistests · Online-Befragung"
            }
          ]
        },
        {
          "n": "03",
          "name": "Ankunft und Aufenthalt",
          "frame": "Was geschieht, sobald der Reisende ankommt.",
          "cards": [
            {
              "title": "Anreise und Ankunft",
              "body": "Untersuchen, wie Reisende ihre Anreise wählen und was diese Wahl mit dem Rest der Reise macht.",
              "methods": "Online-Befragung · Tiefeninterviews"
            },
            {
              "title": "Erlebnis und Aufenthalt",
              "body": "Den Aufenthalt, den Service und das lokale Erlebnis daran messen, was die Destination versprochen hat.",
              "methods": "Tiefeninterviews · Online-Befragung"
            }
          ]
        },
        {
          "n": "04",
          "name": "Weiterempfehlung und Rückkehr",
          "frame": "Ob sie zurückkommen und ob sie empfehlen.",
          "cards": [
            {
              "title": "Empfehlung und Wiederbesuch",
              "body": "Weiterempfehlung und Wiederbesuche messen und klären, warum Reisende nicht zurückkehren.",
              "methods": "Tracking · Online-Befragung"
            },
            {
              "title": "Reisendenprofil über die Zeit",
              "body": "Verfolgen, wie sich das Reisendenprofil nach Markt und Saison verändert.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Was jede Methode ist und wann wir sie einsetzen.",
      "methods": [
        [
          "Reisendenbefragung",
          "Befragung vergangener oder geplanter Reisender mit Quoten nach Quellmarkt, Reisezweck und Ausgaben."
        ],
        [
          "Destinationsinterviews",
          "Tiefeninterviews von 45 bis 60 Minuten mit Reisenden und Handelspartnern, eins zu eins vom Forschungsteam geführt."
        ],
        [
          "Online-Tracking",
          "Monatliches oder quartalsweises Tracking auf festen Messgrößen, damit Bewegung gegen dieselbe Basis lesbar bleibt."
        ],
        [
          "CATI",
          "Standardisierte Telefoninterviews mit Quoten nach Markt, Segment oder Reisetyp."
        ],
        [
          "Preistests",
          "Preiserwartungen und Saisonalität getestet gegen die Destinationen, die um dieselbe Reise konkurrieren."
        ]
      ],
      "ctaTitle": "Sagen Sie uns, welche Entscheidung diese Forschung stützen soll.",
      "ctaBody": "Sie erhalten die Ergebnisse, die Belege dahinter und den empfohlenen nächsten Schritt.",
      "ctaPrimary": "Mit dem Forschungsteam sprechen",
      "ctaSecondary": "Mitmachen"
    },
    "fr": {
      "kicker": "Secteurs",
      "title": "Voyage et transport",
      "lead": "Études pour les organisations de destination, les groupes hôteliers, les transporteurs et le travel retail : qui voyage, comment le voyage se décide et ce qui les fait revenir.",
      "introKicker": "Notre méthode",
      "intro": [
        "Un voyage se décide par étapes, et chaque étape appartient à un acteur différent : la destination, le transporteur, l'hôtel, l'agence.",
        "Nous étudions le voyageur à travers ces étapes : ce qui met une destination sur la liste, ce qui décide la réservation, ce qui se passe à l'arrivée et ce qui en est dit ensuite.",
        "Chaque étude est conçue autour de la décision qu'elle doit éclairer : quel marché source ouvrir, quel segment cibler et où le parcours perd le voyageur. Design, échantillon et rapport découlent de cette question."
      ],
      "stagesKicker": "Ce que nous étudions",
      "stages": [
        {
          "n": "01",
          "name": "Destination et audience",
          "frame": "Qui voyage, pourquoi et d'où.",
          "cards": [
            {
              "title": "Marchés sources et segments",
              "body": "Segmenter les voyageurs par marché d'origine, motif et dépense, et dimensionner chaque groupe avant d'ouvrir un marché.",
              "methods": "Enquête en ligne · CATI"
            },
            {
              "title": "Perception de la destination",
              "body": "Établir ce pour quoi la destination est connue et ce qui la tient hors de la liste.",
              "methods": "Enquête en ligne · entretiens approfondis"
            }
          ]
        },
        {
          "n": "02",
          "name": "Décision et réservation",
          "frame": "Comment la liste devient une réservation.",
          "cards": [
            {
              "title": "Décisions de voyage",
              "body": "Suivre le voyage de la liste à la réservation, et les points où une destination ou un opérateur décroche.",
              "methods": "Enquête en ligne · entretiens approfondis"
            },
            {
              "title": "Prix et saison",
              "body": "Tester les attentes de prix et la saisonnalité face aux destinations qui concurrencent le même voyage.",
              "methods": "Tests de prix · enquête en ligne"
            }
          ]
        },
        {
          "n": "03",
          "name": "Arrivée et séjour",
          "frame": "Ce qui se passe une fois le voyageur arrivé.",
          "cards": [
            {
              "title": "Transport et arrivée",
              "body": "Étudier comment les voyageurs choisissent de s'y rendre, et l'effet de ce choix sur le reste du voyage.",
              "methods": "Enquête en ligne · entretiens approfondis"
            },
            {
              "title": "Expérience et séjour",
              "body": "Évaluer le séjour, le service et l'expérience locale au regard de ce que la destination a promis.",
              "methods": "Entretiens approfondis · enquête en ligne"
            }
          ]
        },
        {
          "n": "04",
          "name": "Recommandation et retour",
          "frame": "S'ils reviennent, et s'ils recommandent.",
          "cards": [
            {
              "title": "Recommandation et répétition",
              "body": "Mesurer la recommandation et les visites répétées, et établir pourquoi les voyageurs ne reviennent pas.",
              "methods": "Tracking · enquête en ligne"
            },
            {
              "title": "Profil du voyageur dans le temps",
              "body": "Suivre l'évolution du profil des voyageurs par marché et par saison.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Méthodes",
      "methodsLead": "Ce qu'est chaque méthode et quand nous l'utilisons.",
      "methods": [
        [
          "Enquête voyageurs",
          "Enquête auprès de voyageurs passés ou potentiels, avec quotas par marché source, motif et dépense."
        ],
        [
          "Entretiens destination",
          "Entretiens approfondis de 45 à 60 minutes avec voyageurs et partenaires, menés en tête-à-tête par l'équipe."
        ],
        [
          "Tracking en ligne",
          "Tracking mensuel ou trimestriel sur des mesures fixes, pour lire les évolutions sur la même base."
        ],
        [
          "CATI",
          "Entretiens téléphoniques scriptés, avec quotas par marché, segment ou type de voyage."
        ],
        [
          "Tests de prix",
          "Attentes de prix et saisonnalité testées face aux destinations concurrentes sur le même voyage."
        ]
      ],
      "ctaTitle": "Dites-nous quelle décision cette étude doit éclairer.",
      "ctaBody": "Vous recevez les résultats, les preuves qui les sous-tendent et la prochaine étape recommandée.",
      "ctaPrimary": "Parler à l'équipe",
      "ctaSecondary": "Nous rejoindre"
    },
    "nl": {
      "kicker": "Sectoren",
      "title": "Reizen en vervoer",
      "lead": "Onderzoek voor bestemmingsorganisaties, hotelgroepen, vervoerders en travel retail: wie reist, hoe de reis wordt besloten en wat hen terugbrengt.",
      "introKicker": "Zo werken we",
      "intro": [
        "Een reis wordt in fasen besloten, en elke fase hoort bij een andere partij: de bestemming, de vervoerder, het hotel, het agentschap.",
        "We onderzoeken de reiziger over die fasen: wat een bestemming op de shortlist zet, wat de boeking bepaalt, wat er bij aankomst gebeurt en wat er daarna wordt gezegd.",
        "Elke studie wordt opgebouwd rond de beslissing die zij moet ondersteunen: welke bronmarkt te openen, welk segment te richten en waar de reis de reiziger verliest. Ontwerp, steekproef en rapportage volgen die vraag."
      ],
      "stagesKicker": "Wat we onderzoeken",
      "stages": [
        {
          "n": "01",
          "name": "Bestemming en publiek",
          "frame": "Wie reist, waarom en vanwaar.",
          "cards": [
            {
              "title": "Bronmarkten en segmenten",
              "body": "Reizigers segmenteren naar herkomstmarkt, doel en besteding, en elke groep kwantificeren voordat een markt opengaat.",
              "methods": "Online-enquête · CATI"
            },
            {
              "title": "Beeld van de bestemming",
              "body": "Vaststellen waar de bestemming bekend om staat en wat haar van de shortlist houdt.",
              "methods": "Online-enquête · diepte-interviews"
            }
          ]
        },
        {
          "n": "02",
          "name": "Beslissing en boeking",
          "frame": "Hoe de shortlist een boeking wordt.",
          "cards": [
            {
              "title": "Reisbeslissingen",
              "body": "De reis volgen van shortlist tot boeking, en de punten waar een bestemming of aanbieder afvalt.",
              "methods": "Online-enquête · diepte-interviews"
            },
            {
              "title": "Prijs en seizoen",
              "body": "Prijsverwachtingen en seizoensinvloed testen tegen de bestemmingen die om dezelfde reis concurreren.",
              "methods": "Prijs tests · online-enquête"
            }
          ]
        },
        {
          "n": "03",
          "name": "Aankomst en verblijf",
          "frame": "Wat er gebeurt zodra de reiziger aankomt.",
          "cards": [
            {
              "title": "Vervoer en aankomst",
              "body": "Onderzoeken hoe reizigers hun reis ernaartoe kiezen, en wat die keuze doet met de rest van de reis.",
              "methods": "Online-enquête · diepte-interviews"
            },
            {
              "title": "Beleving en verblijf",
              "body": "Het verblijf, de service en de lokale beleving afmeten aan wat de bestemming beloofde.",
              "methods": "Diepte-interviews · online-enquête"
            }
          ]
        },
        {
          "n": "04",
          "name": "Aanbeveling en terugkeer",
          "frame": "Of ze terugkomen, en of ze het aanbevelen.",
          "cards": [
            {
              "title": "Aanbeveling en herhaalbezoek",
              "body": "Aanbeveling en herhaalbezoek meten, en vaststellen waarom reizigers niet terugkeren.",
              "methods": "Tracking · online-enquête"
            },
            {
              "title": "Reizigersprofiel in de tijd",
              "body": "Volgen hoe het reizigersprofiel per markt en per seizoen verandert.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Wat elke methode is en wanneer we die gebruiken.",
      "methods": [
        [
          "Reizigersenquête",
          "Enquête onder vroegere of beoogde reizigers, met quota naar bronmarkt, doel en besteding."
        ],
        [
          "Interviews per bestemming",
          "Diepte-interviews van 45 tot 60 minuten met reizigers en handelspartners, één op één door het onderzoeksteam."
        ],
        [
          "Online tracking",
          "Maandelijkse of driemaandelijkse tracking op vaste maten, zodat beweging tegen dezelfde basis leesbaar blijft."
        ],
        [
          "CATI",
          "Gescripte telefonische interviews, met quota naar markt, segment of reistype."
        ],
        [
          "Prijs tests",
          "Prijsverwachtingen en seizoensinvloed getest tegen de bestemmingen die om dezelfde reis concurreren."
        ]
      ],
      "ctaTitle": "Vertel ons welke beslissing dit onderzoek moet ondersteunen.",
      "ctaBody": "U ontvangt de resultaten, het bewijs erachter en de aanbevolen volgende stap.",
      "ctaPrimary": "Praat met het onderzoeksteam",
      "ctaSecondary": "Doe mee"
    },
    "da": {
      "kicker": "Brancher",
      "title": "Rejser og transport",
      "lead": "Research for destinationer, hotelgrupper, transportører og travel retail: hvem der rejser, hvordan rejsen besluttes, og hvad der bringer dem tilbage.",
      "introKicker": "Sådan arbejder vi",
      "intro": [
        "En rejse besluttes i etaper, og hver etape tilhører en anden aktør: destinationen, transportøren, hotellet, agenturet.",
        "Vi undersøger den rejsende gennem etaperne: hvad der sætter en destination på listen, hvad der afgør bookingen, hvad der sker ved ankomsten, og hvad der siges bagefter.",
        "Hver undersøgelse designes om den beslutning, den skal understøtte: hvilket kildemarked der skal åbnes, hvilket segment der skal rammes, og hvor rejsen mister den rejsende. Design, stikprøve og rapportering følger det spørgsmål."
      ],
      "stagesKicker": "Hvad vi undersøger",
      "stages": [
        {
          "n": "01",
          "name": "Destination og målgruppe",
          "frame": "Hvem der rejser, hvorfor og hvorfra.",
          "cards": [
            {
              "title": "Kildemarkeder og segmenter",
              "body": "Segmentér rejsende efter oprindelsesmarked, formål og forbrug, og størrelsesbestem hver gruppe, før et marked åbnes.",
              "methods": "Onlineundersøgelse · CATI"
            },
            {
              "title": "Destinationsopfattelse",
              "body": "Fastslå, hvad destinationen er kendt for, og hvad der holder den uden for listen.",
              "methods": "Onlineundersøgelse · dybdeinterviews"
            }
          ]
        },
        {
          "n": "02",
          "name": "Beslutning og booking",
          "frame": "Hvordan listen bliver en booking.",
          "cards": [
            {
              "title": "Rejsebeslutninger",
              "body": "Følg rejsen fra liste til booking, og de punkter, hvor en destination eller operatør falder fra.",
              "methods": "Onlineundersøgelse · dybdeinterviews"
            },
            {
              "title": "Pris og sæson",
              "body": "Test prisforventninger og sæson mod de destinationer, der konkurrerer om samme rejse.",
              "methods": "Pristests · onlineundersøgelse"
            }
          ]
        },
        {
          "n": "03",
          "name": "Ankomst og ophold",
          "frame": "Hvad der sker, når den rejsende ankommer.",
          "cards": [
            {
              "title": "Transport og ankomst",
              "body": "Undersøg, hvordan rejsende vælger at komme dertil, og hvad valget gør ved resten af rejsen.",
              "methods": "Onlineundersøgelse · dybdeinterviews"
            },
            {
              "title": "Oplevelse og ophold",
              "body": "Vurdér opholdet, servicen og den lokale oplevelse mod det, destinationen lovede.",
              "methods": "Dybdeinterviews · onlineundersøgelse"
            }
          ]
        },
        {
          "n": "04",
          "name": "Anbefaling og genbesøg",
          "frame": "Om de kommer igen, og om de anbefaler det.",
          "cards": [
            {
              "title": "Anbefaling og genkøb",
              "body": "Mål anbefaling og genbesøg, og fastslå, hvorfor rejsende ikke vender tilbage.",
              "methods": "Tracking · onlineundersøgelse"
            },
            {
              "title": "Rejsendes profil over tid",
              "body": "Følg, hvordan den rejsendes profil ændrer sig pr. marked og sæson.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hvad hver metode er, og hvornår vi bruger den.",
      "methods": [
        [
          "Rejsendeundersøgelse",
          "Undersøgelse blandt tidligere eller planlagte rejsende med kvoter efter kildemarked, formål og forbrug."
        ],
        [
          "Destinationsinterviews",
          "Dybdeinterviews på 45-60 minutter med rejsende og handelspartnere, gennemført en til en af researchteamet."
        ],
        [
          "Online tracking",
          "Månedlig eller kvartalsvis tracking på faste mål, så bevægelse kan læses mod samme base."
        ],
        [
          "CATI",
          "Scriptede telefoninterviews med kvoter efter marked, segment eller rejstype."
        ],
        [
          "Pristests",
          "Prisforventninger og sæson testet mod de destinationer, der konkurrerer om samme rejse."
        ]
      ],
      "ctaTitle": "Fortæl os, hvilken beslutning denne research skal understøtte.",
      "ctaBody": "Du får resultaterne, belægget bag dem og det anbefalede næste skridt.",
      "ctaPrimary": "Tal med researchteamet",
      "ctaSecondary": "Vær med"
    },
    "es": {
      "kicker": "Sectores",
      "title": "Viajes y transporte",
      "lead": "Investigación para organizaciones de destino, grupos hoteleros, operadores de transporte y travel retail: quién viaja, cómo se decide el viaje y qué les hace volver.",
      "introKicker": "Cómo trabajamos",
      "intro": [
        "Un viaje se decide por etapas, y cada etapa pertenece a un actor distinto: el destino, el transportista, el hotel, la agencia.",
        "Estudiamos al viajero a lo largo de esas etapas: qué pone un destino en la lista, qué decide la reserva, qué ocurre a la llegada y qué se dice después.",
        "Cada estudio se diseña en torno a la decisión que debe sostener: qué mercado emisor abrir, qué segmento abordar y dónde el recorrido pierde al viajero. El diseño, la muestra y el informe se derivan de esa pregunta."
      ],
      "stagesKicker": "Qué estudiamos",
      "stages": [
        {
          "n": "01",
          "name": "Destino y audiencia",
          "frame": "Quién viaja, por qué y desde dónde.",
          "cards": [
            {
              "title": "Mercados emisores y segmentos",
              "body": "Segmentar a los viajeros por mercado de origen, motivo y gasto, y dimensionar cada grupo antes de abrir un mercado.",
              "methods": "Encuesta online · CATI"
            },
            {
              "title": "Percepción del destino",
              "body": "Establecer por qué es conocido el destino y qué lo mantiene fuera de la lista.",
              "methods": "Encuesta online · entrevistas en profundidad"
            }
          ]
        },
        {
          "n": "02",
          "name": "Decisión y reserva",
          "frame": "Cómo la lista se convierte en reserva.",
          "cards": [
            {
              "title": "Decisiones de viaje",
              "body": "Seguir el viaje desde la lista hasta la reserva, y los puntos en que un destino u operador se cae.",
              "methods": "Encuesta online · entrevistas en profundidad"
            },
            {
              "title": "Precio y temporada",
              "body": "Probar expectativas de precio y estacionalidad frente a los destinos que compiten por el mismo viaje.",
              "methods": "Pruebas de precio · encuesta online"
            }
          ]
        },
        {
          "n": "03",
          "name": "Llegada y estancia",
          "frame": "Qué ocurre cuando el viajero llega.",
          "cards": [
            {
              "title": "Transporte y llegada",
              "body": "Estudiar cómo eligen los viajeros llegar y qué hace esa elección con el resto del viaje.",
              "methods": "Encuesta online · entrevistas en profundidad"
            },
            {
              "title": "Experiencia y estancia",
              "body": "Evaluar la estancia, el servicio y la experiencia local frente a lo que prometió el destino.",
              "methods": "Entrevistas en profundidad · encuesta online"
            }
          ]
        },
        {
          "n": "04",
          "name": "Recomendación y regreso",
          "frame": "Si vuelven y si lo recomiendan.",
          "cards": [
            {
              "title": "Recomendación y repetición",
              "body": "Medir la recomendación y las visitas repetidas, y establecer por qué los viajeros no vuelven.",
              "methods": "Tracking · encuesta online"
            },
            {
              "title": "Perfil del viajero en el tiempo",
              "body": "Seguir cómo cambia el perfil del viajero por mercado y temporada.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "Qué es cada método y cuándo lo usamos.",
      "methods": [
        [
          "Encuesta a viajeros",
          "Encuesta a viajeros pasados o potenciales, con cuotas por mercado emisor, motivo y gasto."
        ],
        [
          "Entrevistas de destino",
          "Entrevistas en profundidad de 45 a 60 minutos con viajeros y socios comerciales, realizadas uno a uno por el equipo."
        ],
        [
          "Tracking online",
          "Tracking mensual o trimestral sobre medidas fijas, para leer el movimiento contra la misma base."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, con cuotas por mercado, segmento o tipo de viaje."
        ],
        [
          "Pruebas de precio",
          "Expectativas de precio y estacionalidad probadas frente a los destinos que compiten por el mismo viaje."
        ]
      ],
      "ctaTitle": "Cuéntenos qué decisión debe sostener esta investigación.",
      "ctaBody": "Recibe los resultados, las pruebas que los sostienen y el siguiente paso recomendado.",
      "ctaPrimary": "Hablar con el equipo",
      "ctaSecondary": "Únete"
    },
    "fi": {
      "kicker": "Toimialat",
      "title": "Matkailu ja liikenne",
      "lead": "Tutkimusta matkakohteille, hotelliketjuille, liikenneoperaattoreille ja travel retailille: ketkä matkustavat, miten matka päätetään ja mikä saa heidät palaamaan.",
      "introKicker": "Näin työskentelemme",
      "intro": [
        "Matka päätetään vaiheissa, ja jokainen vaihe kuuluu eri toimijalle: kohde, liikennöitsijä, hotelli, matkatoimisto.",
        "Tutkimme matkustajaa näissä vaiheissa: mikä nostaa kohteen listalle, mikä ratkaisee varauksen, mitä saapumisessa tapahtuu ja mitä sen jälkeen sanotaan.",
        "Jokainen tutkimus rakennetaan sen päätöksen ympärille, jota sen on tuettava: mikä lähtömarkkina avata, mihin segmenttiin kohdistaa ja missä matka kadottaa matkustajan. Suunnittelu, otos ja raportointi seuraavat tätä kysymystä."
      ],
      "stagesKicker": "Mitä tutkimme",
      "stages": [
        {
          "n": "01",
          "name": "Kohde ja yleisö",
          "frame": "Ketkä matkustavat, miksi ja mistä.",
          "cards": [
            {
              "title": "Lähtömarkkinat ja segmentit",
              "body": "Segmentoi matkustajat lähtömarkkinan, tarkoituksen ja kulutuksen mukaan ja mitoita jokainen ryhmä ennen markkinan avaamista.",
              "methods": "Verkkokysely · CATI"
            },
            {
              "title": "Kohdekuva",
              "body": "Selvitä, mistä kohde tunnetaan ja mikä pitää sen poissa listalta.",
              "methods": "Verkkokysely · syvähaastattelut"
            }
          ]
        },
        {
          "n": "02",
          "name": "Päätös ja varaus",
          "frame": "Miten listasta tulee varaus.",
          "cards": [
            {
              "title": "Matkapäätökset",
              "body": "Seuraa matkaa listalta varaukseen ja pisteet, joissa kohde tai operaattori putoaa.",
              "methods": "Verkkokysely · syvähaastattelut"
            },
            {
              "title": "Hinta ja kausi",
              "body": "Testaa hintaodotuksia ja kausivaihtelua kohteita vastaan, jotka kilpailevat samasta matkasta.",
              "methods": "Hintatestit · verkkokysely"
            }
          ]
        },
        {
          "n": "03",
          "name": "Saapuminen ja oleskelu",
          "frame": "Mitä tapahtuu, kun matkustaja saapuu.",
          "cards": [
            {
              "title": "Liikenne ja saapuminen",
              "body": "Tutki, miten matkustajat valitsevat perille pääsyn ja mitä valinta tekee matkan muulle osalle.",
              "methods": "Verkkokysely · syvähaastattelut"
            },
            {
              "title": "Kokemus ja oleskelu",
              "body": "Arvioi oleskelua, palvelua ja paikallista kokemusta sitä vasten, mitä kohde lupasi.",
              "methods": "Syvähaastattelut · verkkokysely"
            }
          ]
        },
        {
          "n": "04",
          "name": "Suosittelu ja paluu",
          "frame": "Palaavatko he ja suosittelevatko he.",
          "cards": [
            {
              "title": "Suosittelu ja toistuvat käynnit",
              "body": "Mittaa suosittelua ja toistuvia käyntejä ja selvitä, miksi matkustajat eivät palaa.",
              "methods": "Tracking · verkkokysely"
            },
            {
              "title": "Matkustajaprofiili ajassa",
              "body": "Seuraa, miten matkustajaprofiili muuttuu markkinoittain ja kausittain.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Menetelmät",
      "methodsLead": "Mikä kukin menetelmä on ja milloin käytämme sitä.",
      "methods": [
        [
          "Matkustajakysely",
          "Kysely aiemmille tai suunnitteleville matkustajille, kiintiöt lähtömarkkinan, tarkoituksen ja kulutuksen mukaan."
        ],
        [
          "Kohdehaastattelut",
          "45–60 minuutin syvähaastattelut matkustajien ja kauppakumppanien kanssa, tutkimustiimi tekee kahdestaan."
        ],
        [
          "Verkkotracking",
          "Kuukausittainen tai neljännesvuosittainen tracking kiinteillä mittareilla, jotta liike on luettavissa samasta kannasta."
        ],
        [
          "CATI",
          "Käsikirjoitetut puhelinhaastattelut, kiintiöt markkinan, segmentin tai matkatyypin mukaan."
        ],
        [
          "Hintatestit",
          "Hintaodotukset ja kausivaihtelu testattuna kohteita vastaan, jotka kilpailevat samasta matkasta."
        ]
      ],
      "ctaTitle": "Kerro meille, mitä päätöstä tämän tutkimuksen on tuettava.",
      "ctaBody": "Saat tulokset, niiden taustalla olevan näytön ja suositellun seuraavan askeleen.",
      "ctaPrimary": "Keskustele tutkimustiimin kanssa",
      "ctaSecondary": "Liity mukaan"
    },
    "it": {
      "kicker": "Settori",
      "title": "Viaggi e trasporti",
      "lead": "Ricerche per organizzazioni di destinazione, gruppi alberghieri, operatori di trasporto e travel retail: chi viaggia, come si decide il viaggio e cosa li riporta.",
      "introKicker": "Come lavoriamo",
      "intro": [
        "Un viaggio si decide per fasi, e ogni fase appartiene a un attore diverso: la destinazione, il vettore, l'hotel, l'agenzia.",
        "Studiamo il viaggiatore attraverso quelle fasi: cosa mette una destinazione in lista, cosa decide la prenotazione, cosa accade all'arrivo e cosa si dice dopo.",
        "Ogni studio è costruito attorno alla decisione che deve sostenere: quale mercato di origine aprire, quale segmento indirizzare e dove il percorso perde il viaggiatore. Disegno, campione e report discendono da quella domanda."
      ],
      "stagesKicker": "Cosa studiamo",
      "stages": [
        {
          "n": "01",
          "name": "Destinazione e pubblico",
          "frame": "Chi viaggia, perché e da dove.",
          "cards": [
            {
              "title": "Mercati di origine e segmenti",
              "body": "Segmentare i viaggiatori per mercato di origine, motivo e spesa, e dimensionare ogni gruppo prima di aprire un mercato.",
              "methods": "Indagine online · CATI"
            },
            {
              "title": "Percezione della destinazione",
              "body": "Stabilire per cosa è nota la destinazione e cosa la tiene fuori dalla lista.",
              "methods": "Indagine online · interviste in profondità"
            }
          ]
        },
        {
          "n": "02",
          "name": "Decisione e prenotazione",
          "frame": "Come la lista diventa prenotazione.",
          "cards": [
            {
              "title": "Decisioni di viaggio",
              "body": "Seguire il viaggio dalla lista alla prenotazione, e i punti in cui una destinazione o un operatore esce.",
              "methods": "Indagine online · interviste in profondità"
            },
            {
              "title": "Prezzo e stagione",
              "body": "Testare aspettative di prezzo e stagionalità contro le destinazioni che competono per lo stesso viaggio.",
              "methods": "Test di prezzo · indagine online"
            }
          ]
        },
        {
          "n": "03",
          "name": "Arrivo e soggiorno",
          "frame": "Cosa accade quando il viaggiatore arriva.",
          "cards": [
            {
              "title": "Trasporto e arrivo",
              "body": "Studiare come i viaggiatori scelgono di arrivare e cosa fa quella scelta al resto del viaggio.",
              "methods": "Indagine online · interviste in profondità"
            },
            {
              "title": "Esperienza e soggiorno",
              "body": "Valutare il soggiorno, il servizio e l'esperienza locale rispetto a ciò che la destinazione ha promesso.",
              "methods": "Interviste in profondità · indagine online"
            }
          ]
        },
        {
          "n": "04",
          "name": "Raccomandazione e ritorno",
          "frame": "Se tornano, e se lo consigliano.",
          "cards": [
            {
              "title": "Raccomandazione e ritorno",
              "body": "Misurare raccomandazione e visite ripetute, e stabilire perché i viaggiatori non tornano.",
              "methods": "Tracking · indagine online"
            },
            {
              "title": "Profilo del viaggiatore nel tempo",
              "body": "Seguire come cambia il profilo del viaggiatore per mercato e stagione.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metodi",
      "methodsLead": "Che cos'è ogni metodo e quando lo usiamo.",
      "methods": [
        [
          "Indagine viaggiatori",
          "Indagine su viaggiatori passati o potenziali, con quote per mercato di origine, motivo e spesa."
        ],
        [
          "Interviste alla destinazione",
          "Interviste in profondità di 45-60 minuti con viaggiatori e partner commerciali, condotte uno a uno dal team."
        ],
        [
          "Tracking online",
          "Tracking mensile o trimestrale su misure fisse, così il movimento si legge sulla stessa base."
        ],
        [
          "CATI",
          "Interviste telefoniche scriptate, con quote per mercato, segmento o tipo di viaggio."
        ],
        [
          "Test di prezzo",
          "Aspettative di prezzo e stagionalità testate contro le destinazioni che competono per lo stesso viaggio."
        ]
      ],
      "ctaTitle": "Dicci quale decisione deve sostenere questa ricerca.",
      "ctaBody": "Ricevi i risultati, le prove che li sostengono e il prossimo passo consigliato.",
      "ctaPrimary": "Parla con il team di ricerca",
      "ctaSecondary": "Unisciti"
    },
    "ja": {
      "kicker": "業界",
      "title": "旅行と交通",
      "lead": "旅行先の組織、ホテルグループ、交通事業者、トラベルリテール向けの調査：誰が旅するのか、旅はどう決まるのか、何が再訪につながるのか。",
      "introKicker": "進め方",
      "intro": [
        "旅は段階を追って決まり、各段階は別の担い手に属します。旅行先、交通事業者、ホテル、旅行代理店です。",
        "私たちはそれらの段階を通して旅行者を調べます。何が旅行先を候補に入れるのか、何が予約を決めるのか、到着時に何が起きるのか、その後何が語られるのか。",
        "各調査は、それが支えるべき意思決定を中心に設計します。どの送客市場を開くのか、どのセグメントを狙うのか、どこで旅が旅行者を失うのか。設計・サンプル・報告はこの問いから決まります。"
      ],
      "stagesKicker": "調査する内容",
      "stages": [
        {
          "n": "01",
          "name": "旅行先とオーディエンス",
          "frame": "誰が、なぜ、どこから旅するのか。",
          "cards": [
            {
              "title": "送客市場とセグメント",
              "body": "出発市場、目的、支出で旅行者をセグメント化し、市場を開く前に各グループの規模を把握します。",
              "methods": "オンライン調査 · CATI"
            },
            {
              "title": "旅行先の認知",
              "body": "旅行先が何で知られ、何が候補から外すのかを明らかにします。",
              "methods": "オンライン調査 · デプスインタビュー"
            }
          ]
        },
        {
          "n": "02",
          "name": "意思決定と予約",
          "frame": "候補が予約になるまで。",
          "cards": [
            {
              "title": "旅行の意思決定",
              "body": "候補から予約までの旅を追い、旅行先や事業者が脱落する地点を捉えます。",
              "methods": "オンライン調査 · デプスインタビュー"
            },
            {
              "title": "価格と季節",
              "body": "同じ旅を争う旅行先に対して、価格期待と季節性を検証します。",
              "methods": "価格テスト · オンライン調査"
            }
          ]
        },
        {
          "n": "03",
          "name": "到着と滞在",
          "frame": "旅行者が到着した後に何が起きるか。",
          "cards": [
            {
              "title": "交通と到着",
              "body": "旅行者がどう行き方を選ぶのか、その選択が旅の残りに何をもたらすのかを調べます。",
              "methods": "オンライン調査 · デプスインタビュー"
            },
            {
              "title": "体験と滞在",
              "body": "滞在、サービス、現地体験を、旅行先が約束したことに対して評価します。",
              "methods": "デプスインタビュー · オンライン調査"
            }
          ]
        },
        {
          "n": "04",
          "name": "推奨と再訪",
          "frame": "戻ってくるのか、勧めるのか。",
          "cards": [
            {
              "title": "推奨と再訪",
              "body": "推奨と再訪を測り、なぜ旅行者が戻らないのかを明らかにします。",
              "methods": "トラッキング · オンライン調査"
            },
            {
              "title": "時系列の旅行者プロファイル",
              "body": "市場別・季節別に旅行者プロファイルがどう変わるかを追います。",
              "methods": "トラッキング · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "手法",
      "methodsLead": "各手法の内容と、使う場面。",
      "methods": [
        [
          "旅行者調査",
          "過去または予定の旅行者への調査。送客市場、目的、支出で割り付けます。"
        ],
        [
          "旅行先インタビュー",
          "旅行者と取引先への45〜60分のデプスインタビュー。調査チームが1対1で行います。"
        ],
        [
          "オンライントラッキング",
          "固定指標による月次または四半期のトラッキング。同じ基準で変化を読めます。"
        ],
        [
          "CATI",
          "スクリプトに沿った電話調査。市場、セグメント、旅の種類で割り付けます。"
        ],
        [
          "価格テスト",
          "同じ旅を争う旅行先に対して、価格期待と季節性を検証します。"
        ]
      ],
      "ctaTitle": "この調査が支えるべき意思決定をお聞かせください。",
      "ctaBody": "結果、その根拠、推奨する次の一手をお渡しします。",
      "ctaPrimary": "調査チームに相談する",
      "ctaSecondary": "参加する"
    },
    "ko": {
      "kicker": "산업",
      "title": "여행과 교통",
      "lead": "여행지 기관, 호텔 그룹, 교통 사업자, 트래블 리테일을 위한 조사: 누가 여행하는지, 여행은 어떻게 결정되는지, 무엇이 다시 오게 하는지.",
      "introKicker": "일하는 방식",
      "intro": [
        "여행은 단계적으로 결정되고, 각 단계는 다른 주체에 속합니다. 여행지, 운송사, 호텔, 여행사입니다.",
        "우리는 그 단계를 따라 여행자를 조사합니다. 무엇이 여행지를 후보에 올리는지, 무엇이 예약을 결정하는지, 도착 후 어떤 일이 벌어지는지, 그 뒤에 무엇이 말해지는지.",
        "각 조사는 그것이 뒷받침해야 할 결정을 중심으로 설계합니다. 어느 송출 시장을 열지, 어느 세그먼트를 겨냥할지, 어디서 여정이 여행자를 잃는지. 설계, 표본, 보고는 이 질문에서 나옵니다."
      ],
      "stagesKicker": "무엇을 조사하는가",
      "stages": [
        {
          "n": "01",
          "name": "여행지와 고객",
          "frame": "누가, 왜, 어디서 여행하는가.",
          "cards": [
            {
              "title": "송출 시장과 세그먼트",
              "body": "출발 시장, 목적, 지출로 여행자를 세분화하고, 시장을 열기 전에 각 집단의 규모를 파악합니다.",
              "methods": "온라인 조사 · CATI"
            },
            {
              "title": "여행지 인식",
              "body": "여행지가 무엇으로 알려져 있고 무엇이 후보에서 밀어내는지 밝힙니다.",
              "methods": "온라인 조사 · 심층 인터뷰"
            }
          ]
        },
        {
          "n": "02",
          "name": "결정과 예약",
          "frame": "후보가 예약이 되는 과정.",
          "cards": [
            {
              "title": "여행 결정",
              "body": "후보에서 예약까지의 여정을 따라가며 여행지나 사업자가 탈락하는 지점을 찾습니다.",
              "methods": "온라인 조사 · 심층 인터뷰"
            },
            {
              "title": "가격과 시즌",
              "body": "같은 여행을 두고 경쟁하는 여행지를 상대로 가격 기대와 계절성을 검증합니다.",
              "methods": "가격 테스트 · 온라인 조사"
            }
          ]
        },
        {
          "n": "03",
          "name": "도착과 체류",
          "frame": "여행자가 도착한 뒤 벌어지는 일.",
          "cards": [
            {
              "title": "교통과 도착",
              "body": "여행자가 어떻게 갈지를 선택하는지, 그 선택이 나머지 여정에 무엇을 하는지 조사합니다.",
              "methods": "온라인 조사 · 심층 인터뷰"
            },
            {
              "title": "경험과 체류",
              "body": "체류, 서비스, 현지 경험을 여행지가 약속한 것과 견주어 평가합니다.",
              "methods": "심층 인터뷰 · 온라인 조사"
            }
          ]
        },
        {
          "n": "04",
          "name": "추천과 재방문",
          "frame": "다시 오는지, 추천하는지.",
          "cards": [
            {
              "title": "추천과 재방문",
              "body": "추천과 재방문을 측정하고 여행자가 돌아오지 않는 이유를 밝힙니다.",
              "methods": "트래킹 · 온라인 조사"
            },
            {
              "title": "시간에 따른 여행자 프로필",
              "body": "시장별·시즌별로 여행자 프로필이 어떻게 바뀌는지 추적합니다.",
              "methods": "트래킹 · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "방법",
      "methodsLead": "각 방법이 무엇이고 언제 쓰는가.",
      "methods": [
        [
          "여행자 조사",
          "과거 또는 예정 여행자를 대상으로 한 조사. 송출 시장, 목적, 지출로 할당합니다."
        ],
        [
          "여행지 인터뷰",
          "여행자와 거래 파트너를 대상으로 한 45~60분 심층 인터뷰. 조사팀이 1대1로 진행합니다."
        ],
        [
          "온라인 트래킹",
          "고정 지표로 월별 또는 분기별 트래킹. 같은 기준으로 변화를 읽습니다."
        ],
        [
          "CATI",
          "스크립트 기반 전화 조사. 시장, 세그먼트, 여행 유형으로 할당합니다."
        ],
        [
          "가격 테스트",
          "같은 여행을 두고 경쟁하는 여행지를 상대로 가격 기대와 계절성을 검증합니다."
        ]
      ],
      "ctaTitle": "이 조사가 뒷받침해야 할 결정을 알려주세요.",
      "ctaBody": "결과, 그 근거, 권장하는 다음 단계를 받습니다.",
      "ctaPrimary": "조사팀과 상담하기",
      "ctaSecondary": "참여하기"
    },
    "no": {
      "kicker": "Bransjer",
      "title": "Reiser og transport",
      "lead": "Forskning for destinasjonsselskaper, hotellgrupper, transportoperatører og travel retail: hvem som reiser, hvordan reisen besluttes, og hva som får dem tilbake.",
      "introKicker": "Slik arbeider vi",
      "intro": [
        "En reise besluttes i etapper, og hver etappe tilhører en annen aktør: destinasjonen, transportøren, hotellet, agenturet.",
        "Vi undersøker den reisende gjennom etappene: hva som setter en destinasjon på listen, hva som avgjør bookingen, hva som skjer ved ankomst, og hva som sies etterpå.",
        "Hver studie designes rundt beslutningen den skal støtte: hvilket kildemarked som skal åpnes, hvilket segment som skal nås, og hvor reisen mister den reisende. Design, utvalg og rapportering følger dette spørsmålet."
      ],
      "stagesKicker": "Hva vi undersøker",
      "stages": [
        {
          "n": "01",
          "name": "Destinasjon og målgruppe",
          "frame": "Hvem som reiser, hvorfor og hvorfra.",
          "cards": [
            {
              "title": "Kildemarkeder og segmenter",
              "body": "Segmenter reisende etter opprinnelsesmarked, formål og forbruk, og dimensjoner hver gruppe før et marked åpnes.",
              "methods": "Nettundersøkelse · CATI"
            },
            {
              "title": "Destinasjonsoppfatning",
              "body": "Fastslå hva destinasjonen er kjent for, og hva som holder den utenfor listen.",
              "methods": "Nettundersøkelse · dybdeintervjuer"
            }
          ]
        },
        {
          "n": "02",
          "name": "Beslutning og booking",
          "frame": "Hvordan listen blir en booking.",
          "cards": [
            {
              "title": "Reisebeslutninger",
              "body": "Følg reisen fra liste til booking, og punktene der en destinasjon eller operatør faller fra.",
              "methods": "Nettundersøkelse · dybdeintervjuer"
            },
            {
              "title": "Pris og sesong",
              "body": "Test prisforventninger og sesong mot destinasjonene som konkurrerer om samme reise.",
              "methods": "Pristester · nettundersøkelse"
            }
          ]
        },
        {
          "n": "03",
          "name": "Ankomst og opphold",
          "frame": "Hva som skjer når den reisende ankommer.",
          "cards": [
            {
              "title": "Transport og ankomst",
              "body": "Undersøk hvordan reisende velger å komme seg dit, og hva valget gjør med resten av reisen.",
              "methods": "Nettundersøkelse · dybdeintervjuer"
            },
            {
              "title": "Opplevelse og opphold",
              "body": "Vurder oppholdet, servicen og den lokale opplevelsen mot det destinasjonen lovet.",
              "methods": "Dybdeintervjuer · nettundersøkelse"
            }
          ]
        },
        {
          "n": "04",
          "name": "Anbefaling og gjenbesøk",
          "frame": "Om de kommer tilbake, og om de anbefaler det.",
          "cards": [
            {
              "title": "Anbefaling og gjenkjøp",
              "body": "Mål anbefaling og gjenbesøk, og fastslå hvorfor reisende ikke kommer tilbake.",
              "methods": "Tracking · nettundersøkelse"
            },
            {
              "title": "Reisendes profil over tid",
              "body": "Følg hvordan den reisendes profil endrer seg per marked og sesong.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hva hver metode er, og når vi bruker den.",
      "methods": [
        [
          "Reiseundersøkelse",
          "Undersøkelse blant tidligere eller planlagte reisende, med kvoter etter kildemarked, formål og forbruk."
        ],
        [
          "Destinasjonsintervjuer",
          "Dybdeintervjuer på 45–60 minutter med reisende og handelspartnere, gjennomført en til en av forskerteamet."
        ],
        [
          "Nettracking",
          "Månedlig eller kvartalsvis tracking på faste mål, slik at bevegelse kan leses mot samme base."
        ],
        [
          "CATI",
          "Skriptede telefonintervjuer, med kvoter etter marked, segment eller reisetype."
        ],
        [
          "Pristester",
          "Prisforventninger og sesong testet mot destinasjonene som konkurrerer om samme reise."
        ]
      ],
      "ctaTitle": "Fortell oss hvilken beslutning denne forskningen skal støtte.",
      "ctaBody": "Du får funnene, belegget bak dem og anbefalt neste steg.",
      "ctaPrimary": "Snakk med forskerteamet",
      "ctaSecondary": "Bli med"
    },
    "pt": {
      "kicker": "Setores",
      "title": "Viagens e transporte",
      "lead": "Investigação para organizações de destino, grupos hoteleiros, operadores de transporte e travel retail: quem viaja, como a viagem se decide e o que os faz voltar.",
      "introKicker": "Como trabalhamos",
      "intro": [
        "Uma viagem decide-se por etapas, e cada etapa pertence a um ator diferente: o destino, o transportador, o hotel, a agência.",
        "Estudamos o viajante ao longo dessas etapas: o que põe um destino na lista, o que decide a reserva, o que acontece à chegada e o que se diz depois.",
        "Cada estudo é desenhado em torno da decisão que tem de sustentar: que mercado emissor abrir, que segmento abordar e onde o percurso perde o viajante. Desenho, amostra e relatório decorrem dessa pergunta."
      ],
      "stagesKicker": "O que estudamos",
      "stages": [
        {
          "n": "01",
          "name": "Destino e público",
          "frame": "Quem viaja, porquê e de onde.",
          "cards": [
            {
              "title": "Mercados emissores e segmentos",
              "body": "Segmentar viajantes por mercado de origem, motivo e despesa, e dimensionar cada grupo antes de abrir um mercado.",
              "methods": "Inquérito online · CATI"
            },
            {
              "title": "Perceção do destino",
              "body": "Estabelecer pelo que o destino é conhecido e o que o mantém fora da lista.",
              "methods": "Inquérito online · entrevistas em profundidade"
            }
          ]
        },
        {
          "n": "02",
          "name": "Decisão e reserva",
          "frame": "Como a lista se torna reserva.",
          "cards": [
            {
              "title": "Decisões de viagem",
              "body": "Seguir a viagem da lista à reserva, e os pontos em que um destino ou operador se perde.",
              "methods": "Inquérito online · entrevistas em profundidade"
            },
            {
              "title": "Preço e época",
              "body": "Testar expectativas de preço e sazonalidade face aos destinos que competem pela mesma viagem.",
              "methods": "Testes de preço · inquérito online"
            }
          ]
        },
        {
          "n": "03",
          "name": "Chegada e estadia",
          "frame": "O que acontece quando o viajante chega.",
          "cards": [
            {
              "title": "Transporte e chegada",
              "body": "Estudar como os viajantes escolhem chegar e o que essa escolha faz ao resto da viagem.",
              "methods": "Inquérito online · entrevistas em profundidade"
            },
            {
              "title": "Experiência e estadia",
              "body": "Avaliar a estadia, o serviço e a experiência local face ao que o destino prometeu.",
              "methods": "Entrevistas em profundidade · inquérito online"
            }
          ]
        },
        {
          "n": "04",
          "name": "Recomendação e regresso",
          "frame": "Se voltam, e se recomendam.",
          "cards": [
            {
              "title": "Recomendação e repetição",
              "body": "Medir recomendação e visitas repetidas, e estabelecer porque os viajantes não regressam.",
              "methods": "Tracking · inquérito online"
            },
            {
              "title": "Perfil do viajante ao longo do tempo",
              "body": "Acompanhar como o perfil do viajante muda por mercado e por época.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "O que é cada método e quando o usamos.",
      "methods": [
        [
          "Inquérito a viajantes",
          "Inquérito a viajantes passados ou potenciais, com quotas por mercado emissor, motivo e despesa."
        ],
        [
          "Entrevistas ao destino",
          "Entrevistas em profundidade de 45 a 60 minutos com viajantes e parceiros comerciais, conduzidas um a um pela equipa."
        ],
        [
          "Tracking online",
          "Tracking mensal ou trimestral sobre medidas fixas, para ler o movimento contra a mesma base."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, com quotas por mercado, segmento ou tipo de viagem."
        ],
        [
          "Testes de preço",
          "Expectativas de preço e sazonalidade testadas face aos destinos que competem pela mesma viagem."
        ]
      ],
      "ctaTitle": "Diga-nos que decisão esta investigação tem de sustentar.",
      "ctaBody": "Recebe os resultados, as provas que os sustentam e o próximo passo recomendado.",
      "ctaPrimary": "Falar com a equipa",
      "ctaSecondary": "Junte-se a nós"
    },
    "ru": {
      "kicker": "Отрасли",
      "title": "Путешествия и транспорт",
      "lead": "Исследования для туристических организаций, гостиничных групп, перевозчиков и travel retail: кто путешествует, как принимается решение о поездке и что заставляет вернуться.",
      "introKicker": "Как мы работаем",
      "intro": [
        "Поездка решается поэтапно, и каждый этап принадлежит разному участнику: направлению, перевозчику, отелю, агентству.",
        "Мы изучаем путешественника на этих этапах: что ставит направление в список, что решает бронирование, что происходит по прибытии и что говорят после.",
        "Каждое исследование строится вокруг решения, которое оно должно поддержать: какой исходный рынок открывать, на какой сегмент ориентироваться и где путь теряет путешественника. Дизайн, выборка и отчёт следуют из этого вопроса."
      ],
      "stagesKicker": "Что мы изучаем",
      "stages": [
        {
          "n": "01",
          "name": "Направление и аудитория",
          "frame": "Кто путешествует, зачем и откуда.",
          "cards": [
            {
              "title": "Исходные рынки и сегменты",
              "body": "Сегментировать путешественников по рынку происхождения, цели и расходам и оценить размер каждой группы до открытия рынка.",
              "methods": "Онлайн-опрос · CATI"
            },
            {
              "title": "Восприятие направления",
              "body": "Определить, чем известно направление и что удерживает его вне списка.",
              "methods": "Онлайн-опрос · глубинные интервью"
            }
          ]
        },
        {
          "n": "02",
          "name": "Решение и бронирование",
          "frame": "Как список становится бронированием.",
          "cards": [
            {
              "title": "Решения о поездке",
              "body": "Проследить путь от списка до бронирования и точки, где направление или оператор выпадают.",
              "methods": "Онлайн-опрос · глубинные интервью"
            },
            {
              "title": "Цена и сезон",
              "body": "Проверить ценовые ожидания и сезонность на фоне направлений, конкурирующих за ту же поездку.",
              "methods": "Ценовые тесты · онлайн-опрос"
            }
          ]
        },
        {
          "n": "03",
          "name": "Прибытие и проживание",
          "frame": "Что происходит, когда путешественник прибывает.",
          "cards": [
            {
              "title": "Транспорт и прибытие",
              "body": "Изучить, как путешественники выбирают способ добраться и что этот выбор делает с остальной поездкой.",
              "methods": "Онлайн-опрос · глубинные интервью"
            },
            {
              "title": "Впечатление и проживание",
              "body": "Оценить проживание, сервис и местные впечатления относительно обещаний направления.",
              "methods": "Глубинные интервью · онлайн-опрос"
            }
          ]
        },
        {
          "n": "04",
          "name": "Рекомендация и возвращение",
          "frame": "Возвращаются ли и рекомендуют ли.",
          "cards": [
            {
              "title": "Рекомендация и повторные визиты",
              "body": "Измерить рекомендацию и повторные визиты и понять, почему путешественники не возвращаются.",
              "methods": "Трекинг · онлайн-опрос"
            },
            {
              "title": "Профиль путешественника во времени",
              "body": "Отслеживать, как профиль путешественника меняется по рынкам и сезонам.",
              "methods": "Трекинг · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Методы",
      "methodsLead": "Что представляет собой каждый метод и когда мы его применяем.",
      "methods": [
        [
          "Опрос путешественников",
          "Опрос прошлых или планируемых путешественников с квотами по рынку происхождения, цели и расходам."
        ],
        [
          "Интервью о направлении",
          "Глубинные интервью по 45–60 минут с путешественниками и торговыми партнёрами, один на один с исследовательской командой."
        ],
        [
          "Онлайн-трекинг",
          "Ежемесячный или ежеквартальный трекинг по фиксированным показателям, чтобы читать динамику на одной базе."
        ],
        [
          "CATI",
          "Телефонные интервью по скрипту с квотами по рынку, сегменту или типу поездки."
        ],
        [
          "Ценовые тесты",
          "Ценовые ожидания и сезонность, проверенные на направлениях, конкурирующих за ту же поездку."
        ]
      ],
      "ctaTitle": "Расскажите, какое решение должно поддержать это исследование.",
      "ctaBody": "Вы получаете результаты, доказательства за ними и рекомендуемый следующий шаг.",
      "ctaPrimary": "Поговорить с командой",
      "ctaSecondary": "Присоединиться"
    },
    "sv": {
      "kicker": "Branscher",
      "title": "Resor och transport",
      "lead": "Undersökningar för destinationsorganisationer, hotellgrupper, transportoperatörer och travel retail: vilka som reser, hur resan beslutas och vad som får dem att återvända.",
      "introKicker": "Så arbetar vi",
      "intro": [
        "En resa beslutas i etapper, och varje etapp tillhör en annan aktör: destinationen, transportören, hotellet, agenturen.",
        "Vi undersöker resenären genom etapperna: vad som sätter en destination på listan, vad som avgör bokningen, vad som händer vid ankomst och vad som sägs efteråt.",
        "Varje studie byggs kring det beslut den ska stödja: vilken källmarknad som ska öppnas, vilket segment som ska nås och var resan tappar resenären. Design, urval och rapportering följer den frågan."
      ],
      "stagesKicker": "Vad vi undersöker",
      "stages": [
        {
          "n": "01",
          "name": "Destination och målgrupp",
          "frame": "Vilka som reser, varför och varifrån.",
          "cards": [
            {
              "title": "Källmarknader och segment",
              "body": "Segmentera resenärer efter ursprungsmarknad, syfte och spendering, och storleksbestäm varje grupp innan en marknad öppnas.",
              "methods": "Onlineundersökning · CATI"
            },
            {
              "title": "Destinationsuppfattning",
              "body": "Fastställa vad destinationen är känd för och vad som håller den utanför listan.",
              "methods": "Onlineundersökning · djupintervjuer"
            }
          ]
        },
        {
          "n": "02",
          "name": "Beslut och bokning",
          "frame": "Hur listan blir en bokning.",
          "cards": [
            {
              "title": "Resebeslut",
              "body": "Följ resan från lista till bokning, och punkterna där en destination eller operatör faller bort.",
              "methods": "Onlineundersökning · djupintervjuer"
            },
            {
              "title": "Pris och säsong",
              "body": "Testa prisförväntningar och säsong mot de destinationer som konkurrerar om samma resa.",
              "methods": "Pristester · onlineundersökning"
            }
          ]
        },
        {
          "n": "03",
          "name": "Ankomst och vistelse",
          "frame": "Vad som händer när resenären anländer.",
          "cards": [
            {
              "title": "Transport och ankomst",
              "body": "Undersöka hur resenärer väljer att ta sig dit, och vad valet gör med resten av resan.",
              "methods": "Onlineundersökning · djupintervjuer"
            },
            {
              "title": "Upplevelse och vistelse",
              "body": "Bedöma vistelsen, servicen och den lokala upplevelsen mot vad destinationen lovade.",
              "methods": "Djupintervjuer · onlineundersökning"
            }
          ]
        },
        {
          "n": "04",
          "name": "Rekommendation och återkomst",
          "frame": "Om de kommer tillbaka, och om de rekommenderar.",
          "cards": [
            {
              "title": "Rekommendation och återbesök",
              "body": "Mäta rekommendation och återbesök, och fastställa varför resenärer inte återvänder.",
              "methods": "Tracking · onlineundersökning"
            },
            {
              "title": "Resenärsprofil över tid",
              "body": "Följa hur resenärsprofilen förändras per marknad och säsong.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Vad varje metod är och när vi använder den.",
      "methods": [
        [
          "Resenärsundersökning",
          "Undersökning bland tidigare eller planerade resenärer, med kvoter efter källmarknad, syfte och spendering."
        ],
        [
          "Destinationsintervjuer",
          "Djupintervjuer på 45–60 minuter med resenärer och handelspartner, genomförda en mot en av forskarteamet."
        ],
        [
          "Onlinetracking",
          "Månatlig eller kvartalsvis tracking på fasta mått, så att rörelse kan läsas mot samma bas."
        ],
        [
          "CATI",
          "Skriptade telefonintervjuer, med kvoter efter marknad, segment eller restyp."
        ],
        [
          "Pristester",
          "Prisförväntningar och säsong testade mot de destinationer som konkurrerar om samma resa."
        ]
      ],
      "ctaTitle": "Berätta vilket beslut den här undersökningen ska stödja.",
      "ctaBody": "Du får resultaten, underlaget bakom dem och rekommenderat nästa steg.",
      "ctaPrimary": "Prata med forskarteamet",
      "ctaSecondary": "Var med"
    },
    "tr": {
      "kicker": "Sektörler",
      "title": "Seyahat ve ulaşım",
      "lead": "Destinasyon kuruluşları, otel grupları, ulaşım operatörleri ve travel retail için araştırma: kim seyahat ediyor, seyahat nasıl kararlaştırılıyor ve onları ne geri getiriyor.",
      "introKicker": "Nasıl çalışıyoruz",
      "intro": [
        "Bir seyahat aşamalar hâlinde kararlaştırılır ve her aşama farklı bir tarafa aittir: destinasyon, taşıyıcı, otel, acente.",
        "Gezginin bu aşamalardaki hâlini inceliyoruz: bir destinasyonu listeye ne sokuyor, rezervasyonu ne belirliyor, varışta ne oluyor ve sonrasında ne söyleniyor.",
        "Her çalışma, desteklemesi gereken kararın etrafında tasarlanır: hangi kaynak pazar açılacak, hangi segmente odaklanılacak ve yolculuk gezgini nerede kaybediyor. Tasarım, örneklem ve rapor bu sorudan türetilir."
      ],
      "stagesKicker": "Neyi inceliyoruz",
      "stages": [
        {
          "n": "01",
          "name": "Destinasyon ve hedef kitle",
          "frame": "Kim seyahat ediyor, neden ve nereden.",
          "cards": [
            {
              "title": "Kaynak pazarlar ve segmentler",
              "body": "Gezginleri çıkış pazarı, amaç ve harcama bazında segmentlere ayırın ve bir pazar açılmadan önce her grubun büyüklüğünü belirleyin.",
              "methods": "Çevrimiçi anket · CATI"
            },
            {
              "title": "Destinasyon algısı",
              "body": "Destinasyonun neyle tanındığını ve onu listeden uzak tutan şeyin ne olduğunu ortaya koyun.",
              "methods": "Çevrimiçi anket · derinlemesine görüşmeler"
            }
          ]
        },
        {
          "n": "02",
          "name": "Karar ve rezervasyon",
          "frame": "Listenin rezervasyona nasıl dönüştüğü.",
          "cards": [
            {
              "title": "Seyahat kararları",
              "body": "Seyahati listeden rezervasyona kadar izleyin ve bir destinasyonun ya da operatörün düştüğü noktaları görün.",
              "methods": "Çevrimiçi anket · derinlemesine görüşmeler"
            },
            {
              "title": "Fiyat ve sezon",
              "body": "Aynı seyahat için rekabet eden destinasyonlara karşı fiyat beklentilerini ve mevsimselliği test edin.",
              "methods": "Fiyat testleri · çevrimiçi anket"
            }
          ]
        },
        {
          "n": "03",
          "name": "Varış ve konaklama",
          "frame": "Gezgin vardığında ne oluyor.",
          "cards": [
            {
              "title": "Ulaşım ve varış",
              "body": "Gezginlerin oraya nasıl gitmeyi seçtiğini ve bu seçimin seyahatin geri kalanına ne yaptığını inceleyin.",
              "methods": "Çevrimiçi anket · derinlemesine görüşmeler"
            },
            {
              "title": "Deneyim ve konaklama",
              "body": "Konaklamayı, hizmeti ve yerel deneyimi destinasyonun vaat ettiğiyle karşılaştırarak değerlendirin.",
              "methods": "Derinlemesine görüşmeler · çevrimiçi anket"
            }
          ]
        },
        {
          "n": "04",
          "name": "Tavsiye ve geri dönüş",
          "frame": "Geri dönüyorlar mı ve tavsiye ediyorlar mı.",
          "cards": [
            {
              "title": "Tavsiye ve tekrar ziyaret",
              "body": "Tavsiyeyi ve tekrar ziyaretleri ölçün ve gezginlerin neden dönmediğini ortaya koyun.",
              "methods": "Tracking · çevrimiçi anket"
            },
            {
              "title": "Zaman içinde gezgin profili",
              "body": "Gezgin profilinin pazara ve sezona göre nasıl değiştiğini izleyin.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Yöntemler",
      "methodsLead": "Her yöntemin ne olduğu ve ne zaman kullandığımız.",
      "methods": [
        [
          "Gezgin anketi",
          "Geçmiş veya potansiyel gezginlerle anket; kaynak pazar, amaç ve harcamaya göre kotalar."
        ],
        [
          "Destinasyon görüşmeleri",
          "Gezginler ve ticari ortaklarla 45-60 dakikalık derinlemesine görüşmeler; araştırma ekibi bire bir yürütür."
        ],
        [
          "Çevrimiçi tracking",
          "Sabit ölçütlerle aylık veya üç aylık tracking; hareket aynı taban üzerinden okunur."
        ],
        [
          "CATI",
          "Pazar, segment veya seyahat türüne göre kotalı, senaryolu telefon görüşmeleri."
        ],
        [
          "Fiyat testleri",
          "Aynı seyahat için rekabet eden destinasyonlara karşı test edilen fiyat beklentileri ve mevsimsellik."
        ]
      ],
      "ctaTitle": "Bu araştırmanın hangi kararı desteklemesi gerektiğini bize anlatın.",
      "ctaBody": "Bulguları, arkalarındaki kanıtları ve önerilen sonraki adımı alırsınız.",
      "ctaPrimary": "Araştırma ekibiyle konuşun",
      "ctaSecondary": "Katılın"
    }
  },
  "consumer": {
    "en-US": {
      "kicker": "Industries",
      "title": "Retail & FMCG",
      "lead": "Research for retailers and for food, drink and household brands: how the category is changing, what the pack has to do, and what happens on the shelf.",
      "introKicker": "How we work",
      "intro": [
        "Retail and fast-moving goods meet in the same aisle: the brand decides the pack and the price, the retailer decides the space and the position.",
        "We study the category, the pack and the shelf separately, because each is decided by a different team and on a different timetable.",
        "Each study is designed around the decision it has to support: which pack to launch, what price the shelf will carry, and how the brand holds its place. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Category and demand",
          "frame": "Where the demand comes from, and what it replaces.",
          "cards": [
            {
              "title": "Category opportunity",
              "body": "Size the category and the adjacent ones, and establish where demand comes from and what it replaces.",
              "methods": "Online survey · CATI"
            },
            {
              "title": "Price tiers and pack",
              "body": "Test price tiers and pack formats before the listing negotiation.",
              "methods": "Pack tests · price tests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pack and price",
          "frame": "What the pack has to do, and whether the price holds.",
          "cards": [
            {
              "title": "Pack testing",
              "body": "Test pack design and on-pack claims with the shoppers who have to find it.",
              "methods": "Central location tests · pack stimuli"
            },
            {
              "title": "Pricing and promotion",
              "body": "Test price points and promotion mechanics against what shoppers will pay.",
              "methods": "Price tests · online survey"
            }
          ]
        },
        {
          "n": "03",
          "name": "Shelf and store",
          "frame": "How the product is seen in the aisle.",
          "cards": [
            {
              "title": "Shelf visibility",
              "body": "Test facings, blocking and shelf layout in a controlled shelf, and record what shoppers find first.",
              "methods": "Central location tests"
            },
            {
              "title": "In-store experience",
              "body": "Study the store visit: how the shopper moves through the aisle, and what interrupts the purchase.",
              "methods": "In-depth interviews · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Brand and repeat",
          "frame": "Whether the brand holds, and whether the buyer returns.",
          "cards": [
            {
              "title": "Brand health",
              "body": "Track awareness, consideration and recommendation against the brands actually compared.",
              "methods": "Online tracking · fixed measures"
            },
            {
              "title": "Repeat and churn",
              "body": "Track repeat purchase and the reasons a buyer stops.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Central location tests",
          "Pack and shelf tests run at a central location, with shelf layouts built for the category."
        ],
        [
          "Product and pack tests",
          "Product and pack tests, run at a central location or in the home."
        ],
        [
          "Consumer face-to-face (CAPI)",
          "Structured interviews at a central location or in store, for shoppers who are difficult to reach online."
        ],
        [
          "Online survey",
          "Survey of shoppers, with quotas by channel, city and category spend."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by city, channel or customer type."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "零售与快消品",
      "lead": "面向零售商与食品、饮料、日化品牌：品类如何变化、包装要完成什么、货架上实际发生什么。",
      "introKicker": "我们如何做",
      "intro": [
        "零售与快消在同一条货架前相遇：品牌决定包装与价格，零售商决定排面与位置。",
        "我们把品类、包装与货架分开研究，因为这三件事由不同团队决定，节奏也不同。",
        "每项研究都围绕它要支撑的决定来设计：上哪个包装、这个价格货架能不能承受、品牌如何守住位置。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "品类与需求",
          "frame": "需求从哪来，替代了什么。",
          "cards": [
            {
              "title": "品类机会",
              "body": "把品类及相邻品类算清规模，确定需求来源与替代关系。",
              "methods": "线上问卷 · 电话访问"
            },
            {
              "title": "价格带与包装",
              "body": "在进场谈判之前，测试价格带与包装规格。",
              "methods": "包装测试 · 价格测试"
            }
          ]
        },
        {
          "n": "02",
          "name": "包装与价格",
          "frame": "包装要完成什么，价格守不守得住。",
          "cards": [
            {
              "title": "包装测试",
              "body": "用必须在货架上找到它的购物者，测试包装设计与包装上的信息。",
              "methods": "中心地点测试 · 包装素材"
            },
            {
              "title": "定价与促销",
              "body": "以购物者的支付意愿为基准，测试价格点与促销机制。",
              "methods": "价格测试 · 线上问卷"
            }
          ]
        },
        {
          "n": "03",
          "name": "货架与门店",
          "frame": "在货架前，它如何被看见。",
          "cards": [
            {
              "title": "货架可见性",
              "body": "在受控的货架布局中测试排面、陈列与位置，记录购物者第一眼找到的是什么。",
              "methods": "中心地点测试"
            },
            {
              "title": "店内体验",
              "body": "研究一次到店：购物者如何在货架前移动，什么打断了购买。",
              "methods": "深度访谈 · 消费者面访"
            }
          ]
        },
        {
          "n": "04",
          "name": "品牌与复购",
          "frame": "品牌站不站得住，买家回不回来。",
          "cards": [
            {
              "title": "品牌健康",
              "body": "追踪认知、考虑与推荐，对标的是买家真正会比较的品牌。",
              "methods": "在线追踪 · 指标固定"
            },
            {
              "title": "复购与流失",
              "body": "追踪复购，以及买家不再购买的原因。",
              "methods": "追踪 · 电话访问"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "中心地点测试",
          "在中心地点进行的包装与货架测试，货架布局按品类搭建。"
        ],
        [
          "产品与包装测试",
          "在中心地点或消费者家中，测试产品与包装。"
        ],
        [
          "消费者面访（CAPI）",
          "在中心地点或门店内进行的面对面结构访问，用于线上难以触达的购物者。"
        ],
        [
          "线上问卷",
          "面向购物者的问卷，配额按渠道、城市与品类消费设定。"
        ],
        [
          "电话访问（CATI）",
          "按脚本执行电话访问，配额按城市、渠道或客户类型设定。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "零售與快消品",
      "lead": "面向零售商與食品、飲料、日化品牌：品類如何變化、包裝要完成什麼、貨架上實際發生什麼。",
      "introKicker": "我們如何做",
      "intro": [
        "零售與快消在同一條貨架前相遇：品牌決定包裝與價格，零售商決定排面與位置。",
        "我們把品類、包裝與貨架分開研究，因為這三件事由不同團隊決定，節奏也不同。",
        "每項研究都圍繞它要支撐的決定來設計：上哪個包裝、這個價格貨架能不能承受、品牌如何守住位置。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "品類與需求",
          "frame": "需求從哪來，替代了什麼。",
          "cards": [
            {
              "title": "品類機會",
              "body": "把品類及相鄰品類算清規模，確定需求來源與替代關係。",
              "methods": "線上問卷 · 電話訪問"
            },
            {
              "title": "價格帶與包裝",
              "body": "在進場談判之前，測試價格帶與包裝規格。",
              "methods": "包裝測試 · 價格測試"
            }
          ]
        },
        {
          "n": "02",
          "name": "包裝與價格",
          "frame": "包裝要完成什麼，價格守不守得住。",
          "cards": [
            {
              "title": "包裝測試",
              "body": "用必須在貨架上找到它的購物者，測試包裝設計與包裝上的訊息。",
              "methods": "中心地點測試 · 包裝素材"
            },
            {
              "title": "定價與促銷",
              "body": "以購物者的支付意願為基準，測試價格點與促銷機制。",
              "methods": "價格測試 · 線上問卷"
            }
          ]
        },
        {
          "n": "03",
          "name": "貨架與門店",
          "frame": "在貨架前，它如何被看見。",
          "cards": [
            {
              "title": "貨架可見性",
              "body": "在受控的貨架佈局中測試排面、陳列與位置，記錄購物者第一眼找到的是什麼。",
              "methods": "中心地點測試"
            },
            {
              "title": "店內體驗",
              "body": "研究一次到店：購物者如何在貨架前移動，什麼打斷了購買。",
              "methods": "深度訪談 · 消費者面訪"
            }
          ]
        },
        {
          "n": "04",
          "name": "品牌與複購",
          "frame": "品牌站不站得住，買家回不回來。",
          "cards": [
            {
              "title": "品牌健康",
              "body": "追蹤認知、考慮與推薦，對標的是買家真正會比較的品牌。",
              "methods": "線上追蹤 · 指標固定"
            },
            {
              "title": "複購與流失",
              "body": "追蹤複購，以及買家不再購買的原因。",
              "methods": "追蹤 · 電話訪問"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "中心地點測試",
          "在中心地點進行的包裝與貨架測試，貨架佈局按品類搭建。"
        ],
        [
          "產品與包裝測試",
          "在中心地點或消費者家中，測試產品與包裝。"
        ],
        [
          "消費者面訪（CAPI）",
          "在中心地點或門店內進行的面對面結構訪問，用於線上難以觸達的購物者。"
        ],
        [
          "線上問卷",
          "面向購物者的問卷，配額按渠道、城市與品類消費設定。"
        ],
        [
          "電話訪問（CATI）",
          "按腳本執行電話訪問，配額按城市、渠道或客戶類型設定。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Retail & FMCG",
      "lead": "Research for retailers and for food, drink and household brands: how the category is changing, what the pack has to do, and what happens on the shelf.",
      "introKicker": "How we work",
      "intro": [
        "Retail and fast-moving goods meet in the same aisle: the brand decides the pack and the price, the retailer decides the space and the position.",
        "We study the category, the pack and the shelf separately, because each is decided by a different team and on a different timetable.",
        "Each study is designed around the decision it has to support: which pack to launch, what price the shelf will carry, and how the brand holds its place. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Category and demand",
          "frame": "Where the demand comes from, and what it replaces.",
          "cards": [
            {
              "title": "Category opportunity",
              "body": "Size the category and the adjacent ones, and establish where demand comes from and what it replaces.",
              "methods": "Online survey · CATI"
            },
            {
              "title": "Price tiers and pack",
              "body": "Test price tiers and pack formats before the listing negotiation.",
              "methods": "Pack tests · price tests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pack and price",
          "frame": "What the pack has to do, and whether the price holds.",
          "cards": [
            {
              "title": "Pack testing",
              "body": "Test pack design and on-pack claims with the shoppers who have to find it.",
              "methods": "Central location tests · pack stimuli"
            },
            {
              "title": "Pricing and promotion",
              "body": "Test price points and promotion mechanics against what shoppers will pay.",
              "methods": "Price tests · online survey"
            }
          ]
        },
        {
          "n": "03",
          "name": "Shelf and store",
          "frame": "How the product is seen in the aisle.",
          "cards": [
            {
              "title": "Shelf visibility",
              "body": "Test facings, blocking and shelf layout in a controlled shelf, and record what shoppers find first.",
              "methods": "Central location tests"
            },
            {
              "title": "In-store experience",
              "body": "Study the store visit: how the shopper moves through the aisle, and what interrupts the purchase.",
              "methods": "In-depth interviews · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Brand and repeat",
          "frame": "Whether the brand holds, and whether the buyer returns.",
          "cards": [
            {
              "title": "Brand health",
              "body": "Track awareness, consideration and recommendation against the brands actually compared.",
              "methods": "Online tracking · fixed measures"
            },
            {
              "title": "Repeat and churn",
              "body": "Track repeat purchase and the reasons a buyer stops.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Central location tests",
          "Pack and shelf tests run at a central location, with shelf layouts built for the category."
        ],
        [
          "Product and pack tests",
          "Product and pack tests, run at a central location or in the home."
        ],
        [
          "Consumer face-to-face (CAPI)",
          "Structured interviews at a central location or in store, for shoppers who are difficult to reach online."
        ],
        [
          "Online survey",
          "Survey of shoppers, with quotas by channel, city and category spend."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by city, channel or customer type."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "de": {
      "kicker": "Branchen",
      "title": "Einzelhandel und FMCG",
      "lead": "Forschung für Händler und für Lebensmittel-, Getränke- und Haushaltsmarken: wie sich die Kategorie verändert, was die Verpackung leisten muss und was am Regal geschieht.",
      "introKicker": "So arbeiten wir",
      "intro": [
        "Einzelhandel und Schnelldreher treffen sich im selben Gang: Die Marke entscheidet Verpackung und Preis, der Händler entscheidet Fläche und Position.",
        "Wir untersuchen Kategorie, Verpackung und Regal getrennt, weil jedes von einem anderen Team und zu einem anderen Zeitplan entschieden wird.",
        "Jede Studie wird um die Entscheidung herum konzipiert, die sie stützen soll: welche Verpackung auf den Markt kommt, welchen Preis das Regal trägt und wie die Marke ihren Platz hält. Design, Stichprobe und Bericht folgen dieser Frage."
      ],
      "stagesKicker": "Was wir untersuchen",
      "stages": [
        {
          "n": "01",
          "name": "Kategorie und Nachfrage",
          "frame": "Woher die Nachfrage kommt und was sie ersetzt.",
          "cards": [
            {
              "title": "Kategoriepotenzial",
              "body": "Die Kategorie und benachbarte Kategorien beziffern und klären, woher die Nachfrage kommt und was sie ersetzt.",
              "methods": "Online-Befragung · CATI"
            },
            {
              "title": "Preisstufen und Verpackung",
              "body": "Preisstufen und Verpackungsformate vor der Listungsverhandlung testen.",
              "methods": "Verpackungstests · Preistests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Verpackung und Preis",
          "frame": "Was die Verpackung leisten muss und ob der Preis hält.",
          "cards": [
            {
              "title": "Verpackungstest",
              "body": "Verpackungsdesign und Aussagen auf der Packung mit den Shoppern testen, die sie finden müssen.",
              "methods": "Central-Location-Tests · Verpackungsstimuli"
            },
            {
              "title": "Preis und Promotion",
              "body": "Preispunkte und Promotionsmechaniken gegen das testen, was Shopper zu zahlen bereit sind.",
              "methods": "Preistests · Online-Befragung"
            }
          ]
        },
        {
          "n": "03",
          "name": "Regal und Laden",
          "frame": "Wie das Produkt im Gang gesehen wird.",
          "cards": [
            {
              "title": "Regalsichtbarkeit",
              "body": "Facings, Blockbildung und Regalaufbau in einem kontrollierten Regal testen und festhalten, was Shopper zuerst finden.",
              "methods": "Central-Location-Tests"
            },
            {
              "title": "Einkaufserlebnis",
              "body": "Den Ladenbesuch untersuchen: wie der Shopper durch den Gang geht und was den Kauf unterbricht.",
              "methods": "Tiefeninterviews · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Marke und Wiederkauf",
          "frame": "Ob die Marke hält und ob der Käufer zurückkommt.",
          "cards": [
            {
              "title": "Markengesundheit",
              "body": "Bekanntheit, Erwägung und Weiterempfehlung gegen die tatsächlich verglichenen Marken tracken.",
              "methods": "Online-Tracking · feste Messgrößen"
            },
            {
              "title": "Wiederkauf und Abwanderung",
              "body": "Wiederkäufe und die Gründe, warum ein Käufer aufhört, verfolgen.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Was jede Methode ist und wann wir sie einsetzen.",
      "methods": [
        [
          "Central-Location-Tests",
          "Verpackungs- und Regaltests an einem zentralen Ort, mit Regalaufbauten für die Kategorie."
        ],
        [
          "Produkt- und Verpackungstests",
          "Produkt- und Verpackungstests, an einem zentralen Ort oder zu Hause."
        ],
        [
          "Consumer Face-to-Face (CAPI)",
          "Strukturierte Interviews an einem zentralen Ort oder im Laden, für Shopper, die online schwer erreichbar sind."
        ],
        [
          "Online-Befragung",
          "Befragung von Shoppern mit Quoten nach Kanal, Stadt und Kategorieausgaben."
        ],
        [
          "CATI",
          "Standardisierte Telefoninterviews mit Quoten nach Stadt, Kanal oder Kundentyp."
        ]
      ],
      "ctaTitle": "Sagen Sie uns, welche Entscheidung diese Forschung stützen soll.",
      "ctaBody": "Sie erhalten die Ergebnisse, die Belege dahinter und den empfohlenen nächsten Schritt.",
      "ctaPrimary": "Mit dem Forschungsteam sprechen",
      "ctaSecondary": "Mitmachen"
    },
    "fr": {
      "kicker": "Secteurs",
      "title": "Distribution et FMCG",
      "lead": "Études pour les distributeurs et pour les marques alimentaires, boissons et produits ménagers : comment la catégorie évolue, ce que le pack doit faire et ce qui se passe en rayon.",
      "introKicker": "Notre méthode",
      "intro": [
        "Distribution et produits de grande consommation se rencontrent dans le même rayon : la marque décide du pack et du prix, le distributeur décide de l'espace et de la position.",
        "Nous étudions la catégorie, le pack et le rayon séparément, car chacun est décidé par une équipe différente et selon un calendrier différent.",
        "Chaque étude est conçue autour de la décision qu'elle doit éclairer : quel pack lancer, quel prix le rayon peut porter et comment la marque tient sa place. Design, échantillon et rapport découlent de cette question."
      ],
      "stagesKicker": "Ce que nous étudions",
      "stages": [
        {
          "n": "01",
          "name": "Catégorie et demande",
          "frame": "D'où vient la demande, et ce qu'elle remplace.",
          "cards": [
            {
              "title": "Opportunité de catégorie",
              "body": "Dimensionner la catégorie et les catégories adjacentes, et établir d'où vient la demande et ce qu'elle remplace.",
              "methods": "Enquête en ligne · CATI"
            },
            {
              "title": "Niveaux de prix et pack",
              "body": "Tester les niveaux de prix et les formats de pack avant la négociation de référencement.",
              "methods": "Tests de pack · tests de prix"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pack et prix",
          "frame": "Ce que le pack doit faire, et si le prix tient.",
          "cards": [
            {
              "title": "Test de pack",
              "body": "Tester le design du pack et les allégations avec les shoppers qui doivent le trouver.",
              "methods": "Tests en lieu central · stimuli de pack"
            },
            {
              "title": "Prix et promotion",
              "body": "Tester les points de prix et les mécaniques promotionnelles face à ce que les shoppers sont prêts à payer.",
              "methods": "Tests de prix · enquête en ligne"
            }
          ]
        },
        {
          "n": "03",
          "name": "Rayon et magasin",
          "frame": "Comment le produit est vu dans le rayon.",
          "cards": [
            {
              "title": "Visibilité en rayon",
              "body": "Tester les facings, le bloc-marque et l'agencement dans un rayon contrôlé, et noter ce que les shoppers trouvent en premier.",
              "methods": "Tests en lieu central"
            },
            {
              "title": "Expérience en magasin",
              "body": "Étudier la visite en magasin : comment le shopper circule dans le rayon et ce qui interrompt l'achat.",
              "methods": "Entretiens approfondis · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Marque et réachat",
          "frame": "Si la marque tient, et si l'acheteur revient.",
          "cards": [
            {
              "title": "Santé de marque",
              "body": "Suivre notoriété, considération et recommandation face aux marques réellement comparées.",
              "methods": "Tracking en ligne · mesures fixes"
            },
            {
              "title": "Réachat et attrition",
              "body": "Suivre le réachat et les raisons pour lesquelles un acheteur s'arrête.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Méthodes",
      "methodsLead": "Ce qu'est chaque méthode et quand nous l'utilisons.",
      "methods": [
        [
          "Tests en lieu central",
          "Tests de pack et de rayon menés en lieu central, avec des agencements construits pour la catégorie."
        ],
        [
          "Tests produit et pack",
          "Tests produit et pack, en lieu central ou à domicile."
        ],
        [
          "Face-à-face consommateur (CAPI)",
          "Entretiens structurés en lieu central ou en magasin, pour les shoppers difficiles à joindre en ligne."
        ],
        [
          "Enquête en ligne",
          "Enquête auprès de shoppers, avec quotas par canal, ville et dépense de catégorie."
        ],
        [
          "CATI",
          "Entretiens téléphoniques scriptés, avec quotas par ville, canal ou type de client."
        ]
      ],
      "ctaTitle": "Dites-nous quelle décision cette étude doit éclairer.",
      "ctaBody": "Vous recevez les résultats, les preuves qui les sous-tendent et la prochaine étape recommandée.",
      "ctaPrimary": "Parler à l'équipe",
      "ctaSecondary": "Nous rejoindre"
    },
    "nl": {
      "kicker": "Sectoren",
      "title": "Retail en FMCG",
      "lead": "Onderzoek voor retailers en voor food-, drank- en huishoudmerken: hoe de categorie verandert, wat de verpakking moet doen en wat er in het schap gebeurt.",
      "introKicker": "Zo werken we",
      "intro": [
        "Retail en fastmoving ontmoeten elkaar in hetzelfde gangpad: het merk bepaalt de verpakking en de prijs, de retailer bepaalt de ruimte en de positie.",
        "We onderzoeken categorie, verpakking en schap apart, omdat elk door een ander team en volgens een andere planning wordt besloten.",
        "Elke studie wordt opgebouwd rond de beslissing die zij moet ondersteunen: welke verpakking te lanceren, welke prijs het schap draagt en hoe het merk zijn plek houdt. Ontwerp, steekproef en rapportage volgen die vraag."
      ],
      "stagesKicker": "Wat we onderzoeken",
      "stages": [
        {
          "n": "01",
          "name": "Categorie en vraag",
          "frame": "Waar de vraag vandaan komt en wat zij vervangt.",
          "cards": [
            {
              "title": "Categoriekans",
              "body": "De categorie en aangrenzende categorieën kwantificeren en vaststellen waar de vraag vandaan komt en wat zij vervangt.",
              "methods": "Online-enquête · CATI"
            },
            {
              "title": "Prijsniveaus en verpakking",
              "body": "Prijsniveaus en verpakkingsformaten testen vóór de listingonderhandeling.",
              "methods": "Verpakkingstests · prijstests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Verpakking en prijs",
          "frame": "Wat de verpakking moet doen en of de prijs houdt.",
          "cards": [
            {
              "title": "Verpakkingstest",
              "body": "Verpakkingsontwerp en claims op de verpakking testen met de shoppers die het moeten vinden.",
              "methods": "Central-locationtests · verpakkingsstimuli"
            },
            {
              "title": "Prijs en promotie",
              "body": "Prijs punten en promotiemechanieken testen tegen wat shoppers willen betalen.",
              "methods": "Prijs tests · online-enquête"
            }
          ]
        },
        {
          "n": "03",
          "name": "Schap en winkel",
          "frame": "Hoe het product in het gangpad wordt gezien.",
          "cards": [
            {
              "title": "Zichtbaarheid in het schap",
              "body": "Facings, blokvorming en schapindeling testen in een gecontroleerd schap en vastleggen wat shoppers het eerst vinden.",
              "methods": "Central-locationtests"
            },
            {
              "title": "Winkelervaring",
              "body": "Het winkelbezoek onderzoeken: hoe de shopper door het gangpad beweegt en wat de aankoop onderbreekt.",
              "methods": "Diepte-interviews · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Merk en herhaalaankoop",
          "frame": "Of het merk houdt en of de koper terugkomt.",
          "cards": [
            {
              "title": "Merkgezondheid",
              "body": "Bekendheid, overweging en aanbeveling volgen tegen de merken die daadwerkelijk worden vergeleken.",
              "methods": "Online tracking · vaste maten"
            },
            {
              "title": "Herhaalaankoop en uitstroom",
              "body": "Herhaalaankopen volgen en de redenen waarom een koper stopt.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Wat elke methode is en wanneer we die gebruiken.",
      "methods": [
        [
          "Central-locationtests",
          "Verpakkings- en schaptests op een centrale locatie, met schapopstellingen voor de categorie."
        ],
        [
          "Product- en verpakkingstests",
          "Product- en verpakkingstests, op een centrale locatie of thuis."
        ],
        [
          "Consumer face-to-face (CAPI)",
          "Gestructureerde interviews op een centrale locatie of in de winkel, voor shoppers die online moeilijk bereikbaar zijn."
        ],
        [
          "Online-enquête",
          "Enquête onder shoppers, met quota naar kanaal, stad en categoriebesteding."
        ],
        [
          "CATI",
          "Gescripte telefonische interviews, met quota naar stad, kanaal of klanttype."
        ]
      ],
      "ctaTitle": "Vertel ons welke beslissing dit onderzoek moet ondersteunen.",
      "ctaBody": "U ontvangt de resultaten, het bewijs erachter en de aanbevolen volgende stap.",
      "ctaPrimary": "Praat met het onderzoeksteam",
      "ctaSecondary": "Doe mee"
    },
    "da": {
      "kicker": "Brancher",
      "title": "Detail og FMCG",
      "lead": "Research for detailhandlere og for fødevare-, drikkevare- og husholdningsmærker: hvordan kategorien ændrer sig, hvad pakken skal gøre, og hvad der sker på hylden.",
      "introKicker": "Sådan arbejder vi",
      "intro": [
        "Detail og dagligvarer mødes i samme gang: mærket beslutter pakken og prisen, detailhandleren beslutter pladsen og placeringen.",
        "Vi undersøger kategori, pakke og hylde hver for sig, fordi hver besluttes af et andet team og efter en anden tidsplan.",
        "Hver undersøgelse designes om den beslutning, den skal understøtte: hvilken pakke der skal lanceres, hvilken pris hylden bærer, og hvordan mærket holder sin plads. Design, stikprøve og rapportering følger det spørgsmål."
      ],
      "stagesKicker": "Hvad vi undersøger",
      "stages": [
        {
          "n": "01",
          "name": "Kategori og efterspørgsel",
          "frame": "Hvor efterspørgslen kommer fra, og hvad den erstatter.",
          "cards": [
            {
              "title": "Kategorimulighed",
              "body": "Størrelsesbestem kategorien og nabokategorierne, og fastslå, hvor efterspørgslen kommer fra, og hvad den erstatter.",
              "methods": "Onlineundersøgelse · CATI"
            },
            {
              "title": "Prisniveauer og pakke",
              "body": "Test prisniveauer og pakkeformater før forhandlingen om listing.",
              "methods": "Pakketests · pristests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pakke og pris",
          "frame": "Hvad pakken skal gøre, og om prisen holder.",
          "cards": [
            {
              "title": "Pakketest",
              "body": "Test pakkedesign og påstande på pakken med de shoppere, der skal finde den.",
              "methods": "Central location tests · pakkestimuli"
            },
            {
              "title": "Pris og promotion",
              "body": "Test prispunkter og promotionsmekanikker mod det, shoppere vil betale.",
              "methods": "Pristests · onlineundersøgelse"
            }
          ]
        },
        {
          "n": "03",
          "name": "Hylde og butik",
          "frame": "Hvordan produktet ses i gangen.",
          "cards": [
            {
              "title": "Synlighed på hylden",
              "body": "Test facings, blokdannelse og hylde layout i en kontrolleret hylde, og notér, hvad shoppere finder først.",
              "methods": "Central location tests"
            },
            {
              "title": "Butiksoplevelse",
              "body": "Undersøg butiksbesøget: hvordan shopperen bevæger sig gennem gangen, og hvad der afbryder købet.",
              "methods": "Dybdeinterviews · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Mærke og genkøb",
          "frame": "Om mærket holder, og om køberen vender tilbage.",
          "cards": [
            {
              "title": "Mærkesundhed",
              "body": "Følg kendskab, overvejelse og anbefaling mod de mærker, der faktisk sammenlignes.",
              "methods": "Online tracking · faste mål"
            },
            {
              "title": "Genkøb og frafald",
              "body": "Følg genkøb og årsagerne til, at en køber stopper.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hvad hver metode er, og hvornår vi bruger den.",
      "methods": [
        [
          "Central location tests",
          "Pakke- og hyldetests på en central lokalitet, med hyldeopstillinger bygget til kategorien."
        ],
        [
          "Produkt- og pakketests",
          "Produkt- og pakketests, på en central lokalitet eller i hjemmet."
        ],
        [
          "Consumer face-to-face (CAPI)",
          "Strukturerede interviews på en central lokalitet eller i butik, for shoppere der er svære at nå online."
        ],
        [
          "Onlineundersøgelse",
          "Undersøgelse blandt shoppere med kvoter efter kanal, by og kategoriforbrug."
        ],
        [
          "CATI",
          "Scriptede telefoninterviews med kvoter efter by, kanal eller kundetype."
        ]
      ],
      "ctaTitle": "Fortæl os, hvilken beslutning denne research skal understøtte.",
      "ctaBody": "Du får resultaterne, belægget bag dem og det anbefalede næste skridt.",
      "ctaPrimary": "Tal med researchteamet",
      "ctaSecondary": "Vær med"
    },
    "es": {
      "kicker": "Sectores",
      "title": "Retail y gran consumo",
      "lead": "Investigación para minoristas y para marcas de alimentación, bebidas y hogar: cómo cambia la categoría, qué debe hacer el envase y qué ocurre en el lineal.",
      "introKicker": "Cómo trabajamos",
      "intro": [
        "Retail y gran consumo se encuentran en el mismo pasillo: la marca decide el envase y el precio, el minorista decide el espacio y la posición.",
        "Estudiamos categoría, envase y lineal por separado, porque cada uno lo decide un equipo distinto y con un calendario distinto.",
        "Cada estudio se diseña en torno a la decisión que debe sostener: qué envase lanzar, qué precio soporta el lineal y cómo la marca mantiene su lugar. El diseño, la muestra y el informe se derivan de esa pregunta."
      ],
      "stagesKicker": "Qué estudiamos",
      "stages": [
        {
          "n": "01",
          "name": "Categoría y demanda",
          "frame": "De dónde viene la demanda y qué sustituye.",
          "cards": [
            {
              "title": "Oportunidad de categoría",
              "body": "Dimensionar la categoría y las adyacentes, y establecer de dónde viene la demanda y qué sustituye.",
              "methods": "Encuesta online · CATI"
            },
            {
              "title": "Niveles de precio y envase",
              "body": "Probar niveles de precio y formatos de envase antes de la negociación del listado.",
              "methods": "Pruebas de envase · pruebas de precio"
            }
          ]
        },
        {
          "n": "02",
          "name": "Envase y precio",
          "frame": "Qué debe hacer el envase y si el precio se sostiene.",
          "cards": [
            {
              "title": "Prueba de envase",
              "body": "Probar el diseño del envase y las alegaciones con los compradores que tienen que encontrarlo.",
              "methods": "Pruebas en ubicación central · estímulos de envase"
            },
            {
              "title": "Precio y promoción",
              "body": "Probar puntos de precio y mecánicas promocionales frente a lo que los compradores pagarán.",
              "methods": "Pruebas de precio · encuesta online"
            }
          ]
        },
        {
          "n": "03",
          "name": "Lineal y tienda",
          "frame": "Cómo se ve el producto en el pasillo.",
          "cards": [
            {
              "title": "Visibilidad en el lineal",
              "body": "Probar facings, bloqueo y disposición del lineal en un lineal controlado, y registrar qué encuentran primero los compradores.",
              "methods": "Pruebas en ubicación central"
            },
            {
              "title": "Experiencia en tienda",
              "body": "Estudiar la visita a la tienda: cómo se mueve el comprador por el pasillo y qué interrumpe la compra.",
              "methods": "Entrevistas en profundidad · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Marca y recompra",
          "frame": "Si la marca aguanta y si el comprador vuelve.",
          "cards": [
            {
              "title": "Salud de marca",
              "body": "Seguir notoriedad, consideración y recomendación frente a las marcas realmente comparadas.",
              "methods": "Tracking online · medidas fijas"
            },
            {
              "title": "Recompra y abandono",
              "body": "Seguir la recompra y los motivos por los que un comprador deja de comprar.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "Qué es cada método y cuándo lo usamos.",
      "methods": [
        [
          "Pruebas en ubicación central",
          "Pruebas de envase y lineal en una ubicación central, con lineales construidos para la categoría."
        ],
        [
          "Pruebas de producto y envase",
          "Pruebas de producto y envase, en ubicación central o en el hogar."
        ],
        [
          "Consumidor cara a cara (CAPI)",
          "Entrevistas estructuradas en ubicación central o en tienda, para compradores difíciles de alcanzar online."
        ],
        [
          "Encuesta online",
          "Encuesta a compradores, con cuotas por canal, ciudad y gasto en la categoría."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, con cuotas por ciudad, canal o tipo de cliente."
        ]
      ],
      "ctaTitle": "Cuéntenos qué decisión debe sostener esta investigación.",
      "ctaBody": "Recibe los resultados, las pruebas que los sostienen y el siguiente paso recomendado.",
      "ctaPrimary": "Hablar con el equipo",
      "ctaSecondary": "Únete"
    },
    "fi": {
      "kicker": "Toimialat",
      "title": "Vähittäiskauppa ja FMCG",
      "lead": "Tutkimusta vähittäiskauppiaille ja elintarvike-, juoma- ja kotitalousbrändeille: miten kategoria muuttuu, mitä pakkauksen on tehtävä ja mitä hyllyssä tapahtuu.",
      "introKicker": "Näin työskentelemme",
      "intro": [
        "Vähittäiskauppa ja nopeasti liikkuvat tuotteet kohtaavat samassa käytävässä: brändi päättää pakkauksen ja hinnan, kauppias tilan ja sijoittelun.",
        "Tutkimme kategoriaa, pakkausta ja hyllyä erikseen, koska jokaisesta päättää eri tiimi ja eri aikataululla.",
        "Jokainen tutkimus rakennetaan sen päätöksen ympärille, jota sen on tuettava: mikä pakkaus lanseerataan, minkä hinnan hylly kantaa ja miten brändi pitää paikkansa. Suunnittelu, otos ja raportointi seuraavat tätä kysymystä."
      ],
      "stagesKicker": "Mitä tutkimme",
      "stages": [
        {
          "n": "01",
          "name": "Kategoria ja kysyntä",
          "frame": "Mistä kysyntä tulee ja mitä se korvaa.",
          "cards": [
            {
              "title": "Kategoriamahdollisuus",
              "body": "Mitoita kategoria ja lähikategoriat ja selvitä, mistä kysyntä tulee ja mitä se korvaa.",
              "methods": "Verkkokysely · CATI"
            },
            {
              "title": "Hintaportaat ja pakkaus",
              "body": "Testaa hintaportaat ja pakkausformaatit ennen listausneuvottelua.",
              "methods": "Pakkaustestit · hintatestit"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pakkaus ja hinta",
          "frame": "Mitä pakkauksen on tehtävä ja pitääkö hinta.",
          "cards": [
            {
              "title": "Pakkaustesti",
              "body": "Testaa pakkausdesign ja pakkauksen väitteet ostajilla, joiden on löydettävä se.",
              "methods": "Central location -testit · pakkausärsykkeet"
            },
            {
              "title": "Hinta ja promootio",
              "body": "Testaa hintapisteet ja promootiomekaniikat sitä vastaan, mitä ostajat maksavat.",
              "methods": "Hintatestit · verkkokysely"
            }
          ]
        },
        {
          "n": "03",
          "name": "Hylly ja myymälä",
          "frame": "Miten tuote nähdään käytävässä.",
          "cards": [
            {
              "title": "Näkyvyys hyllyssä",
              "body": "Testaa facings, blokkaus ja hyllyasettelu kontrolloidussa hyllyssä ja kirjaa, mitä ostajat löytävät ensin.",
              "methods": "Central location -testit"
            },
            {
              "title": "Myymäläkokemus",
              "body": "Tutki myymäläkäyntiä: miten ostaja liikkuu käytävässä ja mikä keskeyttää oston.",
              "methods": "Syvähaastattelut · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Brändi ja uusintaosto",
          "frame": "Pitääkö brändi ja palaako ostaja.",
          "cards": [
            {
              "title": "Brändin terveys",
              "body": "Seuraa tunnettuutta, harkintaa ja suosittelua niitä brändejä vastaan, joita todella verrataan.",
              "methods": "Verkkotracking · kiinteät mittarit"
            },
            {
              "title": "Uusintaosto ja menetys",
              "body": "Seuraa uusintaostoja ja syitä, miksi ostaja lopettaa.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Menetelmät",
      "methodsLead": "Mikä kukin menetelmä on ja milloin käytämme sitä.",
      "methods": [
        [
          "Central location -testit",
          "Pakkaus- ja hyllytestit keskitetyssä tilassa, kategorialle rakennetuin hyllyin."
        ],
        [
          "Tuote- ja pakkaustestit",
          "Tuote- ja pakkaustestit keskitetyssä tilassa tai kotona."
        ],
        [
          "Consumer face-to-face (CAPI)",
          "Jäsennellyt haastattelut keskitetyssä tilassa tai myymälässä ostajille, joita on vaikea tavoittaa verkossa."
        ],
        [
          "Verkkokysely",
          "Kysely ostajille, kiintiöt kanavan, kaupungin ja kategoriakulutuksen mukaan."
        ],
        [
          "CATI",
          "Käsikirjoitetut puhelinhaastattelut, kiintiöt kaupungin, kanavan tai asiakastyypin mukaan."
        ]
      ],
      "ctaTitle": "Kerro meille, mitä päätöstä tämän tutkimuksen on tuettava.",
      "ctaBody": "Saat tulokset, niiden taustalla olevan näytön ja suositellun seuraavan askeleen.",
      "ctaPrimary": "Keskustele tutkimustiimin kanssa",
      "ctaSecondary": "Liity mukaan"
    },
    "it": {
      "kicker": "Settori",
      "title": "Retail e largo consumo",
      "lead": "Ricerche per retailer e per marchi food, beverage e casa: come cambia la categoria, cosa deve fare il pack e cosa accade sullo scaffale.",
      "introKicker": "Come lavoriamo",
      "intro": [
        "Retail e largo consumo si incontrano nello stesso corridoio: il marchio decide pack e prezzo, il retailer decide spazio e posizione.",
        "Studiamo categoria, pack e scaffale separatamente, perché ciascuno è deciso da un team diverso e con tempi diversi.",
        "Ogni studio è costruito attorno alla decisione che deve sostenere: quale pack lanciare, quale prezzo lo scaffale sostiene e come il marchio mantiene il suo posto. Disegno, campione e report discendono da quella domanda."
      ],
      "stagesKicker": "Cosa studiamo",
      "stages": [
        {
          "n": "01",
          "name": "Categoria e domanda",
          "frame": "Da dove viene la domanda e cosa sostituisce.",
          "cards": [
            {
              "title": "Opportunità di categoria",
              "body": "Dimensionare la categoria e quelle adiacenti, e stabilire da dove viene la domanda e cosa sostituisce.",
              "methods": "Indagine online · CATI"
            },
            {
              "title": "Fasce di prezzo e pack",
              "body": "Testare fasce di prezzo e formati di pack prima della negoziazione di listing.",
              "methods": "Test di pack · test di prezzo"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pack e prezzo",
          "frame": "Cosa deve fare il pack e se il prezzo tiene.",
          "cards": [
            {
              "title": "Test di pack",
              "body": "Testare design del pack e claim con gli shopper che devono trovarlo.",
              "methods": "Test in location centrale · stimoli di pack"
            },
            {
              "title": "Prezzo e promozione",
              "body": "Testare punti di prezzo e meccaniche promozionali rispetto a quanto gli shopper sono disposti a pagare.",
              "methods": "Test di prezzo · indagine online"
            }
          ]
        },
        {
          "n": "03",
          "name": "Scaffale e punto vendita",
          "frame": "Come il prodotto viene visto nel corridoio.",
          "cards": [
            {
              "title": "Visibilità a scaffale",
              "body": "Testare facings, blocking e layout in uno scaffale controllato, e registrare cosa trovano prima gli shopper.",
              "methods": "Test in location centrale"
            },
            {
              "title": "Esperienza in store",
              "body": "Studiare la visita: come lo shopper si muove nel corridoio e cosa interrompe l'acquisto.",
              "methods": "Interviste in profondità · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Marchio e riacquisto",
          "frame": "Se il marchio tiene e se l'acquirente torna.",
          "cards": [
            {
              "title": "Salute del marchio",
              "body": "Monitorare notorietà, considerazione e raccomandazione rispetto ai marchi realmente confrontati.",
              "methods": "Tracking online · misure fisse"
            },
            {
              "title": "Riacquisto e abbandono",
              "body": "Monitorare il riacquisto e i motivi per cui un acquirente smette.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metodi",
      "methodsLead": "Che cos'è ogni metodo e quando lo usiamo.",
      "methods": [
        [
          "Test in location centrale",
          "Test di pack e scaffale in location centrale, con espositori costruiti per la categoria."
        ],
        [
          "Test di prodotto e pack",
          "Test di prodotto e pack, in location centrale o a casa."
        ],
        [
          "Consumatore face-to-face (CAPI)",
          "Interviste strutturate in location centrale o in store, per shopper difficili da raggiungere online."
        ],
        [
          "Indagine online",
          "Indagine su shopper, con quote per canale, città e spesa di categoria."
        ],
        [
          "CATI",
          "Interviste telefoniche scriptate, con quote per città, canale o tipo di cliente."
        ]
      ],
      "ctaTitle": "Dicci quale decisione deve sostenere questa ricerca.",
      "ctaBody": "Ricevi i risultati, le prove che li sostengono e il prossimo passo consigliato.",
      "ctaPrimary": "Parla con il team di ricerca",
      "ctaSecondary": "Unisciti"
    },
    "ja": {
      "kicker": "業界",
      "title": "小売と日用品",
      "lead": "小売事業者と、食品・飲料・家庭用品ブランド向けの調査：カテゴリーがどう変わり、パッケージが何を担い、棚で何が起きるか。",
      "introKicker": "進め方",
      "intro": [
        "小売と日用品は同じ売り場で出会います。ブランドがパッケージと価格を、小売が場所と位置を決めます。",
        "カテゴリー、パッケージ、棚を分けて調べます。それぞれ別のチームが、別の時間軸で決めるからです。",
        "各調査は、それが支えるべき意思決定を中心に設計します。どのパッケージを出すのか、棚がどの価格を支えるのか、ブランドがどう地位を保つのか。設計・サンプル・報告はこの問いから決まります。"
      ],
      "stagesKicker": "調査する内容",
      "stages": [
        {
          "n": "01",
          "name": "カテゴリーと需要",
          "frame": "需要がどこから来て、何を置き換えるのか。",
          "cards": [
            {
              "title": "カテゴリー機会",
              "body": "カテゴリーと隣接カテゴリーの規模を測り、需要がどこから来て何を置き換えるのかを明らかにします。",
              "methods": "オンライン調査 · CATI"
            },
            {
              "title": "価格帯とパッケージ",
              "body": "取引条件の交渉前に、価格帯とパッケージ形態をテストします。",
              "methods": "パッケージテスト · 価格テスト"
            }
          ]
        },
        {
          "n": "02",
          "name": "パッケージと価格",
          "frame": "パッケージが何をすべきか、価格が持つか。",
          "cards": [
            {
              "title": "パッケージテスト",
              "body": "見つけなければならない買い物客とともに、パッケージデザインと表示をテストします。",
              "methods": "セントラルロケーション調査 · パッケージ刺激"
            },
            {
              "title": "価格と販促",
              "body": "買い物客が支払う額に対して、価格帯と販促の仕組みをテストします。",
              "methods": "価格テスト · オンライン調査"
            }
          ]
        },
        {
          "n": "03",
          "name": "棚と店頭",
          "frame": "売り場で商品がどう見えるか。",
          "cards": [
            {
              "title": "棚での見え方",
              "body": "管理された棚でフェイシング、ブロッキング、棚割りをテストし、買い物客が最初に見つけるものを記録します。",
              "methods": "セントラルロケーション調査"
            },
            {
              "title": "店頭体験",
              "body": "来店を調べます。買い物客が売り場をどう動き、何が購入を中断させるか。",
              "methods": "デプスインタビュー · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "ブランドと再購入",
          "frame": "ブランドが持つか、買い手が戻るか。",
          "cards": [
            {
              "title": "ブランドの健全性",
              "body": "実際に比較されるブランドに対して、認知・検討・推奨を追跡します。",
              "methods": "オンライントラッキング · 固定指標"
            },
            {
              "title": "再購入と離脱",
              "body": "再購入と、買い手がやめる理由を追跡します。",
              "methods": "トラッキング · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "手法",
      "methodsLead": "各手法の内容と、使う場面。",
      "methods": [
        [
          "セントラルロケーション調査",
          "カテゴリー向けに棚を組んだセントラルロケーションで、パッケージと棚のテストを行います。"
        ],
        [
          "製品・パッケージテスト",
          "製品とパッケージのテスト。セントラルロケーションまたは自宅で実施します。"
        ],
        [
          "消費者対面調査（CAPI）",
          "セントラルロケーションまたは店頭での構造化インタビュー。オンラインで届きにくい買い物客向けです。"
        ],
        [
          "オンライン調査",
          "買い物客調査。チャネル、都市、カテゴリー支出で割り付けます。"
        ],
        [
          "CATI",
          "スクリプトに沿った電話調査。都市、チャネル、顧客タイプで割り付けます。"
        ]
      ],
      "ctaTitle": "この調査が支えるべき意思決定をお聞かせください。",
      "ctaBody": "結果、その根拠、推奨する次の一手をお渡しします。",
      "ctaPrimary": "調査チームに相談する",
      "ctaSecondary": "参加する"
    },
    "ko": {
      "kicker": "산업",
      "title": "유통과 생활용품",
      "lead": "유통 사업자와 식품·음료·가정용품 브랜드를 위한 조사: 카테고리가 어떻게 변하는지, 패키지가 무엇을 해야 하는지, 매대에서 무슨 일이 일어나는지.",
      "introKicker": "일하는 방식",
      "intro": [
        "유통과 생활용품은 같은 통로에서 만납니다. 브랜드는 패키지와 가격을, 유통은 진열 공간과 위치를 결정합니다.",
        "카테고리, 패키지, 매대를 따로 조사합니다. 각각 다른 팀이 다른 일정으로 결정하기 때문입니다.",
        "각 조사는 그것이 뒷받침해야 할 결정을 중심으로 설계합니다. 어떤 패키지를 출시할지, 매대가 어떤 가격을 감당할지, 브랜드가 어떻게 자리를 지킬지. 설계, 표본, 보고는 이 질문에서 나옵니다."
      ],
      "stagesKicker": "무엇을 조사하는가",
      "stages": [
        {
          "n": "01",
          "name": "카테고리와 수요",
          "frame": "수요가 어디서 오고 무엇을 대체하는가.",
          "cards": [
            {
              "title": "카테고리 기회",
              "body": "카테고리와 인접 카테고리의 규모를 측정하고 수요가 어디서 오며 무엇을 대체하는지 밝힙니다.",
              "methods": "온라인 조사 · CATI"
            },
            {
              "title": "가격대와 패키지",
              "body": "입점 협상 전에 가격대와 패키지 형태를 테스트합니다.",
              "methods": "패키지 테스트 · 가격 테스트"
            }
          ]
        },
        {
          "n": "02",
          "name": "패키지와 가격",
          "frame": "패키지가 무엇을 해야 하는지, 가격이 버티는지.",
          "cards": [
            {
              "title": "패키지 테스트",
              "body": "찾아야 하는 구매자와 함께 패키지 디자인과 표시 문구를 테스트합니다.",
              "methods": "센트럴 로케이션 테스트 · 패키지 자극물"
            },
            {
              "title": "가격과 프로모션",
              "body": "구매자가 지불할 금액에 맞춰 가격대와 프로모션 방식을 테스트합니다.",
              "methods": "가격 테스트 · 온라인 조사"
            }
          ]
        },
        {
          "n": "03",
          "name": "매대와 매장",
          "frame": "통로에서 상품이 어떻게 보이는가.",
          "cards": [
            {
              "title": "매대 가시성",
              "body": "통제된 매대에서 페이싱, 블로킹, 진열을 테스트하고 구매자가 무엇을 먼저 찾는지 기록합니다.",
              "methods": "센트럴 로케이션 테스트"
            },
            {
              "title": "매장 경험",
              "body": "매장 방문을 조사합니다. 구매자가 통로를 어떻게 이동하고 무엇이 구매를 끊는지.",
              "methods": "심층 인터뷰 · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "브랜드와 재구매",
          "frame": "브랜드가 버티는지, 구매자가 돌아오는지.",
          "cards": [
            {
              "title": "브랜드 건강도",
              "body": "실제로 비교되는 브랜드를 기준으로 인지, 고려, 추천을 추적합니다.",
              "methods": "온라인 트래킹 · 고정 지표"
            },
            {
              "title": "재구매와 이탈",
              "body": "재구매와 구매자가 그만두는 이유를 추적합니다.",
              "methods": "트래킹 · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "방법",
      "methodsLead": "각 방법이 무엇이고 언제 쓰는가.",
      "methods": [
        [
          "센트럴 로케이션 테스트",
          "카테고리에 맞춰 매대를 구성한 센트럴 로케이션에서 패키지와 매대 테스트를 진행합니다."
        ],
        [
          "제품·패키지 테스트",
          "제품과 패키지 테스트. 센트럴 로케이션 또는 가정에서 진행합니다."
        ],
        [
          "소비자 대면 조사(CAPI)",
          "센트럴 로케이션이나 매장에서의 구조화 인터뷰. 온라인으로 닿기 어려운 구매자 대상입니다."
        ],
        [
          "온라인 조사",
          "구매자 조사. 채널, 도시, 카테고리 지출로 할당합니다."
        ],
        [
          "CATI",
          "스크립트 기반 전화 조사. 도시, 채널, 고객 유형으로 할당합니다."
        ]
      ],
      "ctaTitle": "이 조사가 뒷받침해야 할 결정을 알려주세요.",
      "ctaBody": "결과, 그 근거, 권장하는 다음 단계를 받습니다.",
      "ctaPrimary": "조사팀과 상담하기",
      "ctaSecondary": "참여하기"
    },
    "no": {
      "kicker": "Bransjer",
      "title": "Handel og dagligvarer",
      "lead": "Forskning for handelsaktører og for mat-, drikke- og husholdningsmerker: hvordan kategorien endrer seg, hva emballasjen må gjøre, og hva som skjer i hyllen.",
      "introKicker": "Slik arbeider vi",
      "intro": [
        "Handel og dagligvarer møtes i samme gang: merket bestemmer emballasjen og prisen, handelsaktøren bestemmer plassen og posisjonen.",
        "Vi undersøker kategori, emballasje og hylle hver for seg, fordi hver av dem besluttes av et annet team og etter en annen tidsplan.",
        "Hver studie designes rundt beslutningen den skal støtte: hvilken emballasje som skal lanseres, hvilken pris hyllen tåler, og hvordan merket holder plassen sin. Design, utvalg og rapportering følger dette spørsmålet."
      ],
      "stagesKicker": "Hva vi undersøker",
      "stages": [
        {
          "n": "01",
          "name": "Kategori og etterspørsel",
          "frame": "Hvor etterspørselen kommer fra, og hva den erstatter.",
          "cards": [
            {
              "title": "Kategorimulighet",
              "body": "Dimensjoner kategorien og nabokategoriene, og fastslå hvor etterspørselen kommer fra og hva den erstatter.",
              "methods": "Nettundersøkelse · CATI"
            },
            {
              "title": "Prisnivåer og emballasje",
              "body": "Test prisnivåer og emballasjeformater før forhandlingen om listing.",
              "methods": "Emballasjetester · pristester"
            }
          ]
        },
        {
          "n": "02",
          "name": "Emballasje og pris",
          "frame": "Hva emballasjen må gjøre, og om prisen holder.",
          "cards": [
            {
              "title": "Emballasjetest",
              "body": "Test emballasjedesign og påstander med kjøperne som må finne den.",
              "methods": "Central location-tester · emballasjestimuli"
            },
            {
              "title": "Pris og kampanje",
              "body": "Test prispunkter og kampanjemekanikker mot det kjøperne vil betale.",
              "methods": "Pristester · nettundersøkelse"
            }
          ]
        },
        {
          "n": "03",
          "name": "Hylle og butikk",
          "frame": "Hvordan produktet ses i gangen.",
          "cards": [
            {
              "title": "Synlighet i hyllen",
              "body": "Test facings, blokkering og hylleoppsett i en kontrollert hylle, og registrer hva kjøperne finner først.",
              "methods": "Central location-tester"
            },
            {
              "title": "Butikkopplevelse",
              "body": "Undersøk butikkbesøket: hvordan kjøperen beveger seg gjennom gangen, og hva som avbryter kjøpet.",
              "methods": "Dybdeintervjuer · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Merke og gjenkjøp",
          "frame": "Om merket holder, og om kjøperen kommer tilbake.",
          "cards": [
            {
              "title": "Merkehelse",
              "body": "Følg kjennskap, vurdering og anbefaling mot merkene som faktisk sammenlignes.",
              "methods": "Nettracking · faste mål"
            },
            {
              "title": "Gjenkjøp og frafall",
              "body": "Følg gjenkjøp og årsakene til at en kjøper slutter.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hva hver metode er, og når vi bruker den.",
      "methods": [
        [
          "Central location-tester",
          "Emballasje- og hylletester på et sentralt sted, med hylleoppsett bygget for kategorien."
        ],
        [
          "Produkt- og emballasjetester",
          "Produkt- og emballasjetester, på et sentralt sted eller hjemme."
        ],
        [
          "Forbruker ansikt til ansikt (CAPI)",
          "Strukturerte intervjuer på et sentralt sted eller i butikk, for kjøpere som er vanskelige å nå på nett."
        ],
        [
          "Nettundersøkelse",
          "Undersøkelse blant kjøpere, med kvoter etter kanal, by og kategoriforbruk."
        ],
        [
          "CATI",
          "Skriptede telefonintervjuer, med kvoter etter by, kanal eller kundetype."
        ]
      ],
      "ctaTitle": "Fortell oss hvilken beslutning denne forskningen skal støtte.",
      "ctaBody": "Du får funnene, belegget bak dem og anbefalt neste steg.",
      "ctaPrimary": "Snakk med forskerteamet",
      "ctaSecondary": "Bli med"
    },
    "pt": {
      "kicker": "Setores",
      "title": "Retalho e grande consumo",
      "lead": "Investigação para retalhistas e para marcas de alimentação, bebidas e casa: como a categoria está a mudar, o que a embalagem tem de fazer e o que acontece na prateleira.",
      "introKicker": "Como trabalhamos",
      "intro": [
        "Retalho e grande consumo encontram-se no mesmo corredor: a marca decide a embalagem e o preço, o retalhista decide o espaço e a posição.",
        "Estudamos categoria, embalagem e prateleira em separado, porque cada uma é decidida por uma equipa diferente e num calendário diferente.",
        "Cada estudo é desenhado em torno da decisão que tem de sustentar: que embalagem lançar, que preço a prateleira suporta e como a marca mantém o seu lugar. Desenho, amostra e relatório decorrem dessa pergunta."
      ],
      "stagesKicker": "O que estudamos",
      "stages": [
        {
          "n": "01",
          "name": "Categoria e procura",
          "frame": "De onde vem a procura e o que substitui.",
          "cards": [
            {
              "title": "Oportunidade de categoria",
              "body": "Dimensionar a categoria e as adjacentes, e estabelecer de onde vem a procura e o que substitui.",
              "methods": "Inquérito online · CATI"
            },
            {
              "title": "Níveis de preço e embalagem",
              "body": "Testar níveis de preço e formatos de embalagem antes da negociação de listagem.",
              "methods": "Testes de embalagem · testes de preço"
            }
          ]
        },
        {
          "n": "02",
          "name": "Embalagem e preço",
          "frame": "O que a embalagem tem de fazer e se o preço se mantém.",
          "cards": [
            {
              "title": "Teste de embalagem",
              "body": "Testar o design da embalagem e as alegações com os compradores que a têm de encontrar.",
              "methods": "Testes em local central · estímulos de embalagem"
            },
            {
              "title": "Preço e promoção",
              "body": "Testar pontos de preço e mecânicas promocionais face ao que os compradores pagam.",
              "methods": "Testes de preço · inquérito online"
            }
          ]
        },
        {
          "n": "03",
          "name": "Prateleira e loja",
          "frame": "Como o produto é visto no corredor.",
          "cards": [
            {
              "title": "Visibilidade na prateleira",
              "body": "Testar facings, bloqueio e disposição numa prateleira controlada, e registar o que os compradores encontram primeiro.",
              "methods": "Testes em local central"
            },
            {
              "title": "Experiência em loja",
              "body": "Estudar a visita: como o comprador se move no corredor e o que interrompe a compra.",
              "methods": "Entrevistas em profundidade · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Marca e recompra",
          "frame": "Se a marca aguenta e se o comprador volta.",
          "cards": [
            {
              "title": "Saúde de marca",
              "body": "Acompanhar notoriedade, consideração e recomendação face às marcas realmente comparadas.",
              "methods": "Tracking online · medidas fixas"
            },
            {
              "title": "Recompra e abandono",
              "body": "Acompanhar a recompra e as razões pelas quais um comprador pára.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "O que é cada método e quando o usamos.",
      "methods": [
        [
          "Testes em local central",
          "Testes de embalagem e prateleira em local central, com expositores construídos para a categoria."
        ],
        [
          "Testes de produto e embalagem",
          "Testes de produto e embalagem, em local central ou em casa."
        ],
        [
          "Consumidor cara a cara (CAPI)",
          "Entrevistas estruturadas em local central ou em loja, para compradores difíceis de alcançar online."
        ],
        [
          "Inquérito online",
          "Inquérito a compradores, com quotas por canal, cidade e despesa na categoria."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, com quotas por cidade, canal ou tipo de cliente."
        ]
      ],
      "ctaTitle": "Diga-nos que decisão esta investigação tem de sustentar.",
      "ctaBody": "Recebe os resultados, as provas que os sustentam e o próximo passo recomendado.",
      "ctaPrimary": "Falar com a equipa",
      "ctaSecondary": "Junte-se a nós"
    },
    "ru": {
      "kicker": "Отрасли",
      "title": "Розница и FMCG",
      "lead": "Исследования для ритейлеров и для брендов продуктов питания, напитков и товаров для дома: как меняется категория, что должна делать упаковка и что происходит на полке.",
      "introKicker": "Как мы работаем",
      "intro": [
        "Розница и товары повседневного спроса встречаются в одном проходе: бренд решает упаковку и цену, ритейлер решает место и позицию.",
        "Мы изучаем категорию, упаковку и полку по отдельности, потому что каждое решение принимает другая команда и в другом графике.",
        "Каждое исследование строится вокруг решения, которое оно должно поддержать: какую упаковку выпускать, какую цену выдержит полка и как бренд удерживает место. Дизайн, выборка и отчёт следуют из этого вопроса."
      ],
      "stagesKicker": "Что мы изучаем",
      "stages": [
        {
          "n": "01",
          "name": "Категория и спрос",
          "frame": "Откуда приходит спрос и что он заменяет.",
          "cards": [
            {
              "title": "Возможность категории",
              "body": "Оценить категорию и смежные, понять, откуда приходит спрос и что он заменяет.",
              "methods": "Онлайн-опрос · CATI"
            },
            {
              "title": "Ценовые уровни и упаковка",
              "body": "Проверить ценовые уровни и форматы упаковки до переговоров о листинге.",
              "methods": "Тесты упаковки · ценовые тесты"
            }
          ]
        },
        {
          "n": "02",
          "name": "Упаковка и цена",
          "frame": "Что должна делать упаковка и выдерживает ли цену.",
          "cards": [
            {
              "title": "Тест упаковки",
              "body": "Проверить дизайн упаковки и заявления с покупателями, которым её нужно найти.",
              "methods": "Тесты в центральной локации · стимулы упаковки"
            },
            {
              "title": "Цена и промо",
              "body": "Проверить ценовые точки и механики промо относительно того, что готовы платить покупатели.",
              "methods": "Ценовые тесты · онлайн-опрос"
            }
          ]
        },
        {
          "n": "03",
          "name": "Полка и магазин",
          "frame": "Как продукт виден в проходе.",
          "cards": [
            {
              "title": "Заметность на полке",
              "body": "Проверить фейсинги, блокировку и раскладку на контролируемой полке и зафиксировать, что покупатели находят первым.",
              "methods": "Тесты в центральной локации"
            },
            {
              "title": "Опыт в магазине",
              "body": "Изучить посещение магазина: как покупатель движется по проходу и что прерывает покупку.",
              "methods": "Глубинные интервью · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Бренд и повторная покупка",
          "frame": "Удерживается ли бренд и возвращается ли покупатель.",
          "cards": [
            {
              "title": "Здоровье бренда",
              "body": "Отслеживать известность, рассмотрение и рекомендацию относительно реально сравниваемых брендов.",
              "methods": "Онлайн-трекинг · фиксированные показатели"
            },
            {
              "title": "Повторная покупка и отток",
              "body": "Отслеживать повторные покупки и причины, по которым покупатель прекращает.",
              "methods": "Трекинг · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Методы",
      "methodsLead": "Что представляет собой каждый метод и когда мы его применяем.",
      "methods": [
        [
          "Тесты в центральной локации",
          "Тесты упаковки и полки в центральной локации, с выкладкой, собранной под категорию."
        ],
        [
          "Тесты продукта и упаковки",
          "Тесты продукта и упаковки в центральной локации или дома."
        ],
        [
          "Потребитель лицом к лицу (CAPI)",
          "Структурированные интервью в центральной локации или в магазине — для покупателей, которых трудно застать онлайн."
        ],
        [
          "Онлайн-опрос",
          "Опрос покупателей с квотами по каналу, городу и расходам в категории."
        ],
        [
          "CATI",
          "Телефонные интервью по скрипту с квотами по городу, каналу или типу клиента."
        ]
      ],
      "ctaTitle": "Расскажите, какое решение должно поддержать это исследование.",
      "ctaBody": "Вы получаете результаты, доказательства за ними и рекомендуемый следующий шаг.",
      "ctaPrimary": "Поговорить с командой",
      "ctaSecondary": "Присоединиться"
    },
    "sv": {
      "kicker": "Branscher",
      "title": "Handel och dagligvaror",
      "lead": "Undersökningar för handlare och för mat-, dryckes- och hushållsvarumärken: hur kategorin förändras, vad förpackningen måste göra och vad som händer i hyllan.",
      "introKicker": "Så arbetar vi",
      "intro": [
        "Handel och dagligvaror möts i samma gång: varumärket bestämmer förpackning och pris, handlaren bestämmer ytan och placeringen.",
        "Vi undersöker kategori, förpackning och hylla var för sig, eftersom var och en beslutas av olika team och i olika takt.",
        "Varje studie byggs kring det beslut den ska stödja: vilken förpackning som ska lanseras, vilket pris hyllan bär och hur varumärket håller sin plats. Design, urval och rapportering följer den frågan."
      ],
      "stagesKicker": "Vad vi undersöker",
      "stages": [
        {
          "n": "01",
          "name": "Kategori och efterfrågan",
          "frame": "Varifrån efterfrågan kommer och vad den ersätter.",
          "cards": [
            {
              "title": "Kategorimöjlighet",
              "body": "Storleksbestäm kategorin och angränsande kategorier, och fastställ varifrån efterfrågan kommer och vad den ersätter.",
              "methods": "Onlineundersökning · CATI"
            },
            {
              "title": "Prisnivåer och förpackning",
              "body": "Testa prisnivåer och förpackningsformat före listningsförhandlingen.",
              "methods": "Förpackningstester · pristester"
            }
          ]
        },
        {
          "n": "02",
          "name": "Förpackning och pris",
          "frame": "Vad förpackningen måste göra och om priset håller.",
          "cards": [
            {
              "title": "Förpackningstest",
              "body": "Testa förpackningsdesign och påståenden med de shoppare som måste hitta den.",
              "methods": "Central location-tester · förpackningsstimuli"
            },
            {
              "title": "Pris och kampanj",
              "body": "Testa prispunkter och kampanjmekanik mot vad shoppare betalar.",
              "methods": "Pristester · onlineundersökning"
            }
          ]
        },
        {
          "n": "03",
          "name": "Hylla och butik",
          "frame": "Hur produkten syns i gången.",
          "cards": [
            {
              "title": "Synlighet i hyllan",
              "body": "Testa facings, blockning och hyllayout i en kontrollerad hylla, och registrera vad shoppare hittar först.",
              "methods": "Central location-tester"
            },
            {
              "title": "Butiksupplevelse",
              "body": "Undersök butiksbesöket: hur shopparen rör sig genom gången och vad som avbryter köpet.",
              "methods": "Djupintervjuer · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Varumärke och återköp",
          "frame": "Om varumärket håller och om köparen återvänder.",
          "cards": [
            {
              "title": "Varumärkeshälsa",
              "body": "Följ kännedom, övervägande och rekommendation mot de varumärken som faktiskt jämförs.",
              "methods": "Onlinetracking · fasta mått"
            },
            {
              "title": "Återköp och tapp",
              "body": "Följ återköp och orsakerna till att en köpare slutar.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Vad varje metod är och när vi använder den.",
      "methods": [
        [
          "Central location-tester",
          "Förpacknings- och hylltester på en central plats, med hyllor byggda för kategorin."
        ],
        [
          "Produkt- och förpackningstester",
          "Produkt- och förpackningstester, på central plats eller hemma."
        ],
        [
          "Konsument ansikte mot ansikte (CAPI)",
          "Strukturerade intervjuer på central plats eller i butik, för shoppare som är svåra att nå online."
        ],
        [
          "Onlineundersökning",
          "Undersökning bland shoppare, med kvoter efter kanal, stad och kategorispendering."
        ],
        [
          "CATI",
          "Skriptade telefonintervjuer, med kvoter efter stad, kanal eller kundtyp."
        ]
      ],
      "ctaTitle": "Berätta vilket beslut den här undersökningen ska stödja.",
      "ctaBody": "Du får resultaten, underlaget bakom dem och rekommenderat nästa steg.",
      "ctaPrimary": "Prata med forskarteamet",
      "ctaSecondary": "Var med"
    },
    "tr": {
      "kicker": "Sektörler",
      "title": "Perakende ve hızlı tüketim",
      "lead": "Perakendeciler ve gıda, içecek, ev ürünleri markaları için araştırma: kategori nasıl değişiyor, ambalaj ne yapmalı ve rafta ne oluyor.",
      "introKicker": "Nasıl çalışıyoruz",
      "intro": [
        "Perakende ve hızlı tüketim aynı koridorda buluşur: marka ambalajı ve fiyatı, perakendeci alanı ve konumu belirler.",
        "Kategoriyi, ambalajı ve rafı ayrı ayrı inceliyoruz; çünkü her biri farklı bir ekip tarafından, farklı bir takvimle kararlaştırılır.",
        "Her çalışma, desteklemesi gereken kararın etrafında tasarlanır: hangi ambalaj çıkacak, raf hangi fiyatı taşıyacak ve marka yerini nasıl koruyacak. Tasarım, örneklem ve rapor bu sorudan türetilir."
      ],
      "stagesKicker": "Neyi inceliyoruz",
      "stages": [
        {
          "n": "01",
          "name": "Kategori ve talep",
          "frame": "Talebin nereden geldiği ve neyin yerini aldığı.",
          "cards": [
            {
              "title": "Kategori fırsatı",
              "body": "Kategoriyi ve komşu kategorileri ölçün; talebin nereden geldiğini ve neyin yerini aldığını ortaya koyun.",
              "methods": "Çevrimiçi anket · CATI"
            },
            {
              "title": "Fiyat kademeleri ve ambalaj",
              "body": "Listeleme görüşmesinden önce fiyat kademelerini ve ambalaj formatlarını test edin.",
              "methods": "Ambalaj testleri · fiyat testleri"
            }
          ]
        },
        {
          "n": "02",
          "name": "Ambalaj ve fiyat",
          "frame": "Ambalajın ne yapması gerektiği ve fiyatın tutup tutmadığı.",
          "cards": [
            {
              "title": "Ambalaj testi",
              "body": "Ambalaj tasarımını ve ambalaj üzerindeki iddiaları, onu bulması gereken alışverişçilerle test edin.",
              "methods": "Merkezi lokasyon testleri · ambalaj uyaranları"
            },
            {
              "title": "Fiyat ve promosyon",
              "body": "Fiyat noktalarını ve promosyon mekaniklerini, alışverişçilerin ödeyeceği tutara göre test edin.",
              "methods": "Fiyat testleri · çevrimiçi anket"
            }
          ]
        },
        {
          "n": "03",
          "name": "Raf ve mağaza",
          "frame": "Ürünün koridorda nasıl görüldüğü.",
          "cards": [
            {
              "title": "Raf görünürlüğü",
              "body": "Kontrollü bir rafta facing, bloklama ve raf yerleşimini test edin; alışverişçilerin ilk ne bulduğunu kaydedin.",
              "methods": "Merkezi lokasyon testleri"
            },
            {
              "title": "Mağaza deneyimi",
              "body": "Mağaza ziyaretini inceleyin: alışverişçi koridorda nasıl hareket ediyor ve satın almayı ne kesiyor.",
              "methods": "Derinlemesine görüşmeler · CAPI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Marka ve tekrar alım",
          "frame": "Markanın tutup tutmadığı ve alıcının geri dönüp dönmediği.",
          "cards": [
            {
              "title": "Marka sağlığı",
              "body": "Bilinirlik, değerlendirme ve tavsiyeyi gerçekten karşılaştırılan markalara göre izleyin.",
              "methods": "Çevrimiçi tracking · sabit ölçütler"
            },
            {
              "title": "Tekrar alım ve kayıp",
              "body": "Tekrar alımları ve alıcının neden vazgeçtiğini izleyin.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Yöntemler",
      "methodsLead": "Her yöntemin ne olduğu ve ne zaman kullandığımız.",
      "methods": [
        [
          "Merkezi lokasyon testleri",
          "Kategori için kurulmuş raflarla merkezi bir lokasyonda ambalaj ve raf testleri."
        ],
        [
          "Ürün ve ambalaj testleri",
          "Ürün ve ambalaj testleri; merkezi lokasyonda veya evde."
        ],
        [
          "Tüketici yüz yüze (CAPI)",
          "Merkezi lokasyonda veya mağazada yapılandırılmış görüşmeler; çevrimiçi ulaşılması zor alışverişçiler için."
        ],
        [
          "Çevrimiçi anket",
          "Alışverişçi anketi; kanal, şehir ve kategori harcamasına göre kotalar."
        ],
        [
          "CATI",
          "Şehir, kanal veya müşteri tipine göre kotalı, senaryolu telefon görüşmeleri."
        ]
      ],
      "ctaTitle": "Bu araştırmanın hangi kararı desteklemesi gerektiğini bize anlatın.",
      "ctaBody": "Bulguları, arkalarındaki kanıtları ve önerilen sonraki adımı alırsınız.",
      "ctaPrimary": "Araştırma ekibiyle konuşun",
      "ctaSecondary": "Katılın"
    }
  },
  "healthcare": {
    "en-US": {
      "kicker": "Industries",
      "title": "Healthcare & life sciences",
      "lead": "Research for pharmaceutical, medtech and care providers: the patient pathway, what clinicians decide, and what limits access.",
      "introKicker": "How we work",
      "intro": [
        "Care is decided in more than one place: in the clinic, at the payer, and at home, where the patient decides whether to continue.",
        "We study each of them: how a patient moves from symptom to diagnosis, what a clinician weighs when choosing a treatment, and what cost, distance or stigma does to access.",
        "Each study is designed around the decision it has to support — whether to enter a market, how to frame the evidence, which specialist group to approach first. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Patient pathway",
          "frame": "Where the pathway stalls, from symptom to diagnosis to treatment.",
          "cards": [
            {
              "title": "Diagnosis journey",
              "body": "Map the route from first symptom to confirmed diagnosis, and the points where patients are delayed or lost.",
              "methods": "In-depth interviews · patient survey"
            },
            {
              "title": "Treatment and adherence",
              "body": "Follow what happens after prescription: who continues, who stops, and why.",
              "methods": "Patient survey · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Clinicians and prescribing",
          "frame": "What a clinician weighs when choosing a treatment, and what they will not accept.",
          "cards": [
            {
              "title": "Perception and prescribing",
              "body": "Understand how specialists perceive the condition, the options, and the evidence behind them.",
              "methods": "Physician in-depth interviews"
            },
            {
              "title": "Specialist sample",
              "body": "Specialists are screened on subspecialty, practice setting and case volume, and their credentials verified before the interview.",
              "methods": "Credential-verified HCP sample"
            }
          ]
        },
        {
          "n": "03",
          "name": "Access and payment",
          "frame": "Cost, coverage, distance and stigma, and which one stops treatment.",
          "cards": [
            {
              "title": "Cost and affordability",
              "body": "Establish what patients pay, what is covered, and where cost ends treatment.",
              "methods": "Patient survey · in-depth interviews"
            },
            {
              "title": "Stigma and care-seeking",
              "body": "Study when people delay care, and who they turn to first.",
              "methods": "Patient survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "04",
          "name": "Launch and market access",
          "frame": "How the evidence is framed, and who adopts first.",
          "cards": [
            {
              "title": "Evidence and message testing",
              "body": "Test how clinical evidence is understood by the specialists and payers who act on it.",
              "methods": "Message testing · specialist interviews"
            },
            {
              "title": "Early adoption",
              "body": "Identify which centres and clinicians adopt first, and what they need before they do.",
              "methods": "In-depth interviews · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Physician in-depth interviews",
          "Interviews of 45 to 60 minutes with specialists, with credentials verified before fieldwork."
        ],
        [
          "Specialist sample",
          "Specialists are screened on specialty and subspecialty, practice setting, case volume and prescribing authority, with credentials verified before the interview."
        ],
        [
          "Patient survey",
          "Patients are surveyed online or by telephone, with quotas by condition, treatment stage, severity and market. Rare conditions are recruited through patient communities."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by specialty, setting or market. Used where the list is defined."
        ],
        [
          "Online tracking",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "医疗健康与生命科学",
      "lead": "面向药企、器械与医疗服务机构：患者路径、医生如何决策，以及什么限制了可及。",
      "introKicker": "我们如何做",
      "intro": [
        "医疗决策同时发生在几个地方：诊室里、支付方那里，以及患者家里——他决定要不要继续。",
        "我们分别研究：患者从症状到确诊历经哪些环节、医生在选择治疗方案时权衡什么、以及费用、距离与污名如何影响可及。",
        "每项研究都围绕它要支撑的决定来设计：要不要进一个市场、证据如何呈现、先接触哪一类专科医生。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "患者路径",
          "frame": "从症状到确诊到治疗，卡在哪一步。",
          "cards": [
            {
              "title": "就诊与确诊",
              "body": "梳理从首次症状到确诊的路径，以及患者在哪些环节被延误或流失。",
              "methods": "深度访谈 · 患者问卷"
            },
            {
              "title": "治疗与依从",
              "body": "追踪处方之后的行为：谁在持续使用、谁停止，以及原因。",
              "methods": "患者问卷 · 电话访问"
            }
          ]
        },
        {
          "n": "02",
          "name": "医生与处方",
          "frame": "医生在选择治疗方案时权衡什么，又不接受什么。",
          "cards": [
            {
              "title": "认知与处方",
              "body": "了解专科医生如何看待这个疾病、可选方案，以及背后的证据。",
              "methods": "医生深度访谈"
            },
            {
              "title": "专科医生样本",
              "body": "按亚专科、执业机构与病例量筛选专科医生，并在访谈前核验资质。",
              "methods": "资质核验后的医生样本"
            }
          ]
        },
        {
          "n": "03",
          "name": "可及性与支付",
          "frame": "费用、覆盖、距离与污名，哪一项终止了治疗。",
          "cards": [
            {
              "title": "支付与可负担",
              "body": "弄清患者实际付多少、哪些被覆盖，以及费用在哪一步终止了治疗。",
              "methods": "患者问卷 · 深度访谈"
            },
            {
              "title": "污名与求医",
              "body": "研究人们何时延迟就医，以及最先求助的是谁。",
              "methods": "患者问卷 · 深度访谈"
            }
          ]
        },
        {
          "n": "04",
          "name": "上市与准入",
          "frame": "证据如何呈现，谁先采用。",
          "cards": [
            {
              "title": "证据与信息测试",
              "body": "测试专科医生与支付方如何理解临床证据。",
              "methods": "信息测试 · 专科医生访谈"
            },
            {
              "title": "早期采用",
              "body": "找出哪些中心与医生会先采用，以及采用前需要什么。",
              "methods": "深度访谈 · 电话访问"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "医生深度访谈",
          "与专科医生进行 45–60 分钟访谈，执行前核验资质。"
        ],
        [
          "专科医生样本",
          "按专科与亚专科、执业机构、月均病例量与处方权限筛选专科医生，并在访谈前核验资质。"
        ],
        [
          "患者问卷",
          "通过线上或电话访问患者，配额按病种、治疗阶段、严重程度与市场设定；罕见病通过患者社群招募。"
        ],
        [
          "电话访问（CATI）",
          "按脚本执行电话访问，配额按专科、执业机构或市场设定。用于名单明确的项目。"
        ],
        [
          "在线追踪",
          "按月或按季的在线追踪，指标固定，变化可对照同一套基数来读。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "醫療健康與生命科學",
      "lead": "面向藥廠、器械與醫療服務機構：患者路徑、醫生如何決策，以及什麼限制了可及。",
      "introKicker": "我們如何做",
      "intro": [
        "醫療決策同時發生在幾個地方：診間裡、支付方那裡，以及患者家裡——他決定要不要繼續。",
        "我們分別研究：患者從症狀到確診歷經哪些環節、醫生在選擇治療方案時權衡什麼、以及費用、距離與污名如何影響可及。",
        "每項研究都圍繞它要支撐的決定來設計：要不要進一個市場、證據怎麼講、先接觸哪一類專科醫生。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "患者路徑",
          "frame": "從症狀到確診到治療，卡在哪一步。",
          "cards": [
            {
              "title": "就診與確診",
              "body": "梳理從首次症狀到確診的路徑，以及患者在哪些環節被延誤或流失。",
              "methods": "深度訪談 · 患者問卷"
            },
            {
              "title": "治療與依從",
              "body": "追蹤處方之後的行為：誰在持續使用、誰停止，以及原因。",
              "methods": "患者問卷 · 電話訪問"
            }
          ]
        },
        {
          "n": "02",
          "name": "醫生與處方",
          "frame": "醫生在選擇治療方案時權衡什麼，又不接受什麼。",
          "cards": [
            {
              "title": "認知與處方",
              "body": "了解專科醫生如何看待這個疾病、可選方案，以及背後的證據。",
              "methods": "醫生深度訪談"
            },
            {
              "title": "專科醫生樣本",
              "body": "按亞專科、執業機構與病例量篩選專科醫生，並在訪談前核驗資質。",
              "methods": "資質核驗後的醫生樣本"
            }
          ]
        },
        {
          "n": "03",
          "name": "可及性與支付",
          "frame": "費用、覆蓋、距離與污名，哪一項終止了治療。",
          "cards": [
            {
              "title": "支付與可負擔",
              "body": "弄清患者實際付多少、哪些被覆蓋，以及費用在哪一步終止了治療。",
              "methods": "患者問卷 · 深度訪談"
            },
            {
              "title": "污名與求醫",
              "body": "研究人們何時延遲就醫，以及最先求助的是誰。",
              "methods": "患者問卷 · 深度訪談"
            }
          ]
        },
        {
          "n": "04",
          "name": "上市與准入",
          "frame": "證據如何呈現，誰先採用。",
          "cards": [
            {
              "title": "證據與訊息測試",
              "body": "測試專科醫生與支付方如何理解臨床證據。",
              "methods": "訊息測試 · 專科醫生訪談"
            },
            {
              "title": "早期採用",
              "body": "找出哪些中心與醫生會先採用，以及採用前需要什麼。",
              "methods": "深度訪談 · 電話訪問"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "醫生深度訪談",
          "與專科醫生進行 45–60 分鐘訪談，執行前核驗資質。"
        ],
        [
          "專科醫生樣本",
          "按專科與亞專科、執業機構、月均病例量與處方權限篩選專科醫生，並在訪談前核驗資質。"
        ],
        [
          "患者問卷",
          "透過線上或電話訪問患者，配額按病種、治療階段、嚴重程度與市場設定；罕見病透過患者社群招募。"
        ],
        [
          "電話訪問（CATI）",
          "按腳本執行電話訪問，配額按專科、執業機構或市場設定。用於名單明確的專案。"
        ],
        [
          "線上追蹤",
          "按月或按季的線上追蹤，指標固定，變化可對照同一套基數來讀。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Healthcare & life sciences",
      "lead": "Research for pharmaceutical, medtech and care providers: the patient pathway, what clinicians decide, and what limits access.",
      "introKicker": "How we work",
      "intro": [
        "Care is decided in more than one place: in the clinic, at the payer, and at home, where the patient decides whether to continue.",
        "We study each of them: how a patient moves from symptom to diagnosis, what a clinician weighs when choosing a treatment, and what cost, distance or stigma does to access.",
        "Each study is designed around the decision it has to support — whether to enter a market, how to frame the evidence, which specialist group to approach first. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Patient pathway",
          "frame": "Where the pathway stalls, from symptom to diagnosis to treatment.",
          "cards": [
            {
              "title": "Diagnosis journey",
              "body": "Map the route from first symptom to confirmed diagnosis, and the points where patients are delayed or lost.",
              "methods": "In-depth interviews · patient survey"
            },
            {
              "title": "Treatment and adherence",
              "body": "Follow what happens after prescription: who continues, who stops, and why.",
              "methods": "Patient survey · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Clinicians and prescribing",
          "frame": "What a clinician weighs when choosing a treatment, and what they will not accept.",
          "cards": [
            {
              "title": "Perception and prescribing",
              "body": "Understand how specialists perceive the condition, the options, and the evidence behind them.",
              "methods": "Physician in-depth interviews"
            },
            {
              "title": "Specialist sample",
              "body": "Specialists are screened on subspecialty, practice setting and case volume, and their credentials verified before the interview.",
              "methods": "Credential-verified HCP sample"
            }
          ]
        },
        {
          "n": "03",
          "name": "Access and payment",
          "frame": "Cost, coverage, distance and stigma, and which one stops treatment.",
          "cards": [
            {
              "title": "Cost and affordability",
              "body": "Establish what patients pay, what is covered, and where cost ends treatment.",
              "methods": "Patient survey · in-depth interviews"
            },
            {
              "title": "Stigma and care-seeking",
              "body": "Study when people delay care, and who they turn to first.",
              "methods": "Patient survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "04",
          "name": "Launch and market access",
          "frame": "How the evidence is framed, and who adopts first.",
          "cards": [
            {
              "title": "Evidence and message testing",
              "body": "Test how clinical evidence is understood by the specialists and payers who act on it.",
              "methods": "Message testing · specialist interviews"
            },
            {
              "title": "Early adoption",
              "body": "Identify which centres and clinicians adopt first, and what they need before they do.",
              "methods": "In-depth interviews · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Physician in-depth interviews",
          "Interviews of 45 to 60 minutes with specialists, with credentials verified before fieldwork."
        ],
        [
          "Specialist sample",
          "Specialists are screened on specialty and subspecialty, practice setting, case volume and prescribing authority, with credentials verified before the interview."
        ],
        [
          "Patient survey",
          "Patients are surveyed online or by telephone, with quotas by condition, treatment stage, severity and market. Rare conditions are recruited through patient communities."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by specialty, setting or market. Used where the list is defined."
        ],
        [
          "Online tracking",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "de": {
      "kicker": "Branchen",
      "title": "Gesundheitswesen und Life Sciences",
      "lead": "Forschung für Pharma-, Medtech- und Versorgungsanbieter: der Patientenpfad, was Behandler entscheiden und was den Zugang begrenzt.",
      "introKicker": "So arbeiten wir",
      "intro": [
        "Versorgung wird an mehr als einem Ort entschieden: in der Praxis, beim Kostenträger und zu Hause, wo der Patient entscheidet, ob er weitermacht.",
        "Wir untersuchen jedes davon: wie ein Patient vom Symptom zur Diagnose kommt, was ein Behandler bei der Therapiewahl abwägt und was Kosten, Entfernung oder Stigma mit dem Zugang machen.",
        "Jede Studie wird um die Entscheidung herum konzipiert, die sie stützen soll — ob ein Markt betreten wird, wie die Evidenz gerahmt wird, welche Fachgruppe zuerst angesprochen wird. Design, Stichprobe und Bericht folgen dieser Frage."
      ],
      "stagesKicker": "Was wir untersuchen",
      "stages": [
        {
          "n": "01",
          "name": "Patientenpfad",
          "frame": "Wo der Pfad stockt, vom Symptom über die Diagnose zur Behandlung.",
          "cards": [
            {
              "title": "Weg zur Diagnose",
              "body": "Den Weg vom ersten Symptom zur gesicherten Diagnose abbilden und die Punkte, an denen Patienten verzögert oder verloren gehen.",
              "methods": "Tiefeninterviews · Patientenbefragung"
            },
            {
              "title": "Behandlung und Adhärenz",
              "body": "Verfolgen, was nach der Verordnung geschieht: wer weitermacht, wer aufhört und warum.",
              "methods": "Patientenbefragung · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Behandler und Verordnung",
          "frame": "Was ein Behandler bei der Therapiewahl abwägt und was er nicht akzeptiert.",
          "cards": [
            {
              "title": "Wahrnehmung und Verordnung",
              "body": "Verstehen, wie Fachärzte die Erkrankung, die Optionen und die Evidenz dahinter wahrnehmen.",
              "methods": "Tiefeninterviews mit Ärzten"
            },
            {
              "title": "Facharztstichprobe",
              "body": "Fachärzte werden nach Subspezialität, Praxisumfeld und Fallvolumen gescreent; ihre Nachweise werden vor dem Interview geprüft.",
              "methods": "Geprüfte HCP-Stichprobe"
            }
          ]
        },
        {
          "n": "03",
          "name": "Zugang und Erstattung",
          "frame": "Kosten, Deckung, Entfernung und Stigma — und was davon die Behandlung stoppt.",
          "cards": [
            {
              "title": "Kosten und Erschwinglichkeit",
              "body": "Feststellen, was Patienten zahlen, was gedeckt ist und wo Kosten die Behandlung beenden.",
              "methods": "Patientenbefragung · Tiefeninterviews"
            },
            {
              "title": "Stigma und Hilfesuche",
              "body": "Untersuchen, wann Menschen die Versorgung hinauszögern und an wen sie sich zuerst wenden.",
              "methods": "Patientenbefragung · Tiefeninterviews"
            }
          ]
        },
        {
          "n": "04",
          "name": "Launch und Marktzugang",
          "frame": "Wie die Evidenz gerahmt wird und wer zuerst übernimmt.",
          "cards": [
            {
              "title": "Evidenz- und Botschaftstest",
              "body": "Testen, wie klinische Evidenz von den Fachärzten und Kostenträgern verstanden wird, die danach handeln.",
              "methods": "Botschaftstest · Facharztinterviews"
            },
            {
              "title": "Frühe Übernahme",
              "body": "Identifizieren, welche Zentren und Behandler zuerst übernehmen und was sie dafür brauchen.",
              "methods": "Tiefeninterviews · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Was jede Methode ist und wann wir sie einsetzen.",
      "methods": [
        [
          "Tiefeninterviews mit Ärzten",
          "Interviews von 45 bis 60 Minuten mit Fachärzten, Nachweise vor der Feldarbeit geprüft."
        ],
        [
          "Facharztstichprobe",
          "Fachärzte werden nach Fachgebiet und Subspezialität, Praxisumfeld, Fallvolumen und Verordnungsbefugnis gescreent; Nachweise vor dem Interview geprüft."
        ],
        [
          "Patientenbefragung",
          "Patienten werden online oder telefonisch befragt, mit Quoten nach Erkrankung, Behandlungsstadium, Schweregrad und Markt. Seltene Erkrankungen werden über Patientengemeinschaften rekrutiert."
        ],
        [
          "CATI",
          "Standardisierte Telefoninterviews mit Quoten nach Fachgebiet, Setting oder Markt. Eingesetzt, wo die Liste definiert ist."
        ],
        [
          "Online-Tracking",
          "Monatliches oder quartalsweises Tracking auf festen Messgrößen, damit Bewegung gegen dieselbe Basis lesbar bleibt."
        ]
      ],
      "ctaTitle": "Sagen Sie uns, welche Entscheidung diese Forschung stützen soll.",
      "ctaBody": "Sie erhalten die Ergebnisse, die Belege dahinter und den empfohlenen nächsten Schritt.",
      "ctaPrimary": "Mit dem Forschungsteam sprechen",
      "ctaSecondary": "Mitmachen"
    },
    "fr": {
      "kicker": "Secteurs",
      "title": "Santé et sciences de la vie",
      "lead": "Études pour les acteurs pharmaceutiques, medtech et de soins : le parcours patient, ce que décident les cliniciens et ce qui limite l'accès.",
      "introKicker": "Notre méthode",
      "intro": [
        "Le soin se décide à plus d'un endroit : au cabinet, chez le payeur et à domicile, où le patient décide de poursuivre ou non.",
        "Nous étudions chacun d'eux : comment un patient passe du symptôme au diagnostic, ce qu'un clinicien pèse au moment de choisir un traitement, et ce que le coût, la distance ou la stigmatisation font à l'accès.",
        "Chaque étude est conçue autour de la décision qu'elle doit éclairer — entrer sur un marché, cadrer les preuves, quelle spécialité approcher d'abord. Design, échantillon et rapport découlent de cette question."
      ],
      "stagesKicker": "Ce que nous étudions",
      "stages": [
        {
          "n": "01",
          "name": "Parcours patient",
          "frame": "Où le parcours bloque, du symptôme au diagnostic puis au traitement.",
          "cards": [
            {
              "title": "Parcours diagnostique",
              "body": "Cartographier le chemin du premier symptôme au diagnostic confirmé, et les points où les patients sont retardés ou perdus.",
              "methods": "Entretiens approfondis · enquête patients"
            },
            {
              "title": "Traitement et observance",
              "body": "Suivre ce qui se passe après la prescription : qui continue, qui arrête, et pourquoi.",
              "methods": "Enquête patients · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Cliniciens et prescription",
          "frame": "Ce qu'un clinicien pèse au moment de choisir un traitement, et ce qu'il n'acceptera pas.",
          "cards": [
            {
              "title": "Perception et prescription",
              "body": "Comprendre comment les spécialistes perçoivent la pathologie, les options et les preuves qui les soutiennent.",
              "methods": "Entretiens approfondis médecins"
            },
            {
              "title": "Échantillon de spécialistes",
              "body": "Les spécialistes sont filtrés sur la surspécialité, le cadre d'exercice et le volume de cas, et leurs titres vérifiés avant l'entretien.",
              "methods": "Échantillon de soignants vérifié"
            }
          ]
        },
        {
          "n": "03",
          "name": "Accès et remboursement",
          "frame": "Coût, couverture, distance et stigmatisation — et lequel arrête le traitement.",
          "cards": [
            {
              "title": "Coût et abordabilité",
              "body": "Établir ce que les patients paient, ce qui est couvert, et où le coût met fin au traitement.",
              "methods": "Enquête patients · entretiens approfondis"
            },
            {
              "title": "Stigmatisation et recours aux soins",
              "body": "Étudier quand les personnes retardent les soins, et vers qui elles se tournent d'abord.",
              "methods": "Enquête patients · entretiens approfondis"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lancement et accès au marché",
          "frame": "Comment les preuves sont cadrées, et qui adopte en premier.",
          "cards": [
            {
              "title": "Test des preuves et du message",
              "body": "Tester comment les preuves cliniques sont comprises par les spécialistes et les payeurs qui agissent dessus.",
              "methods": "Test de message · entretiens spécialistes"
            },
            {
              "title": "Adoption précoce",
              "body": "Identifier quels centres et cliniciens adoptent en premier, et ce dont ils ont besoin avant.",
              "methods": "Entretiens approfondis · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Méthodes",
      "methodsLead": "Ce qu'est chaque méthode et quand nous l'utilisons.",
      "methods": [
        [
          "Entretiens approfondis médecins",
          "Entretiens de 45 à 60 minutes avec des spécialistes, titres vérifiés avant le terrain."
        ],
        [
          "Échantillon de spécialistes",
          "Les spécialistes sont filtrés sur la spécialité et la surspécialité, le cadre d'exercice, le volume de cas et le droit de prescrire, avec vérification des titres avant l'entretien."
        ],
        [
          "Enquête patients",
          "Les patients sont interrogés en ligne ou par téléphone, avec quotas par pathologie, stade de traitement, sévérité et marché. Les maladies rares sont recrutées via les communautés de patients."
        ],
        [
          "CATI",
          "Entretiens téléphoniques scriptés, avec quotas par spécialité, cadre ou marché. Utilisés lorsque la liste est définie."
        ],
        [
          "Tracking en ligne",
          "Tracking mensuel ou trimestriel sur des mesures fixes, pour lire les évolutions sur la même base."
        ]
      ],
      "ctaTitle": "Dites-nous quelle décision cette étude doit éclairer.",
      "ctaBody": "Vous recevez les résultats, les preuves qui les sous-tendent et la prochaine étape recommandée.",
      "ctaPrimary": "Parler à l'équipe",
      "ctaSecondary": "Nous rejoindre"
    },
    "nl": {
      "kicker": "Sectoren",
      "title": "Zorg en life sciences",
      "lead": "Onderzoek voor farma-, medtech- en zorgaanbieders: het patiënttraject, wat clinici beslissen en wat toegang beperkt.",
      "introKicker": "Zo werken we",
      "intro": [
        "Zorg wordt op meer dan één plek besloten: in de praktijk, bij de betaler en thuis, waar de patiënt beslist of hij doorgaat.",
        "We onderzoeken elk daarvan: hoe een patiënt van symptoom naar diagnose komt, wat een clinicus afweegt bij de keuze van een behandeling, en wat kosten, afstand of stigma met toegang doen.",
        "Elke studie wordt opgebouwd rond de beslissing die zij moet ondersteunen — of een markt wordt betreden, hoe het bewijs wordt geframed, welke specialismegroep eerst wordt benaderd. Ontwerp, steekproef en rapportage volgen die vraag."
      ],
      "stagesKicker": "Wat we onderzoeken",
      "stages": [
        {
          "n": "01",
          "name": "Patiënttraject",
          "frame": "Waar het traject stokt, van symptoom via diagnose naar behandeling.",
          "cards": [
            {
              "title": "Traject naar diagnose",
              "body": "Breng de route van eerste symptoom tot bevestigde diagnose in kaart, en de punten waar patiënten vertraging oplopen of afhaken.",
              "methods": "Diepte-interviews · patiëntenonderzoek"
            },
            {
              "title": "Behandeling en therapietrouw",
              "body": "Volgen wat er na het voorschrift gebeurt: wie doorgaat, wie stopt en waarom.",
              "methods": "Patiëntenonderzoek · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Clinici en voorschrijven",
          "frame": "Wat een clinicus afweegt bij de keuze van een behandeling, en wat hij niet accepteert.",
          "cards": [
            {
              "title": "Perceptie en voorschrijven",
              "body": "Begrijpen hoe specialisten de aandoening, de opties en het bewijs daarachter waarnemen.",
              "methods": "Diepte-interviews met artsen"
            },
            {
              "title": "Specialistensteekproef",
              "body": "Specialisten worden gescreend op subspecialisme, praktijkomgeving en caseload; hun bewijs wordt vóór het interview gecontroleerd.",
              "methods": "Gecontroleerde HCP-steekproef"
            }
          ]
        },
        {
          "n": "03",
          "name": "Toegang en vergoeding",
          "frame": "Kosten, dekking, afstand en stigma — en wat daarvan de behandeling stopt.",
          "cards": [
            {
              "title": "Kosten en betaalbaarheid",
              "body": "Vaststellen wat patiënten betalen, wat vergoed wordt en waar kosten de behandeling beëindigen.",
              "methods": "Patiëntenonderzoek · diepte-interviews"
            },
            {
              "title": "Stigma en zorgzoekend gedrag",
              "body": "Onderzoeken wanneer mensen zorg uitstellen, en tot wie zij zich eerst wenden.",
              "methods": "Patiëntenonderzoek · diepte-interviews"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lancering en markttoegang",
          "frame": "Hoe het bewijs wordt geframed, en wie eerst adopteren.",
          "cards": [
            {
              "title": "Bewijs- en boodschaptest",
              "body": "Testen hoe klinisch bewijs wordt begrepen door de specialisten en betalers die erop handelen.",
              "methods": "Boodschaptest · specialisteninterviews"
            },
            {
              "title": "Vroege adoptie",
              "body": "Vaststellen welke centra en clinici eerst adopteren, en wat zij daarvoor nodig hebben.",
              "methods": "Diepte-interviews · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Wat elke methode is en wanneer we die gebruiken.",
      "methods": [
        [
          "Diepte-interviews met artsen",
          "Interviews van 45 tot 60 minuten met specialisten, met vóór het veldwerk gecontroleerde bewijsstukken."
        ],
        [
          "Specialistensteekproef",
          "Specialisten worden gescreend op specialisme en subspecialisme, praktijkomgeving, caseload en voorschrijfbevoegdheid, met controle van bewijsstukken vóór het interview."
        ],
        [
          "Patiëntenonderzoek",
          "Patiënten worden online of telefonisch bevraagd, met quota naar aandoening, behandelstadium, ernst en markt. Zeldzame aandoeningen worden geworven via patiëntengemeenschappen."
        ],
        [
          "CATI",
          "Gescripte telefonische interviews, met quota naar specialisme, setting of markt. Gebruikt waar de lijst gedefinieerd is."
        ],
        [
          "Online tracking",
          "Maandelijkse of driemaandelijkse tracking op vaste maten, zodat beweging tegen dezelfde basis leesbaar blijft."
        ]
      ],
      "ctaTitle": "Vertel ons welke beslissing dit onderzoek moet ondersteunen.",
      "ctaBody": "U ontvangt de resultaten, het bewijs erachter en de aanbevolen volgende stap.",
      "ctaPrimary": "Praat met het onderzoeksteam",
      "ctaSecondary": "Doe mee"
    },
    "da": {
      "kicker": "Brancher",
      "title": "Sundhed og life science",
      "lead": "Research for farma-, medtech- og behandlere: patientforløbet, hvad klinikere beslutter, og hvad der begrænser adgang.",
      "introKicker": "Sådan arbejder vi",
      "intro": [
        "Behandling besluttes mere end ét sted: i klinikken, hos betaleren og i hjemmet, hvor patienten beslutter, om der skal fortsættes.",
        "Vi undersøger hver af dem: hvordan en patient bevæger sig fra symptom til diagnose, hvad en kliniker afvejer ved valg af behandling, og hvad pris, afstand eller stigma gør ved adgangen.",
        "Hver undersøgelse designes om den beslutning, den skal understøtte — om et marked skal betrædes, hvordan evidensen rammes ind, hvilken specialgruppe der skal kontaktes først. Design, stikprøve og rapportering følger det spørgsmål."
      ],
      "stagesKicker": "Hvad vi undersøger",
      "stages": [
        {
          "n": "01",
          "name": "Patientforløb",
          "frame": "Hvor forløbet stopper, fra symptom til diagnose til behandling.",
          "cards": [
            {
              "title": "Forløb til diagnose",
              "body": "Kortlæg vejen fra første symptom til bekræftet diagnose, og de punkter, hvor patienter forsinkes eller mistes.",
              "methods": "Dybdeinterviews · patientundersøgelse"
            },
            {
              "title": "Behandling og compliance",
              "body": "Følg, hvad der sker efter recepter: hvem fortsætter, hvem stopper, og hvorfor.",
              "methods": "Patientundersøgelse · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Klinikere og ordination",
          "frame": "Hvad en kliniker afvejer ved valg af behandling, og hvad de ikke accepterer.",
          "cards": [
            {
              "title": "Opfattelse og ordination",
              "body": "Forstå, hvordan specialister opfatter sygdommen, mulighederne og evidensen bag dem.",
              "methods": "Dybdeinterviews med læger"
            },
            {
              "title": "Specialiststikprøve",
              "body": "Specialister screenes på subspecialitet, praksisform og sagsvolumen, og deres legitimationsoplysninger verificeres før interviewet.",
              "methods": "Verificeret HCP-stikprøve"
            }
          ]
        },
        {
          "n": "03",
          "name": "Adgang og betaling",
          "frame": "Pris, dækning, afstand og stigma — og hvilket af dem der stopper behandlingen.",
          "cards": [
            {
              "title": "Pris og betalbarhed",
              "body": "Fastslå, hvad patienter betaler, hvad der dækkes, og hvor prisen afslutter behandlingen.",
              "methods": "Patientundersøgelse · dybdeinterviews"
            },
            {
              "title": "Stigma og søgning af behandling",
              "body": "Undersøg, hvornår mennesker udskyder behandling, og hvem de først henvender sig til.",
              "methods": "Patientundersøgelse · dybdeinterviews"
            }
          ]
        },
        {
          "n": "04",
          "name": "Launch og markedsadgang",
          "frame": "Hvordan evidensen rammes ind, og hvem der tager den først i brug.",
          "cards": [
            {
              "title": "Evidens- og budskabstest",
              "body": "Test, hvordan klinisk evidens forstås af de specialister og betalere, der handler på den.",
              "methods": "Budskabstest · specialistinterviews"
            },
            {
              "title": "Tidlig ibrugtagning",
              "body": "Identificér, hvilke centre og klinikere der tager den først i brug, og hvad de har brug for inden.",
              "methods": "Dybdeinterviews · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hvad hver metode er, og hvornår vi bruger den.",
      "methods": [
        [
          "Dybdeinterviews med læger",
          "Interviews af 45-60 minutter med specialister, med verificerede kvalifikationer før feltarbejdet."
        ],
        [
          "Specialiststikprøve",
          "Specialister screenes på speciale og subspeciale, praksisform, sagsvolumen og ordinationsret, med verificerede kvalifikationer før interviewet."
        ],
        [
          "Patientundersøgelse",
          "Patienter spørges online eller telefonisk, med kvoter efter sygdom, behandlingsstadie, sværhedsgrad og marked. Sjældne sygdomme rekrutteres via patientfællesskaber."
        ],
        [
          "CATI",
          "Scriptede telefoninterviews med kvoter efter speciale, setting eller marked. Bruges, hvor listen er defineret."
        ],
        [
          "Online tracking",
          "Månedlig eller kvartalsvis tracking på faste mål, så bevægelse kan læses mod samme base."
        ]
      ],
      "ctaTitle": "Fortæl os, hvilken beslutning denne research skal understøtte.",
      "ctaBody": "Du får resultaterne, belægget bag dem og det anbefalede næste skridt.",
      "ctaPrimary": "Tal med researchteamet",
      "ctaSecondary": "Vær med"
    },
    "es": {
      "kicker": "Sectores",
      "title": "Salud y ciencias de la vida",
      "lead": "Investigación para farmacéuticas, medtech y proveedores de cuidados: la ruta del paciente, lo que deciden los clínicos y qué limita el acceso.",
      "introKicker": "Cómo trabajamos",
      "intro": [
        "El cuidado se decide en más de un lugar: en la consulta, en el pagador y en casa, donde el paciente decide si continúa.",
        "Estudiamos cada uno: cómo pasa un paciente del síntoma al diagnóstico, qué sopesa un clínico al elegir tratamiento y qué hacen el coste, la distancia o el estigma con el acceso.",
        "Cada estudio se diseña en torno a la decisión que debe sostener — entrar en un mercado, enmarcar la evidencia, qué especialidad abordar primero. El diseño, la muestra y el informe se derivan de esa pregunta."
      ],
      "stagesKicker": "Qué estudiamos",
      "stages": [
        {
          "n": "01",
          "name": "Ruta del paciente",
          "frame": "Dónde se atasca la ruta, del síntoma al diagnóstico y al tratamiento.",
          "cards": [
            {
              "title": "Itinerario diagnóstico",
              "body": "Mapear el camino del primer síntoma al diagnóstico confirmado, y los puntos donde los pacientes se retrasan o se pierden.",
              "methods": "Entrevistas en profundidad · encuesta a pacientes"
            },
            {
              "title": "Tratamiento y adherencia",
              "body": "Seguir qué ocurre tras la prescripción: quién continúa, quién abandona y por qué.",
              "methods": "Encuesta a pacientes · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Clínicos y prescripción",
          "frame": "Qué sopesa un clínico al elegir tratamiento y qué no aceptará.",
          "cards": [
            {
              "title": "Percepción y prescripción",
              "body": "Entender cómo perciben los especialistas la patología, las opciones y la evidencia que las sostiene.",
              "methods": "Entrevistas en profundidad con médicos"
            },
            {
              "title": "Muestra de especialistas",
              "body": "Los especialistas se filtran por subespecialidad, entorno de práctica y volumen de casos, y sus credenciales se verifican antes de la entrevista.",
              "methods": "Muestra de profesionales verificada"
            }
          ]
        },
        {
          "n": "03",
          "name": "Acceso y pago",
          "frame": "Coste, cobertura, distancia y estigma, y cuál de ellos detiene el tratamiento.",
          "cards": [
            {
              "title": "Coste y asequibilidad",
              "body": "Establecer qué pagan los pacientes, qué está cubierto y dónde el coste termina el tratamiento.",
              "methods": "Encuesta a pacientes · entrevistas en profundidad"
            },
            {
              "title": "Estigma y búsqueda de atención",
              "body": "Estudiar cuándo las personas retrasan la atención y a quién acuden primero.",
              "methods": "Encuesta a pacientes · entrevistas en profundidad"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lanzamiento y acceso al mercado",
          "frame": "Cómo se enmarca la evidencia y quién adopta primero.",
          "cards": [
            {
              "title": "Prueba de evidencia y mensaje",
              "body": "Probar cómo entienden la evidencia clínica los especialistas y pagadores que actúan sobre ella.",
              "methods": "Prueba de mensaje · entrevistas a especialistas"
            },
            {
              "title": "Adopción temprana",
              "body": "Identificar qué centros y clínicos adoptan primero y qué necesitan antes de hacerlo.",
              "methods": "Entrevistas en profundidad · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "Qué es cada método y cuándo lo usamos.",
      "methods": [
        [
          "Entrevistas en profundidad con médicos",
          "Entrevistas de 45 a 60 minutos con especialistas, con credenciales verificadas antes del trabajo de campo."
        ],
        [
          "Muestra de especialistas",
          "Los especialistas se filtran por especialidad y subespecialidad, entorno de práctica, volumen de casos y autoridad de prescripción, con credenciales verificadas antes de la entrevista."
        ],
        [
          "Encuesta a pacientes",
          "Los pacientes se encuestan online o por teléfono, con cuotas por patología, fase de tratamiento, gravedad y mercado. Las enfermedades raras se reclutan a través de comunidades de pacientes."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, con cuotas por especialidad, entorno o mercado. Se usan cuando la lista está definida."
        ],
        [
          "Tracking online",
          "Tracking mensual o trimestral sobre medidas fijas, para leer el movimiento contra la misma base."
        ]
      ],
      "ctaTitle": "Cuéntenos qué decisión debe sostener esta investigación.",
      "ctaBody": "Recibe los resultados, las pruebas que los sostienen y el siguiente paso recomendado.",
      "ctaPrimary": "Hablar con el equipo",
      "ctaSecondary": "Únete"
    },
    "fi": {
      "kicker": "Toimialat",
      "title": "Terveydenhuolto ja life sciences",
      "lead": "Tutkimusta lääke-, medtech- ja hoitopalvelujen tuottajille: potilaan polku, mitä kliinikot päättävät ja mikä rajoittaa pääsyä.",
      "introKicker": "Näin työskentelemme",
      "intro": [
        "Hoito päätetään useammassa paikassa: vastaanotolla, maksajalla ja kotona, jossa potilas päättää jatkaako.",
        "Tutkimme jokaista niistä: miten potilas siirtyy oireesta diagnoosiin, mitä kliinikko punnitsee valitessaan hoitoa ja mitä kustannus, etäisyys tai stigma tekee pääsylle.",
        "Jokainen tutkimus rakennetaan sen päätöksen ympärille, jota sen on tuettava — markkinalle astuminen, näytön kehystäminen, mikä erikoisalaryhmä tavoitetaan ensin. Suunnittelu, otos ja raportointi seuraavat tätä kysymystä."
      ],
      "stagesKicker": "Mitä tutkimme",
      "stages": [
        {
          "n": "01",
          "name": "Potilaan polku",
          "frame": "Missä polku pysähtyy, oireesta diagnoosiin ja hoitoon.",
          "cards": [
            {
              "title": "Polku diagnoosiin",
              "body": "Kartoita reitti ensimmäisestä oireesta vahvistettuun diagnoosiin ja pisteet, joissa potilaat viivästyvät tai katoavat.",
              "methods": "Syvähaastattelut · potilaskysely"
            },
            {
              "title": "Hoito ja sitoutuminen",
              "body": "Seuraa, mitä reseptin jälkeen tapahtuu: kuka jatkaa, kuka lopettaa ja miksi.",
              "methods": "Potilaskysely · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Kliinikot ja määrääminen",
          "frame": "Mitä kliinikko punnitsee valitessaan hoitoa ja mitä hän ei hyväksy.",
          "cards": [
            {
              "title": "Käsitys ja määrääminen",
              "body": "Ymmärrä, miten erikoislääkärit näkevät sairauden, vaihtoehdot ja niiden taustalla olevan näytön.",
              "methods": "Syvähaastattelut lääkäreille"
            },
            {
              "title": "Erikoislääkäriotos",
              "body": "Erikoislääkärit seulotaan erikoisalan ja alaerikoisalan, toimintaympäristön ja tapausmäärän mukaan, ja pätevyydet varmistetaan ennen haastattelua.",
              "methods": "Varmennettu HCP-otos"
            }
          ]
        },
        {
          "n": "03",
          "name": "Pääsy ja korvattavuus",
          "frame": "Kustannus, korvaus, etäisyys ja stigma — ja mikä niistä pysäyttää hoidon.",
          "cards": [
            {
              "title": "Kustannus ja kohtuuhintaisuus",
              "body": "Selvitä, mitä potilaat maksavat, mikä korvataan ja missä kustannus lopettaa hoidon.",
              "methods": "Potilaskysely · syvähaastattelut"
            },
            {
              "title": "Stigma ja avun hakeminen",
              "body": "Tutki, milloin ihmiset lykkäävät hoitoa ja kenen puoleen he kääntyvät ensin.",
              "methods": "Potilaskysely · syvähaastattelut"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lanseeraus ja markkinoille pääsy",
          "frame": "Miten näyttö kehystetään ja kuka ottaa sen ensimmäisenä käyttöön.",
          "cards": [
            {
              "title": "Näytön ja viestin testaus",
              "body": "Testaa, miten kliinisen näytön ymmärtävät ne erikoislääkärit ja maksajat, jotka toimivat sen pohjalta.",
              "methods": "Viestitestaus · erikoislääkärihaastattelut"
            },
            {
              "title": "Varhainen käyttöönotto",
              "body": "Tunnista, mitkä keskukset ja kliinikot ottavat ensimmäisenä käyttöön ja mitä he tarvitsevat ennen sitä.",
              "methods": "Syvähaastattelut · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Menetelmät",
      "methodsLead": "Mikä kukin menetelmä on ja milloin käytämme sitä.",
      "methods": [
        [
          "Syvähaastattelut lääkäreille",
          "45–60 minuutin haastattelut erikoislääkäreille, pätevyydet varmennettu ennen kenttätyötä."
        ],
        [
          "Erikoislääkäriotos",
          "Erikoislääkärit seulotaan erikoisalan ja alaerikoisalan, toimintaympäristön, tapausmäärän ja määräämisoikeuden mukaan, pätevyydet varmennetaan ennen haastattelua."
        ],
        [
          "Potilaskysely",
          "Potilaita kysytään verkossa tai puhelimitse, kiintiöt sairauden, hoitovaiheen, vakavuuden ja markkinan mukaan. Harvinaiset sairaudet rekrytoidaan potilasyhteisöjen kautta."
        ],
        [
          "CATI",
          "Käsikirjoitetut puhelinhaastattelut, kiintiöt erikoisalan, ympäristön tai markkinan mukaan. Käytetään, kun lista on määritelty."
        ],
        [
          "Verkkotracking",
          "Kuukausittainen tai neljännesvuosittainen tracking kiinteillä mittareilla, jotta liike on luettavissa samasta kannasta."
        ]
      ],
      "ctaTitle": "Kerro meille, mitä päätöstä tämän tutkimuksen on tuettava.",
      "ctaBody": "Saat tulokset, niiden taustalla olevan näytön ja suositellun seuraavan askeleen.",
      "ctaPrimary": "Keskustele tutkimustiimin kanssa",
      "ctaSecondary": "Liity mukaan"
    },
    "it": {
      "kicker": "Settori",
      "title": "Sanità e scienze della vita",
      "lead": "Ricerche per aziende farmaceutiche, medtech e fornitori di cure: il percorso del paziente, cosa decidono i clinici e cosa limita l'accesso.",
      "introKicker": "Come lavoriamo",
      "intro": [
        "La cura si decide in più di un luogo: nello studio, presso il pagatore e a casa, dove il paziente decide se continuare.",
        "Studiamo ciascuno di essi: come un paziente passa dal sintomo alla diagnosi, cosa pesa un clinico nella scelta di una terapia e cosa fanno costo, distanza o stigma all'accesso.",
        "Ogni studio è costruito attorno alla decisione che deve sostenere — entrare in un mercato, inquadrare l'evidenza, quale specialità avvicinare per prima. Disegno, campione e report discendono da quella domanda."
      ],
      "stagesKicker": "Cosa studiamo",
      "stages": [
        {
          "n": "01",
          "name": "Percorso del paziente",
          "frame": "Dove il percorso si blocca, dal sintomo alla diagnosi alla terapia.",
          "cards": [
            {
              "title": "Percorso diagnostico",
              "body": "Mappare il percorso dal primo sintomo alla diagnosi confermata, e i punti in cui i pazienti subiscono ritardi o si perdono.",
              "methods": "Interviste in profondità · indagine pazienti"
            },
            {
              "title": "Terapia e aderenza",
              "body": "Seguire cosa accade dopo la prescrizione: chi continua, chi smette e perché.",
              "methods": "Indagine pazienti · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Clinici e prescrizione",
          "frame": "Cosa pesa un clinico nella scelta di una terapia e cosa non accetterà.",
          "cards": [
            {
              "title": "Percezione e prescrizione",
              "body": "Capire come gli specialisti percepiscono la patologia, le opzioni e l'evidenza che le sostiene.",
              "methods": "Interviste in profondità a medici"
            },
            {
              "title": "Campione di specialisti",
              "body": "Gli specialisti sono selezionati per sottospecialità, contesto di pratica e volume di casi, e le credenziali sono verificate prima dell'intervista.",
              "methods": "Campione HCP verificato"
            }
          ]
        },
        {
          "n": "03",
          "name": "Accesso e rimborso",
          "frame": "Costo, copertura, distanza e stigma — e quale di essi interrompe la terapia.",
          "cards": [
            {
              "title": "Costo e sostenibilità",
              "body": "Stabilire quanto pagano i pazienti, cosa è coperto e dove il costo termina la terapia.",
              "methods": "Indagine pazienti · interviste in profondità"
            },
            {
              "title": "Stigma e ricerca di cura",
              "body": "Studiare quando le persone ritardano le cure e a chi si rivolgono per prime.",
              "methods": "Indagine pazienti · interviste in profondità"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lancio e accesso al mercato",
          "frame": "Come viene inquadrata l'evidenza e chi adotta per primo.",
          "cards": [
            {
              "title": "Test di evidenza e messaggio",
              "body": "Testare come l'evidenza clinica è compresa dagli specialisti e dai pagatori che agiscono su di essa.",
              "methods": "Test di messaggio · interviste a specialisti"
            },
            {
              "title": "Adozione precoce",
              "body": "Identificare quali centri e clinici adottano per primi, e cosa serve loro prima di farlo.",
              "methods": "Interviste in profondità · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metodi",
      "methodsLead": "Che cos'è ogni metodo e quando lo usiamo.",
      "methods": [
        [
          "Interviste in profondità a medici",
          "Interviste di 45-60 minuti con specialisti, con credenziali verificate prima del fieldwork."
        ],
        [
          "Campione di specialisti",
          "Gli specialisti sono selezionati per specialità e sottospecialità, contesto di pratica, volume di casi e autorità prescrittiva, con credenziali verificate prima dell'intervista."
        ],
        [
          "Indagine pazienti",
          "I pazienti sono intervistati online o per telefono, con quote per patologia, fase di trattamento, gravità e mercato. Le malattie rare sono reclutate tramite comunità di pazienti."
        ],
        [
          "CATI",
          "Interviste telefoniche scriptate, con quote per specialità, contesto o mercato. Usate quando la lista è definita."
        ],
        [
          "Tracking online",
          "Tracking mensile o trimestrale su misure fisse, così il movimento si legge sulla stessa base."
        ]
      ],
      "ctaTitle": "Dicci quale decisione deve sostenere questa ricerca.",
      "ctaBody": "Ricevi i risultati, le prove che li sostengono e il prossimo passo consigliato.",
      "ctaPrimary": "Parla con il team di ricerca",
      "ctaSecondary": "Unisciti"
    },
    "ja": {
      "kicker": "業界",
      "title": "医療とライフサイエンス",
      "lead": "医薬品・メドテック・ケア提供者向けの調査：患者の経路、臨床医が何を決めるか、何がアクセスを制限するか。",
      "introKicker": "進め方",
      "intro": [
        "ケアは複数の場所で決まります。診察室、支払者、そして患者が続けるかを決める自宅です。",
        "私たちはそれぞれを調べます。患者が症状から診断へどう進むか、臨床医が治療選択で何を秤にかけるか、費用・距離・スティグマがアクセスに何をするか。",
        "各調査は、それが支えるべき意思決定を中心に設計します — 市場に参入するか、エビデンスをどう枠づけるか、どの専門領域に先に働きかけるか。設計・サンプル・報告はこの問いから決まります。"
      ],
      "stagesKicker": "調査する内容",
      "stages": [
        {
          "n": "01",
          "name": "患者の経路",
          "frame": "経路がどこで止まるか。症状から診断、治療まで。",
          "cards": [
            {
              "title": "診断までの道のり",
              "body": "最初の症状から確定診断までの経路を描き、患者が遅れる、あるいは離脱する地点を特定します。",
              "methods": "デプスインタビュー · 患者調査"
            },
            {
              "title": "治療と服薬継続",
              "body": "処方後に何が起きるかを追います。誰が続け、誰がやめ、なぜか。",
              "methods": "患者調査 · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "臨床医と処方",
          "frame": "臨床医が治療選択で何を秤にかけ、何を受け入れないか。",
          "cards": [
            {
              "title": "認知と処方",
              "body": "専門医が疾患、選択肢、その背後のエビデンスをどう捉えるかを理解します。",
              "methods": "医師デプスインタビュー"
            },
            {
              "title": "専門医サンプル",
              "body": "専門医はサブスペシャルティ、診療環境、症例数でスクリーニングし、面接前に資格を確認します。",
              "methods": "資格確認済みHCPサンプル"
            }
          ]
        },
        {
          "n": "03",
          "name": "アクセスと支払い",
          "frame": "費用、保障、距離、スティグマ — どれが治療を止めるか。",
          "cards": [
            {
              "title": "費用と負担可能性",
              "body": "患者が何を支払い、何が保障され、どこで費用が治療を終わらせるかを明らかにします。",
              "methods": "患者調査 · デプスインタビュー"
            },
            {
              "title": "スティグマと受診行動",
              "body": "人がいつ受診を遅らせ、最初に誰を頼るかを調べます。",
              "methods": "患者調査 · デプスインタビュー"
            }
          ]
        },
        {
          "n": "04",
          "name": "発売と市場アクセス",
          "frame": "エビデンスをどう枠づけ、誰が最初に採用するか。",
          "cards": [
            {
              "title": "エビデンスとメッセージのテスト",
              "body": "臨床エビデンスが、それに基づいて行動する専門医と支払者にどう理解されるかをテストします。",
              "methods": "メッセージテスト · 専門医インタビュー"
            },
            {
              "title": "早期採用",
              "body": "どの施設と臨床医が最初に採用し、その前に何を必要とするかを特定します。",
              "methods": "デプスインタビュー · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "手法",
      "methodsLead": "各手法の内容と、使う場面。",
      "methods": [
        [
          "医師デプスインタビュー",
          "専門医への45〜60分のインタビュー。現場に入る前に資格を確認します。"
        ],
        [
          "専門医サンプル",
          "専門医は専門・サブスペシャルティ、診療環境、症例数、処方権限でスクリーニングし、面接前に資格を確認します。"
        ],
        [
          "患者調査",
          "患者にはオンラインまたは電話で調査し、疾患、治療段階、重症度、市場で割り付けます。希少疾患は患者コミュニティを通じて募集します。"
        ],
        [
          "CATI",
          "スクリプトに沿った電話調査。専門、環境、市場で割り付けます。名簿が確定している場合に使います。"
        ],
        [
          "オンライントラッキング",
          "固定指標による月次または四半期のトラッキング。同じ基準で変化を読めます。"
        ]
      ],
      "ctaTitle": "この調査が支えるべき意思決定をお聞かせください。",
      "ctaBody": "結果、その根拠、推奨する次の一手をお渡しします。",
      "ctaPrimary": "調査チームに相談する",
      "ctaSecondary": "参加する"
    },
    "ko": {
      "kicker": "산업",
      "title": "의료와 라이프사이언스",
      "lead": "제약·메드테크·케어 제공자를 위한 조사: 환자 경로, 임상의가 무엇을 결정하는지, 무엇이 접근을 제한하는지.",
      "introKicker": "일하는 방식",
      "intro": [
        "케어는 한 곳에서만 결정되지 않습니다. 진료실, 지불자, 그리고 계속할지를 환자가 결정하는 가정입니다.",
        "우리는 각각을 조사합니다. 환자가 증상에서 진단으로 어떻게 이동하는지, 임상의가 치료 선택에서 무엇을 저울질하는지, 비용·거리·낙인이 접근에 무엇을 하는지.",
        "각 조사는 그것이 뒷받침해야 할 결정을 중심으로 설계합니다 — 시장에 진입할지, 근거를 어떻게 구성할지, 어느 전문의 집단에 먼저 접근할지. 설계, 표본, 보고는 이 질문에서 나옵니다."
      ],
      "stagesKicker": "무엇을 조사하는가",
      "stages": [
        {
          "n": "01",
          "name": "환자 경로",
          "frame": "경로가 어디서 멈추는가. 증상에서 진단, 치료까지.",
          "cards": [
            {
              "title": "진단까지의 경로",
              "body": "첫 증상에서 확진까지의 경로를 그리고 환자가 지연되거나 이탈하는 지점을 찾습니다.",
              "methods": "심층 인터뷰 · 환자 조사"
            },
            {
              "title": "치료와 순응",
              "body": "처방 후 무엇이 일어나는지 추적합니다. 누가 계속하고 누가 중단하며 왜인지.",
              "methods": "환자 조사 · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "임상의와 처방",
          "frame": "임상의가 치료 선택에서 무엇을 저울질하고 무엇을 받아들이지 않는지.",
          "cards": [
            {
              "title": "인식과 처방",
              "body": "전문의가 질환, 선택지, 그 배경의 근거를 어떻게 인식하는지 이해합니다.",
              "methods": "의사 심층 인터뷰"
            },
            {
              "title": "전문의 표본",
              "body": "전문의는 세부 전공, 진료 환경, 사례 수로 선별하고 인터뷰 전에 자격을 확인합니다.",
              "methods": "자격 확인 HCP 표본"
            }
          ]
        },
        {
          "n": "03",
          "name": "접근과 지불",
          "frame": "비용, 보장, 거리, 낙인 — 그중 무엇이 치료를 멈추는가.",
          "cards": [
            {
              "title": "비용과 부담 가능성",
              "body": "환자가 무엇을 지불하고 무엇이 보장되며 어디서 비용이 치료를 끝내는지 밝힙니다.",
              "methods": "환자 조사 · 심층 인터뷰"
            },
            {
              "title": "낙인과 진료 추구",
              "body": "사람들이 언제 진료를 미루고 누구를 먼저 찾는지 조사합니다.",
              "methods": "환자 조사 · 심층 인터뷰"
            }
          ]
        },
        {
          "n": "04",
          "name": "출시와 시장 접근",
          "frame": "근거를 어떻게 구성하고 누가 먼저 도입하는가.",
          "cards": [
            {
              "title": "근거와 메시지 테스트",
              "body": "임상 근거가 그것에 따라 행동하는 전문의와 지불자에게 어떻게 이해되는지 테스트합니다.",
              "methods": "메시지 테스트 · 전문의 인터뷰"
            },
            {
              "title": "초기 도입",
              "body": "어느 센터와 임상의가 먼저 도입하고 그 전에 무엇이 필요한지 파악합니다.",
              "methods": "심층 인터뷰 · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "방법",
      "methodsLead": "각 방법이 무엇이고 언제 쓰는가.",
      "methods": [
        [
          "의사 심층 인터뷰",
          "전문의와 45~60분 인터뷰. 현장 조사 전에 자격을 확인합니다."
        ],
        [
          "전문의 표본",
          "전문의는 전공과 세부 전공, 진료 환경, 사례 수, 처방 권한으로 선별하고 인터뷰 전에 자격을 확인합니다."
        ],
        [
          "환자 조사",
          "환자는 온라인 또는 전화로 조사하며 질환, 치료 단계, 중증도, 시장으로 할당합니다. 희귀 질환은 환자 커뮤니티를 통해 모집합니다."
        ],
        [
          "CATI",
          "스크립트 기반 전화 조사. 전공, 환경, 시장으로 할당합니다. 명단이 정해진 경우에 사용합니다."
        ],
        [
          "온라인 트래킹",
          "고정 지표로 월별 또는 분기별 트래킹. 같은 기준으로 변화를 읽습니다."
        ]
      ],
      "ctaTitle": "이 조사가 뒷받침해야 할 결정을 알려주세요.",
      "ctaBody": "결과, 그 근거, 권장하는 다음 단계를 받습니다.",
      "ctaPrimary": "조사팀과 상담하기",
      "ctaSecondary": "참여하기"
    },
    "no": {
      "kicker": "Bransjer",
      "title": "Helse og life science",
      "lead": "Forskning for farma-, medtech- og behandlingsaktører: pasientforløpet, hva klinikere beslutter, og hva som begrenser tilgang.",
      "introKicker": "Slik arbeider vi",
      "intro": [
        "Behandling besluttes på mer enn ett sted: i klinikken, hos betaleren og hjemme, der pasienten bestemmer om hen fortsetter.",
        "Vi undersøker hver av dem: hvordan en pasient beveger seg fra symptom til diagnose, hva en kliniker veier når hen velger behandling, og hva kostnad, avstand eller stigma gjør med tilgangen.",
        "Hver studie designes rundt beslutningen den skal støtte — om et marked skal betres, hvordan evidensen rammes inn, hvilken spesialistgruppe som kontaktes først. Design, utvalg og rapportering følger dette spørsmålet."
      ],
      "stagesKicker": "Hva vi undersøker",
      "stages": [
        {
          "n": "01",
          "name": "Pasientforløp",
          "frame": "Hvor forløpet stopper, fra symptom til diagnose til behandling.",
          "cards": [
            {
              "title": "Veien til diagnose",
              "body": "Kartlegg veien fra første symptom til bekreftet diagnose, og punktene der pasienter forsinkes eller mistes.",
              "methods": "Dybdeintervjuer · pasientundersøkelse"
            },
            {
              "title": "Behandling og etterlevelse",
              "body": "Følg hva som skjer etter resepten: hvem som fortsetter, hvem som slutter, og hvorfor.",
              "methods": "Pasientundersøkelse · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Klinikere og forskrivning",
          "frame": "Hva en kliniker veier ved valg av behandling, og hva hen ikke aksepterer.",
          "cards": [
            {
              "title": "Oppfatning og forskrivning",
              "body": "Forstå hvordan spesialister oppfatter tilstanden, alternativene og evidensen bak dem.",
              "methods": "Dybdeintervjuer med leger"
            },
            {
              "title": "Spesialistutvalg",
              "body": "Spesialister screenes på subspesialitet, praksisform og saksvolum, og kvalifikasjonene verifiseres før intervjuet.",
              "methods": "Verifisert HCP-utvalg"
            }
          ]
        },
        {
          "n": "03",
          "name": "Tilgang og betaling",
          "frame": "Kostnad, dekning, avstand og stigma — og hvilket av dem som stopper behandlingen.",
          "cards": [
            {
              "title": "Kostnad og betalbarhet",
              "body": "Fastslå hva pasienter betaler, hva som dekkes, og hvor kostnaden avslutter behandlingen.",
              "methods": "Pasientundersøkelse · dybdeintervjuer"
            },
            {
              "title": "Stigma og hjelpesøking",
              "body": "Undersøk når mennesker utsetter behandling, og hvem de først henvender seg til.",
              "methods": "Pasientundersøkelse · dybdeintervjuer"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lansering og markedsadgang",
          "frame": "Hvordan evidensen rammes inn, og hvem som tar den i bruk først.",
          "cards": [
            {
              "title": "Evidens- og budskapstest",
              "body": "Test hvordan klinisk evidens forstås av spesialistene og betalerne som handler på den.",
              "methods": "Budskapstest · spesialistintervjuer"
            },
            {
              "title": "Tidlig ibruktaking",
              "body": "Identifiser hvilke sentre og klinikere som tar den i bruk først, og hva de trenger før det.",
              "methods": "Dybdeintervjuer · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hva hver metode er, og når vi bruker den.",
      "methods": [
        [
          "Dybdeintervjuer med leger",
          "Intervjuer på 45–60 minutter med spesialister, med verifiserte kvalifikasjoner før feltarbeidet."
        ],
        [
          "Spesialistutvalg",
          "Spesialister screenes på spesialitet og subspesialitet, praksisform, saksvolum og forskrivningsrett, med verifiserte kvalifikasjoner før intervjuet."
        ],
        [
          "Pasientundersøkelse",
          "Pasienter spørres på nett eller telefon, med kvoter etter tilstand, behandlingsfase, alvorlighet og marked. Sjeldne tilstander rekrutteres via pasientfellesskap."
        ],
        [
          "CATI",
          "Skriptede telefonintervjuer med kvoter etter spesialitet, setting eller marked. Brukes der listen er definert."
        ],
        [
          "Nettracking",
          "Månedlig eller kvartalsvis tracking på faste mål, slik at bevegelse kan leses mot samme base."
        ]
      ],
      "ctaTitle": "Fortell oss hvilken beslutning denne forskningen skal støtte.",
      "ctaBody": "Du får funnene, belegget bak dem og anbefalt neste steg.",
      "ctaPrimary": "Snakk med forskerteamet",
      "ctaSecondary": "Bli med"
    },
    "pt": {
      "kicker": "Setores",
      "title": "Saúde e ciências da vida",
      "lead": "Investigação para farmacêuticas, medtech e prestadores de cuidados: o percurso do doente, o que decidem os clínicos e o que limita o acesso.",
      "introKicker": "Como trabalhamos",
      "intro": [
        "O cuidado decide-se em mais de um lugar: no consultório, no pagador e em casa, onde o doente decide se continua.",
        "Estudamos cada um deles: como um doente passa do sintoma ao diagnóstico, o que um clínico pondera ao escolher um tratamento e o que o custo, a distância ou o estigma fazem ao acesso.",
        "Cada estudo é desenhado em torno da decisão que tem de sustentar — entrar num mercado, enquadrar a evidência, que especialidade abordar primeiro. Desenho, amostra e relatório decorrem dessa pergunta."
      ],
      "stagesKicker": "O que estudamos",
      "stages": [
        {
          "n": "01",
          "name": "Percurso do doente",
          "frame": "Onde o percurso trava, do sintoma ao diagnóstico e ao tratamento.",
          "cards": [
            {
              "title": "Percurso até ao diagnóstico",
              "body": "Mapear o caminho do primeiro sintoma ao diagnóstico confirmado, e os pontos onde os doentes se atrasam ou se perdem.",
              "methods": "Entrevistas em profundidade · inquérito a doentes"
            },
            {
              "title": "Tratamento e adesão",
              "body": "Acompanhar o que acontece após a prescrição: quem continua, quem pára e porquê.",
              "methods": "Inquérito a doentes · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Clínicos e prescrição",
          "frame": "O que um clínico pondera ao escolher um tratamento e o que não aceita.",
          "cards": [
            {
              "title": "Perceção e prescrição",
              "body": "Compreender como os especialistas percebem a doença, as opções e a evidência que as sustenta.",
              "methods": "Entrevistas em profundidade a médicos"
            },
            {
              "title": "Amostra de especialistas",
              "body": "Os especialistas são filtrados por subespecialidade, contexto de prática e volume de casos, e as credenciais são verificadas antes da entrevista.",
              "methods": "Amostra de profissionais verificada"
            }
          ]
        },
        {
          "n": "03",
          "name": "Acesso e pagamento",
          "frame": "Custo, cobertura, distância e estigma — e qual deles interrompe o tratamento.",
          "cards": [
            {
              "title": "Custo e acessibilidade",
              "body": "Estabelecer o que os doentes pagam, o que está coberto e onde o custo termina o tratamento.",
              "methods": "Inquérito a doentes · entrevistas em profundidade"
            },
            {
              "title": "Estigma e procura de cuidados",
              "body": "Estudar quando as pessoas adiam cuidados, e a quem recorrem primeiro.",
              "methods": "Inquérito a doentes · entrevistas em profundidade"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lançamento e acesso ao mercado",
          "frame": "Como a evidência é enquadrada e quem adota primeiro.",
          "cards": [
            {
              "title": "Teste de evidência e mensagem",
              "body": "Testar como a evidência clínica é compreendida pelos especialistas e pagadores que agem sobre ela.",
              "methods": "Teste de mensagem · entrevistas a especialistas"
            },
            {
              "title": "Adoção precoce",
              "body": "Identificar que centros e clínicos adotam primeiro, e do que precisam antes.",
              "methods": "Entrevistas em profundidade · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "O que é cada método e quando o usamos.",
      "methods": [
        [
          "Entrevistas em profundidade a médicos",
          "Entrevistas de 45 a 60 minutos com especialistas, com credenciais verificadas antes do trabalho de campo."
        ],
        [
          "Amostra de especialistas",
          "Os especialistas são filtrados por especialidade e subespecialidade, contexto de prática, volume de casos e autoridade de prescrição, com credenciais verificadas antes da entrevista."
        ],
        [
          "Inquérito a doentes",
          "Os doentes são inquiridos online ou por telefone, com quotas por doença, fase de tratamento, gravidade e mercado. As doenças raras são recrutadas através de comunidades de doentes."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, com quotas por especialidade, contexto ou mercado. Usadas quando a lista está definida."
        ],
        [
          "Tracking online",
          "Tracking mensal ou trimestral sobre medidas fixas, para ler o movimento contra a mesma base."
        ]
      ],
      "ctaTitle": "Diga-nos que decisão esta investigação tem de sustentar.",
      "ctaBody": "Recebe os resultados, as provas que os sustentam e o próximo passo recomendado.",
      "ctaPrimary": "Falar com a equipa",
      "ctaSecondary": "Junte-se a nós"
    },
    "ru": {
      "kicker": "Отрасли",
      "title": "Здравоохранение и науки о жизни",
      "lead": "Исследования для фармацевтических, medtech-компаний и поставщиков помощи: путь пациента, что решают врачи и что ограничивает доступ.",
      "introKicker": "Как мы работаем",
      "intro": [
        "Помощь решается более чем в одном месте: в кабинете, у плательщика и дома, где пациент решает, продолжать ли.",
        "Мы изучаем каждое из них: как пациент проходит от симптома к диагнозу, что врач взвешивает при выборе лечения и что стоимость, расстояние или стигма делают с доступом.",
        "Каждое исследование строится вокруг решения, которое оно должно поддержать — выходить ли на рынок, как подать доказательства, к какой специальности обратиться первой. Дизайн, выборка и отчёт следуют из этого вопроса."
      ],
      "stagesKicker": "Что мы изучаем",
      "stages": [
        {
          "n": "01",
          "name": "Путь пациента",
          "frame": "Где путь останавливается: от симптома к диагнозу и лечению.",
          "cards": [
            {
              "title": "Путь к диагнозу",
              "body": "Нанести маршрут от первого симптома до подтверждённого диагноза и точки, где пациенты задерживаются или теряются.",
              "methods": "Глубинные интервью · опрос пациентов"
            },
            {
              "title": "Лечение и приверженность",
              "body": "Проследить, что происходит после назначения: кто продолжает, кто бросает и почему.",
              "methods": "Опрос пациентов · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Врачи и назначение",
          "frame": "Что врач взвешивает при выборе лечения и чего не примет.",
          "cards": [
            {
              "title": "Восприятие и назначение",
              "body": "Понять, как специалисты воспринимают заболевание, варианты и доказательства за ними.",
              "methods": "Глубинные интервью с врачами"
            },
            {
              "title": "Выборка специалистов",
              "body": "Специалисты отбираются по субспециальности, условиям практики и объёму случаев; их квалификация проверяется до интервью.",
              "methods": "Проверенная выборка HCP"
            }
          ]
        },
        {
          "n": "03",
          "name": "Доступ и оплата",
          "frame": "Стоимость, покрытие, расстояние и стигма — и что из этого останавливает лечение.",
          "cards": [
            {
              "title": "Стоимость и доступность",
              "body": "Определить, сколько платят пациенты, что покрывается и где стоимость прекращает лечение.",
              "methods": "Опрос пациентов · глубинные интервью"
            },
            {
              "title": "Стигма и обращение за помощью",
              "body": "Изучить, когда люди откладывают помощь и к кому обращаются первыми.",
              "methods": "Опрос пациентов · глубинные интервью"
            }
          ]
        },
        {
          "n": "04",
          "name": "Запуск и доступ к рынку",
          "frame": "Как подаются доказательства и кто внедряет первым.",
          "cards": [
            {
              "title": "Тест доказательств и сообщения",
              "body": "Проверить, как клинические доказательства понимают специалисты и плательщики, которые действуют на их основе.",
              "methods": "Тест сообщения · интервью со специалистами"
            },
            {
              "title": "Раннее внедрение",
              "body": "Определить, какие центры и врачи внедряют первыми и что им нужно до этого.",
              "methods": "Глубинные интервью · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Методы",
      "methodsLead": "Что представляет собой каждый метод и когда мы его применяем.",
      "methods": [
        [
          "Глубинные интервью с врачами",
          "Интервью по 45–60 минут со специалистами, квалификация проверена до полевого этапа."
        ],
        [
          "Выборка специалистов",
          "Специалисты отбираются по специальности и субспециальности, условиям практики, объёму случаев и праву назначения; квалификация проверяется до интервью."
        ],
        [
          "Опрос пациентов",
          "Пациентов опрашивают онлайн или по телефону с квотами по заболеванию, этапу лечения, тяжести и рынку. Редкие заболевания набираются через сообщества пациентов."
        ],
        [
          "CATI",
          "Телефонные интервью по скрипту с квотами по специальности, условиям или рынку. Применяются там, где список определён."
        ],
        [
          "Онлайн-трекинг",
          "Ежемесячный или ежеквартальный трекинг по фиксированным показателям, чтобы читать динамику на одной базе."
        ]
      ],
      "ctaTitle": "Расскажите, какое решение должно поддержать это исследование.",
      "ctaBody": "Вы получаете результаты, доказательства за ними и рекомендуемый следующий шаг.",
      "ctaPrimary": "Поговорить с командой",
      "ctaSecondary": "Присоединиться"
    },
    "sv": {
      "kicker": "Branscher",
      "title": "Hälso- och life science",
      "lead": "Undersökningar för läkemedels-, medtech- och vårdaktörer: patientresan, vad kliniker beslutar och vad som begränsar tillgång.",
      "introKicker": "Så arbetar vi",
      "intro": [
        "Vård beslutas på mer än en plats: i mottagningen, hos betalaren och hemma, där patienten avgör om hen fortsätter.",
        "Vi undersöker var och en av dem: hur en patient rör sig från symtom till diagnos, vad en kliniker väger när hen väljer behandling, och vad kostnad, avstånd eller stigma gör med tillgången.",
        "Varje studie byggs kring det beslut den ska stödja — om en marknad ska beträdas, hur evidensen ramas in, vilken specialistgrupp som kontaktas först. Design, urval och rapportering följer den frågan."
      ],
      "stagesKicker": "Vad vi undersöker",
      "stages": [
        {
          "n": "01",
          "name": "Patientresa",
          "frame": "Var resan stannar, från symtom till diagnos till behandling.",
          "cards": [
            {
              "title": "Vägen till diagnos",
              "body": "Kartlägg vägen från första symtom till bekräftad diagnos, och punkterna där patienter fördröjs eller tappas.",
              "methods": "Djupintervjuer · patientundersökning"
            },
            {
              "title": "Behandling och följsamhet",
              "body": "Följ vad som händer efter förskrivningen: vilka som fortsätter, vilka som slutar och varför.",
              "methods": "Patientundersökning · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Kliniker och förskrivning",
          "frame": "Vad en kliniker väger vid val av behandling, och vad hen inte accepterar.",
          "cards": [
            {
              "title": "Uppfattning och förskrivning",
              "body": "Förstå hur specialister uppfattar tillståndet, alternativen och evidensen bakom dem.",
              "methods": "Djupintervjuer med läkare"
            },
            {
              "title": "Specialisturval",
              "body": "Specialister screenas på subspecialitet, praktikmiljö och ärendevolym, och deras meriter verifieras före intervjun.",
              "methods": "Verifierat HCP-urval"
            }
          ]
        },
        {
          "n": "03",
          "name": "Tillgång och betalning",
          "frame": "Kostnad, täckning, avstånd och stigma — och vilket av dem som stoppar behandlingen.",
          "cards": [
            {
              "title": "Kostnad och betalbarhet",
              "body": "Fastställa vad patienter betalar, vad som täcks och var kostnaden avslutar behandlingen.",
              "methods": "Patientundersökning · djupintervjuer"
            },
            {
              "title": "Stigma och vårdsökande",
              "body": "Undersöka när människor skjuter upp vård, och vem de vänder sig till först.",
              "methods": "Patientundersökning · djupintervjuer"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lansering och marknadstillgång",
          "frame": "Hur evidensen ramas in, och vem som tar den i bruk först.",
          "cards": [
            {
              "title": "Evidens- och budskapstest",
              "body": "Testa hur klinisk evidens förstås av de specialister och betalare som agerar på den.",
              "methods": "Budskapstest · specialistintervjuer"
            },
            {
              "title": "Tidig användning",
              "body": "Identifiera vilka center och kliniker som tar den i bruk först, och vad de behöver innan.",
              "methods": "Djupintervjuer · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Vad varje metod är och när vi använder den.",
      "methods": [
        [
          "Djupintervjuer med läkare",
          "Intervjuer på 45–60 minuter med specialister, med verifierade meriter före fältarbetet."
        ],
        [
          "Specialisturval",
          "Specialister screenas på specialitet och subspecialitet, praktikmiljö, ärendevolym och förskrivningsrätt, med verifierade meriter före intervjun."
        ],
        [
          "Patientundersökning",
          "Patienter tillfrågas online eller per telefon, med kvoter efter tillstånd, behandlingsfas, svårighetsgrad och marknad. Sällsynta tillstånd rekryteras via patientgemenskaper."
        ],
        [
          "CATI",
          "Skriptade telefonintervjuer med kvoter efter specialitet, miljö eller marknad. Används där listan är definierad."
        ],
        [
          "Onlinetracking",
          "Månatlig eller kvartalsvis tracking på fasta mått, så att rörelse kan läsas mot samma bas."
        ]
      ],
      "ctaTitle": "Berätta vilket beslut den här undersökningen ska stödja.",
      "ctaBody": "Du får resultaten, underlaget bakom dem och rekommenderat nästa steg.",
      "ctaPrimary": "Prata med forskarteamet",
      "ctaSecondary": "Var med"
    },
    "tr": {
      "kicker": "Sektörler",
      "title": "Sağlık ve yaşam bilimleri",
      "lead": "İlaç, medtech ve bakım sağlayıcıları için araştırma: hasta yolculuğu, klinisyenlerin ne kararlaştırdığı ve erişimi neyin sınırladığı.",
      "introKicker": "Nasıl çalışıyoruz",
      "intro": [
        "Bakım birden fazla yerde kararlaştırılır: muayenehanede, ödeyicide ve devam edip etmeyeceğine hastanın karar verdiği evde.",
        "Her birini inceliyoruz: hasta semptomdan teşhise nasıl geçiyor, klinisyen tedavi seçerken neyi tartıyor ve maliyet, mesafe ya da damgalama erişime ne yapıyor.",
        "Her çalışma, desteklemesi gereken kararın etrafında tasarlanır — pazara girip girmemek, kanıtı nasıl çerçevelemek, önce hangi uzmanlık grubuna yaklaşmak. Tasarım, örneklem ve rapor bu sorudan türetilir."
      ],
      "stagesKicker": "Neyi inceliyoruz",
      "stages": [
        {
          "n": "01",
          "name": "Hasta yolculuğu",
          "frame": "Yolculuğun nerede tıkandığı; semptomdan teşhise, tedaviye.",
          "cards": [
            {
              "title": "Teşhise giden yol",
              "body": "İlk semptomdan doğrulanmış teşhise giden yolu ve hastaların geciktiği ya da kaybolduğu noktaları haritalayın.",
              "methods": "Derinlemesine görüşmeler · hasta anketi"
            },
            {
              "title": "Tedavi ve uyum",
              "body": "Reçeteden sonra ne olduğunu izleyin: kim devam ediyor, kim bırakıyor ve neden.",
              "methods": "Hasta anketi · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Klinisyenler ve reçete",
          "frame": "Klinisyenin tedavi seçerken neyi tarttığı ve neyi kabul etmeyeceği.",
          "cards": [
            {
              "title": "Algı ve reçete",
              "body": "Uzmanların hastalığı, seçenekleri ve arkalarındaki kanıtı nasıl algıladığını anlayın.",
              "methods": "Hekim derinlemesine görüşmeleri"
            },
            {
              "title": "Uzman örneklemi",
              "body": "Uzmanlar alt uzmanlık, uygulama ortamı ve vaka hacmine göre elenir; yetkinlikleri görüşmeden önce doğrulanır.",
              "methods": "Doğrulanmış HCP örneklemi"
            }
          ]
        },
        {
          "n": "03",
          "name": "Erişim ve ödeme",
          "frame": "Maliyet, kapsam, mesafe ve damgalama — ve bunlardan hangisinin tedaviyi durdurduğu.",
          "cards": [
            {
              "title": "Maliyet ve karşılanabilirlik",
              "body": "Hastaların ne ödediğini, neyin kapsandığını ve maliyetin tedaviyi nerede bitirdiğini belirleyin.",
              "methods": "Hasta anketi · derinlemesine görüşmeler"
            },
            {
              "title": "Damgalama ve yardım arama",
              "body": "İnsanların bakımı ne zaman ertelediğini ve önce kime başvurduğunu inceleyin.",
              "methods": "Hasta anketi · derinlemesine görüşmeler"
            }
          ]
        },
        {
          "n": "04",
          "name": "Lansman ve pazar erişimi",
          "frame": "Kanıtın nasıl çerçevelendiği ve kimin önce benimsediği.",
          "cards": [
            {
              "title": "Kanıt ve mesaj testi",
              "body": "Klinik kanıtın, ona göre hareket eden uzmanlar ve ödeyiciler tarafından nasıl anlaşıldığını test edin.",
              "methods": "Mesaj testi · uzman görüşmeleri"
            },
            {
              "title": "Erken benimseme",
              "body": "Hangi merkezlerin ve klinisyenlerin önce benimsediğini ve öncesinde neye ihtiyaç duyduklarını belirleyin.",
              "methods": "Derinlemesine görüşmeler · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Yöntemler",
      "methodsLead": "Her yöntemin ne olduğu ve ne zaman kullandığımız.",
      "methods": [
        [
          "Hekim derinlemesine görüşmeleri",
          "Uzmanlarla 45-60 dakikalık görüşmeler; yetkinlikler saha çalışmasından önce doğrulanır."
        ],
        [
          "Uzman örneklemi",
          "Uzmanlar uzmanlık ve alt uzmanlık, uygulama ortamı, vaka hacmi ve reçete yetkisine göre elenir; yetkinlikler görüşmeden önce doğrulanır."
        ],
        [
          "Hasta anketi",
          "Hastalarla çevrimiçi veya telefonla anket yapılır; hastalık, tedavi aşaması, şiddet ve pazara göre kotalar. Nadir hastalıklar hasta toplulukları aracılığıyla toplanır."
        ],
        [
          "CATI",
          "Uzmanlık, ortam veya pazara göre kotalı, senaryolu telefon görüşmeleri. Listenin tanımlı olduğu yerlerde kullanılır."
        ],
        [
          "Çevrimiçi tracking",
          "Sabit ölçütlerle aylık veya üç aylık tracking; hareket aynı taban üzerinden okunur."
        ]
      ],
      "ctaTitle": "Bu araştırmanın hangi kararı desteklemesi gerektiğini bize anlatın.",
      "ctaBody": "Bulguları, arkalarındaki kanıtları ve önerilen sonraki adımı alırsınız.",
      "ctaPrimary": "Araştırma ekibiyle konuşun",
      "ctaSecondary": "Katılın"
    }
  },
  "finance": {
    "en-US": {
      "kicker": "Industries",
      "title": "Financial services & wealth",
      "lead": "Research for banks, wealth managers and fintechs: what clients trust, what they will pay for, and why they leave.",
      "introKicker": "How we work",
      "intro": [
        "Trust in financial services is built slowly and lost in a single interaction: a fee that was not explained, a transfer that failed, a call that was not answered.",
        "We study the client and the advisor separately: how investors compare and decide, what they will pay for, what advisors recommend and why, and where the experience breaks.",
        "Each study is designed around the decision it has to support — whether to enter a segment, how to price a product, which channel carries growth, and why clients leave. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Customer and assets",
          "frame": "Who the client is, and where the assets sit.",
          "cards": [
            {
              "title": "Affluent segmentation",
              "body": "Segment clients by investable assets, product holding and market, and size each group before the proposition is built.",
              "methods": "HNW sample · online survey"
            },
            {
              "title": "Investment behaviour and trust",
              "body": "Understand how investors decide, what they trust, and how a recommendation is followed or ignored.",
              "methods": "In-depth interviews · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Advisors and distribution",
          "frame": "Who recommends, and through which platform.",
          "cards": [
            {
              "title": "Advisor ecosystem",
              "body": "How advisors and distribution partners use platforms, and where digital tools change what they recommend.",
              "methods": "Advisor in-depth interviews"
            },
            {
              "title": "Share of wallet",
              "body": "Establish how much of a client’s assets sit with one provider, and what moves the rest.",
              "methods": "HNW survey · advisor interviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Product and pricing",
          "frame": "What it costs, and what it is worth.",
          "cards": [
            {
              "title": "Pricing and fees",
              "body": "Test fee structures and price points against willingness to pay, before the proposition is launched.",
              "methods": "Price sensitivity models · HNW survey"
            },
            {
              "title": "Product and feature testing",
              "body": "Test propositions and platform features with the clients they are built for.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "04",
          "name": "Experience and retention",
          "frame": "Whether the client stays, and why not.",
          "cards": [
            {
              "title": "Client experience",
              "body": "Measure the client experience and the drivers of switching among wealth clients.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Retention and churn",
              "body": "Track retention, share of wallet and the reasons clients leave.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "HNW sample",
          "Clients recruited through verified wealth panels and referral, screened by investable assets, product holding and market."
        ],
        [
          "Advisor in-depth interviews",
          "Interviews of 45 to 60 minutes with advisors, family office and platform staff, run one to one by the research team."
        ],
        [
          "Online survey",
          "Survey of clients or prospects, with quotas by assets, product holding and market."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by market, product holding or client segment. Used where the list is defined."
        ],
        [
          "Price sensitivity models",
          "Willingness-to-pay and price-sensitivity models, reported as a range with the assumptions stated."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "金融与财富管理",
      "lead": "面向银行、财富管理机构与金融科技：客户信任什么、愿意为什么付费、以及为何离开。",
      "introKicker": "我们如何做",
      "intro": [
        "金融行业的信任建立缓慢，却可能在一次交互中失去：一笔未说明的费用、一次未到账的转账、一个无人接听的电话。",
        "我们把客户和顾问分开研究：投资者如何比较与决定、愿意为什么付费，顾问推荐什么、为何推荐，以及体验在哪个环节中断。",
        "每项研究都围绕它要支撑的决定来设计：要不要进一个客群、产品怎么定价、哪个渠道带来增长、客户为什么离开。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "客群与资产",
          "frame": "客户是谁，资产在哪里。",
          "cards": [
            {
              "title": "高净值客群分层",
              "body": "按可投资资产、持有产品与市场划分客群，并在产品设计之前把每一群的规模算清。",
              "methods": "高净值样本 · 线上问卷"
            },
            {
              "title": "投资行为与信任",
              "body": "了解投资者如何决定、相信什么，以及一条建议是被采纳还是被忽略。",
              "methods": "深度访谈 · 电话访问"
            }
          ]
        },
        {
          "n": "02",
          "name": "顾问与渠道",
          "frame": "谁在推荐，通过什么平台。",
          "cards": [
            {
              "title": "顾问生态",
              "body": "顾问与分销伙伴如何使用平台，数字化工具又在哪一步改变了他们的推荐。",
              "methods": "顾问深度访谈"
            },
            {
              "title": "钱包份额",
              "body": "确定客户的资产有多少集中于同一家机构，以及促使其余部分转移的因素。",
              "methods": "高净值问卷 · 顾问访谈"
            }
          ]
        },
        {
          "n": "03",
          "name": "产品与定价",
          "frame": "收多少，值不值。",
          "cards": [
            {
              "title": "定价与费用",
              "body": "在产品上线之前，用支付意愿测试费用结构与价格点。",
              "methods": "价格敏感度模型 · 高净值问卷"
            },
            {
              "title": "产品与功能测试",
              "body": "用产品真正服务的那批客户，测试方案与平台功能。",
              "methods": "概念与 A/B 测试"
            }
          ]
        },
        {
          "n": "04",
          "name": "体验与留存",
          "frame": "客户是否留存，以及离开的原因。",
          "cards": [
            {
              "title": "客户体验",
              "body": "测量财富客户的体验，以及促使他们换机构的原因。",
              "methods": "线上问卷 · 深度访谈"
            },
            {
              "title": "留存与流失",
              "body": "追踪留存、钱包份额，以及客户离开的原因。",
              "methods": "追踪 · 电话访问"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "高净值样本",
          "通过核实过的高净值样本库与转介绍招募，按可投资资产、持有产品与市场筛选。"
        ],
        [
          "顾问深度访谈",
          "与顾问、家族办公室及平台人员做 45–60 分钟一对一访谈，由研究人员执行。"
        ],
        [
          "线上问卷",
          "面向客户或潜在客户的问卷，配额按资产、持有产品与市场设定。"
        ],
        [
          "电话访问（CATI）",
          "按脚本执行电话访问，配额按市场、持有产品或客群设定。用于名单明确的项目。"
        ],
        [
          "价格敏感度模型",
          "支付意愿与价格敏感度模型，结果以价格区间呈现，并写明所依据的假设。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "金融與財富管理",
      "lead": "面向銀行、財富管理機構與金融科技：客戶信任什麼、願意為什麼付費、以及為何離開。",
      "introKicker": "我們如何做",
      "intro": [
        "金融行業的信任建立緩慢，卻可能在一次互動中失去：一筆未說明的費用、一次未到帳的轉帳、一個無人接聽的電話。",
        "我們把客戶和顧問分開研究：投資者如何比較與決定、願意為什麼付費，顧問推薦什麼、為何推薦，以及體驗在哪個環節中斷。",
        "每項研究都圍繞它要支撐的決定來設計：要不要進一個客群、產品怎麼定價、哪個渠道帶來增長、客戶為什麼離開。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "客群與資產",
          "frame": "客戶是誰，資產在哪裡。",
          "cards": [
            {
              "title": "高淨值客群分層",
              "body": "按可投資資產、持有產品與市場劃分客群，並在產品設計之前把每一群的規模算清。",
              "methods": "高淨值樣本 · 線上問卷"
            },
            {
              "title": "投資行為與信任",
              "body": "了解投資者如何決定、相信什麼，以及一條建議是被採納還是被忽略。",
              "methods": "深度訪談 · 電話訪問"
            }
          ]
        },
        {
          "n": "02",
          "name": "顧問與渠道",
          "frame": "誰在推薦，透過什麼平台。",
          "cards": [
            {
              "title": "顧問生態",
              "body": "顧問與分銷夥伴如何使用平台，數位工具又在哪一步改變了他們的推薦。",
              "methods": "顧問深度訪談"
            },
            {
              "title": "錢包份額",
              "body": "確定客戶的資產有多少集中於同一家機構，以及促使其餘部分轉移的因素。",
              "methods": "高淨值問卷 · 顧問訪談"
            }
          ]
        },
        {
          "n": "03",
          "name": "產品與定價",
          "frame": "收多少，值不值。",
          "cards": [
            {
              "title": "定價與費用",
              "body": "在產品上線之前，用支付意願測試費用結構與價格點。",
              "methods": "價格敏感度模型 · 高淨值問卷"
            },
            {
              "title": "產品與功能測試",
              "body": "用產品真正服務的那批客戶，測試方案與平台功能。",
              "methods": "概念與 A/B 測試"
            }
          ]
        },
        {
          "n": "04",
          "name": "體驗與留存",
          "frame": "客戶是否留存，以及離開的原因。",
          "cards": [
            {
              "title": "客戶體驗",
              "body": "測量財富客戶的體驗，以及促使他們換機構的原因。",
              "methods": "線上問卷 · 深度訪談"
            },
            {
              "title": "留存與流失",
              "body": "追蹤留存、錢包份額，以及客戶離開的原因。",
              "methods": "追蹤 · 電話訪問"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "高淨值樣本",
          "透過核實過的高淨值樣本庫與轉介紹招募，按可投資資產、持有產品與市場篩選。"
        ],
        [
          "顧問深度訪談",
          "與顧問、家族辦公室及平台人員做 45–60 分鐘一對一訪談，由研究人員執行。"
        ],
        [
          "線上問卷",
          "面向客戶或潛在客戶的問卷，配額按資產、持有產品與市場設定。"
        ],
        [
          "電話訪問（CATI）",
          "按腳本執行電話訪問，配額按市場、持有產品或客群設定。用於名單明確的專案。"
        ],
        [
          "價格敏感度模型",
          "支付意願與價格敏感度模型，結果以價格區間呈現，並寫明所依據的假設。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Financial services & wealth",
      "lead": "Research for banks, wealth managers and fintechs: what clients trust, what they will pay for, and why they leave.",
      "introKicker": "How we work",
      "intro": [
        "Trust in financial services is built slowly and lost in a single interaction: a fee that was not explained, a transfer that failed, a call that was not answered.",
        "We study the client and the advisor separately: how investors compare and decide, what they will pay for, what advisors recommend and why, and where the experience breaks.",
        "Each study is designed around the decision it has to support — whether to enter a segment, how to price a product, which channel carries growth, and why clients leave. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Customer and assets",
          "frame": "Who the client is, and where the assets sit.",
          "cards": [
            {
              "title": "Affluent segmentation",
              "body": "Segment clients by investable assets, product holding and market, and size each group before the proposition is built.",
              "methods": "HNW sample · online survey"
            },
            {
              "title": "Investment behaviour and trust",
              "body": "Understand how investors decide, what they trust, and how a recommendation is followed or ignored.",
              "methods": "In-depth interviews · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Advisors and distribution",
          "frame": "Who recommends, and through which platform.",
          "cards": [
            {
              "title": "Advisor ecosystem",
              "body": "How advisors and distribution partners use platforms, and where digital tools change what they recommend.",
              "methods": "Advisor in-depth interviews"
            },
            {
              "title": "Share of wallet",
              "body": "Establish how much of a client’s assets sit with one provider, and what moves the rest.",
              "methods": "HNW survey · advisor interviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Product and pricing",
          "frame": "What it costs, and what it is worth.",
          "cards": [
            {
              "title": "Pricing and fees",
              "body": "Test fee structures and price points against willingness to pay, before the proposition is launched.",
              "methods": "Price sensitivity models · HNW survey"
            },
            {
              "title": "Product and feature testing",
              "body": "Test propositions and platform features with the clients they are built for.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "04",
          "name": "Experience and retention",
          "frame": "Whether the client stays, and why not.",
          "cards": [
            {
              "title": "Client experience",
              "body": "Measure the client experience and the drivers of switching among wealth clients.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Retention and churn",
              "body": "Track retention, share of wallet and the reasons clients leave.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "HNW sample",
          "Clients recruited through verified wealth panels and referral, screened by investable assets, product holding and market."
        ],
        [
          "Advisor in-depth interviews",
          "Interviews of 45 to 60 minutes with advisors, family office and platform staff, run one to one by the research team."
        ],
        [
          "Online survey",
          "Survey of clients or prospects, with quotas by assets, product holding and market."
        ],
        [
          "CATI",
          "Scripted telephone interviews, with quotas set by market, product holding or client segment. Used where the list is defined."
        ],
        [
          "Price sensitivity models",
          "Willingness-to-pay and price-sensitivity models, reported as a range with the assumptions stated."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "de": {
      "kicker": "Branchen",
      "title": "Finanzdienstleistungen und Vermögensverwaltung",
      "lead": "Forschung für Banken, Vermögensverwalter und Fintechs: was Kunden vertrauen, wofür sie zahlen und warum sie gehen.",
      "introKicker": "So arbeiten wir",
      "intro": [
        "Vertrauen in Finanzdienstleistungen entsteht langsam und geht in einer einzigen Interaktion verloren: eine Gebühr, die nicht erklärt wurde, eine Überweisung, die scheiterte, ein Anruf, der nicht beantwortet wurde.",
        "Wir untersuchen Kunde und Berater getrennt: wie Anleger vergleichen und entscheiden, wofür sie zahlen, was Berater empfehlen und warum, und wo das Erlebnis bricht.",
        "Jede Studie wird um die Entscheidung herum konzipiert, die sie stützen soll — ob ein Segment betreten wird, wie ein Produkt bepreist wird, welcher Kanal Wachstum trägt und warum Kunden gehen. Design, Stichprobe und Bericht folgen dieser Frage."
      ],
      "stagesKicker": "Was wir untersuchen",
      "stages": [
        {
          "n": "01",
          "name": "Kunde und Vermögen",
          "frame": "Wer der Kunde ist und wo die Vermögen liegen.",
          "cards": [
            {
              "title": "Segmentierung vermögender Kunden",
              "body": "Kunden nach investierbarem Vermögen, Produkthaltung und Markt segmentieren und jede Gruppe beziffern, bevor das Angebot gebaut wird.",
              "methods": "HNW-Stichprobe · Online-Befragung"
            },
            {
              "title": "Anlageverhalten und Vertrauen",
              "body": "Verstehen, wie Anleger entscheiden, was sie vertrauen und wie eine Empfehlung befolgt oder ignoriert wird.",
              "methods": "Tiefeninterviews · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Berater und Vertrieb",
          "frame": "Wer empfiehlt und über welche Plattform.",
          "cards": [
            {
              "title": "Berater-Ökosystem",
              "body": "Wie Berater und Vertriebspartner Plattformen nutzen und wo digitale Werkzeuge ihre Empfehlungen verändern.",
              "methods": "Tiefeninterviews mit Beratern"
            },
            {
              "title": "Anteil am Vermögen",
              "body": "Feststellen, wie viel des Kundenvermögens bei einem Anbieter liegt und was den Rest bewegt.",
              "methods": "HNW-Befragung · Beraterinterviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Produkt und Preis",
          "frame": "Was es kostet und was es wert ist.",
          "cards": [
            {
              "title": "Preis und Gebühren",
              "body": "Gebührenstrukturen und Preispunkte gegen Zahlungsbereitschaft testen, bevor das Angebot startet.",
              "methods": "Preissensitivitätsmodelle · HNW-Befragung"
            },
            {
              "title": "Produkt- und Funktionstests",
              "body": "Angebote und Plattformfunktionen mit den Kunden testen, für die sie gebaut sind.",
              "methods": "Konzept- und A/B-Tests"
            }
          ]
        },
        {
          "n": "04",
          "name": "Erlebnis und Bindung",
          "frame": "Ob der Kunde bleibt und warum nicht.",
          "cards": [
            {
              "title": "Kundenerlebnis",
              "body": "Das Kundenerlebnis und die Wechseltreiber unter Vermögenskunden messen.",
              "methods": "Online-Befragung · Tiefeninterviews"
            },
            {
              "title": "Bindung und Abwanderung",
              "body": "Bindung, Vermögensanteil und die Gründe für Abwanderung verfolgen.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Was jede Methode ist und wann wir sie einsetzen.",
      "methods": [
        [
          "HNW-Stichprobe",
          "Kunden über verifizierte Vermögenspanels und Empfehlungen rekrutiert, gescreent nach investierbarem Vermögen, Produkthaltung und Markt."
        ],
        [
          "Tiefeninterviews mit Beratern",
          "Interviews von 45 bis 60 Minuten mit Beratern, Family Offices und Plattformmitarbeitern, eins zu eins vom Forschungsteam geführt."
        ],
        [
          "Online-Befragung",
          "Befragung von Kunden oder Interessenten mit Quoten nach Vermögen, Produkthaltung und Markt."
        ],
        [
          "CATI",
          "Standardisierte Telefoninterviews mit Quoten nach Markt, Produkthaltung oder Kundensegment. Eingesetzt, wo die Liste definiert ist."
        ],
        [
          "Preissensitivitätsmodelle",
          "Zahlungsbereitschafts- und Preissensitivitätsmodelle, als Bandbreite mit ausgewiesenen Annahmen berichtet."
        ]
      ],
      "ctaTitle": "Sagen Sie uns, welche Entscheidung diese Forschung stützen soll.",
      "ctaBody": "Sie erhalten die Ergebnisse, die Belege dahinter und den empfohlenen nächsten Schritt.",
      "ctaPrimary": "Mit dem Forschungsteam sprechen",
      "ctaSecondary": "Mitmachen"
    },
    "fr": {
      "kicker": "Secteurs",
      "title": "Services financiers et gestion de patrimoine",
      "lead": "Études pour les banques, les gérants de patrimoine et les fintechs : ce en quoi les clients ont confiance, ce qu'ils paient et pourquoi ils partent.",
      "introKicker": "Notre méthode",
      "intro": [
        "La confiance dans les services financiers se construit lentement et se perd en une seule interaction : des frais non expliqués, un virement échoué, un appel sans réponse.",
        "Nous étudions le client et le conseiller séparément : comment les investisseurs comparent et décident, ce qu'ils paient, ce que les conseillers recommandent et pourquoi, et où l'expérience se brise.",
        "Chaque étude est conçue autour de la décision qu'elle doit éclairer — entrer sur un segment, fixer le prix d'un produit, quel canal porte la croissance et pourquoi les clients partent. Design, échantillon et rapport découlent de cette question."
      ],
      "stagesKicker": "Ce que nous étudions",
      "stages": [
        {
          "n": "01",
          "name": "Client et actifs",
          "frame": "Qui est le client, et où se situent les actifs.",
          "cards": [
            {
              "title": "Segmentation des clients aisés",
              "body": "Segmenter les clients par actifs investissables, détention de produits et marché, et dimensionner chaque groupe avant de construire l'offre.",
              "methods": "Échantillon HNW · enquête en ligne"
            },
            {
              "title": "Comportement d'investissement et confiance",
              "body": "Comprendre comment les investisseurs décident, ce qu'ils croient et comment une recommandation est suivie ou ignorée.",
              "methods": "Entretiens approfondis · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Conseillers et distribution",
          "frame": "Qui recommande, et via quelle plateforme.",
          "cards": [
            {
              "title": "Écosystème de conseillers",
              "body": "Comment les conseillers et partenaires de distribution utilisent les plateformes, et où les outils numériques changent leurs recommandations.",
              "methods": "Entretiens approfondis conseillers"
            },
            {
              "title": "Part du patrimoine",
              "body": "Établir quelle part des actifs d'un client se trouve chez un fournisseur, et ce qui fait bouger le reste.",
              "methods": "Enquête HNW · entretiens conseillers"
            }
          ]
        },
        {
          "n": "03",
          "name": "Produit et tarification",
          "frame": "Ce que cela coûte, et ce que cela vaut.",
          "cards": [
            {
              "title": "Prix et frais",
              "body": "Tester les structures de frais et les niveaux de prix face à la disposition à payer, avant le lancement de l'offre.",
              "methods": "Modèles de sensibilité au prix · enquête HNW"
            },
            {
              "title": "Test de produit et de fonctionnalités",
              "body": "Tester offres et fonctionnalités avec les clients pour lesquels elles sont conçues.",
              "methods": "Tests de concept et A/B"
            }
          ]
        },
        {
          "n": "04",
          "name": "Expérience et fidélisation",
          "frame": "Si le client reste, et pourquoi non.",
          "cards": [
            {
              "title": "Expérience client",
              "body": "Mesurer l'expérience client et les moteurs du changement de fournisseur chez les clients fortunés.",
              "methods": "Enquête en ligne · entretiens approfondis"
            },
            {
              "title": "Fidélisation et attrition",
              "body": "Suivre la fidélisation, la part de patrimoine et les raisons de départ.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Méthodes",
      "methodsLead": "Ce qu'est chaque méthode et quand nous l'utilisons.",
      "methods": [
        [
          "Échantillon HNW",
          "Clients recrutés via des panels patrimoniaux vérifiés et par recommandation, filtrés par actifs investissables, détention de produits et marché."
        ],
        [
          "Entretiens approfondis conseillers",
          "Entretiens de 45 à 60 minutes avec conseillers, family offices et équipes de plateforme, menés en tête-à-tête par l'équipe."
        ],
        [
          "Enquête en ligne",
          "Enquête auprès de clients ou de prospects, avec quotas par actifs, détention de produits et marché."
        ],
        [
          "CATI",
          "Entretiens téléphoniques scriptés, avec quotas par marché, détention de produits ou segment de clientèle. Utilisés lorsque la liste est définie."
        ],
        [
          "Modèles de sensibilité au prix",
          "Modèles de disposition à payer et de sensibilité au prix, présentés en fourchette avec les hypothèses explicitées."
        ]
      ],
      "ctaTitle": "Dites-nous quelle décision cette étude doit éclairer.",
      "ctaBody": "Vous recevez les résultats, les preuves qui les sous-tendent et la prochaine étape recommandée.",
      "ctaPrimary": "Parler à l'équipe",
      "ctaSecondary": "Nous rejoindre"
    },
    "nl": {
      "kicker": "Sectoren",
      "title": "Financiële dienstverlening en vermogensbeheer",
      "lead": "Onderzoek voor banken, vermogensbeheerders en fintechs: wat klanten vertrouwen, waarvoor zij betalen en waarom zij vertrekken.",
      "introKicker": "Zo werken we",
      "intro": [
        "Vertrouwen in financiële dienstverlening ontstaat langzaam en verdwijnt in één interactie: een vergoeding die niet is uitgelegd, een overboeking die mislukte, een gesprek dat niet werd beantwoord.",
        "We onderzoeken klant en adviseur apart: hoe beleggers vergelijken en beslissen, waarvoor zij betalen, wat adviseurs aanbevelen en waarom, en waar de ervaring breekt.",
        "Elke studie wordt opgebouwd rond de beslissing die zij moet ondersteunen — een segment betreden, een product prijzen, welk kanaal groei draagt en waarom klanten vertrekken. Ontwerp, steekproef en rapportage volgen die vraag."
      ],
      "stagesKicker": "Wat we onderzoeken",
      "stages": [
        {
          "n": "01",
          "name": "Klant en vermogen",
          "frame": "Wie de klant is en waar het vermogen zit.",
          "cards": [
            {
              "title": "Segmentatie van vermogende klanten",
              "body": "Klanten segmenteren naar belegbaar vermogen, productbezit en markt, en elke groep kwantificeren voordat het aanbod wordt gebouwd.",
              "methods": "HNW-steekproef · online-enquête"
            },
            {
              "title": "Beleggingsgedrag en vertrouwen",
              "body": "Begrijpen hoe beleggers beslissen, wat zij vertrouwen en hoe een advies wordt opgevolgd of genegeerd.",
              "methods": "Diepte-interviews · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Adviseurs en distributie",
          "frame": "Wie adviseert, en via welk platform.",
          "cards": [
            {
              "title": "Adviseurs-ecosysteem",
              "body": "Hoe adviseurs en distributiepartners platforms gebruiken, en waar digitale tools hun advies veranderen.",
              "methods": "Diepte-interviews met adviseurs"
            },
            {
              "title": "Aandeel in het vermogen",
              "body": "Vaststellen welk deel van het klantvermogen bij één aanbieder zit, en wat de rest beweegt.",
              "methods": "HNW-enquête · adviseursinterviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Product en prijs",
          "frame": "Wat het kost en wat het waard is.",
          "cards": [
            {
              "title": "Prijs en kosten",
              "body": "Kostenstructuren en prijspunten testen tegen betalingsbereidheid, voordat het aanbod start.",
              "methods": "Prijsgevoeligheidsmodellen · HNW-enquête"
            },
            {
              "title": "Product- en functietests",
              "body": "Aanbod en platformfuncties testen met de klanten voor wie ze zijn gebouwd.",
              "methods": "Concept- en A/B-tests"
            }
          ]
        },
        {
          "n": "04",
          "name": "Ervaring en behoud",
          "frame": "Of de klant blijft, en waarom niet.",
          "cards": [
            {
              "title": "Klantbeleving",
              "body": "De klantbeleving en de drijfveren om te wisselen onder vermogende klanten meten.",
              "methods": "Online-enquête · diepte-interviews"
            },
            {
              "title": "Behoud en uitstroom",
              "body": "Behoud, aandeel in het vermogen en redenen om te vertrekken volgen.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Wat elke methode is en wanneer we die gebruiken.",
      "methods": [
        [
          "HNW-steekproef",
          "Klanten geworven via geverifieerde vermogenspanels en doorverwijzing, gescreend op belegbaar vermogen, productbezit en markt."
        ],
        [
          "Diepte-interviews met adviseurs",
          "Interviews van 45 tot 60 minuten met adviseurs, family offices en platformmedewerkers, één op één door het onderzoeksteam."
        ],
        [
          "Online-enquête",
          "Enquête onder klanten of prospects, met quota naar vermogen, productbezit en markt."
        ],
        [
          "CATI",
          "Gescripte telefonische interviews, met quota naar markt, productbezit of klantsegment. Gebruikt waar de lijst gedefinieerd is."
        ],
        [
          "Prijsgevoeligheidsmodellen",
          "Betalingsbereidheids- en prijsgevoeligheidsmodellen, gerapporteerd als bandbreedte met vermelde aannames."
        ]
      ],
      "ctaTitle": "Vertel ons welke beslissing dit onderzoek moet ondersteunen.",
      "ctaBody": "U ontvangt de resultaten, het bewijs erachter en de aanbevolen volgende stap.",
      "ctaPrimary": "Praat met het onderzoeksteam",
      "ctaSecondary": "Doe mee"
    },
    "da": {
      "kicker": "Brancher",
      "title": "Finansielle ydelser og formue",
      "lead": "Research for banker, formueforvaltere og fintechs: hvad kunderne har tillid til, hvad de betaler for, og hvorfor de forsvinder.",
      "introKicker": "Sådan arbejder vi",
      "intro": [
        "Tillid til finansielle ydelser opbygges langsomt og mistes i én enkelt interaktion: et gebyr, der ikke blev forklaret, en overførsel, der fejlede, et opkald, der ikke blev besvaret.",
        "Vi undersøger kunde og rådgiver hver for sig: hvordan investorer sammenligner og beslutter, hvad de betaler for, hvad rådgivere anbefaler og hvorfor, og hvor oplevelsen brister.",
        "Hver undersøgelse designes om den beslutning, den skal understøtte — om et segment skal betrædes, hvordan et produkt prissættes, hvilken kanal der bærer væksten, og hvorfor kunder forsvinder. Design, stikprøve og rapportering følger det spørgsmål."
      ],
      "stagesKicker": "Hvad vi undersøger",
      "stages": [
        {
          "n": "01",
          "name": "Kunde og formue",
          "frame": "Hvem kunden er, og hvor formuen ligger.",
          "cards": [
            {
              "title": "Segmentering af formuende kunder",
              "body": "Segmentér kunder efter investerbar formue, produktbesiddelse og marked, og størrelsesbestem hver gruppe, før tilbuddet bygges.",
              "methods": "HNW-stikprøve · onlineundersøgelse"
            },
            {
              "title": "Investeringsadfærd og tillid",
              "body": "Forstå, hvordan investorer beslutter, hvad de har tillid til, og hvordan en anbefaling følges eller ignoreres.",
              "methods": "Dybdeinterviews · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Rådgivere og distribution",
          "frame": "Hvem der anbefaler, og via hvilken platform.",
          "cards": [
            {
              "title": "Rådgiverøkosystem",
              "body": "Hvordan rådgivere og distributionspartnere bruger platforme, og hvor digitale værktøjer ændrer deres anbefalinger.",
              "methods": "Dybdeinterviews med rådgivere"
            },
            {
              "title": "Andel af formuen",
              "body": "Fastslå, hvor stor en del af kundens formue der ligger hos én udbyder, og hvad der flytter resten.",
              "methods": "HNW-undersøgelse · rådgiverinterviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Produkt og prissætning",
          "frame": "Hvad det koster, og hvad det er værd.",
          "cards": [
            {
              "title": "Pris og gebyrer",
              "body": "Test gebyrstrukturer og prispunkter mod betalingsvillighed, før tilbuddet lanceres.",
              "methods": "Prisfølsomhedsmodeller · HNW-undersøgelse"
            },
            {
              "title": "Produkt- og funktionstest",
              "body": "Test tilbud og platformfunktioner med de kunder, de er bygget til.",
              "methods": "Koncept- og A/B-test"
            }
          ]
        },
        {
          "n": "04",
          "name": "Oplevelse og fastholdelse",
          "frame": "Om kunden bliver, og hvorfor ikke.",
          "cards": [
            {
              "title": "Kundeoplevelse",
              "body": "Mål kundeoplevelsen og drivkræfterne for skift blandt formuende kunder.",
              "methods": "Onlineundersøgelse · dybdeinterviews"
            },
            {
              "title": "Fastholdelse og frafald",
              "body": "Følg fastholdelse, andel af formue og årsagerne til, at kunder forsvinder.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hvad hver metode er, og hvornår vi bruger den.",
      "methods": [
        [
          "HNW-stikprøve",
          "Kunder rekrutteret via verificerede formuepaneler og henvisning, screenet efter investerbar formue, produktbesiddelse og marked."
        ],
        [
          "Dybdeinterviews med rådgivere",
          "Interviews på 45-60 minutter med rådgivere, family offices og platformmedarbejdere, gennemført en til en af researchteamet."
        ],
        [
          "Onlineundersøgelse",
          "Undersøgelse blandt kunder eller prospects, med kvoter efter formue, produktbesiddelse og marked."
        ],
        [
          "CATI",
          "Scriptede telefoninterviews med kvoter efter marked, produktbesiddelse eller kundesegment. Bruges, hvor listen er defineret."
        ],
        [
          "Prisfølsomhedsmodeller",
          "Betalingsvilligheds- og prisfølsomhedsmodeller, rapporteret som interval med angivne antagelser."
        ]
      ],
      "ctaTitle": "Fortæl os, hvilken beslutning denne research skal understøtte.",
      "ctaBody": "Du får resultaterne, belægget bag dem og det anbefalede næste skridt.",
      "ctaPrimary": "Tal med researchteamet",
      "ctaSecondary": "Vær med"
    },
    "es": {
      "kicker": "Sectores",
      "title": "Servicios financieros y patrimonio",
      "lead": "Investigación para bancos, gestores de patrimonio y fintechs: en qué confían los clientes, por qué pagan y por qué se van.",
      "introKicker": "Cómo trabajamos",
      "intro": [
        "La confianza en los servicios financieros se construye despacio y se pierde en una sola interacción: una comisión no explicada, una transferencia fallida, una llamada sin respuesta.",
        "Estudiamos al cliente y al asesor por separado: cómo comparan y deciden los inversores, por qué pagan, qué recomiendan los asesores y por qué, y dónde se rompe la experiencia.",
        "Cada estudio se diseña en torno a la decisión que debe sostener — entrar en un segmento, fijar el precio de un producto, qué canal sostiene el crecimiento y por qué se van los clientes. El diseño, la muestra y el informe se derivan de esa pregunta."
      ],
      "stagesKicker": "Qué estudiamos",
      "stages": [
        {
          "n": "01",
          "name": "Cliente y patrimonio",
          "frame": "Quién es el cliente y dónde está el patrimonio.",
          "cards": [
            {
              "title": "Segmentación de clientes acomodados",
              "body": "Segmentar clientes por patrimonio invertible, tenencia de productos y mercado, y dimensionar cada grupo antes de construir la propuesta.",
              "methods": "Muestra HNW · encuesta online"
            },
            {
              "title": "Comportamiento inversor y confianza",
              "body": "Entender cómo deciden los inversores, en qué confían y cómo se sigue o se ignora una recomendación.",
              "methods": "Entrevistas en profundidad · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Asesores y distribución",
          "frame": "Quién recomienda y a través de qué plataforma.",
          "cards": [
            {
              "title": "Ecosistema de asesores",
              "body": "Cómo usan las plataformas los asesores y socios de distribución, y dónde las herramientas digitales cambian lo que recomiendan.",
              "methods": "Entrevistas en profundidad con asesores"
            },
            {
              "title": "Cuota de patrimonio",
              "body": "Establecer qué parte del patrimonio de un cliente está en un proveedor y qué mueve el resto.",
              "methods": "Encuesta HNW · entrevistas a asesores"
            }
          ]
        },
        {
          "n": "03",
          "name": "Producto y precio",
          "frame": "Cuánto cuesta y cuánto vale.",
          "cards": [
            {
              "title": "Precio y comisiones",
              "body": "Probar estructuras de comisiones y puntos de precio frente a la disposición a pagar, antes de lanzar la propuesta.",
              "methods": "Modelos de sensibilidad al precio · encuesta HNW"
            },
            {
              "title": "Pruebas de producto y funcionalidad",
              "body": "Probar propuestas y funcionalidades con los clientes para quienes se construyen.",
              "methods": "Pruebas de concepto y A/B"
            }
          ]
        },
        {
          "n": "04",
          "name": "Experiencia y retención",
          "frame": "Si el cliente se queda y por qué no.",
          "cards": [
            {
              "title": "Experiencia del cliente",
              "body": "Medir la experiencia del cliente y los motivos de cambio entre clientes de patrimonio.",
              "methods": "Encuesta online · entrevistas en profundidad"
            },
            {
              "title": "Retención y abandono",
              "body": "Seguir la retención, la cuota de patrimonio y los motivos de salida.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "Qué es cada método y cuándo lo usamos.",
      "methods": [
        [
          "Muestra HNW",
          "Clientes reclutados mediante paneles patrimoniales verificados y referidos, filtrados por patrimonio invertible, tenencia de productos y mercado."
        ],
        [
          "Entrevistas en profundidad con asesores",
          "Entrevistas de 45 a 60 minutos con asesores, family offices y personal de plataforma, realizadas uno a uno por el equipo."
        ],
        [
          "Encuesta online",
          "Encuesta a clientes o prospectos, con cuotas por patrimonio, tenencia de productos y mercado."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, con cuotas por mercado, tenencia de productos o segmento de cliente. Se usan cuando la lista está definida."
        ],
        [
          "Modelos de sensibilidad al precio",
          "Modelos de disposición a pagar y sensibilidad al precio, presentados como rango con los supuestos declarados."
        ]
      ],
      "ctaTitle": "Cuéntenos qué decisión debe sostener esta investigación.",
      "ctaBody": "Recibe los resultados, las pruebas que los sostienen y el siguiente paso recomendado.",
      "ctaPrimary": "Hablar con el equipo",
      "ctaSecondary": "Únete"
    },
    "fi": {
      "kicker": "Toimialat",
      "title": "Rahoituspalvelut ja varallisuudenhoito",
      "lead": "Tutkimusta pankeille, varainhoitajille ja fintech-yrityksille: mihin asiakkaat luottavat, mistä he maksavat ja miksi he lähtevät.",
      "introKicker": "Näin työskentelemme",
      "intro": [
        "Luottamus rahoituspalveluihin rakentuu hitaasti ja katoaa yhdessä vuorovaikutuksessa: selittämätön maksu, epäonnistunut siirto, vastaamaton puhelu.",
        "Tutkimme asiakasta ja neuvonantajaa erikseen: miten sijoittajat vertailevat ja päättävät, mistä he maksavat, mitä neuvonantajat suosittelevat ja miksi, ja missä kokemus katkeaa.",
        "Jokainen tutkimus rakennetaan sen päätöksen ympärille, jota sen on tuettava — segmentille astuminen, tuotteen hinnoittelu, mikä kanava kantaa kasvua ja miksi asiakkaat lähtevät. Suunnittelu, otos ja raportointi seuraavat tätä kysymystä."
      ],
      "stagesKicker": "Mitä tutkimme",
      "stages": [
        {
          "n": "01",
          "name": "Asiakas ja varallisuus",
          "frame": "Kuka asiakas on ja missä varallisuus on.",
          "cards": [
            {
              "title": "Varakkaiden asiakkaiden segmentointi",
              "body": "Segmentoi asiakkaat sijoitettavan varallisuuden, tuoteomistuksen ja markkinan mukaan ja mitoita jokainen ryhmä ennen tarjooman rakentamista.",
              "methods": "HNW-otos · verkkokysely"
            },
            {
              "title": "Sijoituskäyttäytyminen ja luottamus",
              "body": "Ymmärrä, miten sijoittajat päättävät, mihin he luottavat ja miten suositusta seurataan tai jätetään huomiotta.",
              "methods": "Syvähaastattelut · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Neuvonantajat ja jakelu",
          "frame": "Kuka suosittelee ja millä alustalla.",
          "cards": [
            {
              "title": "Neuvonantajaekosysteemi",
              "body": "Miten neuvonantajat ja jakelukumppanit käyttävät alustoja ja missä digitaaliset työkalut muuttavat heidän suosituksiaan.",
              "methods": "Syvähaastattelut neuvonantajille"
            },
            {
              "title": "Osuus varallisuudesta",
              "body": "Selvitä, kuinka suuri osa asiakkaan varallisuudesta on yhdellä tarjoajalla ja mikä liikuttaa loput.",
              "methods": "HNW-kysely · neuvonantajahaastattelut"
            }
          ]
        },
        {
          "n": "03",
          "name": "Tuote ja hinnoittelu",
          "frame": "Mitä se maksaa ja mitä se on arvoinen.",
          "cards": [
            {
              "title": "Hinta ja palkkiot",
              "body": "Testaa palkkiorakenteet ja hintapisteet maksuhalukkuutta vastaan ennen tarjooman lanseerausta.",
              "methods": "Hintasensitiivisyysmallit · HNW-kysely"
            },
            {
              "title": "Tuote- ja ominaisuustestit",
              "body": "Testaa tarjoomia ja alustaominaisuuksia asiakkaille, joille ne on rakennettu.",
              "methods": "Konsepti- ja A/B-testaus"
            }
          ]
        },
        {
          "n": "04",
          "name": "Kokemus ja pysyvyys",
          "frame": "Pysyykö asiakas ja miksi ei.",
          "cards": [
            {
              "title": "Asiakaskokemus",
              "body": "Mittaa asiakaskokemusta ja vaihtamisen ajureita varakkaiden asiakkaiden keskuudessa.",
              "methods": "Verkkokysely · syvähaastattelut"
            },
            {
              "title": "Pysyvyys ja poistuma",
              "body": "Seuraa pysyvyyttä, osuutta varallisuudesta ja syitä lähteä.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Menetelmät",
      "methodsLead": "Mikä kukin menetelmä on ja milloin käytämme sitä.",
      "methods": [
        [
          "HNW-otos",
          "Asiakkaat rekrytoitu varmennetuista varallisuuspaneeleista ja suositusten kautta, seulottu sijoitettavan varallisuuden, tuoteomistuksen ja markkinan mukaan."
        ],
        [
          "Syvähaastattelut neuvonantajille",
          "45–60 minuutin haastattelut neuvonantajien, family office -toimijoiden ja alustahenkilöstön kanssa, tutkimustiimi tekee kahdestaan."
        ],
        [
          "Verkkokysely",
          "Kysely asiakkaille tai potentiaalisille asiakkaille, kiintiöt varallisuuden, tuoteomistuksen ja markkinan mukaan."
        ],
        [
          "CATI",
          "Käsikirjoitetut puhelinhaastattelut, kiintiöt markkinan, tuoteomistuksen tai asiakassegmentin mukaan. Käytetään, kun lista on määritelty."
        ],
        [
          "Hintasensitiivisyysmallit",
          "Maksuhalukkuus- ja hintasensitiivisyysmallit, raportoituna vaihteluvälinä ilmoitetuin oletuksin."
        ]
      ],
      "ctaTitle": "Kerro meille, mitä päätöstä tämän tutkimuksen on tuettava.",
      "ctaBody": "Saat tulokset, niiden taustalla olevan näytön ja suositellun seuraavan askeleen.",
      "ctaPrimary": "Keskustele tutkimustiimin kanssa",
      "ctaSecondary": "Liity mukaan"
    },
    "it": {
      "kicker": "Settori",
      "title": "Servizi finanziari e patrimonio",
      "lead": "Ricerche per banche, gestori patrimoniali e fintech: di cosa si fidano i clienti, per cosa pagano e perché se ne vanno.",
      "introKicker": "Come lavoriamo",
      "intro": [
        "La fiducia nei servizi finanziari si costruisce lentamente e si perde in una sola interazione: una commissione non spiegata, un bonifico fallito, una chiamata senza risposta.",
        "Studiamo cliente e consulente separatamente: come gli investitori confrontano e decidono, per cosa pagano, cosa consigliano i consulenti e perché, e dove l'esperienza si rompe.",
        "Ogni studio è costruito attorno alla decisione che deve sostenere — entrare in un segmento, prezzare un prodotto, quale canale porta crescita e perché i clienti se ne vanno. Disegno, campione e report discendono da quella domanda."
      ],
      "stagesKicker": "Cosa studiamo",
      "stages": [
        {
          "n": "01",
          "name": "Cliente e patrimonio",
          "frame": "Chi è il cliente e dove sta il patrimonio.",
          "cards": [
            {
              "title": "Segmentazione dei clienti facoltosi",
              "body": "Segmentare i clienti per patrimonio investibile, possesso di prodotti e mercato, e dimensionare ogni gruppo prima di costruire la proposta.",
              "methods": "Campione HNW · indagine online"
            },
            {
              "title": "Comportamento di investimento e fiducia",
              "body": "Capire come decidono gli investitori, di cosa si fidano e come un consiglio viene seguito o ignorato.",
              "methods": "Interviste in profondità · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Consulenti e distribuzione",
          "frame": "Chi consiglia e attraverso quale piattaforma.",
          "cards": [
            {
              "title": "Ecosistema dei consulenti",
              "body": "Come consulenti e partner di distribuzione usano le piattaforme, e dove gli strumenti digitali cambiano ciò che consigliano.",
              "methods": "Interviste in profondità a consulenti"
            },
            {
              "title": "Quota di patrimonio",
              "body": "Stabilire quanta parte del patrimonio di un cliente è presso un fornitore, e cosa muove il resto.",
              "methods": "Indagine HNW · interviste a consulenti"
            }
          ]
        },
        {
          "n": "03",
          "name": "Prodotto e prezzo",
          "frame": "Quanto costa e quanto vale.",
          "cards": [
            {
              "title": "Prezzo e commissioni",
              "body": "Testare strutture di commissioni e punti di prezzo rispetto alla disponibilità a pagare, prima del lancio della proposta.",
              "methods": "Modelli di sensibilità al prezzo · indagine HNW"
            },
            {
              "title": "Test di prodotto e funzionalità",
              "body": "Testare proposte e funzionalità con i clienti per cui sono costruite.",
              "methods": "Test di concept e A/B"
            }
          ]
        },
        {
          "n": "04",
          "name": "Esperienza e retention",
          "frame": "Se il cliente resta, e perché no.",
          "cards": [
            {
              "title": "Esperienza del cliente",
              "body": "Misurare l'esperienza del cliente e i motivi di cambio tra clienti patrimoniali.",
              "methods": "Indagine online · interviste in profondità"
            },
            {
              "title": "Retention e abbandono",
              "body": "Monitorare retention, quota di patrimonio e motivi di uscita.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metodi",
      "methodsLead": "Che cos'è ogni metodo e quando lo usiamo.",
      "methods": [
        [
          "Campione HNW",
          "Clienti reclutati tramite panel patrimoniali verificati e passaparola, filtrati per patrimonio investibile, possesso di prodotti e mercato."
        ],
        [
          "Interviste in profondità a consulenti",
          "Interviste di 45-60 minuti con consulenti, family office e staff di piattaforma, condotte uno a uno dal team."
        ],
        [
          "Indagine online",
          "Indagine su clienti o prospect, con quote per patrimonio, possesso di prodotti e mercato."
        ],
        [
          "CATI",
          "Interviste telefoniche scriptate, con quote per mercato, possesso di prodotti o segmento di clientela. Usate quando la lista è definita."
        ],
        [
          "Modelli di sensibilità al prezzo",
          "Modelli di disponibilità a pagare e sensibilità al prezzo, riportati come intervallo con le assunzioni dichiarate."
        ]
      ],
      "ctaTitle": "Dicci quale decisione deve sostenere questa ricerca.",
      "ctaBody": "Ricevi i risultati, le prove che li sostengono e il prossimo passo consigliato.",
      "ctaPrimary": "Parla con il team di ricerca",
      "ctaSecondary": "Unisciti"
    },
    "ja": {
      "kicker": "業界",
      "title": "金融と資産管理",
      "lead": "銀行、資産運用会社、フィンテック向けの調査：顧客が何を信頼し、何に費用を払い、なぜ離れるのか。",
      "introKicker": "進め方",
      "intro": [
        "金融サービスへの信頼はゆっくり築かれ、一度のやり取りで失われます。説明のない手数料、失敗した送金、つながらない電話。",
        "顧客とアドバイザーを分けて調べます。投資家がどう比較し決めるか、何に費用を払うか、アドバイザーが何をなぜ勧めるか、どこで体験が途切れるか。",
        "各調査は、それが支えるべき意思決定を中心に設計します — セグメントに参入するか、製品をどう価格づけるか、どのチャネルが成長を担うか、なぜ顧客が離れるか。設計・サンプル・報告はこの問いから決まります。"
      ],
      "stagesKicker": "調査する内容",
      "stages": [
        {
          "n": "01",
          "name": "顧客と資産",
          "frame": "顧客は誰で、資産はどこにあるか。",
          "cards": [
            {
              "title": "富裕層セグメンテーション",
              "body": "投資可能資産、商品保有、市場で顧客をセグメント化し、提案を作る前に各グループの規模を測ります。",
              "methods": "富裕層サンプル · オンライン調査"
            },
            {
              "title": "投資行動と信頼",
              "body": "投資家がどう決め、何を信頼し、推薦がどう実行されるか、あるいは無視されるかを理解します。",
              "methods": "デプスインタビュー · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "アドバイザーと流通",
          "frame": "誰が勧め、どのプラットフォームを通すか。",
          "cards": [
            {
              "title": "アドバイザー・エコシステム",
              "body": "アドバイザーと流通パートナーがプラットフォームをどう使い、デジタルツールが勧める内容をどこで変えるか。",
              "methods": "アドバイザーへのデプスインタビュー"
            },
            {
              "title": "資産シェア",
              "body": "顧客資産のうち1社に預けられている割合と、残りを動かすものを明らかにします。",
              "methods": "富裕層調査 · アドバイザーインタビュー"
            }
          ]
        },
        {
          "n": "03",
          "name": "商品と価格",
          "frame": "いくらかかり、いくらの価値があるか。",
          "cards": [
            {
              "title": "価格と手数料",
              "body": "提案の開始前に、手数料体系と価格点を支払意欲に対してテストします。",
              "methods": "価格感度モデル · 富裕層調査"
            },
            {
              "title": "商品・機能テスト",
              "body": "提案とプラットフォーム機能を、それが作られた顧客とともにテストします。",
              "methods": "コンセプト／A/Bテスト"
            }
          ]
        },
        {
          "n": "04",
          "name": "体験と維持",
          "frame": "顧客が残るか、なぜ残らないか。",
          "cards": [
            {
              "title": "顧客体験",
              "body": "富裕層顧客の顧客体験とスイッチの要因を測ります。",
              "methods": "オンライン調査 · デプスインタビュー"
            },
            {
              "title": "維持と離脱",
              "body": "維持率、資産シェア、離れる理由を追跡します。",
              "methods": "トラッキング · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "手法",
      "methodsLead": "各手法の内容と、使う場面。",
      "methods": [
        [
          "富裕層サンプル",
          "検証済みの富裕層パネルと紹介で募集し、投資可能資産、商品保有、市場でスクリーニングします。"
        ],
        [
          "アドバイザーへのデプスインタビュー",
          "アドバイザー、ファミリーオフィス、プラットフォーム担当者への45〜60分のインタビュー。調査チームが1対1で行います。"
        ],
        [
          "オンライン調査",
          "顧客または見込み客への調査。資産、商品保有、市場で割り付けます。"
        ],
        [
          "CATI",
          "スクリプトに沿った電話調査。市場、商品保有、顧客セグメントで割り付けます。名簿が確定している場合に使います。"
        ],
        [
          "価格感度モデル",
          "支払意欲と価格感度のモデル。前提を明記した幅として報告します。"
        ]
      ],
      "ctaTitle": "この調査が支えるべき意思決定をお聞かせください。",
      "ctaBody": "結果、その根拠、推奨する次の一手をお渡しします。",
      "ctaPrimary": "調査チームに相談する",
      "ctaSecondary": "参加する"
    },
    "ko": {
      "kicker": "산업",
      "title": "금융과 자산관리",
      "lead": "은행, 자산운용사, 핀테크를 위한 조사: 고객이 무엇을 신뢰하고, 무엇에 비용을 내며, 왜 떠나는지.",
      "introKicker": "일하는 방식",
      "intro": [
        "금융 서비스에 대한 신뢰는 천천히 쌓이고 한 번의 상호작용으로 사라집니다. 설명되지 않은 수수료, 실패한 이체, 받지 않은 전화.",
        "고객과 어드바이저를 따로 조사합니다. 투자자가 어떻게 비교하고 결정하는지, 무엇에 비용을 내는지, 어드바이저가 무엇을 왜 권하는지, 어디서 경험이 끊기는지.",
        "각 조사는 그것이 뒷받침해야 할 결정을 중심으로 설계합니다 — 세그먼트 진입, 상품 가격 책정, 어느 채널이 성장을 담당하는지, 왜 고객이 떠나는지. 설계, 표본, 보고는 이 질문에서 나옵니다."
      ],
      "stagesKicker": "무엇을 조사하는가",
      "stages": [
        {
          "n": "01",
          "name": "고객과 자산",
          "frame": "고객은 누구이고 자산은 어디에 있는가.",
          "cards": [
            {
              "title": "고액자산가 세분화",
              "body": "투자 가능 자산, 상품 보유, 시장으로 고객을 세분화하고 제안을 만들기 전에 각 집단 규모를 측정합니다.",
              "methods": "HNW 표본 · 온라인 조사"
            },
            {
              "title": "투자 행동과 신뢰",
              "body": "투자자가 어떻게 결정하고 무엇을 신뢰하며 권유가 어떻게 실행되거나 무시되는지 이해합니다.",
              "methods": "심층 인터뷰 · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "어드바이저와 유통",
          "frame": "누가 권하고 어떤 플랫폼을 통하는가.",
          "cards": [
            {
              "title": "어드바이저 생태계",
              "body": "어드바이저와 유통 파트너가 플랫폼을 어떻게 쓰고, 디지털 도구가 어디서 권유 내용을 바꾸는지.",
              "methods": "어드바이저 심층 인터뷰"
            },
            {
              "title": "자산 점유율",
              "body": "고객 자산 중 한 제공자에게 있는 비중과 나머지를 움직이는 요인을 밝힙니다.",
              "methods": "HNW 조사 · 어드바이저 인터뷰"
            }
          ]
        },
        {
          "n": "03",
          "name": "상품과 가격",
          "frame": "얼마인지, 얼마의 가치가 있는지.",
          "cards": [
            {
              "title": "가격과 수수료",
              "body": "제안 출시 전에 수수료 구조와 가격대를 지불 의향에 대해 테스트합니다.",
              "methods": "가격 민감도 모델 · HNW 조사"
            },
            {
              "title": "상품·기능 테스트",
              "body": "제안과 플랫폼 기능을 그것이 만들어진 고객과 함께 테스트합니다.",
              "methods": "콘셉트·A/B 테스트"
            }
          ]
        },
        {
          "n": "04",
          "name": "경험과 유지",
          "frame": "고객이 남는지, 왜 남지 않는지.",
          "cards": [
            {
              "title": "고객 경험",
              "body": "고액자산가 고객의 경험과 전환 요인을 측정합니다.",
              "methods": "온라인 조사 · 심층 인터뷰"
            },
            {
              "title": "유지와 이탈",
              "body": "유지율, 자산 점유율, 떠나는 이유를 추적합니다.",
              "methods": "트래킹 · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "방법",
      "methodsLead": "각 방법이 무엇이고 언제 쓰는가.",
      "methods": [
        [
          "HNW 표본",
          "검증된 고액자산가 패널과 추천으로 모집하고, 투자 가능 자산, 상품 보유, 시장으로 선별합니다."
        ],
        [
          "어드바이저 심층 인터뷰",
          "어드바이저, 패밀리오피스, 플랫폼 담당자와 45~60분 인터뷰. 조사팀이 1대1로 진행합니다."
        ],
        [
          "온라인 조사",
          "고객 또는 잠재 고객 조사. 자산, 상품 보유, 시장으로 할당합니다."
        ],
        [
          "CATI",
          "스크립트 기반 전화 조사. 시장, 상품 보유, 고객 세그먼트로 할당합니다. 명단이 정해진 경우에 사용합니다."
        ],
        [
          "가격 민감도 모델",
          "지불 의향과 가격 민감도 모델. 가정을 명시한 범위로 보고합니다."
        ]
      ],
      "ctaTitle": "이 조사가 뒷받침해야 할 결정을 알려주세요.",
      "ctaBody": "결과, 그 근거, 권장하는 다음 단계를 받습니다.",
      "ctaPrimary": "조사팀과 상담하기",
      "ctaSecondary": "참여하기"
    },
    "no": {
      "kicker": "Bransjer",
      "title": "Finans og formue",
      "lead": "Forskning for banker, formuesforvaltere og fintechs: hva kundene har tillit til, hva de betaler for, og hvorfor de forlater.",
      "introKicker": "Slik arbeider vi",
      "intro": [
        "Tillit til finansielle tjenester bygges sakte og mistes i én enkelt interaksjon: et gebyr som ikke ble forklart, en overføring som feilet, en samtale som ikke ble besvart.",
        "Vi undersøker kunde og rådgiver hver for seg: hvordan investorer sammenligner og beslutter, hva de betaler for, hva rådgivere anbefaler og hvorfor, og hvor opplevelsen brister.",
        "Hver studie designes rundt beslutningen den skal støtte — om et segment skal betres, hvordan et produkt prises, hvilken kanal som bærer veksten, og hvorfor kunder forlater. Design, utvalg og rapportering følger dette spørsmålet."
      ],
      "stagesKicker": "Hva vi undersøker",
      "stages": [
        {
          "n": "01",
          "name": "Kunde og formue",
          "frame": "Hvem kunden er, og hvor formuen ligger.",
          "cards": [
            {
              "title": "Segmentering av formuende kunder",
              "body": "Segmenter kunder etter investerbar formue, produktbesittelse og marked, og dimensjoner hver gruppe før tilbudet bygges.",
              "methods": "HNW-utvalg · nettundersøkelse"
            },
            {
              "title": "Investeringsatferd og tillit",
              "body": "Forstå hvordan investorer beslutter, hva de har tillit til, og hvordan en anbefaling følges eller ignoreres.",
              "methods": "Dybdeintervjuer · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Rådgivere og distribusjon",
          "frame": "Hvem som anbefaler, og via hvilken plattform.",
          "cards": [
            {
              "title": "Rådgiverøkosystem",
              "body": "Hvordan rådgivere og distribusjonspartnere bruker plattformer, og hvor digitale verktøy endrer det de anbefaler.",
              "methods": "Dybdeintervjuer med rådgivere"
            },
            {
              "title": "Andel av formuen",
              "body": "Fastslå hvor stor del av kundens formue som ligger hos én tilbyder, og hva som flytter resten.",
              "methods": "HNW-undersøkelse · rådgiverintervjuer"
            }
          ]
        },
        {
          "n": "03",
          "name": "Produkt og prising",
          "frame": "Hva det koster, og hva det er verdt.",
          "cards": [
            {
              "title": "Pris og gebyrer",
              "body": "Test gebyrstrukturer og prispunkter mot betalingsvillighet, før tilbudet lanseres.",
              "methods": "Prisfølsomhetsmodeller · HNW-undersøkelse"
            },
            {
              "title": "Produkt- og funksjonstester",
              "body": "Test tilbud og plattformfunksjoner med kundene de er bygget for.",
              "methods": "Konsept- og A/B-testing"
            }
          ]
        },
        {
          "n": "04",
          "name": "Opplevelse og bevaring",
          "frame": "Om kunden blir, og hvorfor ikke.",
          "cards": [
            {
              "title": "Kundeopplevelse",
              "body": "Mål kundeopplevelsen og drivkreftene for bytte blant formuende kunder.",
              "methods": "Nettundersøkelse · dybdeintervjuer"
            },
            {
              "title": "Bevaring og frafall",
              "body": "Følg bevaring, andel av formue og årsakene til at kunder forlater.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hva hver metode er, og når vi bruker den.",
      "methods": [
        [
          "HNW-utvalg",
          "Kunder rekruttert via verifiserte formuespaneler og henvisning, screenet etter investerbar formue, produktbesittelse og marked."
        ],
        [
          "Dybdeintervjuer med rådgivere",
          "Intervjuer på 45–60 minutter med rådgivere, family offices og plattformansatte, gjennomført en til en av forskerteamet."
        ],
        [
          "Nettundersøkelse",
          "Undersøkelse blant kunder eller potensielle kunder, med kvoter etter formue, produktbesittelse og marked."
        ],
        [
          "CATI",
          "Skriptede telefonintervjuer med kvoter etter marked, produktbesittelse eller kundesegment. Brukes der listen er definert."
        ],
        [
          "Prisfølsomhetsmodeller",
          "Betalingsvillighets- og prisfølsomhetsmodeller, rapportert som intervall med oppgitte forutsetninger."
        ]
      ],
      "ctaTitle": "Fortell oss hvilken beslutning denne forskningen skal støtte.",
      "ctaBody": "Du får funnene, belegget bak dem og anbefalt neste steg.",
      "ctaPrimary": "Snakk med forskerteamet",
      "ctaSecondary": "Bli med"
    },
    "pt": {
      "kicker": "Setores",
      "title": "Serviços financeiros e património",
      "lead": "Investigação para bancos, gestores de património e fintechs: em que os clientes confiam, pelo que pagam e porque saem.",
      "introKicker": "Como trabalhamos",
      "intro": [
        "A confiança nos serviços financeiros constrói-se devagar e perde-se numa única interação: uma comissão não explicada, uma transferência falhada, uma chamada sem resposta.",
        "Estudamos cliente e consultor em separado: como os investidores comparam e decidem, pelo que pagam, o que os consultores recomendam e porquê, e onde a experiência se quebra.",
        "Cada estudo é desenhado em torno da decisão que tem de sustentar — entrar num segmento, fixar o preço de um produto, que canal sustenta o crescimento e porque os clientes saem. Desenho, amostra e relatório decorrem dessa pergunta."
      ],
      "stagesKicker": "O que estudamos",
      "stages": [
        {
          "n": "01",
          "name": "Cliente e património",
          "frame": "Quem é o cliente e onde está o património.",
          "cards": [
            {
              "title": "Segmentação de clientes abastados",
              "body": "Segmentar clientes por património investível, posse de produtos e mercado, e dimensionar cada grupo antes de construir a proposta.",
              "methods": "Amostra HNW · inquérito online"
            },
            {
              "title": "Comportamento de investimento e confiança",
              "body": "Compreender como os investidores decidem, em que confiam e como uma recomendação é seguida ou ignorada.",
              "methods": "Entrevistas em profundidade · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Consultores e distribuição",
          "frame": "Quem recomenda e através de que plataforma.",
          "cards": [
            {
              "title": "Ecossistema de consultores",
              "body": "Como consultores e parceiros de distribuição usam plataformas, e onde as ferramentas digitais mudam o que recomendam.",
              "methods": "Entrevistas em profundidade a consultores"
            },
            {
              "title": "Quota de património",
              "body": "Estabelecer que parte do património de um cliente está num fornecedor, e o que move o resto.",
              "methods": "Inquérito HNW · entrevistas a consultores"
            }
          ]
        },
        {
          "n": "03",
          "name": "Produto e preço",
          "frame": "Quanto custa e quanto vale.",
          "cards": [
            {
              "title": "Preço e comissões",
              "body": "Testar estruturas de comissões e pontos de preço face à disponibilidade a pagar, antes do lançamento da proposta.",
              "methods": "Modelos de sensibilidade ao preço · inquérito HNW"
            },
            {
              "title": "Testes de produto e funcionalidades",
              "body": "Testar propostas e funcionalidades com os clientes para quem são construídas.",
              "methods": "Testes de conceito e A/B"
            }
          ]
        },
        {
          "n": "04",
          "name": "Experiência e retenção",
          "frame": "Se o cliente fica, e porque não.",
          "cards": [
            {
              "title": "Experiência do cliente",
              "body": "Medir a experiência do cliente e os motivos de mudança entre clientes de património.",
              "methods": "Inquérito online · entrevistas em profundidade"
            },
            {
              "title": "Retenção e abandono",
              "body": "Acompanhar retenção, quota de património e motivos de saída.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "O que é cada método e quando o usamos.",
      "methods": [
        [
          "Amostra HNW",
          "Clientes recrutados através de painéis patrimoniais verificados e referências, filtrados por património investível, posse de produtos e mercado."
        ],
        [
          "Entrevistas em profundidade a consultores",
          "Entrevistas de 45 a 60 minutos com consultores, family offices e equipas de plataforma, conduzidas um a um pela equipa."
        ],
        [
          "Inquérito online",
          "Inquérito a clientes ou potenciais clientes, com quotas por património, posse de produtos e mercado."
        ],
        [
          "CATI",
          "Entrevistas telefónicas guionizadas, com quotas por mercado, posse de produtos ou segmento de cliente. Usadas quando a lista está definida."
        ],
        [
          "Modelos de sensibilidade ao preço",
          "Modelos de disponibilidade a pagar e sensibilidade ao preço, apresentados como intervalo com os pressupostos declarados."
        ]
      ],
      "ctaTitle": "Diga-nos que decisão esta investigação tem de sustentar.",
      "ctaBody": "Recebe os resultados, as provas que os sustentam e o próximo passo recomendado.",
      "ctaPrimary": "Falar com a equipa",
      "ctaSecondary": "Junte-se a nós"
    },
    "ru": {
      "kicker": "Отрасли",
      "title": "Финансовые услуги и управление капиталом",
      "lead": "Исследования для банков, управляющих капиталом и финтеха: чему доверяют клиенты, за что платят и почему уходят.",
      "introKicker": "Как мы работаем",
      "intro": [
        "Доверие к финансовым услугам строится медленно и теряется в одном взаимодействии: необъяснённая комиссия, неудачный перевод, неотвеченный звонок.",
        "Мы изучаем клиента и консультанта отдельно: как инвесторы сравнивают и решают, за что платят, что рекомендуют консультанты и почему, и где опыт ломается.",
        "Каждое исследование строится вокруг решения, которое оно должно поддержать — выход в сегмент, цена продукта, какой канал несёт рост и почему клиенты уходят. Дизайн, выборка и отчёт следуют из этого вопроса."
      ],
      "stagesKicker": "Что мы изучаем",
      "stages": [
        {
          "n": "01",
          "name": "Клиент и капитал",
          "frame": "Кто клиент и где находится капитал.",
          "cards": [
            {
              "title": "Сегментация состоятельных клиентов",
              "body": "Сегментировать клиентов по инвестируемому капиталу, владению продуктами и рынку и оценить размер каждой группы до создания предложения.",
              "methods": "Выборка HNW · онлайн-опрос"
            },
            {
              "title": "Инвестиционное поведение и доверие",
              "body": "Понять, как инвесторы решают, чему доверяют и как рекомендация выполняется или игнорируется.",
              "methods": "Глубинные интервью · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Консультанты и дистрибуция",
          "frame": "Кто рекомендует и через какую платформу.",
          "cards": [
            {
              "title": "Экосистема консультантов",
              "body": "Как консультанты и дистрибуционные партнёры используют платформы и где цифровые инструменты меняют их рекомендации.",
              "methods": "Глубинные интервью с консультантами"
            },
            {
              "title": "Доля капитала",
              "body": "Определить, какая часть капитала клиента находится у одного провайдера и что двигает остальное.",
              "methods": "Опрос HNW · интервью с консультантами"
            }
          ]
        },
        {
          "n": "03",
          "name": "Продукт и цена",
          "frame": "Сколько это стоит и сколько это стоит на самом деле.",
          "cards": [
            {
              "title": "Цена и комиссии",
              "body": "Проверить структуры комиссий и ценовые точки на готовность платить до запуска предложения.",
              "methods": "Модели ценовой чувствительности · опрос HNW"
            },
            {
              "title": "Тесты продукта и функций",
              "body": "Проверить предложения и функции платформы с клиентами, для которых они созданы.",
              "methods": "Тестирование концепций и A/B"
            }
          ]
        },
        {
          "n": "04",
          "name": "Опыт и удержание",
          "frame": "Остаётся ли клиент и почему нет.",
          "cards": [
            {
              "title": "Клиентский опыт",
              "body": "Измерить клиентский опыт и движущие силы перехода среди состоятельных клиентов.",
              "methods": "Онлайн-опрос · глубинные интервью"
            },
            {
              "title": "Удержание и отток",
              "body": "Отслеживать удержание, долю капитала и причины ухода.",
              "methods": "Трекинг · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Методы",
      "methodsLead": "Что представляет собой каждый метод и когда мы его применяем.",
      "methods": [
        [
          "Выборка HNW",
          "Клиенты набраны через проверенные панели состоятельных лиц и по рекомендациям, отобраны по инвестируемому капиталу, владению продуктами и рынку."
        ],
        [
          "Глубинные интервью с консультантами",
          "Интервью по 45–60 минут с консультантами, family office и сотрудниками платформ, один на один с исследовательской командой."
        ],
        [
          "Онлайн-опрос",
          "Опрос клиентов или потенциальных клиентов с квотами по капиталу, владению продуктами и рынку."
        ],
        [
          "CATI",
          "Телефонные интервью по скрипту с квотами по рынку, владению продуктами или сегменту клиентов. Применяются там, где список определён."
        ],
        [
          "Модели ценовой чувствительности",
          "Модели готовности платить и ценовой чувствительности, представленные диапазоном с указанными допущениями."
        ]
      ],
      "ctaTitle": "Расскажите, какое решение должно поддержать это исследование.",
      "ctaBody": "Вы получаете результаты, доказательства за ними и рекомендуемый следующий шаг.",
      "ctaPrimary": "Поговорить с командой",
      "ctaSecondary": "Присоединиться"
    },
    "sv": {
      "kicker": "Branscher",
      "title": "Finansiella tjänster och förmögenhetsförvaltning",
      "lead": "Undersökningar för banker, förmögenhetsförvaltare och fintech: vad kunderna litar på, vad de betalar för och varför de lämnar.",
      "introKicker": "Så arbetar vi",
      "intro": [
        "Tillit till finansiella tjänster byggs långsamt och förloras i en enda interaktion: en avgift som inte förklarades, en överföring som misslyckades, ett samtal som inte besvarades.",
        "Vi undersöker kund och rådgivare var för sig: hur investerare jämför och beslutar, vad de betalar för, vad rådgivare rekommenderar och varför, och var upplevelsen brister.",
        "Varje studie byggs kring det beslut den ska stödja — att gå in i ett segment, prissätta en produkt, vilken kanal som bär tillväxten och varför kunder lämnar. Design, urval och rapportering följer den frågan."
      ],
      "stagesKicker": "Vad vi undersöker",
      "stages": [
        {
          "n": "01",
          "name": "Kund och förmögenhet",
          "frame": "Vem kunden är och var förmögenheten finns.",
          "cards": [
            {
              "title": "Segmentering av förmögna kunder",
              "body": "Segmentera kunder efter investerbart kapital, produktinnehav och marknad, och storleksbestäm varje grupp innan erbjudandet byggs.",
              "methods": "HNW-urval · onlineundersökning"
            },
            {
              "title": "Investeringsbeteende och tillit",
              "body": "Förstå hur investerare beslutar, vad de litar på och hur en rekommendation följs eller ignoreras.",
              "methods": "Djupintervjuer · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Rådgivare och distribution",
          "frame": "Vem som rekommenderar, och via vilken plattform.",
          "cards": [
            {
              "title": "Rådgivarekossystem",
              "body": "Hur rådgivare och distributionspartner använder plattformar, och var digitala verktyg ändrar vad de rekommenderar.",
              "methods": "Djupintervjuer med rådgivare"
            },
            {
              "title": "Andel av förmögenheten",
              "body": "Fastställa hur stor del av kundens förmögenhet som ligger hos en leverantör, och vad som flyttar resten.",
              "methods": "HNW-undersökning · rådgivarintervjuer"
            }
          ]
        },
        {
          "n": "03",
          "name": "Produkt och prissättning",
          "frame": "Vad det kostar och vad det är värt.",
          "cards": [
            {
              "title": "Pris och avgifter",
              "body": "Testa avgiftsstrukturer och prispunkter mot betalningsvilja, innan erbjudandet lanseras.",
              "methods": "Priskänslighetsmodeller · HNW-undersökning"
            },
            {
              "title": "Produkt- och funktionstester",
              "body": "Testa erbjudanden och plattformsfunktioner med de kunder de är byggda för.",
              "methods": "Koncept- och A/B-test"
            }
          ]
        },
        {
          "n": "04",
          "name": "Upplevelse och behållning",
          "frame": "Om kunden stannar, och varför inte.",
          "cards": [
            {
              "title": "Kundupplevelse",
              "body": "Mät kundupplevelsen och drivkrafterna för byte bland förmögna kunder.",
              "methods": "Onlineundersökning · djupintervjuer"
            },
            {
              "title": "Behållning och tapp",
              "body": "Följ behållning, andel av förmögenhet och orsaker till att kunder lämnar.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Vad varje metod är och när vi använder den.",
      "methods": [
        [
          "HNW-urval",
          "Kunder rekryterade via verifierade förmögenhetspaneler och hänvisning, screenade efter investerbart kapital, produktinnehav och marknad."
        ],
        [
          "Djupintervjuer med rådgivare",
          "Intervjuer på 45–60 minuter med rådgivare, family offices och plattformspersonal, genomförda en mot en av forskarteamet."
        ],
        [
          "Onlineundersökning",
          "Undersökning bland kunder eller potentiella kunder, med kvoter efter förmögenhet, produktinnehav och marknad."
        ],
        [
          "CATI",
          "Skriptade telefonintervjuer med kvoter efter marknad, produktinnehav eller kundsegment. Används där listan är definierad."
        ],
        [
          "Priskänslighetsmodeller",
          "Betalningsvilja- och priskänslighetsmodeller, rapporterade som intervall med angivna antaganden."
        ]
      ],
      "ctaTitle": "Berätta vilket beslut den här undersökningen ska stödja.",
      "ctaBody": "Du får resultaten, underlaget bakom dem och rekommenderat nästa steg.",
      "ctaPrimary": "Prata med forskarteamet",
      "ctaSecondary": "Var med"
    },
    "tr": {
      "kicker": "Sektörler",
      "title": "Finansal hizmetler ve varlık yönetimi",
      "lead": "Bankalar, varlık yöneticileri ve fintechler için araştırma: müşteriler neye güveniyor, ne için ödüyor ve neden ayrılıyor.",
      "introKicker": "Nasıl çalışıyoruz",
      "intro": [
        "Finansal hizmetlere güven yavaş kurulur ve tek bir etkileşimde kaybolur: açıklanmayan bir ücret, başarısız bir transfer, cevaplanmayan bir arama.",
        "Müşteriyi ve danışmanı ayrı ayrı inceliyoruz: yatırımcılar nasıl karşılaştırıp karar veriyor, ne için ödüyor, danışmanlar neyi neden öneriyor ve deneyim nerede kopuyor.",
        "Her çalışma, desteklemesi gereken kararın etrafında tasarlanır — bir segmente girmek, bir ürünü fiyatlamak, hangi kanalın büyümeyi taşıdığı ve müşterilerin neden ayrıldığı. Tasarım, örneklem ve rapor bu sorudan türetilir."
      ],
      "stagesKicker": "Neyi inceliyoruz",
      "stages": [
        {
          "n": "01",
          "name": "Müşteri ve varlık",
          "frame": "Müşterinin kim olduğu ve varlığın nerede durduğu.",
          "cards": [
            {
              "title": "Varlıklı müşteri segmentasyonu",
              "body": "Müşterileri yatırılabilir varlık, ürün sahipliği ve pazara göre segmentlere ayırın ve teklif kurulmadan önce her grubun büyüklüğünü belirleyin.",
              "methods": "HNW örneklemi · çevrimiçi anket"
            },
            {
              "title": "Yatırım davranışı ve güven",
              "body": "Yatırımcıların nasıl karar verdiğini, neye güvendiğini ve bir önerinin nasıl izlendiğini ya da yok sayıldığını anlayın.",
              "methods": "Derinlemesine görüşmeler · CATI"
            }
          ]
        },
        {
          "n": "02",
          "name": "Danışmanlar ve dağıtım",
          "frame": "Kimin önerdiği ve hangi platform üzerinden.",
          "cards": [
            {
              "title": "Danışman ekosistemi",
              "body": "Danışmanların ve dağıtım ortaklarının platformları nasıl kullandığı ve dijital araçların önerilerini nerede değiştirdiği.",
              "methods": "Danışmanlarla derinlemesine görüşmeler"
            },
            {
              "title": "Varlık payı",
              "body": "Bir müşterinin varlığının ne kadarının tek sağlayıcıda olduğunu ve geri kalanı neyin hareket ettirdiğini belirleyin.",
              "methods": "HNW anketi · danışman görüşmeleri"
            }
          ]
        },
        {
          "n": "03",
          "name": "Ürün ve fiyatlandırma",
          "frame": "Ne kadara mal olduğu ve neye değdiği.",
          "cards": [
            {
              "title": "Fiyat ve ücretler",
              "body": "Teklif başlatılmadan önce ücret yapılarını ve fiyat noktalarını ödeme istekliliğine karşı test edin.",
              "methods": "Fiyat duyarlılığı modelleri · HNW anketi"
            },
            {
              "title": "Ürün ve özellik testleri",
              "body": "Teklifleri ve platform özelliklerini, kendileri için kuruldukları müşterilerle test edin.",
              "methods": "Konsept ve A/B testi"
            }
          ]
        },
        {
          "n": "04",
          "name": "Deneyim ve elde tutma",
          "frame": "Müşterinin kalıp kalmadığı ve neden kalmadığı.",
          "cards": [
            {
              "title": "Müşteri deneyimi",
              "body": "Varlıklı müşteriler arasında müşteri deneyimini ve geçiş nedenlerini ölçün.",
              "methods": "Çevrimiçi anket · derinlemesine görüşmeler"
            },
            {
              "title": "Elde tutma ve kayıp",
              "body": "Elde tutmayı, varlık payını ve ayrılma nedenlerini izleyin.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Yöntemler",
      "methodsLead": "Her yöntemin ne olduğu ve ne zaman kullandığımız.",
      "methods": [
        [
          "HNW örneklemi",
          "Müşteriler doğrulanmış varlık panelleri ve yönlendirme yoluyla toplanır; yatırılabilir varlık, ürün sahipliği ve pazara göre elenir."
        ],
        [
          "Danışmanlarla derinlemesine görüşmeler",
          "Danışmanlar, family office ve platform ekipleriyle 45-60 dakikalık görüşmeler; araştırma ekibi bire bir yürütür."
        ],
        [
          "Çevrimiçi anket",
          "Müşteri veya potansiyel müşteri anketi; varlık, ürün sahipliği ve pazara göre kotalar."
        ],
        [
          "CATI",
          "Pazar, ürün sahipliği veya müşteri segmentine göre kotalı, senaryolu telefon görüşmeleri. Listenin tanımlı olduğu yerlerde kullanılır."
        ],
        [
          "Fiyat duyarlılığı modelleri",
          "Ödeme istekliliği ve fiyat duyarlılığı modelleri; varsayımları belirtilmiş aralık olarak raporlanır."
        ]
      ],
      "ctaTitle": "Bu araştırmanın hangi kararı desteklemesi gerektiğini bize anlatın.",
      "ctaBody": "Bulguları, arkalarındaki kanıtları ve önerilen sonraki adımı alırsınız.",
      "ctaPrimary": "Araştırma ekibiyle konuşun",
      "ctaSecondary": "Katılın"
    }
  },
  "social": {
    "en-US": {
      "kicker": "Industries",
      "title": "Social & education",
      "lead": "Research for foundations, non-profits and education providers: who the audience is, what the programme changes, and how to show it.",
      "introKicker": "How we work",
      "intro": [
        "Public programmes and education are judged on outcomes that take years to appear, and on audiences that are rarely in one place.",
        "We study the people a programme is meant to reach: what they need, whether they receive it, and what changed for them. The same design covers the funder, the delivery team and the public a report has to convince.",
        "Each study is designed around the decision it has to support — whether to start or stop a programme, how to target it, and what evidence the funder will accept. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Issue and audience",
          "frame": "Who is affected, and what the need actually is.",
          "cards": [
            {
              "title": "Public and audience research",
              "body": "Survey a population or a defined audience to establish what the issue looks like before a programme is designed.",
              "methods": "Representative survey · online"
            },
            {
              "title": "Need and access",
              "body": "Establish who needs the service, and what currently keeps them from it.",
              "methods": "In-depth interviews · survey"
            }
          ]
        },
        {
          "n": "02",
          "name": "Programme design",
          "frame": "What the intervention should be, and whether it works before scale.",
          "cards": [
            {
              "title": "Programme testing",
              "body": "Test a model or a message with the people it is meant for, before it is scaled.",
              "methods": "Concept testing · focus groups"
            },
            {
              "title": "Donor and supporter research",
              "body": "Understand what supporters believe about the cause, and what they will fund.",
              "methods": "Online survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Delivery and reach",
          "frame": "Who actually receives it, and where it drops.",
          "cards": [
            {
              "title": "Delivery and reach",
              "body": "Map who is reached and who is missed, and the operational points where delivery fails.",
              "methods": "In-depth interviews · survey"
            },
            {
              "title": "Participant experience",
              "body": "Study the experience of the people inside the programme, and what makes them stay or drop out.",
              "methods": "Survey · focus groups"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidence and influence",
          "frame": "What changed, and how to present it.",
          "cards": [
            {
              "title": "Change against a baseline",
              "body": "Measure change against a baseline, and state clearly what the data can and cannot attribute to the programme.",
              "methods": "Survey · interviews"
            },
            {
              "title": "Evidence and reporting",
              "body": "Turn findings into a report the funder, ministry or public will accept.",
              "methods": "Survey · interviews · desk research"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Representative survey",
          "Nationally or regionally representative samples, with quotas set to the population the programme serves."
        ],
        [
          "Multi-stakeholder survey",
          "Beneficiaries, delivery staff and funders surveyed in one design, so the same questions reach every side of the programme."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes, run one to one by the research team."
        ],
        [
          "Focus groups",
          "Group discussions of about 90 minutes, for how a topic is talked about among peers."
        ],
        [
          "Face-to-face fieldwork (CAPI)",
          "Structured interviews conducted in person, where the population is not reachable by telephone or online."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "社会与教育",
      "lead": "面向基金会、非营利组织与教育机构：受众是谁、项目改变了什么、怎么证明。",
      "introKicker": "我们如何做",
      "intro": [
        "公益项目和教育项目的成效，往往要几年才看得见，而受众又很少集中在同一个地方。",
        "我们研究项目想触达的那批人：他们需要什么、有没有拿到、有什么因此改变。同一套设计也覆盖资助方、执行团队，以及报告要说服的公众。",
        "每项研究都围绕它要支撑的决定来设计：项目要不要开始或停下、往哪里投、资助方会接受什么证据。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "议题与人群",
          "frame": "谁受影响，需要到底是什么。",
          "cards": [
            {
              "title": "公众与受众研究",
              "body": "在设计项目之前，用调查弄清这个问题在一群人或一个地区里是什么样。",
              "methods": "代表性抽样 · 线上问卷"
            },
            {
              "title": "需求与可及",
              "body": "弄清谁需要这项服务，以及现在是什么挡住了他们。",
              "methods": "深度访谈 · 问卷"
            }
          ]
        },
        {
          "n": "02",
          "name": "项目设计",
          "frame": "该做什么，以及放大之前能不能站住。",
          "cards": [
            {
              "title": "方案测试",
              "body": "在放大之前，把模式或信息拿给它真正要服务的人测一遍。",
              "methods": "概念测试 · 焦点小组"
            },
            {
              "title": "捐赠者与支持者研究",
              "body": "了解支持者如何看待这个议题，以及他们愿意为什么出钱。",
              "methods": "线上问卷 · 深度访谈"
            }
          ]
        },
        {
          "n": "03",
          "name": "交付与覆盖",
          "frame": "谁真正拿到了，在哪一步漏掉。",
          "cards": [
            {
              "title": "交付与覆盖",
              "body": "弄清谁被覆盖、谁被漏掉，以及交付在执行环节的哪一步断掉。",
              "methods": "深度访谈 · 问卷"
            },
            {
              "title": "参与者体验",
              "body": "研究项目里的人的体验，以及什么让他们留下来或退出。",
              "methods": "问卷 · 焦点小组"
            }
          ]
        },
        {
          "n": "04",
          "name": "影响与说服",
          "frame": "改变了什么，怎么讲出来。",
          "cards": [
            {
              "title": "对照基线的变化",
              "body": "对照基线测量变化，并明确说明哪些能归因于项目、哪些不能。",
              "methods": "问卷 · 访谈"
            },
            {
              "title": "证据与呈现",
              "body": "把结论做成资助方、主管部门或公众愿意接受的报告。",
              "methods": "问卷 · 访谈 · 桌面研究"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "代表性抽样调查",
          "全国或区域代表性样本，配额按项目服务的人群设定。"
        ],
        [
          "多利益相关方调查",
          "把受益方、执行人员与资助方放进同一套设计，同一组问题问到每一方。"
        ],
        [
          "深度访谈",
          "由研究人员一对一进行 45–60 分钟的深度访谈。"
        ],
        [
          "焦点小组",
          "约 90 分钟的小组讨论，用来看一个话题在同伴之间是怎么被谈起的。"
        ],
        [
          "面访（CAPI）",
          "面对面进行的结构访问，用于电话与线上触达不到的人群。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "社會與教育",
      "lead": "面向基金會、非營利組織與教育機構：受眾是誰、專案改變了什麼、怎麼證明。",
      "introKicker": "我們如何做",
      "intro": [
        "公益專案和教育專案的成效，往往要好幾年才看得見，而受眾又很少集中在同一個地方。",
        "我們研究專案想觸達的那批人：他們需要什麼、有沒有拿到、有什麼因此改變。同一套設計也涵蓋資助方、執行團隊，以及報告要說服的公眾。",
        "每項研究都圍繞它要支撐的決定來設計：專案要不要開始或停下、往哪裡投、資助方會接受什麼證據。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "議題與人群",
          "frame": "誰受影響，需要到底是什麼。",
          "cards": [
            {
              "title": "公眾與受眾研究",
              "body": "在設計專案之前，用調查弄清這個問題在一群人或一個地區裡是什麼樣。",
              "methods": "代表性抽樣 · 線上問卷"
            },
            {
              "title": "需求與可及",
              "body": "弄清誰需要這項服務，以及現在是什麼擋住了他們。",
              "methods": "深度訪談 · 問卷"
            }
          ]
        },
        {
          "n": "02",
          "name": "專案設計",
          "frame": "該做什麼，以及放大之前能不能站住。",
          "cards": [
            {
              "title": "方案測試",
              "body": "在放大之前，把模式或訊息拿給它真正要服務的人測一遍。",
              "methods": "概念測試 · 焦點小組"
            },
            {
              "title": "捐贈者與支持者研究",
              "body": "了解支持者如何看待這個議題，以及他們願意為什麼出錢。",
              "methods": "線上問卷 · 深度訪談"
            }
          ]
        },
        {
          "n": "03",
          "name": "交付與覆蓋",
          "frame": "誰真正拿到了，在哪一步漏掉。",
          "cards": [
            {
              "title": "交付與覆蓋",
              "body": "弄清誰被覆蓋、誰被漏掉，以及交付在執行環節的哪一步斷掉。",
              "methods": "深度訪談 · 問卷"
            },
            {
              "title": "參與者體驗",
              "body": "研究專案裡的人的體驗，以及什麼讓他們留下來或退出。",
              "methods": "問卷 · 焦點小組"
            }
          ]
        },
        {
          "n": "04",
          "name": "影響與說服",
          "frame": "改變了什麼，怎麼講出來。",
          "cards": [
            {
              "title": "對照基線的變化",
              "body": "對照基線測量變化，並明確說明哪些能歸因於專案、哪些不能。",
              "methods": "問卷 · 訪談"
            },
            {
              "title": "證據與呈現",
              "body": "把結論做成資助方、主管部門或公眾願意接受的報告。",
              "methods": "問卷 · 訪談 · 桌面研究"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "代表性抽樣調查",
          "全國或區域代表性樣本，配額按專案服務的人群設定。"
        ],
        [
          "多利益相關方調查",
          "把受益方、執行人員與資助方放進同一套設計，同一組問題問到每一方。"
        ],
        [
          "深度訪談",
          "由研究人員一對一進行 45–60 分鐘的深度訪談。"
        ],
        [
          "焦點小組",
          "約 90 分鐘的小組討論，用來看一個話題在同伴之間是怎麼被談起的。"
        ],
        [
          "面訪（CAPI）",
          "面對面進行的結構訪問，用於電話與線上觸達不到的人群。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Social & education",
      "lead": "Research for foundations, non-profits and education providers: who the audience is, what the programme changes, and how to show it.",
      "introKicker": "How we work",
      "intro": [
        "Public programmes and education are judged on outcomes that take years to appear, and on audiences that are rarely in one place.",
        "We study the people a programme is meant to reach: what they need, whether they receive it, and what changed for them. The same design covers the funder, the delivery team and the public a report has to convince.",
        "Each study is designed around the decision it has to support — whether to start or stop a programme, how to target it, and what evidence the funder will accept. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Issue and audience",
          "frame": "Who is affected, and what the need actually is.",
          "cards": [
            {
              "title": "Public and audience research",
              "body": "Survey a population or a defined audience to establish what the issue looks like before a programme is designed.",
              "methods": "Representative survey · online"
            },
            {
              "title": "Need and access",
              "body": "Establish who needs the service, and what currently keeps them from it.",
              "methods": "In-depth interviews · survey"
            }
          ]
        },
        {
          "n": "02",
          "name": "Programme design",
          "frame": "What the intervention should be, and whether it works before scale.",
          "cards": [
            {
              "title": "Programme testing",
              "body": "Test a model or a message with the people it is meant for, before it is scaled.",
              "methods": "Concept testing · focus groups"
            },
            {
              "title": "Donor and supporter research",
              "body": "Understand what supporters believe about the cause, and what they will fund.",
              "methods": "Online survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Delivery and reach",
          "frame": "Who actually receives it, and where it drops.",
          "cards": [
            {
              "title": "Delivery and reach",
              "body": "Map who is reached and who is missed, and the operational points where delivery fails.",
              "methods": "In-depth interviews · survey"
            },
            {
              "title": "Participant experience",
              "body": "Study the experience of the people inside the programme, and what makes them stay or drop out.",
              "methods": "Survey · focus groups"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidence and influence",
          "frame": "What changed, and how to present it.",
          "cards": [
            {
              "title": "Change against a baseline",
              "body": "Measure change against a baseline, and state clearly what the data can and cannot attribute to the programme.",
              "methods": "Survey · interviews"
            },
            {
              "title": "Evidence and reporting",
              "body": "Turn findings into a report the funder, ministry or public will accept.",
              "methods": "Survey · interviews · desk research"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Representative survey",
          "Nationally or regionally representative samples, with quotas set to the population the programme serves."
        ],
        [
          "Multi-stakeholder survey",
          "Beneficiaries, delivery staff and funders surveyed in one design, so the same questions reach every side of the programme."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes, run one to one by the research team."
        ],
        [
          "Focus groups",
          "Group discussions of about 90 minutes, for how a topic is talked about among peers."
        ],
        [
          "Face-to-face fieldwork (CAPI)",
          "Structured interviews conducted in person, where the population is not reachable by telephone or online."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "de": {
      "kicker": "Branchen",
      "title": "Gesellschaft und Bildung",
      "lead": "Forschung für Stiftungen, Non-Profits und Bildungsträger: wer das Publikum ist, was das Programm verändert und wie man es zeigt.",
      "introKicker": "So arbeiten wir",
      "intro": [
        "Öffentliche Programme und Bildung werden an Wirkungen gemessen, die Jahre brauchen, und an Zielgruppen, die selten an einem Ort sind.",
        "Wir untersuchen die Menschen, die ein Programm erreichen soll: was sie brauchen, ob sie es erhalten und was sich für sie verändert hat. Dasselbe Design erreicht Förderer, Umsetzungsteam und die Öffentlichkeit, die ein Bericht überzeugen muss.",
        "Jede Studie wird um die Entscheidung herum konzipiert, die sie stützen soll — ob ein Programm beginnt oder endet, wie es ausgerichtet wird und welche Evidenz der Förderer akzeptiert. Design, Stichprobe und Bericht folgen dieser Frage."
      ],
      "stagesKicker": "Was wir untersuchen",
      "stages": [
        {
          "n": "01",
          "name": "Thema und Zielgruppe",
          "frame": "Wer betroffen ist und wie der Bedarf wirklich aussieht.",
          "cards": [
            {
              "title": "Bevölkerungs- und Zielgruppenforschung",
              "body": "Eine Bevölkerung oder eine definierte Zielgruppe befragen, um den Stand des Themas zu klären, bevor ein Programm entworfen wird.",
              "methods": "Repräsentative Befragung · online"
            },
            {
              "title": "Bedarf und Zugang",
              "body": "Feststellen, wer die Leistung braucht und was sie derzeit davon abhält.",
              "methods": "Tiefeninterviews · Befragung"
            }
          ]
        },
        {
          "n": "02",
          "name": "Programmdesign",
          "frame": "Was die Intervention sein sollte und ob sie vor der Skalierung wirkt.",
          "cards": [
            {
              "title": "Programmtest",
              "body": "Ein Modell oder eine Botschaft mit den Menschen testen, für die es gedacht ist, bevor skaliert wird.",
              "methods": "Konzepte-Test · Fokusgruppen"
            },
            {
              "title": "Spender- und Unterstützerforschung",
              "body": "Verstehen, was Unterstützer über die Sache glauben und was sie finanzieren.",
              "methods": "Online-Befragung · Tiefeninterviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Umsetzung und Reichweite",
          "frame": "Wer es tatsächlich erhält und wo es abreißt.",
          "cards": [
            {
              "title": "Umsetzung und Reichweite",
              "body": "Abbilden, wer erreicht und wer verfehlt wird, und die operativen Punkte, an denen die Umsetzung scheitert.",
              "methods": "Tiefeninterviews · Befragung"
            },
            {
              "title": "Teilnehmendenerfahrung",
              "body": "Die Erfahrung der Menschen im Programm untersuchen und was sie bleiben oder aussteigen lässt.",
              "methods": "Befragung · Fokusgruppen"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidenz und Wirkung",
          "frame": "Was sich verändert hat und wie man es darstellt.",
          "cards": [
            {
              "title": "Veränderung gegen eine Basislinie",
              "body": "Veränderung gegen eine Basislinie messen und klar sagen, was die Daten dem Programm zuschreiben können und was nicht.",
              "methods": "Befragung · Interviews"
            },
            {
              "title": "Evidenz und Bericht",
              "body": "Befunde in einen Bericht übersetzen, den Förderer, Ministerium oder Öffentlichkeit akzeptieren.",
              "methods": "Befragung · Interviews · Desk Research"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Was jede Methode ist und wann wir sie einsetzen.",
      "methods": [
        [
          "Repräsentative Befragung",
          "National oder regional repräsentative Stichproben, mit Quoten nach der Bevölkerung, die das Programm bedient."
        ],
        [
          "Befragung mehrerer Anspruchsgruppen",
          "Begünstigte, Umsetzungsteam und Förderer in einem Design befragt, sodass dieselben Fragen jede Seite des Programms erreichen."
        ],
        [
          "Tiefeninterviews",
          "Tiefeninterviews von 45 bis 60 Minuten, eins zu eins vom Forschungsteam geführt."
        ],
        [
          "Fokusgruppen",
          "Gruppendiskussionen von etwa 90 Minuten, dafür, wie ein Thema unter Gleichgesinnten besprochen wird."
        ],
        [
          "Persönliche Feldarbeit (CAPI)",
          "Strukturierte Interviews persönlich, wo die Bevölkerung per Telefon oder online nicht erreichbar ist."
        ]
      ],
      "ctaTitle": "Sagen Sie uns, welche Entscheidung diese Forschung stützen soll.",
      "ctaBody": "Sie erhalten die Ergebnisse, die Belege dahinter und den empfohlenen nächsten Schritt.",
      "ctaPrimary": "Mit dem Forschungsteam sprechen",
      "ctaSecondary": "Mitmachen"
    },
    "fr": {
      "kicker": "Secteurs",
      "title": "Société et éducation",
      "lead": "Études pour fondations, associations et acteurs de l'éducation : qui est le public, ce que le programme change, et comment le montrer.",
      "introKicker": "Notre méthode",
      "intro": [
        "Les programmes publics et l'éducation se jugent sur des résultats qui prennent des années, et sur des publics rarement au même endroit.",
        "Nous étudions les personnes qu'un programme doit atteindre : ce dont elles ont besoin, si elles le reçoivent et ce qui a changé pour elles. Le même dispositif couvre le financeur, l'équipe de mise en œuvre et le public qu'un rapport doit convaincre.",
        "Chaque étude est conçue autour de la décision qu'elle doit éclairer — démarrer ou arrêter un programme, comment le cibler, et quelles preuves le financeur acceptera. Design, échantillon et rapport découlent de cette question."
      ],
      "stagesKicker": "Ce que nous étudions",
      "stages": [
        {
          "n": "01",
          "name": "Enjeu et public",
          "frame": "Qui est concerné, et quel est réellement le besoin.",
          "cards": [
            {
              "title": "Recherche sur le public",
              "body": "Interroger une population ou un public défini pour établir l'état de l'enjeu avant de concevoir un programme.",
              "methods": "Enquête représentative · en ligne"
            },
            {
              "title": "Besoin et accès",
              "body": "Établir qui a besoin du service, et ce qui l'en empêche aujourd'hui.",
              "methods": "Entretiens approfondis · enquête"
            }
          ]
        },
        {
          "n": "02",
          "name": "Conception du programme",
          "frame": "Ce que l'intervention doit être, et si elle fonctionne avant le passage à l'échelle.",
          "cards": [
            {
              "title": "Test de programme",
              "body": "Tester un modèle ou un message auprès des personnes visées, avant de passer à l'échelle.",
              "methods": "Test de concept · groupes de discussion"
            },
            {
              "title": "Recherche donateurs et soutiens",
              "body": "Comprendre ce que les soutiens croient de la cause, et ce qu'ils financeront.",
              "methods": "Enquête en ligne · entretiens approfondis"
            }
          ]
        },
        {
          "n": "03",
          "name": "Mise en œuvre et portée",
          "frame": "Qui le reçoit réellement, et où cela décroche.",
          "cards": [
            {
              "title": "Mise en œuvre et portée",
              "body": "Cartographier qui est atteint et qui est manqué, et les points opérationnels où la mise en œuvre échoue.",
              "methods": "Entretiens approfondis · enquête"
            },
            {
              "title": "Expérience des participants",
              "body": "Étudier l'expérience des personnes dans le programme, et ce qui les fait rester ou sortir.",
              "methods": "Enquête · groupes de discussion"
            }
          ]
        },
        {
          "n": "04",
          "name": "Preuves et influence",
          "frame": "Ce qui a changé, et comment le présenter.",
          "cards": [
            {
              "title": "Changement par rapport à une base",
              "body": "Mesurer le changement par rapport à une base, et dire clairement ce que les données peuvent ou non attribuer au programme.",
              "methods": "Enquête · entretiens"
            },
            {
              "title": "Preuves et rapport",
              "body": "Transformer les résultats en un rapport que le financeur, le ministère ou le public acceptera.",
              "methods": "Enquête · entretiens · recherche documentaire"
            }
          ]
        }
      ],
      "methodsKicker": "Méthodes",
      "methodsLead": "Ce qu'est chaque méthode et quand nous l'utilisons.",
      "methods": [
        [
          "Enquête représentative",
          "Échantillons représentatifs au niveau national ou régional, avec des quotas fixés sur la population servie par le programme."
        ],
        [
          "Enquête multi-parties",
          "Bénéficiaires, équipes de mise en œuvre et financeurs interrogés dans un même dispositif, pour que les mêmes questions atteignent chaque côté du programme."
        ],
        [
          "Entretiens approfondis",
          "Entretiens approfondis de 45 à 60 minutes, menés en tête-à-tête par l'équipe."
        ],
        [
          "Groupes de discussion",
          "Discussions de groupe d'environ 90 minutes, pour la façon dont un sujet se parle entre pairs."
        ],
        [
          "Terrain en face-à-face (CAPI)",
          "Entretiens structurés menés en personne, là où la population n'est joignable ni par téléphone ni en ligne."
        ]
      ],
      "ctaTitle": "Dites-nous quelle décision cette étude doit éclairer.",
      "ctaBody": "Vous recevez les résultats, les preuves qui les sous-tendent et la prochaine étape recommandée.",
      "ctaPrimary": "Parler à l'équipe",
      "ctaSecondary": "Nous rejoindre"
    },
    "nl": {
      "kicker": "Sectoren",
      "title": "Maatschappij en onderwijs",
      "lead": "Onderzoek voor fondsen, non-profits en onderwijsaanbieders: wie het publiek is, wat het programma verandert en hoe je dat laat zien.",
      "introKicker": "Zo werken we",
      "intro": [
        "Publieke programma's en onderwijs worden beoordeeld op uitkomsten die jaren kosten, en op doelgroepen die zelden op één plek zijn.",
        "We onderzoeken de mensen die een programma moet bereiken: wat zij nodig hebben, of zij het ontvangen en wat er voor hen veranderde. Hetzelfde ontwerp bedient de financier, het uitvoeringsteam en het publiek dat een rapport moet overtuigen.",
        "Elke studie wordt opgebouwd rond de beslissing die zij moet ondersteunen — een programma starten of stoppen, hoe het te richten en welk bewijs de financier accepteert. Ontwerp, steekproef en rapportage volgen die vraag."
      ],
      "stagesKicker": "Wat we onderzoeken",
      "stages": [
        {
          "n": "01",
          "name": "Thema en publiek",
          "frame": "Wie geraakt wordt en wat de behoefte werkelijk is.",
          "cards": [
            {
              "title": "Publieksonderzoek",
              "body": "Een populatie of een afgebakend publiek bevragen om de stand van het thema vast te stellen voordat een programma wordt ontworpen.",
              "methods": "Representatief onderzoek · online"
            },
            {
              "title": "Behoefte en toegang",
              "body": "Vaststellen wie de dienst nodig heeft en wat hen er nu van weerhoudt.",
              "methods": "Diepte-interviews · enquête"
            }
          ]
        },
        {
          "n": "02",
          "name": "Programmaontwerp",
          "frame": "Wat de interventie moet zijn en of zij werkt vóór opschaling.",
          "cards": [
            {
              "title": "Programmatest",
              "body": "Een model of boodschap testen met de mensen voor wie het bedoeld is, voordat het wordt opgeschaald.",
              "methods": "Concepttest · focusgroepen"
            },
            {
              "title": "Donor- en supportersonderzoek",
              "body": "Begrijpen wat supporters van de zaak vinden en wat zij financieren.",
              "methods": "Online-enquête · diepte-interviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Uitvoering en bereik",
          "frame": "Wie het werkelijk ontvangt en waar het afbreekt.",
          "cards": [
            {
              "title": "Uitvoering en bereik",
              "body": "In kaart brengen wie wordt bereikt en wie wordt gemist, en de operationele punten waar uitvoering faalt.",
              "methods": "Diepte-interviews · enquête"
            },
            {
              "title": "Ervaring van deelnemers",
              "body": "De ervaring van mensen in het programma onderzoeken en wat hen laat blijven of afhaken.",
              "methods": "Enquête · focusgroepen"
            }
          ]
        },
        {
          "n": "04",
          "name": "Bewijs en invloed",
          "frame": "Wat er veranderde en hoe je dat presenteert.",
          "cards": [
            {
              "title": "Verandering tegen een nulmeting",
              "body": "Verandering meten tegen een nulmeting en duidelijk zeggen wat de data wel en niet aan het programma kunnen toeschrijven.",
              "methods": "Enquête · interviews"
            },
            {
              "title": "Bewijs en rapportage",
              "body": "Bevindingen omzetten in een rapport dat financier, ministerie of publiek accepteert.",
              "methods": "Enquête · interviews · bureauonderzoek"
            }
          ]
        }
      ],
      "methodsKicker": "Methoden",
      "methodsLead": "Wat elke methode is en wanneer we die gebruiken.",
      "methods": [
        [
          "Representatief onderzoek",
          "Nationaal of regionaal representatieve steekproeven, met quota naar de populatie die het programma bedient."
        ],
        [
          "Onderzoek onder meerdere partijen",
          "Begunstigden, uitvoerend personeel en financiers in één ontwerp bevraagd, zodat dezelfde vragen elke kant van het programma bereiken."
        ],
        [
          "Diepte-interviews",
          "Diepte-interviews van 45 tot 60 minuten, één op één door het onderzoeksteam."
        ],
        [
          "Focusgroepen",
          "Groepsgesprekken van ongeveer 90 minuten, voor hoe over een onderwerp onder gelijken wordt gesproken."
        ],
        [
          "Face-to-face veldwerk (CAPI)",
          "Gestructureerde interviews in persoon, waar de populatie niet per telefoon of online bereikbaar is."
        ]
      ],
      "ctaTitle": "Vertel ons welke beslissing dit onderzoek moet ondersteunen.",
      "ctaBody": "U ontvangt de resultaten, het bewijs erachter en de aanbevolen volgende stap.",
      "ctaPrimary": "Praat met het onderzoeksteam",
      "ctaSecondary": "Doe mee"
    },
    "da": {
      "kicker": "Brancher",
      "title": "Samfund og uddannelse",
      "lead": "Research for fonde, nonprofitorganisationer og uddannelsesaktører: hvem målgruppen er, hvad programmet ændrer, og hvordan det vises.",
      "introKicker": "Sådan arbejder vi",
      "intro": [
        "Offentlige programmer og uddannelse vurderes på resultater, der tager år, og på målgrupper, der sjældent er ét sted.",
        "Vi undersøger de mennesker, et program skal nå: hvad de har brug for, om de får det, og hvad der ændrede sig for dem. Samme design dækker bevillingsgiver, udførelsesteam og den offentlighed, en rapport skal overbevise.",
        "Hver undersøgelse designes om den beslutning, den skal understøtte — om et program skal starte eller stoppe, hvordan det målrettes, og hvilken evidens bevillingsgiveren accepterer. Design, stikprøve og rapportering følger det spørgsmål."
      ],
      "stagesKicker": "Hvad vi undersøger",
      "stages": [
        {
          "n": "01",
          "name": "Emne og målgruppe",
          "frame": "Hvem der er berørt, og hvad behovet egentlig er.",
          "cards": [
            {
              "title": "Befolknings- og målgruppeundersøgelse",
              "body": "Undersøg en befolkning eller en defineret målgruppe for at fastslå, hvordan emnet ser ud, før et program designes.",
              "methods": "Repræsentativ undersøgelse · online"
            },
            {
              "title": "Behov og adgang",
              "body": "Fastslå, hvem der har brug for ydelsen, og hvad der i dag holder dem fra den.",
              "methods": "Dybdeinterviews · undersøgelse"
            }
          ]
        },
        {
          "n": "02",
          "name": "Programdesign",
          "frame": "Hvad indsatsen skal være, og om den virker før skalering.",
          "cards": [
            {
              "title": "Programtest",
              "body": "Test en model eller et budskab med de mennesker, den er beregnet til, før den skaleres.",
              "methods": "Koncepttest · fokusgrupper"
            },
            {
              "title": "Donor- og støtteundersøgelse",
              "body": "Forstå, hvad støttere mener om sagen, og hvad de vil finansiere.",
              "methods": "Onlineundersøgelse · dybdeinterviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Udførelse og rækkevidde",
          "frame": "Hvem der faktisk modtager det, og hvor det falder fra.",
          "cards": [
            {
              "title": "Udførelse og rækkevidde",
              "body": "Kortlæg, hvem der nås og hvem der misses, og de operationelle punkter, hvor udførelsen svigter.",
              "methods": "Dybdeinterviews · undersøgelse"
            },
            {
              "title": "Deltagernes oplevelse",
              "body": "Undersøg oplevelsen for de mennesker, der er i programmet, og hvad der får dem til at blive eller falde fra.",
              "methods": "Undersøgelse · fokusgrupper"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidens og gennemslag",
          "frame": "Hvad der ændrede sig, og hvordan det præsenteres.",
          "cards": [
            {
              "title": "Ændring mod en baseline",
              "body": "Mål ændring mod en baseline, og sig klart, hvad data kan og ikke kan tilskrive programmet.",
              "methods": "Undersøgelse · interviews"
            },
            {
              "title": "Evidens og rapportering",
              "body": "Omsæt fund til en rapport, som bevillingsgiver, ministerium eller offentlighed accepterer.",
              "methods": "Undersøgelse · interviews · desk research"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hvad hver metode er, og hvornår vi bruger den.",
      "methods": [
        [
          "Repræsentativ undersøgelse",
          "Nationalt eller regionalt repræsentative stikprøver med kvoter sat efter den befolkning, programmet betjener."
        ],
        [
          "Undersøgelse blandt flere parter",
          "Modtagere, udførende personale og bevillingsgivere undersøgt i ét design, så de samme spørgsmål når hver side af programmet."
        ],
        [
          "Dybdeinterviews",
          "Dybdeinterviews på 45-60 minutter, gennemført en til en af researchteamet."
        ],
        [
          "Fokusgrupper",
          "Gruppediskussioner på cirka 90 minutter, for hvordan et emne tales om blandt ligestillede."
        ],
        [
          "Face-to-face feltarbejde (CAPI)",
          "Strukturerede interviews gennemført personligt, hvor befolkningen ikke kan nås per telefon eller online."
        ]
      ],
      "ctaTitle": "Fortæl os, hvilken beslutning denne research skal understøtte.",
      "ctaBody": "Du får resultaterne, belægget bag dem og det anbefalede næste skridt.",
      "ctaPrimary": "Tal med researchteamet",
      "ctaSecondary": "Vær med"
    },
    "es": {
      "kicker": "Sectores",
      "title": "Sociedad y educación",
      "lead": "Investigación para fundaciones, entidades sin ánimo de lucro y proveedores educativos: quién es el público, qué cambia el programa y cómo mostrarlo.",
      "introKicker": "Cómo trabajamos",
      "intro": [
        "Los programas públicos y la educación se juzgan por resultados que tardan años y por públicos que rara vez están en un solo lugar.",
        "Estudiamos a las personas a las que un programa debe llegar: qué necesitan, si lo reciben y qué cambió para ellas. El mismo diseño cubre al financiador, al equipo de ejecución y al público al que un informe debe convencer.",
        "Cada estudio se diseña en torno a la decisión que debe sostener — iniciar o detener un programa, cómo orientarlo y qué evidencia aceptará el financiador. El diseño, la muestra y el informe se derivan de esa pregunta."
      ],
      "stagesKicker": "Qué estudiamos",
      "stages": [
        {
          "n": "01",
          "name": "Tema y público",
          "frame": "A quién afecta y cuál es realmente la necesidad.",
          "cards": [
            {
              "title": "Investigación de público",
              "body": "Encuestar a una población o a un público definido para establecer cómo está el tema antes de diseñar un programa.",
              "methods": "Encuesta representativa · online"
            },
            {
              "title": "Necesidad y acceso",
              "body": "Establecer quién necesita el servicio y qué se lo impide ahora.",
              "methods": "Entrevistas en profundidad · encuesta"
            }
          ]
        },
        {
          "n": "02",
          "name": "Diseño del programa",
          "frame": "Qué debe ser la intervención y si funciona antes de escalar.",
          "cards": [
            {
              "title": "Prueba de programa",
              "body": "Probar un modelo o un mensaje con las personas a las que va dirigido, antes de escalarlo.",
              "methods": "Prueba de concepto · grupos focales"
            },
            {
              "title": "Investigación de donantes y simpatizantes",
              "body": "Entender qué creen los simpatizantes sobre la causa y qué financiarán.",
              "methods": "Encuesta online · entrevistas en profundidad"
            }
          ]
        },
        {
          "n": "03",
          "name": "Ejecución y alcance",
          "frame": "Quién lo recibe realmente y dónde se cae.",
          "cards": [
            {
              "title": "Ejecución y alcance",
              "body": "Mapear a quién se alcanza y a quién se pierde, y los puntos operativos donde falla la ejecución.",
              "methods": "Entrevistas en profundidad · encuesta"
            },
            {
              "title": "Experiencia de los participantes",
              "body": "Estudiar la experiencia de las personas dentro del programa y qué les hace quedarse o abandonar.",
              "methods": "Encuesta · grupos focales"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidencia e influencia",
          "frame": "Qué cambió y cómo presentarlo.",
          "cards": [
            {
              "title": "Cambio frente a una línea base",
              "body": "Medir el cambio frente a una línea base y decir con claridad qué pueden atribuir los datos al programa y qué no.",
              "methods": "Encuesta · entrevistas"
            },
            {
              "title": "Evidencia e informe",
              "body": "Convertir los hallazgos en un informe que el financiador, el ministerio o el público acepte.",
              "methods": "Encuesta · entrevistas · investigación documental"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "Qué es cada método y cuándo lo usamos.",
      "methods": [
        [
          "Encuesta representativa",
          "Muestras representativas a nivel nacional o regional, con cuotas fijadas a la población que atiende el programa."
        ],
        [
          "Encuesta multiparte",
          "Beneficiarios, personal de ejecución y financiadores encuestados en un mismo diseño, para que las mismas preguntas lleguen a cada lado del programa."
        ],
        [
          "Entrevistas en profundidad",
          "Entrevistas en profundidad de 45 a 60 minutos, realizadas uno a uno por el equipo."
        ],
        [
          "Grupos focales",
          "Discusiones de grupo de unos 90 minutos, para cómo se habla de un tema entre pares."
        ],
        [
          "Trabajo de campo presencial (CAPI)",
          "Entrevistas estructuradas realizadas en persona, donde la población no es alcanzable por teléfono u online."
        ]
      ],
      "ctaTitle": "Cuéntenos qué decisión debe sostener esta investigación.",
      "ctaBody": "Recibe los resultados, las pruebas que los sostienen y el siguiente paso recomendado.",
      "ctaPrimary": "Hablar con el equipo",
      "ctaSecondary": "Únete"
    },
    "fi": {
      "kicker": "Toimialat",
      "title": "Yhteiskunta ja koulutus",
      "lead": "Tutkimusta säätiöille, järjestöille ja koulutuksen tarjoajille: kuka yleisö on, mitä ohjelma muuttaa ja miten se näytetään.",
      "introKicker": "Näin työskentelemme",
      "intro": [
        "Julkisia ohjelmia ja koulutusta arvioidaan tuloksilla, jotka vievät vuosia, ja yleisöillä, jotka harvoin ovat yhdessä paikassa.",
        "Tutkimme ihmisiä, joihin ohjelman on tarkoitus päästä: mitä he tarvitsevat, saavatko he sitä ja mikä heille muuttui. Sama suunnittelu kattaa rahoittajan, toteuttajatiimin ja yleisön, jonka raportin on vakuutettava.",
        "Jokainen tutkimus rakennetaan sen päätöksen ympärille, jota sen on tuettava — aloitetaanko ohjelma vai lopetetaanko, miten se kohdennetaan ja minkä näytön rahoittaja hyväksyy. Suunnittelu, otos ja raportointi seuraavat tätä kysymystä."
      ],
      "stagesKicker": "Mitä tutkimme",
      "stages": [
        {
          "n": "01",
          "name": "Aihe ja yleisö",
          "frame": "Kehen se vaikuttaa ja mikä tarve todella on.",
          "cards": [
            {
              "title": "Väestö- ja yleisötutkimus",
              "body": "Kysy väestöltä tai määritellyltä yleisöltä selvittääksesi aiheen tilan ennen ohjelman suunnittelua.",
              "methods": "Edustava kysely · verkko"
            },
            {
              "title": "Tarve ja pääsy",
              "body": "Selvitä, kuka palvelua tarvitsee ja mikä estää sen nyt.",
              "methods": "Syvähaastattelut · kysely"
            }
          ]
        },
        {
          "n": "02",
          "name": "Ohjelman suunnittelu",
          "frame": "Mikä intervention tulisi olla ja toimiiko se ennen skaalausta.",
          "cards": [
            {
              "title": "Ohjelmatesti",
              "body": "Testaa mallia tai viestiä niillä ihmisillä, joille se on tarkoitettu, ennen skaalausta.",
              "methods": "Konseptitesti · fokusryhmät"
            },
            {
              "title": "Lahjoittaja- ja tukijatutkimus",
              "body": "Ymmärrä, mitä tukijat uskovat asiasta ja mitä he rahoittavat.",
              "methods": "Verkkokysely · syvähaastattelut"
            }
          ]
        },
        {
          "n": "03",
          "name": "Toteutus ja kattavuus",
          "frame": "Kuka sen todella saa ja mihin se katkeaa.",
          "cards": [
            {
              "title": "Toteutus ja kattavuus",
              "body": "Kartoita, ketkä tavoitetaan ja ketkä jäävät ulkopuolelle, ja operatiiviset pisteet, joissa toteutus pettää.",
              "methods": "Syvähaastattelut · kysely"
            },
            {
              "title": "Osallistujien kokemus",
              "body": "Tutki ohjelmassa olevien ihmisten kokemusta ja sitä, mikä saa heidät jäämään tai lähtemään.",
              "methods": "Kysely · fokusryhmät"
            }
          ]
        },
        {
          "n": "04",
          "name": "Näyttö ja vaikuttaminen",
          "frame": "Mikä muuttui ja miten se esitetään.",
          "cards": [
            {
              "title": "Muutos lähtötasoon verrattuna",
              "body": "Mittaa muutosta lähtötasoon ja sano selvästi, minkä data voi ja ei voi kohdistaa ohjelmaan.",
              "methods": "Kysely · haastattelut"
            },
            {
              "title": "Näyttö ja raportointi",
              "body": "Muunna tulokset raportiksi, jonka rahoittaja, ministeriö tai yleisö hyväksyy.",
              "methods": "Kysely · haastattelut · taustatutkimus"
            }
          ]
        }
      ],
      "methodsKicker": "Menetelmät",
      "methodsLead": "Mikä kukin menetelmä on ja milloin käytämme sitä.",
      "methods": [
        [
          "Edustava kysely",
          "Kansallisesti tai alueellisesti edustavat otokset, kiintiöt asetettu ohjelman palveleman väestön mukaan."
        ],
        [
          "Monitoimijakysely",
          "Edunsaajat, toteuttava henkilöstö ja rahoittajat yhdessä suunnittelussa, jotta samat kysymykset tavoittavat ohjelman jokaisen puolen."
        ],
        [
          "Syvähaastattelut",
          "45–60 minuutin syvähaastattelut, tutkimustiimi tekee kahdestaan."
        ],
        [
          "Fokusryhmät",
          "Noin 90 minuutin ryhmäkeskustelut, siitä miten aiheesta puhutaan vertaisten kesken."
        ],
        [
          "Kasvokkainen kenttätyö (CAPI)",
          "Jäsennellyt haastattelut henkilökohtaisesti siellä, missä väestöä ei tavoiteta puhelimella tai verkossa."
        ]
      ],
      "ctaTitle": "Kerro meille, mitä päätöstä tämän tutkimuksen on tuettava.",
      "ctaBody": "Saat tulokset, niiden taustalla olevan näytön ja suositellun seuraavan askeleen.",
      "ctaPrimary": "Keskustele tutkimustiimin kanssa",
      "ctaSecondary": "Liity mukaan"
    },
    "it": {
      "kicker": "Settori",
      "title": "Società e istruzione",
      "lead": "Ricerche per fondazioni, non-profit e provider educativi: chi è il pubblico, cosa cambia il programma e come mostrarlo.",
      "introKicker": "Come lavoriamo",
      "intro": [
        "I programmi pubblici e l'istruzione si giudicano su risultati che richiedono anni, e su pubblici raramente in un solo luogo.",
        "Studiamo le persone che un programma deve raggiungere: di cosa hanno bisogno, se lo ricevono e cosa è cambiato per loro. Lo stesso disegno copre finanziatore, team di erogazione e pubblico che un rapporto deve convincere.",
        "Ogni studio è costruito attorno alla decisione che deve sostenere — avviare o fermare un programma, come indirizzarlo e quale evidenza accetterà il finanziatore. Disegno, campione e report discendono da quella domanda."
      ],
      "stagesKicker": "Cosa studiamo",
      "stages": [
        {
          "n": "01",
          "name": "Tema e pubblico",
          "frame": "Chi è coinvolto e qual è davvero il bisogno.",
          "cards": [
            {
              "title": "Ricerca su popolazione e pubblico",
              "body": "Intervistare una popolazione o un pubblico definito per stabilire lo stato del tema prima di progettare un programma.",
              "methods": "Indagine rappresentativa · online"
            },
            {
              "title": "Bisogno e accesso",
              "body": "Stabilire chi ha bisogno del servizio e cosa oggi glielo impedisce.",
              "methods": "Interviste in profondità · indagine"
            }
          ]
        },
        {
          "n": "02",
          "name": "Disegno del programma",
          "frame": "Cosa deve essere l'intervento e se funziona prima della scala.",
          "cards": [
            {
              "title": "Test del programma",
              "body": "Testare un modello o un messaggio con le persone a cui è destinato, prima di scalarlo.",
              "methods": "Test di concetto · focus group"
            },
            {
              "title": "Ricerca su donatori e sostenitori",
              "body": "Capire cosa credono i sostenitori della causa e cosa finanzieranno.",
              "methods": "Indagine online · interviste in profondità"
            }
          ]
        },
        {
          "n": "03",
          "name": "Erogazione e copertura",
          "frame": "Chi lo riceve davvero e dove si perde.",
          "cards": [
            {
              "title": "Erogazione e copertura",
              "body": "Mappare chi viene raggiunto e chi manca, e i punti operativi in cui l'erogazione fallisce.",
              "methods": "Interviste in profondità · indagine"
            },
            {
              "title": "Esperienza dei partecipanti",
              "body": "Studiare l'esperienza delle persone dentro il programma e cosa le fa restare o uscire.",
              "methods": "Indagine · focus group"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidenza e influenza",
          "frame": "Cosa è cambiato e come presentarlo.",
          "cards": [
            {
              "title": "Cambiamento rispetto a una baseline",
              "body": "Misurare il cambiamento rispetto a una baseline e dire chiaramente cosa i dati possono e non possono attribuire al programma.",
              "methods": "Indagine · interviste"
            },
            {
              "title": "Evidenza e reporting",
              "body": "Trasformare i risultati in un rapporto che finanziatore, ministero o pubblico accetterà.",
              "methods": "Indagine · interviste · ricerca documentale"
            }
          ]
        }
      ],
      "methodsKicker": "Metodi",
      "methodsLead": "Che cos'è ogni metodo e quando lo usiamo.",
      "methods": [
        [
          "Indagine rappresentativa",
          "Campioni rappresentativi a livello nazionale o regionale, con quote fissate sulla popolazione servita dal programma."
        ],
        [
          "Indagine multi-attore",
          "Beneficiari, staff di erogazione e finanziatori intervistati in un unico disegno, così le stesse domande raggiungono ogni lato del programma."
        ],
        [
          "Interviste in profondità",
          "Interviste in profondità di 45-60 minuti, condotte uno a uno dal team."
        ],
        [
          "Focus group",
          "Discussioni di gruppo di circa 90 minuti, per come si parla di un tema tra pari."
        ],
        [
          "Fieldwork in presenza (CAPI)",
          "Interviste strutturate condotte di persona, dove la popolazione non è raggiungibile per telefono o online."
        ]
      ],
      "ctaTitle": "Dicci quale decisione deve sostenere questa ricerca.",
      "ctaBody": "Ricevi i risultati, le prove che li sostengono e il prossimo passo consigliato.",
      "ctaPrimary": "Parla con il team di ricerca",
      "ctaSecondary": "Unisciti"
    },
    "ja": {
      "kicker": "業界",
      "title": "社会と教育",
      "lead": "財団、非営利団体、教育提供者向けの調査：誰が対象か、プログラムが何を変えるか、どう示すか。",
      "introKicker": "進め方",
      "intro": [
        "公共プログラムと教育は、何年もかかる成果と、めったに一か所に集まらない対象者で評価されます。",
        "私たちは、プログラムが届くべき人を調べます。何を必要とし、実際に受け取っているか、何が変わったか。同じ設計で、資金提供者、実施チーム、報告書が説得すべき公衆をカバーします。",
        "各調査は、それが支えるべき意思決定を中心に設計します — プログラムを始めるか止めるか、どう対象を絞るか、資金提供者がどの証拠を受け入れるか。設計・サンプル・報告はこの問いから決まります。"
      ],
      "stagesKicker": "調査する内容",
      "stages": [
        {
          "n": "01",
          "name": "課題と対象",
          "frame": "誰が影響を受け、必要は実際に何か。",
          "cards": [
            {
              "title": "公衆・対象者調査",
              "body": "プログラムを設計する前に、母集団または定義された対象者を調査し、課題の現状を把握します。",
              "methods": "代表調査 · オンライン"
            },
            {
              "title": "ニーズとアクセス",
              "body": "サービスを必要とする人と、それを妨げているものを明らかにします。",
              "methods": "デプスインタビュー · 調査"
            }
          ]
        },
        {
          "n": "02",
          "name": "プログラム設計",
          "frame": "介入は何であるべきか、拡大前に機能するか。",
          "cards": [
            {
              "title": "プログラムテスト",
              "body": "拡大前に、想定する人々とモデルやメッセージをテストします。",
              "methods": "コンセプトテスト · フォーカスグループ"
            },
            {
              "title": "寄付者・支援者調査",
              "body": "支援者がその課題をどう捉え、何に資金を出すかを理解します。",
              "methods": "オンライン調査 · デプスインタビュー"
            }
          ]
        },
        {
          "n": "03",
          "name": "実施と到達",
          "frame": "誰が実際に受け取り、どこで途切れるか。",
          "cards": [
            {
              "title": "実施と到達",
              "body": "誰に届き誰に届かないか、実施が失敗する業務上の地点を描きます。",
              "methods": "デプスインタビュー · 調査"
            },
            {
              "title": "参加者の体験",
              "body": "プログラム内の人々の体験と、留まるか離脱する理由を調べます。",
              "methods": "調査 · フォーカスグループ"
            }
          ]
        },
        {
          "n": "04",
          "name": "エビデンスと影響",
          "frame": "何が変わり、どう示すか。",
          "cards": [
            {
              "title": "ベースラインに対する変化",
              "body": "ベースラインに対する変化を測り、データがプログラムに帰属できることとできないことを明確に述べます。",
              "methods": "調査 · インタビュー"
            },
            {
              "title": "エビデンスと報告",
              "body": "知見を、資金提供者・省庁・公衆が受け入れる報告書に変えます。",
              "methods": "調査 · インタビュー · デスクリサーチ"
            }
          ]
        }
      ],
      "methodsKicker": "手法",
      "methodsLead": "各手法の内容と、使う場面。",
      "methods": [
        [
          "代表調査",
          "全国または地域の代表サンプル。プログラムが対象とする母集団に合わせて割り付けます。"
        ],
        [
          "多主体調査",
          "受益者、実施スタッフ、資金提供者を一つの設計で調査し、同じ質問がプログラムの各側に届くようにします。"
        ],
        [
          "デプスインタビュー",
          "45〜60分のデプスインタビュー。調査チームが1対1で行います。"
        ],
        [
          "フォーカスグループ",
          "約90分のグループディスカッション。同輩の間で話題がどう語られるかを捉えます。"
        ],
        [
          "対面調査（CAPI）",
          "電話やオンラインで届かない母集団に対して、対面で構造化インタビューを行います。"
        ]
      ],
      "ctaTitle": "この調査が支えるべき意思決定をお聞かせください。",
      "ctaBody": "結果、その根拠、推奨する次の一手をお渡しします。",
      "ctaPrimary": "調査チームに相談する",
      "ctaSecondary": "参加する"
    },
    "ko": {
      "kicker": "산업",
      "title": "사회와 교육",
      "lead": "재단, 비영리단체, 교육 기관을 위한 조사: 누가 대상인지, 프로그램이 무엇을 바꾸는지, 어떻게 보여 줄지.",
      "introKicker": "일하는 방식",
      "intro": [
        "공공 프로그램과 교육은 몇 년이 걸리는 성과와, 좀처럼 한곳에 모이지 않는 대상으로 평가됩니다.",
        "우리는 프로그램이 닿아야 할 사람을 조사합니다. 무엇이 필요한지, 실제로 받는지, 무엇이 달라졌는지. 같은 설계로 재원 제공자, 실행 팀, 보고서가 설득해야 할 공중을 포괄합니다.",
        "각 조사는 그것이 뒷받침해야 할 결정을 중심으로 설계합니다 — 프로그램을 시작할지 멈출지, 어떻게 겨냥할지, 재원 제공자가 어떤 근거를 받아들일지. 설계, 표본, 보고는 이 질문에서 나옵니다."
      ],
      "stagesKicker": "무엇을 조사하는가",
      "stages": [
        {
          "n": "01",
          "name": "이슈와 대상",
          "frame": "누가 영향을 받고 필요가 실제로 무엇인가.",
          "cards": [
            {
              "title": "공중·대상 조사",
              "body": "프로그램을 설계하기 전에 모집단 또는 정의된 대상을 조사해 이슈의 현황을 파악합니다.",
              "methods": "대표 조사 · 온라인"
            },
            {
              "title": "필요와 접근",
              "body": "서비스가 필요한 사람과 그것을 막는 요인을 밝힙니다.",
              "methods": "심층 인터뷰 · 조사"
            }
          ]
        },
        {
          "n": "02",
          "name": "프로그램 설계",
          "frame": "개입이 무엇이어야 하고 확장 전에 작동하는가.",
          "cards": [
            {
              "title": "프로그램 테스트",
              "body": "확장 전에, 의도한 사람들과 모델이나 메시지를 테스트합니다.",
              "methods": "콘셉트 테스트 · 포커스 그룹"
            },
            {
              "title": "기부자·후원자 조사",
              "body": "후원자가 그 사안을 어떻게 보고 무엇에 자금을 낼지 이해합니다.",
              "methods": "온라인 조사 · 심층 인터뷰"
            }
          ]
        },
        {
          "n": "03",
          "name": "실행과 도달",
          "frame": "누가 실제로 받고 어디서 끊기는가.",
          "cards": [
            {
              "title": "실행과 도달",
              "body": "누구에게 닿고 누구에게 닿지 않는지, 실행이 실패하는 운영 지점을 그립니다.",
              "methods": "심층 인터뷰 · 조사"
            },
            {
              "title": "참여자 경험",
              "body": "프로그램 안 사람들의 경험과 남거나 이탈하는 이유를 조사합니다.",
              "methods": "조사 · 포커스 그룹"
            }
          ]
        },
        {
          "n": "04",
          "name": "근거와 영향",
          "frame": "무엇이 달라졌고 어떻게 제시할지.",
          "cards": [
            {
              "title": "기준선 대비 변화",
              "body": "기준선 대비 변화를 측정하고, 데이터가 프로그램에 귀속할 수 있는 것과 없는 것을 분명히 밝힙니다.",
              "methods": "조사 · 인터뷰"
            },
            {
              "title": "근거와 보고",
              "body": "결과를 재원 제공자, 부처, 공중이 받아들일 보고서로 바꿉니다.",
              "methods": "조사 · 인터뷰 · 문헌 조사"
            }
          ]
        }
      ],
      "methodsKicker": "방법",
      "methodsLead": "각 방법이 무엇이고 언제 쓰는가.",
      "methods": [
        [
          "대표 조사",
          "전국 또는 지역 대표 표본. 프로그램이 대상으로 하는 모집단에 맞춰 할당합니다."
        ],
        [
          "다주체 조사",
          "수혜자, 실행 인력, 재원 제공자를 하나의 설계로 조사해 같은 질문이 프로그램의 모든 측면에 닿게 합니다."
        ],
        [
          "심층 인터뷰",
          "45~60분 심층 인터뷰. 조사팀이 1대1로 진행합니다."
        ],
        [
          "포커스 그룹",
          "약 90분의 그룹 토론. 동료 사이에서 주제가 어떻게 이야기되는지를 봅니다."
        ],
        [
          "대면 조사(CAPI)",
          "전화나 온라인으로 닿지 않는 모집단에 대해 대면으로 구조화 인터뷰를 진행합니다."
        ]
      ],
      "ctaTitle": "이 조사가 뒷받침해야 할 결정을 알려주세요.",
      "ctaBody": "결과, 그 근거, 권장하는 다음 단계를 받습니다.",
      "ctaPrimary": "조사팀과 상담하기",
      "ctaSecondary": "참여하기"
    },
    "no": {
      "kicker": "Bransjer",
      "title": "Samfunn og utdanning",
      "lead": "Forskning for stiftelser, ideelle organisasjoner og utdanningsaktører: hvem målgruppen er, hva programmet endrer, og hvordan det vises.",
      "introKicker": "Slik arbeider vi",
      "intro": [
        "Offentlige programmer og utdanning vurderes på resultater som tar år, og på målgrupper som sjelden er på ett sted.",
        "Vi undersøker menneskene et program skal nå: hva de trenger, om de får det, og hva som endret seg for dem. Samme design dekker finansieringskilden, gjennomføringsteamet og offentligheten en rapport skal overbevise.",
        "Hver studie designes rundt beslutningen den skal støtte — om et program skal starte eller stoppe, hvordan det målrettes, og hvilken evidens finansieringskilden aksepterer. Design, utvalg og rapportering følger dette spørsmålet."
      ],
      "stagesKicker": "Hva vi undersøker",
      "stages": [
        {
          "n": "01",
          "name": "Tema og målgruppe",
          "frame": "Hvem som berøres, og hva behovet egentlig er.",
          "cards": [
            {
              "title": "Befolknings- og målgruppeundersøkelse",
              "body": "Undersøk en befolkning eller en definert målgruppe for å fastslå hvordan temaet ser ut før et program designes.",
              "methods": "Representativ undersøkelse · nett"
            },
            {
              "title": "Behov og tilgang",
              "body": "Fastslå hvem som trenger tjenesten, og hva som i dag holder dem fra den.",
              "methods": "Dybdeintervjuer · undersøkelse"
            }
          ]
        },
        {
          "n": "02",
          "name": "Programdesign",
          "frame": "Hva tiltaket skal være, og om det virker før skalering.",
          "cards": [
            {
              "title": "Programtest",
              "body": "Test en modell eller et budskap med menneskene den er ment for, før den skaleres.",
              "methods": "Konsepttest · fokusgrupper"
            },
            {
              "title": "Giver- og støtteundersøkelse",
              "body": "Forstå hva støttespillere mener om saken, og hva de vil finansiere.",
              "methods": "Nettundersøkelse · dybdeintervjuer"
            }
          ]
        },
        {
          "n": "03",
          "name": "Gjennomføring og rekkevidde",
          "frame": "Hvem som faktisk mottar det, og hvor det faller fra.",
          "cards": [
            {
              "title": "Gjennomføring og rekkevidde",
              "body": "Kartlegg hvem som nås og hvem som mistes, og de operative punktene der gjennomføringen svikter.",
              "methods": "Dybdeintervjuer · undersøkelse"
            },
            {
              "title": "Deltakernes opplevelse",
              "body": "Undersøk opplevelsen til menneskene i programmet, og hva som får dem til å bli eller falle fra.",
              "methods": "Undersøkelse · fokusgrupper"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidens og innflytelse",
          "frame": "Hva som endret seg, og hvordan det presenteres.",
          "cards": [
            {
              "title": "Endring mot en baseline",
              "body": "Mål endring mot en baseline, og si klart hva dataene kan og ikke kan tilskrive programmet.",
              "methods": "Undersøkelse · intervjuer"
            },
            {
              "title": "Evidens og rapportering",
              "body": "Gjør funn om til en rapport finansieringskilden, departementet eller offentligheten aksepterer.",
              "methods": "Undersøkelse · intervjuer · skrivebordsforskning"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Hva hver metode er, og når vi bruker den.",
      "methods": [
        [
          "Representativ undersøkelse",
          "Nasjonalt eller regionalt representative utvalg, med kvoter satt etter befolkningen programmet betjener."
        ],
        [
          "Undersøkelse blant flere parter",
          "Mottakere, gjennomføringspersonale og finansieringskilder undersøkt i ett design, slik at de samme spørsmålene når hver side av programmet."
        ],
        [
          "Dybdeintervjuer",
          "Dybdeintervjuer på 45–60 minutter, gjennomført en til en av forskerteamet."
        ],
        [
          "Fokusgrupper",
          "Gruppediskusjoner på rundt 90 minutter, for hvordan et tema snakkes om blant likemenn."
        ],
        [
          "Feltarbeid ansikt til ansikt (CAPI)",
          "Strukturerte intervjuer gjennomført personlig, der befolkningen ikke nås per telefon eller nett."
        ]
      ],
      "ctaTitle": "Fortell oss hvilken beslutning denne forskningen skal støtte.",
      "ctaBody": "Du får funnene, belegget bak dem og anbefalt neste steg.",
      "ctaPrimary": "Snakk med forskerteamet",
      "ctaSecondary": "Bli med"
    },
    "pt": {
      "kicker": "Setores",
      "title": "Sociedade e educação",
      "lead": "Investigação para fundações, organizações sem fins lucrativos e entidades educativas: quem é o público, o que o programa muda e como mostrá-lo.",
      "introKicker": "Como trabalhamos",
      "intro": [
        "Os programas públicos e a educação são avaliados por resultados que levam anos e por públicos raramente num só lugar.",
        "Estudamos as pessoas que um programa deve alcançar: do que precisam, se o recebem e o que mudou para elas. O mesmo desenho cobre o financiador, a equipa de execução e o público que um relatório tem de convencer.",
        "Cada estudo é desenhado em torno da decisão que tem de sustentar — iniciar ou parar um programa, como o direcionar e que evidência o financiador aceitará. Desenho, amostra e relatório decorrem dessa pergunta."
      ],
      "stagesKicker": "O que estudamos",
      "stages": [
        {
          "n": "01",
          "name": "Tema e público",
          "frame": "Quem é afetado e qual é realmente a necessidade.",
          "cards": [
            {
              "title": "Investigação de público",
              "body": "Inquirir uma população ou um público definido para estabelecer o estado do tema antes de desenhar um programa.",
              "methods": "Inquérito representativo · online"
            },
            {
              "title": "Necessidade e acesso",
              "body": "Estabelecer quem precisa do serviço e o que hoje o impede.",
              "methods": "Entrevistas em profundidade · inquérito"
            }
          ]
        },
        {
          "n": "02",
          "name": "Desenho do programa",
          "frame": "O que deve ser a intervenção e se funciona antes de escalar.",
          "cards": [
            {
              "title": "Teste do programa",
              "body": "Testar um modelo ou uma mensagem com as pessoas a quem se destina, antes de escalar.",
              "methods": "Teste de conceito · grupos focais"
            },
            {
              "title": "Investigação de doadores e apoiantes",
              "body": "Compreender o que os apoiantes pensam da causa e o que financiarão.",
              "methods": "Inquérito online · entrevistas em profundidade"
            }
          ]
        },
        {
          "n": "03",
          "name": "Execução e alcance",
          "frame": "Quem o recebe realmente e onde falha.",
          "cards": [
            {
              "title": "Execução e alcance",
              "body": "Mapear quem é alcançado e quem fica de fora, e os pontos operacionais onde a execução falha.",
              "methods": "Entrevistas em profundidade · inquérito"
            },
            {
              "title": "Experiência dos participantes",
              "body": "Estudar a experiência das pessoas dentro do programa e o que as faz ficar ou desistir.",
              "methods": "Inquérito · grupos focais"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidência e influência",
          "frame": "O que mudou e como apresentá-lo.",
          "cards": [
            {
              "title": "Mudança face a uma linha de base",
              "body": "Medir a mudança face a uma linha de base e dizer claramente o que os dados podem e não podem atribuir ao programa.",
              "methods": "Inquérito · entrevistas"
            },
            {
              "title": "Evidência e relatório",
              "body": "Transformar os resultados num relatório que o financiador, o ministério ou o público aceite.",
              "methods": "Inquérito · entrevistas · investigação documental"
            }
          ]
        }
      ],
      "methodsKicker": "Métodos",
      "methodsLead": "O que é cada método e quando o usamos.",
      "methods": [
        [
          "Inquérito representativo",
          "Amostras representativas a nível nacional ou regional, com quotas fixadas à população servida pelo programa."
        ],
        [
          "Inquérito multi-partes",
          "Beneficiários, equipas de execução e financiadores inquiridos num só desenho, para que as mesmas perguntas cheguem a cada lado do programa."
        ],
        [
          "Entrevistas em profundidade",
          "Entrevistas em profundidade de 45 a 60 minutos, conduzidas um a um pela equipa."
        ],
        [
          "Grupos focais",
          "Discussões de grupo de cerca de 90 minutos, para como um tema é falado entre pares."
        ],
        [
          "Trabalho de campo presencial (CAPI)",
          "Entrevistas estruturadas realizadas em pessoa, onde a população não é alcançável por telefone ou online."
        ]
      ],
      "ctaTitle": "Diga-nos que decisão esta investigação tem de sustentar.",
      "ctaBody": "Recebe os resultados, as provas que os sustentam e o próximo passo recomendado.",
      "ctaPrimary": "Falar com a equipa",
      "ctaSecondary": "Junte-se a nós"
    },
    "ru": {
      "kicker": "Отрасли",
      "title": "Общество и образование",
      "lead": "Исследования для фондов, НКО и образовательных организаций: кто аудитория, что меняет программа и как это показать.",
      "introKicker": "Как мы работаем",
      "intro": [
        "Публичные программы и образование оценивают по результатам, на которые уходят годы, и по аудиториям, которые редко собраны в одном месте.",
        "Мы изучаем людей, до которых должна дойти программа: что им нужно, получают ли они это и что изменилось. Тот же дизайн охватывает фонд, команду исполнения и публику, которую должен убедить отчёт.",
        "Каждое исследование строится вокруг решения, которое оно должно поддержать — начинать или прекращать программу, как её нацелить и какие доказательства примет фонд. Дизайн, выборка и отчёт следуют из этого вопроса."
      ],
      "stagesKicker": "Что мы изучаем",
      "stages": [
        {
          "n": "01",
          "name": "Тема и аудитория",
          "frame": "Кого это касается и в чём на самом деле потребность.",
          "cards": [
            {
              "title": "Исследование населения и аудитории",
              "body": "Опрос населения или определённой аудитории, чтобы понять состояние темы до разработки программы.",
              "methods": "Репрезентативный опрос · онлайн"
            },
            {
              "title": "Потребность и доступ",
              "body": "Определить, кому нужна услуга и что сегодня этому мешает.",
              "methods": "Глубинные интервью · опрос"
            }
          ]
        },
        {
          "n": "02",
          "name": "Дизайн программы",
          "frame": "Какой должна быть интервенция и работает ли она до масштабирования.",
          "cards": [
            {
              "title": "Тест программы",
              "body": "Проверить модель или сообщение на людях, для которых они предназначены, до масштабирования.",
              "methods": "Тест концепции · фокус-группы"
            },
            {
              "title": "Исследование доноров и сторонников",
              "body": "Понять, что сторонники думают о теме и что готовы финансировать.",
              "methods": "Онлайн-опрос · глубинные интервью"
            }
          ]
        },
        {
          "n": "03",
          "name": "Исполнение и охват",
          "frame": "Кто на самом деле получает и где обрывается.",
          "cards": [
            {
              "title": "Исполнение и охват",
              "body": "Нанести, кто охвачен и кто упущен, и операционные точки, где исполнение даёт сбой.",
              "methods": "Глубинные интервью · опрос"
            },
            {
              "title": "Опыт участников",
              "body": "Изучить опыт людей внутри программы и то, что заставляет их остаться или уйти.",
              "methods": "Опрос · фокус-группы"
            }
          ]
        },
        {
          "n": "04",
          "name": "Доказательства и влияние",
          "frame": "Что изменилось и как это представить.",
          "cards": [
            {
              "title": "Изменение относительно базовой линии",
              "body": "Измерить изменение относительно базовой линии и ясно сказать, что данные могут и не могут отнести к программе.",
              "methods": "Опрос · интервью"
            },
            {
              "title": "Доказательства и отчёт",
              "body": "Превратить выводы в отчёт, который примут фонд, министерство или публика.",
              "methods": "Опрос · интервью · кабинетное исследование"
            }
          ]
        }
      ],
      "methodsKicker": "Методы",
      "methodsLead": "Что представляет собой каждый метод и когда мы его применяем.",
      "methods": [
        [
          "Репрезентативный опрос",
          "Национально или регионально репрезентативные выборки с квотами по населению, которое обслуживает программа."
        ],
        [
          "Опрос нескольких сторон",
          "Благополучатели, исполнители и фонды опрошены в одном дизайне, чтобы одни и те же вопросы дошли до каждой стороны программы."
        ],
        [
          "Глубинные интервью",
          "Глубинные интервью по 45–60 минут, один на один с исследовательской командой."
        ],
        [
          "Фокус-группы",
          "Групповые дискуссии около 90 минут — о том, как о теме говорят среди равных."
        ],
        [
          "Полевая работа лицом к лицу (CAPI)",
          "Структурированные интервью лично, там, где население недоступно по телефону или онлайн."
        ]
      ],
      "ctaTitle": "Расскажите, какое решение должно поддержать это исследование.",
      "ctaBody": "Вы получаете результаты, доказательства за ними и рекомендуемый следующий шаг.",
      "ctaPrimary": "Поговорить с командой",
      "ctaSecondary": "Присоединиться"
    },
    "sv": {
      "kicker": "Branscher",
      "title": "Samhälle och utbildning",
      "lead": "Undersökningar för stiftelser, ideella organisationer och utbildningsaktörer: vem målgruppen är, vad programmet förändrar och hur det visas.",
      "introKicker": "Så arbetar vi",
      "intro": [
        "Offentliga program och utbildning bedöms på resultat som tar år, och på målgrupper som sällan är på ett ställe.",
        "Vi undersöker människorna ett program ska nå: vad de behöver, om de får det och vad som förändrades för dem. Samma design täcker finansiären, genomförandeteamet och den allmänhet en rapport ska övertyga.",
        "Varje studie byggs kring det beslut den ska stödja — att starta eller stoppa ett program, hur det ska riktas och vilken evidens finansiären accepterar. Design, urval och rapportering följer den frågan."
      ],
      "stagesKicker": "Vad vi undersöker",
      "stages": [
        {
          "n": "01",
          "name": "Fråga och målgrupp",
          "frame": "Vem som berörs och vad behovet egentligen är.",
          "cards": [
            {
              "title": "Befolknings- och målgruppsundersökning",
              "body": "Undersök en befolkning eller en definierad målgrupp för att fastställa frågans läge innan ett program designas.",
              "methods": "Representativ undersökning · online"
            },
            {
              "title": "Behov och tillgång",
              "body": "Fastställa vem som behöver tjänsten och vad som i dag hindrar dem.",
              "methods": "Djupintervjuer · undersökning"
            }
          ]
        },
        {
          "n": "02",
          "name": "Programdesign",
          "frame": "Vad insatsen ska vara och om den fungerar före skalning.",
          "cards": [
            {
              "title": "Programtest",
              "body": "Testa en modell eller ett budskap med människorna den är avsedd för, innan den skalas.",
              "methods": "Koncepttest · fokusgrupper"
            },
            {
              "title": "Givar- och stödjandeundersökning",
              "body": "Förstå vad stödjare tror om saken och vad de vill finansiera.",
              "methods": "Onlineundersökning · djupintervjuer"
            }
          ]
        },
        {
          "n": "03",
          "name": "Genomförande och räckvidd",
          "frame": "Vilka som faktiskt får det och var det faller.",
          "cards": [
            {
              "title": "Genomförande och räckvidd",
              "body": "Kartlägg vilka som nås och vilka som missas, och de operativa punkter där genomförandet brister.",
              "methods": "Djupintervjuer · undersökning"
            },
            {
              "title": "Deltagarnas upplevelse",
              "body": "Undersök upplevelsen för människorna i programmet och vad som får dem att stanna eller hoppa av.",
              "methods": "Undersökning · fokusgrupper"
            }
          ]
        },
        {
          "n": "04",
          "name": "Evidens och påverkan",
          "frame": "Vad som förändrades och hur det presenteras.",
          "cards": [
            {
              "title": "Förändring mot en baslinje",
              "body": "Mät förändring mot en baslinje och säg tydligt vad data kan och inte kan tillskriva programmet.",
              "methods": "Undersökning · intervjuer"
            },
            {
              "title": "Evidens och rapportering",
              "body": "Gör fynd till en rapport som finansiär, departement eller allmänhet accepterar.",
              "methods": "Undersökning · intervjuer · skrivbordsforskning"
            }
          ]
        }
      ],
      "methodsKicker": "Metoder",
      "methodsLead": "Vad varje metod är och när vi använder den.",
      "methods": [
        [
          "Representativ undersökning",
          "Nationellt eller regionalt representativa urval, med kvoter satta efter befolkningen programmet betjänar."
        ],
        [
          "Undersökning bland flera parter",
          "Mottagare, genomförandepersonal och finansiärer undersökta i en design, så att samma frågor når varje sida av programmet."
        ],
        [
          "Djupintervjuer",
          "Djupintervjuer på 45–60 minuter, genomförda en mot en av forskarteamet."
        ],
        [
          "Fokusgrupper",
          "Gruppdiskussioner på cirka 90 minuter, för hur ett ämne talas om bland jämlikar."
        ],
        [
          "Fältarbete ansikte mot ansikte (CAPI)",
          "Strukturerade intervjuer genomförda personligen, där befolkningen inte nås per telefon eller online."
        ]
      ],
      "ctaTitle": "Berätta vilket beslut den här undersökningen ska stödja.",
      "ctaBody": "Du får resultaten, underlaget bakom dem och rekommenderat nästa steg.",
      "ctaPrimary": "Prata med forskarteamet",
      "ctaSecondary": "Var med"
    },
    "tr": {
      "kicker": "Sektörler",
      "title": "Toplum ve eğitim",
      "lead": "Vakıflar, kâr amacı gütmeyen kuruluşlar ve eğitim sağlayıcıları için araştırma: hedef kitle kim, program neyi değiştiriyor ve nasıl gösterilir.",
      "introKicker": "Nasıl çalışıyoruz",
      "intro": [
        "Kamu programları ve eğitim, yıllar alan sonuçlarla ve nadiren tek bir yerde bulunan kitlelerle değerlendirilir.",
        "Bir programın ulaşması gereken insanları inceliyoruz: neye ihtiyaçları var, bunu alıyorlar mı ve onlar için ne değişti. Aynı tasarım, fon sağlayıcıyı, uygulama ekibini ve bir raporun ikna etmesi gereken kamuoyunu kapsar.",
        "Her çalışma, desteklemesi gereken kararın etrafında tasarlanır — program başlatılacak mı durdurulacak mı, nasıl hedeflenecek ve fon sağlayıcı hangi kanıtı kabul edecek. Tasarım, örneklem ve rapor bu sorudan türetilir."
      ],
      "stagesKicker": "Neyi inceliyoruz",
      "stages": [
        {
          "n": "01",
          "name": "Konu ve hedef kitle",
          "frame": "Kim etkileniyor ve ihtiyaç gerçekte ne.",
          "cards": [
            {
              "title": "Kamu ve hedef kitle araştırması",
              "body": "Bir program tasarlanmadan önce konunun durumunu belirlemek için bir nüfusu veya tanımlı bir kitleyi araştırın.",
              "methods": "Temsili anket · çevrimiçi"
            },
            {
              "title": "İhtiyaç ve erişim",
              "body": "Hizmete kimin ihtiyacı olduğunu ve bugün neyin engellediğini belirleyin.",
              "methods": "Derinlemesine görüşmeler · anket"
            }
          ]
        },
        {
          "n": "02",
          "name": "Program tasarımı",
          "frame": "Müdahalenin ne olması gerektiği ve ölçeklemeden önce işe yarayıp yaramadığı.",
          "cards": [
            {
              "title": "Program testi",
              "body": "Ölçeklemeden önce bir modeli veya mesajı, hedeflediği kişilerle test edin.",
              "methods": "Konsept testi · odak grupları"
            },
            {
              "title": "Bağışçı ve destekçi araştırması",
              "body": "Destekçilerin konu hakkında ne düşündüğünü ve neyi finanse edeceklerini anlayın.",
              "methods": "Çevrimiçi anket · derinlemesine görüşmeler"
            }
          ]
        },
        {
          "n": "03",
          "name": "Uygulama ve erişim",
          "frame": "Kimin gerçekten aldığı ve nerede koptuğu.",
          "cards": [
            {
              "title": "Uygulama ve erişim",
              "body": "Kime ulaşıldığını ve kimin kaçtığını, uygulamanın başarısız olduğu operasyonel noktaları haritalayın.",
              "methods": "Derinlemesine görüşmeler · anket"
            },
            {
              "title": "Katılımcı deneyimi",
              "body": "Programdaki insanların deneyimini ve onları tutan ya da bıraktıran şeyi inceleyin.",
              "methods": "Anket · odak grupları"
            }
          ]
        },
        {
          "n": "04",
          "name": "Kanıt ve etki",
          "frame": "Neyin değiştiği ve nasıl sunulacağı.",
          "cards": [
            {
              "title": "Bir başlangıç çizgisine göre değişim",
              "body": "Değişimi bir başlangıç çizgisine göre ölçün ve verinin programa neyi atfedebileceğini ve atfedemeyeceğini açıkça söyleyin.",
              "methods": "Anket · görüşmeler"
            },
            {
              "title": "Kanıt ve raporlama",
              "body": "Bulguları fon sağlayıcının, bakanlığın veya kamuoyunun kabul edeceği bir rapora dönüştürün.",
              "methods": "Anket · görüşmeler · masa araştırması"
            }
          ]
        }
      ],
      "methodsKicker": "Yöntemler",
      "methodsLead": "Her yöntemin ne olduğu ve ne zaman kullandığımız.",
      "methods": [
        [
          "Temsili anket",
          "Ulusal veya bölgesel temsili örneklemler; kotalar programın hizmet ettiği nüfusa göre."
        ],
        [
          "Çok paydaşlı anket",
          "Yararlanıcılar, uygulama personeli ve fon sağlayıcılar tek tasarımda araştırılır; aynı sorular programın her tarafına ulaşır."
        ],
        [
          "Derinlemesine görüşmeler",
          "45-60 dakikalık derinlemesine görüşmeler; araştırma ekibi bire bir yürütür."
        ],
        [
          "Odak grupları",
          "Yaklaşık 90 dakikalık grup tartışmaları; bir konunun akranlar arasında nasıl konuşulduğu için."
        ],
        [
          "Yüz yüze saha çalışması (CAPI)",
          "Nüfusa telefon veya çevrimiçi ulaşılamadığı yerde yüz yüze yapılan yapılandırılmış görüşmeler."
        ]
      ],
      "ctaTitle": "Bu araştırmanın hangi kararı desteklemesi gerektiğini bize anlatın.",
      "ctaBody": "Bulguları, arkalarındaki kanıtları ve önerilen sonraki adımı alırsınız.",
      "ctaPrimary": "Araştırma ekibiyle konuşun",
      "ctaSecondary": "Katılın"
    }
  },
  "industrial": {
    "en-US": {
      "kicker": "Industries",
      "title": "Industrial & building products",
      "lead": "Research for building material brands, industrial equipment makers and their distribution networks: what dealers push, what specifiers write, and what the site actually uses.",
      "introKicker": "How we work",
      "intro": [
        "Building products are sold twice: once into a distribution network, and once into a project. The same brand runs both, with different prices, policies and customers.",
        "We study each side of that chain: the dealer who decides whether to stock it, the specifier who decides whether to write it, and the crew that decides whether to use it.",
        "Each study is designed around the decision it has to support — which specification to push, which region to open, why a dealer drops the line. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Product and specification",
          "frame": "What is sold, at what price, against whom.",
          "cards": [
            {
              "title": "Price tiers and specification",
              "body": "Test specifications and price points against the products they meet on the same shelf or in the same tender.",
              "methods": "CATI · dealer interviews"
            },
            {
              "title": "New products and substitution",
              "body": "Establish whether a new product replaces an existing one, or adds a line nobody asked for.",
              "methods": "In-depth interviews · product tests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Channel and dealers",
          "frame": "Why a dealer pushes one brand and shelves another.",
          "cards": [
            {
              "title": "Voice of the dealer",
              "body": "Satisfaction, rebates, payment terms, and the point at which a dealer stops recommending the brand.",
              "methods": "CATI census · in-depth interviews"
            },
            {
              "title": "Coverage and sell-out",
              "body": "Map where the brand is stocked, and how much of it actually leaves the store.",
              "methods": "CATI · dealer-reported sell-out"
            }
          ]
        },
        {
          "n": "03",
          "name": "Projects and specification",
          "frame": "Who writes the brand into the job.",
          "cards": [
            {
              "title": "The specification journey",
              "body": "Follow a product from first awareness to being written into the drawings, and the point where it drops out.",
              "methods": "Specifier interviews"
            },
            {
              "title": "Tendering and contractors",
              "body": "Understand what the contractor weighs at tender, and where price overrides the specification.",
              "methods": "In-depth interviews · CATI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Repeat and service",
          "frame": "Why the next order goes elsewhere.",
          "cards": [
            {
              "title": "Delivery and after-sales",
              "body": "Measure delivery reliability, after-sales response, and the failures that trigger a switch.",
              "methods": "CATI · dealer interviews"
            },
            {
              "title": "Terms and loyalty",
              "body": "Establish how payment terms and rebates hold a dealer, and for how long.",
              "methods": "CATI census"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Dealer network census",
          "A telephone census of the dealer and distributor network, covering stocking, sell-out, terms and satisfaction."
        ],
        [
          "Contractor and crew interviews",
          "Face-to-face interviews with contractors and applicators, where the product is actually used."
        ],
        [
          "Specifier interviews",
          "Interviews with the architects and engineers who write products into specifications."
        ],
        [
          "Homeowner survey",
          "Online survey of homeowners and renovators, with quotas by city and project type."
        ],
        [
          "Product and sample tests",
          "Product and sample tests with the people who apply the material."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "工业与建材",
      "lead": "面向建材品牌、工业设备制造商及其分销网络：经销商推什么、设计方写什么、工地实际用什么。",
      "introKicker": "我们如何做",
      "intro": [
        "建材卖两次：一次卖进分销网络，一次卖进一个项目。同一个品牌两条线都走，价格、政策与客户都不同。",
        "我们研究这条链条上的每一环：决定要不要进货的经销商、决定要不要上图的设计方，以及决定用不用的施工班组。",
        "每项研究都围绕它要支撑的决定来设计：主推哪个规格、开哪个区域、经销商为什么放弃这条线。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "品类与规格",
          "frame": "卖什么、什么价、和谁抢。",
          "cards": [
            {
              "title": "价格带与规格",
              "body": "在同一排货架或同一个标里，测试规格与价格点对上的那些竞品。",
              "methods": "电话访问 · 经销商访谈"
            },
            {
              "title": "新品与替代",
              "body": "弄清一个新品是替换了现有产品，还是多了一条没人要的线。",
              "methods": "深度访谈 · 产品测试"
            }
          ]
        },
        {
          "n": "02",
          "name": "渠道与经销",
          "frame": "经销商为什么推一个品牌、又为什么把你的货压住。",
          "cards": [
            {
              "title": "经销商之声",
              "body": "满意度、返利、账期，以及经销商从哪一步开始不再推荐这个品牌。",
              "methods": "电话普查 · 深度访谈"
            },
            {
              "title": "覆盖与动销",
              "body": "弄清品牌在哪些店有货，以及有多少真正从店里卖出去。",
              "methods": "电话访问 · 经销商动销数据"
            }
          ]
        },
        {
          "n": "03",
          "name": "项目与工程",
          "frame": "谁把品牌写进这个工程。",
          "cards": [
            {
              "title": "上图旅程",
              "body": "跟着一个产品走：从第一次认知到被写进图纸，以及在哪一步掉出局。",
              "methods": "设计方访谈"
            },
            {
              "title": "招投标与总包",
              "body": "弄清总包在投标时权衡什么，以及价格在哪一步压过了规格。",
              "methods": "深度访谈 · 电话访问"
            }
          ]
        },
        {
          "n": "04",
          "name": "复购与服务",
          "frame": "下一单为什么给了别人。",
          "cards": [
            {
              "title": "交付与售后",
              "body": "测量交付可靠性、售后响应，以及哪些失败会直接触发换品牌。",
              "methods": "电话访问 · 经销商访谈"
            },
            {
              "title": "账期与忠诚",
              "body": "弄清账期与返利能留住一个经销商多久。",
              "methods": "电话普查"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "经销商网络普查",
          "对经销商与分销商网络做电话普查，覆盖备货、动销、账期与满意度。"
        ],
        [
          "承包商与施工人员面访",
          "在材料实际使用的地方，与承包商和施工人员面对面访谈。"
        ],
        [
          "设计方访谈",
          "与把产品写进规格的建筑师和工程师访谈。"
        ],
        [
          "业主问卷",
          "面向业主与装修者的线上问卷，配额按城市与项目类型设定。"
        ],
        [
          "产品与样品测试",
          "在真正施工的人手里测产品与样品。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "工業與建材",
      "lead": "面向建材品牌、工業設備製造商及其分銷網絡：經銷商推什麼、設計方寫什麼、工地實際用什麼。",
      "introKicker": "我們如何做",
      "intro": [
        "建材賣兩次：一次賣進分銷網絡，一次賣進一個專案。同一個品牌兩條線都走，價格、政策與客戶都不同。",
        "我們研究這條鏈條上的每一環：決定要不要進貨的經銷商、決定要不要上圖的設計方，以及決定用不用的施工班組。",
        "每項研究都圍繞它要支撐的決定來設計：主推哪個規格、開哪個區域、經銷商為什麼放棄這條線。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "品類與規格",
          "frame": "賣什麼、什麼價、和誰搶。",
          "cards": [
            {
              "title": "價格帶與規格",
              "body": "在同一排貨架或同一個標裡，測試規格與價格點對上的那些競品。",
              "methods": "電話訪問 · 經銷商訪談"
            },
            {
              "title": "新品與替代",
              "body": "弄清一個新品是替換了現有產品，還是多了一條沒人要的線。",
              "methods": "深度訪談 · 產品測試"
            }
          ]
        },
        {
          "n": "02",
          "name": "渠道與經銷",
          "frame": "經銷商為什麼推一個品牌、又為什麼把你的貨壓住。",
          "cards": [
            {
              "title": "經銷商之聲",
              "body": "滿意度、返利、帳期，以及經銷商從哪一步開始不再推薦這個品牌。",
              "methods": "電話普查 · 深度訪談"
            },
            {
              "title": "覆蓋與動銷",
              "body": "弄清品牌在哪些店有貨，以及有多少真正從店裡賣出去。",
              "methods": "電話訪問 · 經銷商動銷資料"
            }
          ]
        },
        {
          "n": "03",
          "name": "專案與工程",
          "frame": "誰把品牌寫進這個工程。",
          "cards": [
            {
              "title": "上圖旅程",
              "body": "跟著一個產品走：從第一次認知到被寫進圖紙，以及在哪一步掉出局。",
              "methods": "設計方訪談"
            },
            {
              "title": "招投標與總包",
              "body": "弄清總包在投標時權衡什麼，以及價格在哪一步壓過了規格。",
              "methods": "深度訪談 · 電話訪問"
            }
          ]
        },
        {
          "n": "04",
          "name": "複購與服務",
          "frame": "下一單為什麼給了別人。",
          "cards": [
            {
              "title": "交付與售後",
              "body": "測量交付可靠性、售後回應，以及哪些失敗會直接觸發換品牌。",
              "methods": "電話訪問 · 經銷商訪談"
            },
            {
              "title": "帳期與忠誠",
              "body": "弄清帳期與返利能留住一個經銷商多久。",
              "methods": "電話普查"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "經銷商網絡普查",
          "對經銷商與分銷商網絡做電話普查，涵蓋備貨、動銷、帳期與滿意度。"
        ],
        [
          "承包商與施工人員面訪",
          "在材料實際使用的地方，與承包商和施工人員面對面訪談。"
        ],
        [
          "設計方訪談",
          "與把產品寫進規格的建築師和工程師訪談。"
        ],
        [
          "業主問卷",
          "面向業主與裝修者的線上問卷，配額按城市與專案類型設定。"
        ],
        [
          "產品與樣品測試",
          "在真正施工的人手裡測產品與樣品。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Industrial & building products",
      "lead": "Research for building material brands, industrial equipment makers and their distribution networks: what dealers push, what specifiers write, and what the site actually uses.",
      "introKicker": "How we work",
      "intro": [
        "Building products are sold twice: once into a distribution network, and once into a project. The same brand runs both, with different prices, policies and customers.",
        "We study each side of that chain: the dealer who decides whether to stock it, the specifier who decides whether to write it, and the crew that decides whether to use it.",
        "Each study is designed around the decision it has to support — which specification to push, which region to open, why a dealer drops the line. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Product and specification",
          "frame": "What is sold, at what price, against whom.",
          "cards": [
            {
              "title": "Price tiers and specification",
              "body": "Test specifications and price points against the products they meet on the same shelf or in the same tender.",
              "methods": "CATI · dealer interviews"
            },
            {
              "title": "New products and substitution",
              "body": "Establish whether a new product replaces an existing one, or adds a line nobody asked for.",
              "methods": "In-depth interviews · product tests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Channel and dealers",
          "frame": "Why a dealer pushes one brand and shelves another.",
          "cards": [
            {
              "title": "Voice of the dealer",
              "body": "Satisfaction, rebates, payment terms, and the point at which a dealer stops recommending the brand.",
              "methods": "CATI census · in-depth interviews"
            },
            {
              "title": "Coverage and sell-out",
              "body": "Map where the brand is stocked, and how much of it actually leaves the store.",
              "methods": "CATI · dealer-reported sell-out"
            }
          ]
        },
        {
          "n": "03",
          "name": "Projects and specification",
          "frame": "Who writes the brand into the job.",
          "cards": [
            {
              "title": "The specification journey",
              "body": "Follow a product from first awareness to being written into the drawings, and the point where it drops out.",
              "methods": "Specifier interviews"
            },
            {
              "title": "Tendering and contractors",
              "body": "Understand what the contractor weighs at tender, and where price overrides the specification.",
              "methods": "In-depth interviews · CATI"
            }
          ]
        },
        {
          "n": "04",
          "name": "Repeat and service",
          "frame": "Why the next order goes elsewhere.",
          "cards": [
            {
              "title": "Delivery and after-sales",
              "body": "Measure delivery reliability, after-sales response, and the failures that trigger a switch.",
              "methods": "CATI · dealer interviews"
            },
            {
              "title": "Terms and loyalty",
              "body": "Establish how payment terms and rebates hold a dealer, and for how long.",
              "methods": "CATI census"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Dealer network census",
          "A telephone census of the dealer and distributor network, covering stocking, sell-out, terms and satisfaction."
        ],
        [
          "Contractor and crew interviews",
          "Face-to-face interviews with contractors and applicators, where the product is actually used."
        ],
        [
          "Specifier interviews",
          "Interviews with the architects and engineers who write products into specifications."
        ],
        [
          "Homeowner survey",
          "Online survey of homeowners and renovators, with quotas by city and project type."
        ],
        [
          "Product and sample tests",
          "Product and sample tests with the people who apply the material."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    }
  },
  "tech": {
    "en-US": {
      "kicker": "Industries",
      "title": "Technology & digital",
      "lead": "Research for software, platform, internet and device companies: what the roadmap should hold, how it should be priced, and why users leave.",
      "introKicker": "How we work",
      "intro": [
        "A technology product is decided before it ships: which features make the roadmap, which tier carries the price, and what the first weeks of use have to prove.",
        "We study buyers and users separately — the technical decision-maker who signs, and the person who has to use it — and the point where the two disagree.",
        "Each study is designed around the decision it has to support: what to build next, how to package it, why adoption stalls. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Product and roadmap",
          "frame": "What to build next, and what to leave out.",
          "cards": [
            {
              "title": "Feature prioritisation",
              "body": "Establish which features would change a buying or usage decision, before they enter the roadmap.",
              "methods": "Concept tests · B2B sample"
            },
            {
              "title": "Concept validation",
              "body": "Test a concept with the buyers and users it is aimed at, before engineering time is committed.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pricing and subscription",
          "frame": "How it is packaged, and what each tier carries.",
          "cards": [
            {
              "title": "Pricing and tiers",
              "body": "Test price points and tier boundaries against what buyers are willing to pay.",
              "methods": "Price tests · B2B sample"
            },
            {
              "title": "Packaging and usage",
              "body": "Establish whether seats, usage or features should carry the price.",
              "methods": "In-depth interviews · price tests"
            }
          ]
        },
        {
          "n": "03",
          "name": "Brand and competition",
          "frame": "Whether the product is in the shortlist, and what it is known for.",
          "cards": [
            {
              "title": "Brand and share of voice",
              "body": "Track awareness, consideration and recommendation against the platforms buyers actually compare.",
              "methods": "Online tracking · fixed measures"
            },
            {
              "title": "Competitive set",
              "body": "Map who is actually compared in a buying decision, which is rarely the list the category assumes.",
              "methods": "B2B survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "04",
          "name": "Adoption and retention",
          "frame": "Why users start, and why they stop.",
          "cards": [
            {
              "title": "Onboarding and activation",
              "body": "Study the first weeks of use, and where new users fail to reach the value.",
              "methods": "User survey · in-depth interviews"
            },
            {
              "title": "Churn and retention",
              "body": "Establish why accounts leave, and which signals precede it.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Technology buyer sample",
          "Decision-makers in IT, product and procurement, screened by role, company size and technology stack."
        ],
        [
          "Concept testing",
          "Concepts and features tested on comparable samples, with one variable changed at a time."
        ],
        [
          "Online survey",
          "Survey of users or buyers, with quotas by role, company size and market."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes with buyers or users, run one to one by the research team."
        ],
        [
          "Price tests",
          "Price points and packaging tested against willingness to pay, reported with the assumptions stated."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "科技与数字",
      "lead": "面向软件、平台、互联网与设备厂商：路线图放什么、如何定价与打包、用户为何流失。",
      "introKicker": "我们如何做",
      "intro": [
        "科技产品在发布之前就已经被决定：哪些功能进路线图、哪一档承载价格、头几周的使用要证明什么。",
        "我们把买家和用户分开研究：签字的技术决策者，和必须每天用它的人，以及两者判断不一致的地方。",
        "每项研究都围绕它要支撑的决定来设计：下一步做什么、怎么打包、采用为什么卡住。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "产品与路线图",
          "frame": "下一步做什么，以及不做什么。",
          "cards": [
            {
              "title": "功能优先级",
              "body": "在功能进入路线图之前，弄清哪些会真正改变购买或使用决定。",
              "methods": "概念测试 · 企业买家样本"
            },
            {
              "title": "概念验证",
              "body": "在投入工程资源之前，把概念拿给目标买家与用户测试。",
              "methods": "概念与 A/B 测试"
            }
          ]
        },
        {
          "n": "02",
          "name": "定价与订阅",
          "frame": "如何打包，每一档承载什么。",
          "cards": [
            {
              "title": "定价与档位",
              "body": "以买家的实际支付意愿为基准，测试价格点与档位边界。",
              "methods": "价格测试 · 企业买家样本"
            },
            {
              "title": "打包与用量",
              "body": "确定价格由席位、用量还是功能承载。",
              "methods": "深度访谈 · 价格测试"
            }
          ]
        },
        {
          "n": "03",
          "name": "品牌与竞争",
          "frame": "是否进入备选，以什么形象被记住。",
          "cards": [
            {
              "title": "品牌与声量",
              "body": "追踪认知、考虑与推荐，对标的是买家真正会比较的那些平台。",
              "methods": "在线追踪 · 指标固定"
            },
            {
              "title": "竞争集合",
              "body": "确定一次采购中真正被比较的是哪些产品，这通常不同于品类预设的竞争名单。",
              "methods": "企业问卷 · 深度访谈"
            }
          ]
        },
        {
          "n": "04",
          "name": "采用与留存",
          "frame": "用户为何开始使用，又为何停止。",
          "cards": [
            {
              "title": "上手与激活",
              "body": "研究使用初期的几周，以及新用户在哪个环节未能获得实际价值。",
              "methods": "用户问卷 · 深度访谈"
            },
            {
              "title": "流失与留存",
              "body": "确定客户为何终止使用，以及终止之前出现哪些信号。",
              "methods": "追踪 · 电话访问"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "技术买家样本",
          "按职位、公司规模与技术栈筛选的 IT、产品与采购决策者。"
        ],
        [
          "概念测试",
          "把概念与功能放在可比样本上测试，每次只改变一个变量。"
        ],
        [
          "线上问卷",
          "面向用户或买家的问卷，配额按职位、公司规模与市场设定。"
        ],
        [
          "深度访谈",
          "由研究人员一对一进行 45–60 分钟的买家或用户访谈。"
        ],
        [
          "价格测试",
          "用支付意愿测试价格点与打包方式，结果连同假设一并呈现。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "科技與數位",
      "lead": "面向軟體、平台、網際網路與設備廠商：路線圖放什麼、如何定價與打包、用戶為何流失。",
      "introKicker": "我們如何做",
      "intro": [
        "科技產品在發布之前就已經被決定：哪些功能進路線圖、哪一檔承載價格、頭幾週的使用要證明什麼。",
        "我們把買家和用戶分開研究：簽字的技術決策者，和必須每天用它的人，以及兩者判斷不一致的地方。",
        "每項研究都圍繞它要支撐的決定來設計：下一步做什麼、怎麼打包、採用為什麼卡住。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "產品與路線圖",
          "frame": "下一步做什麼，以及不做什麼。",
          "cards": [
            {
              "title": "功能優先級",
              "body": "在功能進入路線圖之前，弄清哪些會真正改變購買或使用決定。",
              "methods": "概念測試 · 企業買家樣本"
            },
            {
              "title": "概念驗證",
              "body": "在投入工程資源之前，把概念拿給它的目標買家與用戶測試。",
              "methods": "概念與 A/B 測試"
            }
          ]
        },
        {
          "n": "02",
          "name": "定價與訂閱",
          "frame": "如何打包，每一檔承載什麼。",
          "cards": [
            {
              "title": "定價與檔位",
              "body": "以買家的實際支付意願為基準，測試價格點與檔位邊界。",
              "methods": "價格測試 · 企業買家樣本"
            },
            {
              "title": "打包與用量",
              "body": "確定價格由席位、用量還是功能承載。",
              "methods": "深度訪談 · 價格測試"
            }
          ]
        },
        {
          "n": "03",
          "name": "品牌與競爭",
          "frame": "是否進入備選，以什麼形象被記住。",
          "cards": [
            {
              "title": "品牌與聲量",
              "body": "追蹤認知、考慮與推薦，對標的是買家真正會比較的那些平台。",
              "methods": "線上追蹤 · 指標固定"
            },
            {
              "title": "競爭集合",
              "body": "確定一次採購中真正被比較的是哪些產品，這通常不同於品類預設的競爭名單。",
              "methods": "企業問卷 · 深度訪談"
            }
          ]
        },
        {
          "n": "04",
          "name": "採用與留存",
          "frame": "用戶為何開始使用，又為何停止。",
          "cards": [
            {
              "title": "上手與啟用",
              "body": "研究使用初期的幾週，以及新用戶在哪個環節未能獲得實際價值。",
              "methods": "用戶問卷 · 深度訪談"
            },
            {
              "title": "流失與留存",
              "body": "確定客戶為何終止使用，以及終止之前出現哪些訊號。",
              "methods": "追蹤 · 電話訪問"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "技術買家樣本",
          "按職位、公司規模與技術棧篩選的 IT、產品與採購決策者。"
        ],
        [
          "概念測試",
          "把概念與功能放在可比樣本上測試，每次只改變一個變數。"
        ],
        [
          "線上問卷",
          "面向用戶或買家的問卷，配額按職位、公司規模與市場設定。"
        ],
        [
          "深度訪談",
          "由研究人員一對一進行 45–60 分鐘的買家或用戶訪談。"
        ],
        [
          "價格測試",
          "用支付意願測試價格點與打包方式，結果連同假設一併呈現。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Technology & digital",
      "lead": "Research for software, platform, internet and device companies: what the roadmap should hold, how it should be priced, and why users leave.",
      "introKicker": "How we work",
      "intro": [
        "A technology product is decided before it ships: which features make the roadmap, which tier carries the price, and what the first weeks of use have to prove.",
        "We study buyers and users separately — the technical decision-maker who signs, and the person who has to use it — and the point where the two disagree.",
        "Each study is designed around the decision it has to support: what to build next, how to package it, why adoption stalls. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Product and roadmap",
          "frame": "What to build next, and what to leave out.",
          "cards": [
            {
              "title": "Feature prioritisation",
              "body": "Establish which features would change a buying or usage decision, before they enter the roadmap.",
              "methods": "Concept tests · B2B sample"
            },
            {
              "title": "Concept validation",
              "body": "Test a concept with the buyers and users it is aimed at, before engineering time is committed.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "02",
          "name": "Pricing and subscription",
          "frame": "How it is packaged, and what each tier carries.",
          "cards": [
            {
              "title": "Pricing and tiers",
              "body": "Test price points and tier boundaries against what buyers are willing to pay.",
              "methods": "Price tests · B2B sample"
            },
            {
              "title": "Packaging and usage",
              "body": "Establish whether seats, usage or features should carry the price.",
              "methods": "In-depth interviews · price tests"
            }
          ]
        },
        {
          "n": "03",
          "name": "Brand and competition",
          "frame": "Whether the product is in the shortlist, and what it is known for.",
          "cards": [
            {
              "title": "Brand and share of voice",
              "body": "Track awareness, consideration and recommendation against the platforms buyers actually compare.",
              "methods": "Online tracking · fixed measures"
            },
            {
              "title": "Competitive set",
              "body": "Map who is actually compared in a buying decision, which is rarely the list the category assumes.",
              "methods": "B2B survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "04",
          "name": "Adoption and retention",
          "frame": "Why users start, and why they stop.",
          "cards": [
            {
              "title": "Onboarding and activation",
              "body": "Study the first weeks of use, and where new users fail to reach the value.",
              "methods": "User survey · in-depth interviews"
            },
            {
              "title": "Churn and retention",
              "body": "Establish why accounts leave, and which signals precede it.",
              "methods": "Tracking · CATI"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Technology buyer sample",
          "Decision-makers in IT, product and procurement, screened by role, company size and technology stack."
        ],
        [
          "Concept testing",
          "Concepts and features tested on comparable samples, with one variable changed at a time."
        ],
        [
          "Online survey",
          "Survey of users or buyers, with quotas by role, company size and market."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes with buyers or users, run one to one by the research team."
        ],
        [
          "Price tests",
          "Price points and packaging tested against willingness to pay, reported with the assumptions stated."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    }
  },
  "media": {
    "en-US": {
      "kicker": "Industries",
      "title": "Media & entertainment",
      "lead": "Research for broadcasters, platforms, publishers and game studios: who the audience is, what they will watch or play, and what keeps them paying.",
      "introKicker": "How we work",
      "intro": [
        "Media is bought on attention and judged on retention: a title has one launch window, and the audience decides inside it.",
        "We study both sides of that trade: the audience that chooses what to watch or play, and the advertisers who need to know what their spend sits beside.",
        "Each study is designed around the decision it has to support: which title to commission, how to position a launch, whether the ad environment is safe, and why subscribers leave. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Audience and content",
          "frame": "Who is watching or playing, and what they choose.",
          "cards": [
            {
              "title": "Audience and content preference",
              "body": "Segment the audience by platform, genre and viewing or play behaviour, and test which content they would choose.",
              "methods": "Online survey · CATI"
            },
            {
              "title": "Content concept testing",
              "body": "Test titles, formats and trailers with the audience before the launch window.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "02",
          "name": "Launch and scheduling",
          "frame": "Whether it lands inside the first window.",
          "cards": [
            {
              "title": "Pre-launch testing",
              "body": "Test positioning and the cut before release, and record what the audience understood from it.",
              "methods": "Concept testing · in-depth interviews"
            },
            {
              "title": "Platform and window",
              "body": "Establish where the audience expects to find the title, and what they will pay for early access.",
              "methods": "Online survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Brand and advertising",
          "frame": "Which content the advertising runs in, and what that does to the brand.",
          "cards": [
            {
              "title": "Brand safety",
              "body": "Test how advertising is judged in different content environments, and what damages trust in the brand.",
              "methods": "Advertiser survey · message testing"
            },
            {
              "title": "Advertising effectiveness",
              "body": "Measure recall and purchase intent against the content the advertising ran in.",
              "methods": "Online survey · ad testing"
            }
          ]
        },
        {
          "n": "04",
          "name": "Subscription and retention",
          "frame": "Why subscribers stay, and why they cancel.",
          "cards": [
            {
              "title": "Subscription and churn",
              "body": "Track subscriber behaviour and the reasons for cancellation.",
              "methods": "Tracking · online survey"
            },
            {
              "title": "Brand health",
              "body": "Track awareness, consideration and recommendation against the platforms actually compared.",
              "methods": "Tracking · fixed measures"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Audience survey",
          "Survey of viewers or players, with quotas by platform, genre and market."
        ],
        [
          "Content and ad testing",
          "Titles, trailers and creative tested on comparable samples, with one variable changed at a time."
        ],
        [
          "Advertiser survey",
          "Survey of marketing and media decision-makers, screened by spend and category."
        ],
        [
          "Brand tracking",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes, run one to one by the research team."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "媒体与娱乐",
      "lead": "面向电视台与流媒体、平台、出版机构与游戏工作室：受众是谁、他们会选择什么内容、又为何持续付费。",
      "introKicker": "我们如何做",
      "intro": [
        "媒体生意买的是注意力，最终看的是留存：一部作品只有一个上线档期，受众的决定就在那段时间里完成。",
        "我们把交易的两端分开研究：一端是选择内容的受众，另一端是需要判断广告环境是否安全的广告主。",
        "每项研究都围绕它要支撑的决定来设计：立项哪部作品、上线如何定位、广告环境是否安全、订阅用户为何离开。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "受众与内容",
          "frame": "受众是谁，他们会选择哪类内容。",
          "cards": [
            {
              "title": "受众与内容偏好",
              "body": "按平台、类型与观看或游玩行为划分受众，并测试他们会选择哪类内容。",
              "methods": "线上问卷 · 电话访问"
            },
            {
              "title": "内容概念测试",
              "body": "在上线之前，用受众测试片名、形式与预告片。",
              "methods": "概念与 A/B 测试"
            }
          ]
        },
        {
          "n": "02",
          "name": "内容测试与发布",
          "frame": "上线之前，内容与定位是否成立。",
          "cards": [
            {
              "title": "发布前测试",
              "body": "在发布之前测试定位与成片剪辑，并记录受众从中理解到了什么。",
              "methods": "概念测试 · 深度访谈"
            },
            {
              "title": "平台与窗口",
              "body": "确定受众预期在哪里看到这部作品，以及愿意为提前观看付多少。",
              "methods": "线上问卷 · 深度访谈"
            }
          ]
        },
        {
          "n": "03",
          "name": "品牌与广告",
          "frame": "广告所处的媒介环境是否安全、是否有效。",
          "cards": [
            {
              "title": "品牌安全",
              "body": "测试广告在不同内容环境中的评价，以及哪些环境会损害品牌信任。",
              "methods": "广告主问卷 · 信息测试"
            },
            {
              "title": "广告效果",
              "body": "对照广告所投放的内容，测量记忆度与购买意向。",
              "methods": "线上问卷 · 广告测试"
            }
          ]
        },
        {
          "n": "04",
          "name": "订阅与留存",
          "frame": "订阅用户为何留存，又为何流失。",
          "cards": [
            {
              "title": "订阅与流失",
              "body": "追踪订阅行为，以及用户取消的原因。",
              "methods": "追踪 · 线上问卷"
            },
            {
              "title": "品牌健康",
              "body": "追踪认知、考虑与推荐，对标的是受众真正会比较的那些平台。",
              "methods": "追踪 · 指标固定"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "受众问卷",
          "面向观众或玩家的问卷，配额按平台、类型与市场设定。"
        ],
        [
          "内容与广告测试",
          "把片名、预告与创意放在可比样本上测试，每次只改变一个变量。"
        ],
        [
          "广告主问卷",
          "面向营销与媒介决策者的问卷，按预算规模与品类筛选。"
        ],
        [
          "品牌追踪",
          "按月或按季的追踪，指标固定，变化可对照同一套基数来读。"
        ],
        [
          "深度访谈",
          "由研究人员一对一进行 45–60 分钟的深度访谈。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "媒體與娛樂",
      "lead": "面向電視台與串流、平台、出版機構與遊戲工作室：受眾是誰、他們會選擇什麼內容、又為何持續付費。",
      "introKicker": "我們如何做",
      "intro": [
        "媒體生意買的是注意力，最終看的是留存：一部作品只有一個上線檔期，受眾的決定就在那段時間裡完成。",
        "我們把交易的兩端分開研究：一端是選擇內容的受眾，另一端是需要判斷廣告環境是否安全的廣告主。",
        "每項研究都圍繞它要支撐的決定來設計：立項哪部作品、上線如何定位、廣告環境是否安全、訂閱用戶為何離開。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "受眾與內容",
          "frame": "受眾是誰，他們會選擇哪類內容。",
          "cards": [
            {
              "title": "受眾與內容偏好",
              "body": "按平台、類型與觀看或遊玩行為劃分受眾，並測試他們會選擇哪類內容。",
              "methods": "線上問卷 · 電話訪問"
            },
            {
              "title": "內容概念測試",
              "body": "在上線之前，用受眾測試片名、形式與預告片。",
              "methods": "概念與 A/B 測試"
            }
          ]
        },
        {
          "n": "02",
          "name": "內容測試與發佈",
          "frame": "上線之前，內容與定位是否成立。",
          "cards": [
            {
              "title": "發佈前測試",
              "body": "在發佈之前測試定位與成片剪輯，並記錄受眾從中理解到了什麼。",
              "methods": "概念測試 · 深度訪談"
            },
            {
              "title": "平台與窗口",
              "body": "確定受眾預期在哪裡看到這部作品，以及願意為提前觀看付多少。",
              "methods": "線上問卷 · 深度訪談"
            }
          ]
        },
        {
          "n": "03",
          "name": "品牌與廣告",
          "frame": "廣告所處的媒介環境是否安全、是否有效。",
          "cards": [
            {
              "title": "品牌安全",
              "body": "測試廣告在不同內容環境中的評價，以及哪些環境會損害品牌信任。",
              "methods": "廣告主問卷 · 訊息測試"
            },
            {
              "title": "廣告效果",
              "body": "對照廣告所投放的內容，測量記憶度與購買意願。",
              "methods": "線上問卷 · 廣告測試"
            }
          ]
        },
        {
          "n": "04",
          "name": "訂閱與留存",
          "frame": "訂閱用戶為何留存，又為何流失。",
          "cards": [
            {
              "title": "訂閱與流失",
              "body": "追蹤訂閱行為，以及用戶取消的原因。",
              "methods": "追蹤 · 線上問卷"
            },
            {
              "title": "品牌健康",
              "body": "追蹤認知、考慮與推薦，對標的是受眾真正會比較的那些平台。",
              "methods": "追蹤 · 指標固定"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "受眾問卷",
          "面向觀眾或玩家的問卷，配額按平台、類型與市場設定。"
        ],
        [
          "內容與廣告測試",
          "把片名、預告與創意放在可比樣本上測試，每次只改變一個變數。"
        ],
        [
          "廣告主問卷",
          "面向行銷與媒介決策者的問卷，按預算規模與品類篩選。"
        ],
        [
          "品牌追蹤",
          "按月或按季的追蹤，指標固定，變化可對照同一套基數來讀。"
        ],
        [
          "深度訪談",
          "由研究人員一對一進行 45–60 分鐘的深度訪談。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "Media & entertainment",
      "lead": "Research for broadcasters, platforms, publishers and game studios: who the audience is, what they will watch or play, and what keeps them paying.",
      "introKicker": "How we work",
      "intro": [
        "Media is bought on attention and judged on retention: a title has one launch window, and the audience decides inside it.",
        "We study both sides of that trade: the audience that chooses what to watch or play, and the advertisers who need to know what their spend sits beside.",
        "Each study is designed around the decision it has to support: which title to commission, how to position a launch, whether the ad environment is safe, and why subscribers leave. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Audience and content",
          "frame": "Who is watching or playing, and what they choose.",
          "cards": [
            {
              "title": "Audience and content preference",
              "body": "Segment the audience by platform, genre and viewing or play behaviour, and test which content they would choose.",
              "methods": "Online survey · CATI"
            },
            {
              "title": "Content concept testing",
              "body": "Test titles, formats and trailers with the audience before the launch window.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "02",
          "name": "Launch and scheduling",
          "frame": "Whether it lands inside the first window.",
          "cards": [
            {
              "title": "Pre-launch testing",
              "body": "Test positioning and the cut before release, and record what the audience understood from it.",
              "methods": "Concept testing · in-depth interviews"
            },
            {
              "title": "Platform and window",
              "body": "Establish where the audience expects to find the title, and what they will pay for early access.",
              "methods": "Online survey · in-depth interviews"
            }
          ]
        },
        {
          "n": "03",
          "name": "Brand and advertising",
          "frame": "Which content the advertising runs in, and what that does to the brand.",
          "cards": [
            {
              "title": "Brand safety",
              "body": "Test how advertising is judged in different content environments, and what damages trust in the brand.",
              "methods": "Advertiser survey · message testing"
            },
            {
              "title": "Advertising effectiveness",
              "body": "Measure recall and purchase intent against the content the advertising ran in.",
              "methods": "Online survey · ad testing"
            }
          ]
        },
        {
          "n": "04",
          "name": "Subscription and retention",
          "frame": "Why subscribers stay, and why they cancel.",
          "cards": [
            {
              "title": "Subscription and churn",
              "body": "Track subscriber behaviour and the reasons for cancellation.",
              "methods": "Tracking · online survey"
            },
            {
              "title": "Brand health",
              "body": "Track awareness, consideration and recommendation against the platforms actually compared.",
              "methods": "Tracking · fixed measures"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Audience survey",
          "Survey of viewers or players, with quotas by platform, genre and market."
        ],
        [
          "Content and ad testing",
          "Titles, trailers and creative tested on comparable samples, with one variable changed at a time."
        ],
        [
          "Advertiser survey",
          "Survey of marketing and media decision-makers, screened by spend and category."
        ],
        [
          "Brand tracking",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes, run one to one by the research team."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    }
  },
  "ecommerce": {
    "en-US": {
      "kicker": "Industries",
      "title": "E-commerce & shopper",
      "lead": "Research for marketplaces, brands and retailers selling online: where the shopper finds the product, what is in the basket, and why they come back to one platform.",
      "introKicker": "How we work",
      "intro": [
        "Online, the shelf is a search result, and the shopper compares more listings in less time than any store allows.",
        "We study the path as it happens: how a product is found, what the listing communicates, what enters the basket, and where the purchase stops.",
        "Each study is designed around the decision it has to support: which platform to prioritise, how to price against the listing beside it, and what makes a shopper return. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Platform and category",
          "frame": "Where the category is bought, and against what.",
          "cards": [
            {
              "title": "Platform choice",
              "body": "Establish where the category is bought, and how platform choice shifts by market and by buyer.",
              "methods": "Shopper tracker · online survey"
            },
            {
              "title": "Category and price",
              "body": "Test price tiers and pack sizes against the listings they appear beside.",
              "methods": "Online survey · price tests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Discovery and listing",
          "frame": "How the product is found, and what the listing says.",
          "cards": [
            {
              "title": "Search and discovery",
              "body": "Study how shoppers find the product — search, listing order, recommendation — and what they pass over.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Listing and imagery",
              "body": "Test product pages, images and reviews for what they communicate before the click.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "03",
          "name": "Basket and checkout",
          "frame": "What goes in, and where the purchase stops.",
          "cards": [
            {
              "title": "Basket and abandonment",
              "body": "Measure what enters the basket, what is abandoned, and at which step.",
              "methods": "Shopper tracker · online survey"
            },
            {
              "title": "Delivery and returns",
              "body": "Establish what delivery cost, timing and returns policy do to completion.",
              "methods": "Online survey · A/B testing"
            }
          ]
        },
        {
          "n": "04",
          "name": "Repeat and loyalty",
          "frame": "Why the shopper returns to one platform.",
          "cards": [
            {
              "title": "Repeat purchase",
              "body": "Track repeat purchase and the reasons a shopper returns to the same platform.",
              "methods": "Tracker · CATI"
            },
            {
              "title": "Promotions and membership",
              "body": "Test how promotions and membership change basket size and purchase frequency.",
              "methods": "Tracker · online survey"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Shopper tracker",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ],
        [
          "Online survey",
          "Survey of online shoppers, with quotas by platform, category and market."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes with shoppers, run one to one by the research team."
        ],
        [
          "Concept and A/B testing",
          "Listings, images and checkout steps tested on comparable samples, one variable at a time."
        ],
        [
          "Price tests",
          "Price points and delivery thresholds tested against willingness to pay."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    },
    "zh-CN": {
      "kicker": "行业",
      "title": "电商与购物者",
      "lead": "面向平台、品牌与线上零售商：购物者如何找到商品、篮子里放了什么、又为何回到同一个平台。",
      "introKicker": "我们如何做",
      "intro": [
        "线上没有货架，只有搜索结果：购物者在更短的时间里，比较比任何一家门店都多的商品。",
        "我们按路径的顺序研究：商品如何被发现、页面传达了什么、什么进了篮子、又在哪里停止下单。",
        "每项研究都围绕它要支撑的决定来设计：该优先哪个平台、如何对着旁边的商品定价、什么让购物者回头。设计、样本与报告由这个问题决定。"
      ],
      "stagesKicker": "我们研究什么",
      "stages": [
        {
          "n": "01",
          "name": "平台与品类",
          "frame": "这个品类在哪里买，与哪些商品并列展示。",
          "cards": [
            {
              "title": "平台选择",
              "body": "确定品类在哪些平台成交，以及平台选择如何随市场与买家变化。",
              "methods": "购物者追踪 · 线上问卷"
            },
            {
              "title": "品类与价格",
              "body": "对照与它并排展示的商品，测试价格带与规格。",
              "methods": "线上问卷 · 价格测试"
            }
          ]
        },
        {
          "n": "02",
          "name": "发现与页面",
          "frame": "商品如何被找到，页面说了什么。",
          "cards": [
            {
              "title": "搜索与发现",
              "body": "研究购物者如何找到商品——搜索、排序、推荐——以及他们忽视了哪些信息。",
              "methods": "线上问卷 · 深度访谈"
            },
            {
              "title": "页面与图片",
              "body": "测试商品页、图片与评价在点击之前传达了哪些信息。",
              "methods": "概念与 A/B 测试"
            }
          ]
        },
        {
          "n": "03",
          "name": "购物篮与结算",
          "frame": "什么进了篮子，下单在哪个环节中断。",
          "cards": [
            {
              "title": "购物篮与放弃",
              "body": "测量什么进入购物篮、什么被放弃，以及发生在哪一步。",
              "methods": "购物者追踪 · 线上问卷"
            },
            {
              "title": "配送与退货",
              "body": "确定运费、时效与退货政策对完成下单的影响。",
              "methods": "线上问卷 · A/B 测试"
            }
          ]
        },
        {
          "n": "04",
          "name": "复购与忠诚",
          "frame": "购物者为何回到同一个平台。",
          "cards": [
            {
              "title": "复购行为",
              "body": "追踪复购，以及购物者回到同一平台的原因。",
              "methods": "追踪 · 电话访问"
            },
            {
              "title": "促销与会员",
              "body": "测试促销与会员机制如何改变篮子大小与购买频次。",
              "methods": "追踪 · 线上问卷"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每种方法是什么，什么情况下用它。",
      "methods": [
        [
          "购物者追踪",
          "按月或按季的追踪，指标固定，变化可对照同一套基数来读。"
        ],
        [
          "线上问卷",
          "面向线上购物者的问卷，配额按平台、品类与市场设定。"
        ],
        [
          "深度访谈",
          "由研究人员一对一进行 45–60 分钟的购物者访谈。"
        ],
        [
          "概念与 A/B 测试",
          "把商品页、图片与结算步骤放在可比样本上测试，每次只改变一个变量。"
        ],
        [
          "价格测试",
          "用支付意愿测试价格点与免邮门槛。"
        ]
      ],
      "ctaTitle": "告诉我们，这项研究要支撑的那个决定。",
      "ctaBody": "你会拿到结论、支撑结论的证据，以及建议的下一步。",
      "ctaPrimary": "联系研究团队",
      "ctaSecondary": "加入我们"
    },
    "zh-Hant": {
      "kicker": "產業",
      "title": "電商與購物者",
      "lead": "面向平台、品牌與線上零售商：購物者如何找到商品、籃子裡放了什麼、又為何回到同一個平台。",
      "introKicker": "我們如何做",
      "intro": [
        "線上沒有貨架，只有搜尋結果：購物者在更短的時間裡，比較比任何一家門店都多的商品。",
        "我們按路徑的順序研究：商品如何被發現、頁面傳達了什麼、什麼進了籃子、又在哪裡停止下單。",
        "每項研究都圍繞它要支撐的決定來設計：該優先哪個平台、如何對著旁邊的商品定價、什麼讓購物者回頭。設計、樣本與報告由這個問題決定。"
      ],
      "stagesKicker": "我們研究什麼",
      "stages": [
        {
          "n": "01",
          "name": "平台與品類",
          "frame": "這個品類在哪裡買，與哪些商品並列展示。",
          "cards": [
            {
              "title": "平台選擇",
              "body": "確定品類在哪些平台成交，以及平台選擇如何隨市場與買家變化。",
              "methods": "購物者追蹤 · 線上問卷"
            },
            {
              "title": "品類與價格",
              "body": "對照與它並排展示的商品，測試價格帶與規格。",
              "methods": "線上問卷 · 價格測試"
            }
          ]
        },
        {
          "n": "02",
          "name": "發現與頁面",
          "frame": "商品如何被找到，頁面說了什麼。",
          "cards": [
            {
              "title": "搜尋與發現",
              "body": "研究購物者如何找到商品——搜尋、排序、推薦——以及他們略過了什麼。",
              "methods": "線上問卷 · 深度訪談"
            },
            {
              "title": "頁面與圖片",
              "body": "測試商品頁、圖片與評價在點擊之前傳達了哪些訊息。",
              "methods": "概念與 A/B 測試"
            }
          ]
        },
        {
          "n": "03",
          "name": "購物籃與結帳",
          "frame": "什麼進了籃子，下單在哪個環節中斷。",
          "cards": [
            {
              "title": "購物籃與放棄",
              "body": "測量什麼進入購物籃、什麼被放棄，以及發生在哪一步。",
              "methods": "購物者追蹤 · 線上問卷"
            },
            {
              "title": "配送與退貨",
              "body": "確定運費、時效與退貨政策對完成下單的影響。",
              "methods": "線上問卷 · A/B 測試"
            }
          ]
        },
        {
          "n": "04",
          "name": "複購與忠誠",
          "frame": "購物者為何回到同一個平台。",
          "cards": [
            {
              "title": "複購行為",
              "body": "追蹤複購，以及購物者回到同一平台的原因。",
              "methods": "追蹤 · 電話訪問"
            },
            {
              "title": "促銷與會員",
              "body": "測試促銷與會員機制如何改變籃子大小與購買頻次。",
              "methods": "追蹤 · 線上問卷"
            }
          ]
        }
      ],
      "methodsKicker": "方法",
      "methodsLead": "每種方法是什麼，什麼情況下用它。",
      "methods": [
        [
          "購物者追蹤",
          "按月或按季的追蹤，指標固定，變化可對照同一套基數來讀。"
        ],
        [
          "線上問卷",
          "面向線上購物者的問卷，配額按平台、品類與市場設定。"
        ],
        [
          "深度訪談",
          "由研究人員一對一進行 45–60 分鐘的購物者訪談。"
        ],
        [
          "概念與 A/B 測試",
          "把商品頁、圖片與結帳步驟放在可比樣本上測試，每次只改變一個變數。"
        ],
        [
          "價格測試",
          "用支付意願測試價格點與免運門檻。"
        ]
      ],
      "ctaTitle": "告訴我們，這項研究要支撐的那個決定。",
      "ctaBody": "你會拿到結論、支撐結論的證據，以及建議的下一步。",
      "ctaPrimary": "聯絡研究團隊",
      "ctaSecondary": "加入我們"
    },
    "en-GB": {
      "kicker": "Industries",
      "title": "E-commerce & shopper",
      "lead": "Research for marketplaces, brands and retailers selling online: where the shopper finds the product, what is in the basket, and why they come back to one platform.",
      "introKicker": "How we work",
      "intro": [
        "Online, the shelf is a search result, and the shopper compares more listings in less time than any store allows.",
        "We study the path as it happens: how a product is found, what the listing communicates, what enters the basket, and where the purchase stops.",
        "Each study is designed around the decision it has to support: which platform to prioritise, how to price against the listing beside it, and what makes a shopper return. Design, sample and reporting follow from that question."
      ],
      "stagesKicker": "What we study",
      "stages": [
        {
          "n": "01",
          "name": "Platform and category",
          "frame": "Where the category is bought, and against what.",
          "cards": [
            {
              "title": "Platform choice",
              "body": "Establish where the category is bought, and how platform choice shifts by market and by buyer.",
              "methods": "Shopper tracker · online survey"
            },
            {
              "title": "Category and price",
              "body": "Test price tiers and pack sizes against the listings they appear beside.",
              "methods": "Online survey · price tests"
            }
          ]
        },
        {
          "n": "02",
          "name": "Discovery and listing",
          "frame": "How the product is found, and what the listing says.",
          "cards": [
            {
              "title": "Search and discovery",
              "body": "Study how shoppers find the product — search, listing order, recommendation — and what they pass over.",
              "methods": "Online survey · in-depth interviews"
            },
            {
              "title": "Listing and imagery",
              "body": "Test product pages, images and reviews for what they communicate before the click.",
              "methods": "Concept and A/B testing"
            }
          ]
        },
        {
          "n": "03",
          "name": "Basket and checkout",
          "frame": "What goes in, and where the purchase stops.",
          "cards": [
            {
              "title": "Basket and abandonment",
              "body": "Measure what enters the basket, what is abandoned, and at which step.",
              "methods": "Shopper tracker · online survey"
            },
            {
              "title": "Delivery and returns",
              "body": "Establish what delivery cost, timing and returns policy do to completion.",
              "methods": "Online survey · A/B testing"
            }
          ]
        },
        {
          "n": "04",
          "name": "Repeat and loyalty",
          "frame": "Why the shopper returns to one platform.",
          "cards": [
            {
              "title": "Repeat purchase",
              "body": "Track repeat purchase and the reasons a shopper returns to the same platform.",
              "methods": "Tracker · CATI"
            },
            {
              "title": "Promotions and membership",
              "body": "Test how promotions and membership change basket size and purchase frequency.",
              "methods": "Tracker · online survey"
            }
          ]
        }
      ],
      "methodsKicker": "Methods",
      "methodsLead": "What each method is, and when we use it.",
      "methods": [
        [
          "Shopper tracker",
          "Monthly or quarterly tracking on fixed measures, so movement can be read against the same base."
        ],
        [
          "Online survey",
          "Survey of online shoppers, with quotas by platform, category and market."
        ],
        [
          "In-depth interviews",
          "Depth interviews of 45 to 60 minutes with shoppers, run one to one by the research team."
        ],
        [
          "Concept and A/B testing",
          "Listings, images and checkout steps tested on comparable samples, one variable at a time."
        ],
        [
          "Price tests",
          "Price points and delivery thresholds tested against willingness to pay."
        ]
      ],
      "ctaTitle": "Tell us the decision this research has to support.",
      "ctaBody": "You receive the findings, the evidence behind them, and the recommended next step.",
      "ctaPrimary": "Talk to the research team",
      "ctaSecondary": "Join us"
    }
  }
};
