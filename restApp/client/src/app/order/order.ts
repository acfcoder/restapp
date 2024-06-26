export interface Order {
    lines: {
        id: string,
        name: string,
        price: number;
        quantity: number;
    }[]; 
    user: string;
    price: number;
    tax: number;
    total: number;
    date: Date;
    status: "waiting" | "accepted" | "rejected";
    paid: boolean;
    delivered: boolean;
    deliveredCost: number | string;
    extra: string;
    _id?: string;
}
