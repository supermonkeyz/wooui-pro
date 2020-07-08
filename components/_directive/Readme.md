## 全局指令

## v-active v-active-stop 控制点击颜色状态
```vue
<div
    style="width: 200px; height: 200px; background-color: #ccc"
    v-active="{
      activeColor: 'rgba(255, 130, 0, 0.1)',
      stayTime: 500
    }"
>
  <div style="width: 100px; height: 100px; background-color: #f0f0f0" v-active-stop>
    点击不变色
  </div>
  <div style="width: 100px; height: 100px; background-color: #ddd">
    点击变色
  </div>
</div>
```