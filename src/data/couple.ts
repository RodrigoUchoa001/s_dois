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
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                    ],
                },
                {
                    title: "Momentos Felizes",
                    description: "Alguns dos momentos mais felizes que compartilhamos juntos.",
                    images: [
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                    ],
                },
                {
                    title: "Viagens Inesquecíveis",
                    description: "As aventuras que vivemos juntos em nossas viagens.",
                    images: [
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                        `${import.meta.env.BASE_URL}images/aaa.png`,
                        `${import.meta.env.BASE_URL}images/aaa.png`,
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
                        day: 17,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/music_cover.jpg`,
                    imageAspect: "3/4",
                    imageDescription: "Nosso primeiro encontro",
                    eventDescription: "Aquele dia inesquecível em que nos conhecemos e tudo commencemos.",
                    
                },
                {
                    date: {
                        day: 17,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/music_cover.jpg`,
                    imageAspect: "4/3",
                    imageDescription: "Nosso primeiro encontro",
                    eventDescription: "Aquele dia inesquecível em que nos conhecemos e tudo commencemos.",
                    
                },
                {
                    date: {
                        day: 17,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/music_cover.jpg`,
                    imageAspect: "4/3",
                    imageDescription: "Nosso primeiro encontro",
                    eventDescription: "Aquele dia inesquecível em que nos conhecemos e tudo commencemos.",
                    
                },
                {
                    date: {
                        day: 17,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/music_cover.jpg`,
                    imageAspect: "3/4",
                    imageDescription: "Nosso primeiro encontro",
                    eventDescription: "Aquele dia inesquecível em que nos conhecemos e tudo commencemos.",
                    
                },
                {
                    date: {
                        day: 17,
                        month: 7,
                        year: 2026,
                    },
                    image: `${import.meta.env.BASE_URL}images/music_cover.jpg`,
                    imageAspect: "4/3",
                    imageDescription: "Nosso primeiro encontro",
                    eventDescription: "Aquele dia inesquecível em que nos conhecemos e tudo commencemos.",
                    
                },
            ],
        }
    }
};