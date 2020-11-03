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
            url:'services/pandora',
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
        birthYear="X",
        gender="X",
        zipcode="X",
        profilePrivate="X",
        emailOptOut="X",
        allowProfileComments="X",
        notifyOnComment="X",
        notifyOnFollow="X",
        artistPromoEmailsEnabled="X",
        artistAudioMessagesEnabled="X",
        isNew="X",
        branding="X",
        dailySkipLimit="X",
        stationSkipLimit="X",
        inactivityTimeout= "X"

    ;
    if (account.validAccount) {
        birthYear=account.accountInfo.birthYear;
            gender=account.accountInfo.gender;
            zipcode=account.accountInfo.zipCode;
            profilePrivate=account.accountInfo.profilePrivate;
            emailOptOut=account.accountInfo.emailOptOut;
            allowProfileComments=account.accountInfo.allowProfileComments;
            notifyOnComment=account.accountInfo.notifyOnComment;
            notifyOnFollow=account.accountInfo.notifyOnFollow;
            artistPromoEmailsEnabled=account.accountInfo.artistPromoEmailsEnabled;
            artistAudioMessagesEnabled=account.accountInfo.artistAudioMessagesEnabled;
            isNew=account.accountInfo.isNew;
            branding=account.accountInfo.config.branding;
            dailySkipLimit=account.accountInfo.config.dailySkipLimit;
            stationSkipLimit=account.accountInfo.config.stationSkipLimit;
            inactivityTimeout= account.accountInfo.config.inactivityTimeout;


    }
    $('tbody').prepend('<tr>' +
        '      <th scope="row">' + account.validAccount + '</th>' +
        '      <td>' + email + '</td>' +
        '      <td>' + password + '</td>' +
        '      <td>' + branding + '</td>' +
        '      <td>' + birthYear + '</td>' +
        '      <td>' + gender + '</td>' +
        '      <td>' + zipcode + '</td>' +
        '      <td>' + profilePrivate + '</td>' +
        '      <td>' + emailOptOut + '</td>' +
        '      <td>' + allowProfileComments + '</td>' +
        '      <td>' + notifyOnComment + '</td>' +
        '      <td>' + notifyOnFollow + '</td>' +
        '      <td>' + artistPromoEmailsEnabled + '</td>' +
        '      <td>' + artistAudioMessagesEnabled + '</td>' +
        '      <td>' + isNew + '</td>' +
        '      <td>' + dailySkipLimit + '</td>' +
        '      <td>' + stationSkipLimit + '</td>' +
        '      <td>' + inactivityTimeout + '</td>' +
        '    </tr>')
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
