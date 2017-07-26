import Vue from 'vue'
import Router from 'vue-router'
import App from './App'

import Wechat from '../../views/demos/Wechat'
import Yi from '../../views/demos/yi'
import Icon from '../../views/demos/Icon'
import Switch from '../../views/demos/Switch'
import Radio from '../../views/demos/Radio'
import Input from '../../views/demos/Input'
import Number from '../../views/demos/Number'
import Checklist from '../../views/demos/Checklist'
import Selector from '../../views/demos/Selector'
import Tip from '../../views/demos/Tip'
import XButton from '../../views/demos/X-button'
import Textarea from '../../views/demos/Textarea'
import Flexbox from '../../views/demos/Flexbox'
import Tab from '../../views/demos/Tab'
import Swiper from '../../views/demos/Swiper'
import Sticky from '../../views/demos/Sticky'
import Picker from '../../views/demos/Picker'
import Datetime from '../../views/demos/Datetime'
import Popup from '../../views/demos/Popup'
import Range from '../../views/demos/Range'
import Actionsheet from '../../views/demos/Actionsheet'
import Clocker from '../../views/demos/Clocker'
import Rater from '../../views/demos/Rater'
import PopupPicker from '../../views/demos/Popup-picker'
import Toast from '../../views/demos/Toast'
import Loading from '../../views/demos/Loading'
import Alert from '../../views/demos/Alert'
import Confirm from '../../views/demos/Confirm'
import Progress from '../../views/demos/Progress'
import XImg from '../../views/demos/XImg'
import XImgScroller from '../../views/demos/X-img-scroller'
import Onepx from '../../views/demos/1px'
import Orientation from '../../views/demos/Orientation'
import Shake from '../../views/demos/Shake'
import Cell from '../../views/demos/Cell'
import Demo from '../../views/demos/Demo'
import Emotion from '../../views/demos/Wechat-emotion'
import Search from '../../views/demos/Search'
import SearchStatic from '../../views/demos/Search-static'
import Donate from '../../views/demos/Donate'
import Thanks from '../../views/demos/Thanks'
import Spinner from '../../views/demos/Spinner'
import Calendar from '../../views/demos/Calendar'
import Circle from '../../views/demos/Circle'
import Countup from '../../views/demos/Countup'
import ColorPicker from '../../views/demos/Color-picker'
import Blur from '../../views/demos/Blur'
import Scroller from '../../views/demos/Scroller'
import Comment from '../../views/demos/Comment'
import Pulldown from '../../views/demos/Pulldown'
import Pullup from '../../views/demos/Pullup'
import PulldownPullup from '../../views/demos/PulldownPullup'
import Masker from '../../views/demos/Masker'
import Countdown from '../../views/demos/Countdown'
import XHeader from '../../views/demos/X-header'
import Inview from '../../views/demos/Inview'
import InlineCalendar from '../../views/demos/Inline-calendar'
import InlineCalendarStartDate from '../../views/demos/Inline-calendar-start-date'
import Checker from '../../views/demos/Checker'
import ScrollerFull from '../../views/demos/Scroller-full'
import NumberRoller from '../../views/demos/Number-roller'
import Timeline from '../../views/demos/Timeline'
import Step from '../../views/demos/Step'
import Tabbar from '../../views/demos/Tabbar'
import TabbarLink from '../../views/demos/TabbarLink'
import Panel from '../../views/demos/Panel'
import Reddot from '../../views/demos/Reddot'
import ButtonTab from '../../views/demos/Button-tab'
import ScrollerSwiper from '../../views/demos/Scroller-swiper'
import ScrollerHeader from '../../views/demos/Scroller-header'
import Qrcode from '../../views/demos/Qrcode'
import Badge from '../../views/demos/Badge'
import Close from '../../views/demos/Close'
import Dialog from '../../views/demos/Dialog'
import DateFormatter from '../../views/demos/Date-formatter'
import Card from '../../views/demos/Card'
import Previewer from '../../views/demos/Previewer'
import IconLoading from '../../views/demos/Icon-loading'
import Test from '../../views/demos/Test'
import Issue189 from '../../views/demos/Issue189'
import Issue461 from '../../views/demos/Issue461'
import Issue414 from '../../views/demos/Issue414'
import Divider from '../../views/demos/Divider'

