document.querySelector("#email").focus();
let formulario = document.querySelector("form"); 
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#pass");
let parrafo = document.querySelector("#warnings");

formulario.addEventListener("submit",(e)=>{
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    e.preventDefault();
    let warnings = "";
    let entrar = false;

    if(inputEmail.value.length == ""){
        inputEmail.classList.add("is-invalid");
        warnings += `<li>*Campo email obligatorio.</li>`
        entrar = true;
    }
    if(!regexEmail.test(inputEmail.value)){
        inputEmail.classList.add("is-invalid");
        warnings += `<li>*Ingrese una direccion de correo electronico valida.</li>`
        entrar = true;
    }
    if(inputPassword.value == ""){
        inputPassword.classList.add("is-invalid");
        warnings += `<li>*Campo contraseña obligatorio.</li>`
        entrar = true;
    }

    if(entrar){
        parrafo.innerHTML = warnings;
    }
});