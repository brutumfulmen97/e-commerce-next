type SearchParams = {
    name: string;
    unit_amount: number;
    description: string;
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
