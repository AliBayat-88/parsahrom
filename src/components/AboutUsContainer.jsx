import { useState, useEffect } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ShieldCheck,
    Award,
    Cpu,
    Headphones,
    Navigation,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const customMarkerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const NeshanLogo = ({ className = "size-6 sm:size-7 shrink-0" }) => (
    <svg viewBox="650 25 330 310" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#1E3A8A" d="M685.9 101.8l51.3 29.5c0 .5-.5.5-.5 1-29 50.8-3.1 96.6 23.9 147.4l1.5 3.1-22.4 38.6-38.6-77.8c-18.3-37-19.3-80.2-2.5-118l-12.7-23.8z" />
        <path fill="#0284C7" d="M868.4 97.7c45.8 26.6 62 84.8 36.6 131.2l-.5 1c-12.9 23-34.8 39.4-60.5 45.2-23.4 6.1-50.8 7.1-78.8 7.6h-3.6l-1.5-3.1c-26.9-50.8-52.9-96.6-23.9-147.4 0-.5.5-.5.5-1 25.3-45.3 84-60.3 129.7-33.5zm7.6 114.4c6.2-10.3 7-23.1 2-34.1l9.2-15.8-15.8-9.2c-1-12.1-8.1-22.8-18.8-28.5-6-3.6-12.8-5.5-19.8-5.6-4.9 0-9.8 1-14.2 3.1l-15.8-9.2-9.2 15.8c-12 1-22.5 8.1-28 18.8-6.5 10.3-7.3 23.1-2 34.1l-9.2 16.3 15.8 9.2c1 12 8.1 22.5 18.8 28 6 3.6 12.8 5.5 19.8 5.6 4.8.1 9.5-1 13.7-3.1l15.8 9.2 9.2-16.3c-5.1-10.6-16-17.5-21.5-28.3" />
        <path fill="#10B981" d="M802.8 113.5l15.8 9.2c4.4-2.3 9.3-3.3 14.2-3.1 7 0 13.8 2 19.8 5.6 10.7 5.7 17.8 16.4 18.8 28.5l15.8 9.2-9.2 15.8c5 11 4.2 23.7-2 34.1-5.5 10.6-16.1 17.7-28 18.8l-9.2 16.3-15.8-9.2c-4.3 2-9 3.1-13.7 3.1-7 0-13.8-2-19.8-5.6-10.6-5.5-17.7-16.1-18.8-28l-15.8-9.2 9.2-16.3c-5-11-4.2-23.7 2-34.1 5.5-10.6 16.1-17.7 28-18.8l13.7-24.3z" />
        <path fill="#EF4444" d="M901.9 39.2l38.6 82.4c16.8 35.4 17.8 76.3 2.5 112.4l12.7 24.9-51.3-29.5c25.4-46.4 9.2-104.6-36.6-131.2l34.1-59z" />
        <path fill="#F87171" d="M901.9 39.2l-33.6 58.5C822.9 71 764.3 86 737.2 131.3l-51.3-29.5 28-1.5C737.3 69 773 49.4 811.9 46.4l90-7.2z" />
        <path fill="#0F172A" d="M905 228.9l51.3 29.5-27.5 1c-23.9 33.5-61.6 54.5-102.7 56.9l-86.4 5.1 22.4-38.6h3.6c28-1 54.9-1.5 78.8-7.6 25.7-5.8 47.7-22.3 60.5-45.2v-1.1z" />
    </svg>
);

