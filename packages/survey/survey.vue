<template>
  <div class="survey">
    <div class="hddy_wrap"
         v-if="!successFlag">
      <div class="hddy_content">
        <div class="wrap">
          <!-- 题目列表 -->
          <div :class="topicLength-1==index?'questions':'questions2 questions'"
               v-for="(item,index) of list"
               :key="index">
            <div class="hddy_title"
                 v-show="index === 0">
              <p class="txt">标题</p>
            </div>
            <div class="subtitle"><span class="topic_type">{{topicTypeText[item.type]}}</span>{{index+1}}.{{item.ques}}</div>
            <div class="item_answer">
              <div class="box"
                   v-for="(answer,answerNum) of item.answerList"
                   :key="`index${answerNum}`">
                <span class="answer_sort"
                      v-if="answer.sort">{{ answer.sort }}</span>
                <!-- 简答题 -->
                <div class="qOptions"
                     v-if="item.type == '2'">
                  <textarea class="jdttextArea"
                            placeholder="请输入"
                            :disabled="answered"
                            :name="item.id"
                            v-model="answer.previousAnswer"
                            rows
                            cols></textarea>
                </div>
                <!-- 非简答题 -->
                <div :class="answer.selected?'active':'options'"
                     @click="answerSelect({index1:index,index2:answerNum})"
                     v-else>
                  <span>{{topicListType[answerNum]}}、{{answer.answer}}</span>
                </div>
                <div v-if="answer.optionFill === 'Y' && (answerNum === item.answerList.length - 1)">
                  <input type="text"
                         class="answer_input"
                         placeholder="请填写选择的理由"
                         :readonly="answered"
                         v-model="answer.optionFillText"
                         @blur="optionFillBlur({index1:index,index2:answerNum})"
                         @click.stop="optionFillFocus({index1:index,index2:answerNum})" />
                </div>
              </div>
            </div>

          </div>
          <div class="hddy_footer">
            <div class="opera-btn hddy_btn"
                 @click="submit"
                 v-if="isTopicFlag!='1'">
              提交
            </div>
            <div class="opera-btn hddy_btn dis"
                 @click="submit"
                 v-else>
              已提交
            </div>
            <!-- <img class="hddy_btn"
                 v-if="isTopicFlag!='1'"
                 @click="submit"
                 src="../assets/images/hddy_btn.png"
                 alt="">
            <img class="hddy_btn"
                 v-else
                 src="../assets/images/hddy_btn2.png"
                 alt=""> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 提交成功的状态 -->
    <div class="survey__success"
         v-else>
      <div class="survey__success--img">
        提交成功
      </div>
      <div class="survey__success--txt">提交成功，感谢您的参与</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import {
  Popup,
  Toast,
  // eslint-disable-next-line import/first
} from 'vant';

