import '../css/index.css'
$(function(){
  var searchWordRandom : string
  var cookieThis = getCookie('thisUser')
  console.log("cookie log " + cookieThis)
  var userHistory = cookieThis.split(',')
  $.get("randomWord", function(data, status){
      console.log(data)
      document.getElementById('buttonFC').innerHTML = data
      searchWordRandom = data
  })
  function setCookie(cname: string, cvalue: string | string[], exdays: number) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
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
    function openSearchContent(evt: any) {
      var i, tablinks, searchTabName;
      
      searchTabName = evt.currentTarget.innerHTML
      console.log("searchTabName " + searchTabName)
      switch(searchTabName) {
          case 'Oxford':
              
              // document.getElementById('SearchContentIframe').style.height = '0px'
              // document.getElementById('SearchContentIframe').style.width = '0px'
              document.getElementById('SearchContentO').style.display = 'block'
              document.getElementById('divIframeSeach').style.display = 'none'
              console.log("SearchContentO display " + document.getElementById('SearchContentO').style.display)
              break
          case 'Cambridge':
              // document.getElementById('SearchContentIframe').src = linkCam
              document.getElementById('SearchContentO').style.display = 'none'
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
  
  $("#buttonFC").click(function (e) { 
      e.preventDefault();
      document.getElementById('tabSeach').style.display = 'block'
      // document.getElementById('SearchContentIframe').src = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + searchWordRandom
      document.getElementById('SearchContentIframe').setAttribute('src', "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + searchWordRandom)
  
      document.getElementById('divIframeSeach').style.display = 'none'
      userHistory.push(searchWordRandom)
      setCookie('thisUser',userHistory,30)
      $.get("queryWordO="+searchWordRandom, function(datahtml, statushtml){
          // alert("\nStatus: " + statushtml);
          // data.getElementById('ad_leftslot_container').remove
          if(statushtml == 'success'){
              document.getElementById('SearchContentO').innerHTML = datahtml
          }
          // document.getElementById('ad_leftslot_container').remove
        });
  });
})

