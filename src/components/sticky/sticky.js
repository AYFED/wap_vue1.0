// http://efe.baidu.com/blog/position-sticky/
var tag = true
// 检测iOS版本大于等于6
function gtIOS6 () {
  var userAgent = window.navigator.userAgent
  var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_.]+)/)
  return ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) >= 6)
}

// 判断是否支持sticky属性
function isSupportSticky () {
  var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-']
  var stickyText = ''
  for (var i = 0; i < prefixTestList.length; i++) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky'
  }
  // 创建一个dom来检查
  var div = document.createElement('div')
  var body = document.body
  div.style.cssText = 'display:none' + stickyText
  body.appendChild(div)
  var isSupport = /sticky/i.test(window.getComputedStyle(div).position)
  body.removeChild(div)
  div = null
  return isSupport
}

export default function (nav, options = {}) {
  let scrollBox = options.scrollBox || window
  let offset = options.offset || 0
  const checkStickySupport = options.checkStickySupport === true || false
  if (typeof scrollBox === 'string') {
    scrollBox = document.getElementById(scrollBox)
  }

  let getTop = function () {
    if (scrollBox === window) {
      return document.body.scrollTop
    } else {
      return scrollBox.scrollTop
    }
  }

  if (checkStickySupport && (gtIOS6() || isSupportSticky())) {
    // 大于等于iOS6版本使用sticky
    nav.classList.add('ay-sticky')
  } else {
    var navOffsetY = nav.offsetTop - offset
    nav.classList.add('ay-relative')
    scrollBox.addEventListener('scroll', function () {
      const distance = getTop()
      if(tag){
        navOffsetY = nav.offsetTop - offset
        tag = false
      }
      if(document.querySelector('.ay-fixed')){
        if (nav.classList.toString().indexOf("ay-fixed") == -1) {
          if(distance + document.querySelector('.ay-fixed').clientHeight*document.querySelectorAll('.ay-fixed').length >= navOffsetY){
            nav.style.top = offset + 'px'
            nav.classList.add('ay-fixed')
            nav.classList.remove('ay-relative')
          }else {
            //
          }
        }else{
          if(distance + document.querySelector('.ay-fixed').clientHeight*document.querySelectorAll('.ay-fixed').length >= navOffsetY){
            //
          }else {
            nav.style.top = '0px'
            nav.classList.remove('ay-fixed')
            nav.classList.add('ay-relative')
          }
        }
      }else{
        if (distance >= navOffsetY) {
          nav.style.top = offset + 'px'
          nav.classList.add('ay-fixed')
          nav.classList.remove('ay-relative')
        } else {
          nav.style.top = '0px'
          nav.classList.remove('ay-fixed')
          nav.classList.add('ay-relative')
        }
      }
    })
  }
}
