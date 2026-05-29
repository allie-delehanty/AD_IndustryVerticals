import { SafeText } from '@/helpers/safeFieldText';
import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import AscrsPatternCircle from '@/assets/icons/ascrs-pattern-circle/AscrsPatternCircle';
import { Quote } from '@/assets/icons/quote/Quote';
import { CommonStyles, LayoutStyles, PromoFlags } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  PromoImageOne: ImageField;
  PromoImageTwo: ImageField;
  PromoImageThree: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

type PromoImageGroupProps = Partial<
  Pick<Fields, 'PromoImageOne' | 'PromoImageTwo' | 'PromoImageThree'>
> & {
  withShapes?: boolean;
};

export type PromoProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const getPromoCtaClassName = (styles?: string) =>
  clsx('cta-btn', styles?.includes(PromoFlags.BlueButton) && 'cta-btn--blue');

export const PromoContent = ({ ...props }) => {
  const isAccentLineVisible = !props?.params?.styles?.includes(CommonStyles.HideAccentLine);
  const showSubtitle = props.fields?.PromoSubTitle?.value;

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {showSubtitle && (
        <div className="eyebrow">
          <SafeText field={props.fields.PromoSubTitle} tag="span" />
        </div>
      )}

      <h2 className="text-primary font-heading text-3xl leading-tight font-semibold md:text-4xl lg:text-[2.5rem]">
        <SafeText field={props.fields.PromoTitle} tag="span" />
        {isAccentLineVisible && <AccentLine className="mt-4 w-16" />}
      </h2>

      <div className="promo-rich-text max-w-xl">
        <ContentSdkRichText field={props.fields.PromoDescription} />
      </div>

      <div className="pt-2">
        <Link
          field={props.fields.PromoMoreInfo}
          className={getPromoCtaClassName(props.params?.styles)}
        />
      </div>
    </div>
  );
};

export const SingleImageContainer = ({
  PromoImageOne,
  withShapes,
}: PromoImageGroupProps): JSX.Element => {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none lg:justify-end">
      {withShapes && <AscrsPatternCircle className="promo-pattern-accent" />}
      <div className="promo-image-ring">
        <ContentSdkImage field={PromoImageOne} className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export const MultipleImageContainer = ({
  PromoImageOne,
  PromoImageTwo,
  PromoImageThree,
  withShapes,
}: PromoImageGroupProps): JSX.Element => {
  return (
    <div className="relative flex flex-col items-center gap-8 md:flex-row lg:justify-end">
      <div className="flex flex-col gap-6 md:w-1/3">
        <div className="promo-image-ring !size-40">
          <ContentSdkImage field={PromoImageTwo} className="h-full w-full object-cover" />
        </div>
        <div className="promo-image-ring !size-32 md:ml-auto">
          <ContentSdkImage field={PromoImageThree} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="relative w-full md:w-2/3">
        {withShapes && <AscrsPatternCircle className="promo-pattern-accent" />}
        <div className="promo-image-ring relative z-10 mx-auto md:mx-0 md:ml-auto">
          <ContentSdkImage field={PromoImageOne} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);
  const showSingleImage = !props?.params?.styles?.includes(PromoFlags.ShowMultipleImages);
  const withShapes = !props?.params?.styles?.includes(PromoFlags.HidePromoShapes);

  return (
    <section className={clsx('promo-section', props.params.styles)} id={id ? id : undefined}>
      <div className="container">
        <div
          className={clsx(
            'grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20',
            isPromoReversed && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
          )}
        >
          {/* Content — left column (matches ASCRS On Demand screenshot) */}
          <div className="w-full">
            <PromoContent {...props} />
          </div>

          {/* Image — right column */}
          <div className="relative w-full">
            {showSingleImage ? (
              <SingleImageContainer
                PromoImageOne={props.fields.PromoImageOne}
                withShapes={withShapes}
              />
            ) : (
              <MultipleImageContainer
                PromoImageOne={props.fields.PromoImageOne}
                PromoImageTwo={props.fields.PromoImageTwo}
                PromoImageThree={props.fields.PromoImageThree}
                withShapes={withShapes}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WithFullImage = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? ' flex-col'
    : 'flex-col-reverse';

  return (
    <section className={clsx('promo-section', props.params.styles)} id={id ? id : undefined}>
      <div className={`container flex gap-10 ${isPromoReversed}`}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <ContentSdkImage
            field={props.fields.PromoImageTwo}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <div className="eyebrow">
            <SafeText field={props.fields.PromoSubTitle} tag="span" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <h2 className="text-primary font-heading max-w-md text-3xl font-normal">
              <SafeText field={props.fields.PromoTitle} tag="span" />
            </h2>

            <div className="promo-rich-text flex max-w-md items-center">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
          </div>

          <Link
            field={props.fields.PromoMoreInfo}
            className={getPromoCtaClassName(props.params?.styles)}
          />
        </div>
      </div>
    </section>
  );
};

export const WithQuote = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const withQuote = !props?.params?.styles?.includes(PromoFlags.HidePromoQuotes);
  const isReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed);

  const classesWhenReversed = {
    container: isReversed ? 'container-align-left' : 'container-align-right',
    contentOrder: isReversed ? 'order-1 lg:order-2' : 'order-2 lg:order-1',
    imageTransform: isReversed
      ? '-translate-x-[10%] xl:-translate-x-[20%]'
      : 'translate-x-[10%] xl:translate-x-[15%]',
    quoteFlip: isReversed ? '' : 'lg:-scale-x-100',
  };

  return (
    <section
      className={clsx('promo-section relative z-10 overflow-hidden', props.params.styles)}
      id={id ? id : undefined}
    >
      {withQuote && (
        <div
          className={`text-pale-teal! absolute left-5 md:top-[10%] lg:top-[25%] lg:left-1/2 lg:-translate-x-1/2 ${classesWhenReversed.quoteFlip} z-20`}
        >
          <Quote className="h-10 md:h-20 lg:h-25 xl:h-30" />
        </div>
      )}
      <div className={`${classesWhenReversed.container}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-0">
          <div
            className={`relative mt-10 flex items-center justify-center lg:col-span-1 ${classesWhenReversed.contentOrder}`}
          >
            <div className="mb-5 max-w-sm">
              <PromoContent {...props} />
            </div>
          </div>

          <div
            className={`promo-image-ring relative z-30 order-2 mb-2 aspect-square w-4/5 translate-y-[15%] place-self-end lg:order-1 lg:col-span-2 lg:h-3/4 lg:w-auto ${classesWhenReversed.imageTransform}`}
          >
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
