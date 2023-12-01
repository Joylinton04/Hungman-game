const hinttxt = document.querySelector('.hint')
const wordtxt = document.querySelector('.word')
const img = document.querySelector('.left img')
const play = document.querySelector('#play')
const startOver = document.querySelector('.again #play')
const guesses = document.querySelector('.guesses')
const modal = document.querySelector('.modal')
const statImg = document.querySelector('.statImg img')
const statMsg = document.querySelector('.statMsg')


let alphabet = []
let currentWord = ""
let incorrectguess = 0
let guessLimit = 6
let isWrong = false

for(let i=97;i<122;i++) {
    alphabet.push(String.fromCharCode(i))
}

const initGame = ()=> {    
    modal.classList.add('show')

    const {word, hint} = wordList[(Math.floor(Math.random() * wordList.length))]
    currentWord = word
    console.log(currentWord)
    hinttxt.innerHTML = `<span>Hint: </span>${hint}`
    wordtxt.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join("")

}

const checkLetter = (e) => {
    if(e.key === "Enter") {
        initGame()
    }
    if(alphabet.includes(e.key)) {
        currentWord.split("").forEach((word, index) => {
            if(word === e.key) {
                document.querySelectorAll('.letter')[index].innerHTML = e.key
            }
        })
        if(!currentWord.split("").includes(e.key)) {
            incorrectguess++
            if(incorrectguess >= 6) {
                window.removeEventListener("keydown", checkLetter)
                setTimeout(()=>{
                    return gameOver() 
                },300)
                isWrong = true
            }
        }
    }
    guesses.innerHTML = `Incorrect guesses: ${incorrectguess} / ${guessLimit}`
    img.src=`../assets/hangman-${incorrectguess}.svg`
}
window.addEventListener("keydown", checkLetter)


const gameOver = () => { 
    if(isWrong) {
        statImg.src = "../assets/lost.gif"
        statMsg.innerHTML = `
        Oops! sorry you typed the wrong word <br><br>
        Correct word: ${currentWord}
        `
    }
    incorrectguess = 0
    currentWord = ""
    
    modal.classList.remove('show')    

    startOver.addEventListener("click", () => {
        initGame()
        window.addEventListener("keydown", checkLetter)
        guesses.innerHTML = `Incorrect guesses: 0 / ${guessLimit}`
        img.src=`../assets/hangman-0.svg`
    })
}

play.addEventListener("click", () => {
    initGame()
})