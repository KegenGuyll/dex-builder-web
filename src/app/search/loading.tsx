import { Spinner } from "@nextui-org/spinner"

const SearchPageLoading = () => {
  return (
    <div className="flex justify-center p-8 items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default SearchPageLoading