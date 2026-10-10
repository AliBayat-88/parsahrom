import { useState } from "react";
import {
  Download,
  Copy,
  Check,
  Lock,
  FileCheck2,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const STANDARDS_DATA = [
  {
    id: "iso-9001",
    code: "ISO 9001:2015",
    title: "سیستم‌های مدیریت کیفی در خطوط تولید و مونتاژ",
    category: "کنترل کیفی",
    description: "دستورالعمل‌ها و چک‌لیست‌های ارزیابی انطباق فرآیندهای صنعتی و ممیزی کیفی محصول.",
    downloadUrl: "/files/standards/iso-9001-2015.zip",
    accessPassword: "parsahrom.ir",
  },
];

export const StandardsContainer = () => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (id, password) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("خطا در کپی رمز:", error);
    }
  };

  return (
    <Card
      className="max-w-4xl font-irancell_semibold mt-10 mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            استانداردها و مستندات فنی تجهیزات
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            دانلود آخرین ویرایش گواهینامه‌ها، ضوابط ساخت و کاتالوگ‌های فنی تاییدشده.
          </p>
        </div>

        <Badge
          variant="outline"
          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 self-start sm:self-auto text-xs font-bold text-slate-700 dark:text-slate-300"
        >
          <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>نسخه معتبر</span>
        </Badge>
      </div>

      <div className="mb-6 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
        <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="leading-relaxed">
          فایل‌های پیوست به صورت فشرده (ZIP) رمزگذاری شده‌اند. برای مشاهده یا پرینت، ابتدا با دکمه روبروی هر فایل رمز عبور را کپی کرده و هنگام استخراج وارد نمایید.
        </p>
      </div>

      <div className="space-y-4">
        {STANDARDS_DATA.map((item) => {
          const isCopied = copiedId === item.id;

          return (
            <Card
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <Badge
                    variant="outline"
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  >
                    {item.code}
                  </Badge>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                <div
                  dir="ltr"
                  className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs w-full sm:w-auto"
                >
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.accessPassword}</span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(item.id, item.accessPassword)}
                    aria-label="کپی رمز دسترسی"
                    className="h-6 w-6 rounded text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>

                <Button
                  asChild
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9 px-4 rounded-xl gap-2 shadow-sm shadow-emerald-600/20"
                >
                  <a
                    href={item.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-x-1 items-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود</span>
                  </a>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default StandardsContainer;
