import { response } from "express"
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
function flashCardToggle(this: GlobalEventHandlers,evt: MouseEvent){

  let containerFlashCardTag = document.getElementById("containerFlashCard")
  containerFlashCardTag.classList.toggle("rotateToggle")
  if(!containerFlashCardTag.classList.contains("rotateToggle")) {
    index += 1
    document.getElementById("randomText").innerHTML = randomArray[index]
    userHistory.push(randomArray[index])
    document.getElementById('iframeContent').setAttribute('src', "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + randomArray[index])

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

  })
  document.getElementById("hamburger").onclick = navSideBtn
  let btnList = document.getElementById("containerFlashCard").getElementsByTagName("button")
  for(let i = 0; i < btnList.length; i++){
    btnList[i].onclick = flashCardToggle
  }
  window.onbeforeunload = () => {
    localStorage.setItem('userHistoryWord', JSON.stringify(userHistory) )
  }
}