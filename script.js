class Calculator { //makes an object
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear () {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    //adds number to display screen
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // if the number is equal to . and includes a . don't execute and return
        this.currentOperand = this.currentOperand.toString() + number.toString() // want to numbers to be strings on display, so they are not initially added together
    }

    //what happens when a user clicks on operand
    chooseOperation(operation) {
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //compute a single value to display on display screen
    compute() {

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//NEW keyword, creates a new empty object, set THIS to return to this object
const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement) 

numberButtons.forEach(button => { // looping over each button
    button.addEventListener('click', () => { //we want it to add to display whatever button is pushed
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(button => { // looping over each button
    button.addEventListener('click', () => { //we want it to add to display whatever button is pushed
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})