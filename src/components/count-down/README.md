# CountDown 倒计时

### 基本用法

`endTime`属性表示倒计时结束时间（具体日期），单位为毫秒

```html
<count-down :endTime="endTime" />
```

```js
export default {
  data() {
    return {
      endTime: 30 * 60 * 60 * 1000
    };
  }
}
```

### 自定义格式

通过`format`属性设置倒计时文本的内容

```html
<count-down
  :endTime="endTime"
  format="DD 天 HH 时 mm 分 ss 秒"
/>
```

### 毫秒级渲染

倒计时默认每秒渲染一次，设置`millisecond`属性可以开启毫秒级渲染

```html
<count-down
  millisecond
  :endTime="endTime"
  format="HH:mm:ss:SSS"
/>
```

### 自定义样式

通过插槽自定义倒计时的样式，`timeData`对象格式见下方表格

```html
<!-- vue 2.6及以上 -->
<count-down :endTime="endTime">
  <template v-slot="timeData">
    <span class="item">{{ timeData.hours }}</span>
    <span class="item">{{ timeData.minutes }}</span>
    <span class="item">{{ timeData.seconds }}</span>
  </template>
</count-down>

<!-- vue2.6以下 -->
<count-down :endTime="endTime">
  <template slot-scope="{ timeData }">
    <span class="item">{{ timeData.hours }}</span>
    <span class="item">{{ timeData.minutes }}</span>
    <span class="item">{{ timeData.seconds }}</span>
  </template>
</count-down>

<style>
.item {
  // ...
}
</style>
```

### 手动控制

通过 ref 获取到组件实例后，可以调用`start`、`pause`、`reset`方法

```html
<count-down
  ref="countDown"
  millisecond
  :end-time="3000"
  :auto-start="false"
  format="ss:SSS"
  @finish="finished"
/>
<button @click="start">开始</button>
<button @click="pause">暂停</button>
<button @click="reset">重置</button>
```

```js
export default {
  methods: {
    start() {
      this.$refs.countDown.start();
    },
    pause() {
      this.$refs.countDown.pause();
    },
    reset() {
      this.$refs.countDown.reset();
    },
    finish() {
      this.$toast('倒计时结束');
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| end-time | 结束时间，单位毫秒 | *number/string* | - | - |
| format | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | *string* | `HH:mm:ss` | - |
| auto-start | 是否自动开始倒计时 | *boolean* | `true` | - |
| millisecond | 是否开启毫秒级渲染 | *boolean* | `false` | - |
| show-zero-days | 是否展示天为'00'  | *boolean* | `false` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| finish | 倒计时结束时触发 | - |

### Slots

| 名称 | 说明 | SlotProps |
|------|------|------|
| default | 自定义内容 | timeData |

### timeData 格式

| 名称 | 说明 | 类型 |
|------|------|------|
| days | 剩余天数 | *number* |
| hours | 剩余小时 | *number* |
| minutes | 剩余分钟 | *number* |
| seconds | 剩余秒数 | *number* |
| milliseconds | 剩余毫秒 | *number* |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| start | - | - | 开始倒计时 |
| pause | - | - | 暂停倒计时 |
| reset | - | - | 重设倒计时，若`auto-start`为`true`，重设后会自动开始倒计时 |
