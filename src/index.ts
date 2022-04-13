
import 'dotenv/config';
import { App, subtype } from '@slack/bolt';
import puppeteer from 'puppeteer';
import addProductsToBasket from './resolvers/addProductsToBasket';
import {saveOrder, orderFromMessage, getOrders} from './orders';
import { listeningState, orderState, confirmationState, cancelState, idelState, greetings, confirmations, cancelations } from './message';

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

let timer: NodeJS.Timeout;
const timeInterval = 15000 //1000 * 60 * 60;

app.event

app.event('message', async ({ message, say, client }: any): Promise<any> => {
  try {

    const result = await client.users.info({
      user: message.user,
   });
   const selectedUser = result.user.name;
   console.log(`@${selectedUser}`, 'ooooooooo');

    if (message.text.toLowerCase() == "cancel" && timer) {
      clearTimeout(timer);
      Garçon.state = idelState;
      say(cancelations[0]);
      return;
    }

    console.log(Garçon);

    if (message.text.toLowerCase() === "gey garçon" || 
    message.text.toLowerCase() === "garçon" || 
    message.text.toLowerCase() === "hey garcon" || 
    message.text.toLowerCase() === "garcon" ||
    message.text.toLowerCase() === '1') {

      Garçon.state = listeningState;
      say(greetings[Math.floor(Math.random() * greetings.length)]);

    } else if (Garçon.state === listeningState && 
      message.text.toLowerCase() === "I would like to place an order".toLowerCase() || 
      message.text.toLowerCase() === "2") {

      Garçon.state = orderState;
        const f = {
          ['*link*']: '_link to your order_',
          ['*comment*']: '_comment about your order_',
          ['*quantity*']: '_quantity of your order_'
        }

      say(JSON.stringify(f, null, 1).replace(/{|}|"/g,'')) 
      say("*comment* and *quantity* fields are optional");
      
      // start a one hour timer
       timer = setTimeout(() => {
        Garçon.state = confirmationState;
        say("Your time is up");
        say("Please confirm order" + app.client.conversations.members)
        // order foooooood
      }, timeInterval);

    } else if(Garçon.state == orderState) {
      let order = await orderFromMessage(message.text, message.user);
      let orderConfirmation = await saveOrder(order);
      if (orderConfirmation) {
        say("Order saved for " + message.user);
      }
    } else if (Garçon.state == confirmationState && message.text.toLowerCase() == "confirm") {
      say("Order placed for " + message.user);
    }else{
      console.log('object');
    }
  } catch (e) {
    console.error(e)
    timer && clearTimeout(timer);
    Garçon.state = idelState;
  }
});

(async () => {
  // Start your app
  await app.start();
  
  console.log('⚡️ Bolt app is running!');
})();
