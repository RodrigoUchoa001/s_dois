
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
    const verticalOffset = Math.max(0, (height - 875) / 2);

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

              const labelX = position.x + (star.labelDx ?? 5);
              const labelY = position.y + (star.labelDy ?? -5);

              return `
                  <g>
                      <circle
                          cx="${position.x}"
                          cy="${position.y}"
                          r="1.5"
                          fill="#FFE5A3"
                      />
                      <text
                          x="${labelX}"
                          y="${labelY}"
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

    const safeLocationName = escapeXml(location.name);
    const safeCoordinates = escapeXml(location.coordinates);
    const formattedDate = escapeXml(formatPosterDate(date));
    const formattedTime = escapeXml(formatPosterTime(date));

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
            <stop offset="0%" stop-color="#C0A5FF"/>
            <stop offset="100%" stop-color="#E1A6D5"/>
        </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="#0B0B2B"/>

    <g transform="translate(0 ${verticalOffset})">
        <text
            x="350" y="74"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="15"
            font-weight="700"
            letter-spacing="5"
            fill="${COLORS.purple}"
        >NOSSO CÉU</text>

        <text
            x="350" y="119"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="25"
            font-weight="800"
            fill="${COLORS.ink}"
        >O céu quando tudo começou</text>

        <rect
            x="325" y="140"
            width="50" height="3"
            rx="1.5"
            fill="url(#title-gradient)"
        />

        <g transform="translate(150 185) scale(1.25)">
            <circle
                cx="${CENTER}" cy="${CENTER}" r="${RADIUS}"
                fill="url(#sky-gradient)"
                stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="0.8"
            />

            <circle
                cx="${CENTER}" cy="${CENTER}" r="${RADIUS}"
                fill="none" stroke="${COLORS.warmWhite}"
                stroke-width="0.6" opacity="0.22"
            />

            <circle
                cx="${CENTER}" cy="${CENTER}" r="${RADIUS * 0.66}"
                fill="none" stroke="${COLORS.warmWhite}"
                stroke-width="0.5" opacity="0.11"
            />

            <circle
                cx="${CENTER}" cy="${CENTER}" r="${RADIUS * 0.33}"
                fill="none" stroke="${COLORS.warmWhite}"
                stroke-width="0.5" opacity="0.09"
            />

            <line
                x1="${CENTER}" y1="${CENTER - RADIUS}"
                x2="${CENTER}" y2="${CENTER + RADIUS}"
                stroke="${COLORS.warmWhite}"
                stroke-width="0.4" opacity="0.12"
            />

            <line
                x1="${CENTER - RADIUS}" y1="${CENTER}"
                x2="${CENTER + RADIUS}" y2="${CENTER}"
                stroke="${COLORS.warmWhite}"
                stroke-width="0.4" opacity="0.12"
            />

            <g
                font-family="Arial, sans-serif"
                font-size="10"
                font-weight="800"
                fill="${COLORS.ink}"
                opacity="0.75"
                text-anchor="middle"
            >
                <text x="${CENTER}" y="14">N</text>
                <text x="${CENTER}" y="${MAP_SIZE - 5}">S</text>
                <text x="12" y="${CENTER + 3}">L</text>
                <text x="${MAP_SIZE - 12}" y="${CENTER + 3}">O</text>
            </g>

            ${stars}
            ${constellationLines}
            ${namedStars}

            <circle
                cx="${CENTER}" cy="${CENTER}" r="2"
                fill="${COLORS.warmWhite}" opacity="0.8"
            />

            <circle
                cx="${CENTER}" cy="${CENTER}" r="6"
                fill="none" stroke="${COLORS.lilac}"
                stroke-width="0.8" opacity="0.7"
            />
        </g>

        <text
            x="350" y="645"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="12"
            font-weight="700"
            letter-spacing="2"
            fill="${COLORS.purple}"
        >A NOITE EM QUE TUDO COMEÇOU</text>

        <text
            x="350" y="681"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="23"
            font-weight="800"
            fill="${COLORS.ink}"
        >${formattedDate}</text>

        <text
            x="350" y="709"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="16"
            fill="${COLORS.muted}"
        >${formattedTime}</text>

        <text
            x="350" y="755"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="20"
            font-weight="700"
            fill="${COLORS.ink}"
        >${safeLocationName}, Piauí, Brasil</text>

        <text
            x="350" y="782"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="12"
            letter-spacing="1"
            fill="${COLORS.muted}"
        >${safeCoordinates}</text>

        <text
            x="350" y="825"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="13"
            font-weight="700"
            letter-spacing="2"
            fill="${COLORS.ink}"
        >
            <tspan x="350" dy="0">O CÉU QUANDO NOSSOS</tspan>
            <tspan x="350" dy="22">MUNDOS SE COLIDIRAM.</tspan>
        </text>
    </g>
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
