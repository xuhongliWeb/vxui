<template>
  <div>
    <div class="survey">
      <!-- 页面 -->
      <div class="pages">
        <div v-for="(item, index) in data" :key="index" class="pagenations">
          <div
            v-for="(ele, i) in item.paragraph_list"
            :key="i"
            class="paragraph"
          >
            <div v-for="(e, key) in ele.list" :key="key" class="item">
              <div class="ques-name">{{ e.name }}</div>
              <div class="slider" v-show="e.type === 8">
                <van-slider v-model="e.subval" active-color="#ee0a24">
                  <template #button>
                    <div class="custom-button">{{ e.subval }}%</div>
                  </template>
                </van-slider>
              </div>
              <div
                :class="{
                  radio: e.type !== 2
                }"
                class="ques-answers"
              >
                <div v-if="e.type === 6">
                  <span
                    v-for="(answer, aIndex) in e.inputStr.split('/i')"
                    :key="aIndex"
                  >
                    {{ answer
                    }}<input
                      :value="e.inputAnswer ? e.inputAnswer[aIndex] || '' : ''"
                      :disabled="sended3"
                      v-if="aIndex !== e.inputStr.split('/i').length - 1"
                      type="text"
                      @change="inputAnswer($event, e, aIndex)"
                    />
                  </span>
                </div>
                <textarea
                  class="textarea"
                  v-show="e.type === 3"
                  cols="30"
                  rows="10"
                ></textarea>
                <div
                  v-for="(it, k) in e.answers"
                  :key="k"
                  :class="{
                    check: e.type === 2,
                    active: it.selected
                  }"
                  @click.stop="selectHandler(it, e, sended3)"
                  class="answer"
                >
                  <div class="answer-info">
                    <span
                      v-for="(answer, aIndex) in it.info.split('/i')"
                      :key="aIndex"
                    >
                      {{ answer
                      }}<input
                        class=""
                        :value="
                          it.inputAnswer ? it.inputAnswer[aIndex] || '' : ''
                        "
                        :disabled="sended3"
                        @click.stop=""
                        v-if="aIndex !== it.info.split('/i').length - 1"
                        :type="it.num ? 'number' : 'text'"
                        @keyup="inputAnswer($event, it, aIndex, e)"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="{ disabled: sended3 }" class="btn" @click="submit3">
            {{ sended3 ? '已提交' : '提交' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import { Toast, Dialog, Slider } from 'vant'

export default {
  name: 'vxTopic',
  props: {
    data: {
      type: Array
    },
    authorType: {
      // 0:as 1:ra
      type: [String, Number]
    },
    code: {
      type: String
    },
    num: {
      // 区分 1月 2月等 基线随访
      type: [String, Number]
    }
  },
  components: {
    vanSlider: Slider
  },
  data() {
    return {
      value: 11, // 测试
      copyData: [],
      desFix: false,
      pageIndex: 0,
      pagenationIndex: 0,
      config: {},
      wrapHeight: 0,
      sended1: false,
      sended2: false,
      sended3: false
      // 题目类型
      // 1-单选
      // 2-多选
      // 3-简答
      // 4-单选填空
      // 5-多选填空
      // 6-填空
      // 7-选填  不做校验
      // 8滑动
      // 答案类型
      // 1-单纯文字
      // 2-单纯输入
      // 3-文字+输入
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.scrollHandler);
  },

  created() {
    this.copyData = this.data
  },
  methods: {
    scrollHandler() {
      // if (this.pagenationIndex !== 0 && this.pagenationIndex !== 2) {
      //   return;
      // }
      // console.log(this.$refs.point[this.pagenationIndex]);
      const scrollTop =
        window.pageYOffset || // 用于FF
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0 // 获取页面滚动出去高度
      if (scrollTop > 50) {
        if (this.pagenationIndex === 0 || this.pagenationIndex === 2) {
          this.desFix = true
          this.wrapHeight = `${this.$refs.point[this.pagenationIndex]
            .clientHeight ||
            this.$refs.point[this.pagenationIndex].offsetHeight ||
            this.$refs.point[this.pagenationIndex].scrollHeight}px`
        }
      } else {
        this.desFix = false
        this.wrapHeight = '0px'
      }
    },
    pageClick() {
      const res = this.check([this.page1_Data[this.pagenationIndex]])
      if (res) {
        Toast(res)
        return
      }
      this.pagenationIndex++
      window.scrollTo(0, 0)
      // this.scrollHandler();
    },
    // 参数校验
    // return 提示语  如果通过  return false
    check(arr) {
      for (let i = 0; i < arr.length; i++) {
        // arr[i]
        for (let j = 0; j < arr[i].paragraph_list.length; j++) {
          const ele = arr[i].paragraph_list[j]
          for (let e = 0; e < ele.list.length; e++) {
            const qe = ele.list[e]
            if (qe.optional) {
              // eslint-disable-next-line no-continue
              if (qe.type === 7 && qe.inputAnswer) {
                if (qe.inputAnswer.length > 0 && qe.inputAnswer[0].trim()) {
                  // eslint-disable-next-line no-shadow
                  const index = qe.answers.findIndex(ele => ele.selected)
                  if (index === -1) {
                    return `请完善题目“${qe.name}”`
                  }
                }
              }
              // eslint-disable-next-line no-continue
              continue
            }
            // 判断当前题型
            if (qe.type === 6) {
              // 填空 判断所有空格是否都有答案
              // 获取空格的个数
              const num = qe.inputStr.split('/i').length - 1
              if (num !== qe.inputAnswer.length) {
                // 空格数和答案数不匹配  代表还有答案为填写
                return `请完成题目“${qe.name}”`
              }
              // 如果填空数量相同  则判断是否没个填空都是有值的  如果没有  直接return
              for (let p = 0; p < qe.inputAnswer.length; p++) {
                const item = qe.inputAnswer[p]
                if (!item) {
                  return `请完成题目“${qe.name}”`
                }
              }
            }
            // 简答题
            else if (qe.type === 3) {
              // 直接判断答案是否为空
              if (!qe.inputAnswer) {
                return `请完成题目“${qe.name}”`
              }
              if (!qe.inputAnswer[0]) {
                return `请完成题目“${qe.name}”`
              }
            } else {
              // 其他题型都为选择题
              let bool = true
              for (let x = 0; x < qe.answers.length; x++) {
                const item = qe.answers[x]
                // 判断当前答案类型是不是填空
                if (item.selected) {
                  bool = false
                  // 判断当前答案是否有输入功能
                  if (
                    typeof item.info === 'string' &&
                    item.info.indexOf('/i') >= 0
                  ) {
                    if (!item.inputAnswer) {
                      return `请完善题目“${qe.name}”`
                    }
                    // 获取空格的个数
                    const num = item.info.split('/i').length - 1
                    if (num !== item.inputAnswer.length) {
                      // 空格数和答案数不匹配  代表还有答案为填写
                      return `请完善题目“${qe.name}”`
                    }
                    // 如果填空数量相同  则判断是否没个填空都是有值的  如果没有  直接return
                    for (let p = 0; p < item.inputAnswer.length; p++) {
                      const answerItem = item.inputAnswer[p]
                      if (!answerItem) {
                        return `请完善题目“${qe.name}”`
                      }
                    }
                  }
                }
              }
              if (qe.type === 8) {
                // bool = qe.subval === 0
                bool = false;
              }
              if (bool) {
                return `请完成题目“${qe.name}”`
              }
            }
          }
        }
      }
      return false
    },
    // 提交
    async submit3() {
      
      if (this.sended3) {
        return
      }
      const res = this.check(this.data)
      if (res) {
        Toast(res)
        return
      }
  console.log(this.data, 'this.data')
      try {
      } catch (error) {
        Toast(error)
      }
    },

    // 填空答案保存
    inputAnswer(e, ele, index, item) {
      console.log(ele, 111)
      console.log(item, 111)
      // if(item.type !== 2) {

      // }
      if (e.target.value) {
        // 单选的其他有值 选中单选
        if (item.type !== 2) {
          console.log('单选')
          item.answers.forEach(cele => {
            cele.selected = false
          })
          // eslint-disable-next-line no-param-reassign
          ele.selected = true
        } else {
          ele.selected = true
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        // if() {

        // }
        ele.selected = false
      }
      if (!ele.inputAnswer) {
        // eslint-disable-next-line no-param-reassign
        ele.inputAnswer = []
        // eslint-disable-next-line no-param-reassign
        ele.inputAnswer[index] = e.target.value
        return
      }
      // eslint-disable-next-line no-param-reassign
      ele.inputAnswer[index] = e.target.value
    },
    inputHandler(e, ele) {
      if (!ele.inputAnswer) {
        // eslint-disable-next-line no-param-reassign
        ele.inputAnswer = []
        // eslint-disable-next-line no-param-reassign
        ele.inputAnswer[0] = e.target.value
        return
      }
      // eslint-disable-next-line no-param-reassign
      ele.inputAnswer[0] = e.target.value
      if (ele.type === 7) {
        if (e.target.value) {
          // eslint-disable-next-line no-param-reassign
          ele.hideS = false
        } else {
          // eslint-disable-next-line no-param-reassign
          ele.hideS = true
        }
      }
    },
    // 选择选项
    selectHandler(item, topic, sended) {
      if (sended) {
        return
      }
      // 判断单选还是多选
      if (topic.type === 2) {
        // 多选，反选当前选项
        // eslint-disable-next-line no-param-reassign
        item.selected = !item.selected
        return
      }
      // 单选
      topic.answers.forEach(ele => {
        // eslint-disable-next-line no-param-reassign
        ele.selected = false
      })
      // eslint-disable-next-line no-param-reassign
      item.selected = !item.selected
    }
  }
}
</script>
<style lang="scss" scoped>
.slider {
  padding-bottom: 30px;
  padding-top: 20px;
}
.custom-button {
  padding: 2px 5px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
.survey {
  background: #fff;
  text-align: left;
  padding-bottom: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    background: #f7f7f7;
    border-radius: 50px;
    margin: 10px;
    border: 2px solid #f7f7f7;
    div {
      flex: 1;
      text-align: center;
      line-height: 44px;
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      position: relative;
      &.active {
        color: #cf2a68;
        font-weight: 600;
        background: #fff;
        border-radius: 50px;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.04);
      }
    }
  }
  .pages {
    padding: 0 12px;
    // padding-top: 0;
    .point-wrap {
      padding-bottom: 10px;
      background-color: #fff;
    }
    .fix {
      padding: 0 12px;
      position: fixed;
      left: 0;
      top: 0;
      background-color: #fff;
      padding-top: 10px;
    }
    .btn {
      width: 56%;
      height: 36px;
      line-height: 36px;
      border-radius: 20px;
      color: #fff;
      text-align: center;
      background: #cf2a68;
      margin: 30px auto 50px;
      font-size: 14px;
      &.disabled {
        background: #ccc;
      }
    }
    .descripe {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 19px;
      padding: 10px 12px;
      margin-bottom: 13px;
    }
    .paragraph {
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      padding: 0 14px;
      margin-bottom: 16px;
      padding-bottom: 20px;
      .p-title {
        padding: 15px 0;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: rgba(34, 34, 34, 1);
        line-height: 19px;
        border-bottom: 1px solid rgba(151, 151, 151, 0.2);
      }
      .item {
        // padding-top: 20px;
        font-size: 14px;
        line-height: 14px;
        .ques-name {
          font-weight: 900;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 15px;
          padding-top: 19px;
          line-height: 19px;
        }
        .other {
          border-bottom: 1px solid #ddd;
          margin-bottom: 10px;
        }
        .ques-answers {
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 19px;
          input {
            text-align: center;
            display: inline-block;
            width: auto;
            border: 0;
            border-bottom: 1px solid rgba(151, 151, 151, 0.2);
            padding-left: 10px;
            font-size: 12px;
          }
          .textarea {
            width: 100%;
            height: 150px;
            border-radius: 4px;
            border: 1px solid rgba(151, 151, 151, 0.5);
            padding: 10px 15px;
          }
          &.radio {
            //display: flex;
            justify-content: space-between;
          }
          .answer {
            margin-bottom: 15px;
            background: url('./survey/radio.png') no-repeat left 3px;
            background-size: 14px 14px;
            padding-left: 17px;
            .answer-info {
            }
            &.active {
              background: url('./survey/radio-active.png') no-repeat left 3px;
              background-size: 14px 14px;
            }
            &.check {
              background: url('./survey/check.png') no-repeat left 3px;
              background-size: 14px 14px;
              &.active {
                background: url('./survey/check-active.png') no-repeat left 3px;
                background-size: 14px 14px;
              }
            }
          }
        }
      }
    }
  }
  .tan {
    width: 75px;
    position: fixed;
    right: 10px;
    bottom: 50px;
  }
}
</style>
