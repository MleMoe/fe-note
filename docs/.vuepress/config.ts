import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  title: 'note',
  description: 'Mia 的前端之旅',
  bundler: '@vuepress/vite',

  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      description:
        "Mia's fe-notes",
    },
    },
  themeConfig: {
    logo:"/logo.png",
    repo: 'MleMoe/fe-note',
    docsBranch: 'main',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: '帮助改善文档！',
    lastUpdatedText: '上次更新',

    head: [
      ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
      ['meta', { name: 'author', content: 'MleMoe-MIA' }],
    ],

    // displayAllHeaders: true,
    locales: {
      "/": {
        darkMode: true,
        selectLanguageName: "简体中文",
        lastUpdatedText: "上次更新",
        editLinkText: "帮助改善此页面",
      
        sidebar: [
          {
            text: 'travel',
            link: '/travel/index.md',
          },
          {
            text: 'react',
            link:'/react',
            children: [
              {
                text: 'todo react',
                link: '/todo-react/',
                children: [
                  'index.md',
                  'component.md',
                ]
              },
              
            ]
          }
        ],
      },
    }

    
  },
});
