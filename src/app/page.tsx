import Link from 'next/link'

export default function Home() {
	return (
		<div className="w-full flex justify-center">
			<div className="w-full max-w-sm p-6 mt-12 bg-white rounded-xl shadow-xl">
				<h1 className="font-bold text-2xl">
					Quiz Simulado Detran Psicotécnico
				</h1>

				<ul className="mt-6 space-y-2">
					<li>
						<Link href="./attention/1">Teste de Atenção 1 - Figura única</Link>
					</li>
					<li>
						<Link href="./attention/2">
							Teste de Atenção 2 - Múltiplas figuras
						</Link>
					</li>
				</ul>

				<hr className="my-6" />

				<p className="text-sm text-zinc-400">
					Mockup project by Santiago Sipoli
				</p>
			</div>
		</div>
	)
}
