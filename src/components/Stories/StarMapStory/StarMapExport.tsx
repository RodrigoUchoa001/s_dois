import { useMemo, useState } from "react";
import { Download, X } from "lucide-react";
import { createPortal } from "react-dom";

import {
  NAMED_STARS,
  VISIBLE_STARS,
  getVisibleConstellations,
  projectStar,
} from "./astronomy";

import { couple } from "../../../data/couple";

type PosterSize = "21x30" | "30x40" | "40x50" | "50x70";
type BackgroundTheme = "original" | "white" | "black" | "forest";

type StarMapExportProps = {
  date: Date;
  location: {
    name: string;
    coordinates: string;
    latitude: number;
    longitude: number;
  };
};

type PosterSizeOption = {
  value: PosterSize;
  label: string;
  width: number;
  height: number;
};

type Theme = {
  label: string;
  background: string;
  skyStart: string;
  skyMiddle: string;
  skyEnd: string;
  ink: string;
  muted: string;
  purple: string;
  lilac: string;
  card: string;
  cardOpacity: number;
  grid: string;
  nameHalo: string;
};

const MAP_SIZE = 320;
const CENTER = MAP_SIZE / 2;
const RADIUS = 142;

const POSTER_SIZES: PosterSizeOption[] = [
  { value: "21x30", label: "21 × 30 cm", width: 21, height: 30 },
  { value: "30x40", label: "30 × 40 cm", width: 30, height: 40 },
  { value: "40x50", label: "40 × 50 cm", width: 40, height: 50 },
  { value: "50x70", label: "50 × 70 cm", width: 50, height: 70 },
];

