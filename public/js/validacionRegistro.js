document.querySelector("#nombre").focus()// Le hago fucus al primer campo del email

let formulario = document.querySelector("form"); //capturo mi formulario
let inputNombre = document.querySelector("#nombre");
let inputEmail = document.querySelector("#email"); 
let inputPassword = document.querySelector('#password');
let inputConfirmPassword = document.querySelector('#confirmarpass');
let parrafo = document.querySelector("#warnings");


formulario.addEventListener("submit",(e)=>{
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    e.preventDefault(); 
    let warnings = "";
    let entrar = false;
    if(inputNombre.value.length == ""){
        inputNombre.classList.add("is-invalid");
        warnings += `<li>*Campo nombre obligatorio.</li>`
        entrar = true;
    }
    if(inputNombre.value.length < 2){
        inputNombre.classList.add("is-invalid");
        warnings += `<li>*Campo nombre debe contener mas de 2 caracteres.</li>`
        entrar = true;
    }
    if(inputEmail.value.length == ""){
        inputEmail.classList.add("is-invalid");
        warnings += `<li>*Campo email es obligatorio.</li>`
        entrar = true;
    }
    if(!regexEmail.test(inputEmail.value)){
        inputEmail.classList.add("is-invalid");
        warnings += `<li>*Ingrese una direccion de correo electronico valida.</li>`
        entrar = true;
    }
    if(inputPassword.value.length == ""){
        inputNombre.classList.add("is-invalid");
        warnings += `<li>*Campo contraseña obligatoria!!.</li>`
        entrar = true;
    }
    if(inputPassword.value.length < 8){
        inputPassword.classList.add("is-invalid");
        warnings += `<li>*La contraseña debe contener mas de 8 caracteres.</li>`
        entrar = true;
    }
    if(inputConfirmPassword.value.length < 8){
        inputConfirmPassword.classList.add("is-invalid");
        entrar = true;
    }
    if(inputConfirmPassword.value != inputPassword.value){
        inputConfirmPassword.classList.add("is-invalid");
        warnings += `<li>Las contraseñas no coinciden</li>`
        entrar = true;
    }

    if(entrar){
        parrafo.innerHTML = warnings;
    }
   
   
});

//Recorro mi array para agregarle el evento a cada input
/*input.addEventListener("blur", function() {
    if(input.value == "") {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        input.nextElementSibling.innerHTML = "El campo no puede estar vacío";
    }
    if(input.value != ""){
        input.classList.remove("is-invalid");
        input.classList.add("is-valid")
        input.nextElementSibling.innerHTML = "";
    }
   /* if((input.dataset.nombre == "awards" || input.dataset.nombre == "rating")  && (input.value < 0 || input.value >10)){
        input.classList.add("is-invalid");
        input.classList.remove("is-valid")
        input.nextElementSibling.innerHTML = "El valor ingresado debe estar entre 0 y 10";
    }
    
    if((input.dataset.nombre == "length")  && (input.value < 60 || input.value > 360)){
        input.classList.add("is-invalid");
        input.classList.remove("is-valid")
        input.nextElementSibling.innerHTML = "El valor ingresado debe estar entre 60 y 360";
    }

});*/

