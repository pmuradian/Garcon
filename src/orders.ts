
export interface Dish {
    id: string;
    url: string;
};

export interface Order {
    dish: Dish;
    requester: string;
    comment: string;
    quantity: number;
};

export function saveOrder(order: Order): Order[] {
    const array = [];
    array.push(order)
    return array;
}

