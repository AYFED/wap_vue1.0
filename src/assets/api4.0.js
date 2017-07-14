function API() {
    this.config = {
        version: '2.0.0',
        logicHost: {
            sitelogic: 'http://msitelogic.aoyou.com/api/',
            searchlogic: 'http://msearchlogic.aoyou.com/',
            productlogic: 'http://mproductlogic.aoyou.com/api/',
            memberlogic: 'http://mmemberlogic.aoyou.com/api/',
            bookinglogic: 'http://mbookinglogic.aoyou.com/api/',
            paylogic: 'http://mpaylogic.aoyou.com/api/',
            siteurl: 'http://m.aoyou.com/'
        },
        elementurl: 'http://element.aoyou.com/',
        proxyHost: 'http://vueapi.aoyou.com:3000',
        apiUrlPre: "api35"
    }
    this.devicetype = ''
    this.callbackArr = []
    this.getQueryString = function(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)")
        var r = window.location.search.substr(1).match(reg)
        if (r != null) {
            return unescape(r[2])
        } else {
            return null
        }
    }
    this.loading = function() {
        var loading = document.createElement("div");
        loading.className = "loading";
        loading.id = "loading";
        if (this.devicetype == "wap") {
            loading.style.top = "0px";
        }
        var loader = document.createElement("div");
        loader.className = "loader";
        for (var i = 0; i < 4; i++) {
            var span = document.createElement("span");
            loader.appendChild(span);
        }
        loading.appendChild(loader);
        document.body.appendChild(loading);
    }
    this.endloading = function() {
        var loading = document.getElementById('loading');
        document.body.removeChild(loading);
    }
    this.setCookie = function(key, value, timeout) {
        if (timeout) {
            var exp = new Date();
            exp.setTime(exp.getTime() + timeout * 1000);
            document.cookie = key + "=" + value + ";expires=" + exp.toGMTString() + ";domain=.aoyou.com;path=/";
        } else {
            document.cookie = key + "=" + value + ";domain=.aoyou.com;path=/";
        }
    }
    this.getCookie = function(key) {
        var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        } else {
            return null
        }
    }
    this.removeCookie = function(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 3600 * 24);
        var value = '';
        document.cookie = key + "=" + value + ";expires=" + exp.toGMTString() + ";domain=.aoyou.com;path=/";
    }
    this.getLocalStorage = function(key) {
        return localStorage.getItem(key);
    }
    this.setLocalStorage = function(key, value) {
        try {
            localStorage.removeItem(key);
            localStorage.setItem(key, value);
        } catch (_) {
            alert("该功能无法使用，请关闭浏览器无痕模式（隐身模式）后重试");
        }
    }
}

function Wap() {
    this.post = function(obj) {
        var url = (obj.useProxy ? Wap.prototype.config.proxyHost : '') + "/api/GetApiData";
        Wap.prototype.loading();
        var xmlHttp = null
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        if (xmlHttp != null) {
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        Wap.prototype.endloading();
                        obj.callback(JSON.parse(xmlHttp.responseText));
                    } else {
                        obj.callback({ ErrorCode: -1, ErrorMsg: '查询错误' });
                    }
                }
            };
            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttp.send("path=" + obj.path + "&controller=" + obj.controller + "&action=" + obj.action + "&param=" + obj.param + "&useCache=" + obj.useCache);
        } else {
            alert("浏览器版本过低");
        }
    }
    this.initShareDialog = function(jsonParam) {}
    this.openShareDialog = function() {}
    this.initHybridHeader = function(jsonParam) {}
    this.initShareDialogWithHybrid = function(jsonParam) {}
    this.setHybridHeaderVisible = function(isShow) {}
}

function Android() {
    this.myName = function() {
        return 'android'
    }
}

function Ios() {
    this.curHeaderJson = ''
    this.curShareDialogJson = ''
    this.curHeaderVisible = ''
    this.post = function(obj) {
        var url = Ios.prototype.config.apiUrlPre + '/' + obj.controller + '/' + obj.action;
        var timeInt = parseInt(new Date().getTime());
        var invokeParam = {
            index: timeInt,
            url: url,
            param: obj.param,
            usecache: obj.useCache ? 1 : 0
        };
        Ios.prototype.callbackArr.push({ key: timeInt, callback: obj.callback });
        window.webkit.messageHandlers.iosinvoke.postMessage(invokeParam);
    }
    this.appcallback = function(timeInt, data) {
        for (var i = 0, len = Ios.prototype.callbackArr.length; i < len; i++) {
            if (Ios.prototype.callbackArr[i].key == timeInt) {
                data = JSON.parse(data);
                var formatData = { ErrorCode: 200, ErrorMsg: '', JsonResult: '' };
                if (data.ReturnCode == 0) {
                    formatData.JsonResult = JSON.stringify(data.Data);
                } else {
                    formatData.ErrorCode = data.ReturnCode;
                    formatData.ErrorMsg = data.Message;
                }
                Ios.prototype.callbackArr[i].callback(formatData);
            }
        }
    }
    this.initShareDialog = function(jsonParam) {
        window.webkit.messageHandlers.iosinitShareDialog.postMessage(jsonParam);
    }
    this.openShareDialog = function() {
        window.webkit.messageHandlers.iosopenShareDialog.postMessage();
    }
    this.initHybridHeader = function(jsonParam) {
        this.curHeaderJson = jsonParam;
        window.webkit.messageHandlers.iosinitHybridHeader.postMessage(jsonParam)
    }
    this.initShareDialogWithHybrid = function(jsonParam) {
        this.curShareDialogJson = jsonParam
        window.webkit.messageHandlers.iosinitShareDialogWithHybrid.postMessage(jsonParam);
    }
    this.setHybridHeaderVisible = function(isShow) {
        this.curHeaderVisible = isShow
        window.webkit.messageHandlers.iossetHybridHeaderVisible.postMessage(isShow);
    }
}
var api = new API();
var devicetype = api.getQueryString('devicetype') || 'wap'
switch (devicetype) {
    case 'ios':
        Ios.prototype = new API()
        api = new Ios()
        break
    case 'android':
        Android.prototype = new API()
        api = new Android()
        break;
    default:
        Wap.prototype = new API()
        api = new Wap()
        break;
}
api.devicetype = devicetype
export { api }