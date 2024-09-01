import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [time, setTime] = useState(0);
	const [rollCount, setRollCount] = useState(0);
	const [bestTime, setBestTime] = useState(() => {
		return localStorage.getItem('bestTime') || 90;
	});

	useEffect(() => {
		let timer;
		if (!tenzies && time < 60) {
			timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
		}

		if (time >= 60) {
			resetGame();
		}

		return () => clearInterval(timer);
	}, [tenzies, time]);

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);

		if (allHeld && allSameValue) {
			setTenzies(true);
			if (time < bestTime) {
				setBestTime(time);
				localStorage.setItem('bestTime', time);
			}
		}
	}, [dice, time, bestTime]);

	function generateNewDie() {
		return {
			value: Math.floor(Math.random() * 6) + 1,
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

	function resetGame() {
		setTenzies(false);
		setDice(allNewDice());
		setRollCount(0); // Reset roll count when the game is reset
		setTime(0); // Reset the timer
	}
	
	function rollDice() {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateNewDie();
				})
			);
			setRollCount((prevCount) => prevCount + 1);
		} else {
			resetGame();
			setRollCount(0); // Reset roll count for a new game
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

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className='title'>TENZIES</h1>
			<h2 className='time'>Time: {time}s</h2>
			<h2 className='best-time'>Best Time: {bestTime}s</h2>
			<p className='instruction'>
				Roll ten dice and keep rolling until all dice match the same number. Try
				to finish as fast as you can!
			</p>
			<div className='dice-container'>{diceElements}</div>
			<h2 className='rolls'>Rolls: {rollCount}</h2>
			<button onClick={rollDice} className='roll-dice'>
				{tenzies ? 'New Game' : 'Roll'}
			</button>
		</main>
	);
}

export default App;
