
import { motion } from "motion/react";

type Season = "spring" | "summer" | "autumn" | "winter";

const palettes: Record<
    Season,
    {
        sky: string;
        farHill: string;
        nearHill: string;
        ground: string;
        light: string;
        detail: string;
    }
> = {
    spring: {
        sky: "#B6A0FF",
        farHill: "#393D70",
        nearHill: "#242F50",
        ground: "#172A3B",
        light: "#E7C9FF",
        detail: "#F5B8E4",
    },
    summer: {
        sky: "#FFC47C",
        farHill: "#76506A",
        nearHill: "#3F3C58",
        ground: "#202F42",
        light: "#FFE8A3",
        detail: "#F4A77C",
    },
    autumn: {
        sky: "#E89A72",
        farHill: "#69465B",
        nearHill: "#393049",
        ground: "#20283D",
        light: "#FFD09A",
        detail: "#E8A05E",
    },
    winter: {
        sky: "#9CB9F0",
        farHill: "#394B75",
        nearHill: "#273652",
        ground: "#17243C",
        light: "#E2EEFF",
        detail: "#B9D8FF",
    },
};

export function SeasonIllustration({
    season,
}: {
    season: Season;
}) {
    const colors = palettes[season];

    return (
        <svg
            viewBox="0 0 400 330"
            className="h-full w-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <linearGradient
                    id="seasonSky"
                    x1="200"
                    y1="0"
                    x2="200"
                    y2="330"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0%"
                        stopColor={colors.sky}
                        stopOpacity="0.23"
                    />
                    <stop
                        offset="100%"
                        stopColor={colors.sky}
                        stopOpacity="0"
                    />
                </linearGradient>

                <linearGradient
                    id="seasonGround"
                    x1="200"
                    y1="190"
                    x2="200"
                    y2="330"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0%"
                        stopColor={colors.nearHill}
                    />
                    <stop
                        offset="100%"
                        stopColor={colors.ground}
                    />
                </linearGradient>

                <radialGradient
                    id="seasonSunGlow"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="translate(270 105) rotate(90) scale(85)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0%"
                        stopColor={colors.light}
                        stopOpacity="0.25"
                    />
                    <stop
                        offset="100%"
                        stopColor={colors.light}
                        stopOpacity="0"
                    />
                </radialGradient>
            </defs>

            {/* =================================================
                ATMOSFERA
            ================================================= */}

            <ellipse
                cx="200"
                cy="180"
                rx="185"
                ry="140"
                fill="url(#seasonSky)"
            />

            <ellipse
                cx="270"
                cy="105"
                rx="90"
                ry="90"
                fill="url(#seasonSunGlow)"
            />

            {/* Estrelas discretas */}
            {[
                [58, 65],
                [110, 42],
                [185, 77],
                [326, 56],
                [350, 115],
                [38, 130],
            ].map(([x, y], index) => (
                <motion.circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={index % 2 === 0 ? 1.8 : 1.2}
                    fill="#F1F2FF"
                    animate={{
                        opacity: [0.2, 0.85, 0.2],
                    }}
                    transition={{
                        duration: 2.5 + index * 0.5,
                        delay: index * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* =================================================
                SOL
            ================================================= */}

            <motion.g
                animate={{
                    y: season === "winter" ? [0, 2, 0] : [0, -3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <circle
                    cx="270"
                    cy="105"
                    r={season === "summer" ? 32 : 25}
                    fill={colors.light}
                    opacity={season === "winter" ? 0.65 : 0.9}
                />

                <circle
                    cx="270"
                    cy="105"
                    r={season === "summer" ? 42 : 34}
                    stroke={colors.light}
                    strokeWidth="1"
                    opacity="0.2"
                />

                {season === "summer" && (
                    <motion.circle
                        cx="270"
                        cy="105"
                        r="49"
                        stroke={colors.light}
                        strokeWidth="1"
                        animate={{
                            opacity: [0.12, 0.35, 0.12],
                            scale: [0.96, 1.05, 0.96],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            transformOrigin: "270px 105px",
                        }}
                    />
                )}
            </motion.g>

            {/* =================================================
                MONTANHAS DISTANTES
            ================================================= */}

            <path
                d="M0 200 L43 157 L73 177 L124 125 L169 174 L207 143 L252 179 L301 135 L344 171 L377 150 L400 170 L400 330 L0 330 Z"
                fill={colors.farHill}
                opacity="0.7"
            />

            {/* Pontas iluminadas no inverno */}
            {season === "winter" && (
                <g>
                    <path
                        d="M91 158 L124 125 L150 153 L129 144 L121 148 L114 140 Z"
                        fill="#EDF5FF"
                        opacity="0.85"
                    />

                    <path
                        d="M275 162 L301 135 L327 159 L307 150 L300 154 L294 146 Z"
                        fill="#EDF5FF"
                        opacity="0.85"
                    />
                </g>
            )}

            {/* =================================================
                COLINAS DO MEIO
            ================================================= */}

            <path
                d="M0 220 C44 181 83 188 123 209 C165 230 202 190 243 197 C295 206 333 185 400 214 L400 330 L0 330 Z"
                fill={colors.nearHill}
            />

            <path
                d="M0 242 C50 218 91 226 137 239 C188 256 224 219 270 226 C327 236 360 216 400 231 L400 330 L0 330 Z"
                fill="url(#seasonGround)"
            />

            {/* =================================================
                ÁRVORES
            ================================================= */}

            {season === "spring" && <SpringTrees />}

            {season === "summer" && <SummerTrees />}

            {season === "autumn" && <AutumnTrees />}

            {season === "winter" && <WinterTrees />}

            {/* =================================================
                VEGETAÇÃO E FLORES DA PRIMAVERA
            ================================================= */}

            {season === "spring" && (
                <g>
                    {[
                        [65, 268],
                        [91, 289],
                        [132, 275],
                        [302, 281],
                        [333, 263],
                        [365, 289],
                    ].map(([x, y], index) => (
                        <motion.g
                            key={index}
                            animate={{
                                rotate: [-4, 5, -4],
                                y: [0, -2, 0],
                            }}
                            transition={{
                                duration: 3 + index * 0.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                transformOrigin: `${x}px ${y}px`,
                            }}
                        >
                            <path
                                d={`M${x} ${y + 13} L${x} ${y - 2}`}
                                stroke="#91C9A3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />

                            <path
                                d={`M${x} ${y + 7} Q${x - 8} ${y + 3} ${x - 7} ${y}`}
                                stroke="#91C9A3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />

                            {[0, 1, 2, 3, 4].map((petal) => (
                                <ellipse
                                    key={petal}
                                    cx={x + Math.cos(petal * Math.PI * 2 / 5) * 4}
                                    cy={y + Math.sin(petal * Math.PI * 2 / 5) * 4}
                                    rx="2.8"
                                    ry="3.8"
                                    fill={colors.detail}
                                    transform={`rotate(${petal * 72} ${x} ${y})`}
                                />
                            ))}

                            <circle
                                cx={x}
                                cy={y}
                                r="2.2"
                                fill="#FFE7A5"
                            />
                        </motion.g>
                    ))}
                </g>
            )}

            {/* =================================================
                CAPIM DO VERÃO
            ================================================= */}

            {season === "summer" && (
                <g
                    stroke="#A7C69A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.85"
                >
                    {Array.from({ length: 17 }).map((_, index) => {
                        const x = 24 + index * 22;
                        const y = 292 + (index % 3) * 7;

                        return (
                            <path
                                key={index}
                                d={`M${x} ${y} q-5 -9 -3 -14 M${x} ${y} q5 -8 7 -12`}
                            />
                        );
                    })}
                </g>
            )}

            {/* =================================================
                FOLHAS NO OUTONO
            ================================================= */}

            {season === "autumn" && (
                <g>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <motion.path
                            key={index}
                            d="M0 -5 Q8 -7 7 0 Q3 7 -3 5 Q-8 0 0 -5 Z"
                            fill={index % 2 === 0 ? "#F0A05D" : "#C97553"}
                            initial={{
                                x: 35 + index * 41,
                                y: 100 + (index % 4) * 26,
                                rotate: 0,
                                opacity: 0,
                            }}
                            animate={{
                                x: [
                                    35 + index * 41,
                                    43 + index * 41,
                                    35 + index * 41,
                                ],
                                y: [
                                    100 + (index % 4) * 26,
                                    120 + (index % 4) * 26,
                                    145 + (index % 4) * 26,
                                ],
                                rotate: [0, 100, 220],
                                opacity: [0, 0.9, 0],
                            }}
                            transition={{
                                duration: 5 + (index % 3),
                                delay: index * 0.45,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </g>
            )}

            {/* =================================================
                NEVE NO INVERNO
            ================================================= */}

            {season === "winter" && (
                <g>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <motion.circle
                            key={index}
                            r={index % 3 === 0 ? 2 : 1.3}
                            fill="#E5F0FF"
                            initial={{
                                cx: 15 + ((index * 47) % 370),
                                cy: 120 + ((index * 29) % 140),
                                opacity: 0,
                            }}
                            animate={{
                                cy: [
                                    120 + ((index * 29) % 140),
                                    155 + ((index * 29) % 140),
                                ],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: 3 + (index % 4),
                                delay: index * 0.2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    ))}
                </g>
            )}

            {/* =================================================
                REFLEXO NO CHÃO
            ================================================= */}

            <ellipse
                cx="200"
                cy="320"
                rx="125"
                ry="12"
                fill={colors.light}
                opacity="0.045"
            />
        </svg>
    );
}

/* ================================================================
   ÁRVORES DA PRIMAVERA
================================================================ */

function SpringTrees() {
    return (
        <g>
            <TreeTrunk x={47} y={221} height={53} />

            <circle cx="47" cy="168" r="23" fill="#668E83" />
            <circle cx="30" cy="181" r="18" fill="#789E8D" />
            <circle cx="63" cy="184" r="18" fill="#567F7A" />
            <circle cx="43" cy="148" r="16" fill="#8BB6A0" />

            <circle cx="37" cy="164" r="2.5" fill="#F5B8E4" />
            <circle cx="57" cy="175" r="2.5" fill="#E7C9FF" />
            <circle cx="43" cy="187" r="2.5" fill="#F5B8E4" />

            <TreeTrunk x={351} y={224} height={47} />

            <circle cx="351" cy="183" r="21" fill="#5C8D83" />
            <circle cx="334" cy="194" r="16" fill="#82A990" />
            <circle cx="366" cy="196" r="17" fill="#6D9B89" />
            <circle cx="350" cy="165" r="15" fill="#8BB6A0" />

            <circle cx="343" cy="181" r="2.5" fill="#F5B8E4" />
            <circle cx="361" cy="192" r="2.5" fill="#E7C9FF" />
        </g>
    );
}

/* ================================================================
   ÁRVORES DO VERÃO
================================================================ */

function SummerTrees() {
    return (
        <g>
            <TreeTrunk x={48} y={229} height={49} />

            <path
                d="M15 201 Q13 166 39 158 Q54 143 74 164 Q95 172 80 202 Z"
                fill="#507F70"
            />

            <path
                d="M26 189 Q41 166 57 177 Q69 160 81 185"
                stroke="#82AE83"
                strokeWidth="2"
                opacity="0.6"
            />

            <TreeTrunk x={350} y={228} height={48} />

            <path
                d="M319 201 Q316 169 339 161 Q354 145 372 165 Q392 176 378 203 Z"
                fill="#477968"
            />

            <path
                d="M329 190 Q344 168 358 177 Q370 160 381 186"
                stroke="#82AE83"
                strokeWidth="2"
                opacity="0.6"
            />
        </g>
    );
}

/* ================================================================
   ÁRVORES DO OUTONO
================================================================ */

function AutumnTrees() {
    return (
        <g>
            <TreeTrunk x={48} y={229} height={49} />

            <path
                d="M14 197 Q12 169 35 160 Q43 143 57 158 Q82 148 85 178 Q96 197 75 206 Z"
                fill="#C17A59"
            />

            <circle cx="33" cy="177" r="12" fill="#E8A05E" />
            <circle cx="61" cy="164" r="13" fill="#D98A56" />
            <circle cx="72" cy="188" r="12" fill="#A85D50" />

            <TreeTrunk x={351} y={230} height={47} />

            <path
                d="M317 197 Q316 171 337 162 Q349 145 364 159 Q387 151 389 181 Q398 197 377 206 Z"
                fill="#AA6757"
            />

            <circle cx="336" cy="177" r="12" fill="#D98A56" />
            <circle cx="360" cy="163" r="13" fill="#E8A05E" />
            <circle cx="375" cy="188" r="12" fill="#C17A59" />
        </g>
    );
}

/* ================================================================
   ÁRVORES DO INVERNO
================================================================ */

function WinterTrees() {
    return (
        <g>
            <TreeTrunk x={48} y={229} height={49} color="#647A9E" />

            <path
                d="M48 140 L20 185 H35 L17 207 H40 L29 222 H66 L56 207 H78 L60 185 H75 Z"
                fill="#52708C"
            />

            <path
                d="M48 147 L48 215"
                stroke="#9BB6D6"
                strokeWidth="1.5"
                opacity="0.55"
            />

            <TreeTrunk x={351} y={230} height={47} color="#647A9E" />

            <path
                d="M351 151 L325 188 H339 L320 208 H342 L332 223 H369 L360 208 H380 L362 188 H377 Z"
                fill="#4B6887"
            />

            <path
                d="M351 157 L351 216"
                stroke="#9BB6D6"
                strokeWidth="1.5"
                opacity="0.55"
            />

            {/* Neve nos galhos */}
            <path
                d="M24 184 L35 185 L48 168 L60 185 L71 185"
                stroke="#DDEBFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
            />

            <path
                d="M328 188 L339 189 L351 174 L363 189 L374 189"
                stroke="#DDEBFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
            />
        </g>
    );
}

/* ================================================================
   TRONCO REUTILIZÁVEL
================================================================ */

function TreeTrunk({
    x,
    y,
    height,
    color = "#5A4B57",
}: {
    x: number;
    y: number;
    height: number;
    color?: string;
}) {
    return (
        <path
            d={`M${x - 4} ${y} L${x - 2} ${y - height} L${x + 3} ${y - height} L${x + 5} ${y} Z`}
            fill={color}
        />
    );
}
