export type ProductType = {
    id: string;
    name: string;
    unit_amount: number | null;
    quantity?: number | 1;
    description: string | null;
    image: string;
    currency?: string;
    features?: string;
};
