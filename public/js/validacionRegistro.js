document.querySelector("#nombre").focus()// Le hago fucus al primer campo del email

let formulario = document.querySelector("form"); //capturo mi formulario
let inputNombre = document.querySelector("#nombre");
let inputEmail = document.querySelector("#email"); 
let inputPassword = document.querySelector('#password');
let inputConfirmPassword = document.querySelector('#confirmarpass');
let parrafo = document.querySelector("#warnings");
let Campos = [inputNombre,inputEmail,inputPassword,inputConfirmPassword];

formulario.addEventListener("submit",(e)=>{
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let warnings = "";
    let entrar = false;
    //Validacion Nombre
    if(inputNombre.value.length == ""){
        inputNombre.classList.add("is-invalid");
        //e.preventDefault(); 
        warnings += `<li>*Campo nombre obligatorio.</li>`
        entrar = true;
    }
    if(inputNombre.value.length < 2){
        inputNombre.classList.add("is-invalid");
        warnings += `<li>*Campo nombre debe contener mas de 2 caracteres.</li>`
        entrar = true;
    }
    //Validacion Email
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
    //Validacion Contraseña
    if(inputPassword.value.length == ""){
        inputNombre.classList.add("is-invalid");
        warnings += `<li>*Campo contraseña obligatoria!!.</li>`
        entrar = true;
    }
    if(inputPassword.value.length < 2){
        inputPassword.classList.add("is-invalid");
        warnings += `<li>*La contraseña debe contener mas de 8 caracteres.</li>`
        entrar = true;
    }
    if(inputConfirmPassword.value.length < 2){
        inputConfirmPassword.classList.add("is-invalid");
        entrar = true;
    }
    //Confirmar contraseña 
    if(inputConfirmPassword.value != inputPassword.value){
        inputConfirmPassword.classList.add("is-invalid");
        warnings += `<li>Las contraseñas no coinciden</li>`
        entrar = true;
    }

    if(entrar){
        e.preventDefault();
        parrafo.innerHTML = warnings;
    }
   
   
});

//Recorro mi array para agregarle el evento a cada input
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

