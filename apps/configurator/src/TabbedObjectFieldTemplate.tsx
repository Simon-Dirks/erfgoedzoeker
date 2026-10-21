import type { ObjectFieldTemplateProps } from '@rjsf/utils';
import { useRef, useState } from 'react';

export function TabbedObjectFieldTemplate({
  properties,
  schema,
}: ObjectFieldTemplateProps) {
  const [activeTab, setActiveTab] = useState(properties[0]?.name ?? '');
  const navigationRef = useRef<HTMLDivElement>(null);
  const activeProperty =
    properties.find(({ name }) => name === activeTab) ?? properties[0];

  function getTitle(name: string) {
    const propertySchema = schema.properties?.[name];
    return typeof propertySchema === 'object' && propertySchema.title
      ? propertySchema.title
      : name;
  }

  function selectTab(name: string) {
    setActiveTab(name);
    window.scrollTo({
      top: navigationRef.current?.offsetTop ?? 0,
      behavior: 'smooth',
    });
  }

  return (
    <div>
      <header className="mb-4">
        <div className="mx-auto flex w-72 items-center rounded-b-lg bg-neutral px-6 pt-3 pb-4 text-white sm:w-96">
          <div>
            <h1 className="text-xl font-semibold sm:text-2xl">
              Erfgoedzoeker Configurator
            </h1>
            <p className="text-base opacity-75">
              Configure how data is displayed
            </p>
          </div>
        </div>
      </header>

      <div
        className="mb-6 flex flex-col items-stretch gap-3 lg:sticky lg:top-0 lg:z-40 lg:-mx-6 lg:flex-row lg:items-center lg:bg-app-bg lg:px-6 lg:py-4"
        ref={navigationRef}
      >
        <div
          aria-label="Configuration sections"
          className="tabs tabs-box tabs-vertical min-w-0 flex-1 lg:tabs-horizontal lg:flex-nowrap lg:overflow-x-auto"
          role="tablist"
        >
          {properties.map(({ name }) => {
            const isActive = name === activeProperty?.name;

            return (
              <button
                aria-controls={`panel-${name}`}
                aria-selected={isActive}
                className={`tab w-full shrink-0 justify-start whitespace-normal lg:w-auto lg:justify-center lg:whitespace-nowrap ${isActive ? 'tab-active' : ''}`}
                id={`tab-${name}`}
                key={name}
                onClick={() => selectTab(name)}
                role="tab"
                type="button"
              >
                {getTitle(name)}
              </button>
            );
          })}
        </div>
        <button
          className="btn btn-primary btn-sm shrink-0 self-end lg:self-auto"
          type="submit"
        >
          Download JSON
        </button>
      </div>

      {activeProperty && (
        <div
          aria-labelledby={`tab-${activeProperty.name}`}
          id={`panel-${activeProperty.name}`}
          role="tabpanel"
          tabIndex={0}
        >
          {activeProperty.content}
        </div>
      )}
    </div>
  );
}
