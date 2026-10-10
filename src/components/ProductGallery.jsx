import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toPersianDigits } from "@/utils/numberHelper.js";

export const ProductGallery = ({ images = [], productTitle = "" }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mainPrevEl, setMainPrevEl] = useState(null);
    const [mainNextEl, setMainNextEl] = useState(null);
    const [thumbPrevEl, setThumbPrevEl] = useState(null);
    const [thumbNextEl, setThumbNextEl] = useState(null);

    return (
        <div className="w-full md:max-w-80 p-3.5 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xl dark:shadow-2xl backdrop-blur-sm shrink-0">
            <div className="relative group mb-3 rounded-xl overflow-hidden bg-slate-800 dark:bg-gradient-to-b dark:from-slate-800/80 dark:to-slate-950/80 border border-slate-200 dark:border-slate-700/50 p-2">
                <Badge
                    variant="secondary"
                    className="absolute select-none top-3 left-3 z-10 font-irancell_semibold text-[11px] bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 backdrop-blur-md shadow-sm pointer-events-none"
                >
                    {toPersianDigits(activeIndex + 1)} / {toPersianDigits(images.length)}
                </Badge>

                <button
                    ref={(node) => setMainPrevEl(node)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-emerald-600 hover:text-white disabled:opacity-0 shadow-sm"
                    aria-label="عکس قبلی"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>

                <button
                    ref={(node) => setMainNextEl(node)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-emerald-600 hover:text-white disabled:opacity-0 shadow-sm"
                    aria-label="عکس بعدی"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <Swiper
                    spaceBetween={10}
                    navigation={{ prevEl: mainPrevEl, nextEl: mainNextEl }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="w-full aspect-square ![&_.swiper-wrapper]:h-full"
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index} className="!h-full">
                            <div className="w-full h-full flex items-center justify-center">
                                <img
                                    src={src}
                                    alt={`${productTitle} - تصویر ${index + 1}`}
                                    className="max-h-56 w-[75%] object-contain drop-shadow-md dark:drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="relative flex items-center gap-1.5 px-0.5">
                <button
                    ref={(node) => setThumbPrevEl(node)}
                    className="shrink-0 w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="تامبنیل قبلی"
                >
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex-1 overflow-hidden">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={8}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        navigation={{ prevEl: thumbPrevEl, nextEl: thumbNextEl }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="![&_.swiper-wrapper]:h-full"
                    >
                        {images.map((src, index) => (
                            <SwiperSlide key={index} className="cursor-pointer">
                                <div
                                    className={`p-1 rounded-lg border transition-all duration-200 bg-slate-100/70 dark:bg-slate-950/60 aspect-square flex items-center justify-center ${
                                        activeIndex === index
                                            ? "border-emerald-500 ring-2 ring-emerald-500/20 opacity-100 scale-95"
                                            : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-600"
                                    }`}
                                >
                                    <img
                                        src={src}
                                        alt={`تامبنیل ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <button
                    ref={(node) => setThumbNextEl(node)}
                    className="shrink-0 w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="تامبنیل بعدی"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
