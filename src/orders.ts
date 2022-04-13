import { validateURL } from "./message";
import { Dish } from "./specs/dish";
import { Order } from "./specs/order";

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

interface Invoice {
    user: string;
    orders: Order[];
}

export function generateInvoiceFor(orders: Order[]) {

    let invoice: Invoice[] = orders.map(order => {
        return {
            user: order.requester,
            orders: [order]
        }
    })

    return invoice.reduce((acc: any, curr) => {
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

export function orderFromMessage(orderMessage: string, senderID: string): Order {
    let strippedOrder = orderMessage.split("\n")

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