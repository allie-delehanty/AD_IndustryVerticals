'use client';

import { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Keyboard, Navigation } from 'swiper/modules';
import { ProductCard } from '../non-sitecore/ProductCard';
import { Product } from '@/types/products';
import { SitecoreItem } from '@/types/common';
import CarouselButton from './CarouselButton';
import { calculateAverageRating } from '@/helpers/productUtils';
import { useIsMounted } from '@/hooks/useIsMounted';

interface ProductCarouselProps {
  products: SitecoreItem<Product>[];
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
}

const ProductCarousel = ({
  products,
  loop = true,
  autoPlay = true,
  autoPlayDelay = 5000,
  className = '',
}: ProductCarouselProps) => {
  const uid = useId();
  const isMounted = useIsMounted();

  const filteredProducts = products.filter((product) => Object.keys(product.fields).length > 0);
  const canLoop = loop && filteredProducts.length > 1;

  const cards = filteredProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={{
        ...product.fields,
        Rating: calculateAverageRating(product.fields.Reviews || []),
      }}
      url={product.url}
    />
  ));

  if (!isMounted) {
    return (
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {cards.slice(0, 4)}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <CarouselButton
        direction="prev"
        className={`product-carousel-prev-${uid} absolute top-1/2 -left-5 -translate-y-1/2`}
        name="previous-product"
        aria-label="Previous product"
      />

      <Swiper
        modules={[Navigation, Autoplay, Keyboard, A11y]}
        navigation={{
          prevEl: `.product-carousel-prev-${uid}`,
          nextEl: `.product-carousel-next-${uid}`,
          disabledClass: 'pointer-events-none opacity-50',
        }}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
          1536: { slidesPerView: 5, spaceBetween: 20 },
        }}
        a11y={{ enabled: true }}
        keyboard={{ enabled: true }}
        loop={canLoop}
        autoplay={
          autoPlay && canLoop
            ? {
                delay: autoPlayDelay,
                pauseOnMouseEnter: true,
              }
            : false
        }
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id} className="p-1">
            <ProductCard
              product={{
                ...product.fields,
                Rating: calculateAverageRating(product.fields.Reviews || []),
              }}
              url={product.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <CarouselButton
        direction="next"
        className={`product-carousel-next-${uid} absolute top-1/2 -right-5 -translate-y-1/2`}
        name="next-product"
        aria-label="Next product"
      />
    </div>
  );
};

export default ProductCarousel;
