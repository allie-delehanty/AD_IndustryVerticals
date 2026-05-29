import { SafeText } from '@/helpers/safeFieldText';
import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import AscrsPatternCircle from '@/assets/icons/ascrs-pattern-circle/AscrsPatternCircle';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideAccentLine = styles?.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles?.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles?.includes(LayoutStyles.Reversed);
  const screenLayer = styles?.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section
      className={`component hero-banner bg-background relative overflow-hidden ${styles}`}
      id={id}
    >
      <div className="container">
        <div
          className={clsx(
            'grid min-h-[28rem] items-center gap-10 py-12 md:min-h-[32rem] md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20',
            reverseLayout && 'lg:[&>*:first-child]:order-2'
          )}
        >
          {/* Content */}
          <div className={clsx('flex flex-col justify-center', { shim: screenLayer })}>
            <h1 className="text-primary font-heading text-left text-4xl leading-tight font-semibold normal-case md:text-5xl lg:text-[3.25rem]">
              <SafeText field={fields.Title} tag="span" />
              {!hideAccentLine && <AccentLine className="!h-1 w-20" />}
            </h1>

            <div className="mt-6 max-w-xl text-base leading-relaxed md:text-lg">
              <ContentSdkRichText field={fields.Description} className="text-left" />
            </div>

            <div className="mt-8 flex w-full justify-start">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <Link field={fields.CtaLink} className="cta-btn" />
              )}
            </div>
          </div>

          {/* Circular image with ASCRS decorative elements */}
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none lg:justify-end">
            <AscrsPatternCircle className="promo-pattern-accent" />
            <div className="promo-image-ring relative z-10">
              {!isPageEditing && fields?.Video?.value?.src ? (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={fields.Image?.value?.src}
                >
                  <source src={fields.Video?.value?.src} type="video/webm" />
                </video>
              ) : (
                <ContentSdkImage
                  field={fields.Image}
                  className="h-full w-full object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideAccentLine = styles?.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles?.includes(HeroBannerStyles.WithPlaceholder);
  const screenLayer = styles?.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section
      className={`component hero-banner relative flex min-h-[24rem] items-center ${styles}`}
      id={id}
    >
      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}
        {!hideGradientOverlay && (
          <div className="from-primary/80 absolute inset-0 bg-gradient-to-r to-transparent" />
        )}
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className={clsx('max-w-2xl', { shim: screenLayer })}>
            <h1 className="text-background text-center text-4xl leading-tight font-extrabold uppercase md:text-5xl lg:text-left lg:text-6xl">
              <SafeText field={fields.Title} tag="span" />
              {!hideAccentLine && <AccentLine className="mx-auto !h-1 w-20 lg:mx-0" />}
            </h1>

            <div className="text-background/90 mt-6 text-lg md:text-xl">
              <ContentSdkRichText field={fields.Description} className="text-center lg:text-left" />
            </div>

            <div className="mt-8 flex w-full justify-center lg:justify-start">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <Link field={fields.CtaLink} className="cta-btn" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
