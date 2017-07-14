<template>
  <div class="devil-calendar">
    <div class="toptable">
      <table class="headtable">
        <thead>
          <tr class="calendar-weeks-bar">
            <th v-for="(index, week) in weeksList" :class="$index==0||$index==6?'weekend':''"><span>{{week}}</span></th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="contenttable">
      <table class="caltable" v-for="(tableindex,cal) in calendars">
        <tbody>
        <tr v-if="$index==0" class="titletr">
          <td colspan="7" class="devil-cal-{{year}}-{{month}}">{{year}}年{{month}}月</td>
        </tr>
        <tr v-else="$index>0" class="titletr">
          <td colspan="7" class="devil-cal-{{cal.year}}-{{cal.month}}">{{cal.year}}年{{cal.month}}月</td>
        </tr>
        <tr v-for="wk in 6">
          <td v-for="dk in 7" :class="cal.data[wk*7+dk].cls" v-on:click="cellClickFunc(tableindex,wk,dk,$event.currentTarget)">{{{customslotfunc(cal.data[wk*7+dk],dk,outerdata)}}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import format from '../datetime/format'
import {getFestival} from './util'
import props from './props'
let _td = new Date()
let _tdDateStr = format(_td, 'YYYY-MM-DD')
export default {
  props: props(),
  data () {
    return {
      calendars:[],
      trueusecalendars:[],
      selecteddays:[],
      limitdate:null,//今天的日期
      year: _td.getFullYear(),
      month: _td.getMonth()+1,
      days: [1,2],
      current: [],
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      weeksList:['日', '一', '二', '三', '四', '五', '六 '],
      alertTd:[],
      tdMap:{},
      lastcheckedStr:'',
      rangeDateModeArr:[]
    }
  },
   watch: {
    calendarDateRange (val) {
      this.render()
    }
  },
  methods: {
    makeData:function(){
      let _tempcal = []
      let _usecal = []
      let count = 0
      let arrayStr = ""
      this.rangeDateModeArr = []//清空区间
      if(this.calendarDateRange && this.calendarDateRange.length>0){
        if(this.dateRangeMode){
            let _sd,_ed = ''
            if(this.calendarDateRange.length>1){
                _sd = this.calendarDateRange[0]
                _ed = this.calendarDateRange[1]
            }else{
                _sd = this.startDate==''?_tdDateStr:this.startDate
                _ed = this.calendarDateRange[0]
            }
            this.rangeDateModeArr = this.takeBetweenDate(_sd,_ed)
            if(this.rangeDateModeArr && this.rangeDateModeArr.length>0){
                arrayStr = this.rangeDateModeArr.toString()
            }
        }else{
            arrayStr = this.calendarDateRange.toString()
        }
      }
      for(var i=0;i<this.canuseMonth.length;i++){
        let _data = [],y = this.canuseMonth[i].year,m = this.canuseMonth[i].month,d = 1
        let _startnum = this.dayOfMonth(y,m,d)
        let _endnum = this.countDays(y,m)
        for(var q=0;q<42;q++){
          if( q>_startnum-1 && q<_startnum+_endnum){
            let _cellobj = {num:q-_startnum+1,cls:'',disabled:false,useidx:-1}
            let _celldate = new Date(y,m-1,q-_startnum+1)
            let _celldateStr = format(_celldate, 'YYYY-MM-DD')
            if(_celldateStr == _tdDateStr){
              _cellobj.num="今天"
              if(this.onlyshowfestival){
                _cellobj.usefestival=true
              }
            }
            if((_celldate<this.limitdate) || (arrayStr != "" && arrayStr.indexOf(_celldateStr) == -1)){
                _cellobj.cls="is-disabled"
                _cellobj.disabled=true
            }else{
                _cellobj.daystr = _celldateStr
                if(this.showfestival || this.onlyshowfestival){
                    let _fest = getFestival(_celldateStr)
                    if(_fest.length>0 && _fest[0] != ""){
                        if(this.onlyshowfestival){
                            _cellobj.num = _fest[0]
                            _cellobj.usefestival=true
                        }else{
                            _cellobj.festval = _fest[0]
                        }
                    }
                }
                count++
                _cellobj.useidx = count
                _usecal.push(_cellobj)
                this.tdMap[_celldateStr] = count
            }
            _data.push(_cellobj)
          }else{
            _data.push({num:'',disabled:true,useidx:-1})
          }
        }
        _tempcal[i] = {data:_data,year:y,month:m}
      }
      this.calendars = _tempcal
      this.trueusecalendars = _usecal
      if(this.checkedDates && this.checkedDates.length>0){
        this.makechecked()
      }
    },
    makechecked:function(){//根据传入的数据选中
      let _usenum = 0
      let _ttemp = []
      for(let nn=0,mm=this.checkedDates.length;nn<mm;nn++){
        let _dateindex = this.checkedDates[nn]
        if(this.tdMap.hasOwnProperty(_dateindex)){
          let _cancheckindex = this.tdMap[_dateindex]
          _ttemp.push(this.trueusecalendars[_cancheckindex-1])
          if(_usenum==0){
              let _temckdate = new Date(_dateindex)
              this.lastcheckedStr = 'devil-cal-'+_temckdate.getFullYear()+'-'+(_temckdate.getMonth()+1)
              _usenum ++
          }
        }
      }
      if(_ttemp.length>1){
        for(let nn=0,mm=_ttemp.length;nn<mm;nn++){
          if(nn==0 || nn == mm-1){
            _ttemp[nn].cls = 'current'
            this.alertTd.push(_ttemp[nn])
          }else{
            _ttemp[nn].cls = 'btw'
            this.selecteddays.push(_ttemp[nn])
          }
        }
      }else if(_ttemp.length == 1){
        //单一日期加两遍
        _ttemp[0].cls = 'current'
        this.alertTd.push(_ttemp[0])
        this.alertTd.push(_ttemp[0])
      }
    },
    dayOfMonth:function(y,m,d){
      return (new Date(y, m-1, d)).getDay()
    },
    countDays:function(y,m){
      var curDate = new Date(y,m,0);
      return curDate.getDate();
    },
    takeLimit:function(ob1,ob2){
        let _max = Math.max(ob1.useidx,ob2.useidx)
        let _min = Math.min(ob1.useidx,ob2.useidx)
        if(_max == _min){
          return {max:_max,_min:_min,hasmidle:false}
        }else{
          return {max:_max,min:_min,hasmidle:true}
        }
    },
    clearSelected:function(){
        for(let pp=0,qq=this.selecteddays.length;pp<qq;pp++){
          this.selecteddays[pp].cls = ''
        }
        for(let pp=0,qq=this.alertTd.length;pp<qq;pp++){
          this.alertTd[pp].cls = ''
        }
    },
    cellClickFunc:function(tdidx,row,col,et){
    let ob = this.calendars[tdidx]['data'][row*7+col]
    if(ob.num != ""){
        this.clearSelected()
        if(this.singleSelect){
          this.selecteddays = []
          ob.cls = 'current'
          this.alertTd = []
          this.alertTd.push(ob)
          this.afterselectedfunc(this.seletedDates)
        }else{
          if(this.alertTd.length<2){
            if(this.alertTd.length>0){
              this.alertTd[0].cls = 'current'
            }
            ob.cls = 'current'
            this.alertTd.push(ob)
          }else{
            this.alertTd = []
            ob.cls = 'current'
            this.alertTd.push(ob)
          }
            if(this.alertTd.length>1){
              this.selecteddays = []
              let limitobj = this.takeLimit(this.alertTd[0],this.alertTd[1])
              if(limitobj.hasmidle){
                for(let p=limitobj.min,q=limitobj.max-1;p<q;p++){
                    this.trueusecalendars[p].cls = 'btw'
                    this.selecteddays.push(this.trueusecalendars[p])
                }
              }
              this.afterselectedfunc(this.seletedDates)
            }
        }
      }
    },
    clearCalendar:function(){
      for(let i=0;i<this.alertTd.length;i++){
        this.alertTd[i].cls = ''
      }
      for(let pp=0,qq=this.selecteddays.length;pp<qq;pp++){
        this.selecteddays[pp].cls = ''
      }
      this.alertTd = []
      this.selecteddays = []
      this.checkedDates = []
      return this.seletedDates
    },
    checkDatesByArray:function(_arr){
        if(_arr instanceof Array ){
            this.clearCalendar()
            this.checkedDates = _arr
            if(this.checkedDates && this.checkedDates.length>0){
                this.makechecked()
            }
        }
        if(_arr.length>0){
            this.scrolluse(_arr[0])
        }
        return this.seletedDates
    },
    takeDateInfo:function(_arr){
        if(_arr instanceof Array ){
            let temparr = []
            for(let hh=0,gg=_arr.length;hh<gg;hh++){
                let _tempfest = getFestival(_arr[hh])
                let _temdate = new Date(_arr[hh])
                temparr.push({daystr:_arr[hh],fest:_tempfest,day:_temdate.getDay(),truemonth:_temdate.getMonth()+1,year:_temdate.getFullYear()})
            }
            return temparr
        }else{
            return []
        }
    },
      scrolluse:function(_str){
          let _strr = ''
          if(_str){
              let _temckdate = new Date(_str)
              _strr = '.devil-cal-'+_temckdate.getFullYear()+'-'+(_temckdate.getMonth()+1)
          }else if(this.lastcheckedStr){
              _strr = this.lastcheckedStr
          }
          try{
              if(document.querySelector(_strr)){
                  let _topnum = document.querySelector(_strr).offsetTop
                  document.querySelector('.contenttable').scrollTop = _topnum
              }
          }catch(e){
          }
      },
    takeBetweenDate(_sd,_ed){
        let bd = new Date(_sd),be = new Date(_ed);
        let bd_time = bd.getTime(), be_time = be.getTime(),time_diff = be_time - bd_time;
        let d_arr = [];
        for(let i=0; i<= time_diff; i+=86400000){
            let ds = new Date(bd_time+i);
            d_arr.push(format(ds, 'YYYY-MM-DD'))
        }
        return d_arr
    },
    getFormatDateStr(_usestr){
        return _usestr.replace(/\-/g, "/")
    },
    changeStart(_starstr){
        this.startDate = _starstr
        this.limitdate = new Date(this.getFormatDateStr(_starstr)+" 00:00:00")
        this.year =  this.limitdate.getFullYear()
        this.month =  this.limitdate.getMonth()+1
    },
    render:function(){
        this.tdMap = {}
        if(this.calendarDateRange && this.calendarDateRange.length>0){
          let _startdate = new Date(this.calendarDateRange[0])
          if(this.dateRangeMode && this.calendarDateRange.length == 1 && _startdate>this.limitdate){
              this.year  = this.limitdate.getFullYear()
              this.month = this.limitdate.getMonth()+1
          }else{
              this.year = _startdate.getFullYear()
              this.month = _startdate.getMonth()+1
          }
        }
        this.makeData()
    }
  },
  computed:{
    seletedDates:function(){
      //返回按顺序排列的日期数组
      let _temp1 = []
      let _temp2 = []
      if(this.alertTd.length==2 && this.alertTd[0]==this.alertTd[1]){
          _temp1 = [this.alertTd[0]]
      }else{
        let _tempalerttd = this.alertTd
        if(_tempalerttd.length == 2){
          if((new Date(this.alertTd[0].daystr)) > (new Date(this.alertTd[1].daystr)) ){
            _tempalerttd.reverse()
          }
          _temp1 = this.selecteddays
          _temp1.unshift(this.alertTd[0])
          _temp1.push(this.alertTd[1])
        }else{
          _temp1 = this.selecteddays.concat(this.alertTd)
        }
      }
      for(let pp=0,qq=_temp1.length;pp<qq;pp++){
        _temp2.push(_temp1[pp].daystr)
      }
      return _temp2
    },
    canuseMonth:function(){
      let _arr = []
      let monthObj = {}
      let monthObjArr = []
      if(this.calendarDateRange && this.calendarDateRange.length>0){
        let _usearr = this.calendarDateRange
        if(this.dateRangeMode){
            _usearr = this.rangeDateModeArr
        }
        for(let pp = 0,qq = _usearr.length;pp<qq;pp++){
          let _tempmonth = new Date(_usearr[pp])
          let _tempstr = _tempmonth.getFullYear()+""+(_tempmonth.getMonth()+1)
          monthObj[_tempstr] = {year:_tempmonth.getFullYear(),month:_tempmonth.getMonth()+1,dt:_tempmonth}
        }
        for(let tt in monthObj){
          if(monthObj[tt].hasOwnProperty('year')){
              _arr.push(monthObj[tt])
          }
        }
        //按照日期排序
        _arr.sort(function(a,b){
            return a.dt-b.dt
        })
      }else{//没有给定区间的情况默认从当天开始根据配置生成月份
          for(let num=0;num<this.calnum;num++){
              let _newdate = new Date(this.limitdate.getFullYear(),this.limitdate.getMonth()+num,1)
              _arr.push({year:_newdate.getFullYear(),month:_newdate.getMonth()+1,dt:_newdate})
          }
      }
        return _arr
    }
  },
  created(){
      if(this.startDate != ''){
          this.limitdate = new Date(this.getFormatDateStr(this.startDate)+" 00:00:00")
          this.year =  this.limitdate.getFullYear()
          this.month =  this.limitdate.getMonth()+1
      }else{
          this.limitdate = new Date(this.getFormatDateStr(_tdDateStr)+" 00:00:00")
      }
  },
  ready () {
      this.render()
      setTimeout(() => {
              this.scrolluse()
      }, 1000)

        }
    }
</script>

<style>
  .toptable {
    z-index:2;
    padding: 0 10px;
    background-color: #F5F5F5;
    background: #F5F5F5;
    position: fixed;
    width: 100%;
    box-sizing: border-box
  }
  .contenttable{
    position: absolute;
    top: 30px;
    left: 0;
    padding: 2px 10px 0 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .contenttable::-webkit-scrollbar {
    -webkit-appearance: none !important;
    display: none !important;
  }

  .devil-calendar .alertContent{
    background-color:#FFAB0A;
    height:40px;
    position:absolute;
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
    width:50px;
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
  .devil-calendar a {
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
  .devil-calendar {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 2px;
    transition: all .5s ease;
  }
  .devil-calendar td.is-today, .devil-calendar td.is-today.is-disabled {}
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
  .devil-calendar table {
    margin: 0 auto;
    clear: both;
    border-collapse: collapse;
    color: #444444;
  }
  .devil-calendar .headtable {
  }
  .devil-calendar .caltable {
    margin:auto;
  }
  .devil-calendar td {
    width:50px;
    height:50px;
    text-align: center;
    vertical-align: middle;
    font-size:17px;
    position: relative;

  }

  .devil-calendar td span.onlyfestival{
    font-size:15px;
  }
  .devil-calendar .titletr td{
    height:30px;
    margin: auto;
    border-bottom: 1px solid #DFDFDF;
    font-size:14px;
  }
  .devil-calendar td.othertabletd{
    height:60px;
  }
  .devil-calendar td b{
    font-weight:100;
    font-size:10px;
    display:block;
    height:10px;
  }
  .devil-calendar td b.price{
    color:#FF5523
  }
  .devil-calendar td b.air{
    margin-top: 3px;
    color:#999;
  }
  .devil-calendar td.week{
    pointer-events:none !important;
    cursor: default !important;
  }
  .devil-calendar td.is-disabled {
    color: #c0c0c0;
    pointer-events:none !important;
    cursor: default !important;
  }
  .devil-calendar td > span {
    display:block;
    line-height: 19px;
    text-align: center;
    word-break: keep-all;
    white-space: nowrap;
    overflow:hidden;
  }
  .devil-calendar td.placeholder {

  }
  .devil-calendar td.current {
    background-color: #FF5523;
  }
  .devil-calendar td.current b{
    color: #fff;
  }
  .ay-calendar-range table {
    margin-bottom: 10px;
  }
  .devil-calendar td.current > span,.devil-calendar td.btw{
    color: #fff;
  }
  .devil-calendar td.btw {
    background-color: rgba(255,163,34,0.30);
  }
  .devil-calendar td.btw span,.devil-calendar td.btw b{
    color:#fff;
  }
  .devil-calendar .timer{
    margin:10px 0;
    text-align: center;
  }
  .devil-calendar .timer input{
    border-radius: 2px;
    padding:5px;
    font-size: 14px;
    line-height: 18px;
    color: #5e7a88;
    width: 50px;
    text-align: center;
    border:1px solid #efefef;
  }
  .devil-calendar .timer input:focus{
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

  .devil-calendar .expand-transition {
    transition: all .3s ease;
    height: 40px;
    overflow: hidden;
  }
  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .devil-calendar .expand-enter,.devil-calendar .expand-leave {
    height: 0;
    opacity: 0;
  }
  .devil-calendar .weekendspan{
    color:#FF5523;
  }
  .devil-calendar .is-disabled .weekendspan{
    color:#c0c0c0;
  }
</style>
