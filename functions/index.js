const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// const puppeteer = require('puppeteer');

// exports.makePDF = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'hn.pdf', format: 'A4'});

//   await browser.close();
// };
