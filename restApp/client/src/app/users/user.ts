export interface User {
    mail: string;
    pass: string;
    name: string;
    phone: number;
    address: string[];
    role: "admin" | "customer";
    newsletter: boolean;
    _id?: string;
}