const WazeLogo = ({ className = "size-6 sm:size-7 shrink-0" }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
            fill="#33CCFF"
            d="M13.314 1.59c-.225.003-.45.013-.675.03-2.165.155-4.295.924-6.069 2.327-2.194 1.732-3.296 4.325-3.496 7.05h.002c-.093 1.22-.23 2.15-.469 2.63-.238.479-.42.638-1.24.639C.27 14.259-.4 15.612.266 16.482c1.248 1.657 2.902 2.705 4.72 3.364a2.198 2.198 0 00-.033.367 2.198 2.198 0 002.2 2.197 2.198 2.198 0 002.128-1.668c1.307.12 2.607.14 3.824.1.364-.012.73-.045 1.094-.092a2.198 2.198 0 002.127 1.66 2.198 2.198 0 002.2-2.197 2.198 2.198 0 00-.151-.797 12.155 12.155 0 002.303-1.549c2.094-1.807 3.511-4.399 3.302-7.404-.112-1.723-.761-3.298-1.748-4.608-2.143-2.86-5.53-4.309-8.918-4.265zm.366 1.54c.312.008.623.027.933.063 2.48.288 4.842 1.496 6.4 3.577v.001c.829 1.1 1.355 2.386 1.446 3.792v.003c.173 2.477-.965 4.583-2.777 6.147a10.66 10.66 0 01-2.375 1.535 2.198 2.198 0 00-.98-.234 2.198 2.198 0 00-1.934 1.158 9.894 9.894 0 01-1.338.146 27.323 27.323 0 01-3.971-.148 2.198 2.198 0 00-1.932-1.156 2.198 2.198 0 00-1.347.463c-1.626-.553-3.078-1.422-4.155-2.762 1.052-.096 1.916-.6 2.319-1.408.443-.889.53-1.947.625-3.198v-.002c.175-2.391 1.11-4.536 2.92-5.964h.002c1.77-1.402 3.978-2.061 6.164-2.012zm-3.157 4.638c-.688 0-1.252.579-1.252 1.298 0 .72.564 1.297 1.252 1.297.689 0 1.252-.577 1.252-1.297 0-.711-.563-1.298-1.252-1.298zm5.514 0c-.688 0-1.25.579-1.25 1.298-.008.72.554 1.297 1.25 1.297.688 0 1.252-.577 1.252-1.297 0-.711-.564-1.298-1.252-1.298zM9.641 11.78a.72.72 0 00-.588.32.692.692 0 00-.11.54c.345 1.783 2.175 3.129 4.264 3.129h.125c1.056-.032 2.026-.343 2.816-.922.767-.556 1.29-1.316 1.477-2.137a.746.746 0 00-.094-.547.69.69 0 00-.445-.32.714.714 0 00-.867.539c-.22.93-1.299 1.9-2.934 1.94-1.572.046-2.738-.986-2.926-1.956a.72.72 0 00-.718-.586Z"
        />
    </svg>
);

const COMPANY_COORDS = { lat: 35.6892, lng: 51.389 };

const COMPANY_STATS = [
    {
        icon: <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        value: "+۱۵ سال",
        label: "سابقه طراحی و تولید",
    },
    {
        icon: <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        value: "+۵۰۰",
        label: "تجهیز مراکز و آزمایشگاه‌ها",
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        value: "استاندارد GMP",
        label: "همگام با الزامات بین‌المللی",
    },
    {
        icon: <Headphones className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        value: "۱۰ سال",
        label: "تضمین خدمات و تأمین قطعات",
    },
];

