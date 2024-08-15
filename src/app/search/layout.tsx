import SearchBar from "@/components/Search"

export default function SearchLayout({
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