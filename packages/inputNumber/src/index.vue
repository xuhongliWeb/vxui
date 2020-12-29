<template>
  <div class="v-wrap">
    <vx-input
      :disabled="disabled"
      v-model="inpVal"
      v-bind="$attrs"
      @change="handleChange"
    >
      <template slot="prepend">
        <div
          :class="['add',{ 'is-disabled': addDisabled}]"
          @touchstart="!addDisabled && handleClick('add')"
        >
          <van-icon name="plus" />
        </div>
      </template>
      <template slot="append">
        <div  
          :class="['minus',{ 'is-disabled': decDisabled}]"
        @touchstart="!decDisabled && handleClick('dec')">
          <van-icon name="minus" />
        </div>
      </template>
    </vx-input>
  </div>
</template>
<script>
/**
 * 限制大小 心得
 * 用到的方式
 * watch 和computed 配合
 * 1. 双向绑定
 * 2. 按下 setInterval  抬起后 解除按下事件
 * 3. 重要 - computed 设置值为 对象 
 *    inputNumber: get() {
 *  return this.val
 *  },
 * set() {
 *  let limit = {
 *  
 * }
 * }
 */
const isNum = num =>
  !isNaN(num * 1) &&
  Object.prototype.toString.call(num * 1) === '[object Number]'

import { Icon } from 'vant'
export default {
  name: 'vx-inputNumber',
  components: {
    vanIcon: Icon
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      inpVal: 0
    }
  },

  computed: {
    decDisabled() {
      return this.disabled 
    },
    addDisabled() {
      return this.disabled 
    },
    inputNumberValue: {
      get() {
        return this.inpVal
      },
      set(value) {
        console.log(value,'set')
        const { min, max, inpVal } = this
        // limits 限制了最大最小值， 和 设置inputNumberValue
        const limits = [
          {
            need: value => !isNum(value),
            value: inpVal
          },
          {
            need: value => value >= max,
            value: max
          },
          {
            need: value => value <= min,
            value: min
          },
          {
            need: () => true,
            value: value * 1
          }
        ]
    console.log(limits, 'lis')
        this.inpVal = limits.find(limit => limit.need(value)).value
        // 这里利用find查找 传入的数字和limits 的每一项定义的need方法进行查找比对。
        // this.inpVal = Number(limits.find( limit => {
        //   console.log(limit, 'limit')
        //   return limit.need(value)
        // }).value)
      }
    }
  },
  watch: {
    value: {
      // 双向绑定
      handler: function(n, o) {
        this.inputNumberValue = n
      },
      immediate: true
    },
    inpVal(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    /**
     * @param {string} type  add-递增 minus-递减
     *
     */
    handleClick(type) {
      console.log(type, 'typ')
      // 获取步数 默认递增递减为1
      const { step } = this
      const period = 100
      const timerHandler = () => {  
        const { addDisabled, decDisabled } = this;
        console.log(addDisabled,'timerHandler')
        if (!addDisabled && type === "add") {
          console.log('run----------')
          this.inputNumberValue +=step;
        }
        if (!decDisabled && type === "dec") this.inputNumberValue -= step;
      };
      const timer = setInterval(timerHandler, period);

      const startDate = +new Date()

      // 抬起的时候清除
      const handler = () => {
        const nowDate = +new Date()
        // debugger
        console.log(nowDate - startDate, 'nowDate - startDate ')
        if (nowDate - startDate < period) {
          console.log('单击')
            timerHandler() // 单击
        } 
        clearInterval(timer)
        document.removeEventListener('touchend', handler, false)
      }
      document.addEventListener('touchend', handler, false)
    },
    /**
     * 改变的时候
     */
    handleChange(event) {
      console.log(event)
      // 提取数字
      this.inputNumberValue = event.target.value.replace(/[^\d.]/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.add,
.minus {
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: rgba(102, 102, 102, 0.5);
  text-align: center;
  &:active {
    background: rgba(102, 102, 102, 1);
  }
  .is-disabled{
    background: red;
  }
}
</style>