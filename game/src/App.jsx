import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
function App() {
	const [dice, setDice] = React.useState(allNewDice());
	const [tenzies, setTenzies] = React.useState(false);
	React.useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
			winner();

			console.log('WON');
		}
	}, [dice]);
	function winner() {
		console.log('confetti');
	}
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
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateNewDie();
				})
			);
		} else {
			setTenzies(false);
			setDice(allNewDice());
			setTime(0); // Reset the timer
		}
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
	const [time, setTime] = useState(0);
	const [intervalId, setIntervalId] = useState(null);
	const [bestTime, setBestTime] = useState(() => {
		const savedBestTime = localStorage.getItem('bestTime');
		return savedBestTime ? JSON.parse(savedBestTime) : null;
	});
	
	React.useEffect(() => {
		if (!tenzies) {
			const id = setInterval(() => {
				setTime(prevTime => prevTime + 1);
			}, 1000);
			setIntervalId(id);
		} else {
			clearInterval(intervalId);
			if (!bestTime || time < bestTime) {
				setBestTime(time);
				localStorage.setItem('bestTime', JSON.stringify(time));
			}
		}
		return () => clearInterval(intervalId);
	}, [tenzies, time, intervalId, bestTime]);
	return (
		<main>
			{tenzies && <Confetti />}
			<div className="timer-container">
  <p>Time: {time}s</p>
  {bestTime !== null && <p>Best Time: {bestTime}s</p>}
</div>
			<h1 className='title'>TENZIES</h1>
			<p className='instruction'>
				Roll ten dice and keep rolling until all dice match the same number. Try
				to finish as fast as you can!
			</p>
			<div className='dice-container'>{diceElements}</div>
			<button onClick={rollDice} className='roll-dice'>
				{tenzies ? 'New Game' : 'Roll'}
			</button>
		</main>
	);
}
export default App;
