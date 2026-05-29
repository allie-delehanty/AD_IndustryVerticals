import { SafeText } from '@/helpers/safeFieldText';
import { IGQLTextField } from '@/types/igql';
import { ComponentParams, ComponentRendering, Image, Link } from '@sitecore-content-sdk/nextjs';
import React from 'react';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;
  const hideAccentLine = props.params.styles?.includes(CommonStyles.HideAccentLine);
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 className="text-primary inline-block max-w-md text-3xl font-bold md:text-4xl">
            <SafeText field={featureSectionTitle.jsonValue} tag="span" />
            {!hideAccentLine && <AccentLine className="w-20" />}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div className="border-border flex flex-col border-b pb-8" key={index}>
                <div className="text-primary mb-3 text-xl font-bold">
                  <SafeText field={title} tag="span" />
                </div>
                <div className="text-foreground-light mb-4 flex-auto leading-relaxed">
                  <SafeText field={description} tag="span" />
                </div>
                <div>
                  <Link field={link} className="arrow-btn" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-6" key={index}>
              {imageField && (
                <Image field={imageField} className="max-h-16 object-contain opacity-80" />
              )}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col flex-wrap justify-evenly gap-12 py-16 md:flex-row lg:gap-16">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex flex-col items-center justify-start md:w-64" key={index}>
              <div className="bg-accent mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  <SafeText field={title} tag="h5" className="text-primary" />
                </div>
                <div className="text-foreground-muted">
                  <SafeText field={description} tag="span" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-12 sm:grid-cols-2">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          const isAccentTile = index === 0;
          return (
            <div
              className={clsx(
                'ascrs-grid-tile min-h-52',
                isAccentTile ? 'ascrs-grid-tile--accent' : 'ascrs-grid-tile--primary'
              )}
              key={index}
            >
              <h3 className="mb-3 text-2xl font-bold">
                <SafeText field={title} tag="span" />
              </h3>
              <p className="text-background/90 text-sm leading-relaxed">
                <SafeText field={description} tag="span" />
              </p>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex gap-4" key={index}>
              <div className="bg-background-accent flex size-12 shrink-0 items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-primary mb-1 text-lg font-bold">
                  <SafeText field={title} tag="span" />
                </div>
                <div className="text-foreground-muted text-sm leading-relaxed">
                  <SafeText field={description} tag="span" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div key={index}>
              <div className="border-border bg-background-surface mb-5 aspect-4/3 w-full overflow-hidden rounded-lg border">
                <Image field={image} className="h-full w-full object-cover" />
              </div>

              <h6 className="text-primary">
                <SafeText field={title} tag="span" />
              </h6>

              <p className="text-foreground-muted mt-2 text-sm leading-relaxed">
                <SafeText field={description} tag="span" />
              </p>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
