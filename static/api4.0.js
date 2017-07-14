window.api = (function() {
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
            microServiceHost: {
                elementurl: 'http://elementmicro.aoyou.com/wap/',
                searchurl:'http://searchmicro.aoyou.com/wap/',
                destinationurl: 'http://destinationmicro.aoyou.com/wap/',
                findurl: 'http://bbsmicro.aoyou.com/wap/',
                orderurl: 'http://ordermicro.aoyou.com/wap/',
                visaurl: 'http://visamicro.aoyou.com/wap/',
                orderevalurl: 'http://orderevalmicro.aoyou.com/wap/',
                packageurl: 'http://packagemicro.aoyou.com/wap/',
                tailorurl: 'http://custommicro.aoyou.com/wap/',
                groupurl: 'http://groupmicro.aoyou.com/wap/',
                memberurl: 'http://crmmicro.aoyou.com/wap/',
                flight: 'http://flightmicro.aoyou.com/wap/',
                Booking:'http://bookingmicro.aoyou.com/wap/'
            },
            elementurl: 'http://element.aoyou.com/',
            mservicetestHost: "http://mservicetest.aoyou.com/api40/",
            proxyHost: 'http://vueapi.aoyou.com:3000',
            appProxyHost: "http://mservicetest.aoyou.com/api40/Fuse/FuseFunction"
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
        this.getQueryStringfilter = function(key) {
            //var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)")

            // var strurl = window.location.href.split('?');
            // var r = "";
            // if (strurl != null && strurl.length > 1) {
            //     if (strurl[1] != undefined && strurl[1] != "") {
            //         r = strurl[1].match(reg)
            //     }
            // }

            // if (r != null && r != "") {
            //     return unescape(r[2])
            // } else {
            //     return null
            // }
            var reg = new RegExp("[?&]" + key + "[=]([^$&#]*)");
            var r = window.location.href.match(reg)
            if (r != null && r != "") {
                return unescape(r[1])
            } else {
                return null
            }
        }

          this.IsAndroidClient=function () {
            if (window.action != null && window.action != undefined)
            {
                return true;
            }
            else
            {
                return false;
            }

        },

        this.IsIOSClient=function () {
            if (window.webkit != null && window.webkit != undefined && window.webkit.messageHandlers.pageBack)
            {
                return true;
            }
            else
            {
                return false;
            }

        },
        this.loading = function() {
            // var loading = document.createElement("div");
            // loading.className = "loading";
            // loading.id = "loading";
            // if (this.devicetype == "wap") {
            //     loading.style.top = "0px";
            // }
            // var loader = document.createElement("div");
            // loader.className = "loader";
            // for (var i = 0; i < 4; i++) {
            //     var span = document.createElement("span");
            //     loader.appendChild(span);
            // }
            // loading.appendChild(loader);
            // document.body.appendChild(loading);
        }
        this.endloading = function() {
            // var loading = document.getElementById('loading');
            // document.body.removeChild(loading);
        }
        this.setCookie = function(key, value, timeout) {
            if (timeout) {
                var exp = new Date();
                exp.setTime(exp.getTime() + timeout * 1000);
                document.cookie = key + "=" + value + ";expires=" + exp.toGMTString() + ";domain=.aoyou.com;path=/";
                if (window.webkit != null && window.webkit != undefined) {
                    localStorage.setItem(key, value);
                } else if (window.action != null && window.action != undefined) {
                    localStorage.setItem(key, value);
                }

            } else {
                document.cookie = key + "=" + value + ";domain=.aoyou.com;path=/";
                if (window.webkit != null && window.webkit != undefined) {
                    localStorage.setItem(key, value);
                } else if (window.action != null && window.action != undefined) {
                    localStorage.setItem(key, value);
                }
            }
        }
        this.getCookie = function(key) {

            if (window.webkit != null && window.webkit != undefined && window.webkit.messageHandlers.pageBack) {
                if (localStorage.getItem(key)) {
                    return localStorage.getItem(key);
                } else {
                    return null
                }
            } else if (window.action != null && window.action != undefined) {
                if (localStorage.getItem(key)) {
                    return localStorage.getItem(key);
                } else {
                    return null
                }
            } else {
                var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) {

                    if (unescape(arr[2]) != null && unescape(arr[2]) != undefined && unescape(arr[2]) != "" && unescape(arr[2]) != "null") {
                        return unescape(arr[2])
                    } else {}
                }
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
        this.HTMLEncode = function(html) {
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
        }
        this.HTMLDecode = function(text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }
        this.DelHtmlTag = function(val) {
            if (val && val.length > 0) {
                val = api.HTMLDecode(val)
                return val.replace(/<[^>]+>/g, "")
            } else {
                return ''
            }
        }
        this.dateFmt = function(date) {
            var m = (date.getMonth() + 1) + ''
            if (m.length == 1) {
                m = '0' + m
            }
            var d = date.getDate() + ''
            if (d.length == 1) {
                d = '0' + d
            }
            return date.getFullYear() + '-' + m + '-' + d
        }
        this.dateAdd = function(dateStr, days) {
            var dateArr = dateStr.split('-')
            var date = new Date()
            date.setFullYear(parseInt(dateArr[0], 10), parseInt(dateArr[1], 10) - 1, parseInt(dateArr[2], 10))
            date.setDate(date.getDate() + days)
            return this.dateFmt(date)
        }
        this.getDepCity = function() {
            var departCity = {}
            if (!this.getLocalStorage("depcity")) {
                departCity = { "CityID": "1", "ChannelID": "1", "Phone": "400-600-6666", "OrderNum": "1", "CityName": "北京", "CityNamePY": "beijing", "GroupWord": "B" }
                this.setLocalStorage("depcity", JSON.stringify(departCity))
            } else {
                departCity = JSON.parse(api.getLocalStorage("depcity"))
            }
            return departCity
        }
        this.getMemberId = function() {
            return this.getCookie("memberid") || ''
        }
        this.getMemberIdOld = function() {
            return this.getCookie("memberidold") || ''
        }
        this.replaceUrl = function(url) {
            window.location.replace(url)
        }
        this.getSiteFile = function(path, callback) {
            var xmlHttp = null
            if (window.XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            }
            if (xmlHttp != null) {
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == 4) {
                        if (xmlHttp.status == 200) {
                            callback(xmlHttp.responseText);
                        } else {
                            callback('');
                        }
                    }
                };
                xmlHttp.open("GET", path, true);
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlHttp.send(null);
            } else {
                alert("浏览器版本过低");
            }
        }
        this.ajax = function(opt) {
            opt = opt || {};
            opt.method = opt.method.toUpperCase() || 'POST';
            opt.url = opt.url || '';
            opt.async = opt.async || true;
            opt.data = opt.data || null;
            opt.success = opt.success || function() {};
            var xmlHttp = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            var params = [];
            for (var key in opt.data) {
                params.push(key + '=' + opt.data[key]);
            }
            var postData = params.join('&');
            if (opt.method.toUpperCase() === 'POST') {
                xmlHttp.open(opt.method, opt.url, opt.async);
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xmlHttp.send(postData);
            } else if (opt.method.toUpperCase() === 'GET') {
                xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
                xmlHttp.send(null);
            }
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    opt.success(xmlHttp.responseText);
                }
            };
        }
        this.GetProductDetailUrl = function(pid, tid, stid) {
            if (tid == 1) {
                return "http://m.aoyou.com/group.html?pid=" + pid;
            } else if (tid == 4) {
                return "http://m.aoyou.com/tourstatic.html?pid=" + pid;
            } else if (tid == 96) {
                return "http://m.aoyou.com/visa.html#!/detail?pid=" + pid;
            } else if (tid == 5) {
                return "http://m.aoyou.com/cruise/c" + pid + "i2"
            } else if (tid == 1002) {
                if (stid == 3 || stid == 4) {
                    return "http://m.aoyou.com/s/localtour/detail_special.html?id=" + pid;
                } else {
                    return "http://m.aoyou.com/s/localtour/detail.html?id=" + pid;
                }
            } else if (tid == 29) {
                return "http://m.aoyou.com/s/localtour/detail_e.html?id=" + pid;
            } else {
                return ""
            }
        }
    }

    function Wap() {
        this.showShare = false
        this.showCollect = false
        this.showOnLineService = true
        this.post = function(obj) {
            var url = (obj.useProxy ? Wap.prototype.config.proxyHost : '') + "/api/GetApiData";
            Wap.prototype.loading();
            Wap.prototype.ajax({
                method: 'POST',
                url: url,
                data: {
                    path: obj.path,
                    controller: obj.controller,
                    contentType: "application/json",
                    action: obj.action,
                    param: obj.param,
                    useCache: obj.useCache
                },
                success: function(response) {
                    obj.callback(JSON.parse(response));
                }
            })

        }
        this.initShareDialog = function(title, desc, link, imgUrl) {
            var tempUrl = window.location.href
            var temp = tempUrl.split("?")
            var tempStr = tempUrl.substr(tempUrl.indexOf("?") + 1)
            var urlParam = temp[0] + "?" + encodeURIComponent(tempStr) || ""
            Wap.prototype.ajax({
                method: 'POST',
                url: 'http://wechatapi.aoyou.com/api/jsapi/shareoauthForWap4',
                data: {
                    Param: urlParam
                },
                success: function(data) {
                    if (ayWeChatShare != undefined) {
                        data = JSON.parse(data)
                        ayWeChatShare.init({
                            debug: false,
                            appId: data.AppId,
                            timestamp: data.TimeStamp,
                            nonceStr: data.NonceStr,
                            signature: data.Signature
                        });
                        ayWeChatShare.share({
                            title: title,
                            desc: desc,
                            link: link,
                            imgUrl: imgUrl,
                            success: function(res) {}
                        });
                        wx.ready(function() {
                            if (ayWeChatShare.FriendCircle) {
                                wx.onMenuShareTimeline({
                                    title: ayWeChatShare.FriendCircle.title,
                                    link: ayWeChatShare.FriendCircle.link,
                                    imgUrl: ayWeChatShare.FriendCircle.imgUrl,
                                    trigger: function(res) {
                                        ayWeChatShare.FriendCircle.trigger(res);
                                    },
                                    success: function(res) {
                                        ayWeChatShare.FriendCircle.success(res);
                                    },
                                    cancel: function(res) {
                                        ayWeChatShare.FriendCircle.cancel(res);
                                    },
                                    fail: function(res) {
                                        ayWeChatShare.FriendCircle.fail(res);
                                    }
                                });
                            }
                            if (ayWeChatShare.Friend) {
                                wx.onMenuShareAppMessage({
                                    title: ayWeChatShare.Friend.title,
                                    desc: ayWeChatShare.Friend.desc,
                                    link: ayWeChatShare.Friend.link,
                                    imgUrl: ayWeChatShare.Friend.imgUrl,
                                    trigger: function(res) {
                                        ayWeChatShare.Friend.trigger(res);
                                    },
                                    success: function(res) {
                                        ayWeChatShare.Friend.success(res);
                                    },
                                    cancel: function(res) {
                                        ayWeChatShare.Friend.cancel(res);
                                    },
                                    fail: function(res) {
                                        ayWeChatShare.Friend.fail(res);
                                    }
                                });
                            }
                            if (ayWeChatShare.QQ) {
                                wx.onMenuShareQQ({
                                    title: ayWeChatShare.QQ.title,
                                    desc: ayWeChatShare.QQ.desc,
                                    link: ayWeChatShare.QQ.link,
                                    imgUrl: ayWeChatShare.QQ.imgUrl,
                                    trigger: function(res) {
                                        ayWeChatShare.QQ.trigger(res);
                                    },
                                    complete: function(res) {
                                        ayWeChatShare.QQ.complete(res);
                                    },
                                    success: function(res) {
                                        ayWeChatShare.QQ.success(res);
                                    },
                                    cancel: function(res) {
                                        ayWeChatShare.QQ.cancel(res);
                                    },
                                    fail: function(res) {
                                        ayWeChatShare.QQ.fail(res);
                                    }
                                });
                            }
                            if (ayWeChatShare.Weibo) {
                                wx.onMenuShareWeibo({
                                    title: ayWeChatShare.Weibo.title,
                                    desc: ayWeChatShare.Weibo.desc,
                                    link: ayWeChatShare.Weibo.link,
                                    imgUrl: ayWeChatShare.Weibo.imgUrl,
                                    trigger: function(res) {
                                        ayWeChatShare.Weibo.trigger(res);
                                    },
                                    complete: function(res) {
                                        ayWeChatShare.Weibo.complete(res);
                                    },
                                    success: function(res) {
                                        ayWeChatShare.Weibo.success(res);
                                    },
                                    cancel: function(res) {
                                        ayWeChatShare.Weibo.cancel(res);
                                    },
                                    fail: function(res) {
                                        ayWeChatShare.Weibo.fail(res);
                                    }
                                });
                            }
                        })
                    }
                }
            })
        }
        this.openShareDialog = function() {

        }
        this.initHybridHeader = function(jsonParam) {}
        this.initShareDialogWithHybrid = function(jsonParam) {}
        this.setHybridHeaderVisible = function(isShow) {}

        this.pageBack = function(url) {
            window.history.back()
            window.apit = setTimeout(function() {
                window.location.replace('http://m.aoyou.com')
            }, 200);
        }
        this.pageGoTo = function(url) {
            if (url) {
                window.location.href = url
            }
        }
        this.onlineService = function(title, pid, picUrl, link, price) {
            var jiaxinpro = {
                show: 1,
                title: title,
                desc: pid,
                picture: picUrl,
                url: link
            };
            jiaxinProduct(jiaxinpro);
            jiaxinTogglerDiv();
        }
        this.toLogin = function(fromUrl, toUrl) {

        }
        this.telClick = function(tel) {
            window.location.href = "tel:" + tel.replace('转', ',');
        }
        this.toSaleStores = function() {
            var url = 'http://mmy.aoyou.com/s/service/stores.html?from=' + encodeURIComponent(location.href) + '&forward=' + encodeURIComponent(location.href)
                //console.log(url)
            window.location.replace(url);
        }
        this.initJiaXin = function() {
            window['_JIAXIN'] = window['_JIAXIN'] || function() {
                (window['_JIAXIN']._JIAXIN = window['_JIAXIN']._JIAXIN || []).push(arguments);
            };
            var v = new Date().getUTCDate();
            var j = document.createElement('script');
            j.async = true;
            j.charset = "UTF-8";
            j.src = '//jiaxin2.aoyou.com/mcs.js' + "?v=" + v + "&id=mwhwm3k3ymlvza&appName=aywzxkf078&appChannel=20001";
            document.body.appendChild(j)
            _JIAXIN();
        }
    }

    function Android() {
        this.showShare = true
        this.showCollect = true
        this.showOnLineService = true
        this.post = function(obj) {
            var url = Android.prototype.config.appProxyHost;
            var timeInt = parseInt(new Date().getTime());
            var invokeParam = {
                index: timeInt,
                url: url,
                postParam: { path: obj.path, controller: obj.controller, action: obj.action, param: obj.param, useCache: obj.useCache }
            };
            Android.prototype.callbackArr.push({ key: timeInt, callback: obj.callback });
            window.action.androidPostData(JSON.stringify(invokeParam));
        }
        this.appcallback = function(timeInt, data) {
            for (var i = 0, len = Android.prototype.callbackArr.length; i < len; i++) {
                if (Android.prototype.callbackArr[i].key == timeInt) {
                    Android.prototype.callbackArr[i].callback(data);
                }
            }
        }
        this.initShareDialog = function() {

        }
        this.openShareDialog = function(title, content, linkUrl, picUrl, otherJson) {
             // linkUrl = linkUrl.replace("memberid", "undefined")
            var reger = new RegExp('&memberid=[^"]*');
            var r = linkUrl.match(reger)
            linkUrl = linkUrl.replace(r, "");
            var jsonParam = {
                title: title,
                content: content,
                linkUrl: linkUrl,
                picUrl: picUrl,
                otherJson: otherJson
            }
            window.action.invokeAYShare(JSON.stringify(jsonParam));
        }
        this.pageBack = function(url) {
            if (url) {
                window.action.pageBack(JSON.stringify({ "url": url }));
            } else {
                window.action.pageBack("");
            }
        }
        this.pageGoTo = function(url, appParam, funcname) {
            if (funcname != undefined && appParam != undefined && appParam != '' && funcname != '') {
                window.action.toAppPage(JSON.stringify({ "url": funcname, "appParam": appParam }));
            } else if (funcname != undefined && funcname != '') {
                window.action.toAppPage(JSON.stringify({ "url": funcname }));
            } else {
                window.location.href = url
            }
        }
        this.onlineService = function(title, pid, picUrl, link, price) {
            var jiaxinpro = {
                show: 1,
                title: title,
                desc: pid,
                picture: picUrl,
                url: link,
                price: price
            };
            this.pageGoTo('', jiaxinpro, 'imChat')
        }
        this.toLogin = function(fromUrl, toUrl) {
            window.action.toLogin(JSON.stringify({ "from": fromUrl, "to": tourl }));
        }
        this.telClick = function(tel) {
            window.action.telClick(tel.replace('转', ','));
        }
        this.toSaleStores = function() {
            window.action.toStore(JSON.stringify({}));
        }
        this.initJiaXin = function() {

        }
    }

    function Ios() {
        this.curHeaderJson = ''
        this.curShareDialogJson = ''
        this.curHeaderVisible = ''
        this.showShare = true
        this.showCollect = true
        this.showOnLineService = true
        this.post = function(obj) {
            var url = Ios.prototype.config.appProxyHost;
            var timeInt = Ios.prototype.callbackArr.length + 1;
            Ios.prototype.callbackArr.push({ key: timeInt, callback: obj.callback });
            var invokeParam = {
                index: timeInt,
                url: url,
                postParam: { path: obj.path, controller: obj.controller, action: obj.action, param: obj.param, useCache: obj.useCache }
            };
            window.webkit.messageHandlers.iospostdata.postMessage(invokeParam);
        }
        this.appcallback = function(timeInt, data) {
            for (var i = 0, len = Ios.prototype.callbackArr.length; i < len; i++) {
                if (Ios.prototype.callbackArr[i].key == timeInt) {
                    data = JSON.parse(data);
                    Ios.prototype.callbackArr[i].callback(data);
                }
            }
        }
        this.initShareDialog = function() {}
        this.openShareDialog = function(title, content, linkUrl, picUrl, otherJson) {
             //linkUrl = linkUrl.replace("memberid", "undefined")
            var reger = new RegExp('&memberid=[^"]*');
            var r = linkUrl.match(reger)
            linkUrl = linkUrl.replace(r, "");
            var jsonParam = {
                title: title,
                content: content,
                linkUrl: linkUrl,
                picUrl: picUrl,
                otherJson: otherJson
            }
            window.webkit.messageHandlers.invokeAYShare.postMessage(jsonParam);
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
        this.pageBack = function(url) {
            if (url) {
                window.webkit.messageHandlers.pageBack.postMessage({ "url": url });
            } else {
                window.webkit.messageHandlers.pageBack.postMessage("");
            }
        }
        this.pageGoTo = function(url, appParam, funcname) {
            if (funcname != undefined && appParam != undefined && appParam != '' && funcname != '') {
                window.webkit.messageHandlers.toAppPage.postMessage({ "url": funcname, "appParam": appParam });
            } else if (funcname != undefined && funcname != '') {
                window.webkit.messageHandlers.toAppPage.postMessage({ "url": funcname });
            } else {
                window.location.href = url
            }
        }
        this.onlineService = function(title, pid, picUrl, link, price) {
            var jiaxinpro = {
                show: 1,
                title: title,
                desc: pid,
                picture: picUrl,
                url: link,
                price: price
            };
            window.webkit.messageHandlers.imChat.postMessage(jiaxinpro);
        }
        this.toLogin = function(fromUrl, toUrl) {
            window.webkit.messageHandlers.toLogin.postMessage({ "from": fromUrl, "to": tourl });
        }
        this.telClick = function(tel) {
            window.webkit.messageHandlers.telClick.postMessage(tel.replace('转', ','));
        }
        this.toSaleStores = function() {
            window.webkit.messageHandlers.toStore.postMessage({});
        }
        this.initJiaXin = function() {

        }
    }
    var api = new API();
    var devicetype = 'wap'
    if (window.webkit && window.webkit.messageHandlers.pageBack) {
        devicetype = 'ios'
    } else if (window.action) {
        devicetype = 'android'
    }
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
                // api.initShareDialog()
            break;
    }
    if (api.getQueryString('memberid') || api.getQueryStringfilter('memberid')) {

        var memberid = api.getQueryString('memberid');
        if (memberid == null || memberid == undefined || memberid == "") {
            memberid = api.getQueryStringfilter('memberid');
        }
        if (memberid != "" && memberid != -1) {
            api.setCookie("memberid", memberid)
        } else {
            if (memberid == -1) {
                if (window.webkit != null && window.webkit != undefined) {
                    localStorage.removeItem("memberid");
                    api.removeCookie("memberid");
                } else if (window.action != null && window.action != undefined) {
                    localStorage.removeItem("memberid");
                    api.removeCookie("memberid");
                }
            }
        }
    }
    api.devicetype = devicetype
    return api
})()
window.onpopstate = function(e) {
    clearTimeout(window.apit)
};
