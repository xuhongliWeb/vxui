<template>
  <div class="survey">
    答题
    <vx-survey
      :data="topicData"
      ref="survey"
    />
  </div>
</template>
<script>

export default {

  data() {
    return {
      topicData: [],
      code: "",
      num: 0,
      authorType: 0 
    };
  },
  created() {
    this.initTopic()
  },
  mounted() {
   

  },
  beforeRouteLeave(to, from, next) {
    next()
    // if (!this.$refs.survey.sended3) {
    //   Dialog.confirm({
    //     title: "提示",
    //     message: "您还没有完成答题，是否确认退出",
    //     confirmButtonText: "是",
    //     cancelButtonText: "否",
    //     showCancelButton: true
    //   })
    //     .then(() => {
    //       // on confirm
    //       next();
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // }else {
    //   next()
    // }
  },
  methods: {

   
    initTopic() {
      try {
        // AS
        if (
        false
        ) {
          this.topicData = [
            // 第一页
            {
              // 段落
              paragraph_list: [
                {
                  // 第一段题目列表
                  list: [
                    {
                      name:
                        "1.在以下哪些情况时 （多选）",
                      type: 2,
                      answers: [
                        {
                          info: "中",
                          selected: false
                        },
                        {
                          info:
                            "NAS",
                          selected: false
                        },
                        {
                          info: "对N",
                          selected: false
                        },
                        {
                          info: "合并",
                          selected: false
                        },
                        {
                          info: "合",
                          selected: false
                        },
                        {
                          info: "其他: /i ",
                          selected: false
                        }
                      ]
                    },
                    {
                      name:
                        "2. 您认为（单选）",
                      answers: [
                        {
                          info: "融",
                          selected: false
                        },
                        {
                          info: " 依那",
                          selected: false
                        },
                        {
                          info: "阿",
                          selected: false
                        },
                        {
                          info: "英",
                          selected: false
                        },
                        {
                          info: "司",
                          selected: false
                        },
                        {
                          info: "戈",
                          selected: false
                        }
                      ]
                    },
                    {
                      name:
                        "3.以下（多选）",
                      type: 2,
                      answers: [
                        {
                          info:
                            "在",
                          selected: false
                        },
                        {
                          info:
                            "2016 ",
                          selected: false
                        },
                        {
                          info:
                            "2019",
                          selected: false
                        },
                        {
                          info: "2019 ",
                          selected: false
                        }
                      ]
                    },
                    {
                      name:
                        "4. 以下（多选）",
                      type: 2,
                      answers: [
                        {
                          info: "疾",
                          selected: false
                        },
                        {
                          info: "TN",
                          selected: false
                        },
                        {
                          info:
                            "T",
                          selected: false
                        },
                        {
                          info:
                            "早",
                          selected: false
                        }
                      ]
                    },
                    {
                      name:
                        "5. 关于（单选）",
                      answers: [
                        {
                          info: "病",
                          selected: false
                        },
                        {
                          info: "停",
                          selected: false
                        },
                        {
                          info: "后",
                          selected: false
                        },
                        {
                          info: "试",
                          selected: false
                        },
                        {
                          info: "在",
                          selected: false
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ];
          return;
        }
        if (
         true
        ) {
          this.topicData = [
            // 第一页
            {
              // 段落
              paragraph_list: [
                {
                  // 第一段题目列表
                  list: [
                    {
                      type:8,
                      name:
                        "1、根据？(左右滑动)",
                      subval: 50,
                      isSlider:true,
                      answers: [
                      ]
                    },
                     {
                      name:
                        "2、c？（单选）",
                      answers: [
                        {
                          info: "抗",
                          selected: false
                        },
                        {
                          info: "vgxf",
                          selected: false
                        },
                        {
                          info: "地方都是",
                          selected: false
                        },
                        {
                          info: "大华股份",
                          selected: false
                        },
                        {
                          info: "肺结核",
                          selected: false
                        },
                        {
                          info: "他人合法然后",
                          selected: false
                        },
                          {
                          info: "其他/i",
                          selected: false
                        }
                      ]
                    },
                    {
                      name:
                        "3、多”？（多选）",
                      type: 2,
                      answers: [
                        {
                          info: " 吧v;",
                          selected: false
                        },
                        {
                          info: " 的风格的;",
                          selected: false
                        },
                        {
                          info: "梵蒂冈;",
                          selected: false
                        },
                        {
                          info: "有try;",
                          selected: false
                        },
                        {
                          info: "华国锋;",
                          selected: false
                        },
                        {
                          info: "其他: /i",
                          selected: false,
                          type: 3,
                          num: false
                        }
                      ]
                    },
                    {
                      name:
                        "4、他依然（多选，请选3个）？",
                      type: 2,
                      answers: [
                        {
                          info: "给官方的风格的；",
                          selected: false
                        },
                        {
                          info: "的功夫/给对方g'd",
                          selected: false
                        },
                        {
                          info: "的法国队",
                          selected: false
                        },
                        {
                          info: "的风格",
                          selected: false
                        },
                        {
                          info: " 的风格 ",
                          selected: false
                        },
                        {
                          info: "撒官方",
                          selected: false
                        },
                        {
                          info: "太热",
                          selected: false
                        },
                        {
                          info: "其他/i",
                          selected: false
                        }
                      ]
                    },
                    {
                      name:
                        "5、感觉？（单选）",
                      answers: [
                        {
                          info: "高峰时段",
                          selected: false
                        },
                        {
                          info: "士大夫s",
                          selected: false
                        },
                        {
                          info: "的风格",
                          selected: false
                        },
                        {
                          info: "返回给",
                          selected: false
                        },
                        {
                          info: "风格和",
                          selected: false
                        },
                        {
                          info: "同样让他",
                          selected: false
                        },
                        {
                          info: "其他",
                          selected: false
                        }
                      ]
                    },
                    {
                      name:
                        "6、绕太阳? （单选）",
                      answers: [
                        {
                          info: "大概d",
                          selected: false
                        },
                        {
                          info: "的功夫",
                          selected: false
                        },
                        {
                          info: "的风格",
                          selected: false
                        },
                        {
                          info: "的风格",
                          selected: false
                        },
                        {
                          info: "合肥",
                          selected: false
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ];
          return;
        }
      } catch (error) {}
    }
  }
};
</script>
