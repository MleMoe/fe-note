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
        text: 'CS基础',
        items: [
          {
            text: '数据结构',
            link: '/data-construct/',
          },
          {
            text: '网络',
            link: '/network/',
          },
        ],
      },
      {
        text: '前端基础',
        items: [
          {
            text: 'HTML',
            link: '/html/',
          },
          {
            text: 'CSS',
            link: '/css/',
          },
          {
            text: 'JS',
            link: '/js/',
          },
          {
            text: 'TS',
            link: '/ts/',
          },
        ],
      },
      {
        text: 'TECH',
        items: [
          {
            text: 'WebGL',
            link: '/webgl/',
          },
          {
            text: 'Three.js',
            link: '/three/',
          },
          {
            text: 'WebAssembly',
            link: '/web-assembly/',
          },
        ],
      },
    ],

    sidebar: {
      '/travel/': ['', 'todo-react', 'component'],
      '/js/': ['', 'object'],
    },
  },
};
