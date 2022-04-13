import { Dish } from "./dish";

export interface Order {
    dish: Dish;
    requester: string;
    comment: string;
    quantity: number;
    price: number;
};