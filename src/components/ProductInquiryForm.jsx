import { useState } from "react";
import { Loader2, Send, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const INITIAL_FORM_STATE = {
    fullName: "",
    phone: "",
    companyName: "",
    nationalId: "",
    organizationType: "pharmaceutical",
    quantity: 1,
    province: "",
    contactPreference: "تماس تلفنی",
    customNotes: "",
};

export const ProductInquiryForm = ({ productTitle = "", productCode = "" }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSubmitted(true);
        } catch (error) {
            console.error("خطا در ارسال استعلام:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <Card className="max-w-4xl mx-auto my-8 p-8 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    درخواست استعلام شما با موفقیت ثبت شد
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                    اطلاعات شما ثبت گردید. کارشناسان فروش از طریق{" "}
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formData.contactPreference}
                    </span>{" "}
                    با شماره <span className="font-mono dir-ltr">{formData.phone}</span> جهت صدور پیش‌فاکتور ارتباط برقرار خواهند کرد.
                </p>
                <Button
                    variant="outline"
                    onClick={() => {
                        setIsSubmitted(false);
                        setFormData(INITIAL_FORM_STATE);
                    }}
                    className="text-xs"
                >
                    ثبت استعلام دیگر
                </Button>
            </Card>
        );
    }

    return (
        <Card
            className="max-w-4xl mt-10 mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors font-irancell_semibold"
            dir="rtl"
        >
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-0 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        درخواست استعلام قیمت و صدور پیش‌فاکتور
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        اطلاعات مورد نیاز جهت دریافت قیمت رسمی و شرایط تحویل را وارد فرمایید.
                    </CardDescription>
                </div>

                <Badge
                    variant="secondary"
                    className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 self-start sm:self-auto"
                >
                    <span className="text-xs text-slate-500 dark:text-slate-400">محصول:</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {productTitle} ({productCode})
                    </span>
                </Badge>
            </CardHeader>

            <CardContent className="p-0 pt-6">
                <form noValidate className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                نام و نام خانوادگی متقاضی *
                            </label>
                            <Input
                                required
                                placeholder="مثال: مهندس حسینی"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                شماره همراه جهت تماس *
                            </label>
                            <Input
                                required
                                dir="ltr"
                                type="tel"
                                className="text-right"
                                placeholder="۰۹۱۲XXXXXXX"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                نام مرکز / شرکت متقاضی *
                            </label>
                            <Input
                                required
                                placeholder="مثال: آزمایشگاه مرکزی یا داروسازی..."
                                value={formData.companyName}
                                onChange={(e) => handleInputChange("companyName", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                نوع حوزه فعالیت
                            </label>
                            <Select
                                value={formData.organizationType}
                                onValueChange={(val) => handleInputChange("organizationType", val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب نوع حوزه" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pharmaceutical">داروسازی و بیوتکنولوژی</SelectItem>
                                    <SelectItem value="hospital">بیمارستان و مراکز درمانی</SelectItem>
                                    <SelectItem value="university">دانشگاه و مراکز تحقیقاتی</SelectItem>
                                    <SelectItem value="laboratory">آزمایشگاه تشخیص طبی</SelectItem>
                                    <SelectItem value="other">سایر شرکت‌ها و اشخاص</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                شناسه ملی / کد اقتصادی (اختیاری)
                            </label>
                            <Input
                                dir="ltr"
                                className="text-right"
                                placeholder="جهت فاکتور رسمی"
                                value={formData.nationalId}
                                onChange={(e) => handleInputChange("nationalId", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                تعداد مورد نیاز (دستگاه) *
                            </label>
                            <Input
                                type="number"
                                min="1"
                                max="100"
                                value={formData.quantity}
                                onChange={(e) => handleInputChange("quantity", Number(e.target.value) || 1)}
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                استان و شهر محل تحویل
                            </label>
                            <Input
                                placeholder="مثال: تهران / شیراز"
                                value={formData.province}
                                onChange={(e) => handleInputChange("province", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                                روش ترجیحی ارتباط
                            </label>
                            <Select
                                value={formData.contactPreference}
                                onValueChange={(val) => handleInputChange("contactPreference", val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="تماس تلفنی">تماس تلفنی مستقیم</SelectItem>
                                    <SelectItem value="ارسال پیام در تلگرام">ارسال پیام در تلگرام</SelectItem>
                                    <SelectItem value="ارسال پیش‌فاکتور به ایمیل">ارسال پیش‌فاکتور به ایمیل</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
                            الزامات فنی خاص یا شرایط تست (اختیاری)
                        </label>
                        <Textarea
                            rows={3}
                            placeholder="در صورت نیاز به آزمون‌های اعتبار‌سنجی (IQ/OQ)، تنظیمات دمایی اختصاصی، یا اتصالات جانبی اینجا ذکر فرمایید..."
                            value={formData.customNotes}
                            onChange={(e) => handleInputChange("customNotes", e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || !formData.fullName || !formData.phone}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>در حال ثبت استعلام...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>ثبت درخواست پیش‌فاکتور و مشاوره خرید</span>
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
