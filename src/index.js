import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

function XoXGameComponent() {
  const [alertType, setAlertType] = useState("alert-info");
  const [games, setGames] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [message, setMessage] = useState("");
  const [isGameFinish, setIsGameFinish] = useState(false);

  useEffect(() => {
    newGame();
  }, [])

  const newGame = () => {
    setGames([
      "", "", "", "", "", "", "", "",""
    ]);
    setCurrentPlayer("X");
    setIsGameFinish(false);
    setMessage("Hamle sırası: " + currentPlayer);
    setAlertType("alert-info");
  }

  const currentPlayerTracker = (index) => {
    if (!isGameFinish) {
      const newGames = [...games];
      if (newGames[index] == "") {
        newGames[index] = currentPlayer;
        setGames(newGames);

        let isGameDraw = checkAllBoxesFilledOrNot(newGames);
        
        if (isGameDraw) {
          setMessage("BERABERE!");
          setIsGameFinish(true);
          setAlertType("alert-warning");
          return;
        }

        let gameFinishedStatus = isGameOver(newGames);
        if (gameFinishedStatus) {
          setMessage("Oyun bitti! Kazanan: " + currentPlayer);
          setAlertType("alert-success");
          setIsGameFinish(true);
          return;
        }

        currentPlayer == "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
        setMessage("Hamle sırası: " + (currentPlayer == "X" ? "O" : "X"));
      } else {
        alert("Bu alan zaten dolu. Boş bir alana oynamayı deneyin.")
      }
    }
  }


  function checkAllBoxesFilledOrNot(newGames) {
    for (let index = 0; index < newGames.length; index++) {
      const element = newGames[index];
      if (element == "") {
        return false;
      }
    }

    return true;
  }

  const isGameOver = (newGames) => {

    const winningCombinations = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6]  
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (newGames[a] && newGames[a] === newGames[b] && newGames[a] === newGames[c]) {
        return true; //game over
      }
    }
  
    return false; 

  }

  return (
    <>
      <div className='container text-center'>
        <h1>XOX</h1>
        <div className={`alert ${alertType}`}>
          <p>{message}</p>
        </div>
        <button className='btn btn-outline-primary' onClick={newGame}>Yeni oyun</button>
        <div className='row mt-2'>
          {games.map((game, index) => (
            <div key={index} className='col-md-4 box' onClick={() => currentPlayerTracker(index)}>{game}</div>
          ))}
        </div>
      </div>


    </>
  )


}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <XoXGameComponent />
);

reportWebVitals();
