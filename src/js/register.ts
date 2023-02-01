
import '../css/register.css'
function navSideBtn(evt: MouseEvent) {
    document.getElementById("navSide").classList.toggle('navSideToggle')
    
}
function inputChange (this: HTMLElement,ev: Event) {
    let inputTags = document.getElementsByClassName('inputForm') as HTMLCollectionOf<HTMLInputElement> | null
    if(inputTags[2].value != inputTags[3].value){
        if(!this.classList.contains("inputFormAler")){
            this.classList.toggle("inputFormAler")
        }
    }else{
        this.classList.toggle("inputFormAler")
    }
}
  
  

function btnSubmit(this: GlobalEventHandlers ,evt:MouseEvent){
    let inputTags = document.getElementsByClassName('inputForm') as HTMLCollectionOf<HTMLInputElement> | null

    if(inputTags[2].value != inputTags[3].value) {

        return
    }

    let submitValue = {
        username : '',
        useremail : '',
        userpassword : '' 
    }

    if(inputTags[0].value && inputTags[1].value && inputTags[2].value){
        submitValue.username = inputTags[0].value
        submitValue.useremail = inputTags[1].value
        submitValue.userpassword = inputTags[2].value
    } else {
        return
    }
    console.log(submitValue)
    fetch('/signup', {
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
        if(data.content == "account existed"){
            let inputTags = document.getElementsByClassName('inputForm') as HTMLCollectionOf<HTMLInputElement> | null
            for(let i = 0; i < inputTags.length; i++){
                inputTags[i].classList.toggle("inputFormAler")
            }
        } else if(data.content == 'done') {
            document.location.href="/"
        }
    })
    
}
document.onreadystatechange = () => {
    document.getElementById("hamburger").onclick = navSideBtn
    document.getElementById("btnSubmit").onclick = btnSubmit
    document.getElementById("inputConfirmPassword").addEventListener("input", inputChange)


}
