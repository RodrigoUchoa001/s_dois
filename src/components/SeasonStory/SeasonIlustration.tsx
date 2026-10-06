import { motion } from "motion/react";

type Season =
    | "spring"
    | "summer"
    | "autumn"
    | "winter";

type Props = {
    season: Season;
};

export function SeasonIllustration({
    season,
}: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.8,
                y: 30,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 80,
            }}
            className="relative flex w-full items-center justify-center"
        >
            {season === "spring" && <Spring />}

            {season === "summer" && <Summer />}

            {season === "autumn" && <Autumn />}

            {season === "winter" && <Winter />}
        </motion.div>
    );
}

function Spring() {
    return (
        <svg
            viewBox="0 0 400 320"
            className="h-auto w-full max-w-[340px]"
        >
            {/* Sombra */}
            <ellipse
                cx="200"
                cy="290"
                rx="105"
                ry="14"
                fill="#789b7d"
                opacity="0.25"
            />

            {/* Tronco */}
            <path
                d="M190 270 C190 220 185 180 200 135"
                fill="none"
                stroke="#10213b"
                strokeWidth="14"
                strokeLinecap="round"
            />

            {/* Galhos */}
            <path
                d="M195 190 L145 145"
                fill="none"
                stroke="#10213b"
                strokeWidth="12"
                strokeLinecap="round"
            />

            <path
                d="M198 175 L250 130"
                fill="none"
                stroke="#10213b"
                strokeWidth="12"
                strokeLinecap="round"
            />

            {/* Copa */}
            <circle
                cx="125"
                cy="125"
                r="55"
                fill="#b9dfb7"
                stroke="#10213b"
                strokeWidth="8"
            />

            <circle
                cx="205"
                cy="95"
                r="65"
                fill="#c9e8c0"
                stroke="#10213b"
                strokeWidth="8"
            />

            <circle
                cx="280"
                cy="135"
                r="55"
                fill="#acd8ad"
                stroke="#10213b"
                strokeWidth="8"
            />

            {/* Flores */}
            <Flower x={100} y={100} />
            <Flower x={165} y={65} />
            <Flower x={245} y={115} />
            <Flower x={135} y={150} />
            <Flower x={290} y={155} />

            {/* Pétalas soltas */}
            <circle
                cx="70"
                cy="190"
                r="5"
                fill="#e79ab5"
            />

            <circle
                cx="320"
                cy="80"
                r="5"
                fill="#e79ab5"
            />
        </svg>
    );
}

function Flower({
    x,
    y,
}: {
    x: number;
    y: number;
}) {
    return (
        <g transform={`translate(${x} ${y})`}>
            <circle
                cx="-8"
                cy="0"
                r="7"
                fill="#f19ab4"
            />

            <circle
                cx="8"
                cy="0"
                r="7"
                fill="#f19ab4"
            />

            <circle
                cx="0"
                cy="-8"
                r="7"
                fill="#f19ab4"
            />

            <circle
                cx="0"
                cy="8"
                r="7"
                fill="#f19ab4"
            />

            <circle
                cx="0"
                cy="0"
                r="5"
                fill="#ffd66b"
            />
        </g>
    );
}

function Summer() {
    return (
        <svg
            viewBox="0 0 400 320"
            className="h-auto w-full max-w-[340px]"
        >
            {/* Sol */}
            <circle
                cx="200"
                cy="120"
                r="72"
                fill="#ffd96a"
                stroke="#10213b"
                strokeWidth="9"
            />

            {/* Raios */}
            <g
                stroke="#10213b"
                strokeWidth="8"
                strokeLinecap="round"
            >
                <line x1="200" y1="25" x2="200" y2="5" />
                <line x1="105" y1="120" x2="80" y2="120" />
                <line x1="295" y1="120" x2="320" y2="120" />
                <line x1="135" y1="55" x2="115" y2="35" />
                <line x1="265" y1="55" x2="285" y2="35" />
            </g>

            {/* Mar */}
            <path
                d="M30 220
                   C65 190 100 250 135 220
                   C170 190 205 250 240 220
                   C275 190 310 250 350 215
                   L350 290
                   L30 290 Z"
                fill="#8bc8e8"
                stroke="#10213b"
                strokeWidth="8"
            />

            {/* Segunda onda */}
            <path
                d="M35 250
                   C70 220 105 280 140 250
                   C175 220 210 280 245 250
                   C280 220 315 275 350 245"
                fill="none"
                stroke="#ffffff"
                strokeWidth="10"
                strokeLinecap="round"
            />

            {/* Guarda-sol */}
            <path
                d="M85 205
                   Q135 150 185 205 Z"
                fill="#ff866e"
                stroke="#10213b"
                strokeWidth="8"
            />

            <line
                x1="135"
                y1="205"
                x2="135"
                y2="275"
                stroke="#10213b"
                strokeWidth="8"
                strokeLinecap="round"
            />

            {/* Pequena boia */}
            <circle
                cx="290"
                cy="225"
                r="27"
                fill="#ff9cae"
                stroke="#10213b"
                strokeWidth="8"
            />

            <circle
                cx="290"
                cy="225"
                r="10"
                fill="#fff0c9"
            />
        </svg>
    );
}

