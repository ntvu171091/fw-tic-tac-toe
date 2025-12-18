import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const currentSquares = history[stepNumber];

  //Declaring a Winner
  useEffect(() => {
    const result = calculateWinner(currentSquares);
    setWinner(result);
  }, [currentSquares]);

  //function to check if a player has won.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player với History
  const handleClick = (i) => {
    // Cắt bỏ history sau stepNumber hiện tại nếu quay lại từ một bước trước đó
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.slice();

    // Nếu đã có người thắng hoặc ô đã được đánh, không làm gì
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Đánh dấu X hoặc O tùy theo lượt
    squares[i] = xIsNext ? "X" : "O";

    // Cập nhật history và step
    setHistory([...newHistory, squares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  // Jump to specific move
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  //Restart game
  const handlRestart = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
    setWinner(null);
  };

  // Tạo danh sách các nước đi
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game-container">
        <div className="game">
          <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
          <Board squares={currentSquares} handleClick={handleClick} />
        </div>
        <div className="history">
          <h4>History</h4>
          <ul>{moves}</ul>
        </div>
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
