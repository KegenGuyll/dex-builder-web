import SearchBar from "@/components/Search"

export default function SetDetailsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <SearchBar />
      <div>
        {children}
      </div>
    </section>
  )
}