function Autumn() {
    return (
        <svg
            viewBox="0 0 400 320"
            className="h-auto w-full max-w-[340px]"
        >
            {/* Sombra */}
            <ellipse
                cx="200"
                cy="290"
                rx="115"
                ry="15"
                fill="#9b6849"
                opacity="0.25"
            />

            {/* Tronco */}
            <path
                d="M200 280
                   C195 225 205 170 200 110"
                fill="none"
                stroke="#10213b"
                strokeWidth="18"
                strokeLinecap="round"
            />

            {/* Galhos */}
            <path
                d="M200 175 L135 115"
                fill="none"
                stroke="#10213b"
                strokeWidth="13"
                strokeLinecap="round"
            />

            <path
                d="M200 160 L270 105"
                fill="none"
                stroke="#10213b"
                strokeWidth="13"
                strokeLinecap="round"
            />

            {/* Folhagem */}
            <circle
                cx="125"
                cy="100"
                r="48"
                fill="#e58b42"
                stroke="#10213b"
                strokeWidth="8"
            />

            <circle
                cx="200"
                cy="70"
                r="58"
                fill="#d96d32"
                stroke="#10213b"
                strokeWidth="8"
            />

            <circle
                cx="275"
                cy="105"
                r="48"
                fill="#eda84d"
                stroke="#10213b"
                strokeWidth="8"
            />

            {/* Folhas caindo */}
            <Leaf
                x={90}
                y={180}
                rotation={-25}
            />

            <Leaf
                x={305}
                y={170}
                rotation={30}
            />

            <Leaf
                x={120}
                y={235}
                rotation={15}
            />

            <Leaf
                x={300}
                y={245}
                rotation={-20}
            />
        </svg>
    );
}

function Leaf({
    x,
    y,
    rotation,
}: {
    x: number;
    y: number;
    rotation: number;
}) {
    return (
        <g
            transform={`translate(${x} ${y}) rotate(${rotation})`}
        >
            <path
                d="M0 -18
                   C20 -10 20 10 0 18
                   C-20 10 -20 -10 0 -18 Z"
                fill="#df7c38"
                stroke="#10213b"
                strokeWidth="5"
            />

            <line
                x1="0"
                y1="-13"
                x2="0"
                y2="13"
                stroke="#10213b"
                strokeWidth="3"
            />
        </g>
    );
}

function Winter() {
    return (
        <svg
            viewBox="0 0 400 320"
            className="h-auto w-full max-w-[340px]"
        >
            {/* Flocos pequenos */}
            <circle
                cx="70"
                cy="80"
                r="5"
                fill="#ffffff"
                stroke="#10213b"
                strokeWidth="3"
            />

            <circle
                cx="325"
                cy="65"
                r="5"
                fill="#ffffff"
                stroke="#10213b"
                strokeWidth="3"
            />

            <circle
                cx="320"
                cy="245"
                r="5"
                fill="#ffffff"
                stroke="#10213b"
                strokeWidth="3"
            />

            {/* Floco principal */}
            <Snowflake />

            {/* Sombras */}
            <ellipse
                cx="200"
                cy="285"
                rx="90"
                ry="12"
                fill="#8296b7"
                opacity="0.3"
            />
        </svg>
    );
}

function Snowflake() {
    const branches = Array.from({
        length: 6,
    });

    return (
        <g
            transform="translate(200 160)"
            stroke="#10213b"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Braços principais */}
            {branches.map((_, index) => (
                <g
                    key={index}
                    transform={`rotate(${index * 60})`}
                >
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-105"
                    />

                    {/* Ramificação esquerda */}
                    <line
                        x1="0"
                        y1="-55"
                        x2="-25"
                        y2="-75"
                    />

                    <line
                        x1="0"
                        y1="-55"
                        x2="25"
                        y2="-75"
                    />

                    {/* Ramificação externa */}
                    <line
                        x1="0"
                        y1="-82"
                        x2="-18"
                        y2="-96"
                    />

                    <line
                        x1="0"
                        y1="-82"
                        x2="18"
                        y2="-96"
                    />
                </g>
            ))}

            {/* Centro */}
            <polygon
                points="
                    0,-28
                    24,-14
                    24,14
                    0,28
                    -24,14
                    -24,-14
                "
                fill="#ffffff"
            />
        </g>
    );
}

