import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mic, Square, Trash2, Paperclip, Play } from "lucide-react";

// دیتابیس مشخصات فنی دستگاه‌ها
const DEVICE_SPECS = {
  freezer_80: [
    { label: "محدوده دمایی", value: "-40°C تا -86°C", dir: "ltr" },
    { label: "سیستم برودت", value: "دوتایی (Cascade)" },
    { label: "حجم محفظه", value: "۵۰۰ لیتر" },
    { label: "عایق‌بندی", value: "فوم پلی‌یورتان تزریقی" },
  ],
  chamber: [
    { label: "محدوده دمایی", value: "-20°C تا +100°C", dir: "ltr" },
    { label: "محدوده رطوبت", value: "10% تا 98% RH", dir: "ltr" },
    { label: "کنترلر", value: "PLC لمسی ۷ اینچ" },
    { label: "جنس بدنه داخلی", value: "استنلس استیل ۳۰۴" },
  ],
  shock: [
    { label: "تعداد محفظه", value: "۲ محفظه (سرد و گرم)" },
    { label: "محدوده دما", value: "-70°C تا +200°C", dir: "ltr" },
    { label: "زمان انتقال نمونه", value: "کمتر از ۱۰ ثانیه" },
    { label: "سیستم جابه‌جایی", value: "نیوماتیک" },
  ],
};

export const AfterSalesContainer = () => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  // وضعیت‌های مربوط به ضبط ویس
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // شروع ضبط ویس
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("دسترسی به میکروفون تایید نشد یا مرورگر شما پشتیبانی نمی‌کند.");
    }
  };

  // توقف ضبط ویس
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // حذف ویس ضبط شده
  const deleteAudio = () => {
    setAudioUrl(null);
    audioChunksRef.current = [];
  };

  return (
      <div className="max-w-4xl font-irancell_semibold mt-10 mx-auto p-6 bg-slate-900 rounded-2xl border border-slate-800" dir="rtl">
        <h2 className="text-xl font-bold text-white mb-6">فرم درخواست خدمات پس از فروش</h2>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* سطر اول: نام شرکت و شناسه ملی */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 mb-2 block">نام شرکت متقاضی</label>
              <Input placeholder="مثال: شرکت داروسازی ..." />
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-2 block">شناسه ملی شرکت</label>
              <Input dir="ltr" className="font-mono text-right" placeholder="1010XXXXXXX" />
            </div>
          </div>

          {/* سطر دوم: نام شخص متقاضی و تلفن */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 mb-2 block">نام و نام خانوادگی متقاضی</label>
              <Input placeholder="مثال: علی محمدی" />
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-2 block">شماره تلفن تماس / همراه</label>
              <Input dir="ltr" className="font-mono text-right" placeholder="0912XXXXXXX" />
            </div>
          </div>

          {/* سطر سوم: انتخاب دستگاه و شماره سریال */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 mb-2 block">نام دستگاه</label>
              <Select onValueChange={(value) => setSelectedDevice(value)}>
                <SelectTrigger className="w-full bg-slate-800/50 border-slate-700 text-slate-200">
                  <SelectValue placeholder="دستگاه مورد نظر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectItem value="freezer_80">فریزر آزمایشگاهی (-۸۰°C)</SelectItem>
                  <SelectItem value="chamber">محفظه تست شرایط محیطی</SelectItem>
                  <SelectItem value="shock">دستگاه شوک حرارتی</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-2 block">شماره سریال دستگاه</label>
              <Input dir="ltr" className="font-mono text-right" placeholder="SN-2024-XXXX" />
            </div>
          </div>

          {/* مشخصات فنی کشویی (Dynamic Accordion) */}
          {selectedDevice && DEVICE_SPECS[selectedDevice] && (
              <Accordion type="single" collapsible className="w-full border border-slate-800 rounded-xl px-4 bg-slate-800/20">
                <AccordionItem value="specs" className="border-b-0">
                  <AccordionTrigger className="text-xs sm:text-sm text-emerald-400 hover:no-underline">
                    مشاهده مشخصات فنی ثبت‌شده این مدل
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-slate-300 space-y-2">
                    {DEVICE_SPECS[selectedDevice].map((spec, index) => (
                        <div key={index} className="flex justify-between py-1 border-b border-slate-800 last:border-0">
                          <span>{spec.label}:</span>
                          <span dir={spec.dir || "rtl"} className={spec.dir === "ltr" ? "font-mono" : ""}>
                      {spec.value}
                    </span>
                        </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          )}

          {/* شرح ایراد فنی */}
          <div>
            <label className="text-xs text-slate-300 mb-2 block">شرح ایراد فنی</label>
            <Textarea rows={3} placeholder="کد خطا یا رفتار غیرطبیعی دستگاه..." />
          </div>

          {/* توضیحات تکمیلی */}
          <div>
            <label className="text-xs text-slate-300 mb-2 block">توضیحات تکمیلی</label>
            <Textarea rows={3} placeholder="هرگونه توضیحات اضافی، شرایط محیطی وقوع خطا و..." />
          </div>

          {/* بخش ارسال فایل و ویس */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* ۱. آپلود فایل */}
            <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
              <label className="text-xs text-slate-300 mb-2 block">پیوست فایل / مستندات</label>
              <div className="relative">
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => setAttachedFile(e.target.files[0] || null)}
                />
                <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 w-full p-2.5 bg-slate-800 border border-dashed border-slate-700 hover:border-emerald-500/50 rounded-lg text-xs text-slate-300 cursor-pointer transition-all"
                >
                  <Paperclip className="w-4 h-4 text-emerald-400" />
                  <span>{attachedFile ? attachedFile.name : "انتخاب یا اسقاط فایل (تصویر/PDF)"}</span>
                </label>
              </div>
            </div>

            {/* ۲. ضبط و ارسال ویس */}
            <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl flex flex-col justify-between">
              <label className="text-xs text-slate-300 mb-2 block">ضبط پیام صوتی (ویس)</label>

              <div className="flex items-center gap-3">
                {!isRecording ? (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={startRecording}
                        className="flex-1 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200 text-xs gap-2"
                    >
                      <Mic className="w-4 h-4 text-red-400" />
                      شروع ضبط صدای ایراد
                    </Button>
                ) : (
                    <Button
                        type="button"
                        onClick={stopRecording}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs gap-2 animate-pulse"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      توقف ضبط...
                    </Button>
                )}

                {audioUrl && !isRecording && (
                    <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                      <audio src={audioUrl} controls className="h-8 w-36" />
                      <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={deleteAudio}
                          className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-slate-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* دکمه ارسال */}
          <Button type="submit" className="w-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
            ثبت و ارسال نهایی درخواست
          </Button>
        </form>
      </div>
  );
};