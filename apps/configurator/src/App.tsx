import { Form } from '@rjsf/daisyui';
import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

import defaultConfig from '../../erfgoedzoeker/public/config/erfgoedzoeker.config.json';
import rawSchema from '../../erfgoedzoeker/public/config/erfgoedzoeker.config.schema.json';
import { FilterRowTemplate } from './FilterRowTemplate';
import { FilterTypeSelectorTemplate } from './FilterTypeSelectorTemplate';
import {
  forcedFilterValuesUiSchema,
  ViewOptionsTemplate,
} from './ForcedFiltersTemplate';
import {
  arrowIndicatorHelp,
  filtersHelp,
  forcedFiltersHelp,
  isFallbackHelp,
  noPaddingHelp,
  paginationHelp,
  propertyPathHelp,
  resultsCountHelp,
  showOriginalLinkHelp,
  sortingHelp,
  viewSwitchingHelp,
  widgetComponentHelp,
  widgetPositionHelp,
  widgetPropertyLabelHelp,
} from './help/content.tsx';
import { HelpFieldTemplate } from './help/HelpFieldTemplate';
import { IconSelectWidget } from './IconSelectWidget';
import {
  PresentationConfigTemplate,
  WidgetTemplate,
} from './PresentationConfigTemplate';
import {
  SortableArrayFieldTemplate,
  SortableArrayItemTemplate,
} from './SortableArrayTemplates';
import { TabbedObjectFieldTemplate } from './TabbedObjectFieldTemplate';
import { ViewArrayItemTemplate, ViewRowTemplate } from './ViewRowTemplate';

const { $schema: _, ...rest } = rawSchema;
const schema = rest as RJSFSchema;
const formData = defaultConfig as Record<string, unknown>;

const iconUiSchema: UiSchema = {
  'ui:widget': IconSelectWidget,
};

const HiddenArrayFieldTitleTemplate = () => null;
const HiddenDescriptionFieldTemplate = () => null;

const widgetItemUiSchema: UiSchema = {
  'ui:ObjectFieldTemplate': WidgetTemplate,
  properties: {
    'ui:ArrayFieldTitleTemplate': HiddenArrayFieldTitleTemplate,
  },
  componentId: {
    'ui:FieldTemplate': HelpFieldTemplate,
    'ui:options': {
      helpMedia: widgetComponentHelp,
    },
  },
  isFallback: {
    'ui:FieldTemplate': HelpFieldTemplate,
    'ui:options': {
      helpMedia: isFallbackHelp,
    },
  },
  options: {
    'ui:title': '',
    icon: iconUiSchema,
    position: {
      'ui:FieldTemplate': HelpFieldTemplate,
      'ui:options': {
        helpMedia: widgetPositionHelp,
      },
    },
    showPropertyLabel: {
      'ui:FieldTemplate': HelpFieldTemplate,
      'ui:options': {
        helpMedia: widgetPropertyLabelHelp,
      },
    },
    propertyPath: {
      'ui:FieldTemplate': HelpFieldTemplate,
      'ui:options': {
        helpMedia: propertyPathHelp,
      },
    },
    showOriginalLink: {
      'ui:FieldTemplate': HelpFieldTemplate,
      'ui:options': {
        helpMedia: showOriginalLinkHelp,
      },
    },
    noPadding: {
      'ui:FieldTemplate': HelpFieldTemplate,
      'ui:options': {
        helpMedia: noPaddingHelp,
      },
    },
  },
};

const widgetsUiSchema: UiSchema = {
  'ui:ArrayFieldTitleTemplate': HiddenArrayFieldTitleTemplate,
  items: widgetItemUiSchema,
};

const searchResultPresentationUiSchema: UiSchema = {
  'ui:order': ['showArrowIndicator', 'widgets'],
  showArrowIndicator: {
    'ui:FieldTemplate': HelpFieldTemplate,
    'ui:options': {
      helpMedia: arrowIndicatorHelp,
    },
  },
  widgets: widgetsUiSchema,
};

const detailsPresentationUiSchema: UiSchema = {
  widgets: widgetsUiSchema,
};

const uiSchema: UiSchema = {
  'ui:ObjectFieldTemplate': TabbedObjectFieldTemplate,
  'ui:submitButtonOptions': {
    norender: true,
  },
  filters: {
    'ui:ArrayFieldItemTemplate': ViewArrayItemTemplate,
    items: {
      'ui:label': false,
      'ui:ObjectFieldTemplate': FilterRowTemplate,
      'ui:options': {
        helpMedia: filtersHelp,
      },
      icon: iconUiSchema,
    },
  },
  views: {
    'ui:order': ['defaultView', 'views'],
    views: {
      'ui:ArrayFieldItemTemplate': ViewArrayItemTemplate,
      items: {
        'ui:ObjectFieldTemplate': ViewRowTemplate,
        'ui:options': {
          helpMedia: viewSwitchingHelp,
        },
        icon: iconUiSchema,
        options: {
          'ui:title': '',
          'ui:ObjectFieldTemplate': ViewOptionsTemplate,
          showPagination: {
            'ui:FieldTemplate': HelpFieldTemplate,
            'ui:options': {
              helpMedia: paginationHelp,
            },
          },
          showResultsCount: {
            'ui:FieldTemplate': HelpFieldTemplate,
            'ui:options': {
              helpMedia: resultsCountHelp,
            },
          },
          showSort: {
            'ui:FieldTemplate': HelpFieldTemplate,
            'ui:options': {
              helpMedia: sortingHelp,
            },
          },
          forcedFilters: {
            'ui:title': '',
            'ui:FieldTemplate': HelpFieldTemplate,
            'ui:options': {
              helpMedia: forcedFiltersHelp,
            },
            additionalProperties: forcedFilterValuesUiSchema,
          },
        },
        presentationConfig: {
          ...searchResultPresentationUiSchema,
          'ui:ObjectFieldTemplate': PresentationConfigTemplate,
        },
      },
    },
  },
  detailsPresentation: detailsPresentationUiSchema,
};

function downloadConfig(data: object) {
  const config = JSON.stringify(data, null, 2);
  const url = URL.createObjectURL(
    new Blob([config], { type: 'application/json' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = 'erfgoedzoeker.config.json';
  link.click();
  URL.revokeObjectURL(url);
}

export function App() {
  return (
    <main className="max-w-4xl mx-auto px-6 pb-6">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        templates={{
          ArrayFieldItemTemplate: SortableArrayItemTemplate,
          ArrayFieldTemplate: SortableArrayFieldTemplate,
          DescriptionFieldTemplate: HiddenDescriptionFieldTemplate,
          MultiSchemaFieldTemplate: FilterTypeSelectorTemplate,
        }}
        validator={validator}
        onSubmit={({ formData: data }) => downloadConfig(data)}
      />
    </main>
  );
}
