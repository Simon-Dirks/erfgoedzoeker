import type { FilterConfig } from '@erfgoedzoeker/config-schema';
import { getUiOptions, type ObjectFieldTemplateProps } from '@rjsf/utils';
import { clsx } from 'clsx';
import { useContext } from 'react';
import { ConfigRowTitle } from './ConfigRowTitle';
import { FilterTypeFieldContext } from './FilterTypeSelectorTemplate';
import { HelpMedia } from './help/HelpMedia';
import { isFieldHelp } from './help/types';

const filterFieldOrder = ['name', 'label', 'icon', 'hidden'] as ReadonlyArray<
  keyof FilterConfig
>;

export function FilterRowTemplate({
  properties,
  formData: filterConfig,
  uiSchema,
}: ObjectFieldTemplateProps<FilterConfig>) {
  const hidden = Boolean(filterConfig?.hidden);
  const help = getUiOptions(uiSchema).helpMedia;
  const typeField = useContext(FilterTypeFieldContext);

  return (
    <div className={clsx(hidden && 'opacity-40')}>
      <ConfigRowTitle icon={filterConfig?.icon} label={filterConfig?.label} />
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {typeField && <div className="flex-1">{typeField}</div>}
        {filterFieldOrder.map((name) => {
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
