'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'

function randomIndex(array: Array) {
	return Math.floor(Math.random() * array.length) as number
}

export default function Attention1() {
	function isDebugging() {
		const searchParams = useSearchParams()
		const debugParam = searchParams.get('debug')

		if (debugParam && debugParam === 'true') {
			return true
		}
	}

	const [userSelection, setUserSelection] = useState([])
	let answersIndex: number[] = []

	const optionDir = '/img/attention/'
	const options = [
		'fig-1-1.png',
		'fig-1-2.png',
		'fig-1-3.png',
		'fig-1-4.png',
		'fig-2-1.png',
		'fig-2-2.png',
		'fig-2-3.png',
		'fig-2-4.png',
		'fig-3-1.png',
		'fig-3-2.png',
		'fig-3-3.png',
		'fig-4-1.png',
		'fig-4-2.png',
		'fig-5-1.png',
		'fig-5-2.png',
		'fig-5-3.png',
	]

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
			Array(20 * 20)
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

	function selectionStatus(index: number) {
		if (submmited && userScore !== null) {
			const { correctSelection, wrongSelection, missedSelection } = userScore

			console.log('status', 'submmited', submmited)
			console.log('status', 'userScore', userScore)

			if (selectedItemIndex(index, correctSelection) !== false) {
				// Correct Selection
				return 'correct'
			} else if (selectedItemIndex(index, wrongSelection) !== false) {
				// Wrong Selection
				return 'wrong'
			} else if (selectedItemIndex(index, missedSelection) !== false) {
				// Missed Selection
				return 'missed'
			}
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

	const [userScore, setUserScore] = useState(null)
	function submitAnswer(correctArray, selectionArray) {
		return {
			correctSelection: correctArray.filter((x) => selectionArray.includes(x)),
			wrongSelection: selectionArray.filter((x) => !correctArray.includes(x)),
			missedSelection: correctArray.filter((x) => !selectionArray.includes(x)),
		}
	}

	const [submmited, setSubmmited] = useState(false)
	function handleSubmit() {
		if (questions.length && answersIndex && userSelection) {
			// Set state to Submmited answers
			setSubmmited(true)

			// Analyse and Set User Score
			const score = submitAnswer(answersIndex, userSelection)
			setUserScore(score)
		}
	}

	return (
		<div>
			<h1 className={cn('text-center font-bold text-lg')}>
				Teste de Atenção - Teste 1
			</h1>

			<hr className={cn('my-8')} />

			<div className={cn('text-center')}>
				<h2 className={cn('mb-4 font-bold text-sm uppercase')}>Instruções</h2>

				<div
					className={cn(
						'w-96 mx-auto p-6 border-2 text-center bg-slate-50 border-blue-400 rounded-3xl'
					)}
				>
					<p className={cn('text-sm leading-tight mb-4')}>
						Marque, na lista de figuras abaixo, quando <u>apenas</u> quando
						encontrar essa figura:
					</p>

					<div
						className={cn(
							'w-12 h-12 inline-flex py-3 px-3 bg-blue-700/10 rounded-lg'
						)}
					>
						<Image
							alt=""
							width="24"
							height="24"
							src={`${optionDir}${options[toSearch.index]}`}
							className="w-full"
						/>
					</div>
				</div>
			</div>

			<hr className={cn('my-8')} />

			<div className={cn('text-center')}>
				{questions.length && (
					<ul
						className={cn(
							'w-full max-w-screen-lg mx-auto grid grid-cols-20 gap-4'
						)}
					>
						{questions.map((question, index) => {
							// Store Position of Correct Answers
							if (question === toSearch.index) {
								answersIndex.push(index)
							}

							return (
								<li key={index}>
									<label
										className={cn(
											!submmited &&
												isSelected(index) !== false &&
												'border-4 border-blue-500',
											selectionStatus(index) === 'correct' &&
												'border-4 border-green-500 bg-green-200',
											selectionStatus(index) === 'wrong' &&
												'border-4 border-red-500 bg-red-100',
											selectionStatus(index) === 'missed' &&
												'border-4 border-orange-400 bg-orange-100',
											'max-w-8 max-h-8 p-1 flex items-center justify-center bg-slate-100 hover:bg-slate-300 rounded-md cursor-pointer transition-all'
										)}
										htmlFor={`checkbox-${index}`}
									>
										<Image
											alt=""
											width="24"
											height="24"
											src={`${optionDir}${options[question]}`}
											className="w-full"
										/>
										<input
											type="checkbox"
											id={`checkbox-${index}`}
											name={`checkbox-${index}`}
											value={options[question]}
											checked={isSelected(index) !== false && true}
											onChange={() => handleOnChange(index)}
											disabled={submmited}
											className={cn('hidden')}
										/>
									</label>
								</li>
							)
						})}
					</ul>
				)}
			</div>

			<div className={cn('mt-12 text-center')}>
				<button
					onClick={() => handleSubmit()}
					disabled={submmited}
					className="py-2 px-4 font-bold text-emerald-950 rounded-md bg-emerald-200 hover:bg-emerald-300 disabled:bg-zinc-200 disabled:text-zinc-600 disabled:cursor-not-allowed"
				>
					Enviar Resposta
				</button>
			</div>

			{submmited && userScore !== null && (
				<>
					<hr className={cn('my-8')} />
					<div className={cn('text-center')}>
						<h3 className={cn('mb-4 text-lg font-bold')}>Sua pontuação</h3>

						<div className={cn('flex flex-row justify-evenly')}>
							<div className={cn('p-4 bg-green-100 rounded-lg')}>
								<h4 className={cn('text-base font-bold')}>Acertos</h4>
								<span className={cn('text-3xl font-bold text-green-500')}>
									{userScore.correctSelection.length}
								</span>
							</div>
							<div className={cn('p-4 bg-red-100 rounded-lg')}>
								<h4 className={cn('text-base font-bold')}>Marcado errado</h4>
								<span className={cn('text-3xl font-bold text-red-500')}>
									{userScore.wrongSelection.length}
								</span>
							</div>
							<div className={cn('p-4 bg-orange-100 rounded-lg')}>
								<h4 className={cn('text-base font-bold')}>Não viu</h4>
								<span className={cn('text-3xl font-bold text-orange-500')}>
									{userScore.missedSelection.length}
								</span>
							</div>
						</div>
					</div>
				</>
			)}

			{isDebugging() && (
				<>
					<hr />
					<pre>Answers: {JSON.stringify(answersIndex)}</pre>
					<hr />
					<pre>User Selection: {JSON.stringify(userSelection)}</pre>
					<hr />
					{submmited && userScore && (
						<>
							<pre>Correct: {JSON.stringify(userScore.correctSelection)}</pre>
							<pre>Wrong: {JSON.stringify(userScore.wrongSelection)}</pre>
							<pre>Missed: {JSON.stringify(userScore.missedSelection)}</pre>
						</>
					)}
				</>
			)}
		</div>
	)
}
