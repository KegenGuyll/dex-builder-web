export default function CardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full justify-center">
      <section className="w-full lg:max-w-[800px]">
        {children}
      </section>
    </div>
  )
}