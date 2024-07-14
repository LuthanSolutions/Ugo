This will be the url of the uGo admin application
<br>
**const uGoAdminUrl = "https://whatevertheugoadminurlis.com";**

This will be the url of the api that gets original links from MySql database, or Redis cache.
On my PC this is just minimal api that always returns 'https://pretendyurl.com/pagename'
<br>
**const uGoApiUrl = "https://localhost:7077/GetUgoLink/";**

Should we just do this if user has entered anything after '+'?
**
if(pathText.endsWith("+")){
    retVal = uGoAdminExpandUrl + pathText.substring(0, pathText.length -1);
}
**