
import {saveOrder, Dish, Order} from '../src/orders';

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