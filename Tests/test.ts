
import {saveOrder, orderFromMessage, generateInvoiceFor} from '../src/functions/orders';
import {validateURL} from '../src/functions/message'
import { Dish } from '../src/specs/dish';
import { Order } from '../src/specs/order';
import { fetchProductInfo } from '../src/resolvers/addProductsToBasket';

// test adding order
test('add order pushed an order in a list', () => {
    let testDish: Dish = {
        id: "some_id", 
        url: "some_url",
        name: "some_name"
    };
    let testOrder: Order = {
        dish: testDish,
        requester: "id of requesting person",
        comment: "without lettuce",
        quantity: 3,
        price: 1000
    };
    let orders = saveOrder(testOrder);
    expect(orders.includes(testOrder)).toBe(true);
})

// test url
test('check dish url to be correct', () => {
    let correctURL = "https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127";
    expect(validateURL(correctURL)).toBe(true)
})

test('reject incorrect dish url', () => {
    let inCorrectURL = "https://bu.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127";
    expect(validateURL(inCorrectURL)).toBe(false)
})

// test order parsing
test('check order message to be correct', () => {
    let correctOrder = "link: https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127\ncomment: without lettuce\nquantity: 3";
    let order = orderFromMessage(correctOrder, "id of requesting person");
    expect(order.comment).toBe("without lettuce")
    expect(order.quantity).toBe(3)
    expect(order.dish.url).toBe("https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127")
})

test('check order message to be correct', () => {
    let correctOrder = "link: https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127\nquantity: 3";
    let order = orderFromMessage(correctOrder, "id of requesting person")
    expect(order.quantity).toBe(3)
    expect(order.dish.url).toBe("https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127")
    expect(order.comment).toBe("")
})

test('check order message to be correct', () => {
    let correctOrder = "link: https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127\ncomment: without lettuce";
    let order = orderFromMessage(correctOrder, "id of requesting person")
    expect(order.comment).toBe("without lettuce")
    expect(order.dish.url).toBe("https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127")
    expect(order.quantity).toBe(1)
})

test('check order message to be correct', () => {
    let correctOrder = "link: https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127";
    let order = orderFromMessage(correctOrder, "id of requesting person")
    expect(order.comment).toBe("")
    expect(order.dish.url).toBe("https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127")
    expect(order.quantity).toBe(1)
})

test('check order message to be correct', () => {
    let correctOrder = "https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127";
    let order = orderFromMessage(correctOrder, "id of requesting person")
    expect(order.comment).toBe("")
    expect(order.dish.url).toBe("https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127")
    expect(order.quantity).toBe(1)
})

// test incorrect orders
// test('check order message to be incorrect', () => {
//     let correctOrder = "link: https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127, comment: without lettuce, quantity: asdf";
//     expect(validateOrder(correctOrder)).toBe(true)
// })

// test('check order message to be incorrect', () => {
//     let correctOrder = "link: https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127, comment: without lettuce, quantiy: 3";
//     expect(validateOrder(correctOrder)).toBe(true)
// })

// test('check order message to be incorrect', () => {
//     let correctOrder = "lin: https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127";
//     expect(validateOrder(correctOrder)).toBe(true)
// })

// Generate invoice

test('check generated invoice', () => {
    let orders: Order[] = [];
    for (let i = 1; i < 5; i++) {
        let testDish: Dish = {
            id: "some_id + " + i, 
            url: "some_url" + i,
            name: "some_name" + i
        };
        let testOrder: Order = {
            dish: testDish,
            requester: "id of requesting person" + i,
            comment: "without lettuce" + i,
            quantity: i,
            price: 100 * i
        };
        orders.push(testOrder);
    }

    for (let i = 1; i < 5; i++) {
        let testDish: Dish = {
            id: "some_id + " + i, 
            url: "some_url" + i,
            name: "some_name" + i
        };
        let testOrder: Order = {
            dish: testDish,
            requester: "id of requesting person" + i,
            comment: "without lettuce" + i,
            quantity: i,
            price: 100 * i
        };
        orders.push(testOrder);
    }

    // let invoice = generateInvoiceFor(orders);
    // expect(invoice.length).toBe(orders.length) // to be changed
})

jest.setTimeout(20000)
test ('check product fetching', async () => {
    let product = await fetchProductInfo(["https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127"]);
    console.log("This is what we got")
    product.then((value: any) => {
        expect(value.name).toBe("Բեկոնով սենդվիչ (փոքր) Subtitle")
        expect(value.price).toBe("850 ֏")
    })
})