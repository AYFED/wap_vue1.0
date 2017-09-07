import format from '../datetime/format'

export function monthNumBtTow(str1,_arr,cidx){
    let m = cidx
    let _toDate = new Date(str1)
    let _toDateMonth = _toDate.getMonth()
    if(_toDate>=(new Date()) && _arr && _arr.length>0){
      for(let i=0;i<_arr.length;i++){
        if(_arr[i] == _toDateMonth+1 ){
            m = i
            break;
        }
      }
    }
    return m
}

export function zero (n) {
  return n < 10 ? '0' + n : n
}

export function splitValue (value) {
  let split = value.split('-')
  return {
    year: parseInt(split[0], 10),
    month: parseInt(split[1], 10) - 1,
    day: parseInt(split[2], 10)
  }
}

export function getPrevTime (year, month) {
  if (month === 0) {
    return {
      month: 11,
      year: year - 1
    }
  } else {
    return {
      year,
      month: month - 1
    }
  }
}

export function getNextTime (year, month) {
  if (month === 11) {
    return {
      month: 0,
      year: year + 1
    }
  } else {
    return {
      year,
      month: month + 1
    }
  }
}

function getTime (str) {
  if (typeof str === 'number') {
    return str
  }
  return typeof str === 'string' ? new Date(str.replace(/-/g, '/')).getTime() : str.getTime()
}

function isBetween (value, start, end, usedata) {
  let _reobj = {disbale:false,info:""}
  let _dateStr = value
  let lastRst = false
  value = getTime(value)
  let isGte = start ? value >= getTime(start) : true
  let isLte = end ? value <= getTime(end) : true
  if(usedata){
      lastRst = isGte && isLte && usedata[_dateStr]
  }else{
      lastRst = false
  }
  if(usedata && usedata[_dateStr]){
      _reobj.info = usedata[_dateStr]['info']
  }
  _reobj.disbale = lastRst
  return _reobj
}

function getCalendarInfo(cData,daysInfoKey,todaydate,_usearr){
  let re = {}
  let _temuseArr = []
  if(daysInfoKey && cData && cData.length>0){
    for(let p=0,q=cData.length;p<q;p++){
      for(let pp=0,qq=cData[p][daysInfoKey].length;pp<qq;pp++){
          let _ftdate = new Date(cData[p][daysInfoKey][pp].DepartDate)
          if(_ftdate>=todaydate){
              _usearr.push(_ftdate.getTime())
              _usearr.sort()
              re[format(new Date(cData[p][daysInfoKey][pp].DepartDate), 'YYYY/MM/DD')] = {'info':cData[p][daysInfoKey][pp]?cData[p][daysInfoKey][pp]:""}
          }
      }
    }
  }else{
      re = null
  }
  //按时间排序
  if(_usearr.length>0){
    for(let kk in _usearr){
        _usearr[kk] = new Date(_usearr[kk])
    }
  }
  return re
}

//获取显示的月份
function getShowMonthList(_arr,_useData){
    let _ob = {}
    let _temp = []
    if(!_useData){
      //没有数据传入默认显示当前月
        let _startmonth = (new Date()).getMonth()+1
        for(let ll=0;ll<5;ll++){
            _temp.push(_startmonth+ll)
        }/*0821*/
    }else{
        for(let pp=0,qq=_arr.length;pp<qq;pp++){
            _ob[_arr[pp].getFullYear()+''+(_arr[pp].getMonth()+1)] = _arr[pp].getMonth()+1
        }
        if(_ob){
            for(var _qq in _ob){
                _temp.push(_ob[_qq])
            }
        }
    }
    //最多显示7个月的数据
    return _temp.slice(0,7)
}

