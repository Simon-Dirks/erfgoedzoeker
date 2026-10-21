import type { FieldHelp } from './types';

export const filtersHelp = {
  description:
    'An example of filters visitors can use to refine their results.',
  media: [
    {
      type: 'image',
      src: 'help/filters.jpg',
      alt: 'A list of filters.',
    },
  ],
} satisfies FieldHelp;

export const arrowIndicatorHelp = {
  description:
    'The arrow indicates that visitors can select an object to view its details.',
  media: [
    {
      type: 'image',
      src: 'help/arrow-indicator.jpg',
      alt: 'A grid of collection objects with arrow indicators highlighted in red.',
    },
  ],
} satisfies FieldHelp;

export const viewSwitchingHelp = {
  title: 'View switching',
  description:
    'Visitors can switch between views to explore data in different ways.',
  media: [
    {
      type: 'video',
      src: 'help/view-switching.mp4',
      title: 'Switching between views',
    },
  ],
} satisfies FieldHelp;

export const paginationHelp = {
  description:
    'Pagination controls let visitors navigate between pages of search results.',
  media: [
    {
      type: 'image',
      src: 'help/pagination.png',
      alt: 'Pagination controls below a page of search results.',
    },
  ],
} satisfies FieldHelp;

export const resultsCountHelp = {
  description:
    'The results count shows visitors the total number of matching search results.',
  media: [
    {
      type: 'image',
      src: 'help/results-count.png',
      alt: 'The total number of search results displayed above the results.',
    },
  ],
} satisfies FieldHelp;

export const sortingHelp = {
  description:
    'Sorting controls let visitors change the order of their search results.',
  media: [
    {
      type: 'image',
      src: 'help/sorting.png',
      alt: 'Sorting controls displayed above the search results.',
    },
  ],
} satisfies FieldHelp;

export const widgetPositionHelp = {
  title: 'Widget positioning',
  description:
    'Choose where this widget appears in the layout. On mobile, all areas stack into a single column.',
  media: [
    {
      type: 'image',
      src: 'help/widget-positioning.jpg',
      alt: 'Layout diagram showing the top, left, main, right, and bottom widget positions.',
    },
    {
      type: 'image',
      src: 'help/widget-positioning-mobile.jpg',
      alt: 'Mobile layout showing widget positions stacked in a single column.',
    },
  ],
} satisfies FieldHelp;

export const propertyPathHelp = {
  title: 'Property path',
  description:
    'The widget receives the values from the property (or properties) you selected above. Use this field to go one level deeper into those values using dot-notation. For example, if the widget property is "associatedMedia", the widget receives the associatedMedia objects. Adding "thumbnailUrl" as the property path then extracts the thumbnailUrl from each of those objects. If any step along the path is an array, the first item with a non-empty value is used.',
  media: [],
  linkLabel: 'How does this work?',
} satisfies FieldHelp;

export const widgetComponentHelp = {
  title: 'Widget components',
  description: (
    <>
      Each widget component has its own display format and might have
      component-specific options. See{' '}
      <a
        className="link link-primary"
        href="https://docs.erfgoedzoeker.nl/guide/built-in-widgets.html"
        target="_blank"
      >
        the built-in widgets documentation
      </a>{' '}
      for an overview of all available components and their options.
    </>
  ),
  media: [],
  linkLabel: 'What components exist?',
} satisfies FieldHelp;

export const widgetPropertyLabelHelp = {
  title: 'Widget property label',
  description:
    'Choose whether or not to show the property label and/or a matching icon for this widget.',
  media: [
    {
      type: 'image',
      src: 'help/widget-property-label.jpg',
      alt: '',
    },
  ],
} satisfies FieldHelp;

export const showOriginalLinkHelp = {
  title: 'Show original link',
  description:
    'When enabled, the original link of the property value is shown alongside the widget. This is useful for widgets that render a visual representation (e.g. a map), where you also want the user to see and click through to the underlying value.',
  media: [
    {
      type: 'image',
      src: 'help/show-original-link.jpg',
      alt: '',
    },
  ],
} satisfies FieldHelp;

export const noPaddingHelp = {
  title: 'Remove padding',
  description:
    'When enabled, the default padding around the widget is removed. Use this for widgets that should fill their container edge-to-edge, such as image viewers or media widgets, to avoid unwanted whitespace around them.',
  media: [
    {
      type: 'image',
      src: 'help/padding.jpg',
      alt: 'A widget with padding, leaving visible whitespace between the widget and the container edge.',
    },
    {
      type: 'image',
      src: 'help/no-padding.jpg',
      alt: 'A widget without padding, filling the container edge-to-edge.',
    },
  ],
} satisfies FieldHelp;

export const isFallbackHelp = {
  title: 'Fallback widget',
  description: (
    <>
      When enabled, this widget acts as a catch-all: it renders any data layer
      property that has no dedicated widget assigned to it. The{' '}
      <a
        className="link link-primary"
        href="https://docs.erfgoedzoeker.nl/guide/built-in-widgets.html#linkwidget"
        target="_blank"
      >
        link widget
      </a>{' '}
      or{' '}
      <a
        className="link link-primary"
        href="https://docs.erfgoedzoeker.nl/guide/built-in-widgets.html#jsonwidget"
        target="_blank"
      >
        JSON widget
      </a>{' '}
      is a good default for this.
    </>
  ),
  media: [],
  linkLabel: 'How does this work?',
} satisfies FieldHelp;
