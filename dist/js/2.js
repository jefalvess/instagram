(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/timeline/page.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/timeline/page.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'page',\n  components: {},\n\n  data() {\n    return {\n      desativarButton: false,\n      mensagens: '',\n      info: {},\n      timeline: []\n    };\n  },\n\n  computed: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__[\"mapGetters\"])(['modalEdit'])\n  },\n  methods: {\n    async checarUsuario() {\n      if (this.modalEdit === '') {\n        this.$router.push('/');\n      }\n\n      let cookie = this.$cookies.get('token');\n      let payload = {\n        token: cookie\n      };\n      let response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/info/perfil', payload);\n      this.info = response.data.info;\n      this.timeline = response.data.timeline.user.edge_owner_to_timeline_media.edges;\n    },\n\n    async ganharSeguidores() {\n      this.desativarButton = true;\n      let cookie = this.$cookies.get('token');\n      let payload = {\n        token: cookie\n      };\n      let response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/ganhar/seguidores', payload);\n      this.desativarButton = false;\n      this.mensagens = response.data.message;\n    }\n\n  },\n\n  mounted() {\n    this.checarUsuario();\n  }\n\n});\n\n//# sourceURL=webpack:///./src/components/timeline/page.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"54103093-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/timeline/page.vue?vue&type=template&id=9727e586&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"54103093-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/timeline/page.vue?vue&type=template&id=9727e586& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"bx--grid\" }, [\n    _c(\"div\", { staticClass: \"bx--row\" }, [\n      _c(\"div\", { staticClass: \"bx--col-lg-3\" }, [\n        _c(\"img\", {\n          attrs: { src: \"https://www.example.com/images/dinosaur.jpg\" },\n        }),\n        _c(\"img\", {\n          attrs: {\n            src: _vm.info.profile_pic_url_hd,\n            height: \"288\",\n            width: \"388\",\n          },\n        }),\n      ]),\n    ]),\n    _c(\"div\", { staticClass: \"bx--row\" }, [\n      _c(\"div\", { staticClass: \"bx--col-lg-3\" }, [\n        _vm._v(\" \" + _vm._s(_vm.info.full_name) + \" \"),\n      ]),\n    ]),\n    _c(\"div\", { staticClass: \"bx--row\" }, [\n      _c(\"div\", { staticClass: \"bx--col-lg-3\" }, [\n        _vm._v(\" \" + _vm._s(_vm.info.biography) + \" \"),\n      ]),\n    ]),\n    _c(\"div\", { staticClass: \"bx--row\" }, [\n      _c(\"div\", { staticClass: \"bx--col-lg-3\" }, [\n        _vm._v(\"Seguidores : \" + _vm._s(_vm.info.edge_followed_by)),\n      ]),\n    ]),\n    _c(\"div\", { staticClass: \"bx--row\" }, [\n      _c(\"div\", { staticClass: \"bx--col-lg-3\" }, [\n        _vm._v(\"Seguindo : \" + _vm._s(_vm.info.edge_follow)),\n      ]),\n    ]),\n    _c(\"div\", { staticClass: \"bx--row\" }, [\n      _c(\n        \"div\",\n        { staticClass: \"bx--col-lg-3\" },\n        _vm._l(_vm.timeline, function (item, index) {\n          return _c(\"div\", { key: index, staticClass: \"bx--row\" }, [\n            _c(\"div\", { staticClass: \"bx--col-lg-3\" }, [\n              _vm._v(\n                \" id : \" +\n                  _vm._s(item[\"node\"][\"id\"]) +\n                  \" \" +\n                  _vm._s(\n                    item[\"node\"][\"edge_media_to_caption\"][\"edges\"][0][\"node\"][\n                      \"text\"\n                    ]\n                  ) +\n                  \" \"\n              ),\n              _c(\"img\", {\n                attrs: {\n                  loading: \"lazy\",\n                  srcset: item[\"node\"][\"display_url\"],\n                  width: \"300\",\n                  height: \"200\",\n                },\n              }),\n            ]),\n          ])\n        }),\n        0\n      ),\n    ]),\n    _c(\"div\", { staticClass: \"bx--row\" }, [\n      _c(\n        \"div\",\n        { staticClass: \"bx--col-lg-3\", staticStyle: { cursor: \"pointer\" } },\n        [\n          _c(\n            \"button\",\n            {\n              staticClass: \"bx--btn bx--btn--primary\",\n              attrs: { disabled: _vm.desativarButton, type: \"button\" },\n              on: {\n                click: function ($event) {\n                  return _vm.ganharSeguidores()\n                },\n              },\n            },\n            [_vm._v(\" Ganhar seguidores \")]\n          ),\n          _vm._v(\" \" + _vm._s(this.mensagens) + \" \"),\n        ]\n      ),\n      _c(\n        \"div\",\n        {\n          staticClass: \"bx--col-lg-8\",\n          staticStyle: { overflow: \"auto\", height: \"100vh\" },\n        },\n        [_vm._v(\"-\")]\n      ),\n    ]),\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/timeline/page.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2254103093-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/components/timeline/page.vue":
/*!******************************************!*\
  !*** ./src/components/timeline/page.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page_vue_vue_type_template_id_9727e586___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page.vue?vue&type=template&id=9727e586& */ \"./src/components/timeline/page.vue?vue&type=template&id=9727e586&\");\n/* harmony import */ var _page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.vue?vue&type=script&lang=js& */ \"./src/components/timeline/page.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _page_vue_vue_type_template_id_9727e586___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _page_vue_vue_type_template_id_9727e586___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/timeline/page.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/timeline/page.vue?");

/***/ }),

/***/ "./src/components/timeline/page.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./src/components/timeline/page.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./page.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/timeline/page.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/timeline/page.vue?");

/***/ }),

/***/ "./src/components/timeline/page.vue?vue&type=template&id=9727e586&":
/*!*************************************************************************!*\
  !*** ./src/components/timeline/page.vue?vue&type=template&id=9727e586& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_54103093_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_template_id_9727e586___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"54103093-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./page.vue?vue&type=template&id=9727e586& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"54103093-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/timeline/page.vue?vue&type=template&id=9727e586&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_54103093_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_template_id_9727e586___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_54103093_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_template_id_9727e586___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/timeline/page.vue?");

/***/ })

}]);