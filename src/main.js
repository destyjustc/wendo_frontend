import Vue from 'vue'

import App from './App'

import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import {
  sync
} from 'vuex-router-sync'

import {
  DatetimePlugin,
  CloseDialogsPlugin,
  ConfigPlugin,
  BusPlugin,
  LocalePlugin,
  DevicePlugin,
  ToastPlugin,
  AlertPlugin,
  WechatPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  AjaxPlugin,
  AppPlugin
} from 'vux'

import { routes } from './router/index';

require('es6-promise').polyfill()

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueI18n)

const store = new Vuex.Store()

// const vuxLocales = require('json-loader!yaml-loader!./locales/all.yml')
// const componentsLocales = require('json-loader!yaml-loader!./locales/components.yml')
//
// const finalLocales = {
//   'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
//   'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
// }
//
// for (let i in finalLocales) {
//   Vue.i18n.add(i, finalLocales[i])
// }

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition(state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition({
      commit
    }, top) {
      commit({
        type: 'updateDemoPosition',
        top: top
      })
    }
  }
})

// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)
Vue.use(LocalePlugin)

// test
if (process.env.platform === 'app') {
  Vue.use(AppPlugin, store)
}

// const http = Vue.http

const FastClick = require('fastclick')
FastClick.attach(document.body)

// The following line will be replaced with by vux-loader with routes in ./demo_list.json
// const routes = []

const router = new VueRouter({
  routes
})

Vue.use(CloseDialogsPlugin, router)

sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {
        direction: 'forward'
      })
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {
          direction: ''
        })
      } else {
        store.commit('updateDirection', {
          direction: 'reverse'
        })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {
      direction: 'forward'
    })
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
  if (process.env.NODE_ENV === 'production') {
    window.ga && window.ga('set', 'page', to.fullPath)
    window.ga && window.ga('send', 'pageview')
  }
})

const messages = {
  en: {
    message: {
      menu: 'menu'
    }
  },
  zh: {
    message: {
      menu: '菜单'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
  i18n.locale = 'zh'
} else {
  i18n.locale = 'en'
}

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
