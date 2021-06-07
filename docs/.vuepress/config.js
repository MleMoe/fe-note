module.exports = {
  title: 'fe-note',
  description: '成为一名真正的前端程序员之旅',
  plugins: [
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10,
      },
    ],
  ],
  themeConfig: {
    repo: 'MleMoe/fe-note',
    docsBranch: 'main',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: '帮助改善文档！',
    lastUpdated: '上次更新',

    head: [
      ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
      ['meta', { name: 'author', content: 'MleMoe-MIA' }],
    ],

    displayAllHeaders: true,

    nav: [
      {
        text: 'CS',
        link: '/cs/',
      },
      {
        text: 'JS',
        link: '/js/',
      },
      {
        text: 'CSS',
        link: '/css/',
      },
      {
        text: 'REACT',
        link: '/react/',
      },
    ],

    sidebar: {
      '/travel/': ['', 'component'],
      '/js/': ['', 'object'],
    },
  },
};
