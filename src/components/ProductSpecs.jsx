import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ProductSpecs = ({
    title = "",
    productCode = "",
    description = "",
    specs = [],
}) => {
    const validSpecs = Array.isArray(specs) ? specs : [];

    return (
        <div className="flex flex-col w-full justify-start gap-6 font-irancell_semibold">
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <h1 className="text-xl sm:text-2xl text-slate-900 dark:text-white font-bold leading-snug">
                    {title}
                </h1>
                <Badge
                    variant="outline"
                    className="self-start sm:self-auto px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 shrink-0"
                >
                    کد محصول: {productCode}
                </Badge>
            </div>

            <Card className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-sm">
                <h2 className="text-slate-900 dark:text-white text-sm font-bold mb-2 flex items-center gap-2">
                    توضیحات اجمالی
                </h2>
                <p className="text-xs sm:text-sm leading-8 text-slate-600 dark:text-slate-300 text-justify">
                    {description || "توضیحاتی برای این محصول ثبت نشده است."}
                </p>
            </Card>

            <Card className="w-full p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/60 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-slate-900 dark:text-white text-sm sm:text-base font-bold flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                        مشخصات فنی دستگاه
                    </h2>
                    <span className="flex items-center gap-x-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                        مشاهده بیشتر
                        <ChevronLeft className="w-4 h-4" />
                    </span>
                </div>

                {validSpecs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {validSpecs.map((spec, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/40 hover:border-emerald-500/40 transition-colors"
                            >
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {spec?.label}
                                </span>
                                <span className="text-xs text-slate-900 dark:text-slate-200 font-bold dir-ltr text-left font-mono">
                                    {spec?.value}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-slate-400 dark:text-slate-500 py-2">
                        مشخصات فنی تکمیلی از طریق بخش مشاوره یا استعلام تلفنی در دسترس است.
                    </p>
                )}
            </Card>
        </div>
    );
};
