
import {saveOrder, Dish, Order} from '../src/orders';
import {validateURL} from '../src/message'

// test adding order
test('add order pushed an order in a list', () => {
    let testDish: Dish = {
        id: "some_id", 
        url: "some_url"
    };
    let testOrder: Order = {
        dish: testDish,
        requester: "id of requesting person",
        comment: "without lettuce",
        quantity: 3
    };
    let orders = saveOrder(testOrder);
    expect(orders.includes(testOrder)).toBe(true);
})

// test order parsing

test('check dish url to be correct', () => {
    let correctURL = "https://buy.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127";
    expect(validateURL(correctURL)).toBe(true)
})

test('reject incorrect dish url', () => {
    let inCorrectURL = "https://bu.am/hy/subtitle?imProduct=103983&imOrderNumber=f-28127";
    expect(validateURL(inCorrectURL)).toBe(false)
})
