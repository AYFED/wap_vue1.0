<template>
  <header class="ay-header-bar">
    <div class="ay-header-btn is-right">
      <slot name="right"></slot>
    </div>
    <div class="ay-header-btn is-left">
      <slot name="left"></slot>
    </div>
    <h1 class="ay-header-title" @click="$emit('on-click-title')">{{title}}<slot></slot></h1>

  </header>
</template>

<script>
export default {
  props: {
    leftOptions: {
      type: Object,
      default () {
        return {
          showBack: true,
          backText: 'Back',
          preventGoBack: false
        }
      }
    },
    title: String,
    transition: String,
    rightOptions: {
      type: Object,
      default () {
        return {
          showMore: false
        }
      }
    }
  },
  methods: {
    onClickBack () {
      if (this.leftOptions.preventGoBack) {
        this.$emit('on-click-back')
      } else {
        window.history.back()
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.ay-header-bar {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  box-sizing: border-box;
  background-color: @x-header-background-color;
  z-index: 3;


  .ay-header-title, h1 {
    margin: 0 50px;
    text-align: center;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: @x-header-title-color;
    -webkit-font-smoothing: antialiased;
  }

  .ay-header-btn{
    box-sizing: border-box;
    width: 40px;
    height: 44px;
    font-size: 14px;
    line-height: 21px;
    color: @x-header-text-color;
    span{
      display: block;
      height: 20px;
      text-align: center;
    }
  }
  .is-left{
    float: left;
    span{
      margin: 11px 0 11px 20px;
    }
  }
  .is-right{
    float: right;
    span{
      margin: 11px 20px 11px 0;
    }
  }
}
.headshade{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 44px;
  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  z-index: 1;

}
.whitetheme{
  .ay-header-bar{
    background-color: #fff;
    border-bottom: 1px solid #DFDFDF;
  }
  .ay-header-title,h1{
    color:#333333;
  }
  .icon-arrow{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAAXNSR0IArs4c6QAAAVlJREFUSA2t1rtKxUAQBmA3ly7VsQ1IGitBJJfG0lKwEivBwofQU9npS5zCwsfQOpBU+gqSUluLkMSZGEMOJ5eZ2R1ISBbmy08gk7X3DFSSJIe+76+KovhWul4YhvdgPKJj2/appQPGcbyG/ic4MJiq6/pAnBAxANpkGEop9RoEwbkIHMNc171I0/SHDc5hbVI8UWsJQ4eckIKRQSpGAjnYIsjFZkEJNglKsVFQB9sBdbEt0ATWg6awFoyi6LZpmg3eYOHU+P/Q/1Z4Zwuwq0HLhw6GjgWJPgfgUVmWl4N79qUFdQdd710nJn6Gd3rNlrqGdtrAT2a/qqo3WDvu1mt40E2e5y9cuB9fptAexCQm0C3QBLoD6qKjoA46CUrRWVCCLoJclARyUDJIRVkgBWWDS6gInEIdxzkRbzizLPuCHesZ4P3og4kViRNiSiwcKLDxfIBL5Xne+hcZYijicZw0+QAAAABJRU5ErkJggg==");
  }
  .icon-share{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAAXNSR0IArs4c6QAAA91JREFUWAnNmE1oE1EQx3eT2B6aQmttDk0OGvADRCokKdSDtAfroUW0EjxIUbz1UlAQ6ldtKwjiQeuhXqyIgqD1IEpaS8HWQ8DmA6R48pIiNLW0pKA5xKRJ/E+6UzZh093sbooPNjPvvXkzv8z72JcIwi4Vj8fTqTWUVauhETufz3cvn89POJ1OIR6Pf1HzJbIBBh7P5XI3RVH0wsEBbleTsPdHIpF35ewICH5vc7/FYrkbDodHua4kLdSI1PZjYAiqvxIgGguoRpJKpRSIbBBnBO1DSvbcZmlra2tFZQzPHm40QyoBsV81MFs2m73FQPjWQaT3SigU+sEO9EhkflQ+ZfCbxQwUrV8JTFCaSpo+Hwc2Cwj+7rBPyACACssEeh6An7ivXMbIeD8bmZEh+CoCwhftRxtvqPXm5uazpWDIrHyMwN+AuXRLmrJSILfb3Yss7ZM5jU9PT/8lMLTNyNpH5WCmQMHhiBLQ5ORkGplycnBkKE46gdXX15cFMwyFXdaLOPItHnA4HOcJiACQqSMkqUBfKij4mJ+fTymBeb3e64ahuru73yMDrygY5BQBUSY4OECOsQ65KNOVwDasVutnw1DDw8O5np6eywC6irXSKwciAEDROVgomMoiKGrkjGH8G5vNdmphYSEqYj3kt4YIQjQa5V3CTYYkDuYmnINrcIKY4qbdbm8ERFLNqeFM7RQA51AnAZENMvZVCxDZVhUK/s9QECqYutktTf2zalBdXV11yA7tTC4fWFGTVYNKJBIXELxOAljEO+6bGgz3VwXK7/dbkaVBDoJF/oJ1LbIqULFY7CKCHyQAACVqa2ufaYFhGxsrZsn29va96XT6IftDxh4Fg8E/XC8n8WY4Sn01NTUbpkNlMplx+HZIwX/iVfJY0ncUOD6+k0EqlTL3SMBBPIjM0AIvFExdv9aziceQNG1NAega/N2XOX+KHxRTsrpm1fD0dXR02JLJ5ANkiKC4zGHaBrhSqTQEhcV5EkDjACosUin4HOQ5TNtmpTBsrwsKL1ovFuYYnhPsSJJvcdvs47tUSZ/mqi4oZKYBzzYQFvRvPEO44z+B3L51aKYoMdQFhQzxK4Nul68BcgOvkV+QJe71VXVB4d61jmvrJdwSZ3ApW9UXuvwoXVDkDtv9ZXm3xnpMO6eMYRSP/j+hsDhjzImtfoj13ZRYn4c5HvFYsLUj3IBd9Xy3waR4E8wAnrCIxlb84gij0dS/gjhIhTKDHe2zLi8vr7a0tKxh8Gk8RX/XVOjQqHkGDgawqwMFiJWVlYjL5fqI1DWhow5Pg9EIFYxfgu0sMtRHQDTuHzHhf5wK3TahAAAAAElFTkSuQmCC");
  }

}

.ay-header-bar.ay-header-title > span {
  display: inline-block;
}
.ay-header-bar .ay-header-left,.ay-header-bar .ay-header-right {
  position: absolute;
  width: 40px;
  height: 44px;
  font-size: 14px;
  line-height: 21px;
  color: @x-header-text-color;
}
.ay-header-bar .ay-header-left a,.ay-header-bar .ay-header-left button,.ay-header-bar .ay-header-right a,.ay-header-bar .ay-header-right button {
  float: left;
  margin-right: 8px;
  color: @x-header-text-color;
}
.ay-header-bar .ay-header-left a:active,.ay-header-bar .ay-header-left button:active,.ay-header-bar .ay-header-right a:active,.ay-header-bar .ay-header-right button:active {
  opacity: .5
}
.ay-header-bar .ay-header-left {
  left: 18px;
}
.ay-header-bar .ay-header-left .ay-header-back {
  padding-left: 16px
}
.ay-header-bar .ay-header-left .left-arrow {
  position: absolute;
  width: 30px;
  height: 30px;
  top: -5px;
  left: -5px;
  -webkit-tap-highlight-color:rgba(255,255,255,0);

  &:before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid @x-header-arrow-color;
    border-width: 1px 0 0 1px;
    transform: rotate(315deg);
    top: 8px;
    left: 7px;
  }
}
.ay-header-bar .ay-header-right {
  right: 15px
}
.ay-header-bar .ay-header-right a,.ay-header-bar .ay-header-right button {
  margin-left: 8px;
  margin-right: 0
}
.ay-header-bar .ay-header-right .ay-header-more:after {
  content: "\2022\0020\2022\0020\2022\0020";
  font-size: 16px;
}
.ay-header-fade-in-right-enter {
  animation: fadeinR .5s;
}
.ay-header-fade-in-left-enter {
  animation: fadeinL .5s;
}
.icon-arrow{
  display: block;
  width: 20px;
  height: 37px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAAXNSR0IArs4c6QAAAK1JREFUSA1jYKAC+P//vxoQq1LBKAYGoEEVQPwPii0pMhRoSCUQI4MIsg0EmoJu2G6gGBtZBuIwjHPUMNwhMBpmuMMGl8xomOEKGdzi1A6zZKCByABUapCX0UFuBmreiWTaRYoMA5rHBMSPQQZDgQ6QDoFxyKKBLhIG4gtIrvwLZMeQZRhM06iho2E6mqQQWWo0R9GmQNGDFThk0VhKqSSyDELWBDV0EpCeDMQ8AENl84CRONqNAAAAAElFTkSuQmCC");
}
.icon-share{
  display: block;
  width: 20px;
  height: 37px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAAXNSR0IArs4c6QAAAt1JREFUWAnNmDtoFGEQx3OnJoKKoIIi2GphESXaWAiClYiFWKcQBG3iAwULH6i1rZ1KrNTaFwhWCkIsIlhZuFgqKAhpNOL5m3NmnX3c3vft3iMDw8x+38x/fvfdZW9zExMjsk6nc2hEo8LGAHQLF7se1qFVNOzBH+Of8Bg7UTUIIQMyzWtV9eke1WfwX9YVGU+lQrkEnTyQSVeDUTWN1wWSIaVQrPcCkh6x3mBsyltm9ppkZ+4FR1+icdMENf7OXdtlORi7iVUQhwH0BN0/OkPic80tFMFsR2L0keQakMifkADtEG21r8QpPA92NSNl1RIzG5EXtJcBTbK+V7TVFkWWXMBe2KLG/2B+I5IjLUfjhtchlxOaVICjbu+ZNbG2Fi8Hcw21Tor+416DXICm3PCLbv+OrStwGdglOcrUfENoTnMbf6AiT4kpkA6e1z0Jp/O6rHmw71zPNIbSwQJ2Ds8A6d4i62YH8lBaI2AP8ZnuvlVLLGtosobkZtxuB8vk60P02iFFDWrkyaCl/W9brdZSiNawoY45iJcur0450tSqK+N2EV2HL6XiPIUEK7imgX6m0D3ptN8HA0mhaxwYFJqr8I9O+/xKgJp1QN/IN4wVCoBN+BcHdSUEiPrd6tsH/vYhLDdBs88kQfcma5A4UCj0Lntx8iMhpyQ1vi97EapQUofoBdzu3jIj8+Vb0pJZkgazxlAIrcZvm6DGV7Kemdrnwvc3gkLoIP7BC5IL0MY+DIVtr1ELCoF9+BsvpPkjYvfhrjC1z4LXqgt12IuQ/8DP4vbl2wehuO316kJtUZGfxPv4tuKYuBXV64ZaUDKO7ll8a9zo3tUeqiUXVsrzTu3jN4260XMM+3mqFuOKhUrs5XCEjf9tN62YyNxdrj6Rk3rnFu6NGkzn3XUMC/JBn2ZhAV/jNsaVLjN4f5s/OHlUncNlYZwm8+eU5x8HJ2Y/Lybko7SEYfIbmbxjXfsLTJkSG5HZr6UAAAAASUVORK5CYII=");
}
@keyframes fadeinR{
  0%{opacity:0;transform:translateX(80px);}
  100%{opacity:1;transform:translateX(0);}
}
@keyframes fadeinL{
  0%{opacity:0;transform:translateX(-80px);}
  100%{opacity:1;transform:translateX(0);}
}
</style>
