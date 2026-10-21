import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid({
  title: 'Erfgoedzoeker',
  description: 'Reusable, flexible heritage data browser',

  themeConfig: {
    // logo: '/logo.svg',

    outline: {
      level: [2, 3],
    },

    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Live Demo', link: 'https://erfgoedzoeker.nl' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Erfgoedzoeker?', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
        {
          text: 'Configuration',
          items: [
            {
              text: 'Configuration System',
              link: '/guide/configuration-system',
            },
            { text: 'Styling', link: '/guide/styling' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Built-in Widgets', link: '/guide/built-in-widgets' },
            { text: 'Creating Custom Widgets', link: '/guide/custom-widgets' },
            { text: 'Creating Custom Views', link: '/guide/custom-views' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Simon-Dirks/erfgoedzoeker',
      },
    ],

    footer: {
      message: 'Released under the EUPL-1.2 License.',
    },

    search: {
      provider: 'local',
    },
  },

  mermaid: {},
});
