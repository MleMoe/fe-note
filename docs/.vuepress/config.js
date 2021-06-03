import { getSidebar } from "../../scripts/utils";
module.exports = {
  title: "fe-note",
  description: "成为一名真正的前端程序员之旅",
  themeConfig: {
    repo: "MleMoe/fe-note",
    docsBranch: "main",
    docsDir: "docs",

    editLinks: true,
    editLinkText: "帮助改善文档！",
    lastUpdated: "上次更新",
    nav: [
      {
        text: "CS通识",
        link: "/cs/",
      },
      {
        text: "JS",
        link: "/js/",
      },
      {
        text: "CSS",
        link: "/css",
      },
      {
        text: "REACT",
        link: "/react/",
      },
    ],

    sidebar: null,
  },
};
