import ToastComponent from '../../components/toast'

let $vm
let watcher

export default {
  install (vue, options) {
    const Toast = vue.extend(ToastComponent)

    if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const toast = {
      show (options) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          for (let i in options) {
            $vm[i] = options[i]
          }
        }
        if (options.onShow || options.onHide) {
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        $vm.show = true
      },
      hide () {
        $vm.show = false
      }
    }

    // all ay's plugins are included in this.$ay
    if (!vue.$ay) {
      vue.$ay = {
        toast
      }
    } else {
      vue.$ay.toast = toast
    }

    vue.mixin({
      created: function () {
        this.$ay = vue.$ay
      }
    })
  }
}
