import './css/index.css'

$(function(){
  var email = getCookie('email')
  var username = getCookie('username')
  var token = getCookie('token')

  console.log('username: ', username)
  if(username){
    document.getElementById('loginA').innerHTML = 'Hi ' + username
    document.getElementById('loginA').setAttribute('href', '#')
    document.getElementById('buttonLogout').onclick = logOut
  } else {
    document.getElementById('divButtonLogout').style.display = 'none'
    
  }
  function logOut(evt: any){
    setCookie('username',"", 15)
    setCookie('email',"", 15)
    setCookie('token',"", 15)
    location.reload()
  }
  function openSearchContent(evt: any) {
    var i, tablinks, searchTabName;
    
    searchTabName = evt.currentTarget.innerHTML
    console.log("searchTabName " + searchTabName)
    switch(searchTabName) {
        case 'Oxford':
            
            // document.getElementById('SearchContentIframe').style.height = '0px'
            // document.getElementById('SearchContentIframe').style.width = '0px'
            document.getElementById('divIframeSeachO').style.display = 'block'
            document.getElementById('divIframeSeach').style.display = 'none'
            document.getElementById('SearchContentO').style.width = '100%'
            document.getElementById('SearchContentO').style.height = '1000px'
            console.log("SearchContentO display " + document.getElementById('SearchContentO').style.display)
            break
        case 'Cambridge':
            // document.getElementById('SearchContentIframe').src = linkCam
            document.getElementById('divIframeSeachO').style.display = 'none'
            document.getElementById('divIframeSeach').style.display = 'block'
            document.getElementById('SearchContentIframe').style.width = '100%'
            document.getElementById('SearchContentIframe').style.height = '1000px'
            console.log("SearchContentO display " + document.getElementById('SearchContentO').style.display)
            break
            
            

    }
    // tabcontent = document.getElementsByClassName("iframe");
    // for (i = 0; i < tabcontent.length; i++) {
    //     tabcontent.style.display = "none";
    // }
    
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // document.getElementById(searchTabName).style.display = "block";
    evt.currentTarget.className += " active";
    
  }

  document.getElementById("tablinksO").onclick = openSearchContent
  document.getElementById("tablinksC").onclick = openSearchContent
  function getCookie(cname: string) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function checkCookie(cname: string) {
    let user = getCookie(cname);
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie(cname, user, 365);
      }
    }
  }
  var userHistory: any[]
  if(localStorage.userHistoryWord) {
    userHistory = JSON.parse(localStorage.userHistoryWord) 
  } else {
    userHistory = []
  }
  // var cookieThis = getCookie('thisUser')
  // console.log("cookie log " + cookieThis)
  // var userHistory = cookieThis.split(',')
  console.log(userHistory)
  
  function setCookie(cname: string, cvalue: string | string[], exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  
  var engDataSearch: ArrayLike<unknown>
  
  $.get("engDataSearch", function(data, status){
      // alert("Data: "  + "\nStatus: " + status);
      
      engDataSearch = JSON.parse(data)
    });
  
  
  
    
  
  $( "#autocomplete" ).autocomplete({
      source: function( request: any, response:any ) {
              var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
              response( $.grep( engDataSearch, function( item: any ){
                  return matcher.test( item );
              }) );
          },
      select: function( event: any, ui:any ) {
        userHistory.push(ui.item.value)
        // localStorage.setItem('userHistoryWord', JSON.stringify(userHistory) )
          // console.log(ui)
          document.getElementById('tabSeach').style.display = 'block'
          // document.getElementById('SearchContentIframe').src = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + ui.item.value
          // document.getElementById('SearchContentIframe').style.width = '0%'
          // document.getElementById('SearchContentIframe').style.height = '0%'
          // document.getElementById('SearchContentIframe').src = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + ui.item.value
          document.getElementById('SearchContentIframe').setAttribute('src', "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + ui.item.value)
          document.getElementById('divIframeSeach').style.display = 'none'
          // document.getElementById('SearchContentO').attributes.source = "https://www.oxfordlearnersdictionaries.com/definition/american_english/"+ ui.item.value+ "?q="+ ui.item.value
          // console.log("link source " +String( document.getElementById('SearchContentO').attributes))
          // document.getElementById('SearchContentC').attributes.source = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + ui.item.value
  
          $.get("queryWordO="+ui.item.value, function(data, status){
              // alert("\nStatus: " + status);
              // data.getElementById('ad_leftslot_container').remove
              // document.getElementById('SearchContentO').innerHTML = data
              document.getElementById('SearchContentO').style.width = '100%'
              document.getElementById('SearchContentO').style.height = '1000px'
              document.getElementById('SearchContentO').setAttribute('srcdoc', data)

              // document.getElementById('ad_leftslot_container').remove
            });
          //   $.get("queryWordC="+ui.item.value, function(data, status){
          //     // alert("\nStatus: " + status);
          //     // data.getElementById('ad_leftslot_container').remove
          //     document.getElementById('SearchContentC').innerHTML = data
          //     // document.getElementById('ad_leftslot_container').remove
          //   });
            
  
  
  
          //   $.get("queryWordGG="+ui.item.value, function(data, status){
          //     // alert("\nStatus: " + status);
          //     // data.getElementById('ad_leftslot_container').remove
          //     document.getElementById('SearchContentGG').innerHTML = data
          //     // document.getElementById('ad_leftslot_container').remove
          //   });
  
      }
  }
  );
  window.onbeforeunload = function () {
    localStorage.setItem('userHistoryWord', JSON.stringify(userHistory) )
};

});


