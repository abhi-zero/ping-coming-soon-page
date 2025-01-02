const submitBtn = document.querySelector('[data-modal-open]');
const modal = document.querySelector('[data-modal]');

//input
const emailInput = document.querySelector('input[type="email"]');


//error message
const errorSection = document.querySelector('.error');
const errorMessage = document.querySelector('[data-error]')

//live validation

emailInput.addEventListener('input',() => {
    validateEmail(emailInput.value);
})

//submit event
submitBtn.addEventListener('click', () => {
    isvalid = true;
    if(!validateEmail(emailInput.value)){
       isvalid = false; 
    }
    if(isvalid){
        modal.showModal();
    }else{
        modal.close();
    }
  });

//validation function

function validateEmail(value){

    let trimedValue = value.trim();
     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    if(trimedValue === ""){
        errorMessage.textContent = "Email is required."
        return false;
    }
    else if(trimedValue.includes(" ")){
        errorMessage.textContent = "Email don't contain spaces."
        return false;
    }
    else if(!value.includes("@")){
        errorMessage.textContent = "Email must contain '@'";
        return false;
    }
    else if(!emailRegex.test(value)){
        emailInput.style.outlineColor = 'rgb(255, 82, 99)';
        emailInput.style.borderColor = 'rgb(255, 82, 99)';
        errorMessage.textContent = `Please enter a valid email (example@example.com)`;
        errorSection.style.display = "block";
        submitBtn.style.pointerEvents = 'none';
        submitBtn.style.opacity = '0.6';
        submitBtn.disable = true;
        return false;
    }
    errorMessage.textContent = "";
    errorSection.style.display = "none";
    emailInput.style.outlineColor = 'green';
        emailInput.style.borderColor = 'green';
    submitBtn.style.pointerEvents = 'auto'; 
    submitBtn.style.opacity = '1';
    submitBtn.disable = false;
    return true;
}



modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect()
    if(
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY > dialogDimensions.top ||
        e.clientY < dialogDimensions.bottom 
    ){
        modal.close();
    }   
})



