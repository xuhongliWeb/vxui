/**
 * @author
 * @description 节流第一次会触发 最后一次不会触发
 */

import { call } from "file-loader"

export const _throttle = function(func, wait) {
  var prev = 0
  return function() {
    var context = this
    var args = arguments
    var now = +new Date()
    if (now - prev > wait) {
      // 第一次肯定执行  把上一次 的 now 复制给 prev 
      // 第二次 生成新的时间戳 减去 上一次的 如果大于等于间隔事件就执行。反之不执行
      // 重复 以上操作

      func.apply(context, args)
      prev = now
    }
  }
}

/**
 * 
 * @param {*} wait 
 * @param {*} func
 * @description 第一次不会触发 最后一次会触发 
 */

 export const _throttle2 = function (func,wait) {
   let context,timer,args;
   return function () {
     context = this
     args = arguments
     if(!timer) { // 在这里区别
      timer = setTimeout(() => {
        timer = null
        func.apply(context,args)
      }, wait);
     }
   }
 }


 /**
  * @description 两者结合
  * 当你一直按的时候
  * 第一次肯定执行  把上一次 的 now 复制给 prev 然后注意在等待wait 时间后 定时器开始创建执行
  * 长按由于更新了时间不满足时间戳走了定时器？
  */
export const _throttle3 = function (func,wait) {
  let timer,context,prev = 0,now,args;
  return function () {
    context = this
    args = arguments
    now = +new Date()
    if(now - prev > wait) {
      // debugger
      console.log('时间戳')
      if(timer){ // 结束后重新计算时间
        clearTimeout(timer)
        timer = null
      }
      func.apply(context,args)
      prev = now
    }else if(!timer){
      console.log('定时器')
      // debugger
      timer = setTimeout(() => {
        prev = +new Date() // // 重置前一次触发的时间戳
        func.apply(context, args)
        timer = null
      }, wait);
    }
  }
}

/**
 * 完整版 的 节流 
 * @param {object} option
 * 如果您想禁用前沿呼叫，请传递{leading：false}，并且如果您要禁用后沿执行，请传递
 {trailing: false}. 
 */

 export const _throttle4 = function (func,wait,option) {
   let context,timer,args,now,prev = 0;
   if(!option) {option = {}}
   return function () {
     context = this
     now = +new Date()
     args = arguments
     console.log(option, 'option')
     if(option.leading === false) {
      prev = now // 禁用首次执行
     }
     if(now - prev > wait) {
      if(timer) {
        clearTimeout(timer)
        timer = null
      }
      func.apply(context,args)
      prev = now
     }else if(!timer && option.trailing !== false) {
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
        prev = +new Date()
      }, wait);
     }
   }
 }

/**
 * @author
 * @description 防抖
 */

export const _debounce = function(delay, fn) {
  const timer = null
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

/**
 * @author 高程3
 * 
 */
export  const _debounce2 = function (method,context) {
  clearTimeout(timer)
  method.tid = setTimeout(function() {
    method.call(context)
  },200)
}

/**
 * @author 
 * @description 
 */
export const _debounce3 = function (method,wait = 1000) {
  let timer = null
  let n = 0
  return function () {
    let that = this
    let arg = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      method.apply(that,arg)
    },wait)
    console.log(n++)
  }
}

/**
 * @description 第四版 支持立即执行的选项
 * 对立即参数传递true 以使debounce触发前导函数而不是等待间隔的后沿。在防止意外双击“提交”按钮从而再次发射的情况下很有用。
 */

 export const _debounce4 = function (func,wait,immediate) {
   let context,args,timer;
   return function () {
     context = this
     args = arguments
     if (timer) clearTimeout(timer);
    // 如果immediate 为 true 先执行一次
    if(immediate) {
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null  
      }, wait);
      if(callNow) {
        func.apply(context, args)
      }
    }else {
      timer = setTimeout(() => {
        func.apply(context,args)
      }, wait);
    }
   }
 }