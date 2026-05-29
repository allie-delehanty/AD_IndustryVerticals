'use client';

import { useEffect, useState } from 'react';

import { Field, useSitecore } from '@sitecore-content-sdk/nextjs';

import { ComponentProps } from 'lib/component-props';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Navigation } from 'swiper/modules';

import { isParamEnabled } from '@/helpers/isParamEnabled';

import { SafeText } from '@/helpers/safeFieldText';

import { useIsMounted } from '@/hooks/useIsMounted';

interface OfferFields {
  id: string;

  displayName: string;

  name: string;

  url: string;

  fields: {
    OfferText: Field<string>;
  };
}

interface OfferProps extends ComponentProps {
  fields: {
    Offers: OfferFields[];
  };
}

const autoPlayDelay = 5000;

export const Default = (props: OfferProps) => {
  const { page } = useSitecore();

  const isMounted = useIsMounted();

  const [canLoop, setCanLoop] = useState(false);

  const id = props.params.RenderingIdentifier;

  const uid = props.rendering.uid;

  const datasource = props.fields?.Offers || [];

  const styles = `${props.params.styles || ''}`.trim();

  const autoPlay = isParamEnabled(props.params.Autoplay);

  useEffect(() => {
    setCanLoop(datasource.length > 1);
  }, [datasource.length]);

  if (!datasource.length) {
    return page.mode.isEditing ? (
      <div className={`component offers ${styles}`} id={id}>
        [OFFERS]
      </div>
    ) : (
      <></>
    );
  }

  const slideContent = (offer: OfferFields) => (
    <SafeText field={offer.fields.OfferText} className="text-background" />
  );

  return (
    <div className={`component offers bg-primary text-background ${styles}`} id={id}>
      <div className="container mx-auto flex w-full items-center justify-center gap-5 px-4 py-4">
        {isMounted ? (
          <>
            <button
              className={`swiper-btn-prev-${uid} hover:text-accent transition-colors`}
              name="previous-offer"
              aria-label="Previous offer"
              type="button"
            >
              <ChevronLeft />
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: `.swiper-btn-prev-${uid}`,

                nextEl: `.swiper-btn-next-${uid}`,

                disabledClass: 'pointer-events-none opacity-50',
              }}
              slidesPerView={1}
              centeredSlides
              noSwiping
              noSwipingClass="no-swiping"
              loop={canLoop}
              autoplay={
                autoPlay && canLoop
                  ? {
                      delay: autoPlayDelay,

                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              autoHeight
              className="mx-0! w-full transition-all"
            >
              {datasource.map((offer) => (
                <SwiperSlide key={offer.id} className="no-swiping text-center">
                  {slideContent(offer)}
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={`swiper-btn-next-${uid} hover:text-accent transition-colors`}
              name="next-offer"
              aria-label="Next offer"
              type="button"
            >
              <ChevronRight />
            </button>
          </>
        ) : (
          <div className="w-full text-center" suppressHydrationWarning>
            {slideContent(datasource[0])}
          </div>
        )}
      </div>
    </div>
  );
};
