import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export const ProductCard = ({ product }) => {
    const title = product?.name;
    const description =
        product?.summary_description ||
        product?.description ||
        "تجهیزات تست و آزمایشگاهی صنعتی ساخت شرکت پارس‌اهرم با بالاترین استانداردهای کیفی";
    const code = product?.code || "PA-400";
    const cover = product?.cover;
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (product?.id) {
            navigate(`/product/${product.id}`);
        } else if (product?.src) {
            navigate(`/${product.src}`);
        }
    };

    return (
        <Card className="relative w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-y-3 group/card">
            <div className="flex flex-col group/img gap-y-3 cursor-pointer" onClick={handleNavigate}>
                <div className="relative w-full h-24 sm:h-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/60 p-2 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    {cover ? (
                        <img
                            src={cover}
                            alt={title}
                            className="h-full object-contain group-hover/img:scale-105 transition-transform duration-200"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src="/logo/logo.png"
                                alt="پارس اهرم"
                                className="h-10 sm:h-12 w-auto object-contain opacity-30 dark:opacity-25 grayscale group-hover/img:scale-110 group-hover/img:opacity-45 transition-all duration-300 select-none"
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-y-1">
                    <h3 className="text-[11px] sm:text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1  transition-colors">
                        {title}
                    </h3>
                    <p className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500">
                    کد: <span className="font-mono">{code}</span>
                </span>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleNavigate}
                    className="h-auto group/btn inline-flex items-center gap-x-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[8px] sm:text-[10px] text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer font-irancell_semibold"
                >
                    <span>اطلاعات بیشتر</span>
                    <ArrowLeft className="sm:w-3 w-2 h-2 sm:h-3 transition-transform group-hover/btn:-translate-x-0.5" />
                </Button>
            </div>
        </Card>
    );
};
