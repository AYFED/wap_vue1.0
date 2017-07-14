export default () => ({
  value: {
    type: String,
    twoWay: true,
    default: ''
  },
  renderMonth: {
    type: Array, // [2018, 8]
    default () {
      return [null, null]
    }
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  showLastMonth: {
    type: Boolean,
    default: false
  },
  showNextMonth: {
    type: Boolean,
    default: false
  },
  highlightWeekend: {
    type: Boolean,
    default: false
  },
  returnSixRows: {
    type: Boolean,
    default: true
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideWeekList: {
    type: Boolean,
    default: false
  },
  replaceTextList: {
    type: Object,
    default () {
      return {}
    }
  },
  renderOnValueChange: {
    type: Boolean,
    default: true
  },
  disablePast: {
    type: Boolean,
    default: true
  },
  disableFuture: {
    type: Boolean,
    default: false
  },
  alertText:{
      type: String,
      default:""
  },
  calendarData:{
      type: Array,
      default () {
          return []
      }
  },
  daysInfoKey:{
      type: String,
      default :"daysInfo"
  },
  alertable:{
      type: Boolean,
      default: false
  },
  afterCellClickfunc:{
      type: Function,
      default: function() {}
  },
  beforeMonthChange:{
      type: Function,
      default: function() {}
  },
  customslotfunc:{
      type: Function,
      default: function() {}
  },
  disableUse:{
    type:Boolean,
      default:true
  }
})
