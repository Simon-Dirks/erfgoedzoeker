import {
  ADDITIONAL_PROPERTY_FLAG,
  buttonId,
  type ObjectFieldTemplateProps,
  type WrapIfAdditionalTemplateProps,
} from '@rjsf/utils';
import { clsx } from 'clsx';
import { Collapse, getFieldTitle } from './Collapse';

const HiddenArrayFieldTitleTemplate = () => null;

export function ViewOptionsTemplate({
  properties,
  schema,
}: ObjectFieldTemplateProps) {
  const forcedFilters = properties.find((p) => p.name === 'forcedFilters');
  const rest = properties.filter((p) => p.name !== 'forcedFilters');

  return (
    <div>
      {rest.map((p) => (
        <div key={p.name}>{p.content}</div>
      ))}
      {forcedFilters && (
        <Collapse
          title={getFieldTitle(schema, 'forcedFilters', 'Forced filters')}
        >
          {forcedFilters.content}
        </Collapse>
      )}
    </div>
  );
}

export const forcedFilterValuesUiSchema = {
  'ui:title': 'Required value(s)',
  'ui:ArrayFieldTitleTemplate': HiddenArrayFieldTitleTemplate,
  'ui:WrapIfAdditionalTemplate': ForcedFilterRowTemplate,
  items: {
    'ui:title': 'Value',
    'ui:placeholder': 'true',
  },
};

export function ForcedFilterRowTemplate(
  props: WrapIfAdditionalTemplateProps,
) {
  const {
    children,
    classNames,
    disabled,
    id,
    label,
    onKeyRenameBlur,
    onRemoveProperty,
    readonly,
    registry,
    schema,
    uiSchema,
  } = props;

  if (!(ADDITIONAL_PROPERTY_FLAG in schema)) {
    return <div className={clsx('flex-grow', classNames)}>{children}</div>;
  }

  const { RemoveButton } = registry.templates.ButtonTemplates;

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 rounded-lg border border-base-300 p-4 sm:flex-row sm:items-start',
        classNames,
      )}
    >
      <div className="flex-1">
        <label htmlFor={`${id}-key`} className="label">
          <span className="label-text font-medium">Filter name</span>
        </label>
        <input
          type="text"
          id={`${id}-key`}
          className="input input-bordered w-full"
          defaultValue={label}
          disabled={disabled || readonly}
          placeholder="e.g. hasCoordinates"
          onBlur={onKeyRenameBlur}
        />
      </div>
      <div className="flex-[2]">{children}</div>
      <div className="flex justify-end sm:self-start sm:pt-7">
        <RemoveButton
          id={buttonId(id, 'remove')}
          className="btn btn-square btn-ghost text-error"
          disabled={disabled || readonly}
          onClick={onRemoveProperty}
          uiSchema={uiSchema}
          registry={registry}
        />
      </div>
    </div>
  );
}
