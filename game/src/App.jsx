import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
function App() {
	const [dice, setDice] = React.useState(allNewDice());
	const[tenzies,setTenzies] = React.useState(false)
	React.useEffect(()=>{
		const allHeld = dice.every(die=>die.isHeld)
		const firstValue = dice[0].value
		const allSameValue = dice.every(die => die.value=== firstValue)
		if(allHeld && allSameValue ){
			setTenzies(true)
			winner()

			console.log('WON');
		}
	},[dice])
	function winner(){
		console.log('confetti');

	}
/**
 * Challenge: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 * 
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
 */

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
			{tenzies&& <Confetti/>}
			<h1 className='title'>TENZIES</h1>
			<p className='instruction'>
      Roll ten dice and keep rolling until all dice match the same number. Try to finish as fast as you can!
			</p>
			<div 
			className='dice-container'>
				{diceElements}
				</div>
			<button 
			onClick={rollDice} 
			className='roll-dice'>
			{tenzies? 'New Game':'Roll'}
			</button>
		</main>
	);
}

export default App;
