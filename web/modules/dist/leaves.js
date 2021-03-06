! function() {
    return function e(t, a, l) {
        function i(n, o) {
            if (!a[n]) {
                if (!t[n]) {
                    var s = "function" == typeof require && require;
                    if (!o && s) return s(n, !0);
                    if (r) return r(n, !0);
                    var u = new Error("Cannot find module '" + n + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var c = a[n] = {
                    exports: {}
                };
                t[n][0].call(c.exports, function(e) {
                    return i(t[n][1][e] || e)
                }, c, c.exports, e, t, a, l)
            }
            return a[n].exports
        }
        for (var r = "function" == typeof require && require, n = 0; n < l.length; n++) i(l[n]);
        return i
    }
}()({
    1: [function(e, t, a) {
        "use strict";
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var l = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var l = t[a];
                    l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l)
                }
            }
            return function(t, a, l) {
                return a && e(t.prototype, a), l && e(t, l), t
            }
        }();
        var i = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            return l(e, [{
                key: "getKey",
                value: function(e, t) {
                    var a = e + "|";
                    for (var l in t) a += l + "=" + t[l] + "|";
                    return a
                }
            }, {
                key: "invalidateTable",
                value: function(e) {
                    for (var t = void 0, a = 0; a < localStorage.length; a++)(t = localStorage.key(a)).indexOf("t=" + e) > 0 && localStorage.removeItem(t)
                }
            }, {
                key: "getData",
                value: function(e) {
                    var t = void 0;
                    if ("undefined" == typeof Storage) return null;
                    var a = localStorage.getItem(e);
                    return void 0 !== a && null != a && "" !== a ? void 0 === (t = JSON.parse(a)) || null == t ? null : void 0 !== t.status && null != t.status && "SUCCESS" !== t.status ? null : t : null
                }
            }, {
                key: "setData",
                value: function(e, t) {
                    if ("undefined" == typeof Storage) return null;
                    if (void 0 !== t.status && null != t.status && "SUCCESS" !== t.status) return null;
                    var a = JSON.stringify(t);
                    return localStorage.setItem(e, a), a
                }
            }]), e
        }();
        a.default = i
    }, {}],
    2: [function(e, t, a) {
        "use strict";
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var l = function() {
                function e(e, t) {
                    for (var a = 0; a < t.length; a++) {
                        var l = t[a];
                        l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l)
                    }
                }
                return function(t, a, l) {
                    return a && e(t.prototype, a), l && e(t, l), t
                }
            }(),
            i = n(e("./ModuleBase")),
            r = n(e("../api-common/RequestCache"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var o = function(e) {
            function t(e, a, l, i) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return r.moduleRelativeURL = null, r.tableData = [], r.sourceData = [], r.filter = null, r.origFilter = null, r.orderBy = null, r.currentElement = null, r.initAdapter(e, a, l, i), r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, i.default), l(t, [{
                key: "initAdapter",
                value: function(e, t, a, l) {
                    this.moduleRelativeURL = baseUrl, this.table = e, this.tab = null == t ? e : t, this.filter = null == a ? null : a, this.origFilter = this.filter, this.orderBy = null == l ? null : l, this.trackEvent("initAdapter", t), this.requestCache = new r.default
                }
            }, {
                key: "setFilter",
                value: function(e) {
                    this.filter = e
                }
            }, {
                key: "preSetFilterExternal",
                value: function(e) {
                    this.initialFilter = e
                }
            }, {
                key: "setFilterExternal",
                value: function(e) {
                    var t = e;
                    null == t && (t = this.initialFilter), null != t && (this.setFilter(t), this.filtersAlreadySet = !0, $("#" + this.getTableName() + "_resetFilters").show(), this.currentFilterString = this.getFilterString(t))
                }
            }, {
                key: "getFilter",
                value: function() {
                    return this.filter
                }
            }, {
                key: "setOrderBy",
                value: function(e) {
                    this.orderBy = e
                }
            }, {
                key: "getOrderBy",
                value: function() {
                    return this.orderBy
                }
            }, {
                key: "add",
                value: function(e, t, a, l) {
                    var i = this;
                    null == a && (a = !0), $(e).attr("a", "add"), $(e).attr("t", this.table), i.showLoader(), this.requestCache.invalidateTable(this.table), $.post(this.moduleRelativeURL, e, function(e) {
                        "SUCCESS" === e.status ? i.addSuccessCallBack(t, e.object, a, l, i) : i.addFailCallBack(t, e.object)
                    }, "json").always(function() {
                        i.hideLoader()
                    }), this.trackEvent("add", this.tab, this.table)
                }
            }, {
                key: "addSuccessCallBack",
                value: function(e, t, a, l, i) {
                    a && this.get(e), this.initFieldMasterData(), null != l && l.apply(i, [t]), this.trackEvent("addSuccess", this.tab, this.table)
                }
            }, {
                key: "addFailCallBack",
                value: function(e, t) {
                    try {
                        this.closePlainMessage()
                    } catch (e) {}
                    this.showMessage("Error saving", t), this.trackEvent("addFailed", this.tab, this.table)
                }
            }, {
                key: "deleteObj",
                value: function(e, t) {
                    var a = this;
                    a.showLoader(), this.requestCache.invalidateTable(this.table), $.post(this.moduleRelativeURL, {
                        t: this.table,
                        a: "delete",
                        id: e
                    }, function(e) {
                        "SUCCESS" === e.status ? a.deleteSuccessCallBack(t, e.object) : a.deleteFailCallBack(t, e.object)
                    }, "json").always(function() {
                        a.hideLoader()
                    }), this.trackEvent("delete", this.tab, this.table)
                }
            }, {
                key: "deleteSuccessCallBack",
                value: function(e, t) {
                    this.get(e), this.clearDeleteParams()
                }
            }, {
                key: "deleteFailCallBack",
                value: function(e, t) {
                    this.clearDeleteParams(), this.showMessage("Error Occurred while Deleting Item", t)
                }
            }, {
                key: "get",
                value: function(e) {
                    var t = this;
                    if (this.getRemoteTable()) return this.createTableServer(this.getTableName()), $("#" + this.getTableName() + "Form").hide(), void $("#" + this.getTableName()).show();
                    var a = JSON.stringify(this.getSourceMapping()),
                        l = "";
                    null !== this.getFilter() && (l = JSON.stringify(this.getFilter()));
                    var i = "";
                    null !== this.getOrderBy() && (i = this.getOrderBy()), a = this.fixJSON(a), l = this.fixJSON(l), t.showLoader(), $.post(this.moduleRelativeURL, {
                        t: this.table,
                        a: "get",
                        sm: a,
                        ft: l,
                        ob: i
                    }, function(a) {
                        "SUCCESS" === a.status ? t.getSuccessCallBack(e, a.object) : t.getFailCallBack(e, a.object)
                    }, "json").always(function() {
                        t.hideLoader()
                    }), t.initFieldMasterData(), this.trackEvent("get", this.tab, this.table)
                }
            }, {
                key: "getDataUrl",
                value: function(e) {
                    var t = JSON.stringify(this.getSourceMapping()),
                        a = JSON.stringify(e),
                        l = "";
                    null !== this.getFilter() && (l = JSON.stringify(this.getFilter()));
                    var i = "";
                    null !== this.getOrderBy() && (i = this.getOrderBy());
                    var r = this.moduleRelativeURL.replace("service.php", "data.php");
                    return r = (r = (r = (r = (r = r + "?t=" + this.table) + "&sm=" + this.fixJSON(t)) + "&cl=" + this.fixJSON(a)) + "&ft=" + this.fixJSON(l)) + "&ob=" + i, this.isSubProfileTable() && (r += "&type=sub"), this.remoteTableSkipProfileRestriction() && (r += "&skip=1"), r
                }
            }, {
                key: "isSubProfileTable",
                value: function() {
                    return !1
                }
            }, {
                key: "remoteTableSkipProfileRestriction",
                value: function() {
                    return !1
                }
            }, {
                key: "preProcessTableData",
                value: function(e) {
                    return e
                }
            }, {
                key: "getSuccessCallBack",
                value: function(e, t) {
                    for (var a = [], l = this.getDataMapping(), i = 0; i < t.length; i++) {
                        for (var r = [], n = 0; n < l.length; n++) r[n] = t[i][l[n]];
                        a.push(this.preProcessTableData(r))
                    }
                    this.sourceData = t, void 0 !== e.callBack && null !== e.callBack && (void 0 !== e.callBackData && null !== e.callBackData || (e.callBackData = []), e.callBackData.push(t), e.callBackData.push(a), this.callFunction(e.callBack, e.callBackData)), this.tableData = a, void 0 !== e.noRender && null !== e.noRender && !0 === e.noRender || (this.createTable(this.getTableName()), $("#" + this.getTableName() + "Form").hide(), $("#" + this.getTableName()).show())
                }
            }, {
                key: "getFailCallBack",
                value: function(e, t) {}
            }, {
                key: "getElement",
                value: function(e, t, a) {
                    var l = this,
                        i = JSON.stringify(this.getSourceMapping());
                    i = this.fixJSON(i), l.showLoader(), $.post(this.moduleRelativeURL, {
                        t: this.table,
                        a: "getElement",
                        id: e,
                        sm: i
                    }, function(e) {
                        "SUCCESS" === e.status ? (a && delete e.object.id, this.currentElement = e.object, l.getElementSuccessCallBack.apply(l, [t, e.object])) : l.getElementFailCallBack.apply(l, [t, e.object])
                    }, "json").always(function() {
                        l.hideLoader()
                    }), this.trackEvent("getElement", this.tab, this.table)
                }
            }, {
                key: "getElementSuccessCallBack",
                value: function(e, t) {
                    void 0 !== e.callBack && null !== e.callBack && (void 0 !== e.callBackData && null !== e.callBackData || (e.callBackData = []), e.callBackData.push(t), this.callFunction(e.callBack, e.callBackData, this)), this.currentElement = t, void 0 !== e.noRender && null !== e.noRender && !0 === e.noRender || this.renderForm(t)
                }
            }, {
                key: "getElementFailCallBack",
                value: function(e, t) {}
            }, {
                key: "getTableData",
                value: function() {
                    return this.tableData
                }
            }, {
                key: "getTableName",
                value: function() {
                    return this.tab
                }
            }, {
                key: "getFieldValues",
                value: function(e, t) {
                    var a = this,
                        l = "",
                        i = "";
                    void 0 !== e[3] && null !== e[3] && (l = e[3]), void 0 !== e[4] && null !== e[4] && (i = JSON.stringify(e[4]));
                    var r = this.requestCache.getKey(this.moduleRelativeURL, {
                            t: e[0],
                            key: e[1],
                            value: e[2],
                            method: l,
                            methodParams: i,
                            a: "getFieldValues"
                        }),
                        n = this.requestCache.getData(r);
                    null != n && "SUCCESS" === n.status && (t.callBackData.push(n.data), null !== t.callBackSuccess && void 0 !== t.callBackSuccess && t.callBackData.push(t.callBackSuccess), a.callFunction(t.callBack, t.callBackData));
                    var o = function e(l) {
                        if ("SUCCESS" === l.status) {
                            a.requestCache.setData(this.success.key, l);
                            var i = t;
                            i.callBackData = [t.callBackData[0]], i.callBackData.push(l.data), null !== i.callBackSuccess && void 0 !== i.callBackSuccess && i.callBackData.push(t.callBackSuccess), a.callFunction(i.callBack, i.callBackData)
                        } else "Access violation" === l.message && alert("Error : " + e.table + " " + l.message)
                    };
                    o.key = r, o.table = e[0], $.post(this.moduleRelativeURL, {
                        t: e[0],
                        key: e[1],
                        value: e[2],
                        method: l,
                        methodParams: i,
                        a: "getFieldValues"
                    }, o, "json")
                }
            }, {
                key: "setAdminProfile",
                value: function(e) {
                    try {
                        localStorage.clear()
                    } catch (e) {}
                    $.post(this.moduleRelativeURL, {
                        a: "setAdminEmp",
                        empid: e
                    }, function() {
                        top.location.href = clientUrl
                    }, "json")
                }
            }, {
                key: "customAction",
                value: function(e, t, a, l, i) {
                    var r = this;
                    a = this.fixJSON(a), i ? $.post(this.moduleRelativeURL, {
                        t: this.table,
                        a: "ca",
                        sa: e,
                        mod: t,
                        req: a
                    }, function(e) {
                        "SUCCESS" === e.status ? (l.callBackData.push(e.data), r.callFunction(l.callBackSuccess, l.callBackData)) : (l.callBackData.push(e.data), r.callFunction(l.callBackFail, l.callBackData))
                    }, "json") : $.getJSON(this.moduleRelativeURL, {
                        t: this.table,
                        a: "ca",
                        sa: e,
                        mod: t,
                        req: a
                    }, function(e) {
                        "SUCCESS" === e.status ? (l.callBackData.push(e.data), r.callFunction(l.callBackSuccess, l.callBackData)) : (l.callBackData.push(e.data), r.callFunction(l.callBackFail, l.callBackData))
                    })
                }
            }, {
                key: "sendCustomRequest",
                value: function(e, t, a, l) {
                    t.a = e, $.post(this.moduleRelativeURL, t, function(e) {
                        "SUCCESS" === e.status ? a(e.data) : l(e.data)
                    }, "json")
                }
            }, {
                key: "getCustomActionUrl",
                value: function(e, t) {
                    t.a = e;
                    var a = "";
                    for (var l in t) t.hasOwnProperty(l) && ("" !== a && (a += "&"), a += l + "=" + t[l]);
                    return this.moduleRelativeURL + "?" + a
                }
            }, {
                key: "getClientDataUrl",
                value: function() {
                    return this.moduleRelativeURL.replace("service.php", "") + "data/"
                }
            }, {
                key: "getCustomUrl",
                value: function(e) {
                    return this.moduleRelativeURL.replace("service.php", e)
                }
            }]), t
        }();
        a.default = o
    }, {
        "../api-common/RequestCache": 1,
        "./ModuleBase": 4
    }],
    3: [function(e, t, a) {
        "use strict";
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var l = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var l = t[a];
                    l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l)
                }
            }
            return function(t, a, l) {
                return a && e(t.prototype, a), l && e(t, l), t
            }
        }();
        var i = {
                float: function(e) {
                    return !(null == e || !e.match(/^[-+]?[0-9]+(\.[0-9]+)?$/))
                },
                number: function(e) {
                    return !(null == e || !e.match(/^[0-9]+$/))
                },
                numberOrEmpty: function(e) {
                    if ("" === e) return !0;
                    return !(null == e || !e.match(/^[0-9]+$/))
                },
                email: function(e) {
                    return null != e && /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/.test(e)
                },
                emailOrEmpty: function(e) {
                    if ("" === e) return !0;
                    return null != e && /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/.test(e)
                },
                username: function(e) {
                    return null != e && /^[a-zA-Z0-9.-]+$/.test(e)
                },
                input: function(e) {
                    return null != e && e.length > 0
                }
            },
            r = function() {
                function e(t, a, l) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.tempOptions = {}, this.formId = t, this.formError = !1, this.formObject = null, this.errorMessages = "", this.popupDialog = null, this.validateAll = a, this.errorMap = [], this.settings = {
                        thirdPartyPopup: null,
                        LabelErrorClass: !1,
                        ShowPopup: !0
                    }, this.settings = jQuery.extend(this.settings, l), this.inputTypes = ["text", "radio", "checkbox", "file", "password", "select-one", "select-multi", "textarea", "fileupload", "signature"], this.validator = i
                }
                return l(e, [{
                    key: "clearError",
                    value: function(e, t) {
                        var a = e.attr("id");
                        $("#" + this.formId + " #field_" + a).removeClass("error"), $("#" + this.formId + " #help_" + a).html("")
                    }
                }, {
                    key: "addError",
                    value: function(e, t) {
                        this.formError = !0, null != e.attr("message") ? (this.errorMessages += e.attr("message") + "\n", this.errorMap[e.attr("name")] = e.attr("message")) : this.errorMap[e.attr("name")] = "";
                        var a = e.attr("id"),
                            l = e.attr("validation"),
                            i = e.attr("validation");
                        $("#" + this.formId + " #field_" + a).addClass("error"), void 0 === i || null == i || "" === i ? $("#" + this.formId + " #help_err_" + a).html(i) : void 0 === l || null == l || "" === l ? $("#" + this.formId + " #help_err_" + a).html("Required") : "float" === l || "number" === l ? $("#" + this.formId + " #help_err_" + a).html("Number required") : "email" === l ? $("#" + this.formId + " #help_err_" + a).html("Email required") : $("#" + this.formId + " #help_err_" + a).html("Required")
                    }
                }, {
                    key: "showErrors",
                    value: function() {
                        this.formError && (void 0 !== this.settings.thirdPartyPopup && null != this.settings.thirdPartyPopup ? this.settings.thirdPartyPopup.alert() : !0 === this.settings.ShowPopup && (void 0 !== this.tempOptions.popupTop && null != this.tempOptions.popupTop ? this.alert("Errors Found", this.errorMessages, this.tempOptions.popupTop) : this.alert("Errors Found", this.errorMessages, -1)))
                    }
                }, {
                    key: "checkValues",
                    value: function(e) {
                        this.tempOptions = e;
                        var t = this;
                        this.formError = !1, this.errorMessages = "", this.formObject = {};
                        var a = function(e) {
                                var a = null,
                                    l = e.attr("name");
                                !1 !== t.settings.LabelErrorClass && $("label[for='" + l + "']").removeClass(t.settings.LabelErrorClass);
                                var i = e.attr("id"),
                                    r = e.attr("type");
                                if (e.hasClass("select2-focusser") || e.hasClass("select2-input")) return !0;
                                if (jQuery.inArray(r, t.inputTypes) >= 0) {
                                    if (e.hasClass("uploadInput")) a = e.attr("val");
                                    else if ("radio" === r || "checkbox" === r) a = $("input[name='" + l + "']:checked").val();
                                    else if (e.hasClass("select2Field")) a = null != $("#" + t.formId + " #" + i).select2("data") && void 0 !== $("#" + t.formId + " #" + i).select2("data") ? $("#" + t.formId + " #" + i).select2("data").id : "";
                                    else if (e.hasClass("select2Multi"))
                                        if (null != $("#" + t.formId + " #" + i).select2("data") && void 0 !== $("#" + t.formId + " #" + i).select2("data")) {
                                            var n = $("#" + t.formId + " #" + i).select2("data");
                                            a = [];
                                            for (var o = 0; o < n.length; o++) a.push(n[o].id);
                                            a = JSON.stringify(a)
                                        } else a = "";
                                    else a = e.hasClass("signatureField") ? $("#" + t.formId + " #" + i).data("signaturePad").isEmpty() ? "" : $("#" + i).data("signaturePad").toDataURL() : e.hasClass("simplemde") ? $("#" + t.formId + " #" + i).data("simplemde").value() : e.hasClass("tinymce") ? tinyMCE.get(i).getContent({
                                        format: "raw"
                                    }) : e.val();
                                    var s = e.attr("validation"),
                                        u = !1;
                                    void 0 !== s && null != s && void 0 !== t.validator[s] && null != t.validator[s] ? u = t.validator[s](a) : (u = !t.validateAll || (void 0 !== s && null != s && "none" === s || t.validator.input(a)), t.formObject[i] = a), u ? (t.clearError(e, null), t.formObject[i] = a) : t.addError(e, null)
                                }
                            },
                            l = $("#" + this.formId + " :input");
                        return l.each(function() {
                            a($(this))
                        }), (l = $("#" + this.formId + " .uploadInput")).each(function() {
                            a($(this))
                        }), this.showErrors(), this.tempOptions = {}, !this.formError
                    }
                }, {
                    key: "getFormParameters",
                    value: function() {
                        return this.formObject
                    }
                }, {
                    key: "alert",
                    value: function(e) {
                        function t(t, a) {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }, t
                    }(function(e, t) {
                        alert(t)
                    })
                }], [{
                    key: "getValidationRules",
                    value: function() {
                        return i
                    }
                }]), e
            }();
        a.default = r
    }, {}],
    4: [function(e, t, a) {
        "use strict";
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var l, i = function() {
                function e(e, t) {
                    for (var a = 0; a < t.length; a++) {
                        var l = t[a];
                        l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l)
                    }
                }
                return function(t, a, l) {
                    return a && e(t.prototype, a), l && e(t, l), t
                }
            }(),
            r = e("./FormValidation"),
            n = (l = r) && l.__esModule ? l : {
                default: l
            };
        var o = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.deleteParams = {}, this.createRemoteTable = !1, this.instanceId = "None", this.ga = [], this.showEdit = !0, this.showDelete = !0, this.showSave = !0, this.showCancel = !0, this.showFormOnPopup = !1, this.filtersAlreadySet = !1, this.currentFilterString = "", this.sorting = 0, this.settings = {}, this.translations = {}, this.customFields = [], this.csrfRequired = !1, this.fieldTemplates = null, this.templates = null, this.customTemplates = null, this.emailTemplates = null, this.fieldMasterData = null, this.fieldMasterDataKeys = null, this.fieldMasterDataCallback = null, this.sourceMapping = null, this.currentId = null, this.currentElement = null, this.user = null, this.currentProfile = null, this.permissions = {}, this.baseUrl = null
            }
            return i(e, [{
                key: "init",
                value: function(e, t, a, l) {}
            }, {
                key: "setNoJSONRequests",
                value: function(e) {
                    this.noJSONRequests = e
                }
            }, {
                key: "setPermissions",
                value: function(e) {
                    this.permissions = e
                }
            }, {
                key: "sortingStarted",
                value: function(e) {
                    this.sorting = e
                }
            }, {
                key: "checkPermission",
                value: function(e) {
                    return void 0 === this.permissions[e] || null == this.permissions[e] || "Yes" === this.permissions[e] ? "Yes" : this.permissions[e]
                }
            }, {
                key: "setBaseUrl",
                value: function(e) {
                    this.baseUrl = e
                }
            }, {
                key: "setUser",
                value: function(e) {
                    this.user = e
                }
            }, {
                key: "getUser",
                value: function() {
                    return this.user
                }
            }, {
                key: "setInstanceId",
                value: function(e) {
                    this.instanceId = e
                }
            }, {
                key: "setCSRFRequired",
                value: function(e) {
                    this.csrfRequired = e
                }
            }, {
                key: "scrollToTop",
                value: function() {
                    $("html, body").animate({
                        scrollTop: 0
                    }, "fast")
                }
            }, {
                key: "scrollToBottom",
                value: function() {
                    $("html, body").animate({
                        scrollTop: $(document).height()
                    }, "slow")
                }
            }, {
                key: "scrollToElement",
                value: function(e) {
                    $(window).height() <= e.offset().top && $("html, body").animate({
                        scrollTop: e.offset().top
                    }, "slow")
                }
            }, {
                key: "scrollToElementBottom",
                value: function(e) {
                    $(window).height() <= e.offset().top + e.height() && $("html, body").animate({
                        scrollTop: e.offset().top + e.height()
                    }, "slow")
                }
            }, {
                key: "setTranslations",
                value: function(e) {
                    this.translations = e.messages[""]
                }
            }, {
                key: "setTranslationsSubModules",
                value: function(e) {
                    this.translations = e
                }
            }, {
                key: "gt",
                value: function(e) {
                    return void 0 === this.translations[e] || null === this.translations[e] ? e : this.translations[e][0]
                }
            }, {
                key: "addToLangTerms",
                value: function(e) {
                    var t = void 0,
                        a = localStorage.getItem("terms");
                    if (void 0 === a) t = {};
                    else try {
                        t = JSON.parse(a)
                    } catch (e) {
                        t = {}
                    }
                    void 0 === this.translations[e] && (t[e] = e, localStorage.setItem("terms", JSON.stringify(t)))
                }
            }, {
                key: "showActionButtons",
                value: function() {
                    return !0
                }
            }, {
                key: "trackEvent",
                value: function(e, t, a) {
                    try {
                        void 0 === t || null == t ? this.ga.push(["_trackEvent", this.instanceId, e]) : void 0 === a || null == a ? this.ga.push(["_trackEvent", this.instanceId, e, t]) : this.ga.push(["_trackEvent", this.instanceId, e, t, a])
                    } catch (e) {}
                }
            }, {
                key: "setCurrentProfile",
                value: function(e) {
                    this.currentProfile = e
                }
            }, {
                key: "getCurrentProfile",
                value: function() {
                    return this.currentProfile
                }
            }, {
                key: "initFieldMasterData",
                value: function(e, t, a) {
                    var l = void 0;
                    void 0 !== this.showAddNew && null != this.showAddNew || (this.showAddNew = !0), this.fieldMasterData = {}, this.fieldMasterDataKeys = {}, this.fieldMasterDataCallback = t, this.fieldMasterDataCallbackData = a, this.sourceMapping = {};
                    var i = this.getFormFields(),
                        r = this.getFilters();
                    if (null != r)
                        for (var n = 0; n < r.length; n++)(null == (l = this.getMetaFieldValues(r[n][0], i)) || "select" !== l.type && "select2" !== l.type && "select2multi" !== l.type) && i.push(r[n]);
                    for (var o = [], s = [], u = null, c = null, d = 0; d < i.length; d++)
                        if (void 0 !== (u = i[d])[1]["remote-source"] && null !== u[1]["remote-source"]) {
                            var h = u[1]["remote-source"][0] + "_" + u[1]["remote-source"][1] + "_" + u[1]["remote-source"][2];
                            o.push(u), s.push(h)
                        } else if (void 0 !== u[1].form && null !== u[1].form)
                        for (var f = 0; f < u[1].form.length; f++)
                            if (void 0 !== (c = u[1].form[f])[1]["remote-source"] && null !== c[1]["remote-source"]) {
                                var p = c[1]["remote-source"][0] + "_" + c[1]["remote-source"][1] + "_" + c[1]["remote-source"][2];
                                s.indexOf(p) < 0 && (o.push(c), s.push(p))
                            }
                    for (var v = 0; v < o.length; v++) {
                        var m = o[v];
                        if (void 0 !== m[1]["remote-source"] && null != m[1]["remote-source"]) {
                            var g = m[1]["remote-source"][0] + "_" + m[1]["remote-source"][1] + "_" + m[1]["remote-source"][2];
                            this.fieldMasterDataKeys[g] = !1, this.sourceMapping[m[0]] = m[1]["remote-source"];
                            var y = {
                                callBack: "initFieldMasterDataResponse"
                            };
                            y.callBackData = [g], null != e && (y.callBackSuccess = e), this.getFieldValues(m[1]["remote-source"], y)
                        }
                    }
                }
            }, {
                key: "setShowFormOnPopup",
                value: function(e) {
                    this.showFormOnPopup = e
                }
            }, {
                key: "setRemoteTable",
                value: function(e) {
                    this.createRemoteTable = e
                }
            }, {
                key: "setSettings",
                value: function(e) {
                    this.settings = e
                }
            }, {
                key: "getRemoteTable",
                value: function() {
                    return this.createRemoteTable
                }
            }, {
                key: "isAllLoaded",
                value: function(e) {
                    for (var t in e)
                        if (!1 === e[t]) return !1;
                    return !0
                }
            }, {
                key: "initFieldMasterDataResponse",
                value: function(e, t, a, l) {
                    this.fieldMasterData[e] = t, this.fieldMasterDataKeys[e] = !0, null != a && a(), null !== this.fieldMasterDataCallback && void 0 !== this.fieldMasterDataCallback && this.isAllLoaded(this.fieldMasterDataKeys) && null !== this.fieldMasterDataCallbackData && void 0 !== this.fieldMasterDataCallbackData ? this.fieldMasterDataCallback(this.fieldMasterDataCallbackData) : null !== this.fieldMasterDataCallback && void 0 !== this.fieldMasterDataCallback && this.isAllLoaded(this.fieldMasterDataKeys) && this.fieldMasterDataCallback()
                }
            }, {
                key: "getMetaFieldValues",
                value: function(e, t) {
                    for (var a = 0; a < t.length; a++)
                        if (e === t[a][0]) return t[a][1];
                    return null
                }
            }, {
                key: "getThemeColors",
                value: function() {
                    return ["red", "yellow", "aqua", "blue", "light-blue", "green", "navy", "teal", "olive", "orange", "fuchsia", "purple"]
                }
            }, {
                key: "getColorByRandomString",
                value: function(e) {
                    var t = this.getThemeColors();
                    return t[e.charCodeAt(0) % t.length]
                }
            }, {
                key: "getColorByFileType",
                value: function(e) {
                    e = e.toLowerCase();
                    var t = {
                        pdf: "red",
                        csv: "yellow",
                        xls: "green",
                        xlsx: "green",
                        doc: "light-blue",
                        docx: "light-blue"
                    };
                    return t.docx = "blue", t.ppt = "orange", t.pptx = "orange", t.jpg = "teal", t.jpeg = "teal", t.gif = "green", t.png = "yellow", t.bmp = "fuchsia", void 0 !== t[e] || null != t[e] ? t[e] : this.getColorByRandomString(e)
                }
            }, {
                key: "getIconByFileType",
                value: function(e) {
                    var t = {
                        pdf: "fa fa-file-pdf-o",
                        csv: "fa fa fa-file-code-o",
                        xls: "fa fa-file-excel-o",
                        xlsx: "fa fa-file-excel-o",
                        doc: "fa fa-file-word-o",
                        docx: "fa fa-file-word-o",
                        ppt: "fa fa-file-powerpoint-o",
                        pptx: "fa fa-file-powerpoint-o",
                        jpg: "fa fa-file-image-o",
                        jpeg: "fa fa-file-image-o",
                        gif: "fa fa-file-image-o",
                        png: "fa fa-file-image-o",
                        bmp: "fa fa-file-image-o",
                        txt: "fa fa-file-text-o",
                        rtf: "fa fa-file-text-o"
                    };
                    return void 0 !== t[e = e.toLowerCase()] || null != t[e] ? t[e] : "fa fa-file-o"
                }
            }, {
                key: "getSourceMapping",
                value: function() {
                    return this.sourceMapping
                }
            }, {
                key: "setTesting",
                value: function(e) {
                    this.testing = e
                }
            }, {
                key: "consoleLog",
                value: function(e) {
                    this.testing && console.log(e)
                }
            }, {
                key: "setClientMessages",
                value: function(e) {
                    this.msgList = e
                }
            }, {
                key: "setTemplates",
                value: function(e) {
                    this.templates = e
                }
            }, {
                key: "getWSProperty",
                value: function(e, t) {
                    return e.hasOwnProperty(t) ? e[t] : null
                }
            }, {
                key: "getClientMessage",
                value: function(e) {
                    return this.getWSProperty(this.msgList, e)
                }
            }, {
                key: "getTemplate",
                value: function(e) {
                    return this.getWSProperty(this.templates, e)
                }
            }, {
                key: "setGoogleAnalytics",
                value: function(e) {
                    this.gaq = e
                }
            }, {
                key: "showView",
                value: function(e) {
                    null != this.currentView && (this.previousView = this.currentView, $("#" + this.currentView).hide()), $("#" + e).show(), this.currentView = e, this.moveToTop()
                }
            }, {
                key: "showPreviousView",
                value: function() {
                    this.showView(this.previousView)
                }
            }, {
                key: "moveToTop",
                value: function() {}
            }, {
                key: "callFunction",
                value: function(e, t, a) {
                    if ($.isFunction(e)) try {
                        null == a ? e.apply(document, t) : e.apply(a, t)
                    } catch (e) {
                        console.log(e.message)
                    } else {
                        var l = this[e];
                        if ($.isFunction(l)) try {
                            l.apply(this, t)
                        } catch (e) {
                            console.log(e.message)
                        }
                    }
                }
            }, {
                key: "getTableTopButtonHtml",
                value: function() {
                    var e = "";
                    return this.getShowAddNew() && (e = '<button onclick="modJs.renderForm();return false;" class="btn btn-small btn-primary">' + this.gt(this.getAddNewLabel()) + ' <i class="fa fa-plus"></i></button>'), null != this.getFilters() && ("" !== e && (e += "&nbsp;&nbsp;"), e += '<button onclick="modJs.showFilters();return false;" class="btn btn-small btn-primary">' + this.gt("Filter") + ' <i class="fa fa-filter"></i></button>', e += "&nbsp;&nbsp;", this.filtersAlreadySet ? e += '<button id="__id___resetFilters" onclick="modJs.resetFilters();return false;" class="btn btn-small btn-default">__filterString__ <i class="fa fa-times"></i></button>' : e += '<button id="__id___resetFilters" onclick="modJs.resetFilters();return false;" class="btn btn-small btn-default" style="display:none;">__filterString__ <i class="fa fa-times"></i></button>'), e = e.replace(/__id__/g, this.getTableName()), "" !== (e = "" !== this.currentFilterString && null != this.currentFilterString ? e.replace(/__filterString__/g, this.currentFilterString) : e.replace(/__filterString__/g, "Reset Filters")) && (e = '<div class="row"><div class="col-xs-12">' + e + "</div></div>"), e
                }
            }, {
                key: "getActionButtonHeader",
                value: function() {
                    return {
                        sTitle: "",
                        sClass: "center"
                    }
                }
            }, {
                key: "getTableHTMLTemplate",
                value: function() {
                    return '<div class="box-body table-responsive"><table cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-striped" id="grid"></table></div>'
                }
            }, {
                key: "isSortable",
                value: function() {
                    return !0
                }
            }, {
                key: "createTable",
                value: function(e) {
                    if (this.getRemoteTable()) this.createTableServer(e);
                    else {
                        var t = this.getHeaders();
                        for (var a in t) t[a].sTitle = this.gt(t[a].sTitle);
                        var l = this.getTableData();
                        if (this.showActionButtons() && t.push(this.getActionButtonHeader()), this.showActionButtons())
                            for (var i = 0; i < l.length; i++) l[i].push(this.getActionButtonsHtml(l[i][0], l[i]));
                        var r;
                        r = this.getTableTopButtonHtml() + this.getTableHTMLTemplate();
                        var n = $("#" + e + " .dataTables_paginate .active a").html(),
                            o = 0;
                        void 0 !== n && null != n && (o = 15 * parseInt(n, 10) - 15), $("#" + e).html(r);
                        var s = {
                                oLanguage: {
                                    sLengthMenu: "_MENU_ records per page"
                                },
                                aaData: l,
                                aoColumns: t,
                                bSort: this.isSortable(),
                                iDisplayLength: 15,
                                iDisplayStart: o
                            },
                            u = this.getCustomTableParams();
                        $.extend(s, u), $("#" + e + " #grid").dataTable(s), $(".dataTables_paginate ul").addClass("pagination"), $(".dataTables_length").hide(), $(".dataTables_filter input").addClass("form-control"), $(".dataTables_filter input").attr("placeholder", "Search"), $(".dataTables_filter label").contents().filter(function() {
                            return 3 === this.nodeType
                        }).remove(), $(".tableActionButton").tooltip()
                    }
                }
            }, {
                key: "createTableServer",
                value: function(e) {
                    var t = this.getHeaders();
                    for (var a in t.push({
                            sTitle: "",
                            sClass: "center"
                        }), t) t[a].sTitle = this.gt(t[a].sTitle);
                    var l;
                    l = this.getTableTopButtonHtml() + this.getTableHTMLTemplate();
                    var i = $("#" + e + " .dataTables_paginate .active a").html(),
                        r = 0;
                    void 0 !== i && null != i && (r = 15 * parseInt(i, 10) - 15), $("#" + e).html(l);
                    var n = {
                        oLanguage: {
                            sLengthMenu: "_MENU_ records per page"
                        },
                        bProcessing: !0,
                        bServerSide: !0,
                        sAjaxSource: this.getDataUrl(this.getDataMapping()),
                        aoColumns: t,
                        bSort: this.isSortable(),
                        parent: this,
                        iDisplayLength: 15,
                        iDisplayStart: r
                    };
                    this.showActionButtons() && (n.aoColumnDefs = [{
                        fnRender: this.getActionButtons,
                        aTargets: [this.getDataMapping().length]
                    }]);
                    var o = this.getCustomTableParams();
                    $.extend(n, o), $("#" + e + " #grid").dataTable(n), $(".dataTables_paginate ul").addClass("pagination"), $(".dataTables_length").hide(), $(".dataTables_filter input").addClass("form-control"), $(".dataTables_filter input").attr("placeholder", "Search"), $(".dataTables_filter label").contents().filter(function() {
                        return 3 === this.nodeType
                    }).remove(), $(".tableActionButton").tooltip()
                }
            }, {
                key: "getHeaders",
                value: function() {}
            }, {
                key: "getDataMapping",
                value: function() {}
            }, {
                key: "getFormFields",
                value: function() {}
            }, {
                key: "getTableData",
                value: function() {}
            }, {
                key: "getFilters",
                value: function() {
                    return null
                }
            }, {
                key: "edit",
                value: function(e) {
                    this.currentId = e, this.getElement(e, [])
                }
            }, {
                key: "copyRow",
                value: function(e) {
                    this.getElement(e, [], !0)
                }
            }, {
                key: "renderModel",
                value: function(e, t, a) {
                    $("#" + e + "ModelBody").html(""), void 0 !== a && null != a || (a = ""), $("#" + e + "ModelLabel").html(t), $("#" + e + "ModelBody").html(a)
                }
            }, {
                key: "renderYesNoModel",
                value: function(e, t, a, l, i, r) {
                    var n = this,
                        o = "#yesnoModel";
                    void 0 !== t && null != t || (t = ""), $(o + "Label").html(e), $(o + "Body").html(t), null != a && $(o + "YesBtn").html(a), null != l && $(o + "NoBtn").html(l), $(o + "YesBtn").off().on("click", function() {
                        void 0 !== i && null != i && (i.apply(n, r), n.cancelYesno())
                    }), $(o).modal({
                        backdrop: "static"
                    })
                }
            }, {
                key: "renderModelFromDom",
                value: function(e, t, a) {
                    $("#" + e + "ModelBody").html(""), void 0 !== a && null != a || (a = $("<div></div>")), $("#" + e + "ModelLabel").html(t), $("#" + e + "ModelBody").html(""), $("#" + e + "ModelBody").append(a)
                }
            }, {
                key: "deleteRow",
                value: function(e) {
                    this.deleteParams.id = e, this.renderModel("delete", "Confirm Deletion", "Are you sure you want to delete this item ?"), $("#deleteModel").modal("show")
                }
            }, {
                key: "showMessage",
                value: function(e, t) {
                    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                        l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                        i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                        r = this,
                        n = "";
                    n = i ? "#plainMessageModel" : "#messageModel", $(n).off(), i ? this.renderModel("plainMessage", e, t) : this.renderModel("message", e, t), null != a ? ($(n).modal({
                        show: !0
                    }), $(n).on("hidden.bs.modal", function() {
                        a.apply(r, l), $(".modal-backdrop").remove()
                    })) : $(n).modal({
                        backdrop: "static"
                    })
                }
            }, {
                key: "showDomElement",
                value: function(e, t, a, l, i) {
                    var r = this,
                        n = "";
                    n = i ? "#dataMessageModel" : "#messageModel", $(n).unbind("hide"), i ? this.renderModelFromDom("dataMessage", e, t) : this.renderModelFromDom("message", e, t), null != a ? ($(n).modal({
                        show: !0
                    }), $(n).on("hidden.bs.modal", function() {
                        a.apply(r, l), $(".modal-backdrop").remove()
                    })) : $(n).modal({
                        backdrop: "static"
                    })
                }
            }, {
                key: "confirmDelete",
                value: function() {
                    void 0 === this.deleteParams.id && null == this.deleteParams.id || this.deleteObj(this.deleteParams.id, []), $("#deleteModel").modal("hide")
                }
            }, {
                key: "cancelDelete",
                value: function() {
                    $("#deleteModel").modal("hide"), this.deleteParams.id = null
                }
            }, {
                key: "closeMessage",
                value: function() {
                    $("#messageModel").modal("hide")
                }
            }, {
                key: "cancelYesno",
                value: function() {
                    $("#yesnoModel").modal("hide")
                }
            }, {
                key: "closePlainMessage",
                value: function() {
                    $("#plainMessageModel").modal("hide"), $("#dataMessageModel").modal("hide")
                }
            }, {
                key: "closeDataMessage",
                value: function() {
                    $("#dataMessageModel").modal("hide")
                }
            }, {
                key: "save",
                value: function(e, t) {
                    // alert(e); return false;
                    var a = new n.default(this.getTableName() + "_submit", !0, {
                        ShowPopup: !1,
                        LabelErrorClass: "error"
                    });
                    if (a.checkValues()) {
                        var l = a.getFormParameters();
                        l = this.forceInjectValuesBeforeSave(l);
                        var i = this.doCustomValidation(l);
                        if (null == i) {
                            this.csrfRequired && (l.csrf = $("#" + this.getTableName() + "Form").data("csrf"));
                            var r = $("#" + this.getTableName() + "_submit #id").val();
                            null != r && void 0 !== r && "" !== r && (l.id = r), l = this.makeEmptyDateFieldsNull(l), this.add(l, [], e, t)
                        } else $("#" + this.getTableName() + "Form .label").html(i), $("#" + this.getTableName() + "Form .label").show(), this.scrollToTop()
                    }
                }
            }, {
                key: "makeEmptyDateFieldsNull",
                value: function(e) {
                    return this.getFormFields().forEach(function(t) {
                        "date" !== t[1].type && "datetime" !== t[1].type || "" !== e[t[0]] && "0000-00-00" !== e[t[0]] && "0000-00-00 00:00:00" !== e[t[0]] || ("none" === t[1].validation ? e[t[0]] = "NULL" : delete e[t[0]])
                    }), e
                }
            }, {
                key: "forceInjectValuesBeforeSave",
                value: function(e) {
                    return e
                }
            }, {
                key: "doCustomValidation",
                value: function(e) {
                    return null
                }
            }, {
                key: "filterQuery",
                value: function() {
                    var e = new n.default(this.getTableName() + "_filter", !0, {
                        ShowPopup: !1,
                        LabelErrorClass: "error"
                    });
                    if (e.checkValues()) {
                        var t = e.getFormParameters();
                        if (this.doCustomFilterValidation(t)) {
                            for (var a in t) t.hasOwnProperty(a) && "NULL" === t[a] && delete t[a];
                            this.setFilter(t), this.filtersAlreadySet = !0, $("#" + this.getTableName() + "_resetFilters").show(), this.currentFilterString = this.getFilterString(t), this.get([]), this.closePlainMessage()
                        }
                    }
                }
            }, {
                key: "getFilterString",
                value: function(e) {
                    var t = "",
                        a = void 0,
                        l = void 0,
                        i = void 0,
                        r = void 0,
                        n = void 0,
                        o = void 0,
                        s = this.getFilters();
                    for (var u in null == i && (i = []), e)
                        if (e.hasOwnProperty(u)) {
                            if (n = "", o = null, "select" === (i = this.getMetaFieldValues(u, s)).type || "select2" === i.type) {
                                if (void 0 !== i["remote-source"] && null != i["remote-source"]) a = i["remote-source"], "NULL" === e[u] ? n = void 0 !== i["null-label"] && null != i["null-label"] ? i["null-label"] : "Not Selected" : o = n = this.fieldMasterData[a[0] + "_" + a[1] + "_" + a[2]][e[u]];
                                else if (l = i.source[0], "NULL" === e[u]) n = void 0 !== i["null-label"] && null != i["null-label"] ? i["null-label"] : "Not Selected";
                                else
                                    for (var c = 0; c < l.length; c++)
                                        if (e[u] === i.source[c][0]) {
                                            o = n = i.source[c][1];
                                            break
                                        }
                            } else if ("select2multi" === i.type) {
                                r = [];
                                try {
                                    r = JSON.parse(e[u])
                                } catch (e) {}
                                "" !== (n = r.join(",")) && (o = n)
                            } else "" !== (n = e[u]) && (o = n);
                            null != o && ("" !== t && (t += " | "), t += i.label + " = " + n)
                        }
                    return t
                }
            }, {
                key: "doCustomFilterValidation",
                value: function(e) {
                    return !0
                }
            }, {
                key: "resetFilters",
                value: function() {
                    this.filter = this.origFilter, this.filtersAlreadySet = !1, $("#" + this.getTableName() + "_resetFilters").hide(), this.currentFilterString = "", this.get([])
                }
            }, {
                key: "showFilters",
                value: function(e) {
                    for (var t = this.templates.filterTemplate, a = "", l = this.getFilters(), i = 0; i < l.length; i++) {
                        var r = this.getMetaFieldForRendering(l[i][0]);
                        if ("" === r || void 0 === r) a += this.renderFormField(l[i]);
                        else {
                            var n = e[r];
                            "" !== n && null != n && void 0 !== n && "" !== n.trim() ? a += this.renderFormField(JSON.parse(n)) : a += this.renderFormField(l[i])
                        }
                    }
                    t = (t = t.replace(/_id_/g, this.getTableName() + "_filter")).replace(/_fields_/g, a);
                    var o = this.generateRandom(14),
                        s = $('<div class="reviewBlock popupForm" data-content="Form"></div>');
                    s.attr("id", o), s.html(t), s.find(".datefield").datepicker({
                        viewMode: 2
                    }), s.find(".timefield").datetimepicker({
                        language: "en",
                        pickDate: !1
                    }), s.find(".datetimefield").datetimepicker({
                        language: "en"
                    }), s.find(".colorpick").colorpicker(), tinymce.init({
                        selector: "#" + s.attr("id") + " .tinymce",
                        height: "400"
                    }), s.find(".simplemde").each(function() {
                        var e = new SimpleMDE({
                            element: $(this)[0]
                        });
                        $(this).data("simplemde", e)
                    }), s.find(".select2Field").each(function() {
                        $(this).select2().select2("val", $(this).find("option:eq(0)").val())
                    }), s.find(".select2Multi").each(function() {
                        $(this).select2().on("change", function(e) {
                            var t = $(this).parents(".row"),
                                a = t.find(".select2-choices").height();
                            t.height(parseInt(a, 10))
                        })
                    }), this.showDomElement("Edit", s, null, null, !0), $(".filterBtn").off(), $(".filterBtn").on("click", function(e) {
                        e.preventDefault(), e.stopPropagation();
                        try {
                            modJs.filterQuery()
                        } catch (e) {}
                        return !1
                    }), void 0 !== this.filter && null != this.filter && "" !== this.filter && this.fillForm(this.filter, "#" + this.getTableName() + "_filter", this.getFilters())
                }
            }, {
                key: "preRenderForm",
                value: function(e) {}
            }, {
                key: "renderForm",
                value: function(e) {
                    var t = [];
                    null != e && void 0 !== e || (this.currentId = null), this.preRenderForm(e);
                    for (var a = this.templates.formTemplate, l = "", i = this.getFormFields(), r = 0; r < i.length; r++) {
                        var n = this.getMetaFieldForRendering(i[r][0]);
                        if ("" === n || void 0 === n) l += this.renderFormField(i[r]);
                        else {
                            var o = e[n];
                            "" !== o && null != o && void 0 !== o && "" !== o.trim() ? l += this.renderFormField(JSON.parse(o)) : l += this.renderFormField(i[r])
                        }
                    }
                    a = (a = a.replace(/_id_/g, this.getTableName() + "_submit")).replace(/_fields_/g, l);
                    var s = void 0,
                        u = this.generateRandom(14);
                    this.showFormOnPopup ? (s = $('<div class="reviewBlock popupForm" data-content="Form"></div>')).attr("id", u) : s = $("#" + this.getTableName() + "Form"), s.html(a), s.find(".datefield").datepicker({
                        viewMode: 2
                    }), s.find(".timefield").datetimepicker({
                        language: "en",
                        pickDate: !1
                    }), s.find(".datetimefield").datetimepicker({
                        language: "en"
                    }), s.find(".colorpick").colorpicker(), tinymce.init({
                        selector: "#" + s.attr("id") + " .tinymce",
                        height: "400"
                    }), s.find(".simplemde").each(function() {
                        var e = new SimpleMDE({
                            element: $(this)[0]
                        });
                        $(this).data("simplemde", e)
                    }), s.find(".select2Field").each(function() {
                        $(this).select2().select2("val", $(this).find("option:eq(0)").val())
                    }), s.find(".select2Multi").each(function() {
                        $(this).select2().on("change", function(e) {
                            var t = $(this).parents(".row"),
                                a = t.find(".select2-choices").height();
                            t.height(parseInt(a, 10))
                        })
                    }), s.find(".signatureField").each(function() {
                        t.push($(this).attr("id"))
                    });
                    for (var c = 0; c < i.length; c++) "datagroup" === i[c][1].type && s.find("#" + i[c][0]).data("field", i[c]);
                    if (!1 === this.showSave ? s.find(".saveBtn").remove() : (s.find(".saveBtn").off(), s.find(".saveBtn").data("modJs", this), s.find(".saveBtn").on("click", function() {
                            return null != $(this).data("modJs").saveSuccessItemCallback && void 0 !== $(this).data("modJs").saveSuccessItemCallback ? $(this).data("modJs").save($(this).data("modJs").retriveItemsAfterSave(), $(this).data("modJs").saveSuccessItemCallback) : $(this).data("modJs").save(), !1
                        })), !1 === this.showCancel ? s.find(".cancelBtn").remove() : (s.find(".cancelBtn").off(), s.find(".cancelBtn").data("modJs", this), s.find(".cancelBtn").on("click", function() {
                            return $(this).data("modJs").cancel(), !1
                        })), s.find("[mask]").each(function() {
                            $(this).inputmask($(this).attr("mask"))
                        }), s.find("[datemask]").each(function() {
                            $(this).inputmask({
                                mask: "y-1-2",
                                placeholder: "YYYY-MM-DD",
                                leapday: "-02-29",
                                separator: "-",
                                alias: "yyyy/mm/dd"
                            })
                        }), s.find("[datetimemask]").each(function() {
                            $(this).inputmask("datetime", {
                                mask: "y-2-1 h:s:00",
                                placeholder: "YYYY-MM-DD hh:mm:ss",
                                leapday: "-02-29",
                                separator: "-",
                                alias: "yyyy/mm/dd"
                            })
                        }), this.showFormOnPopup) {
                        this.showMessage("Edit", "", null, null, !0), $("#plainMessageModel .modal-body").html(""), $("#plainMessageModel .modal-body").append(s);
                        for (var d = 0; d < t.length; d++) $("#" + t[d]).data("signaturePad", new SignaturePad(document.getElementById(t[d])));
                        void 0 !== e && null != e ? this.fillForm(e, "#" + u) : this.setDefaultValues("#" + u)
                    } else {
                        $("#" + this.getTableName() + "Form").show(), $("#" + this.getTableName()).hide();
                        for (var h = 0; h < t.length; h++) $("#" + t[h]).data("signaturePad", new SignaturePad(document.getElementById(t[h])));
                        void 0 !== e && null != e ? this.fillForm(e) : this.setDefaultValues(), this.scrollToTop()
                    }
                    this.postRenderForm(e, s)
                }
            }, {
                key: "setDefaultValues",
                value: function(e, t) {
                    null != t && void 0 !== t || (t = this.getFormFields()), null != e && void 0 !== e && "" !== e || (e = "#" + this.getTableName() + "Form");
                    for (var a = 0; a < t.length; a++) "text" !== t[a][1].type && "textarea" !== t[a][1].type || void 0 !== t[a][1].default && null !== t[a][1].default && $(e + " #" + t[a][0]).val(t[a][1].default)
                }
            }, {
                key: "retriveItemsAfterSave",
                value: function() {
                    return !0
                }
            }, {
                key: "postRenderForm",
                value: function(e, t) {}
            }, {
                key: "dataGroupToHtml",
                value: function(e, t) {
                    var a = JSON.parse(e),
                        l = void 0,
                        i = void 0,
                        r = void 0,
                        n = void 0,
                        o = t[1].html;
                    null != a && void 0 !== a && void 0 !== t[1]["sort-function"] && null != t[1]["sort-function"] && a.sort(t[1]["sort-function"]);
                    for (var s = $('<div id="' + t[0] + '_div_inner"></div>'), u = 0; u < a.length; u++) {
                        for (var c in i = a[u], void 0 !== t[1]["pre-format-function"] && null != t[1]["pre-format-function"] && (i = t[1]["pre-format-function"].apply(this, [i])), l = (l = (l = (l = o).replace("#_delete_#", '<a id="#_id_#_delete" onclick="modJs.deleteDataGroupItem(\'#_id_#\');return false;" type="button" style="float:right;margin-right:3px;" tooltip="Delete"><li class="fa fa-times"></li></a>')).replace("#_edit_#", '<a id="#_id_#_edit" onclick="modJs.editDataGroupItem(\'#_id_#\');return false;" type="button" style="float:right;margin-right:5px;" tooltip="Edit"><li class="fa fa-edit"></li></a>')).replace(/#_id_#/g, i.id), i) void 0 !== (n = i[c]) && null != n && "string" == typeof n && (n = n.replace(/(?:\r\n|\r|\n)/g, "<br />")), l = l.replace("#_" + c + "_#", n);
                        void 0 !== t[1].render && null != t[1].render && (l = l.replace("#_renderFunction_#", t[1].render(i))), (r = $(l)).attr("fieldId", t[0] + "_div"), s.append(r)
                    }
                    return s
                }
            }, {
                key: "resetDataGroup",
                value: function(e) {
                    $("#" + e[0]).val(""), $("#" + e[0] + "_div").html("")
                }
            }, {
                key: "showDataGroup",
                value: function(e, t) {
                    var a = this.templates.datagroupTemplate,
                        l = "",
                        i = e[1].form;
                    void 0 !== t && null != t && void 0 !== t.id ? this.currentDataGroupItemId = t.id : this.currentDataGroupItemId = null;
                    for (var r = 0; r < i.length; r++) l += this.renderFormField(i[r]);
                    a = (a = a.replace(/_id_/g, this.getTableName() + "_field_" + e[0])).replace(/_fields_/g, l);
                    var n = this.generateRandom(14),
                        o = $('<div class="reviewBlock popupForm" data-content="Form"></div>');
                    o.attr("id", n), o.html(a), o.find(".datefield").datepicker({
                        viewMode: 2
                    }), o.find(".timefield").datetimepicker({
                        language: "en",
                        pickDate: !1
                    }), o.find(".datetimefield").datetimepicker({
                        language: "en"
                    }), o.find(".colorpick").colorpicker(), tinymce.init({
                        selector: "#" + o.attr("id") + " .tinymce",
                        height: "400"
                    }), o.find(".simplemde").each(function() {
                        var e = new SimpleMDE({
                            element: $(this)[0]
                        });
                        $(this).data("simplemde", e)
                    }), o.find(".select2Field").each(function() {
                        $(this).select2().select2("val", $(this).find("option:eq(0)").val())
                    }), o.find(".select2Multi").each(function() {
                        $(this).select2().on("change", function(e) {
                            var t = $(this).parents(".row"),
                                a = t.find(".select2-choices").height();
                            t.height(parseInt(a, 10))
                        })
                    }), this.currentDataGroupField = e, this.showDomElement("Add " + e[1].label, o, null, null, !0), void 0 !== t && null != t ? this.fillForm(t, "#" + this.getTableName() + "_field_" + e[0], e[1].form) : this.setDefaultValues("#" + this.getTableName() + "_field_" + e[0], e[1].form), $(".groupAddBtn").off(), void 0 !== t && null != t && void 0 !== t.id ? $(".groupAddBtn").on("click", function(e) {
                        e.preventDefault(), e.stopPropagation();
                        try {
                            modJs.editDataGroup()
                        } catch (e) {
                            console.log("Error editing data group: " + e.message)
                        }
                        return !1
                    }) : $(".groupAddBtn").on("click", function(e) {
                        e.preventDefault(), e.stopPropagation();
                        try {
                            modJs.addDataGroup()
                        } catch (e) {
                            console.log("Error adding data group: " + e.message)
                        }
                        return !1
                    })
                }
            }, {
                key: "addDataGroup",
                value: function() {
                    var e = this.currentDataGroupField,
                        t = void 0;
                    $("#" + this.getTableName() + "_field_" + e[0] + "_error").html(""), $("#" + this.getTableName() + "_field_" + e[0] + "_error").hide();
                    var a = new n.default(this.getTableName() + "_field_" + e[0], !0, {
                        ShowPopup: !1,
                        LabelErrorClass: "error"
                    });
                    if (a.checkValues()) {
                        var l = a.getFormParameters();
                        if (void 0 !== e[1]["custom-validate-function"] && null != e[1]["custom-validate-function"]) {
                            if (!(t = e[1]["custom-validate-function"].apply(this, [l])).valid) return $("#" + this.getTableName() + "_field_" + e[0] + "_error").html(t.message), $("#" + this.getTableName() + "_field_" + e[0] + "_error").show(), !1;
                            l = t.params
                        }
                        var i = $("#" + e[0]).val();
                        "" === i && (i = "[]");
                        var r = JSON.parse(i);
                        l.id = e[0] + "_" + this.dataGroupGetNextAutoIncrementId(r), r.push(l), void 0 !== e[1]["sort-function"] && null != e[1]["sort-function"] && r.sort(e[1]["sort-function"]), i = JSON.stringify(r);
                        var o = this.dataGroupToHtml(i, e);
                        $("#" + e[0] + "_div").html(""), $("#" + e[0] + "_div").append(o), this.makeDataGroupSortable(e, $("#" + e[0] + "_div_inner")), $("#" + e[0]).val(i), this.orderDataGroup(e), this.closeDataMessage(), this.showMessage("Item Added", "This change will be effective only when you save the form")
                    }
                    return !0
                }
            }, {
                key: "nl2br",
                value: function(e, t) {
                    var a = "";
                    try {
                        for (var l = e.split(" "), i = 0, r = 0; r < l.length; r++)(i += l[r].length + 1) > t ? (a += l[r] + "<br/>", i = 0) : a += l[r] + " "
                    } catch (e) {}
                    return a
                }
            }, {
                key: "makeDataGroupSortable",
                value: function(e, t) {
                    t.data("field", e), t.data("firstSort", !0), t.sortable({
                        create: function() {
                            $(this).height($(this).height())
                        },
                        "ui-floating": !1,
                        start: function(e, t) {
                            $("#sortable-ul-selector-id").sortable({
                                sort: function(e, t) {
                                    var a = $(e.target);
                                    if (!/html|body/i.test(a.offsetParent()[0].tagName)) {
                                        var l = e.pageY - a.offsetParent().offset().top - t.helper.outerHeight(!0) / 2;
                                        t.helper.css({
                                            top: l + "px"
                                        })
                                    }
                                }
                            })
                        },
                        revert: !0,
                        stop: function() {
                            modJs.orderDataGroup($(this).data("field"))
                        },
                        axis: "y",
                        scroll: !1,
                        placeholder: "sortable-placeholder",
                        cursor: "move"
                    })
                }
            }, {
                key: "orderDataGroup",
                value: function(e) {
                    var t = [],
                        a = void 0,
                        l = $("#" + e[0] + "_div_inner [fieldid='" + e[0] + "_div']"),
                        i = $("#" + e[0]).val();
                    "" === i && (i = "[]");
                    var r = JSON.parse(i);
                    l.each(function() {
                        for (var e in a = $(this).attr("id"), r)
                            if (r[e].id === a) {
                                t.push(r[e]);
                                break
                            }
                    }), $("#" + e[0]).val(JSON.stringify(t))
                }
            }, {
                key: "editDataGroup",
                value: function() {
                    var e = this.currentDataGroupField,
                        t = this.currentDataGroupItemId,
                        a = new n.default(this.getTableName() + "_field_" + e[0], !0, {
                            ShowPopup: !1,
                            LabelErrorClass: "error"
                        });
                    if (a.checkValues()) {
                        var l = a.getFormParameters();
                        if (void 0 !== e[1]["custom-validate-function"] && null != e[1]["custom-validate-function"]) {
                            var i = e[1]["custom-validate-function"].apply(this, [l]);
                            if (!i.valid) return $("#" + this.getTableName() + "_field_" + e[0] + "_error").html(i.message), $("#" + this.getTableName() + "_field_" + e[0] + "_error").show(), !1;
                            l = i.params
                        }
                        if (this.doCustomFilterValidation(l)) {
                            var r = $("#" + e[0]).val();
                            "" === r && (r = "[]");
                            for (var o = JSON.parse(r), s = {}, u = -1, c = [], d = 0; d < o.length; d++) {
                                var h = o[d];
                                h.id === t && (s = h, u = d), c.push(h)
                            }
                            l.id = s.id, c[u] = l, void 0 !== e[1]["sort-function"] && null != e[1]["sort-function"] && c.sort(e[1]["sort-function"]), r = JSON.stringify(c), $("#" + e[0]).val(r);
                            var f = this.dataGroupToHtml(r, e);
                            this.orderDataGroup(e), $("#" + e[0] + "_div").html(""), $("#" + e[0] + "_div").append(f), this.makeDataGroupSortable(e, $("#" + e[0] + "_div_inner")), this.closeDataMessage(), this.showMessage("Item Edited", "This change will be effective only when you save the form")
                        }
                    }
                    return !0
                }
            }, {
                key: "editDataGroupItem",
                value: function(e) {
                    for (var t = e.substring(0, e.lastIndexOf("_")), a = $("#" + t).val(), l = JSON.parse(a), i = {}, r = 0; r < l.length; r++) {
                        var n = l[r];
                        n.id === e && (i = n)
                    }
                    this.showDataGroup($("#" + t).data("field"), i)
                }
            }, {
                key: "dataGroupGetNextAutoIncrementId",
                value: function(e) {
                    for (var t = 1, a = void 0, l = 0; l < e.length; l++) {
                        var i = e[l];
                        void 0 !== i.id && null != i.id || (i.id = 1), (a = i.id.substring(i.id.lastIndexOf("_") + 1, i.id.length)) >= t && (t = parseInt(a, 10) + 1)
                    }
                    return t
                }
            }, {
                key: "deleteDataGroupItem",
                value: function(e) {
                    for (var t = e.substring(0, e.lastIndexOf("_")), a = $("#" + t).val(), l = JSON.parse(a), i = [], r = 0; r < l.length; r++) {
                        var n = l[r];
                        n.id !== e && i.push(n)
                    }
                    $("#" + t).val(JSON.stringify(i)), $("#" + e).remove(), this.showMessage("Item Removed", "Item removed. This change will be effective only when you save the form")
                }
            }, {
                key: "fillForm",
                value: function(e, t, a) {
                    var l = void 0;
                    null != a && void 0 !== a || (a = this.getFormFields()), null != t && void 0 !== t && "" !== t || (t = "#" + this.getTableName() + "Form");
                    for (var i = 0; i < a.length; i++)
                        if ("date" === a[i][1].type) "0000-00-00" !== e[a[i][0]] && "" !== e[a[i][0]] && null != e[a[i][0]] && void 0 !== e[a[i][0]] && $(t + " #" + a[i][0] + "_date").datepicker("setValue", e[a[i][0]]);
                        else if ("colorpick" === a[i][1].type) null != e[a[i][0]] && void 0 !== e[a[i][0]] && ($(t + " #" + a[i][0] + "_colorpick").colorpicker("setValue", e[a[i][0]]), $(t + " #" + a[i][0]).val(e[a[i][0]]));
                    else if ("datetime" === a[i][1].type || "time" === a[i][1].type) {
                        if ("0000-00-00 00:00:00" !== e[a[i][0]] && "" !== e[a[i][0]] && null != e[a[i][0]] && void 0 !== e[a[i][0]]) {
                            var r = e[a[i][0]].split(" "),
                                n = r[0].split("-"),
                                o = r[1].split(":");
                            $(t + " #" + a[i][0] + "_datetime").data("datetimepicker").setLocalDate(new Date(n[0], parseInt(n[1], 10) - 1, n[2], o[0], o[1], o[2]))
                        }
                    } else if ("label" === a[i][1].type) $(t + " #" + a[i][0]).html(e[a[i][0]]);
                    else if ("placeholder" === a[i][1].type) {
                        if (void 0 !== a[i][1]["remote-source"] && null != a[i][1]["remote-source"]) {
                            var s = a[i][1]["remote-source"][0] + "_" + a[i][1]["remote-source"][1] + "_" + a[i][1]["remote-source"][2];
                            l = this.fieldMasterData[s][e[a[i][0]]]
                        } else l = e[a[i][0]];
                        if (void 0 === l || null == l) l = "";
                        else try {
                            l = l.replace(/(?:\r\n|\r|\n)/g, "<br />")
                        } catch (e) {}
                        if (void 0 !== a[i][1].formatter && a[i][1].formatter && $.isFunction(a[i][1].formatter)) try {
                            l = a[i][1].formatter(l)
                        } catch (e) {}
                        $(t + " #" + a[i][0]).html(l)
                    } else if ("fileupload" === a[i][1].type) null != e[a[i][0]] && void 0 !== e[a[i][0]] && "" !== e[a[i][0]] && ($(t + " #" + a[i][0]).html(e[a[i][0]]), $(t + " #" + a[i][0]).attr("val", e[a[i][0]]), $(t + " #" + a[i][0]).show(), $(t + " #" + a[i][0] + "_download").show(), $(t + " #" + a[i][0] + "_remove").show()), !0 === a[i][1].readonly && $(t + " #" + a[i][0] + "_upload").remove();
                    else if ("select" === a[i][1].type) void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]] || (e[a[i][0]] = "NULL"), $(t + " #" + a[i][0]).val(e[a[i][0]]);
                    else if ("select2" === a[i][1].type) void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]] || (e[a[i][0]] = "NULL"), $(t + " #" + a[i][0]).select2("val", e[a[i][0]]);
                    else if ("select2multi" === a[i][1].type) {
                        void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]] || (e[a[i][0]] = "NULL");
                        var u = [];
                        if (void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]]) try {
                            u = JSON.parse(e[a[i][0]])
                        } catch (e) {}
                        $(t + " #" + a[i][0]).select2("val", u);
                        var c = $(t + " #" + a[i][0]).find(".select2-choices").height();
                        $(t + " #" + a[i][0]).find(".controls").css("min-height", c + "px"), $(t + " #" + a[i][0]).css("min-height", c + "px")
                    } else if ("datagroup" === a[i][1].type) try {
                        var d = this.dataGroupToHtml(e[a[i][0]], a[i]);
                        $(t + " #" + a[i][0]).val(e[a[i][0]]), $(t + " #" + a[i][0] + "_div").html(""), $(t + " #" + a[i][0] + "_div").append(d), this.makeDataGroupSortable(a[i], $(t + " #" + a[i][0] + "_div_inner"))
                    } catch (e) {} else "signature" === a[i][1].type ? "" === e[a[i][0]] && void 0 === e[a[i][0]] && null == e[a[i][0]] || $(t + " #" + a[i][0]).data("signaturePad").fromDataURL(e[a[i][0]]) : "simplemde" === a[i][1].type ? $(t + " #" + a[i][0]).data("simplemde").value(e[a[i][0]]) : $(t + " #" + a[i][0]).val(e[a[i][0]])
                }
            }, {
                key: "cancel",
                value: function() {
                    $("#" + this.getTableName() + "Form").hide(), $("#" + this.getTableName()).show()
                }
            }, {
                key: "renderFormField",
                value: function(e) {
                    var t = 0;
                    if (void 0 === this.fieldTemplates[e[1].type] || null == this.fieldTemplates[e[1].type]) return "";
                    var a = this.fieldTemplates[e[1].type];
                    if (e[1].label = this.gt(e[1].label), "none" !== e[1].validation && "emailOrEmpty" !== e[1].validation && "numberOrEmpty" !== e[1].validation && "placeholder" !== e[1].type && e[1].label.indexOf("*") < 0) {
                        ["select", "select2"].indexOf(e[1].type) >= 0 && !0 === e[1]["allow-null"] || (e[1].label = e[1].label + '<font class="redFont">*</font>')
                    }
                    if ("text" === e[1].type || "textarea" === e[1].type || "hidden" === e[1].type || "label" === e[1].type || "placeholder" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                    else if ("select" === e[1].type || "select2" === e[1].type || "select2multi" === e[1].type) {
                        if (a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label), void 0 !== e[1].source && null != e[1].source) a = a.replace("_options_", this.renderFormSelectOptions(e[1].source, e));
                        else if (void 0 !== e[1]["remote-source"] && null != e[1]["remote-source"]) {
                            var l = e[1]["remote-source"][0] + "_" + e[1]["remote-source"][1] + "_" + e[1]["remote-source"][2];
                            a = a.replace("_options_", this.renderFormSelectOptionsRemote(this.fieldMasterData[l], e))
                        }
                    } else if ("colorpick" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                    else if ("date" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                    else if ("datetime" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                    else if ("time" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                    else if ("fileupload" === e[1].type) {
                        a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                        var i = this.getCurrentProfile();
                        t = null != i && void 0 !== i ? i.id : -1 * this.getUser().id, a = (a = a.replace(/_userId_/g, t)).replace(/_group_/g, this.tab), a = (a = void 0 !== e[1].filetypes && null != e[1].filetypes ? a.replace(/_filetypes_/g, e[1].filetypes) : a.replace(/_filetypes_/g, "all")).replace(/_rand_/g, this.generateRandom(14))
                    } else "datagroup" === e[1].type ? a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label) : "signature" === e[1].type ? a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label) : "tinymce" !== e[1].type && "simplemde" !== e[1].type || (a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label));
                    return a = void 0 !== e[1].validation && null != e[1].validation && "" !== e[1].validation ? a.replace(/_validation_/g, 'validation="' + e[1].validation + '"') : a.replace(/_validation_/g, ""), a = void 0 !== e[1].help && null !== e[1].help ? (a = a.replace(/_helpline_/g, e[1].help)).replace(/_hidden_class_help_/g, "") : (a = a.replace(/_helpline_/g, "")).replace(/_hidden_class_help_/g, "hide"), a = void 0 !== e[1].placeholder && null !== e[1].placeholder ? a.replace(/_placeholder_/g, 'placeholder="' + e[1].placeholder + '"') : a.replace(/_placeholder_/g, ""), a = void 0 !== e[1].mask && null !== e[1].mask ? a.replace(/_mask_/g, 'mask="' + e[1].mask + '"') : a.replace(/_mask_/g, "")
                }
            }, {
                key: "renderFormSelectOptions",
                value: function(e, t) {
                    var a = "";
                    null != t && void 0 !== t && !0 === t[1]["allow-null"] && (void 0 !== t[1]["null-label"] && null != t[1]["null-label"] ? a += '<option value="NULL">' + this.gt(t[1]["null-label"]) + "</option>" : a += '<option value="NULL">Select</option>');
                    var l = [];
                    for (var i in e) l.push(e[i]);
                    !0 === t[1].sort && l.sort(function(e, t) {
                        return (e = e[1]) < (t = t[1]) ? -1 : e > t ? 1 : 0
                    });
                    for (var r = 0; r < l.length; r++) {
                        var n = l[r][0],
                            o = l[r][1],
                            s = '<option value="_id_">_val_</option>';
                        a += s = (s = s.replace("_id_", n)).replace("_val_", this.gt(o))
                    }
                    return a
                }
            }, {
                key: "renderFormSelectOptionsRemote",
                value: function(e, t) {
                    var a = "";
                    !0 === t[1]["allow-null"] && (void 0 !== t[1]["null-label"] && null != t[1]["null-label"] ? a += '<option value="NULL">' + this.gt(t[1]["null-label"]) + "</option>" : a += '<option value="NULL">Select</option>');
                    var l = [];
                    for (var i in e) l.push([i, e[i]]);
                    "true" === t[1].sort && l.sort(function(e, t) {
                        return (e = e[1]) < (t = t[1]) ? -1 : e > t ? 1 : 0
                    });
                    for (var r = 0; r < l.length; r++) {
                        var n = l[r][0],
                            o = l[r][1],
                            s = '<option value="_id_">_val_</option>';
                        a += s = (s = s.replace("_id_", n)).replace("_val_", this.gt(o))
                    }
                    return a
                }
            }, {
                key: "setCustomTemplates",
                value: function(e) {
                    this.customTemplates = e
                }
            }, {
                key: "setEmailTemplates",
                value: function(e) {
                    this.emailTemplates = e
                }
            }, {
                key: "getCustomTemplate",
                value: function(e) {
                    return this.customTemplates[e]
                }
            }, {
                key: "setFieldTemplates",
                value: function(e) {
                    this.fieldTemplates = e
                }
            }, {
                key: "getMetaFieldForRendering",
                value: function(e) {
                    return ""
                }
            }, {
                key: "clearDeleteParams",
                value: function() {
                    this.deleteParams = {}
                }
            }, {
                key: "getShowAddNew",
                value: function() {
                    return this.showAddNew
                }
            }, {
                key: "getAddNewLabel",
                value: function() {
                    return "Add New"
                }
            }, {
                key: "setShowAddNew",
                value: function(e) {
                    this.showAddNew = e
                }
            }, {
                key: "setShowDelete",
                value: function(e) {
                    this.showDelete = e
                }
            }, {
                key: "setShowEdit",
                value: function(e) {
                    this.showEdit = e
                }
            }, {
                key: "setShowSave",
                value: function(e) {
                    this.showSave = e
                }
            }, {
                key: "setShowCancel",
                value: function(e) {
                    this.showCancel = e
                }
            }, {
                key: "getCustomTableParams",
                value: function() {
                    return {}
                }
            }, {
                key: "getActionButtons",
                value: function(e) {
                    return modJs.getActionButtonsHtml(e.aData[0], e.aData)
                }
            }, {
                key: "getActionButtonsHtml",
                value: function(e, t) {
                    var a = '<div style="width:80px;">_edit__delete__clone_</div>';
                    return a = this.showAddNew ? a.replace("_clone_", '<img class="tableActionButton" src="_BASE_images/clone.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Copy" onclick="modJs.copyRow(_id_);return false;"></img>') : a.replace("_clone_", ""), a = this.showDelete ? a.replace("_delete_", '<img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Delete" onclick="modJs.deleteRow(_id_);return false;"></img>') : a.replace("_delete_", ""), a = (a = (a = this.showEdit ? a.replace("_edit_", '<img class="tableActionButton" src="_BASE_images/edit.png" style="cursor:pointer;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img>') : a.replace("_edit_", "")).replace(/_id_/g, e)).replace(/_BASE_/g, this.baseUrl)
                }
            }, {
                key: "generateRandom",
                value: function(e) {
                    for (var t = new Date, a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l = "", i = e; i > 0; --i) l += a[Math.round(Math.random() * (a.length - 1))];
                    return l + t.getTime()
                }
            }, {
                key: "checkFileType",
                value: function(e, t) {
                    var a = document.getElementById(e),
                        l = "";
                    return a.value.lastIndexOf(".") > 0 && (l = a.value.substring(a.value.lastIndexOf(".") + 1, a.value.length)), l = l.toLowerCase(), !(t.split(",").indexOf(l) < 0) || (a.value = "", this.showMessage("File Type Error", "Selected file type is not supported"), this.clearFileElement(e), !1)
                }
            }, {
                key: "clearFileElement",
                value: function(e) {
                    var t = $("#" + e);
                    t.replaceWith(t = t.val("").clone(!0))
                }
            }, {
                key: "fixJSON",
                value: function(e) {
                    return "1" === this.noJSONRequests && (e = window.btoa(e)), e
                }
            }, {
                key: "getClientDate",
                value: function(e) {
                    var t = this.getClientGMTOffset();
                    return e.addMinutes(60 * t)
                }
            }, {
                key: "getClientGMTOffset",
                value: function() {
                    var e = new Date,
                        t = new Date(e.getFullYear(), 0, 1, 0, 0, 0, 0),
                        a = t.toGMTString();
                    return (t - new Date(a.substring(0, a.lastIndexOf(" ") - 1))) / 36e5
                }
            }, {
                key: "getHelpLink",
                value: function() {
                    return null
                }
            }, {
                key: "showLoader",
                value: function() {
                    $("#iceloader").show()
                }
            }, {
                key: "hideLoader",
                value: function() {
                    $("#iceloader").hide()
                }
            }, {
                key: "generateOptions",
                value: function(e) {
                    var t = "";
                    for (var a in e) t += '<option value="__val__">__text__</option>'.replace("__val__", a).replace("__text__", e[a]);
                    return t
                }
            }, {
                key: "isModuleInstalled",
                value: function(e, t) {
                    return void 0 !== modulesInstalled && null !== modulesInstalled && 1 === modulesInstalled[e + "_" + t]
                }
            }, {
                key: "setCustomFields",
                value: function(e) {
                    for (var t = void 0, a = void 0, l = 0; l < e.length; l++)
                        if ("Hidden" !== (t = e[l]).display && "" !== t.data && void 0 !== t.data) try {
                            if (void 0 === (a = JSON.parse(t.data)) || null == a) continue;
                            if (2 !== a.length) continue;
                            if (void 0 === a[1].type || null == a[1].type) continue;
                            this.customFields.push(a)
                        } catch (e) {}
                }
            }, {
                key: "addCustomFields",
                value: function(e) {
                    for (var t = 0; t < this.customFields.length; t++) e.push(this.customFields[t]);
                    return e
                }
            }]), e
        }();
        a.default = o
    }, {
        "./FormValidation": 3
    }],
    5: [function(e, t, a) {
        "use strict";
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var l, i = function() {
                function e(e, t) {
                    for (var a = 0; a < t.length; a++) {
                        var l = t[a];
                        l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l)
                    }
                }
                return function(t, a, l) {
                    return a && e(t.prototype, a), l && e(t, l), t
                }
            }(),
            r = e("./AdapterBase"),
            n = (l = r) && l.__esModule ? l : {
                default: l
            };
        var o = function(e) {
            function t(e, a, l, i) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, a, l, i));
                return r.container = null, r.loadMoreButton = null, r.start = 0, r.pageSize = 6, r.currentPage = 1, r.hasMoreData = !0, r.searchTerm = "", r.searchInput = null, r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, n.default), i(t, [{
                key: "getObjectHTML",
                value: function(e) {
                    var t = this.getCustomTemplate(this.getTemplateName());
                    for (var a in e) t = t.replace(new RegExp("#_" + a + "_#", "g"), e[a]);
                    return t
                }
            }, {
                key: "setPageSize",
                value: function(e) {
                    this.pageSize = e
                }
            }, {
                key: "addDomEvents",
                value: function(e) {}
            }, {
                key: "getTemplateName",
                value: function() {
                    return ""
                }
            }, {
                key: "renderObject",
                value: function(e) {
                    var t = this.getObjectDom(e.id),
                        a = this.getObjectHTML(e),
                        l = $(a);
                    void 0 !== t && null != t ? t.replace(l) : this.container.append(l), this.addDomEvents(l)
                }
            }, {
                key: "setContainer",
                value: function(e) {
                    this.container = e
                }
            }, {
                key: "setLoadMoreButton",
                value: function(e) {
                    var t = this;
                    this.loadMoreButton = e, this.loadMoreButton.off().on("click", function() {
                        t.loadMoreButton.attr("disabled", "disabled"), t.loadMore([])
                    })
                }
            }, {
                key: "showLoadError",
                value: function(e) {
                    $("#" + this.getTableName() + "_error").html(e), $("#" + this.getTableName() + "_error").show()
                }
            }, {
                key: "hideLoadError",
                value: function() {
                    $("#" + this.getTableName() + "_error").hide()
                }
            }, {
                key: "setSearchBox",
                value: function(e) {
                    var t = this;
                    this.searchInput = e, this.searchInput.off(), this.searchInput.keydown(function(e) {
                        var a = $(this).val();
                        13 === e.which ? (e.preventDefault(), t.search([])) : 8 !== e.which && 46 !== e.which || 1 !== a.length || "" === t.searchTerm || t.search([])
                    })
                }
            }, {
                key: "getObjectDom",
                value: function(e) {
                    var t = this.container.find("#obj_" + e);
                    return t.length ? t : null
                }
            }, {
                key: "loadMore",
                value: function(e) {
                    this.hasMoreData && (this.currentPage++, this.get(e, !0))
                }
            }, {
                key: "get",
                value: function(e, t) {
                    var a = this;
                    this.hideLoadError(), t || (this.currentPage = 1, null != this.container && this.container.html(""), this.hasMoreData = !0, this.tableData = []), this.start = (this.currentPage - 1) * this.pageSize, this.container = $("#" + this.getTableName()).find(".objectList"), a.showLoader();
                    var l = this.getDataUrl(a.getDataMapping()) + "&iDisplayStart=" + this.start + "&iDisplayLength=" + this.pageSize + "&objects=1";
                    "" !== this.searchTerm && void 0 !== this.searchTerm && null != this.searchTerm && (l += "&sSearch=" + this.searchTerm), $.post(l, function(t) {
                        a.getSuccessCallBack(e, t)
                    }, "json").always(function() {
                        a.hideLoader()
                    }), a.initFieldMasterData(), this.trackEvent("get", this.tab, this.table)
                }
            }, {
                key: "search",
                value: function(e) {
                    this.searchTerm = $("#" + this.getTableName() + "_search").val(), this.get(e)
                }
            }, {
                key: "getSuccessCallBack",
                value: function(e, t) {
                    var a = [];
                    if (0 !== t.length || "" !== this.container.html()) {
                        try {
                            null == this.getFilters() ? ($("#" + this.getTableName() + "_filterBtn").hide(), $("#" + this.getTableName() + "_resetFilters").hide()) : ($("#" + this.getTableName() + "_filterBtn").show(), $("#" + this.getTableName() + "_resetFilters").show(), "" !== this.currentFilterString && null != this.currentFilterString ? $("#" + this.getTableName() + "_resetFilters").html(this.currentFilterString + '<i class="fa fa-times"></i>') : ($("#" + this.getTableName() + "_resetFilters").html("Reset Filters"), $("#" + this.getTableName() + "_resetFilters").hide()))
                        } catch (e) {}
                        $("#" + this.getTableName()).find(".search-controls").show(), t.length > this.pageSize ? (this.hasMoreData = !0, t.pop(), null !== this.loadMoreButton && (this.loadMoreButton.removeAttr("disabled"), this.loadMoreButton.show())) : (this.hasMoreData = !1, null !== this.loadMoreButton && this.loadMoreButton.hide()), this.scrollToElementBottom(this.container);
                        for (var l = 0; l < t.length; l++) a.push(this.preProcessTableData(t[l]));
                        if (this.sourceData = t, void 0 !== e.callBack && null != e.callBack && (void 0 !== e.callBackData && null != e.callBackData || (e.callBackData = []), e.callBackData.push(t), e.callBackData.push(a), this.callFunction(e.callBack, e.callBackData)), this.tableData = a, void 0 === e.noRender || null == e.noRender || !0 !== e.noRender)
                            for (var i = 0; i < a.length; i++) this.renderObject(a[i])
                    } else this.showLoadError("No Results Found !!!")
                }
            }]), t
        }();
        a.default = o
    }, {
        "./AdapterBase": 2
    }],
    6: [function(e, t, a) {
        "use strict";
        var l = e("./lib");
        window.EmployeeLeaveAdapter = l.EmployeeLeaveAdapter, window.EmployeeApprovedLeaveAdapter = l.EmployeeApprovedLeaveAdapter, window.SubEmployeeLeaveAdapter = l.SubEmployeeLeaveAdapter, window.EmployeeLeaveApprovalAdapter = l.EmployeeLeaveApprovalAdapter, window.EmployeeLeaveEntitlementAdapter = l.EmployeeLeaveEntitlementAdapter
    }, {
        "./lib": 7
    }],
    7: [function(e, t, a) {
        "use strict";
        var l = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var a = [],
                            l = !0,
                            i = !1,
                            r = void 0;
                        try {
                            for (var n, o = e[Symbol.iterator](); !(l = (n = o.next()).done) && (a.push(n.value), !t || a.length !== t); l = !0);
                        } catch (e) {
                            i = !0, r = e
                        } finally {
                            try {
                                !l && o.return && o.return()
                            } finally {
                                if (i) throw r
                            }
                        }
                        return a
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = function() {
                function e(e, t) {
                    for (var a = 0; a < t.length; a++) {
                        var l = t[a];
                        l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(e, l.key, l)
                    }
                }
                return function(t, a, l) {
                    return a && e(t.prototype, a), l && e(t, l), t
                }
            }(),
            r = s(e("../../../api/AdapterBase")),
            n = s(e("../../../api/FormValidation")),
            o = s(e("../../../api/ObjectAdapter"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function u(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function c(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function d(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var h = function(e) {
                function t(e, a, l, i) {
                    u(this, t);
                    var r = c(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, a, l, i));
                    return r.leaveInfo = null, r.currentLeaveRule = null, r
                }
                return d(t, r.default), i(t, [{
                    key: "getDataMapping",
                    value: function() {
                        return ["id", "leave_type", "date_start", "date_end", "status", "allowance_status", "documentref"]
                    }
                }, {
                    key: "getHeaders",
                    value: function() {
                        return [{
                            sTitle: "ID",
                            bVisible: !1
                        }, {
                            sTitle: "Leave Type"
                        }, {
                            sTitle: "Leave Start Date"
                        }, {
                            sTitle: "Leave End Date"
                        },
                        // {
                        //     sTitle: "Request Allowance"
                        // }, 
                        {
                            sTitle: "Status"
                        },
                        {
                            sTitle: "Allowance Status"
                        },{
                            sTitle: "Reference No."
                        }]
                    }
                }, {
                    key: "getFormFields",
                    value: function() {
                        return [
                            ["id", {
                                label: "ID",
                                type: "hidden"
                            }],
                            ["leave_type", {
                                label: "Leave Type",
                                type: "select",
                                "remote-source": ["LeaveType", "id", "name", "getUserLeaveTypes"]
                            }],
                            ["date_start", {
                                label: "Leave Start Date",
                                type: "date",
                                validation: ""
                            }],
                            ["date_end", {
                                label: "Leave End Date",
                                type: "date",
                                validation: ""
                            }],
                            ["details", {
                                label: "Reason",
                                type: "textarea"
                                // source: [["Yes", "Yes"],["No", "No"]],
                            }],
                            ["req_allowance", {
                                label: "Request Allowance",
                                type: "select",
                                source: [["Yes", "Yes"],["No", "No"]]
                            }],
                            ["attachment", {
                                label: "Attachment",
                                type: "fileupload",
                                validation: "none"
                            }]
                        ]
                    }
                }, {
                    key: "getAddNewLabel",
                    value: function() {
                        return "Apply Leave"
                    }
                }, {
                    key: "add",
                    value: function(e, t) {
                        var a = e,
                            l = {};
                        $(".days").each(function() {
                            l[$(this).attr("id")] = $(this).val()
                        });
                        var i = this.calculateNumberOfLeaves(l),
                            r = parseFloat(this.leaveInfo.availableLeaves),
                            n = this,
                            o = function() {
                                a.days = JSON.stringify(l);
                                var e = JSON.stringify(a),
                                    t = [];
                                t.callBackData = [], t.callBackSuccess = "addSuccessCallBack", t.callBackFail = "addFailCallBack", n.showLoader(), n.customAction("addLeave", "modules=leaves", e, t)
                            };
                        "Admin" !== this.getUser().user_level && i > r && "No" === this.currentLeaveRule.apply_beyond_current ? this.showMessage("Error Applying Leave", "You are trying to apply " + i + " leave days. But you are only allowed to apply for " + r + " leave days.") : "Admin" === this.getUser().user_level && i > r && "No" === this.currentLeaveRule.apply_beyond_current ? this.renderYesNoModel("Alert: Applying more than Allowed ", "As an admin you can apply for more than allowed number of leave days. Are you sure that you want to do this?", "Yes", "No", o, []) : o()
                    }
                }, {
                    key: "addSuccessCallBack",
                    value: function(e) {
                        this.hideLoader(), this.showMessage("Successful", "Leave application successful. You will be notified once your supervisor approves your leave."), this.get([])
                    }
                }, {
                    key: "addFailCallBack",
                    value: function(e) {
                        this.hideLoader(), this.showMessage("Error Occurred while Applying Leave", e)
                    }
                }, {
                    key: "calculateNumberOfLeaves",
                    value: function(e) {
                        var t = 0;
                        for (var a in e) e.hasOwnProperty(a) && ("Full Day" === e[a] ? t += 1 : t += .5);
                        return t
                    }
                }, {
                    key: "calculateNumberOfLeavesObject",
                    value: function(e) {
                        for (var t = 0, a = 0; a < e.length; a++) "Full Day" === e[a].leave_type ? t += 1 : "Half Day - Morning" === e[a].leave_type ? t += .5 : "Half Day - Afternoon" === e[a].leave_type ? t += .5 : "1 Hour - Morning" === e[a].leave_type ? t += .125 : "2 Hours - Morning" === e[a].leave_type ? t += .25 : "3 Hours - Morning" === e[a].leave_type ? t += .375 : "1 Hour - Afternoon" === e[a].leave_type ? t += .125 : "2 Hours - Afternoon" === e[a].leave_type ? t += .25 : "3 Hours - Afternoon" === e[a].leave_type && (t += .375);
                        return t
                    }
                }, {
                    key: "getLeaveDays",
                    value: function() {
                        var e = new n.default(this.getTableName() + "_submit", !0, {
                            ShowPopup: !1,
                            LabelErrorClass: "error"
                        });
                        if (e.checkValues()) {
                            var t = e.getFormParameters(),
                                a = this.doCustomValidation(t);
                            if (null == a) {
                                $("#EmployeeLeaveAll_submit_error").html(""), $("#EmployeeLeaveAll_submit_error").hide();
                                var l = $("#" + this.getTableName() + "_submit #id").val();
                                null != l && "" !== l && (t.id = l);
                                var i = {
                                        start_date: t.date_start,
                                        end_date: t.date_end,
                                        leave_type: t.leave_type
                                    },
                                    r = JSON.stringify(i),
                                    o = [];
                                o.callBackData = [], o.callBackSuccess = "getLeaveDaysSuccessCallBack", o.callBackFail = "getLeaveDaysFailCallBack", this.customAction("getLeaveDays", "modules=leaves", r, o)
                            } else $("#EmployeeLeaveAll_submit_error").html(a), $("#EmployeeLeaveAll_submit_error").show()
                        }
                    }
                }, {
                    key: "getLeaveDaysSuccessCallBack",
                    value: function(e) {
                        var t, a = l(e, 3);
                        t = a[0], this.leaveInfo = a[1], this.currentLeaveRule = a[2], $("#leave_days_table_body").html("");
                        var i = void 0,
                            r = "",
                            n = 0;
                        return $.each(t, function(e, t) {
                            if ("" + t != "2") {
                                i = "" + t == "1" ? '<select id="_id_" class="days"><option value="Full Day">Full Day</option><option value="Half Day - Morning">Half Day - Morning</option><option value="Half Day - Afternoon">Half Day - Afternoon</option><option value="1 Hour - Morning">1 Hour - Morning</option><option value="2 Hours - Morning">2 Hours - Morning</option><option value="3 Hours - Morning">3 Hours - Morning</option><option value="1 Hour - Afternoon">1 Hour - Afternoon</option><option value="2 Hours - Afternoon">2 Hours - Afternoon</option><option value="3 Hours - Afternoon">3 Hours - Afternoon</option></select>' : '<select id="_id_" class="days"><option value="Half Day - Morning">Half Day - Morning</option><option value="Half Day - Afternoon">Half Day - Afternoon</option><option value="1 Hour - Morning">1 Hour - Morning</option><option value="2 Hours - Morning">2 Hours - Morning</option><option value="3 Hours - Morning">3 Hours - Morning</option><option value="1 Hour - Afternoon">1 Hour - Afternoon</option><option value="2 Hours - Afternoon">2 Hours - Afternoon</option><option value="3 Hours - Afternoon">3 Hours - Afternoon</option></select>';
                                var a = e.split("-").join("");
                                i = i.replace(/_id_/g, a), n++
                            } else i = '<span class="label label-info">Non working day</span>';
                            var l = "<tr><td>_date_</td><td>_select_</td></tr>";
                            l = (l = l.replace(/_date_/g, Date.parse(e).toString("MMM d, yyyy (dddd)"))).replace(/_select_/g, i), r += l
                        }), 0 === n ? (this.showMessage("No Working Days", "No working days are selected in leave period. Please change leave period"), !1) : ($("#leave_days_table_body").html(r), $("#leave_days_table").show(), $("#EmployeeLeaveAll_submit").hide(), $("#leave_days_table_cont").show(), $("#pending_leave_count").html(this.leaveInfo.pendingLeaves), $("#available_leave_count").html(this.leaveInfo.availableLeaves), $("#approved_leave_count").html(this.leaveInfo.approvedLeaves), !0)
                    }
                }, {
                    key: "getLeaveDaysFailCallBack",
                    value: function(e) {
                        this.showMessage("Error Occured while Applying Leave", e)
                    }
                },
                 {
                    key: "doCustomValidation",
                    value: function(e) {
                        try {
                            if (e.date_start !== e.date_end) {
                                var t = new Date(e.date_start);
                                if (new Date(e.date_end) < t) return "Start date should be earlier than end date of the leave period"
                            }
                        } catch (e) {}
                        return null
                    }
                }, 
                {
                    key: "showLeaveView",
                    value: function() {
                        $("#EmployeeLeaveAll_submit").show(), $("#leave_days_table_cont").hide()
                    }
                }, {
                    key: "getLeaveDaysReadonly",
                    value: function(e) {
                        var t = {
                                leave_id: e
                            },
                            a = JSON.stringify(t),
                            l = [];
                        l.callBackData = [], l.callBackSuccess = "getLeaveDaysReadonlySuccessCallBack", l.callBackFail = "getLeaveDaysReadonlyFailCallBack", this.customAction("getLeaveDaysReadonly", "modules=leaves", a, l)
                    }
                }, {
                    key: "getLeaveDaysReadonlySuccessCallBack",
                    value: function(e) {
                        var t = '<table class="table table-condensed table-bordered table-striped" style="font-size:14px;"><thead><tr><th>Leave Date</th><th>Leave Type</th></tr></thead><tbody>_days_</tbody></table> ',
                            a = '<table class="table table-condensed table-bordered table-striped" style="font-size:14px;"><thead><tr><th>Notes</th></tr></thead><tbody>_days_</tbody></table> ',
                            l = e[0],
                            i = e[1],
                            r = e[2],
                            n = e[3],
                            o = e[4],
                            s = "",
                            u = "",
                            c = "",
                            d = this.calculateNumberOfLeavesObject(l);
                        d > i.availableLeaves ? s += '<span class="label label-info">Number of Leaves requested (' + d + ")</span><br/>" : s += '<span class="label label-success">Number of Leaves requested (' + d + ")</span><br/>";
                        for (var h = 0; h < l.length; h++) u += "<tr><td>_date_</td><td>_type_</td></tr>".replace(/_date_/g, Date.parse(l[h].leave_date).toString("MMM d, yyyy (dddd)")).replace(/_type_/g, l[h].leave_type);
                        for (var f = 0; f < o.length; f++) c += '<tr><td><span class="logTime label label-default">_date_</span>&nbsp;&nbsp;<b>_status_</b><br/>_note_</td></tr>'.replace(/_date_/g, o[f].time).replace(/_status_/g, o[f].status_from + " -> " + o[f].status_to).replace(/_note_/g, o[f].note);
                        null != n && void 0 !== n.details && null != n.details && "" !== n.details && (s += "<br/><b>Reason for Applying leave:</b><br/>", s += n.details + "<br/><br/>"), s += "<br/>", s += t = t.replace("_days_", u), "" !== c && (s += a = a.replace("_days_", c)), null !== i.attachment && void 0 !== i.attachment && "" !== i.attachment && (s += "<label onclick=\"download('" + i.attachment + "',modJs.getLeaveDaysReadonly,[" + r + ']);" style="cursor:pointer;">View Attachment <i class="icon-play-circle"></i></label>'), this.showMessage("Leave Days", s), timeUtils.convertToRelativeTime($(".logTime"))
                    }
                }, {
                    key: "getLeaveDaysReadonlyFailCallBack",
                    value: function(e) {
                        this.showMessage("Error", "Error Occured while Reading leave days from Server")
                    }
                }, {
                    key: "getActionButtonsHtml",
                    value: function(e, t) {
                        return ("Pending" !== t[4] ? '<div style="width:80px;"><img class="tableActionButton" src="_BASE_images/info.png" style="cursor:pointer;" rel="tooltip" title="Show Leave Days" onclick="modJs.getLeaveDaysReadonly(_id_);return false;"></img></div>' : '<div style="width:80px;"><img class="tableActionButton" src="_BASE_images/info.png" style="cursor:pointer;" rel="tooltip" title="Show Leave Days" onclick="modJs.getLeaveDaysReadonly(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Cancel Leave" onclick="modJs.deleteRow(_id_);return false;"></img></div>').replace(/_id_/g, e).replace(/_BASE_/g, this.baseUrl)
                    }
                }, {
                    key: "getFilters",
                    value: function() {
                        return [
                            ["leave_period", {
                                label: "Leave Period",
                                type: "select2",
                                "allow-null": !0,
                                "remote-source": ["LeavePeriod", "id", "name"]
                            }]
                        ]
                    }
                }]), t
            }(),
            f = function(e) {
                function t() {
                    return u(this, t), c(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                }
                return d(t, h), i(t, [{
                    key: "getActionButtonsHtml",
                    value: function(e, t) {
                        var a = '<div style="width:80px;"><img class="tableActionButton" src="_BASE_images/info.png" style="cursor:pointer;" rel="tooltip" title="Show Leave Days" onclick="modJs.getLeaveDaysReadonly(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Cancel Leave" onclick="modJs.cancelLeave(_id_);return false;"></img></div>';
                        return a = (a = a.replace(/_id_/g, e)).replace(/_BASE_/g, this.baseUrl)
                    }
                }, {
                    key: "cancelLeave",
                    value: function(e) {
                        var t = {};
                        t.id = e;
                        var a = JSON.stringify(t),
                            l = [];
                        l.callBackData = [], l.callBackSuccess = "cancelSuccessCallBack", l.callBackFail = "cancelFailCallBack", this.customAction("cancelLeave", "modules=leaves", a, l)
                    }
                }, {
                    key: "cancelSuccessCallBack",
                    value: function(e) {
                        this.showMessage("Successful", "Leave cancellation request sent"), this.get([])
                    }
                }, {
                    key: "cancelFailCallBack",
                    value: function(e) {
                        this.showMessage("Error Occurred while cancelling Leave", e)
                    }
                }, {
                    key: "getFilters",
                    value: function() {
                        return [
                            ["leave_period", {
                                label: "Leave Period",
                                type: "select2",
                                "allow-null": !0,
                                "remote-source": ["LeavePeriod", "id", "name"]
                            }]
                        ]
                    }
                }]), t
            }(),
            p = function(e) {
                function t(e, a, l, i) {
                    u(this, t);
                    var r = c(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, a, l, i));
                    return r.leaveStatusChangeId = null, r
                }
                return d(t, h), i(t, [{
                    key: "getDataMapping",
                    value: function() {
                        return ["id", "employee", "leave_type", "date_start", "date_end", "status"]
                    }
                }, {
                    key: "getHeaders",
                    value: function() {
                        return [{
                            sTitle: "ID",
                            bVisible: !1
                        }, {
                            sTitle: "Employee"
                        }, {
                            sTitle: "Leave Type"
                        }, {
                            sTitle: "Leave Start Date"
                        }, {
                            sTitle: "Leave End Date"
                        }, {
                            sTitle: "Status"
                        }]
                    }
                }, {
                    key: "getFormFields",
                    value: function() {
                        return [
                            ["id", {
                                label: "ID",
                                type: "hidden"
                            }],
                            ["employee", {
                                label: "Employee",
                                type: "select",
                                "allow-null": !1,
                                "remote-source": ["Employee", "id", "first_name+middle_name+last_name"]
                            }],
                            ["leave_type", {
                                label: "Leave Type",
                                type: "select",
                                "remote-source": ["LeaveType", "id", "name"]
                            }],
                            ["date_start", {
                                label: "Leave Start Date",
                                type: "date",
                                validation: ""
                            }],
                            ["date_end", {
                                label: "Leave End Date",
                                type: "date",
                                validation: ""
                            }],
                            ["details", {
                                label: "Reason",
                                type: "textarea",
                                validation: "none"
                            }],
                            ["req_allowance", {
                                label: "Request Allowance",
                                type: "select", source: [["Yes", "Yes"],["No", "No"]]
                            }]
                        ]
                    }
                }, {
                    key: "isSubProfileTable",
                    value: function() {
                        return !0
                    }
                }, {
                    key: "getCustomSuccessCallBack",
                    value: function(e) {
                        for (var t = [], a = this.getDataMapping(), l = 0; l < e.length; l++) {
                            for (var i = [], r = 0; r < a.length; r++) i[r] = e[l][a[r]];
                            t.push(i)
                        }
                        this.tableData = t, this.createTable(this.getTableName()), $("#" + this.getTableName() + "Form").hide(), $("#" + this.getTableName()).show()
                    }
                }, {
                    key: "getLeaveOptions",
                    value: function(e) {
                        var t = {};
                        return "Approved" === e || ("Pending" === e ? (t.Approved = "Approved", t.Rejected = "Rejected") : "Rejected" === e ? t.Rejected = "Rejected" : "Cancelled" === e || "Processing" === e || (t["Cancellation Requested"] = "Cancellation Requested", t.Cancelled = "Cancelled")), this.generateOptions(t)
                    }
                }, {
                    key: "openLeaveStatus",
                    value: function(e, t) {
                        $("#leaveStatusModel").modal("show"), $("#leave_status").html(this.getLeaveOptions(t)), $("#leave_status").val(t), $("#leave_reason").val(""), this.leaveStatusChangeId = e
                    }
                }, {
                    key: "closeLeaveStatus",
                    value: function() {
                        $("#leaveStatusModel").modal("hide")
                    }
                }, {
                    key: "changeLeaveStatus",
                    value: function() {
                        var e = $("#leave_status").val(),
                            t = $("#leave_reason").val();
                        if (null != e && "" !== e) {
                            var a = {
                                    id: this.leaveStatusChangeId,
                                    status: e,
                                    reason: t
                                },
                                l = JSON.stringify(a),
                                i = [];
                            i.callBackData = [], i.callBackSuccess = "changeLeaveStatusSuccessCallBack", i.callBackFail = "changeLeaveStatusFailCallBack", this.customAction("changeLeaveStatus", "modules=leaves", l, i), this.closeLeaveStatus(), this.leaveStatusChangeId = null
                        } else this.showMessage("Error", "Please select leave status")
                    }
                }, {
                    key: "changeLeaveStatusSuccessCallBack",
                    value: function(e) {
                        this.showMessage("Successful", "Leave status changed successfully"), this.get([])
                    }
                }, {
                    key: "changeLeaveStatusFailCallBack",
                    value: function(e) {
                        this.showMessage("Error", "Error occurred while changing leave status")
                    }
                }, {
                    key: "getActionButtonsHtml",
                    value: function(e, t) {
                        var a = "";
                        a = '<div style="width:80px;"><img class="tableActionButton" src="_BASE_images/info.png" style="cursor:pointer;" rel="tooltip" title="Show Leave Days" onclick="modJs.getLeaveDaysReadonly(_id_);return false;"></img>_changestatus_</div>';
                        return a = (a = (a = (a = "Pending" === t[5] || "Cancellation Requested" === t[5] ? a.replace(/_changestatus_/g, '<img class="tableActionButton" src="_BASE_images/run.png" style="cursor:pointer;margin-left:15px;" rel="tooltip" title="Change Leave Status" onclick="modJs.openLeaveStatus(_id_,\'_status_\');return false;"></img>') : a.replace(/_changestatus_/g, "")).replace(/_id_/g, e)).replace(/_status_/g, t[5])).replace(/_BASE_/g, this.baseUrl)
                    }
                }, {
                    key: "getFilters",
                    value: function() {
                        return [
                            ["employee", {
                                label: "Employee",
                                type: "select2",
                                "allow-null": !0,
                                "null-label": "All Employees",
                                "remote-source": ["Employee", "id", "first_name+middle_name+last_name"]
                            }],
                            ["leave_type", {
                                label: "Leave Type",
                                type: "select",
                                "allow-null": !0,
                                "null-label": "All Leave Types",
                                "remote-source": ["LeaveType", "id", "name"]
                            }],
                            ["leave_period", {
                                label: "Leave Period",
                                type: "select2",
                                "allow-null": !0,
                                "remote-source": ["LeavePeriod", "id", "name"]
                            }],
                            ["status", {
                                label: "Status",
                                type: "select",
                                source: [
                                    ["Approved", "Approved"],
                                    ["Pending", "Pending"],
                                    ["Rejected", "Rejected"],
                                    ["Cancelled", "Cancelled"],
                                    ["Cancellation Requested", "Cancellation Requested"],
                                    ["Processing", "Processing"]
                                ]
                            }]
                        ]
                    }
                }]), t
            }(),
            v = function(e) {
                function t() {
                    return u(this, t), c(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                }
                return d(t, p), i(t, [{
                    key: "isSubProfileTable",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "getLeaveOptions",
                    value: function(e) {
                        var t = {};
                        return "Approved" === e || "Pending" === e || "Rejected" === e || "Cancelled" === e || "Processing" === e && (t.Approved = "Approved", t.Rejected = "Rejected"), this.generateOptions(t)
                    }
                }, {
                    key: "getActionButtonsHtml",
                    value: function(e, t) {
                        var a = "";
                        a = '<div style="width:80px;"><img class="tableActionButton" src="_BASE_images/info.png" style="cursor:pointer;" rel="tooltip" title="Show Leave Days" onclick="modJs.getLeaveDaysReadonly(_id_);return false;"></img>_changestatus_</div>';
                        return a = (a = (a = (a = "Processing" === t[5] ? a.replace(/_changestatus_/g, '<img class="tableActionButton" src="_BASE_images/run.png" style="cursor:pointer;margin-left:15px;" rel="tooltip" title="Change Leave Status" onclick="modJs.openLeaveStatus(_id_,\'_status_\');return false;"></img>') : a.replace(/_changestatus_/g, "")).replace(/_id_/g, e)).replace(/_status_/g, t[5])).replace(/_BASE_/g, this.baseUrl)
                    }
                }]), t
            }(),
            m = function(e) {
                function t() {
                    return u(this, t), c(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                }
                return d(t, o.default), i(t, [{
                    key: "getDataMapping",
                    value: function() {
                        return ["id", "name", "availableLeaves", "totalLeaves", "carriedForward", "deductedFromLeaveCarriedForward", "carriedForwardAvailable", "carriedForwardLeaveExpireDate", "paidTimeOff", "pendingLeaves", "approvedLeaves", "rejectedLeaves", "tobeAccrued"]
                    }
                }, {
                    key: "getHeaders",
                    value: function() {
                        return [{
                            sTitle: "ID",
                            bVisible: !1
                        }, {
                            sTitle: "Leave Type"
                        }, {
                            sTitle: "Available Leave for Current Period"
                        }, {
                            sTitle: "Total for Current Period"
                        }, {
                            sTitle: "Leave Carried Forward"
                        }, {
                            sTitle: "Deducted from Carried Forward Leave"
                        }, {
                            sTitle: "Available Carried Forward Leave"
                        }, {
                            sTitle: "Carried Forward Leave Available Until"
                        }, {
                            sTitle: "Paid Time Off"
                        }, {
                            sTitle: "Pending Leave"
                        }, {
                            sTitle: "Approved Leave"
                        }, {
                            sTitle: "Rejected Leave"
                        }, {
                            sTitle: "Leave to be Accrued"
                        }]
                    }
                }, {
                    key: "getFormFields",
                    value: function() {
                        return []
                    }
                }, {
                    key: "addDomEvents",
                    value: function(e) {}
                }, {
                    key: "getTemplateName",
                    value: function() {
                        return "leave_entitlement.html"
                    }
                }, {
                    key: "preProcessTableData",
                    value: function(e) {
                        return e
                    }
                }, {
                    key: "showActionButtons",
                    value: function() {
                        return !1
                    }
                }, {
                    key: "get",
                    value: function(e, t) {
                        this.hideLoadError(), t || (this.currentPage = 1, null != this.container && this.container.html(""), this.hasMoreData = !0, this.tableData = []), this.start = (this.currentPage - 1) * this.pageSize, this.container = $("#" + this.getTableName()).find(".objectList"), this.showLoader();
                        var a = JSON.stringify({});
                        e.callBackData = [], e.callBackSuccess = "getEntitlementSuccessCallBack", e.callBackFail = "getEntitlementFailCallBack", this.customAction("getEntitlement", "modules=leaves", a, e), this.initFieldMasterData(), this.trackEvent("get", this.tab, this.table)
                    }
                }, {
                    key: "getEntitlementSuccessCallBack",
                    value: function(e) {
                        this.getSuccessCallBack([], e), this.hideLoader()
                    }
                }, {
                    key: "getEntitlementFailCallBack",
                    value: function(e) {}
                }]), t
            }();
        t.exports = {
            EmployeeLeaveAdapter: h,
            EmployeeApprovedLeaveAdapter: f,
            SubEmployeeLeaveAdapter: p,
            EmployeeLeaveApprovalAdapter: v,
            EmployeeLeaveEntitlementAdapter: m
        }
    }, {
        "../../../api/AdapterBase": 2,
        "../../../api/FormValidation": 3,
        "../../../api/ObjectAdapter": 5
    }]
}, {}, [6]);
//# sourceMappingURL=leaves.js.map