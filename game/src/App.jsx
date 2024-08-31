import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';

export default function App() {
	const [diceValue, setDiceValue] = React.useState([]);

	function allNewDice() {
		for (let i = 0; i < 10; i++) {
			diceValue.push(Math.floor(Math.random() * 6) + 1);
		}
	}
  allNewDice()
	const diceElements = diceValue.map(die =><Die value={die} />);
	return (
		<main className='container'>
			<div className='dice-container'>
    {diceElements}
			</div>
		</main>
	);
}

