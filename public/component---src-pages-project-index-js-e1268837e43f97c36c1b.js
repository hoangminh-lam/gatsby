(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{Ysvp:function(e,t,n){"use strict";n.r(t),n.d(t,"projectPageQuery",(function(){return m}));n("q8oJ"),n("YbXK"),n("cFtU"),n("rzGZ"),n("m210"),n("4DPX"),n("6kNP"),n("8npG"),n("3nLz"),n("pJf4");var r=n("o0o1"),o=n.n(r),a=(n("HQhv"),n("ls82"),n("q1tI")),i=n.n(a),c=n("Wbzz"),u=n("9eSz"),l=n.n(u),s=n("Bl7J");n("oH8l");function f(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function d(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(l){return void n(l)}c.done?t(u):Promise.resolve(u).then(r,o)}t.default=function(e){var t=e.data,n=Object(a.useRef)(),r=Object(a.useState)(!1);r[0],r[1];Object(a.useEffect)((function(){var e=window.sessionStorage.getItem("jwt");e?n.current=e:navigate("/login")}),[]);var u=window.sessionStorage.getItem("user"),p=JSON.parse(u).userinfo.id;console.log(p);var m=function(e){var t=[];return e.map((function(e){return t.push(e.id)})),console.log(e),t},h=function(){var e,t=(e=o.a.mark((function e(t,r){var a,i,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.split("_")[1],i=m(r),c=[].concat(f(i),[p]),console.log(c),e.next=6,fetch("http://localhost:1337/projects/"+a,{method:"PUT",headers:{Authorization:"Bearer "+n.current,"Content-Type":"application/json"},body:JSON.stringify({likes:c})}).then((function(e){return e.json()}));case 6:e.sent;case 7:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){d(a,r,o,i,c,"next",e)}function c(e){d(a,r,o,i,c,"throw",e)}i(void 0)}))});return function(e,n){return t.apply(this,arguments)}}();return i.a.createElement(s.a,null,i.a.createElement("h1",null,"Project情報"),i.a.createElement("ul",null,t.allStrapiProject.edges.map((function(e){return i.a.createElement("li",{key:e.node.id},i.a.createElement("h2",null,i.a.createElement(c.Link,{to:"/project/"+e.node.id},e.node.name)),i.a.createElement(l.a,{fixed:e.node.logo.childImageSharp.fixed}),i.a.createElement("p",{className:"button-like",onClick:function(){return h(e.node.id,e.node.likes)}},"気になる"))}))),i.a.createElement("p",null,i.a.createElement(c.Link,{to:"/"},"Top Page")))};var m="4040455435"},oH8l:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-project-index-js-e1268837e43f97c36c1b.js.map