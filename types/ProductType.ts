export type ProductType = {
    id: string;
    name: string;
    price: number | null;
    description: string | null;
    image: string;
    currency?: string;
    features?: string;
};
