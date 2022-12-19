const cells = document.querySelectorAll('[data-cell]')
const CIRCLE_INSIDE = 'circle'
const CROSS_INSIDE = 'cross'
const overlay = document.querySelector('.overlay')
const message_text = document.querySelector('[data-winning-message-text]')
const restart_button = document.querySelector('button')
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
console.log(cells.index)
let circleTurn;
let counter = 0

function reStartGame() {
    counter = 0
    circleTurn = false
    cells.forEach(cell => {
      cell.classList.remove(CIRCLE_INSIDE)
      cell.classList.remove(CROSS_INSIDE)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
    overlay.classList.remove('show')
  }


const handleClick = function () {
    counter = counter + 1
    console.log(counter)
    let currentClass = circleTurn ? CIRCLE_INSIDE : CROSS_INSIDE
    return (() => {
        this.classList.add(currentClass)
        if (counter === 9 && !checkWin(currentClass)) {
            overlay.classList.add('show')
            message_text.textContent = 'Its a Draw'
        }
        if (checkWin(currentClass)){ 
            overlay.classList.add('show')
            message_text.textContent = `${currentClass} is a winner`
        }
        circleTurn = !circleTurn
    })()
}


const startGame = () => cells.forEach((cell, i) => {
    cell.addEventListener('click', handleClick, { once: true })
})

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}


restart_button.addEventListener('click', reStartGame)
startGame()
