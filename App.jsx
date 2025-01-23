import React from "react"
import { companies } from "./companies"
import { clsx } from "clsx"
import { getFarewellText, getRandomWord } from "./jokes"

export default function App(){
    
    const [currentWord, setCurrentWord] = React.useState(()=> getRandomWord())
    const [guessedLetter, setGuessedLetter] = React.useState([])
    
    const totalTries = companies.length - 1
    const wrongGuesses = 
                guessedLetter.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = 
                currentWord.split("").every(letter => guessedLetter.includes(letter))
    const isGameLost = wrongGuesses >= totalTries
    const isGameOver = isGameWon || isGameLost
    const lastGuessed = guessedLetter[guessedLetter.length -1]
    const isLastGuessIncorrect = lastGuessed && !currentWord.includes(lastGuessed)
    
    const alphabets = "abcdefghijklmnopqrstuvwxyz"
    const currentWordArr = currentWord.split("")
    
    function addGussedLetter(letter){
        setGuessedLetter(prevLetter =>
            prevLetter.includes(letter) ? 
            prevLetter : [...prevLetter, letter]
        )
    }
    
    function startNewGame(){
        setCurrentWord(getRandomWord())
        setGuessedLetter([])
    }
    
    
    
    const keyboardELe = alphabets.split("").map((letter)=>{
        const isGuessed = guessedLetter.includes(letter)
        const isGuessedCorrect = currentWordArr.includes(letter) && isGuessed
        const className = clsx("key",{
            green: isGuessedCorrect,
            red : isGuessed && !isGuessedCorrect,
        })
       
        return (
            <button
            key={letter}
            className={className}
            disabled={isGameOver}
            onClick = {()=> addGussedLetter(letter)}
            >
            {letter.toUpperCase()}
            </button>
        )
    })
    
    const wordEle = currentWord.split("").map((word,index) => {
        const toDisplayWord =isGameLost || guessedLetter.includes(word)
        const letterClassName = clsx("word",
            isGameLost && !guessedLetter.includes(word) && "missed-letter"
        )
        
        return (
            <span
            key={index}
            className={letterClassName}
            >
            {toDisplayWord ? word.toUpperCase() : ""}
            </span>
        )
    })
    
    
    const companiesArrElements = companies.map((comp,index)=> {
        const isCompLost = index < wrongGuesses
        
        const className = clsx("comp-icon", isCompLost ? "lost" : "")
        const styles = {
            backgroundColor : comp.backgroundColor,
            color : comp.color
        }
        
        return (
            <span
            className={className}
            style = {styles}
            key={comp.name}
            >
            {comp.name}
            </span>
        )
            
        
    })
    
    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })
    
    
   function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(companies[wrongGuesses - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
    }

    
    return(
        
        <main>
            <div className="stars"></div>
            <div className="twinkling"></div>

            <section className="everythin-container">

                <header >
                    <h1>Placement: Endgame</h1>
                    <p>Guess the word in under 8 attempts to keep the your seat in desired company safe from being taken!</p>
                </header>
                
                <section className={gameStatusClass}>
                    {renderGameStatus()}
                </section>
            
                <section className="companies-container">
                    {companiesArrElements}
                </section>
                
                <section className="word-container">
                    {wordEle}
                </section>
                
                <section className="keyboard-container">
                    {keyboardELe}
                </section>
                
                {isGameOver && 
                <section className="new-game-btn">
                    <button
                    onClick={startNewGame}
                    >New Game</button>
                </section>}
            </section>
            
        </main>
    )
}