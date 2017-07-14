import AlertComponent from '../../components/alert'

let $vm
let watcher

export default {
  install (vue) {
    if (!$vm) {
      const Alert = vue.extend(AlertComponent)
      $vm = new Alert({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const alert = {
      show (options) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'object') {
          for (let i in options) {
            if (i !== 'content') {
              $vm[i] = options[i]
            } else {
              $vm.$el.querySelector('.ay_dialog_bd').innerHTML = options['content']
            }
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
        alert
      }
    } else {
      vue.$ay.alert = alert
    }

    vue.mixin({
      created: function () {
        this.$ay = vue.$ay
      }
    })
  }
}
