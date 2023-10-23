import { useState } from 'react';

const TURNS = {
	X: 'x',
	O: 'O',
};
const Square = ({ children, updateBoard, index }) => (
	<div
		className="square"
		onClick={() => {
			console.log('hola');
		}}
	>
		{children}
	</div>
);

function App() {
	const [turn, setTurn] = useState(TURNS.X);
	const [board, setBoard] = useState(Array(9).fill(null));

	return (
		<>
			<main className="board">
				<h1
					onClick={() => {
						console.log(turn);
						setTurn(TURNS.O);
					}}
				>
					Tic tac toe
				</h1>
				<section className="game">
					{board.map((_, index) => (
						<Square key={index} index={index}>
							{_}
						</Square>
					))}
				</section>
			</main>
		</>
	);
}

export default App;
