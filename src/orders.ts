import { validateURL } from "./message";

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

let array: Order[] = [];

export function saveOrder(order: Order): Order[] {
    array.push(order)
    return array;
}

export function removeOrder(order: Order) {
    array.splice(array.indexOf(order, 0), 1);
    return array;
}

export function orderFromMessage(orderMessage: string, senderID: string): Order {
    let strippedOrder = orderMessage.split("\n")

    let order: Order = {
        dish: {
            id: "",
            url: ""
        },
        requester: senderID,
        comment: "",
        quantity: 1
    }

    const orderTwo = strippedOrder.forEach(element => {
        if (element.indexOf("link:") != -1) {
            let url = element.substring(element.indexOf("link:") + 5, element.length).trim()
            if (validateURL(url)) {
                order.dish.url = url
            }
        }

        if (element.indexOf("comment:") != -1) {
            let comment = element.substring(element.indexOf("comment:") + 8, element.length).trim()
            order.comment = comment
        }

        if (element.indexOf("quantity:") != -1) {
            let quantity = element.substring(element.indexOf("quantity:") + 10, element.length).trim()
            order.quantity = parseInt(quantity)
        }

        if (element.indexOf("link:") == -1 && element.indexOf("comment:") == -1 && element.indexOf("quantity:") == -1) {
            if (validateURL(element)) {
                order.dish.url = element
            }
        }
    })
    console.log(order)
    return order;
}