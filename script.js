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
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //adds number to display screen
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // if the number is equal to . and includes a . don't execute and return
        this.currentOperand = this.currentOperand.toString() + number.toString() // want to numbers to be strings on display, so they are not initially added together
    }

    //what happens when a user clicks on operand
    chooseOperation(operation) {
        if (this.currentOperand === '') return //won't execute if there is no currentOperand
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //compute a single value to display on display screen
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) /*converting string back to a number*/
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) ||  isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        return number
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //adds operation ie +-/* at end of previousOperand
        } else {
            this.previousOperandTextElement.innerText = ''
        }
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

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})