export default {
  name: 'vxSurvey',
  data () {
    return {

      txt: '',
      survey: {}, // 调研详情
      list: {}, // 题目列表
      code: '', // 调研code
      answered: false, // 是否已经答题标识
      successFlag: false, // 提交成功标识
      topicTypeText: {
        0: '单选题',
        1: '多选题',
        2: '简答题',
        3: '排序题',
      }, // 题型
      topicListType: ['A', 'B', 'C', 'D', 'E', 'F'],
      topicLength: 0,
      isTopicFlag: '',
      whiteInfor: {}, //个人中心带来的 -- 白名单用户信息   applyStatus A:待审核,B:已审核,C:未通过 D:未开启 E:已开启 F:申请名额已满

    };
  },
  created () {
  },
  mounted () {
    this.getSurveyDetail()
  },
  methods: {

    closed () {
      this.successFlag = false;
      this.getSurveyDetail();
    },
    // 排序题输入选项聚焦时，将排列序号写到 answerList 的当个对象中
    optionFillFocus (e) {
      const indexs = e;
      const list = this.list;
      if (this.answered)
      {
        return;
      }
      if (list[indexs.index1].answerList[indexs.index2].selected)
      {
        return;
      }
      list[indexs.index1].answerList[indexs.index2].selected = true;
      if (list[indexs.index1].answerList[indexs.index2].selected)
      {
        if (!list[indexs.index1].selectedSort)
        {
          list[indexs.index1].selectedSort = [];
        }
        list[indexs.index1].selectedSort.push(list[indexs.index1].answerList[indexs.index2].answerKey);
      }
      list[indexs.index1].answerList.forEach((ele) => {
        if (list[indexs.index1].selectedSort.indexOf(ele.answerKey) !== -1)
        {
          // eslint-disable-next-line no-param-reassign
          ele.sort = list[indexs.index1].selectedSort.indexOf(ele.answerKey) + 1;
        } else
        {
          // eslint-disable-next-line no-param-reassign
          delete ele.sort;
        }
      });
      this.list = list;
    },
    // 输入选项失去焦点时，输入选项input框选中状态必须填写选项
    // 若自定义选项被选中，将选中的选项内容拼接到答案中，否则将这项取消选中
    optionFillBlur (e) {
      const indexs = e;
      const list = this.list;
      if (this.answered)
      {
        return;
      }
      if (!list[indexs.index1].answerList[indexs.index2].optionFillText)
      {
        list[indexs.index1].answerList[indexs.index2].selected = false;
        list[indexs.index1].selectedSort.splice(list[indexs.index1].selectedSort.indexOf(list[indexs.index1].answerList[indexs.index2].answerKey), 1);
      } else
      {
        list[indexs.index1].answerList[indexs.index2].answerKey = `${list[indexs.index1].answerList[indexs.index2].answerKey}:${list[indexs.index1].answerList[indexs.index2].optionFillText}`;
        list[indexs.index1].selectedSort.splice(list[indexs.index1].answerList[indexs.index2].sort - 1, 1, list[indexs.index1].answerList[indexs.index2].answerKey);
      }
      // 将选中选项的排列序号写到 answerList 的当个对象中
      list[indexs.index1].answerList.forEach((ele) => {
        if (list[indexs.index1].selectedSort.indexOf(ele.answerKey) !== -1)
        {
          ele.sort = list[indexs.index1].selectedSort.indexOf(ele.answerKey) + 1;
        } else
        {
          delete ele.sort;
        }
      });
      this.list = list;
    },
    // 获取调研详情
    async getSurveyDetail () {
      try
      {
        const res = {
          "code": 1,
          "data": {
            "survey": {
              "surveyTag": "f\u662F\u7684",
              "code": "2021061611063300014",
              "surveyDesc": "\u7684\u8428\u82AC",
              "title": "\u8C03\u7814\u4F1A\u540E\u8C03\u7814\uFF0C\u8C03\u7814\u6D4B\u6D4B\uFF0C\u914D\u7F6E\u6709\u5916\u94FE",
              "thumbnailUrl": "..\/..\/img\/art-minpic-none.png"
            },
            "isTopicFlag": "0",
            "topicList": [
              {
                "answer": "A",
                "areaCode": "DSJJYH",
                "areaName": "\u7B2C\u4E09\u5C4A\u57FA\u533B\u4F1A",
                "code": "2021061611063300014",
                "dataTypeCode": "",
                "dataTypeName": "",
                "deleteFlag": "",
                "duration": null,
                "id": "4707",
                "isPass": "",
                "itemCodes": "A||B",
                "itemNames": "A||B",
                "level": "",
                "optionFill": "N",
                "previousAnswer": "",
                "refCode": "",
                "score": null,
                "surveyCode": "",
                "thumbnailUrl": "",
                "title": "",
                "topicCode": "2021062110281500010",
                "topicImgUrl": "",
                "topicName": "\u4F1A\u540E\u5355\u90091",
                "topicNum": null,
                "topicSeqNo": "",
                "topicType": "0",
                "type": "E",
                "userId": "",
                "voteNumbers": "",
                "voteProportion": ""
              },
          
              {
                "answer": "",
                "areaCode": "DSJJYH",
                "areaName": "\u7B2C\u4E09\u5C4A\u57FA\u533B\u4F1A",
                "code": "2021061611063300014",
                "dataTypeCode": "",
                "dataTypeName": "",
                "deleteFlag": "",
                "duration": null,
                "id": "4709",
                "isPass": "",
                "itemCodes": "A",
                "itemNames": "",
                "level": "",
                "optionFill": "N",
                "previousAnswer": "",
                "refCode": "",
                "score": null,
                "surveyCode": "",
                "thumbnailUrl": "",
                "title": "",
                "topicCode": "2021062110284500012",
                "topicImgUrl": "",
                "topicName": "\u4F1A\u540E\u7B80\u7B54\u9898",
                "topicNum": null,
                "topicSeqNo": "",
                "topicType": "2",
                "type": "E",
                "userId": "",
                "voteNumbers": "",
                "voteProportion": ""
              },
         
              {
                "answer": "A||B",
                "areaCode": "DSJJYH",
                "areaName": "\u7B2C\u4E09\u5C4A\u57FA\u533B\u4F1A",
                "code": "2021061611063300014",
                "dataTypeCode": "",
                "dataTypeName": "",
                "deleteFlag": "",
                "duration": null,
                "id": "4712",
                "isPass": "",
                "itemCodes": "A||B||C",
                "itemNames": "答案1||答案2||答案3",
                "level": "",
                "optionFill": "N",
                "previousAnswer": "",
                "refCode": "",
                "score": null,
                "surveyCode": "",
                "thumbnailUrl": "",
                "title": "",
                "topicCode": "2021062117033500034",
                "topicImgUrl": "",
                "topicName": "多选",
                "topicNum": null,
                "topicSeqNo": "",
                "topicType": "1",
                "type": "E",
                "userId": "",
                "voteNumbers": "",
                "voteProportion": ""
              },
        
              {
                "answer": "",
                "areaCode": "DSJJYH",
                "areaName": "\u7B2C\u4E09\u5C4A\u57FA\u533B\u4F1A",
                "code": "2021061611063300014",
                "dataTypeCode": "",
                "dataTypeName": "",
                "deleteFlag": "",
                "duration": null,
                "id": "4737",
                "isPass": "",
                "itemCodes": "A||B||C||D",
                "itemNames": "123213||123||12||2434314",
                "level": "",
                "optionFill": "N",
                "previousAnswer": "",
                "refCode": "",
                "score": null,
                "surveyCode": "",
                "thumbnailUrl": "",
                "title": "",
                "topicCode": "2021062210093800002",
                "topicImgUrl": "",
                "topicName": "\u6392\u5E8F\u9898\u76EE1",
                "topicNum": null,
                "topicSeqNo": "",
                "topicType": "3",
                "type": "E",
                "userId": "",
                "voteNumbers": "",
                "voteProportion": ""
              }
            ]
          },
          "encrypt": "",
          "msg": "success",
          "traceId": "55e329909e5c4e23817d9bed51dc73b4"
        };
        this.survey = res.data.survey;
        const list = res.data.topicList;
        this.topicLength = list.length;
        const topic = [];
        list.forEach((ele) => {
          const itemCodes = ele.itemCodes.split('||');
          const itemNames = ele.itemNames.split('||');
          const answerList = [];
          const previousAnswer = ele.previousAnswer;
          itemCodes.forEach((e, i) => {
            answerList.push({
              answerKey: `${e}`,
              answer: `${itemNames[i]}`,
              isAnswer: ele.answer.indexOf(e) !== -1,
              selected: ele.previousAnswer.indexOf(e) >= 0,
              previousAnswer,
            });
          });
          // 排序题将之前提交的答案拆分到相应的对象中
          const previousAnswerArr = ele.previousAnswer.split('||');
          answerList.forEach((v, k) => {
            if (ele.optionFill === 'Y')
            {
              if (answerList.length - 1 === k)
              {
                v.optionFill = 'Y';
                previousAnswerArr.forEach((item, index) => {
                  if (item.indexOf(':') !== -1)
                  {
                    v.optionFillText = item.substring(item.indexOf(':') + 1, item.length);
                  }
                });
              } else
              {
                v.optionFill = 'N';
                v.optionFillText = '';
              }
            }

            // 排序题将序号放到相应的对象中
            if (ele.topicType === '3')
            {
              previousAnswerArr.forEach((items, indexs) => {
                if (items.indexOf(v.answerKey) !== -1)
                {
                  v.sort = indexs + 1;
                }
              });
            }
          });

          const obj = {
            ques: ele.topicName, // 问题名字
            type: ele.topicType, //  题型【0：单选，1：多选， 3：排序题】
            answerList,
            code: ele.topicCode,
            id: ele.id,
          };
          topic.push(obj);
        });
        this.list = topic;
        this.isTopicFlag = res.data.isTopicFlag;
        this.answered = res.data.isTopicFlag === '1';
      } catch (error)
      {
        console.log(error);
      }
    },
    // 提交
    async submit () {
      if (this.answered)
      {
        return;
      }
      const list = this.list;
      const answerList = [];
      let selectBol = false // 第一道题最少选择3个选项状态
      let sortBol = false // 排序题必须选完
      for (let i = 0; i < list.length; i++)
      {
        const ele = list[i];

        let arr = [];
        let textSting = '';
        if (ele.type === '3' && ele.selectedSort)
        {
          arr = [...ele.selectedSort];
          console.log(ele, '排序题');
          sortBol = ele.answerList.length !== arr.length
        } else if (ele.type === '2')
        {
          let currentValue = [];
          currentValue = $(`textarea[name='${ele.id}']`);
          for (let i = 0; i < currentValue.length; i++)
          {
            textSting = currentValue[i].value;
          }
        } else
        {

          ele.answerList.forEach((ele) => {
            if (ele.selected)
            {

              arr.push(ele.answerKey);
            }
          });
        }

        const obj = {
          code: this.code,
          topicCode: ele.code,
          answer: ele.type === '2' ? textSting : arr.join('||'),
        };
        if (ele.answerList[ele.answerList.length - 1].optionFill === 'Y' && !ele.answerList[ele.answerList.length - 1].optionFillText && ele.answerList[ele.answerList.length - 1].selected)
        {
          Toast('存在调研自定义选项勾选，未填写选项');
          return;
        }

        if (!obj.answer)
        {
          Toast('存在调研题目未选择');
          return;
        }
        answerList.push(obj);
      }

      try
      {
        const res = await serviceAPI.answerTopic(answerList);
        this.successFlag = true;
        this.answered = true;
      } catch (err)
      {
        console.log(err);
      }
    },
    /**
     * 
     */
    // 选项点击事件
    answerSelect (e) {
      if (this.answered)
      {
        return;
      }
      const indexs = e;
      const list = this.list;
      if (list[indexs.index1].type === '0')
      {
        list[indexs.index1].answerList.forEach((ele) => {
          ele.selected = false;
        });
        list[indexs.index1].answerList[indexs.index2].selected = !list[indexs.index1].answerList[indexs.index2].selected;
      }
      if (list[indexs.index1].type === '1')
      {
        list[indexs.index1].answerList[indexs.index2].selected = !list[indexs.index1].answerList[indexs.index2].selected;
      }
      if (list[indexs.index1].type === '3')
      {
        // 排序题，选中和删除时，给list的该项加了个selectedSort的数组，用来放选中选项的及记录当前的排序位子
        list[indexs.index1].answerList[indexs.index2].selected = !list[indexs.index1].answerList[indexs.index2].selected;
        if (list[indexs.index1].answerList[indexs.index2].selected)
        {
          if (!list[indexs.index1].selectedSort)
          {
            list[indexs.index1].selectedSort = [];
          }
          list[indexs.index1].selectedSort.push(list[indexs.index1].answerList[indexs.index2].answerKey);
        } else
        {
          list[indexs.index1].selectedSort.splice(list[indexs.index1].selectedSort.indexOf(list[indexs.index1].answerList[indexs.index2].answerKey), 1);
        }
        // 将选中选项的排列序号写到 answerList 的当个对象中
        list[indexs.index1].answerList.forEach((ele) => {
          if (list[indexs.index1].selectedSort.indexOf(ele.answerKey) !== -1)
          {
            ele.sort = list[indexs.index1].selectedSort.indexOf(ele.answerKey) + 1;
          } else
          {
            delete ele.sort;
          }
        });
      }
      this.list = list;
    },
  },
  components: {
    Popup,
  },
};
</script>
<style lang="scss" scoped>
/deep/.van-popup {
  background: none;
}

