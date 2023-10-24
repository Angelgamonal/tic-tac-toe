import { useState } from 'react';

const TURNS = {
	X: 'x',
	O: 'O',
};
const Square = ({ children, updateBoard, index, isSelect = '' }) => {
	return (
		<div className={`square ${isSelect}`} onClick={updateBoard}>
			{children}
		</div>
	);
};

function App() {
	const [turn, setTurn] = useState(TURNS.X);
	const [board, setBoard] = useState(Array(9).fill(null));

	const handleUpdateBoard = () => {
		setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
	};
	console.log(turn);

	return (
		<>
			<main className="board">
				<h1>Tic tac toe</h1>
				<section className="game">
					{board.map((_, index) => (
						<Square key={index} index={index} updateBoard={handleUpdateBoard}>
							{index}
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
					<Square isSelect="is-selected">X</Square>
					<Square>Y</Square>
				</section>
			</main>
		</>
	);
}

export default App;
