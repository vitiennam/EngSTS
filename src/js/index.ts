
import * as commonFunc from "./common"
import "../css/index.css"
import $ from 'jquery'

import './jquery-ui'
// import 'jquery-ui'

var engDataSearch: ArrayLike<String>
var userHistory: any[]
let numChoseLi = -1
let keyAccept = ['ArrowUp', 'ArrowDown', 'Down', 'Up', 'Enter']


// var notClick = ['dropMenuContent', 'dropMenu', 'dropBtn', 'dropClick', 't1', 't2', 't3'];

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
    $(".login-accountName")[0].innerHTML = `a href="login.html">Log In</a>`
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
function navSideBtn(evt: any) {

  // document.getElementById("dropMenuContent").classList.toggle("show")
  if(document.getElementById("navSide").style.display == "flex")
  {
    document.getElementById("navSide").style.display = "none"
  }
  else {
    document.getElementById("navSide").style.display = "flex"
  }
}
function choseWord (evt: any) {
  console.log('click: ', evt.currentTarget.innerHTML)
  let showTag = document.getElementById('showList')
  let inputTag = document.getElementById('autocomplete')
  showTag.style.display = 'none'
  inputTag.style.borderRadius = '50px'
}
function inputChange (ev: Event) {
  let inputValue = this.value
  let showTag = document.getElementById('showList')
  let inputTag = document.getElementById('autocomplete')
  showTag.innerHTML = ''
  if(inputValue){
    
    
    showTag.style.display = 'block'
    
    inputTag.style.borderRadius = '25px 25px 0 0'
    // let showWord = ``
    for(let i = 0; i < 10; i++){
      // showWord += `<li class='liSearchResult' onclick=${choseWord}>${inputValue}</li>`
      let liTag = document.createElement('li')
      liTag.innerHTML = inputValue + i
      liTag.className = 'liSearchResult'
      liTag.style.fontSize = '1.5rem'
      liTag.onclick = choseWord
      
      showTag.appendChild(liTag)
      // console.log(showWord)
      
      
    }
    // let listLiTag = document.querySelectorAll('.liSearchResult')
    // listLiTag.forEach(liTag => liTag.onclick )
    // showTag.innerHTML = showWord
    
  } else {
    showTag.style.display = 'none'
    inputTag.style.borderRadius = '50px'
    numChoseLi = -1
  }
}



function keyUp(evt: KeyboardEvent) {
  console.log("key Up: ", evt.key)
  
  let showTag = document.getElementById('showList')
  let listLiTag = showTag.getElementsByTagName('li')
  // console.log(showTag.style.display)
  // (evt.key == 'ArrowUp' || evt.key == 'ArrowDown')
  if(showTag.style.display == 'block' && keyAccept.includes(evt.key)) {
    // numChoseLi += 1
    console.log("key Down 2")
    if(listLiTag){
      
      // console.log(evt.key)
      if (['ArrowUp', 'Up'].includes(evt.key)) {
        if(numChoseLi >= 0){
          listLiTag[numChoseLi].classList.toggle('activeLi') 
          // listLiTag[numChoseLi].onkeyup = null
        }
        // up arrow
        console.log("up")
        numChoseLi -= 1
        
        if (numChoseLi < 0){
          numChoseLi = listLiTag.length - 1
        }
        console.log(numChoseLi)
        console.log(numChoseLi)
        console.log(listLiTag[numChoseLi])
        listLiTag[numChoseLi].classList.toggle('activeLi')

        listLiTag[numChoseLi].scrollIntoView({block: 'nearest'})
      }
      else if (['ArrowDown', 'Down'].includes(evt.key)) {
        if(numChoseLi >= 0){
          listLiTag[numChoseLi].classList.toggle('activeLi') 
          // listLiTag[numChoseLi].onkeyup = null
        }
          // down arrow
          console.log("down")
          numChoseLi += 1
          
          if (numChoseLi > listLiTag.length - 1){
            numChoseLi = 0
          }
          console.log(numChoseLi)
          console.log(numChoseLi)
          console.log(listLiTag[numChoseLi])
          listLiTag[numChoseLi].classList.toggle('activeLi')

          listLiTag[numChoseLi].scrollIntoView({block: 'nearest'})
      } else if(evt.key == 'Enter') {
        console.log("enter event ", numChoseLi)
        listLiTag[numChoseLi].click()
      }
      
      // console.log(listLiTag[numChoseLi].style.backgroundColor)
    
    }
  }
}

// ------------------------
document.onreadystatechange = () => {
  document.getElementById('autocomplete').addEventListener('input', inputChange)
  document.onkeyup = keyUp
  var email = commonFunc.getCookie('email')
  var username = commonFunc.getCookie('username')
  var token = commonFunc.getCookie('token')

  if(username) {
    // console.log($(".login-accountName")[0])
      $(".login-accountName")[0].innerHTML = username

      // document.getElementById("userAccount").classList.toggle("userAccountToggle")
      // document.getElementById("logOutInMenu").style.display= 'block'
  }

  document.getElementById("tablinksO").onclick = openSearchContent
  document.getElementById("tablinksC").onclick = openSearchContent
  document.getElementById("hamburger").onclick = navSideBtn
  // console.log(document.getElementsByClassName("logOut")[0])
  // console.log(document.getElementById("logOut").onli)

  document.getElementById("logOut").onclick = logOut
  // document.getElementById("logOutInMenu").onclick = logOut

  // Check click
  // document.onclick = function(evt: any) {
  //   // console.log(document.getElementById("dropMenuContent").style.display)
  //   if(document.getElementById("dropMenuContent").style.display == "block")
  //   {
      
  //     if( notClick.includes(evt.target.id) == false) {
  //       console.log(evt.target.id)

  //       document.getElementById("dropMenuContent").style.display = "none"
  //     }
  //   }
    
  // }

  // window.onclick = function(event:any) {
  //   if (!event.target.matches('.dropBtn')) {
  //     var dropdowns = document.getElementsByClassName("dropMenuContent");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }
  $( "#autocompleteD" ).autocomplete({
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
    }
}


// $(function(){


// })
