HTMLElement.prototype.validation = function() {

    // Creating default variables.
    const form = this
    const inputs = form.querySelectorAll('input, textarea')



    // Styling the valid input element.
    const inputSetValid = (el) => {
        el.classList.remove('is-invalid')
        el.classList.add('is-valid')
    }
    


    // Styling the invalid input element.
    const inputSetInvalid = (el) => {
        el.classList.remove('is-valid')
        el.classList.add('is-invalid')
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
            inputSetInvalid(el)
        }
    }



    // Triggering the filtering process for all input items.
    inputs.forEach(el => {
        el.classList.add('validate-input')
        el.parentNode.classList.add('validate-label')

        el.oninput = () => filterInput(el)
    })

}