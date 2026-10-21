import {
  ArrayFieldItemTemplateProps,
  getUiOptions,
  type ObjectFieldTemplateProps,
} from '@rjsf/utils';
import type { ViewDefinition } from '@erfgoedzoeker/config-schema';
import { clsx } from 'clsx';
import { Collapse, getFieldTitle } from './Collapse';
import { ConfigRowTitle } from './ConfigRowTitle';
import { HelpMedia } from './help/HelpMedia';
import { isFieldHelp } from './help/types';
import { SortableArrayItem } from './SortableArrayTemplates';

const viewRowFields = ['type', 'componentId', 'icon', 'label'] as ReadonlyArray<
  keyof ViewDefinition
>;

export function ViewArrayItemTemplate(props: ArrayFieldItemTemplateProps) {
  return <SortableArrayItem {...props} separated />;
}

export function ViewRowTemplate({
  properties,
  formData: view,
  schema,
  uiSchema,
}: ObjectFieldTemplateProps<ViewDefinition>) {
  const hidden = Boolean(view?.options?.hidden);
  const help = getUiOptions(uiSchema).helpMedia;

  const prop = (name: string) => properties.find((p) => p.name === name);
  const options = prop('options');
  const presentationConfig = prop('presentationConfig');

  return (
    <div className={clsx(hidden && 'opacity-40')}>
      <ConfigRowTitle icon={view?.icon} label={view?.label} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {viewRowFields.map((name) => {
          const p = prop(name);
          return (
            p && (
              <div key={name} className="flex-1">
                {p.content}
              </div>
            )
          );
        })}
      </div>

      {isFieldHelp(help) && (
        <div className="mt-1">
          <HelpMedia help={help} />
        </div>
      )}

      {options && (
        <Collapse title={getFieldTitle(schema, 'options', 'Options')}>
          {options.content}
        </Collapse>
      )}
      {presentationConfig && (
        <Collapse
          title={getFieldTitle(schema, 'presentationConfig', 'Presentation')}
        >
          {presentationConfig.content}
        </Collapse>
      )}
    </div>
  );
}
