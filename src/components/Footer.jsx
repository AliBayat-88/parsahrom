import { Logo } from "./Logo.jsx";
import { CATEGORIES, CONTACT_INFO, QUICK_LINKS } from "../constants/footerData.jsx";

export const Footer = () => {
    return (
        <footer className="w-full bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300 pt-12 pb-6 border-t-2 border-slate-200 dark:border-slate-800 relative mt-16 font-irancell_semibold">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    <div className="flex flex-col gap-y-4">
                        <Logo />
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                            طراح و تولیدکننده تخصصی تجهیزات تست محیطی، فریزرها و محفظه‌های آزمون صنعتی و آزمایشگاهی با استانداردهای بین‌المللی.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white text-sm sm:text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-emerald-500">
                            دسترسی سریع
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            {QUICK_LINKS.map((item) => (
                                <li key={item.id}>
                                    <a href={item.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white text-sm sm:text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-10 after:h-0.5 after:bg-emerald-400">
                            دسته‌بندی تجهیزات
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            {CATEGORIES.map((item) => (
                                <li key={item.id}>
                                    <a href={item.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white text-sm sm:text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-emerald-500">
                            ارتباط با ما
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            {CONTACT_INFO.map((item) => (
                                <li key={item.id} className="flex items-start gap-x-2.5">
                                    {item.icon}
                                    <span
                                        dir={item.isLtr ? "ltr" : undefined}
                                        className={`leading-relaxed text-slate-600 dark:text-slate-300 ${item.isMono ? "font-mono" : ""}`}
                                    >
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-y-4 text-xs text-slate-500 dark:text-slate-400">
                    <p className="text-center sm:text-right">
                        تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت <span className="text-slate-800 dark:text-slate-200 font-bold">پارس اهرم</span> می‌باشد.
                    </p>
                </div>
            </div>
        </footer>
    );
};