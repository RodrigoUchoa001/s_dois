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
        url: "public/music/always.mp3",
        cover: "public/images/aaa.png",
    },

    message: `
        Algumas histórias começam de maneira inesperada.
        A nossa começou naquele dia, quando nossos caminhos se cruzaram e nossas vidas se entrelaçaram de uma forma que jamais poderíamos imaginar. Desde então, cada momento ao seu lado tem sido uma aventura maravilhosa, repleta de risos, aprendizados e amor.
        A cada dia que passa, sinto-me mais grato por ter você ao meu lado. Você é a razão do meu sorriso, a inspiração para os meus sonhos e o amor da minha vida. Juntos, enfrentamos desafios, celebramos conquistas e construímos memórias que ficarão para sempre em nossos corações.
     `,
    wrapped: {
        // etapas: minutos juntos, galeria de imagens, mapa estelar do inicio do namoro
        minutesTogether: {
            message: "Cada minuto é mais um pedacinho da história que estamos construindo juntos.",
        },
        gallery: {  
            title: "Nossos momentos",
            message: "Cada foto é um capítulo da nossa história, repleta de amor e felicidade.",
            photoStack: [
                {
                    title: "Nosso Primeiro Encontro",
                    description: "Aquele dia inesquecível em que nos conhecemos e tudo começou.",
                    images: [
                        "public/images/photo1.jpg",
                        "public/images/photo2.jpg",
                        "public/images/photo3.jpg",
                    ],
                },
                {
                    title: "Momentos Felizes",
                    description: "Alguns dos momentos mais felizes que compartilhamos juntos.",
                    images: [
                        "public/images/photo4.jpg",
                        "public/images/photo5.jpg",
                        "public/images/photo6.jpg",
                    ],
                },
                {
                    title: "Viagens Inesquecíveis",
                    description: "As aventuras que vivemos juntos em nossas viagens.",
                    images: [
                        "public/images/photo7.jpg",
                        "public/images/photo8.jpg",
                        "public/images/photo9.jpg",
                    ],
                },
            ],
        }
    }
};