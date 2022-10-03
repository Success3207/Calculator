//lets create a calcuator class
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        //SLICE takes numbers starting from the back, one by one.
        //and also, we need to convert it to a string also
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        //we want just one period to display at a time
        if (number === '.' && this.currentOperand.includes('.')) return
        //we need to convert the number to a string for Js 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        //parse is just like converting a string to a number
        let compuation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                compuation = prev + current
                break

                case '-':
                compuation = prev - current
                break

                case '*':
                compuation = prev * current
                break

                case '/':
                compuation = prev / current
                break
                //Default means if the switch did not work, the default will work
                default:
                    return        
        }
        this.currentOperand = compuation
        this.operation = undefined
        this.previousOperand = ''

    }

    //we want commas in between our number
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(intergerDigits)){
            intergerDisplay = ''
        }else{
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits:0 })
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        }else{
            return intergerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        
        if(this.operation != null){
        //this code makes the number we typed gpes to the previous operand once we press the operation sign and also we want the sign that we press to also display
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else 
    //we want the previous operand to dissapear once we press equals button
    {
        this.previousOperandTextElement.innerText = ''
    }
}
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearsButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearsButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})



