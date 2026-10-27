import type { MultiSchemaFieldTemplateProps } from '@rjsf/utils';
import { createContext, isValidElement, type ReactNode } from 'react';

export const FilterTypeFieldContext = createContext<ReactNode>(null);

export function FilterTypeSelectorTemplate({
  selector,
  optionSchemaField,
}: MultiSchemaFieldTemplateProps) {
  const selectorId = isValidElement(selector)
    ? (selector.props as { id?: string }).id
    : undefined;

  const typeField = (
    <div className="field-template mb-3">
      <label htmlFor={selectorId} className="label">
        <span className="label-text font-medium">Type</span>
      </label>
      {selector}
    </div>
  );

  return (
    <FilterTypeFieldContext.Provider value={typeField}>
      {optionSchemaField}
    </FilterTypeFieldContext.Provider>
  );
}