const THEMES: Record<BackgroundTheme, Theme> = {
  original: {
    label: "Original",
    background: "#0B0B2B",
    skyStart: "#252344",
    skyMiddle: "#151832",
    skyEnd: "#0B1026",
    ink: "#FFF3D8",
    muted: "#C5BEDD",
    purple: "#C0A5FF",
    lilac: "#D0B5FF",
    card: "#FFF3D8",
    cardOpacity: 0.045,
    grid: "#FFF3D8",
    nameHalo: "#10152F",
  },
  white: {
    label: "Branco",
    background: "#FAF8F3",
    skyStart: "#F5F0FF",
    skyMiddle: "#E8E8F4",
    skyEnd: "#DADCEB",
    ink: "#27233D",
    muted: "#625D76",
    purple: "#7156C8",
    lilac: "#8C76D8",
    card: "#6D5BA7",
    cardOpacity: 0.045,
    grid: "#514B6A",
    nameHalo: "#E7E5F0",
  },
  black: {
    label: "Preto",
    background: "#050505",
    skyStart: "#1A1A24",
    skyMiddle: "#0C0C12",
    skyEnd: "#030305",
    ink: "#F7F4FF",
    muted: "#BDB8CC",
    purple: "#B8A0FF",
    lilac: "#D5C8FF",
    card: "#FFFFFF",
    cardOpacity: 0.045,
    grid: "#F7F4FF",
    nameHalo: "#08080C",
  },
  forest: {
    label: "Verde noturno",
    background: "#10251F",
    skyStart: "#23473B",
    skyMiddle: "#173329",
    skyEnd: "#0A1915",
    ink: "#F7EED8",
    muted: "#C8D3C3",
    purple: "#D5C08B",
    lilac: "#E8D6A7",
    card: "#F7EED8",
    cardOpacity: 0.055,
    grid: "#F7EED8",
    nameHalo: "#10251F",
  },
};

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
  backgroundTheme,
}: {
  date: Date;
  location: StarMapExportProps["location"];
  size: PosterSizeOption;
  showConstellationLines: boolean;
  showStarNames: boolean;
  backgroundTheme: BackgroundTheme;
}) {
  const theme = THEMES[backgroundTheme];
  const width = 700;
  const height = (width * size.height) / size.width;
  const borderInset = 24;
  const contentWidth = width - borderInset * 2;

  // Adapta a composição ao formato físico escolhido.
  const isCompactFormat = size.value === "21x30" || size.value === "50x70";
  const mapSize = height < 900 ? 350 : 370;
  const mapScale = mapSize / MAP_SIZE;
  const mapX = (width - mapSize) / 2;
  const titleY = 100;
  const titleLineY = 126;
  const mapY = 148;

  const cardGap = 14;
  const cardHeight = 100;
  const cardsStacked = isCompactFormat;
  const cardWidth = cardsStacked ? 390 : 270;
  const cardTotalHeight = cardsStacked ? cardHeight * 2 + 12 : cardHeight;
  const cardStartX = (width - (cardsStacked ? cardWidth : cardWidth * 2 + cardGap)) / 2;
  const infoY = mapY + mapSize + 28;
  const coordinatesY = infoY + cardTotalHeight + 16;
  const footerY = height - 70;
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

    const radius = Math.max(0.45, Math.min(2.4, 2.8 - star.magnitude * 0.35));
    const opacity = Math.max(0.25, Math.min(1, 1.15 - star.magnitude * 0.12));

    return `<circle cx="${position.x}" cy="${position.y}" r="${radius}" fill="${theme.ink}" opacity="${opacity}"/>`;
  }).join("");

  const constellationLines = showConstellationLines
    ? getVisibleConstellations()
        .map((constellation) =>
          constellation.lines
            .flatMap((line) => getVisibleLineSegments(line, date, location))
            .map(
              (points) => `<polyline points="${points}" fill="none" stroke="${theme.lilac}" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>`,
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

        return `<g>
          <circle cx="${position.x}" cy="${position.y}" r="1.5" fill="${theme.purple}"/>
          <text x="${position.x + (star.labelDx ?? 5)}" y="${position.y + (star.labelDy ?? -5)}"
            font-family="Arial, sans-serif" font-size="7" font-weight="600"
            fill="${theme.ink}" stroke="${theme.nameHalo}" stroke-width="2.5"
            stroke-linejoin="round" paint-order="stroke">${escapeXml(star.name)}</text>
        </g>`;
      }).join("")
    : "";

  const firstCardX = cardStartX;
  const secondCardX = cardsStacked ? cardStartX : cardStartX + cardWidth + cardGap;
  const secondCardY = cardsStacked ? infoY + cardHeight + 12 : infoY;

  const dateCard = `
    <g>
      <rect x="${firstCardX}" y="${infoY}" width="${cardWidth}" height="${cardHeight}" rx="16"
        fill="${theme.card}" fill-opacity="${theme.cardOpacity}" stroke="${theme.purple}" stroke-opacity="0.45" stroke-width="1"/>
      <circle cx="${firstCardX + 25}" cy="${infoY + 27}" r="11" fill="${theme.purple}" fill-opacity="0.14"/>
      <g transform="translate(${firstCardX + 19} ${infoY + 21})" fill="none" stroke="${theme.purple}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="0" y="2" width="12" height="11" rx="2"/><path d="M 3 0 V 4 M 9 0 V 4 M 0 6 H 12"/>
      </g>
      <text x="${firstCardX + 45}" y="${infoY + 31}" font-family="Arial, sans-serif" font-size="10" font-weight="800" letter-spacing="1.1" fill="${theme.muted}">DATA E HORA</text>
      <text x="${firstCardX + 18}" y="${infoY + 61}" font-family="Arial, sans-serif" font-size="${cardsStacked ? 17 : 16}" font-weight="800" fill="${theme.ink}">${formattedDate}</text>
      <text x="${firstCardX + 18}" y="${infoY + 83}" font-family="Arial, sans-serif" font-size="13" fill="${theme.muted}">${formattedTime}</text>
    </g>`;

  const locationCard = `
    <g>
      <rect x="${secondCardX}" y="${secondCardY}" width="${cardWidth}" height="${cardHeight}" rx="16"
        fill="${theme.card}" fill-opacity="${theme.cardOpacity}" stroke="${theme.purple}" stroke-opacity="0.45" stroke-width="1"/>
      <circle cx="${secondCardX + 25}" cy="${secondCardY + 27}" r="11" fill="${theme.purple}" fill-opacity="0.14"/>
      <g transform="translate(${secondCardX + 19} ${secondCardY + 20})" fill="none" stroke="${theme.purple}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 6 14 S 0 8 0 5 A 6 6 0 0 1 12 5 C 12 8 6 14 6 14 Z"/><circle cx="6" cy="5" r="2"/>
      </g>
      <text x="${secondCardX + 45}" y="${secondCardY + 31}" font-family="Arial, sans-serif" font-size="10" font-weight="800" letter-spacing="1.1" fill="${theme.muted}">LOCAL</text>
      <text x="${secondCardX + 18}" y="${secondCardY + 61}" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="${theme.ink}">${safeLocationName}</text>
      <text x="${secondCardX + 18}" y="${secondCardY + 83}" font-family="Arial, sans-serif" font-size="13" fill="${theme.muted}">Piauí, Brasil</text>
    </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}cm" height="${size.height}cm" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="sky-gradient" cx="45%" cy="38%" r="75%">
      <stop offset="0%" stop-color="${theme.skyStart}"/>
      <stop offset="52%" stop-color="${theme.skyMiddle}"/>
      <stop offset="100%" stop-color="${theme.skyEnd}"/>
    </radialGradient>
    <linearGradient id="title-gradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${theme.purple}"/>
      <stop offset="100%" stop-color="${theme.lilac}"/>
    </linearGradient>
    <clipPath id="map-clip"><circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS}"/></clipPath>
  </defs>

  <rect width="${width}" height="${height}" fill="${theme.background}"/>
  <rect x="${borderInset}" y="${borderInset}" width="${contentWidth}" height="${height - borderInset * 2}"
    fill="none" stroke="${theme.purple}" stroke-width="1.2" stroke-opacity="0.72"/>
  <g fill="none" stroke="${theme.lilac}" stroke-width="2" stroke-linecap="round" opacity="0.85">
    <path d="M ${borderInset + 16} ${borderInset + 32} V ${borderInset + 16} H ${borderInset + 32}"/>
    <path d="M ${width - borderInset - 32} ${borderInset + 16} H ${width - borderInset - 16} V ${borderInset + 32}"/>
    <path d="M ${borderInset + 16} ${height - borderInset - 32} V ${height - borderInset - 16} H ${borderInset + 32}"/>
    <path d="M ${width - borderInset - 32} ${height - borderInset - 16} H ${width - borderInset - 16} V ${height - borderInset - 32}"/>
  </g>

  <text x="${width / 2}" y="${titleY}" text-anchor="middle" font-family="Arial, sans-serif"
    font-size="27" font-weight="800" fill="${theme.ink}">O céu quando tudo começou</text>
  <rect x="${width / 2 - 28}" y="${titleLineY}" width="56" height="3" rx="1.5" fill="url(#title-gradient)"/>

  <g transform="translate(${mapX} ${mapY}) scale(${mapScale})">
    <circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS}" fill="url(#sky-gradient)" stroke="${theme.ink}" stroke-opacity="0.35" stroke-width="0.8"/>
    <g clip-path="url(#map-clip)">
      <circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS * 0.66}" fill="none" stroke="${theme.grid}" stroke-width="0.5" opacity="0.13"/>
      <circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS * 0.33}" fill="none" stroke="${theme.grid}" stroke-width="0.5" opacity="0.1"/>
      <line x1="${CENTER}" y1="${CENTER - RADIUS}" x2="${CENTER}" y2="${CENTER + RADIUS}" stroke="${theme.grid}" stroke-width="0.4" opacity="0.15"/>
      <line x1="${CENTER - RADIUS}" y1="${CENTER}" x2="${CENTER + RADIUS}" y2="${CENTER}" stroke="${theme.grid}" stroke-width="0.4" opacity="0.15"/>
      ${stars}
      ${constellationLines}
      ${namedStars}
    </g>
    <g font-family="Arial, sans-serif" font-size="10" font-weight="800" fill="${theme.ink}" opacity="0.8" text-anchor="middle">
      <text x="${CENTER}" y="14">N</text>
      <text x="${CENTER}" y="${MAP_SIZE - 5}">S</text>
      <text x="12" y="${CENTER + 3}">L</text>
      <text x="${MAP_SIZE - 12}" y="${CENTER + 3}">O</text>
    </g>
    <circle cx="${CENTER}" cy="${CENTER}" r="2" fill="${theme.ink}" opacity="0.85"/>
    <circle cx="${CENTER}" cy="${CENTER}" r="6" fill="none" stroke="${theme.lilac}" stroke-width="0.8" opacity="0.7"/>
  </g>

  ${dateCard}
  ${locationCard}

  <g>
    <rect x="${width / 2 - 170}" y="${coordinatesY}" width="340" height="38" rx="12"
      fill="${theme.card}" fill-opacity="${theme.cardOpacity}" stroke="${theme.purple}" stroke-opacity="0.38" stroke-width="1"/>
    <text x="${width / 2}" y="${coordinatesY + 24}" text-anchor="middle" font-family="Arial, sans-serif"
      font-size="12" font-weight="700" letter-spacing="0.8" fill="${theme.muted}">${safeCoordinates}</text>
  </g>

  <text x="${width / 2}" y="${footerY}" text-anchor="middle" font-family="Arial, sans-serif"
    font-size="14" font-weight="800" letter-spacing="2" fill="${theme.ink}">
    <tspan x="${width / 2}" dy="0">${couple.names.man} e ${couple.names.woman}</tspan>
  </text>
</svg>`;
}

