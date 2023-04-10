import { validateURL } from "./message";
import { Dish } from "../specs/dish";
import { Order } from "../specs/order";

function fetchOrder(order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            order.dish.name = "some_name"; // TODO: fetch dish name from url
            order.price = 1000; // TODO: fetch dish price from url
            resolve(true);
        }, 1000);
    });
}

let array: Order[] = [];

export function getOrders() {
    return array;
}

export function saveOrder(order: Order): Order[] {
    array.push(order)
    return array;
}

export function removeOrder(order: Order) {
    array.splice(array.indexOf(order, 0), 1);
    return array;
}

export function removeAllOrders() {
    array = [];
    return array;
}

export function generateInvoiceFor(orders: Order[]) {
    return orders.map(order => {
        return {
            user: order.requester,
            orders: [{
                name: order.dish.name,
                quantity: order.quantity,
                price: order.price
            }]
        }
    }).reduce((acc: any, curr) => {
        if (acc[curr.user] != undefined) {
            let orders = acc[curr.user];
            orders.push(...curr.orders);
            acc[curr.user] = orders;
        } else {
            acc[curr.user] = curr.orders;
        }
        return acc;
    }, {});
}

export function orderFromMessage(message: string, senderID: string): Order {
    let order: Order = {
        dish: {
            id: "",
            url: "",
            name: ""
        },
        requester: senderID,
        comment: "",
        quantity: 1,
        price: 1000
    }

    message.split("\n").forEach(nextLine => {
        if (nextLine.indexOf("link:") != -1) {
            let url = nextLine.substring(nextLine.indexOf("link:") + 5, nextLine.length).trim().replace(/^[<>]+|[<>]+$/g, "");
            console.log(`url = ${url}`)
            if (validateURL(url)) {
                order.dish.url = url
            }
        }

        if (nextLine.indexOf("comment:") != -1) {
            let comment = nextLine.substring(nextLine.indexOf("comment:") + 8, nextLine.length).trim().replace(/^<+|<+$/g, "");
            order.comment = comment
        }

        if (nextLine.indexOf("quantity:") != -1) {
            let quantity = nextLine.substring(nextLine.indexOf("quantity:") + 10, nextLine.length).trim().replace(/^<+|<+$/g, "");
            order.quantity = parseInt(quantity)
        }

        if (nextLine.indexOf("link:") == -1 && nextLine.indexOf("comment:") == -1 && nextLine.indexOf("quantity:") == -1) {
            let a = nextLine.replace(/^[<>]+|[<>]+$/g, "")
            if (validateURL(a)) {
                order.dish.url = a
            }
        }

        console.log('ordeR: ', order);
    });
    return order;
}