const uGoAdminLink = "https://whatevertheugoadminurlis.com";
const url = "https://localhost:7077/GetUgoLink/";

window.onload = async function(){
    //We'll actually do this:
    //const url = new URL(window.location.href);
    //window.location.replace(getRedirectUrl(url));

    //For testing only
    var url = new URL('https://uGO/mypage/dosomething?value=glen#myPlaceOnPage');
    document.getElementById('myText').value = getUrlParts(url);
    let redirectUrl = await getRedirectUrl(url);
    document.getElementById('myText2').value = redirectUrl;
}

async function getRedirectUrl(url){
    let retVal = uGoAdminLink;
    //If user hasn't entered only ugo or ugo/
    if(url.pathname && url.pathname.length > 1){
        //Get what the user entered after ugo/
        const pathText = url.pathname.substring(1);
        //Get the shortened or customised link
        const uGoLink = pathText.substring(0, pathText.indexOf('/'));
        //Get the rest of what the user entered
        const suffix = pathText.substring(pathText.indexOf('/'));
        //Try to get the original link from ugo
        await getUgoUrl(uGoLink).then(function(result){
            //If we got something
            if(result){
                //Make the correct link to redirect to
                retVal = result + suffix + url.search + url.hash;
            }
        }); 
    }
    return retVal;
}

async function getUgoUrl(uGoLink){
    try{
        const response = await fetch(url + uGoLink);
        if(response.ok){
            return await response.text();
        }
        return null;
    }
    catch(ex){
        return null;
    }
}

function getUrlParts(url){
    return 'href: ' + url.href + '\n' + 
           'host: ' + url.host + '\n' +
           'pathname: ' + url.pathname + '\n' +
           'search: ' + url.search + '\n' +
           'hash: ' + url.hash + '\n';
}