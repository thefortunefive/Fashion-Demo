var gt=Object.defineProperty;var Ne=t=>{throw TypeError(t)};var mt=(t,e,s)=>e in t?gt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var u=(t,e,s)=>mt(t,typeof e!="symbol"?e+"":e,s),Le=(t,e,s)=>e.has(t)||Ne("Cannot "+s);var r=(t,e,s)=>(Le(t,e,"read from private field"),s?s.call(t):e.get(t)),v=(t,e,s)=>e.has(t)?Ne("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),p=(t,e,s,i)=>(Le(t,e,"write to private field"),i?i.call(t,s):e.set(t,s),s),g=(t,e,s)=>(Le(t,e,"access private method"),s);var Ve=(t,e,s,i)=>({set _(a){p(t,e,a,s)},get _(){return r(t,e,i)}});var $e=(t,e,s)=>(i,a)=>{let o=-1;return n(0);async function n(d){if(d<=o)throw new Error("next() called multiple times");o=d;let l,c=!1,h;if(t[d]?(h=t[d][0][0],i.req.routeIndex=d):h=d===t.length&&a||void 0,h)try{l=await h(i,()=>n(d+1))}catch(f){if(f instanceof Error&&e)i.error=f,l=await e(f,i),c=!0;else throw f}else i.finalized===!1&&s&&(l=await s(i));return l&&(i.finalized===!1||c)&&(i.res=l),i}},wt=Symbol(),xt=async(t,e=Object.create(null))=>{const{all:s=!1,dot:i=!1}=e,o=(t instanceof st?t.raw.headers:t.headers).get("Content-Type");return o!=null&&o.startsWith("multipart/form-data")||o!=null&&o.startsWith("application/x-www-form-urlencoded")?bt(t,{all:s,dot:i}):{}};async function bt(t,e){const s=await t.formData();return s?yt(s,e):{}}function yt(t,e){const s=Object.create(null);return t.forEach((i,a)=>{e.all||a.endsWith("[]")?St(s,a,i):s[a]=i}),e.dot&&Object.entries(s).forEach(([i,a])=>{i.includes(".")&&(kt(s,i,a),delete s[i])}),s}var St=(t,e,s)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(s):t[e]=[t[e],s]:e.endsWith("[]")?t[e]=[s]:t[e]=s},kt=(t,e,s)=>{let i=t;const a=e.split(".");a.forEach((o,n)=>{n===a.length-1?i[o]=s:((!i[o]||typeof i[o]!="object"||Array.isArray(i[o])||i[o]instanceof File)&&(i[o]=Object.create(null)),i=i[o])})},Je=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Et=t=>{const{groups:e,path:s}=Rt(t),i=Je(s);return Ot(i,e)},Rt=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(s,i)=>{const a=`@${i}`;return e.push([a,s]),a}),{groups:e,path:t}},Ot=(t,e)=>{for(let s=e.length-1;s>=0;s--){const[i]=e[s];for(let a=t.length-1;a>=0;a--)if(t[a].includes(i)){t[a]=t[a].replace(i,e[s][1]);break}}return t},Ee={},Pt=(t,e)=>{if(t==="*")return"*";const s=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const i=`${t}#${e}`;return Ee[i]||(s[2]?Ee[i]=e&&e[0]!==":"&&e[0]!=="*"?[i,s[1],new RegExp(`^${s[2]}(?=/${e})`)]:[t,s[1],new RegExp(`^${s[2]}$`)]:Ee[i]=[t,s[1],!0]),Ee[i]}return null},He=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return e(s)}catch{return s}})}},Ct=t=>He(t,decodeURI),Qe=t=>{const e=t.url,s=e.indexOf("/",e.indexOf(":")+4);let i=s;for(;i<e.length;i++){const a=e.charCodeAt(i);if(a===37){const o=e.indexOf("?",i),n=e.slice(s,o===-1?void 0:o);return Ct(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(a===63)break}return e.slice(s,i)},It=t=>{const e=Qe(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},se=(t,e,...s)=>(s.length&&(e=se(e,...s)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Ze=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),s=[];let i="";return e.forEach(a=>{if(a!==""&&!/\:/.test(a))i+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){s.length===0&&i===""?s.push("/"):s.push(i);const o=a.replace("?","");i+="/"+o,s.push(i)}else i+="/"+a}),s.filter((a,o,n)=>n.indexOf(a)===o)},De=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?He(t,tt):t):t,et=(t,e,s)=>{let i;if(!s&&e&&!/[%+]/.test(e)){let n=t.indexOf("?",8);if(n===-1)return;for(t.startsWith(e,n+1)||(n=t.indexOf(`&${e}`,n+1));n!==-1;){const d=t.charCodeAt(n+e.length+1);if(d===61){const l=n+e.length+2,c=t.indexOf("&",l);return De(t.slice(l,c===-1?void 0:c))}else if(d==38||isNaN(d))return"";n=t.indexOf(`&${e}`,n+1)}if(i=/[%+]/.test(t),!i)return}const a={};i??(i=/[%+]/.test(t));let o=t.indexOf("?",8);for(;o!==-1;){const n=t.indexOf("&",o+1);let d=t.indexOf("=",o);d>n&&n!==-1&&(d=-1);let l=t.slice(o+1,d===-1?n===-1?void 0:n:d);if(i&&(l=De(l)),o=n,l==="")continue;let c;d===-1?c="":(c=t.slice(d+1,n===-1?void 0:n),i&&(c=De(c))),s?(a[l]&&Array.isArray(a[l])||(a[l]=[]),a[l].push(c)):a[l]??(a[l]=c)}return e?a[e]:a},jt=et,At=(t,e)=>et(t,e,!0),tt=decodeURIComponent,Me=t=>He(t,tt),re,P,_,it,at,Te,$,qe,st=(qe=class{constructor(t,e="/",s=[[]]){v(this,_);u(this,"raw");v(this,re);v(this,P);u(this,"routeIndex",0);u(this,"path");u(this,"bodyCache",{});v(this,$,t=>{const{bodyCache:e,raw:s}=this,i=e[t];if(i)return i;const a=Object.keys(e)[0];return a?e[a].then(o=>(a==="json"&&(o=JSON.stringify(o)),new Response(o)[t]())):e[t]=s[t]()});this.raw=t,this.path=e,p(this,P,s),p(this,re,{})}param(t){return t?g(this,_,it).call(this,t):g(this,_,at).call(this)}query(t){return jt(this.url,t)}queries(t){return At(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((s,i)=>{e[i]=s}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await xt(this,t))}json(){return r(this,$).call(this,"text").then(t=>JSON.parse(t))}text(){return r(this,$).call(this,"text")}arrayBuffer(){return r(this,$).call(this,"arrayBuffer")}blob(){return r(this,$).call(this,"blob")}formData(){return r(this,$).call(this,"formData")}addValidatedData(t,e){r(this,re)[t]=e}valid(t){return r(this,re)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[wt](){return r(this,P)}get matchedRoutes(){return r(this,P)[0].map(([[,t]])=>t)}get routePath(){return r(this,P)[0].map(([[,t]])=>t)[this.routeIndex].path}},re=new WeakMap,P=new WeakMap,_=new WeakSet,it=function(t){const e=r(this,P)[0][this.routeIndex][1][t],s=g(this,_,Te).call(this,e);return s&&/\%/.test(s)?Me(s):s},at=function(){const t={},e=Object.keys(r(this,P)[0][this.routeIndex][1]);for(const s of e){const i=g(this,_,Te).call(this,r(this,P)[0][this.routeIndex][1][s]);i!==void 0&&(t[s]=/\%/.test(i)?Me(i):i)}return t},Te=function(t){return r(this,P)[1]?r(this,P)[1][t]:t},$=new WeakMap,qe),Lt={Stringify:1},rt=async(t,e,s,i,a)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const o=t.callbacks;return o!=null&&o.length?(a?a[0]+=t:a=[t],Promise.all(o.map(d=>d({phase:e,buffer:a,context:i}))).then(d=>Promise.all(d.filter(Boolean).map(l=>rt(l,e,!1,i,a))).then(()=>a[0]))):Promise.resolve(t)},Dt="text/plain; charset=UTF-8",Fe=(t,e)=>({"Content-Type":t,...e}),ge,me,D,oe,F,R,we,ne,ce,Y,xe,be,M,ie,Be,Ft=(Be=class{constructor(t,e){v(this,M);v(this,ge);v(this,me);u(this,"env",{});v(this,D);u(this,"finalized",!1);u(this,"error");v(this,oe);v(this,F);v(this,R);v(this,we);v(this,ne);v(this,ce);v(this,Y);v(this,xe);v(this,be);u(this,"render",(...t)=>(r(this,ne)??p(this,ne,e=>this.html(e)),r(this,ne).call(this,...t)));u(this,"setLayout",t=>p(this,we,t));u(this,"getLayout",()=>r(this,we));u(this,"setRenderer",t=>{p(this,ne,t)});u(this,"header",(t,e,s)=>{this.finalized&&p(this,R,new Response(r(this,R).body,r(this,R)));const i=r(this,R)?r(this,R).headers:r(this,Y)??p(this,Y,new Headers);e===void 0?i.delete(t):s!=null&&s.append?i.append(t,e):i.set(t,e)});u(this,"status",t=>{p(this,oe,t)});u(this,"set",(t,e)=>{r(this,D)??p(this,D,new Map),r(this,D).set(t,e)});u(this,"get",t=>r(this,D)?r(this,D).get(t):void 0);u(this,"newResponse",(...t)=>g(this,M,ie).call(this,...t));u(this,"body",(t,e,s)=>g(this,M,ie).call(this,t,e,s));u(this,"text",(t,e,s)=>!r(this,Y)&&!r(this,oe)&&!e&&!s&&!this.finalized?new Response(t):g(this,M,ie).call(this,t,e,Fe(Dt,s)));u(this,"json",(t,e,s)=>g(this,M,ie).call(this,JSON.stringify(t),e,Fe("application/json",s)));u(this,"html",(t,e,s)=>{const i=a=>g(this,M,ie).call(this,a,e,Fe("text/html; charset=UTF-8",s));return typeof t=="object"?rt(t,Lt.Stringify,!1,{}).then(i):i(t)});u(this,"redirect",(t,e)=>{const s=String(t);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,e??302)});u(this,"notFound",()=>(r(this,ce)??p(this,ce,()=>new Response),r(this,ce).call(this,this)));p(this,ge,t),e&&(p(this,F,e.executionCtx),this.env=e.env,p(this,ce,e.notFoundHandler),p(this,be,e.path),p(this,xe,e.matchResult))}get req(){return r(this,me)??p(this,me,new st(r(this,ge),r(this,be),r(this,xe))),r(this,me)}get event(){if(r(this,F)&&"respondWith"in r(this,F))return r(this,F);throw Error("This context has no FetchEvent")}get executionCtx(){if(r(this,F))return r(this,F);throw Error("This context has no ExecutionContext")}get res(){return r(this,R)||p(this,R,new Response(null,{headers:r(this,Y)??p(this,Y,new Headers)}))}set res(t){if(r(this,R)&&t){t=new Response(t.body,t);for(const[e,s]of r(this,R).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const i=r(this,R).headers.getSetCookie();t.headers.delete("set-cookie");for(const a of i)t.headers.append("set-cookie",a)}else t.headers.set(e,s)}p(this,R,t),this.finalized=!0}get var(){return r(this,D)?Object.fromEntries(r(this,D)):{}}},ge=new WeakMap,me=new WeakMap,D=new WeakMap,oe=new WeakMap,F=new WeakMap,R=new WeakMap,we=new WeakMap,ne=new WeakMap,ce=new WeakMap,Y=new WeakMap,xe=new WeakMap,be=new WeakMap,M=new WeakSet,ie=function(t,e,s){const i=r(this,R)?new Headers(r(this,R).headers):r(this,Y)??new Headers;if(typeof e=="object"&&"headers"in e){const o=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[n,d]of o)n.toLowerCase()==="set-cookie"?i.append(n,d):i.set(n,d)}if(s)for(const[o,n]of Object.entries(s))if(typeof n=="string")i.set(o,n);else{i.delete(o);for(const d of n)i.append(o,d)}const a=typeof e=="number"?e:(e==null?void 0:e.status)??r(this,oe);return new Response(t,{status:a,headers:i})},Be),x="ALL",Tt="all",Ht=["get","post","put","delete","options","patch"],ot="Can not add a route since the matcher is already built.",nt=class extends Error{},_t="__COMPOSED_HANDLER",zt=t=>t.text("404 Not Found",404),Ue=(t,e)=>{if("getResponse"in t){const s=t.getResponse();return e.newResponse(s.body,s)}return console.error(t),e.text("Internal Server Error",500)},C,b,ct,I,K,Re,Oe,le,Nt=(le=class{constructor(e={}){v(this,b);u(this,"get");u(this,"post");u(this,"put");u(this,"delete");u(this,"options");u(this,"patch");u(this,"all");u(this,"on");u(this,"use");u(this,"router");u(this,"getPath");u(this,"_basePath","/");v(this,C,"/");u(this,"routes",[]);v(this,I,zt);u(this,"errorHandler",Ue);u(this,"onError",e=>(this.errorHandler=e,this));u(this,"notFound",e=>(p(this,I,e),this));u(this,"fetch",(e,...s)=>g(this,b,Oe).call(this,e,s[1],s[0],e.method));u(this,"request",(e,s,i,a)=>e instanceof Request?this.fetch(s?new Request(e,s):e,i,a):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${se("/",e)}`,s),i,a)));u(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(g(this,b,Oe).call(this,e.request,e,void 0,e.request.method))})});[...Ht,Tt].forEach(o=>{this[o]=(n,...d)=>(typeof n=="string"?p(this,C,n):g(this,b,K).call(this,o,r(this,C),n),d.forEach(l=>{g(this,b,K).call(this,o,r(this,C),l)}),this)}),this.on=(o,n,...d)=>{for(const l of[n].flat()){p(this,C,l);for(const c of[o].flat())d.map(h=>{g(this,b,K).call(this,c.toUpperCase(),r(this,C),h)})}return this},this.use=(o,...n)=>(typeof o=="string"?p(this,C,o):(p(this,C,"*"),n.unshift(o)),n.forEach(d=>{g(this,b,K).call(this,x,r(this,C),d)}),this);const{strict:i,...a}=e;Object.assign(this,a),this.getPath=i??!0?e.getPath??Qe:It}route(e,s){const i=this.basePath(e);return s.routes.map(a=>{var n;let o;s.errorHandler===Ue?o=a.handler:(o=async(d,l)=>(await $e([],s.errorHandler)(d,()=>a.handler(d,l))).res,o[_t]=a.handler),g(n=i,b,K).call(n,a.method,a.path,o)}),this}basePath(e){const s=g(this,b,ct).call(this);return s._basePath=se(this._basePath,e),s}mount(e,s,i){let a,o;i&&(typeof i=="function"?o=i:(o=i.optionHandler,i.replaceRequest===!1?a=l=>l:a=i.replaceRequest));const n=o?l=>{const c=o(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};a||(a=(()=>{const l=se(this._basePath,e),c=l==="/"?0:l.length;return h=>{const f=new URL(h.url);return f.pathname=f.pathname.slice(c)||"/",new Request(f,h)}})());const d=async(l,c)=>{const h=await s(a(l.req.raw),...n(l));if(h)return h;await c()};return g(this,b,K).call(this,x,se(e,"*"),d),this}},C=new WeakMap,b=new WeakSet,ct=function(){const e=new le({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,p(e,I,r(this,I)),e.routes=this.routes,e},I=new WeakMap,K=function(e,s,i){e=e.toUpperCase(),s=se(this._basePath,s);const a={basePath:this._basePath,path:s,method:e,handler:i};this.router.add(e,s,[i,a]),this.routes.push(a)},Re=function(e,s){if(e instanceof Error)return this.errorHandler(e,s);throw e},Oe=function(e,s,i,a){if(a==="HEAD")return(async()=>new Response(null,await g(this,b,Oe).call(this,e,s,i,"GET")))();const o=this.getPath(e,{env:i}),n=this.router.match(a,o),d=new Ft(e,{path:o,matchResult:n,env:i,executionCtx:s,notFoundHandler:r(this,I)});if(n[0].length===1){let c;try{c=n[0][0][0][0](d,async()=>{d.res=await r(this,I).call(this,d)})}catch(h){return g(this,b,Re).call(this,h,d)}return c instanceof Promise?c.then(h=>h||(d.finalized?d.res:r(this,I).call(this,d))).catch(h=>g(this,b,Re).call(this,h,d)):c??r(this,I).call(this,d)}const l=$e(n[0],this.errorHandler,r(this,I));return(async()=>{try{const c=await l(d);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return g(this,b,Re).call(this,c,d)}})()},le),lt=[];function Vt(t,e){const s=this.buildAllMatchers(),i=((a,o)=>{const n=s[a]||s[x],d=n[2][o];if(d)return d;const l=o.match(n[0]);if(!l)return[[],lt];const c=l.indexOf("",1);return[n[1][c],l]});return this.match=i,i(t,e)}var Ce="[^/]+",fe=".*",ve="(?:|/.*)",ae=Symbol(),$t=new Set(".\\+*[^]$()");function Mt(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===fe||t===ve?1:e===fe||e===ve?-1:t===Ce?1:e===Ce?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var X,J,j,ee,Ut=(ee=class{constructor(){v(this,X);v(this,J);v(this,j,Object.create(null))}insert(e,s,i,a,o){if(e.length===0){if(r(this,X)!==void 0)throw ae;if(o)return;p(this,X,s);return}const[n,...d]=e,l=n==="*"?d.length===0?["","",fe]:["","",Ce]:n==="/*"?["","",ve]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const h=l[1];let f=l[2]||Ce;if(h&&l[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw ae;if(c=r(this,j)[f],!c){if(Object.keys(r(this,j)).some(m=>m!==fe&&m!==ve))throw ae;if(o)return;c=r(this,j)[f]=new ee,h!==""&&p(c,J,a.varIndex++)}!o&&h!==""&&i.push([h,r(c,J)])}else if(c=r(this,j)[n],!c){if(Object.keys(r(this,j)).some(h=>h.length>1&&h!==fe&&h!==ve))throw ae;if(o)return;c=r(this,j)[n]=new ee}c.insert(d,s,i,a,o)}buildRegExpStr(){const s=Object.keys(r(this,j)).sort(Mt).map(i=>{const a=r(this,j)[i];return(typeof r(a,J)=="number"?`(${i})@${r(a,J)}`:$t.has(i)?`\\${i}`:i)+a.buildRegExpStr()});return typeof r(this,X)=="number"&&s.unshift(`#${r(this,X)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},X=new WeakMap,J=new WeakMap,j=new WeakMap,ee),Ie,ye,Ke,Wt=(Ke=class{constructor(){v(this,Ie,{varIndex:0});v(this,ye,new Ut)}insert(t,e,s){const i=[],a=[];for(let n=0;;){let d=!1;if(t=t.replace(/\{[^}]+\}/g,l=>{const c=`@\\${n}`;return a[n]=[c,l],n++,d=!0,c}),!d)break}const o=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=a.length-1;n>=0;n--){const[d]=a[n];for(let l=o.length-1;l>=0;l--)if(o[l].indexOf(d)!==-1){o[l]=o[l].replace(d,a[n][1]);break}}return r(this,ye).insert(o,e,i,r(this,Ie),s),i}buildRegExp(){let t=r(this,ye).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const s=[],i=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,o,n)=>o!==void 0?(s[++e]=Number(o),"$()"):(n!==void 0&&(i[Number(n)]=++e),"")),[new RegExp(`^${t}`),s,i]}},Ie=new WeakMap,ye=new WeakMap,Ke),qt=[/^$/,[],Object.create(null)],Pe=Object.create(null);function dt(t){return Pe[t]??(Pe[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Bt(){Pe=Object.create(null)}function Kt(t){var c;const e=new Wt,s=[];if(t.length===0)return qt;const i=t.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,f],[m,y])=>h?1:m?-1:f.length-y.length),a=Object.create(null);for(let h=0,f=-1,m=i.length;h<m;h++){const[y,O,z]=i[h];y?a[O]=[z.map(([E])=>[E,Object.create(null)]),lt]:f++;let w;try{w=e.insert(O,f,y)}catch(E){throw E===ae?new nt(O):E}y||(s[f]=z.map(([E,N])=>{const Se=Object.create(null);for(N-=1;N>=0;N--){const[ke,A]=w[N];Se[ke]=A}return[E,Se]}))}const[o,n,d]=e.buildRegExp();for(let h=0,f=s.length;h<f;h++)for(let m=0,y=s[h].length;m<y;m++){const O=(c=s[h][m])==null?void 0:c[1];if(!O)continue;const z=Object.keys(O);for(let w=0,E=z.length;w<E;w++)O[z[w]]=d[O[z[w]]]}const l=[];for(const h in n)l[h]=s[n[h]];return[o,l,a]}function te(t,e){if(t){for(const s of Object.keys(t).sort((i,a)=>a.length-i.length))if(dt(s).test(e))return[...t[s]]}}var U,W,je,ht,Ge,Gt=(Ge=class{constructor(){v(this,je);u(this,"name","RegExpRouter");v(this,U);v(this,W);u(this,"match",Vt);p(this,U,{[x]:Object.create(null)}),p(this,W,{[x]:Object.create(null)})}add(t,e,s){var d;const i=r(this,U),a=r(this,W);if(!i||!a)throw new Error(ot);i[t]||[i,a].forEach(l=>{l[t]=Object.create(null),Object.keys(l[x]).forEach(c=>{l[t][c]=[...l[x][c]]})}),e==="/*"&&(e="*");const o=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const l=dt(e);t===x?Object.keys(i).forEach(c=>{var h;(h=i[c])[e]||(h[e]=te(i[c],e)||te(i[x],e)||[])}):(d=i[t])[e]||(d[e]=te(i[t],e)||te(i[x],e)||[]),Object.keys(i).forEach(c=>{(t===x||t===c)&&Object.keys(i[c]).forEach(h=>{l.test(h)&&i[c][h].push([s,o])})}),Object.keys(a).forEach(c=>{(t===x||t===c)&&Object.keys(a[c]).forEach(h=>l.test(h)&&a[c][h].push([s,o]))});return}const n=Ze(e)||[e];for(let l=0,c=n.length;l<c;l++){const h=n[l];Object.keys(a).forEach(f=>{var m;(t===x||t===f)&&((m=a[f])[h]||(m[h]=[...te(i[f],h)||te(i[x],h)||[]]),a[f][h].push([s,o-c+l+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(r(this,W)).concat(Object.keys(r(this,U))).forEach(e=>{t[e]||(t[e]=g(this,je,ht).call(this,e))}),p(this,U,p(this,W,void 0)),Bt(),t}},U=new WeakMap,W=new WeakMap,je=new WeakSet,ht=function(t){const e=[];let s=t===x;return[r(this,U),r(this,W)].forEach(i=>{const a=i[t]?Object.keys(i[t]).map(o=>[o,i[t][o]]):[];a.length!==0?(s||(s=!0),e.push(...a)):t!==x&&e.push(...Object.keys(i[x]).map(o=>[o,i[x][o]]))}),s?Kt(e):null},Ge),q,T,Ye,Yt=(Ye=class{constructor(t){u(this,"name","SmartRouter");v(this,q,[]);v(this,T,[]);p(this,q,t.routers)}add(t,e,s){if(!r(this,T))throw new Error(ot);r(this,T).push([t,e,s])}match(t,e){if(!r(this,T))throw new Error("Fatal error");const s=r(this,q),i=r(this,T),a=s.length;let o=0,n;for(;o<a;o++){const d=s[o];try{for(let l=0,c=i.length;l<c;l++)d.add(...i[l]);n=d.match(t,e)}catch(l){if(l instanceof nt)continue;throw l}this.match=d.match.bind(d),p(this,q,[d]),p(this,T,void 0);break}if(o===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(r(this,T)||r(this,q).length!==1)throw new Error("No active router has been determined yet.");return r(this,q)[0]}},q=new WeakMap,T=new WeakMap,Ye),ue=Object.create(null),B,k,Q,de,S,H,G,he,Xt=(he=class{constructor(e,s,i){v(this,H);v(this,B);v(this,k);v(this,Q);v(this,de,0);v(this,S,ue);if(p(this,k,i||Object.create(null)),p(this,B,[]),e&&s){const a=Object.create(null);a[e]={handler:s,possibleKeys:[],score:0},p(this,B,[a])}p(this,Q,[])}insert(e,s,i){p(this,de,++Ve(this,de)._);let a=this;const o=Et(s),n=[];for(let d=0,l=o.length;d<l;d++){const c=o[d],h=o[d+1],f=Pt(c,h),m=Array.isArray(f)?f[0]:c;if(m in r(a,k)){a=r(a,k)[m],f&&n.push(f[1]);continue}r(a,k)[m]=new he,f&&(r(a,Q).push(f),n.push(f[1])),a=r(a,k)[m]}return r(a,B).push({[e]:{handler:i,possibleKeys:n.filter((d,l,c)=>c.indexOf(d)===l),score:r(this,de)}}),a}search(e,s){var l;const i=[];p(this,S,ue);let o=[this];const n=Je(s),d=[];for(let c=0,h=n.length;c<h;c++){const f=n[c],m=c===h-1,y=[];for(let O=0,z=o.length;O<z;O++){const w=o[O],E=r(w,k)[f];E&&(p(E,S,r(w,S)),m?(r(E,k)["*"]&&i.push(...g(this,H,G).call(this,r(E,k)["*"],e,r(w,S))),i.push(...g(this,H,G).call(this,E,e,r(w,S)))):y.push(E));for(let N=0,Se=r(w,Q).length;N<Se;N++){const ke=r(w,Q)[N],A=r(w,S)===ue?{}:{...r(w,S)};if(ke==="*"){const V=r(w,k)["*"];V&&(i.push(...g(this,H,G).call(this,V,e,r(w,S))),p(V,S,A),y.push(V));continue}const[ft,ze,pe]=ke;if(!f&&!(pe instanceof RegExp))continue;const L=r(w,k)[ft],vt=n.slice(c).join("/");if(pe instanceof RegExp){const V=pe.exec(vt);if(V){if(A[ze]=V[0],i.push(...g(this,H,G).call(this,L,e,r(w,S),A)),Object.keys(r(L,k)).length){p(L,S,A);const Ae=((l=V[0].match(/\//))==null?void 0:l.length)??0;(d[Ae]||(d[Ae]=[])).push(L)}continue}}(pe===!0||pe.test(f))&&(A[ze]=f,m?(i.push(...g(this,H,G).call(this,L,e,A,r(w,S))),r(L,k)["*"]&&i.push(...g(this,H,G).call(this,r(L,k)["*"],e,A,r(w,S)))):(p(L,S,A),y.push(L)))}}o=y.concat(d.shift()??[])}return i.length>1&&i.sort((c,h)=>c.score-h.score),[i.map(({handler:c,params:h})=>[c,h])]}},B=new WeakMap,k=new WeakMap,Q=new WeakMap,de=new WeakMap,S=new WeakMap,H=new WeakSet,G=function(e,s,i,a){const o=[];for(let n=0,d=r(e,B).length;n<d;n++){const l=r(e,B)[n],c=l[s]||l[x],h={};if(c!==void 0&&(c.params=Object.create(null),o.push(c),i!==ue||a&&a!==ue))for(let f=0,m=c.possibleKeys.length;f<m;f++){const y=c.possibleKeys[f],O=h[c.score];c.params[y]=a!=null&&a[y]&&!O?a[y]:i[y]??(a==null?void 0:a[y]),h[c.score]=!0}}return o},he),Z,Xe,Jt=(Xe=class{constructor(){u(this,"name","TrieRouter");v(this,Z);p(this,Z,new Xt)}add(t,e,s){const i=Ze(e);if(i){for(let a=0,o=i.length;a<o;a++)r(this,Z).insert(t,i[a],s);return}r(this,Z).insert(t,e,s)}match(t,e){return r(this,Z).search(t,e)}},Z=new WeakMap,Xe),pt=class extends Nt{constructor(t={}){super(t),this.router=t.router??new Yt({routers:[new Gt,new Jt]})}},Qt=()=>async t=>{const s=await t.env.ASSETS.fetch(t.req.raw);return s.status===404?t.notFound():s};const _e=new pt;_e.use("/static/*",Qt());_e.get("/",t=>t.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fifth Ave Fashion Content Studio</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --ss-black: #1a1a1a;
            --ss-dark: #2d2d2d;
            --ss-gray: #767676;
            --ss-light-gray: #f5f5f5;
            --ss-white: #ffffff;
            --ss-accent: #c9a961;
            --ss-navy: #1e3a5f;
            --ss-cream: #f5f0e8;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--ss-white);
            color: var(--ss-black);
            line-height: 1.6;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--ss-white);
            z-index: 1000;
            border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .nav-inner {
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 72px;
        }

        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--ss-black);
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 40px;
        }

        .nav-links a {
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--ss-black);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--ss-gray);
        }

        .nav-badge {
            background: var(--ss-accent);
            color: var(--ss-white);
            font-size: 9px;
            padding: 3px 8px;
            border-radius: 2px;
            margin-left: 8px;
            font-weight: 600;
        }

        /* Hero */
        .hero {
            margin-top: 72px;
            padding: 100px 60px;
            background: linear-gradient(135deg, var(--ss-cream) 0%, var(--ss-white) 100%);
            text-align: center;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: 52px;
            font-weight: 500;
            line-height: 1.2;
            margin-bottom: 20px;
            color: var(--ss-black);
            max-width: 820px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-subtitle {
            font-size: 17px;
            color: var(--ss-gray);
            max-width: 640px;
            margin: 0 auto;
            font-weight: 300;
            line-height: 1.7;
        }

        /* Shared Section Styles */
        .section {
            padding: 80px 60px;
        }

        .section-dark {
            background: var(--ss-black);
            color: var(--ss-white);
        }

        .section-cream {
            background: var(--ss-cream);
        }

        .section-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 60px;
        }

        .section-tag {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--ss-accent);
            margin-bottom: 12px;
        }

        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 500;
            margin-bottom: 12px;
        }

        .section-subtitle {
            font-size: 15px;
            color: var(--ss-gray);
            font-weight: 300;
        }

        .section-dark .section-subtitle {
            color: rgba(255,255,255,0.6);
        }

        /* Showcase Intro */
        .showcase-intro {
            text-align: center;
            max-width: 700px;
            margin: 0 auto 72px;
        }

        .showcase-intro-title {
            font-family: 'Playfair Display', serif;
            font-size: 30px;
            font-weight: 500;
            color: var(--ss-black);
            margin-bottom: 14px;
            line-height: 1.3;
        }

        .showcase-intro-sub {
            font-size: 15px;
            color: var(--ss-gray);
            font-weight: 300;
            line-height: 1.7;
        }

        /* Product Rows */
        .product-row {
            max-width: 1400px;
            margin: 0 auto 0;
        }

        .product-row-title {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            text-align: center;
            margin-bottom: 40px;
            color: var(--ss-black);
        }

        .product-row-divider {
            border: none;
            border-top: 1px solid rgba(0,0,0,0.07);
            margin: 72px auto;
            max-width: 1400px;
        }

        /* 3-column grid */
        .showcase-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
        }

        .showcase-item {
            background: var(--ss-white);
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .showcase-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 18px 50px rgba(0,0,0,0.12);
        }

        /* Source image treatment */
        .showcase-item.is-source .showcase-media {
            background: #eeebe5;
        }

        .showcase-item.is-source .showcase-media img {
            object-fit: contain;
            padding: 20px;
        }

        .showcase-media {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            background: var(--ss-light-gray);
        }

        .showcase-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .showcase-media video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
        }

        /* Badge labels */
        .comparison-label {
            position: absolute;
            top: 14px;
            left: 14px;
            padding: 7px 14px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-radius: 2px;
            z-index: 2;
        }

        .label-source {
            background: var(--ss-black);
            color: var(--ss-white);
        }

        .label-enhanced {
            background: var(--ss-accent);
            color: var(--ss-white);
        }

        .label-video {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: var(--ss-white);
        }

        /* Play button */
        .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70px;
            height: 70px;
            background: rgba(255,255,255,0.95);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .play-button:hover {
            transform: translate(-50%, -50%) scale(1.1);
            background: var(--ss-white);
        }

        .play-button i {
            font-size: 24px;
            color: var(--ss-black);
            margin-left: 4px;
        }

        .play-button.playing i:before {
            content: "\\f04c";
        }

        /* Caption below each item */
        .showcase-info {
            padding: 18px 20px;
            text-align: center;
        }

        .showcase-type {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--ss-gray);
            margin-bottom: 5px;
        }

        .showcase-title {
            font-family: 'Playfair Display', serif;
            font-size: 16px;
            color: var(--ss-black);
        }

        /* How It Works */
        .steps-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .step-card {
            text-align: center;
            padding: 40px 30px;
            background: rgba(255,255,255,0.7);
            border-radius: 4px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        .step-number {
            font-family: 'Playfair Display', serif;
            font-size: 56px;
            font-weight: 700;
            color: var(--ss-accent);
            line-height: 1;
            margin-bottom: 16px;
        }

        .step-title {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 12px;
            color: var(--ss-black);
        }

        .step-desc {
            font-size: 14px;
            color: var(--ss-gray);
            line-height: 1.75;
            font-weight: 300;
        }

        /* Business Case */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .stat-card {
            text-align: center;
            padding: 40px 20px;
            background: rgba(255,255,255,0.04);
            border-radius: 4px;
            border-top: 2px solid var(--ss-accent);
        }

        .stat-number {
            font-family: 'Playfair Display', serif;
            font-size: 64px;
            font-weight: 700;
            color: var(--ss-accent);
            line-height: 1;
            margin-bottom: 14px;
        }

        .stat-label {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--ss-white);
            margin-bottom: 8px;
        }

        .stat-desc {
            font-size: 13px;
            color: rgba(255,255,255,0.5);
            line-height: 1.6;
            font-weight: 300;
        }

        /* CTA */
        .cta-section {
            text-align: center;
            background: linear-gradient(135deg, var(--ss-navy) 0%, var(--ss-black) 100%);
            color: var(--ss-white);
            padding: 100px 60px;
        }

        .cta-title {
            font-family: 'Playfair Display', serif;
            font-size: 40px;
            margin-bottom: 16px;
        }

        .cta-text {
            font-size: 16px;
            color: rgba(255,255,255,0.7);
            margin-bottom: 36px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: var(--ss-white);
            color: var(--ss-black);
            padding: 16px 32px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background: var(--ss-cream);
            transform: translateY(-2px);
        }

        /* Footer */
        .footer {
            background: var(--ss-black);
            color: var(--ss-white);
            padding: 60px;
            text-align: center;
        }

        .footer-brand {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 16px;
        }

        .footer-text {
            font-size: 13px;
            color: rgba(255,255,255,0.5);
            max-width: 500px;
            margin: 0 auto;
        }

        /* Lightbox */
        .lightbox {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.95);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 40px;
        }

        .lightbox.active {
            display: flex;
        }

        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 4px;
        }

        .lightbox-close {
            position: absolute;
            top: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.1);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .lightbox-close:hover {
            background: rgba(255,255,255,0.2);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .showcase-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .steps-grid {
                grid-template-columns: 1fr;
                max-width: 480px;
                margin: 0 auto;
            }
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            .hero-title {
                font-size: 34px;
            }
            .section {
                padding: 60px 24px;
            }
            .section-title {
                font-size: 28px;
            }
            .showcase-grid {
                grid-template-columns: 1fr;
                max-width: 400px;
                margin: 0 auto;
            }
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 24px;
            }
            .stat-number {
                font-size: 48px;
            }
            .hero {
                padding: 70px 24px;
            }
            .showcase-intro-title {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>

    <!-- SECTION 1 — NAVIGATION + HERO -->
    <nav class="nav">
        <div class="nav-inner">
            <a href="/" class="logo">Fifth Ave Fashion</a>
            <div class="nav-links">
                <a href="#showcase">AI Showcase<span class="nav-badge">New</span></a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </nav>

    <section class="hero">
        <h1 class="hero-title">AI-Powered Product Photography &amp; Video for Fashion Brands</h1>
        <p class="hero-subtitle">Studio-quality model images and walkthrough videos — no photoshoot required. Product pages with video convert up to 65% higher.</p>
    </section>


    <!-- SECTION 2 — SHOWCASE -->
    <section id="showcase" class="section">

        <!-- Showcase Section Intro -->
        <div class="showcase-intro">
            <h2 class="showcase-intro-title">From Simple Product Shot to Full Campaign Asset Set</h2>
            <p class="showcase-intro-sub">A basic product image can become premium visuals for ecommerce, campaigns, and social content.</p>
        </div>

        <!-- Row 1: Navy Slim-Fit Suit -->
        <div class="product-row">
            <h3 class="product-row-title">Navy Slim-Fit Suit</h3>
            <div class="showcase-grid">

                <!-- Image Row: SOURCE > DETAIL > CAMPAIGN -->

                <!-- Image 1: Source -->
                <div class="showcase-item is-source">
                    <div class="showcase-media">
                        <img src="/static/navy-suit-flatlay.jpg" alt="Source Image — Navy Slim-Fit Suit">
                        <span class="comparison-label label-source">Source Image</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Client Provided</div>
                        <div class="showcase-title">Flat-Lay Product Shot</div>
                    </div>
                </div>

                <!-- Image 2: Detail -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="https://res.cloudinary.com/dtdajp5sw/image/upload/male3_hi5cf1.png" alt="Detail Close-Up">
                        <span class="comparison-label label-enhanced">Detail</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Detail Close-Up</div>
                        <div class="showcase-title">Texture &amp; Craftsmanship</div>
                    </div>
                </div>

                <!-- Image 3: Campaign -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="https://res.cloudinary.com/dtdajp5sw/image/upload/male2_qhirhe.png" alt="Campaign Shot">
                        <span class="comparison-label label-enhanced">Campaign</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Campaign Shot</div>
                        <div class="showcase-title">Editorial &amp; Lookbook</div>
                    </div>
                </div>

                <!-- Video Row: PRODUCT VIDEO > LOOKBOOK > SOCIAL -->

                <!-- Video 1: Product Video -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="navy-video-1" loop muted playsinline preload="metadata">
                            <source src="https://res.cloudinary.com/dtdajp5sw/video/upload/male1_Vid_bnvsux.mp4" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Product Video</span>
                        <div class="play-button" onclick="toggleVideo('navy-video-1', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Product Page Video</div>
                        <div class="showcase-title">Model Walkthrough</div>
                    </div>
                </div>

                <!-- Video 2: Lookbook -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="navy-video-2" loop muted playsinline preload="metadata">
                            <source src="https://res.cloudinary.com/dtdajp5sw/video/upload/male1_Vid3_ruade2.mp4" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Lookbook</span>
                        <div class="play-button" onclick="toggleVideo('navy-video-2', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Lookbook Video</div>
                        <div class="showcase-title">Campaign &amp; Lifestyle</div>
                    </div>
                </div>

                <!-- Video 3: Social -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="navy-video-3" loop muted playsinline preload="metadata">
                            <source src="https://res.cloudinary.com/dtdajp5sw/video/upload/male1_Vid2_phlucx.mp4" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Social</span>
                        <div class="play-button" onclick="toggleVideo('navy-video-3', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Social Content Clip</div>
                        <div class="showcase-title">Instagram &amp; TikTok Ready</div>
                    </div>
                </div>

            </div>
        </div>

        <hr class="product-row-divider">

        <!-- Row 2: White Cocktail Dress -->
        <div class="product-row">
            <h3 class="product-row-title">White Cocktail Dress</h3>
            <div class="showcase-grid">

                <!-- Image Row: SOURCE > DETAIL > CAMPAIGN -->

                <!-- Image 1: Source -->
                <div class="showcase-item is-source">
                    <div class="showcase-media">
                        <img src="/static/white-dress-flatlay.jpg" alt="Source Image — White Cocktail Dress">
                        <span class="comparison-label label-source">Source Image</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Client Provided</div>
                        <div class="showcase-title">Flat-Lay Product Shot</div>
                    </div>
                </div>

                <!-- Image 2: Detail -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="https://res.cloudinary.com/dtdajp5sw/image/upload/Female3_mnvz5l.png" alt="Detail Close-Up">
                        <span class="comparison-label label-enhanced">Detail</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Detail Close-Up</div>
                        <div class="showcase-title">Texture &amp; Craftsmanship</div>
                    </div>
                </div>

                <!-- Image 3: Campaign -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="https://res.cloudinary.com/dtdajp5sw/image/upload/Female2_pwuipd.png" alt="Campaign Shot">
                        <span class="comparison-label label-enhanced">Campaign</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Campaign Shot</div>
                        <div class="showcase-title">Editorial &amp; Lookbook</div>
                    </div>
                </div>

                <!-- Video Row: PRODUCT VIDEO > LOOKBOOK > SOCIAL -->

                <!-- Video 1: Product Video -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="cream-video-1" loop muted playsinline preload="metadata">
                            <source src="https://res.cloudinary.com/dtdajp5sw/video/upload/Female1_Vid_pknrap.mp4" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Product Video</span>
                        <div class="play-button" onclick="toggleVideo('cream-video-1', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Product Page Video</div>
                        <div class="showcase-title">Model Walkthrough</div>
                    </div>
                </div>

                <!-- Video 2: Lookbook -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="cream-video-2" loop muted playsinline preload="metadata">
                            <source src="https://res.cloudinary.com/dtdajp5sw/video/upload/Female1_Vid3_g9wkvu.mp4" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Lookbook</span>
                        <div class="play-button" onclick="toggleVideo('cream-video-2', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Lookbook Video</div>
                        <div class="showcase-title">Campaign &amp; Lifestyle</div>
                    </div>
                </div>

                <!-- Video 3: Social -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="cream-video-3" loop muted playsinline preload="metadata">
                            <source src="https://res.cloudinary.com/dtdajp5sw/video/upload/Female1_Vid2_eatinh.mp4" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Social</span>
                        <div class="play-button" onclick="toggleVideo('cream-video-3', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Social Content Clip</div>
                        <div class="showcase-title">Instagram &amp; TikTok Ready</div>
                    </div>
                </div>

            </div>
        </div>

    </section>


    <!-- SECTION 3 — HOW IT WORKS -->
    <section id="features" class="section section-cream">
        <div class="section-header">
            <div class="section-tag">How It Works</div>
            <h2 class="section-title">From Product Photo to Published Content in 3 Steps</h2>
        </div>
        <div class="steps-grid">

            <div class="step-card">
                <div class="step-number">1</div>
                <h3 class="step-title">Send Your Product</h3>
                <p class="step-desc">Share your garment photos — flat-lay, hanger, or mannequin shots. No professional photography required.</p>
            </div>

            <div class="step-card">
                <div class="step-number">2</div>
                <h3 class="step-title">We Generate the Content</h3>
                <p class="step-desc">AI creates studio-quality model photography and walkthrough videos tailored to your brand and product.</p>
            </div>

            <div class="step-card">
                <div class="step-number">3</div>
                <h3 class="step-title">Publish Everywhere</h3>
                <p class="step-desc">Receive ready-to-use assets for your website product pages, social media, email campaigns, and lookbooks.</p>
            </div>

        </div>
    </section>


    <!-- SECTION 4 — THE BUSINESS CASE -->
    <section class="section section-dark">
        <div class="section-header">
            <div class="section-tag">Why AI Content</div>
            <h2 class="section-title">The Numbers Behind AI Fashion Content</h2>
        </div>
        <div class="stats-grid">

            <div class="stat-card">
                <div class="stat-number">65%</div>
                <div class="stat-label">Higher Conversion</div>
                <div class="stat-desc">Product pages with video vs. images alone</div>
            </div>

            <div class="stat-card">
                <div class="stat-number">90%</div>
                <div class="stat-label">Cost Savings</div>
                <div class="stat-desc">Compared to traditional photoshoot production</div>
            </div>

            <div class="stat-card">
                <div class="stat-number">10x</div>
                <div class="stat-label">Faster Output</div>
                <div class="stat-desc">Days instead of weeks for full campaign assets</div>
            </div>

            <div class="stat-card">
                <div class="stat-number">40%</div>
                <div class="stat-label">More Engagement</div>
                <div class="stat-desc">Luxury brands using video content (McKinsey)</div>
            </div>

        </div>
    </section>


    <!-- SECTION 5 — CTA + FOOTER -->
    <section id="contact" class="cta-section">
        <div class="section-tag">Get Started</div>
        <h2 class="cta-title">Ready to Upgrade Your Fashion Content?</h2>
        <p class="cta-text">AI-powered product visuals, video, and social content — built for fashion brands ready to move faster.</p>
        <a href="#" class="btn-primary">
            <span>Get Started</span>
            <i class="fas fa-arrow-right"></i>
        </a>
    </section>

    <footer class="footer">
        <div class="footer-brand">Fifth Ave Fashion</div>
        <p class="footer-text">This is a demonstration page showcasing AI-powered content creation capabilities. All imagery and video content is used for demonstration purposes.</p>
    </footer>


    <!-- LIGHTBOX -->
    <div class="lightbox" id="lightbox">
        <button class="lightbox-close" onclick="closeLightbox()">
            <i class="fas fa-times"></i>
        </button>
        <img id="lightbox-img" src="" alt="Enlarged view">
    </div>


    <script>
        function toggleVideo(videoId, button) {
            const video = document.getElementById(videoId);
            if (video.paused) {
                video.play();
                button.classList.add('playing');
                button.querySelector('i').classList.remove('fa-play');
                button.querySelector('i').classList.add('fa-pause');
            } else {
                video.pause();
                button.classList.remove('playing');
                button.querySelector('i').classList.remove('fa-pause');
                button.querySelector('i').classList.add('fa-play');
            }
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Lightbox functions
        function openLightbox(imgSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
        });
    <\/script>
</body>
</html>
  `));const We=new pt,Zt=Object.assign({"/src/index.tsx":_e});let ut=!1;for(const[,t]of Object.entries(Zt))t&&(We.all("*",e=>{let s;try{s=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,s)}),We.notFound(e=>{let s;try{s=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,s)}),ut=!0);if(!ut)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{We as default};
