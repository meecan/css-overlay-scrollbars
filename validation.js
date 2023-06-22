HTMLElement.prototype.validation = function(st = {}) {

    // Creating default variables.
    const form = this
    const inputs = form.querySelectorAll('input, textarea')
    let onceChanged = false
    let options = {
        realTime:true,
        firstTime:true,
        onSubmit:null
    }
    options = { ...options, ...st }


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
        if (el.getAttribute('data-equal') && msg == "") {
            msg = "Doesnt match..."
        }

        if (el.getAttribute('pattern') && el.getAttribute('data-format') &&  el.value.length != 0) {
            msg = `${msg} ${el.getAttribute('data-format')}`
        }

        el.classList.remove('is-valid')
        el.classList.add('is-invalid')
        setFeedback(el, msg)
    }



    // Checking whether an input element is valid or not.
    const checkInput = (el) => {
        const equalAttr = el.getAttribute('data-equal')
        const equalTo = document.querySelector(equalAttr)

        if (equalAttr) {
            if (el.value == equalTo.value && el.checkValidity()) {
                return true
            }else{
                return false
            }
        }

        if (el.checkValidity()) {
            return true
        }else{
            return false
        }
    }



    // Filtering process of the input element.
    const filterInput = (el) => {
        if (el.type == "radio") {
            document.querySelectorAll(`[type="radio"][name="${el.name}"]`).forEach(el => {
                inputSetValid(el)
                return
            })
        }
        
        if (!options.firstTime) {
            if (!onceChanged) {
                if (checkInput(el)) {
                    inputSetValid(el)
                    onceChanged = true
                }
            } else {
                if (checkInput(el)) {
                    inputSetValid(el)
                } else {
                    inputSetInvalid(el, el.validationMessage)
                }
            }
        }else{
            if (checkInput(el)) {
                inputSetValid(el)
            } else {
                inputSetInvalid(el, el.validationMessage)
            }
        }
    }



    // Triggering the filtering process for all input items.
    inputs.forEach(el => {
        el.classList.add('validate-input')
        el.parentNode.classList.add('validate-label')
        createFeedback(el)

        if (options.realTime !== false) {
            el.oninput = () => filterInput(el)
        }
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
            if (typeof options.onSubmit === "function") {
                options.onSubmit()
            }else{
                form.submit()
            }
        }
    })

}