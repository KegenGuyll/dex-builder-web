'use client'

import useCreateQueryString from "@/hooks/useCreateQueryString";
import { Pagination } from "@nextui-org/pagination";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

type CardPaginationProps = {
  totalResults: number
}

const CardPagination: React.FC<CardPaginationProps> = ({ totalResults }: CardPaginationProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const { createQueryString } = useCreateQueryString()


  const handlePageChange = (page: number) => {
    const paramUrl = createQueryString('page', page.toString())

    router.push(`${pathname}?${paramUrl}`)
  }

  return (
    <Pagination
      total={totalResults}
      page={Number(searchParams.get('page')) || 1}
      onChange={handlePageChange}
    />
  )
};

export default CardPagination;