.popup_wrap {
  width: 272px;
  color: #333;
  background: none;
  text-align: center;
  .popup_text {
    position: relative;
    width: 272px;
    height: 220px;
    opacity: 1;
    background: #ffffff;
    border-radius: 6px;
    margin-top: 126px;
  }
  .popup_text:before {
    content: '';
    // position: absolute;
    // background: url("../assets/images/survey_diaimg.png") no-repeat center
    //   center;
    // background-size: 100% 100%;
    width: 233px;
    height: 233px;
    top: -110px;
    left: 50%;
    margin-left: -116px;
  }
  .txt {
    font-size: 16px;
    color: #333333;
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -104px;
    line-height: 25px;
  }
  .popup_btn {
    background-color: #0034ff;
    // background: url("../assets/images/survey_success.png") no-repeat center
    //   center;
    // background-size: 100% 100%;
    width: 230px;
    height: 45px;
    margin: 24px auto 0;
  }
}

.answer_input {
  height: 22px;
  line-height: 22px;
  border: none;
  border-bottom: 1px solid #0034ff;
  padding: 0 3%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  margin-top: 8px;
  font-size: 14px;
  &::placeholder {
    color: #666;
  }
}

.box {
  display: flex;
  align-items: center;
  margin: 0 auto 6px;
  padding-left: 15px;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  .answer_sort {
    position: absolute;
    left: 0;
    color: #de7c2a;
    font-weight: bold;
  }
}

