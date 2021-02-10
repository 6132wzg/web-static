<template>
  <div class="count-down">
    <slot :timeData="timeData">
      {{ formattedTime }}
    </slot>
  </div>
</template>

<script>
import { parseTimeData, parseFormat, isSameSecond } from './utils';
import { raf, cancelRaf } from './util-raf';

export default {
  name: 'count-down',
  props: {
    millisecond: {
      type: Boolean,
      default: true
    },
    time: {
      // 倒计时 时长
      type: [Number, String]
    },
    startTime: {
      // 开始时间
      type: [Number, String]
    },
    endTime: {
      // 结束时间
      type: [Number, String]
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    showZeroDays: {
      // 当天为'00'时 是否展示
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      preTime: Date.now(),
      remain: 0 // 剩余时间
    };
  },
  computed: {
    _time() {
      return this.time != null && this.time != undefined ? this.time : Math.max(Number(this.endTime) - Number(this.startTime), 0)
    },
    timeData() {
      return parseTimeData(this.remain);
    },

    formattedTime() {
      return parseFormat(this.format, this.timeData, this.showZeroDays);
    }
  },

  watch: {
    time: {
      immediate: true,
      handler: 'reset'
    }
  },

  methods: {
    start() {
      if (this.counting) {
        return;
      }
      this.counting = true;
      this.tick();
    },
    pause() {
      this.counting = false;
      cancelRaf(this.rafId);
    },
    reset() {
      this.pause();
      this.remain = this.getRemain();
      if (this.autoStart) {
        this.start();
      }
    },
    tick() {
      if (this.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },
    microTick() {
      this.rafId = raf(() => {
        this.setRemain(this.getRemain());

        if (this.remain !== 0) {
          this.microTick();
        }
      });
    },
    macroTick() {
      this.rafId = raf(() => {
        const remain = this.getRemain();
        if (!isSameSecond(remain, this.remain) || remain === 0) {
          this.setRemain(remain);
        }
        if (this.remain !== 0) {
          this.macroTick();
        }
      });
    },
    getRemain() {
      const dif = Date.now() - Number(this.preTime);
      return Math.max(Number(this._time) - dif, 0);
      // return Math.max(Number(this.endTime) - Date.now(), 0);
    },
    setRemain(remain) {
      this.remain = remain;
      if (remain === 0) {
        this.pause();
        this.$emit('finish');
      }
    }
  }
};
</script>

<style scoped>
.count-down {
  color: #323233;
  font-size: 14px;
  line-height: 20px;
}
</style>
