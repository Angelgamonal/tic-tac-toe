import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS, INITIAL_STATE } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';
import { WinnerModal } from './components/WinnerModal';

function App() {
	const [turn, setTurn] = useState(TURNS.X);
	const [board, setBoard] = useState(INITIAL_STATE);
	const [winner, setWinner] = useState(null);

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);

		const newBoard_ = newBoard(index);

		const newWinner = checkWinnerFrom(newBoard_);

		if (newWinner) {
			confetti();
			setWinner(newWinner);
		} else if (checkEndGame(newBoard_)) {
			setWinner(false);
		}
	};

	const newBoard = (index) => {
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		return newBoard;
	};

	const resetGame = () => {
		setBoard(INITIAL_STATE);
		setWinner(null);
	};

	return (
		<>
			<main className="board">
				<h1>Tic tac toe</h1>

				<button onClick={resetGame}>Reset Game</button>

				<section className="game">
					{board.map((_, index) => (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{_}
						</Square>
					))}
				</section>

				<section
					className="turn"
					style={{
						margin: '2em auto',
						display: 'flex',
						justifyContent: 'center',
						gap: '10px',
					}}
				>
					<Square isSelected={TURNS.X === turn}>{TURNS.X}</Square>
					<Square isSelected={TURNS.O === turn}>{TURNS.O}</Square>
				</section>

				<WinnerModal resetGame={resetGame} winner={winner} />
			</main>
		</>
	);
}

export default App;
