
import { useState } from "react";
import { Download, X } from "lucide-react";

import {
    NAMED_STARS,
    VISIBLE_STARS,
    getVisibleConstellations,
    projectStar,
} from "./astronomy";

type PosterSize = "21x30" | "30x40" | "40x50" | "50x70";

type StarMapExportProps = {
    date: Date;
    location: {
        name: string;
        coordinates: string;
        latitude: number;
        longitude: number;
    };
};

const MAP_SIZE = 320;
const CENTER = MAP_SIZE / 2;
const RADIUS = 142;

const COLORS = {
    ink: "#FFF3D8",
    muted: "#C5BEDD",
    purple: "#C0A5FF",
    lilac: "#D0B5FF",
    warmWhite: "#FFF3D8",
};

const POSTER_SIZES: {
    value: PosterSize;
    label: string;
    width: number;
    height: number;
}[] = [
    { value: "21x30", label: "21 × 30 cm", width: 21, height: 30 },
    { value: "30x40", label: "30 × 40 cm", width: 30, height: 40 },
    { value: "40x50", label: "40 × 50 cm", width: 40, height: 50 },
    { value: "50x70", label: "50 × 70 cm", width: 50, height: 70 },
];

function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function formatPosterDate(date: Date) {
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function formatPosterTime(date: Date) {
    return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getVisibleLineSegments(
    line: [number, number][],
    date: Date,
    location: StarMapExportProps["location"],
): string[] {
    const segments: string[] = [];
    let currentSegment: string[] = [];

    for (const [ra, dec] of line) {
        const position = projectStar(
            {
                id: `constellation-${ra}-${dec}`,
                ra,
                dec,
                magnitude: 0,
            },
            date,
            location.latitude,
            location.longitude,
            MAP_SIZE,
            RADIUS,
        );

        if (!position) {
            if (currentSegment.length >= 2) {
                segments.push(currentSegment.join(" "));
            }

            currentSegment = [];
            continue;
        }

        currentSegment.push(`${position.x},${position.y}`);
    }

    if (currentSegment.length >= 2) {
        segments.push(currentSegment.join(" "));
    }

    return segments;
}

function buildPosterSvg({
    date,
    location,
    size,
    showConstellationLines,
    showStarNames,
}: {
    date: Date;
    location: StarMapExportProps["location"];
    size: (typeof POSTER_SIZES)[number];
    showConstellationLines: boolean;
    showStarNames: boolean;
}) {
    const width = 700;
    const height = (width * size.height) / size.width;

    // Margem externa e borda decorativa.
    const borderInset = 24;
    const contentWidth = width - borderInset * 2;

    // Área central do pôster.
    const mapSize = 390;
    const mapScale = mapSize / MAP_SIZE;
    const mapX = (width - mapSize) / 2;

    // O layout usa coordenadas relativas para acomodar os formatos.
    const titleY = 100;
    const titleLineY = 126;
    const mapY = 155;

    const infoCardWidth = 270;
    const infoCardHeight = 100;
    const infoGap = 14;
    const infoTotalWidth = infoCardWidth * 2 + infoGap;
    const infoStartX = (width - infoTotalWidth) / 2;

    const infoY = mapY + mapSize + 34;
    const footerY = height - 68;

    const formattedDate = escapeXml(formatPosterDate(date));
    const formattedTime = escapeXml(formatPosterTime(date));
    const safeLocationName = escapeXml(location.name);
    const safeCoordinates = escapeXml(location.coordinates);

    const stars = VISIBLE_STARS.map((star) => {
        const position = projectStar(
            star,
            date,
            location.latitude,
            location.longitude,
            MAP_SIZE,
            RADIUS,
        );

        if (!position) return "";

        const radius = Math.max(
            0.45,
            Math.min(2.4, 2.8 - star.magnitude * 0.35),
        );

        const opacity = Math.max(
            0.25,
            Math.min(1, 1.15 - star.magnitude * 0.12),
        );

        return `
            <circle
                cx="${position.x}"
                cy="${position.y}"
                r="${radius}"
                fill="${COLORS.warmWhite}"
                opacity="${opacity}"
            />
        `;
    }).join("");

    const constellationLines = showConstellationLines
        ? getVisibleConstellations()
              .map((constellation) =>
                  constellation.lines
                      .flatMap((line) =>
                          getVisibleLineSegments(line, date, location),
                      )
                      .map(
                          (points) => `
                              <polyline
                                  points="${points}"
                                  fill="none"
                                  stroke="${COLORS.lilac}"
                                  stroke-width="0.8"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  opacity="0.8"
                              />
                          `,
                      )
                      .join(""),
              )
              .join("")
        : "";

    const namedStars = showStarNames
        ? NAMED_STARS.map((star) => {
              const position = projectStar(
                  star,
                  date,
                  location.latitude,
                  location.longitude,
                  MAP_SIZE,
                  RADIUS,
              );

              if (!position) return "";

              return `
                  <g>
                      <circle
                          cx="${position.x}"
                          cy="${position.y}"
                          r="1.5"
                          fill="#FFE5A3"
                      />
                      <text
                          x="${position.x + (star.labelDx ?? 5)}"
                          y="${position.y + (star.labelDy ?? -5)}"
                          font-family="Arial, sans-serif"
                          font-size="7"
                          font-weight="600"
                          fill="${COLORS.ink}"
                          stroke="#10152F"
                          stroke-width="2.5"
                          stroke-linejoin="round"
                          paint-order="stroke"
                      >${escapeXml(star.name)}</text>
                  </g>
              `;
          }).join("")
        : "";

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${size.width}cm"
    height="${size.height}cm"
    viewBox="0 0 ${width} ${height}"
>
    <defs>
        <radialGradient id="sky-gradient" cx="45%" cy="38%" r="75%">
            <stop offset="0%" stop-color="#252344"/>
            <stop offset="52%" stop-color="#151832"/>
            <stop offset="100%" stop-color="#0B1026"/>
        </radialGradient>

        <linearGradient id="title-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#8064FF"/>
            <stop offset="100%" stop-color="#E1A6D5"/>
        </linearGradient>

        <clipPath id="map-clip">
            <circle
                cx="${CENTER}"
                cy="${CENTER}"
                r="${RADIUS}"
            />
        </clipPath>
    </defs>

    <!-- Fundo do pôster -->
    <rect
        width="${width}"
        height="${height}"
        fill="#0B0B2B"
    />

    <!-- Borda quadrada com margem interna -->
    <rect
        x="${borderInset}"
        y="${borderInset}"
        width="${contentWidth}"
        height="${height - borderInset * 2}"
        rx="0"
        fill="none"
        stroke="#C0A5FF"
        stroke-width="1.2"
        stroke-opacity="0.65"
    />

    <!-- Pequenos detalhes decorativos nos cantos -->
    <g
        fill="none"
        stroke="#D0B5FF"
        stroke-width="2"
        stroke-linecap="round"
        opacity="0.85"
    >
        <path d="M ${borderInset + 16} ${borderInset + 32} V ${borderInset + 16} H ${borderInset + 32}"/>
        <path d="M ${width - borderInset - 32} ${borderInset + 16} H ${width - borderInset - 16} V ${borderInset + 32}"/>
        <path d="M ${borderInset + 16} ${height - borderInset - 32} V ${height - borderInset - 16} H ${borderInset + 32}"/>
        <path d="M ${width - borderInset - 32} ${height - borderInset - 16} H ${width - borderInset - 16} V ${height - borderInset - 32}"/>
    </g>

    <!-- Título -->
    <text
        x="${width / 2}"
        y="${titleY}"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="27"
        font-weight="800"
        fill="${COLORS.ink}"
    >O céu quando tudo começou</text>

    <rect
        x="${width / 2 - 28}"
        y="${titleLineY}"
        width="56"
        height="3"
        rx="1.5"
        fill="url(#title-gradient)"
    />

    <!-- Mapa estelar ampliado -->
    <g transform="translate(${mapX} ${mapY}) scale(${mapScale})">
        <circle
            cx="${CENTER}"
            cy="${CENTER}"
            r="${RADIUS}"
            fill="url(#sky-gradient)"
            stroke="#FFFFFF"
            stroke-opacity="0.3"
            stroke-width="0.8"
        />

        <g clip-path="url(#map-clip)">
            <circle
                cx="${CENTER}"
                cy="${CENTER}"
                r="${RADIUS * 0.66}"
                fill="none"
                stroke="${COLORS.warmWhite}"
                stroke-width="0.5"
                opacity="0.13"
            />

            <circle
                cx="${CENTER}"
                cy="${CENTER}"
                r="${RADIUS * 0.33}"
                fill="none"
                stroke="${COLORS.warmWhite}"
                stroke-width="0.5"
                opacity="0.1"
            />

            <line
                x1="${CENTER}"
                y1="${CENTER - RADIUS}"
                x2="${CENTER}"
                y2="${CENTER + RADIUS}"
                stroke="${COLORS.warmWhite}"
                stroke-width="0.4"
                opacity="0.15"
            />

            <line
                x1="${CENTER - RADIUS}"
                y1="${CENTER}"
                x2="${CENTER + RADIUS}"
                y2="${CENTER}"
                stroke="${COLORS.warmWhite}"
                stroke-width="0.4"
                opacity="0.15"
            />

            ${stars}
            ${constellationLines}
            ${namedStars}
        </g>

        <!-- Pontos cardeais -->
        <g
            font-family="Arial, sans-serif"
            font-size="10"
            font-weight="800"
            fill="${COLORS.ink}"
            opacity="0.8"
            text-anchor="middle"
        >
            <text x="${CENTER}" y="14">N</text>
            <text x="${CENTER}" y="${MAP_SIZE - 5}">S</text>
            <text x="12" y="${CENTER + 3}">L</text>
            <text x="${MAP_SIZE - 12}" y="${CENTER + 3}">O</text>
        </g>

        <circle
            cx="${CENTER}"
            cy="${CENTER}"
            r="2"
            fill="${COLORS.warmWhite}"
            opacity="0.85"
        />

        <circle
            cx="${CENTER}"
            cy="${CENTER}"
            r="6"
            fill="none"
            stroke="${COLORS.lilac}"
            stroke-width="0.8"
            opacity="0.7"
        />
    </g>

    <!-- Cartões de data e horário, e de localização -->
    <g>
        <!-- Cartão de data e hora -->
        <rect
            x="${infoStartX}"
            y="${infoY}"
            width="${infoCardWidth}"
            height="${infoCardHeight}"
            rx="16"
            fill="#FFF3D8"
            fill-opacity="0.045"
            stroke="${COLORS.purple}"
            stroke-opacity="0.35"
            stroke-width="1"
        />

        <circle
            cx="${infoStartX + 24}"
            cy="${infoY + 27}"
            r="11"
            fill="${COLORS.purple}"
            fill-opacity="0.13"
        />

        <g
            transform="translate(${infoStartX + 18} ${infoY + 21})"
            fill="none"
            stroke="${COLORS.purple}"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <rect x="0" y="2" width="12" height="11" rx="2"/>
            <path d="M 3 0 V 4 M 9 0 V 4 M 0 6 H 12"/>
        </g>

        <text
            x="${infoStartX + 44}"
            y="${infoY + 31}"
            font-family="Arial, sans-serif"
            font-size="10"
            font-weight="800"
            letter-spacing="1.2"
            fill="${COLORS.muted}"
        >DATA E HORA</text>

        <text
            x="${infoStartX + 18}"
            y="${infoY + 60}"
            font-family="Arial, sans-serif"
            font-size="17"
            font-weight="800"
            fill="${COLORS.ink}"
        >${formattedDate}</text>

        <text
            x="${infoStartX + 18}"
            y="${infoY + 82}"
            font-family="Arial, sans-serif"
            font-size="13"
            fill="${COLORS.muted}"
        >${formattedTime}</text>

        <!-- Cartão de localização -->
        <rect
            x="${infoStartX + infoCardWidth + infoGap}"
            y="${infoY}"
            width="${infoCardWidth}"
            height="${infoCardHeight}"
            rx="16"
            fill="#FFF3D8"
            fill-opacity="0.045"
            stroke="${COLORS.purple}"
            stroke-opacity="0.35"
            stroke-width="1"
        />

        <circle
            cx="${infoStartX + infoCardWidth + infoGap + 24}"
            cy="${infoY + 27}"
            r="11"
            fill="${COLORS.purple}"
            fill-opacity="0.13"
        />

        <g
            transform="translate(${infoStartX + infoCardWidth + infoGap + 18} ${infoY + 20})"
            fill="none"
            stroke="${COLORS.purple}"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M 6 14 S 0 8 0 5 A 6 6 0 0 1 12 5 C 12 8 6 14 6 14 Z"/>
            <circle cx="6" cy="5" r="2"/>
        </g>

        <text
            x="${infoStartX + infoCardWidth + infoGap + 44}"
            y="${infoY + 31}"
            font-family="Arial, sans-serif"
            font-size="10"
            font-weight="800"
            letter-spacing="1.2"
            fill="${COLORS.muted}"
        >LOCAL</text>

        <text
            x="${infoStartX + infoCardWidth + infoGap + 18}"
            y="${infoY + 60}"
            font-family="Arial, sans-serif"
            font-size="17"
            font-weight="800"
            fill="${COLORS.ink}"
        >${safeLocationName}</text>

        <text
            x="${infoStartX + infoCardWidth + infoGap + 18}"
            y="${infoY + 82}"
            font-family="Arial, sans-serif"
            font-size="13"
            fill="${COLORS.muted}"
        >Piauí, Brasil</text>
    </g>

    <!-- Coordenadas -->
    <g>
        <rect
            x="${width / 2 - 155}"
            y="${infoY + infoCardHeight + 16}"
            width="310"
            height="38"
            rx="12"
            fill="#FFFFFF"
            fill-opacity="0.035"
            stroke="${COLORS.purple}"
            stroke-opacity="0.3"
            stroke-width="1"
        />

        <text
            x="${width / 2}"
            y="${infoY + infoCardHeight + 40}"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="12"
            font-weight="700"
            letter-spacing="1"
            fill="${COLORS.muted}"
        >${safeCoordinates}</text>
    </g>

    <!-- Rodapé com espaçamento generoso -->
    <text
        x="${width / 2}"
        y="${footerY}"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="14"
        font-weight="800"
        letter-spacing="2"
        fill="${COLORS.ink}"
    >
        <tspan x="${width / 2}" dy="0">O CÉU QUANDO NOSSOS</tspan>
        <tspan x="${width / 2}" dy="23">MUNDOS SE COLIDIRAM</tspan>
    </text>
</svg>`;
}

export function StarMapExport({
    date,
    location,
}: StarMapExportProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [sizeValue, setSizeValue] = useState<PosterSize>("30x40");
    const [showConstellationLines, setShowConstellationLines] =
        useState(true);
    const [showStarNames, setShowStarNames] = useState(true);

    function exportSvg() {
        const selectedSize = POSTER_SIZES.find(
            (item) => item.value === sizeValue,
        );

        if (!selectedSize) return;

        const svg = buildPosterSvg({
            date,
            location,
            size: selectedSize,
            showConstellationLines,
            showStarNames,
        });

        const blob = new Blob([svg], {
            type: "image/svg+xml;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `nosso-ceu-${sizeValue}cm.svg`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
        setIsOpen(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="
                    mt-7 inline-flex items-center justify-center gap-2
                    rounded-full border border-[#C0A5FF]/40
                    bg-[#C0A5FF]/10 px-6 py-3
                    text-sm font-bold text-[#FFF3D8]
                    transition-colors hover:bg-[#C0A5FF]/20
                "
            >
                <Download size={17} />
                Exportar para quadro
            </button>

            {isOpen && (
                <div
                    className="
                        fixed inset-0 z-[100] flex items-center
                        justify-center overflow-y-auto bg-black/75
                        p-4
                    "
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="star-export-title"
                        className="
                            my-auto w-full max-w-md rounded-3xl
                            border border-[#C0A5FF]/25
                            bg-[#10152F] p-6 text-[#FFF3D8]
                            shadow-2xl
                        "
                    >
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#C0A5FF]">
                                    Seu céu, impresso
                                </p>
                                <h3
                                    id="star-export-title"
                                    className="text-2xl font-black"
                                >
                                    Preparar quadro
                                </h3>
                                <p className="mt-2 text-sm text-[#C5BEDD]">
                                    Escolha o formato e os detalhes do mapa.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Fechar exportação"
                                className="rounded-full p-2 text-[#C5BEDD] hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <fieldset className="mb-6">
                            <legend className="mb-3 text-sm font-bold">
                                Tamanho do quadro
                            </legend>

                            <div className="grid grid-cols-2 gap-3">
                                {POSTER_SIZES.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        aria-pressed={sizeValue === item.value}
                                        onClick={() => setSizeValue(item.value)}
                                        className={`
                                            rounded-xl border p-3 text-left
                                            transition-colors
                                            ${
                                                sizeValue === item.value
                                                    ? "border-[#C0A5FF] bg-[#C0A5FF]/15"
                                                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                                            }
                                        `}
                                    >
                                        <span className="block text-sm font-bold">
                                            {item.label}
                                        </span>
                                        <span className="mt-1 block text-xs text-[#C5BEDD]">
                                            {item.width / item.height > 0.72
                                                ? "Formato vertical"
                                                : "Formato retrato"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="mb-7 space-y-4">
                            <legend className="mb-3 text-sm font-bold">
                                Elementos do mapa
                            </legend>

                            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 p-4">
                                <span>
                                    <span className="block text-sm font-semibold">
                                        Linhas das constelações
                                    </span>
                                    <span className="mt-1 block text-xs text-[#C5BEDD]">
                                        Conecta as estrelas em cada constelação.
                                    </span>
                                </span>

                                <input
                                    type="checkbox"
                                    checked={showConstellationLines}
                                    onChange={(event) =>
                                        setShowConstellationLines(
                                            event.target.checked,
                                        )
                                    }
                                    className="h-5 w-5 accent-[#C0A5FF]"
                                />
                            </label>

                            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 p-4">
                                <span>
                                    <span className="block text-sm font-semibold">
                                        Nomes das estrelas
                                    </span>
                                    <span className="mt-1 block text-xs text-[#C5BEDD]">
                                        Exibe os nomes das estrelas conhecidas.
                                    </span>
                                </span>

                                <input
                                    type="checkbox"
                                    checked={showStarNames}
                                    onChange={(event) =>
                                        setShowStarNames(event.target.checked)
                                    }
                                    className="h-5 w-5 accent-[#C0A5FF]"
                                />
                            </label>
                        </fieldset>

                        <button
                            type="button"
                            onClick={exportSvg}
                            className="
                                flex w-full items-center justify-center gap-2
                                rounded-full bg-[#C0A5FF] px-5 py-3
                                font-black text-[#101025]
                                transition-opacity hover:opacity-90
                            "
                        >
                            <Download size={18} />
                            Baixar SVG
                        </button>

                        <p className="mt-3 text-center text-xs leading-relaxed text-[#C5BEDD]">
                            Arquivo vetorial para impressão. As dimensões
                            físicas serão definidas no SVG.
                        </p>
                    </section>
                </div>
            )}
        </>
    );
}
