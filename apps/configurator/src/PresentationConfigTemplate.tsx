import type { ObjectFieldTemplateProps } from '@rjsf/utils';
import type { Widget } from '@erfgoedzoeker/config-schema';

import { Collapse, getFieldTitle } from './Collapse';
import { Dialog } from './Dialog';

type WidgetTemplateProps = ObjectFieldTemplateProps;

function getWidget({ formData }: WidgetTemplateProps) {
  return formData as Widget | undefined;
}

function getWidgetTitle(props: WidgetTemplateProps) {
  return getWidget(props)?.id ?? getFieldTitle(props.schema, 'id', 'Widget');
}

function WidgetFields({ properties, schema }: WidgetTemplateProps) {
  const options = properties.find((p) => p.name === 'options');
  const widgetProperties = properties.find((p) => p.name === 'properties');
  const rest = properties.filter(
    (p) => p.name !== 'options' && p.name !== 'properties',
  );

  return (
    <>
      {rest.map((p) => (
        <div key={p.name}>{p.content}</div>
      ))}
      {widgetProperties && (
        <Collapse title={getFieldTitle(schema, 'properties', 'Properties')}>
          {widgetProperties.content}
        </Collapse>
      )}
      {options && (
        <Collapse title={getFieldTitle(schema, 'options', 'Options')}>
          {options.content}
        </Collapse>
      )}
    </>
  );
}

export function WidgetTemplate(props: WidgetTemplateProps) {
  const widget = getWidget(props);
  const title = getWidgetTitle(props);
  const widgetProperties = widget?.properties?.join(', ');

  return (
    <div className="flex items-start justify-between gap-3">
      <div
        className={`flex flex-col gap-1 text-sm font-medium ${widget?.hidden ? 'opacity-40' : ''}`}
      >
        <span>{title}</span>
        {(widget?.componentId || widgetProperties) && (
          <div className="flex flex-col text-xs font-normal text-base-content/70">
            {widget?.componentId && (
              <span>
                Component: <code>{widget.componentId}</code>
              </span>
            )}
            {widgetProperties && (
              <span>
                Properties: <code>{widgetProperties}</code>
              </span>
            )}
          </div>
        )}
      </div>
      <Dialog
        closeAriaLabel={`Close ${title} widget editor`}
        title={`Edit widget: ${title}`}
        triggerClassName="btn btn-sm mt-1 mr-1"
        triggerLabel="Edit"
      >
        <WidgetFields {...props} />
      </Dialog>
    </div>
  );
}

export function PresentationConfigTemplate({
  properties,
  schema,
}: ObjectFieldTemplateProps) {
  const widgets = properties.find((p) => p.name === 'widgets');
  const rest = properties.filter((p) => p.name !== 'widgets');

  return (
    <div>
      {rest.map((p) => (
        <div key={p.name}>{p.content}</div>
      ))}
      {widgets && (
        <Collapse title={getFieldTitle(schema, 'widgets', 'Widgets')}>
          {widgets.content}
        </Collapse>
      )}
    </div>
  );
}
