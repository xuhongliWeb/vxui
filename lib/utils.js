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

/**
 * @description 
 * executor - 传进来的一堆 用户写的方法
 * promise 对象初始状态为peading, 在被resolve或 reject 是 状态改为 Fulfilled 或 Rejected
 * resolve 接收成功的数据， reject 接收失败或错误的数据
 * Promise对象必须有一个then方法， 且只接收两个可函数参数 onFulfilled / onRejected
 * 发布订阅模式支持异步
 * catch方法其实就是没有成功回调的then方法，这个很好理解，因为一旦失败之后就会调用reject,最终都会走到then方法的失败回调中，只是简单的把then方法换个名字而已。
 */
 const pConfig = {
   PEADINGD : 'PEADINGD', 
   RESOLVED: 'RESOLVED',
   REJECTED: 'RESOLVED'
 }
 export class vxPromise {
   constructor(executor) {
    console.log(executor, '执行者 executor -1 ')

    this.status = pConfig.PEADINGD // 默认等待状态
    this.value = undefined // 这个应该是 成功的结果把？
    this.reason = undefined // 失败的结果？
    this.onResolvedCallbacks = [] // 存放 成功函数的
    this.onRejectedCallbacks = [] // 存放失败函数的
    let resolve = (value) => {
      console.log(value, 'resolve-value -4')
      if(this.status === pConfig.PEADINGD) { // 等待状态才执行
        this.value = value 
        this.status = pConfig.RESOLVED
        // 依次执行异步任务 由 then 的时候push 进去
        this.onResolvedCallbacks.forEach(fn => {
          console.log(fn,'回调里的', '成功')
          // fn()
        })
      }
    }
    let reject = (value) => {
      console.log(value, 'reject-value-4')
      if(this.status === pConfig.PEADINGD) {
        this.reason = value // 更新状态
        this.status = pConfig.REJECTED
        // 依次执行异步任务 由 then 的时候push 进去
        this.onRejectedCallbacks.forEach(fn => {
          console.log(fn,'回调里的', '失败')
          // fn()
        })
      }
    }
    // 执行 executor 传入我们定义的成功和失败的函数； 把用户写的resolve,reject的结果 传入 内部  resolve 和 reject 
    try {
      executor(resolve,reject)
    }catch (e) {
      console.log('catch错误', e);
			reject(e); //如果内部出错 直接将error手动调用reject向下传递
    }

   }
   then(onfufilled,onrejected) {
     console.log( this.onResolvedCallbacks, 'onrejected-2')
    if(this.status === pConfig.RESOLVED) {
      onfufilled(this.value)
    }
    if(this.status === pConfig.REJECTED) {
      onrejected(this.reason)
    }
    // 执行异步任务
    if(this.status === pConfig.PEADINGD) {
      console.log('push-3')
      this.onResolvedCallbacks.push(() => {
        console.log('55')
        onfufilled(this.value);
      })
      this.onRejectedCallbacks.push(() => {
        console.log('55')
				onrejected(this.reason);
			});
    }
    
  }
  catch(errCallback) { 
    return this.then(null, errCallback);
  }
 }