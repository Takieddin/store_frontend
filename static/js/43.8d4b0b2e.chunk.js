(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[43],{1747:function(e,t,a){"use strict";a.r(t);var l=a(0),i=a.n(l),r=a(17),s=a(1206),c=a(348),n=a(568),u=a(1661),j=a.n(u),d=a(1377),b=a.n(d),o=a(1763),x=a(2),m=Object(s.a)({root:{width:200}});function O(){var e=m(),t=i.a.useState(30),a=Object(r.a)(t,2),l=a[0],s=a[1];return Object(x.jsxs)("div",{className:e.root,children:[Object(x.jsx)(n.a,{id:"continuous-slider",gutterBottom:!0,children:"Volume"}),Object(x.jsxs)(c.a,{container:!0,spacing:2,children:[Object(x.jsx)(c.a,{item:!0,children:Object(x.jsx)(j.a,{})}),Object(x.jsx)(c.a,{item:!0,xs:!0,children:Object(x.jsx)(o.a,{value:l,onChange:function(e,t){s(t)},"aria-labelledby":"continuous-slider"})}),Object(x.jsx)(c.a,{item:!0,children:Object(x.jsx)(b.a,{})})]}),Object(x.jsx)(o.a,{disabled:!0,defaultValue:30,"aria-labelledby":"continuous-slider"})]})}var v=Object(s.a)((function(e){return{root:{width:300},margin:{height:e.spacing(3)}}})),h=[{value:0,label:"0\xb0C"},{value:20,label:"20\xb0C"},{value:37,label:"37\xb0C"},{value:100,label:"100\xb0C"}];function g(e){return"".concat(e,"\xb0C")}function p(e){return h.findIndex((function(t){return t.value===e}))+1}function f(){var e=v();return Object(x.jsxs)("div",{className:e.root,children:[Object(x.jsx)(n.a,{id:"discrete-slider",gutterBottom:!0,children:"Temperature"}),Object(x.jsx)(o.a,{defaultValue:20,getAriaValueText:g,"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:10,marks:!0}),Object(x.jsx)("div",{className:e.margin}),Object(x.jsx)(n.a,{id:"discrete-slider-custom",gutterBottom:!0,children:"Custom marks"}),Object(x.jsx)(o.a,{defaultValue:20,getAriaValueText:g,"aria-labelledby":"discrete-slider-custom",step:10,valueLabelDisplay:"auto",marks:h}),Object(x.jsx)("div",{className:e.margin}),Object(x.jsx)(n.a,{id:"discrete-slider-restrict",gutterBottom:!0,children:"Restricted values"}),Object(x.jsx)(o.a,{defaultValue:20,valueLabelFormat:p,getAriaValueText:g,"aria-labelledby":"discrete-slider-restrict",step:null,valueLabelDisplay:"auto",marks:h}),Object(x.jsx)("div",{className:e.margin}),Object(x.jsx)(n.a,{id:"discrete-slider-always",gutterBottom:!0,children:"Always visible"}),Object(x.jsx)(o.a,{defaultValue:80,getAriaValueText:g,"aria-labelledby":"discrete-slider-always",step:10,marks:h,valueLabelDisplay:"on"})]})}var y=Object(s.a)({root:{width:300}});function V(e){return"".concat(e,"\xb0C")}function C(){var e=y(),t=i.a.useState([20,37]),a=Object(r.a)(t,2),l=a[0],s=a[1];return Object(x.jsxs)("div",{className:e.root,children:[Object(x.jsx)(n.a,{id:"range-slider",gutterBottom:!0,children:"Temperature range"}),Object(x.jsx)(o.a,{value:l,onChange:function(e,t){s(t)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",getAriaValueText:V})]})}var N=a(1176),w=Object(s.a)({root:{width:250},input:{width:42}});function T(){var e=w(),t=i.a.useState(30),a=Object(r.a)(t,2),l=a[0],s=a[1];return Object(x.jsxs)("div",{className:e.root,children:[Object(x.jsx)(n.a,{id:"input-slider",gutterBottom:!0,children:"Volume"}),Object(x.jsxs)(c.a,{container:!0,spacing:2,alignItems:"center",children:[Object(x.jsx)(c.a,{item:!0,children:Object(x.jsx)(b.a,{})}),Object(x.jsx)(c.a,{item:!0,xs:!0,children:Object(x.jsx)(o.a,{value:"number"===typeof l?l:0,onChange:function(e,t){s(t)},"aria-labelledby":"input-slider"})}),Object(x.jsx)(c.a,{item:!0,children:Object(x.jsx)(N.a,{className:e.input,value:l,margin:"dense",onChange:function(e){s(""===e.target.value?"":Number(e.target.value))},onBlur:function(){l<0?s(0):l>100&&s(100)},inputProps:{step:10,min:0,max:100,type:"number","aria-labelledby":"input-slider"}})})]})]})}var S=Object(s.a)({root:{height:300}});function A(e){return"".concat(e,"\xb0C")}var B=[{value:0,label:"0\xb0C"},{value:20,label:"20\xb0C"},{value:37,label:"37\xb0C"},{value:100,label:"100\xb0C"}];function k(){var e=S();return Object(x.jsxs)(i.a.Fragment,{children:[Object(x.jsx)(n.a,{id:"vertical-slider",gutterBottom:!0,children:"Temperature"}),Object(x.jsxs)("div",{className:e.root,children:[Object(x.jsx)(o.a,{orientation:"vertical",getAriaValueText:A,defaultValue:30,"aria-labelledby":"vertical-slider"}),Object(x.jsx)(o.a,{disabled:!0,orientation:"vertical",getAriaValueText:A,defaultValue:30,"aria-labelledby":"vertical-slider"}),Object(x.jsx)(o.a,{orientation:"vertical",defaultValue:[20,37],"aria-labelledby":"vertical-slider",getAriaValueText:A,marks:B})]})]})}var D=a(123);t.default=function(){return Object(x.jsxs)("div",{className:"m-sm-30",children:[Object(x.jsx)("div",{className:"mb-sm-30",children:Object(x.jsx)(D.a,{routeSegments:[{name:"Material",path:"/material"},{name:"Slider"}]})}),Object(x.jsx)(D.q,{title:"Continuous Slider",children:Object(x.jsx)(O,{})}),Object(x.jsx)("div",{className:"py-3"}),Object(x.jsx)(D.q,{title:"Discrete Slider",children:Object(x.jsx)(f,{})}),Object(x.jsx)("div",{className:"py-3"}),Object(x.jsx)(D.q,{title:"Range Slider",children:Object(x.jsx)(C,{})}),Object(x.jsx)("div",{className:"py-3"}),Object(x.jsx)(D.q,{title:"Slider with Input",children:Object(x.jsx)(T,{})}),Object(x.jsx)("div",{className:"py-3"}),Object(x.jsx)(D.q,{title:"Vertical Slider",children:Object(x.jsx)(k,{})})]})}}}]);
//# sourceMappingURL=43.8d4b0b2e.chunk.js.map