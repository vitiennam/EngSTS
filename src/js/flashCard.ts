import "../css/flashcard.css"
function navSideBtn(evt: MouseEvent) {
  let navSideTag = document.getElementById("navSide")
  if(navSideTag.classList.toggle('navSideToggle')) {
    
  }
  
}
function flashCardToggle(this: GlobalEventHandlers,evt: MouseEvent){

  let containerFlashCardTag = document.getElementById("containerFlashCard")
  containerFlashCardTag.classList.toggle("rotateToggle")
}

document.onreadystatechange = () => {
  document.getElementById("hamburger").onclick = navSideBtn
  let btnList = document.getElementById("containerFlashCard").getElementsByTagName("button")
  for(let i = 0; i < btnList.length; i++){
    btnList[i].onclick = flashCardToggle
  }

}