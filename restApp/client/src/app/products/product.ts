export interface Product {
    name: string;
    desc: string; // description
    l_desc: string; // long description
    price: number;
    category: number;
    img: string;
    pos: number; // position
    available: boolean
    time: number; // preparation time
    excl: number; // percentage of exclusivity
    allergens: number[];
    tags: string[];
    _id?: string;
}