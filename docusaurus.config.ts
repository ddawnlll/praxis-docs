import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PRAXIS',
  tagline: 'The parallel runtime for autonomous AI coding execution — verify, delegate, scale.',
  favicon: 'img/favicon.ico',

  url: 'https://praxis-docs.netlify.app',
  baseUrl: '/',

  organizationName: 'praxis',
  projectName: 'praxis-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/mascot.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'PRAXIS',
      logo: {
        alt: 'PRAXIS Logo',
        src: 'img/mascot-icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/praxis',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quickstart',
              to: '/docs/quickstart',
            },
            {
              label: 'Introduction',
              to: '/docs/introduction',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/guides/getting-started',
            },
            {
              label: 'CLI Reference',
              to: '/docs/guides/cli-reference',
            },
            {
              label: 'Configuration',
              to: '/docs/guides/configuration',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/praxis',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PRAXIS. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
