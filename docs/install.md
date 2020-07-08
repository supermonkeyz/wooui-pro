### npm安装

由于目前WooUI-pro是内网发布版本，所以需要在业务目录创建 `.npmrc` 文件。在 `.npmrc` 中，需要做以下配置：


``` npmrc
@woo:registry=http://registry.npm.intra.weibo.cn
```

当配置到私有npm之后，我们就可以进行安装了:

``` bash
npm install @woo/wooui-pro
```
