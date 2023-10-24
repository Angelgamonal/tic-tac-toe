import { useState } from 'react';

const TURNS = {
	X: 'X',
	O: 'O',
};

const INITIAL_STATE = Array(9).fill(null);

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

	const updateBoard = (index) => {
		if (board[index] !== null) return;

		setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);

		const newBoard = [...board];
		newBoard[index] = turn;

		setBoard(newBoard);
	};

	return (
		<>
			<main className="board">
				<h1>Tic tac toe</h1>
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

				<section>
					<button
						onClick={() => {
							setBoard(INITIAL_STATE);
						}}
					>
						Reset
					</button>
				</section>
			</main>
		</>
	);
}

export default App;
