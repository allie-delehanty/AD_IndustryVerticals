'use client';

import { ComponentProps } from '@/lib/component-props';

import {
  ComponentParams,
  ComponentRendering,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';

import AccentLine from '@/assets/icons/accent-line/AccentLine';

import { ReviewFields } from '@/types/review';

import CarouselButton from '../non-sitecore/CarouselButton';

import ReviewCard from '../non-sitecore/ReviewCard';

import { CommonStyles } from '@/types/styleFlags';

import { SafeText } from '@/helpers/safeFieldText';

import { useIsMounted } from '@/hooks/useIsMounted';

interface ReviewsProps extends ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };

  params: { [key: string]: string };

  fields: {
    Title: TextField;

    Eyebrow: TextField;

    Reviews: ReviewFields[];
  };
}

export const Default = (props: ReviewsProps) => {
  const { page } = useSitecore();

  const isMounted = useIsMounted();

  const id = props.params.RenderingIdentifier;

  const uid = props.rendering.uid;

  const reviews = props.fields?.Reviews || [];

  const sectionTitle = props.fields?.Title || '';

  const sectionEyebrow = props.fields?.Eyebrow || '';

  const styles = `${props.params.styles || ''}`.trim();

  const isPageEditing = page.mode.isEditing;

  const hideAccentLine = styles?.includes(CommonStyles.HideAccentLine);

  const slider = isMounted ? (
    <>
      <CarouselButton
        direction="prev"
        name="Previous Review"
        aria-label="Previous Review"
        className={`swiper-btn-prev-${uid} absolute top-1/3 -left-2 -translate-y-1/2`}
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
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard isPageEditing={isPageEditing} {...review} />
          </SwiperSlide>
        ))}
      </Swiper>

      <CarouselButton
        direction="next"
        name="Next Review"
        aria-label="Next Review"
        className={`swiper-btn-next-${uid} absolute top-1/3 -right-2 -translate-y-1/2`}
      />
    </>
  ) : (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" suppressHydrationWarning>
      {reviews.slice(0, 4).map((review) => (
        <ReviewCard key={review.id} isPageEditing={isPageEditing} {...review} />
      ))}
    </div>
  );

  return (
    <div className={`${styles}`} id={id}>
      <div className="container py-20">
        <div className="text-center">
          <p className="eyebrow pb-4">
            <SafeText field={sectionEyebrow} />
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <h2
              className="text-primary inline-block font-semibold max-lg:text-4xl"
              aria-label="section-title"
            >
              <SafeText field={sectionTitle} tag="span" />
            </h2>

            <h2 className="inline-block font-semibold max-lg:text-5xl" aria-label="accent-line">
              {!hideAccentLine && <AccentLine className="w-full max-w-xs" />}
            </h2>
          </div>
        </div>

        <div className="relative mt-11 px-3">{slider}</div>
      </div>
    </div>
  );
};
