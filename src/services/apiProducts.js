import { supabase } from "./supabase.js";

/**
 * دریافت لیست تمام محصولات (برای صفحه اصلی، اسلایدر و کاتالوگ)
 */
export const getProducts = async () => {
    const { data, error } = await supabase
        .from("product")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching products:", error);
        throw error;
    }

    return data;
};

/**
 * دریافت اطلاعات یک محصول خاص با شناسه (ID)
 * @param {string|number} id
 */
export const getProductById = async (id) => {
    const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(`Error fetching product #${id}:`, error);
        throw error;
    }

    return data;
};

/**
 * دریافت اطلاعات یک محصول با کد اختصاصی محصول (PA-...)
 * @param {string} code
 */
export const getProductByCode = async (code) => {
    const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("code", code)
        .single();

    if (error) {
        console.error(`Error fetching product by code ${code}:`, error);
        throw error;
    }

    return data;
};
