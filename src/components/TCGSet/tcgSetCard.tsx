import Link from "next/link"
import { TCGImage } from "../TCGCards"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { SetImages } from "@/types/endpoints/tcg/set"

type TCGCardProps = {
  setName: string
  seriesName: string
  images: SetImages
  onClick?: () => void
  href?: string
  imageSize?: {
    height: string | number
    width: string | number
  }
  useNextUiImage?: boolean
}

type TCGSetCardImageProps = {
  images: SetImages
  setName: string
  seriesName: string
  alt: string
  height?: string | number
  width?: string | number
  useNextUiImage?: boolean
}


const TCGSetCardImage: React.FC<TCGSetCardImageProps> = ({ 
    images, 
    alt, 
    height, 
    width, 
    useNextUiImage, 
    setName, 
    seriesName 
}: TCGSetCardImageProps) => {
  return (
    <Card>
      <CardHeader className="flex gap-4 items-center">
        <Image alt={alt} src={images.symbol} height={25} width={25}  />
        <span>{seriesName}: {setName}</span>
      </CardHeader>
      <CardBody className="flex w-full justify-center items-center">
        <TCGImage useNextUiImage={useNextUiImage} src={images.logo} alt={alt} height={height} width={width} />
      </CardBody>
    </Card>
  )
}

const TCGSetCard: React.FC<TCGCardProps> = ({ images, setName, seriesName, onClick, href, imageSize, useNextUiImage }: TCGCardProps) => {
  
    if(onClick) {
      return (
        <button onClick={onClick}>
          <TCGSetCardImage 
            useNextUiImage={useNextUiImage} 
            images={images} 
            alt={setName} 
            height={imageSize?.height} 
            width={imageSize?.width} 
            seriesName={seriesName}
            setName={setName}
          />
        </button>
      )
    }
  
    if(href) {
    return (
        <Link href={href}>
          <TCGSetCardImage 
            useNextUiImage={useNextUiImage} 
            images={images} 
            alt={setName} 
            height={imageSize?.height} 
            width={imageSize?.width}       
            seriesName={seriesName}
            setName={setName}
          />
        </Link>
      ) 
    }
  
    return (
      <TCGSetCardImage 
        useNextUiImage={useNextUiImage} 
        images={images} 
        alt={setName} 
        height={imageSize?.height} 
        width={imageSize?.width} 
        seriesName={seriesName}
        setName={setName}
      />
    )
  }

export default TCGSetCard