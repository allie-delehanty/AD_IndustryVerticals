import {
  ComponentParams,
  ComponentRendering,
  Image,
  ImageField,
  Link,
  LinkField,
  Placeholder,
  RichText,
  RichTextField,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { SafeText } from '@/helpers/safeFieldText';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <SafeText field={props.fields.TitleOne} tag="span" />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <SafeText field={props.fields.TitleTwo} tag="span" />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <SafeText field={props.fields.TitleThree} tag="span" />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <SafeText field={props.fields.TitleFour} tag="span" />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <SafeText field={props.fields.TitleFive} tag="span" />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <section className={`component footer relative ${props.params.styles} overflow-hidden`} id={id}>
      <div className="border-border bg-background border-t">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_3fr] lg:py-20">
          <div className="flex flex-col gap-6">
            <div className="sm:max-w-40">
              <Image field={props.fields.Logo} />
            </div>
            <RichText
              field={props.fields.Description}
              className="text-foreground-light text-sm leading-relaxed"
            />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="text-primary border-accent mb-5 inline-block border-b-2 pb-1 text-xs font-bold tracking-wider uppercase">
                  {title}
                </div>
                <div className="space-y-2 text-sm">{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-border bg-background-surface border-t">
        <div className="container flex flex-col items-start justify-between gap-6 py-6 text-sm md:flex-row md:items-center">
          <div>
            <SafeText
              field={props.fields.CopyrightText}
              className="text-foreground-muted"
              tag="span"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              field={props.fields.TermsText}
              className="text-primary hover:text-accent font-medium transition-colors"
            />
            <Link
              field={props.fields.PolicyText}
              className="text-primary hover:text-accent font-medium transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
