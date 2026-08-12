import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ProductCard } from "./ProductCard.jsx";

import "swiper/css";

export const ProductSlider = () => {
    const products = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pb-6 relative group/slider font-irancell_semibold">
            <Swiper
                modules={[Navigation, Autoplay]}
                dir="rtl"
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={{
                    nextEl: "#slider-next-btn",
                    prevEl: "#slider-prev-btn",
                }}
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 12 },
                    768: { slidesPerView: 4, spaceBetween: 16 },
                    1024: { slidesPerView: 4, spaceBetween: 16 },
                }}
                className="!py-2"
            >
                {products.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard />
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                id="slider-prev-btn"
                type="button"
                className="absolute hover:scale-110 right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed cursor-pointer md:opacity-0 md:group-hover/slider:opacity-100"
                aria-label="Previous slide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="md:w-5 w-4 h-4 md:h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            <button
                id="slider-next-btn"
                type="button"
                className="absolute  hover:scale-110 left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed cursor-pointer md:opacity-0 md:group-hover/slider:opacity-100"
                aria-label="Next slide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="md:w-5 w-4 h-4 md:h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
        </div>
    );
};