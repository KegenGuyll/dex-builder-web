import Image from "next/image";
import {Image as NextUiImage} from "@nextui-org/image";
import Link from "next/link";

type TCGCardProps = {
  cardName: string
  src: string
  onClick?: () => void
  href?: string
  imageSize?: {
    height: string | number
    width: string | number
  }
  useNextUiImage?: boolean
}

type TCGImageProps = {
  src: string
  alt: string
  height?: string | number
  width?: string | number
  useNextUiImage?: boolean
}

export const TCGImage: React.FC<TCGImageProps> = ({src, alt, height, width, useNextUiImage}: TCGImageProps) => {

  if (useNextUiImage) {
    return (
      <NextUiImage removeWrapper className="aspect-playingCard z-0 w-full h-full object-cover" alt={alt} src={src} />
    )
  } 

  if(!height || !width) {
    return (
      <div className="relative h-40 md:h-[210px] lg:h-[260px] w-28 md:w-[162px] lg:w-[212px] rounded">
        <Image fill className="aspect-playingCard rounded" alt={alt} src={src} />
      </div>
    )
  }

  return (
    <div style={{height, width}} className={`relative rounded`}>
      <Image fill className="aspect-playingCard rounded" alt={alt} src={src} />
    </div>
  )
}

const TCGCard: React.FC<TCGCardProps> = ({ src, cardName, onClick, href, imageSize, useNextUiImage }: TCGCardProps) => {

  if(onClick) {
    return (
      <button onClick={onClick}>
        <TCGImage useNextUiImage={useNextUiImage} src={src} alt={cardName} height={imageSize?.height} width={imageSize?.width} />
      </button>
    )
  }

  if(href) {
   return (
      <Link href={href}>
        <TCGImage useNextUiImage={useNextUiImage} src={src} alt={cardName} height={imageSize?.height} width={imageSize?.width} />
      </Link>
    ) 
  };


  return (
    <TCGImage useNextUiImage={useNextUiImage} src={src} alt={cardName} height={imageSize?.height} width={imageSize?.width} />
  );
}

export default TCGCard;