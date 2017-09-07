// not a good way but works well
window.__$ayPopups = window.__$ayPopups || {}
const popupDialog = function (option) {
  this.uuid = Math.random().toString(36).substring(3, 8)
  this.params = {}
  this.isShow = false
  if (Object.prototype.toString.call(option) === '[object Object]') {
    this.params = {
      input: option.input || '',
      container: document.querySelector(option.input) || '',
      innerHTML: option.innerHTML || '',
      hideOnBlur: option.hideOnBlur,
      onOpen: option.onOpen || function () {},
      onClose: option.onClose || function () {}
    }
  }
  if (!!document.querySelectorAll('.ay-popup-mask').length <= 0) {
    this.divMask = document.createElement('a')
    this.divMask.className = 'ay-popup-mask'
    this.divMask.href = 'javascript:void(0)'
    document.body.appendChild(this.divMask)
  }
  let div
  if (!option.container) {
    div = document.createElement('div')
  } else {
    div = option.container
  }
  div.className = 'ay-popup-dialog ay-popup-dialog-' + this.uuid

  if (!option.container) {
    document.body.appendChild(div)
  }
  this.mask = document.querySelector('.ay-popup-mask')
  this.container = document.querySelector('.ay-popup-dialog-' + this.uuid)
  this._bindEvents()
  option = null
  return this
}

popupDialog.prototype.onClickMask = function () {
  if (this.params.hideOnBlur && this.isShow) {
    this.hide(false)
  }
}

popupDialog.prototype._bindEvents = function () {
  this.params.hideOnBlur && this.mask.addEventListener('click', this.onClickMask.bind(this), false)
  this.params.hideOnBlur && this.mask.addEventListener('touchmove', function(event){event.preventDefault()}, false)
}

popupDialog.prototype.show = function () {
  this.mask.classList.add('ay-popup-show')
  this.container.classList.add('ay-popup-show')
  this.params.onOpen && this.params.onOpen(this)
  this.isShow = true
  window.__$ayPopups[this.uuid] = 1
}

popupDialog.prototype.hide = function (shouldCallback = true) {
  this.container.classList.remove('ay-popup-show')
  if (!document.querySelector('.ay-popup-dialog.ay-popup-show')) {
    this.mask.classList.remove('ay-popup-show')
  }
  shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this)
  this.isShow = false
  delete window.__$ayPopups[this.uuid]
}

popupDialog.prototype.html = function (html) {
  this.container.innerHTML = html
}

popupDialog.prototype.destroy = function () {
  this.mask.removeEventListener('click', this.onClickMask.bind(this), false)
  this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask)
  delete window.__$ayPopups[this.uuid]
}

export default popupDialog
