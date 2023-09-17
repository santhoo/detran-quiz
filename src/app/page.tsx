import Link from 'next/link'

export default function Home() {
	return (
		<div>
			<ul>
				<li>
					Teste Atenção
					<ul>
						<li>
							<Link href="./attention/1">Atenção - Teste 1</Link>
						</li>
						<li>
							<Link href="./attention/2">Atenção - Teste 2</Link>
						</li>
						<li>
							<Link href="./attention/3">Atenção - Teste 3</Link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	)
}
