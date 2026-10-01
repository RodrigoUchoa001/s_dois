import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { couple } from "../../data/couple";

export function GalleryStory() {
    const gallery = couple.wrapped.gallery;

    const [currentGroup, setCurrentGroup] = useState(0);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [direction, setDirection] = useState(1);

    const group = gallery.photoStack[currentGroup];

    const totalPhotos = group.images.length;
    const totalGroups = gallery.photoStack.length;

    /*
     * Próxima foto
     */
    function nextPhoto() {
        if (currentPhoto < totalPhotos - 1) {
            setDirection(1);
            setCurrentPhoto((previous) => previous + 1);
        }
        if (currentPhoto === totalPhotos - 1 && currentGroup < totalGroups - 1) {
            nextGroup();
        }
    }

    /*
     * Foto anterior
     */
    function previousPhoto() {
        if (currentPhoto > 0) {
            setDirection(-1);
            setCurrentPhoto((previous) => previous - 1);
        }
    }

    /*
     * Próximo grupo
     */
    function nextGroup() {
        if (currentGroup < totalGroups - 1) {
            setCurrentGroup((previous) => previous + 1);
            setCurrentPhoto(0);
            setDirection(1);
        }
    }

    /*
     * Grupo anterior
     */
    function previousGroup() {
        if (currentGroup > 0) {
            setCurrentGroup((previous) => previous - 1);
            setCurrentPhoto(0);
            setDirection(-1);
        }
    }

    /*
     * Quando termina o drag da carta
     */
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
        }

        if (shouldGoPrevious) {
            previousPhoto();
        }
    }

    return (
        <div className="flex h-full w-full flex-col px-5 pb-5 pt-16">
            {/* Cabeçalho */}
            <div className="text-center">
                <motion.p
                    key={`group-${currentGroup}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold"
                >
                    {group.title}
                </motion.p>

                <motion.p
                    key={`description-${currentGroup}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/50"
                >
                    {group.description}
                </motion.p>
            </div>

            {/* Indicador de fotos */}
            <div className="mt-5 flex justify-center gap-1.5">
                {group.images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentPhoto
                                ? "w-6 bg-white"
                                : "w-1.5 bg-white/30"
                        }`}
                    />
                ))}
            </div>

            {/* Área das cartas */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
                {/* Cartas atrás */}
                {group.images
                    .slice(currentPhoto + 1, currentPhoto + 3)
                    .map((image, index) => {
                        const stackIndex = index + 1;

                        return (
                            <motion.div
                                key={`${image}-${currentPhoto}-${stackIndex}`}
                                initial={{
                                    scale: 1 - stackIndex * 0.05,
                                    y: stackIndex * 10,
                                    rotate:
                                        stackIndex % 2 === 0
                                            ? 4
                                            : -4,
                                }}
                                animate={{
                                    scale: 1 - stackIndex * 0.05,
                                    y: stackIndex * 10,
                                    rotate:
                                        stackIndex % 2 === 0
                                            ? 4
                                            : -4,
                                }}
                                className="absolute aspect-[3/4] w-[75%] overflow-hidden rounded-2xl bg-[#333] shadow-2xl"
                                style={{
                                    zIndex: 10 - stackIndex,
                                }}
                            >
                                <img
                                    src={image}
                                    alt=""
                                    draggable={false}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        );
                    })}

                {/* Carta atual */}
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
                            rotate:
                                direction > 0 ? 8 : -8,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            rotate: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: direction > 0 ? -300 : 300,
                            rotate:
                                direction > 0 ? -8 : 8,
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
                        onDragEnd={handleDragEnd}
                        className="absolute z-20 aspect-[3/4] w-[75%] cursor-grab overflow-hidden rounded-2xl bg-[#333] shadow-2xl active:cursor-grabbing"
                    >
                        <img
                            src={group.images[currentPhoto]}
                            alt={`${group.title} - foto ${
                                currentPhoto + 1
                            }`}
                            draggable={false}
                            className="h-full w-full select-none object-cover"
                        />

                        {/* Gradiente inferior */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navegação entre grupos */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={previousGroup}
                    disabled={currentGroup === 0}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-20"
                    aria-label="Grupo anterior"
                >
                    <ChevronLeft size={28} />
                </button>

                {/* Indicador de grupo */}
                <span className="text-sm text-white/40">
                    {currentGroup + 1} / {totalGroups}
                </span>

                <button
                    type="button"
                    onClick={nextGroup}
                    disabled={currentPhoto === totalPhotos - 1 && currentGroup === totalGroups - 1}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-20"
                    aria-label="Próximo grupo"
                >
                    <ChevronRight size={28} />
                </button>
            </div>
        </div>
    );
}