import { useProducts } from "@/Features/ManageProducts";
import { ProductCard } from "./ProductCard.jsx";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    Boxes,
} from "lucide-react";

export function Products() {
    const { products, isLoading } = useProducts();


    return (
        <main
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-irancell_semibold"
            dir="rtl"
        >
            {/* سربرگ بخش محصولات */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-3">
                    <Badge
                        variant="outline"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
                    >
                        <Boxes className="w-4 h-4" />
                        <span>کاتالوگ تجهیزات و قطعات</span>
                    </Badge>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        محصولات و تجهیزات صنعتی
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                        مشاهده، بررسی مشخصات فنی و استعلام مستقیم تجهیزات تست محیطی،
                        محفظه‌های سالت‌اسپری و قطعات یدکی ساخت شرکت پارس‌اهرم
                    </p>
                </div>

            </div>

            {/* وضعیت لودینگ */}
            {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 flex flex-col justify-between gap-3 animate-pulse"
                        >
                            <div className="space-y-3">
                                <div className="w-full h-24 sm:h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                                <div className="space-y-1.5">
                                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800/60 rounded w-full" />
                                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800/60 rounded w-4/5" />
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-12" />
                                <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* وضعیت نبود محصول */}
            {!isLoading && products.length === 0 && (
                <div className="text-center py-20 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
                        <Package className="w-7 h-7" />
                    </div>
                </div>
            )}

            {/* گرید محصولات با ریکت‌کوئری */}
            {!isLoading && products.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}

export default Products;
