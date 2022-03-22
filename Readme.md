# Garçon

![Garçon](./garcon.png)

## What is it about ?

Garçon is a slack bot designed for recommending restaurants and order lunches for you from [buy.am](https://buy.am/hy/) delivery service.

## Capabilities

Garçon should be able to 
- present available restaurants listed in buy.am
- fetch available dishes for a selected restaurant
- order selected dish/dishes
- send corresponding invocies to your teammates who placed orders


## How to build Garçon

You need ***SLACK_BOT_TOKEN***, ***SLACK_APP_TOKEN*** and ***SLACK_SIGNING_SECRET*** tokens 
(they are confidential, most probably you should create your own app for Slack and generate them)

1. Export above mentioned tokens

`export SLACK_SIGNING_SECRET=<YOUR_SLACK_SIGNING_SECRET>`

`export SLACK_BOT_TOKEN=<YOUR_SLACK_BOT_TOKEN>`

`export SLACK_APP_TOKEN=<YOUR_SLACK_APP_TOKEN>`

2. Run `npm install` to install dependencies

3. And then run `node app.js`

That's it, Garçon is up and running, you can start chatting with him right away

## Implementation details

- language: Typescript
- tests: yes please, we are using JEST
- issues, bugs and features: we will use github issues for this
- workflow: create pull requests for your changes and they will be reviewed (eventually)

## Contribution

Your contribution is welcomed and highly appreciated
