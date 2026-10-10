/**
 * تبدیل اعداد انگلیسی موجود در یک متن یا عدد به اعداد فارسی
 * @param {string | number} input
 * @returns {string}
 */
export const toPersianDigits = (input) => {
    if (input === null || input === undefined) return "";

    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return input
        .toString()
        .replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
};

/**
 * تبدیل اعداد فارسی به انگلیسی (برای فرم‌ها و ارسال داده به API)
 * @param {string | number} input
 * @returns {string}
 */
export const toEnglishDigits = (input) => {
    if (input === null || input === undefined) return "";

    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    let str = input.toString();

    for (let i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }

    return str;
};

/**
 * جداسازی ۳ رقمی ارقام و تبدیل به اعداد فارسی
 * @param {string | number} price
 * @returns {string}
 */
export const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) return "۰";

    const formatted = Number(price).toLocaleString("en-US");
    return toPersianDigits(formatted);
};