.questions2 {
  position: relative;
}

.options {
  width: calc(100% - 20px);
  color: #333333;
  background: #fff;
  min-height: 25px; // line-height: 45px;
  border-radius: 6px;
  // padding-left: 15px;
  font-size: 14px;
  display: flex;
  align-items: center; // padding:3px;
  &::before {
    content: '';
    width: 17px;
    height: 17px;
    margin-right: 8px;
    background: url(./surveyImg/radio.png) no-repeat no-repeat;
    background-size: 100% 100%;
  }
  span {
    display: inline-block;
    word-break: break-all;
    flex: 1;
  }
}

.active {
  width: calc(100% - 20px);
  min-height: 25px; // line-height: 45px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  // padding-left: 15px;
  color: #ef7d0b;
  font-weight: bold;
  background: linear-gradient(121deg, #fff5e7 15%, #f8f8f8 99%);
  font-size: 14px;
  span {
    display: inline-block;
    word-break: break-all;
    flex: 1;
  }
  &::before {
    content: '';
    width: 17px;
    height: 17px;
    margin-right: 8px;
    background: url(./surveyImg/radio-active.png) no-repeat no-repeat;
    background-size: 100% 100%;
  }
}
.qOptions {
  text-align: center;
  width: 100%;
  .jdttextArea {
    width: calc(100% - 20px);
    color: #333333;
    background: #fafafa;
    border: 1px solid #cccbcc;
    border-radius: 4px;
    height: 100px;
    padding: 3px;
    font-size: 14px;
  }
}
.wrap {
  width: 100%;
  border-radius: 6px;
  background: #fff;
  position: relative;
}
.questions {
  // background: #fff;
  width: 100%;
  // margin-bottom: 20px;
  padding: 19px 14px;
  color: #333;
  .subtitle {
    margin-bottom: 16px;
    word-break: break-all;
    font-size: 14px;
    p {
      font-size: 16px;
    }
  }
}
.topic_type {
  border: 1px solid #f3a200;
  border-radius: 12px;
  color: #f3a200;
  font-weight: bold;
  font-size: 12px;
  padding: 2px 4px;
  margin-right: 5px;
  vertical-align: unset;
}
.hddy_wrap {
  min-height: 100vh;
  overflow: auto;
  color: #ffffff;
  position: relative;
  padding-bottom: 20px;
  background: linear-gradient(180deg, #fff5e7 0%, #f8f8f8 62%);
  .hddy_top {
    width: 100%;
    margin: 0 auto;
  }
  .hddy_content {
    padding: 10px 30px 0;
    margin-top: -30px;
  }
  .hddy_title {
    font-size: 18px;
    margin-bottom: 25px;
    color: #333;
    font-weight: bold;
    .txt {
      position: relative;
      padding-left: 15px;
    }
  }
  .hddy_footer {
    width: 100%;
    padding-top: 13px;
    padding-bottom: 24px;
    text-align: center;
  }
  .hddy_btn {
    width: 259px;
    height: 45px;
    margin: 0 auto;
  }
}
.opera-btn {
  text-align: center;
  width: 100%;
  display: inline-block;
  height: 43px;
  line-height: 43px;
  opacity: 1;
  background: #cccccc;
  border-radius: 21px;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  background: linear-gradient(121deg, #eeb82b 15%, #de7c2a 99%);
}
.survey__success {
  width: 100%;
  height: 100vh;
  text-align: center;
  padding-top: 127px;
  background: linear-gradient(180deg, #fff5e7 0%, #f8f8f8 62%);
  .survey__success--img {
    width: 50px;
    display: inline-block;
  }
  .survey__success--txt {
    font-size: 16px;
    margin-top: 22px;
    color: #333;
    margin-bottom: 60px;
  }
  .survey__success--btn {
    width: 255px;
  }
}
</style>
