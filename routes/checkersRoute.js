var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
var qs = require('qs');
var FormData = require('form-data');
const puppeteer = require('puppeteer');
let checkersRoute = require('../services/checkers');

require('dotenv').config();
const ENVIR = process.env.ENVIR === "PROD";

let browser;


(async function theBrowser() {
  browser = await puppeteer.launch({headless: ENVIR, args: ['--no-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']});
})()
    .then(() => console.log("browser launched succ"))
    .catch(err => console.log(err));

router.post('/:checker',  function (req, res, next) {
  const checkerType = req.params.checker;
  switch (checkerType)
  {
      case "spotify" :
          spotifyRoute(req.body,res);
          break;
      case "hotstar":
          hotstarRoute(req.body,res);
          break;
      case "zee5":
          zee5Route(req.body,res);
          break;
      case "altbalaji":
          altbalajiRoute(req.body,res);
          break;
      case "voot":
          vootRoute(req.body,res);
          break;
      case "sonyliv":
          sonylivRoute(req.body,res);
          break;
      case "jiosaavn":
          jiosaavnRoute(req.body,res);
          break;
      case "nordvpn":
          nordvpnRoute(req.body,res);
          break;
      case "pornhub":
          pornhubRoute(req.body,res);
          break;
      case "wwe":
          wweRoute(req.body,res);
          break;
      case "scribd":
          scribdRoute(req.body,res);
          break;
      case "pandora":
          pandoraRoute(req.body,res);
          break;
  }

});

function spotifyRoute(account,res) {
    const check = (async ()=> await checkersRoute.spotifyChecker(account))()
        .then(info =>{
            return res.send(info);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
                accountError:account
            }) // 500 error
        });

}

function hotstarRoute(account,res) {
    var hotstarPage;
    console.log(account);
    const check = (async ()=>{
        // const hotstarBrowser = await puppeteer.launch({headless: ENVIR, args: ['--no-sandbox']});
        const context = await browser.createIncognitoBrowserContext();
        hotstarPage = await context.newPage();
        return await checkersRoute.hotstarChecker(account,hotstarPage);
    })()
        .then(info =>{
            res.send(info);
        })
        .then(() => {
            closePageAfterCheck(hotstarPage);
        })
        .catch(err => {
            closePageAfterCheck(hotstarPage);
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
}

function zee5Route(account,res) {
    console.log(account);
    const check = (async ()=>{
        return await checkersRoute.zee5Checker(account);
    })()
        .then(info => res.send(info))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
}

function altbalajiRoute(account,res){
    console.log(account);
    const check = (async ()=>{
        return await checkersRoute.altbalajiChecker(account);
    })()
        .then(info =>res.send(info))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
};

function vootRoute(account,res){
    console.log(account);
    const check = (async ()=>{
        return await checkersRoute.vootChecker(account);
    })()
        .then(info =>res.send(info))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
}

function sonylivRoute(account,res){
    var sonylivPage;
    console.log(account);
    const check = (async ()=>{
        const context = await browser.createIncognitoBrowserContext();
        sonylivPage = await context.newPage();
        return await checkersRoute.sonylivChecker(account,sonylivPage);
    })()
        .then(info =>{
            res.send(info);
        })
        .then(() => {
            closePageAfterCheck(sonylivPage);
        })
        .catch(err => {
            closePageAfterCheck(sonylivPage);
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
}

function jiosaavnRoute(account,res){
    console.log(account);
    const check = (async ()=>{
        return await checkersRoute.jiosaavnChecker(account);
    })()
        .then(info =>res.send(info))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
}

function nordvpnRoute(account,res){
    var nordvpnPage;
    console.log(account);
    const check = (async ()=>{
        const context = await browser.createIncognitoBrowserContext();
        nordvpnPage = await context.newPage();
        return await checkersRoute.nordvpnChecker(account,nordvpnPage);
    })()
        .then(info =>{
            res.send(info);
        })
        .then(() => {
            closePageAfterCheck(nordvpnPage);
        })
        .catch(err => {
            closePageAfterCheck(nordvpnPage);
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
};

function pornhubRoute(account,res) {
    var pornhubPage;
    console.log(account);
    const check = (async ()=>{
        const context = await browser.createIncognitoBrowserContext();
        pornhubPage = await context.newPage();
        return await checkersRoute.pornhubChecker(account,pornhubPage);
    })()
        .then(info =>{
            res.send(info);
        })
        .then(() => {
            closePageAfterCheck(pornhubPage);
        })
        .catch(err => {
            closePageAfterCheck(pornhubPage);
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
};

function wweRoute(account,res) {
    console.log(account);
    const check = (async ()=>{
        return await checkersRoute.wweChecker(account);
    })()
        .then(info =>res.send(info))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
}

function scribdRoute(account,res){
    var scribdPage;
    console.log(account);
    const check = (async ()=>{
        const context = await browser.createIncognitoBrowserContext();
        scribdPage = await context.newPage();
        return await checkersRoute.scribdChecker(account,scribdPage);
    })()
        .then(info =>{
            res.send(info);
        })
        .then(() => {
            closePageAfterCheck(scribdPage);
        })
        .catch(err => {
            closePageAfterCheck(scribdPage);
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
}

function pandoraRoute(account,res){
    var pandoraPage;
    console.log(account);
    const check = (async ()=>{
        const context = await browser.createIncognitoBrowserContext();
        pandoraPage = await context.newPage();
        return await checkersRoute.pandoraChecker(account,pandoraPage);
    })()
        .then(info =>{
            res.send(info);
        })
        .then(() => {
            closePageAfterCheck(pandoraPage);
        })
        .catch(err => {
            closePageAfterCheck(pandoraPage);
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred trying to process your request',
            })
        });
};

function closePageAfterCheck(page){
    (async ()=> await page.close())()
        .then(()=> console.log('checked and page closed'))
        .catch(err => console.log("error closing",err));
}

module.exports = router;
