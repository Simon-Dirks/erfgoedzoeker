import { getUiOptions, type ObjectFieldTemplateProps } from '@rjsf/utils';
import type { FacetConfig } from '@erfgoedzoeker/config-schema';
import { clsx } from 'clsx';
import { ConfigRowTitle } from './ConfigRowTitle';
import { HelpMedia } from './help/HelpMedia';
import { isFieldHelp } from './help/types';

const facetFieldOrder = ['name', 'label', 'icon', 'hidden'] as ReadonlyArray<
  keyof FacetConfig
>;

export function FacetRowTemplate({
  properties,
  formData: facetConfig,
  uiSchema,
}: ObjectFieldTemplateProps<FacetConfig>) {
  const hidden = Boolean(facetConfig?.hidden);
  const help = getUiOptions(uiSchema).helpMedia;

  return (
    <div className={clsx(hidden && 'opacity-40')}>
      <ConfigRowTitle icon={facetConfig?.icon} label={facetConfig?.label} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {facetFieldOrder.map((name) => {
          const prop = properties.find((p) => p.name === name);
          return prop ? (
            <div key={name} className="flex-1">
              {prop.content}
            </div>
          ) : null;
        })}
      </div>
      {isFieldHelp(help) && (
        <div className="mt-1">
          <HelpMedia help={help} />
        </div>
      )}
    </div>
  );
}
