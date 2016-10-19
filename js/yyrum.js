! function(e, t) {
    function n(e) {
        var t = JSON.parse(e.data);
        if ("view" == t.type) {
            c.inspectorCancel();
            for (var n = document.querySelectorAll(".uyun-mark-tag"), r = 0, o = n.length; o > r; r++) n[r].parentNode.removeChild(n[r])
        }
        if ("editingElement" == t.type && (c.source = e.source, c.inspectorInit()), "editingPage" == t.type) {
            var i = location.href,
                a = location.protocol,
                s = location.host,
                u = location.pathname,
                d = location.hash;
            t = { href: i, protocol: a, domain: s, path: u, hash: d, title: document.title, type: "page" }, e.source.postMessage(JSON.stringify(t), "*")
        }
        if ("viewAllElemnet" == t.type)
            for (var l = t.res, r = 0, o = l.length; o > r; r++) c.createMarkElement(document.querySelector(l[r].selector));
        "elementSave" == t.type && c.createMarkElement(c.markElement)
    }

    function r(e, t) {
        e = "object" == typeof e ? e : JSON.parse(e);
        var n = e.errorInterval || 6e4,
            r = e.resourceInterval || 6e4;
        k = e.apdexT, b.sessionID = e.session_id, b.apdex = w.computeApdex(), t && sessionStorage.setItem("YYRUM-sessionID", JSON.stringify(e)), w.sendRequest.img(R.pageload, I.merge(w.pageTimingData(), { endTime: I.getTime() })), w.reourceData() && w.sendRequest.img(R.resource, w.reourceData()), d = setInterval(function() { performance.getEntriesByType && performance.getEntriesByType("resource") && performance.getEntriesByType("resource").length > 0 && w.reourceData(!0) && w.sendRequest.img(R.resource, w.reourceData(!0)) }, r), l = setInterval(function() {
            if (N.length > 0) {
                I.merge(w.actionData(), { type: "errors", pageInfo: b, jsErrors: N });
                w.sendRequest.img(R.errors, I.merge(w.actionData(), { pageInfo: b, jsErrors: N }))
            }
            N = []
        }, n), f = setInterval(function() { ne.length > 0 && w.sendRequest.img(R.xhr, { pageInfo: b, operations: ne }), ne = [], O = {} }, r)
    }

    function o() {
        return Date.now() || (new Date()).getTime();
    }

    function i() { E = o(); }

    function a() {
        var e = x,
            t = o();
        t - E > e ? (sessionStorage.clear(), s()) : (clearInterval(d), clearInterval(f), clearInterval(l))
    }

    function s() {
        if (E = o(), w.pageInfo(), sessionStorage.getItem("YYRUM-sessionID")) r(sessionStorage.getItem("YYRUM-sessionID"), !1);
        else {
            var e = w.basicData();
            e.appId = w.info.appId, w.sendRequest.jsonp(R.connect, e, "YYRUM.initMetaData")
        }
    }

    function u() { I.getCookie("uyun-unique-id") || I.setCookie("uyun-unique-id"), w.computeStackTrace(), window.addEventListener("load", function() { setTimeout(s, 0) }, !1), window.onbeforeunload = function() { ne.length > 0 && (w.sendRequest.img(R.xhr, { pageInfo: b, operations: ne }), ne = [], O = {}), N.length > 0 && w.sendRequest.img(R.errors, I.merge(w.actionData(), { pageInfo: b, jsErrors: N })), performance.getEntriesByType && performance.getEntriesByType("resource") && performance.getEntriesByType("resource").length > 0 && w.reourceData(!0) && w.sendRequest.img(R.resource, w.reourceData(!0)) } }
    if (window.postMessage) {
        window.addEventListener("load", function() {
            var e = document.documentElement.scrollHeight,
                t = { height: e, type: "iframe", curHerf: location.href };
            window.parent.postMessage(JSON.stringify(t), "*")
        }, !1), window.addEventListener("message", n, !1);
        var c = {
            source: null,
            markElement: null,
            cssPath: function(e) {
                for (var n = ""; e && e != document.body;) {
                    var r = e.id,
                        o = "string" == typeof e.className ? e.className.trim().split(/\s+/).join(".") : "",
                        i = e.nodeName.toLowerCase();
                    if ("" !== o && (o = "." + o), r && "" != r) return r = "#" + r, "" != n && (n = ">" + n), n = i + r + o + n;
                    var a = i + o,
                        s = e.parentNode,
                        u = 1,
                        c = s && s.childNodes && s.childNodes.length;
                    if (c > 0)
                        for (var d = 0; c > d && s.childNodes[d] != e; d++) {
                            var l = s.childNodes[d].tagName;
                            l !== t && (u += 1)
                        }
                    "" != n && (n = ">" + n), n = u > 1 ? a + ":nth-child(" + u + ")" + n : a + n, e = s
                }
                return n
            },
            inspectorMouseOver: function(e) {
                var t = e.target;
                "uyun-mark-tag" != t.className && (t.style.outline = "2px solid #f00")
            },
            createMarkElement: function(e) {
                var t = document.createElement("i");
                return t.className = "uyun-mark-tag", "input" == e.tagName.toLowerCase() && (e = e.parentNode), e && (e.style.cssText = "position:relative;", t.style.cssText = "position: absolute; right: 0; top:0; width: 0; height: 0; border-top: 15px solid red; border-left: 15px solid transparent;", e.appendChild(t)), t
            },
            inspectorMouseOut: function(e) { e.target.style.outline = "" },
            inspectorOnClick: function(e) {
                var t = e.target;
                c.markElement = t, e.preventDefault();
                var n = c.cssPath(t),
                    r = { selector: n, text: t.innerText || "", url: location.href, type: "element" };
                return c.source.postMessage(JSON.stringify(r), "*"), "document" != t.tagName ? (e.stopPropagation(), !1) : void 0
            },
            inspectorCancel: function() { document.removeEventListener("mouseover", this.inspectorMouseOver, !0), document.removeEventListener("mouseout", this.inspectorMouseOut, !0), document.removeEventListener("click", this.inspectorOnClick, !0) },
            inspectorInit: function() { document.addEventListener("mouseover", this.inspectorMouseOver, !0), document.addEventListener("mouseout", this.inspectorMouseOut, !0), document.addEventListener("click", this.inspectorOnClick, !0) }
        }
    }
    var d, l, f, p = Array.prototype,
        m = (Function.prototype, Object.prototype),
        h = p.slice,
        g = (m.toString, m.hasOwnProperty, e.navigator),
        v = document = e.document,
        y = e.location,
        T = g.userAgent,
        w = e.YYRUM || {},
        S = !1,
        E = 0,
        x = 18e5,
        b = {},
        N = [],
        k = 3e3,
        O = {},
        M = w.info && w.info.beacon,
        R = { connect: M + "/browser/v1/connect", pageload: M + "/browser/v1/pageload", resource: M + "/browser/v1/resource", errors: M + "/browser/v1/errors", xhr: M + "/browser/v1/xhr" };
    w.version = "1.0.0", w.sendRequest = {
        jsonp: function(e, t, n) {
            for (var r = encodeURIComponent(JSON.stringify(t)), o = r.length, i = Math.ceil(o / 2e3), a = I.uuid(), s = function(t, r, o, i) {
                    var a = e,
                        s = document.createElement("script");
                    s.type = "text/javascript", a += "?data=" + t + "&total=" + r + "&index=" + d + "&uuid=" + i, n && (a += "&jsonp=" + n), s.src = a;
                    var u = document.getElementsByTagName("script")[0];
                    return u.parentNode.insertBefore(s, u), s
                }, u = 0, c = 0, d = 0; i > d; d++) {
                for (c += 2e3;
                    "%" == r[c - 1] || "%" == r[c - 2];) c += 2;
                s(r.substring(u, c), i, d, a), u = c
            }
        },
        xhr: function(e, t) {
            var n = new XMLHttpRequest;
            return e = e + "?data=" + encodeURIComponent(JSON.stringify(t)), n.open("get", e, !0), n.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), n.send(), n
        },
        img: function(e, t) {
            for (var n = encodeURIComponent(JSON.stringify(t)), r = n.length, o = Math.ceil(r / 2e3), i = I.uuid(), a = function(t, n, r, o) {
                    var i = e,
                        a = new Image;
                    return i += "?data=" + t + "&total=" + n + "&index=" + c + "&uuid=" + o, a.src = i, a
                }, s = 0, u = 0, c = 0; o > c; c++) {
                for (u += 2e3;
                    "%" == n[u - 1] || "%" == n[u - 2];) u += 2;
                a(n.substring(s, u), o, c, i), s = u
            }
        }
    };
    var C = function() { this.handlers = [], this.onerror = console && console.log || window.onerror || function(e) {} };
    C.prototype.push = function(e) { this.handlers.push(e) }, C.prototype.dispatch = function() {
        for (var e, t = Array.prototype.slice.call(arguments, 0), e = 0; e < this.handlers.length; e++) try { this.handlers[e].apply(null, t) } catch (n) {}
    };
    var I = {
            has: function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            },
            isUndefined: function(e) {
                return "undefined" == typeof e
            },
            getTime: function() {
                return Date.now() || (new Date).getTime()
            },
            parseURL: function(e) {
                var t = "?";
                for (var n in e) t += n + "=" + e[n] + "&";
                return t
            },
            uuid: function() {
                var e = function() {
                        for (var e = 1 * new Date, t = 0; e == 1 * new Date;) t++;
                        return e.toString(16) + t.toString(16)
                    },
                    t = function() {
                        return Math.random().toString(16).replace(".", "")
                    },
                    n = function() {
                        function e(e, t) {
                            var n, o = 0;
                            for (n = 0; n < t.length; n++) o |= r[n] << 8 * n;
                            return e ^ o
                        }
                        var t, n, r = [],
                            o = 0;
                        for (t = 0; t < T.length; t++) n = T.charCodeAt(t), r.unshift(255 & n), r.length >= 4 && (o = e(o, r), r = []);
                        return r.length > 0 && (o = e(o, r)), o.toString(16)
                    };
                (screen.height * screen.width).toString(16);
                return e() + "-" + t() + "-" + n()
            },
            setCookie: function(e) {
                var t = I.uuid();
                document.cookie = e + "=" + t
            },
            getCookie: function(e) {
                for (var t, n = document.cookie.split(";"), r = 0, o = n.length; o > r; r++) {
                    var i = n[r].split("=");
                    i[0].indexOf(e) > -1 && (t = i[1])
                }
                return t
            },
            copyFields: function(e, t) {
                var n = function(e, t) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                };
                t = t || {};
                var r, o;
                for (r in e) /layerX|Y/.test(r) || (o = e[r], "function" == typeof o ? t[r] = n(e, o) : t[r] = o);
                return t
            },
            merge: function(e, n) {
                var r, o, i;
                if (e === t) return e;
                if (n === t) return e;
                if (e instanceof Array && n instanceof Array) {
                    for (r = [], i = 0; i < e.length; i++) r.push(e[i]);
                    for (i = 0; i < n.length; i++) r.length > i ? r[i] = Util.merge(r[i], n[i]) : r.push(n[i]);
                    return r
                }
                if (e instanceof Object && n instanceof Object) {
                    r = {};
                    for (o in e) r[o] = e[o];
                    for (o in n) r[o] !== t ? r[o] = Util.merge(r[o], n[o]) : r[o] = n[o];
                    return r
                }
                return n
            },
            undup: function(e, n) {
                n = n || 250;
                var r = 0;
                return function() {
                    var o = I.getTime(),
                        i = o - r;
                    return i > n ? (r = o, e.apply(this, arguments)) : t
                }
            }
        },
        D = {
            genCssSelector: function(e) {
                for (var n = ""; e && e != document.body;) {
                    var r = e.id,
                        o = "string" == typeof e.className ? e.className.trim().split(/\s+/).join(".") : "",
                        i = e.nodeName.toLowerCase();
                    if ("" !== o && (o = "." + o), r && "" != r) return r = "#" + r, "" != n && (n = ">" + n), n = i + r + o + n;
                    var a = i + o,
                        s = e.parentNode,
                        u = 1,
                        c = s && s.childNodes && s.childNodes.length;
                    if (c > 0)
                        for (var d = 0; c > d && s.childNodes[d] != e; d++) {
                            var l = s.childNodes[d].tagName;
                            l !== t && (u += 1)
                        }
                    "" != n && (n = ">" + n), n = u > 1 ? a + ":nth-child(" + u + ")" + n : a + n, e = s
                }
                return n
            },
            monitorElements: function(e, t, n) {
                n = n || 50;
                var r = function() {
                    for (var o = document.getElementsByTagName(e), i = 0; i < o.length; i++) {
                        var a = o[i],
                            s = a.getAttribute("scribe_scanned");
                        if (!s) {
                            a.setAttribute("scribe_scanned", !0);
                            try { t(a) } catch (u) { window.onerror(u) }
                        }
                    }
                    setTimeout(r, n)
                };
                setTimeout(r, 0)
            },
            getNodeDescriptor: function(e) {
                return { id: e.id, selector: D.genCssSelector(e), title: "" === e.title ? t : e.title }
            }
        },
        A = {};
    A.onready = function(e) { null !== document.body ? e() : setTimeout(function() { A.onready(e) }, 10) }, A.onevent = function(e, t, n, r) {
        var o = function(e) {
                return function(t) {
                    t || (t = window.event), t = I.copyFields(t), t.target = t.target || t.srcElement, t.keyCode = t.keyCode || t.which || t.charCode, t.which = t.which || t.keyCode, t.charCode = "number" == typeof t.which ? t.which : t.keyCode, t.timeStamp = t.timeStamp || I.getTime(), t.target && 3 == t.target.nodeType && (t.target = t.target.parentNode);
                    var n;
                    return t.preventDefault || (t.preventDefault = function() { n = !1 }), e(t) || n
                }
            },
            i = o(r);
        e.addEventListener ? e.addEventListener(t, function() { i() }, n) : e.attachEvent && e.attachEvent("on" + t, i)
    }, A.onsubmit = function() {
        var e = new C,
            t = I.undup(function(t) { e.dispatch(t) });
        return A.onready(function() {
                A.onevent(document.body, "submit", !0, function(e) { t(e) }), A.onevent(document.body, "keypress", !1, function(e) {
                    if (13 == e.keyCode) {
                        var n = e.target,
                            r = n.form;
                        r && (e.form = n.form, t(e))
                    }
                }), A.onevent(document.body, "click", !1, function(e) {
                    var n = e.target,
                        r = (n.type || "").toLowerCase();
                    !n.form || "submit" !== r && "button" !== r || (e.form = n.form, t(e))
                })
            }),
            function(t) { e.push(t) }
    }(), w.clientStore = {
        referrer: function() {
            var e = document.referrer;
            return e
        },
        accessPage: function() {
            if (sessionStorage["uyun-access-page"]) return sessionStorage["uyun-access-page"];
            var e = location.href;
            return sessionStorage["uyun-access-page"] = e, e
        },
        browser: function() {
            var e = {};
            return e.USER_AGENT = T || g.userAgent, e.NAMES = { chrome: "Chrome", firefox: "Firefox", safari: "Safari", ie: "Internet Explorer", ipad: "iPad", iphone: "iPhone", ipod: "iPod Touch", android: "Android", blackberry: "Blackberry" }, e.VERSIONS = { "default": /(?:Version|MSIE|Firefox|Chrome|CriOS|QuickTime|BlackBerry[^\/]+|CoreMedia v)[\/ ]?([a-z0-9.]+)/i, opera: /Opera\/.*? Version\/([\d.]+)/ }, e.TRIDENT_VERSION_REGEX = /Trident\/([0-9.]+)/, e.vendor = function() {
                return e.USER_AGENT.match(/Chrome|CriOS/) ? e.NAMES.chrome : e.USER_AGENT.match(/Safari/) && !e.USER_AGENT.match(/Chrome|CriOS/) ? e.NAMES.safari : e.USER_AGENT.match(/Firefox/) ? e.NAMES.firefox : e.USER_AGENT.match(/MSIE/) && !e.USER_AGENT.match(/Opera/) ? e.NAMES.ie : "Other"
            }, e.semver = function() {
                return e.USER_AGENT.match(e.VERSIONS["default"]) && String(e.USER_AGENT.match(e.VERSIONS["default"])[1])
            }, e.version = function() {
                var e;
                return e = this.semver(), e && e.split(".")[0]
            }, { name: e.vendor(), version: e.version() }
        },
        platform: function() {
            return T.match(/iPhone/) ? "iphone" : T.match(/iPad/) ? "ipad" : T.match(/Android/) ? "Android" : T.match(/iPod/) ? "ipod" : T.match(/Kindle/) ? "kindle" : T.match(/PSP/) ? "psp" : "pc"
        },
        os: function() {
            if (-1 != T.indexOf("Windows NT 5.1")) return { name: "Windows", version: "XP" };
            if (-1 != T.indexOf("Windows NT 6.0")) return { name: "Windows", version: "Vista" };
            if (-1 != T.indexOf("Windows NT 6.1")) return { name: "Windows", version: "7" };
            if (-1 != T.indexOf("Windows NT 6.2")) return { name: "Windows", version: "8" };
            if (-1 != T.indexOf("Windows NT 10.0")) return { name: "Windows", version: "10" };
            if (-1 != T.indexOf("Mac")) {
                var e = T.match(/\d*_\d*_\d*/);
                return { name: "OSX", version: e ? e[0] : "" }
            }
            return { name: "未知操作系统", version: "unknown" }
        }
    }, w.computeApdex = function(e, t) {
        var n, r = k,
            o = "S";
        return n = e ? t : performance.timing.loadEventEnd - performance.timing.navigationStart, o = r > n ? "S" : n > 4 * r ? "D" : "T"
    };
    var L = w.clientStore,
        U = L.os(),
        q = L.browser();
    w.pageInfo = function() { b = { title: v.title, url: location.href, hash: y.hash ? y.hash : "", uuid: I.uuid(), hasError: S, referrer: w.clientStore.referrer() } }, w.basicData = function() {
        return { appId: "", sdkVersion: w.version, osType: U.name, osVersion: U.version, browserType: q.name, browserVersion: q.version, platform: L.platform(), userID: I.getCookie("uyun-unique-id"), url: w.clientStore.accessPage(), title: v.title, referrer: w.clientStore.referrer() }
    }, w.actionData = function() {
        var e, t, n, r, o, i, a;
        return sessionStorage.getItem("YYRUM-Store") && (e = JSON.parse(sessionStorage.getItem("YYRUM-Store"))), t = e && e.event ? e.event : "redirect", e && e.url ? (n = e.url, i = e.url) : (n = location.href, i = location.href), i.indexOf("?") > -1 && (i = i.split("?")[0]), r = e && e.selector ? e.selector : "", o = e && e.text ? e.text || v.title : v.title, a = e && e.title ? e.title || "" : "", e && e.timeStamp ? timeStamp = e.broada123timeStamp || I.getTime() : timeStamp = I.getTime(), { operation: { operationType: t, srcName: a, timeStamp: timeStamp, url: n, text: o, selector: r } }
    }, w.pageTimingData = function() {
        var e = performance.timing;
        return I.merge(w.actionData(), { pageInfo: b, timing: e, startTime: I.getTime() })
    }, w.reourceData = function(e) {
        if (performance && window.performance.getEntriesByType && performance.getEntriesByType("resource")) {
            var t = performance.getEntriesByType("resource");
            if (resMin = [], e) {
                for (var n = [], r = 0, o = t.length; o > r; r++) "xmlhttprequest" != t[r].initiatorType && "img" != t[r].initiatorType && "script" != t[r].initiatorType || t[r].name.indexOf("browser/v1") < 0 && n.push(t[r]);
                t = n
            }
            for (var r = 0, o = t.length; o > r; r++) {
                resMin.url = t[r].name;
                var i = t[r].name;
                switch (initiatorType = t[r].initiatorType, initiatorType) {
                    case "link":
                        i = "css";
                        break;
                    case "img":
                        i = "img";
                        break;
                    case "xmlhttprequest":
                        i = "xhr";
                        break;
                    case "css":
                        var a = t[r].name;
                        i = /\.(gif|png|jpg|jpeg)$/.test(a) ? "img" : "font";
                        break;
                    case "script":
                        i = "js";
                        break;
                    default:
                        i = "document"
                }
                var s = {};
                s.url = t[r].name, s.resType = i, s.startTime = t[r].fetchStart, s.endTime = t[r].responseEnd, resMin.push(s)
            }
            return I.merge(w.actionData(), { pageInfo: b, res: resMin })
        }
    };
    var j, P, Y, _, B, H, J, X, G, V, W, F, $, z, K, Q, Z, ee = [].indexOf || function(e) {
        for (var t = 0, n = this.length; n > t; t++)
            if (t in this && this[t] === e) return t;
        return -1
    };
    P = "before", j = "after", W = "readyState", V = "addEventListener", G = "removeEventListener", B = "dispatchEvent", K = "XMLHttpRequest", H = "FormData", F = ["load", "loadend", "loadstart"], Y = ["progress", "abort", "error", "timeout"], h = function(e, t) {
        return Array.prototype.slice.call(e, t)
    }, depricatedProp = function(e) {
        return "returnValue" === e || "totalSize" === e || "position" === e
    }, mergeObjects = function(e, t) {
        var n, r;
        for (n in e)
            if (r = e[n], !depricatedProp(n)) try { t[n] = e[n] } catch (o) {}
        return t
    }, proxyEvents = function(e, t, n) {
        var r, o, i, a;
        for (o = function(e) {
                return function(r) {
                    var o, i, a;
                    o = {};
                    for (i in r) depricatedProp(i) || (a = r[i], o[i] = a === t ? n : a);
                    return n[B](e, o)
                }
            }, i = 0, a = e.length; a > i; i++) r = e[i], n._has(r) && (t["on" + r] = o(r))
    }, _ = function(e) {
        var n, r, o;
        return r = {}, o = function(e) {
            return r[e] || []
        }, n = {}, n[V] = function(e, n, i) { r[e] = o(e), r[e].indexOf(n) >= 0 || (i = i === t ? r[e].length : i, r[e].splice(i, 0, n)) }, n[G] = function(e, n) {
            var i;
            return e === t ? void(r = {}) : (n === t && (r[e] = []), i = o(e).indexOf(n), void(-1 !== i && o(e).splice(i, 1)))
        }, n[B] = function() {
            var e, t, r, i, a, s, u, c;
            for (e = h(arguments), t = e.shift(), i = n["on" + t], i && i.apply(n, e), c = o(t).concat(o("*")), r = s = 0, u = c.length; u > s; r = ++s) a = c[r], a.apply(n, e)
        }, n._has = function(e) {
            return !(!r[e] && !n["on" + e])
        }, e && (n.listeners = function(e) {
            return h(o(e))
        }, n.on = n[V], n.off = n[G], n.fire = n[B], n.once = function(e, t) {
            var r;
            return r = function() {
                return n.off(e, r), t.apply(null, arguments)
            }, n.on(e, r)
        }, n.destroy = function() {
            return r = {}
        }), n
    }, Z = _(!0), Z.EventEmitter = _, Z[P] = function(e, t) {
        if (e.length < 1 || e.length > 2) throw "invalid hook";
        return Z[V](P, e, t)
    }, Z[j] = function(e, t) {
        if (e.length < 2 || e.length > 3) throw "invalid hook";
        return Z[V](j, e, t)
    }, Z.enable = function() { window[K] = z, J && (window[H] = $) }, Z.disable = function() { window[K] = Z[K], J && (window[H] = J) }, Q = Z.headers = function(e, t) {
        var n, r, o, i, a, s, u, c, d;
        switch (null == t && (t = {}), typeof e) {
            case "object":
                r = [];
                for (o in e) a = e[o], i = o.toLowerCase(), r.push("" + i + ":	" + a);
                return r.join("\n");
            case "string":
                for (r = e.split("\n"), u = 0, c = r.length; c > u; u++) n = r[u], /([^:]+):\s*(.+)/.test(n) && (i = null != (d = RegExp.$1) ? d.toLowerCase() : void 0, s = RegExp.$2, null == t[i] && (t[i] = s));
                return t
        }
    }, J = window[H], $ = function(e) {
        var t;
        this.fd = e ? new J(e) : new J, this.form = e, t = [], Object.defineProperty(this, "entries", {
            get: function() {
                var n;
                return n = e ? h(e.querySelectorAll("input,select")).filter(function(e) {
                    var t;
                    return "checkbox" !== (t = e.type) && "radio" !== t || e.checked
                }).map(function(e) {
                    return [e.name, "file" === e.type ? e.files : e.value]
                }) : [], n.concat(t)
            }
        }), this.append = function(e) {
            return function() {
                var n;
                return n = h(arguments), t.push(n), e.fd.append.apply(e.fd, n)
            }
        }(this)
    }, J && (Z[H] = J, window[H] = $), X = window[K], Z[K] = X, z = window[K] = function() {
        var e, t, n, r, o, i, a, s, u, c, d, l, f, p, m, h, g, v, y, T, w;
        e = -1, v = new Z[K], d = {}, p = null, a = void 0, m = void 0, l = void 0, c = function() {
            var t, n, r, o;
            if (l.status = p || v.status, p !== e && (l.statusText = v.statusText), p !== e) {
                o = Q(v.getAllResponseHeaders());
                for (t in o) r = o[t], l.headers[t] || (n = t.toLowerCase(), l.headers[n] = r)
            }
        }, u = function() { v.responseType && "text" !== v.responseType ? "document" === v.responseType ? (l.xml = v.responseXML, l.data = v.responseXML) : l.data = v.response : (l.text = v.responseText, l.data = v.responseText), "responseURL" in v && (l.finalUrl = v.responseURL) }, g = function() { i.status = l.status, i.statusText = l.statusText }, h = function() { "text" in l && (i.responseText = l.text), "xml" in l && (i.responseXML = l.xml), "data" in l && (i.response = l.data), "finalUrl" in l && (i.responseURL = l.finalUrl) }, r = function(e) {
            for (; e > t && 4 > t;) i[W] = ++t, 1 === t && (i[B]("loadstart", {}), O.requestStartTime = I.getTime()), 2 === t && (g(), O.requestEndTime = I.getTime(), O.responseStartTime = I.getTime()), 4 === t && (g(), h(), O.responseEndTime = I.getTime(), O.callbackStartTime = I.getTime()), i[B]("readystatechange", {}), 4 === t && setTimeout(n, 0)
        }, n = function() { O.callbackEndTime = I.getTime(), a || i[B]("load", {}), i[B]("loadend", {}), a && (i[W] = 0) }, t = 0, f = function(e) {
            var t, n;
            return 4 !== e ? void r(e) : (t = Z.listeners(j), n = function() {
                var e;
                return t.length ? (e = t.shift(), 2 === e.length ? (e(d, l), n()) : 3 === e.length && d.async ? e(d, l, n) : n()) : r(4)
            }, void n())
        }, i = d.xhr = _(), v.onreadystatechange = function(e) {
            try { 2 === v[W] && c() } catch (t) {}
            4 === v[W] && (m = !1, c(), u()), f(v[W])
        }, v.onload = function() { O.status = v.status }, s = function() { a = !0 }, i[V]("error", s), i[V]("timeout", s), i[V]("abort", s), i[V]("progress", function() { 3 > t ? f(3) : i[B]("readystatechange", {}) }), ("withCredentials" in v || Z.addWithCredentials) && (i.withCredentials = !1), i.status = 0, w = Y.concat(F);
        for (y = 0, T = w.length; T > y; y++) o = w[y], i["on" + o] = null;
        return i.open = function(e, n, r, o, i) { t = 0, a = !1, m = !1, d.headers = {}, d.headerNames = {}, d.status = 0, l = {}, l.headers = {}, d.method = e, d.url = n, d.async = r !== !1, d.user = o, d.pass = i, f(1) }, i.send = function(e) {
            var t, n, r, o, a, s, u, c;
            for (c = ["type", "timeout", "withCredentials"], s = 0, u = c.length; u > s; s++) n = c[s], r = "type" === n ? "responseType" : n, r in i && (d[n] = i[r]);
            d.body = e, a = function() {
                var e, t, o, a, s, u;
                for (proxyEvents(Y, v, i), i.upload && proxyEvents(Y.concat(F), v.upload, i.upload), m = !0, v.open(d.method, d.url, d.async, d.user, d.pass), s = ["type", "timeout", "withCredentials"], o = 0, a = s.length; a > o; o++) n = s[o], r = "type" === n ? "responseType" : n, n in d && (v[r] = d[n]);
                u = d.headers;
                for (e in u) t = u[e], e && v.setRequestHeader(e, t);
                d.body instanceof $ && (d.body = d.body.fd), v.send(d.body)
            }, t = Z.listeners(P), (o = function() {
                var e, n;
                return t.length ? (e = function(e) {
                    return "object" != typeof e || "number" != typeof e.status && "number" != typeof l.status ? void o() : (mergeObjects(e, l), ee.call(e, "data") < 0 && (e.data = e.response || e.text), void f(4))
                }, e.head = function(e) {
                    return mergeObjects(e, l), f(2)
                }, e.progress = function(e) {
                    return mergeObjects(e, l), f(3)
                }, n = t.shift(), 1 === n.length ? e(n(d)) : 2 === n.length && d.async ? n(d, e) : e()) : a()
            })()
        }, i.abort = function() { p = e, m ? v.abort() : i[B]("abort", {}) }, i.setRequestHeader = function(e, t) {
            var n, r;
            n = null != e ? e.toLowerCase() : void 0, r = d.headerNames[n] = d.headerNames[n] || e, d.headers[r] && (t = d.headers[r] + ", " + t), d.headers[r] = t
        }, i.getResponseHeader = function(e) {
            var t;
            return t = null != e ? e.toLowerCase() : void 0, l.headers[t]
        }, i.getAllResponseHeaders = function() {
            return Q(l.headers)
        }, v.overrideMimeType && (i.overrideMimeType = function() {
            return v.overrideMimeType.apply(v, arguments)
        }), v.upload && (i.upload = d.upload = _()), i
    }, w.xhook = Z;
    for (var te = ["click", "dbclick", "keydown", "keyup", "submit"], ne = [], re = 0, oe = 0, ie = !1, ae = 100, se = 0, ue = te.length; ue > se; se++) {
        var ce = te[se];
        document.addEventListener(ce, function(e) {
            if (e.target != document && e.target != document.body && e.target != document.documentElement && (i(), oe = I.getTime(), ie && oe > re)) {
                var t = e.target;
                O.selector = D.genCssSelector(t), O.operationType = "xhr", O.uuid = I.uuid(), O.apdex = w.computeApdex(!0, ae), O.text = t.innerText || t.value || "", O.url && O.url.indexOf("browser/v1") < 0 && O.requestEndTime && O.text.length < 10 && ne.push(O), ie = !1, O = {}
            }
        }, !1)
    }
    document.addEventListener("change", function(e) {
        i();
        var t = e.target,
            n = t.options[t.selectedIndex].value;
        selector = D.genCssSelector(t), callbackStartTime = I.getTime(), setTimeout(function() { ie && (O.selector = selector, O.operationType = "xhr", O.uuid = I.uuid(), O.apdex = w.computeApdex(!0, ae), O.text = n, O.url && O.url.indexOf("browser/v1") < 0 && O.requestEndTime && O.text.length < 10 && ne.push(O), ie = !1, O = {}) }, 2e3)
    }, !0);
    var de = 0,
        le = 0;
    Z.before(function(e) {
        de = (new Date).getTime();
        var t = e.url;
        /http|https/.test(t) ? O.url = t : O.url = location.protocol + "//" + v.domain + t, !ie && (ie = !0), re = I.getTime()
    }), Z.after(function(e, t) { le = (new Date).getTime(), ae = le - de }), D.monitorElements("a", function(e) {
        A.onevent(e, "click", !0, function(e) {
            if (e.isTrusted) {
                var t = e.target,
                    n = I.getTime(),
                    r = { event: "link", startTime: n, endTime: "", selector: D.getNodeDescriptor(t).selector, text: t.innerText || t.innerHTML, title: v.title, url: location.href, timeStamp: I.getTime() };
                i(), sessionStorage.setItem("YYRUM-Store", JSON.stringify(r))
            }
        })
    }), A.onsubmit(function(e) {
        if (e.form) {
            var t = e.target,
                n = I.getTime(),
                r = { event: "form", startTime: n, endTime: "", selector: D.getNodeDescriptor(t).selector, text: t.value, title: v.title, url: location.href };
            i(), sessionStorage.setItem("YYRUM-Store", JSON.stringify(r))
        }
    }), w.computeStackTrace = function() {
        function e(e, i, a, s, u) {
            var c = t(i);
            c.onreadystatechange = function() {
                if (4 == c.readyState && 200 == c.status) {
                    I.has(r, i) || (r[i] = c.responseText ? c.responseText.split("\n") : []);
                    var t = n(r[i], a),
                        u = t.length,
                        d = 0;
                    d = u > 10 ? Math.floor(u / 2) : u - o / 2 + 1, N.push({ uuid: I.uuid(), message: e, url: i, col: s, line: a, newLine: d, stack: { url: i, line: a, col: s, context: t.join("\n") }, userAgent: T })
                }
            }
        }

        function t(e) {
            try {
                var t = function() {
                        try {
                            return new window.XMLHttpRequest
                        } catch (e) {
                            return new window.ActiveXObject("Microsoft.XMLHTTP")
                        }
                    },
                    n = t();
                return n.open("GET", e, !0), n.send(), n
            } catch (r) {
                return ""
            }
        }

        function n(e, t) {
            if (!e.length) return null;
            var n = [],
                r = Math.floor(o / 2),
                i = r + o % 2,
                a = Math.max(0, t - r - 1),
                s = Math.min(e.length, t + i - 1);
            t -= 1;
            for (var u = a; s > u; ++u) I.isUndefined(e[u]) || n.push(e[u]);
            return n.length > 0 ? n : null
        }
        var r = {},
            o = 10,
            i = null;
        w.info.errorData && (i = w.info.errorData, S = !0, e(i.msg, i.url, i.line, i.col, i.error)), window.onerror = function(t, n, r, o, i) { S = !0, e(t, n, r, o, i) }
    }, setInterval(function() { a() }, x), w.initMetaData = function(e) { r(e, !0) }, u()
}(window);
