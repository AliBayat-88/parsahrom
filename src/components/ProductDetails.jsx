import { ProductGallery } from "./ProductGallery";
import { ProductSpecs } from "./ProductSpecs";
import { ProductInquiryForm } from "./ProductInquiryForm";

const PRODUCT_DATA = {
    title: "فریزر درب‌دار با ویژگی‌های جدید",
    code: "PA-FR300",
    description:
        "فریزر آزمایشگاهی پیشرفته مناسب برای نگهداری نمونه‌های بیولوژیکی، واکسن‌ها و کیت‌های تحقیقاتی با دقت دمایی بالا و سیستم سرمایش دوگانه پایدار.",
    images: [
        "/Freezer-With-Door-removebg-preview.png",
        "/Freezer-With-Door-removebg-preview.png",
        "/Freezer-With-Door-removebg-preview.png",
    ],
    specs: [
        { label: "محدوده دما", value: "-20°C ~ -86°C" },
        { label: "ظرفیت محفظه", value: "300 Liters" },
        { label: "نوع گاز مبرد", value: "R290 Eco-Friendly" },
        { label: "سیستم هشدار", value: "صوتی و پیامکی (GSM)" },
    ],
};

export function ProductDetails() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
            <div className="my-6 flex flex-col md:flex-row justify-between w-full gap-8">
                <ProductGallery
                    images={PRODUCT_DATA.images}
                    productTitle={PRODUCT_DATA.title}
                />
                <ProductSpecs
                    title={PRODUCT_DATA.title}
                    productCode={PRODUCT_DATA.code}
                    description={PRODUCT_DATA.description}
                    specs={PRODUCT_DATA.specs}
                />
            </div>

            <ProductInquiryForm
                productTitle={PRODUCT_DATA.title}
                productCode={PRODUCT_DATA.code}
            />
        </div>
    );
}
