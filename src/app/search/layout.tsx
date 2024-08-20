import SearchBar from "@/components/Search/searchBar"

export default function SearchLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <SearchBar />
      <div className="mt-4 md:mt-8">
        {children}
      </div>
    </section>
  )
}