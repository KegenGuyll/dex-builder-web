import TCGCardSkeleton from "@/components/TCGCards/skeleton"

const SearchPageLoading = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {[...Array(10)].map((_, index) => (
        <TCGCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default SearchPageLoading