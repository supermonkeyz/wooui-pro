## 调用方法

```js static
this.$_w_dialog(parameters);
```
手动关闭

```js static
this.$_w_dialog_close();
```

## 可选参数

```js static
/**
 * @param {Object} data - 参数对象
 * @param {Boolean} [data.autohide = false] - 是否自动消失.
 * @param {String} [data.type = 'alert' || 'confirm'] - 对话框类型.
 * @param {String} [data.title = ''] - 对话框标题.
 * @param {String} [data.message = ''] - 对话框文案.
 * @param {Array} [data.checkbox = []] - 对话框复选框.
 * @param {Boolean} [data.checkbox[].value] - 对话框复选框取值.
 * @param {String} [data.checkbox[].label] - 对话框复选框文案.
 * @param {Array} [data.input = []] - 对话框输入框.
 * @param {String} [data.input[].value] - 对话框输入框取值.
 * @param {String} [data.input[].holder] - 对话框输入框默认文案.
 * @param {String} [data.animation = 'pop' || 'fade' || 'slide-top' || 'slide-right' || 'slide-bottom' || 'slide-left'] - 对话框动效.
 * @param {Boolean} [data.mask = true] - 对话框遮罩.
 * @param {Boolean} [data.close = true] - 对话框是否带右上角关闭叉子.
 * @param {Boolean} [data.touchclose = true] - 对话框遮罩点击关闭.
 * @param {String} [data.btnCancel = '取消'] - 对话框取消按钮文案.
 * @param {String} [data.btnConfirm = '确定'] - 对话框确定按钮文案.
 * @param {Boolean} [data.btnConfirmClose = true] - 对话框确定按钮点击后是否关闭.
 * @param {Function} [data.action = () => {}] - 提示层关闭后执行动作.
 * @param {Function} [data.cancel = () => {}] - 点击取消提示层关闭后执行动作.
 * @param {Boolean} [data.maskCancel = false] - 对话框遮罩点击关闭后执行cancel的回调.
 * @param {Array} [data.btns = []] - 自定义按钮.
 * @param {Object} [data.btns[]] - 自定义按钮格式.
 * @param {String} [data.btns[].text = ''] - 自定义按钮格式.
 * @param {String} [data.btns[].kind = 'primary' || 'success' || 'link' || 'warn' || 'default' ] - 自定义按钮格式.
 * @param {Function} [data.btns[].action = () => {} ] - 自定义按钮格式.
 * @param {Number} [data.duration = 350] - !动画默认执行时间，不需要改变不传参数.
 * @param {Number} [data.hideDuration = 1500] - !自动隐藏停留时间，不需要改变不传参数.
 * @param {String} [data.cssClass = ''] - 外层挂载制定的css类名.
 * @param {Object} [data.component] - 自定义Vue组件.
 * @param {Object} [data.componentProps] - 自定义Vue组件属性.
 */
```

## Alert
```vue
<template>
  <woo-button @click="showAlert">Alert</woo-button>
</template>

<script>
export default {
  methods: {
    showAlert() {
      this.$_w_dialog({
        title: '编辑成功',
        message: '24小时内生效',
        btnConfirm: '我知道了'
      });
    }
  }
};
</script>

<style scoped>
</style>
```

## Confirm

```vue
<template>
  <div>
    <transition name="del">
      <h3 class="dialog-tips" v-if="show">
        操作了会被删除
      </h3>
    </transition>
    <woo-button @click="showDialogB">Confirm</woo-button>
  </div>
</template>

<style>
.dialog-tips {
  font-size: 14px;
  margin-bottom: 8px;
  display: inline-block;
}
.del-leave-active {
  transition: all 0.5s ease;
}
.del-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
</style>

<script>
export default{
  data() {
    return {
      show: true
    }
  },
  methods: {
    showDialogB() {
      this.$_w_dialog({
        type: 'confirm',
        title: '确认删除？',
        message: '删除之后将不可恢复 删除之后将不可恢复 删除之后将不可恢复 删除之后将不可恢复',
        action: () => {
          this.show = false;
        }
      });
    }
  }
}
</script>
```

## 取消关闭X
```vue
<template>
  <woo-button @click="showAlert">Alert</woo-button>
</template>

<script>
export default {
  methods: {
    showAlert() {
      this.$_w_dialog({
        message: '24小时内生效',
        btnConfirm: '我知道了',
        close: false
      });
    }
  }
};
</script>

<style scoped>
</style>
```

## 带顶栏窗口

