import { json, response } from 'express';
import '../css/login.css'
function navSideBtn(evt: MouseEvent) {
    document.getElementById("navSide").classList.toggle('navSideToggle')
    
}

  
  

function btnSubmit(this: GlobalEventHandlers ,evt:MouseEvent){
    let inputTags = document.getElementsByClassName('inputForm') as HTMLCollectionOf<HTMLInputElement> | null

    let submitValue = {
        useremail : '',
        userpassword : '' 
    }

    if(inputTags[0] && inputTags[1]){
        submitValue.useremail = inputTags[0].value
        submitValue.userpassword = inputTags[1].value
    } else {
        return
    }
    console.log(submitValue)
    fetch('/login', {
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
        body: JSON.stringify(submitValue)
    }).then((response) => response.json()).then((data)=> {
        console.log(data)
                // if(response.body == "Wrong username or password"){
        //     let inputTags = document.getElementsByClassName('inputForm') as HTMLCollectionOf<HTMLInputElement> | null
        //     for(let i = 0; i < inputTags.length; i++){
        //         inputTags[i].classList.toggle("inputFormAler")
        //         }
        // }
    })
    
}
document.onreadystatechange = () => {
    document.getElementById("hamburger").onclick = navSideBtn
    document.getElementById("btnSubmit").onclick = btnSubmit

}
