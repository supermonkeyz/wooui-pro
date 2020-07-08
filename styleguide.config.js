const path = require('path');
function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  // set your styleguidist configuration here
  title: 'WooUI-Pro Guide',
  pagePerSection: true,
  // components: 'components/**/[a-z]*.vue',
  defaultExample: true,
  renderRootJsx: path.join(__dirname, './styleguide.root.js'),
  sections: [
    {
      name: '文档 Docs',
      sections: [
        {
          name: '安装',
          content: './docs/install.md'
        },
        {
          name: '使用',
          content: './docs/getstarted.md'
        },
        {
          name: '全局色值',
          content: './components/_style/Readme.md'
        },
        {
          name: '全局指令',
          content: './components/_directive/Readme.md'
        }
      ],
      sectionDepth: 0
    },
    {
      name: '基础 Basic',
      components: [
        './components/box/box.vue',
        './components/panel/panel.vue',
        './components/divider/divider.vue',
        './components/fonticon/fonticon.vue',
        './components/tip/icon.vue',
        './components/icon/icon.vue',
        './components/spinner/spinner.vue',
        './components/badge/badge.vue',
        './components/picture/picture.vue',
        './components/avatar/avatar.vue',
        './components/like/like.vue',
        './components/tab/tab.vue'
      ],
      // sections: [
      //   {
      //     name: '盒子 Box',
      //     content: './components/box/Readme.md'
      //   },
      //   {
      //     name: '面板 Panel',
      //     content: './components/panel/Readme.md'
      //   },
      //   {
      //     name: '分割线 Divider',
      //     content: './components/divider/Readme.md'
      //   },
      //   {
      //     name: '字体图标 Fonticon',
      //     content: './components/fonticon/Readme.md'
      //   },
      //   {
      //     name: '提示 Tip',
      //     content: './components/tip/Readme.md'
      //   },
      //   {
      //     name: '图标 Icon',
      //     content: './components/icon/Readme.md'
      //   },
      //   {
      //     name: '加载状态 Spinner',
      //     content: './components/spinner/Readme.md'
      //   },
      //   {
      //     name: '标记 Badge',
      //     content: './components/badge/Readme.md'
      //   },
      //   {
      //     name: '图片 Picture',
      //     content: './components/picture/Readme.md'
      //   },
      //   {
      //     name: '头像 Avatar',
      //     content: './components/avatar/Readme.md'
      //   },
      //   {
      //     name: '赞 Like',
      //     content: './components/like/Readme.md'
      //   },
      //   {
      //     name: '切换 Tab',
      //     content: './components/tab/Readme.md'
      //   }
      // ],
      sectionDepth: 1
    },
    {
      name: '表单 Form',
      components: [
        './components/button/button.vue',
        './components/radio/radio.vue',
        './components/checkbox/checkbox.vue',
        './components/switch/switch.vue',
        './components/input/input.vue'
      ],
      // sections: [
      //   {
      //     name: '按钮 Button',
      //     content: './components/button/Readme.md'
      //   },
      //   {
      //     name: '单选 Radio',
      //     content: './components/radio/Readme.md'
      //   },
      //   {
      //     name: '多选 Checkbox',
      //     content: './components/checkbox/Readme.md'
      //   },
      //   {
      //     name: '切换 Switch',
      //     content: './components/switch/Readme.md'
      //   },
      //   {
      //     name: '输入 Input',
      //     content: './components/input/Readme.md'
      //   }
      // ],
      sectionDepth: 1
    },
    {
      name: '层 Layer',
      components: [
        './components/pop/pop.vue',
        './components/modal/modal.vue',
        './components/toast/toast.vue',
        './components/dialog/dialog.vue'
      ],
      // sections: [
      //   {
      //     name: '弹层 Pop',
      //     content: './components/pop/Readme.md'
      //   },
      //   {
      //     name: '模态 Modal',
      //     content: './components/modal/Readme.md'
      //   },
      //   {
      //     name: '提示框 Toast',
      //     content: './components/toast/Readme.md'
      //   },
      //   {
      //     name: '会话框 Dialog',
      //     content: './components/dialog/Readme.md'
      //   }
      // ],
      sectionDepth: 1
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: resolve('components/_style'),
          loader: 'style-loader!css-loader'
        }
      ]
    }
  }
};
