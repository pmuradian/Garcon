
import 'dotenv/config';
import { App, subtype } from '@slack/bolt';
import puppeteer from 'puppeteer';
import addProductsToBasket from './resolvers/addProductsToBasket';
import {saveOrder, orderFromMessage} from './orders';
import { listeningState, orderState, confirmationState, cancelState, idelState, greetings, confirmations } from './message';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: Number(process.env.PORT) || 3000
});

interface Garçon {
  state: number;
}

export const URLBUYAM = 'https://buy.am/hy/?imProduct=191072&imOrderNumber=SW37604'

const Garçon = {
  state: idelState
}

app.event('message', async ({ message, say }: any): Promise<any> => {
  try {
    if (message.text == "Hey Garçon") {
      Garçon.state = listeningState;
      say(greetings[Math.floor(Math.random() * greetings.length)]);
    } else if (Garçon.state == listeningState && message.text == "I would like to place an order") {
      Garçon.state = orderState;
      say("Please place your order in the following format\nlink : link to your order\ncomment : comment about your order\nquantity : quantity of your order");
      say("comment and quantity are optional");
    } else if(Garçon.state == orderState) {
      let order = await orderFromMessage(message.text, message.user);
      let orderConfirmation = await saveOrder(order);
      say("Order placed for " + message.user);
      // say(confirmations[Math.floor(Math.random() * confirmations.length)]);
    }
  } catch (e) {
    console.error(e)
  }

  console.log(message)
});

(async () => {
  // Start your app
  await app.start();
  
  console.log('⚡️ Bolt app is running!');
})();
