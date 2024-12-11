import { useState } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState('');
  const [winningLine, setWinningLine] = useState([]);

  const handleClick = (index) => {
    if (winner) {
      setError('');
      return;
    } else if (board[index]) {
      setError('Square already selected. Choose another.');
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setError('');

    const gameResult = calculateWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult.winner);
      setWinningLine(gameResult.line);
    } else if (!newBoard.includes(null)) {
      setWinner('Tie');
    }
  };

  const calculateWinner = (board) => {
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

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }

    return null;

  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setError('');
    setWinningLine([]);
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">
        {winner ? (winner === 'Tie' ? 'Game Over: It\'s a Tie!' : `Game Over: ${winner} Wins!`) : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      {error && <div className="error">{error}</div>}
      <div className="board">
        {board.map((square, index) => (
          <button
            key={index}
            className={`square ${winningLine.includes(index) ? 'highlight' : ''}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