```vue
<template>
  <woo-button @click="showAlert">Alert</woo-button>
</template>

<script>
export default {
  methods: {
    showAlert() {
      this.$_w_dialog({
        kind: 'bar',
        title: '设置备注',
        message: '24小时内生效',
        btnConfirm: '我知道了'
      });
    }
  }
};
</script>

<style scoped>
</style>
```

## 自定义按钮

```vue
<template>
  <div>
    <h3>
      目前状态: {{state}}
    </h3>
  <woo-button @click="showDialogC">对话框</woo-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: '还未操作'
    };
  },
  methods: {
    showDialogC() {
      this.$_w_dialog({
        type: 'confirm',
        title: '确认删除？',
        btns: [
          {
            text: '我再想想',
            action: () => {
              this.state = '我再想想';
            }
          },
          {
            text: '确认删除',
            kind: 'warn',
            action: () => {
              this.state = '确认删除';
            }
          },
          {
            text: '不再提示',
            kind: 'link',
            action: () => {
              this.state = '不再提示';
            }
          }
        ]
      });
    }
  }
}
</script>
```

## Checkbox
```vue
<template>
  <div>
    <div>
      目前状态:
      <h3 v-for="(item, index) in checkValue">{{item.label}}:{{item.value}}</h3>
    </div>
    <woo-button @click="showDialogCK">Confirm</woo-button>
  </div>
</template>

<script>
export default{
  data() {
    return {
      showGroup: false,
      checkValue: [
        {
          value: true,
          label: '发微博告诉好友',
          info: '这里可以详细描述'
        },
        {
          value: true,
          label: '关注博主',
          info: '这里可以详细描述'
        }
      ]
    }
  },
  methods: {
    showDialogCK() {
      this.$_w_dialog({
        type: 'confirm',
        title: '推荐分组？',
        message: '推荐后该分组在你的主页公开可见',
        checkbox: this.checkValue
      });
    }
  }
}
</script>
```

## prompt

```vue
<template>
<div>
  <h3>是否修改: {{ edit }}</h3>
  <h3>{{ inputValue[0].value || inputValue[0].holder }}</h3>
  <woo-button @click="showPrompt">prompt</woo-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      inputValue: [
        {
          value: '',
          holder: '请输入备注名'
        }
      ]
    };
  },
  methods: {
    showPrompt() {
      this.$_w_dialog({
        type: 'confirm',
        kind: 'bar',
        title: '设置备注',
        input: this.inputValue,
        action: () => {
          this.edit = true;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
```

## 自定义组件

```vue
<template>
  <div>
    <h3>
      喜欢的水果: {{fruit}}
    </h3>
    <woo-button @click="showDialogD">选择水果</woo-button>
  </div>
</template>


<script>
const custom = {
  template: `<woo-panel border="all" class="dialog-custom">
    <div style="padding: 10px">
      <woo-radio v-model="fruitSelect" @change="get" value="apple">🍎 苹果</woo-radio>
    </div>
    <woo-divider></woo-divider>
    <div style="padding: 10px">
      <woo-radio v-model="fruitSelect" @change="get" value="banana">🍌 香蕉</woo-radio>
    </div>
    <woo-divider></woo-divider>
    <div style="padding: 10px">
      <woo-radio v-model="fruitSelect" @change="get" value="grape">🍇 葡萄</woo-radio>
    </div>
  </woo-panel>`,
  props: {
    fruit: String
  },
  data() {
    return {
      fruitSelect: this.fruit
    };
  },
  methods: {
    get() {
      this.$_wooBus.$emit('customValue', this.fruitSelect);
    }
  }
};

export default{
  data() {
    return {
      fruit: ''
    }
  },
  methods: {
    showDialogD() {
      this.$_wooBus.$on('customValue', (data) => {
        this.fruit = data;
      });
      this.$_w_dialog({
        title: '选择你喜欢的水果',
        message: '只能选一个哦~',
        btnConfirm: '我选好了',
        component: custom,
        componentProps: {
          fruit: this.fruit
        },
        action: () => {
          this.$_wooBus.$off('customValue');
        }
      });
    }
  }
}
</script>
```

