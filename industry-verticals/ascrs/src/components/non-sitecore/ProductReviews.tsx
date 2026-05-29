'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import CarouselButton from './CarouselButton';
import { ReviewFields } from '@/types/review';
import { ComponentRendering, useSitecore } from '@sitecore-content-sdk/nextjs';
import ReviewCard from './ReviewCard';
import { useI18n } from 'next-localization';
import { useIsMounted } from '@/hooks/useIsMounted';

type ProductReviewsProps = {
  reviews: ReviewFields[];
  rendering: ComponentRendering;
};

export const ProductReviews = (props: ProductReviewsProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();
  const isMounted = useIsMounted();

  const uid = props.rendering.uid;
  const isPageEditing = page.mode.isEditing;

  if (!props.reviews || props.reviews.length === 0) {
    return (
      <div className="w-full">
        <div className="container pt-10">
          <p className="pb-10 text-center">
            {t('no_reviews_label') || 'No reviews available for this product.'}
          </p>
        </div>
      </div>
    );
  }

  const cards = props.reviews.map((review, index) => (
    <ReviewCard key={review.id ?? index} isPageEditing={isPageEditing} {...review} />
  ));

  return (
    <div className="w-full">
      <div className="relative pt-10">
        {isMounted ? (
          <>
            <CarouselButton
              direction="prev"
              name="Previous Review"
              aria-label="Previous Review"
              className={`swiper-btn-prev-${uid} absolute top-1/3 -left-5`}
            />

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={4}
              navigation={{
                prevEl: `.swiper-btn-prev-${uid}`,
                nextEl: `.swiper-btn-next-${uid}`,
                disabledClass: 'pointer-events-none opacity-50',
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!overflow-visible !overflow-x-clip"
            >
              {props.reviews.map((review, index) => (
                <SwiperSlide key={review.id ?? index} className="pb-10">
                  <ReviewCard isPageEditing={isPageEditing} {...review} />
                </SwiperSlide>
              ))}
            </Swiper>

            <CarouselButton
              direction="next"
              name="Next Review"
              aria-label="Next Review"
              className={`swiper-btn-next-${uid} absolute top-1/3 -right-5`}
            />
          </>
        ) : (
          <div
            className="grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 lg:grid-cols-4"
            suppressHydrationWarning
          >
            {cards.slice(0, 4)}
          </div>
        )}
      </div>
    </div>
  );
};
