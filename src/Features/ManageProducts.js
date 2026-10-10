import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "@/services/apiProducts";

export const useProducts = () => {
    const {
        data: products = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    return {
        products,
        isLoading,
        error,
    };
};

export const useProduct = (id) => {
    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: Boolean(id),
    });

    return {
        product,
        isLoading,
        error,
    };
};

