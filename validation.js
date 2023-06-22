HTMLElement.prototype.validation = function() {

    // Creating default variables.
    const form = this
    const inputs = form.querySelectorAll('input, textarea')



    // Creating the element to use to show error messages.
    const createFeedback = (el) => {
        const feedback = document.createElement("span")
        feedback.classList.add('feedback-span')
        el.parentNode.appendChild(feedback)
    }



    // Set the value of the element showing the error messages.
    const setFeedback = (el, msg = "") => {
        const feedback = el.parentNode.querySelector('.feedback-span')
        if (msg && msg != "") {
            feedback.innerHTML = msg
        }
    }



    // Clear the value of the element showing the error messages.
    const clearFeedback = (el) => {
        const feedback = el.parentNode.querySelector('.feedback-span')
        feedback.innerHTML = ''
    }



    // Styling the valid input element.
    const inputSetValid = (el) => {
        el.classList.remove('is-invalid')
        el.classList.add('is-valid')
        clearFeedback(el)
    }
    


    // Styling the invalid input element.
    const inputSetInvalid = (el, msg) => {
        el.classList.remove('is-valid')
        el.classList.add('is-invalid')
        setFeedback(el, msg)
    }



    // Checking whether an input element is valid or not.
    const checkInput = (el) => {
        if (el.checkValidity()) {
            return true
        }else{
            return false
        }
    }



    // Filtering process of the input element.
    const filterInput = (el) => {
        if (checkInput(el)) {
            inputSetValid(el)
        } else {
            inputSetInvalid(el, el.validationMessage)
        }
    }



    // Triggering the filtering process for all input items.
    inputs.forEach(el => {
        el.classList.add('validate-input')
        el.parentNode.classList.add('validate-label')
        createFeedback(el)

        el.oninput = () => filterInput(el)
    })



    // Performing necessary actions when the form is submitted.
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let validityStatus = null
        
        inputs.forEach(el => {
            if (!checkInput(el)) {
                inputSetInvalid(el, el.validationMessage)
                validityStatus = false

                form.querySelector('.is-invalid').focus()
            }else{
                validityStatus = true
            }
        })
        
        if (validityStatus == true) {
            form.submit()
        }
    })

}