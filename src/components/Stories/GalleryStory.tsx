
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Images,
    Sparkles,
    Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { couple } from "../../data/couple";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "./StoryHeader";

const CREAM = "#fff3c7";
const LILAC = "#a875ff";

export function GalleryStory() {
    const gallery = couple.wrapped.gallery;

    const [currentGroup, setCurrentGroup] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [direction, setDirection] = useState(1);
    const [showSwipeHint, setShowSwipeHint] = useState(true);

    const group = gallery.photoStack[currentGroup];
    const totalGroups = gallery.photoStack.length;
    const totalPhotos = group.images.length;
    const currentImage = group.images[currentPhoto];

    function nextPhoto() {
        if (currentPhoto < totalPhotos - 1) {
            setDirection(1);
            setCurrentPhoto((previous) => previous + 1);
        } else if (currentGroup < totalGroups - 1) {
            setDirection(1);
            setCurrentGroup((previous) => previous + 1);
            setCurrentPhoto(0);
        }
    }

    function previousPhoto() {
        if (currentPhoto > 0) {
            setDirection(-1);
            setCurrentPhoto((previous) => previous - 1);
        } else if (currentGroup > 0) {
            const previousGroupIndex = currentGroup - 1;
            const previousGroup =
                gallery.photoStack[previousGroupIndex];

            setDirection(-1);
            setCurrentGroup(previousGroupIndex);
            setCurrentPhoto(previousGroup.images.length - 1);
        }
    }

    function nextGroup() {
        if (currentGroup < totalGroups - 1) {
            setDirection(1);
            setCurrentGroup((previous) => previous + 1);
            setCurrentPhoto(0);
        }
    }

    function previousGroup() {
        if (currentGroup > 0) {
            setDirection(-1);
            setCurrentGroup((previous) => previous - 1);
            setCurrentPhoto(0);
        }
    }

    function handleDragEnd(
        _: MouseEvent | TouchEvent | PointerEvent,
        info: { offset: { x: number }; velocity: { x: number } },
    ) {
        setShowSwipeHint(false);

        if (info.offset.x < -90 || info.velocity.x < -450) {
            nextPhoto();
        } else if (
            info.offset.x > 90 ||
            info.velocity.x > 450
        ) {
            previousPhoto();
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="
                relative h-full w-full overflow-hidden
                bg-[#0b0b2b] text-[#fff3c7]
            "
        >
            {/* FUNDO */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute -left-32 -top-28 h-80 w-80
                        rounded-full bg-[#8064ff]/15 blur-[100px]
                    "
                />
                <div
                    className="
                        absolute -bottom-36 -right-28 h-96 w-96
                        rounded-full bg-[#a875ff]/10 blur-[110px]
                    "
                />
                <div
                    className="
                        absolute left-1/2 top-[42%]
                        h-72 w-72 -translate-x-1/2
                        rounded-full bg-[#8064ff]/[0.07]
                        blur-[100px]
                    "
                />

                {/* Pontinhos que lembram um céu noturno */}

                {[
                    { x: "12%", y: "22%", s: 2 },
                    { x: "82%", y: "17%", s: 3 },
                    { x: "89%", y: "38%", s: 2 },
                    { x: "9%", y: "62%", s: 2 },
                    { x: "77%", y: "76%", s: 2 },
                    { x: "22%", y: "84%", s: 3 },
                    { x: "68%", y: "10%", s: 2 },
                ].map((star, index) => (
                    <motion.div
                        key={index}
                        animate={{ opacity: [0.25, 0.8, 0.25] }}
                        transition={{
                            duration: 2.5 + index * 0.35,
                            repeat: Infinity,
                            delay: index * 0.3,
                        }}
                        className="
                            absolute rounded-full
                            bg-[#c4aaff]
                        "
                        style={{
                            left: star.x,
                            top: star.y,
                            width: star.s,
                            height: star.s,
                        }}
                    />
                ))}
            </div>

            <SideRibbon text="NOSSOS MOMENTOS" />

            <div className="relative z-10 flex h-full w-full flex-col px-6 pb-6 pr-14 pt-7">
                <StoryHeader text="Nossos momentos" />

                {/* CABEÇALHO DA PÁGINA DO ÁLBUM */}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentGroup}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-5"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="mb-2 flex items-center gap-2">
                                    <span
                                        className="
                                            flex h-7 w-7 items-center
                                            justify-center rounded-lg
                                            border border-[#a875ff]/25
                                            bg-[#a875ff]/10
                                        "
                                    >
                                        <Images
                                            size={14}
                                            className="text-[#c4aaff]"
                                        />
                                    </span>

                                    <span
                                        className="
                                            text-[9px] font-black
                                            uppercase tracking-[0.24em]
                                            text-[#c4aaff]
                                        "
                                    >
                                        Álbum de memórias
                                    </span>
                                </div>

                                <h2 className="text-xl font-black leading-tight tracking-tight text-[#fff3c7]">
                                    {group.title}
                                </h2>

                                <p className="mt-1.5 max-w-[270px] text-xs leading-relaxed text-[#fff3c7]/55">
                                    {group.description}
                                </p>
                            </div>

                            <motion.div
                                animate={{ rotate: [8, 14, 8] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    mt-1 shrink-0 rounded-xl
                                    border border-[#a875ff]/20
                                    bg-[#a875ff]/[0.07] p-2.5
                                "
                            >
                                <Heart
                                    size={20}
                                    fill="#a875ff"
                                    className="text-[#a875ff]"
                                />
                            </motion.div>
                        </div>

                        {/* PROGRESSO DAS FOTOS */}

                        <div className="mt-4 flex items-center gap-1.5">
                            {group.images.map((_, index) => (
                                <div
                                    key={index}
                                    className="
                                        h-1 flex-1 overflow-hidden
                                        rounded-full bg-white/10
                                    "
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scaleX:
                                                index <= currentPhoto
                                                    ? 1
                                                    : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="
                                            h-full origin-left rounded-full
                                            bg-[#a875ff]
                                        "
                                        style={{
                                            boxShadow:
                                                index === currentPhoto
                                                    ? "0 0 10px rgba(168,117,255,0.6)"
                                                    : "none",
                                        }}
                                    />
                                </div>
                            ))}

                            <span className="ml-1 whitespace-nowrap text-[10px] font-bold tabular-nums text-[#fff3c7]/50">
                                {String(currentPhoto + 1).padStart(2, "0")}
                                <span className="mx-0.5 text-[#a875ff]">
                                    /
                                </span>
                                {String(totalPhotos).padStart(2, "0")}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ÁREA DO SCRAPBOOK */}

                <div className="relative flex min-h-0 flex-1 items-center justify-center">
                    {/* MARCAÇÕES DECORATIVAS AO REDOR DO ÁLBUM */}

                    <motion.div
                        animate={{ rotate: [0, 8, 0], y: [0, -4, 0] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            pointer-events-none absolute left-[2%]
                            top-[12%] z-0 -rotate-12
                        "
                    >
                        <div className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-full border border-dashed border-[#a875ff]/40 bg-[#a875ff]/[0.07]">
                            <Star
                                size={15}
                                fill="#a875ff"
                                className="text-[#a875ff]"
                            />
                            <span className="mt-1 text-[7px] font-black uppercase tracking-[0.13em] text-[#c4aaff]">
                                especiais
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ rotate: [-7, -2, -7] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            pointer-events-none absolute right-[1%]
                            top-[18%] z-0
                        "
                    >
                        <Sparkles
                            size={23}
                            className="text-[#a875ff]/65"
                        />
                    </motion.div>

                    {/* PÁGINAS E FOTOS ANTERIORES */}

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        {group.images
                            .slice(currentPhoto + 1, currentPhoto + 3)
                            .map((image, index) => {
                                const layer = index + 1;
                                const rotation =
                                    layer === 1 ? 7 : -8;
                                const scale =
                                    layer === 1 ? 0.94 : 0.88;

                                return (
                                    <motion.div
                                        key={`${currentGroup}-${currentPhoto}-${image.src}`}
                                        initial={{
                                            opacity: 0,
                                            scale: scale - 0.05,
                                            rotate: rotation + 5,
                                            y: 22 * layer,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale,
                                            rotate: rotation,
                                            y: 16 * layer,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                            y: 35,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            delay: index * 0.06,
                                        }}
                                        className="
                                            absolute w-[78%]
                                            rounded-sm bg-[#e9e0ff]
                                            p-2 pb-3
                                            shadow-[0_18px_45px_rgba(0,0,0,0.3)]
                                        "
                                        style={{
                                            zIndex: 5 - layer,
                                            aspectRatio:
                                                image.imageAspect,
                                        }}
                                    >
                                        <img
                                            src={image.src}
                                            alt=""
                                            draggable={false}
                                            className="
                                                h-full w-full
                                                object-cover
                                            "
                                        />
                                    </motion.div>
                                );
                            })}
                    </div>

                    {/* FOTO PRINCIPAL EM MOLDURA POLAROID */}

                    <AnimatePresence
                        initial={false}
                        mode="popLayout"
                    >
                        <motion.div
                            key={`${currentGroup}-${currentPhoto}`}
                            initial={{
                                opacity: 0,
                                x: direction > 0 ? 260 : -260,
                                rotate: direction > 0 ? 9 : -9,
                                scale: 0.92,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                rotate: currentPhoto % 2 === 0 ? -2 : 2,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                x: direction > 0 ? -220 : 220,
                                rotate: direction > 0 ? -10 : 10,
                                scale: 0.9,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 280,
                                damping: 27,
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.85}
                            onDragStart={() => setShowSwipeHint(false)}
                            onDragEnd={handleDragEnd}
                            className="
                                relative z-20 w-[82%]
                                cursor-grab touch-pan-y
                                active:cursor-grabbing
                            "
                            style={{
                                aspectRatio: currentImage.imageAspect,
                            }}
                        >
                            {/* SOMBRA DA POLAROID */}

                            <div
                                className="
                                    absolute inset-0 translate-y-2
                                    rounded-sm bg-[#8064ff]/20
                                    blur-md
                                "
                            />

                            {/* PAPEL DA POLAROID */}

                            <div
                                className="
                                    relative h-full w-full
                                    rounded-sm bg-[#f5efff]
                                    p-2 pb-3
                                    shadow-[0_25px_65px_rgba(0,0,0,0.45)]
                                "
                            >
                                {/* FITA ADESIVA */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -8,
                                        rotate: -8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        rotate: -5,
                                    }}
                                    transition={{
                                        delay: 0.25,
                                        duration: 0.3,
                                    }}
                                    className="
                                        pointer-events-none absolute
                                        -top-3 left-1/2 z-30
                                        h-7 w-[72px]
                                        -translate-x-1/2
                                        rotate-[-5deg]
                                        border-x border-white/10
                                        bg-[#b8a4ff]/75
                                        shadow-sm
                                    "
                                    style={{
                                        clipPath:
                                            "polygon(3% 0, 97% 0, 100% 100%, 0 92%)",
                                    }}
                                />

                                {/* FOTOGRAFIA */}

                                <div className="relative h-full w-full overflow-hidden bg-[#171536]">
                                    <img
                                        src={currentImage.src}
                                        alt={`${group.title} — foto ${currentPhoto + 1}`}
                                        draggable={false}
                                        className="
                                            h-full w-full select-none
                                            object-cover
                                        "
                                    />

                                    {/* EFEITO DE FOTO REVELADA */}

                                    <div
                                        className="
                                            pointer-events-none absolute
                                            inset-0 border border-black/5
                                        "
                                    />

                                    {/* SELO DECORATIVO */}

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                            rotate: -20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 10,
                                        }}
                                        transition={{
                                            delay: 0.35,
                                            type: "spring",
                                        }}
                                        className="
                                            pointer-events-none absolute
                                            bottom-3 left-3
                                            flex h-9 w-9 items-center
                                            justify-center rounded-full
                                            border border-white/50
                                            bg-[#0b0b2b]/55
                                            backdrop-blur-sm
                                        "
                                    >
                                        <Heart
                                            size={16}
                                            fill={CREAM}
                                            className="text-[#fff3c7]"
                                        />
                                    </motion.div>
                                </div>

                                {/* LEGENDA ESCRITA NO PAPEL */}

                                <div
                                    className="
                                        absolute inset-x-2 bottom-0
                                        flex h-[15%] min-h-[28px]
                                        items-center justify-between
                                        gap-2 px-1
                                    "
                                >
                                    <span
                                        className="
                                            truncate text-[10px]
                                            font-semibold italic
                                            tracking-wide text-[#46376e]
                                        "
                                    >
                                        {group.title}
                                    </span>

                                    <span
                                        className="
                                            shrink-0 text-[9px]
                                            font-bold tracking-wider
                                            text-[#8064ff]/80
                                        "
                                    >
                                        ♥ {currentPhoto + 1}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* DICA DE INTERAÇÃO */}

                    <AnimatePresence>
                        {showSwipeHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ delay: 1, duration: 0.4 }}
                                className="
                                    pointer-events-none absolute
                                    bottom-[3%] left-1/2 z-30
                                    -translate-x-1/2
                                "
                            >
                                <div
                                    className="
                                        flex items-center gap-2
                                        whitespace-nowrap rounded-full
                                        border border-[#a875ff]/20
                                        bg-[#0b0b2b]/80 px-3.5 py-2
                                        shadow-lg backdrop-blur-md
                                    "
                                >
                                    <ChevronLeft
                                        size={13}
                                        className="text-[#c4aaff]"
                                    />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#fff3c7]/70">
                                        Folheie nossas memórias
                                    </span>
                                    <ChevronRight
                                        size={13}
                                        className="text-[#c4aaff]"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* PEQUENA ANOTAÇÃO DECORATIVA */}

                    <motion.div
                        initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 6, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="
                            pointer-events-none absolute
                            bottom-[12%] right-[1%] z-10
                            hidden sm:block
                        "
                    >
                        <div
                            className="
                                flex h-[54px] w-[65px]
                                flex-col items-center justify-center
                                rounded-sm border border-[#a875ff]/20
                                bg-[#a875ff]/10
                                shadow-lg backdrop-blur-sm
                            "
                        >
                            <Heart
                                size={13}
                                fill={LILAC}
                                className="text-[#a875ff]"
                            />
                            <span className="mt-1 text-[7px] font-black uppercase tracking-[0.12em] text-[#c4aaff]">
                                para sempre
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* NAVEGAÇÃO DO ÁLBUM */}

                <div className="relative z-30 flex items-center justify-between gap-3 pt-2">
                    <motion.button
                        type="button"
                        whileHover={
                            currentGroup > 0 ? { scale: 1.07 } : undefined
                        }
                        whileTap={{ scale: 0.92 }}
                        onClick={previousGroup}
                        disabled={currentGroup === 0}
                        aria-label="Álbum anterior"
                        className="
                            flex h-10 w-10 shrink-0 items-center
                            justify-center rounded-full
                            border border-[#a875ff]/25
                            bg-[#a875ff]/[0.07]
                            text-[#c4aaff]
                            transition-colors
                            hover:border-[#a875ff]/55
                            hover:bg-[#a875ff]/15
                            disabled:cursor-not-allowed
                            disabled:opacity-25
                        "
                    >
                        <ChevronLeft size={20} />
                    </motion.button>

                    <div className="flex min-w-0 flex-1 flex-col items-center">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-5 bg-[#a875ff]/30" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#c4aaff]">
                                Página {String(currentGroup + 1).padStart(2, "0")}
                            </span>
                            <span className="h-px w-5 bg-[#a875ff]/30" />
                        </div>

                        <div className="mt-2 flex max-w-full items-center justify-center gap-1.5">
                            {gallery.photoStack.map((_, index) => (
                                <motion.button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        setDirection(
                                            index > currentGroup ? 1 : -1,
                                        );
                                        setCurrentGroup(index);
                                        setCurrentPhoto(0);
                                    }}
                                    aria-label={`Abrir álbum ${index + 1}`}
                                    aria-current={
                                        index === currentGroup
                                            ? "step"
                                            : undefined
                                    }
                                    animate={{
                                        width:
                                            index === currentGroup ? 18 : 5,
                                        opacity:
                                            index === currentGroup ? 1 : 0.35,
                                    }}
                                    whileTap={{ scale: 0.85 }}
                                    className="
                                        h-1.5 rounded-full
                                        bg-[#a875ff]
                                    "
                                />
                            ))}
                        </div>
                    </div>

                    <motion.button
                        type="button"
                        whileHover={
                            currentGroup < totalGroups - 1
                                ? { scale: 1.07 }
                                : undefined
                        }
                        whileTap={{ scale: 0.92 }}
                        onClick={nextGroup}
                        disabled={currentGroup === totalGroups - 1}
                        aria-label="Próximo álbum"
                        className="
                            flex h-10 w-10 shrink-0 items-center
                            justify-center rounded-full
                            border border-[#a875ff]/25
                            bg-[#a875ff]/[0.07]
                            text-[#c4aaff]
                            transition-colors
                            hover:border-[#a875ff]/55
                            hover:bg-[#a875ff]/15
                            disabled:cursor-not-allowed
                            disabled:opacity-25
                        "
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
