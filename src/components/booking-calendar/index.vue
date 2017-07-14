<template>
<div class="booking-calendar" :class="{'is-weekend-highlight': highlightWeekend}" >
    <div class="alertContent" v-show="alertShow&&alertable" transition="expand">{{alertText}}</div>
    <table>
      <thead v-show="!hideWeekList">
        <tr class="calendar-month-bar">
          <th @click="goToMonth(showMonthList[dk]-1,$index)" v-for="dk in 7" class="{{$index==currentIndex?'weekend':''}}"><span>{{showMonthList[dk]?showMonthList[dk]+'月':''}}</span></th>
        </tr>
        <tr class="calendar-weeks-bar" v-show="!tbodyshow">
          <th v-for="(index, week) in weeksList" class="{{($index==0||$index==(weeksList.length-1))?'weekend':''}}"><span>{{week}}</span></th>
        </tr>
      </thead>
      <tbody v-show="!tbodyshow">
        <tr v-for="(k1,day) in days">
          <td
          :data-date="formatDate(year, month, child)"
          :data-current="value"
          v-for="(k2,child) in day"
          :class="buildClass(k2, child, formatDate(year, month, child) === value && !child.isLastMonth && !child.isNextMonth)"
          @click="select(k1,k2,$event)">
            <span
            v-show="(!child.isLastMonth && !child.isNextMonth ) || (child.isLastMonth && showLastMonth) || (child.isNextMonth && showNextMonth)">{{replaceText(child.day, formatDate(year, month, child))}}</span>
            {{{customslotfunc(k1, k2, child)}}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import format from '../datetime/format'
import { getDays, zero, monthNumBtTow } from './util'
import props from './props'

export default {
  props: props(),
  data () {
    return {
      tbodyshow:false,
      year: 0,
      month: 0,
      currentIndex:0,
      days: [],
      current: [],
      today: format(new Date(), 'YYYY-MM-DD'),
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      weeksList:['日', '一', '二', '三', '四', '五', '六 '],
      showMonthList:[]
    }
  },
  ready () {
    this.value = this.convertDate(this.value)
    this.render()
  },
  computed: {
    _replaceTextList () {
      const rs = {}
      for (let i in this.replaceTextList) {
        rs[this.convertDate(i)] = this.replaceTextList[i]
      }
      return rs
    },
    alertShow(){
      if(this.current.length>0){
        return false
      }else{
        return true
      }
    }
  },
  watch: {
    value (val) {
      this.value = this.convertDate(val)
      if (this.renderOnValueChange) {
        this.render(null, null, val)
      } else {
        this.render(this.year, this.month, this.value)
      }
      this.$emit('on-change', val)
    },
    returnSixRows (val) {
      this.render(this.year, this.month, this.value)
    },
    disablePast () {
      this.render(this.year, this.month, this.value)
    },
    disableFuture () {
      this.render(this.year, this.month, this.value)
    }
  },
  methods: {
    gotoValue(str){
      if(this.value == str){
          this.value = this.convertDate(this.value )
          if (this.renderOnValueChange) {
          this.render(null, null, this.value)
          } else {
          this.render(this.year, this.month, this.value)
          }
          this.$emit('on-change', this.value)
      }else{
        this.value=str
      }
      let _tm = (new Date(str)).getMonth()
      this.month = _tm
      this.currentIndex = monthNumBtTow(str,this.showMonthList,this.currentIndex)
    },
    replaceText (day, formatDay) {
      if(formatDay==this.today){
        return '今天'
      }else{
        return this._replaceTextList[formatDay] || day
      }
    },
    convertDate (date) {
      return date === 'TODAY' ? this.today : date
    },
    buildClass (index, child, isCurrent) {
      const className = {
        current: child.current || isCurrent,
        'is-disabled': (child.disabled && this.disableUse ) ||  child.islast,
        'is-today': child.isToday,
        'weekend':!child.disabled && (index==0 ||index==6)
      }
      className[`is-week-${index}`] = true
      return className
    },
    render (year, month,v,cdata) {
      let data = getDays({
        year: year,
        month: month,
        value: this.value,
        rangeBegin: this.convertDate(this.startDate),
        rangeEnd: this.convertDate(this.endDate),
        returnSixRows: this.returnSixRows,
        disablePast: this.disablePast,
        disableFuture: this.disableFuture,
        calendarData:cdata?cdata:this.calendarData,
        daysInfoKey:this.daysInfoKey
      })
      this.days = data.days
      this.year = data.year
      this.month = data.month
      this.showMonthList = data.showMonthList
    },
    formatDate: (year, month, child) => {
      return [year, zero(month + 1), zero(child.day)].join('-')
    },
    prev () {
      if (this.month === 0) {
        this.month = 11
        this.year = this.year - 1
      } else {
        this.month = this.month - 1
      }
      this.render(this.year, this.month)
    },
    next () {
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      this.render(this.year, this.month)
    },
    go (year, month) {
      this.render(year, month)
    },
    goToMonth(trueMonth,idx){
      if(!isNaN(trueMonth)){
        this.beforeMonthChange(trueMonth,idx)
        this.currentIndex = idx
        if(trueMonth>11){
          this.go(this.year+1, trueMonth)
        }else{
          this.go(this.year, trueMonth)
        }
      }
    },
    select (k1, k2) {
      if(this.days[k1][k2].disabled && (this.days[k1][k2].isNextMonth || this.days[k1][k2].isLastMonth)){
        return
      }
      if (this.current.length > 0) {
        this.days[this.current[0]][this.current[1]].isCurrent = false
      }
      this.days[k1][k2].current = true
      this.current = [k1, k2]
      this.value = [this.year, zero(this.month + 1), zero(this.days[k1][k2].day)].join('-')
      this.afterCellClickfunc(this.days[k1][k2])
    }
  }
}
</script>

<style>
.booking-calendar .alertContent{
  background-color:#FFAB0A;
  height:40px;
  position:fixed;
  width:100%;
  opacity:0.95;
  color:#fff;
  font-size: 14px;
  padding-left:20px;
  font-weight:100;
  line-height: 38px;
}
.calendar-month-bar{
  background-color: #F5F5F5;
  font-size: 14px;
}
.calendar-month-bar th{
  height:40px;
  width:14.28%;
}
.calendar-month-bar .weekend span{
  padding-bottom: 10px;
  border-bottom: 2px solid #FF5523;;
}
.calendar-weeks-bar{
  font-size: 12px;
  border-bottom:1px solid #eee;
}
.calendar-weeks-bar th{
  height:30px;
}
.calendar-month-bar span,.calendar-weeks-bar span{
  font-weight:100;
}

.calendar-month-bar .weekend span,.calendar-weeks-bar .weekend span{
  color:#FF5523;
}
.ay-prev-icon, .ay-next-icon {
  position: absolute;
  left: 0;
  top: 15px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #E94709;
  border-radius: 0;
  border-top: none;
  border-right: none;
  transform: rotate(45deg);
  margin-left: 15px;
  line-height: 40px;
}
.ay-next-icon {
  transform: rotate(-135deg);
  left: auto;
  top: 14px;
  right: 15px;
}
.ay-prev-icon:before {
  display: block;
  width: 12px;
  height: 12px;
  border: 1px solid #E94709;
  border-width: 1px 0 0 1px;
  transform: rotate(315deg)
}
.is-weekend-highlight td.is-week-list-0,
.is-weekend-highlight td.is-week-list-6,
.is-weekend-highlight td.is-week-0,
.is-weekend-highlight td.is-week-6 {
  color: #E59313;
}
.booking-calendar a {
  text-decoration: none;
  tap-highlight-color: rgba(0, 0, 0, 0);
}
.calendar-year, .calendar-month {
  position: relative;
}
.calendar-header {
  line-height: 40px;
  font-size: 1.2em;
  overflow: hidden;
}
.calendar-header > div {
  float: left;
  width: 50%;
  text-align: center;
  overflow: hidden;
}
.calendar-header a:last-of-type {
  float: right;
  vertical-align: bottom;
}
.switch-btn, .calendar-title {
  display: inline-block;
  border-radius: 4px;
  line-height: 30px;
}
.switch-btn {
  width: 30px;
  margin: 5px;
  color: #39b5b8;
  font-family: "SimSun";
}
.calendar-title {
  padding: 0 6%;
  color: #333;
}
.switch-btn:active, .calendar-title:active, .calendar-header a.active {
  background-color: #39b5b8;
  color: #fff;
}
.calendar-week {
  overflow: hidden;
}
.calendar-week span {
  float: left;
  width: 14.28%;
  font-size: 1.6em;
  line-height: 34px;
  text-align: center;
}
.booking-calendar {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  transition: all .5s ease;
}
.booking-calendar td.is-today, .booking-calendar td.is-today.is-disabled {}
.calendar-enter, .calendar-leave {
  opacity: 0;
  transform: translate3d(0,-10px, 0);
}
.calendar:before {
  position: absolute;
  left:30px;
  top: -10px;
  content: "";
  border:5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #DEDEDE;
}
.calendar:after {
  position: absolute;
  left:30px;
  top: -9px;
  content: "";
  border:5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}
.calendar-tools{
  height:32px;
  font-size: 20px;
  line-height: 32px;
  color: #E94709;
}
.calendar-tools .float.left{
  float:left;
}
.calendar-tools .float.right{
  float:right;
}
.calendar-tools input{
  font-size: 20px;
  line-height: 32px;
  color: #E94709;
  width: 70px;
  text-align: center;
  border:none;
  background-color: transparent;
}
.calendar-tools>i{
  margin:0 16px;
  line-height: 32px;
  cursor: pointer;
  color:#707070;
}
.calendar-tools>i:hover{
  color:#5e7a88;
}
.booking-calendar table {
  clear: both;
  width: 100%;
  border-collapse: collapse;
  color: #444444;
}
.booking-calendar td {
  width:50px;
  height:50px;
  text-align: center;
  vertical-align: middle;
  font-size:17px;
  position: relative;

}
.booking-calendar td.othertabletd{
  height:60px;
}
.booking-calendar td b{
  font-weight:100;
  font-size:10px;
  display:block;
  height:10px;
}
.booking-calendar td b.price{
    color:#FF5523
}
.booking-calendar td b.air{
    margin-top: 3px;
    color:#999;
}
.booking-calendar td.week{
  pointer-events:none !important;
  cursor: default !important;
}
.booking-calendar td.is-disabled {
  color: #c0c0c0;
  pointer-events:none !important;
  cursor: default !important;
}
.booking-calendar td > span {
  display:block;
  line-height: 19px;
  text-align: center;
  word-break: keep-all;
  white-space: nowrap;
  overflow:hidden;
}
.booking-calendar td.weekend span {
  color:#FF5523;
}
.booking-calendar td.placeholder {

}
.booking-calendar td.current {
  background-color: #FF5523;
}
.booking-calendar td.current b{
  color: #fff;
}
.ay-calendar-range table {
  margin-bottom: 10px;
}
.booking-calendar td.current > span {
  color: #fff;
}
.booking-calendar .timer{
  margin:10px 0;
  text-align: center;
}
.booking-calendar .timer input{
  border-radius: 2px;
  padding:5px;
  font-size: 14px;
  line-height: 18px;
  color: #5e7a88;
  width: 50px;
  text-align: center;
  border:1px solid #efefef;
}
.booking-calendar .timer input:focus{
  border:1px solid #5e7a88;
}
.calendar-button{
  text-align: center;
}
.calendar-button button{
  border:none;
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  min-width: 8em;
  vertical-align: baseline;
  background:#5e7a88;
  color:#fff;
  margin: 0 .25em 0 0;
  padding: .8em 2.5em;
  font-size: 1em;
  line-height: 1em;
  text-align: center;
  border-radius: .3em;
}
.calendar-button button.cancel{
  background:#efefef;
  color:#666;
}

.booking-calendar .expand-transition {
  transition: all .3s ease;
  height: 40px;
  overflow: hidden;
}
/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.booking-calendar .expand-enter,.booking-calendar .expand-leave {
  height: 0;
  opacity: 0;
}
.weekendspan{
color:#FF5523;
}
</style>
