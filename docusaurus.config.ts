import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PRAXIS',
  tagline: 'Truth Kernel for agentic coding tools',
  favicon: 'img/favicon.ico',

  url: 'https://praxis-docs-site.netlify.app',
  baseUrl: '/',

  organizationName: 'ddawnlll',
  projectName: 'praxis',

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
          editUrl: 'https://github.com/ddawnlll/praxis-docs/edit/main/',
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
    image: 'img/mascot-v1.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
      disableSwitch: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'PRAXIS',
        src: 'img/praxis-wordmark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'DOCS',
        },
        {to: '/blog', label: 'BLOG', position: 'left'},
        {
          href: 'https://github.com/ddawnlll/praxis',
          label: 'GITHUB',
          position: 'right',
        },
        {
          to: '/docs/quickstart',
          label: 'INSTALL',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'DOCS',
          items: [
            {label: 'Quickstart', to: '/docs/quickstart'},
            {label: 'Introduction', to: '/docs/introduction'},
            {label: 'Architecture', to: '/docs/architecture'},
          ],
        },
        {
          title: 'GUIDES',
          items: [
            {label: 'Getting Started', to: '/docs/guides/getting-started'},
            {label: 'Claude Code Plugin', to: '/docs/guides/claude-code-plugin'},
            {label: 'CLI Reference', to: '/docs/guides/cli-reference'},
            {label: 'Configuration', to: '/docs/guides/configuration'},
          ],
        },
        {
          title: 'MORE',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'GitHub', href: 'https://github.com/ddawnlll/praxis'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PRAXIS. MIT LICENSE.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
