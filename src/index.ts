import 'dotenv/config';
import { App, subtype } from '@slack/bolt';
import puppeteer from 'puppeteer';
import addProductsToBasket from './resolvers/addProductsToBasket';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: Number(process.env.PORT) || 3000
});

export const URLBUYAM = 'https://buy.am/hy/?imProduct=191072&imOrderNumber=SW37604'


app.event('message', async ({ message, say }: any): Promise<any> => {
  try {


  } catch (e) {
    console.error(e)
  }


  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start();
  
  console.log('⚡️ Bolt app is running!');
})();