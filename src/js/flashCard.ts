import { response } from "express"
import * as commonFunc from "./common"
import "../css/flashcard.css"

let randomArray:Array<string>
let index = -1
let userHistory: any[]

if(localStorage.userHistoryWord) {
  userHistory = JSON.parse(localStorage.userHistoryWord) 
} else {
  userHistory = []
}


function navSideBtn(evt: MouseEvent) {
  let navSideTag = document.getElementById("navSide")
  navSideTag.classList.toggle('navSideToggle')

  
}
function logOut(evt: any){
  commonFunc.setCookie('username',"", 15)
  commonFunc.setCookie('email',"", 15)
  commonFunc.setCookie('token',"", 15)
  // $(".login-accountName")[0].innerHTML = `a href="login.html">Log In</a>`
  document.getElementById("login-accountName").innerHTML = `<a href="login.html">Log In</a>`
  // location.reload()
}
function clickAcceptCookie() {
  // document.getElementById('onetrust-accept-btn-handler').click()
  let iframeTag = document.getElementById("iframeContent") as HTMLIFrameElement | null
  console.log("IFRAMEEEEE: ", iframeTag)
  let innerDoc = iframeTag.contentDocument || iframeTag.contentWindow.document;

  let elmnt = innerDoc.getElementById('onetrust-banner-sdk')
  console.log("IFRAMEEEEE2: ", elmnt)
  elmnt.style.display = "none";
}
function flashCardToggle(this: GlobalEventHandlers,evt: MouseEvent){

  let containerFlashCardTag = document.getElementById("containerFlashCard")
  containerFlashCardTag.classList.toggle("rotateToggle")
  if(!containerFlashCardTag.classList.contains("rotateToggle")) {
    index += 1
    document.getElementById("randomText").innerHTML = randomArray[index]
    userHistory.push(randomArray[index])
    document.getElementById('iframeContent').setAttribute('src', "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + randomArray[index])
    setTimeout(clickAcceptCookie, 2000)
    
    if(index == randomArray.length - 1)
    {
      index = -1
      fetch('/randomWord',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      
      }).then((response)=> response.json()).then((data)=> {
        randomArray = data.map((word: { word: string }) => word.word)
      })
    }
  }
}

// after document loaded

document.onreadystatechange = () => {
  var email = commonFunc.getCookie('email')
  var username = commonFunc.getCookie('username')
  var token = commonFunc.getCookie('token')
  if(username) {
    // console.log($(".login-accountName")[0])
      // $(".login-accountName")[0].innerHTML = username
      document.getElementById("login-accountName").innerHTML = username

      // document.getElementById("userAccount").classList.toggle("userAccountToggle")
      // document.getElementById("logOutInMenu").style.display= 'block'
  } else {
    // <a href="">Log In</a>
    document.getElementById("login-accountName").innerHTML = `<a href="login.html">Log In</a>`
  }
  fetch('/randomWord',{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  
  }).then((response)=> response.json()).then((data)=> {
    console.log(typeof(data))
    randomArray = data.map((word: { word: string }) => word.word)

    console.log(randomArray)
    index += 1
    document.getElementById("randomText").innerHTML = randomArray[index]
    userHistory.push(randomArray[index])
    document.getElementById('iframeContent').setAttribute('src', "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + randomArray[index])

    setTimeout(clickAcceptCookie, 2000)
    // document.getElementById('onetrust-accept-btn-handler').click()

  })
  document.getElementById("hamburger").onclick = navSideBtn
  document.getElementById("logOut").onclick = logOut
  let btnList = document.getElementById("containerFlashCard").getElementsByTagName("button")
  for(let i = 0; i < btnList.length; i++){
    btnList[i].onclick = flashCardToggle
  }
  window.onbeforeunload = () => {
    localStorage.setItem('userHistoryWord', JSON.stringify(userHistory) )
  }
}