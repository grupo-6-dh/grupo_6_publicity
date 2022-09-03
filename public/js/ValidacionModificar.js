let inputTitulo = document.querySelector("#titulo");
let inputDescripcion = document.querySelector("#descripcion");
let inputImg = document.querySelector("#btnEnviar");
let inputColor = document.querySelectorAll("#color");

let Arrayinput = [inputTitulo, inputDescripcion, inputImg];
let formulario = document.querySelector("form");

formulario.addEventListener("submit",(e)=>{
    let entrar = false;
    //Titulo
    if (inputTitulo.value == "") {
        document.querySelector("#errorTitulo").innerHTML = "Debe agregar un titulo";
        entrar = true;
    } else if (inputTitulo.value.length < 5) {
        document.querySelector("#errorTitulo").innerHTML = "Debe tener mas de 5 caracteres";
        entrar = true;
    } else {
        document.querySelector("#errorTitulo").innerHTMLL = "";
    }
    
     //Descripcion
     if (inputDescripcion.value.length < 20) {
        inputDescripcion.nextElementSibling.innerHTML = "Debe tener mas de 20 caracteres";
        entrar = true;
    }


    //Imagen
    if(inputImg.value){
        let extension = inputImg.value.split(".").pop().toLowerCase();
        if (extension != ("jpg" || "png" || "jpeg" || "gif")) {
            document.querySelector("#errorImagen").innerHTML = "Ese formato de imagen no esta permitido. \n Por favor ingresá una imagen .jpeg/.jpg/.gif/.png";
            entrar = true;
            return;
        } else {
            document.querySelector("#errorImagen").innerHTML = "";
        }
    }else{
        document.querySelector("#errorImagen").innerHTML = "Debe cargar una imagen"
        entrar = true;
    }
    
    
    if (entrar) {
        e.preventDefault();
    }
    
});

Arrayinput.forEach((input) => {

    input.addEventListener("blur", () => {
        if (input.value == "") {
            input.classList.add("is-invalid");
            document.querySelector("#errorTitulo").innerHTML = "No te olvides de completar este campo";
            document.querySelector("#errorImagen").innerHTML = "No te olvides de subir una imagen";
            input.nextElementSibling.innerHTML = "No te olvides de completar este campo";
            
            
        } else {
            input.classList.remove("is-invalid");
            input.nextElementSibling.innerHTML = "";
        }

    })
});