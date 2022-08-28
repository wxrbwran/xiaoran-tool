const menus = [
  {
    "icon": "HomeOutlined",
    "title": "首页",
    "path": "/home/index"
  },
  {
    "icon": "AreaChartOutlined",
    "title": "数据大屏",
    "path": "/dataScreen/index"
  },
  {
    "icon": "FileTextOutlined",
    "title": "视频处理",
    "path": "/video",
    "children": [
      {
        "icon": "AppstoreOutlined",
        "path": "/video/info",
        "title": "视频信息"
      },
    ]
  },
  {
    "icon": "FileTextOutlined",
    "title": "抓取资源",
    "path": "/catch",
    "children": [
      {
        "icon": "AppstoreOutlined",
        "path": "/catch/sht",
        "title": "SHT"
      },
    ]
  },
  {
    "icon": "TableOutlined",
    "title": "超级表格",
    "path": "/proTable",
    "children": [
      {
        "icon": "AppstoreOutlined",
        "path": "/proTable/useHooks",
        "title": "使用 Hooks"
      }
    ]
  },
  {
    "icon": "FileTextOutlined",
    "title": "表单 Form",
    "path": "/form",
    "children": [
      {
        "icon": "AppstoreOutlined",
        "path": "/form/basicForm",
        "title": "基础 Form"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/form/validateForm",
        "title": "校验 Form"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/form/dynamicForm",
        "title": "动态 Form"
      }
    ]
  },
  {
    "icon": "ProfileOutlined",
    "title": "菜单嵌套",
    "path": "/menu",
    "children": [
      {
        "icon": "AppstoreOutlined",
        "path": "/menu/menu1",
        "title": "菜单1"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/menu/menu2",
        "title": "菜单2",
        "children": [
          {
            "icon": "AppstoreOutlined",
            "path": "/menu/menu2/menu21",
            "title": "菜单2-1"
          },
          {
            "icon": "AppstoreOutlined",
            "path": "/menu/menu2/menu22",
            "title": "菜单2-2",
            "children": [
              {
                "icon": "AppstoreOutlined",
                "path": "/menu/menu2/menu22/menu221",
                "title": "菜单2-2-1"
              },
              {
                "icon": "AppstoreOutlined",
                "path": "/menu/menu2/menu22/menu222",
                "title": "菜单2-2-2"
              }
            ]
          },
          {
            "icon": "AppstoreOutlined",
            "path": "/menu/menu2/menu23",
            "title": "菜单2-3"
          }
        ]
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/menu/menu3",
        "title": "菜单3"
      }
    ]
  },
  {
    "icon": "ExclamationCircleOutlined",
    "title": "错误页面",
    "path": "/error",
    "children": [
      {
        "icon": "AppstoreOutlined",
        "path": "/404",
        "title": "404页面"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/403",
        "title": "403页面"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/500",
        "title": "500页面"
      }
    ]
  },
  {
    "icon": "PaperClipOutlined",
    "title": "外部链接",
    "path": "/link",
    "children": [
      {
        "icon": "AppstoreOutlined",
        "path": "/link/gitee",
        "title": "Gitee 仓库",
        "isLink": "https://gitee.com/laramie/Hooks-Admin"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/link/github",
        "title": "GitHub 仓库",
        "isLink": "https://github.com/HalseySpicy/Hooks-Admin"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/link/juejin",
        "title": "掘金文档",
        "isLink": "https://juejin.cn/user/3263814531551816/posts"
      },
      {
        "icon": "AppstoreOutlined",
        "path": "/link/myBlog",
        "title": "个人博客",
        "isLink": "http://www.spicyboy.cn"
      }
    ]
  }
];
export default menus;
