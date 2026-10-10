import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ProductCard } from "./ProductCard.jsx";
import { useProducts } from "@/Features/ManageProducts.js";
import { Skeleton } from "@/components/ui/skeleton.jsx";

import "swiper/css";

export const ProductSlider = () => {
    const { products, isLoading } = useProducts();

    // وضعیت لودینگ: نمایش اسکلتون‌های هم‌اندازه با کارت‌های اسلایدر
    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto px-4 pb-6 font-irancell_semibold">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4 py-2 px-5">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-md flex flex-col justify-between gap-y-3"
                        >
                            <div className="space-y-3">
                                <Skeleton className="w-full h-24 sm:h-32 rounded-xl" />
                                <Skeleton className="h-4 w-3/4 rounded" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-2.5 w-full rounded" />
                                    <Skeleton className="h-2.5 w-4/5 rounded" />
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                <Skeleton className="h-3 w-12 rounded" />
                                <Skeleton className="h-7 w-20 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pb-6 relative group/slider font-irancell_semibold">
            <Swiper
                modules={[Navigation, Autoplay]}
                dir="rtl"
                loop={products.length >= 4}
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
                className="!py-2 !px-5"
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductCard product={item} />
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
                className="absolute hover:scale-110 left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed cursor-pointer md:opacity-0 md:group-hover/slider:opacity-100"
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
