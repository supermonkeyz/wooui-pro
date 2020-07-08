# WooUI Pro

Weibo 桌面端业务通用组件库

在线示例

[示例](http://woo.pages.intra.weibo.cn/wooui-pro/styleguide/)

## 依赖安装

```
yarn install
```

## 预览

```
yarn styleguide
```

## 构建库

```
yarn woo-pack
```

## 生成示例网站

```
yarn styleguide:build
```

## 新建组件

```
yarn woo-create 组件名
```

## 新建组件组

```
yarn woo-create 组件名 --g --items 子组件1 --items 子组件2
```

## 生成入口文件

```
yarn woo-entry
```

## 目录说明

`bin` 目录生成组件脚本 `src` 可作为项目测试目录

`components`目录中各个子目录为组件目录，其中`Readme.md`为组件使用说明文档

## 版本

package.json控制

内网npm地址: https://npm.intra.weibo.cn/package/@woo/wooui-pro
