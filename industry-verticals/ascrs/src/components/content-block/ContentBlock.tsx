import { RichText, Field, withDatasourceCheck } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { SafeText } from '@/helpers/safeFieldText';
import { JSX } from 'react';

type ContentBlockProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * Content SDK component that's useful.
 */
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
  <div className="contentBlock">
    <h2 className="contentTitle">
      <SafeText field={fields.heading} tag="span" />
    </h2>

    <RichText className="contentDescription" field={fields.content} />
  </div>
);

export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
