import * as mongodb from "mongodb";
import { Lines } from "./lines";

export interface Order {
    lines: string[];
    user: string;
    price: number;
    tax: number;
    total: number;
    date: Date;
    status: "waiting" | "accepted" | "rejected";
    paid: boolean;
    delivered: boolean;
    extra: string;
    _id?: mongodb.ObjectId;
}