import { electron } from 'webpack'
import '../css/history.css'
import * as commonFunc from "./common"

var userHistory: any[]
if(localStorage.userHistoryWord) {
  try {
    userHistory = JSON.parse(localStorage.userHistoryWord) 

  } catch (error) {
    console.log(error)
    localStorage.userHistoryWord = ''
    userHistory = []
  }} else {
    console.log("no his")
  userHistory = []
}

function choseWord (this: GlobalEventHandlers ,evt: MouseEvent) {
  const targetTag = evt.target as Element
  console.log('click: ', targetTag.innerHTML)
  // let showTag = document.getElementById('showList')
  // let inputTag = document.getElementById('autocomplete')
  // showTag.style.display = 'none'
  // inputTag.style.borderRadius = '50px'

  document.getElementById('SearchContentIframe').setAttribute('src', "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + targetTag.innerHTML)
  // document.getElementById('divIframeSeach').style.display = 'none'

  // userHistory.push(ui.item.value)
  const urlO = 'queryWordO='+targetTag.innerHTML
  // userHistory.push(targetTag.innerHTML)
  fetch(urlO).then((response) => response.json()).then((data) => {
    console.log("get data from O")
    console.log(data)
    document.getElementById('SearchContentO').setAttribute('srcdoc', data)
    document.getElementById('tabSeach').style.display = 'block'
    document.getElementById('divIframeSeachO').style.display = 'block'
  })



}
function openSearchContent(this: GlobalEventHandlers,evt: MouseEvent) {
  var i, tablinks, searchTabName;
  let btnTarget = evt.target as HTMLButtonElement | null
  
  searchTabName = btnTarget.innerHTML
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
  btnTarget.className += " active";

}
if(userHistory.length >0){
  let item = ``
  userHistory.reverse().forEach(element => {
    item += `<button type="button" class="buttonHisClass" id="buttonHis">${element}</button>`
    document.getElementById("historyUser").innerHTML = item

  })
  let historyUserTag = document.getElementById('historyUser')
  let btnListTag = historyUserTag.getElementsByTagName('button')
  for(let i = 0; i < btnListTag.length; i++) {
    btnListTag[i].onclick = choseWord
  }

}
function navSideBtn(evt: any) {
  document.getElementById("navSide").classList.toggle('navSideToggle')
}
function logOut(evt: any){
  commonFunc.setCookie('username',"", 15)
  commonFunc.setCookie('email',"", 15)
  commonFunc.setCookie('token',"", 15)
  // $(".login-accountName")[0].innerHTML = `a href="login.html">Log In</a>`
  document.getElementById("login-accountName").innerHTML = `<a href="login.html">Log In</a>`
  // location.reload()
}




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
  document.getElementById("hamburger").onclick = navSideBtn

  document.getElementById("logOut").onclick = logOut
  document.getElementById("tablinksO").onclick = openSearchContent
  document.getElementById("tablinksC").onclick = openSearchContent

}




