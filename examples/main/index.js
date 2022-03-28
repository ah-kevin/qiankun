import 'zone.js' // for angular subapp
import {registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState} from '../../src/index'
import './index.less'

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
// import render from './render/ReactRender';
import render from './render/VueRender'

/**
 * Step1 初始化应用（可选）
 */
render({loading: true})

const loader = loading => render({loading})

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    // {
    //   name: 'react16',
    //   entry: '//localhost:7100',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/react16',
    // },
    // {
    //   name: 'react15',
    //   entry: '//localhost:7102',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/react15',
    // },
    // {
    //   name: 'vue',
    //   entry: '//localhost:7101',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/vue',
    // },
    // {
    //   name: 'angular9',
    //   entry: '//localhost:7103',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/angular9',
    // },
    // {
    //   name: 'purehtml',
    //   entry: '//localhost:7104',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/purehtml',
    // },
    // {
    //   name: 'vue3',
    //   entry: '//localhost:7105',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/vue3',
    // },
    {
      name: 'vue',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue',
    },
  ],
  {
    beforeLoad: [
      app => {
        // 这个打印日志的方法可以学习一下，第三个参数会替换掉第一个参数中的 %c%s，并且第三个参数的颜色由第二个参数决定
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      },
    ],
  },
)

const {onGlobalStateChange, setGlobalState} = initGlobalState({
  user: 'qiankun',
})

// 监听全局状态的更改，当状态发生改变时执行回调函数
onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

// 设置新的全局状态，只能设置一级属性，微应用只能修改已存在的一级属性
setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
})

/**
 * Step3 设置默认进入的子应用,当主应用启动以后默认进入指定微应用
 */
setDefaultMountApp('/vue')

/**
 * Step4 启动应用
 */
start()

// 当第一个微应用挂载以后，执行回调函数，在这里可以做一些特殊的事情，比如开启一监控或者买点脚本
runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted')
})
