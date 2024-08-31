import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
function App() {
	const [dice, setDice] = React.useState(allNewDice());
	function generateNewDie() {
		return {
			value: Math.floor(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	function rollDice() {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.isHeld ? die : generateNewDie();
			})
		);
	}

	function holdDice(id) {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	}
	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	return (
		<main>
			<h1 className='title'>TENZIES</h1>
			<p className='instruction'>
      Roll ten dice and keep rolling until all dice match the same number. Try to finish as fast as you can!
			</p>
			<div className='dice-container'>{diceElements}</div>
			<button onClick={rollDice} className='roll-dice'>
				Roll
			</button>
		</main>
	);
}

export default App;
