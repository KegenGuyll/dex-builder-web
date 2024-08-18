'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classNames from 'classnames';
import useScreenBreakpoints from '@/hooks/useScreenBreakpoints';
import { useMemo } from 'react';

type ContextCarouselProps = {
  className?: string
  children: React.ReactNode[]
}

const ContextCarousel: React.FC<ContextCarouselProps> = ({children, className}: ContextCarouselProps) => {

  const isLarge = useScreenBreakpoints('lg')
  const isMedium = useScreenBreakpoints('md')

  const slidesPerView = useMemo(() => {

    if (isLarge) {
      return children.length > 3.15 ? 3 : children.length
    }

    if (isMedium) {
      return 2
    }

    return 1.15

  }, [children.length, isLarge, isMedium])


  return (
    <Swiper
      className={classNames(className)}
      direction='horizontal'
      init
      spaceBetween={8}
      slidesPerView={slidesPerView}
    >
      {children.map((child, index) => {
       
        if(!child) return null

       return (
        <SwiperSlide  
            key={index}
          >
            {child}
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
};

export const dynamic = "force-dynamic";
export default ContextCarousel;