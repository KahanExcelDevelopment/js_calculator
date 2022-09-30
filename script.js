class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.clear()
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
    }
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
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
      const stringNumber = number.toString()
      const intergerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let intergerDisplay
      if (isNaN(intergerDigits)) {
        intergerDisplay = ''
      } else {
        intergerDisplay = intergerDigits.toLocaleString('en', {
          maximumFractionDigits: 0
        })
      }
      if (decimalDigits != null) {
        return `${intergerDisplay}.${decimalDigits}`
      } else {
        return intergerDisplay
      }
    }
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numbers = document.querySelectorAll('[data-number]')
  const operations = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calc = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numbers.forEach(number => {
    number.addEventListener('click', () => {
      calc.appendNumber(number.innerText)
      calc.updateDisplay()
    })
  
  })
  
  operations.forEach(operation => {
    operation.addEventListener('click', () => {
      calc.chooseOperation(operation.innerText)
      calc.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calc.compute()
    calc.updateDisplay()
  })
  allClearButton.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
  })
  deleteButton.addEventListener('click', button => {
    calc.delete()
    calc.updateDisplay()
  })