const THEME_SWATCHES: { value: BackgroundTheme; color: string; border?: string }[] = [
  { value: "original", color: "#0B0B2B", border: "#C0A5FF" },
  { value: "white", color: "#FAF8F3", border: "#D8D3E3" },
  { value: "black", color: "#050505", border: "#555555" },
  { value: "forest", color: "#10251F", border: "#557866" },
];

export function StarMapExport({ date, location }: StarMapExportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sizeValue, setSizeValue] = useState<PosterSize>("30x40");
  const [showConstellationLines, setShowConstellationLines] = useState(true);
  const [showStarNames, setShowStarNames] = useState(true);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>("original");

  const selectedSize = POSTER_SIZES.find((item) => item.value === sizeValue) ?? POSTER_SIZES[1];

  const posterSvg = useMemo(
    () =>
      buildPosterSvg({
        date,
        location,
        size: selectedSize,
        showConstellationLines,
        showStarNames,
        backgroundTheme,
      }),
    [date, location, selectedSize, showConstellationLines, showStarNames, backgroundTheme],
  );
  const previewSvg = posterSvg.replace(/^<\?xml[^>]*\?>\s*/, "");

  function exportSvg() {
    const blob = new Blob([posterSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `nosso-ceu-${sizeValue}cm-${backgroundTheme}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-[#C0A5FF]/40 bg-[#C0A5FF]/10 px-6 py-3 text-sm font-bold text-[#FFF3D8] transition-colors hover:bg-[#C0A5FF]/20"
      >
        <Download size={17} />
        Exportar para quadro
      </button>

      {isOpen && createPortal(
            (
            <div
            className="fixed inset-0 z-10000 flex items-start justify-center overflow-y-auto bg-black/80 p-3 sm:items-center sm:p-5"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsOpen(false);
            }}
            >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="star-export-title"
                className="my-auto w-full max-w-6xl rounded-3xl border border-[#C0A5FF]/25 bg-[#10152F] p-4 text-[#FFF3D8] shadow-2xl sm:p-6"
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <h3 id="star-export-title" className="text-2xl font-black">
                    Preparar quadro
                    </h3>
                    <p className="mt-2 text-sm text-[#C5BEDD]">
                    Personalize o pôster e veja a prévia antes de baixar.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Fechar exportação"
                    className="rounded-full p-2 text-[#C5BEDD] transition-colors hover:bg-white/10"
                >
                    <X size={20} />
                </button>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(290px,0.85fr)_minmax(0,1.15fr)] lg:items-start">
                <div className="min-w-0 space-y-5">
                    <fieldset>
                    <legend className="mb-3 text-sm font-bold">Tamanho do quadro</legend>
                    <div className="grid grid-cols-2 gap-2">
                        {POSTER_SIZES.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            aria-pressed={sizeValue === item.value}
                            onClick={() => setSizeValue(item.value)}
                            className={`rounded-xl border p-3 text-left transition-colors ${
                            sizeValue === item.value
                                ? "border-[#C0A5FF] bg-[#C0A5FF]/15"
                                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                            }`}
                        >
                            <span className="block text-sm font-bold">{item.label}</span>
                            <span className="mt-1 block text-xs text-[#C5BEDD]">
                            {item.width / item.height <= 0.72 ? "Retrato estreito" : "Retrato"}
                            </span>
                        </button>
                        ))}
                    </div>
                    </fieldset>

                    <fieldset>
                    <legend className="mb-3 text-sm font-bold">Cor de fundo</legend>
                    <div className="grid grid-cols-2 gap-2">
                        {THEME_SWATCHES.map((theme) => (
                        <button
                            key={theme.value}
                            type="button"
                            aria-pressed={backgroundTheme === theme.value}
                            onClick={() => setBackgroundTheme(theme.value)}
                            className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-colors ${
                            backgroundTheme === theme.value
                                ? "border-[#C0A5FF] bg-[#C0A5FF]/10"
                                : "border-white/10 hover:bg-white/[0.05]"
                            }`}
                        >
                            <span
                            className="h-7 w-7 shrink-0 rounded-full border"
                            style={{ backgroundColor: theme.color, borderColor: theme.border }}
                            />
                            <span className="text-sm font-semibold">{THEMES[theme.value].label}</span>
                        </button>
                        ))}
                    </div>
                    </fieldset>

                    <fieldset className="space-y-3">
                    <legend className="mb-3 text-sm font-bold">Elementos do mapa</legend>
                    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 p-3.5">
                        <span>
                        <span className="block text-sm font-semibold">Linhas das constelações</span>
                        <span className="mt-1 block text-xs text-[#C5BEDD]">
                            Conecta as estrelas em cada constelação.
                        </span>
                        </span>
                        <input
                        type="checkbox"
                        checked={showConstellationLines}
                        onChange={(event) => setShowConstellationLines(event.target.checked)}
                        className="h-5 w-5 shrink-0 accent-[#C0A5FF]"
                        />
                    </label>

                    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 p-3.5">
                        <span>
                        <span className="block text-sm font-semibold">Nomes das estrelas</span>
                        <span className="mt-1 block text-xs text-[#C5BEDD]">
                            Exibe os nomes das estrelas conhecidas.
                        </span>
                        </span>
                        <input
                        type="checkbox"
                        checked={showStarNames}
                        onChange={(event) => setShowStarNames(event.target.checked)}
                        className="h-5 w-5 shrink-0 accent-[#C0A5FF]"
                        />
                    </label>
                    </fieldset>

                    <button
                    type="button"
                    onClick={exportSvg}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C0A5FF] px-5 py-3 font-black text-[#101025] transition-opacity hover:opacity-90"
                    >
                    <Download size={18} />
                    Baixar SVG
                    </button>
                    <p className="text-center text-xs leading-relaxed text-[#C5BEDD]">
                    Arquivo vetorial para impressão. As dimensões físicas serão definidas no SVG.
                    </p>
                </div>

                <div className="min-w-0">
                    <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="text-sm font-bold">Pré-visualização</h4>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#C5BEDD]">
                        {selectedSize.label}
                    </span>
                    </div>
                    <div className="max-h-[72vh] overflow-auto rounded-2xl border border-white/10 bg-[#080A19] p-3 sm:p-4">
                    <div
                        className="mx-auto w-full max-w-[440px] overflow-hidden shadow-2xl [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
                        style={{ aspectRatio: `${selectedSize.width} / ${selectedSize.height}` }}
                        dangerouslySetInnerHTML={{ __html: previewSvg }}
                    />
                    </div>
                </div>
                </div>
            </section>
            </div>
        ), document.body
      )}
    </>
  );
}
