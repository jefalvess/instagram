(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-039b76d3"],{"4cee":function(t,e,a){},"4e14":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bx--grid",staticStyle:{"margin-left":"1rem","margin-bottom":"7rem","margin-top":"7rem"}},[a("div",{staticClass:"bx--row"},[a("cv-text-input",{attrs:{label:"Usuario do instagram"},model:{value:t.usuario,callback:function(e){t.usuario=e},expression:"usuario"}})],1),a("div",{staticClass:"bx--row"},[a("cv-text-input",{attrs:{label:"Senha do insta",type:"password"},model:{value:t.senha,callback:function(e){t.senha=e},expression:"senha"}})],1),t._m(0),!1!==t.erroMensagem?a("div",{staticClass:"bx--row"},[a("p",[t._v(t._s(t.erroMensagem))])]):t._e(),a("div",{staticClass:"bx--row",staticStyle:{"margin-top":"1rem","margin-left":"-2rem"}},[a("div",{staticClass:"bx--col-lg"},[a("button",{staticClass:"bx--btn bx--btn--primary",attrs:{disabled:t.desativarButton,type:"button"},on:{click:function(e){return t.createUser()}}},[t._v(" Entra no site ")])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bx--row",staticStyle:{"padding-top":"1rem"}},[a("p",{staticStyle:{color:"red"}},[a("strong",[t._v(" Para logar em nosso sistema, sua conta precisa ter pelo menos uma publicaçao no feed."),a("br"),t._v(" Caso contrario o sistema ira entender que se trata de um perfil fake e seu acesso sera bloqueado. ")])])])}],o=a("2f62"),r=a("bc3a"),n=a.n(r),u={data(){return{usuario:"",senha:"",erroMensagem:!1,desativarButton:!1}},computed:{...Object(o["c"])(["modalEdit"])},methods:{...Object(o["b"])(["setModalEdit","setCookieUserJson","setModalUser"]),async createUser(){this.desativarButton=!0;let t={usuario:this.usuario,senha:this.senha},e=await n.a.post("/api/login/user",t);!1===e.data.status&&(this.erroMensagem=e.data.mensagem),this.desativarButton=!1,!0===e.data.status&&this.proximaPagina(e.data)},proximaPagina(t){this.$cookies.set("token",t.token,"8h"),this.setCookieUserJson(t.token),this.setModalEdit(t.usuario),this.setModalUser(t),this.$router.push("/timeline")},criarUsuario(){this.$router.push("/create")},async checarToken(){let t=this.$cookies.get("token");if(null!==t){let e=await n.a.post("/api/token/user",{token:t});!0===e.data.status?this.proximaPagina(e.data):this.mensagem=e.data.mensagem}}},mounted(){this.checarToken()}},c=u,l=(a("5e01"),a("2877")),d=Object(l["a"])(c,s,i,!1,null,null,null);e["default"]=d.exports},"5e01":function(t,e,a){"use strict";a("4cee")}}]);
//# sourceMappingURL=chunk-039b76d3.1d508885.js.map