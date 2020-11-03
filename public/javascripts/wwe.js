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
            url:'services/wwe',
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
                console.log(i * arr.length / 100);
                // $('#progressBar').css('width',i * arr.length / 100);
            },
            error: function(data) {
                promises(arr,i+1);
                console.log('post error');
                console.log(JSON.stringify(data));
            }
        }
    )
    $('#progressBar').css('width',(i+1) / splited.length * 100 +"%");}



function prependerModified(account) {
    var
        email = account.accountLogin.email,
        password = account.accountLogin.password,
        licenceStatus = 'X',
        type='X',
        name='X',
        family='X',
        status='X',
        start= 'X',
        end='X',
        country='X',
        numSup='X',
        billingCycle='X',
        billingCycleType='X',
        valid_for_all_countries='X',
        countries='X',
        price='X'
    ;
    if (account.validAccount) {
        if(account.accountInfo.licences.length){
            type = account.accountInfo.licenses[0].type;
            name = account.accountInfo.licenses[0].name;
            family = account.accountInfo.licenses[0].family;
            status = account.accountInfo.status;
        }
        // plan = account.accountInfo.plan;
        // planType=account.accountInfo.planType,
        //     planTitle=account.accountInfo.planTitle,
        //     state=account.accountInfo.state,
        //     freeTrial=account.accountInfo.freeTrial,
        //     start= account.accountInfo.start,
        //     end=account.accountInfo.end,
        //     country=account.accountInfo.country,
        //     numSup=account.accountInfo.numSup,
        //     billingCycle=account.accountInfo.billingCycle,
        //     billingCycleType=account.accountInfo.billingCycleType,
        //     valid_for_all_countries=account.accountInfo.valid_for_all_countries,
        //     countries=account.accountInfo.countries,
        //     price=account.accountInfo.price;
    }
    $('tbody').prepend('<tr>' +
        '      <th scope="row">' + account.validAccount + '</th>' +
        '      <td>' + email + '</td>' +
        '      <td>' + password + '</td>' +
        '      <td>' + status + '</td>' +
        '      <td>' + type + '</td>' +
        '      <td>' + name + '</td>' +
        '      <td>' + family + '</td>' +
        '    </tr>')

}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
