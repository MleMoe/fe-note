import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  title: '前端从业者手记',
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
      ['meta', { name: 'author', content: 'MleMoe' }],
    ],

    locales: {
      "/": {
        darkMode: true,
        selectLanguageName: "简体中文",
        lastUpdatedText: "上次更新",
        editLinkText: "帮助改善此页面",
      
        sidebar: [
          {
            text: '展览',
            link: '/show/index.md',
          },
          {
            text: '开始打工',
            link: '/basic/index.md',
          },
          // {
          //   text: 'react hooks',
          //   link: '/fe/react/hooks.md'
          // },
          // {
          //   text: 'todo react',
          //   children: [
          //     '/fe/react/todo-react/index.md',
          //     '/fe/react/todo-react/component.md',
          //   ]
          // },
          // {
          //   text: 'react-three-fiber',
          //   children: [
          //     {
          //       text: '介绍与基础使用',
          //       link: '/tech/three/fiber.md',
          //     }
          //   ]
          // }
        ],
      },
    }
  },
});