export const AboutUsContainer = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-irancell_semibold" dir="rtl">
            <section className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                <Badge
                    variant="outline"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    تولید ملی با استانداردهای جهانی
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                    طراحی و ساخت پیشرفته‌ترین تجهیزات تست محیطی و آزمایشگاهی
                </h1>
                <p className="text-xs sm:text-sm leading-8 text-slate-600 dark:text-slate-400 text-justify sm:text-center">
                    ما در <span className="font-bold text-slate-800 dark:text-slate-200">پارس اهرم</span> با تکیه بر دانش فنی مهندسان داخلی و استفاده از قطعات درجه‌یک بین‌المللی، به طراحی و تولید چمبرهای تست دما و رطوبت، فریزرهای اولترا کولد آزمایشگاهی و محفظه‌های تست پایداری دارویی می‌پردازیم. هدف ما تأمین تجهیزاتی بی‌نیاز از واردات، با دقت پایش بالا و خدمات پس از فروش فوری در سراسر کشور است.
                </p>
            </section>

            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {COMPANY_STATS.map((stat, idx) => (
                    <Card
                        key={idx}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2"
                    >
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20">
                            {stat.icon}
                        </div>
                        <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            {stat.value}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {stat.label}
                        </span>
                    </Card>
                ))}
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-8">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-5 bg-emerald-500 rounded-full" />
                        اطلاعات تماس و موقعیت کارخانه
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        جهت بازدید حضوری، هماهنگی جلسات فنی یا ارسال نمونه‌های آزمایشی می‌توانید از راه‌های زیر با ما در ارتباط باشید.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-5 flex flex-col justify-between gap-5">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/50 flex items-start gap-3.5">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                                    دفتر مرکزی و کارخانه
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    تهران، شهرک صنعتی، خیابان اصلی، پلاک ۱۲ (آدرس دقیق دفتر/کارخانه)
                                </p>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/50 flex items-start gap-3.5">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                                    شماره‌های تماس و مشاوره فنی
                                </h3>
                                <div className="flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center justify-between">
                                        <span>واحد فروش:</span>
                                        <a href="tel:02112345678" className="dir-ltr hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                            ۰۲۱-۱۲۳۴۵۶۷۸
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>پشتیبانی و خدمات:</span>
                                        <a href="tel:02187654321" className="dir-ltr hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                            ۰۲۱-۸۷۶۵۴۳۲۱
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/50 flex items-start gap-3.5">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                                    پست الکترونیک رسمی
                                </h3>
                                <div className="flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300 font-mono dir-ltr text-right">
                                    <a href="mailto:info@parsehram.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                        info@parsehram.com
                                    </a>
                                    <a href="mailto:sales@parsehram.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                        sales@parsehram.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/50 flex items-start gap-3.5">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                                    ساعات کاری و پاسخگویی
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰
                                    <br />
                                    پنج‌شنبه‌ها: ۸:۰۰ الی ۱۲:۳۰
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                        <div className="w-full h-72 sm:h-80 lg:h-full min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/70 relative z-0 shadow-inner">
                            <MapContainer
                                center={[COMPANY_COORDS.lat, COMPANY_COORDS.lng]}
                                zoom={14}
                                scrollWheelZoom={false}
                                className="h-full w-full"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url={
                                        isDark
                                            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                    }
                                />
                                <Marker position={[COMPANY_COORDS.lat, COMPANY_COORDS.lng]} icon={customMarkerIcon}>
                                    <Popup>
                                        <div className="text-center font-irancell_semibold text-xs p-1" dir="rtl">
                                            <span className="font-bold text-slate-900 block mb-0.5">پارس اهرم</span>
                                            <span className="text-slate-600">دفتر مرکزی و کارخانه</span>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                                <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span>مسیریابی مستقیم با:</span>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="flex-1 sm:flex-none h-11 px-4 text-xs sm:text-sm font-bold rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-slate-800 dark:text-slate-200 transition-all shadow-sm active:scale-95 cursor-pointer [&_svg]:size-6 sm:[&_svg]:size-7"
                                >
                                    <a
                                        href={`https://neshan.org/maps/@${COMPANY_COORDS.lat},${COMPANY_COORDS.lng},16z`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2.5 w-full h-full"
                                    >
                                        <NeshanLogo />
                                        <span>مسیریاب نشان</span>
                                    </a>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    className="flex-1 sm:flex-none h-11 px-4 text-xs sm:text-sm font-bold rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-[#33CCFF] hover:text-[#0099dd] dark:hover:text-[#33CCFF] text-slate-800 dark:text-slate-200 transition-all shadow-sm active:scale-95 cursor-pointer [&_svg]:size-6 sm:[&_svg]:size-7"
                                >
                                    <a
                                        href={`https://waze.com/ul?ll=${COMPANY_COORDS.lat},${COMPANY_COORDS.lng}&navigate=yes`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2.5 w-full h-full"
                                    >
                                        <WazeLogo />
                                        <span>مسیریاب ویز</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
