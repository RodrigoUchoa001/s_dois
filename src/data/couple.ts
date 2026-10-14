export const couple = {
    names: {
        man: 'Fulano',
        woman: 'Sicrano'
    },
    startDay: 17,
    startMonth: 7,
    startYear: 2026,

    startHour: 18,
    startMinute: 0,
    startSecond: 0,

    song: {
        title: "Always",
        artist: "Bon Jovi",
        url: `${import.meta.env.BASE_URL}music/always.mp3`,
        cover: `${import.meta.env.BASE_URL}images/music_cover.jpg`,
    },

    mainImage1: `${import.meta.env.BASE_URL}images/main1.jpeg`,
    mainImage2: `${import.meta.env.BASE_URL}images/main2.jpeg`,

    endImage1: `${import.meta.env.BASE_URL}images/end1.jpeg`,

    message: `
        Algumas histórias começam de maneira inesperada.

        A nossa começou naquele dia, quando nossos caminhos se cruzaram e nossas vidas se entrelaçaram de uma forma que jamais poderíamos imaginar. Desde então, cada momento ao seu lado tem sido uma aventura maravilhosa, repleta de risos, aprendizados e amor.
        A cada dia que passa, sinto-me mais grato por ter você ao meu lado. Você é a razão do meu sorriso, a inspiração para os meus sonhos e o amor da minha vida. Juntos, enfrentamos desafios, celebramos conquistas e construímos memórias que ficarão para sempre em nossos corações.
     `,
    wrapped: {
        // etapas: minutos juntos, galeria de imagens, mapa estelar do inicio do namoro
        minutesTogether: {
            message: "Cada minuto é mais um pedacinho da história que estamos construindo juntos (as vezes, um pedacinho é meio tenso kkkkkkkkkkkkkkkkkk)",
        },
        gallery: {  
            photoStack: [
                {
                    title: "Nosso Primeiro Encontro ❤️",
                    description: "Aquele dia inesquecível em que nos conhecemos e tudo começou.",
                    images: [
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "4/3",
                        },
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                    ],
                },
                {
                    title: "Momentos Felizes",
                    description: "Alguns dos momentos mais felizes que compartilhamos juntos.",
                    images: [
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                    ],
                },
                {
                    title: "Viagens Inesquecíveis",
                    description: "As aventuras que vivemos juntos em nossas viagens.",
                    images: [
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                        {
                            src: `${import.meta.env.BASE_URL}images/aaa.png`,
                            imageAspect: "3/4",
                        },
                    ],
                },
            ],
        },
        timeline: {
            // "events.length momentos"
            title: "Nossa jornada",
            description: "Os momentos que nos trouxeram até aqui",
            events: [
                {
                    date: {
                        day: 18,
                        month: 12,
                        year: 2018,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl1.jpeg`,
                    imageAspect: "3/4",
                    imageDescription: "A primeira foto que encontrei nossa (quase) juntos",
                    eventDescription: `
                    A foto que encontrei no grupo antigasso dos alunos do IFPI. Nem sabíamos da existência um do outro kkkkkkkkkk 

                    Mas estávamos ali, pertinho um do outro, mas ainda não era hora da gente se encontrar.
                    `,
                    
                },
                {
                    date: {
                        day: 30,
                        month: 1,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl2.jpeg`,
                    // imageAspect: "4/3",
                    imageDescription: "Posse do concurso",
                    eventDescription: `
                    Nunca vou me conformar com essa foto.

                    Estávamos DO LADO UM DO OUTRO, SEM SE CONHECER.

                    Você pode dizer que isso não foi o destino, mas eu acredito que foi.
                    `,
                    
                },
                {
                    date: {
                        day: 24,
                        month: 2,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl3.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Meu primeiro dia de trabalho",
                    eventDescription: `
                    (Não tenho foto desse dia kkkkkk)
                    
                    Agora sim, a primeira vez que nos encontramos no MNL.

                    Finalmente, Deus mostrou a hora certa pra a gente se encontrar. Foi por pouco tempo (pq fui a oportunidade perfeita pro pessoal de lá lhe tirarem de lá), mas foi suficiente pra gente se aproximar.
                    `,
                    
                },
                {
                    date: {
                        day: 9,
                        month: 5,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl4.jpeg`,
                    imageAspect: "3/4",
                    imageDescription: "Feira do livro na praça",
                    eventDescription: `
                    (sem foto no dia tbm, então ai uma foto aleatória da praça da bonelle kkkkkkkk)

                    O primeiro date? kkkkkkkkkk 
                    
                    A primeira vez que a gente saiu juntos. Dia do famigerado pastel de queijo KKKKKKKKKKKK

                    Foi legal, mas ainda era meio estranho a gente saindo juntos né?
                    `,
                },
                {
                    date: {
                        day: 7,
                        month: 6,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl5.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Festival de Inverno",
                    eventDescription: `
                    Segundo date.

                    Fomos pro show do Roupa Nova (muito foda!!!!), no festival de inverno.

                    Eu já tava na intenção, mas acabou que não rolou no dia (infelizmente) kkkkkkkkk
                    `,                    
                },
                {
                    date: {
                        day: 7,
                        month: 6,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl6.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Primeiro Picnic",
                    eventDescription: `
                    (Esse já tem foto até de mais kkkkkkkkkkkkk)
                    
                    Tivemos a ideia de ir pro Mirante da Arara fazer um picnic.
                    
                    Aqui eu já tava doidin por vc 💕

                    Chegando o final da noite, eu já tava achando que, novamente, não ia rolar nada.

                    Mas aconteceu. O nosso primeiro beijo.

                    Foi um dia tão especial pra mim. Nunca vou esquecer como você foi compreensiva comigo.

                    A partir daqui, nossa história começou a começar (se isso faz sentido kkkkkkk)
                    `,                    
                },
                {
                    date: {
                        day: 26,
                        month: 6,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl7.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Primeiro dia na academia juntos",
                    eventDescription: `
                    Tiramos uma fotinha, então achei interessante colocar aqui tbm kkkkkkkkkk

                    Fui testar a Beta, por recomendação sua.

                    Eu, um mês sem treinar perna. Não deu certo.
                    
                    Vc não teve pena de mim nesse treino :(

                    No outro dia eu tava só o bagaço kkkkkkkkkk
                    `,                    
                },
                {
                    date: {
                        day: 27,
                        month: 6,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl8.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Testando aquele (incrível) telescópio",
                    eventDescription: `
                    Fomos no gritador a tardinha pra testar o telescópio de R$200 que compramos.

                    Tava nublado kkkkkkkkkkkkkkkk

                    E quando finalmente o céu se abriu, não conseguimos focar ele na lua, parabéns.

                    Mas foi um dia tão bom, porque estávamos juntos :)
                    `,                    
                },
                {
                    date: {
                        day: 30,
                        month: 6,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl9.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Segundo dia na academia juntos",
                    eventDescription: `
                    Por recomendação minha, fomos testar a TopX.

                    Nunca mais colocamos o pés lá kkkkkkkk

                    Academia cheia de mais pqp.

                    Mas gostei do que aconteceu no final.
                    hehehehehe
                    `,                    
                },
                {
                    date: {
                        day: 11,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl10.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Segundo picnic",
                    eventDescription: `
                    Fomos novamente fazer um picnic no Mirante da Arara. Virou nosso lugarzin especial kkkkkk

                    Levamos o telescópio pra testar lá também, e não deu muito certo.

                    Chegamos lá tarde, vimos o por do sol de longe.

                    Nesse dia, foi a primeira vez que você experimentou o brownie que eu fiz.

                    Detalhe que foi o segundo brownie que fiz na vida kkkkkkkk mas ficou uma delícia né?
                    `,
                },
                {
                    date: {
                        day: 15,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl11.gif`,
                    imageAspect: "4/3",
                    imageDescription: "Primeira corridinha na orla (eu acho kkkkkkkk)",
                    eventDescription: `
                    Aquela sua corridinha kkkkkkkkkk

                    Não podia deixar de colocar aqui.

                    Muito fofa mds ❤️
                    `,
                },
                {
                    date: {
                        day: 17,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl12.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "O dia",
                    eventDescription: `
                    Sim, o dia.

                    O dia que escolhei pra pedir você em namoro.

                    No podia ser em outro lugar, que não fosse o nosso lugarzinho especial, né?

                    Comprei os anéis, a cesta de chocolate e o Chico kkkkkkk

                    E então, chegou o dia. 

                    Preparamos um picnic normal. Você nem imaginava o que estava por vir, mesmo desconfiando da Carolina e da sua mãe kkkkkkkk

                    Eu já tava todo me tremendo kkkkkkk você lembra?

                    Demorei mais do que eu gostaria. Era pra ser exatamente no por do sol, mas me atrasei um tiquin kkkkkkk

                    O pedido aconteceu já tava ficando escuro, como está na foto.

                    Mas no final deu tudo certo, você aceitou ❤️

                    Você não consegue imaginar o quão feliz eu fiquei nesse momento. É sério.

                    Foi o momento mais feliz da minha vida. Saber que você aceitou estar ao meu lado, no dias bons e ruins, e a partir daqui, começarmos a construir a nossa história.

                    Amo você, vida ❤️❤️❤️

                    Mas claro, não fiz tudo sozinho.

                    Sem a ajuda da Carolina pegando um anel seu escondida, e o Victor pra me entregar, não teria conseguido.

                    Sou muito grato aos dois.
                    `,
                },
                {
                    date: {
                        day: 19,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl13.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Segunda vez na igreja",
                    eventDescription: `
                    A primeira foi quando fomos os 4 juntos, não tirei foto kkkkkk

                    Depois de lá, fomos no café e tirei essa fotinha sua.

                    Gosto muito dela kkkkkkkkkk 
                    
                    Coloquei aqui também.
                    `,
                },
                {
                    date: {
                        day: 25,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl14.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Primeira vez no dom bistrô",
                    eventDescription: `
                    Comemos aquela picanha que tava horrivi kkkkkkkkkkkkkkkkk

                    Mas nenhuma comida ruim seria capaz de deixar nossos encontros menos especiais <3
                    `,
                },
                {
                    date: {
                        day: 1,
                        month: 8,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl15.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Segunda vez no dom bistrô",
                    eventDescription: `
                    Esse dia foi bem melhor.

                    Pedimos aquele carneiro, esse tava top hein.

                    Nesse dia, teve até música ao vivo. Só antigas

                    Mais um dia incrível ao seu lado 😍
                    `,
                },
                {
                    date: {
                        day: 7,
                        month: 8,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl16.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Dia que fui conhecer seus pais",
                    eventDescription: `
                    Não preciso nem dizer como tava meu coração aqui né? kkkkkk

                    Quase morro. Tava tão nervoso.

                    Mas foi "bom de mais" kkkkkkkkkkk

                    Sua família me recebeu tão bem, e tinha tanta comida que não sabia nem por onde começar.

                    Nesse dia, tiramos a, na minha opinião, a nossa melhor fotinha.
                    `,
                },
                {
                    date: {
                        day: 8,
                        month: 8,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl17.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Cineminha bb",
                    eventDescription: `
                    Fomos nós 4 pra Teresina com o pai do Victor.

                    A sua primeira vez no cinema né? kkkkkkk Quando soube que você tinha esse sonho, não podia deixar de realizá-lo.
                    
                    Fomos ver o miranha, sem você ter visto nenhum dos filmes anteriores kkkkkk ficou boiando né?

                    Mas o filme foi bom. E estar com você nesse dia, foi perfeito.
                    `,
                },
                {
                    date: {
                        day: 16,
                        month: 8,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl18.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "No sushi",
                    eventDescription: `
                    Foto aleatória kkkkkkkkkkk

                    Mas que gostei muito ❤️
                    `,
                },
                {
                    date: {
                        day: 22,
                        month: 8,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl19.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "No beco da picanha",
                    eventDescription: `
                    Agora aqui foi picanha hein.

                    Muito top.

                    Outro dia especial com você bb 😘
                    `,
                },
                {
                    date: {
                        day: 23,
                        month: 8,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl20.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Sua primeira vez lá em casa",
                    eventDescription: `
                    Pintei até as paredes pra receber você kkkkkkkkkkkkkk

                    Não me arrependo lindinha

                    Nenhum esforço pra você é suficiente para o que você merece (acho que eu ja disse isso né? kkkkkkk)
                    `,
                },
                {
                    date: {
                        day: 4,
                        month: 9,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl21.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Configurando o Iphone novo",
                    eventDescription: `
                    Desculpa perfeita pra visitar você bb

                    Hehehehehehe

                    Pena que a partir daqui, as fotos no meu celular diminuiram :(
                    `,
                },
                {
                    date: {
                        day: 12,
                        month: 9,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl22.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Noite dos games",
                    eventDescription: `
                    No mesmo dia que eu fiz o psicotécnico, tava tentando entender um jogo que nunca joguei antes.

                    Acho que minha cabeça tava saindo fumaça kkkkkkk
                    `,
                },
                {
                    date: {
                        day: 20,
                        month: 9,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl23.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Minha primeira vez no Atta",
                    eventDescription: `
                    Fui por recomendação sua.

                    Não tinha como uma ideia sua ser ruim kkkkkkk lugar muito foda.

                    Temos que ir lá de novo hein.
                    `,
                },
                {
                    date: {
                        day: 26,
                        month: 9,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl24.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Fazendo comida lá em casa",
                    eventDescription: `
                    A macarronada ficou top.

                    Agora o suco kkkkkkkkkkkkk
                    `,
                },
                {
                    date: {
                        day: 2,
                        month: 10,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/tl25.jpeg`,
                    imageAspect: "4/3",
                    imageDescription: "Na sua casa de novo",
                    eventDescription: `
                    Sempre um prazer visitar você amor ❤️
                    `,
                },
            ],
        }
    },
    dateNight: {
        places: [
            "Dom Bistrô",
            "Beco da Picanha",
            "Pizza Quadrada",
            "Mirante da Arara",
            "Estação Villa",
            "Pizzaria do gordinho",
            "Balneário das Serras",
            // "Aqui em casa 🤤",
            "Atta"
        ]
    }
};