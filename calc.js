class Calculator {
    constructor(prevTextElement, currTextElement){
      this.prevTextElement=prevTextElement
      this.currTextElement=currTextElement
      this.sarcasmTextElement=sarcasmTextElement
      this.clear()
    }
  
    clear(){
      this.currOperand = ''
      this.prevOperand = ''
      this.operation = undefined
      this.comment = ''
    }
  
    delete(){
      this.currOperand = this.currOperand.toString().slice(0,-1)
    }
  
    appendNumber(number){
      if(number=== '.' && this.currOperand.includes('.')) return
      this.currOperand = this.currOperand.toString() + number.toString()
    }
  
    chooseOperation(operation){
      if (this.currOperand === '') return
      if (this.prevOperand !== ''){
        this.compute()
      }
      this.operation = operation
      this.prevOperand = this.currOperand
      this.currOperand = ''
    }
  
    compute(){
      let computation
      const prev = parseFloat(this.prevOperand)
      const curr = parseFloat(this.currOperand)
      if (isNaN(prev)||isNaN(curr)) return
      switch (this.operation){
        case '+':
          computation = prev + curr
          if (prev == 1 || curr == 1){
            this.comment = "You used a calculator to add 1 and " + curr +"? A kindergartener would do better on a math test than you."
            }
          if (computation < 10){
            this.comment = "What was your first grade math mark again? Just checking~"
            }
          break
        case '-':
          computation = prev - curr
          if (prev == curr){
            this.comment = "The answer is 0, much like your IQ."
            }
          if (computation == 10){
            this.comment = "Aw, subtraction is hard, isn't it?"
            }
          break
        case 'x':
          computation = prev * curr
          if (prev == 1 || curr == 1){
            this.comment = "Multiplying by 1? Fitting, for the number of brain cells you seem to have."
            }
          if ((prev == 420 || prev == 69) && (curr == 420 || curr == 69)){
            this.comment = "You have the humour of a thirteen-year-old."
            }
          break
        case '÷':
          computation = prev / curr
          if (curr == 1){
            this.comment = "Mary has " + prev +" apples to share among herself and her friends. If Mary has 0 friends, what does she end up with? " + prev +" apples and a pervasive sense of loneliness." 
            }
          if (prev%2==0 && curr == 2){
            this.comment = "Wow, an even number that's divisible by 2. We've never seen THAT before."
            }
          break
        default:
          return
      }
      this.currOperand = computation
      this.operation = undefined
      this.prevOperand = ''
  
      if (prev == 123456789 || prev == 9876543210 || curr == 9876543210 || curr == 123456789){
            this.comment = "There are better ways to spend your time than playing calculator piano scales."
            }
      if (computation == 1738){
        this.comment = "2014 called, it wants its sense of humour back."
      }
    }
  
    getDisplayNumber(number){
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if(isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0 })
        }
      if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay(){
      this.currTextElement.innerText =
        this.getDisplayNumber(this.currOperand)
      if (this.operation != null) {
        this.prevTextElement.innerText =
        `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
      } else {
      this.prevTextElement.innerText = ''
      }
    this.sarcasmTextElement.innerText=this.comment
    }
  }
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-result]')
  const deleteButton = document.querySelector('[data-delete]')
  const clearButton = document.querySelector('[data-all-clear]')
  const prevTextElement = document.querySelector('[data-prev-operand]')
  const currTextElement = document.querySelector('[data-curr-operand]')
  const sarcasmTextElement = document.querySelector('[data-sarcasm]')
  
  const calculator = new Calculator(prevTextElement, currTextElement, sarcasmTextElement)
  
  numberButtons.forEach(button=>{
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button=>{
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
  })
  
  clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
  })