webpackJsonp([1],{NHnr:function(t,e,n){"use strict";function a(t){n("Zy6h")}Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),s=n("3EgV"),i=n.n(s),o=(n("QCv7"),{name:"on-tap-batch",props:["batch","index"],data:function(){return{onTapColors:["red","pink","purple","deep-purple"],upcomingColors:["light-green","lime","amber","orange","deep-orange"],batchProgress:0}},computed:{style:function(t){return t.batch.style},name:function(t){return t.batch.name},status:function(t){return t.batch.status},abv:function(t){return t.batch.abv},untappdAppLink:function(t){return t.batch.untappd?"untappd://beer/"+t.batch.untappd.split("/").pop():""},baseColor:function(){return"ontap"===this.status?this.onTapColors[this.batch.tap-1]:this.upcomingColors[this.index]},bgColor:function(){return this.baseColor+" darken-2"},buttonColor:function(){return this.baseColor+" lighten-2"},remaining:function(t){return t.batchProgress>=100?"Kicked any day now...":isNaN(t.batchProgress)?"Who knows?":100-t.batchProgress+"%"}},mounted:function(){var t=new Date(this.batch.kegged),e=new Date(this.batch.empty),n=e-t,a=new Date,r=a-t,s=this;setTimeout(function(){s.batchProgress=Math.round(r/n*100)},150*this.batch.tap)}}),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-flex",{staticClass:"pa-1 mt-1",attrs:{md3:"",sm6:"",xs12:""}},[n("v-card",{staticClass:"white--text",attrs:{color:t.bgColor}},[n("div",{staticClass:"tap-name"},[t._v(t._s(t.batch.tap))]),t._v(" "),n("v-card-title",{attrs:{"primary-title":""}},[n("div",[n("div",{staticClass:"headline"},[t._v(t._s(t.name))]),t._v(" "),n("span",{staticClass:"style-name"},[t._v(t._s(t.style))])])]),t._v(" "),n("v-card-text",[n("div",[t._v(t._s(t.batch.description))]),t._v(" "),t.abv?n("div",[n("strong",[t._v("ABV:")]),t._v(" "+t._s(t.abv)+"%")]):t._e(),t._v(" "),"ontap"===t.status?n("div",[n("strong",[t._v("Remaining:")]),t._v(" "+t._s(t.remaining)+"\n        "),n("v-progress-linear",{attrs:{size:100,width:25,value:t.batchProgress,color:"white"}})],1):t._e()]),t._v(" "),n("v-card-actions",[n("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.batch.untappd,expression:"batch.untappd"}],staticClass:"hidden-sm-and-down",attrs:{dark:"",color:t.buttonColor,target:"_blank",href:t.batch.untappd}},[t._v("Check in")]),t._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.untappdAppLink,expression:"untappdAppLink"}],staticClass:"hidden-md-and-up",attrs:{dark:"",color:t.buttonColor,target:"_blank",href:t.untappdAppLink}},[t._v("Check in")])],1)],1)],1)},p=[],u={render:c,staticRenderFns:p},l=u,d=n("VU/8"),v=a,h=d(o,l,!1,v,null,null),_=h.exports,b=n("mtWM"),m=n.n(b),f={data:function(){return{title:"What to Brewery Pipeline",ontap:[],upcoming:[],kicked:[],updated:"",copyright:(new Date).getFullYear(),url:"http://up.jamesnweber.com/_kegs/api/model.php"}},created:function(){var t=this;m.a.get(t.url).then(function(e){var n=e.data.beers;t.ontap=n.filter(function(t){return"ontap"===t.status}).sort(function(t,e){return t.tap>e.tap?1:-1}),t.upcoming=n.filter(function(t){return["fermenting","planned"].includes(t.status)}),t.kicked=n.filter(function(t){return["kicked"].includes(t.status)});var a=new Date(e.data.updated);t.updated=a.toLocaleString()})},components:{BatchView:_}},g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-toolbar",{attrs:{fixed:"",app:"",dark:"",color:"primary"}},[n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}})],1),t._v(" "),n("v-content",[n("v-container",{attrs:{fluid:"","grid-list-xs":""}},[n("h1",{staticClass:"display-3 grey--text text--darken-1 text-xs-center"},[t._v("On tap")]),t._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},t._l(t.ontap,function(t){return n("batch-view",{key:t.name,attrs:{batch:t}})})),t._v(" "),n("h1",{staticClass:"display-3 grey--text text--darken-1 text-xs-center"},[t._v("On deck")]),t._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},t._l(t.upcoming,function(t,e){return n("batch-view",{key:t.name,attrs:{index:e,batch:t}})})),t._v(" "),n("h2",{staticClass:"display-1 grey--text text--darken-1 mt-2 pt-3 text-xs-center"},[t._v("Recently kicked")]),t._v(" "),n("v-layout",{staticClass:"ml-1"},[n("ul",t._l(t.kicked,function(e,a){return n("li",{key:a},[n("strong",[t._v(t._s(e.name))]),t._v(" "),n("em",[t._v(t._s(e.style))])])}))])],1)],1),t._v(" "),n("v-footer",{attrs:{fixed:"",app:""}},[n("span",[t._v("Updated: "+t._s(t.updated))]),t._v(" "),n("v-spacer"),t._v(" "),n("span",[t._v("© "+t._s(t.copyright))])],1)],1)},k=[],y={render:g,staticRenderFns:k},w=y,C=n("VU/8"),x=C(f,w,!1,null,null,null),P=x.exports;r.a.use(i.a),r.a.config.productionTip=!1,new r.a({el:"#app",template:"<App/>",components:{App:P}})},QCv7:function(t,e){},Zy6h:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.77037f6dfa3e2165325c.js.map