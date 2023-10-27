import { useState } from 'react';
import confetti from 'canvas-confetti';

const TURNS = {
	X: 'X',
	O: 'O',
};

const INITIAL_STATE = Array(9).fill(null);

const WINNER_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const Square = ({ children, updateBoard, index, isSelected }) => {
	const handleClick = () => {
		updateBoard(index);
	};

	return (
		<div
			className={`square ${isSelected ? 'is-selected' : ''}`}
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

function App() {
	const [turn, setTurn] = useState(TURNS.X);
	const [board, setBoard] = useState(INITIAL_STATE);
	const [winner, setWinner] = useState(null);

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);

		const newBoard_ = newBoard(index);

		const newWinner = checkWinner(newBoard_);

		if (newWinner) {
			confetti({ colors: ['#fff', '#32d', '#f32a01'], gravity: 0.2, angle: 45 });
			setWinner(newWinner);
		} else if (checkEndGame(newBoard_)) {
			setWinner(false);
		}
	};

	const checkWinner = (newBoard) => {
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo;

			if (
				newBoard[a] &&
				newBoard[a] === newBoard[b] &&
				newBoard[a] === newBoard[c]
			) {
				return newBoard[a];
			}
		}

		return null;
	};

	const newBoard = (index) => {
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		return newBoard;
	};

	const checkEndGame = (newBoard = []) => {
		return newBoard.every((square) => square !== null);
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

				{winner !== null && (
					<section className="winner">
						<div className="text">
							<h2>{winner ? 'Ganó' : 'Empate'}</h2>

							<header className="win">{winner && <Square> {winner}</Square>}</header>

							<footer>
								<button onClick={resetGame}>Empezar de nuevo</button>
							</footer>
						</div>
					</section>
				)}
			</main>
		</>
	);
}

export default App;
