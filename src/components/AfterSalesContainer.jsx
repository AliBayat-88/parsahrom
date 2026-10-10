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
import { Mic, Square, Trash2, Paperclip, Loader2 } from "lucide-react";
import { LocationPicker } from "./LocationPicker";
import { cn } from "@/lib/utils.js";
import { toPersianDigits } from "@/utils/numberHelper.js";

const IRAN_PROVINCES = [
  "آذربایجان شرقی", "آذربایجان غربی", "اردبیل", "اصفهان", "البرز", "ایلام",
  "بوشهر", "تهران", "چهارمحال و بختیاری", "خراسان جنوبی", "خراسان رضوی",
  "خراسان شمالی", "خوزستان", "زنجان", "سمنان", "سیستان و بلوچستان", "فارس",
  "قزوین", "قم", "کردستان", "کرمان", "کرمانشاه", "کهگیلویه و بویراحمد", "گلستان",
  "گیلان", "لرستان", "مازندران", "مرکزی", "هرمزگان", "همدان", "یزد"
];

const DEVICE_CONFIG = {
  freezer_80: {
    label: `فریزر آزمایشگاهی (${toPersianDigits("-80")}°C)`,
    prefix1: "S",
    prefix2: "V",
    models: ["200", "400", "500", "700"],
    suffixes: ["01", "02", "03", "04"],
  },
  chamber: {
    label: "محفظه تست شرایط محیطی",
    prefix1: "CH",
    prefix2: "H",
    models: ["150", "300", "600"],
    suffixes: ["01", "02", "05"],
  },
  shock: {
    label: "دستگاه شوک حرارتی",
    prefix1: "TS",
    prefix2: "D",
    models: ["100", "250"],
    suffixes: ["01", "02"],
  },
};

