webpackJsonp([1],{NHnr:function(t,e,a){"use strict";function n(t){a("p9ON")}Object.defineProperty(e,"__esModule",{value:!0});var r=a("7+uW"),s=a("3EgV"),i=a.n(s),o=(a("QCv7"),{name:"on-tap-batch",props:["batch","index"],data:function(){return{onTapColors:["red","pink","purple","deep-purple"],upcomingColors:["light-green","lime","amber","orange","deep-orange"],batchProgress:0}},computed:{style:function(t){return t.batch.style},name:function(t){return t.batch.name},status:function(t){return t.batch.status},abv:function(t){return t.batch.abv},baseColor:function(){return"ontap"===this.status?this.onTapColors[this.batch.tap-1]:this.upcomingColors[this.index]},bgColor:function(){return this.baseColor+" darken-2"},buttonColor:function(){return this.baseColor+" lighten-2"}},mounted:function(){var t=new Date(this.batch.kegged),e=new Date(this.batch.empty),a=e-t,n=new Date,r=n-t,s=this;setTimeout(function(){s.batchProgress=Math.round(r/a*100)},150*this.batch.tap)}}),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",{staticClass:"pa-1 mt-1",attrs:{md3:"",sm6:"",xs12:""}},[a("v-card",{staticClass:"white--text",attrs:{color:t.bgColor}},[a("div",{staticClass:"tap-name"},[t._v(t._s(t.batch.tap))]),t._v(" "),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("div",{staticClass:"headline"},[t._v(t._s(t.name))]),t._v(" "),a("span",{staticClass:"style-name"},[t._v(t._s(t.style))])])]),t._v(" "),a("v-card-text",[a("div",[t._v(t._s(t.batch.description))]),t._v(" "),t.abv?a("div",[a("strong",[t._v("ABV:")]),t._v(" "+t._s(t.abv)+"%")]):t._e(),t._v(" "),"ontap"===t.status?a("div",[a("strong",[t._v("Remaining:")]),t._v(" "+t._s(100-t.batchProgress)+"%\n        "),a("v-progress-linear",{attrs:{size:100,width:25,value:t.batchProgress,color:"white"}})],1):t._e()]),t._v(" "),a("v-card-actions",[a("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.batch.untappd,expression:"batch.untappd"}],attrs:{dark:"",color:t.buttonColor,target:"_blank",href:t.batch.untappd}},[t._v("Check in")])],1)],1)],1)},u=[],l={render:c,staticRenderFns:u},p=l,v=a("VU/8"),d=n,h=v(o,p,!1,d,null,null),_=h.exports,b=a("mtWM"),f=a.n(b),m={data:function(){return{title:"What to Brewery Pipeline",ontap:[],upcoming:[],kicked:[],updated:"",copyright:(new Date).getFullYear(),url:"/static/pipeline.json"}},created:function(){var t=this;f.a.get(t.url).then(function(e){var a=e.data.beers;t.ontap=a.filter(function(t){return"ontap"===t.status}).sort(function(t,e){return t.tap>e.tap?1:-1}),t.upcoming=a.filter(function(t){return["fermenting","planned"].includes(t.status)}),t.kicked=a.filter(function(t){return["kicked"].includes(t.status)});var n=new Date(e.data.updated);t.updated=n.toLocaleString()})},components:{BatchView:_}},g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",{attrs:{fixed:"",app:"",dark:"",color:"primary"}},[a("v-toolbar-title",{domProps:{textContent:t._s(t.title)}})],1),t._v(" "),a("v-content",[a("v-container",{attrs:{fluid:"","grid-list-xs":""}},[a("h1",{staticClass:"display-3 grey--text text--darken-1"},[t._v("On tap")]),t._v(" "),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.ontap,function(t){return a("batch-view",{key:t.name,attrs:{batch:t}})})),t._v(" "),a("h1",{staticClass:"display-3 grey--text text--darken-1"},[t._v("On deck")]),t._v(" "),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.upcoming,function(t,e){return a("batch-view",{key:t.name,attrs:{index:e,batch:t}})})),t._v(" "),a("h2",{staticClass:"display-1 grey--text text--darken-1 mt-2 pt-3"},[t._v("Recently kicked")]),t._v(" "),a("v-layout",{staticClass:"ml-1"},[a("ul",t._l(t.kicked,function(e,n){return a("li",{key:n},[a("strong",[t._v(t._s(e.name))]),t._v(" "),a("em",[t._v(t._s(e.style))])])}))])],1)],1),t._v(" "),a("v-footer",{attrs:{fixed:"",app:""}},[a("span",[t._v("Updated: "+t._s(t.updated))]),t._v(" "),a("v-spacer"),t._v(" "),a("span",[t._v("© "+t._s(t.copyright))])],1)],1)},k=[],y={render:g,staticRenderFns:k},C=y,w=a("VU/8"),x=w(m,C,!1,null,null,null),P=x.exports;r.a.use(i.a),r.a.config.productionTip=!1,new r.a({el:"#app",template:"<App/>",components:{App:P}})},QCv7:function(t,e){},p9ON:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9a916731beeb2da5a23e.js.map