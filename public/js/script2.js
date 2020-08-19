const viewbtn = document.getElementsByClassName("show");
const options = document.getElementsByClassName("optionsbox")
var optionslength = options.length;
console.log(viewbtn)
    for (let i = 0; i <viewbtn.length; i++) {
       
       
        viewbtn[i].addEventListener('click',()=>{
            console.log("this button",viewbtn[i]);
            options[i].classList.toggle('active')
        })

       
    
    }
