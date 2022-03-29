
// wake up message

// order message

// confirmation message

// cancel message

// URL validator for https://buy.am/ urls
export function validateURL(url: string): boolean {
    let result = url.match(/(http(s)?:\/\/.)(www\.)?[buy\.am\/-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);    
    return result != null;
}

// Garçon states

export const listeningState = 0;
export const orderState = 1;
export const confirmationState = 2;
export const cancelState = 3;
export const idelState = 4;

// Garçon messages

export let greetings = ["Hi there, do you need help ?", "Can I help you monseur ?", "You had my attention, now you have my curiosity"];

export let orderDescription = ["Sorry, I expect your order to be in the following format: link : link to your order, comment : comment about your order, quantity : quantity of your order"];

export let confirmations = ["Got you, here is order confirmation", "Here is your order confirmation", "Here is your order, please pay attention"];

export let cancelations = ["Ok, I canceled your order"];

export let orderPlaces = "Order placed";