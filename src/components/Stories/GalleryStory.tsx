import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Images,
    Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { couple } from "../../data/couple";
import { SideRibbon } from "../SideRibbon/SideRibbon";
import { StoryHeader } from "../StoryHeader/StoryHeader";

export function GalleryStory() {
    const gallery = couple.wrapped.gallery;

    const [currentGroup, setCurrentGroup] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [direction, setDirection] = useState(1);
    const [showSwipeHint, setShowSwipeHint] = useState(true);

    const group = gallery.photoStack[currentGroup];

    const totalPhotos = group.images.length;
    const totalGroups = gallery.photoStack.length;

    function nextPhoto() {
        if (currentPhoto < totalPhotos - 1) {
            setDirection(1);
            setCurrentPhoto((previous) => previous + 1);
            return;
        }

        if (currentGroup < totalGroups - 1) {
            setDirection(1);
            setCurrentGroup((previous) => previous + 1);
            setCurrentPhoto(0);
        }
    }

    function previousPhoto() {
        if (currentPhoto > 0) {
            setDirection(-1);
            setCurrentPhoto((previous) => previous - 1);
            return;
        }

        if (currentGroup > 0) {
            const previousGroupIndex = currentGroup - 1;
            const previousGroupPhotos =
                gallery.photoStack[previousGroupIndex].images.length;

            setDirection(-1);
            setCurrentGroup(previousGroupIndex);
            setCurrentPhoto(previousGroupPhotos - 1);
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
        info: { offset: { x: number }; velocity: { x: number } }
    ) {
        const swipeDistance = info.offset.x;
        const swipeVelocity = info.velocity.x;

        const shouldGoNext =
            swipeDistance < -100 || swipeVelocity < -500;

        const shouldGoPrevious =
            swipeDistance > 100 || swipeVelocity > 500;

        if (shouldGoNext) {
            nextPhoto();
            return;
        }

        if (shouldGoPrevious) {
            previousPhoto();
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full overflow-hidden bg-[#0b0b2b] text-[#fff3c7]"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#8064ff] blur-[100px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#8064ff] blur-[110px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.3 }}
                className="absolute right-[-100px] top-[30%] h-72 w-72 rounded-full bg-[#a875ff] blur-[110px]"
            />

            <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute left-[12%] top-[14%]"
            >
                <Sparkles
                    size={18}
                    fill="#fff3c7"
                    className="text-[#fff3c7]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute right-[18%] top-[12%]"
            >
                <Sparkles
                    size={11}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-[23%] left-[12%]"
            >
                <Sparkles
                    size={12}
                    fill="#a875ff"
                    className="text-[#a875ff]"
                />
            </motion.div>

            <SideRibbon text="NOSSOS MOMENTOS" />

            <div className="relative z-10 flex h-full w-full flex-col px-7 pb-8 pr-14 pt-8">
                <StoryHeader text="Nossos momentos" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentGroup}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35 }}
                        className="mt-7"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border-2 border-[#a875ff]/30 bg-[#a875ff]/10">
                                <Images
                                    size={19}
                                    className="text-[#a875ff]"
                                />
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-xl font-black tracking-[-0.02em] text-[#fff3c7]">
                                    {group.title}
                                </h2>

                                <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-[#fff3c7]/50">
                                    {group.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-5 flex items-center gap-1.5"
                >
                    {group.images.map((_, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                width: index === currentPhoto ? 28 : 6,
                                opacity: index === currentPhoto ? 1 : 0.3,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                            className="h-1.5 shrink-0 rounded-full bg-[#fff3c7]"
                        />
                    ))}
                </motion.div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center">
                    {group.images
                        .slice(currentPhoto + 1, currentPhoto + 3)
                        .map((image, index) => {
                            const stackIndex = index + 1;

                            return (
                                <motion.div
                                    key={`${image.src}-${currentPhoto}-${stackIndex}`}
                                    initial={{
                                        opacity: 0,
                                        scale: 1 - stackIndex * 0.05,
                                        y: stackIndex * 12,
                                        rotate:
                                            stackIndex % 2 === 0
                                                ? 4
                                                : -4,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1 - stackIndex * 0.05,
                                        y: stackIndex * 12,
                                        rotate:
                                            stackIndex % 2 === 0
                                                ? 4
                                                : -4,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.05,
                                    }}
                                    className="absolute w-[76%] overflow-hidden rounded-[26px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-1.5 shadow-2xl"
                                    style={{
                                        zIndex: 10 - stackIndex,
                                        aspectRatio: image.imageAspect,
                                    }}
                                >
                                    <img
                                        src={image.src}
                                        alt=""
                                        draggable={false}
                                        className="h-full w-full rounded-[20px] object-cover"
                                    />
                                </motion.div>
                            );
                        })}

                    <AnimatePresence
                        initial={false}
                        custom={direction}
                        mode="popLayout"
                    >
                        <motion.div
                            key={`${currentGroup}-${currentPhoto}`}
                            custom={direction}
                            initial={{
                                opacity: 0,
                                x: direction > 0 ? 300 : -300,
                                rotate: direction > 0 ? 8 : -8,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                rotate: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: direction > 0 ? -300 : 300,
                                rotate: direction > 0 ? -8 : 8,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            drag="x"
                            dragConstraints={{
                                left: 0,
                                right: 0,
                            }}
                            dragElastic={0.9}
                            onDragStart={() => setShowSwipeHint(false)}
                            onDragEnd={handleDragEnd}
                            className="absolute z-20 w-[76%] cursor-grab overflow-hidden rounded-[26px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm active:cursor-grabbing"
                            style={{
                                aspectRatio:
                                    group.images[currentPhoto].imageAspect,
                            }}
                        >
                            <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                                <img
                                    src={group.images[currentPhoto].src}
                                    alt={`${group.title} - foto ${
                                        currentPhoto + 1
                                    }`}
                                    draggable={false}
                                    className="h-full w-full select-none object-cover"
                                />

                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />

                                <div className="absolute bottom-3 right-3 rounded-full border border-[#fff3c7]/20 bg-[#0b0b2b]/60 px-3 py-1 backdrop-blur-md">
                                    <span className="text-[10px] font-black tracking-[0.12em] text-[#fff3c7]/80">
                                        {currentPhoto + 1} / {totalPhotos}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence>
                        {showSwipeHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{
                                    delay: 1.4,
                                    duration: 0.4,
                                }}
                                className="pointer-events-none absolute bottom-[7%] left-1/2 z-30 -translate-x-1/2"
                            >
                                <div className="flex items-center gap-2 rounded-full border border-[#fff3c7]/10 bg-[#0b0b2b]/75 px-4 py-2 backdrop-blur-md">
                                    <ChevronLeft
                                        size={15}
                                        className="text-[#a875ff]"
                                    />

                                    <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff3c7]/70">
                                        Deslize para ver mais
                                    </span>

                                    <ChevronRight
                                        size={15}
                                        className="text-[#a875ff]"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between"
                >
                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={previousGroup}
                        disabled={currentGroup === 0}
                        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#fff3c7]/10 bg-white/[0.04] text-[#fff3c7] backdrop-blur-sm transition disabled:cursor-not-allowed disabled:opacity-20"
                        aria-label="Grupo anterior"
                    >
                        <ChevronLeft size={23} />
                    </motion.button>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a875ff]">
                            momentos
                        </span>

                        <span className="mt-0.5 text-sm font-bold text-[#fff3c7]/45">
                            {currentGroup + 1} / {totalGroups}
                        </span>
                    </div>

                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={nextGroup}
                        disabled={currentGroup === totalGroups - 1}
                        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#fff3c7]/10 bg-white/[0.04] text-[#fff3c7] backdrop-blur-sm transition disabled:cursor-not-allowed disabled:opacity-20"
                        aria-label="Próximo grupo"
                    >
                        <ChevronRight size={23} />
                    </motion.button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{
                    delay: 0.8,
                    duration: 0.7,
                    type: "spring",
                }}
                className="pointer-events-none absolute bottom-[14%] right-[7%] z-0"
            >
                <div className="relative h-20 w-20 rounded-[24px] border-2 border-[#a875ff]/40">
                    <div className="absolute inset-3 rounded-[16px] bg-[#a875ff]/10" />

                    <Heart
                        size={29}
                        fill="#a875ff"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#a875ff]"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}