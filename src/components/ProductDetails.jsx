import { useParams } from "react-router";
import { useProduct } from "@/Features/ManageProducts";
import { ProductGallery } from "./ProductGallery";
import { ProductSpecs } from "./ProductSpecs";
import { ProductInquiryForm } from "./ProductInquiryForm";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetails() {
    const { id } = useParams();
    const { product: fetchedProduct, isLoading, isError, error, refetch } = useProduct(id);

    // وضعیت لودینگ با اسکلتون‌های استاندارد shadcn
    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 font-irancell_semibold" dir="rtl">
                <div className="my-6 flex flex-col md:flex-row justify-between w-full gap-8">
                    {/* اسکلتون گالری محصول */}
                    <div className="w-full md:max-w-80 p-3.5 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md shrink-0 space-y-3">
                        <Skeleton className="w-full aspect-square rounded-xl" />
                        <div className="flex gap-2">
                            <Skeleton className="w-1/4 aspect-square rounded-lg" />
                            <Skeleton className="w-1/4 aspect-square rounded-lg" />
                            <Skeleton className="w-1/4 aspect-square rounded-lg" />
                            <Skeleton className="w-1/4 aspect-square rounded-lg" />
                        </div>
                    </div>

                    {/* اسکلتون مشخصات فنی */}
                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                            <Skeleton className="h-8 w-2/3 rounded-lg" />
                            <Skeleton className="h-6 w-28 rounded-lg" />
                        </div>
                        <Skeleton className="h-28 w-full rounded-xl" />
                        <Skeleton className="h-44 w-full rounded-xl" />
                    </div>
                </div>

                {/* اسکلتون فرم استعلام */}
                <Skeleton className="h-64 w-full rounded-2xl mt-8" />
            </div>
        );
    }

    // وضعیت خطا یا عدم وجود محصول
    if (isError || !fetchedProduct) {
        return (
            <div
                className="max-w-md mx-auto my-20 p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-center space-y-4 font-irancell_semibold"
                dir="rtl"
            >
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    خطا در دریافت مشخصات محصول
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {error?.message || "محصول مورد نظر یافت نشد یا ارتباط با سرور برقرار نشد."}
                </p>
                <Button onClick={() => refetch()} className="text-xs rounded-xl">
                    <RefreshCw className="w-3.5 h-3.5 ml-1.5" />
                    تلاش مجدد
                </Button>
            </div>
        );
    }

    // استخراج و نرمال‌سازی تصاویر
    let images = [];
    if (Array.isArray(fetchedProduct.images) && fetchedProduct.images.length > 0) {
        images = fetchedProduct.images.filter(Boolean);
    } else if (fetchedProduct.cover) {
        images = [fetchedProduct.cover];
    }

    const title = fetchedProduct.name;
    const code = fetchedProduct.code || "PA-000";
    const description = fetchedProduct.description || fetchedProduct.summary_description || "";
    const specs = Array.isArray(fetchedProduct.specs) ? fetchedProduct.specs : [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
            <div className="my-6 flex flex-col md:flex-row justify-between w-full gap-8">
                <ProductGallery
                    images={images}
                    productTitle={title}
                />
                <ProductSpecs
                    title={title}
                    productCode={code}
                    description={description}
                    specs={specs}
                />
            </div>

            <ProductInquiryForm
                productTitle={title}
                productCode={code}
            />
        </div>
    );
}
