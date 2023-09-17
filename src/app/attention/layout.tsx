export default function AttentionLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="w-full max-w-screen-lg min-h-[20rem] mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
			{children}
		</div>
	)
}
