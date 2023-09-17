'use client'

import { useEffect, useState } from 'react'

function randomIndex(array: Array) {
	return Math.floor(Math.random() * array.length) as number
}

export default function Attention1() {
	const [userSelection, setUserSelection] = useState([])
	let answersIndex: number[] = []

	const options = ['Opção 1', 'Opção 2', 'Opção 3']

	const [toSearch, setToSearch] = useState({
		option: 'Aguarde...',
		index: 0,
	})

	const [questions, setQuestions] = useState([])

	useEffect(() => {
		// Set Option to Search
		const randomOption = randomIndex(options)
		setToSearch({
			option: options[randomOption],
			index: randomOption,
		})

		// Set Questions Map
		setQuestions(
			Array(10)
				.fill()
				.map(() => randomIndex(options))
		)
	}, [])

	// Get Selected Item Index
	function selectedItemIndex(value: number, array: Array) {
		const index = array.findIndex((selectValue) => selectValue === value)

		if (index === -1) {
			return false
		} else {
			return index
		}
	}

	function isSelected(index: number) {
		if (selectedItemIndex(index, userSelection) !== false) {
			return true
		} else {
			return false
		}
	}

	const handleOnChange = (position: number) => {
		const itemIndex = selectedItemIndex(position, userSelection)

		if (itemIndex === false) {
			setUserSelection((userSelection) => [...userSelection, position])
		} else {
			const slicedArr = [
				...userSelection.slice(0, itemIndex),
				...userSelection.slice(itemIndex + 1),
			]
			setUserSelection(slicedArr)
		}
	}

	return (
		<div>
			<h1 className="text-center font-bold text-lg">
				Teste de Atenção - Teste 1
			</h1>

			<hr className="my-8" />

			<div className="text-center">
				<h2 className="mb-4 font-bold text-sm uppercase">Instruções:</h2>

				<div className="w-96 mx-auto p-6 border-2 text-center bg-slate-50 border-blue-400 rounded-3xl">
					<p className="text-sm leading-tight mb-4">
						Marque, na lista de figuras abaixo, quando <u>apenas</u> quando
						encontrar essa figura:
					</p>

					<div className="inline-flex py-2 px-4 bg-blue-700/10 rounded-lg">
						{toSearch.option} - {toSearch.index}
					</div>
				</div>
			</div>

			<hr className="my-8" />

			<div className="text-center">
				{questions.length && (
					<ul>
						{questions.map((question, index) => {
							// Store Position of Correct Answers
							if (question === toSearch.index) {
								answersIndex.push(index)
							}

							return (
								<li key={index}>
									<label htmlFor={`checkbox-${index}`}>
										{options[question]} - {index}
										<input
											type="checkbox"
											id={`checkbox-${index}`}
											name={`checkbox-${index}`}
											value={options[question]}
											checked={isSelected(index) !== false && true}
											onChange={() => handleOnChange(index)}
										/>
									</label>
								</li>
							)
						})}
					</ul>
				)}
			</div>

			<pre>Answers: {JSON.stringify(answersIndex)}</pre>
			<hr />
			<pre>User Selection: {JSON.stringify(userSelection)}</pre>
		</div>
	)
}
