/* Public page copy — entered into the language library 2026-10-25.

   These used to live as `const copy = {...}` inside each page file. The pages
   now read them through `useLanguage().publicCopy.pages`, so one library holds
   the copy, the language switch and the fallback:

     pages.about                  /about
     pages.access                 /access (the homepage chooser, mounted as a page)
     pages.industries.<slug>      the ten industry pages

   en-US is the source language for the industry pages; zh-CN / zh-Hant are
   maintained alongside it, and every other language falls back to English.
   Edit copy here, not in the page components. */

export const aboutCopy = {
  'en-US': {
    eyebrow: 'About us',
    theme: 'Your opinions shape the world.',
    whoEyebrow: 'Who we are',
    humanEyebrow: 'Human first',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
    storyTitle: 'Rooted in China, connected to the world.',
    points: [
      { num: '01', title: 'A Chinese foundation', body: 'The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples.' },
      { num: '02', title: 'Regional partners', body: 'Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it.' },
      { num: '03', title: 'Always extending', body: 'As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view.' },
    ],
  },
  'en-GB': {
    eyebrow: 'About us',
    theme: 'Your opinions shape the world.',
    whoEyebrow: 'Who we are',
    humanEyebrow: 'Human first',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
    storyTitle: 'Rooted in China, connected to the world.',
    points: [
      { num: '01', title: 'A Chinese foundation', body: 'The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples.' },
      { num: '02', title: 'Regional partners', body: 'Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it.' },
      { num: '03', title: 'Always extending', body: 'As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view.' },
    ],
  },
  'zh-CN': {
    eyebrow: '关于我们',
    theme: '你的观点影响世界。',
    whoEyebrow: '我们是谁',
    humanEyebrow: '以人为本',
    body: '我们是一家跨区域的信息洞察研究公司，致力于打造开放、共生、可持续的生态社区。我们连接参与者、研究发起人与组织，围绕商业、文化、日常生活与公共议题，让真实的声音转化为清晰的判断——为更好的决策，也为更好的世界。',
    storyTitle: '立足中国，连接世界',
    points: [
      { num: '01', title: '中国根基', body: '团队长期专注市场研究，在中国建立了稳定的社区与调研网络，能够触达真实、可验证的样本。' },
      { num: '02', title: '区域伙伴', body: '在大中华区、亚太、中东、欧洲与北美，我们与当地研究伙伴长期协作，让每个市场都由熟悉当地的人执行。' },
      { num: '03', title: '持续拓展', body: '根据研究需要，我们持续拓展主要市场的伙伴与参与者覆盖；从一个具体的地方出发，连接更广的研究视野。' },
    ],
  },
  'zh-Hant': {
    eyebrow: '關於我們',
    theme: '你的觀點影響世界。',
    whoEyebrow: '我們是誰',
    humanEyebrow: '以人為本',
    body: '我們是一家跨區域的資訊洞察研究公司，致力於打造開放、共生、可持續的生態社區。我們連結參與者、研究發起人與組織，圍繞商業、文化、日常生活與公共議題，讓真實的聲音轉化為清晰的判斷——為更好的決策，也為更好的世界。',
    storyTitle: '立足中國，連接世界',
    points: [
      { num: '01', title: '中國根基', body: '團隊長期專注市場研究，在中國建立了穩定的社區與調研網絡，能夠觸達真實、可驗證的樣本。' },
      { num: '02', title: '區域伙伴', body: '在大中華區、亞太、中東、歐洲與北美，我們與當地研究伙伴長期協作，讓每個市場都由熟悉當地的人執行。' },
      { num: '03', title: '持續拓展', body: '根據研究需要，我們持續拓展主要市場的伙伴與參與者覆蓋；從一個具體的地方出發，連接更廣的研究視野。' },
    ],
  },
  'de': {
    humanBody: "Wir glauben, dass echte Menschen immer der Ausgangspunkt jeder Forschung sind. KI kann endlose Inhalte erzeugen, die echt wirken. Doch sie kann niemals einen bestimmten Menschen in einem bestimmten Moment nachbilden, der sagt, was er wirklich denkt. Hinter jedem Umfrageergebnis steht ein Mensch, der sich entschieden hat, eine Sichtweise zu teilen. Diese einzelnen Stimmen machen Insights vertrauenswürdig. Wir nutzen Matching und Echtzeitdaten, um Ihre Zeit zu respektieren, Ihre Wirkung zu zeigen und jede Vergütungsregel klar und fair zu halten. Menschenzentriert bedeutet nicht, Technik abzulehnen. Es bedeutet, Technik in den Dienst der Menschen zu stellen.",
    eyebrow: "Über uns",
    theme: "Ihre Meinungen prägen die Welt.",
    whoEyebrow: "Wer wir sind",
    humanEyebrow: "Der Mensch zuerst",
    body: "Wir sind ein regional übergreifendes Marktforschungs- und Insight-Unternehmen und bauen eine offene, vernetzte und nachhaltige Forschungsgemeinschaft auf. Wir verbinden Teilnehmende, Auftraggeber und Organisationen aus Wirtschaft, Kultur, Alltag und öffentlichen Fragen und übersetzen echte Stimmen in klare Urteile – für bessere Entscheidungen und eine bessere Welt.",
    storyTitle: "In China verwurzelt, weltweit vernetzt.",
    points: [
      { num: '01', title: "Chinesisches Fundament", body: "Das Team arbeitet seit Jahren in der Marktforschung und hat in China eine stabile Community und ein Forschungsnetzwerk aufgebaut, das echte, überprüfbare lokale Stichproben erreicht." },
      { num: '02', title: "Regionale Partner", body: "In Greater China, dem asiatisch-pazifischen Raum, dem Nahen Osten, Europa und Nordamerika arbeiten wir mit lokalen Forschungspartnern, sodass jeder Markt von Menschen vor Ort betreut wird." },
      { num: '03', title: "Ständige Erweiterung", body: "Je nach Studie erweitern wir die Abdeckung von Partnern und Teilnehmenden in wichtigen Märkten – ausgehend von einem konkreten Ort mit Blick auf ein weiteres Feld." },
    ],
  },
  'fr': {
    humanBody: "Nous croyons que les personnes réelles seront toujours le point de départ de la recherche. L'IA peut générer un contenu infini qui semble réel. Mais elle ne pourra jamais recréer une personne précise, à un moment précis, exprimant ce qu'elle pense vraiment. Derrière chaque résultat d'enquête se trouve une personne qui a choisi de partager un point de vue. Ces voix individuelles rendent l'insight digne de confiance. Nous utilisons le matching et des données en temps réel pour respecter votre temps, montrer votre impact et garder chaque règle de récompense claire et équitable. Être centré sur l'humain ne signifie pas rejeter la technologie. Cela signifie mettre la technologie au service des personnes.",
    eyebrow: "À propos",
    theme: "Vos opinions façonnent le monde.",
    whoEyebrow: "Qui nous sommes",
    humanEyebrow: "L'humain d'abord",
    body: "Nous sommes une entreprise d'études et d'insights à l'échelle interrégionale, qui construit une communauté de recherche ouverte, interconnectée et durable. Nous relions participants, commanditaires et organisations autour du commerce, de la culture, du quotidien et des questions publiques, en transformant des voix réelles en jugements clairs — pour de meilleures décisions et un monde meilleur.",
    storyTitle: "Ancrés en Chine, connectés au monde.",
    points: [
      { num: '01', title: "Un ancrage chinois", body: "L'équipe se consacre depuis des années aux études de marché et a bâti en Chine une communauté et un réseau de recherche stables, capables d'atteindre des échantillons locaux réels et vérifiables." },
      { num: '02', title: "Des partenaires régionaux", body: "En Grande Chine, en Asie-Pacifique, au Moyen-Orient, en Europe et en Amérique du Nord, nous travaillons avec des partenaires locaux, afin que chaque marché soit mené par des personnes qui le connaissent." },
      { num: '03', title: "Toujours en extension", body: "Selon les besoins de l'étude, nous étendons la couverture des partenaires et des participants sur les grands marchés — en partant d'un lieu précis pour rejoindre une vision plus large." },
    ],
  },
  'nl': {
    humanBody: "Wij geloven dat echte mensen altijd het startpunt van onderzoek zijn. AI kan eindeloos veel content maken die echt lijkt. Maar zij kan nooit een bepaald persoon op een bepaald moment nabootsen die zegt wat hij werkelijk vindt. Achter elk enquêteresultaat staat iemand die ervoor koos een perspectief te delen. Die afzonderlijke stemmen maken inzicht betrouwbaar. We gebruiken matching en realtime data om uw tijd te respecteren, uw impact te laten zien en elke beloningsregel helder en eerlijk te houden. Mensgericht betekent niet dat we technologie afwijzen. Het betekent dat technologie mensen dient.",
    eyebrow: "Over ons",
    theme: "Uw mening vormt de wereld.",
    whoEyebrow: "Wie we zijn",
    humanEyebrow: "De mens voorop",
    body: "Wij zijn een interregionaal insight- en onderzoeksbedrijf en bouwen aan een open, verbonden en duurzame onderzoeksgemeenschap. We verbinden deelnemers, opdrachtgevers en organisaties rond handel, cultuur, dagelijks leven en publieke vragen, en vertalen echte stemmen naar heldere oordelen — voor betere beslissingen en een betere wereld.",
    storyTitle: "Geworteld in China, verbonden met de wereld.",
    points: [
      { num: '01', title: "Een Chinese basis", body: "Het team richt zich al jaren op marktonderzoek en heeft in China een stabiele community en een onderzoeksnetwerk opgebouwd, met toegang tot echte, verifieerbare lokale steekproeven." },
      { num: '02', title: "Regionale partners", body: "In Groot-China, Azië-Pacific, het Midden-Oosten, Europa en Noord-Amerika werken we met lokale onderzoekspartners, zodat elke markt wordt uitgevoerd door mensen die die markt kennen." },
      { num: '03', title: "Altijd in uitbreiding", body: "Afhankelijk van het onderzoek breiden we de dekking van partners en deelnemers in belangrijke markten uit — vanuit een concrete plek naar een breder perspectief." },
    ],
  },
  'da': {
    humanBody: "Vi mener, at rigtige mennesker altid er udgangspunktet for research. AI kan skabe uendeligt indhold, der ser ægte ud. Men den kan aldrig genskabe et bestemt menneske i et bestemt øjeblik, der siger, hvad det virkelig mener. Bag hvert undersøgelsesresultat står et menneske, der valgte at dele et perspektiv. De enkelte stemmer gør indsigt værd at stole på. Vi bruger matching og realtidsdata til at respektere din tid, vise din effekt og holde hver belønningsregel klar og fair. Menneskecentreret betyder ikke at afvise teknologi. Det betyder at lade teknologi tjene mennesker.",
    eyebrow: "Om os",
    theme: "Dine holdninger former verden.",
    whoEyebrow: "Hvem vi er",
    humanEyebrow: "Mennesket først",
    body: "Vi er en tværregional insight- og analysevirksomhed, der opbygger et åbent, sammenkoblet og bæredygtigt forskningsfællesskab. Vi forbinder deltagere, opdragsgivere og organisationer på tværs af handel, kultur, hverdag og offentlige spørgsmål og omsætter rigtige stemmer til klare vurderinger — for bedre beslutninger og en bedre verden.",
    storyTitle: "Forankret i Kina, forbundet med verden.",
    points: [
      { num: '01', title: "Et kinesisk fundament", body: "Teamet har arbejdet med markedsanalyse i årevis og har opbygget et stabilt fællesskab og forskningsnetværk i Kina med adgang til rigtige, verificerbare lokale stikprøver." },
      { num: '02', title: "Regionale partnere", body: "I Stor-Kina, Asien-Stillehavet, Mellemøsten, Europa og Nordamerika arbejder vi med lokale forskningspartnere, så hvert marked drives af mennesker, der kender det." },
      { num: '03', title: "Altid under udvidelse", body: "Afhængigt af undersøgelsen udvider vi dækningen af partnere og deltagere på store markeder — med udgangspunkt i et konkret sted og blik for et bredere perspektiv." },
    ],
  },
  'es': {
    humanBody: "Creemos que las personas reales son siempre el punto de partida de la investigación. La IA puede generar contenido infinito que parece real. Pero nunca podrá recrear a una persona concreta, en un momento concreto, expresando lo que piensa de verdad. Detrás de cada resultado de encuesta hay una persona que decidió compartir una perspectiva. Esas voces individuales hacen que el insight merezca confianza. Usamos matching y datos en tiempo real para respetar tu tiempo, mostrar tu impacto y mantener cada regla de recompensa clara y justa. Estar centrado en las personas no significa rechazar la tecnología. Significa poner la tecnología al servicio de las personas.",
    eyebrow: "Sobre nosotros",
    theme: "Tus opiniones dan forma al mundo.",
    whoEyebrow: "Quiénes somos",
    humanEyebrow: "Las personas primero",
    body: "Somos una empresa interregional de investigación e insight que construye una comunidad de investigación abierta, interconectada y sostenible. Conectamos a participantes, clientes y organizaciones en torno a los negocios, la cultura, la vida cotidiana y las cuestiones públicas, y convertimos voces reales en juicios claros — para mejores decisiones y un mundo mejor.",
    storyTitle: "Con raíces en China, conectados con el mundo.",
    points: [
      { num: '01', title: "Una base china", body: "El equipo lleva años centrado en la investigación de mercados y ha construido en China una comunidad y una red de investigación estables, con acceso a muestras locales reales y verificables." },
      { num: '02', title: "Socios regionales", body: "En la Gran China, Asia-Pacífico, Oriente Medio, Europa y Norteamérica trabajamos con socios locales, de modo que cada mercado lo ejecutan personas que lo conocen." },
      { num: '03', title: "Siempre ampliando", body: "Según lo exige cada estudio, ampliamos la cobertura de socios y participantes en los principales mercados — partiendo de un lugar concreto hacia una visión más amplia." },
    ],
  },
  'fi': {
    humanBody: "Uskomme, että todelliset ihmiset ovat aina tutkimuksen lähtökohta. Tekoäly voi tuottaa loputtomasti sisältöä, joka näyttää aidolta. Mutta se ei voi koskaan toisintaa tiettyä ihmistä tietyssä hetkessä kertomassa, mitä hän todella ajattelee. Jokaisen kyselytuloksen takana on ihminen, joka päätti jakaa näkökulman. Juuri nämä yksittäiset äänet tekevät insighsistä luotettavaa. Käytämme matchausta ja reaaliaikaista dataa, jotta kunnioitamme aikaasi, näytämme vaikutuksesi ja pidämme jokaisen palkitsemissäännön selkeänä ja reiluna. Ihmiskeskeisyys ei tarkoita teknologian hylkäämistä. Se tarkoittaa, että teknologia palvelee ihmisiä.",
    eyebrow: "Tietoa meistä",
    theme: "Näkemyksesi muokkaavat maailmaa.",
    whoEyebrow: "Keitä olemme",
    humanEyebrow: "Ihminen ensin",
    body: "Olemme alueiden välinen insight- ja tutkimusyritys, joka rakentaa avointa, verkottunutta ja kestävää tutkimusyhteisöä. Yhdistämme osallistujat, tutkimuksen tilaajat ja organisaatiot liiketoiminnan, kulttuurin, arjen ja julkisten kysymysten ympärille ja muunnamme aidot äänet selkeiksi arvioiksi — parempien päätösten ja paremman maailman puolesta.",
    storyTitle: "Juuret Kiinassa, yhteydet maailmaan.",
    points: [
      { num: '01', title: "Kiinalainen perusta", body: "Tiimi on keskittynyt markkinatutkimukseen vuosia ja rakentanut Kiinaan vakaan yhteisön ja tutkimusverkoston, joka tavoittaa aitoja, todennettavia paikallisia otoksia." },
      { num: '02', title: "Alueelliset kumppanit", body: "Suur-Kiinassa, Aasian ja Tyynenmeren alueella, Lähi-idässä, Euroopassa ja Pohjois-Amerikassa teemme yhteistyötä paikallisten tutkimuskumppaneiden kanssa, jotta jokaisen markkinan toteuttavat sen tuntevat ihmiset." },
      { num: '03', title: "Jatkuvasti laajeneva", body: "Tutkimuksen tarpeen mukaan laajennamme kumppanien ja osallistujien kattavuutta keskeisillä markkinoilla — lähtien tietystä paikasta ja yhdistyen laajempaan näkymään." },
    ],
  },
  'it': {
    humanBody: "Crediamo che le persone reali siano sempre il punto di partenza della ricerca. L'IA può generare contenuti infiniti che sembrano reali. Ma non potrà mai ricreare una persona precisa, in un momento preciso, che esprime ciò che pensa davvero. Dietro ogni risultato di indagine c'è una persona che ha scelto di condividere un punto di vista. Sono queste voci individuali a rendere l'insight degno di fiducia. Usiamo matching e dati in tempo reale per rispettare il tuo tempo, mostrare il tuo impatto e mantenere ogni regola di ricompensa chiara ed equa. Essere centrati sulle persone non significa rifiutare la tecnologia. Significa mettere la tecnologia al servizio delle persone.",
    eyebrow: "Su di noi",
    theme: "Le tue opinioni danno forma al mondo.",
    whoEyebrow: "Chi siamo",
    humanEyebrow: "Le persone prima di tutto",
    body: "Siamo un'azienda interregionale di ricerche e insight che costruisce una comunità di ricerca aperta, interconnessa e sostenibile. Colleghiamo partecipanti, committenti e organizzazioni intorno a business, cultura, vita quotidiana e questioni pubbliche, trasformando voci reali in giudizi chiari — per decisioni migliori e un mondo migliore.",
    storyTitle: "Radici in Cina, connessi al mondo.",
    points: [
      { num: '01', title: "Una base cinese", body: "Il team si occupa da anni di ricerche di mercato e ha costruito in Cina una comunità e una rete di ricerca stabili, con accesso a campioni locali reali e verificabili." },
      { num: '02', title: "Partner regionali", body: "Nella Grande Cina, in Asia-Pacifico, in Medio Oriente, in Europa e in Nord America lavoriamo con partner di ricerca locali, così ogni mercato è gestito da persone che lo conoscono." },
      { num: '03', title: "Sempre in espansione", body: "In base alle esigenze dello studio, ampliamo la copertura di partner e partecipanti nei principali mercati — partendo da un luogo concreto verso una prospettiva più ampia." },
    ],
  },
  'ja': {
    humanBody: "私たちは、実在する人が研究の出発点であり続けると考えています。AI は本物に見えるコンテンツを無限に生成できます。しかし、ある特定の人が、ある特定の瞬間に、本当に考えていることを語る姿を再現することはできません。すべての調査結果の背後には、視点を共有することを選んだ人がいます。その一人ひとりの声が、インサイトを信頼できるものにします。私たちはマッチングとリアルタイムデータを使い、あなたの時間を尊重し、影響を可視化し、報酬ルールを明確で公平に保ちます。人間中心とは、技術を拒むことではありません。技術を人のために働かせることです。",
    eyebrow: "会社概要",
    theme: "あなたの意見が世界を形づくる。",
    whoEyebrow: "私たちについて",
    humanEyebrow: "人を中心に",
    body: "私たちは地域を越えて活動するインサイト・リサーチ会社で、開かれた相互につながり、持続可能なリサーチコミュニティをつくっています。参加者、調査依頼者、組織をビジネス、文化、日常生活、公共の問いのもとで結び、実際の声を明確な判断に変えていきます — よりよい意思決定と、よりよい世界のために。",
    storyTitle: "中国に根ざし、世界とつながる。",
    points: [
      { num: '01', title: "中国での基盤", body: "チームは長年マーケットリサーチに取り組み、中国で安定したコミュニティと調査ネットワークを築き、実在し検証可能な現地サンプルに到達できます。" },
      { num: '02', title: "地域パートナー", body: "大中華圏、アジア太平洋、中東、欧州、北米では現地の調査パートナーと協働し、各市場をその市場を知る人びとが担当します。" },
      { num: '03', title: "拡大を続ける", body: "調査の必要に応じて、主要市場でのパートナーと参加者のカバレッジを広げています — 特定の場所から始め、より広い視野へ。" },
    ],
  },
  'ko': {
    humanBody: "우리는 실제 사람이 언제나 연구의 출발점이라고 믿습니다. AI는 실제처럼 보이는 콘텐츠를 끝없이 만들 수 있습니다. 하지만 특정한 사람이 특정한 순간에 자신이 진짜로 생각하는 것을 말하는 모습을 재현할 수는 없습니다. 모든 설문 결과 뒤에는 관점을 나누기로 선택한 사람이 있습니다. 그 개별적인 목소리가 인사이트를 신뢰할 수 있게 만듭니다. 우리는 매칭과 실시간 데이터로 당신의 시간을 존중하고, 영향력을 보여 주며, 모든 보상 규칙을 명확하고 공정하게 유지합니다. 사람 중심은 기술을 거부하는 것이 아닙니다. 기술이 사람을 위해 일하게 하는 것입니다.",
    eyebrow: "회사 소개",
    theme: "당신의 의견이 세상을 만듭니다.",
    whoEyebrow: "우리는 누구인가",
    humanEyebrow: "사람이 먼저",
    body: "우리는 지역을 넘어 활동하는 인사이트·리서치 기업으로, 열려 있고 상호 연결된 지속 가능한 리서치 커뮤니티를 만들어 갑니다. 비즈니스, 문화, 일상, 공공 의제 전반에서 참여자·의뢰자·조직을 연결하고, 실제 목소리를 명확한 판단으로 바꿉니다 — 더 나은 결정과 더 나은 세상을 위해.",
    storyTitle: "중국에 뿌리를 두고 세계와 연결되다.",
    points: [
      { num: '01', title: "중국 기반", body: "팀은 오랫동안 시장조사에 집중해 왔으며, 중국에서 안정적인 커뮤니티와 조사 네트워크를 구축해 실제로 검증 가능한 현지 표본에 접근합니다." },
      { num: '02', title: "지역 파트너", body: "중화권, 아시아태평양, 중동, 유럽, 북미에서 현지 조사 파트너와 협력해 각 시장을 그 시장을 아는 사람들이 수행합니다." },
      { num: '03', title: "계속 확장", body: "조사 필요에 따라 주요 시장에서 파트너와 참여자 범위를 넓혀 왔습니다 — 특정한 지점에서 시작해 더 넓은 시야로 이어갑니다." },
    ],
  },
  'no': {
    humanBody: "Vi mener at ekte mennesker alltid er utgangspunktet for forskning. AI kan lage uendelig mye innhold som ser ekte ut. Men den kan aldri gjenskape et bestemt menneske i et bestemt øyeblikk som sier hva det virkelig mener. Bak hvert undersøkelsesresultat står et menneske som valgte å dele et perspektiv. De enkelte stemmene gjør innsikt verdt å stole på. Vi bruker matching og samtidsdata for å respektere tiden din, vise effekten din og holde hver belønningsregel klar og rettferdig. Menneskesentrert betyr ikke å avvise teknologi. Det betyr å la teknologi tjene mennesker.",
    eyebrow: "Om oss",
    theme: "Dine meninger former verden.",
    whoEyebrow: "Hvem vi er",
    humanEyebrow: "Mennesket først",
    body: "Vi er et tverrregionalt innsikts- og forskningsselskap som bygger et åpent, sammenkoblet og bærekraftig forskningsfellesskap. Vi knytter sammen deltakere, oppdragsgivere og organisasjoner på tvers av næringsliv, kultur, hverdag og offentlige spørsmål, og gjør ekte stemmer om til klare vurderinger — for bedre beslutninger og en bedre verden.",
    storyTitle: "Forankret i Kina, knyttet til verden.",
    points: [
      { num: '01', title: "Et kinesisk fundament", body: "Teamet har arbeidet med markedsundersøkelser i mange år og har bygget et stabilt fellesskap og forskningsnettverk i Kina, med tilgang til ekte, etterprøvbare lokale utvalg." },
      { num: '02', title: "Regionale partnere", body: "I Stor-Kina, Asia-Stillehavet, Midtøsten, Europa og Nord-Amerika samarbeider vi med lokale forskningspartnere, slik at hvert marked drives av mennesker som kjenner det." },
      { num: '03', title: "Alltid under utvidelse", body: "Etter behov i studien utvider vi dekningen av partnere og deltakere i viktige markeder — med utgangspunkt i et konkret sted og blikk for et bredere perspektiv." },
    ],
  },
  'pt': {
    humanBody: "Acreditamos que as pessoas reais são sempre o ponto de partida da investigação. A IA pode gerar conteúdo infinito que parece real. Mas nunca conseguirá recriar uma pessoa concreta, num momento concreto, a expressar o que realmente pensa. Por trás de cada resultado de inquérito está uma pessoa que decidiu partilhar uma perspetiva. São essas vozes individuais que tornam o insight digno de confiança. Usamos matching e dados em tempo real para respeitar o seu tempo, mostrar o seu impacto e manter cada regra de recompensa clara e justa. Estar centrado nas pessoas não significa rejeitar a tecnologia. Significa pôr a tecnologia ao serviço das pessoas.",
    eyebrow: "Sobre nós",
    theme: "As suas opiniões moldam o mundo.",
    whoEyebrow: "Quem somos",
    humanEyebrow: "As pessoas primeiro",
    body: "Somos uma empresa inter-regional de estudos e insight que constrói uma comunidade de investigação aberta, interligada e sustentável. Ligamos participantes, clientes e organizações em torno dos negócios, da cultura, do quotidiano e das questões públicas, transformando vozes reais em juízos claros — para melhores decisões e um mundo melhor.",
    storyTitle: "Enraizados na China, ligados ao mundo.",
    points: [
      { num: '01', title: "Uma base chinesa", body: "A equipa dedica-se há anos à investigação de mercado e construiu na China uma comunidade e uma rede de investigação estáveis, com acesso a amostras locais reais e verificáveis." },
      { num: '02', title: "Parceiros regionais", body: "Na Grande China, Ásia-Pacífico, Médio Oriente, Europa e América do Norte trabalhamos com parceiros locais, para que cada mercado seja executado por quem o conhece." },
      { num: '03', title: "Sempre a alargar", body: "Consoante o estudo, alargamos a cobertura de parceiros e participantes nos principais mercados — partindo de um lugar concreto para uma visão mais ampla." },
    ],
  },
  'ru': {
    humanBody: "Мы считаем, что реальные люди всегда остаются отправной точкой исследования. ИИ может создавать бесконечный контент, который выглядит настоящим. Но он никогда не воссоздаст конкретного человека в конкретный момент, говорящего, что он действительно думает. За каждым результатом опроса стоит человек, который решил поделиться своей точкой зрения. Именно эти отдельные голоса делают инсайт заслуживающим доверия. Мы используем мэтчинг и данные в реальном времени, чтобы уважать ваше время, показывать ваше влияние и сохранять каждое правило вознаграждения ясным и справедливым. Человекоцентричность — это не отказ от технологий. Это значит, что технологии служат людям.",
    eyebrow: "О нас",
    theme: "Ваши мнения формируют мир.",
    whoEyebrow: "Кто мы",
    humanEyebrow: "Человек прежде всего",
    body: "Мы — межрегиональная исследовательская компания и компания в области инсайтов, которая строит открытое, взаимосвязанное и устойчивое исследовательское сообщество. Мы соединяем участников, заказчиков и организации в сферах бизнеса, культуры, повседневной жизни и общественных вопросов и превращаем реальные голоса в ясные суждения — ради лучших решений и лучшего мира.",
    storyTitle: "Укоренены в Китае, связаны с миром.",
    points: [
      { num: '01', title: "Китайская основа", body: "Команда много лет занимается маркетинговыми исследованиями и создала в Китае устойчивое сообщество и исследовательскую сеть с доступом к реальным, проверяемым локальным выборкам." },
      { num: '02', title: "Региональные партнёры", body: "В Большом Китае, Азиатско-Тихоокеанском регионе, на Ближнем Востоке, в Европе и Северной Америке мы работаем с местными исследовательскими партнёрами, чтобы каждый рынок вели те, кто его знает." },
      { num: '03', title: "Постоянное расширение", body: "В зависимости от задачи исследования мы расширяем охват партнёров и участников на ключевых рынках — от конкретного места к более широкому взгляду." },
    ],
  },
  'sv': {
    humanBody: "Vi tror att verkliga människor alltid är utgångspunkten för forskning. AI kan skapa oändligt mycket innehåll som ser äkta ut. Men den kan aldrig återskapa en specifik människa i ett specifikt ögonblick som säger vad hen verkligen tycker. Bakom varje undersökningsresultat står en människa som valde att dela ett perspektiv. De enskilda rösterna gör insikt värt att lita på. Vi använder matchning och realtidsdata för att respektera din tid, visa din påverkan och hålla varje belöningsregel tydlig och rättvis. Människocentrerat betyder inte att avvisa teknik. Det betyder att låta teknik tjäna människor.",
    eyebrow: "Om oss",
    theme: "Dina åsikter formar världen.",
    whoEyebrow: "Vilka vi är",
    humanEyebrow: "Människan först",
    body: "Vi är ett tvärregionalt insight- och undersökningsföretag som bygger en öppen, sammankopplad och hållbar forskningsgemenskap. Vi knyter samman deltagare, uppdragsgivare och organisationer inom näringsliv, kultur, vardag och offentliga frågor och gör verkliga röster till tydliga bedömningar — för bättre beslut och en bättre värld.",
    storyTitle: "Rotade i Kina, kopplade till världen.",
    points: [
      { num: '01', title: "En kinesisk grund", body: "Teamet har i många år arbetat med marknadsundersökningar och har byggt upp en stabil gemenskap och ett forskningsnätverk i Kina, med tillgång till verkliga och verifierbara lokala urval." },
      { num: '02', title: "Regionala partner", body: "I Stor-Kina, Asien-Stillahavsområdet, Mellanöstern, Europa och Nordamerika arbetar vi med lokala undersökningspartner, så att varje marknad drivs av människor som känner den." },
      { num: '03', title: "Ständigt växande", body: "Beroende på studien utökar vi täckningen av partner och deltagare på viktiga marknader — med utgångspunkt i en konkret plats och blick för ett bredare perspektiv." },
    ],
  },
  'tr': {
    humanBody: "Gerçek insanların her zaman araştırmanın başlangıç noktası olduğuna inanıyoruz. Yapay zekâ gerçek görünen sonsuz içerik üretebilir. Ancak belirli bir kişiyi, belirli bir anda, gerçekten düşündüğünü söylerken asla yeniden yaratamaz. Her anket sonucunun arkasında bakış açısını paylaşmayı seçen bir insan vardır. Bu bireysel sesler içgörüyü güvenilir kılar. Eşleştirme ve gerçek zamanlı verilerle zamanınıza saygı duyuyor, etkinizi gösteriyor ve her ödül kuralını açık ve adil tutuyoruz. İnsan odaklı olmak teknolojiyi reddetmek değildir. Teknolojinin insanlara hizmet etmesini sağlamaktır.",
    eyebrow: "Hakkımızda",
    theme: "Görüşleriniz dünyayı şekillendirir.",
    whoEyebrow: "Biz kimiz",
    humanEyebrow: "Önce insan",
    body: "Bölgeler arası bir içgörü ve araştırma şirketiyiz; açık, birbirine bağlı ve sürdürülebilir bir araştırma topluluğu kuruyoruz. Katılımcıları, araştırma talebinde bulunanları ve kurumları ticaret, kültür, günlük yaşam ve kamusal konular etrafında bir araya getiriyor, gerçek sesleri net yargılara dönüştürüyoruz — daha iyi kararlar ve daha iyi bir dünya için.",
    storyTitle: "Çin'de köklü, dünyayla bağlantılı.",
    points: [
      { num: '01', title: "Çin'de bir temel", body: "Ekip yıllardır pazar araştırmasına odaklanıyor ve Çin'de istikrarlı bir topluluk ile araştırma ağı kurdu; gerçek ve doğrulanabilir yerel örneklere ulaşabiliyor." },
      { num: '02', title: "Bölgesel ortaklar", body: "Büyük Çin, Asya-Pasifik, Orta Doğu, Avrupa ve Kuzey Amerika'da yerel araştırma ortaklarıyla çalışıyoruz; böylece her pazarı o pazarı tanıyan kişiler yürütüyor." },
      { num: '03', title: "Sürekli genişleyen", body: "Araştırmanın gereğine göre önemli pazarlarda ortak ve katılımcı kapsamını genişletiyoruz — belirli bir yerden başlayıp daha geniş bir bakışa uzanıyoruz." },
    ],
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
