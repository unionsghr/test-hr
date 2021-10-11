!(function () {
  return function e(t, l, a) {
    function i(n, s) {
      if (!l[n]) {
        if (!t[n]) {
          var r = "function" == typeof require && require;
          if (!s && r) return r(n, !0);
          if (o) return o(n, !0);
          var u = new Error("Cannot find module '" + n + "'");
          throw ((u.code = "MODULE_NOT_FOUND"), u);
        }
        var d = (l[n] = {
          exports: {},
        });
        t[n][0].call(
          d.exports,
          function (e) {
            return i(t[n][1][e] || e);
          },
          d,
          d.exports,
          e,
          t,
          l,
          a
        );
      }
      return l[n].exports;
    }
    for (
      var o = "function" == typeof require && require, n = 0;
      n < a.length;
      n++
    )
      i(a[n]);
    return i;
  };
})()(
  {
    1: [
      function (e, t, l) {
        "use strict";
        var a = e("./lib");
        (window.EmployeeAdapter = a.EmployeeAdapter),
          (window.TerminatedEmployeeAdapter = a.TerminatedEmployeeAdapter),
          (window.ArchivedEmployeeAdapter = a.ArchivedEmployeeAdapter),
          (window.EmployeeSkillAdapter = a.EmployeeSkillAdapter),
          (window.EmployeeBankDetailsAdapter = a.EmployeeBankDetailsAdapter),
          (window.EmployeeEducationAdapter = a.EmployeeEducationAdapter),
          (window.EmployeeCertificationAdapter =
            a.EmployeeCertificationAdapter),
          (window.EmployeeLanguageAdapter = a.EmployeeLanguageAdapter),
          (window.EmployeeDependentAdapter = a.EmployeeDependentAdapter),
          (window.EmergencyContactAdapter = a.EmergencyContactAdapter),
          (window.EmployeeImmigrationAdapter = a.EmployeeImmigrationAdapter),
          (window.EmployeeSubSkillsAdapter = a.EmployeeSubSkillsAdapter),
          (window.EmployeeSubEducationAdapter = a.EmployeeSubEducationAdapter),
          (window.EmployeeSubCertificationAdapter =
            a.EmployeeSubCertificationAdapter),
          (window.EmployeeSubLanguageAdapter = a.EmployeeSubLanguageAdapter),
          (window.EmployeeSubDependentAdapter = a.EmployeeSubDependentAdapter),
          (window.EmployeeSubEmergencyContactAdapter =
            a.EmployeeSubEmergencyContactAdapter),
          (window.EmployeeSubDocumentAdapter = a.EmployeeSubDocumentAdapter),
          (window.EmployeeDocumentAdapter = a.EmployeeDocumentAdapter);
      },
      {
        "./lib": 2,
      },
    ],
    2: [
      function (e, t, l) {
        "use strict";
        var a = (function () {
            function e(e, t) {
              for (var l = 0; l < t.length; l++) {
                var a = t[l];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, l, a) {
              return l && e(t.prototype, l), a && e(t, a), t;
            };
          })(),
          i = n(e("../../../api/AdapterBase")),
          o = n(e("../../../api/SubAdapterBase"));

        function n(e) {
          return e && e.__esModule
            ? e
            : {
                default: e,
              };
        }

        function s(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }

        function r(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        }

        function u(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        }
        var d = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, o.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return ["id", "employee", "skill_id", "details"];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Skill",
                      },
                      {
                        sTitle: "Details",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "hidden",
                        },
                      ],
                      [
                        "skill_id",
                        {
                          label: "Skill",
                          type: "select2",
                          "allow-null": !0,
                          "remote-source": ["Skill", "id", "name"],
                        },
                      ],
                      [
                        "details",
                        {
                          label: "Details",
                          type: "textarea",
                          validation: "",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "forceInjectValuesBeforeSave",
                  value: function (e) {
                    return (e.employee = this.parent.currentId), e;
                  },
                },
                {
                  key: "getSubHeaderTitle",
                  value: function () {
                    return (
                      '<button class="btn btn-small btn-success" onclick="modJs.subModJsList[\'tab' +
                      this.tab +
                      '\'].renderForm();" style="margin-right:10px;"><i class="fa fa-plus"></i></button>' +
                      this.gt("Skills")
                    );
                  },
                },
                {
                  key: "getSubItemHtml",
                  value: function (e, t, l) {
                    return $(
                      '<div class="list-group-item sub-tab-item"><h5 class="list-group-item-heading" style="font-weight:bold;">' +
                        e[2] +
                        t +
                        l +
                        '</h5><p class="list-group-item-text">' +
                        nl2br(e[3]) +
                        "</p></div>"
                    );
                  },
                },
              ]),
              t
            );
          })(),
          c = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, o.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "education_id",
                      "institute",
                      "date_start",
                      "date_end",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Qualification",
                      },
                      {
                        sTitle: "Institute",
                      },
                      {
                        sTitle: "Start Date",
                      },
                      {
                        sTitle: "Completed On",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "hidden",
                        },
                      ],
                      [
                        "education_id",
                        {
                          label: "Qualification",
                          type: "select2",
                          "allow-null": !1,
                          "remote-source": ["Education", "id", "name"],
                        },
                      ],
                      [
                        "institute",
                        {
                          label: "Institute",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "date_start",
                        {
                          label: "Start Date",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "date_end",
                        {
                          label: "Completed On",
                          type: "date",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "forceInjectValuesBeforeSave",
                  value: function (e) {
                    return (e.employee = this.parent.currentId), e;
                  },
                },
                {
                  key: "getSubHeaderTitle",
                  value: function () {
                    return (
                      '<button class="btn btn-small btn-success" onclick="modJs.subModJsList[\'tab' +
                      this.tab +
                      '\'].renderForm();" style="margin-right:10px;"><i class="fa fa-plus"></i></button>' +
                      this.gt("Education")
                    );
                  },
                },
                {
                  key: "getSubItemHtml",
                  value: function (e, t, l) {
                    var a = "";
                    try {
                      a = Date.parse(e[4]).toString("MMM d, yyyy");
                    } catch (e) {
                      console.log("Error:" + e.message);
                    }
                    var i = "";
                    try {
                      i = Date.parse(e[5]).toString("MMM d, yyyy");
                    } catch (e) {
                      console.log("Error:" + e.message);
                    }
                    return $(
                      '<div class="list-group-item sub-tab-item"><h5 class="list-group-item-heading" style="font-weight:bold;">' +
                        e[2] +
                        t +
                        l +
                        '</h5><p class="list-group-item-text"><i class="fa fa-calendar"></i> Start: <b>' +
                        a +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-calendar"></i> Completed: <b>' +
                        i +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-building-o"></i> Institute: <b>' +
                        e[3] +
                        "</b></p></div>"
                    );
                  },
                },
              ]),
              t
            );
          })(),
          p = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, o.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "certification_id",
                      "institute",
                      "date_start",
                      "date_end",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Certification",
                      },
                      {
                        sTitle: "Institute",
                      },
                      {
                        sTitle: "Granted On",
                      },
                      {
                        sTitle: "Valid Thru",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "hidden",
                        },
                      ],
                      [
                        "certification_id",
                        {
                          label: "Certification",
                          type: "select2",
                          "allow-null": !1,
                          "remote-source": ["Certification", "id", "name"],
                        },
                      ],
                      [
                        "institute",
                        {
                          label: "Institute",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "date_start",
                        {
                          label: "Granted On",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "date_end",
                        {
                          label: "Valid Thru",
                          type: "date",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "forceInjectValuesBeforeSave",
                  value: function (e) {
                    return (e.employee = this.parent.currentId), e;
                  },
                },
                {
                  key: "getSubHeaderTitle",
                  value: function () {
                    return (
                      '<button class="btn btn-small btn-success" onclick="modJs.subModJsList[\'tab' +
                      this.tab +
                      '\'].renderForm();" style="margin-right:10px;"><i class="fa fa-plus"></i></button>' +
                      this.gt("Certifications")
                    );
                  },
                },
                {
                  key: "getSubItemHtml",
                  value: function (e, t, l) {
                    var a = "";
                    try {
                      a = Date.parse(e[4]).toString("MMM d, yyyy");
                    } catch (e) {
                      console.log("Error:" + e.message);
                    }
                    var i = "";
                    try {
                      i = Date.parse(e[5]).toString("MMM d, yyyy");
                    } catch (e) {
                      console.log("Error:" + e.message);
                    }
                    return $(
                      '<div class="list-group-item sub-tab-item"><h5 class="list-group-item-heading" style="font-weight:bold;">' +
                        e[2] +
                        t +
                        l +
                        '</h5><p class="list-group-item-text"><i class="fa fa-calendar"></i> Granted On: <b>' +
                        a +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-calendar"></i> Valid Thru: <b>' +
                        i +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-building-o"></i> Institute: <b>' +
                        e[3] +
                        "</b></p></div>"
                    );
                  },
                },
              ]),
              t
            );
          })(),
          m = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, o.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "language_id",
                      "reading",
                      "speaking",
                      "writing",
                      "understanding",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Language",
                      },
                      {
                        sTitle: "Reading",
                      },
                      {
                        sTitle: "Speaking",
                      },
                      {
                        sTitle: "Writing",
                      },
                      {
                        sTitle: "Understanding",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    var e = [
                      ["Elementary Proficiency", "Elementary Proficiency"],
                      [
                        "Limited Working Proficiency",
                        "Limited Working Proficiency",
                      ],
                      [
                        "Professional Working Proficiency",
                        "Professional Working Proficiency",
                      ],
                      [
                        "Full Professional Proficiency",
                        "Full Professional Proficiency",
                      ],
                      [
                        "Native or Bilingual Proficiency",
                        "Native or Bilingual Proficiency",
                      ],
                    ];
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "hidden",
                        },
                      ],
                      [
                        "language_id",
                        {
                          label: "Language",
                          type: "select2",
                          "allow-null": !1,
                          "remote-source": ["Language", "id", "name"],
                        },
                      ],
                      [
                        "reading",
                        {
                          label: "Reading",
                          type: "select",
                          source: e,
                        },
                      ],
                      [
                        "speaking",
                        {
                          label: "Speaking",
                          type: "select",
                          source: e,
                        },
                      ],
                      [
                        "writing",
                        {
                          label: "Writing",
                          type: "select",
                          source: e,
                        },
                      ],
                      [
                        "understanding",
                        {
                          label: "Understanding",
                          type: "select",
                          source: e,
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "forceInjectValuesBeforeSave",
                  value: function (e) {
                    return (e.employee = this.parent.currentId), e;
                  },
                },
                {
                  key: "getSubHeaderTitle",
                  value: function () {
                    return (
                      '<button class="btn btn-small btn-success" onclick="modJs.subModJsList[\'tab' +
                      this.tab +
                      '\'].renderForm();" style="margin-right:10px;"><i class="fa fa-plus"></i></button>' +
                      this.gt("Languages")
                    );
                  },
                },
                {
                  key: "getSubItemHtml",
                  value: function (e, t, l) {
                    return $(
                      '<div class="list-group-item sub-tab-item"><h5 class="list-group-item-heading" style="font-weight:bold;">' +
                        e[2] +
                        t +
                        l +
                        '</h5><p class="list-group-item-text"><i class="fa fa-asterisk"></i> Reading: <b>' +
                        e[3] +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-asterisk"></i> Speaking: <b>' +
                        e[4] +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-asterisk"></i> Writing: <b>' +
                        e[5] +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-asterisk"></i> Understanding: <b>' +
                        e[6] +
                        "</b></p></div>"
                    );
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          h = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, o.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "name",
                      "relationship",
                      "dob",
                      "id_number",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Name",
                      },
                      {
                        sTitle: "Relationship",
                      },
                      {
                        sTitle: "Date of Birth",
                      },
                      {
                        sTitle: "Id Number",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "hidden",
                        },
                      ],
                      [
                        "name",
                        {
                          label: "Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "relationship",
                        {
                          label: "Relationship",
                          type: "select",
                          source: [
                            ["Child", "Child"],
                            ["Spouse", "Spouse"],
                            ["Parent", "Parent"],
                            ["Other", "Other"],
                          ],
                        },
                      ],
                      [
                        "dob",
                        {
                          label: "Date of Birth",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "id_number",
                        {
                          label: "Id Number",
                          type: "text",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "forceInjectValuesBeforeSave",
                  value: function (e) {
                    return (e.employee = this.parent.currentId), e;
                  },
                },
                {
                  key: "getSubHeaderTitle",
                  value: function () {
                    return (
                      '<button class="btn btn-small btn-success" onclick="modJs.subModJsList[\'tab' +
                      this.tab +
                      '\'].renderForm();" style="margin-right:10px;"><i class="fa fa-plus"></i></button>' +
                      this.gt("Dependents")
                    );
                  },
                },
                {
                  key: "getSubItemHtml",
                  value: function (e, t, l) {
                    return $(
                      '<div class="list-group-item sub-tab-item"><h5 class="list-group-item-heading" style="font-weight:bold;">' +
                        e[2] +
                        t +
                        l +
                        '</h5><p class="list-group-item-text"><i class="fa fa-users"></i> Relationship: <b>' +
                        e[3] +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-user"></i> Name: <b>' +
                        e[2] +
                        "</b></p></div>"
                    );
                  },
                },
              ]),
              t
            );
          })(),
          f = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, o.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "name",
                      "relationship",
                      "home_phone",
                      "work_phone",
                      "mobile_phone",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Name",
                      },
                      {
                        sTitle: "Relationship",
                      },
                      {
                        sTitle: "Home Phone",
                      },
                      {
                        sTitle: "Work Phone",
                      },
                      {
                        sTitle: "Mobile Phone (Preferred)",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "hidden",
                        },
                      ],
                      [
                        "name",
                        {
                          label: "Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "relationship",
                        {
                          label: "Relationship",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "home_phone",
                        {
                          label: "Home Phone",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "work_phone",
                        {
                          label: "Work Phone",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "mobile_phone",
                        {
                          label: "Mobile Phone (Preferred)",
                          type: "text",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "forceInjectValuesBeforeSave",
                  value: function (e) {
                    return (e.employee = this.parent.currentId), e;
                  },
                },
                {
                  key: "getSubHeaderTitle",
                  value: function () {
                    return (
                      '<button class="btn btn-small btn-success" onclick="modJs.subModJsList[\'tab' +
                      this.tab +
                      '\'].renderForm();" style="margin-right:10px;"><i class="fa fa-plus"></i></button>' +
                      this.gt("Emergency Contacts")
                    );
                  },
                },
                {
                  key: "getSubItemHtml",
                  value: function (e, t, l) {
                    return $(
                      '<div class="list-group-item sub-tab-item"><h5 class="list-group-item-heading" style="font-weight:bold;">' +
                        e[2] +
                        t +
                        l +
                        '</h5><p class="list-group-item-text"><i class="fa fa-users"></i> Relationship: <b>' +
                        e[3] +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-user"></i> Name: <b>' +
                        e[2] +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-phone"></i> Home Phone: <b>' +
                        e[4] +
                        '</b></p><p class="list-group-item-text"><i class="fa fa-phone"></i> Mobile Phone: <b>' +
                        e[6] +
                        "</b></p></div>"
                    );
                  },
                },
              ]),
              t
            );
          })(),
          y = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, o.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "document",
                      "details",
                      "date_added",
                      "valid_until",
                      "status",
                      "attachment",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Document",
                      },
                      {
                        sTitle: "Details",
                      },
                      {
                        sTitle: "Date Added",
                      },
                      {
                        sTitle: "Status",
                      },
                      {
                        sTitle: "Attachment",
                        bVisible: !1,
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "hidden",
                        },
                      ],
                      [
                        "document",
                        {
                          label: "Document",
                          type: "select2",
                          "remote-source": ["Document", "id", "name"],
                        },
                      ],
                      [
                        "date_added",
                        {
                          label: "Date Added",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "valid_until",
                        {
                          label: "Valid Until",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "status",
                        {
                          label: "Status",
                          type: "select",
                          source: [
                            ["Active", "Active"],
                            ["Inactive", "Inactive"],
                            ["Draft", "Draft"],
                          ],
                        },
                      ],
                      [
                        "details",
                        {
                          label: "Details",
                          type: "textarea",
                          validation: "none",
                        },
                      ],
                      [
                        "attachment",
                        {
                          label: "Attachment",
                          type: "fileupload",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "forceInjectValuesBeforeSave",
                  value: function (e) {
                    return (e.employee = this.parent.currentId), e;
                  },
                },
                {
                  key: "getSubHeaderTitle",
                  value: function () {
                    return (
                      '<button class="btn btn-small btn-success" onclick="modJs.subModJsList[\'tab' +
                      this.tab +
                      '\'].renderForm();" style="margin-right:10px;"><i class="fa fa-plus"></i></button>' +
                      this.gt("Documents")
                    );
                  },
                },
                {
                  key: "getSubItemHtml",
                  value: function (e, t, l) {
                    var a = "";
                    try {
                      a = Date.parse(e[5]).toString("MMM d, yyyy");
                    } catch (e) {
                      console.log(e.message);
                    }
                    var i =
                      '<button id="#_id_#_download" onclick="download(\'' +
                      e[7] +
                      '\');return false;" type="button" style="position: absolute;bottom: 5px;right: 70px;font-size: 13px;" tooltip="Download"><li class="fa fa-cloud-download"></li></button>';
                    return $(
                      '<div class="list-group-item sub-tab-item"><h5 class="list-group-item-heading" style="font-weight:bold;">' +
                        e[2] +
                        i +
                        t +
                        l +
                        '</h5><p class="list-group-item-text">' +
                        nl2br(e[3]) +
                        '</p><p class="list-group-item-text"><i class="fa fa-calendar"></i> Expire On: <b>' +
                        a +
                        "</b></p></div>"
                    );
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          b = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, i.default),
              a(t, [
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          v = (function (e) {
            function t(e, l, a, i) {
              s(this, t);
              var o = r(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, l, a, i)
              );
              return (
                (o.fieldNameMap = {}),
                (o.hiddenFields = {}),
                (o.tableFields = {}),
                (o.formOnlyFields = {}),
                o
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "setFieldNameMap",
                  value: function (e) {
                    for (var t = void 0, l = 0; l < e.length; l++)
                      (t = e[l]),
                        (this.fieldNameMap[t.name] = t),
                        "Hidden" === t.display
                          ? (this.hiddenFields[t.name] = t)
                          : "Table and Form" === t.display ||
                            "Form" === t.display
                          ? (this.tableFields[t.name] = t)
                          : (this.formOnlyFields[t.name] = t);
                  },
                },
                {
                  key: "getCustomTableParams",
                  value: function () {
                    var e = this;
                    return {
                      aoColumnDefs: [
                        {
                          fnRender: function (t, l) {
                            return e.preProcessRemoteTableData(t, l, 1);
                          },
                          aTargets: [1],
                        },
                        {
                          fnRender: e.getActionButtons,
                          aTargets: [e.getDataMapping().length],
                        },
                      ],
                    };
                  },
                },
                {
                  key: "preProcessRemoteTableData",
                  value: function (e, t, l) {
                    if (1 === l) {
                      return '<img src="_img_" class="img-circle" style="width:45px;height: 45px;" alt="User Image">'.replace(
                        "_img_",
                        t
                      );
                    }
                    return t;
                  },
                },
                {
                  key: "getTableHTMLTemplate",
                  value: function () {
                    return '<div class="box-body table-responsive"><table cellpadding="0" cellspacing="0" border="0" class="table table-striped" id="grid"></table></div>';
                  },
                },
                {
                  key: "getTableFields",
                  value: function () {
                    return [
                      "id",
                      "image",
                      "employee_id",
                      "first_name",
                      "middle_name",
                      "last_name",
                      "mobile_phone",
                      "department",
                      "gender",
                      "supervisor",
                      "approval_status",
                    ];
                  },
                },
                {
                  key: "getDataMapping",
                  value: function () {
                    for (
                      var e = this.getTableFields(), t = [], l = 0;
                      l < e.length;
                      l++
                    )
                      (void 0 !== this.hiddenFields[e[l]] &&
                        null !== this.hiddenFields[e[l]]) ||
                        (void 0 !== this.formOnlyFields[e[l]] &&
                          null !== this.formOnlyFields[e[l]]) ||
                        t.push(e[l]);
                    return t;
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    for (
                      var e = this.getTableFields(),
                        t = [
                          {
                            sTitle: "ID",
                            bVisible: !1,
                          },
                          {
                            sTitle: "",
                            bSortable: !1,
                          },
                        ],
                        l = "",
                        a = 0;
                      a < e.length;
                      a++
                    )
                      (void 0 !== this.hiddenFields[e[a]] &&
                        null !== this.hiddenFields[e[a]]) ||
                        (void 0 !== this.formOnlyFields[e[a]] &&
                          null !== this.formOnlyFields[e[a]]) ||
                        (void 0 !== this.fieldNameMap[e[a]] &&
                          null !== this.fieldNameMap[e[a]] &&
                          (null == (l = this.fieldNameMap[e[a]].textMapped) ||
                          "" === l
                            ? t.push({
                                sTitle: l,
                              })
                            : "gender" === e[a]
                            ? t.push({
                                sTitle: l,
                                translate: !0,
                              })
                            : t.push({
                                sTitle: l,
                              })));
                    return t;
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    for (
                      var e = [],
                        t = void 0,
                        l = void 0,
                        a = [
                          [
                            "id",
                            {
                              label: "ID",
                              type: "hidden",
                              validation: "",
                            },
                          ],
                          [
                            "employee_id",
                            {
                              label: "Employee Number",
                              type: "hidden",
                              validation: "",
                            },
                          ],
                          [
                            "title",
                            {
                              label: "Title",
                              type: "select2",
                              "remote-source": ["AnnualRent", "id", "name"],
                            },
                          ],
                          [
                            "first_name",
                            {
                              label: "First Name",
                              type: "text",
                              validation: "",
                            },
                          ],
                          [
                            "middle_name",
                            {
                              label: "Middle Name",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "last_name",
                            {
                              label: "Last Name",
                              type: "text",
                              validation: "",
                            },
                          ],
                          [
                            "initials",
                            {
                              label: "Initials",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nationality",
                            {
                              label: "Nationality",
                              type: "select2",
                              "remote-source": ["Nationality", "id", "name"],
                            },
                          ],
                          [
                            "birthday",
                            {
                              label: "Date of Birth",
                              type: "date",
                              validation: "",
                            },
                          ],
                          [
                            "gender",
                            {
                              label: "Gender",
                              type: "select",
                              source: [
                                ["M", "Male"],
                                ["F", "Female"],
                              ],
                            },
                          ],
                          [
                            "profile_image",
                            {
                              label:
                                "Profile Image (.jpg, jpeg or png files only)",
                              type: "fileupload",
                              validation: "",
                            },
                          ],
                          [
                            "signature",
                            {
                              label: "Signature (.jpg, jpeg or png files only)",
                              type: "fileupload",
                              validation: "",
                            },
                          ],
                          [
                            "marital_status",
                            {
                              label: "Marital Status",
                              type: "select",
                              source: [
                                ["Married", "Married"],
                                ["Single", "Single"],
                                ["Divorced", "Divorced"],
                                ["Widowed", "Widowed"],
                                ["Other", "Other"],
                              ],
                            },
                          ],
                          [
                            "religion",
                            {
                              label: "Religion",
                              type: "select",
                              source: [
                                ["Christian", "Christian"],
                                ["Muslim", "Muslim"],
                                ["Other", "Other"],
                              ],
                            },
                          ],
                          [
                            "spouse_name",
                            {
                              label: "Spouse Name",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "father_name",
                            {
                              label: "Father's Name",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "mother_name",
                            {
                              label: "Mother's Name",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "place_of_birth",
                            {
                              label: "Place of Birth",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          // [
                          //   "country",
                          //   {
                          //     label: "Country of Residence",
                          //     type: "select2",
                          //     validation: "",
                          //     "remote-source": ["Country", "code", "name"],
                          //   },
                          // ],
                          [
                            "nxt_kin_fname",
                            {
                              label: "Next Of Kin's Name",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nxt_kin_mname",
                            {
                              label: "Next Of Kin's Middle Name",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nxt_kin_lname",
                            {
                              label: "Next Of Kin's Last Name",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nxt_kin_email",
                            {
                              label: "Next Of Kin's Email",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nxt_kin_phone",
                            {
                              label: "Next Of Kin's Phone No.",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nxt_kin_address",
                            {
                              label: "Next Of Kin's Address",
                              type: "textarea",
                              validation: "none",
                            },
                          ],
                          [
                            "work_station_id",
                            {
                              label: "Work Station ID",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "bank_name",
                            {
                              label: "Name of Bank",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "bank_acc_no",
                            {
                              label: "Bank Account No.",
                              type: "hidden",
                              validation: "",
                            },
                          ],
                          [
                            "tin_no",
                            {
                              label: "TIN",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "staff_level",
                            {
                              label: "Staff Level",
                              type: "select",
                              source: [
                                ["Non-Management", "Non-Management"],
                                ["Management", "Management"],
                                ["Senior Management", "Senior Management"],
                              ],
                            },
                          ],
                          [
                            "staff_role",
                            {
                              label: "Staff Role",
                              type: "select",
                              source: [
                                ["Managerial", "Managerial"],
                                ["Clerical", "Clerical"],
                                ["Non-Clerical", "Non-Clerical"],
                              ],
                            },
                          ],
                          [
                            "ethnicity",
                            {
                              label: "Ethnicity",
                              type: "select2",
                              "allow-null": !0,
                              "remote-source": ["Ethnicity", "id", "name"],
                            },
                          ],
                          [
                            "immigration_status",
                            {
                              label: "Immigration Status",
                              type: "select2",
                              "allow-null": !0,
                              "remote-source": [
                                "ImmigrationStatus",
                                "id",
                                "name",
                              ],
                            },
                          ],
                          [
                            "ssn_num",
                            {
                              label: "Social Security No.",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nassit_num",
                            {
                              label: "NASSIT No.",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "nic_num",
                            {
                              label: "NIN",
                              type: "text",
                              validation: "",
                            },
                          ],
                          [
                            "nin_issue_date",
                            {
                              label: "NIN Issue Date",
                              type: "date",
                              validation: " ",
                            },
                          ],
                          [
                            "nin_expiry_date",
                            {
                              label: "NIN Expiry Date",
                              type: "date",
                              validation: " ",
                            },
                          ],
                          [
                            "labour_card_num",
                            {
                              label: "Labour Card No.",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "fit_and_proper",
                            {
                              label: "Fit & Proper Attachment",
                              type: "fileupload",
                              validation: "none",
                            },
                          ],
                          [
                            "other_id",
                            {
                              label: "Other ID",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "driving_license",
                            {
                              label: "Driving License No",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "employment_status",
                            {
                              label: "Employment Status",
                              type: "select2",
                              "remote-source": [
                                "EmploymentStatus",
                                "id",
                                "name",
                              ],
                            },
                          ],
                          [
                            "job_title",
                            {
                              label: "Job Title",
                              type: "select2",
                              "remote-source": ["JobTitle", "id", "name"],
                            },
                          ],
                          [
                            "pay_grade",
                            {
                              label: "Pay Grade",
                              type: "select2",
                              "allow-null": !0,
                              "remote-source": ["PayGrade", "id", "name"],
                            },
                          ],
                          [
                            "notches",
                            {
                              label: "Notch",
                              type: "select2",
                              "allow-null": true,
                              "remote-source": ["Notches", "id", "name"],
                            },
                          ],
                          [
                            "work_station_id",
                            {
                              label: "Work Station Id",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "recruitment_date",
                            {
                              label: "Recruitment Date",
                              type: "date",
                              validation: "",
                            },
                          ],
                          [
                            "probation_period",
                            {
                              label: "Probation Period (Days)",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "confirmation_date",
                            {
                              label: "Confirmation Date",
                              type: "date",
                              validation: "none",
                            },
                          ],
                          [
                            "start_date",
                            {
                              label: "Start Date",
                              type: "date",
                              validation: "",
                            },
                          ],
                          [
                            "address1",
                            {
                              label: "Address Line 1",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "address2",
                            {
                              label: "Address Line 2",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "city",
                            {
                              label: "City",
                              type: "text",
                              validation: "",
                            },
                          ],
                          [
                            "country",
                            {
                              label: "Country",
                              type: "select2",
                              "remote-source": ["Country", "code", "name"],
                            },
                          ],
                          [
                            "province",
                            {
                              label: "State",
                              type: "select2",
                              "allow-null": !0,
                              "remote-source": ["Province", "id", "name"],
                            },
                          ],
                          [
                            "postal_code",
                            {
                              label: "Postal/Zip Code",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "home_phone",
                            {
                              label: "Home Phone",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "mobile_phone",
                            {
                              label: "Mobile (Preferred)",
                              type: "text",
                              validation: "",
                            },
                          ],
                          [
                            "phone_country",
                            {
                              label: "Phone Country",
                              type: "select2",
                              "remote-source": ["Country", "iso3", "name"],
                            },
                          ],
                          [
                            "work_phone",
                            {
                              label: "Work Phone",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "work_email",
                            {
                              label: "Email (Preferred)",
                              type: "text",
                              validation: "",
                            },
                          ],
                          // ["private_email", {
                          //     label: "Private Email",
                          //     type: "text",
                          //     validation: "emailOrEmpty"
                          // }],
                          [
                            "confirmation_date",
                            {
                              label: "Confirmation Date",
                              type: "date",
                              validation: "none",
                            },
                          ],
                          [
                            "termination_date",
                            {
                              label: "Termination Date",
                              type: "date",
                              validation: "none",
                            },
                          ],
                          [
                            "branch",
                            {
                              label: "Branch",
                              type: "select2",
                              "remote-source": ["Vw_branches", "id", "title"],
                            },
                          ],
                          [
                            "department",
                            {
                              label: "Department",
                              type: "select2",
                              "remote-source": [
                                "Vw_departments",
                                "id",
                                "title",
                              ],
                            },
                          ],
                          [
                            "unit",
                            {
                              label: "Unit",
                              type: "select2",
                              "allow-null": !0,
                              "remote-source": ["Vw_units", "id", "title"],
                            },
                          ],
                          [
                            "outlet",
                            {
                              label: "Outlet",
                              type: "select2",
                              "allow-null": !0,
                              "remote-source": ["Vw_outlets", "id", "title"],
                            },
                          ],
                          [
                            "supervisor",
                            {
                              label: "Direct Supervisor",
                              type: "select2",
                              "allow-null": !0,
                              "remote-source": [
                                "Employee",
                                "id",
                                "first_name+middle_name+last_name",
                              ],
                            },
                          ],
                          [
                            "indirect_supervisors",
                            {
                              label: "Indirect Supervisors",
                              type: "select2multi",
                              "allow-null": !0,
                              "remote-source": [
                                "Employee",
                                "id",
                                "first_name+middle_name+last_name",
                              ],
                            },
                          ],
                          [
                            "previous_work_name",
                            {
                              label: "Previous Place of Engagement",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "previous_work_address",
                            {
                              label: "Address of Previous Place",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "previous_work_tel",
                            {
                              label: "Tel No. of Previous Place",
                              type: "text",
                              validation: "none",
                            },
                          ],
                          [
                            "prev_wk_start_date",
                            {
                              label: "Period From",
                              type: "date",
                              validation: "none",
                            },
                          ],
                          [
                            "prev_wk_end_date",
                            {
                              label: "Period To",
                              type: "date",
                              validation: "none",
                            },
                          ],

                          [
                            "approver1",
                            {
                              label: "First Level Approver",
                              type: "select2",
                              "allow-null": !0,
                              "null-label": "None",
                              "remote-source": [
                                "Employee",
                                "id",
                                "first_name+middle_name+last_name",
                              ],
                            },
                          ],
                          [
                            "approver2",
                            {
                              label: "Second Level Approver",
                              type: "select2",
                              "allow-null": !0,
                              "null-label": "None",
                              "remote-source": [
                                "Employee",
                                "id",
                                "first_name+middle_name+last_name",
                              ],
                            },
                          ],
                          [
                            "approver3",
                            {
                              label: "Third Level Approver",
                              type: "select2",
                              "allow-null": !0,
                              "null-label": "None",
                              "remote-source": [
                                "Employee",
                                "id",
                                "first_name+middle_name+last_name",
                              ],
                            },
                          ],
                          [
                            "notes",
                            {
                              label: "Notes",
                              type: "datagroup",
                              form: [
                                [
                                  "note",
                                  {
                                    label: "Note",
                                    type: "textarea",
                                    validation: "",
                                  },
                                ],
                              ],
                              html: '<div id="#_id_#" class="panel panel-default"><div class="panel-body">#_delete_##_edit_#<span style="color:#999;font-size:13px;font-weight:bold">Date: #_date_#</span><hr/>#_note_#</div></div>',
                              validation: "none",
                              "sort-function": function (e, t) {
                                return (
                                  Date.parse(e.date).getTime() <
                                  Date.parse(t.date).getTime()
                                );
                              },
                              "custom-validate-function": function (e) {
                                var t = {
                                  valid: !0,
                                };
                                return (
                                  (e.date = new Date().toString(
                                    "d-MMM-yyyy hh:mm tt"
                                  )),
                                  (t.params = e),
                                  t
                                );
                              },
                            },
                          ],
                        ],
                        i = 0;
                      i < this.customFields.length;
                      i++
                    )
                      a.push(this.customFields[i]);
                    for (var o = 0; o < a.length; o++)
                      (t = a[o]),
                        (void 0 !== this.hiddenFields[t[0]] &&
                          null !== this.hiddenFields[t[0]]) ||
                          (void 0 !== this.fieldNameMap[t[0]] &&
                            null !== this.fieldNameMap[t[0]] &&
                            ((l = this.fieldNameMap[t[0]].textMapped),
                            (t[1].label = l)),
                          e.push(t));
                    return e;
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "job_title",
                        {
                          label: "Job Title",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Job Titles",
                          "remote-source": ["JobTitle", "id", "name"],
                        },
                      ],
                      [
                        "department",
                        {
                          label: "Department",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Departments",
                          "remote-source": ["CompanyStructure", "id", "title"],
                        },
                      ],
                      [
                        "supervisor",
                        {
                          label: "Supervisor",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "Anyone",
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "openStatus",
                  value: function (e, t, p) {
                    $("#employee_Id").val(e);
                    alert(e);
                    alert("gets here");
                    $("#" + this.itemNameLower + "StatusModel").modal("show"),
                      $("#" + this.itemNameLower + "_status").html(
                        this.getStatusOptions(t)
                      ),
                      $("#" + this.itemNameLower + "_status").val(t),
                      $("#" + this.itemNameLower + "_employee_Id").val(e),
                      (this.statusChangeId = e);
                  },
                },
                {
                  key: "closeDialog",
                  value: function () {
                    $("#" + this.itemNameLower + "StatusModel").modal("hide");
                  },
                },
                {
                  key: "changeStatus",
                  value: function () {
                    var e = $("#" + this.itemNameLower + "_status").val(),
                      t = $("#" + this.itemNameLower + "_reason").val(),
                      p = $("#" + this.itemNameLower + "_employee_Id").val();
                    if (null != e && null != e && "" != e) {
                      var a = {
                          id: this.statusChangeId,
                          status: e,
                          reason: t,
                          employee_Id: p,
                        },
                        l = JSON.stringify(a),
                        i = [];
                      (i.callBackData = []),
                        (i.callBackSuccess = "changeStatusSuccessCallBack"),
                        (i.callBackFail = "changeStatusFailCallBack"),
                        this.customAction(
                          "changeStatus",
                          "admin=" + this.modulePathName,
                          l,
                          i
                        ),
                        this.closeDialog(),
                        (this.statusChangeId = null);
                    } else
                      this.showMessage(
                        "Error",
                        "Please select " + this.itemNameLower + " status"
                      );
                  },
                },
                {
                  key: "changeStatusSuccessCallBack",
                  value: function (e) {
                    this.showMessage(
                      "Successful",
                      this.itemName + " Request status changed successfully"
                    ),
                      this.get([]);
                  },
                },
                {
                  key: "changeStatusFailCallBack",
                  value: function (e) {
                    this.showMessage(
                      "Error",
                      "Error occurred while changing " +
                        this.itemName +
                        " request status"
                    );
                  },
                },
                {
                  key: "getActionButtonsHtml",
                  value: function (e) {
                    var t =
                      '<img class="tableActionButton" src="_BASE_images/connect-no.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Terminate Employee" onclick="modJs.viewEmployee(_id_);return false;"></img>';
                    !1 === this.showDelete && (t = "");
                    var l =
                      '<div style="width:110px;"><img class="tableActionButton" src="_BASE_images/view.png" style="cursor:pointer;margin-left:15px;" rel="tooltip" title="View" onclick="modJs.view(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/edit.png" style="cursor:pointer;margin-left:15px;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/edit.png" style="display:none;cursor:pointer;margin-left:15px;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img>' +
                      t +
                      "</div>";
                    return (l = (l = l.replace(/_id_/g, e)).replace(
                      /_BASE_/g,
                      this.baseUrl
                    ));
                  },
                },
                {
                  key: "getStatusOptionsData",
                  value: function (e) {
                    var t = {};
                    return (
                      "Approved" == e ||
                        ("Pending" == e
                          ? ((t.Approved = "Approved"),
                            (t.Rejected = "Rejected"))
                          : "Rejected" == e ||
                            "Cancelled" == e ||
                            "Processing" == e ||
                            ((t["Cancellation Requested"] =
                              "Cancellation Requested"),
                            (t.Cancelled = "Cancelled"))),
                      t
                    );
                  },
                },
                {
                  key: "getStatusOptions",
                  value: function (e) {
                    return this.generateOptions(this.getStatusOptionsData(e));
                  },
                },
                {
                  key: "getHelpLink",
                  value: function () {
                    return "https://thilinah.gitbooks.io/icehrm-guide/content/employee-information-setup.html";
                  },
                },
                {
                  key: "saveSuccessItemCallback",
                  value: function (e) {
                    (this.lastSavedEmployee = e),
                      null === this.currentId &&
                        $("#createUserModel").modal("show");
                  },
                },
                {
                  key: "closeCreateUser",
                  value: function () {
                    $("#createUserModel").modal("hide");
                  },
                },
                {
                  key: "createUser",
                  value: function () {
                    var e = {};
                    (e.employee = this.lastSavedEmployee.id),
                      (e.user_level = "Employee"),
                      (e.email = this.lastSavedEmployee.work_email),
                      (e.username =
                        this.lastSavedEmployee.work_email.split("@")[0]),
                      (top.location.href = this.getCustomUrl(
                        "?g=admin&n=users&m=admin_Admin&action=new&object=" +
                          Base64.encodeURI(JSON.stringify(e))
                      ));
                  },
                },
                {
                  key: "suspendEmployee",
                  value: function (e) {
                    $("#_employee_id").val(e);
                    // saveSuspension();
                    // alert(e); return false;
                    // $("#employeeSuspensionModel").modal("hide");
                  },
                },
                {
                  key: "saveSuspension",
                  value: function () {
                    // alert(e); return false;
                    var s = $("#suspension_reason").val(),
                      t = $("#_start_date").val(),
                      p = $("#_end_date").val();
                    k = $("#_employee_salary").val();
                    let emp = $("#_employee_id").val();
                    // alert(emp);
                    // alert(s);
                    // alert(t);
                    // alert(p);
                    // alert(k);
                    // return false
                    // alert(k); return false;
                    $.ajax({
                      url: "../../../../rokel_hrm/core/suspend_employee.php",
                      type: "post",
                      contentType: "application/json",
                      dataType: "json",
                      data: JSON.stringify({
                        employee_id: emp,
                        reason: s,
                        start_date: t,
                        end_date: p,
                        salary_rate: k,
                      }),
                      success: function (data, textStatus, jQxhr) {
                        // console.log(data);
                        var cal_amount = data;
                        // alert(cal_amount.data);
                        // alert(data);
                        $("#amount").val(cal_amount.data);
                      },
                    });
                    // if (null != e && "" !== e) {
                    //   var a = JSON.stringify({
                    //       id: this.leaveStatusChangeId,
                    //       employee_Id: e,
                    //       reason: s,
                    //       start_date: t,
                    //       end_date:p,
                    //       salary:k
                    //     }),
                    //     l = [];
                    //   (l.callBackData = []),
                    //     (l.callBackSuccess =
                    //       "changeLeaveStatusSuccessCallBack"),
                    //     (l.callBackFail = "changeLeaveStatusFailCallBack"),
                    //     this.customAction(
                    //       "changeLeaveStatus",
                    //       "admin=leaves",
                    //       a,
                    //       l
                    //     ),
                    this.showMessage(
                      "Successful",
                      "Staff Successfully Suspended"
                    );
                    this.closeEmployeeSuspension();
                    window.location.reload();
                    //     (this.leaveStatusChangeId = null);
                    // } else
                    // this.showMessage("Error", "Please select leave status");
                  },
                },
                {
                  key: "closeEmployeeSuspension",
                  value: function () {
                    $("#employeeSuspensionModel").modal("hide");
                  },
                },
                {
                  key: "deleteEmployee",
                  value: function (e) {
                    if (
                      confirm(
                        "Are you sure you want to archive this employee? Data for this employee will be saved to an archive table. But you will not be able to covert the archived employee data into a normal employee."
                      )
                    ) {
                      var t = [];
                      (t.callBackData = []),
                        (t.callBackSuccess = "deleteEmployeeSuccessCallback"),
                        (t.callBackFail = "deleteEmployeeFailCallback"),
                        this.customAction(
                          "deleteEmployee",
                          "admin=employees",
                          JSON.stringify({
                            id: e,
                          }),
                          t
                        );
                    }
                  },
                },
                {
                  key: "deleteEmployeeSuccessCallback",
                  value: function (e) {
                    this.showMessage(
                      "Delete Success",
                      "Employee deleted. You can find archived information for this employee in Archived Employees tab"
                    ),
                      this.get([]);
                  },
                },
                {
                  key: "deleteEmployeeFailCallback",
                  value: function (e) {
                    this.showMessage(
                      "Error occurred while deleting Employee",
                      e
                    );
                  },
                },
                {
                  key: "viewEmployee",
                  value: function (e) {
                    // alert(e); return false;
                    var t = {
                        id: e,
                        map: JSON.stringify(this.getSourceMapping()),
                      },
                      l = JSON.stringify(t),
                      a = [];
                    (a.callBackData = []),
                      (a.callBackSuccess = "renderEmployee_"),
                      (a.callBackFail = "viewFailCallBack"),
                      this.customAction("get", "modules=employees", l, a);
                    // return false;
                  },
                },

                {
                  key: "terminateEmployee",
                  value: function (e) {
                    // alert(e); return false;
                    //   var t = {
                    //     id: e,
                    //     map: JSON.stringify(this.getSourceMapping()),
                    //   },
                    //   l = JSON.stringify(t),
                    //   a = [];
                    // (a.callBackData = []),
                    //   (a.callBackSuccess = "renderEmployee_"),
                    //   (a.callBackFail = "viewFailCallBack"),
                    //   this.customAction("get", "modules=employees", l, a);
                    // return false;

                    // $("#leaveStatusModel").modal("show"), $("#leave_status").html(this.getLeaveOptions(t)), $("#leave_status").val(t), (this.leaveStatusChangeId = e);
                    if (
                      confirm(
                        "This Employee will be paid End of Service Benefits in full when this is Approved. You will still be able to access all details of this employee also. Are you sure you want to terminate this employee's contract?"
                      )
                    ) {
                      location.reload();
                      // return false;
                      // alert(e);
                      // let id = e;
                      // // alert(emp);
                      // $.ajax({
                      //   url: "../../../../rokel_hrm/core/end_of_service.php",
                      //   type: "post",
                      //   contentType: "application/json",
                      //   dataType: "json",
                      //   data: JSON.stringify({
                      //     employee_id: id,
                      //   }),
                      //   success: function (data, textStatus, jQxhr) {
                      //     // console.log(data);
                      //     var response = data;
                      //     console.log(response);
                      //     // $("#amount").val(cal_amount.data);
                      //   },
                      // });

                      // // return false;
                      // var t = {};
                      // t.id = e;
                      // var l = JSON.stringify(t),
                      //   a = [];
                      // (a.callBackData = []),
                      //   (a.callBackSuccess =
                      //     "terminateEmployeeSuccessCallback"),
                      //   (a.callBackFail = "terminateEmployeeFailCallback"),
                      //   this.customAction(
                      //     "terminateEmployee",
                      //     "admin=employees",
                      //     l,
                      //     a
                      //   );
                    }
                  },
                },

                {
                  key: "approveTermEmployee",
                  value: function (e) {
                    // alert(e); return false;
                    //   var t = {
                    //     id: e,
                    //     map: JSON.stringify(this.getSourceMapping()),
                    //   },
                    //   l = JSON.stringify(t),
                    //   a = [];
                    // (a.callBackData = []),
                    //   (a.callBackSuccess = "renderEmployee_"),
                    //   (a.callBackFail = "viewFailCallBack"),
                    //   this.customAction("get", "modules=employees", l, a);
                    // return false;

                    // $("#leaveStatusModel").modal("show"), $("#leave_status").html(this.getLeaveOptions(t)), $("#leave_status").val(t), (this.leaveStatusChangeId = e);
                    // if (
                    //   confirm(
                    //     "This Employee will be paid End of Service Benefits in full when this is Approved. You will still be able to access all details of this employee also. Are you sure you want to terminate this employee's contract?"
                    //   )

                    // ) {
                    // alert(e); return false;
                    let id = e;
                    // alert(emp);
                    $.ajax({
                      url: "../../../../rokel_hrm/core/end_of_service.php",
                      type: "post",
                      contentType: "application/json",
                      dataType: "json",
                      data: JSON.stringify({
                        employee_id: id,
                      }),
                      success: function (data, textStatus, jQxhr) {
                        // console.log(data);
                        var response = data;
                        console.log(response);
                        // $("#amount").val(cal_amount.data);
                      },
                    });

                    // return false;
                    var t = {};
                    t.id = e;
                    var l = JSON.stringify(t),
                      a = [];
                    (a.callBackData = []),
                      (a.callBackSuccess = "terminateEmployeeSuccessCallback"),
                      (a.callBackFail = "terminateEmployeeFailCallback"),
                      this.customAction(
                        "terminateEmployee",
                        "admin=employees",
                        l,
                        a
                      );
                    // }
                  },
                },

                {
                  key: "renderEmployee_",
                  value: function (e) {
                    var t = void 0,
                      l = this.getFormFields();
                    e[1], e[1], e[2];
                    (e = e[0]), (this.currentEmployee = e);
                    for (
                      var a = this.getCustomTemplate("empDetails.html"), i = 0;
                      i < l.length;
                      i++
                    )
                      void 0 !== this.fieldNameMap[l[i][0]] &&
                        null !== this.fieldNameMap[l[i][0]] &&
                        ((t = this.gt(this.fieldNameMap[l[i][0]].textMapped)),
                        (a = a.replace("#_label_" + l[i][0] + "_#", t)));
                    (a = (a = a.replace(/#_.+_#/gi, "")).replace(
                      /_id_/g,
                      e.id
                    )),
                      $("#" + this.getTableName()).html(a);
                    for (var o = 0; o < l.length; o++)
                      $("#" + this.getTableName() + " #" + l[o][0]).html(
                        e[l[o][0]]
                      ),
                        $(
                          "#" + this.getTableName() + " #" + l[o][0] + "_Name"
                        ).html(e[l[o][0] + "_Name"]);
                    for (var n = "", s = 0; s < e.subordinates.length; s++)
                      void 0 !== e.subordinates[s].first_name &&
                        null !== e.subordinates[s].first_name &&
                        (n += e.subordinates[s].first_name + " "),
                        void 0 !== e.subordinates[s].middle_name &&
                          null !== e.subordinates[s].middle_name &&
                          "" !== e.subordinates[s].middle_name &&
                          (n += e.subordinates[s].middle_name + " "),
                        void 0 !== e.subordinates[s].last_name &&
                          null !== e.subordinates[s].last_name &&
                          "" !== e.subordinates[s].last_name &&
                          (n += e.subordinates[s].last_name),
                        (n += "<br/>");
                    if (
                      ($("#" + this.getTableName() + " #subordinates").html(n),
                      $("#" + this.getTableName() + " #name").html(
                        e.first_name + " " + e.last_name
                      ),
                      (this.currentUserId = e.id),
                      $(
                        "#" + this.getTableName() + " #profile_image_" + e.id
                      ).attr("src", e.image),
                      void 0 !== e.customFields &&
                        null !== e.customFields &&
                        Object.keys(e.customFields).length > 0)
                    ) {
                      var r = void 0;
                      for (var u in e.customFields) {
                        e.customFields[u][1] ||
                          (e.customFields[u][1] = this.gt("Other Details"));
                        var b = e.customFields[u][1].toLocaleLowerCase();
                        if (
                          ((b = b.replace(" ", "_")),
                          $("#cont_" + b).length <= 0)
                        ) {
                          var v =
                            '<div class="panel panel-default" style="width:97.5%;"><div class="panel-heading"><h4>#_section.name_#</h4></div> <div class="panel-body"  id="cont_#_section_#"> </div></div>';
                          (v = (v = v.replace("#_section_#", b)).replace(
                            "#_section.name_#",
                            e.customFields[u][1]
                          )),
                            $("#customFieldsCont").append($(v));
                        }
                        (r = (r =
                          '<div class="col-xs-6 col-md-3" style="font-size:16px;"><label class="control-label col-xs-12" style="font-size:13px;">#_label_#</label><label class="control-label col-xs-12 iceLabel" style="font-size:13px;font-weight: bold;">#_value_#</label></div>').replace(
                          "#_label_#",
                          u
                        )),
                          (r =
                            "fileupload" === e.customFields[u][2]
                              ? r.replace(
                                  "#_value_#",
                                  "<button onclick=\"download('" +
                                    e.customFields[u][0] +
                                    '\');return false;" class="btn btn-mini btn-inverse" type="button">View: ' +
                                    u +
                                    "</button>"
                                )
                              : r.replace("#_value_#", e.customFields[u][0])),
                          $("#cont_" + b).append($(r));
                      }
                    } else $("#customFieldsCont").remove();
                    for (var g in (this.cancel(),
                    this.isModuleInstalled("admin", "documents") ||
                      $("#tabDocuments").remove(),
                    (window.modJs = this),
                    (modJs.subModJsList = []),
                    (modJs.subModJsList.tabEmployeeSkillSubTab = new d(
                      "EmployeeSkill",
                      "EmployeeSkillSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeSkillSubTab.parent = this),
                    (modJs.subModJsList.tabEmployeeEducationSubTab = new c(
                      "EmployeeEducation",
                      "EmployeeEducationSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeEducationSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeBankDetailsSubTab = new j(
                      "EmployeeBankDetails",
                      "EmployeeBankDetailsSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeBankDetailsSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeCertificationSubTab = new p(
                      "EmployeeCertification",
                      "EmployeeCertificationSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeCertificationSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeLanguageSubTab = new m(
                      "EmployeeLanguage",
                      "EmployeeLanguageSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeLanguageSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeDependentSubTab = new h(
                      "EmployeeDependent",
                      "EmployeeDependentSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeDependentSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeEmergencyContactSubTab =
                      new f(
                        "EmergencyContact",
                        "EmployeeEmergencyContactSubTab",
                        {
                          employee: e.id,
                        }
                      )),
                    (modJs.subModJsList.tabEmployeeEmergencyContactSubTab.parent =
                      this),
                    this.isModuleInstalled("admin", "documents") &&
                      ((modJs.subModJsList.tabEmployeeDocumentSubTab = new y(
                        "EmployeeDocument",
                        "EmployeeDocumentSubTab",
                        {
                          employee: e.id,
                        }
                      )),
                      (modJs.subModJsList.tabEmployeeDocumentSubTab.parent =
                        this)),
                    modJs.subModJsList))
                      modJs.subModJsList.hasOwnProperty(g) &&
                        (modJs.subModJsList[g].setTranslationsSubModules(
                          this.translations
                        ),
                        modJs.subModJsList[g].setPermissions(this.permissions),
                        modJs.subModJsList[g].setFieldTemplates(
                          this.fieldTemplates
                        ),
                        modJs.subModJsList[g].setTemplates(this.templates),
                        modJs.subModJsList[g].setCustomTemplates(
                          this.customTemplates
                        ),
                        modJs.subModJsList[g].setEmailTemplates(
                          this.emailTemplates
                        ),
                        modJs.subModJsList[g].setUser(this.user),
                        modJs.subModJsList[g].initFieldMasterData(),
                        modJs.subModJsList[g].setBaseUrl(this.baseUrl),
                        modJs.subModJsList[g].setCurrentProfile(
                          this.currentProfile
                        ),
                        modJs.subModJsList[g].setInstanceId(this.instanceId),
                        modJs.subModJsList[g].setGoogleAnalytics(ga),
                        modJs.subModJsList[g].setNoJSONRequests(
                          this.noJSONRequests
                        ));
                    modJs.subModJsList.tabEmployeeSkillSubTab.setShowFormOnPopup(
                      !0
                    ),
                      modJs.subModJsList.tabEmployeeSkillSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeSkillSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeSkillSubTab.get([]),
                      modJs.subModJsList.tabEmployeeEducationSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeEducationSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEducationSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEducationSubTab.get([]),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.get([]),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.get([]),
                      modJs.subModJsList.tabEmployeeDependentSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeDependentSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeDependentSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeDependentSubTab.get([]),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.get(
                        []
                      ),
                      this.isModuleInstalled("admin", "documents") &&
                        (modJs.subModJsList.tabEmployeeDocumentSubTab.setShowFormOnPopup(
                          !0
                        ),
                        modJs.subModJsList.tabEmployeeDocumentSubTab.setShowAddNew(
                          !1
                        ),
                        modJs.subModJsList.tabEmployeeDocumentSubTab.setShowCancel(
                          !1
                        ),
                        modJs.subModJsList.tabEmployeeDocumentSubTab.get([])),
                      $("#subModTab a")
                        .off()
                        .on("click", function (e) {
                          e.preventDefault(), $(this).tab("show");
                        });
                  },
                },
                {
                  key: "terminateEmployeeSuccessCallback",
                  value: function (e) {
                    this.showMessage(
                      "Success",
                      "Employee contract terminated. You can find terminated employee information under Temporarily Deactivated Employees Tab."
                    ),
                      this.get([]);
                  },
                },
                {
                  key: "terminateEmployeeFailCallback",
                  value: function (e) {
                    this.showMessage(
                      "Error occured while terminating Employee",
                      e
                    );
                  },
                },
                {
                  key: "activateEmployee",
                  value: function (e) {
                    if (
                      confirm(
                        "Are you sure you want to re-activate this employee contract?"
                      )
                    ) {
                      let emp = e;
                      // alert(emp);
                      $.ajax({
                        url: "../../../../rokel_hrm/core/reinstate_employee.php",
                        type: "post",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({
                          employee_id: emp,
                        }),
                        success: function (data, textStatus, jQxhr) {
                          // console.log(data);
                          var cal_amount = data;
                          // alert(cal_amount.data);
                          // alert(data);
                          $("#amount").val(cal_amount.data);
                        },
                      });

                      // return false;
                      var t = {};
                      t.id = e;
                      var l = JSON.stringify(t),
                        a = [];
                      (a.callBackData = []),
                        (a.callBackSuccess = "activateEmployeeSuccessCallback"),
                        (a.callBackFail = "activateEmployeeFailCallback"),
                        this.customAction(
                          "activateEmployee",
                          "admin=employees",
                          l,
                          a
                        );
                    }
                  },
                },
                {
                  key: "activateEmployeeSuccessCallback",
                  value: function (e) {
                    this.showMessage(
                      "Success",
                      "Employee contract re-activated."
                    ),
                      this.get([]);
                  },
                },
                {
                  key: "activateEmployeeFailCallback",
                  value: function (e) {
                    this.showMessage(
                      "Error occurred while activating Employee",
                      e
                    );
                  },
                },
                {
                  key: "doCustomValidation",
                  value: function (e) {
                    try {
                      if (e.birthday !== e.recruitment_date) {
                        var t = new Date(e.birthday);
                        // var t = new Date(e.start_date);
                        if (new Date(e.recruitment_date) < t)
                          return "Date of Birth should be earlier than Recruitment Date";
                        else if (new Date(e.start_date) < t)
                          return "Date of Birth should be earlier than Start Date";
                      }
                      // if (e.nin_issue_date !== e.nin_issue_date) {
                      //   var t = new Date(e.nin_issue_date);
                      //   // var t = new Date(e.start_date);
                      //   if (new Date(e.nin_issue_date) < t)
                      //     return "Expiry date can not be earlier that date of Issue";
                      //   else if (new Date(e.start_date) < t)
                      //     return "Date of Issue should be earlier than Expiry Date";
                      // }
                    } catch (e) {}
                    return null;
                  },
                },
                {
                  key: "doCustomValidation",
                  value: function (e) {
                    try {
                      if (e.nin_issue_date !== e.nin_expiry_date) {
                        var t = new Date(e.nin_issue_date);
                        if (new Date(e.nin_expiry_date) < t)
                          return "NIN Issue date should be earlier than expiry date";
                      }
                    } catch (e) {}
                    return null;
                  },
                },
                {
                  key: "view",
                  value: function (e) {
                    this.currentId = e;
                    // alert(e);return false;
                    var profile = this.getCurrentProfile();
                    let currentProfile = profile.id;
                    // alert(currentProfile);

                    let id = e;

                    $.ajax({
                      url: "../../../../rokel_hrm/core/hide_buttons.php",
                      type: "post",
                      contentType: "application/json",
                      dataType: "json",
                      data: JSON.stringify({
                        id_: id,
                        currentProfile_: currentProfile,

                        // category: category
                      }),
                      success: function (data, textStatus, jQxhr) {
                        // console.log(data);
                        // alert(data);
                      },
                    });

                    var t = {
                        id: e,
                        map: JSON.stringify(this.getSourceMapping()),
                      },
                      l = JSON.stringify(t),
                      a = [];
                    (a.callBackData = []),
                      (a.callBackSuccess = "renderEmployee"),
                      (a.callBackFail = "viewFailCallBack"),
                      this.customAction("get", "modules=employees", l, a);
                  },
                },
                {
                  key: "viewFailCallBack",
                  value: function (e) {
                    this.showMessage(
                      "Error",
                      "Error Occured while retriving candidate"
                    );
                  },
                },
                {
                  key: "renderEmployee",
                  value: function (e) {
                    // alert(JSON.stringify(e[0][1]));return false;
                    $("#employee_Id").val(e);
                    var t = void 0,
                      l = this.getFormFields();
                    e[1], e[1], e[2];
                    (e = e[0]), (this.currentEmployee = e);
                    for (
                      var a = this.getCustomTemplate("myDetails.html"), i = 0;
                      i < l.length;
                      i++
                    )
                      void 0 !== this.fieldNameMap[l[i][0]] &&
                        null !== this.fieldNameMap[l[i][0]] &&
                        ((t = this.gt(this.fieldNameMap[l[i][0]].textMapped)),
                        (a = a.replace("#_label_" + l[i][0] + "_#", t)));
                    (a = (a = a.replace(/#_.+_#/gi, "")).replace(
                      /_id_/g,
                      e.id
                    )),
                      $("#" + this.getTableName()).html(a);
                    for (var o = 0; o < l.length; o++)
                      $("#" + this.getTableName() + " #" + l[o][0]).html(
                        e[l[o][0]]
                      ),
                        $(
                          "#" + this.getTableName() + " #" + l[o][0] + "_Name"
                        ).html(e[l[o][0] + "_Name"]);
                    for (var n = "", s = 0; s < e.subordinates.length; s++)
                      void 0 !== e.subordinates[s].first_name &&
                        null !== e.subordinates[s].first_name &&
                        (n += e.subordinates[s].first_name + " "),
                        void 0 !== e.subordinates[s].middle_name &&
                          null !== e.subordinates[s].middle_name &&
                          "" !== e.subordinates[s].middle_name &&
                          (n += e.subordinates[s].middle_name + " "),
                        void 0 !== e.subordinates[s].last_name &&
                          null !== e.subordinates[s].last_name &&
                          "" !== e.subordinates[s].last_name &&
                          (n += e.subordinates[s].last_name),
                        (n += "<br/>");
                    if (
                      ($("#" + this.getTableName() + " #subordinates").html(n),
                      $("#" + this.getTableName() + " #name").html(
                        e.first_name + " " + e.last_name
                      ),
                      (this.currentUserId = e.id),
                      $(
                        "#" + this.getTableName() + " #profile_image_" + e.id
                      ).attr("src", e.image),
                      void 0 !== e.customFields &&
                        null !== e.customFields &&
                        Object.keys(e.customFields).length > 0)
                    ) {
                      var r = void 0;
                      for (var u in e.customFields) {
                        e.customFields[u][1] ||
                          (e.customFields[u][1] = this.gt("Other Details"));
                        var b = e.customFields[u][1].toLocaleLowerCase();
                        if (
                          ((b = b.replace(" ", "_")),
                          $("#cont_" + b).length <= 0)
                        ) {
                          var v =
                            '<div class="panel panel-default" style="width:97.5%;"><div class="panel-heading"><h4>#_section.name_#</h4></div> <div class="panel-body"  id="cont_#_section_#"> </div></div>';
                          (v = (v = v.replace("#_section_#", b)).replace(
                            "#_section.name_#",
                            e.customFields[u][1]
                          )),
                            $("#customFieldsCont").append($(v));
                        }
                        (r = (r =
                          '<div class="col-xs-6 col-md-3" style="font-size:16px;"><label class="control-label col-xs-12" style="font-size:13px;">#_label_#</label><label class="control-label col-xs-12 iceLabel" style="font-size:13px;font-weight: bold;">#_value_#</label></div>').replace(
                          "#_label_#",
                          u
                        )),
                          (r =
                            "fileupload" === e.customFields[u][2]
                              ? r.replace(
                                  "#_value_#",
                                  "<button onclick=\"download('" +
                                    e.customFields[u][0] +
                                    '\');return false;" class="btn btn-mini btn-inverse" type="button">View: ' +
                                    u +
                                    "</button>"
                                )
                              : r.replace("#_value_#", e.customFields[u][0])),
                          $("#cont_" + b).append($(r));
                      }
                    } else $("#customFieldsCont").remove();
                    for (var g in (this.cancel(),
                    this.isModuleInstalled("admin", "documents") ||
                      $("#tabDocuments").remove(),
                    (window.modJs = this),
                    (modJs.subModJsList = []),
                    (modJs.subModJsList.tabEmployeeSkillSubTab = new d(
                      "EmployeeSkill",
                      "EmployeeSkillSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeSkillSubTab.parent = this),
                    (modJs.subModJsList.tabEmployeeEducationSubTab = new c(
                      "EmployeeEducation",
                      "EmployeeEducationSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeEducationSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeBankDetailsSubTab = new j(
                      "EmployeeBankDetails",
                      "EmployeeBankDetailsSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeBankDetailsSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeCertificationSubTab = new p(
                      "EmployeeCertification",
                      "EmployeeCertificationSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeCertificationSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeLanguageSubTab = new m(
                      "EmployeeLanguage",
                      "EmployeeLanguageSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeLanguageSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeDependentSubTab = new h(
                      "EmployeeDependent",
                      "EmployeeDependentSubTab",
                      {
                        employee: e.id,
                      }
                    )),
                    (modJs.subModJsList.tabEmployeeDependentSubTab.parent =
                      this),
                    (modJs.subModJsList.tabEmployeeEmergencyContactSubTab =
                      new f(
                        "EmergencyContact",
                        "EmployeeEmergencyContactSubTab",
                        {
                          employee: e.id,
                        }
                      )),
                    (modJs.subModJsList.tabEmployeeEmergencyContactSubTab.parent =
                      this),
                    this.isModuleInstalled("admin", "documents") &&
                      ((modJs.subModJsList.tabEmployeeDocumentSubTab = new y(
                        "EmployeeDocument",
                        "EmployeeDocumentSubTab",
                        {
                          employee: e.id,
                        }
                      )),
                      (modJs.subModJsList.tabEmployeeDocumentSubTab.parent =
                        this)),
                    modJs.subModJsList))
                      modJs.subModJsList.hasOwnProperty(g) &&
                        (modJs.subModJsList[g].setTranslationsSubModules(
                          this.translations
                        ),
                        modJs.subModJsList[g].setPermissions(this.permissions),
                        modJs.subModJsList[g].setFieldTemplates(
                          this.fieldTemplates
                        ),
                        modJs.subModJsList[g].setTemplates(this.templates),
                        modJs.subModJsList[g].setCustomTemplates(
                          this.customTemplates
                        ),
                        modJs.subModJsList[g].setEmailTemplates(
                          this.emailTemplates
                        ),
                        modJs.subModJsList[g].setUser(this.user),
                        modJs.subModJsList[g].initFieldMasterData(),
                        modJs.subModJsList[g].setBaseUrl(this.baseUrl),
                        modJs.subModJsList[g].setCurrentProfile(
                          this.currentProfile
                        ),
                        modJs.subModJsList[g].setInstanceId(this.instanceId),
                        modJs.subModJsList[g].setGoogleAnalytics(ga),
                        modJs.subModJsList[g].setNoJSONRequests(
                          this.noJSONRequests
                        ));
                    modJs.subModJsList.tabEmployeeSkillSubTab.setShowFormOnPopup(
                      !0
                    ),
                      modJs.subModJsList.tabEmployeeSkillSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeSkillSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeSkillSubTab.get([]),
                      modJs.subModJsList.tabEmployeeEducationSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeEducationSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEducationSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEducationSubTab.get([]),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeCertificationSubTab.get([]),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeLanguageSubTab.get([]),
                      modJs.subModJsList.tabEmployeeDependentSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeDependentSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeDependentSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeDependentSubTab.get([]),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.setShowFormOnPopup(
                        !0
                      ),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.setShowAddNew(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.setShowCancel(
                        !1
                      ),
                      modJs.subModJsList.tabEmployeeEmergencyContactSubTab.get(
                        []
                      ),
                      this.isModuleInstalled("admin", "documents") &&
                        (modJs.subModJsList.tabEmployeeDocumentSubTab.setShowFormOnPopup(
                          !0
                        ),
                        modJs.subModJsList.tabEmployeeDocumentSubTab.setShowAddNew(
                          !1
                        ),
                        modJs.subModJsList.tabEmployeeDocumentSubTab.setShowCancel(
                          !1
                        ),
                        modJs.subModJsList.tabEmployeeDocumentSubTab.get([])),
                      $("#subModTab a")
                        .off()
                        .on("click", function (e) {
                          e.preventDefault(), $(this).tab("show");
                        });
                  },
                },
                {
                  key: "deleteProfileImage",
                  value: function (e) {
                    //   alert("here");
                    //   return false;
                    var t = {
                        id: e,
                      },
                      l = JSON.stringify(t),
                      a = [];
                    (a.callBackData = []),
                      (a.callBackSuccess =
                        "modEmployeeDeleteProfileImageCallBack"),
                      (a.callBackFail =
                        "modEmployeeDeleteProfileImageCallBack"),
                      this.customAction(
                        "deleteProfileImage",
                        "modules=employees",
                        l,
                        a
                      );
                  },
                },
                {
                  key: "approveEmployee",
                  value: function (e) {
                    // alert(e);
                    // return false;

                    if (
                      confirm(
                        "This Employee becomes fully Confirmed once Approved. Are you sure you want to Approve this Employee? "
                      )
                    ) {
                      var profile = this.getCurrentProfile();
                      let currentProfile = profile.id;
                      // alert(currentProfile);

                      let id = e;
                      let status = "Approved";
                      // alert(id);
                      // alert(id);
                      // return false;

                      $.ajax({
                        url: "../../../../rokel_hrm/core/staff_approval.php",
                        type: "post",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({
                          id_: id,
                          status_: status,
                          currentUser: currentProfile,

                          // category: category
                        }),
                        success: function (data, textStatus, jQxhr) {
                          console.log(data);
                          // alert(data);
                        },
                      });

                      alert("Employee Successfully Approved");
                      window.location.reload();
                    }
                  },
                },
                {
                  key: "rejectEmployee",
                  value: function (e) {
                    // alert(e);
                    // return false;
                    if (
                      confirm(
                        "This Employee will be Inactive once Rejected. Are you sure you want to Reject this Employee? "
                      )
                    ) {
                      //   alert(e);
                      //   return false;
                      let id = e;
                      let status = "Rejected";
                      // alert(id);
                      // return false;

                      $.ajax({
                        url: "../../../../rokel_hrm/core/staff_approval.php",
                        type: "post",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({
                          id_: id,
                          status_: status,

                          // category: category
                        }),
                        success: function (data, textStatus, jQxhr) {
                          // console.log(data);
                          // alert(data);
                        },
                      });

                      alert("Employee Successfully Rejected");
                      window.location.reload();
                    }
                  },
                },
                {
                  key: "modEmployeeDeleteProfileImageCallBack",
                  value: function (e) {},
                },
              ]),
              t
            );
          })(),
          g = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, v),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "image",
                      "employee_id",
                      "first_name",
                      "middle_name",
                      "last_name",
                      "mobile_phone",
                      "department",
                      "gender",
                      "supervisor",
                      "Approval_status",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                      },
                      {
                        sTitle: "",
                        bSortable: !1,
                      },
                      {
                        sTitle: "Employee Number",
                      },
                      {
                        sTitle: "First Name",
                      },
                      {
                        sTitle: "Middle Name",
                      },
                      {
                        sTitle: "Last Name",
                      },
                      {
                        sTitle: "Mobile Preferred",
                      },
                      {
                        sTitle: "Department",
                      },
                      {
                        sTitle: "Gender",
                      },
                      {
                        sTitle: "Supervisor",
                      },
                      {
                        sTitle: "Status",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                          validation: "",
                        },
                      ],
                      [
                        "employee_id",
                        {
                          label: "Employee Number",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "first_name",
                        {
                          label: "First Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "middle_name",
                        {
                          label: "Middle Name",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "last_name",
                        {
                          label: "Last Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "nationality",
                        {
                          label: "Nationality",
                          type: "select2",
                          "remote-source": ["Nationality", "id", "name"],
                        },
                      ],
                      [
                        "birthday",
                        {
                          label: "Date of Birth",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "gender",
                        {
                          label: "Gender",
                          type: "select",
                          source: [
                            ["M", "Male"],
                            ["F", "Female"],
                          ],
                        },
                      ],
                      [
                        "marital_status",
                        {
                          label: "Marital Status",
                          type: "select",
                          source: [
                            ["Married", "Married"],
                            ["Single", "Single"],
                            ["Divorced", "Divorced"],
                            ["Widowed", "Widowed"],
                            ["Other", "Other"],
                          ],
                        },
                      ],
                      [
                        "ssn_num",
                        {
                          label: "NASSIT No.",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "nic_num",
                        {
                          label: "NIC",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "other_id",
                        {
                          label: "Other ID",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "driving_license",
                        {
                          label: "Driving License No",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "employment_status",
                        {
                          label: "Employment Status",
                          type: "select2",
                          "remote-source": ["EmploymentStatus", "id", "name"],
                        },
                      ],
                      [
                        "job_title",
                        {
                          label: "Job Title",
                          type: "select2",
                          "remote-source": ["JobTitle", "id", "name"],
                        },
                      ],
                      [
                        "pay_grade",
                        {
                          label: "Pay Grade",
                          type: "select2",
                          "allow-null": !0,
                          "remote-source": ["PayGrade", "id", "name"],
                        },
                      ],
                      [
                        "work_station_id",
                        {
                          label: "Work Station Id",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "address1",
                        {
                          label: "Address Line 1",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "address2",
                        {
                          label: "Address Line 2",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "city",
                        {
                          label: "City",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "country",
                        {
                          label: "Country",
                          type: "select2",
                          "remote-source": ["Country", "code", "name"],
                        },
                      ],
                      [
                        "province",
                        {
                          label: "Province",
                          type: "select2",
                          "allow-null": !0,
                          "remote-source": ["Province", "id", "name"],
                        },
                      ],
                      [
                        "postal_code",
                        {
                          label: "Postal/Zip Code",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "home_phone",
                        {
                          label: "Home Phone",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "mobile_phone",
                        {
                          label: "Mobile Phone (Preferred)",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "work_phone",
                        {
                          label: "Work Phone",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "work_email",
                        {
                          label: "Work Email",
                          type: "text",
                          validation: "emailOrEmpty",
                        },
                      ],
                      [
                        "private_email",
                        {
                          label: "Private Email",
                          type: "text",
                          validation: "emailOrEmpty",
                        },
                      ],
                      [
                        "joined_date",
                        {
                          label: "Joined Date",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "confirmation_date",
                        {
                          label: "Confirmation Date",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "termination_date",
                        {
                          label: "Termination Date",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "department",
                        {
                          label: "Department",
                          type: "select2",
                          "remote-source": ["CompanyStructure", "id", "title"],
                        },
                      ],
                      [
                        "supervisor",
                        {
                          label: "Supervisor",
                          type: "select2",
                          "allow-null": !0,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                          ],
                        },
                      ],
                      [
                        "notes",
                        {
                          label: "Notes",
                          type: "datagroup",
                          form: [
                            [
                              "note",
                              {
                                label: "Note",
                                type: "textarea",
                                validation: "",
                              },
                            ],
                          ],
                          html: '<div id="#_id_#" class="panel panel-default"><div class="panel-body">#_delete_##_edit_#<span style="color:#999;font-size:13px;font-weight:bold">Date: #_date_#</span><hr/>#_note_#</div></div>',
                          validation: "none",
                          "sort-function": function (e, t) {
                            return (
                              Date.parse(e.date).getTime() <
                              Date.parse(t.date).getTime()
                            );
                          },
                          "custom-validate-function": function (e) {
                            var t = {
                              valid: !0,
                            };
                            return (
                              (e.date = new Date().toString(
                                "d-MMM-yyyy hh:mm tt"
                              )),
                              (t.params = e),
                              t
                            );
                          },
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "job_title",
                        {
                          label: "Job Title",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Job Titles",
                          "remote-source": ["JobTitle", "id", "name"],
                        },
                      ],
                      [
                        "department",
                        {
                          label: "Department",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Departments",
                          "remote-source": ["CompanyStructure", "id", "title"],
                        },
                      ],
                      [
                        "supervisor",
                        {
                          label: "Supervisor",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "Anyone",
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getActionButtonsHtml",
                  value: function (e) {
                    var t =
                      '<div style="width:110px;"><img class="tableActionButton" src="_BASE_images/edit.png" style="cursor:pointer;margin-left:15px;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/edit.png" style="display:none;cursor:pointer;margin-left:15px;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Archive Employee" onclick="modJs.deleteEmployee(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/redo.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Restore Employee" onclick="modJs.activateEmployee(_id_);return false;"></img></div>';
                    return (t = (t = t.replace(/_id_/g, e)).replace(
                      /_BASE_/g,
                      this.baseUrl
                    ));
                  },
                },
                {
                  key: "download",
                  value: function (e) {
                    var t = {
                      t: "ArchivedEmployee",
                      sa: "downloadArchivedEmployee",
                      mod: "admin=employees",
                    };
                    t.req = JSON.stringify({
                      id: e,
                    });
                    var l = modJs.getCustomActionUrl("ca", t);
                    window.open(l, "_blank");
                  },
                },
              ]),
              t
            );
          })(),
          _ = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee_id",
                      "first_name",
                      "last_name",
                      "work_email",
                      "department",
                      "gender",
                      "supervisor",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                      },
                      {
                        sTitle: "Employee Number",
                      },
                      {
                        sTitle: "First Name",
                      },
                      {
                        sTitle: "Last Name",
                      },
                      {
                        sTitle: "Work Email",
                      },
                      {
                        sTitle: "Department",
                      },
                      {
                        sTitle: "Gender",
                      },
                      {
                        sTitle: "Supervisor",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                          validation: "",
                        },
                      ],
                      [
                        "employee_id",
                        {
                          label: "Employee Number",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "first_name",
                        {
                          label: "First Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "middle_name",
                        {
                          label: "Middle Name",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "last_name",
                        {
                          label: "Last Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "gender",
                        {
                          label: "Gender",
                          type: "select",
                          source: [
                            ["M", "Male"],
                            ["F", "Female"],
                          ],
                        },
                      ],
                      [
                        "ssn_num",
                        {
                          label: "SSN/NRIC",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "nic_num",
                        {
                          label: "NIN",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "other_id",
                        {
                          label: "Other ID",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "driving_license",
                        {
                          label: "Driving License No",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "department",
                        {
                          label: "Department",
                          type: "select2",
                          "remote-source": ["CompanyStructure", "id", "title"],
                        },
                      ],
                      [
                        "supervisor",
                        {
                          label: "Supervisor",
                          type: "select2",
                          "allow-null": !0,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "job_title",
                        {
                          label: "Job Title",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Job Titles",
                          "remote-source": ["JobTitle", "id", "name"],
                        },
                      ],
                      [
                        "department",
                        {
                          label: "Department",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Departments",
                          "remote-source": ["CompanyStructure", "id", "title"],
                        },
                      ],
                      [
                        "supervisor",
                        {
                          label: "Supervisor",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "Anyone",
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getActionButtonsHtml",
                  value: function (e) {
                    var t =
                      '<div style="width:110px;"><img class="tableActionButton" src="_BASE_images/download.png" style="cursor:pointer;" rel="tooltip" title="Download Archived Data" onclick="modJs.download(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Remove Archived Data" onclick="modJs.deleteRow(_id_);return false;"></img></div>';
                    return (t = (t = t.replace(/_id_/g, e)).replace(
                      /_BASE_/g,
                      this.baseUrl
                    ));
                  },
                },
                {
                  key: "download",
                  value: function (e) {
                    var t = {
                      t: "ArchivedEmployee",
                      sa: "downloadArchivedEmployee",
                      mod: "admin=employees",
                    };
                    t.req = JSON.stringify({
                      id: e,
                    });
                    var l = modJs.getCustomActionUrl("ca", t);
                    window.open(l, "_blank");
                  },
                },
              ]),
              t
            );
          })(),
          k = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return ["id", "employee", "skill_id", "details"];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Skill",
                      },
                      {
                        sTitle: "Details",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "skill_id",
                        {
                          label: "Skill",
                          type: "select2",
                          "allow-null": !0,
                          "remote-source": ["Skill", "id", "name"],
                        },
                      ],
                      [
                        "details",
                        {
                          label: "Details",
                          type: "textarea",
                          validation: "",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "skill_id",
                        {
                          label: "Skill",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Skills",
                          "remote-source": ["Skill", "id", "name"],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          j = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "subProduct",
                      "subSector",
                      "subSegment",
                      "noCrTrans",
                      "noDbTrans",
                      "totalCrTrans",
                      "totalDbTrans",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Sub Product",
                      },
                      {
                        sTitle: "Sub Sector",
                      },
                      {
                        sTitle: "Sub Segment",
                      },
                      {
                        sTitle: "No. of CR Transfers",
                      },
                      {
                        sTitle: "No. of DR Transfers",
                      },
                      {
                        sTitle: "Total CR Transfers",
                      },
                      {
                        sTitle: "Total DR Transfers",
                      },
                      // {
                      //     sTitle: "Currency"
                      // },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "subProduct",
                        {
                          label: "Sub Product",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "subSector",
                        {
                          label: "Sub Sector",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "subSegment",
                        {
                          label: "Sub Segment",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "noCrTrans",
                        {
                          label: "No. of Credit Transfers",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "noDbTrans",
                        {
                          label: "No. of Debit Transfers",
                          type: "text",
                          //   "allow-null": !1,
                          validation: "",
                        },
                      ],
                      [
                        "totalCrTrans",
                        {
                          label: "Total Credit Transfer",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "totalDbTrans",
                        {
                          label: "Total Debit Transfer",
                          type: "text",
                          validation: "",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "skill_id",
                        {
                          label: "Account Type",
                          type: "select",
                          source: [
                            ["Internal", "Internal"],
                            ["External", "External"],
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          S = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "education_id",
                      "institute",
                      "date_start",
                      "date_end",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Qualification",
                      },
                      {
                        sTitle: "Institute",
                      },
                      {
                        sTitle: "Start Date",
                      },
                      {
                        sTitle: "Completed On",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "education_id",
                        {
                          label: "Qualification",
                          type: "select2",
                          "allow-null": !1,
                          "remote-source": ["Education", "id", "name"],
                        },
                      ],
                      [
                        "institute",
                        {
                          label: "Institute",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "date_start",
                        {
                          label: "Start Date",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "date_end",
                        {
                          label: "Completed On",
                          type: "date",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "education_id",
                        {
                          label: "Qualification",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Qualifications",
                          "remote-source": ["Education", "id", "name"],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          E = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "certification_id",
                      "institute",
                      "date_start",
                      "date_end",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Certification",
                      },
                      {
                        sTitle: "Institute",
                      },
                      {
                        sTitle: "Granted On",
                      },
                      {
                        sTitle: "Valid Thru",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "certification_id",
                        {
                          label: "Certification",
                          type: "select2",
                          "allow-null": !1,
                          "remote-source": ["Certification", "id", "name"],
                        },
                      ],
                      [
                        "institute",
                        {
                          label: "Institute",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "date_start",
                        {
                          label: "Granted On",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "date_end",
                        {
                          label: "Valid Thru",
                          type: "date",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "certification_id",
                        {
                          label: "Certification",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Certifications",
                          "remote-source": ["Certification", "id", "name"],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          w = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "language_id",
                      "reading",
                      "speaking",
                      "writing",
                      "understanding",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Language",
                      },
                      {
                        sTitle: "Reading",
                      },
                      {
                        sTitle: "Speaking",
                      },
                      {
                        sTitle: "Writing",
                      },
                      {
                        sTitle: "Understanding",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    var e = [
                      ["Elementary Proficiency", "Elementary Proficiency"],
                      [
                        "Limited Working Proficiency",
                        "Limited Working Proficiency",
                      ],
                      [
                        "Professional Working Proficiency",
                        "Professional Working Proficiency",
                      ],
                      [
                        "Full Professional Proficiency",
                        "Full Professional Proficiency",
                      ],
                      [
                        "Native or Bilingual Proficiency",
                        "Native or Bilingual Proficiency",
                      ],
                    ];
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "language_id",
                        {
                          label: "Language",
                          type: "select2",
                          "allow-null": !1,
                          "remote-source": ["Language", "id", "name"],
                        },
                      ],
                      [
                        "reading",
                        {
                          label: "Reading",
                          type: "select",
                          source: e,
                        },
                      ],
                      [
                        "speaking",
                        {
                          label: "Speaking",
                          type: "select",
                          source: e,
                        },
                      ],
                      [
                        "writing",
                        {
                          label: "Writing",
                          type: "select",
                          source: e,
                        },
                      ],
                      [
                        "understanding",
                        {
                          label: "Understanding",
                          type: "select",
                          source: e,
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "language_id",
                        {
                          label: "Language",
                          type: "select2",
                          "allow-null": !0,
                          "null-label": "All Languages",
                          "remote-source": ["Language", "id", "name"],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          T = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "name",
                      "relationship",
                      "dob",
                      "id_number",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Name",
                      },
                      {
                        sTitle: "Relationship",
                      },
                      {
                        sTitle: "Date of Birth",
                      },
                      {
                        sTitle: "Id Number",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "name",
                        {
                          label: "Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "relationship",
                        {
                          label: "Relationship",
                          type: "select",
                          source: [
                            ["Child", "Child"],
                            ["Spouse", "Spouse"],
                            ["Parent", "Parent"],
                            ["Other", "Other"],
                          ],
                        },
                      ],
                      [
                        "dob",
                        {
                          label: "Date of Birth",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "id_number",
                        {
                          label: "Id Number",
                          type: "text",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          D = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "name",
                      "relationship",
                      "home_phone",
                      "work_phone",
                      "mobile_phone",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Name",
                      },
                      {
                        sTitle: "Relationship",
                      },
                      {
                        sTitle: "Home Phone",
                      },
                      {
                        sTitle: "Work Phone",
                      },
                      {
                        sTitle: "Mobile Phone",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "name",
                        {
                          label: "Name",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "relationship",
                        {
                          label: "Relationship",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "home_phone",
                        {
                          label: "Home Phone",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "work_phone",
                        {
                          label: "Work Phone",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "mobile_phone",
                        {
                          label: "Mobile Phone (Preferred)",
                          type: "text",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          F = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, b),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "document",
                      "doc_number",
                      "issued",
                      "expiry",
                      "status",
                      "details",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Document",
                        sClass: "columnMain",
                      },
                      {
                        sTitle: "Number",
                      },
                      {
                        sTitle: "Issued Date",
                      },
                      {
                        sTitle: "Expiry Date",
                      },
                      {
                        sTitle: "Status",
                      },
                      {
                        sTitle: "Details",
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "document",
                        {
                          label: "Document",
                          type: "select2",
                          source: [
                            ["Passport", "Passport"],
                            ["Visa", "Visa"],
                          ],
                        },
                      ],
                      [
                        "doc_number",
                        {
                          label: "Number",
                          type: "text",
                          validation: "",
                        },
                      ],
                      [
                        "issued",
                        {
                          label: "Issued Date",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "expiry",
                        {
                          label: "Expiry Date",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "status",
                        {
                          label: "Status",
                          type: "text",
                          validation: "none",
                        },
                      ],
                      [
                        "details",
                        {
                          label: "Details",
                          type: "textarea",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })(),
          M = (function (e) {
            function t() {
              return (
                s(this, t),
                r(
                  this,
                  (t.__proto__ || Object.getPrototypeOf(t)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              u(t, i.default),
              a(t, [
                {
                  key: "getDataMapping",
                  value: function () {
                    return [
                      "id",
                      "employee",
                      "document",
                      "details",
                      "date_added",
                      "status",
                      "attachment",
                    ];
                  },
                },
                {
                  key: "getHeaders",
                  value: function () {
                    return [
                      {
                        sTitle: "ID",
                        bVisible: !1,
                      },
                      {
                        sTitle: "Employee",
                      },
                      {
                        sTitle: "Document",
                      },
                      {
                        sTitle: "Details",
                      },
                      {
                        sTitle: "Date Added",
                      },
                      {
                        sTitle: "Status",
                      },
                      {
                        sTitle: "Attachment",
                        bVisible: !1,
                      },
                    ];
                  },
                },
                {
                  key: "getFormFields",
                  value: function () {
                    return [
                      [
                        "id",
                        {
                          label: "ID",
                          type: "hidden",
                        },
                      ],
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          sort: "none",
                          "allow-null": !1,
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                            "getActiveSubordinateEmployees",
                          ],
                        },
                      ],
                      [
                        "document",
                        {
                          label: "Document",
                          type: "select2",
                          "remote-source": ["Document", "id", "name"],
                        },
                      ],
                      [
                        "date_added",
                        {
                          label: "Date Added",
                          type: "date",
                          validation: "",
                        },
                      ],
                      [
                        "valid_until",
                        {
                          label: "Valid Until",
                          type: "date",
                          validation: "none",
                        },
                      ],
                      [
                        "status",
                        {
                          label: "Status",
                          type: "select",
                          source: [
                            ["Active", "Active"],
                            ["Inactive", "Inactive"],
                            ["Draft", "Draft"],
                          ],
                        },
                      ],
                      [
                        "details",
                        {
                          label: "Details",
                          type: "textarea",
                          validation: "none",
                        },
                      ],
                      [
                        "attachment",
                        {
                          label: "Attachment",
                          type: "fileupload",
                          validation: "none",
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getFilters",
                  value: function () {
                    return [
                      [
                        "employee",
                        {
                          label: "Employee",
                          type: "select2",
                          "remote-source": [
                            "Employee",
                            "id",
                            "first_name+middle_name+last_name",
                          ],
                        },
                      ],
                    ];
                  },
                },
                {
                  key: "getActionButtonsHtml",
                  value: function (e, t) {
                    var l =
                      '<div style="width:80px;"><img class="tableActionButton" src="_BASE_images/edit.png" style="cursor:pointer;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img><img class="tableActionButton" src="_BASE_images/download.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Download Document" onclick="download(\'_attachment_\');return false;"></img><img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Delete" onclick="modJs.deleteRow(_id_);return false;"></img></div>';
                    return (l = (l = (l = l.replace(/_id_/g, e)).replace(
                      /_attachment_/g,
                      t[6]
                    )).replace(/_BASE_/g, this.baseUrl));
                  },
                },
                {
                  key: "isSubProfileTable",
                  value: function () {
                    return "Admin" !== this.user.user_level;
                  },
                },
              ]),
              t
            );
          })();
        t.exports = {
          EmployeeAdapter: v,
          TerminatedEmployeeAdapter: g,
          ArchivedEmployeeAdapter: _,
          EmployeeBankDetailsAdapter: j,
          EmployeeSkillAdapter: k,
          EmployeeEducationAdapter: S,
          EmployeeCertificationAdapter: E,
          EmployeeLanguageAdapter: w,
          EmployeeDependentAdapter: T,
          EmergencyContactAdapter: D,
          EmployeeImmigrationAdapter: F,
          EmployeeSubSkillsAdapter: d,
          EmployeeSubEducationAdapter: c,
          EmployeeSubCertificationAdapter: p,
          EmployeeSubLanguageAdapter: m,
          EmployeeSubDependentAdapter: h,
          EmployeeSubEmergencyContactAdapter: f,
          EmployeeSubDocumentAdapter: y,
          EmployeeDocumentAdapter: M,
        };
      },
      {
        "../../../api/AdapterBase": 4,
        "../../../api/SubAdapterBase": 7,
      },
    ],
    3: [
      function (e, t, l) {
        "use strict";
        Object.defineProperty(l, "__esModule", {
          value: !0,
        });
        var a = (function () {
          function e(e, t) {
            for (var l = 0; l < t.length; l++) {
              var a = t[l];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function (t, l, a) {
            return l && e(t.prototype, l), a && e(t, a), t;
          };
        })();
        var i = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e);
          }
          return (
            a(e, [
              {
                key: "getKey",
                value: function (e, t) {
                  var l = e + "|";
                  for (var a in t) l += a + "=" + t[a] + "|";
                  return l;
                },
              },
              {
                key: "invalidateTable",
                value: function (e) {
                  for (var t = void 0, l = 0; l < localStorage.length; l++)
                    (t = localStorage.key(l)).indexOf("t=" + e) > 0 &&
                      localStorage.removeItem(t);
                },
              },
              {
                key: "getData",
                value: function (e) {
                  var t = void 0;
                  if ("undefined" == typeof Storage) return null;
                  var l = localStorage.getItem(e);
                  return void 0 !== l && null != l && "" !== l
                    ? void 0 === (t = JSON.parse(l)) || null == t
                      ? null
                      : void 0 !== t.status &&
                        null != t.status &&
                        "SUCCESS" !== t.status
                      ? null
                      : t
                    : null;
                },
              },
              {
                key: "setData",
                value: function (e, t) {
                  if ("undefined" == typeof Storage) return null;
                  if (
                    void 0 !== t.status &&
                    null != t.status &&
                    "SUCCESS" !== t.status
                  )
                    return null;
                  var l = JSON.stringify(t);
                  return localStorage.setItem(e, l), l;
                },
              },
            ]),
            e
          );
        })();
        l.default = i;
      },
      {},
    ],
    4: [
      function (e, t, l) {
        "use strict";
        Object.defineProperty(l, "__esModule", {
          value: !0,
        });
        var a = (function () {
            function e(e, t) {
              for (var l = 0; l < t.length; l++) {
                var a = t[l];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, l, a) {
              return l && e(t.prototype, l), a && e(t, a), t;
            };
          })(),
          i = n(e("./ModuleBase")),
          o = n(e("../api-common/RequestCache"));

        function n(e) {
          return e && e.__esModule
            ? e
            : {
                default: e,
              };
        }
        var s = (function (e) {
          function t(e, l, a, i) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, t);
            var o = (function (e, t) {
              if (!e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return !t || ("object" != typeof t && "function" != typeof t)
                ? e
                : t;
            })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return (
              (o.moduleRelativeURL = null),
              (o.tableData = []),
              (o.sourceData = []),
              (o.filter = null),
              (o.origFilter = null),
              (o.orderBy = null),
              (o.currentElement = null),
              o.initAdapter(e, l, a, i),
              o
            );
          }
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, i.default),
            a(t, [
              {
                key: "initAdapter",
                value: function (e, t, l, a) {
                  (this.moduleRelativeURL = baseUrl),
                    (this.table = e),
                    (this.tab = null == t ? e : t),
                    (this.filter = null == l ? null : l),
                    (this.origFilter = this.filter),
                    (this.orderBy = null == a ? null : a),
                    this.trackEvent("initAdapter", t),
                    (this.requestCache = new o.default());
                },
              },
              {
                key: "setFilter",
                value: function (e) {
                  this.filter = e;
                },
              },
              {
                key: "preSetFilterExternal",
                value: function (e) {
                  this.initialFilter = e;
                },
              },
              {
                key: "setFilterExternal",
                value: function (e) {
                  var t = e;
                  null == t && (t = this.initialFilter),
                    null != t &&
                      (this.setFilter(t),
                      (this.filtersAlreadySet = !0),
                      $("#" + this.getTableName() + "_resetFilters").show(),
                      (this.currentFilterString = this.getFilterString(t)));
                },
              },
              {
                key: "getFilter",
                value: function () {
                  return this.filter;
                },
              },
              {
                key: "setOrderBy",
                value: function (e) {
                  this.orderBy = e;
                },
              },
              {
                key: "getOrderBy",
                value: function () {
                  return this.orderBy;
                },
              },
              {
                key: "add",
                value: function (e, t, l, a) {
                  var i = this;
                  null == l && (l = !0),
                    $(e).attr("a", "add"),
                    $(e).attr("t", this.table),
                    i.showLoader(),
                    this.requestCache.invalidateTable(this.table),
                    $.post(
                      this.moduleRelativeURL,
                      e,
                      function (e) {
                        "SUCCESS" === e.status
                          ? i.addSuccessCallBack(t, e.object, l, a, i)
                          : i.addFailCallBack(t, e.object);
                      },
                      "json"
                    ).always(function () {
                      i.hideLoader();
                    }),
                    this.trackEvent("add", this.tab, this.table);
                },
              },
              {
                key: "addSuccessCallBack",
                value: function (e, t, l, a, i) {
                  l && this.get(e),
                    this.initFieldMasterData(),
                    null != a && a.apply(i, [t]),
                    this.trackEvent("addSuccess", this.tab, this.table);
                },
              },
              {
                key: "addFailCallBack",
                value: function (e, t) {
                  try {
                    this.closePlainMessage();
                  } catch (e) {}
                  this.showMessage("Error saving", t),
                    this.trackEvent("addFailed", this.tab, this.table);
                },
              },
              {
                key: "deleteObj",
                value: function (e, t) {
                  var l = this;
                  l.showLoader(),
                    this.requestCache.invalidateTable(this.table),
                    $.post(
                      this.moduleRelativeURL,
                      {
                        t: this.table,
                        a: "delete",
                        id: e,
                      },
                      function (e) {
                        "SUCCESS" === e.status
                          ? l.deleteSuccessCallBack(t, e.object)
                          : l.deleteFailCallBack(t, e.object);
                      },
                      "json"
                    ).always(function () {
                      l.hideLoader();
                    }),
                    this.trackEvent("delete", this.tab, this.table);
                },
              },
              {
                key: "deleteSuccessCallBack",
                value: function (e, t) {
                  this.get(e), this.clearDeleteParams();
                },
              },
              {
                key: "deleteFailCallBack",
                value: function (e, t) {
                  this.clearDeleteParams(),
                    this.showMessage("Error Occurred while Deleting Item", t);
                },
              },
              {
                key: "get",
                value: function (e) {
                  var t = this;
                  if (this.getRemoteTable())
                    return (
                      this.createTableServer(this.getTableName()),
                      $("#" + this.getTableName() + "Form").hide(),
                      void $("#" + this.getTableName()).show()
                    );
                  var l = JSON.stringify(this.getSourceMapping()),
                    a = "";
                  null !== this.getFilter() &&
                    (a = JSON.stringify(this.getFilter()));
                  var i = "";
                  null !== this.getOrderBy() && (i = this.getOrderBy()),
                    (l = this.fixJSON(l)),
                    (a = this.fixJSON(a)),
                    t.showLoader(),
                    $.post(
                      this.moduleRelativeURL,
                      {
                        t: this.table,
                        a: "get",
                        sm: l,
                        ft: a,
                        ob: i,
                      },
                      function (l) {
                        "SUCCESS" === l.status
                          ? t.getSuccessCallBack(e, l.object)
                          : t.getFailCallBack(e, l.object);
                      },
                      "json"
                    ).always(function () {
                      t.hideLoader();
                    }),
                    t.initFieldMasterData(),
                    this.trackEvent("get", this.tab, this.table);
                },
              },
              {
                key: "getDataUrl",
                value: function (e) {
                  var t = JSON.stringify(this.getSourceMapping()),
                    l = JSON.stringify(e),
                    a = "";
                  null !== this.getFilter() &&
                    (a = JSON.stringify(this.getFilter()));
                  var i = "";
                  null !== this.getOrderBy() && (i = this.getOrderBy());
                  var o = this.moduleRelativeURL.replace(
                    "service.php",
                    "data.php"
                  );
                  return (
                    (o =
                      (o =
                        (o =
                          (o =
                            (o = o + "?t=" + this.table) +
                            "&sm=" +
                            this.fixJSON(t)) +
                          "&cl=" +
                          this.fixJSON(l)) +
                        "&ft=" +
                        this.fixJSON(a)) +
                      "&ob=" +
                      i),
                    this.isSubProfileTable() && (o += "&type=sub"),
                    this.remoteTableSkipProfileRestriction() &&
                      (o += "&skip=1"),
                    o
                  );
                },
              },
              {
                key: "isSubProfileTable",
                value: function () {
                  return !1;
                },
              },
              {
                key: "remoteTableSkipProfileRestriction",
                value: function () {
                  return !1;
                },
              },
              {
                key: "preProcessTableData",
                value: function (e) {
                  return e;
                },
              },
              {
                key: "getSuccessCallBack",
                value: function (e, t) {
                  for (
                    var l = [], a = this.getDataMapping(), i = 0;
                    i < t.length;
                    i++
                  ) {
                    for (var o = [], n = 0; n < a.length; n++)
                      o[n] = t[i][a[n]];
                    l.push(this.preProcessTableData(o));
                  }
                  (this.sourceData = t),
                    void 0 !== e.callBack &&
                      null !== e.callBack &&
                      ((void 0 !== e.callBackData && null !== e.callBackData) ||
                        (e.callBackData = []),
                      e.callBackData.push(t),
                      e.callBackData.push(l),
                      this.callFunction(e.callBack, e.callBackData)),
                    (this.tableData = l),
                    (void 0 !== e.noRender &&
                      null !== e.noRender &&
                      !0 === e.noRender) ||
                      (this.createTable(this.getTableName()),
                      $("#" + this.getTableName() + "Form").hide(),
                      $("#" + this.getTableName()).show());
                },
              },
              {
                key: "getFailCallBack",
                value: function (e, t) {},
              },
              {
                key: "getElement",
                value: function (e, t, l) {
                  var a = this,
                    i = JSON.stringify(this.getSourceMapping());
                  (i = this.fixJSON(i)),
                    a.showLoader(),
                    $.post(
                      this.moduleRelativeURL,
                      {
                        t: this.table,
                        a: "getElement",
                        id: e,
                        sm: i,
                      },
                      function (e) {
                        "SUCCESS" === e.status
                          ? (l && delete e.object.id,
                            (this.currentElement = e.object),
                            a.getElementSuccessCallBack.apply(a, [t, e.object]))
                          : a.getElementFailCallBack.apply(a, [t, e.object]);
                      },
                      "json"
                    ).always(function () {
                      a.hideLoader();
                    }),
                    this.trackEvent("getElement", this.tab, this.table);
                },
              },
              {
                key: "getElementSuccessCallBack",
                value: function (e, t) {
                  void 0 !== e.callBack &&
                    null !== e.callBack &&
                    ((void 0 !== e.callBackData && null !== e.callBackData) ||
                      (e.callBackData = []),
                    e.callBackData.push(t),
                    this.callFunction(e.callBack, e.callBackData, this)),
                    (this.currentElement = t),
                    (void 0 !== e.noRender &&
                      null !== e.noRender &&
                      !0 === e.noRender) ||
                      this.renderForm(t);
                },
              },
              {
                key: "getElementFailCallBack",
                value: function (e, t) {},
              },
              {
                key: "getTableData",
                value: function () {
                  return this.tableData;
                },
              },
              {
                key: "getTableName",
                value: function () {
                  return this.tab;
                },
              },
              {
                key: "getFieldValues",
                value: function (e, t) {
                  var l = this,
                    a = "",
                    i = "";
                  void 0 !== e[3] && null !== e[3] && (a = e[3]),
                    void 0 !== e[4] &&
                      null !== e[4] &&
                      (i = JSON.stringify(e[4]));
                  var o = this.requestCache.getKey(this.moduleRelativeURL, {
                      t: e[0],
                      key: e[1],
                      value: e[2],
                      method: a,
                      methodParams: i,
                      a: "getFieldValues",
                    }),
                    n = this.requestCache.getData(o);
                  null != n &&
                    "SUCCESS" === n.status &&
                    (t.callBackData.push(n.data),
                    null !== t.callBackSuccess &&
                      void 0 !== t.callBackSuccess &&
                      t.callBackData.push(t.callBackSuccess),
                    l.callFunction(t.callBack, t.callBackData));
                  var s = function e(a) {
                    if ("SUCCESS" === a.status) {
                      l.requestCache.setData(this.success.key, a);
                      var i = t;
                      (i.callBackData = [t.callBackData[0]]),
                        i.callBackData.push(a.data),
                        null !== i.callBackSuccess &&
                          void 0 !== i.callBackSuccess &&
                          i.callBackData.push(t.callBackSuccess),
                        l.callFunction(i.callBack, i.callBackData);
                    } else
                      "Access violation" === a.message &&
                        alert("Error : " + e.table + " " + a.message);
                  };
                  (s.key = o),
                    (s.table = e[0]),
                    $.post(
                      this.moduleRelativeURL,
                      {
                        t: e[0],
                        key: e[1],
                        value: e[2],
                        method: a,
                        methodParams: i,
                        a: "getFieldValues",
                      },
                      s,
                      "json"
                    );
                },
              },
              {
                key: "setAdminProfile",
                value: function (e) {
                  try {
                    localStorage.clear();
                  } catch (e) {}
                  $.post(
                    this.moduleRelativeURL,
                    {
                      a: "setAdminEmp",
                      empid: e,
                    },
                    function () {
                      top.location.href = clientUrl;
                    },
                    "json"
                  );
                },
              },
              {
                key: "customAction",
                value: function (e, t, l, a, i) {
                  var o = this;
                  (l = this.fixJSON(l)),
                    i
                      ? $.post(
                          this.moduleRelativeURL,
                          {
                            t: this.table,
                            a: "ca",
                            sa: e,
                            mod: t,
                            req: l,
                          },
                          function (e) {
                            "SUCCESS" === e.status
                              ? (a.callBackData.push(e.data),
                                o.callFunction(
                                  a.callBackSuccess,
                                  a.callBackData
                                ))
                              : (a.callBackData.push(e.data),
                                o.callFunction(a.callBackFail, a.callBackData));
                          },
                          "json"
                        )
                      : $.getJSON(
                          this.moduleRelativeURL,
                          {
                            t: this.table,
                            a: "ca",
                            sa: e,
                            mod: t,
                            req: l,
                          },
                          function (e) {
                            "SUCCESS" === e.status
                              ? (a.callBackData.push(e.data),
                                o.callFunction(
                                  a.callBackSuccess,
                                  a.callBackData
                                ))
                              : (a.callBackData.push(e.data),
                                o.callFunction(a.callBackFail, a.callBackData));
                          }
                        );
                },
              },
              {
                key: "sendCustomRequest",
                value: function (e, t, l, a) {
                  (t.a = e),
                    $.post(
                      this.moduleRelativeURL,
                      t,
                      function (e) {
                        "SUCCESS" === e.status ? l(e.data) : a(e.data);
                      },
                      "json"
                    );
                },
              },
              {
                key: "getCustomActionUrl",
                value: function (e, t) {
                  t.a = e;
                  var l = "";
                  for (var a in t)
                    t.hasOwnProperty(a) &&
                      ("" !== l && (l += "&"), (l += a + "=" + t[a]));
                  return this.moduleRelativeURL + "?" + l;
                },
              },
              {
                key: "getClientDataUrl",
                value: function () {
                  return (
                    this.moduleRelativeURL.replace("service.php", "") + "data/"
                  );
                },
              },
              {
                key: "getCustomUrl",
                value: function (e) {
                  return this.moduleRelativeURL.replace("service.php", e);
                },
              },
            ]),
            t
          );
        })();
        l.default = s;
      },
      {
        "../api-common/RequestCache": 3,
        "./ModuleBase": 6,
      },
    ],
    5: [
      function (e, t, l) {
        "use strict";
        Object.defineProperty(l, "__esModule", {
          value: !0,
        });
        var a = (function () {
          function e(e, t) {
            for (var l = 0; l < t.length; l++) {
              var a = t[l];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function (t, l, a) {
            return l && e(t.prototype, l), a && e(t, a), t;
          };
        })();
        var i = {
            float: function (e) {
              return !(null == e || !e.match(/^[-+]?[0-9]+(\.[0-9]+)?$/));
            },
            number: function (e) {
              return !(null == e || !e.match(/^[0-9]+$/));
            },
            numberOrEmpty: function (e) {
              if ("" === e) return !0;
              return !(null == e || !e.match(/^[0-9]+$/));
            },
            email: function (e) {
              return (
                null != e &&
                /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/.test(
                  e
                )
              );
            },
            emailOrEmpty: function (e) {
              if ("" === e) return !0;
              return (
                null != e &&
                /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/.test(
                  e
                )
              );
            },
            username: function (e) {
              return null != e && /^[a-zA-Z0-9.-]+$/.test(e);
            },
            input: function (e) {
              return null != e && e.length > 0;
            },
          },
          o = (function () {
            function e(t, l, a) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.tempOptions = {}),
                (this.formId = t),
                (this.formError = !1),
                (this.formObject = null),
                (this.errorMessages = ""),
                (this.popupDialog = null),
                (this.validateAll = l),
                (this.errorMap = []),
                (this.settings = {
                  thirdPartyPopup: null,
                  LabelErrorClass: !1,
                  ShowPopup: !0,
                }),
                (this.settings = jQuery.extend(this.settings, a)),
                (this.inputTypes = [
                  "text",
                  "radio",
                  "checkbox",
                  "file",
                  "password",
                  "select-one",
                  "select-multi",
                  "textarea",
                  "fileupload",
                  "signature",
                ]),
                (this.validator = i);
            }
            return (
              a(
                e,
                [
                  {
                    key: "clearError",
                    value: function (e, t) {
                      var l = e.attr("id");
                      $("#" + this.formId + " #field_" + l).removeClass(
                        "error"
                      ),
                        $("#" + this.formId + " #help_" + l).html("");
                    },
                  },
                  {
                    key: "addError",
                    value: function (e, t) {
                      (this.formError = !0),
                        null != e.attr("message")
                          ? ((this.errorMessages += e.attr("message") + "\n"),
                            (this.errorMap[e.attr("name")] = e.attr("message")))
                          : (this.errorMap[e.attr("name")] = "");
                      var l = e.attr("id"),
                        a = e.attr("validation"),
                        i = e.attr("validation");
                      $("#" + this.formId + " #field_" + l).addClass("error"),
                        void 0 === i || null == i || "" === i
                          ? $("#" + this.formId + " #help_err_" + l).html(i)
                          : void 0 === a || null == a || "" === a
                          ? $("#" + this.formId + " #help_err_" + l).html(
                              "Required"
                            )
                          : "float" === a || "number" === a
                          ? $("#" + this.formId + " #help_err_" + l).html(
                              "Number required"
                            )
                          : "email" === a
                          ? $("#" + this.formId + " #help_err_" + l).html(
                              "Email required"
                            )
                          : $("#" + this.formId + " #help_err_" + l).html(
                              "Required"
                            );
                    },
                  },
                  {
                    key: "showErrors",
                    value: function () {
                      this.formError &&
                        (void 0 !== this.settings.thirdPartyPopup &&
                        null != this.settings.thirdPartyPopup
                          ? this.settings.thirdPartyPopup.alert()
                          : !0 === this.settings.ShowPopup &&
                            (void 0 !== this.tempOptions.popupTop &&
                            null != this.tempOptions.popupTop
                              ? this.alert(
                                  "Errors Found",
                                  this.errorMessages,
                                  this.tempOptions.popupTop
                                )
                              : this.alert(
                                  "Errors Found",
                                  this.errorMessages,
                                  -1
                                )));
                    },
                  },
                  {
                    key: "checkValues",
                    value: function (e) {
                      this.tempOptions = e;
                      var t = this;
                      (this.formError = !1),
                        (this.errorMessages = ""),
                        (this.formObject = {});
                      var l = function (e) {
                          var l = null,
                            a = e.attr("name");
                          !1 !== t.settings.LabelErrorClass &&
                            $("label[for='" + a + "']").removeClass(
                              t.settings.LabelErrorClass
                            );
                          var i = e.attr("id"),
                            o = e.attr("type");
                          if (
                            e.hasClass("select2-focusser") ||
                            e.hasClass("select2-input")
                          )
                            return !0;
                          if (jQuery.inArray(o, t.inputTypes) >= 0) {
                            if (e.hasClass("uploadInput")) l = e.attr("val");
                            else if ("radio" === o || "checkbox" === o)
                              l = $("input[name='" + a + "']:checked").val();
                            else if (e.hasClass("select2Field"))
                              l =
                                null !=
                                  $("#" + t.formId + " #" + i).select2(
                                    "data"
                                  ) &&
                                void 0 !==
                                  $("#" + t.formId + " #" + i).select2("data")
                                  ? $("#" + t.formId + " #" + i).select2("data")
                                      .id
                                  : "";
                            else if (e.hasClass("select2Multi"))
                              if (
                                null !=
                                  $("#" + t.formId + " #" + i).select2(
                                    "data"
                                  ) &&
                                void 0 !==
                                  $("#" + t.formId + " #" + i).select2("data")
                              ) {
                                var n = $("#" + t.formId + " #" + i).select2(
                                  "data"
                                );
                                l = [];
                                for (var s = 0; s < n.length; s++)
                                  l.push(n[s].id);
                                l = JSON.stringify(l);
                              } else l = "";
                            else
                              l = e.hasClass("signatureField")
                                ? $("#" + t.formId + " #" + i)
                                    .data("signaturePad")
                                    .isEmpty()
                                  ? ""
                                  : $("#" + i)
                                      .data("signaturePad")
                                      .toDataURL()
                                : e.hasClass("simplemde")
                                ? $("#" + t.formId + " #" + i)
                                    .data("simplemde")
                                    .value()
                                : e.hasClass("tinymce")
                                ? tinyMCE.get(i).getContent({
                                    format: "raw",
                                  })
                                : e.val();
                            var r = e.attr("validation"),
                              u = !1;
                            void 0 !== r &&
                            null != r &&
                            void 0 !== t.validator[r] &&
                            null != t.validator[r]
                              ? (u = t.validator[r](l))
                              : ((u =
                                  !t.validateAll ||
                                  (void 0 !== r && null != r && "none" === r) ||
                                  t.validator.input(l)),
                                (t.formObject[i] = l)),
                              u
                                ? (t.clearError(e, null), (t.formObject[i] = l))
                                : t.addError(e, null);
                          }
                        },
                        a = $("#" + this.formId + " :input");
                      return (
                        a.each(function () {
                          l($(this));
                        }),
                        (a = $("#" + this.formId + " .uploadInput")).each(
                          function () {
                            l($(this));
                          }
                        ),
                        this.showErrors(),
                        (this.tempOptions = {}),
                        !this.formError
                      );
                    },
                  },
                  {
                    key: "getFormParameters",
                    value: function () {
                      return this.formObject;
                    },
                  },
                  {
                    key: "alert",
                    value: (function (e) {
                      function t(t, l) {
                        return e.apply(this, arguments);
                      }
                      return (
                        (t.toString = function () {
                          return e.toString();
                        }),
                        t
                      );
                    })(function (e, t) {
                      alert(t);
                    }),
                  },
                ],
                [
                  {
                    key: "getValidationRules",
                    value: function () {
                      return i;
                    },
                  },
                ]
              ),
              e
            );
          })();
        l.default = o;
      },
      {},
    ],
    6: [
      function (e, t, l) {
        "use strict";
        Object.defineProperty(l, "__esModule", {
          value: !0,
        });
        var a,
          i = (function () {
            function e(e, t) {
              for (var l = 0; l < t.length; l++) {
                var a = t[l];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, l, a) {
              return l && e(t.prototype, l), a && e(t, a), t;
            };
          })(),
          o = e("./FormValidation"),
          n =
            (a = o) && a.__esModule
              ? a
              : {
                  default: a,
                };
        var s = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.deleteParams = {}),
              (this.createRemoteTable = !1),
              (this.instanceId = "None"),
              (this.ga = []),
              (this.showEdit = !0),
              (this.showDelete = !0),
              (this.showSave = !0),
              (this.showCancel = !0),
              (this.showFormOnPopup = !1),
              (this.filtersAlreadySet = !1),
              (this.currentFilterString = ""),
              (this.sorting = 0),
              (this.settings = {}),
              (this.translations = {}),
              (this.customFields = []),
              (this.csrfRequired = !1),
              (this.fieldTemplates = null),
              (this.templates = null),
              (this.customTemplates = null),
              (this.emailTemplates = null),
              (this.fieldMasterData = null),
              (this.fieldMasterDataKeys = null),
              (this.fieldMasterDataCallback = null),
              (this.sourceMapping = null),
              (this.currentId = null),
              (this.currentElement = null),
              (this.user = null),
              (this.currentProfile = null),
              (this.permissions = {}),
              (this.baseUrl = null);
          }
          return (
            i(e, [
              {
                key: "init",
                value: function (e, t, l, a) {},
              },
              {
                key: "setNoJSONRequests",
                value: function (e) {
                  this.noJSONRequests = e;
                },
              },
              {
                key: "setPermissions",
                value: function (e) {
                  this.permissions = e;
                },
              },
              {
                key: "sortingStarted",
                value: function (e) {
                  this.sorting = e;
                },
              },
              {
                key: "checkPermission",
                value: function (e) {
                  return void 0 === this.permissions[e] ||
                    null == this.permissions[e] ||
                    "Yes" === this.permissions[e]
                    ? "Yes"
                    : this.permissions[e];
                },
              },
              {
                key: "setBaseUrl",
                value: function (e) {
                  this.baseUrl = e;
                },
              },
              {
                key: "setUser",
                value: function (e) {
                  this.user = e;
                },
              },
              {
                key: "getUser",
                value: function () {
                  return this.user;
                },
              },
              {
                key: "setInstanceId",
                value: function (e) {
                  this.instanceId = e;
                },
              },
              {
                key: "setCSRFRequired",
                value: function (e) {
                  this.csrfRequired = e;
                },
              },
              {
                key: "scrollToTop",
                value: function () {
                  $("html, body").animate(
                    {
                      scrollTop: 0,
                    },
                    "fast"
                  );
                },
              },
              {
                key: "scrollToBottom",
                value: function () {
                  $("html, body").animate(
                    {
                      scrollTop: $(document).height(),
                    },
                    "slow"
                  );
                },
              },
              {
                key: "scrollToElement",
                value: function (e) {
                  $(window).height() <= e.offset().top &&
                    $("html, body").animate(
                      {
                        scrollTop: e.offset().top,
                      },
                      "slow"
                    );
                },
              },
              {
                key: "scrollToElementBottom",
                value: function (e) {
                  $(window).height() <= e.offset().top + e.height() &&
                    $("html, body").animate(
                      {
                        scrollTop: e.offset().top + e.height(),
                      },
                      "slow"
                    );
                },
              },
              {
                key: "setTranslations",
                value: function (e) {
                  this.translations = e.messages[""];
                },
              },
              {
                key: "setTranslationsSubModules",
                value: function (e) {
                  this.translations = e;
                },
              },
              {
                key: "gt",
                value: function (e) {
                  return void 0 === this.translations[e] ||
                    null === this.translations[e]
                    ? e
                    : this.translations[e][0];
                },
              },
              {
                key: "addToLangTerms",
                value: function (e) {
                  var t = void 0,
                    l = localStorage.getItem("terms");
                  if (void 0 === l) t = {};
                  else
                    try {
                      t = JSON.parse(l);
                    } catch (e) {
                      t = {};
                    }
                  void 0 === this.translations[e] &&
                    ((t[e] = e),
                    localStorage.setItem("terms", JSON.stringify(t)));
                },
              },
              {
                key: "showActionButtons",
                value: function () {
                  return !0;
                },
              },
              {
                key: "trackEvent",
                value: function (e, t, l) {
                  try {
                    void 0 === t || null == t
                      ? this.ga.push(["_trackEvent", this.instanceId, e])
                      : void 0 === l || null == l
                      ? this.ga.push(["_trackEvent", this.instanceId, e, t])
                      : this.ga.push(["_trackEvent", this.instanceId, e, t, l]);
                  } catch (e) {}
                },
              },
              {
                key: "setCurrentProfile",
                value: function (e) {
                  this.currentProfile = e;
                },
              },
              {
                key: "getCurrentProfile",
                value: function () {
                  return this.currentProfile;
                },
              },
              {
                key: "initFieldMasterData",
                value: function (e, t, l) {
                  var a = void 0;
                  (void 0 !== this.showAddNew && null != this.showAddNew) ||
                    (this.showAddNew = !0),
                    (this.fieldMasterData = {}),
                    (this.fieldMasterDataKeys = {}),
                    (this.fieldMasterDataCallback = t),
                    (this.fieldMasterDataCallbackData = l),
                    (this.sourceMapping = {});
                  var i = this.getFormFields(),
                    o = this.getFilters();
                  if (null != o)
                    for (var n = 0; n < o.length; n++)
                      (null == (a = this.getMetaFieldValues(o[n][0], i)) ||
                        ("select" !== a.type &&
                          "select2" !== a.type &&
                          "select2multi" !== a.type)) &&
                        i.push(o[n]);
                  for (
                    var s = [], r = [], u = null, d = null, c = 0;
                    c < i.length;
                    c++
                  )
                    if (
                      void 0 !== (u = i[c])[1]["remote-source"] &&
                      null !== u[1]["remote-source"]
                    ) {
                      var p =
                        u[1]["remote-source"][0] +
                        "_" +
                        u[1]["remote-source"][1] +
                        "_" +
                        u[1]["remote-source"][2];
                      s.push(u), r.push(p);
                    } else if (void 0 !== u[1].form && null !== u[1].form)
                      for (var m = 0; m < u[1].form.length; m++)
                        if (
                          void 0 !== (d = u[1].form[m])[1]["remote-source"] &&
                          null !== d[1]["remote-source"]
                        ) {
                          var h =
                            d[1]["remote-source"][0] +
                            "_" +
                            d[1]["remote-source"][1] +
                            "_" +
                            d[1]["remote-source"][2];
                          r.indexOf(h) < 0 && (s.push(d), r.push(h));
                        }
                  for (var f = 0; f < s.length; f++) {
                    var y = s[f];
                    if (
                      void 0 !== y[1]["remote-source"] &&
                      null != y[1]["remote-source"]
                    ) {
                      var b =
                        y[1]["remote-source"][0] +
                        "_" +
                        y[1]["remote-source"][1] +
                        "_" +
                        y[1]["remote-source"][2];
                      (this.fieldMasterDataKeys[b] = !1),
                        (this.sourceMapping[y[0]] = y[1]["remote-source"]);
                      var v = {
                        callBack: "initFieldMasterDataResponse",
                      };
                      (v.callBackData = [b]),
                        null != e && (v.callBackSuccess = e),
                        this.getFieldValues(y[1]["remote-source"], v);
                    }
                  }
                },
              },
              {
                key: "setShowFormOnPopup",
                value: function (e) {
                  this.showFormOnPopup = e;
                },
              },
              {
                key: "setRemoteTable",
                value: function (e) {
                  this.createRemoteTable = e;
                },
              },
              {
                key: "setSettings",
                value: function (e) {
                  this.settings = e;
                },
              },
              {
                key: "getRemoteTable",
                value: function () {
                  return this.createRemoteTable;
                },
              },
              {
                key: "isAllLoaded",
                value: function (e) {
                  for (var t in e) if (!1 === e[t]) return !1;
                  return !0;
                },
              },
              {
                key: "initFieldMasterDataResponse",
                value: function (e, t, l, a) {
                  (this.fieldMasterData[e] = t),
                    (this.fieldMasterDataKeys[e] = !0),
                    null != l && l(),
                    null !== this.fieldMasterDataCallback &&
                    void 0 !== this.fieldMasterDataCallback &&
                    this.isAllLoaded(this.fieldMasterDataKeys) &&
                    null !== this.fieldMasterDataCallbackData &&
                    void 0 !== this.fieldMasterDataCallbackData
                      ? this.fieldMasterDataCallback(
                          this.fieldMasterDataCallbackData
                        )
                      : null !== this.fieldMasterDataCallback &&
                        void 0 !== this.fieldMasterDataCallback &&
                        this.isAllLoaded(this.fieldMasterDataKeys) &&
                        this.fieldMasterDataCallback();
                },
              },
              {
                key: "getMetaFieldValues",
                value: function (e, t) {
                  for (var l = 0; l < t.length; l++)
                    if (e === t[l][0]) return t[l][1];
                  return null;
                },
              },
              {
                key: "getThemeColors",
                value: function () {
                  return [
                    "red",
                    "yellow",
                    "aqua",
                    "blue",
                    "light-blue",
                    "green",
                    "navy",
                    "teal",
                    "olive",
                    "orange",
                    "fuchsia",
                    "purple",
                  ];
                },
              },
              {
                key: "getColorByRandomString",
                value: function (e) {
                  var t = this.getThemeColors();
                  return t[e.charCodeAt(0) % t.length];
                },
              },
              {
                key: "getColorByFileType",
                value: function (e) {
                  e = e.toLowerCase();
                  var t = {
                    pdf: "red",
                    csv: "yellow",
                    xls: "green",
                    xlsx: "green",
                    doc: "light-blue",
                    docx: "light-blue",
                  };
                  return (
                    (t.docx = "blue"),
                    (t.ppt = "orange"),
                    (t.pptx = "orange"),
                    (t.jpg = "teal"),
                    (t.jpeg = "teal"),
                    (t.gif = "green"),
                    (t.png = "yellow"),
                    (t.bmp = "fuchsia"),
                    void 0 !== t[e] || null != t[e]
                      ? t[e]
                      : this.getColorByRandomString(e)
                  );
                },
              },
              {
                key: "getIconByFileType",
                value: function (e) {
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
                    rtf: "fa fa-file-text-o",
                  };
                  return void 0 !== t[(e = e.toLowerCase())] || null != t[e]
                    ? t[e]
                    : "fa fa-file-o";
                },
              },
              {
                key: "getSourceMapping",
                value: function () {
                  return this.sourceMapping;
                },
              },
              {
                key: "setTesting",
                value: function (e) {
                  this.testing = e;
                },
              },
              {
                key: "consoleLog",
                value: function (e) {
                  this.testing && console.log(e);
                },
              },
              {
                key: "setClientMessages",
                value: function (e) {
                  this.msgList = e;
                },
              },
              {
                key: "setTemplates",
                value: function (e) {
                  this.templates = e;
                },
              },
              {
                key: "getWSProperty",
                value: function (e, t) {
                  return e.hasOwnProperty(t) ? e[t] : null;
                },
              },
              {
                key: "getClientMessage",
                value: function (e) {

                  
                  return this.getWSProperty(this.msgList, e);
                },
              },
              {
                key: "getTemplate",
                value: function (e) {
                  return this.getWSProperty(this.templates, e);
                },
              },
              {
                key: "setGoogleAnalytics",
                value: function (e) {
                  this.gaq = e;
                },
              },
              {
                key: "showView",
                value: function (e) {
                  null != this.currentView &&
                    ((this.previousView = this.currentView),
                    $("#" + this.currentView).hide()),
                    $("#" + e).show(),
                    (this.currentView = e),
                    this.moveToTop();
                },
              },
              {
                key: "showPreviousView",
                value: function () {
                  this.showView(this.previousView);
                },
              },
              {
                key: "moveToTop",
                value: function () {},
              },
              {
                key: "callFunction",
                value: function (e, t, l) {
                  if ($.isFunction(e))
                    try {
                      null == l ? e.apply(document, t) : e.apply(l, t);
                    } catch (e) {
                      console.log(e.message);
                    }
                  else {
                    var a = this[e];
                    if ($.isFunction(a))
                      try {
                        a.apply(this, t);
                      } catch (e) {
                        console.log(e.message);
                      }
                  }
                },
              },
              {
                key: "getTableTopButtonHtml",
                value: function () {
                  var e = "";
                  return (
                    this.getShowAddNew() &&
                      (e =
                        '<button onclick="modJs.renderForm();return false;" class="btn btn-small btn-primary">' +
                        this.gt(this.getAddNewLabel()) +
                        ' <i class="fa fa-plus"></i></button>'),
                    null != this.getFilters() &&
                      ("" !== e && (e += "&nbsp;&nbsp;"),
                      (e +=
                        '<button onclick="modJs.showFilters();return false;" class="btn btn-small btn-primary">' +
                        this.gt("Filter") +
                        ' <i class="fa fa-filter"></i></button>'),
                      (e += "&nbsp;&nbsp;"),
                      this.filtersAlreadySet
                        ? (e +=
                            '<button id="__id___resetFilters" onclick="modJs.resetFilters();return false;" class="btn btn-small btn-default">__filterString__ <i class="fa fa-times"></i></button>')
                        : (e +=
                            '<button id="__id___resetFilters" onclick="modJs.resetFilters();return false;" class="btn btn-small btn-default" style="display:none;">__filterString__ <i class="fa fa-times"></i></button>')),
                    (e +=
                      '<button onclick="modJs.downloadEmployees();return false;" class="btn btn-small btn-primary">' +
                      this.gt("Download(Excel)") +
                      ' <i class="fa fa-download"></i></button>'),
                    (e += "&nbsp;&nbsp;"),
                    // (e +=
                    //   '<button onclick="modJs.downloadEmployees();return false;" class="btn btn-small btn-primary">' +
                    //   this.gt("Download(pdf)") +
                    //   ' <i class="fa fa-download"></i></button>'),
                    (e = e.replace(/__id__/g, this.getTableName())), 
                    "" !==
                      (e =
                        "" !== this.currentFilterString &&
                        null != this.currentFilterString
                          ? e.replace(
                              /__filterString__/g,
                              this.currentFilterString
                            )
                          : e.replace(/__filterString__/g, "Reset Filters")) &&
                      (e =
                        '<div class="row"><div class="col-xs-12">' +
                        e +
                        "</div></div>"),
                    e
                  );
                },
              },
              {
                key: "getActionButtonHeader",
                value: function () {
                  return {
                    sTitle: "",
                    sClass: "center",
                  };
                },
              },
              {
                key: "getTableHTMLTemplate",
                value: function () {
                  return '<div class="box-body table-responsive"><table cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-striped" id="grid"></table></div>';
                },
              },
              {
                key: "isSortable",
                value: function () {
                  return !0;
                },
              },
              {
                key: "createTable",
                value: function (e) {
                  if (this.getRemoteTable()) this.createTableServer(e);
                  else {
                    var t = this.getHeaders();
                    for (var l in t) t[l].sTitle = this.gt(t[l].sTitle);
                    var a = this.getTableData();
                    if (
                      (this.showActionButtons() &&
                        t.push(this.getActionButtonHeader()),
                      this.showActionButtons())
                    )
                      for (var i = 0; i < a.length; i++)
                        a[i].push(this.getActionButtonsHtml(a[i][0], a[i]));
                    var o;
                    o =
                      this.getTableTopButtonHtml() +
                      this.getTableHTMLTemplate();
                    var n = $(
                        "#" + e + " .dataTables_paginate .active a"
                      ).html(),
                      s = 0;
                    void 0 !== n &&
                      null != n &&
                      (s = 15 * parseInt(n, 10) - 15),
                      $("#" + e).html(o);
                    var r = {
                        oLanguage: {
                          sLengthMenu: "_MENU_ records per page",
                        },
                        aaData: a,
                        aoColumns: t,
                        bSort: this.isSortable(),
                        iDisplayLength: 15,
                        iDisplayStart: s,
                      },
                      u = this.getCustomTableParams();
                    $.extend(r, u),
                      $("#" + e + " #grid").dataTable(r),
                      $(".dataTables_paginate ul").addClass("pagination"),
                      $(".dataTables_length").hide(),
                      $(".dataTables_filter input").addClass("form-control"),
                      $(".dataTables_filter input").attr(
                        "placeholder",
                        "Search"
                      ),
                      $(".dataTables_filter label")
                        .contents()
                        .filter(function () {
                          return 3 === this.nodeType;
                        })
                        .remove(),
                      $(".tableActionButton").tooltip();
                  }
                },
              },
              {
                key: "createTableServer",
                value: function (e) {
                  var t = this.getHeaders();
                  for (var l in (t.push({
                    sTitle: "",
                    sClass: "center",
                  }),
                  t))
                    t[l].sTitle = this.gt(t[l].sTitle);
                  var a;
                  a =
                    this.getTableTopButtonHtml() + this.getTableHTMLTemplate();
                  var i = $("#" + e + " .dataTables_paginate .active a").html(),
                    o = 0;
                  void 0 !== i && null != i && (o = 15 * parseInt(i, 10) - 15),
                    $("#" + e).html(a);
                  var n = {
                    oLanguage: {
                      sLengthMenu: "_MENU_ records per page",
                    },
                    bProcessing: !0,
                    bServerSide: !0,
                    sAjaxSource: this.getDataUrl(this.getDataMapping()),
                    aoColumns: t,
                    bSort: this.isSortable(),
                    parent: this,
                    iDisplayLength: 15,
                    iDisplayStart: o,
                  };
                  this.showActionButtons() &&
                    (n.aoColumnDefs = [
                      {
                        fnRender: this.getActionButtons,
                        aTargets: [this.getDataMapping().length],
                      },
                    ]);
                  var s = this.getCustomTableParams();
                  $.extend(n, s),
                    $("#" + e + " #grid").dataTable(n),
                    $(".dataTables_paginate ul").addClass("pagination"),
                    $(".dataTables_length").hide(),
                    $(".dataTables_filter input").addClass("form-control"),
                    $(".dataTables_filter input").attr("placeholder", "Search"),
                    $(".dataTables_filter label")
                      .contents()
                      .filter(function () {
                        return 3 === this.nodeType;
                      })
                      .remove(),
                    $(".tableActionButton").tooltip();
                },
              },
              {
                key: "getHeaders",
                value: function () {},
              },
              {
                key: "getDataMapping",
                value: function () {},
              },
              {
                key: "getFormFields",
                value: function () {},
              },
              {
                key: "getTableData",
                value: function () {},
              },
              {
                key: "getFilters",
                value: function () {
                  return null;
                },
              },
              {
                key: "edit",
                value: function (e) {
                  (this.currentId = e), this.getElement(e, []);
                },
              },
              {
                key: "copyRow",
                value: function (e) {
                  this.getElement(e, [], !0);
                },
              },
              {
                key: "renderModel",
                value: function (e, t, l) {
                  $("#" + e + "ModelBody").html(""),
                    (void 0 !== l && null != l) || (l = ""),
                    $("#" + e + "ModelLabel").html(t),
                    $("#" + e + "ModelBody").html(l);
                },
              },
              {
                key: "renderYesNoModel",
                value: function (e, t, l, a, i, o) {
                  var n = this,
                    s = "#yesnoModel";
                  (void 0 !== t && null != t) || (t = ""),
                    $(s + "Label").html(e),
                    $(s + "Body").html(t),
                    null != l && $(s + "YesBtn").html(l),
                    null != a && $(s + "NoBtn").html(a),
                    $(s + "YesBtn")
                      .off()
                      .on("click", function () {
                        void 0 !== i &&
                          null != i &&
                          (i.apply(n, o), n.cancelYesno());
                      }),
                    $(s).modal({
                      backdrop: "static",
                    });
                },
              },
              {
                key: "renderModelFromDom",
                value: function (e, t, l) {
                  $("#" + e + "ModelBody").html(""),
                    (void 0 !== l && null != l) || (l = $("<div></div>")),
                    $("#" + e + "ModelLabel").html(t),
                    $("#" + e + "ModelBody").html(""),
                    $("#" + e + "ModelBody").append(l);
                },
              },
              {
                key: "deleteRow",
                value: function (e) {
                  (this.deleteParams.id = e),
                    this.renderModel(
                      "delete",
                      "Confirm Deletion",
                      "Are you sure you want to delete this item ?"
                    ),
                    $("#deleteModel").modal("show");
                },
              },
              {
                key: "showMessage",
                value: function (e, t) {
                  var l =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : null,
                    a =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : null,
                    i =
                      arguments.length > 4 &&
                      void 0 !== arguments[4] &&
                      arguments[4],
                    o = this,
                    n = "";
                  (n = i ? "#plainMessageModel" : "#messageModel"),
                    $(n).off(),
                    i
                      ? this.renderModel("plainMessage", e, t)
                      : this.renderModel("message", e, t),
                    null != l
                      ? ($(n).modal({
                          show: !0,
                        }),
                        $(n).on("hidden.bs.modal", function () {
                          l.apply(o, a), $(".modal-backdrop").remove();
                        }))
                      : $(n).modal({
                          backdrop: "static",
                        });
                },
              },
              {
                key: "showDomElement",
                value: function (e, t, l, a, i) {
                  var o = this,
                    n = "";
                  (n = i ? "#dataMessageModel" : "#messageModel"),
                    $(n).unbind("hide"),
                    i
                      ? this.renderModelFromDom("dataMessage", e, t)
                      : this.renderModelFromDom("message", e, t),
                    null != l
                      ? ($(n).modal({
                          show: !0,
                        }),
                        $(n).on("hidden.bs.modal", function () {
                          l.apply(o, a), $(".modal-backdrop").remove();
                        }))
                      : $(n).modal({
                          backdrop: "static",
                        });
                },
              },
              {
                key: "confirmDelete",
                value: function () {
                  (void 0 === this.deleteParams.id &&
                    null == this.deleteParams.id) ||
                    this.deleteObj(this.deleteParams.id, []),
                    $("#deleteModel").modal("hide");
                },
              },
              {
                key: "cancelDelete",
                value: function () {
                  $("#deleteModel").modal("hide"),
                    (this.deleteParams.id = null);
                },
              },
              {
                key: "closeMessage",
                value: function () {
                  $("#messageModel").modal("hide");
                },
              },
              {
                key: "cancelYesno",
                value: function () {
                  $("#yesnoModel").modal("hide");
                },
              },
              {
                key: "closePlainMessage",
                value: function () {
                  $("#plainMessageModel").modal("hide"),
                    $("#dataMessageModel").modal("hide");
                },
              },
              {
                key: "closeDataMessage",
                value: function () {
                  $("#dataMessageModel").modal("hide");
                },
              },
              {
                key: "save",
                value: function (e, t) {
                  var l = new n.default(this.getTableName() + "_submit", !0, {
                    ShowPopup: !1,
                    LabelErrorClass: "error",
                  });
                  if (l.checkValues()) {
                    var a = l.getFormParameters();
                    a = this.forceInjectValuesBeforeSave(a);
                    var i = this.doCustomValidation(a);
                    if (null == i) {
                      this.csrfRequired &&
                        (a.csrf = $("#" + this.getTableName() + "Form").data(
                          "csrf"
                        ));
                      var o = $(
                        "#" + this.getTableName() + "_submit #id"
                      ).val();
                      null != o && void 0 !== o && "" !== o && (a.id = o),
                        (a = this.makeEmptyDateFieldsNull(a)),
                        this.add(a, [], e, t);
                    } else
                      $("#" + this.getTableName() + "Form .label").html(i),
                        $("#" + this.getTableName() + "Form .label").show(),
                        this.scrollToTop();
                  }
                },
              },
              {
                key: "makeEmptyDateFieldsNull",
                value: function (e) {
                  return (
                    this.getFormFields().forEach(function (t) {
                      ("date" !== t[1].type && "datetime" !== t[1].type) ||
                        ("" !== e[t[0]] &&
                          "0000-00-00" !== e[t[0]] &&
                          "0000-00-00 00:00:00" !== e[t[0]]) ||
                        ("none" === t[1].validation
                          ? (e[t[0]] = "NULL")
                          : delete e[t[0]]);
                    }),
                    e
                  );
                },
              },
              {
                key: "forceInjectValuesBeforeSave",
                value: function (e) {
                  return e;
                },
              },
              {
                key: "doCustomValidation",
                value: function (e) {
                  try {
                    if (e.date_start !== e.date_end) {
                      var t = new Date(e.date_start);
                      if (new Date(e.date_end) < t)
                        return "Start date should be earlier than end date of the leave period";
                    }
                  } catch (e) {}
                  return null;
                },
              },
              {
                key: "filterQuery",
                value: function () {
                  var e = new n.default(this.getTableName() + "_filter", !0, {
                    ShowPopup: !1,
                    LabelErrorClass: "error",
                  });
                  if (e.checkValues()) {
                    var t = e.getFormParameters();
                    if (this.doCustomFilterValidation(t)) {
                      for (var l in t)
                        t.hasOwnProperty(l) && "NULL" === t[l] && delete t[l];
                      this.setFilter(t),
                        (this.filtersAlreadySet = !0),
                        $("#" + this.getTableName() + "_resetFilters").show(),
                        (this.currentFilterString = this.getFilterString(t)),
                        this.get([]),
                        this.closePlainMessage();
                    }
                  }
                },
              },
              {
                key: "getFilterString",
                value: function (e) {
                  var t = "",
                    l = void 0,
                    a = void 0,
                    i = void 0,
                    o = void 0,
                    n = void 0,
                    s = void 0,
                    r = this.getFilters();
                  for (var u in (null == i && (i = []), e))
                    if (e.hasOwnProperty(u)) {
                      if (
                        ((n = ""),
                        (s = null),
                        "select" === (i = this.getMetaFieldValues(u, r)).type ||
                          "select2" === i.type)
                      ) {
                        if (
                          void 0 !== i["remote-source"] &&
                          null != i["remote-source"]
                        )
                          (l = i["remote-source"]),
                            "NULL" === e[u]
                              ? (n =
                                  void 0 !== i["null-label"] &&
                                  null != i["null-label"]
                                    ? i["null-label"]
                                    : "Not Selected")
                              : (s = n =
                                  this.fieldMasterData[
                                    l[0] + "_" + l[1] + "_" + l[2]
                                  ][e[u]]);
                        else if (((a = i.source[0]), "NULL" === e[u]))
                          n =
                            void 0 !== i["null-label"] &&
                            null != i["null-label"]
                              ? i["null-label"]
                              : "Not Selected";
                        else
                          for (var d = 0; d < a.length; d++)
                            if (e[u] === i.source[d][0]) {
                              s = n = i.source[d][1];
                              break;
                            }
                      } else if ("select2multi" === i.type) {
                        o = [];
                        try {
                          o = JSON.parse(e[u]);
                        } catch (e) {}
                        "" !== (n = o.join(",")) && (s = n);
                      } else "" !== (n = e[u]) && (s = n);
                      null != s &&
                        ("" !== t && (t += " | "), (t += i.label + " = " + n));
                    }
                  return t;
                },
              },
              {
                key: "doCustomFilterValidation",
                value: function (e) {
                  return !0;
                },
              },
              {
                key: "resetFilters",
                value: function () {
                  (this.filter = this.origFilter),
                    (this.filtersAlreadySet = !1),
                    $("#" + this.getTableName() + "_resetFilters").hide(),
                    (this.currentFilterString = ""),
                    this.get([]);
                },
              },
              {
                key: "downloadEmployees",
                value: function (e) {
                  // alert("Download Employees");
                  window.location.href =
                    "../../../../rokel_hrm/core/appDownloads/employeeData.php";
                },
              },
              {
                key: "showFilters",
                value: function (e) {
                  for (
                    var t = this.templates.filterTemplate,
                      l = "",
                      a = this.getFilters(),
                      i = 0;
                    i < a.length;
                    i++
                  ) {
                    var o = this.getMetaFieldForRendering(a[i][0]);
                    if ("" === o || void 0 === o)
                      l += this.renderFormField(a[i]);
                    else {
                      var n = e[o];
                      "" !== n && null != n && void 0 !== n && "" !== n.trim()
                        ? (l += this.renderFormField(JSON.parse(n)))
                        : (l += this.renderFormField(a[i]));
                    }
                  }
                  t = (t = t.replace(
                    /_id_/g,
                    this.getTableName() + "_filter"
                  )).replace(/_fields_/g, l);
                  var s = this.generateRandom(14),
                    r = $(
                      '<div class="reviewBlock popupForm" data-content="Form"></div>'
                    );
                  r.attr("id", s),
                    r.html(t),
                    r.find(".datefield").datepicker({
                      viewMode: 2,
                    }),
                    r.find(".timefield").datetimepicker({
                      language: "en",
                      pickDate: !1,
                    }),
                    r.find(".datetimefield").datetimepicker({
                      language: "en",
                    }),
                    r.find(".colorpick").colorpicker(),
                    tinymce.init({
                      selector: "#" + r.attr("id") + " .tinymce",
                      height: "400",
                    }),
                    r.find(".simplemde").each(function () {
                      var e = new SimpleMDE({
                        element: $(this)[0],
                      });
                      $(this).data("simplemde", e);
                    }),
                    r.find(".select2Field").each(function () {
                      $(this)
                        .select2()
                        .select2("val", $(this).find("option:eq(0)").val());
                    }),
                    r.find(".select2Multi").each(function () {
                      $(this)
                        .select2()
                        .on("change", function (e) {
                          var t = $(this).parents(".row"),
                            l = t.find(".select2-choices").height();
                          t.height(parseInt(l, 10));
                        });
                    }),
                    this.showDomElement("Edit", r, null, null, !0),
                    $(".filterBtn").off(),
                    $(".filterBtn").on("click", function (e) {
                      e.preventDefault(), e.stopPropagation();
                      try {
                        modJs.filterQuery();
                      } catch (e) {}
                      return !1;
                    }),
                    void 0 !== this.filter &&
                      null != this.filter &&
                      "" !== this.filter &&
                      this.fillForm(
                        this.filter,
                        "#" + this.getTableName() + "_filter",
                        this.getFilters()
                      );
                },
              },
              {
                key: "preRenderForm",
                value: function (e) {},
              },
              {
                key: "renderForm",
                value: function (e) {
                  var t = [];
                  (null != e && void 0 !== e) || (this.currentId = null),
                    this.preRenderForm(e);
                  for (
                    var l = this.templates.formTemplate,
                      a = "",
                      i = this.getFormFields(),
                      o = 0;
                    o < i.length;
                    o++
                  ) {
                    var n = this.getMetaFieldForRendering(i[o][0]);
                    if ("" === n || void 0 === n)
                      a += this.renderFormField(i[o]);
                    else {
                      var s = e[n];
                      "" !== s && null != s && void 0 !== s && "" !== s.trim()
                        ? (a += this.renderFormField(JSON.parse(s)))
                        : (a += this.renderFormField(i[o]));
                    }
                  }
                  l = (l = l.replace(
                    /_id_/g,
                    this.getTableName() + "_submit"
                  )).replace(/_fields_/g, a);
                  var r = void 0,
                    u = this.generateRandom(14);
                  this.showFormOnPopup
                    ? (r = $(
                        '<div class="reviewBlock popupForm" data-content="Form"></div>'
                      )).attr("id", u)
                    : (r = $("#" + this.getTableName() + "Form")),
                    r.html(l),
                    r.find(".datefield").datepicker({
                      viewMode: 2,
                    }),
                    r.find(".timefield").datetimepicker({
                      language: "en",
                      pickDate: !1,
                    }),
                    r.find(".datetimefield").datetimepicker({
                      language: "en",
                    }),
                    r.find(".colorpick").colorpicker(),
                    tinymce.init({
                      selector: "#" + r.attr("id") + " .tinymce",
                      height: "400",
                    }),
                    r.find(".simplemde").each(function () {
                      var e = new SimpleMDE({
                        element: $(this)[0],
                      });
                      $(this).data("simplemde", e);
                    }),
                    r.find(".select2Field").each(function () {
                      $(this)
                        .select2()
                        .select2("val", $(this).find("option:eq(0)").val());
                    }),
                    r.find(".select2Multi").each(function () {
                      $(this)
                        .select2()
                        .on("change", function (e) {
                          var t = $(this).parents(".row"),
                            l = t.find(".select2-choices").height();
                          t.height(parseInt(l, 10));
                        });
                    }),
                    r.find(".signatureField").each(function () {
                      t.push($(this).attr("id"));
                    });
                  for (var d = 0; d < i.length; d++)
                    "datagroup" === i[d][1].type &&
                      r.find("#" + i[d][0]).data("field", i[d]);
                  if (
                    (!1 === this.showSave
                      ? r.find(".saveBtn").remove()
                      : (r.find(".saveBtn").off(),
                        r.find(".saveBtn").data("modJs", this),
                        r.find(".saveBtn").on("click", function () {
                          return (
                            null !=
                              $(this).data("modJs").saveSuccessItemCallback &&
                            void 0 !==
                              $(this).data("modJs").saveSuccessItemCallback
                              ? $(this)
                                  .data("modJs")
                                  .save(
                                    $(this)
                                      .data("modJs")
                                      .retriveItemsAfterSave(),
                                    $(this).data("modJs")
                                      .saveSuccessItemCallback
                                  )
                              : $(this).data("modJs").save(),
                            !1
                          );
                        })),
                    !1 === this.showCancel
                      ? r.find(".cancelBtn").remove()
                      : (r.find(".cancelBtn").off(),
                        r.find(".cancelBtn").data("modJs", this),
                        r.find(".cancelBtn").on("click", function () {
                          return $(this).data("modJs").cancel(), !1;
                        })),
                    r.find("[mask]").each(function () {
                      $(this).inputmask($(this).attr("mask"));
                    }),
                    r.find("[datemask]").each(function () {
                      $(this).inputmask({
                        mask: "y-1-2",
                        placeholder: "YYYY-MM-DD",
                        leapday: "-02-29",
                        separator: "-",
                        alias: "yyyy/mm/dd",
                      });
                    }),
                    r.find("[datetimemask]").each(function () {
                      $(this).inputmask("datetime", {
                        mask: "y-2-1 h:s:00",
                        placeholder: "YYYY-MM-DD hh:mm:ss",
                        leapday: "-02-29",
                        separator: "-",
                        alias: "yyyy/mm/dd",
                      });
                    }),
                    this.showFormOnPopup)
                  ) {
                    this.showMessage("Edit", "", null, null, !0),
                      $("#plainMessageModel .modal-body").html(""),
                      $("#plainMessageModel .modal-body").append(r);
                    for (var c = 0; c < t.length; c++)
                      $("#" + t[c]).data(
                        "signaturePad",
                        new SignaturePad(document.getElementById(t[c]))
                      );
                    void 0 !== e && null != e
                      ? this.fillForm(e, "#" + u)
                      : this.setDefaultValues("#" + u);
                  } else {
                    $("#" + this.getTableName() + "Form").show(),
                      $("#" + this.getTableName()).hide();
                    for (var p = 0; p < t.length; p++)
                      $("#" + t[p]).data(
                        "signaturePad",
                        new SignaturePad(document.getElementById(t[p]))
                      );
                    void 0 !== e && null != e
                      ? this.fillForm(e)
                      : this.setDefaultValues(),
                      this.scrollToTop();
                  }
                  this.postRenderForm(e, r);
                },
              },
              {
                key: "setDefaultValues",
                value: function (e, t) {
                  (null != t && void 0 !== t) || (t = this.getFormFields()),
                    (null != e && void 0 !== e && "" !== e) ||
                      (e = "#" + this.getTableName() + "Form");
                  for (var l = 0; l < t.length; l++)
                    ("text" !== t[l][1].type && "textarea" !== t[l][1].type) ||
                      (void 0 !== t[l][1].default &&
                        null !== t[l][1].default &&
                        $(e + " #" + t[l][0]).val(t[l][1].default));
                },
              },
              {
                key: "retriveItemsAfterSave",
                value: function () {
                  return !0;
                },
              },
              {
                key: "postRenderForm",
                value: function (e, t) {},
              },
              {
                key: "dataGroupToHtml",
                value: function (e, t) {
                  var l = JSON.parse(e),
                    a = void 0,
                    i = void 0,
                    o = void 0,
                    n = void 0,
                    s = t[1].html;
                  null != l &&
                    void 0 !== l &&
                    void 0 !== t[1]["sort-function"] &&
                    null != t[1]["sort-function"] &&
                    l.sort(t[1]["sort-function"]);
                  for (
                    var r = $('<div id="' + t[0] + '_div_inner"></div>'), u = 0;
                    u < l.length;
                    u++
                  ) {
                    for (var d in ((i = l[u]),
                    void 0 !== t[1]["pre-format-function"] &&
                      null != t[1]["pre-format-function"] &&
                      (i = t[1]["pre-format-function"].apply(this, [i])),
                    (a = (a = (a = (a = s).replace(
                      "#_delete_#",
                      '<a id="#_id_#_delete" onclick="modJs.deleteDataGroupItem(\'#_id_#\');return false;" type="button" style="float:right;margin-right:3px;" tooltip="Delete"><li class="fa fa-times"></li></a>'
                    )).replace(
                      "#_edit_#",
                      '<a id="#_id_#_edit" onclick="modJs.editDataGroupItem(\'#_id_#\');return false;" type="button" style="float:right;margin-right:5px;" tooltip="Edit"><li class="fa fa-edit"></li></a>'
                    )).replace(/#_id_#/g, i.id)),
                    i))
                      void 0 !== (n = i[d]) &&
                        null != n &&
                        "string" == typeof n &&
                        (n = n.replace(/(?:\r\n|\r|\n)/g, "<br />")),
                        (a = a.replace("#_" + d + "_#", n));
                    void 0 !== t[1].render &&
                      null != t[1].render &&
                      (a = a.replace("#_renderFunction_#", t[1].render(i))),
                      (o = $(a)).attr("fieldId", t[0] + "_div"),
                      r.append(o);
                  }
                  return r;
                },
              },
              {
                key: "resetDataGroup",
                value: function (e) {
                  $("#" + e[0]).val(""), $("#" + e[0] + "_div").html("");
                },
              },
              {
                key: "showDataGroup",
                value: function (e, t) {
                  var l = this.templates.datagroupTemplate,
                    a = "",
                    i = e[1].form;
                  void 0 !== t && null != t && void 0 !== t.id
                    ? (this.currentDataGroupItemId = t.id)
                    : (this.currentDataGroupItemId = null);
                  for (var o = 0; o < i.length; o++)
                    a += this.renderFormField(i[o]);
                  l = (l = l.replace(
                    /_id_/g,
                    this.getTableName() + "_field_" + e[0]
                  )).replace(/_fields_/g, a);
                  var n = this.generateRandom(14),
                    s = $(
                      '<div class="reviewBlock popupForm" data-content="Form"></div>'
                    );
                  s.attr("id", n),
                    s.html(l),
                    s.find(".datefield").datepicker({
                      viewMode: 2,
                    }),
                    s.find(".timefield").datetimepicker({
                      language: "en",
                      pickDate: !1,
                    }),
                    s.find(".datetimefield").datetimepicker({
                      language: "en",
                    }),
                    s.find(".colorpick").colorpicker(),
                    tinymce.init({
                      selector: "#" + s.attr("id") + " .tinymce",
                      height: "400",
                    }),
                    s.find(".simplemde").each(function () {
                      var e = new SimpleMDE({
                        element: $(this)[0],
                      });
                      $(this).data("simplemde", e);
                    }),
                    s.find(".select2Field").each(function () {
                      $(this)
                        .select2()
                        .select2("val", $(this).find("option:eq(0)").val());
                    }),
                    s.find(".select2Multi").each(function () {
                      $(this)
                        .select2()
                        .on("change", function (e) {
                          var t = $(this).parents(".row"),
                            l = t.find(".select2-choices").height();
                          t.height(parseInt(l, 10));
                        });
                    }),
                    (this.currentDataGroupField = e),
                    this.showDomElement("Add " + e[1].label, s, null, null, !0),
                    void 0 !== t && null != t
                      ? this.fillForm(
                          t,
                          "#" + this.getTableName() + "_field_" + e[0],
                          e[1].form
                        )
                      : this.setDefaultValues(
                          "#" + this.getTableName() + "_field_" + e[0],
                          e[1].form
                        ),
                    $(".groupAddBtn").off(),
                    void 0 !== t && null != t && void 0 !== t.id
                      ? $(".groupAddBtn").on("click", function (e) {
                          e.preventDefault(), e.stopPropagation();
                          try {
                            modJs.editDataGroup();
                          } catch (e) {
                            console.log(
                              "Error editing data group: " + e.message
                            );
                          }
                          return !1;
                        })
                      : $(".groupAddBtn").on("click", function (e) {
                          e.preventDefault(), e.stopPropagation();
                          try {
                            modJs.addDataGroup();
                          } catch (e) {
                            console.log(
                              "Error adding data group: " + e.message
                            );
                          }
                          return !1;
                        });
                },
              },
              {
                key: "addDataGroup",
                value: function () {
                  var e = this.currentDataGroupField,
                    t = void 0;
                  $(
                    "#" + this.getTableName() + "_field_" + e[0] + "_error"
                  ).html(""),
                    $(
                      "#" + this.getTableName() + "_field_" + e[0] + "_error"
                    ).hide();
                  var l = new n.default(
                    this.getTableName() + "_field_" + e[0],
                    !0,
                    {
                      ShowPopup: !1,
                      LabelErrorClass: "error",
                    }
                  );
                  if (l.checkValues()) {
                    var a = l.getFormParameters();
                    if (
                      void 0 !== e[1]["custom-validate-function"] &&
                      null != e[1]["custom-validate-function"]
                    ) {
                      if (
                        !(t = e[1]["custom-validate-function"].apply(this, [a]))
                          .valid
                      )
                        return (
                          $(
                            "#" +
                              this.getTableName() +
                              "_field_" +
                              e[0] +
                              "_error"
                          ).html(t.message),
                          $(
                            "#" +
                              this.getTableName() +
                              "_field_" +
                              e[0] +
                              "_error"
                          ).show(),
                          !1
                        );
                      a = t.params;
                    }
                    var i = $("#" + e[0]).val();
                    "" === i && (i = "[]");
                    var o = JSON.parse(i);
                    (a.id =
                      e[0] + "_" + this.dataGroupGetNextAutoIncrementId(o)),
                      o.push(a),
                      void 0 !== e[1]["sort-function"] &&
                        null != e[1]["sort-function"] &&
                        o.sort(e[1]["sort-function"]),
                      (i = JSON.stringify(o));
                    var s = this.dataGroupToHtml(i, e);
                    $("#" + e[0] + "_div").html(""),
                      $("#" + e[0] + "_div").append(s),
                      this.makeDataGroupSortable(
                        e,
                        $("#" + e[0] + "_div_inner")
                      ),
                      $("#" + e[0]).val(i),
                      this.orderDataGroup(e),
                      this.closeDataMessage(),
                      this.showMessage(
                        "Item Added",
                        "This change will be effective only when you save the form"
                      );
                  }
                  return !0;
                },
              },
              {
                key: "nl2br",
                value: function (e, t) {
                  var l = "";
                  try {
                    for (var a = e.split(" "), i = 0, o = 0; o < a.length; o++)
                      (i += a[o].length + 1) > t
                        ? ((l += a[o] + "<br/>"), (i = 0))
                        : (l += a[o] + " ");
                  } catch (e) {}
                  return l;
                },
              },
              {
                key: "makeDataGroupSortable",
                value: function (e, t) {
                  t.data("field", e),
                    t.data("firstSort", !0),
                    t.sortable({
                      create: function () {
                        $(this).height($(this).height());
                      },
                      "ui-floating": !1,
                      start: function (e, t) {
                        $("#sortable-ul-selector-id").sortable({
                          sort: function (e, t) {
                            var l = $(e.target);
                            if (
                              !/html|body/i.test(l.offsetParent()[0].tagName)
                            ) {
                              var a =
                                e.pageY -
                                l.offsetParent().offset().top -
                                t.helper.outerHeight(!0) / 2;
                              t.helper.css({
                                top: a + "px",
                              });
                            }
                          },
                        });
                      },
                      revert: !0,
                      stop: function () {
                        modJs.orderDataGroup($(this).data("field"));
                      },
                      axis: "y",
                      scroll: !1,
                      placeholder: "sortable-placeholder",
                      cursor: "move",
                    });
                },
              },
              {
                key: "orderDataGroup",
                value: function (e) {
                  var t = [],
                    l = void 0,
                    a = $(
                      "#" + e[0] + "_div_inner [fieldid='" + e[0] + "_div']"
                    ),
                    i = $("#" + e[0]).val();
                  "" === i && (i = "[]");
                  var o = JSON.parse(i);
                  a.each(function () {
                    for (var e in ((l = $(this).attr("id")), o))
                      if (o[e].id === l) {
                        t.push(o[e]);
                        break;
                      }
                  }),
                    $("#" + e[0]).val(JSON.stringify(t));
                },
              },
              {
                key: "editDataGroup",
                value: function () {
                  var e = this.currentDataGroupField,
                    t = this.currentDataGroupItemId,
                    l = new n.default(
                      this.getTableName() + "_field_" + e[0],
                      !0,
                      {
                        ShowPopup: !1,
                        LabelErrorClass: "error",
                      }
                    );
                  if (l.checkValues()) {
                    var a = l.getFormParameters();
                    if (
                      void 0 !== e[1]["custom-validate-function"] &&
                      null != e[1]["custom-validate-function"]
                    ) {
                      var i = e[1]["custom-validate-function"].apply(this, [a]);
                      if (!i.valid)
                        return (
                          $(
                            "#" +
                              this.getTableName() +
                              "_field_" +
                              e[0] +
                              "_error"
                          ).html(i.message),
                          $(
                            "#" +
                              this.getTableName() +
                              "_field_" +
                              e[0] +
                              "_error"
                          ).show(),
                          !1
                        );
                      a = i.params;
                    }
                    if (this.doCustomFilterValidation(a)) {
                      var o = $("#" + e[0]).val();
                      "" === o && (o = "[]");
                      for (
                        var s = JSON.parse(o), r = {}, u = -1, d = [], c = 0;
                        c < s.length;
                        c++
                      ) {
                        var p = s[c];
                        p.id === t && ((r = p), (u = c)), d.push(p);
                      }
                      (a.id = r.id),
                        (d[u] = a),
                        void 0 !== e[1]["sort-function"] &&
                          null != e[1]["sort-function"] &&
                          d.sort(e[1]["sort-function"]),
                        (o = JSON.stringify(d)),
                        $("#" + e[0]).val(o);
                      var m = this.dataGroupToHtml(o, e);
                      this.orderDataGroup(e),
                        $("#" + e[0] + "_div").html(""),
                        $("#" + e[0] + "_div").append(m),
                        this.makeDataGroupSortable(
                          e,
                          $("#" + e[0] + "_div_inner")
                        ),
                        this.closeDataMessage(),
                        this.showMessage(
                          "Item Edited",
                          "This change will be effective only when you save the form"
                        );
                    }
                  }
                  return !0;
                },
              },
              {
                key: "editDataGroupItem",
                value: function (e) {
                  for (
                    var t = e.substring(0, e.lastIndexOf("_")),
                      l = $("#" + t).val(),
                      a = JSON.parse(l),
                      i = {},
                      o = 0;
                    o < a.length;
                    o++
                  ) {
                    var n = a[o];
                    n.id === e && (i = n);
                  }
                  this.showDataGroup($("#" + t).data("field"), i);
                },
              },
              {
                key: "dataGroupGetNextAutoIncrementId",
                value: function (e) {
                  for (var t = 1, l = void 0, a = 0; a < e.length; a++) {
                    var i = e[a];
                    (void 0 !== i.id && null != i.id) || (i.id = 1),
                      (l = i.id.substring(
                        i.id.lastIndexOf("_") + 1,
                        i.id.length
                      )) >= t && (t = parseInt(l, 10) + 1);
                  }
                  return t;
                },
              },
              {
                key: "deleteDataGroupItem",
                value: function (e) {
                  for (
                    var t = e.substring(0, e.lastIndexOf("_")),
                      l = $("#" + t).val(),
                      a = JSON.parse(l),
                      i = [],
                      o = 0;
                    o < a.length;
                    o++
                  ) {
                    var n = a[o];
                    n.id !== e && i.push(n);
                  }
                  $("#" + t).val(JSON.stringify(i)),
                    $("#" + e).remove(),
                    this.showMessage(
                      "Item Removed",
                      "Item removed. This change will be effective only when you save the form"
                    );
                },
              },
              {
                key: "fillForm",
                value: function (e, t, l) {
                  var a = void 0;
                  (null != l && void 0 !== l) || (l = this.getFormFields()),
                    (null != t && void 0 !== t && "" !== t) ||
                      (t = "#" + this.getTableName() + "Form");
                  for (var i = 0; i < l.length; i++)
                    if ("date" === l[i][1].type)
                      "0000-00-00" !== e[l[i][0]] &&
                        "" !== e[l[i][0]] &&
                        null != e[l[i][0]] &&
                        void 0 !== e[l[i][0]] &&
                        $(t + " #" + l[i][0] + "_date").datepicker(
                          "setValue",
                          e[l[i][0]]
                        );
                    else if ("colorpick" === l[i][1].type)
                      null != e[l[i][0]] &&
                        void 0 !== e[l[i][0]] &&
                        ($(t + " #" + l[i][0] + "_colorpick").colorpicker(
                          "setValue",
                          e[l[i][0]]
                        ),
                        $(t + " #" + l[i][0]).val(e[l[i][0]]));
                    else if (
                      "datetime" === l[i][1].type ||
                      "time" === l[i][1].type
                    ) {
                      if (
                        "0000-00-00 00:00:00" !== e[l[i][0]] &&
                        "" !== e[l[i][0]] &&
                        null != e[l[i][0]] &&
                        void 0 !== e[l[i][0]]
                      ) {
                        var o = e[l[i][0]].split(" "),
                          n = o[0].split("-"),
                          s = o[1].split(":");
                        $(t + " #" + l[i][0] + "_datetime")
                          .data("datetimepicker")
                          .setLocalDate(
                            new Date(
                              n[0],
                              parseInt(n[1], 10) - 1,
                              n[2],
                              s[0],
                              s[1],
                              s[2]
                            )
                          );
                      }
                    } else if ("label" === l[i][1].type)
                      $(t + " #" + l[i][0]).html(e[l[i][0]]);
                    else if ("placeholder" === l[i][1].type) {
                      if (
                        void 0 !== l[i][1]["remote-source"] &&
                        null != l[i][1]["remote-source"]
                      ) {
                        var r =
                          l[i][1]["remote-source"][0] +
                          "_" +
                          l[i][1]["remote-source"][1] +
                          "_" +
                          l[i][1]["remote-source"][2];
                        a = this.fieldMasterData[r][e[l[i][0]]];
                      } else a = e[l[i][0]];
                      if (void 0 === a || null == a) a = "";
                      else
                        try {
                          a = a.replace(/(?:\r\n|\r|\n)/g, "<br />");
                        } catch (e) {}
                      if (
                        void 0 !== l[i][1].formatter &&
                        l[i][1].formatter &&
                        $.isFunction(l[i][1].formatter)
                      )
                        try {
                          a = l[i][1].formatter(a);
                        } catch (e) {}
                      $(t + " #" + l[i][0]).html(a);
                    } else if ("fileupload" === l[i][1].type)
                      null != e[l[i][0]] &&
                        void 0 !== e[l[i][0]] &&
                        "" !== e[l[i][0]] &&
                        ($(t + " #" + l[i][0]).html(e[l[i][0]]),
                        $(t + " #" + l[i][0]).attr("val", e[l[i][0]]),
                        $(t + " #" + l[i][0]).show(),
                        $(t + " #" + l[i][0] + "_download").show(),
                        $(t + " #" + l[i][0] + "_remove").show()),
                        !0 === l[i][1].readonly &&
                          $(t + " #" + l[i][0] + "_upload").remove();
                    else if ("select" === l[i][1].type)
                      (void 0 !== e[l[i][0]] &&
                        null != e[l[i][0]] &&
                        "" !== e[l[i][0]]) ||
                        (e[l[i][0]] = "NULL"),
                        $(t + " #" + l[i][0]).val(e[l[i][0]]);
                    else if ("select2" === l[i][1].type)
                      (void 0 !== e[l[i][0]] &&
                        null != e[l[i][0]] &&
                        "" !== e[l[i][0]]) ||
                        (e[l[i][0]] = "NULL"),
                        $(t + " #" + l[i][0]).select2("val", e[l[i][0]]);
                    else if ("select2multi" === l[i][1].type) {
                      (void 0 !== e[l[i][0]] &&
                        null != e[l[i][0]] &&
                        "" !== e[l[i][0]]) ||
                        (e[l[i][0]] = "NULL");
                      var u = [];
                      if (
                        void 0 !== e[l[i][0]] &&
                        null != e[l[i][0]] &&
                        "" !== e[l[i][0]]
                      )
                        try {
                          u = JSON.parse(e[l[i][0]]);
                        } catch (e) {}
                      $(t + " #" + l[i][0]).select2("val", u);
                      var d = $(t + " #" + l[i][0])
                        .find(".select2-choices")
                        .height();
                      $(t + " #" + l[i][0])
                        .find(".controls")
                        .css("min-height", d + "px"),
                        $(t + " #" + l[i][0]).css("min-height", d + "px");
                    } else if ("datagroup" === l[i][1].type)
                      try {
                        var c = this.dataGroupToHtml(e[l[i][0]], l[i]);
                        $(t + " #" + l[i][0]).val(e[l[i][0]]),
                          $(t + " #" + l[i][0] + "_div").html(""),
                          $(t + " #" + l[i][0] + "_div").append(c),
                          this.makeDataGroupSortable(
                            l[i],
                            $(t + " #" + l[i][0] + "_div_inner")
                          );
                      } catch (e) {}
                    else
                      "signature" === l[i][1].type
                        ? ("" === e[l[i][0]] &&
                            void 0 === e[l[i][0]] &&
                            null == e[l[i][0]]) ||
                          $(t + " #" + l[i][0])
                            .data("signaturePad")
                            .fromDataURL(e[l[i][0]])
                        : "simplemde" === l[i][1].type
                        ? $(t + " #" + l[i][0])
                            .data("simplemde")
                            .value(e[l[i][0]])
                        : $(t + " #" + l[i][0]).val(e[l[i][0]]);
                },
              },
              {
                key: "cancel",
                value: function () {
                  $("#" + this.getTableName() + "Form").hide(),
                    $("#" + this.getTableName()).show();
                },
              },
              {
                key: "renderFormField",
                value: function (e) {
                  var t = 0;
                  if (
                    void 0 === this.fieldTemplates[e[1].type] ||
                    null == this.fieldTemplates[e[1].type]
                  )
                    return "";
                  var l = this.fieldTemplates[e[1].type];
                  if (
                    ((e[1].label = this.gt(e[1].label)),
                    "none" !== e[1].validation &&
                      "emailOrEmpty" !== e[1].validation &&
                      "numberOrEmpty" !== e[1].validation &&
                      "placeholder" !== e[1].type &&
                      e[1].label.indexOf("*") < 0)
                  ) {
                    (["select", "select2"].indexOf(e[1].type) >= 0 &&
                      !0 === e[1]["allow-null"]) ||
                      (e[1].label =
                        e[1].label + '<font class="redFont">*</font>');
                  }
                  if (
                    "text" === e[1].type ||
                    "textarea" === e[1].type ||
                    "hidden" === e[1].type ||
                    "label" === e[1].type ||
                    "placeholder" === e[1].type
                  )
                    l = (l = l.replace(/_id_/g, e[0])).replace(
                      /_label_/g,
                      e[1].label
                    );
                  else if (
                    "select" === e[1].type ||
                    "select2" === e[1].type ||
                    "select2multi" === e[1].type
                  ) {
                    if (
                      ((l = (l = l.replace(/_id_/g, e[0])).replace(
                        /_label_/g,
                        e[1].label
                      )),
                      void 0 !== e[1].source && null != e[1].source)
                    )
                      l = l.replace(
                        "_options_",
                        this.renderFormSelectOptions(e[1].source, e)
                      );
                    else if (
                      void 0 !== e[1]["remote-source"] &&
                      null != e[1]["remote-source"]
                    ) {
                      var a =
                        e[1]["remote-source"][0] +
                        "_" +
                        e[1]["remote-source"][1] +
                        "_" +
                        e[1]["remote-source"][2];
                      l = l.replace(
                        "_options_",
                        this.renderFormSelectOptionsRemote(
                          this.fieldMasterData[a],
                          e
                        )
                      );
                    }
                  } else if ("colorpick" === e[1].type)
                    l = (l = l.replace(/_id_/g, e[0])).replace(
                      /_label_/g,
                      e[1].label
                    );
                  else if ("date" === e[1].type)
                    l = (l = l.replace(/_id_/g, e[0])).replace(
                      /_label_/g,
                      e[1].label
                    );
                  else if ("datetime" === e[1].type)
                    l = (l = l.replace(/_id_/g, e[0])).replace(
                      /_label_/g,
                      e[1].label
                    );
                  else if ("time" === e[1].type)
                    l = (l = l.replace(/_id_/g, e[0])).replace(
                      /_label_/g,
                      e[1].label
                    );
                  else if ("fileupload" === e[1].type) {
                    l = (l = l.replace(/_id_/g, e[0])).replace(
                      /_label_/g,
                      e[1].label
                    );
                    var i = this.getCurrentProfile();
                    (t =
                      null != i && void 0 !== i
                        ? i.id
                        : -1 * this.getUser().id),
                      (l = (l = l.replace(/_userId_/g, t)).replace(
                        /_group_/g,
                        this.tab
                      )),
                      (l = (l =
                        void 0 !== e[1].filetypes && null != e[1].filetypes
                          ? l.replace(/_filetypes_/g, e[1].filetypes)
                          : l.replace(/_filetypes_/g, "all")).replace(
                        /_rand_/g,
                        this.generateRandom(14)
                      ));
                  } else
                    "datagroup" === e[1].type
                      ? (l = (l = l.replace(/_id_/g, e[0])).replace(
                          /_label_/g,
                          e[1].label
                        ))
                      : "signature" === e[1].type
                      ? (l = (l = l.replace(/_id_/g, e[0])).replace(
                          /_label_/g,
                          e[1].label
                        ))
                      : ("tinymce" !== e[1].type &&
                          "simplemde" !== e[1].type) ||
                        (l = (l = l.replace(/_id_/g, e[0])).replace(
                          /_label_/g,
                          e[1].label
                        ));
                  return (
                    (l =
                      void 0 !== e[1].validation &&
                      null != e[1].validation &&
                      "" !== e[1].validation
                        ? l.replace(
                            /_validation_/g,
                            'validation="' + e[1].validation + '"'
                          )
                        : l.replace(/_validation_/g, "")),
                    (l =
                      void 0 !== e[1].help && null !== e[1].help
                        ? (l = l.replace(/_helpline_/g, e[1].help)).replace(
                            /_hidden_class_help_/g,
                            ""
                          )
                        : (l = l.replace(/_helpline_/g, "")).replace(
                            /_hidden_class_help_/g,
                            "hide"
                          )),
                    (l =
                      void 0 !== e[1].placeholder && null !== e[1].placeholder
                        ? l.replace(
                            /_placeholder_/g,
                            'placeholder="' + e[1].placeholder + '"'
                          )
                        : l.replace(/_placeholder_/g, "")),
                    (l =
                      void 0 !== e[1].mask && null !== e[1].mask
                        ? l.replace(/_mask_/g, 'mask="' + e[1].mask + '"')
                        : l.replace(/_mask_/g, ""))
                  );
                },
              },
              {
                key: "renderFormSelectOptions",
                value: function (e, t) {
                  var l = "";
                  null != t &&
                    void 0 !== t &&
                    !0 === t[1]["allow-null"] &&
                    (void 0 !== t[1]["null-label"] && null != t[1]["null-label"]
                      ? (l +=
                          '<option value="NULL">' +
                          this.gt(t[1]["null-label"]) +
                          "</option>")
                      : (l += '<option value="NULL">Select</option>'));
                  var a = [];
                  for (var i in e) a.push(e[i]);
                  !0 === t[1].sort &&
                    a.sort(function (e, t) {
                      return (e = e[1]) < (t = t[1]) ? -1 : e > t ? 1 : 0;
                    });
                  for (var o = 0; o < a.length; o++) {
                    var n = a[o][0],
                      s = a[o][1],
                      r = '<option value="_id_">_val_</option>';
                    l += r = (r = r.replace("_id_", n)).replace(
                      "_val_",
                      this.gt(s)
                    );
                  }
                  return l;
                },
              },
              {
                key: "renderFormSelectOptionsRemote",
                value: function (e, t) {
                  var l = "";
                  !0 === t[1]["allow-null"] &&
                    (void 0 !== t[1]["null-label"] && null != t[1]["null-label"]
                      ? (l +=
                          '<option value="NULL">' +
                          this.gt(t[1]["null-label"]) +
                          "</option>")
                      : (l += '<option value="NULL">Select</option>'));
                  var a = [];
                  for (var i in e) a.push([i, e[i]]);
                  "true" === t[1].sort &&
                    a.sort(function (e, t) {
                      return (e = e[1]) < (t = t[1]) ? -1 : e > t ? 1 : 0;
                    });
                  for (var o = 0; o < a.length; o++) {
                    var n = a[o][0],
                      s = a[o][1],
                      r = '<option value="_id_">_val_</option>';
                    l += r = (r = r.replace("_id_", n)).replace(
                      "_val_",
                      this.gt(s)
                    );
                  }
                  return l;
                },
              },
              {
                key: "setCustomTemplates",
                value: function (e) {
                  this.customTemplates = e;
                },
              },
              {
                key: "setEmailTemplates",
                value: function (e) {
                  this.emailTemplates = e;
                },
              },
              {
                key: "getCustomTemplate",
                value: function (e) {
                  return this.customTemplates[e];
                },
              },
              {
                key: "setFieldTemplates",
                value: function (e) {
                  this.fieldTemplates = e;
                },
              },
              {
                key: "getMetaFieldForRendering",
                value: function (e) {
                  return "";
                },
              },
              {
                key: "clearDeleteParams",
                value: function () {
                  this.deleteParams = {};
                },
              },
              {
                key: "getShowAddNew",
                value: function () {
                  return this.showAddNew;
                },
              },
              {
                key: "getShowDownloadEmployees",
                value: function () {
                  return this.showAddNew;
                },
              },
              {
                key: "getAddNewLabel",
                value: function () {
                  return "Add New";
                },
              },
              {
                key: "setShowAddNew",
                value: function (e) {
                  this.showAddNew = e;
                },
              },
              {
                key: "setShowDelete",
                value: function (e) {
                  this.showDelete = e;
                },
              },
              {
                key: "setShowEdit",
                value: function (e) {
                  this.showEdit = e;
                },
              },
              {
                key: "setShowSave",
                value: function (e) {
                  this.showSave = e;
                },
              },
              {
                key: "setShowCancel",
                value: function (e) {
                  this.showCancel = e;
                },
              },
              {
                key: "getCustomTableParams",
                value: function () {
                  return {};
                },
              },
              {
                key: "getActionButtons",
                value: function (e) {
                  return modJs.getActionButtonsHtml(e.aData[0], e.aData);
                },
              },
              {
                key: "getActionButtonsHtml",
                value: function (e, t) {
                  var l =
                    '<div style="width:80px;">_edit__delete__clone_</div>';
                  return (
                    (l = this.showAddNew
                      ? l.replace(
                          "_clone_",
                          '<img class="tableActionButton" src="_BASE_images/clone.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Copy" onclick="modJs.copyRow(_id_);return false;"></img>'
                        )
                      : l.replace("_clone_", "")),
                    (l = this.showDelete
                      ? l.replace(
                          "_delete_",
                          '<img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Delete" onclick="modJs.deleteRow(_id_);return false;"></img>'
                        )
                      : l.replace("_delete_", "")),
                    (l = (l = (l = this.showEdit
                      ? l.replace(
                          "_edit_",
                          '<img class="tableActionButton" src="_BASE_images/edit.png" style="cursor:pointer;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img>'
                        )
                      : l.replace("_edit_", "")).replace(/_id_/g, e)).replace(
                      /_BASE_/g,
                      this.baseUrl
                    ))
                  );
                },
              },
              {
                key: "generateRandom",
                value: function (e) {
                  for (
                    var t = new Date(),
                      l =
                        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                      a = "",
                      i = e;
                    i > 0;
                    --i
                  )
                    a += l[Math.round(Math.random() * (l.length - 1))];
                  return a + t.getTime();
                },
              },
              {
                key: "checkFileType",
                value: function (e, t) {
                  var l = document.getElementById(e),
                    a = "";
                  return (
                    l.value.lastIndexOf(".") > 0 &&
                      (a = l.value.substring(
                        l.value.lastIndexOf(".") + 1,
                        l.value.length
                      )),
                    (a = a.toLowerCase()),
                    !(t.split(",").indexOf(a) < 0) ||
                      ((l.value = ""),
                      this.showMessage(
                        "File Type Error",
                        "Selected file type is not supported"
                      ),
                      this.clearFileElement(e),
                      !1)
                  );
                },
              },
              {
                key: "clearFileElement",
                value: function (e) {
                  var t = $("#" + e);
                  t.replaceWith((t = t.val("").clone(!0)));
                },
              },
              {
                key: "fixJSON",
                value: function (e) {
                  return "1" === this.noJSONRequests && (e = window.btoa(e)), e;
                },
              },
              {
                key: "getClientDate",
                value: function (e) {
                  var t = this.getClientGMTOffset();
                  return e.addMinutes(60 * t);
                },
              },
              {
                key: "getClientGMTOffset",
                value: function () {
                  var e = new Date(),
                    t = new Date(e.getFullYear(), 0, 1, 0, 0, 0, 0),
                    l = t.toGMTString();
                  return (
                    (t - new Date(l.substring(0, l.lastIndexOf(" ") - 1))) /
                    36e5
                  );
                },
              },
              {
                key: "getHelpLink",
                value: function () {
                  return null;
                },
              },
              {
                key: "showLoader",
                value: function () {
                  $("#iceloader").show();
                },
              },
              {
                key: "hideLoader",
                value: function () {
                  $("#iceloader").hide();
                },
              },
              {
                key: "generateOptions",
                value: function (e) {
                  var t = "";
                  for (var l in e)
                    t += '<option value="__val__">__text__</option>'
                      .replace("__val__", l)
                      .replace("__text__", e[l]);
                  return t;
                },
              },
              {
                key: "isModuleInstalled",
                value: function (e, t) {
                  return (
                    void 0 !== modulesInstalled &&
                    null !== modulesInstalled &&
                    1 === modulesInstalled[e + "_" + t]
                  );
                },
              },
              {
                key: "setCustomFields",
                value: function (e) {
                  for (var t = void 0, l = void 0, a = 0; a < e.length; a++)
                    if (
                      "Hidden" !== (t = e[a]).display &&
                      "" !== t.data &&
                      void 0 !== t.data
                    )
                      try {
                        if (void 0 === (l = JSON.parse(t.data)) || null == l)
                          continue;
                        if (2 !== l.length) continue;
                        if (void 0 === l[1].type || null == l[1].type) continue;
                        this.customFields.push(l);
                      } catch (e) {}
                },
              },
              {
                key: "addCustomFields",
                value: function (e) {
                  for (var t = 0; t < this.customFields.length; t++)
                    e.push(this.customFields[t]);
                  return e;
                },
              },
            ]),
            e
          );
        })();
        l.default = s;
      },
      {
        "./FormValidation": 5,
      },
    ],
    7: [
      function (e, t, l) {
        "use strict";
        Object.defineProperty(l, "__esModule", {
          value: !0,
        });
        var a,
          i = (function () {
            function e(e, t) {
              for (var l = 0; l < t.length; l++) {
                var a = t[l];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, l, a) {
              return l && e(t.prototype, l), a && e(t, a), t;
            };
          })(),
          o = e("./AdapterBase"),
          n =
            (a = o) && a.__esModule
              ? a
              : {
                  default: a,
                };
        var s = (function (e) {
          function t() {
            return (
              (function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
              (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
              )
            );
          }
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, n.default),
            i(t, [
              {
                key: "deleteRow",
                value: function (e) {
                  (this.deleteParams.id = e), this.confirmDelete();
                },
              },
              {
                key: "createTable",
                value: function (e) {
                  var t = void 0,
                    l = void 0,
                    a = void 0,
                    i = void 0,
                    o = this.getTableData(),
                    n =
                      '<button id="#_id_#_delete" onclick="modJs.subModJsList[\'tab' +
                      e +
                      '\'].deleteRow(\'_id_\');return false;" type="button" style="position: absolute;bottom: 5px;right: 5px;font-size: 13px;" tooltip="Delete"><li class="fa fa-times"></li></button>',
                    s =
                      '<button id="#_id_#_edit" onclick="modJs.subModJsList[\'tab' +
                      e +
                      '\'].edit(\'_id_\');return false;" type="button" style="position: absolute;bottom: 5px;right: 35px;font-size: 13px;" tooltip="Edit"><li class="fa fa-edit"></li></button>',
                    r = $('<div class="list-group"></div>'),
                    u = this.getSubHeader();
                  if ((r.append(u), 0 === o.length))
                    r.append(
                      '<a href="#" class="list-group-item">' +
                        this.getNoDataMessage() +
                        "</a>"
                    );
                  else
                    for (var d = 0; d < o.length; d++)
                      (t = o[d]),
                        (a = n.replace(/_id_/g, t[0])),
                        (i = s.replace(/_id_/g, t[0])),
                        (l = this.getSubItemHtml(t, a, i)),
                        r.append(l);
                  $("#" + e).html(""),
                    $("#" + e).append(r),
                    $("#plainMessageModel").modal("hide");
                },
              },
              {
                key: "getNoDataMessage",
                value: function () {
                  return "No data found";
                },
              },
              {
                key: "getSubHeader",
                value: function () {
                  return $(
                    '<a href="#" onclick="return false;" class="list-group-item" style="background:#eee;"><h4 class="list-group-item-heading">' +
                      this.getSubHeaderTitle() +
                      "</h4></a>"
                  );
                },
              },
            ]),
            t
          );
        })();
        l.default = s;
      },
      {
        "./AdapterBase": 4,
      },
    ],
  },
  {},
  [1]
);
//# sourceMappingURL=employees.js.map
