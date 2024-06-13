import * as mongodb from "mongodb";
import { Lines } from "./lines";

export interface Order {
    lines: Lines[];
    user: string;
    price: number;
    tax: number;
    total: number;
    date: Date;
    status: "waiting" | "accepted" | "rejected";
    paid: boolean;
    delivered: boolean;
    _id?: mongodb.ObjectId;
}