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
    // Initialize a flag to track the validity of the email
    isvalid = true;
    // Validate the email input value
    if(!validateEmail(emailInput.value)){
       // Set the flag to false if the email is invalid
       isvalid = false; 
    }
    // Show the modal if the email is valid
    if(isvalid){
        modal.showModal();
    }
});


//validation function

function validateEmail(value){
    // Trim the input value to remove leading and trailing spaces
    let trimedValue = value.trim();
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

    // Check if the trimmed value is empty
    if(trimedValue === ""){
        errorMessage.textContent = "Please enter your email address."
        return false;
    }
    // Check if the trimmed value contains spaces
    else if(trimedValue.includes(" ")){
        errorMessage.textContent = "Email addresses cannot contain spaces."
        return false;
    }
    // Check if the value contains '@'
    else if(!value.includes("@")){
        errorMessage.textContent = "Email must contain '@'.";
        return false;
    }
    // Validate the email format using regex
    else if(!emailRegex.test(value)){
        // Set error styles and message if email is invalid
        emailInput.style.outlineColor = 'rgb(255, 82, 99)';
        emailInput.style.borderColor = 'rgb(255, 82, 99)';
        errorMessage.textContent = "Please enter a valid email address (e.g., example@example.com).";
        errorSection.style.display = "block";
        submitBtn.style.pointerEvents = 'none';
        submitBtn.style.opacity = '0.6';
        submitBtn.disable = true;
        return false;
    }
    // Reset styles and message if email is valid
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
    // Get the dimensions of the modal dialog
    const dialogDimensions = modal.getBoundingClientRect()
    // Check if the click event occurred outside the modal boundaries
    if(
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY > dialogDimensions.top ||
        e.clientY < dialogDimensions.bottom 
    ){
        // Close the modal if clicked outside
        modal.close();
    }   
})