export const AfterSalesContainer = () => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedSuffix, setSelectedSuffix] = useState("");

  const [attachedFile, setAttachedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [location, setLocation] = useState({ lat: 35.6892, lng: 51.389 });

  const [formData, setFormData] = useState({
    companyName: "",
    nationalId: "",
    applicantName: "",
    phone: "",
    serialNumber: "",
    province: "",
    postalCode: "",
    address: "",
    issueDescription: "",
    extraNotes: "",
  });

  const deviceModel = (() => {
    if (!selectedDevice) return "";
    const config = DEVICE_CONFIG[selectedDevice];
    if (!config) return "";
    const modelPart = selectedModel ? toPersianDigits(selectedModel) : "???";
    const suffixPart = selectedSuffix ? toPersianDigits(selectedSuffix) : "??";
    return `${config.prefix1}-${modelPart}-${config.prefix2}-${suffixPart}`;
  })();

  const handleDeviceChange = (value) => {
    setSelectedDevice(value);
    const config = DEVICE_CONFIG[value];
    if (config) {
      setSelectedModel(config.models[0] || "");
      setSelectedSuffix(config.suffixes[0] || "");
    } else {
      setSelectedModel("");
      setSelectedSuffix("");
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch {
      alert("دسترسی به میکروفون تایید نشد یا مرورگر شما پشتیبانی نمی‌کند.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const deleteAudio = () => {
    setAudioUrl(null);
    setAudioBlob(null);
    audioChunksRef.current = [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("اطلاعات ارسال شده:", {
        ...formData,
        deviceModel,
        selectedDevice,
        latitude: location.lat,
        longitude: location.lng,
        attachedFile,
        audioBlob,
      });

      alert(`درخواست با شماره سریال ${formData.serialNumber || deviceModel} با موفقیت ثبت شد!`);
    } catch (err) {
      console.error(err);
      alert("خطا در ثبت درخواست.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const filteredProvinces = IRAN_PROVINCES.filter((province) =>
    province.includes(formData.province || "")
  );

  return (
    <div
      className="max-w-4xl font-irancell_semibold mt-10 mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
      dir="rtl"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        فرم درخواست خدمات پس از فروش
      </h2>

      <form noValidate className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              نام شرکت متقاضی
            </label>
            <Input
              placeholder="مثال: شرکت داروسازی ..."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              شناسه ملی شرکت
            </label>
            <Input
              dir="ltr"
              className="text-right"
              placeholder={toPersianDigits("1010XXXXXXX")}
              value={formData.nationalId}
              onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              نام و نام خانوادگی متقاضی
            </label>
            <Input
              placeholder="مثال: علی محمدی"
              value={formData.applicantName}
              onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              شماره همراه
            </label>
            <Input
              dir="ltr"
              className="text-right"
              placeholder={toPersianDigits("0912XXXXXXX")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
            شماره سریال دستگاه (مندرج بر روی پلاک مشخصات)
          </label>
          <Input
            dir="ltr"
            className="text-right"
            placeholder={toPersianDigits("مثال: SN-1403-XXXX")}
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              نام دستگاه
            </label>
            <Select value={selectedDevice} onValueChange={handleDeviceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="دستگاه مورد نظر را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DEVICE_CONFIG).map(([key, item]) => (
                  <SelectItem key={key} value={key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              مدل دستگاه
            </label>

            {!selectedDevice ? (
              <Input
                disabled
                placeholder="ابتدا دستگاه را انتخاب کنید"
                className="bg-slate-100 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed text-xs"
              />
            ) : (
              <div
                dir="ltr"
                className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-sm"
              >
                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-600 dark:text-emerald-400 font-bold select-none text-xs">
                  {DEVICE_CONFIG[selectedDevice].prefix1}
                </span>

                <span className="text-slate-400 dark:text-slate-500 font-bold">-</span>

                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="h-7 w-20 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:ring-0 focus:ring-offset-0 px-2">
                    <SelectValue placeholder="مدل" />
                  </SelectTrigger>
                  <SelectContent className="min-w-[5rem]">
                    {DEVICE_CONFIG[selectedDevice].models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {toPersianDigits(model)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-slate-400 dark:text-slate-500 font-bold">-</span>

                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-600 dark:text-emerald-400 font-bold select-none text-xs">
                  {DEVICE_CONFIG[selectedDevice].prefix2}
                </span>

                <span className="text-slate-400 dark:text-slate-500 font-bold">-</span>

                <Select value={selectedSuffix} onValueChange={setSelectedSuffix}>
                  <SelectTrigger className="h-7 w-20 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:ring-0 focus:ring-offset-0 px-2">
                    <SelectValue placeholder="سری" />
                  </SelectTrigger>
                  <SelectContent className="min-w-[5rem]">
                    {DEVICE_CONFIG[selectedDevice].suffixes.map((suffix) => (
                      <SelectItem key={suffix} value={suffix}>
                        {toPersianDigits(suffix)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-3 child:text-xs child:md:text-sm">
          <div className="relative max-w-[106px] md:max-w-32">
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              استان
            </label>

            <Input
              autoComplete="off"
              value={formData.province}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 150)}
              onChange={(e) => {
                setFormData({ ...formData, province: e.target.value });
                setIsOpen(true);
              }}
            />

            {isOpen && filteredProvinces.length > 0 && (
              <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-lg text-xs space-y-0.5">
                {filteredProvinces.map((province) => (
                  <li
                    key={province}
                    onMouseDown={() => {
                      setFormData({ ...formData, province });
                      setIsOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer select-none rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200 flex items-center justify-between",
                      formData.province === province && "bg-slate-100 dark:bg-slate-800 font-bold text-emerald-600 dark:text-emerald-400"
                    )}
                  >
                    <span>{province}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full">
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              آدرس
            </label>
            <Input
              placeholder="شهر/روستا، خیابان، پلاک، واحد"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="hidden md:block max-w-32">
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              کد پستی ({toPersianDigits(10)} رقمی)
            </label>
            <Input
              dir="ltr"
              maxLength={10}
              className="text-right"
              placeholder={toPersianDigits("1234567890")}
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="md:hidden block w-full">
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              کد پستی ({toPersianDigits(10)} رقمی)
            </label>
            <Input
              dir="ltr"
              maxLength={10}
              className="text-right"
              placeholder={toPersianDigits("1234567890")}
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
          </div>

          <LocationPicker value={location} onChange={setLocation} />
        </div>

        <div>
          <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
            شرح ایراد فنی
          </label>
          <Textarea
            rows={3}
            placeholder="کد خطا یا رفتار غیرطبیعی دستگاه..."
            value={formData.issueDescription}
            onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
          />
        </div>

        <div>
          <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
            توضیحات تکمیلی
          </label>
          <Textarea
            rows={3}
            placeholder="هرگونه توضیحات اضافی، شرایط محیطی وقوع خطا و..."
            value={formData.extraNotes}
            onChange={(e) => setFormData({ ...formData, extraNotes: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl">
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              پیوست فایل / مستندات
            </label>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => setAttachedFile(e.target.files[0] || null)}
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 w-full p-2.5 bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500/50 rounded-lg text-xs text-slate-700 dark:text-slate-300 cursor-pointer transition-all"
              >
                <Paperclip className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{attachedFile ? attachedFile.name : "انتخاب فایل (تصویر/PDF)"}</span>
              </label>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col justify-between">
            <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">
              ضبط پیام صوتی (ویس)
            </label>

            <div className="flex items-center gap-3">
              {!isRecording ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={startRecording}
                  className="bg-white w-full dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 gap-2"
                >
                  <Mic className="w-4 h-4 text-rose-500" />
                  شروع ضبط
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={stopRecording}
                  className="text-xs gap-2 animate-pulse"
                >
                  <Square className="w-4 h-4" />
                  توقف ضبط
                </Button>
              )}

              {audioUrl && (
                <div className="flex items-center gap-2 flex-1">
                  <audio src={audioUrl} controls className="h-8 w-full max-w-[180px]" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={deleteAudio}
                    className="text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 h-8 w-8"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>در حال ارسال درخواست...</span>
            </div>
          ) : (
            "ثبت و ارسال درخواست خدمات"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AfterSalesContainer;