// plugins
import Device from '../../plugins/device'
import DeviceDemo from '../../views/demos/Device'
import ToastPlugin from '../../plugins/toast'
import AlertPlugin from '../../plugins/alert'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(Router)
Vue.config.devtools = true

// $device
Vue.use(Device)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

const router = new Router({
  history: true,
  saveScrollPosition: true
})

/**
* sync router params
*/
import { sync } from 'vuex-router-sync'
import store from '../../vuex/store'

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/**
* sync router loading status
*/
const commit = store.commit || store.dispatch
router.beforeEach(({ to, from, next }) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  commit('UPDATE_LOADING', true)
  setTimeout(next, 50)
})
router.afterEach(() => {
  commit('UPDATE_LOADING', false)
})

sync(store, router)

router.map({
  '/demo.html/': {
    component: function (resolve) {
      require(['../../views/demos/Home'], resolve)
    }
  },
  '/demo.html/demo/wechat': {
    component: Wechat
  },
  '/demo.html/demo/yi': {
    component: Yi
  },
  '/demo.html/component/icon': {
    component: Icon
  },
  '/demo.html/component/switch': {
    component: Switch
  },
  '/demo.html/component/radio': {
    component: Radio
  },
  '/demo.html/component/input': {
    component: Input
  },
  '/demo.html/component/number': {
    component: Number
  },
  '/demo.html/component/checklist': {
    component: Checklist
  },
  '/demo.html/component/selector': {
    component: Selector
  },
  '/demo.html/component/tip': {
    component: Tip
  },
  '/demo.html/component/x-button': {
    component: XButton
  },
  '/demo.html/component/textarea': {
    component: Textarea
  },
  '/demo.html/component/flexbox': {
    component: Flexbox
  },
  '/demo.html/component/tab': {
    component: Tab
  },
  '/demo.html/component/swiper': {
    component: Swiper
  },
  '/demo.html/component/sticky': {
    component: Sticky
  },
  '/demo.html/component/picker': {
    component: Picker
  },
  '/demo.html/component/datetime': {
    component: Datetime
  },
  '/demo.html/component/popup': {
    component: Popup
  },
  '/demo.html/component/range': {
    component: Range
  },
  '/demo.html/component/actionsheet': {
    component: Actionsheet
  },
  '/demo.html/component/clocker': {
    component: Clocker
  },
  '/demo.html/component/rater': {
    component: Rater
  },
  '/demo.html/component/popup-picker': {
    component: PopupPicker
  },
  '/demo.html/component/address': {
    component: function (resolve) {
      require(['../../views/demos/Address'], resolve)
    }
  },
  '/demo.html/component/toast': {
    component: Toast
  },
  '/demo.html/component/loading': {
    component: Loading
  },
  '/demo.html/component/alert': {
    component: Alert
  },
  '/demo.html/component/confirm': {
    component: Confirm
  },
  '/demo.html/component/progress': {
    component: Progress
  },
  '/demo.html/component/x-img': {
    component: XImg
  },
  '/demo.html/component/x-img-scroller': {
    component: XImgScroller
  },
  '/demo.html/component/1px': {
    component: Onepx
  },
  '/demo.html/component/orientation': {
    component: Orientation
  },
  '/demo.html/component/shake': {
    component: Shake
  },
  '/demo.html/component/cell': {
    component: Cell
  },
  '/demo.html/demo': {
    component: Demo
  },
  '/demo.html/component/emotion': {
    component: Emotion
  },
  '/demo.html/component/search': {
    component: Search
  },
  '/demo.html/component/search-static': {
    component: SearchStatic
  },
  '/demo.html/project/donate': {
    component: Donate
  },
  '/demo.html/project/thanks': {
    component: Thanks
  },
  '/demo.html/component/spinner': {
    component: Spinner
  },
  '/demo.html/component/calendar': {
    component: Calendar
  },
  '/demo.html/component/circle': {
    component: Circle
  },
  '/demo.html/component/countup': {
    component: Countup
  },
  '/demo.html/component/color-picker': {
    component: ColorPicker
  },
  '/demo.html/component/blur': {
    component: Blur
  },
  '/demo.html/component/scroller': {
    component: Scroller
  },
  '/demo.html/component/comment': {
    component: Comment
  },
  '/demo.html/component/pulldown': {
    component: Pulldown
  },
  '/demo.html/component/pullup': {
    component: Pullup
  },
  '/component/pulldown-pullup': {
    component: PulldownPullup
  },
  '/demo.html/component/masker': {
    component: Masker
  },
  '/demo.html/component/countdown': {
    component: Countdown
  },
  '/demo.html/component/inview': {
    component: Inview
  },
  '/demo.html/component/x-header': {
    component: XHeader
  },
  '/demo.html/component/inline-calendar': {
    component: InlineCalendar
  },
  '/demo.html/component/inline-calendar-start-date': {
    component: InlineCalendarStartDate
  },
  '/demo.html/component/checker': {
    component: Checker
  },
  '/demo.html/component/scroller/full': {
    component: ScrollerFull
  },
  '/demo.html/component/scroller/header': {
    component: ScrollerHeader
  },
  '/demo.html/component/number-roller': {
    component: NumberRoller
  },
  '/demo.html/component/timeline': {
    component: Timeline
  },
  '/demo.html/component/step': {
    component: Step
  },
  '/demo.html/component/tabbar': {
    component: Tabbar
  },
  '/demo.html/component/tabbar-link': {
    component: TabbarLink
  },
  '/demo.html/component/panel': {
    component: Panel
  },
  '/demo.html/component/reddot': {
    component: Reddot
  },
  '/demo.html/component/button-tab': {
    component: ButtonTab
  },
  '/demo.html/component/scroller-swiper': {
    component: ScrollerSwiper
  },
  '/demo.html/component/qrcode': {
    component: Qrcode
  },
  '/demo.html/component/badge': {
    component: Badge
  },
  '/demo.html/component/close': {
    component: Close
  },
  '/demo.html/component/dialog': {
    component: Dialog
  },
  '/demo.html/component/date-formatter': {
    component: DateFormatter
  },
  '/demo.html/component/card': {
    component: Card
  },
  '/demo.html/component/previewer': {
    component: Previewer
  },
  '/demo.html/component/icon-loading': {
    component: IconLoading
  },
  '/demo.html/plugin/device': {
    component: DeviceDemo
  },
  '/demo.html/test': {
    component: Test
  },
  '/demo.html/issue/189': {
    component: Issue189
  },
  '/demo.html/issue/461': {
    component: Issue461
  },
  '/demo.html/issue/414': {
    component: Issue414
  },
  '/demo.html/component/divider': {
    component: Divider
  }
})

router.on('/demo.html/component/center', {
  component: require('../../views/demos/Center')
})

// save position for demo page
let demoScrollTop = 0
function saveDemoScrollTop () {
  demoScrollTop = window.scrollY
}

router.beforeEach(function (transition) {
  if (transition.to.fullPath !== '/demo.html/demo') {
    window.removeEventListener('scroll', saveDemoScrollTop, false)
  }
  if (/\/http/.test(transition.to.path)) {
    let url = transition.to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    if (/\/demo\/component\/\w+/.test(transition.to.path)) {
      router.go({
        replace: true,
        path: transition.to.path.replace('/demo.html/demo', ''),
        append: false
      })
    } else {
      transition.next()
    }
  }
})

router.afterEach(function (transition) {
  if (transition.to.path !== '/demo.html/demo') {
    window.scrollTo(0, 0)
  } else {
    window.removeEventListener('scroll', saveDemoScrollTop, false)
    // if from component page
    if (demoScrollTop && /component/.test(transition.from.path)) {
      setTimeout(function () {
        window.scrollTo(0, demoScrollTop)
      }, 100)
    }
    setTimeout(function () {
      window.addEventListener('scroll', saveDemoScrollTop, false)
    }, 1000)
  }
})

router.start(App, '#app')