export function getDays ({year, month, value, isRange = false, rangeBegin, rangeEnd, returnSixRows = true, disablePast = false, disableFuture = false,calendarData=null,daysInfoKey=null}) {
    let showMonthList = []
    let startOfToday = new Date()
    let today = format(startOfToday, 'YYYY-MM-DD')
    let _usearr = []//用来判断传入的数据最早的日期
    //处理日历的价格信息等信息
    let _useData = getCalendarInfo(calendarData,daysInfoKey,startOfToday,_usearr)
    let _lastDateHasData = format(_usearr[0]?_usearr[0]:startOfToday, 'YYYY-MM-DD')
    showMonthList =  getShowMonthList(_usearr,_useData)
    startOfToday.setHours(0, 0, 0, 0)
    let trueJumpDate = _lastDateHasData
    if((new Date(_lastDateHasData))<=(new Date(value))){
        trueJumpDate = value
    }
    let _splitValue = splitValue(trueJumpDate || today)

    // if year or month is not specified, get them from value
    if (typeof year !== 'number' || typeof month !== 'number' || month < 0) {
      year = _splitValue.year
      month = _splitValue.month
    }
    // if disablePast === true
    if (disablePast) {
      if (!rangeBegin) {
        rangeBegin = startOfToday
      } else {
        rangeBegin = Math.max(startOfToday.getTime(), getTime(rangeBegin))
      }
    }

  // if disableFuture === true
  if (disableFuture) {
    if (!rangeEnd) {
      rangeEnd = startOfToday
    } else {
      rangeEnd = Math.min(startOfToday.getTime(), getTime(rangeEnd))
    }
  }

  var firstDayOfMonth = new Date(year, month, 1).getDay()
  var lastDateOfMonth = new Date(year, month + 1, 0).getDate()
  var lastDayOfLastMonth = new Date(year, month, 0).getDate()

  var i
  var line = 0
  var temp = []
  for (i = 1; i <= lastDateOfMonth; i++) {
    var dow = new Date(year, month, i).getDay()
      // 第一行
    if (dow === 0) {
      temp[line] = []
    } else if (i === 1) {
      temp[line] = []

      var k = lastDayOfLastMonth - firstDayOfMonth + 1
      for (let j = 0; j < firstDayOfMonth; j++) {
        let rs = getPrevTime(year, month)
        temp[line].push({
          year: rs.year,
          month: rs.month,
          month_str: rs.month + 1,
          day: k,
          disabled: true,
          isLastMonth: true
        })
        k++
      }
    }

    let _format = format(new Date(year + '/' + (month + 1) + '/' + i), 'YYYY/MM/DD')
    let _reInfo = isBetween(_format, rangeBegin, rangeEnd,_useData)
    let options = {
      year: year,
      month: month,
      month_str: month + 1,
      day: i,
      isCurrent: value && format(new Date(value), 'YYYY/MM/DD') === _format,
      islast:((new Date(year+'/'+(month + 1)+'/'+i+'/00:00:00')).getTime() < (new Date(today+' 00:00:00')).getTime()),
      disabled: !_reInfo.disbale,
      isToday: format(new Date(), 'YYYY/MM/DD') === _format,
      info:_reInfo.info
    }
    temp[line].push(options)

    if (dow === 6) {
      line++
    } else if (i === lastDateOfMonth) {
      let k = 1
      for (dow; dow < 6; dow++) {
        let rs = getNextTime(year, month)
        temp[line].push({
          year: rs.year,
          month: rs.month,
          month_str: rs.month + 1,
          day: k,
          disabled: true,
          isNextMonth: true,
          info:""
        })
        k++
      }
    }
  }

  if (returnSixRows && temp.length === 5) {
    let rs = getNextTime(year, month)
    let start = temp[4][6].isNextMonth ? temp[4][6].day : 0
    temp[5] = []
    for (let i = 0; i < 7; i++) {
      temp[5].push({
        year: rs.year,
        month: rs.month,
        month_str: rs.month + 1,
        day: ++start,
        disabled: true,
        isNextMonth: true,
        info:""
      })
    }
  }

  // 2026-02, there is only 4 lines
  if (returnSixRows && temp.length === 4) {
    let rs = getNextTime(year, month)
    let start = 0
    temp[5] = []
    temp[6] = []
    for (let i = 0; i < 7; i++) {
      temp[5].push({
        year: rs.year,
        month: rs.month,
        month_str: rs.month + 1,
        day: ++start,
        disabled: true,
        isNextMonth: true,
        info:_reInfo.info
      })
      temp[6].push({
        year: rs.year,
        month: rs.month,
        month_str: rs.month + 1,
        day: ++start,
        disabled: true,
        isNextMonth: true,
        info:""
      })
    }
  }

  return {
    year: year,
    month: month,
    month_str: month + 1,
    days: temp,
    showMonthList:showMonthList
  }
}
