(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),o=n.n(a),s=n(6),r=n.n(s),i=(n(15),n.p+"static/media/logo.6ce24c58.svg"),l=(n(16),n(9)),d=n(3),u=n(2);function j(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}function b(e,t,n,c){var a;console.log(typeof c),console.log(c),c&&(a=c.content,JSON.stringify(c));var o=new XMLHttpRequest,s="http://localhost:8000/api".concat(t);o.responseType="json";var r=j("csrftoken");o.open(e,s),o.withCredentials=!0,r&&(o.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest"),o.setRequestHeader("X-CSRFToken",j("csrftoken"))),o.onload=function(){n(o.response,o.status)},o.onerror=function(e){console.log(e),console.log("hello"),n({message:"the request was error"},400)};var i,l=new FormData;c&&(c.action&&"like"===c.action?(l.append("id",c.id),l.append("action",c.action)):c.action&&"retweet"===c.action?(l.append("id",c.id),l.append("action",c.action),l.append("content",c.content)):c.action&&"unlike"===c.action?(l.append("id",c.id),l.append("action",c.action)):l.append("content",a),(i=console).log.apply(i,Object(d.a)(l)));o.send(l)}var m=n(8);function p(e){var t=e.tweet,n=e.action,a=e.didPerformAction,o=t.likes?t.likes:0,s=e.className?e.className:"btn btn-primary btn-sm",r=n.display?n.display:"Action",i="like"===n.type?"".concat(o," ").concat(r):r;return Object(c.jsxs)("button",{className:s,onClick:function(e){e.preventDefault();!function(e,t,n){b("POST","/tweets/action/",n,{id:e,action:t})}(t.id,n.type,(function(e,t){console.log(e,t),200!==t&&201!==t||!a||a(e,t)}))},children:[i," "]})}function f(e){var t=e.tweet;return t.parent?Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)("div",{className:"col-11 mx-auto p-3 border rounded",children:[Object(c.jsx)("p",{className:"mb-0 text-muted small",children:"Retweet"}),Object(c.jsx)(O,{hideActions:!0,className:" ",tweet:t.parent})]})}):null}function O(e){var t=e.tweet,n=e.didRetweet,s=e.hideActions,r=Object(a.useState)(e.tweet?e.tweet:null),i=Object(u.a)(r,2),l=i[0],d=i[1],j=e.className?e.className:"col-10 mx-auto col-md-6",b=window.location.pathname.match(Object(m.a)(/([0-9]+)/,{tweetid:1})),O=(b&&b.groups.tweetid,"$url(TweetId)"==="".concat(t.id)),w=function(e,t){200===t?d(e):201===t&&n&&n(e)};return Object(c.jsxs)("div",{className:j,children:[Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{children:[t.id," - ",t.content]}),Object(c.jsx)(f,{tweet:t})]}),Object(c.jsxs)("div",{className:"btn btn-group",children:[l&&!0!==s&&Object(c.jsxs)(o.a.Fragment,{children:[Object(c.jsx)(p,{tweet:l,didPerformAction:w,action:{type:"like",display:"Like"}}),Object(c.jsx)(p,{tweet:l,didPerformAction:w,action:{type:"unlike",display:"Unlike"}}),Object(c.jsx)(p,{tweet:l,didPerformAction:w,action:{type:"retweet",display:"Retweet"}})]}),!0===O?null:Object(c.jsx)("button",{className:"btn btn-outline-primary btn-small",onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id,"/")},children:"View"})]})]})}function w(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),o=n[0],s=n[1],r=Object(a.useState)([]),i=Object(u.a)(r,2),l=i[0],j=i[1],m=Object(a.useState)(!1),p=Object(u.a)(m,2),f=p[0],w=p[1];Object(a.useEffect)((function(){var t=Object(d.a)(e.newTweets).concat(o);t.length!==l.length&&j(t)}),[e.newTweets,l,o]),Object(a.useEffect)((function(){if(!1===f){!function(e,t){var n="/tweets/";e&&(n="/tweets/?username=".concat(e)),b("GET",n,t)}(e.username,(function(e,t){200===t?(s(e),w(!0)):alert("there was am error")}))}}),[o,f,w,e.username]);var h=function(e){var t=Object(d.a)(o);t.unshift(e),s(t);var n=Object(d.a)(o);n.unshift(e),j(n)};return l.map((function(e,t){return Object(c.jsx)(O,{tweet:e,didRetweet:h,className:"my-5 py-5 border bg-white text-dark"},"${index}-{item.id}")}))}function h(e){var t=o.a.createRef(),n=e.didTweet,a=function(e,t){201===t?n(e):(console.log(e),console.log("hello"),alert("an error occuredmam"))};return Object(c.jsx)("div",{className:e.className,children:Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault(),console.log(t.current.value);var n=t.current.value;b("POST","/tweets/create/",a,{content:n}),t.current.value=""},children:[Object(c.jsx)("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),Object(c.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Tweet "}),">"]})})}function v(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),o=n[0],s=n[1],r="false"!==e.canTweet;return Object(c.jsxs)("div",{className:e.className,children:[!0===r&&Object(c.jsx)(h,{didTweet:function(e,t){var n=Object(d.a)(o);n.unshift(e),s(n)},className:"col-12 mb-3"}),Object(c.jsx)(w,Object(l.a)({newTweets:o},e))]})}function x(e){var t=e.tweetId,n=Object(a.useState)(!1),o=Object(u.a)(n,2),s=o[0],r=o[1],i=Object(a.useState)(null),l=Object(u.a)(i,2),d=l[0],j=l[1],m=function(e,t){200===t?j(e):alert("error there was")};return Object(a.useEffect)((function(){!1===s&&(!function(e,t){b("GET","/tweets/".concat(e,"/"),t)}(t,m),r(!0))}),[t,s,r]),null===d?null:Object(c.jsx)(O,{tweet:d,className:e.className})}var g=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)("header",{className:"App-header",children:[Object(c.jsx)("img",{src:i,className:"App-logo",alt:"logo"}),Object(c.jsxs)("p",{children:["Edit ",Object(c.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(c.jsx)("div",{children:Object(c.jsx)(v,{})}),Object(c.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),o(e),s(e)}))},y=document.getElementById("root");y&&r.a.render(Object(c.jsx)(g,{}),y);var k=o.a.createElement,T=document.getElementById("tweetme-2");T&&r.a.render(k(v,T.dataset),T),document.querySelectorAll(".tweetme-2-detail").forEach((function(e){r.a.render(k(x,e.dataset),e)})),N()}},[[17,1,2]]]);
//# sourceMappingURL=main.e5c20792.chunk.js.map