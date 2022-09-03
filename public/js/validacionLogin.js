document.querySelector("#email").focus();
let formulario = document.querySelector("form"); 
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#pass");
let parrafo = document.querySelector("#warnings");
let Campos = [inputEmail,inputPassword];

formulario.addEventListener("submit",(e)=>{
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    let warnings = "";
    let entrar = false;
    ///Validacion email
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
        e.preventDefault();
        parrafo.innerHTML = warnings;
    }
});

Campos.forEach(function(input){
    
    input.addEventListener("blur", () => {
        //campos no vacios al salir del input 
    if(input.value == "") {
        input.classList.add("is-invalid");
        input.nextElementSibling.innerHTML = "No te olvides de completar este campo";
    }
    if(input.value != ""){
        input.classList.remove("is-invalid");
        input.nextElementSibling.innerHTML = "";
    }
    //longitud de campos al salir del input
    if((input.dataset.nombre == "nombre")  && (input.value.length < 2)){
        input.classList.add("is-invalid");
        input.nextElementSibling.innerHTML = "Este campo debe contener al menos 2 caracteres";
        return;
    }else{
        input.classList.remove("is-invalid");
    }
    
       
})
})