```vue
<template>
  <div>
    <h3>
      现在的昵称: {{ value }}
    </h3>
    <woo-button @click="showDialogD">修改昵称</woo-button>
  </div>
</template>

<script>
import Demo from '../../src/Demo.vue';

export default {
  data() {
    return {
      placeholder: '请输入新的昵称',
      value: '青春的猴小野'
    };
  },
  methods: {
    showDialogD() {
      this.$_wooBus.$on('customComponentValue', (data) => {
        this.value = data;
      });
      this.$_w_dialog({
        btnConfirm: '我选好了',
        component: Demo,
        componentProps: {
          placeholder: this.placeholder
        },
        action: () => {
          this.$_wooBus.$off('customComponentValue');
        }
      });
    }
  }
}
</script>
```

## 模态组合

```vue
<template>
<div>
  <woo-modal data-type="publish" v-if="show">
    <div class="uploader">
      <div class="pub">
        <woo-spinner size="32px" v-if="loading"></woo-spinner>
        <h3>上传图片</h3>
      </div>
      <div class="ctrl">
        <woo-button class="btn" @click="check" sort="flat" kind="default">
          取消
        </woo-button>
        <woo-button class="btn" @click="ok" sort="flat" kind="primary">
          确定
        </woo-button>
      </div>
    </div>
  </woo-modal>
  <h3>{{ url }}</h3>
  <woo-button @click="show = true">上传图片</woo-button>
</div>
</template>

<style>
.uploader {
  width: 600px;
  text-align: center;
  background: #fff;
  padding: 30px;
}
.pub {
  padding: 30px;
  height: 100px;
}
.btn {
  margin: 0 5px;
}
</style>

<script>
export default {
  data() {
    return {
      url: 'url',
      show: false,
      loading: false
    };
  },
  methods: {
    check() {
      this.$_w_dialog({
        type: 'confirm',
        title: '确认取消？',
        message: '取消后编辑信息将会消失',
        action: () => {
          this.show = false
        }
      });
    },
    ok() {
      this.loading = true;
      setTimeout(() => {
        this.show = false;
        this.loading = false;
        this.url = 'https://wx3.sinaimg.cn/mw690/6a815515ly1g8ncc1cfdnj20u00u07h7.jpg';
      }, 2000);
    }
  }
}
</script>
```

```vue
<template>
  <div>
    <h3>{{ fo }}</h3>
    <woo-pop @click-outside="close" :show="showPop" animate>
      <template v-slot:ctrl>
        <woo-button @click="showPop = !showPop" class="main">更多操作</woo-button>
      </template>
      <div class="main layer">
        <woo-button sort="simple" @click="unfo" fluid>取消关注</woo-button>
      </div>
    </woo-pop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fo: '关注中',
      showPop: false,
      show: false
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    unfo() {
      this.showPop = false;
      this.$_w_dialog({
        type: 'confirm',
        title: '确认取消？',
        message: '取消关注@twitter',
        action: () => {
          this.show = false
          this.fo = '已取关'
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  width: 200px;
}
</style>
```

## 修改Dialog中的值

```vue
<template>
  <div>
    <woo-button @click="showDialogB">1s后title改变</woo-button>
  </div>
</template>

<script>
export default{
  data() {
    return {
      show: true
    }
  },
  methods: {
    showDialogB() {
      const changeTitle = setTimeout(() => {
        this.$_w_dialog({
          title: '再想一想？'
        }, 'changeData');
      }, 1000);
      this.$_w_dialog({
        type: 'confirm',
        title: '确认删除？',
        message: '删除之后将不可恢复 删除之后将不可恢复 删除之后将不可恢复 删除之后将不可恢复',
        action: () => {
          this.show = false;
          clearTimeout(changeTitle);
        }
      });
    }
  }
}
</script>
```

## 点击确定按钮后，模态不消失

```vue
<template>
  <div>
    <transition name="del">
      <h3 class="dialog-tips" v-if="show">
        操作了会被删除
      </h3>
    </transition>
    <woo-button @click="showDialogB">Confirm</woo-button>
  </div>
</template>

<style>
.dialog-tips {
  font-size: 14px;
  margin-bottom: 8px;
  display: inline-block;
}
.del-leave-active {
  transition: all 0.5s ease;
}
.del-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
</style>

<script>
export default{
  data() {
    return {
      show: true
    }
  },
  methods: {
    showDialogB() {
      this.$_w_dialog({
        type: 'confirm',
        title: '确认删除？',
        message: '删除之后将不可恢复 删除之后将不可恢复 删除之后将不可恢复 删除之后将不可恢复',
        btnConfirmClose: false,
        action: () => {
          this.show = false;
          this.$_w_dialog({
            title: '已经删除',
            btnConfirmClose: true,
            action: () => {}
          }, 'changeData')
        }
      });
    }
  }
}
</script>
```