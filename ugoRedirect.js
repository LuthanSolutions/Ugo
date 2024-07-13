const uGoAdminUrl = "https://whatevertheugoadminurlis.com";
const uGoAdminExpandUrl = uGoAdminUrl + "/expand/";
const uGoApiUrl = "https://localhost:7077/GetUgoLink/";

window.onload = async function(){
    /* We'll actually do this:
    const url = new URL(window.location.href);
    window.location.replace(this.getRedirectUrl(url));
    */

    //For testing only
    var url = new URL('https://uGO/mypage/dosomething?value=glen#myPlaceOnPage');
    //var url = new URL('https://uGO/mypage/dosomething');
    //var url = new URL('https://uGO/mypage/');
    //var url = new URL('https://uGO/mypage');
    //var url = new URL('https://uGO/mypage+');
    document.getElementById('myText').value = this.getUrlParts(url);
    let redirectUrl = await this.getRedirectUrl(url);
    document.getElementById('myText2').value = redirectUrl;
}

async function getRedirectUrl(url){
    let retVal = uGoAdminUrl;
    //If user hasn't entered only ugo or ugo/
    if(url.pathname && url.pathname.length > 1){
        //Get what the user entered after ugo/
        const pathText = url.pathname.substring(1);
        //If this is an expand
        if(pathText.endsWith("+")){
            retVal = uGoAdminExpandUrl + pathText.substring(0, pathText.length -1);
        }
        else{
            //Get the shortened or customised link
            let uGoLink = "";
            if(pathText.indexOf("/") > -1){
                uGoLink = pathText.substring(0, pathText.indexOf('/'));
            }
            else{
                uGoLink = pathText;
            }
            //Get the rest of what the user entered
            const suffix = pathText.substring(pathText.indexOf('/'));
            //Try to get the original link from ugo
            await this.getUgoUrl(uGoLink).then(function(result){
                //If we got something
                if(result){
                    //Make the correct link to redirect to
                    retVal = result + suffix + url.search + url.hash;
                }
            }); 
        }
    }
    return retVal;
}

async function getUgoUrl(uGoLink){
    try{
        const response = await fetch(uGoApiUrl + uGoLink);
        if(response.ok){
            return await response.text();
        }
        return null;
    }
    catch{
        return null;
    }
}

//For testing only
function getUrlParts(url){
    return 'href: ' + url.href + '\n' + 
           'host: ' + url.host + '\n' +
           'pathname: ' + url.pathname + '\n' +
           'search: ' + url.search + '\n' +
           'hash: ' + url.hash + '\n';
}