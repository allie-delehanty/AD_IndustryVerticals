import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <header className={`component header border-border bg-background border-b ${styles}`} id={id}>
      {/* Utility bar — JCRS, EyeWorld, Foundation, Log in, Join */}
      <div className="border-border bg-background-surface hidden border-b lg:block">
        <div className="container flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <Placeholder
              name={`header-utility-left-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
          <div className="flex items-center gap-3">
            <Placeholder
              name={`header-utility-right-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
        </div>
      </div>

      <div className="container flex items-center gap-3 py-3 lg:gap-8 lg:py-4">
        <div className="max-lg:order-1 lg:flex-[1_1]">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="max-lg:order-0 max-lg:mr-auto max-lg:w-2/3 lg:flex-[4_1]">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="max-lg:order-2 lg:flex-[1_1]">
          <Placeholder name={`header-right-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>
    </header>
  );
};
