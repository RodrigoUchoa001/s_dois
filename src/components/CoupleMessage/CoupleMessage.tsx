import { AnimatePresence, motion } from "motion/react";
import { Heart, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { couple } from "../../data/couple";

export function CoupleMessage() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const expandedMessage = isOpen
        ? createPortal(
              <AnimatePresence>
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[9998] flex h-[100dvh] w-[100vw] items-center justify-center overflow-hidden bg-[#0b0b2b]"
                  >
                      {/* Glows */}
                      <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 0.2, scale: 1 }}
                          transition={{ duration: 1.2 }}
                          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#8064ff] blur-[120px]"
                      />

                      <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 0.14, scale: 1 }}
                          transition={{ duration: 1.3, delay: 0.15 }}
                          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#a875ff] blur-[120px]"
                      />

                      {/* Estrelas */}
                      <Sparkles
                          size={18}
                          fill="#fff3c7"
                          className="pointer-events-none absolute left-[10%] top-[15%] text-[#fff3c7]"
                      />

                      <Sparkles
                          size={12}
                          fill="#a875ff"
                          className="pointer-events-none absolute right-[13%] top-[20%] text-[#a875ff]"
                      />

                      <Sparkles
                          size={11}
                          fill="#a875ff"
                          className="pointer-events-none absolute bottom-[15%] left-[12%] text-[#a875ff]"
                      />

                      {/* Fechar */}
                      <motion.button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.08 }}
                          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#fff3c7]/10 bg-white/[0.05] text-[#fff3c7]/70 backdrop-blur-md transition hover:text-[#fff3c7]"
                          aria-label="Fechar mensagem"
                      >
                          <X size={23} />
                      </motion.button>

                      {/* Conteúdo */}
                      <motion.div
                          initial={{ opacity: 0, y: 30, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.98 }}
                          transition={{
                              duration: 0.5,
                              type: "spring",
                              stiffness: 100,
                              damping: 18,
                          }}
                          className="relative z-10 flex h-full w-full max-w-3xl flex-col px-7 pb-12 pt-24"
                      >
                          <div className="mb-8 flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border-2 border-[#a875ff]/30 bg-[#a875ff]/10">
                                  <Heart
                                      size={19}
                                      fill="#a875ff"
                                      className="text-[#a875ff]"
                                  />
                              </div>

                              <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a875ff]">
                                      uma mensagem
                                  </p>

                                  <h2 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#fff3c7]">
                                      Especial para você
                                  </h2>
                              </div>
                          </div>

                          <div className="min-h-0 flex-1 overflow-y-auto rounded-[32px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-md md:p-10  scrollbar-none">
                              <p className="whitespace-pre-line text-xl font-bold leading-relaxed tracking-[-0.02em] text-[#fff3c7]/90 md:text-2xl">
                                  {couple.message}
                              </p>
                          </div>
                      </motion.div>
                  </motion.div>
              </AnimatePresence>,
              document.body
          )
        : null;

    return (
        <>
            {/* Card */}
            <motion.div
                layout
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="relative cursor-pointer overflow-hidden rounded-[28px] border-2 border-[#fff3c7]/10 bg-white/[0.04] p-6 text-[#fff3c7] shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                onClick={() => setIsOpen(true)}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                    }}
                    className="absolute -right-2 -top-2"
                >
                    <Heart
                        size={20}
                        fill="#a875ff"
                        className="rotate-12 text-[#a875ff]"
                    />
                </motion.div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className="h-[2px] w-7 bg-[#a875ff]" />

                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a875ff]">
                            mensagem
                        </span>
                    </div>

                    <h2 className="mt-3 text-2xl font-black tracking-[-0.03em]">
                        Uma mensagem especial
                    </h2>

                    <div className="mt-7">
                        <p className="line-clamp-4 whitespace-pre-line text-lg font-bold leading-relaxed text-[#fff3c7]/75">
                            {couple.message}
                        </p>
                    </div>

                    <motion.button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsOpen(true);
                        }}
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        className="mt-8 flex w-full items-center justify-center rounded-full bg-[#a875ff] px-6 py-3.5 text-sm font-black text-[#fff3c7] shadow-[0_8px_25px_rgba(168,117,255,0.2)]"
                    >
                        Mostrar mensagem
                    </motion.button>
                </div>
            </motion.div>

            {expandedMessage}
        </>
    );
}