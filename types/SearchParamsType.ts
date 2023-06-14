type SearchParams = {
    name: string;
    unit_amount: number | null;
    description: string | null;
    image: string;
    currency?: string;
    features?: string;
};

type Params = {
    id: string;
};

export type SearchParamsType = {
    params: Params;
    searchParams: SearchParams;
};
