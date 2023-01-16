
import * as commonFunc from "./common"
import "../css/index.css"

var engDataSearch: ArrayLike<String>
var userHistory: any[]
var notClick = ['dropMenuContent', 'dropMenu', 'dropBtn', 'dropClick', 't1', 't2', 't3'];

if(localStorage.userHistoryWord) {
  userHistory = JSON.parse(localStorage.userHistoryWord) 
} else {
  userHistory = []
}
if(localStorage.engDataSearch) {
    engDataSearch = JSON.parse(localStorage.engDataSearch) 
  } else {
    $.get("engDataSearch", function(data, status){
        // alert("Data: "  + "\nStatus: " + status);
        
        engDataSearch = JSON.parse(data)
        localStorage.setItem('engDataSearch', JSON.stringify(engDataSearch) )
    
      });
  }
function logOut(evt: any){
    commonFunc.setCookie('username',"", 15)
    commonFunc.setCookie('email',"", 15)
    commonFunc.setCookie('token',"", 15)
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
            // document.getElementById('SearchContentO').style.width = '100%'
            // document.getElementById('SearchContentO').style.height = '1000px'
            console.log("SearchContentO display " + document.getElementById('SearchContentO').style.display)
            break
        case 'Cambridge':
            // document.getElementById('SearchContentIframe').src = linkCam
            document.getElementById('divIframeSeachO').style.display = 'none'
            document.getElementById('divIframeSeach').style.display = 'block'
            // document.getElementById('SearchContentIframe').style.width = '100%'
            // document.getElementById('SearchContentIframe').style.height = '1000px'
            console.log("SearchContent display " + document.getElementById('SearchContentO').style.display)
            break
        
        

    }

    tablinks = document.getElementsByClassName("btnContent");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // document.getElementById(searchTabName).style.display = "block";
    evt.currentTarget.className += " active";

}
function dropBtn(evt: any) {
  if(document.getElementById("dropMenuContent").style.display == "block")
  {
    document.getElementById("dropMenuContent").style.display = "none"
  }
  else {
    document.getElementById("dropMenuContent").style.display = "block"
  }
}


// ------------------------
$(function(){

    var email = commonFunc.getCookie('email')
    var username = commonFunc.getCookie('username')
    var token = commonFunc.getCookie('token')

    if(username) {
        $(".userNameLi")[0].innerHTML = username

    }
    else {
      document.getElementById('PicLi').style.display = 'none'

    }
    document.getElementById("tablinksO").onclick = openSearchContent
    document.getElementById("tablinksC").onclick = openSearchContent
    document.getElementById("dropBtn").onclick = dropBtn
    document.onclick = function(evt: any) {
      if(document.getElementById("dropMenuContent").style.display == "block")
      {
        if( notClick.includes(evt.target.id) == false) {
          console.log(evt.target.id)

          document.getElementById("dropMenuContent").style.display = "none"
        }
      }
      
    }
    $( "#autocomplete" ).autocomplete({
        source: function( request: any, response:any ) {
                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                response( $.grep( engDataSearch, function( item: any ){
                    return matcher.test( item );
                }) );
            },
        select: function( event: any, ui: any ) {
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
                // document.getElementById('SearchContentO').style.width = '100%'
                // document.getElementById('SearchContentO').style.height = '1000px'
                document.getElementById('SearchContentO').setAttribute('srcdoc', data)
    
              });

    
        }
    }
    )
    window.onbeforeunload = function () {
        localStorage.setItem('userHistoryWord', JSON.stringify(userHistory) )
      };

})


