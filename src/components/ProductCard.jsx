    import { Button } from "./Button.jsx";

    export const ProductCard = () => {
        return (
            <div className="  relative w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 shadow-md hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-y-3">

                <div className="flex flex-col group/img gap-y-3">
                    <div className="relative w-full h-24 sm:h-32 shrink-0 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800/60 p-1 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                        <img
                            src="/Freezer-With-Door-removebg-preview.png"
                            alt="دستگاه فریزر آزمایشگاهی"
                            className="h-full object-contain group-hover/img:scale-105 transition-transform duration-200"
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <h3 className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                            فریزر ایستاده درب‌دار
                        </h3>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400">
                            تجهیزات سرمایشی صنعتی با دقت دمایی بالا و استانداردهای آزمایشگاهی
                        </p>
                    </div>
                </div>

                <div className="pt-2 group/btn border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500">
                        کد: <span className="font-mono">PA-402</span>
                    </span>

                    <Button title="اطلاعات بیشتر" />
                </div>

            </div>
        );
    };