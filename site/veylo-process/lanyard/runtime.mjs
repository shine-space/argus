var db=Object.create;var S0=Object.defineProperty;var pb=Object.getOwnPropertyDescriptor;var mb=Object.getOwnPropertyNames;var gb=Object.getPrototypeOf,_b=Object.prototype.hasOwnProperty;var bi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var vb=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of mb(t))!_b.call(e,s)&&s!==n&&S0(e,s,{get:()=>t[s],enumerable:!(i=pb(t,s))||i.enumerable});return e};var la=(e,t,n)=>(n=e!=null?db(gb(e)):{},vb(t||!e||!e.__esModule?S0(n,"default",{value:e,enumerable:!0}):n,e));var U0=bi(ye=>{"use strict";function vd(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<Hc(s,t))e[i]=t,e[n]=s,n=i;else break t}}function ui(e){return e.length===0?null:e[0]}function Gc(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,r=s>>>1;i<r;){var a=2*(i+1)-1,o=e[a],l=a+1,c=e[l];if(0>Hc(o,n))l<s&&0>Hc(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[a]=n,i=a);else if(l<s&&0>Hc(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function Hc(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}ye.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(M0=performance,ye.unstable_now=function(){return M0.now()}):(md=Date,b0=md.now(),ye.unstable_now=function(){return md.now()-b0});var M0,md,b0,Ei=[],Ms=[],yb=1,Kn=null,un=3,kc=!1,dr=!1,Wo=!1,A0=typeof setTimeout=="function"?setTimeout:null,w0=typeof clearTimeout=="function"?clearTimeout:null,E0=typeof setImmediate<"u"?setImmediate:null;function Vc(e){for(var t=ui(Ms);t!==null;){if(t.callback===null)Gc(Ms);else if(t.startTime<=e)Gc(Ms),t.sortIndex=t.expirationTime,vd(Ei,t);else break;t=ui(Ms)}}function yd(e){if(Wo=!1,Vc(e),!dr)if(ui(Ei)!==null)dr=!0,xd();else{var t=ui(Ms);t!==null&&Sd(yd,t.startTime-e)}}var Wc=!1,Xo=-1,R0=5,C0=-1;function D0(){return!(ye.unstable_now()-C0<R0)}function gd(){if(Wc){var e=ye.unstable_now();C0=e;var t=!0;try{t:{dr=!1,Wo&&(Wo=!1,w0(Xo),Xo=-1),kc=!0;var n=un;try{e:{for(Vc(e),Kn=ui(Ei);Kn!==null&&!(Kn.expirationTime>e&&D0());){var i=Kn.callback;if(typeof i=="function"){Kn.callback=null,un=Kn.priorityLevel;var s=i(Kn.expirationTime<=e);if(e=ye.unstable_now(),typeof s=="function"){Kn.callback=s,Vc(e),t=!0;break e}Kn===ui(Ei)&&Gc(Ei),Vc(e)}else Gc(Ei);Kn=ui(Ei)}if(Kn!==null)t=!0;else{var r=ui(Ms);r!==null&&Sd(yd,r.startTime-e),t=!1}}break t}finally{Kn=null,un=n,kc=!1}t=void 0}}finally{t?ko():Wc=!1}}}var ko;typeof E0=="function"?ko=function(){E0(gd)}:typeof MessageChannel<"u"?(_d=new MessageChannel,T0=_d.port2,_d.port1.onmessage=gd,ko=function(){T0.postMessage(null)}):ko=function(){A0(gd,0)};var _d,T0;function xd(){Wc||(Wc=!0,ko())}function Sd(e,t){Xo=A0(function(){e(ye.unstable_now())},t)}ye.unstable_IdlePriority=5;ye.unstable_ImmediatePriority=1;ye.unstable_LowPriority=4;ye.unstable_NormalPriority=3;ye.unstable_Profiling=null;ye.unstable_UserBlockingPriority=2;ye.unstable_cancelCallback=function(e){e.callback=null};ye.unstable_continueExecution=function(){dr||kc||(dr=!0,xd())};ye.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R0=0<e?Math.floor(1e3/e):5};ye.unstable_getCurrentPriorityLevel=function(){return un};ye.unstable_getFirstCallbackNode=function(){return ui(Ei)};ye.unstable_next=function(e){switch(un){case 1:case 2:case 3:var t=3;break;default:t=un}var n=un;un=t;try{return e()}finally{un=n}};ye.unstable_pauseExecution=function(){};ye.unstable_requestPaint=function(){};ye.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=un;un=e;try{return t()}finally{un=n}};ye.unstable_scheduleCallback=function(e,t,n){var i=ye.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:yb++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,vd(Ms,e),ui(Ei)===null&&e===ui(Ms)&&(Wo?(w0(Xo),Xo=-1):Wo=!0,Sd(yd,n-i))):(e.sortIndex=s,vd(Ei,e),dr||kc||(dr=!0,xd())),e};ye.unstable_shouldYield=D0;ye.unstable_wrapCallback=function(e){var t=un;return function(){var n=un;un=t;try{return e.apply(this,arguments)}finally{un=n}}}});var N0=bi((x3,L0)=>{"use strict";L0.exports=U0()});var X0=bi(Zt=>{"use strict";var bd=Symbol.for("react.transitional.element"),xb=Symbol.for("react.portal"),Sb=Symbol.for("react.fragment"),Mb=Symbol.for("react.strict_mode"),bb=Symbol.for("react.profiler"),Eb=Symbol.for("react.consumer"),Tb=Symbol.for("react.context"),Ab=Symbol.for("react.forward_ref"),wb=Symbol.for("react.suspense"),Rb=Symbol.for("react.memo"),F0=Symbol.for("react.lazy"),I0=Symbol.iterator;function Cb(e){return e===null||typeof e!="object"?null:(e=I0&&e[I0]||e["@@iterator"],typeof e=="function"?e:null)}var H0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},V0=Object.assign,G0={};function ua(e,t,n){this.props=e,this.context=t,this.refs=G0,this.updater=n||H0}ua.prototype.isReactComponent={};ua.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ua.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function k0(){}k0.prototype=ua.prototype;function Ed(e,t,n){this.props=e,this.context=t,this.refs=G0,this.updater=n||H0}var Td=Ed.prototype=new k0;Td.constructor=Ed;V0(Td,ua.prototype);Td.isPureReactComponent=!0;var O0=Array.isArray,Ce={H:null,A:null,T:null,S:null},W0=Object.prototype.hasOwnProperty;function Ad(e,t,n,i,s,r){return n=r.ref,{$$typeof:bd,type:e,key:t,ref:n!==void 0?n:null,props:r}}function Db(e,t){return Ad(e.type,t,void 0,void 0,void 0,e.props)}function wd(e){return typeof e=="object"&&e!==null&&e.$$typeof===bd}function Ub(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var P0=/\/+/g;function Md(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ub(""+e.key):t.toString(36)}function B0(){}function Lb(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(B0,B0):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function ca(e,t,n,i,s){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(r){case"bigint":case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case bd:case xb:a=!0;break;case F0:return a=e._init,ca(a(e._payload),t,n,i,s)}}if(a)return s=s(e),a=i===""?"."+Md(e,0):i,O0(s)?(n="",a!=null&&(n=a.replace(P0,"$&/")+"/"),ca(s,t,n,"",function(c){return c})):s!=null&&(wd(s)&&(s=Db(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(P0,"$&/")+"/")+a)),t.push(s)),1;a=0;var o=i===""?".":i+":";if(O0(e))for(var l=0;l<e.length;l++)i=e[l],r=o+Md(i,l),a+=ca(i,t,n,r,s);else if(l=Cb(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,r=o+Md(i,l++),a+=ca(i,t,n,r,s);else if(r==="object"){if(typeof e.then=="function")return ca(Lb(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return a}function Xc(e,t,n){if(e==null)return e;var i=[],s=0;return ca(e,i,"","",function(r){return t.call(n,r,s++)}),i}function Nb(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var z0=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Ib(){}Zt.Children={map:Xc,forEach:function(e,t,n){Xc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Xc(e,function(){t++}),t},toArray:function(e){return Xc(e,function(t){return t})||[]},only:function(e){if(!wd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Zt.Component=ua;Zt.Fragment=Sb;Zt.Profiler=bb;Zt.PureComponent=Ed;Zt.StrictMode=Mb;Zt.Suspense=wb;Zt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ce;Zt.act=function(){throw Error("act(...) is not supported in production builds of React.")};Zt.cache=function(e){return function(){return e.apply(null,arguments)}};Zt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=V0({},e.props),s=e.key,r=void 0;if(t!=null)for(a in t.ref!==void 0&&(r=void 0),t.key!==void 0&&(s=""+t.key),t)!W0.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var o=Array(a),l=0;l<a;l++)o[l]=arguments[l+2];i.children=o}return Ad(e.type,s,void 0,void 0,r,i)};Zt.createContext=function(e){return e={$$typeof:Tb,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Eb,_context:e},e};Zt.createElement=function(e,t,n){var i,s={},r=null;if(t!=null)for(i in t.key!==void 0&&(r=""+t.key),t)W0.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var a=arguments.length-2;if(a===1)s.children=n;else if(1<a){for(var o=Array(a),l=0;l<a;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in a=e.defaultProps,a)s[i]===void 0&&(s[i]=a[i]);return Ad(e,r,void 0,void 0,null,s)};Zt.createRef=function(){return{current:null}};Zt.forwardRef=function(e){return{$$typeof:Ab,render:e}};Zt.isValidElement=wd;Zt.lazy=function(e){return{$$typeof:F0,_payload:{_status:-1,_result:e},_init:Nb}};Zt.memo=function(e,t){return{$$typeof:Rb,type:e,compare:t===void 0?null:t}};Zt.startTransition=function(e){var t=Ce.T,n={};Ce.T=n;try{var i=e(),s=Ce.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Ib,z0)}catch(r){z0(r)}finally{Ce.T=t}};Zt.unstable_useCacheRefresh=function(){return Ce.H.useCacheRefresh()};Zt.use=function(e){return Ce.H.use(e)};Zt.useActionState=function(e,t,n){return Ce.H.useActionState(e,t,n)};Zt.useCallback=function(e,t){return Ce.H.useCallback(e,t)};Zt.useContext=function(e){return Ce.H.useContext(e)};Zt.useDebugValue=function(){};Zt.useDeferredValue=function(e,t){return Ce.H.useDeferredValue(e,t)};Zt.useEffect=function(e,t){return Ce.H.useEffect(e,t)};Zt.useId=function(){return Ce.H.useId()};Zt.useImperativeHandle=function(e,t,n){return Ce.H.useImperativeHandle(e,t,n)};Zt.useInsertionEffect=function(e,t){return Ce.H.useInsertionEffect(e,t)};Zt.useLayoutEffect=function(e,t){return Ce.H.useLayoutEffect(e,t)};Zt.useMemo=function(e,t){return Ce.H.useMemo(e,t)};Zt.useOptimistic=function(e,t){return Ce.H.useOptimistic(e,t)};Zt.useReducer=function(e,t,n){return Ce.H.useReducer(e,t,n)};Zt.useRef=function(e){return Ce.H.useRef(e)};Zt.useState=function(e){return Ce.H.useState(e)};Zt.useSyncExternalStore=function(e,t,n){return Ce.H.useSyncExternalStore(e,t,n)};Zt.useTransition=function(){return Ce.H.useTransition()};Zt.version="19.0.0"});var qc=bi((M3,q0)=>{"use strict";q0.exports=X0()});var Z0=bi(vn=>{"use strict";var Ob=qc();function Y0(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function bs(){}var _n={d:{f:bs,r:function(){throw Error(Y0(522))},D:bs,C:bs,L:bs,m:bs,X:bs,S:bs,M:bs},p:0,findDOMNode:null},Pb=Symbol.for("react.portal");function Bb(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Pb,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var qo=Ob.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Yc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}vn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=_n;vn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Y0(299));return Bb(e,t,null,n)};vn.flushSync=function(e){var t=qo.T,n=_n.p;try{if(qo.T=null,_n.p=2,e)return e()}finally{qo.T=t,_n.p=n,_n.d.f()}};vn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,_n.d.C(e,t))};vn.prefetchDNS=function(e){typeof e=="string"&&_n.d.D(e)};vn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=Yc(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,r=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?_n.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:r}):n==="script"&&_n.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:r,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};vn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Yc(t.as,t.crossOrigin);_n.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&_n.d.M(e)};vn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=Yc(n,t.crossOrigin);_n.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};vn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Yc(t.as,t.crossOrigin);_n.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else _n.d.m(e)};vn.requestFormReset=function(e){_n.d.r(e)};vn.unstable_batchedUpdates=function(e,t){return e(t)};vn.useFormState=function(e,t,n){return qo.H.useFormState(e,t,n)};vn.useFormStatus=function(){return qo.H.useHostTransitionStatus()};vn.version="19.0.0"});var Q0=bi((E3,J0)=>{"use strict";function K0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(K0)}catch(e){console.error(e)}}K0(),J0.exports=Z0()});var qx=bi(fh=>{"use strict";var Ye=N0(),gv=qc(),zb=Q0();function $(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function _v(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}var Fb=Symbol.for("react.element"),Zc=Symbol.for("react.transitional.element"),el=Symbol.for("react.portal"),_a=Symbol.for("react.fragment"),vv=Symbol.for("react.strict_mode"),rp=Symbol.for("react.profiler"),Hb=Symbol.for("react.provider"),yv=Symbol.for("react.consumer"),Qi=Symbol.for("react.context"),jp=Symbol.for("react.forward_ref"),ap=Symbol.for("react.suspense"),op=Symbol.for("react.suspense_list"),$p=Symbol.for("react.memo"),As=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var xv=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var Vb=Symbol.for("react.memo_cache_sentinel"),j0=Symbol.iterator;function Yo(e){return e===null||typeof e!="object"?null:(e=j0&&e[j0]||e["@@iterator"],typeof e=="function"?e:null)}var Gb=Symbol.for("react.client.reference");function lp(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Gb?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _a:return"Fragment";case el:return"Portal";case rp:return"Profiler";case vv:return"StrictMode";case ap:return"Suspense";case op:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Qi:return(e.displayName||"Context")+".Provider";case yv:return(e._context.displayName||"Context")+".Consumer";case jp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case $p:return t=e.displayName||null,t!==null?t:lp(e.type)||"Memo";case As:t=e._payload,e=e._init;try{return lp(e(t))}catch{}}return null}var kt=gv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ee=Object.assign,Rd,$0;function nl(e){if(Rd===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Rd=t&&t[1]||"",$0=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Rd+e+$0}var Cd=!1;function Dd(e,t){if(!e||Cd)return"";Cd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(p){var h=p}Reflect.construct(e,[],d)}else{try{d.call()}catch(p){h=p}e.call(d.prototype)}}else{try{throw Error()}catch(p){h=p}(d=e())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(p){if(p&&h&&typeof p.stack=="string")return[p.stack,h.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=i.DetermineComponentFrameRoot(),a=r[0],o=r[1];if(a&&o){var l=a.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var u=`
`+l[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=s);break}}}finally{Cd=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?nl(n):""}function kb(e){switch(e.tag){case 26:case 27:case 5:return nl(e.type);case 16:return nl("Lazy");case 13:return nl("Suspense");case 19:return nl("SuspenseList");case 0:case 15:return e=Dd(e.type,!1),e;case 11:return e=Dd(e.type.render,!1),e;case 1:return e=Dd(e.type,!0),e;default:return""}}function t_(e){try{var t="";do t+=kb(e),e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}function Xa(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Sv(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function e_(e){if(Xa(e)!==e)throw Error($(188))}function Wb(e){var t=e.alternate;if(!t){if(t=Xa(e),t===null)throw Error($(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var r=s.alternate;if(r===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===r.child){for(r=s.child;r;){if(r===n)return e_(s),e;if(r===i)return e_(s),t;r=r.sibling}throw Error($(188))}if(n.return!==i.return)n=s,i=r;else{for(var a=!1,o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a){for(o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a)throw Error($(189))}}if(n.alternate!==i)throw Error($(190))}if(n.tag!==3)throw Error($(188));return n.stateNode.current===n?e:t}function Mv(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Mv(e),t!==null)return t;e=e.sibling}return null}var il=Array.isArray,be=zb.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,xr={pending:!1,data:null,method:null,action:null},cp=[],va=-1;function Ui(e){return{current:e}}function $e(e){0>va||(e.current=cp[va],cp[va]=null,va--)}function we(e,t){va++,cp[va]=e.current,e.current=t}var wi=Ui(null),Sl=Ui(null),Is=Ui(null),Eu=Ui(null);function Tu(e,t){switch(we(Is,t),we(Sl,e),we(wi,null),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)&&(t=t.namespaceURI)?iv(t):0;break;default:if(e=e===8?t.parentNode:t,t=e.tagName,e=e.namespaceURI)e=iv(e),t=Ix(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}$e(wi),we(wi,t)}function Pa(){$e(wi),$e(Sl),$e(Is)}function up(e){e.memoizedState!==null&&we(Eu,e);var t=wi.current,n=Ix(t,e.type);t!==n&&(we(Sl,e),we(wi,n))}function Au(e){Sl.current===e&&($e(wi),$e(Sl)),Eu.current===e&&($e(Eu),Ll._currentValue=xr)}var hp=Object.prototype.hasOwnProperty,tm=Ye.unstable_scheduleCallback,Ud=Ye.unstable_cancelCallback,Xb=Ye.unstable_shouldYield,qb=Ye.unstable_requestPaint,Ri=Ye.unstable_now,Yb=Ye.unstable_getCurrentPriorityLevel,bv=Ye.unstable_ImmediatePriority,Ev=Ye.unstable_UserBlockingPriority,wu=Ye.unstable_NormalPriority,Zb=Ye.unstable_LowPriority,Tv=Ye.unstable_IdlePriority,Kb=Ye.log,Jb=Ye.unstable_setDisableYieldValue,Pl=null,On=null;function Qb(e){if(On&&typeof On.onCommitFiberRoot=="function")try{On.onCommitFiberRoot(Pl,e,void 0,(e.current.flags&128)===128)}catch{}}function Ls(e){if(typeof Kb=="function"&&Jb(e),On&&typeof On.setStrictMode=="function")try{On.setStrictMode(Pl,e)}catch{}}var Pn=Math.clz32?Math.clz32:t1,jb=Math.log,$b=Math.LN2;function t1(e){return e>>>=0,e===0?32:31-(jb(e)/$b|0)|0}var Kc=128,Jc=4194304;function mr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194176;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ju(e,t){var n=e.pendingLanes;if(n===0)return 0;var i=0,s=e.suspendedLanes,r=e.pingedLanes,a=e.warmLanes;e=e.finishedLanes!==0;var o=n&134217727;return o!==0?(n=o&~s,n!==0?i=mr(n):(r&=o,r!==0?i=mr(r):e||(a=o&~a,a!==0&&(i=mr(a))))):(o=n&~s,o!==0?i=mr(o):r!==0?i=mr(r):e||(a=n&~a,a!==0&&(i=mr(a)))),i===0?0:t!==0&&t!==i&&(t&s)===0&&(s=i&-i,a=t&-t,s>=a||s===32&&(a&4194176)!==0)?t:i}function Bl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function e1(e,t){switch(e){case 1:case 2:case 4:case 8:return t+250;case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Av(){var e=Kc;return Kc<<=1,(Kc&4194176)===0&&(Kc=128),e}function wv(){var e=Jc;return Jc<<=1,(Jc&62914560)===0&&(Jc=4194304),e}function Ld(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function zl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function n1(e,t,n,i,s,r){var a=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=a&~n;0<n;){var u=31-Pn(n),d=1<<u;o[u]=0,l[u]=-1;var h=c[u];if(h!==null)for(c[u]=null,u=0;u<h.length;u++){var p=h[u];p!==null&&(p.lane&=-536870913)}n&=~d}i!==0&&Rv(e,i,0),r!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=r&~(a&~t))}function Rv(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Pn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&4194218}function Cv(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Pn(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function Dv(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Uv(){var e=be.p;return e!==0?e:(e=window.event,e===void 0?32:Wx(e.type))}function i1(e,t){var n=be.p;try{return be.p=e,t()}finally{be.p=n}}var qs=Math.random().toString(36).slice(2),hn="__reactFiber$"+qs,An="__reactProps$"+qs,qa="__reactContainer$"+qs,fp="__reactEvents$"+qs,s1="__reactListeners$"+qs,r1="__reactHandles$"+qs,n_="__reactResources$"+qs,Ml="__reactMarker$"+qs;function em(e){delete e[hn],delete e[An],delete e[fp],delete e[s1],delete e[r1]}function vr(e){var t=e[hn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[qa]||n[hn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=rv(e);e!==null;){if(n=e[hn])return n;e=rv(e)}return t}e=n,n=e.parentNode}return null}function Ya(e){if(e=e[hn]||e[qa]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function sl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error($(33))}function Ra(e){var t=e[n_];return t||(t=e[n_]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Qe(e){e[Ml]=!0}var Lv=new Set,Nv={};function Ur(e,t){Ba(e,t),Ba(e+"Capture",t)}function Ba(e,t){for(Nv[e]=t,e=0;e<t.length;e++)Lv.add(t[e])}var is=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),a1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),i_={},s_={};function o1(e){return hp.call(s_,e)?!0:hp.call(i_,e)?!1:a1.test(e)?s_[e]=!0:(i_[e]=!0,!1)}function fu(e,t,n){if(o1(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Qc(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Wi(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function $n(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Iv(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function l1(e){var t=Iv(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,r=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(a){i=""+a,r.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ru(e){e._valueTracker||(e._valueTracker=l1(e))}function Ov(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=Iv(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Cu(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var c1=/[\n"\\]/g;function ni(e){return e.replace(c1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function dp(e,t,n,i,s,r,a,o){e.name="",a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"?e.type=a:e.removeAttribute("type"),t!=null?a==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+$n(t)):e.value!==""+$n(t)&&(e.value=""+$n(t)):a!=="submit"&&a!=="reset"||e.removeAttribute("value"),t!=null?pp(e,a,$n(t)):n!=null?pp(e,a,$n(n)):i!=null&&e.removeAttribute("value"),s==null&&r!=null&&(e.defaultChecked=!!r),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+$n(o):e.removeAttribute("name")}function Pv(e,t,n,i,s,r,a,o){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||n!=null){if(!(r!=="submit"&&r!=="reset"||t!=null))return;n=n!=null?""+$n(n):"",t=t!=null?""+$n(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.name=a)}function pp(e,t,n){t==="number"&&Cu(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Ca(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+$n(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Bv(e,t,n){if(t!=null&&(t=""+$n(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+$n(n):""}function zv(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error($(92));if(il(i)){if(1<i.length)throw Error($(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=$n(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i)}function za(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var u1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function r_(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||u1.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Fv(e,t,n){if(t!=null&&typeof t!="object")throw Error($(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&r_(e,s,i)}else for(var r in t)t.hasOwnProperty(r)&&r_(e,r,t[r])}function nm(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var h1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),f1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function du(e){return f1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var mp=null;function im(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ya=null,Da=null;function a_(e){var t=Ya(e);if(t&&(e=t.stateNode)){var n=e[An]||null;t:switch(e=t.stateNode,t.type){case"input":if(dp(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ni(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[An]||null;if(!s)throw Error($(90));dp(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&Ov(i)}break t;case"textarea":Bv(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Ca(e,!!n.multiple,t,!1)}}}var Nd=!1;function Hv(e,t,n){if(Nd)return e(t,n);Nd=!0;try{var i=e(t);return i}finally{if(Nd=!1,(ya!==null||Da!==null)&&(lh(),ya&&(t=ya,e=Da,Da=ya=null,a_(t),e)))for(t=0;t<e.length;t++)a_(e[t])}}function bl(e,t){var n=e.stateNode;if(n===null)return null;var i=n[An]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error($(231,t,typeof n));return n}var gp=!1;if(is)try{ha={},Object.defineProperty(ha,"passive",{get:function(){gp=!0}}),window.addEventListener("test",ha,ha),window.removeEventListener("test",ha,ha)}catch{gp=!1}var ha,Ns=null,sm=null,pu=null;function Vv(){if(pu)return pu;var e,t=sm,n=t.length,i,s="value"in Ns?Ns.value:Ns.textContent,r=s.length;for(e=0;e<n&&t[e]===s[e];e++);var a=n-e;for(i=1;i<=a&&t[n-i]===s[r-i];i++);return pu=s.slice(e,1<i?1-i:void 0)}function mu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function jc(){return!0}function o_(){return!1}function wn(e){function t(n,i,s,r,a){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=r,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(r):r[o]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?jc:o_,this.isPropagationStopped=o_,this}return Ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=jc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=jc)},persist:function(){},isPersistent:jc}),t}var Lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$u=wn(Lr),Fl=Ee({},Lr,{view:0,detail:0}),d1=wn(Fl),Id,Od,Zo,th=Ee({},Fl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rm,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zo&&(Zo&&e.type==="mousemove"?(Id=e.screenX-Zo.screenX,Od=e.screenY-Zo.screenY):Od=Id=0,Zo=e),Id)},movementY:function(e){return"movementY"in e?e.movementY:Od}}),l_=wn(th),p1=Ee({},th,{dataTransfer:0}),m1=wn(p1),g1=Ee({},Fl,{relatedTarget:0}),Pd=wn(g1),_1=Ee({},Lr,{animationName:0,elapsedTime:0,pseudoElement:0}),v1=wn(_1),y1=Ee({},Lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),x1=wn(y1),S1=Ee({},Lr,{data:0}),c_=wn(S1),M1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},b1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},E1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function T1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=E1[e])?!!t[e]:!1}function rm(){return T1}var A1=Ee({},Fl,{key:function(e){if(e.key){var t=M1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=mu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?b1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rm,charCode:function(e){return e.type==="keypress"?mu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?mu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),w1=wn(A1),R1=Ee({},th,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),u_=wn(R1),C1=Ee({},Fl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rm}),D1=wn(C1),U1=Ee({},Lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),L1=wn(U1),N1=Ee({},th,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),I1=wn(N1),O1=Ee({},Lr,{newState:0,oldState:0}),P1=wn(O1),B1=[9,13,27,32],am=is&&"CompositionEvent"in window,al=null;is&&"documentMode"in document&&(al=document.documentMode);var z1=is&&"TextEvent"in window&&!al,Gv=is&&(!am||al&&8<al&&11>=al),h_=" ",f_=!1;function kv(e,t){switch(e){case"keyup":return B1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wv(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var xa=!1;function F1(e,t){switch(e){case"compositionend":return Wv(t);case"keypress":return t.which!==32?null:(f_=!0,h_);case"textInput":return e=t.data,e===h_&&f_?null:e;default:return null}}function H1(e,t){if(xa)return e==="compositionend"||!am&&kv(e,t)?(e=Vv(),pu=sm=Ns=null,xa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Gv&&t.locale!=="ko"?null:t.data;default:return null}}var V1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function d_(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!V1[e.type]:t==="textarea"}function Xv(e,t,n,i){ya?Da?Da.push(i):Da=[i]:ya=i,t=Xu(t,"onChange"),0<t.length&&(n=new $u("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var ol=null,El=null;function G1(e){Ux(e,0)}function eh(e){var t=sl(e);if(Ov(t))return e}function p_(e,t){if(e==="change")return t}var qv=!1;is&&(is?(tu="oninput"in document,tu||(Bd=document.createElement("div"),Bd.setAttribute("oninput","return;"),tu=typeof Bd.oninput=="function"),$c=tu):$c=!1,qv=$c&&(!document.documentMode||9<document.documentMode));var $c,tu,Bd;function m_(){ol&&(ol.detachEvent("onpropertychange",Yv),El=ol=null)}function Yv(e){if(e.propertyName==="value"&&eh(El)){var t=[];Xv(t,El,e,im(e)),Hv(G1,t)}}function k1(e,t,n){e==="focusin"?(m_(),ol=t,El=n,ol.attachEvent("onpropertychange",Yv)):e==="focusout"&&m_()}function W1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return eh(El)}function X1(e,t){if(e==="click")return eh(t)}function q1(e,t){if(e==="input"||e==="change")return eh(t)}function Y1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var zn=typeof Object.is=="function"?Object.is:Y1;function Tl(e,t){if(zn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!hp.call(t,s)||!zn(e[s],t[s]))return!1}return!0}function g_(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function __(e,t){var n=g_(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=g_(n)}}function Zv(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Zv(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Kv(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Cu(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Cu(e.document)}return t}function om(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Z1(e,t){var n=Kv(t);t=e.focusedElem;var i=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Zv(t.ownerDocument.documentElement,t)){if(i!==null&&om(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var s=t.textContent.length,r=Math.min(i.start,s);i=i.end===void 0?r:Math.min(i.end,s),!n.extend&&r>i&&(s=i,i=r,r=s),s=__(t,r);var a=__(t,i);s&&a&&(n.rangeCount!==1||n.anchorNode!==s.node||n.anchorOffset!==s.offset||n.focusNode!==a.node||n.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),n.removeAllRanges(),r>i?(n.addRange(e),n.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var K1=is&&"documentMode"in document&&11>=document.documentMode,Sa=null,_p=null,ll=null,vp=!1;function v_(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;vp||Sa==null||Sa!==Cu(i)||(i=Sa,"selectionStart"in i&&om(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ll&&Tl(ll,i)||(ll=i,i=Xu(_p,"onSelect"),0<i.length&&(t=new $u("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Sa)))}function pr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ma={animationend:pr("Animation","AnimationEnd"),animationiteration:pr("Animation","AnimationIteration"),animationstart:pr("Animation","AnimationStart"),transitionrun:pr("Transition","TransitionRun"),transitionstart:pr("Transition","TransitionStart"),transitioncancel:pr("Transition","TransitionCancel"),transitionend:pr("Transition","TransitionEnd")},zd={},Jv={};is&&(Jv=document.createElement("div").style,"AnimationEvent"in window||(delete Ma.animationend.animation,delete Ma.animationiteration.animation,delete Ma.animationstart.animation),"TransitionEvent"in window||delete Ma.transitionend.transition);function Nr(e){if(zd[e])return zd[e];if(!Ma[e])return e;var t=Ma[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Jv)return zd[e]=t[n];return e}var Qv=Nr("animationend"),jv=Nr("animationiteration"),$v=Nr("animationstart"),J1=Nr("transitionrun"),Q1=Nr("transitionstart"),j1=Nr("transitioncancel"),ty=Nr("transitionend"),ey=new Map,y_="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");function pi(e,t){ey.set(e,t),Ur(t,[e])}var jn=[],ba=0,lm=0;function nh(){for(var e=ba,t=lm=ba=0;t<e;){var n=jn[t];jn[t++]=null;var i=jn[t];jn[t++]=null;var s=jn[t];jn[t++]=null;var r=jn[t];if(jn[t++]=null,i!==null&&s!==null){var a=i.pending;a===null?s.next=s:(s.next=a.next,a.next=s),i.pending=s}r!==0&&ny(n,s,r)}}function ih(e,t,n,i){jn[ba++]=e,jn[ba++]=t,jn[ba++]=n,jn[ba++]=i,lm|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function cm(e,t,n,i){return ih(e,t,n,i),Du(e)}function Gs(e,t){return ih(e,null,null,t),Du(e)}function ny(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,r=e.return;r!==null;)r.childLanes|=n,i=r.alternate,i!==null&&(i.childLanes|=n),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(s=!0)),e=r,r=r.return;s&&t!==null&&e.tag===3&&(r=e.stateNode,s=31-Pn(n),r=r.hiddenUpdates,e=r[s],e===null?r[s]=[t]:e.push(t),t.lane=n|536870912)}function Du(e){if(50<xl)throw xl=0,Hp=null,Error($(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ea={},x_=new WeakMap;function ii(e,t){if(typeof e=="object"&&e!==null){var n=x_.get(e);return n!==void 0?n:(t={value:e,source:t,stack:t_(t)},x_.set(e,t),t)}return{value:e,source:t,stack:t_(t)}}var Ta=[],Aa=0,Uu=null,Lu=0,ti=[],ei=0,Sr=null,ji=1,$i="";function gr(e,t){Ta[Aa++]=Lu,Ta[Aa++]=Uu,Uu=e,Lu=t}function iy(e,t,n){ti[ei++]=ji,ti[ei++]=$i,ti[ei++]=Sr,Sr=e;var i=ji;e=$i;var s=32-Pn(i)-1;i&=~(1<<s),n+=1;var r=32-Pn(t)+s;if(30<r){var a=s-s%5;r=(i&(1<<a)-1).toString(32),i>>=a,s-=a,ji=1<<32-Pn(t)+s|n<<s|i,$i=r+e}else ji=1<<r|n<<s|i,$i=e}function um(e){e.return!==null&&(gr(e,1),iy(e,1,0))}function hm(e){for(;e===Uu;)Uu=Ta[--Aa],Ta[Aa]=null,Lu=Ta[--Aa],Ta[Aa]=null;for(;e===Sr;)Sr=ti[--ei],ti[ei]=null,$i=ti[--ei],ti[ei]=null,ji=ti[--ei],ti[ei]=null}var yn=null,an=null,fe=!1,fi=null,Ti=!1,yp=Error($(519));function Ar(e){var t=Error($(418,""));throw Al(ii(t,e)),yp}function S_(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[hn]=e,t[An]=i,n){case"dialog":re("cancel",t),re("close",t);break;case"iframe":case"object":case"embed":re("load",t);break;case"video":case"audio":for(n=0;n<Cl.length;n++)re(Cl[n],t);break;case"source":re("error",t);break;case"img":case"image":case"link":re("error",t),re("load",t);break;case"details":re("toggle",t);break;case"input":re("invalid",t),Pv(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0),Ru(t);break;case"select":re("invalid",t);break;case"textarea":re("invalid",t),zv(t,i.value,i.defaultValue,i.children),Ru(t)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||Nx(t.textContent,n)?(i.popover!=null&&(re("beforetoggle",t),re("toggle",t)),i.onScroll!=null&&re("scroll",t),i.onScrollEnd!=null&&re("scrollend",t),i.onClick!=null&&(t.onclick=uh),t=!0):t=!1,t||Ar(e)}function M_(e){for(yn=e.return;yn;)switch(yn.tag){case 3:case 27:Ti=!0;return;case 5:case 13:Ti=!1;return;default:yn=yn.return}}function Ko(e){if(e!==yn)return!1;if(!fe)return M_(e),fe=!0,!1;var t=!1,n;if((n=e.tag!==3&&e.tag!==27)&&((n=e.tag===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Yp(e.type,e.memoizedProps)),n=!n),n&&(t=!0),t&&an&&Ar(e),M_(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error($(317));t:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(n=e.data,n==="/$"){if(t===0){an=di(e.nextSibling);break t}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++;e=e.nextSibling}an=null}}else an=yn?di(e.stateNode.nextSibling):null;return!0}function Hl(){an=yn=null,fe=!1}function Al(e){fi===null?fi=[e]:fi.push(e)}var cl=Error($(460)),sy=Error($(474)),xp={then:function(){}};function b_(e){return e=e.status,e==="fulfilled"||e==="rejected"}function eu(){}function ry(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(eu,eu),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,e===cl?Error($(483)):e;default:if(typeof t.status=="string")t.then(eu,eu);else{if(e=Me,e!==null&&100<e.shellSuspendCounter)throw Error($(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,e===cl?Error($(483)):e}throw ul=t,cl}}var ul=null;function E_(){if(ul===null)throw Error($(459));var e=ul;return ul=null,e}var Ua=null,wl=0;function nu(e){var t=wl;return wl+=1,Ua===null&&(Ua=[]),ry(Ua,e,t)}function Jo(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function iu(e,t){throw t.$$typeof===Fb?Error($(525)):(e=Object.prototype.toString.call(t),Error($(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function T_(e){var t=e._init;return t(e._payload)}function ay(e){function t(f,_){if(e){var v=f.deletions;v===null?(f.deletions=[_],f.flags|=16):v.push(_)}}function n(f,_){if(!e)return null;for(;_!==null;)t(f,_),_=_.sibling;return null}function i(f){for(var _=new Map;f!==null;)f.key!==null?_.set(f.key,f):_.set(f.index,f),f=f.sibling;return _}function s(f,_){return f=Bs(f,_),f.index=0,f.sibling=null,f}function r(f,_,v){return f.index=v,e?(v=f.alternate,v!==null?(v=v.index,v<_?(f.flags|=33554434,_):v):(f.flags|=33554434,_)):(f.flags|=1048576,_)}function a(f){return e&&f.alternate===null&&(f.flags|=33554434),f}function o(f,_,v,y){return _===null||_.tag!==6?(_=Jd(v,f.mode,y),_.return=f,_):(_=s(_,v),_.return=f,_)}function l(f,_,v,y){var A=v.type;return A===_a?u(f,_,v.props.children,y,v.key):_!==null&&(_.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===As&&T_(A)===_.type)?(_=s(_,v.props),Jo(_,v),_.return=f,_):(_=xu(v.type,v.key,v.props,null,f.mode,y),Jo(_,v),_.return=f,_)}function c(f,_,v,y){return _===null||_.tag!==4||_.stateNode.containerInfo!==v.containerInfo||_.stateNode.implementation!==v.implementation?(_=Qd(v,f.mode,y),_.return=f,_):(_=s(_,v.children||[]),_.return=f,_)}function u(f,_,v,y,A){return _===null||_.tag!==7?(_=br(v,f.mode,y,A),_.return=f,_):(_=s(_,v),_.return=f,_)}function d(f,_,v){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return _=Jd(""+_,f.mode,v),_.return=f,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Zc:return v=xu(_.type,_.key,_.props,null,f.mode,v),Jo(v,_),v.return=f,v;case el:return _=Qd(_,f.mode,v),_.return=f,_;case As:var y=_._init;return _=y(_._payload),d(f,_,v)}if(il(_)||Yo(_))return _=br(_,f.mode,v,null),_.return=f,_;if(typeof _.then=="function")return d(f,nu(_),v);if(_.$$typeof===Qi)return d(f,su(f,_),v);iu(f,_)}return null}function h(f,_,v,y){var A=_!==null?_.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return A!==null?null:o(f,_,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Zc:return v.key===A?l(f,_,v,y):null;case el:return v.key===A?c(f,_,v,y):null;case As:return A=v._init,v=A(v._payload),h(f,_,v,y)}if(il(v)||Yo(v))return A!==null?null:u(f,_,v,y,null);if(typeof v.then=="function")return h(f,_,nu(v),y);if(v.$$typeof===Qi)return h(f,_,su(f,v),y);iu(f,v)}return null}function p(f,_,v,y,A){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return f=f.get(v)||null,o(_,f,""+y,A);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Zc:return f=f.get(y.key===null?v:y.key)||null,l(_,f,y,A);case el:return f=f.get(y.key===null?v:y.key)||null,c(_,f,y,A);case As:var C=y._init;return y=C(y._payload),p(f,_,v,y,A)}if(il(y)||Yo(y))return f=f.get(v)||null,u(_,f,y,A,null);if(typeof y.then=="function")return p(f,_,v,nu(y),A);if(y.$$typeof===Qi)return p(f,_,v,su(_,y),A);iu(_,y)}return null}function g(f,_,v,y){for(var A=null,C=null,w=_,U=_=0,E=null;w!==null&&U<v.length;U++){w.index>U?(E=w,w=null):E=w.sibling;var x=h(f,w,v[U],y);if(x===null){w===null&&(w=E);break}e&&w&&x.alternate===null&&t(f,w),_=r(x,_,U),C===null?A=x:C.sibling=x,C=x,w=E}if(U===v.length)return n(f,w),fe&&gr(f,U),A;if(w===null){for(;U<v.length;U++)w=d(f,v[U],y),w!==null&&(_=r(w,_,U),C===null?A=w:C.sibling=w,C=w);return fe&&gr(f,U),A}for(w=i(w);U<v.length;U++)E=p(w,f,U,v[U],y),E!==null&&(e&&E.alternate!==null&&w.delete(E.key===null?U:E.key),_=r(E,_,U),C===null?A=E:C.sibling=E,C=E);return e&&w.forEach(function(R){return t(f,R)}),fe&&gr(f,U),A}function M(f,_,v,y){if(v==null)throw Error($(151));for(var A=null,C=null,w=_,U=_=0,E=null,x=v.next();w!==null&&!x.done;U++,x=v.next()){w.index>U?(E=w,w=null):E=w.sibling;var R=h(f,w,x.value,y);if(R===null){w===null&&(w=E);break}e&&w&&R.alternate===null&&t(f,w),_=r(R,_,U),C===null?A=R:C.sibling=R,C=R,w=E}if(x.done)return n(f,w),fe&&gr(f,U),A;if(w===null){for(;!x.done;U++,x=v.next())x=d(f,x.value,y),x!==null&&(_=r(x,_,U),C===null?A=x:C.sibling=x,C=x);return fe&&gr(f,U),A}for(w=i(w);!x.done;U++,x=v.next())x=p(w,f,U,x.value,y),x!==null&&(e&&x.alternate!==null&&w.delete(x.key===null?U:x.key),_=r(x,_,U),C===null?A=x:C.sibling=x,C=x);return e&&w.forEach(function(z){return t(f,z)}),fe&&gr(f,U),A}function m(f,_,v,y){if(typeof v=="object"&&v!==null&&v.type===_a&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Zc:t:{for(var A=v.key;_!==null;){if(_.key===A){if(A=v.type,A===_a){if(_.tag===7){n(f,_.sibling),y=s(_,v.props.children),y.return=f,f=y;break t}}else if(_.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===As&&T_(A)===_.type){n(f,_.sibling),y=s(_,v.props),Jo(y,v),y.return=f,f=y;break t}n(f,_);break}else t(f,_);_=_.sibling}v.type===_a?(y=br(v.props.children,f.mode,y,v.key),y.return=f,f=y):(y=xu(v.type,v.key,v.props,null,f.mode,y),Jo(y,v),y.return=f,f=y)}return a(f);case el:t:{for(A=v.key;_!==null;){if(_.key===A)if(_.tag===4&&_.stateNode.containerInfo===v.containerInfo&&_.stateNode.implementation===v.implementation){n(f,_.sibling),y=s(_,v.children||[]),y.return=f,f=y;break t}else{n(f,_);break}else t(f,_);_=_.sibling}y=Qd(v,f.mode,y),y.return=f,f=y}return a(f);case As:return A=v._init,v=A(v._payload),m(f,_,v,y)}if(il(v))return g(f,_,v,y);if(Yo(v)){if(A=Yo(v),typeof A!="function")throw Error($(150));return v=A.call(v),M(f,_,v,y)}if(typeof v.then=="function")return m(f,_,nu(v),y);if(v.$$typeof===Qi)return m(f,_,su(f,v),y);iu(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,_!==null&&_.tag===6?(n(f,_.sibling),y=s(_,v),y.return=f,f=y):(n(f,_),y=Jd(v,f.mode,y),y.return=f,f=y),a(f)):n(f,_)}return function(f,_,v,y){try{wl=0;var A=m(f,_,v,y);return Ua=null,A}catch(w){if(w===cl)throw w;var C=si(29,w,null,f.mode);return C.lanes=y,C.return=f,C}finally{}}}var wr=ay(!0),oy=ay(!1),Fa=Ui(null),Nu=Ui(0);function A_(e,t){e=as,we(Nu,e),we(Fa,t),as=e|t.baseLanes}function Sp(){we(Nu,as),we(Fa,Fa.current)}function fm(){as=Nu.current,$e(Fa),$e(Nu)}var ai=Ui(null),Ci=null;function Rs(e){var t=e.alternate;we(qe,qe.current&1),we(ai,e),Ci===null&&(t===null||Fa.current!==null||t.memoizedState!==null)&&(Ci=e)}function ly(e){if(e.tag===22){if(we(qe,qe.current),we(ai,e),Ci===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Ci=e)}}else Cs(e)}function Cs(){we(qe,qe.current),we(ai,ai.current)}function ts(e){$e(ai),Ci===e&&(Ci=null),$e(qe)}var qe=Ui(0);function Iu(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},tE=Ye.unstable_scheduleCallback,eE=Ye.unstable_NormalPriority,Xe={$$typeof:Qi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function dm(){return{controller:new $1,data:new Map,refCount:0}}function Vl(e){e.refCount--,e.refCount===0&&tE(eE,function(){e.controller.abort()})}var hl=null,Mp=0,Ha=0,La=null;function nE(e,t){if(hl===null){var n=hl=[];Mp=0,Ha=Pm(),La={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Mp++,t.then(w_,w_),t}function w_(){if(--Mp===0&&hl!==null){La!==null&&(La.status="fulfilled");var e=hl;hl=null,Ha=0,La=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function iE(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var R_=kt.S;kt.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&nE(e,t),R_!==null&&R_(e,t)};var Mr=Ui(null);function pm(){var e=Mr.current;return e!==null?e:Me.pooledCache}function gu(e,t){t===null?we(Mr,Mr.current):we(Mr,t.pool)}function cy(){var e=pm();return e===null?null:{parent:Xe._currentValue,pool:e}}var ks=0,Qt=null,ve=null,Ve=null,Ou=!1,Na=!1,Rr=!1,Pu=0,Rl=0,Ia=null,sE=0;function ze(){throw Error($(321))}function mm(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zn(e[n],t[n]))return!1;return!0}function gm(e,t,n,i,s,r){return ks=r,Qt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,kt.H=e===null||e.memoizedState===null?Ir:Ys,Rr=!1,r=n(i,s),Rr=!1,Na&&(r=hy(t,n,i,s)),uy(e),r}function uy(e){kt.H=Di;var t=ve!==null&&ve.next!==null;if(ks=0,Ve=ve=Qt=null,Ou=!1,Rl=0,Ia=null,t)throw Error($(300));e===null||je||(e=e.dependencies,e!==null&&Fu(e)&&(je=!0))}function hy(e,t,n,i){Qt=e;var s=0;do{if(Na&&(Ia=null),Rl=0,Na=!1,25<=s)throw Error($(301));if(s+=1,Ve=ve=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}kt.H=Or,r=t(n,i)}while(Na);return r}function rE(){var e=kt.H,t=e.useState()[0];return t=typeof t.then=="function"?Gl(t):t,e=e.useState()[0],(ve!==null?ve.memoizedState:null)!==e&&(Qt.flags|=1024),t}function _m(){var e=Pu!==0;return Pu=0,e}function vm(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ym(e){if(Ou){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ou=!1}ks=0,Ve=ve=Qt=null,Na=!1,Rl=Pu=0,Ia=null}function Tn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ve===null?Qt.memoizedState=Ve=e:Ve=Ve.next=e,Ve}function Ge(){if(ve===null){var e=Qt.alternate;e=e!==null?e.memoizedState:null}else e=ve.next;var t=Ve===null?Qt.memoizedState:Ve.next;if(t!==null)Ve=t,ve=e;else{if(e===null)throw Qt.alternate===null?Error($(467)):Error($(310));ve=e,e={memoizedState:ve.memoizedState,baseState:ve.baseState,baseQueue:ve.baseQueue,queue:ve.queue,next:null},Ve===null?Qt.memoizedState=Ve=e:Ve=Ve.next=e}return Ve}var sh;sh=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}};function Gl(e){var t=Rl;return Rl+=1,Ia===null&&(Ia=[]),e=ry(Ia,e,t),t=Qt,(Ve===null?t.memoizedState:Ve.next)===null&&(t=t.alternate,kt.H=t===null||t.memoizedState===null?Ir:Ys),e}function rh(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Gl(e);if(e.$$typeof===Qi)return fn(e)}throw Error($(438,String(e)))}function xm(e){var t=null,n=Qt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Qt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=sh(),Qt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=Vb;return t.index++,n}function ss(e,t){return typeof t=="function"?t(e):t}function _u(e){var t=Ge();return Sm(t,ve,e)}function Sm(e,t,n){var i=e.queue;if(i===null)throw Error($(311));i.lastRenderedReducer=n;var s=e.baseQueue,r=i.pending;if(r!==null){if(s!==null){var a=s.next;s.next=r.next,r.next=a}t.baseQueue=s=r,i.pending=null}if(r=e.baseState,s===null)e.memoizedState=r;else{t=s.next;var o=a=null,l=null,c=t,u=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(ce&d)===d:(ks&d)===d){var h=c.revertLane;if(h===0)l!==null&&(l=l.next={lane:0,revertLane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===Ha&&(u=!0);else if((ks&h)===h){c=c.next,h===Ha&&(u=!0);continue}else d={lane:0,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,a=r):l=l.next=d,Qt.lanes|=h,Xs|=h;d=c.action,Rr&&n(r,d),r=c.hasEagerState?c.eagerState:n(r,d)}else h={lane:d,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,a=r):l=l.next=h,Qt.lanes|=d,Xs|=d;c=c.next}while(c!==null&&c!==t);if(l===null?a=r:l.next=o,!zn(r,e.memoizedState)&&(je=!0,u&&(n=La,n!==null)))throw n;e.memoizedState=r,e.baseState=a,e.baseQueue=l,i.lastRenderedState=r}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Fd(e){var t=Ge(),n=t.queue;if(n===null)throw Error($(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,r=t.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do r=e(r,a.action),a=a.next;while(a!==s);zn(r,t.memoizedState)||(je=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),n.lastRenderedState=r}return[r,i]}function fy(e,t,n){var i=Qt,s=Ge(),r=fe;if(r){if(n===void 0)throw Error($(407));n=n()}else n=t();var a=!zn((ve||s).memoizedState,n);if(a&&(s.memoizedState=n,je=!0),s=s.queue,Mm(my.bind(null,i,s,e),[e]),s.getSnapshot!==t||a||Ve!==null&&Ve.memoizedState.tag&1){if(i.flags|=2048,Va(9,py.bind(null,i,s,n,t),{destroy:void 0},null),Me===null)throw Error($(349));r||(ks&60)!==0||dy(i,t,n)}return n}function dy(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Qt.updateQueue,t===null?(t=sh(),Qt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function py(e,t,n,i){t.value=n,t.getSnapshot=i,gy(t)&&_y(e)}function my(e,t,n){return n(function(){gy(t)&&_y(e)})}function gy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zn(e,n)}catch{return!0}}function _y(e){var t=Gs(e,2);t!==null&&xn(t,e,2)}function bp(e){var t=Tn();if(typeof e=="function"){var n=e;if(e=n(),Rr){Ls(!0);try{n()}finally{Ls(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:e},t}function vy(e,t,n,i){return e.baseState=n,Sm(e,ve,typeof i=="function"?i:ss)}function aE(e,t,n,i,s){if(oh(e))throw Error($(485));if(e=t.action,e!==null){var r={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(a){r.listeners.push(a)}};kt.T!==null?n(!0):r.isTransition=!1,i(r),n=t.pending,n===null?(r.next=t.pending=r,yy(t,r)):(r.next=n.next,t.pending=n.next=r)}}function yy(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var r=kt.T,a={};kt.T=a;try{var o=n(s,i),l=kt.S;l!==null&&l(a,o),C_(e,t,o)}catch(c){Ep(e,t,c)}finally{kt.T=r}}else try{r=n(s,i),C_(e,t,r)}catch(c){Ep(e,t,c)}}function C_(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){D_(e,t,i)},function(i){return Ep(e,t,i)}):D_(e,t,n)}function D_(e,t,n){t.status="fulfilled",t.value=n,xy(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,yy(e,n)))}function Ep(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,xy(t),t=t.next;while(t!==i)}e.action=null}function xy(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Sy(e,t){return t}function My(e,t){if(fe){var n=Me.formState;if(n!==null){t:{var i=Qt;if(fe){if(an){e:{for(var s=an,r=Ti;s.nodeType!==8;){if(!r){s=null;break e}if(s=di(s.nextSibling),s===null){s=null;break e}}r=s.data,s=r==="F!"||r==="F"?s:null}if(s){an=di(s.nextSibling),i=s.data==="F!";break t}}Ar(i)}i=!1}i&&(t=n[0])}}return n=Tn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Sy,lastRenderedState:t},n.queue=i,n=Fy.bind(null,Qt,i),i.dispatch=n,i=bp(!1),r=Am.bind(null,Qt,!1,i.queue),i=Tn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=aE.bind(null,Qt,s,r,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function by(e){var t=Ge();return Ey(t,ve,e)}function Ey(e,t,n){t=Sm(e,t,Sy)[0],e=_u(ss)[0],t=typeof t=="object"&&t!==null&&typeof t.then=="function"?Gl(t):t;var i=Ge(),s=i.queue,r=s.dispatch;return n!==i.memoizedState&&(Qt.flags|=2048,Va(9,oE.bind(null,s,n),{destroy:void 0},null)),[t,r,e]}function oE(e,t){e.action=t}function Ty(e){var t=Ge(),n=ve;if(n!==null)return Ey(t,n,e);Ge(),t=t.memoizedState,n=Ge();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function Va(e,t,n,i){return e={tag:e,create:t,inst:n,deps:i,next:null},t=Qt.updateQueue,t===null&&(t=sh(),Qt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Ay(){return Ge().memoizedState}function vu(e,t,n,i){var s=Tn();Qt.flags|=e,s.memoizedState=Va(1|t,n,{destroy:void 0},i===void 0?null:i)}function ah(e,t,n,i){var s=Ge();i=i===void 0?null:i;var r=s.memoizedState.inst;ve!==null&&i!==null&&mm(i,ve.memoizedState.deps)?s.memoizedState=Va(t,n,r,i):(Qt.flags|=e,s.memoizedState=Va(1|t,n,r,i))}function U_(e,t){vu(8390656,8,e,t)}function Mm(e,t){ah(2048,8,e,t)}function wy(e,t){return ah(4,2,e,t)}function Ry(e,t){return ah(4,4,e,t)}function Cy(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Dy(e,t,n){n=n!=null?n.concat([e]):null,ah(4,4,Cy.bind(null,t,e),n)}function bm(){}function Uy(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&mm(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Ly(e,t){var n=Ge();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&mm(t,i[1]))return i[0];if(i=e(),Rr){Ls(!0);try{e()}finally{Ls(!1)}}return n.memoizedState=[i,t],i}function Em(e,t,n){return n===void 0||(ks&1073741824)!==0?e.memoizedState=t:(e.memoizedState=n,e=xx(),Qt.lanes|=e,Xs|=e,n)}function Ny(e,t,n,i){return zn(n,t)?n:Fa.current!==null?(e=Em(e,n,i),zn(e,t)||(je=!0),e):(ks&42)===0?(je=!0,e.memoizedState=n):(e=xx(),Qt.lanes|=e,Xs|=e,t)}function Iy(e,t,n,i,s){var r=be.p;be.p=r!==0&&8>r?r:8;var a=kt.T,o={};kt.T=o,Am(e,!1,t,n);try{var l=s(),c=kt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=iE(l,i);fl(e,t,u,Bn(e))}else fl(e,t,i,Bn(e))}catch(d){fl(e,t,{then:function(){},status:"rejected",reason:d},Bn())}finally{be.p=r,kt.T=a}}function lE(){}function Tp(e,t,n,i){if(e.tag!==5)throw Error($(476));var s=Oy(e).queue;Iy(e,s,t,xr,n===null?lE:function(){return Py(e),n(i)})}function Oy(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:xr,baseState:xr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:xr},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Py(e){var t=Oy(e).next.queue;fl(e,t,{},Bn())}function Tm(){return fn(Ll)}function By(){return Ge().memoizedState}function zy(){return Ge().memoizedState}function cE(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Bn();e=Os(n);var i=Ps(t,e,n);i!==null&&(xn(i,t,n),pl(i,t,n)),t={cache:dm()},e.payload=t;return}t=t.return}}function uE(e,t,n){var i=Bn();n={lane:i,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},oh(e)?Hy(t,n):(n=cm(e,t,n,i),n!==null&&(xn(n,e,i),Vy(n,t,i)))}function Fy(e,t,n){var i=Bn();fl(e,t,n,i)}function fl(e,t,n,i){var s={lane:i,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(oh(e))Hy(t,s);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var a=t.lastRenderedState,o=r(a,n);if(s.hasEagerState=!0,s.eagerState=o,zn(o,a))return ih(e,t,s,0),Me===null&&nh(),!1}catch{}finally{}if(n=cm(e,t,s,i),n!==null)return xn(n,e,i),Vy(n,t,i),!0}return!1}function Am(e,t,n,i){if(i={lane:2,revertLane:Pm(),action:i,hasEagerState:!1,eagerState:null,next:null},oh(e)){if(t)throw Error($(479))}else t=cm(e,n,i,2),t!==null&&xn(t,e,2)}function oh(e){var t=e.alternate;return e===Qt||t!==null&&t===Qt}function Hy(e,t){Na=Ou=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vy(e,t,n){if((n&4194176)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Cv(e,n)}}var Di={readContext:fn,use:rh,useCallback:ze,useContext:ze,useEffect:ze,useImperativeHandle:ze,useLayoutEffect:ze,useInsertionEffect:ze,useMemo:ze,useReducer:ze,useRef:ze,useState:ze,useDebugValue:ze,useDeferredValue:ze,useTransition:ze,useSyncExternalStore:ze,useId:ze};Di.useCacheRefresh=ze;Di.useMemoCache=ze;Di.useHostTransitionStatus=ze;Di.useFormState=ze;Di.useActionState=ze;Di.useOptimistic=ze;var Ir={readContext:fn,use:rh,useCallback:function(e,t){return Tn().memoizedState=[e,t===void 0?null:t],e},useContext:fn,useEffect:U_,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,vu(4194308,4,Cy.bind(null,t,e),n)},useLayoutEffect:function(e,t){return vu(4194308,4,e,t)},useInsertionEffect:function(e,t){vu(4,2,e,t)},useMemo:function(e,t){var n=Tn();t=t===void 0?null:t;var i=e();if(Rr){Ls(!0);try{e()}finally{Ls(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=Tn();if(n!==void 0){var s=n(t);if(Rr){Ls(!0);try{n(t)}finally{Ls(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=uE.bind(null,Qt,e),[i.memoizedState,e]},useRef:function(e){var t=Tn();return e={current:e},t.memoizedState=e},useState:function(e){e=bp(e);var t=e.queue,n=Fy.bind(null,Qt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:bm,useDeferredValue:function(e,t){var n=Tn();return Em(n,e,t)},useTransition:function(){var e=bp(!1);return e=Iy.bind(null,Qt,e.queue,!0,!1),Tn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Qt,s=Tn();if(fe){if(n===void 0)throw Error($(407));n=n()}else{if(n=t(),Me===null)throw Error($(349));(ce&60)!==0||dy(i,t,n)}s.memoizedState=n;var r={value:n,getSnapshot:t};return s.queue=r,U_(my.bind(null,i,r,e),[e]),i.flags|=2048,Va(9,py.bind(null,i,r,n,t),{destroy:void 0},null),n},useId:function(){var e=Tn(),t=Me.identifierPrefix;if(fe){var n=$i,i=ji;n=(i&~(1<<32-Pn(i)-1)).toString(32)+n,t=":"+t+"R"+n,n=Pu++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=sE++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},useCacheRefresh:function(){return Tn().memoizedState=cE.bind(null,Qt)}};Ir.useMemoCache=xm;Ir.useHostTransitionStatus=Tm;Ir.useFormState=My;Ir.useActionState=My;Ir.useOptimistic=function(e){var t=Tn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Am.bind(null,Qt,!0,n),n.dispatch=t,[e,t]};var Ys={readContext:fn,use:rh,useCallback:Uy,useContext:fn,useEffect:Mm,useImperativeHandle:Dy,useInsertionEffect:wy,useLayoutEffect:Ry,useMemo:Ly,useReducer:_u,useRef:Ay,useState:function(){return _u(ss)},useDebugValue:bm,useDeferredValue:function(e,t){var n=Ge();return Ny(n,ve.memoizedState,e,t)},useTransition:function(){var e=_u(ss)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Gl(e),t]},useSyncExternalStore:fy,useId:By};Ys.useCacheRefresh=zy;Ys.useMemoCache=xm;Ys.useHostTransitionStatus=Tm;Ys.useFormState=by;Ys.useActionState=by;Ys.useOptimistic=function(e,t){var n=Ge();return vy(n,ve,e,t)};var Or={readContext:fn,use:rh,useCallback:Uy,useContext:fn,useEffect:Mm,useImperativeHandle:Dy,useInsertionEffect:wy,useLayoutEffect:Ry,useMemo:Ly,useReducer:Fd,useRef:Ay,useState:function(){return Fd(ss)},useDebugValue:bm,useDeferredValue:function(e,t){var n=Ge();return ve===null?Em(n,e,t):Ny(n,ve.memoizedState,e,t)},useTransition:function(){var e=Fd(ss)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Gl(e),t]},useSyncExternalStore:fy,useId:By};Or.useCacheRefresh=zy;Or.useMemoCache=xm;Or.useHostTransitionStatus=Tm;Or.useFormState=Ty;Or.useActionState=Ty;Or.useOptimistic=function(e,t){var n=Ge();return ve!==null?vy(n,ve,e,t):(n.baseState=e,[e,n.queue.dispatch])};function Hd(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Ee({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ap={isMounted:function(e){return(e=e._reactInternals)?Xa(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Bn(),s=Os(i);s.payload=t,n!=null&&(s.callback=n),t=Ps(e,s,i),t!==null&&(xn(t,e,i),pl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Bn(),s=Os(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Ps(e,s,i),t!==null&&(xn(t,e,i),pl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Bn(),i=Os(n);i.tag=2,t!=null&&(i.callback=t),t=Ps(e,i,n),t!==null&&(xn(t,e,n),pl(t,e,n))}};function L_(e,t,n,i,s,r,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,r,a):t.prototype&&t.prototype.isPureReactComponent?!Tl(n,i)||!Tl(s,r):!0}function N_(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Ap.enqueueReplaceState(t,t.state,null)}function Cr(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Ee({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}var Bu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Gy(e){Bu(e)}function ky(e){console.error(e)}function Wy(e){Bu(e)}function zu(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function I_(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function wp(e,t,n){return n=Os(n),n.tag=3,n.payload={element:null},n.callback=function(){zu(e,t)},n}function Xy(e){return e=Os(e),e.tag=3,e}function qy(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var r=i.value;e.payload=function(){return s(r)},e.callback=function(){I_(t,n,i)}}var a=n.stateNode;a!==null&&typeof a.componentDidCatch=="function"&&(e.callback=function(){I_(t,n,i),typeof s!="function"&&(zs===null?zs=new Set([this]):zs.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function hE(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&kl(t,n,s,!0),n=ai.current,n!==null){switch(n.tag){case 13:return Ci===null?Gp():n.alternate===null&&Oe===0&&(Oe=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===xp?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),$d(e,i,s)),!1;case 22:return n.flags|=65536,i===xp?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),$d(e,i,s)),!1}throw Error($(435,n.tag))}return $d(e,i,s),Gp(),!1}if(fe)return t=ai.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==yp&&(e=Error($(422),{cause:i}),Al(ii(e,n)))):(i!==yp&&(t=Error($(423),{cause:i}),Al(ii(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=ii(i,n),s=wp(e.stateNode,i,s),qd(e,s),Oe!==4&&(Oe=2)),!1;var r=Error($(520),{cause:i});if(r=ii(r,n),vl===null?vl=[r]:vl.push(r),Oe!==4&&(Oe=2),t===null)return!0;i=ii(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=wp(n.stateNode,i,e),qd(n,e),!1;case 1:if(t=n.type,r=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(zs===null||!zs.has(r))))return n.flags|=65536,s&=-s,n.lanes|=s,s=Xy(s),qy(s,e,n,i),qd(n,s),!1}n=n.return}while(n!==null);return!1}var Yy=Error($(461)),je=!1;function rn(e,t,n,i){t.child=e===null?oy(t,null,n,i):wr(t,e.child,n,i)}function O_(e,t,n,i,s){n=n.render;var r=t.ref;if("ref"in i){var a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}else a=i;return Dr(t),i=gm(e,t,n,a,r,s),o=_m(),e!==null&&!je?(vm(e,t,s),rs(e,t,s)):(fe&&o&&um(t),t.flags|=1,rn(e,t,i,s),t.child)}function P_(e,t,n,i,s){if(e===null){var r=n.type;return typeof r=="function"&&!Um(r)&&r.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=r,Zy(e,t,r,i,s)):(e=xu(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!wm(e,s)){var a=r.memoizedProps;if(n=n.compare,n=n!==null?n:Tl,n(a,i)&&e.ref===t.ref)return rs(e,t,s)}return t.flags|=1,e=Bs(r,i),e.ref=t.ref,e.return=t,t.child=e}function Zy(e,t,n,i,s){if(e!==null){var r=e.memoizedProps;if(Tl(r,i)&&e.ref===t.ref)if(je=!1,t.pendingProps=i=r,wm(e,s))(e.flags&131072)!==0&&(je=!0);else return t.lanes=e.lanes,rs(e,t,s)}return Rp(e,t,n,i,s)}function Ky(e,t,n){var i=t.pendingProps,s=i.children,r=(t.stateNode._pendingVisibility&2)!==0,a=e!==null?e.memoizedState:null;if(dl(e,t),i.mode==="hidden"||r){if((t.flags&128)!==0){if(i=a!==null?a.baseLanes|n:n,e!==null){for(s=t.child=e.child,r=0;s!==null;)r=r|s.lanes|s.childLanes,s=s.sibling;t.childLanes=r&~i}else t.childLanes=0,t.child=null;return B_(e,t,i,n)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&gu(t,a!==null?a.cachePool:null),a!==null?A_(t,a):Sp(),ly(t);else return t.lanes=t.childLanes=536870912,B_(e,t,a!==null?a.baseLanes|n:n,n)}else a!==null?(gu(t,a.cachePool),A_(t,a),Cs(t),t.memoizedState=null):(e!==null&&gu(t,null),Sp(),Cs(t));return rn(e,t,s,n),t.child}function B_(e,t,n,i){var s=pm();return s=s===null?null:{parent:Xe._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&gu(t,null),Sp(),ly(t),e!==null&&kl(e,t,i,!0),null}function dl(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=2097664);else{if(typeof n!="function"&&typeof n!="object")throw Error($(284));(e===null||e.ref!==n)&&(t.flags|=2097664)}}function Rp(e,t,n,i,s){return Dr(t),n=gm(e,t,n,i,void 0,s),i=_m(),e!==null&&!je?(vm(e,t,s),rs(e,t,s)):(fe&&i&&um(t),t.flags|=1,rn(e,t,n,s),t.child)}function z_(e,t,n,i,s,r){return Dr(t),t.updateQueue=null,n=hy(t,i,n,s),uy(e),i=_m(),e!==null&&!je?(vm(e,t,r),rs(e,t,r)):(fe&&i&&um(t),t.flags|=1,rn(e,t,n,r),t.child)}function F_(e,t,n,i,s){if(Dr(t),t.stateNode===null){var r=Ea,a=n.contextType;typeof a=="object"&&a!==null&&(r=fn(a)),r=new n(i,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Ap,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=i,r.state=t.memoizedState,r.refs={},Rm(t),a=n.contextType,r.context=typeof a=="object"&&a!==null?fn(a):Ea,r.state=t.memoizedState,a=n.getDerivedStateFromProps,typeof a=="function"&&(Hd(t,n,a,i),r.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(a=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),a!==r.state&&Ap.enqueueReplaceState(r,r.state,null),gl(t,i,r,s),ml(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){r=t.stateNode;var o=t.memoizedProps,l=Cr(n,o);r.props=l;var c=r.context,u=n.contextType;a=Ea,typeof u=="object"&&u!==null&&(a=fn(u));var d=n.getDerivedStateFromProps;u=typeof d=="function"||typeof r.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,u||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(o||c!==a)&&N_(t,r,i,a),ws=!1;var h=t.memoizedState;r.state=h,gl(t,i,r,s),ml(),c=t.memoizedState,o||h!==c||ws?(typeof d=="function"&&(Hd(t,n,d,i),c=t.memoizedState),(l=ws||L_(t,n,l,i,h,c,a))?(u||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),r.props=i,r.state=c,r.context=a,i=l):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{r=t.stateNode,Ip(e,t),a=t.memoizedProps,u=Cr(n,a),r.props=u,d=t.pendingProps,h=r.context,c=n.contextType,l=Ea,typeof c=="object"&&c!==null&&(l=fn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(a!==d||h!==l)&&N_(t,r,i,l),ws=!1,h=t.memoizedState,r.state=h,gl(t,i,r,s),ml();var p=t.memoizedState;a!==d||h!==p||ws||e!==null&&e.dependencies!==null&&Fu(e.dependencies)?(typeof o=="function"&&(Hd(t,n,o,i),p=t.memoizedState),(u=ws||L_(t,n,u,i,h,p,l)||e!==null&&e.dependencies!==null&&Fu(e.dependencies))?(c||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(i,p,l),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(i,p,l)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),r.props=i,r.state=p,r.context=l,i=u):(typeof r.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),i=!1)}return r=i,dl(e,t),i=(t.flags&128)!==0,r||i?(r=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&i?(t.child=wr(t,e.child,null,s),t.child=wr(t,null,n,s)):rn(e,t,n,s),t.memoizedState=r.state,e=t.child):e=rs(e,t,s),e}function H_(e,t,n,i){return Hl(),t.flags|=256,rn(e,t,n,i),t.child}var Vd={dehydrated:null,treeContext:null,retryLane:0};function Gd(e){return{baseLanes:e,cachePool:cy()}}function kd(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=ri),e}function Jy(e,t,n){var i=t.pendingProps,s=!1,r=(t.flags&128)!==0,a;if((a=r)||(a=e!==null&&e.memoizedState===null?!1:(qe.current&2)!==0),a&&(s=!0,t.flags&=-129),a=(t.flags&32)!==0,t.flags&=-33,e===null){if(fe){if(s?Rs(t):Cs(t),fe){var o=an,l;if(l=o){t:{for(l=o,o=Ti;l.nodeType!==8;){if(!o){o=null;break t}if(l=di(l.nextSibling),l===null){o=null;break t}}o=l}o!==null?(t.memoizedState={dehydrated:o,treeContext:Sr!==null?{id:ji,overflow:$i}:null,retryLane:536870912},l=si(18,null,null,0),l.stateNode=o,l.return=t,t.child=l,yn=t,an=null,l=!0):l=!1}l||Ar(t)}if(o=t.memoizedState,o!==null&&(o=o.dehydrated,o!==null))return o.data==="$!"?t.lanes=16:t.lanes=536870912,null;ts(t)}return o=i.children,i=i.fallback,s?(Cs(t),s=t.mode,o=Dp({mode:"hidden",children:o},s),i=br(i,s,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,s=t.child,s.memoizedState=Gd(n),s.childLanes=kd(e,a,n),t.memoizedState=Vd,i):(Rs(t),Cp(t,o))}if(l=e.memoizedState,l!==null&&(o=l.dehydrated,o!==null)){if(r)t.flags&256?(Rs(t),t.flags&=-257,t=Wd(e,t,n)):t.memoizedState!==null?(Cs(t),t.child=e.child,t.flags|=128,t=null):(Cs(t),s=i.fallback,o=t.mode,i=Dp({mode:"visible",children:i.children},o),s=br(s,o,n,null),s.flags|=2,i.return=t,s.return=t,i.sibling=s,t.child=i,wr(t,e.child,null,n),i=t.child,i.memoizedState=Gd(n),i.childLanes=kd(e,a,n),t.memoizedState=Vd,t=s);else if(Rs(t),o.data==="$!"){if(a=o.nextSibling&&o.nextSibling.dataset,a)var c=a.dgst;a=c,i=Error($(419)),i.stack="",i.digest=a,Al({value:i,source:null,stack:null}),t=Wd(e,t,n)}else if(je||kl(e,t,n,!1),a=(n&e.childLanes)!==0,je||a){if(a=Me,a!==null){if(i=n&-n,(i&42)!==0)i=1;else switch(i){case 2:i=1;break;case 8:i=4;break;case 32:i=16;break;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:i=64;break;case 268435456:i=134217728;break;default:i=0}if(i=(i&(a.suspendedLanes|n))!==0?0:i,i!==0&&i!==l.retryLane)throw l.retryLane=i,Gs(e,i),xn(a,e,i),Yy}o.data==="$?"||Gp(),t=Wd(e,t,n)}else o.data==="$?"?(t.flags|=128,t.child=e.child,t=AE.bind(null,e),o._reactRetry=t,t=null):(e=l.treeContext,an=di(o.nextSibling),yn=t,fe=!0,fi=null,Ti=!1,e!==null&&(ti[ei++]=ji,ti[ei++]=$i,ti[ei++]=Sr,ji=e.id,$i=e.overflow,Sr=t),t=Cp(t,i.children),t.flags|=4096);return t}return s?(Cs(t),s=i.fallback,o=t.mode,l=e.child,c=l.sibling,i=Bs(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&31457280,c!==null?s=Bs(c,s):(s=br(s,o,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,i=s,s=t.child,o=e.child.memoizedState,o===null?o=Gd(n):(l=o.cachePool,l!==null?(c=Xe._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=cy(),o={baseLanes:o.baseLanes|n,cachePool:l}),s.memoizedState=o,s.childLanes=kd(e,a,n),t.memoizedState=Vd,i):(Rs(t),n=e.child,e=n.sibling,n=Bs(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(a=t.deletions,a===null?(t.deletions=[e],t.flags|=16):a.push(e)),t.child=n,t.memoizedState=null,n)}function Cp(e,t){return t=Dp({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Dp(e,t){return vx(e,t,0,null)}function Wd(e,t,n){return wr(t,e.child,null,n),e=Cp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function V_(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Lp(e.return,t,n)}function Xd(e,t,n,i,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s)}function Qy(e,t,n){var i=t.pendingProps,s=i.revealOrder,r=i.tail;if(rn(e,t,i.children,n),i=qe.current,(i&2)!==0)i=i&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&V_(e,n,t);else if(e.tag===19)V_(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}switch(we(qe,i),s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Iu(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Xd(t,!1,s,n,r);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Iu(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Xd(t,!0,n,null,r);break;case"together":Xd(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function rs(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Xs|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(kl(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error($(153));if(t.child!==null){for(e=t.child,n=Bs(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Bs(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function wm(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Fu(e)))}function fE(e,t,n){switch(t.tag){case 3:Tu(t,t.stateNode.containerInfo),Ds(t,Xe,e.memoizedState.cache),Hl();break;case 27:case 5:up(t);break;case 4:Tu(t,t.stateNode.containerInfo);break;case 10:Ds(t,t.type,t.memoizedProps.value);break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Rs(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Jy(e,t,n):(Rs(t),e=rs(e,t,n),e!==null?e.sibling:null);Rs(t);break;case 19:var s=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(kl(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return Qy(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),we(qe,qe.current),i)break;return null;case 22:case 23:return t.lanes=0,Ky(e,t,n);case 24:Ds(t,Xe,e.memoizedState.cache)}return rs(e,t,n)}function jy(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)je=!0;else{if(!wm(e,n)&&(t.flags&128)===0)return je=!1,fE(e,t,n);je=(e.flags&131072)!==0}else je=!1,fe&&(t.flags&1048576)!==0&&iy(t,Lu,t.index);switch(t.lanes=0,t.tag){case 16:t:{e=t.pendingProps;var i=t.elementType,s=i._init;if(i=s(i._payload),t.type=i,typeof i=="function")Um(i)?(e=Cr(i,e),t.tag=1,t=F_(null,t,i,e,n)):(t.tag=0,t=Rp(null,t,i,e,n));else{if(i!=null){if(s=i.$$typeof,s===jp){t.tag=11,t=O_(null,t,i,e,n);break t}else if(s===$p){t.tag=14,t=P_(null,t,i,e,n);break t}}throw t=lp(i)||i,Error($(306,t,""))}}return t;case 0:return Rp(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=Cr(i,t.pendingProps),F_(e,t,i,s,n);case 3:t:{if(Tu(t,t.stateNode.containerInfo),e===null)throw Error($(387));var r=t.pendingProps;s=t.memoizedState,i=s.element,Ip(e,t),gl(t,r,null,n);var a=t.memoizedState;if(r=a.cache,Ds(t,Xe,r),r!==s.cache&&Np(t,[Xe],n,!0),ml(),r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=H_(e,t,r,n);break t}else if(r!==i){i=ii(Error($(424)),t),Al(i),t=H_(e,t,r,n);break t}else for(an=di(t.stateNode.containerInfo.firstChild),yn=t,fe=!0,fi=null,Ti=!0,n=oy(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Hl(),r===i){t=rs(e,t,n);break t}rn(e,t,r,n)}t=t.child}return t;case 26:return dl(e,t),e===null?(n=ov(t.type,null,t.pendingProps,null))?t.memoizedState=n:fe||(n=t.type,e=t.pendingProps,i=qu(Is.current).createElement(n),i[hn]=t,i[An]=e,on(i,n,e),Qe(i),t.stateNode=i):t.memoizedState=ov(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return up(t),e===null&&fe&&(i=t.stateNode=Px(t.type,t.pendingProps,Is.current),yn=t,Ti=!0,an=di(i.firstChild)),i=t.pendingProps.children,e!==null||fe?rn(e,t,i,n):t.child=wr(t,null,i,n),dl(e,t),t.child;case 5:return e===null&&fe&&((s=i=an)&&(i=HE(i,t.type,t.pendingProps,Ti),i!==null?(t.stateNode=i,yn=t,an=di(i.firstChild),Ti=!1,s=!0):s=!1),s||Ar(t)),up(t),s=t.type,r=t.pendingProps,a=e!==null?e.memoizedProps:null,i=r.children,Yp(s,r)?i=null:a!==null&&Yp(s,a)&&(t.flags|=32),t.memoizedState!==null&&(s=gm(e,t,rE,null,null,n),Ll._currentValue=s),dl(e,t),rn(e,t,i,n),t.child;case 6:return e===null&&fe&&((e=n=an)&&(n=VE(n,t.pendingProps,Ti),n!==null?(t.stateNode=n,yn=t,an=null,e=!0):e=!1),e||Ar(t)),null;case 13:return Jy(e,t,n);case 4:return Tu(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=wr(t,null,i,n):rn(e,t,i,n),t.child;case 11:return O_(e,t,t.type,t.pendingProps,n);case 7:return rn(e,t,t.pendingProps,n),t.child;case 8:return rn(e,t,t.pendingProps.children,n),t.child;case 12:return rn(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,Ds(t,t.type,i.value),rn(e,t,i.children,n),t.child;case 9:return s=t.type._context,i=t.pendingProps.children,Dr(t),s=fn(s),i=i(s),t.flags|=1,rn(e,t,i,n),t.child;case 14:return P_(e,t,t.type,t.pendingProps,n);case 15:return Zy(e,t,t.type,t.pendingProps,n);case 19:return Qy(e,t,n);case 22:return Ky(e,t,n);case 24:return Dr(t),i=fn(Xe),e===null?(s=pm(),s===null&&(s=Me,r=dm(),s.pooledCache=r,r.refCount++,r!==null&&(s.pooledCacheLanes|=n),s=r),t.memoizedState={parent:i,cache:s},Rm(t),Ds(t,Xe,s)):((e.lanes&n)!==0&&(Ip(e,t),gl(t,null,null,n),ml()),s=e.memoizedState,r=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),Ds(t,Xe,i)):(i=r.cache,Ds(t,Xe,i),i!==s.cache&&Np(t,[Xe],n,!0))),rn(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error($(156,t.tag))}var Up=Ui(null),Pr=null,es=null;function Ds(e,t,n){we(Up,t._currentValue),t._currentValue=n}function ns(e){e._currentValue=Up.current,$e(Up)}function Lp(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function Np(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var r=s.dependencies;if(r!==null){var a=s.child;r=r.firstContext;t:for(;r!==null;){var o=r;r=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){r.lanes|=n,o=r.alternate,o!==null&&(o.lanes|=n),Lp(r.return,n,e),i||(a=null);break t}r=o.next}}else if(s.tag===18){if(a=s.return,a===null)throw Error($(341));a.lanes|=n,r=a.alternate,r!==null&&(r.lanes|=n),Lp(a,n,e),a=null}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}}function kl(e,t,n,i){e=null;for(var s=t,r=!1;s!==null;){if(!r){if((s.flags&524288)!==0)r=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var a=s.alternate;if(a===null)throw Error($(387));if(a=a.memoizedProps,a!==null){var o=s.type;zn(s.pendingProps.value,a.value)||(e!==null?e.push(o):e=[o])}}else if(s===Eu.current){if(a=s.alternate,a===null)throw Error($(387));a.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(Ll):e=[Ll])}s=s.return}e!==null&&Np(t,e,n,i),t.flags|=262144}function Fu(e){for(e=e.firstContext;e!==null;){if(!zn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Dr(e){Pr=e,es=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function fn(e){return $y(Pr,e)}function su(e,t){return Pr===null&&Dr(e),$y(e,t)}function $y(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},es===null){if(e===null)throw Error($(308));es=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else es=es.next=t;return n}var ws=!1;function Rm(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ip(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Os(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ps(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Ue&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=Du(e),ny(e,null,n),t}return ih(e,i,t,n),Du(e)}function pl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194176)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Cv(e,n)}}function qd(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,r=null;if(n=n.firstBaseUpdate,n!==null){do{var a={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};r===null?s=r=a:r=r.next=a,n=n.next}while(n!==null);r===null?s=r=t:r=r.next=t}else s=r=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:r,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Op=!1;function ml(){if(Op){var e=La;if(e!==null)throw e}}function gl(e,t,n,i){Op=!1;var s=e.updateQueue;ws=!1;var r=s.firstBaseUpdate,a=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?r=c:a.next=c,a=l;var u=e.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==a&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(r!==null){var d=s.baseState;a=0,u=c=l=null,o=r;do{var h=o.lane&-536870913,p=h!==o.lane;if(p?(ce&h)===h:(i&h)===h){h!==0&&h===Ha&&(Op=!0),u!==null&&(u=u.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,M=o;h=t;var m=n;switch(M.tag){case 1:if(g=M.payload,typeof g=="function"){d=g.call(m,d,h);break t}d=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=M.payload,h=typeof g=="function"?g.call(m,d,h):g,h==null)break t;d=Ee({},d,h);break t;case 2:ws=!0}}h=o.callback,h!==null&&(e.flags|=64,p&&(e.flags|=8192),p=s.callbacks,p===null?s.callbacks=[h]:p.push(h))}else p={lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,a|=h;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;p=o,o=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);u===null&&(l=d),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=u,r===null&&(s.shared.lanes=0),Xs|=a,e.lanes=a,e.memoizedState=d}}function tx(e,t){if(typeof e!="function")throw Error($(191,e));e.call(t)}function ex(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)tx(n[e],t)}function Wl(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var r=n.create,a=n.inst;i=r(),a.destroy=i}n=n.next}while(n!==s)}}catch(o){xe(t,t.return,o)}}function Ws(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var r=s.next;i=r;do{if((i.tag&e)===e){var a=i.inst,o=a.destroy;if(o!==void 0){a.destroy=void 0,s=t;var l=n;try{o()}catch(c){xe(s,l,c)}}}i=i.next}while(i!==r)}}catch(c){xe(t,t.return,c)}}function nx(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{ex(t,n)}catch(i){xe(e,e.return,i)}}}function ix(e,t,n){n.props=Cr(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){xe(e,t,i)}}function yr(e,t){try{var n=e.ref;if(n!==null){var i=e.stateNode;switch(e.tag){case 26:case 27:case 5:var s=i;break;default:s=i}typeof n=="function"?e.refCleanup=n(s):n.current=s}}catch(r){xe(e,t,r)}}function In(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){xe(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){xe(e,t,s)}else n.current=null}function sx(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){xe(e,e.return,s)}}function G_(e,t,n){try{var i=e.stateNode;OE(i,e.type,n,t),i[An]=t}catch(s){xe(e,e.return,s)}}function rx(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27||e.tag===4}function Yd(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||rx(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==27&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Pp(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=uh));else if(i!==4&&i!==27&&(e=e.child,e!==null))for(Pp(e,t,n),e=e.sibling;e!==null;)Pp(e,t,n),e=e.sibling}function Hu(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&i!==27&&(e=e.child,e!==null))for(Hu(e,t,n),e=e.sibling;e!==null;)Hu(e,t,n),e=e.sibling}var Zi=!1,Ie=!1,Zd=!1,k_=typeof WeakSet=="function"?WeakSet:Set,Je=null,W_=!1;function dE(e,t){if(e=e.containerInfo,Xp=Ju,e=Kv(e),om(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var s=i.anchorOffset,r=i.focusNode;i=i.focusOffset;try{n.nodeType,r.nodeType}catch{n=null;break t}var a=0,o=-1,l=-1,c=0,u=0,d=e,h=null;e:for(;;){for(var p;d!==n||s!==0&&d.nodeType!==3||(o=a+s),d!==r||i!==0&&d.nodeType!==3||(l=a+i),d.nodeType===3&&(a+=d.nodeValue.length),(p=d.firstChild)!==null;)h=d,d=p;for(;;){if(d===e)break e;if(h===n&&++c===s&&(o=a),h===r&&++u===i&&(l=a),(p=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(qp={focusedElem:e,selectionRange:n},Ju=!1,Je=t;Je!==null;)if(t=Je,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Je=e;else for(;Je!==null;){switch(t=Je,r=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&r!==null){e=void 0,n=t,s=r.memoizedProps,r=r.memoizedState,i=n.stateNode;try{var g=Cr(n.type,s,n.elementType===n.type);e=i.getSnapshotBeforeUpdate(g,r),i.__reactInternalSnapshotBeforeUpdate=e}catch(M){xe(n,n.return,M)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Zp(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Zp(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error($(163))}if(e=t.sibling,e!==null){e.return=t.return,Je=e;break}Je=t.return}return g=W_,W_=!1,g}function ax(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:qi(e,n),i&4&&Wl(5,n);break;case 1:if(qi(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(o){xe(n,n.return,o)}else{var s=Cr(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){xe(n,n.return,o)}}i&64&&nx(n),i&512&&yr(n,n.return);break;case 3:if(qi(e,n),i&64&&(i=n.updateQueue,i!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{ex(i,e)}catch(o){xe(n,n.return,o)}}break;case 26:qi(e,n),i&512&&yr(n,n.return);break;case 27:case 5:qi(e,n),t===null&&i&4&&sx(n),i&512&&yr(n,n.return);break;case 12:qi(e,n);break;case 13:qi(e,n),i&4&&cx(e,n);break;case 22:if(s=n.memoizedState!==null||Zi,!s){t=t!==null&&t.memoizedState!==null||Ie;var r=Zi,a=Ie;Zi=s,(Ie=t)&&!a?Ts(e,n,(n.subtreeFlags&8772)!==0):qi(e,n),Zi=r,Ie=a}i&512&&(n.memoizedProps.mode==="manual"?yr(n,n.return):In(n,n.return));break;default:qi(e,n)}}function ox(e){var t=e.alternate;t!==null&&(e.alternate=null,ox(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&em(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var He=null,Ln=!1;function Xi(e,t,n){for(n=n.child;n!==null;)lx(e,t,n),n=n.sibling}function lx(e,t,n){if(On&&typeof On.onCommitFiberUnmount=="function")try{On.onCommitFiberUnmount(Pl,n)}catch{}switch(n.tag){case 26:Ie||In(n,t),Xi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ie||In(n,t);var i=He,s=Ln;for(He=n.stateNode,Xi(e,t,n),n=n.stateNode,t=n.attributes;t.length;)n.removeAttributeNode(t[0]);em(n),He=i,Ln=s;break;case 5:Ie||In(n,t);case 6:s=He;var r=Ln;if(He=null,Xi(e,t,n),He=s,Ln=r,He!==null)if(Ln)try{e=He,i=n.stateNode,e.nodeType===8?e.parentNode.removeChild(i):e.removeChild(i)}catch(a){xe(n,t,a)}else try{He.removeChild(n.stateNode)}catch(a){xe(n,t,a)}break;case 18:He!==null&&(Ln?(t=He,n=n.stateNode,t.nodeType===8?sp(t.parentNode,n):t.nodeType===1&&sp(t,n),Ol(t)):sp(He,n.stateNode));break;case 4:i=He,s=Ln,He=n.stateNode.containerInfo,Ln=!0,Xi(e,t,n),He=i,Ln=s;break;case 0:case 11:case 14:case 15:Ie||Ws(2,n,t),Ie||Ws(4,n,t),Xi(e,t,n);break;case 1:Ie||(In(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&ix(n,t,i)),Xi(e,t,n);break;case 21:Xi(e,t,n);break;case 22:Ie||In(n,t),Ie=(i=Ie)||n.memoizedState!==null,Xi(e,t,n),Ie=i;break;default:Xi(e,t,n)}}function cx(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ol(e)}catch(n){xe(t,t.return,n)}}function pE(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new k_),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new k_),t;default:throw Error($(435,e.tag))}}function Kd(e,t){var n=pE(e);t.forEach(function(i){var s=wE.bind(null,e,i);n.has(i)||(n.add(i),i.then(s,s))})}function Jn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i],r=e,a=t,o=a;t:for(;o!==null;){switch(o.tag){case 27:case 5:He=o.stateNode,Ln=!1;break t;case 3:He=o.stateNode.containerInfo,Ln=!0;break t;case 4:He=o.stateNode.containerInfo,Ln=!0;break t}o=o.return}if(He===null)throw Error($(160));lx(r,a,s),He=null,Ln=!1,r=s.alternate,r!==null&&(r.return=null),s.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)ux(t,e),t=t.sibling}var hi=null;function ux(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(t,e),Qn(e),i&4&&(Ws(3,e,e.return),Wl(3,e),Ws(5,e,e.return));break;case 1:Jn(t,e),Qn(e),i&512&&(Ie||n===null||In(n,n.return)),i&64&&Zi&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var s=hi;if(Jn(t,e),Qn(e),i&512&&(Ie||n===null||In(n,n.return)),i&4){var r=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,s=s.ownerDocument||s;e:switch(i){case"title":r=s.getElementsByTagName("title")[0],(!r||r[Ml]||r[hn]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=s.createElement(i),s.head.insertBefore(r,s.querySelector("head > title"))),on(r,i,n),r[hn]=e,Qe(r),i=r;break t;case"link":var a=cv("link","href",s).get(i+(n.href||""));if(a){for(var o=0;o<a.length;o++)if(r=a[o],r.getAttribute("href")===(n.href==null?null:n.href)&&r.getAttribute("rel")===(n.rel==null?null:n.rel)&&r.getAttribute("title")===(n.title==null?null:n.title)&&r.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(o,1);break e}}r=s.createElement(i),on(r,i,n),s.head.appendChild(r);break;case"meta":if(a=cv("meta","content",s).get(i+(n.content||""))){for(o=0;o<a.length;o++)if(r=a[o],r.getAttribute("content")===(n.content==null?null:""+n.content)&&r.getAttribute("name")===(n.name==null?null:n.name)&&r.getAttribute("property")===(n.property==null?null:n.property)&&r.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(o,1);break e}}r=s.createElement(i),on(r,i,n),s.head.appendChild(r);break;default:throw Error($(468,i))}r[hn]=e,Qe(r),i=r}e.stateNode=i}else uv(s,e.type,e.stateNode);else e.stateNode=lv(s,i,e.memoizedProps);else r!==i?(r===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):r.count--,i===null?uv(s,e.type,e.stateNode):lv(s,i,e.memoizedProps)):i===null&&e.stateNode!==null&&G_(e,e.memoizedProps,n.memoizedProps)}break;case 27:if(i&4&&e.alternate===null){s=e.stateNode,r=e.memoizedProps;try{for(var l=s.firstChild;l;){var c=l.nextSibling,u=l.nodeName;l[Ml]||u==="HEAD"||u==="BODY"||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&l.rel.toLowerCase()==="stylesheet"||s.removeChild(l),l=c}for(var d=e.type,h=s.attributes;h.length;)s.removeAttributeNode(h[0]);on(s,d,r),s[hn]=e,s[An]=r}catch(g){xe(e,e.return,g)}}case 5:if(Jn(t,e),Qn(e),i&512&&(Ie||n===null||In(n,n.return)),e.flags&32){s=e.stateNode;try{za(s,"")}catch(g){xe(e,e.return,g)}}i&4&&e.stateNode!=null&&(s=e.memoizedProps,G_(e,s,n!==null?n.memoizedProps:s)),i&1024&&(Zd=!0);break;case 6:if(Jn(t,e),Qn(e),i&4){if(e.stateNode===null)throw Error($(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(g){xe(e,e.return,g)}}break;case 3:if(Mu=null,s=hi,hi=Yu(t.containerInfo),Jn(t,e),hi=s,Qn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ol(t.containerInfo)}catch(g){xe(e,e.return,g)}Zd&&(Zd=!1,hx(e));break;case 4:i=hi,hi=Yu(e.stateNode.containerInfo),Jn(t,e),Qn(e),hi=i;break;case 12:Jn(t,e),Qn(e);break;case 13:Jn(t,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Im=Ri()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Kd(e,i)));break;case 22:if(i&512&&(Ie||n===null||In(n,n.return)),l=e.memoizedState!==null,c=n!==null&&n.memoizedState!==null,u=Zi,d=Ie,Zi=u||l,Ie=d||c,Jn(t,e),Ie=d,Zi=u,Qn(e),t=e.stateNode,t._current=e,t._visibility&=-3,t._visibility|=t._pendingVisibility&2,i&8192&&(t._visibility=l?t._visibility&-2:t._visibility|1,l&&(t=Zi||Ie,n===null||c||t||pa(e)),e.memoizedProps===null||e.memoizedProps.mode!=="manual"))t:for(n=null,t=e;;){if(t.tag===5||t.tag===26||t.tag===27){if(n===null){c=n=t;try{if(s=c.stateNode,l)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{a=c.stateNode,o=c.memoizedProps.style;var p=o!=null&&o.hasOwnProperty("display")?o.display:null;a.style.display=p==null||typeof p=="boolean"?"":(""+p).trim()}}catch(g){xe(c,c.return,g)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(g){xe(c,c.return,g)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,Kd(e,n))));break;case 19:Jn(t,e),Qn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Kd(e,i)));break;case 21:break;default:Jn(t,e),Qn(e)}}function Qn(e){var t=e.flags;if(t&2){try{if(e.tag!==27){t:{for(var n=e.return;n!==null;){if(rx(n)){var i=n;break t}n=n.return}throw Error($(160))}switch(i.tag){case 27:var s=i.stateNode,r=Yd(e);Hu(e,r,s);break;case 5:var a=i.stateNode;i.flags&32&&(za(a,""),i.flags&=-33);var o=Yd(e);Hu(e,o,a);break;case 3:case 4:var l=i.stateNode.containerInfo,c=Yd(e);Pp(e,c,l);break;default:throw Error($(161))}}}catch(u){xe(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hx(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;hx(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function qi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ax(e,t.alternate,t),t=t.sibling}function pa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ws(4,t,t.return),pa(t);break;case 1:In(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&ix(t,t.return,n),pa(t);break;case 26:case 27:case 5:In(t,t.return),pa(t);break;case 22:In(t,t.return),t.memoizedState===null&&pa(t);break;default:pa(t)}e=e.sibling}}function Ts(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,s=e,r=t,a=r.flags;switch(r.tag){case 0:case 11:case 15:Ts(s,r,n),Wl(4,r);break;case 1:if(Ts(s,r,n),i=r,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(c){xe(i,i.return,c)}if(i=r,s=i.updateQueue,s!==null){var o=i.stateNode;try{var l=s.shared.hiddenCallbacks;if(l!==null)for(s.shared.hiddenCallbacks=null,s=0;s<l.length;s++)tx(l[s],o)}catch(c){xe(i,i.return,c)}}n&&a&64&&nx(r),yr(r,r.return);break;case 26:case 27:case 5:Ts(s,r,n),n&&i===null&&a&4&&sx(r),yr(r,r.return);break;case 12:Ts(s,r,n);break;case 13:Ts(s,r,n),n&&a&4&&cx(s,r);break;case 22:r.memoizedState===null&&Ts(s,r,n),yr(r,r.return);break;default:Ts(s,r,n)}t=t.sibling}}function Cm(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Vl(n))}function Dm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Vl(e))}function Es(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)fx(e,t,n,i),t=t.sibling}function fx(e,t,n,i){var s=t.flags;switch(t.tag){case 0:case 11:case 15:Es(e,t,n,i),s&2048&&Wl(9,t);break;case 3:Es(e,t,n,i),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Vl(e)));break;case 12:if(s&2048){Es(e,t,n,i),e=t.stateNode;try{var r=t.memoizedProps,a=r.id,o=r.onPostCommit;typeof o=="function"&&o(a,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){xe(t,t.return,l)}}else Es(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,t.memoizedState!==null?r._visibility&4?Es(e,t,n,i):_l(e,t):r._visibility&4?Es(e,t,n,i):(r._visibility|=4,ma(e,t,n,i,(t.subtreeFlags&10256)!==0)),s&2048&&Cm(t.alternate,t);break;case 24:Es(e,t,n,i),s&2048&&Dm(t.alternate,t);break;default:Es(e,t,n,i)}}function ma(e,t,n,i,s){for(s=s&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var r=e,a=t,o=n,l=i,c=a.flags;switch(a.tag){case 0:case 11:case 15:ma(r,a,o,l,s),Wl(8,a);break;case 23:break;case 22:var u=a.stateNode;a.memoizedState!==null?u._visibility&4?ma(r,a,o,l,s):_l(r,a):(u._visibility|=4,ma(r,a,o,l,s)),s&&c&2048&&Cm(a.alternate,a);break;case 24:ma(r,a,o,l,s),s&&c&2048&&Dm(a.alternate,a);break;default:ma(r,a,o,l,s)}t=t.sibling}}function _l(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:_l(n,i),s&2048&&Cm(i.alternate,i);break;case 24:_l(n,i),s&2048&&Dm(i.alternate,i);break;default:_l(n,i)}t=t.sibling}}var rl=8192;function fa(e){if(e.subtreeFlags&rl)for(e=e.child;e!==null;)dx(e),e=e.sibling}function dx(e){switch(e.tag){case 26:fa(e),e.flags&rl&&e.memoizedState!==null&&tT(hi,e.memoizedState,e.memoizedProps);break;case 5:fa(e);break;case 3:case 4:var t=hi;hi=Yu(e.stateNode.containerInfo),fa(e),hi=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=rl,rl=16777216,fa(e),rl=t):fa(e));break;default:fa(e)}}function px(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Qo(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Je=i,gx(i,e)}px(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)mx(e),e=e.sibling}function mx(e){switch(e.tag){case 0:case 11:case 15:Qo(e),e.flags&2048&&Ws(9,e,e.return);break;case 3:Qo(e);break;case 12:Qo(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&4&&(e.return===null||e.return.tag!==13)?(t._visibility&=-5,yu(e)):Qo(e);break;default:Qo(e)}}function yu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Je=i,gx(i,e)}px(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ws(8,t,t.return),yu(t);break;case 22:n=t.stateNode,n._visibility&4&&(n._visibility&=-5,yu(t));break;default:yu(t)}e=e.sibling}}function gx(e,t){for(;Je!==null;){var n=Je;switch(n.tag){case 0:case 11:case 15:Ws(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Vl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,Je=i;else t:for(n=e;Je!==null;){i=Je;var s=i.sibling,r=i.return;if(ox(i),i===n){Je=null;break t}if(s!==null){s.return=r,Je=s;break t}Je=r}}}function mE(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function si(e,t,n,i){return new mE(e,t,n,i)}function Um(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bs(e,t){var n=e.alternate;return n===null?(n=si(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&31457280,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function _x(e,t){e.flags&=31457282;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function xu(e,t,n,i,s,r){var a=0;if(i=e,typeof e=="function")Um(e)&&(a=1);else if(typeof e=="string")a=jE(e,n,wi.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case _a:return br(n.children,s,r,t);case vv:a=8,s|=24;break;case rp:return e=si(12,n,t,s|2),e.elementType=rp,e.lanes=r,e;case ap:return e=si(13,n,t,s),e.elementType=ap,e.lanes=r,e;case op:return e=si(19,n,t,s),e.elementType=op,e.lanes=r,e;case xv:return vx(n,s,r,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Hb:case Qi:a=10;break t;case yv:a=9;break t;case jp:a=11;break t;case $p:a=14;break t;case As:a=16,i=null;break t}a=29,n=Error($(130,e===null?"null":typeof e,"")),i=null}return t=si(a,n,t,s),t.elementType=e,t.type=i,t.lanes=r,t}function br(e,t,n,i){return e=si(7,e,i,t),e.lanes=n,e}function vx(e,t,n,i){e=si(22,e,i,t),e.elementType=xv,e.lanes=n;var s={_visibility:1,_pendingVisibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null,_current:null,detach:function(){var r=s._current;if(r===null)throw Error($(456));if((s._pendingVisibility&2)===0){var a=Gs(r,2);a!==null&&(s._pendingVisibility|=2,xn(a,r,2))}},attach:function(){var r=s._current;if(r===null)throw Error($(456));if((s._pendingVisibility&2)!==0){var a=Gs(r,2);a!==null&&(s._pendingVisibility&=-3,xn(a,r,2))}}};return e.stateNode=s,e}function Jd(e,t,n){return e=si(6,e,null,t),e.lanes=n,e}function Qd(e,t,n){return t=si(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Yi(e){e.flags|=4}function X_(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Fx(t)){if(t=ai.current,t!==null&&((ce&4194176)===ce?Ci!==null:(ce&62914560)!==ce&&(ce&536870912)===0||t!==Ci))throw ul=xp,sy;e.flags|=8192}}function ru(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?wv():536870912,e.lanes|=t,Ga|=t)}function jo(e,t){if(!fe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function De(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&31457280,i|=s.flags&31457280,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function gE(e,t,n){var i=t.pendingProps;switch(hm(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return De(t),null;case 1:return De(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),ns(Xe),Pa(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ko(t)?Yi(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,fi!==null&&(Vp(fi),fi=null))),De(t),null;case 26:return n=t.memoizedState,e===null?(Yi(t),n!==null?(De(t),X_(t,n)):(De(t),t.flags&=-16777217)):n?n!==e.memoizedState?(Yi(t),De(t),X_(t,n)):(De(t),t.flags&=-16777217):(e.memoizedProps!==i&&Yi(t),De(t),t.flags&=-16777217),null;case 27:Au(t),n=Is.current;var s=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Yi(t);else{if(!i){if(t.stateNode===null)throw Error($(166));return De(t),null}e=wi.current,Ko(t)?S_(t,e):(e=Px(s,i,n),t.stateNode=e,Yi(t))}return De(t),null;case 5:if(Au(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Yi(t);else{if(!i){if(t.stateNode===null)throw Error($(166));return De(t),null}if(e=wi.current,Ko(t))S_(t,e);else{switch(s=qu(Is.current),e){case 1:e=s.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:e=s.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":e=s.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":e=s.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof i.is=="string"?s.createElement("select",{is:i.is}):s.createElement("select"),i.multiple?e.multiple=!0:i.size&&(e.size=i.size);break;default:e=typeof i.is=="string"?s.createElement(n,{is:i.is}):s.createElement(n)}}e[hn]=t,e[An]=i;t:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break t;for(;s.sibling===null;){if(s.return===null||s.return===t)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=e;t:switch(on(e,n,i),n){case"button":case"input":case"select":case"textarea":e=!!i.autoFocus;break t;case"img":e=!0;break t;default:e=!1}e&&Yi(t)}}return De(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Yi(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error($(166));if(e=Is.current,Ko(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=yn,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[hn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||Nx(e.nodeValue,n)),e||Ar(t)}else e=qu(e).createTextNode(i),e[hn]=t,t.stateNode=e}return De(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=Ko(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error($(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error($(317));s[hn]=t}else Hl(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;De(t),s=!1}else fi!==null&&(Vp(fi),fi=null),s=!0;if(!s)return t.flags&256?(ts(t),t):(ts(t),null)}if(ts(t),(t.flags&128)!==0)return t.lanes=n,t;if(n=i!==null,e=e!==null&&e.memoizedState!==null,n){i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool);var r=null;i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(r=i.memoizedState.cachePool.pool),r!==s&&(i.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),ru(t,t.updateQueue),De(t),null;case 4:return Pa(),e===null&&Bm(t.stateNode.containerInfo),De(t),null;case 10:return ns(t.type),De(t),null;case 19:if($e(qe),s=t.memoizedState,s===null)return De(t),null;if(i=(t.flags&128)!==0,r=s.rendering,r===null)if(i)jo(s,!1);else{if(Oe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(r=Iu(e),r!==null){for(t.flags|=128,jo(s,!1),e=r.updateQueue,t.updateQueue=e,ru(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)_x(n,e),n=n.sibling;return we(qe,qe.current&1|2),t.child}e=e.sibling}s.tail!==null&&Ri()>Vu&&(t.flags|=128,i=!0,jo(s,!1),t.lanes=4194304)}else{if(!i)if(e=Iu(r),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,ru(t,e),jo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!r.alternate&&!fe)return De(t),null}else 2*Ri()-s.renderingStartTime>Vu&&n!==536870912&&(t.flags|=128,i=!0,jo(s,!1),t.lanes=4194304);s.isBackwards?(r.sibling=t.child,t.child=r):(e=s.last,e!==null?e.sibling=r:t.child=r,s.last=r)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Ri(),t.sibling=null,e=qe.current,we(qe,i?e&1|2:e&1),t):(De(t),null);case 22:case 23:return ts(t),fm(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(De(t),t.subtreeFlags&6&&(t.flags|=8192)):De(t),n=t.updateQueue,n!==null&&ru(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&$e(Mr),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ns(Xe),De(t),null;case 25:return null}throw Error($(156,t.tag))}function _E(e,t){switch(hm(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ns(Xe),Pa(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Au(t),null;case 13:if(ts(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error($(340));Hl()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return $e(qe),null;case 4:return Pa(),null;case 10:return ns(t.type),null;case 22:case 23:return ts(t),fm(),e!==null&&$e(Mr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ns(Xe),null;case 25:return null;default:return null}}function yx(e,t){switch(hm(t),t.tag){case 3:ns(Xe),Pa();break;case 26:case 27:case 5:Au(t);break;case 4:Pa();break;case 13:ts(t);break;case 19:$e(qe);break;case 10:ns(t.type);break;case 22:case 23:ts(t),fm(),e!==null&&$e(Mr);break;case 24:ns(Xe)}}var vE={getCacheForType:function(e){var t=fn(Xe),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n}},yE=typeof WeakMap=="function"?WeakMap:Map,Ue=0,Me=null,te=null,ce=0,Se=0,Nn=null,Ki=!1,Za=!1,Lm=!1,as=0,Oe=0,Xs=0,Er=0,Nm=0,ri=0,Ga=0,vl=null,Ai=null,Bp=!1,Im=0,Vu=1/0,Gu=null,zs=null,au=!1,_r=null,yl=0,zp=0,Fp=null,xl=0,Hp=null;function Bn(){if((Ue&2)!==0&&ce!==0)return ce&-ce;if(kt.T!==null){var e=Ha;return e!==0?e:Pm()}return Uv()}function xx(){ri===0&&(ri=(ce&536870912)===0||fe?Av():536870912);var e=ai.current;return e!==null&&(e.flags|=32),ri}function xn(e,t,n){(e===Me&&Se===2||e.cancelPendingCommit!==null)&&(ka(e,0),Ji(e,ce,ri,!1)),zl(e,n),((Ue&2)===0||e!==Me)&&(e===Me&&((Ue&2)===0&&(Er|=n),Oe===4&&Ji(e,ce,ri,!1)),Li(e))}function Sx(e,t,n){if((Ue&6)!==0)throw Error($(327));var i=!n&&(t&60)===0&&(t&e.expiredLanes)===0||Bl(e,t),s=i?ME(e,t):jd(e,t,!0),r=i;do{if(s===0){Za&&!i&&Ji(e,t,0,!1);break}else if(s===6)Ji(e,t,0,!Ki);else{if(n=e.current.alternate,r&&!xE(n)){s=jd(e,t,!1),r=!1;continue}if(s===2){if(r=t,e.errorRecoveryDisabledLanes&r)var a=0;else a=e.pendingLanes&-536870913,a=a!==0?a:a&536870912?536870912:0;if(a!==0){t=a;t:{var o=e;s=vl;var l=o.current.memoizedState.isDehydrated;if(l&&(ka(o,a).flags|=256),a=jd(o,a,!1),a!==2){if(Lm&&!l){o.errorRecoveryDisabledLanes|=r,Er|=r,s=4;break t}r=Ai,Ai=s,r!==null&&Vp(r)}s=a}if(r=!1,s!==2)continue}}if(s===1){ka(e,0),Ji(e,t,0,!0);break}t:{switch(i=e,s){case 0:case 1:throw Error($(345));case 4:if((t&4194176)===t){Ji(i,t,ri,!Ki);break t}break;case 2:Ai=null;break;case 3:case 5:break;default:throw Error($(329))}if(i.finishedWork=n,i.finishedLanes=t,(t&62914560)===t&&(r=Im+300-Ri(),10<r)){if(Ji(i,t,ri,!Ki),ju(i,0)!==0)break t;i.timeoutHandle=Ox(q_.bind(null,i,n,Ai,Gu,Bp,t,ri,Er,Ga,Ki,2,-0,0),r);break t}q_(i,n,Ai,Gu,Bp,t,ri,Er,Ga,Ki,0,-0,0)}}break}while(!0);Li(e)}function Vp(e){Ai===null?Ai=e:Ai.push.apply(Ai,e)}function q_(e,t,n,i,s,r,a,o,l,c,u,d,h){var p=t.subtreeFlags;if((p&8192||(p&16785408)===16785408)&&(Ul={stylesheets:null,count:0,unsuspend:$E},dx(t),t=eT(),t!==null)){e.cancelPendingCommit=t(Z_.bind(null,e,n,i,s,a,o,l,1,d,h)),Ji(e,r,a,!c);return}Z_(e,n,i,s,a,o,l,u,d,h)}function xE(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],r=s.getSnapshot;s=s.value;try{if(!zn(r(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ji(e,t,n,i){t&=~Nm,t&=~Er,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var r=31-Pn(s),a=1<<r;i[r]=-1,s&=~a}n!==0&&Rv(e,n,t)}function lh(){return(Ue&6)===0?(Xl(0,!1),!1):!0}function Om(){if(te!==null){if(Se===0)var e=te.return;else e=te,es=Pr=null,ym(e),Ua=null,wl=0,e=te;for(;e!==null;)yx(e.alternate,e),e=e.return;te=null}}function ka(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,BE(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Om(),Me=e,te=n=Bs(e.current,null),ce=t,Se=0,Nn=null,Ki=!1,Za=Bl(e,t),Lm=!1,Ga=ri=Nm=Er=Xs=Oe=0,Ai=vl=null,Bp=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var s=31-Pn(i),r=1<<s;t|=e[s],i&=~r}return as=t,nh(),n}function Mx(e,t){Qt=null,kt.H=Di,t===cl?(t=E_(),Se=3):t===sy?(t=E_(),Se=4):Se=t===Yy?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Nn=t,te===null&&(Oe=1,zu(e,ii(t,e.current)))}function bx(){var e=kt.H;return kt.H=Di,e===null?Di:e}function Ex(){var e=kt.A;return kt.A=vE,e}function Gp(){Oe=4,Ki||(ce&4194176)!==ce&&ai.current!==null||(Za=!0),(Xs&134217727)===0&&(Er&134217727)===0||Me===null||Ji(Me,ce,ri,!1)}function jd(e,t,n){var i=Ue;Ue|=2;var s=bx(),r=Ex();(Me!==e||ce!==t)&&(Gu=null,ka(e,t)),t=!1;var a=Oe;t:do try{if(Se!==0&&te!==null){var o=te,l=Nn;switch(Se){case 8:Om(),a=6;break t;case 3:case 2:case 6:ai.current===null&&(t=!0);var c=Se;if(Se=0,Nn=null,wa(e,o,l,c),n&&Za){a=0;break t}break;default:c=Se,Se=0,Nn=null,wa(e,o,l,c)}}SE(),a=Oe;break}catch(u){Mx(e,u)}while(!0);return t&&e.shellSuspendCounter++,es=Pr=null,Ue=i,kt.H=s,kt.A=r,te===null&&(Me=null,ce=0,nh()),a}function SE(){for(;te!==null;)Tx(te)}function ME(e,t){var n=Ue;Ue|=2;var i=bx(),s=Ex();Me!==e||ce!==t?(Gu=null,Vu=Ri()+500,ka(e,t)):Za=Bl(e,t);t:do try{if(Se!==0&&te!==null){t=te;var r=Nn;e:switch(Se){case 1:Se=0,Nn=null,wa(e,t,r,1);break;case 2:if(b_(r)){Se=0,Nn=null,Y_(t);break}t=function(){Se===2&&Me===e&&(Se=7),Li(e)},r.then(t,t);break t;case 3:Se=7;break t;case 4:Se=5;break t;case 7:b_(r)?(Se=0,Nn=null,Y_(t)):(Se=0,Nn=null,wa(e,t,r,7));break;case 5:var a=null;switch(te.tag){case 26:a=te.memoizedState;case 5:case 27:var o=te;if(!a||Fx(a)){Se=0,Nn=null;var l=o.sibling;if(l!==null)te=l;else{var c=o.return;c!==null?(te=c,ch(c)):te=null}break e}}Se=0,Nn=null,wa(e,t,r,5);break;case 6:Se=0,Nn=null,wa(e,t,r,6);break;case 8:Om(),Oe=6;break t;default:throw Error($(462))}}bE();break}catch(u){Mx(e,u)}while(!0);return es=Pr=null,kt.H=i,kt.A=s,Ue=n,te!==null?0:(Me=null,ce=0,nh(),Oe)}function bE(){for(;te!==null&&!Xb();)Tx(te)}function Tx(e){var t=jy(e.alternate,e,as);e.memoizedProps=e.pendingProps,t===null?ch(e):te=t}function Y_(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=z_(n,t,t.pendingProps,t.type,void 0,ce);break;case 11:t=z_(n,t,t.pendingProps,t.type.render,t.ref,ce);break;case 5:ym(t);default:yx(n,t),t=te=_x(t,as),t=jy(n,t,as)}e.memoizedProps=e.pendingProps,t===null?ch(e):te=t}function wa(e,t,n,i){es=Pr=null,ym(t),Ua=null,wl=0;var s=t.return;try{if(hE(e,s,t,n,ce)){Oe=1,zu(e,ii(n,e.current)),te=null;return}}catch(r){if(s!==null)throw te=s,r;Oe=1,zu(e,ii(n,e.current)),te=null;return}t.flags&32768?(fe||i===1?e=!0:Za||(ce&536870912)!==0?e=!1:(Ki=e=!0,(i===2||i===3||i===6)&&(i=ai.current,i!==null&&i.tag===13&&(i.flags|=16384))),Ax(t,e)):ch(t)}function ch(e){var t=e;do{if((t.flags&32768)!==0){Ax(t,Ki);return}e=t.return;var n=gE(t.alternate,t,as);if(n!==null){te=n;return}if(t=t.sibling,t!==null){te=t;return}te=t=e}while(t!==null);Oe===0&&(Oe=5)}function Ax(e,t){do{var n=_E(e.alternate,e);if(n!==null){n.flags&=32767,te=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){te=e;return}te=e=n}while(e!==null);Oe=6,te=null}function Z_(e,t,n,i,s,r,a,o,l,c){var u=kt.T,d=be.p;try{be.p=2,kt.T=null,EE(e,t,n,i,d,s,r,a,o,l,c)}finally{kt.T=u,be.p=d}}function EE(e,t,n,i,s,r,a,o){do Oa();while(_r!==null);if((Ue&6)!==0)throw Error($(327));var l=e.finishedWork;if(i=e.finishedLanes,l===null)return null;if(e.finishedWork=null,e.finishedLanes=0,l===e.current)throw Error($(177));e.callbackNode=null,e.callbackPriority=0,e.cancelPendingCommit=null;var c=l.lanes|l.childLanes;if(c|=lm,n1(e,i,c,r,a,o),e===Me&&(te=Me=null,ce=0),(l.subtreeFlags&10256)===0&&(l.flags&10256)===0||au||(au=!0,zp=c,Fp=n,RE(wu,function(){return Oa(!0),null})),n=(l.flags&15990)!==0,(l.subtreeFlags&15990)!==0||n?(n=kt.T,kt.T=null,r=be.p,be.p=2,a=Ue,Ue|=4,dE(e,l),ux(l,e),Z1(qp,e.containerInfo),Ju=!!Xp,qp=Xp=null,e.current=l,ax(e,l.alternate,l),qb(),Ue=a,be.p=r,kt.T=n):e.current=l,au?(au=!1,_r=e,yl=i):wx(e,c),c=e.pendingLanes,c===0&&(zs=null),Qb(l.stateNode,s),Li(e),t!==null)for(s=e.onRecoverableError,l=0;l<t.length;l++)c=t[l],s(c.value,{componentStack:c.stack});return(yl&3)!==0&&Oa(),c=e.pendingLanes,(i&4194218)!==0&&(c&42)!==0?e===Hp?xl++:(xl=0,Hp=e):xl=0,Xl(0,!1),null}function wx(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Vl(t)))}function Oa(){if(_r!==null){var e=_r,t=zp;zp=0;var n=Dv(yl),i=kt.T,s=be.p;try{if(be.p=32>n?32:n,kt.T=null,_r===null)var r=!1;else{n=Fp,Fp=null;var a=_r,o=yl;if(_r=null,yl=0,(Ue&6)!==0)throw Error($(331));var l=Ue;if(Ue|=4,mx(a.current),fx(a,a.current,o,n),Ue=l,Xl(0,!1),On&&typeof On.onPostCommitFiberRoot=="function")try{On.onPostCommitFiberRoot(Pl,a)}catch{}r=!0}return r}finally{be.p=s,kt.T=i,wx(e,t)}}return!1}function K_(e,t,n){t=ii(n,t),t=wp(e.stateNode,t,2),e=Ps(e,t,2),e!==null&&(zl(e,2),Li(e))}function xe(e,t,n){if(e.tag===3)K_(e,e,n);else for(;t!==null;){if(t.tag===3){K_(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(zs===null||!zs.has(i))){e=ii(n,e),n=Xy(2),i=Ps(t,n,2),i!==null&&(qy(n,i,t,e),zl(i,2),Li(i));break}}t=t.return}}function $d(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new yE;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(Lm=!0,s.add(n),e=TE.bind(null,e,t,n),t.then(e,e))}function TE(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Me===e&&(ce&n)===n&&(Oe===4||Oe===3&&(ce&62914560)===ce&&300>Ri()-Im?(Ue&2)===0&&ka(e,0):Nm|=n,Ga===ce&&(Ga=0)),Li(e)}function Rx(e,t){t===0&&(t=wv()),e=Gs(e,t),e!==null&&(zl(e,t),Li(e))}function AE(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Rx(e,n)}function wE(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error($(314))}i!==null&&i.delete(t),Rx(e,n)}function RE(e,t){return tm(e,t)}var ku=null,ga=null,kp=!1,Wu=!1,tp=!1,Tr=0;function Li(e){e!==ga&&e.next===null&&(ga===null?ku=ga=e:ga=ga.next=e),Wu=!0,kp||(kp=!0,DE(CE))}function Xl(e,t){if(!tp&&Wu){tp=!0;do for(var n=!1,i=ku;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var r=0;else{var a=i.suspendedLanes,o=i.pingedLanes;r=(1<<31-Pn(42|e)+1)-1,r&=s&~(a&~o),r=r&201326677?r&201326677|1:r?r|2:0}r!==0&&(n=!0,J_(i,r))}else r=ce,r=ju(i,i===Me?r:0),(r&3)===0||Bl(i,r)||(n=!0,J_(i,r));i=i.next}while(n);tp=!1}}function CE(){Wu=kp=!1;var e=0;Tr!==0&&(PE()&&(e=Tr),Tr=0);for(var t=Ri(),n=null,i=ku;i!==null;){var s=i.next,r=Cx(i,t);r===0?(i.next=null,n===null?ku=s:n.next=s,s===null&&(ga=n)):(n=i,(e!==0||(r&3)!==0)&&(Wu=!0)),i=s}Xl(e,!1)}function Cx(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var a=31-Pn(r),o=1<<a,l=s[a];l===-1?((o&n)===0||(o&i)!==0)&&(s[a]=e1(o,t)):l<=t&&(e.expiredLanes|=o),r&=~o}if(t=Me,n=ce,n=ju(e,e===t?n:0),i=e.callbackNode,n===0||e===t&&Se===2||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Ud(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Bl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Ud(i),Dv(n)){case 2:case 8:n=Ev;break;case 32:n=wu;break;case 268435456:n=Tv;break;default:n=wu}return i=Dx.bind(null,e),n=tm(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Ud(i),e.callbackPriority=2,e.callbackNode=null,2}function Dx(e,t){var n=e.callbackNode;if(Oa()&&e.callbackNode!==n)return null;var i=ce;return i=ju(e,e===Me?i:0),i===0?null:(Sx(e,i,t),Cx(e,Ri()),e.callbackNode!=null&&e.callbackNode===n?Dx.bind(null,e):null)}function J_(e,t){if(Oa())return null;Sx(e,t,!0)}function DE(e){zE(function(){(Ue&6)!==0?tm(bv,e):e()})}function Pm(){return Tr===0&&(Tr=Av()),Tr}function Q_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:du(""+e)}function j_(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function UE(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var r=Q_((s[An]||null).action),a=i.submitter;a&&(t=(t=a[An]||null)?Q_(t.formAction):a.getAttribute("formAction"),t!==null&&(r=t,a=null));var o=new $u("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Tr!==0){var l=a?j_(s,a):new FormData(s);Tp(n,{pending:!0,data:l,method:s.method,action:r},null,l)}}else typeof r=="function"&&(o.preventDefault(),l=a?j_(s,a):new FormData(s),Tp(n,{pending:!0,data:l,method:s.method,action:r},r,l))},currentTarget:s}]})}}for(ou=0;ou<y_.length;ou++)lu=y_[ou],$_=lu.toLowerCase(),tv=lu[0].toUpperCase()+lu.slice(1),pi($_,"on"+tv);var lu,$_,tv,ou;pi(Qv,"onAnimationEnd");pi(jv,"onAnimationIteration");pi($v,"onAnimationStart");pi("dblclick","onDoubleClick");pi("focusin","onFocus");pi("focusout","onBlur");pi(J1,"onTransitionRun");pi(Q1,"onTransitionStart");pi(j1,"onTransitionCancel");pi(ty,"onTransitionEnd");Ba("onMouseEnter",["mouseout","mouseover"]);Ba("onMouseLeave",["mouseout","mouseover"]);Ba("onPointerEnter",["pointerout","pointerover"]);Ba("onPointerLeave",["pointerout","pointerover"]);Ur("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ur("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ur("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ur("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ur("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ur("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Cl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),LE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cl));function Ux(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var r=void 0;if(t)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==r&&s.isPropagationStopped())break t;r=o,s.currentTarget=c;try{r(s)}catch(u){Bu(u)}s.currentTarget=null,r=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==r&&s.isPropagationStopped())break t;r=o,s.currentTarget=c;try{r(s)}catch(u){Bu(u)}s.currentTarget=null,r=l}}}}function re(e,t){var n=t[fp];n===void 0&&(n=t[fp]=new Set);var i=e+"__bubble";n.has(i)||(Lx(t,e,2,!1),n.add(i))}function ep(e,t,n){var i=0;t&&(i|=4),Lx(n,e,i,t)}var cu="_reactListening"+Math.random().toString(36).slice(2);function Bm(e){if(!e[cu]){e[cu]=!0,Lv.forEach(function(n){n!=="selectionchange"&&(LE.has(n)||ep(n,!1,e),ep(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[cu]||(t[cu]=!0,ep("selectionchange",!1,t))}}function Lx(e,t,n,i){switch(Wx(t)){case 2:var s=sT;break;case 8:s=rT;break;default:s=Vm}n=s.bind(null,t,n,e),s=void 0,!gp||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function np(e,t,n,i,s){var r=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===s||o.nodeType===8&&o.parentNode===s)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;a=a.return}for(;o!==null;){if(a=vr(o),a===null)return;if(l=a.tag,l===5||l===6||l===26||l===27){i=r=a;continue t}o=o.parentNode}}i=i.return}Hv(function(){var c=r,u=im(n),d=[];t:{var h=ey.get(e);if(h!==void 0){var p=$u,g=e;switch(e){case"keypress":if(mu(n)===0)break t;case"keydown":case"keyup":p=w1;break;case"focusin":g="focus",p=Pd;break;case"focusout":g="blur",p=Pd;break;case"beforeblur":case"afterblur":p=Pd;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=l_;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=m1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=D1;break;case Qv:case jv:case $v:p=v1;break;case ty:p=L1;break;case"scroll":case"scrollend":p=d1;break;case"wheel":p=I1;break;case"copy":case"cut":case"paste":p=x1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=u_;break;case"toggle":case"beforetoggle":p=P1}var M=(t&4)!==0,m=!M&&(e==="scroll"||e==="scrollend"),f=M?h!==null?h+"Capture":null:h;M=[];for(var _=c,v;_!==null;){var y=_;if(v=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||v===null||f===null||(y=bl(_,f),y!=null&&M.push(Dl(_,y,v))),m)break;_=_.return}0<M.length&&(h=new p(h,g,null,n,u),d.push({event:h,listeners:M}))}}if((t&7)===0){t:{if(h=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",h&&n!==mp&&(g=n.relatedTarget||n.fromElement)&&(vr(g)||g[qa]))break t;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?vr(g):null,g!==null&&(m=Xa(g),M=g.tag,g!==m||M!==5&&M!==27&&M!==6)&&(g=null)):(p=null,g=c),p!==g)){if(M=l_,y="onMouseLeave",f="onMouseEnter",_="mouse",(e==="pointerout"||e==="pointerover")&&(M=u_,y="onPointerLeave",f="onPointerEnter",_="pointer"),m=p==null?h:sl(p),v=g==null?h:sl(g),h=new M(y,_+"leave",p,n,u),h.target=m,h.relatedTarget=v,y=null,vr(u)===c&&(M=new M(f,_+"enter",g,n,u),M.target=v,M.relatedTarget=m,y=M),m=y,p&&g)e:{for(M=p,f=g,_=0,v=M;v;v=da(v))_++;for(v=0,y=f;y;y=da(y))v++;for(;0<_-v;)M=da(M),_--;for(;0<v-_;)f=da(f),v--;for(;_--;){if(M===f||f!==null&&M===f.alternate)break e;M=da(M),f=da(f)}M=null}else M=null;p!==null&&ev(d,h,p,M,!1),g!==null&&m!==null&&ev(d,m,g,M,!0)}}t:{if(h=c?sl(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var A=p_;else if(d_(h))if(qv)A=q1;else{A=W1;var C=k1}else p=h.nodeName,!p||p.toLowerCase()!=="input"||h.type!=="checkbox"&&h.type!=="radio"?c&&nm(c.elementType)&&(A=p_):A=X1;if(A&&(A=A(e,c))){Xv(d,A,n,u);break t}C&&C(e,h,c),e==="focusout"&&c&&h.type==="number"&&c.memoizedProps.value!=null&&pp(h,"number",h.value)}switch(C=c?sl(c):window,e){case"focusin":(d_(C)||C.contentEditable==="true")&&(Sa=C,_p=c,ll=null);break;case"focusout":ll=_p=Sa=null;break;case"mousedown":vp=!0;break;case"contextmenu":case"mouseup":case"dragend":vp=!1,v_(d,n,u);break;case"selectionchange":if(K1)break;case"keydown":case"keyup":v_(d,n,u)}var w;if(am)t:{switch(e){case"compositionstart":var U="onCompositionStart";break t;case"compositionend":U="onCompositionEnd";break t;case"compositionupdate":U="onCompositionUpdate";break t}U=void 0}else xa?kv(e,n)&&(U="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(U="onCompositionStart");U&&(Gv&&n.locale!=="ko"&&(xa||U!=="onCompositionStart"?U==="onCompositionEnd"&&xa&&(w=Vv()):(Ns=u,sm="value"in Ns?Ns.value:Ns.textContent,xa=!0)),C=Xu(c,U),0<C.length&&(U=new c_(U,e,null,n,u),d.push({event:U,listeners:C}),w?U.data=w:(w=Wv(n),w!==null&&(U.data=w)))),(w=z1?F1(e,n):H1(e,n))&&(U=Xu(c,"onBeforeInput"),0<U.length&&(C=new c_("onBeforeInput","beforeinput",null,n,u),d.push({event:C,listeners:U}),C.data=w)),UE(d,e,c,n,u)}Ux(d,t)})}function Dl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Xu(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,r=s.stateNode;s=s.tag,s!==5&&s!==26&&s!==27||r===null||(s=bl(e,n),s!=null&&i.unshift(Dl(e,s,r)),s=bl(e,t),s!=null&&i.push(Dl(e,s,r))),e=e.return}return i}function da(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ev(e,t,n,i,s){for(var r=t._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=bl(n,r),c!=null&&a.unshift(Dl(n,c,l))):s||(c=bl(n,r),c!=null&&a.push(Dl(n,c,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var NE=/\r\n?/g,IE=/\u0000|\uFFFD/g;function nv(e){return(typeof e=="string"?e:""+e).replace(NE,`
`).replace(IE,"")}function Nx(e,t){return t=nv(t),nv(e)===t}function uh(){}function _e(e,t,n,i,s,r){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||za(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&za(e,""+i);break;case"className":Qc(e,"class",i);break;case"tabIndex":Qc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Qc(e,n,i);break;case"style":Fv(e,i,r);break;case"data":if(t!=="object"){Qc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=du(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(n==="formAction"?(t!=="input"&&_e(e,t,"name",s.name,s,null),_e(e,t,"formEncType",s.formEncType,s,null),_e(e,t,"formMethod",s.formMethod,s,null),_e(e,t,"formTarget",s.formTarget,s,null)):(_e(e,t,"encType",s.encType,s,null),_e(e,t,"method",s.method,s,null),_e(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=du(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=uh);break;case"onScroll":i!=null&&re("scroll",e);break;case"onScrollEnd":i!=null&&re("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error($(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error($(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=du(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":re("beforetoggle",e),re("toggle",e),fu(e,"popover",i);break;case"xlinkActuate":Wi(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Wi(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Wi(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Wi(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Wi(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Wi(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Wi(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Wi(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Wi(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":fu(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=h1.get(n)||n,fu(e,n,i))}}function Wp(e,t,n,i,s,r){switch(n){case"style":Fv(e,i,r);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error($(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error($(60));e.innerHTML=n}}break;case"children":typeof i=="string"?za(e,i):(typeof i=="number"||typeof i=="bigint")&&za(e,""+i);break;case"onScroll":i!=null&&re("scroll",e);break;case"onScrollEnd":i!=null&&re("scrollend",e);break;case"onClick":i!=null&&(e.onclick=uh);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Nv.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),t=n.slice(2,s?n.length-7:void 0),r=e[An]||null,r=r!=null?r[n]:null,typeof r=="function"&&e.removeEventListener(t,r,s),typeof i=="function")){typeof r!="function"&&r!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,s);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):fu(e,n,i)}}}function on(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":re("error",e),re("load",e);var i=!1,s=!1,r;for(r in n)if(n.hasOwnProperty(r)){var a=n[r];if(a!=null)switch(r){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error($(137,t));default:_e(e,t,r,a,n,null)}}s&&_e(e,t,"srcSet",n.srcSet,n,null),i&&_e(e,t,"src",n.src,n,null);return;case"input":re("invalid",e);var o=r=a=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"name":s=u;break;case"type":a=u;break;case"checked":l=u;break;case"defaultChecked":c=u;break;case"value":r=u;break;case"defaultValue":o=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error($(137,t));break;default:_e(e,t,i,u,n,null)}}Pv(e,r,o,l,c,a,s,!1),Ru(e);return;case"select":re("invalid",e),i=a=r=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":r=o;break;case"defaultValue":a=o;break;case"multiple":i=o;default:_e(e,t,s,o,n,null)}t=r,n=a,e.multiple=!!i,t!=null?Ca(e,!!i,t,!1):n!=null&&Ca(e,!!i,n,!0);return;case"textarea":re("invalid",e),r=s=i=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":i=o;break;case"defaultValue":s=o;break;case"children":r=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error($(91));break;default:_e(e,t,a,o,n,null)}zv(e,i,s,r),Ru(e);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:_e(e,t,l,i,n,null)}return;case"dialog":re("cancel",e),re("close",e);break;case"iframe":case"object":re("load",e);break;case"video":case"audio":for(i=0;i<Cl.length;i++)re(Cl[i],e);break;case"image":re("error",e),re("load",e);break;case"details":re("toggle",e);break;case"embed":case"source":case"link":re("error",e),re("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error($(137,t));default:_e(e,t,c,i,n,null)}return;default:if(nm(t)){for(u in n)n.hasOwnProperty(u)&&(i=n[u],i!==void 0&&Wp(e,t,u,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&_e(e,t,o,i,n,null))}function OE(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,r=null,a=null,o=null,l=null,c=null,u=null;for(p in n){var d=n[p];if(n.hasOwnProperty(p)&&d!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(p)||_e(e,t,p,null,i,d)}}for(var h in i){var p=i[h];if(d=n[h],i.hasOwnProperty(h)&&(p!=null||d!=null))switch(h){case"type":r=p;break;case"name":s=p;break;case"checked":c=p;break;case"defaultChecked":u=p;break;case"value":a=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error($(137,t));break;default:p!==d&&_e(e,t,h,p,i,d)}}dp(e,a,o,l,c,u,r,s);return;case"select":p=a=o=h=null;for(r in n)if(l=n[r],n.hasOwnProperty(r)&&l!=null)switch(r){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(r)||_e(e,t,r,null,i,l)}for(s in i)if(r=i[s],l=n[s],i.hasOwnProperty(s)&&(r!=null||l!=null))switch(s){case"value":h=r;break;case"defaultValue":o=r;break;case"multiple":a=r;default:r!==l&&_e(e,t,s,r,i,l)}t=o,n=a,i=p,h!=null?Ca(e,!!n,h,!1):!!i!=!!n&&(t!=null?Ca(e,!!n,t,!0):Ca(e,!!n,n?[]:"",!1));return;case"textarea":p=h=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:_e(e,t,o,null,i,s)}for(a in i)if(s=i[a],r=n[a],i.hasOwnProperty(a)&&(s!=null||r!=null))switch(a){case"value":h=s;break;case"defaultValue":p=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error($(91));break;default:s!==r&&_e(e,t,a,s,i,r)}Bv(e,h,p);return;case"option":for(var g in n)if(h=n[g],n.hasOwnProperty(g)&&h!=null&&!i.hasOwnProperty(g))switch(g){case"selected":e.selected=!1;break;default:_e(e,t,g,null,i,h)}for(l in i)if(h=i[l],p=n[l],i.hasOwnProperty(l)&&h!==p&&(h!=null||p!=null))switch(l){case"selected":e.selected=h&&typeof h!="function"&&typeof h!="symbol";break;default:_e(e,t,l,h,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var M in n)h=n[M],n.hasOwnProperty(M)&&h!=null&&!i.hasOwnProperty(M)&&_e(e,t,M,null,i,h);for(c in i)if(h=i[c],p=n[c],i.hasOwnProperty(c)&&h!==p&&(h!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error($(137,t));break;default:_e(e,t,c,h,i,p)}return;default:if(nm(t)){for(var m in n)h=n[m],n.hasOwnProperty(m)&&h!==void 0&&!i.hasOwnProperty(m)&&Wp(e,t,m,void 0,i,h);for(u in i)h=i[u],p=n[u],!i.hasOwnProperty(u)||h===p||h===void 0&&p===void 0||Wp(e,t,u,h,i,p);return}}for(var f in n)h=n[f],n.hasOwnProperty(f)&&h!=null&&!i.hasOwnProperty(f)&&_e(e,t,f,null,i,h);for(d in i)h=i[d],p=n[d],!i.hasOwnProperty(d)||h===p||h==null&&p==null||_e(e,t,d,h,i,p)}var Xp=null,qp=null;function qu(e){return e.nodeType===9?e:e.ownerDocument}function iv(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ix(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Yp(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ip=null;function PE(){var e=window.event;return e&&e.type==="popstate"?e===ip?!1:(ip=e,!0):(ip=null,!1)}var Ox=typeof setTimeout=="function"?setTimeout:void 0,BE=typeof clearTimeout=="function"?clearTimeout:void 0,sv=typeof Promise=="function"?Promise:void 0,zE=typeof queueMicrotask=="function"?queueMicrotask:typeof sv<"u"?function(e){return sv.resolve(null).then(e).catch(FE)}:Ox;function FE(e){setTimeout(function(){throw e})}function sp(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(i===0){e.removeChild(s),Ol(t);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=s}while(n);Ol(t)}function Zp(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Zp(n),em(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function HE(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Ml])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==s.rel||e.getAttribute("href")!==(s.href==null?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=di(e.nextSibling),e===null)break}return null}function VE(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=di(e.nextSibling),e===null))return null;return e}function di(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}function rv(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}function Px(e,t,n){switch(t=qu(n),e){case"html":if(e=t.documentElement,!e)throw Error($(452));return e;case"head":if(e=t.head,!e)throw Error($(453));return e;case"body":if(e=t.body,!e)throw Error($(454));return e;default:throw Error($(451))}}var oi=new Map,av=new Set;function Yu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.ownerDocument}var os=be.d;be.d={f:GE,r:kE,D:WE,C:XE,L:qE,m:YE,X:KE,S:ZE,M:JE};function GE(){var e=os.f(),t=lh();return e||t}function kE(e){var t=Ya(e);t!==null&&t.tag===5&&t.type==="form"?Py(t):os.r(e)}var Ka=typeof document>"u"?null:document;function Bx(e,t,n){var i=Ka;if(i&&typeof t=="string"&&t){var s=ni(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),av.has(s)||(av.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),on(t,"link",e),Qe(t),i.head.appendChild(t)))}}function WE(e){os.D(e),Bx("dns-prefetch",e,null)}function XE(e,t){os.C(e,t),Bx("preconnect",e,t)}function qE(e,t,n){os.L(e,t,n);var i=Ka;if(i&&e&&t){var s='link[rel="preload"][as="'+ni(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+ni(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+ni(n.imageSizes)+'"]')):s+='[href="'+ni(e)+'"]';var r=s;switch(t){case"style":r=Wa(e);break;case"script":r=Ja(e)}oi.has(r)||(e=Ee({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),oi.set(r,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(ql(r))||t==="script"&&i.querySelector(Yl(r))||(t=i.createElement("link"),on(t,"link",e),Qe(t),i.head.appendChild(t)))}}function YE(e,t){os.m(e,t);var n=Ka;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+ni(i)+'"][href="'+ni(e)+'"]',r=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=Ja(e)}if(!oi.has(r)&&(e=Ee({rel:"modulepreload",href:e},t),oi.set(r,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Yl(r)))return}i=n.createElement("link"),on(i,"link",e),Qe(i),n.head.appendChild(i)}}}function ZE(e,t,n){os.S(e,t,n);var i=Ka;if(i&&e){var s=Ra(i).hoistableStyles,r=Wa(e);t=t||"default";var a=s.get(r);if(!a){var o={loading:0,preload:null};if(a=i.querySelector(ql(r)))o.loading=5;else{e=Ee({rel:"stylesheet",href:e,"data-precedence":t},n),(n=oi.get(r))&&zm(e,n);var l=a=i.createElement("link");Qe(l),on(l,"link",e),l._p=new Promise(function(c,u){l.onload=c,l.onerror=u}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Su(a,t,i)}a={type:"stylesheet",instance:a,count:1,state:o},s.set(r,a)}}}function KE(e,t){os.X(e,t);var n=Ka;if(n&&e){var i=Ra(n).hoistableScripts,s=Ja(e),r=i.get(s);r||(r=n.querySelector(Yl(s)),r||(e=Ee({src:e,async:!0},t),(t=oi.get(s))&&Fm(e,t),r=n.createElement("script"),Qe(r),on(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(s,r))}}function JE(e,t){os.M(e,t);var n=Ka;if(n&&e){var i=Ra(n).hoistableScripts,s=Ja(e),r=i.get(s);r||(r=n.querySelector(Yl(s)),r||(e=Ee({src:e,async:!0,type:"module"},t),(t=oi.get(s))&&Fm(e,t),r=n.createElement("script"),Qe(r),on(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(s,r))}}function ov(e,t,n,i){var s=(s=Is.current)?Yu(s):null;if(!s)throw Error($(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Wa(n.href),n=Ra(s).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Wa(n.href);var r=Ra(s).hoistableStyles,a=r.get(e);if(a||(s=s.ownerDocument||s,a={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,a),(r=s.querySelector(ql(e)))&&!r._p&&(a.instance=r,a.state.loading=5),oi.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},oi.set(e,n),r||QE(s,e,n,a.state))),t&&i===null)throw Error($(528,""));return a}if(t&&i!==null)throw Error($(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ja(n),n=Ra(s).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error($(444,e))}}function Wa(e){return'href="'+ni(e)+'"'}function ql(e){return'link[rel="stylesheet"]['+e+"]"}function zx(e){return Ee({},e,{"data-precedence":e.precedence,precedence:null})}function QE(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),on(t,"link",n),Qe(t),e.head.appendChild(t))}function Ja(e){return'[src="'+ni(e)+'"]'}function Yl(e){return"script[async]"+e}function lv(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+ni(n.href)+'"]');if(i)return t.instance=i,Qe(i),i;var s=Ee({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Qe(i),on(i,"style",s),Su(i,n.precedence,e),t.instance=i;case"stylesheet":s=Wa(n.href);var r=e.querySelector(ql(s));if(r)return t.state.loading|=4,t.instance=r,Qe(r),r;i=zx(n),(s=oi.get(s))&&zm(i,s),r=(e.ownerDocument||e).createElement("link"),Qe(r);var a=r;return a._p=new Promise(function(o,l){a.onload=o,a.onerror=l}),on(r,"link",i),t.state.loading|=4,Su(r,n.precedence,e),t.instance=r;case"script":return r=Ja(n.src),(s=e.querySelector(Yl(r)))?(t.instance=s,Qe(s),s):(i=n,(s=oi.get(r))&&(i=Ee({},n),Fm(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),Qe(s),on(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error($(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Su(i,n.precedence,e));return t.instance}function Su(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,r=s,a=0;a<i.length;a++){var o=i[a];if(o.dataset.precedence===t)r=o;else if(r!==s)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function zm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Fm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Mu=null;function cv(e,t,n){if(Mu===null){var i=new Map,s=Mu=new Map;s.set(n,i)}else s=Mu,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var r=n[s];if(!(r[Ml]||r[hn]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var a=r.getAttribute(t)||"";a=e+a;var o=i.get(a);o?o.push(r):i.set(a,[r])}}return i}function uv(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function jE(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Fx(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var Ul=null;function $E(){}function tT(e,t,n){if(Ul===null)throw Error($(475));var i=Ul;if(t.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var s=Wa(n.href),r=e.querySelector(ql(s));if(r){e=r._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(i.count++,i=Zu.bind(i),e.then(i,i)),t.state.loading|=4,t.instance=r,Qe(r);return}r=e.ownerDocument||e,n=zx(n),(s=oi.get(s))&&zm(n,s),r=r.createElement("link"),Qe(r);var a=r;a._p=new Promise(function(o,l){a.onload=o,a.onerror=l}),on(r,"link",n),t.instance=r}i.stylesheets===null&&(i.stylesheets=new Map),i.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(i.count++,t=Zu.bind(i),e.addEventListener("load",t),e.addEventListener("error",t))}}function eT(){if(Ul===null)throw Error($(475));var e=Ul;return e.stylesheets&&e.count===0&&Kp(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&Kp(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}function Zu(){if(this.count--,this.count===0){if(this.stylesheets)Kp(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ku=null;function Kp(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ku=new Map,t.forEach(nT,e),Ku=null,Zu.call(e))}function nT(e,t){if(!(t.state.loading&4)){var n=Ku.get(e);if(n)var i=n.get(null);else{n=new Map,Ku.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<s.length;r++){var a=s[r];(a.nodeName==="LINK"||a.getAttribute("media")!=="not all")&&(n.set(a.dataset.precedence,a),i=a)}i&&n.set(null,i)}s=t.instance,a=s.getAttribute("data-precedence"),r=n.get(a)||i,r===i&&n.set(null,s),n.set(a,s),this.count++,i=Zu.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),r?r.parentNode.insertBefore(s,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var Ll={$$typeof:Qi,Provider:null,Consumer:null,_currentValue:xr,_currentValue2:xr,_threadCount:0};function iT(e,t,n,i,s,r,a,o){this.tag=1,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ld(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ld(0),this.hiddenUpdates=Ld(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=r,this.onRecoverableError=a,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function Hx(e,t,n,i,s,r,a,o,l,c,u,d){return e=new iT(e,t,n,a,o,l,c,d),t=1,r===!0&&(t|=24),r=si(3,null,null,t),e.current=r,r.stateNode=e,t=dm(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:i,isDehydrated:n,cache:t},Rm(r),e}function Vx(e){return e?(e=Ea,e):Ea}function Gx(e,t,n,i,s,r){s=Vx(s),i.context===null?i.context=s:i.pendingContext=s,i=Os(t),i.payload={element:n},r=r===void 0?null:r,r!==null&&(i.callback=r),n=Ps(e,i,t),n!==null&&(xn(n,e,t),pl(n,e,t))}function hv(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Hm(e,t){hv(e,t),(e=e.alternate)&&hv(e,t)}function kx(e){if(e.tag===13){var t=Gs(e,67108864);t!==null&&xn(t,e,67108864),Hm(e,67108864)}}var Ju=!0;function sT(e,t,n,i){var s=kt.T;kt.T=null;var r=be.p;try{be.p=2,Vm(e,t,n,i)}finally{be.p=r,kt.T=s}}function rT(e,t,n,i){var s=kt.T;kt.T=null;var r=be.p;try{be.p=8,Vm(e,t,n,i)}finally{be.p=r,kt.T=s}}function Vm(e,t,n,i){if(Ju){var s=Jp(i);if(s===null)np(e,t,i,Qu,n),fv(e,i);else if(oT(s,e,t,n,i))i.stopPropagation();else if(fv(e,i),t&4&&-1<aT.indexOf(e)){for(;s!==null;){var r=Ya(s);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var a=mr(r.pendingLanes);if(a!==0){var o=r;for(o.pendingLanes|=2,o.entangledLanes|=2;a;){var l=1<<31-Pn(a);o.entanglements[1]|=l,a&=~l}Li(r),(Ue&6)===0&&(Vu=Ri()+500,Xl(0,!1))}}break;case 13:o=Gs(r,2),o!==null&&xn(o,r,2),lh(),Hm(r,2)}if(r=Jp(i),r===null&&np(e,t,i,Qu,n),r===s)break;s=r}s!==null&&i.stopPropagation()}else np(e,t,i,null,n)}}function Jp(e){return e=im(e),Gm(e)}var Qu=null;function Gm(e){if(Qu=null,e=vr(e),e!==null){var t=Xa(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=Sv(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Qu=e,null}function Wx(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Yb()){case bv:return 2;case Ev:return 8;case wu:case Zb:return 32;case Tv:return 268435456;default:return 32}default:return 32}}var Qp=!1,Fs=null,Hs=null,Vs=null,Nl=new Map,Il=new Map,Us=[],aT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function fv(e,t){switch(e){case"focusin":case"focusout":Fs=null;break;case"dragenter":case"dragleave":Hs=null;break;case"mouseover":case"mouseout":Vs=null;break;case"pointerover":case"pointerout":Nl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Il.delete(t.pointerId)}}function $o(e,t,n,i,s,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:r,targetContainers:[s]},t!==null&&(t=Ya(t),t!==null&&kx(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function oT(e,t,n,i,s){switch(t){case"focusin":return Fs=$o(Fs,e,t,n,i,s),!0;case"dragenter":return Hs=$o(Hs,e,t,n,i,s),!0;case"mouseover":return Vs=$o(Vs,e,t,n,i,s),!0;case"pointerover":var r=s.pointerId;return Nl.set(r,$o(Nl.get(r)||null,e,t,n,i,s)),!0;case"gotpointercapture":return r=s.pointerId,Il.set(r,$o(Il.get(r)||null,e,t,n,i,s)),!0}return!1}function Xx(e){var t=vr(e.target);if(t!==null){var n=Xa(t);if(n!==null){if(t=n.tag,t===13){if(t=Sv(n),t!==null){e.blockedOn=t,i1(e.priority,function(){if(n.tag===13){var i=Bn(),s=Gs(n,i);s!==null&&xn(s,n,i),Hm(n,i)}});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function bu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Jp(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);mp=i,n.target.dispatchEvent(i),mp=null}else return t=Ya(n),t!==null&&kx(t),e.blockedOn=n,!1;t.shift()}return!0}function dv(e,t,n){bu(e)&&n.delete(t)}function lT(){Qp=!1,Fs!==null&&bu(Fs)&&(Fs=null),Hs!==null&&bu(Hs)&&(Hs=null),Vs!==null&&bu(Vs)&&(Vs=null),Nl.forEach(dv),Il.forEach(dv)}function uu(e,t){e.blockedOn===t&&(e.blockedOn=null,Qp||(Qp=!0,Ye.unstable_scheduleCallback(Ye.unstable_NormalPriority,lT)))}var hu=null;function pv(e){hu!==e&&(hu=e,Ye.unstable_scheduleCallback(Ye.unstable_NormalPriority,function(){hu===e&&(hu=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(Gm(i||n)===null)continue;break}var r=Ya(n);r!==null&&(e.splice(t,3),t-=3,Tp(r,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function Ol(e){function t(l){return uu(l,e)}Fs!==null&&uu(Fs,e),Hs!==null&&uu(Hs,e),Vs!==null&&uu(Vs,e),Nl.forEach(t),Il.forEach(t);for(var n=0;n<Us.length;n++){var i=Us[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Us.length&&(n=Us[0],n.blockedOn===null);)Xx(n),n.blockedOn===null&&Us.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],r=n[i+1],a=s[An]||null;if(typeof r=="function")a||pv(n);else if(a){var o=null;if(r&&r.hasAttribute("formAction")){if(s=r,a=r[An]||null)o=a.formAction;else if(Gm(s)!==null)continue}else o=a.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),pv(n)}}}function km(e){this._internalRoot=e}hh.prototype.render=km.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error($(409));var n=t.current,i=Bn();Gx(n,i,e,t,null,null)};hh.prototype.unmount=km.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;e.tag===0&&Oa(),Gx(e.current,2,null,e,null,null),lh(),t[qa]=null}};function hh(e){this._internalRoot=e}hh.prototype.unstable_scheduleHydration=function(e){if(e){var t=Uv();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Us.length&&t!==0&&t<Us[n].priority;n++);Us.splice(n,0,e),n===0&&Xx(e)}};var mv=gv.version;if(mv!=="19.0.0")throw Error($(527,mv,"19.0.0"));be.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error($(188)):(e=Object.keys(e).join(","),Error($(268,e)));return e=Wb(t),e=e!==null?Mv(e):null,e=e===null?null:e.stateNode,e};var cT={bundleType:0,version:"19.0.0",rendererPackageName:"react-dom",currentDispatcherRef:kt,findFiberByHostInstance:vr,reconcilerVersion:"19.0.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(tl=__REACT_DEVTOOLS_GLOBAL_HOOK__,!tl.isDisabled&&tl.supportsFiber))try{Pl=tl.inject(cT),On=tl}catch{}var tl;fh.createRoot=function(e,t){if(!_v(e))throw Error($(299));var n=!1,i="",s=Gy,r=ky,a=Wy,o=null;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(a=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(o=t.unstable_transitionCallbacks)),t=Hx(e,1,!1,null,null,n,i,s,r,a,o,null),e[qa]=t.current,Bm(e.nodeType===8?e.parentNode:e),new km(t)};fh.hydrateRoot=function(e,t,n){if(!_v(e))throw Error($(299));var i=!1,s="",r=Gy,a=ky,o=Wy,l=null,c=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(r=n.onUncaughtError),n.onCaughtError!==void 0&&(a=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.unstable_transitionCallbacks!==void 0&&(l=n.unstable_transitionCallbacks),n.formState!==void 0&&(c=n.formState)),t=Hx(e,1,!0,t,n??null,i,s,r,a,o,l,c),t.context=Vx(null),n=t.current,i=Bn(),s=Os(i),s.callback=null,Ps(n,s,i),t.current.lanes=i,zl(t,i),Li(t),e[qa]=t.current,Bm(e),new hh(t)};fh.version="19.0.0"});var Kx=bi((A3,Zx)=>{"use strict";function Yx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Yx)}catch(e){console.error(e)}}Yx(),Zx.exports=qx()});var YM=bi(ad=>{"use strict";var X2=Symbol.for("react.transitional.element"),q2=Symbol.for("react.fragment");function qM(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:X2,type:e,key:i,ref:t!==void 0?t:null,props:n}}ad.Fragment=q2;ad.jsx=qM;ad.jsxs=qM});var Nc=bi((GL,ZM)=>{"use strict";ZM.exports=YM()});var hb=la(Kx());var sa=la(qc());var SS=0,Dg=1,MS=2;var Ug=1,bS=2,Fi=3,ps=0,bn=1,Xn=2,gs=0,Gr=1,Lg=2,Ng=3,Ig=4,ES=5,er=100,TS=101,AS=102,wS=103,RS=104,CS=200,DS=201,US=202,LS=203,Oh=204,Ph=205,NS=206,IS=207,OS=208,PS=209,BS=210,zS=211,FS=212,HS=213,VS=214,uf=0,hf=1,ff=2,kr=3,df=4,pf=5,mf=6,gf=7,Og=0,GS=1,kS=2,_s=0,WS=1,XS=2,qS=3,YS=4,ZS=5,KS=6,_f=7;var Pg=300,Qr=301,jr=302,vf=303,yf=304,Ac=306,Bi=1e3,Ii=1001,Bh=1002,Cn=1003,JS=1004;var wc=1005;var Vn=1006,xf=1007;var Hi=1008;var Si=1009,Bg=1010,zg=1011,wo=1012,Sf=1013,lr=1014,Vi=1015,Ro=1016,Mf=1017,bf=1018,Co=1020,Fg=35902,Hg=35899,Vg=1021,Gg=1022,ci=1023,uo=1026,Do=1027,kg=1028,Ef=1029,Wg=1030,Tf=1031;var Af=1033,Rc=33776,Cc=33777,Dc=33778,Uc=33779,wf=35840,Rf=35841,Cf=35842,Df=35843,Uf=36196,Lf=37492,Nf=37496,If=37808,Of=37809,Pf=37810,Bf=37811,zf=37812,Ff=37813,Hf=37814,Vf=37815,Gf=37816,kf=37817,Wf=37818,Xf=37819,qf=37820,Yf=37821,Zf=36492,Kf=36494,Jf=36495,Qf=36283,jf=36284,$f=36285,td=36286;var nc=2300,zh=2301,Ih=2302,_g=2400,vg=2401,yg=2402;var QS=3200,jS=3201;var Xg=0,$S=1,vs="",ln="srgb",Wr="srgb-linear",ic="linear",pe="srgb";var Vr=7680;var xg=519,tM=512,eM=513,nM=514,qg=515,iM=516,sM=517,rM=518,aM=519,Sg=35044;var Yg="300 es",vi=2e3,sc=2001;var ms=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Wm=Math.PI/180,Fh=180/Math.PI;function Uo(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(dn[e&255]+dn[e>>8&255]+dn[e>>16&255]+dn[e>>24&255]+"-"+dn[t&255]+dn[t>>8&255]+"-"+dn[t>>16&15|64]+dn[t>>24&255]+"-"+dn[n&63|128]+dn[n>>8&255]+"-"+dn[n>>16&255]+dn[n>>24&255]+dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]).toLowerCase()}function jt(e,t,n){return Math.max(t,Math.min(n,e))}function uT(e,t){return(e%t+t)%t}function Xm(e,t,n){return(1-n)*e+n*t}function Zl(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Rn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var gt=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=jt(this.x,t.x,n.x),this.y=jt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=jt(this.x,t,n),this.y=jt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Dn=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],p=r[a+1],g=r[a+2],M=r[a+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=u,t[n+3]=d;return}if(o===1){t[n+0]=h,t[n+1]=p,t[n+2]=g,t[n+3]=M;return}if(d!==M||l!==h||c!==p||u!==g){let m=1-o,f=l*h+c*p+u*g+d*M,_=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){let A=Math.sqrt(v),C=Math.atan2(A,f*_);m=Math.sin(m*C)/A,o=Math.sin(o*C)/A}let y=o*_;if(l=l*m+h*y,c=c*m+p*y,u=u*m+g*y,d=d*m+M*y,m===1-o){let A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}t[n]=l,t[n+1]=c,t[n+2]=u,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],p=r[a+2],g=r[a+3];return t[n]=o*g+u*d+l*p-c*h,t[n+1]=l*g+u*h+c*d-o*p,t[n+2]=c*g+u*p+o*h-l*d,t[n+3]=u*g-o*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],r=n[8],a=n[1],o=n[5],l=n[9],c=n[2],u=n[6],d=n[10],h=i+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,r=t._z,a=t._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-n;return this._w=p*a+n*this._w,this._x=p*i+n*this._x,this._y=p*s+n*this._y,this._z=p*r+n*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Jx.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Jx.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*n-r*s),d=2*(r*i-a*n);return this.x=n+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=jt(this.x,t.x,n.x),this.y=jt(this.y,t.y,n.y),this.z=jt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=jt(this.x,t,n),this.y=jt(this.y,t,n),this.z=jt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,r=t.z,a=n.x,o=n.y,l=n.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return qm.copy(this).projectOnVector(t),this.sub(qm)}reflect(t){return this.sub(qm.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},qm=new N,Jx=new Dn,Wt=class e{constructor(t,n,i,s,r,a,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,l,c)}set(t,n,i,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=n,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],g=i[8],M=s[0],m=s[3],f=s[6],_=s[1],v=s[4],y=s[7],A=s[2],C=s[5],w=s[8];return r[0]=a*M+o*_+l*A,r[3]=a*m+o*v+l*C,r[6]=a*f+o*y+l*w,r[1]=c*M+u*_+d*A,r[4]=c*m+u*v+d*C,r[7]=c*f+u*y+d*w,r[2]=h*M+p*_+g*A,r[5]=h*m+p*v+g*C,r[8]=h*f+p*y+g*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return n*a*u-n*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,h=o*l-u*r,p=c*r-a*l,g=n*d+i*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return t[0]=d*M,t[1]=(s*c-u*i)*M,t[2]=(o*i-s*a)*M,t[3]=h*M,t[4]=(u*n-s*l)*M,t[5]=(s*r-o*n)*M,t[6]=p*M,t[7]=(i*l-c*n)*M,t[8]=(a*n-i*r)*M,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Ym.makeScale(t,n)),this}rotate(t){return this.premultiply(Ym.makeRotation(-t)),this}translate(t,n){return this.premultiply(Ym.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ym=new Wt;function Zg(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function rc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function oM(){let e=rc("canvas");return e.style.display="block",e}var Qx={};function ho(e){e in Qx||(Qx[e]=!0,console.warn(e))}function lM(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}var jx=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$x=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hT(){let e={enabled:!0,workingColorSpace:Wr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pe&&(s.r=ds(s.r),s.g=ds(s.g),s.b=ds(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(s.r=co(s.r),s.g=co(s.g),s.b=co(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vs?ic:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ho("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ho("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Wr]:{primaries:t,whitePoint:i,transfer:ic,toXYZ:jx,fromXYZ:$x,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:jx,fromXYZ:$x,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),e}var he=hT();function ds(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function co(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Qa,Hh=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Qa===void 0&&(Qa=rc("canvas")),Qa.width=t.width,Qa.height=t.height;let s=Qa.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Qa}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=rc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ds(r[a]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ds(n[i]/255)*255):n[i]=ds(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},fT=0,fo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fT++}),this.uuid=Uo(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Zm(s[a].image)):r.push(Zm(s[a]))}else r=Zm(s);i.url=r}return n||(t.images[this.uuid]=i),i}};function Zm(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Hh.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var dT=0,Km=new N,Sn=class e extends ms{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Ii,s=Ii,r=Vn,a=Hi,o=ci,l=Si,c=e.DEFAULT_ANISOTROPY,u=vs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dT++}),this.uuid=Uo(),this.name="",this.source=new fo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Km).x}get height(){return this.source.getSize(Km).y}get depth(){return this.source.getSize(Km).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bi:t.x=t.x-Math.floor(t.x);break;case Ii:t.x=t.x<0?0:1;break;case Bh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bi:t.y=t.y-Math.floor(t.y);break;case Ii:t.y=t.y<0?0:1;break;case Bh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Pg;Sn.DEFAULT_ANISOTROPY=1;var Ne=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*n+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*n+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*n+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,r,l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],M=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let v=(c+1)/2,y=(p+1)/2,A=(f+1)/2,C=(u+h)/4,w=(d+M)/4,U=(g+m)/4;return v>y&&v>A?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=C/i,r=w/i):y>A?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=C/s,r=U/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=w/r,s=U/r),this.set(i,s,r,n),this}let _=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-M)/_,this.z=(h-u)/_,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=jt(this.x,t.x,n.x),this.y=jt(this.y,t.y,n.y),this.z=jt(this.z,t.z,n.z),this.w=jt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=jt(this.x,t,n),this.y=jt(this.y,t,n),this.z=jt(this.z,t,n),this.w=jt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Vh=class extends ms{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ne(0,0,t,n),this.scissorTest=!1,this.viewport=new Ne(0,0,t,n);let s={width:t,height:n,depth:i.depth},r=new Sn(s);this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:Vn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new fo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},zi=class extends Vh{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},ac=class extends Sn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Gh=class extends Sn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var nr=class{constructor(t=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(mi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(mi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=mi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,mi):mi.fromBufferAttribute(r,a),mi.applyMatrix4(t.matrixWorld),this.expandByPoint(mi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),dh.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),dh.copy(i.boundingBox)),dh.applyMatrix4(t.matrixWorld),this.union(dh)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mi),mi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Kl),ph.subVectors(this.max,Kl),ja.subVectors(t.a,Kl),$a.subVectors(t.b,Kl),to.subVectors(t.c,Kl),Zs.subVectors($a,ja),Ks.subVectors(to,$a),Br.subVectors(ja,to);let n=[0,-Zs.z,Zs.y,0,-Ks.z,Ks.y,0,-Br.z,Br.y,Zs.z,0,-Zs.x,Ks.z,0,-Ks.x,Br.z,0,-Br.x,-Zs.y,Zs.x,0,-Ks.y,Ks.x,0,-Br.y,Br.x,0];return!Jm(n,ja,$a,to,ph)||(n=[1,0,0,0,1,0,0,0,1],!Jm(n,ja,$a,to,ph))?!1:(mh.crossVectors(Zs,Ks),n=[mh.x,mh.y,mh.z],Jm(n,ja,$a,to,ph))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ls[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ls[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ls[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ls[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ls[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ls[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ls[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ls[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ls),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ls=[new N,new N,new N,new N,new N,new N,new N,new N],mi=new N,dh=new nr,ja=new N,$a=new N,to=new N,Zs=new N,Ks=new N,Br=new N,Kl=new N,ph=new N,mh=new N,zr=new N;function Jm(e,t,n,i,s){for(let r=0,a=e.length-3;r<=a;r+=3){zr.fromArray(e,r);let o=s.x*Math.abs(zr.x)+s.y*Math.abs(zr.y)+s.z*Math.abs(zr.z),l=t.dot(zr),c=n.dot(zr),u=i.dot(zr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var pT=new nr,Jl=new N,Qm=new N,po=class{constructor(t=new N,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):pT.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Jl.subVectors(t,this.center);let n=Jl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Jl,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qm.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Jl.copy(t.center).add(Qm)),this.expandByPoint(Jl.copy(t.center).sub(Qm))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},cs=new N,jm=new N,gh=new N,Js=new N,$m=new N,_h=new N,tg=new N,oc=class{constructor(t=new N,n=new N(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,cs)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=cs.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(cs.copy(this.origin).addScaledVector(this.direction,n),cs.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){jm.copy(t).add(n).multiplyScalar(.5),gh.copy(n).sub(t).normalize(),Js.copy(this.origin).sub(jm);let r=t.distanceTo(n)*.5,a=-this.direction.dot(gh),o=Js.dot(this.direction),l=-Js.dot(gh),c=Js.lengthSq(),u=Math.abs(1-a*a),d,h,p,g;if(u>0)if(d=a*l-o,h=a*o-l,g=r*u,d>=0)if(h>=-g)if(h<=g){let M=1/u;d*=M,h*=M,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(jm).addScaledVector(gh,h),p}intersectSphere(t,n){cs.subVectors(t.center,this.origin);let i=cs.dot(this.direction),s=cs.dot(cs)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,cs)!==null}intersectTriangle(t,n,i,s,r){$m.subVectors(n,t),_h.subVectors(i,t),tg.crossVectors($m,_h);let a=this.direction.dot(tg),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Js.subVectors(this.origin,t);let l=o*this.direction.dot(_h.crossVectors(Js,_h));if(l<0)return null;let c=o*this.direction.dot($m.cross(Js));if(c<0||l+c>a)return null;let u=-o*Js.dot(tg);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ae=class e{constructor(t,n,i,s,r,a,o,l,c,u,d,h,p,g,M,m){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,l,c,u,d,h,p,g,M,m)}set(t,n,i,s,r,a,o,l,c,u,d,h,p,g,M,m){let f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=M,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,s=1/eo.setFromMatrixColumn(t,0).length(),r=1/eo.setFromMatrixColumn(t,1).length(),a=1/eo.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=a*u,p=a*d,g=o*u,M=o*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+g*c,n[5]=h-M*c,n[9]=-o*l,n[2]=M-h*c,n[6]=g+p*c,n[10]=a*l}else if(t.order==="YXZ"){let h=l*u,p=l*d,g=c*u,M=c*d;n[0]=h+M*o,n[4]=g*o-p,n[8]=a*c,n[1]=a*d,n[5]=a*u,n[9]=-o,n[2]=p*o-g,n[6]=M+h*o,n[10]=a*l}else if(t.order==="ZXY"){let h=l*u,p=l*d,g=c*u,M=c*d;n[0]=h-M*o,n[4]=-a*d,n[8]=g+p*o,n[1]=p+g*o,n[5]=a*u,n[9]=M-h*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(t.order==="ZYX"){let h=a*u,p=a*d,g=o*u,M=o*d;n[0]=l*u,n[4]=g*c-p,n[8]=h*c+M,n[1]=l*d,n[5]=M*c+h,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(t.order==="YZX"){let h=a*l,p=a*c,g=o*l,M=o*c;n[0]=l*u,n[4]=M-h*d,n[8]=g*d+p,n[1]=d,n[5]=a*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*d+g,n[10]=h-M*d}else if(t.order==="XZY"){let h=a*l,p=a*c,g=o*l,M=o*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=h*d+M,n[5]=a*u,n[9]=p*d-g,n[2]=g*d-p,n[6]=o*u,n[10]=M*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mT,t,gT)}lookAt(t,n,i){let s=this.elements;return Fn.subVectors(t,n),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),Qs.crossVectors(i,Fn),Qs.lengthSq()===0&&(Math.abs(i.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),Qs.crossVectors(i,Fn)),Qs.normalize(),vh.crossVectors(Fn,Qs),s[0]=Qs.x,s[4]=vh.x,s[8]=Fn.x,s[1]=Qs.y,s[5]=vh.y,s[9]=Fn.y,s[2]=Qs.z,s[6]=vh.z,s[10]=Fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],g=i[2],M=i[6],m=i[10],f=i[14],_=i[3],v=i[7],y=i[11],A=i[15],C=s[0],w=s[4],U=s[8],E=s[12],x=s[1],R=s[5],z=s[9],k=s[13],Z=s[2],W=s[6],q=s[10],st=s[14],G=s[3],ft=s[7],_t=s[11],At=s[15];return r[0]=a*C+o*x+l*Z+c*G,r[4]=a*w+o*R+l*W+c*ft,r[8]=a*U+o*z+l*q+c*_t,r[12]=a*E+o*k+l*st+c*At,r[1]=u*C+d*x+h*Z+p*G,r[5]=u*w+d*R+h*W+p*ft,r[9]=u*U+d*z+h*q+p*_t,r[13]=u*E+d*k+h*st+p*At,r[2]=g*C+M*x+m*Z+f*G,r[6]=g*w+M*R+m*W+f*ft,r[10]=g*U+M*z+m*q+f*_t,r[14]=g*E+M*k+m*st+f*At,r[3]=_*C+v*x+y*Z+A*G,r[7]=_*w+v*R+y*W+A*ft,r[11]=_*U+v*z+y*q+A*_t,r[15]=_*E+v*k+y*st+A*At,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],p=t[14],g=t[3],M=t[7],m=t[11],f=t[15];return g*(+r*l*d-s*c*d-r*o*h+i*c*h+s*o*p-i*l*p)+M*(+n*l*p-n*c*h+r*a*h-s*a*p+s*c*u-r*l*u)+m*(+n*c*d-n*o*p-r*a*d+i*a*p+r*o*u-i*c*u)+f*(-s*o*u-n*l*d+n*o*h+s*a*d-i*a*h+i*l*u)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],p=t[11],g=t[12],M=t[13],m=t[14],f=t[15],_=d*m*c-M*h*c+M*l*p-o*m*p-d*l*f+o*h*f,v=g*h*c-u*m*c-g*l*p+a*m*p+u*l*f-a*h*f,y=u*M*c-g*d*c+g*o*p-a*M*p-u*o*f+a*d*f,A=g*d*l-u*M*l-g*o*h+a*M*h+u*o*m-a*d*m,C=n*_+i*v+s*y+r*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/C;return t[0]=_*w,t[1]=(M*h*r-d*m*r-M*s*p+i*m*p+d*s*f-i*h*f)*w,t[2]=(o*m*r-M*l*r+M*s*c-i*m*c-o*s*f+i*l*f)*w,t[3]=(d*l*r-o*h*r-d*s*c+i*h*c+o*s*p-i*l*p)*w,t[4]=v*w,t[5]=(u*m*r-g*h*r+g*s*p-n*m*p-u*s*f+n*h*f)*w,t[6]=(g*l*r-a*m*r-g*s*c+n*m*c+a*s*f-n*l*f)*w,t[7]=(a*h*r-u*l*r+u*s*c-n*h*c-a*s*p+n*l*p)*w,t[8]=y*w,t[9]=(g*d*r-u*M*r-g*i*p+n*M*p+u*i*f-n*d*f)*w,t[10]=(a*M*r-g*o*r+g*i*c-n*M*c-a*i*f+n*o*f)*w,t[11]=(u*o*r-a*d*r-u*i*c+n*d*c+a*i*p-n*o*p)*w,t[12]=A*w,t[13]=(u*M*s-g*d*s+g*i*h-n*M*h-u*i*m+n*d*m)*w,t[14]=(g*o*s-a*M*s-g*i*l+n*M*l+a*i*m-n*o*m)*w,t[15]=(a*d*s-u*o*s+u*i*l-n*d*l-a*i*h+n*o*h)*w,this}scale(t){let n=this.elements,i=t.x,s=t.y,r=t.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,r=n._x,a=n._y,o=n._z,l=n._w,c=r+r,u=a+a,d=o+o,h=r*c,p=r*u,g=r*d,M=a*u,m=a*d,f=o*d,_=l*c,v=l*u,y=l*d,A=i.x,C=i.y,w=i.z;return s[0]=(1-(M+f))*A,s[1]=(p+y)*A,s[2]=(g-v)*A,s[3]=0,s[4]=(p-y)*C,s[5]=(1-(h+f))*C,s[6]=(m+_)*C,s[7]=0,s[8]=(g+v)*w,s[9]=(m-_)*w,s[10]=(1-(h+M))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements,r=eo.set(s[0],s[1],s[2]).length(),a=eo.set(s[4],s[5],s[6]).length(),o=eo.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],gi.copy(this);let c=1/r,u=1/a,d=1/o;return gi.elements[0]*=c,gi.elements[1]*=c,gi.elements[2]*=c,gi.elements[4]*=u,gi.elements[5]*=u,gi.elements[6]*=u,gi.elements[8]*=d,gi.elements[9]*=d,gi.elements[10]*=d,n.setFromRotationMatrix(gi),i.x=r,i.y=a,i.z=o,this}makePerspective(t,n,i,s,r,a,o=vi,l=!1){let c=this.elements,u=2*r/(n-t),d=2*r/(i-s),h=(n+t)/(n-t),p=(i+s)/(i-s),g,M;if(l)g=r/(a-r),M=a*r/(a-r);else if(o===vi)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===sc)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,r,a,o=vi,l=!1){let c=this.elements,u=2/(n-t),d=2/(i-s),h=-(n+t)/(n-t),p=-(i+s)/(i-s),g,M;if(l)g=1/(a-r),M=a/(a-r);else if(o===vi)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===sc)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},eo=new N,gi=new Ae,mT=new N(0,0,0),gT=new N(1,1,1),Qs=new N,vh=new N,Fn=new N,tS=new Ae,eS=new Dn,yi=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(n){case"XYZ":this._y=Math.asin(jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return tS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tS,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return eS.setFromEuler(this),this.setFromQuaternion(eS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yi.DEFAULT_ORDER="XYZ";var mo=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},_T=0,nS=new N,no=new Dn,us=new Ae,yh=new N,Ql=new N,vT=new N,yT=new Dn,iS=new N(1,0,0),sS=new N(0,1,0),rS=new N(0,0,1),aS={type:"added"},xT={type:"removed"},io={type:"childadded",child:null},eg={type:"childremoved",child:null},Mn=class e extends ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_T++}),this.uuid=Uo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new N,n=new yi,i=new Dn,s=new N(1,1,1);function r(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Wt}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return no.setFromAxisAngle(t,n),this.quaternion.multiply(no),this}rotateOnWorldAxis(t,n){return no.setFromAxisAngle(t,n),this.quaternion.premultiply(no),this}rotateX(t){return this.rotateOnAxis(iS,t)}rotateY(t){return this.rotateOnAxis(sS,t)}rotateZ(t){return this.rotateOnAxis(rS,t)}translateOnAxis(t,n){return nS.copy(t).applyQuaternion(this.quaternion),this.position.add(nS.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(iS,t)}translateY(t){return this.translateOnAxis(sS,t)}translateZ(t){return this.translateOnAxis(rS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(us.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?yh.copy(t):yh.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ql.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?us.lookAt(Ql,yh,this.up):us.lookAt(yh,Ql,this.up),this.quaternion.setFromRotationMatrix(us),s&&(us.extractRotation(s.matrixWorld),no.setFromRotationMatrix(us),this.quaternion.premultiply(no.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(aS),io.child=t,this.dispatchEvent(io),io.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(xT),eg.child=t,this.dispatchEvent(eg),eg.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),us.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),us.multiply(t.parent.matrixWorld)),t.applyMatrix4(us),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(aS),io.child=t,this.dispatchEvent(io),io.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ql,t,vT),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ql,yT,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(n){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Mn.DEFAULT_UP=new N(0,1,0);Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _i=new N,hs=new N,ng=new N,fs=new N,so=new N,ro=new N,oS=new N,ig=new N,sg=new N,rg=new N,ag=new Ne,og=new Ne,lg=new Ne,tr=class e{constructor(t=new N,n=new N,i=new N){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),_i.subVectors(t,n),s.cross(_i);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,n,i,s,r){_i.subVectors(s,n),hs.subVectors(i,n),ng.subVectors(t,n);let a=_i.dot(_i),o=_i.dot(hs),l=_i.dot(ng),c=hs.dot(hs),u=hs.dot(ng),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-p-g,g,p)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,fs)===null?!1:fs.x>=0&&fs.y>=0&&fs.x+fs.y<=1}static getInterpolation(t,n,i,s,r,a,o,l){return this.getBarycoord(t,n,i,s,fs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,fs.x),l.addScaledVector(a,fs.y),l.addScaledVector(o,fs.z),l)}static getInterpolatedAttribute(t,n,i,s,r,a){return ag.setScalar(0),og.setScalar(0),lg.setScalar(0),ag.fromBufferAttribute(t,n),og.fromBufferAttribute(t,i),lg.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ag,r.x),a.addScaledVector(og,r.y),a.addScaledVector(lg,r.z),a}static isFrontFacing(t,n,i,s){return _i.subVectors(i,n),hs.subVectors(t,n),_i.cross(hs).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _i.subVectors(this.c,this.b),hs.subVectors(this.a,this.b),_i.cross(hs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,r){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,r)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,r=this.c,a,o;so.subVectors(s,i),ro.subVectors(r,i),ig.subVectors(t,i);let l=so.dot(ig),c=ro.dot(ig);if(l<=0&&c<=0)return n.copy(i);sg.subVectors(t,s);let u=so.dot(sg),d=ro.dot(sg);if(u>=0&&d<=u)return n.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),n.copy(i).addScaledVector(so,a);rg.subVectors(t,r);let p=so.dot(rg),g=ro.dot(rg);if(g>=0&&p<=g)return n.copy(r);let M=p*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(ro,o);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return oS.subVectors(r,s),o=(d-u)/(d-u+(p-g)),n.copy(s).addScaledVector(oS,o);let f=1/(m+M+h);return a=M*f,o=h*f,n.copy(i).addScaledVector(so,a).addScaledVector(ro,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},cM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},js={h:0,s:0,l:0},xh={h:0,s:0,l:0};function cg(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var qt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=he.workingColorSpace){return this.r=t,this.g=n,this.b=i,he.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=he.workingColorSpace){if(t=uT(t,1),n=jt(n,0,1),i=jt(i,0,1),n===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=cg(a,r,t+1/3),this.g=cg(a,r,t),this.b=cg(a,r,t-1/3)}return he.colorSpaceToWorking(this,s),this}setStyle(t,n=ln){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(r,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ln){let i=cM[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}copyLinearToSRGB(t){return this.r=co(t.r),this.g=co(t.g),this.b=co(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ln){return he.workingToColorSpace(pn.copy(this),t),Math.round(jt(pn.r*255,0,255))*65536+Math.round(jt(pn.g*255,0,255))*256+Math.round(jt(pn.b*255,0,255))}getHexString(t=ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=he.workingColorSpace){he.workingToColorSpace(pn.copy(this),n);let i=pn.r,s=pn.g,r=pn.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,n=he.workingColorSpace){return he.workingToColorSpace(pn.copy(this),n),t.r=pn.r,t.g=pn.g,t.b=pn.b,t}getStyle(t=ln){he.workingToColorSpace(pn.copy(this),t);let n=pn.r,i=pn.g,s=pn.b;return t!==ln?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(js),this.setHSL(js.h+t,js.s+n,js.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(js),t.getHSL(xh);let i=Xm(js.h,xh.h,n),s=Xm(js.s,xh.s,n),r=Xm(js.l,xh.l,n);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},pn=new qt;qt.NAMES=cM;var ST=0,ir=class extends ms{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ST++}),this.uuid=Uo(),this.name="",this.type="Material",this.blending=Gr,this.side=ps,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oh,this.blendDst=Ph,this.blendEquation=er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vr,this.stencilZFail=Vr,this.stencilZPass=Vr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gr&&(i.blending=this.blending),this.side!==ps&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Oh&&(i.blendSrc=this.blendSrc),this.blendDst!==Ph&&(i.blendDst=this.blendDst),this.blendEquation!==er&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==kr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(n){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Xr=class extends ir{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ke=new N,Sh=new gt,MT=0,cn=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:MT++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Sg,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Sh.fromBufferAttribute(this,n),Sh.applyMatrix3(t),this.setXY(n,Sh.x,Sh.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyMatrix3(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyMatrix4(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyNormalMatrix(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.transformDirection(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Zl(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Rn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Zl(n,this.array)),n}setX(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Zl(n,this.array)),n}setY(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Zl(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Zl(n,this.array)),n}setW(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Rn(n,this.array),i=Rn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Rn(n,this.array),i=Rn(i,this.array),s=Rn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,r){return t*=this.itemSize,this.normalized&&(n=Rn(n,this.array),i=Rn(i,this.array),s=Rn(s,this.array),r=Rn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sg&&(t.usage=this.usage),t}};var lc=class extends cn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var cc=class extends cn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var en=class extends cn{constructor(t,n,i){super(new Float32Array(t),n,i)}},bT=0,li=new Ae,ug=new Mn,ao=new N,Hn=new nr,jl=new nr,tn=new N,Gn=class e extends ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bT++}),this.uuid=Uo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zg(t)?cc:lc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Wt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return li.makeRotationFromQuaternion(t),this.applyMatrix4(li),this}rotateX(t){return li.makeRotationX(t),this.applyMatrix4(li),this}rotateY(t){return li.makeRotationY(t),this.applyMatrix4(li),this}rotateZ(t){return li.makeRotationZ(t),this.applyMatrix4(li),this}translate(t,n,i){return li.makeTranslation(t,n,i),this.applyMatrix4(li),this}scale(t,n,i){return li.makeScale(t,n,i),this.applyMatrix4(li),this}lookAt(t){return ug.lookAt(t),ug.updateMatrix(),this.applyMatrix4(ug.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ao).negate(),this.translate(ao.x,ao.y,ao.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new en(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let r=t[s];n.setXYZ(s,r.x,r.y,r.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nr);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let r=n[i];Hn.setFromBufferAttribute(r),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new po);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(Hn.setFromBufferAttribute(t),n)for(let r=0,a=n.length;r<a;r++){let o=n[r];jl.setFromBufferAttribute(o),this.morphTargetsRelative?(tn.addVectors(Hn.min,jl.min),Hn.expandByPoint(tn),tn.addVectors(Hn.max,jl.max),Hn.expandByPoint(tn)):(Hn.expandByPoint(jl.min),Hn.expandByPoint(jl.max))}Hn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)tn.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(tn));if(n)for(let r=0,a=n.length;r<a;r++){let o=n[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)tn.fromBufferAttribute(o,c),l&&(ao.fromBufferAttribute(t,c),tn.add(ao)),s=Math.max(s,i.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<i.count;U++)o[U]=new N,l[U]=new N;let c=new N,u=new N,d=new N,h=new gt,p=new gt,g=new gt,M=new N,m=new N;function f(U,E,x){c.fromBufferAttribute(i,U),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,x),h.fromBufferAttribute(r,U),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,x),u.sub(c),d.sub(c),p.sub(h),g.sub(h);let R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(M.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[U].add(M),o[E].add(M),o[x].add(M),l[U].add(m),l[E].add(m),l[x].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let U=0,E=_.length;U<E;++U){let x=_[U],R=x.start,z=x.count;for(let k=R,Z=R+z;k<Z;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let v=new N,y=new N,A=new N,C=new N;function w(U){A.fromBufferAttribute(s,U),C.copy(A);let E=o[U];v.copy(E),v.sub(A.multiplyScalar(A.dot(E))).normalize(),y.crossVectors(C,E);let R=y.dot(l[U])<0?-1:1;a.setXYZW(U,v.x,v.y,v.z,R)}for(let U=0,E=_.length;U<E;++U){let x=_[U],R=x.start,z=x.count;for(let k=R,Z=R+z;k<Z;k+=3)w(t.getX(k+0)),w(t.getX(k+1)),w(t.getX(k+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new cn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,u=new N,d=new N;if(t)for(let h=0,p=t.count;h<p;h+=3){let g=t.getX(h+0),M=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(n,g),r.fromBufferAttribute(n,M),a.fromBufferAttribute(n,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)s.fromBufferAttribute(n,h+0),r.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)tn.fromBufferAttribute(t,n),tn.normalize(),t.setXYZ(n,tn.x,tn.y,tn.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),p=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?p=l[M]*o.data.stride+o.offset:p=l[M]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new cn(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],p=t(h,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(n))}let r=t.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},lS=new Ae,Fr=new oc,Mh=new po,cS=new N,bh=new N,Eh=new N,Th=new N,hg=new N,Ah=new N,uS=new N,wh=new N,Fe=class extends Mn{constructor(t=new Gn,n=new Xr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ah.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(hg.fromBufferAttribute(d,t),a?Ah.addScaledVector(hg,u):Ah.addScaledVector(hg.sub(n),u))}n.add(Ah)}return n}raycast(t,n){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Mh.copy(i.boundingSphere),Mh.applyMatrix4(r),Fr.copy(t.ray).recast(t.near),!(Mh.containsPoint(Fr.origin)===!1&&(Fr.intersectSphere(Mh,cS)===null||Fr.origin.distanceToSquared(cS)>(t.far-t.near)**2))&&(lS.copy(r).invert(),Fr.copy(t.ray).applyMatrix4(lS),!(i.boundingBox!==null&&Fr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Fr)))}_computeIntersections(t,n,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){let m=h[g],f=a[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,A=v;y<A;y+=3){let C=o.getX(y),w=o.getX(y+1),U=o.getX(y+2);s=Rh(this,f,t,i,c,u,d,C,w,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let m=g,f=M;m<f;m+=3){let _=o.getX(m),v=o.getX(m+1),y=o.getX(m+2);s=Rh(this,a,t,i,c,u,d,_,v,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){let m=h[g],f=a[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,A=v;y<A;y+=3){let C=y,w=y+1,U=y+2;s=Rh(this,f,t,i,c,u,d,C,w,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let m=g,f=M;m<f;m+=3){let _=m,v=m+1,y=m+2;s=Rh(this,a,t,i,c,u,d,_,v,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}};function ET(e,t,n,i,s,r,a,o){let l;if(t.side===bn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ps,o),l===null)return null;wh.copy(o),wh.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(wh);return c<n.near||c>n.far?null:{distance:c,point:wh.clone(),object:e}}function Rh(e,t,n,i,s,r,a,o,l,c){e.getVertexPosition(o,bh),e.getVertexPosition(l,Eh),e.getVertexPosition(c,Th);let u=ET(e,t,n,i,bh,Eh,Th,uS);if(u){let d=new N;tr.getBarycoord(uS,bh,Eh,Th,d),s&&(u.uv=tr.getInterpolatedAttribute(s,o,l,c,d,new gt)),r&&(u.uv1=tr.getInterpolatedAttribute(r,o,l,c,d,new gt)),a&&(u.normal=tr.getInterpolatedAttribute(a,o,l,c,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new N,materialIndex:0};tr.getNormal(bh,Eh,Th,h.normal),u.face=h,u.barycoord=d}return u}var go=class e extends Gn{constructor(t=1,n=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,p=0;g("z","y","x",-1,-1,i,n,t,a,r,0),g("z","y","x",1,-1,i,n,-t,a,r,1),g("x","z","y",1,1,t,i,n,s,a,2),g("x","z","y",1,-1,t,i,-n,s,a,3),g("x","y","z",1,-1,t,n,i,s,r,4),g("x","y","z",-1,-1,t,n,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new en(c,3)),this.setAttribute("normal",new en(u,3)),this.setAttribute("uv",new en(d,2));function g(M,m,f,_,v,y,A,C,w,U,E){let x=y/w,R=A/U,z=y/2,k=A/2,Z=C/2,W=w+1,q=U+1,st=0,G=0,ft=new N;for(let _t=0;_t<q;_t++){let At=_t*R-k;for(let Vt=0;Vt<W;Vt++){let Jt=Vt*x-z;ft[M]=Jt*_,ft[m]=At*v,ft[f]=Z,c.push(ft.x,ft.y,ft.z),ft[M]=0,ft[m]=0,ft[f]=C>0?1:-1,u.push(ft.x,ft.y,ft.z),d.push(Vt/w),d.push(1-_t/U),st+=1}}for(let _t=0;_t<U;_t++)for(let At=0;At<w;At++){let Vt=h+At+W*_t,Jt=h+At+W*(_t+1),ae=h+(At+1)+W*(_t+1),Yt=h+(At+1)+W*_t;l.push(Vt,Jt,Yt),l.push(Jt,ae,Yt),G+=6}o.addGroup(p,G,E),p+=G,h+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function $r(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function gn(e){let t={};for(let n=0;n<e.length;n++){let i=$r(e[n]);for(let s in i)t[s]=i[s]}return t}function TT(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Kg(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var uM={clone:$r,merge:gn},AT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xi=class extends ir{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=AT,this.fragmentShader=wT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$r(t.uniforms),this.uniformsGroups=TT(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?n.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?n.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[s]={type:"m4",value:a.toArray()}:n.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},uc=class extends Mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},$s=new N,hS=new gt,fS=new gt,mn=class extends uc{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Fh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Wm*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fh*2*Math.atan(Math.tan(Wm*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){$s.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($s.x,$s.y).multiplyScalar(-t/$s.z),$s.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($s.x,$s.y).multiplyScalar(-t/$s.z)}getViewSize(t,n){return this.getViewBounds(t,hS,fS),n.subVectors(fS,hS)}setViewOffset(t,n,i,s,r,a){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Wm*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,n-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},oo=-90,lo=1,kh=class extends Mn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new mn(oo,lo,t,n);s.layers=this.layers,this.add(s);let r=new mn(oo,lo,t,n);r.layers=this.layers,this.add(r);let a=new mn(oo,lo,t,n);a.layers=this.layers,this.add(a);let o=new mn(oo,lo,t,n);o.layers=this.layers,this.add(o);let l=new mn(oo,lo,t,n);l.layers=this.layers,this.add(l);let c=new mn(oo,lo,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,r,a,o,l]=n;for(let c of n)this.remove(c);if(t===vi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===sc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(n,r),t.setRenderTarget(i,1,s),t.render(n,a),t.setRenderTarget(i,2,s),t.render(n,o),t.setRenderTarget(i,3,s),t.render(n,l),t.setRenderTarget(i,4,s),t.render(n,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),t.render(n,u),t.setRenderTarget(d,h,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},hc=class extends Sn{constructor(t=[],n=Qr,i,s,r,a,o,l,c,u){super(t,n,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Wh=class extends zi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new hc(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new go(5,5,5),r=new xi({name:"CubemapFromEquirect",uniforms:$r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:bn,blending:gs});r.uniforms.tEquirect.value=n;let a=new Fe(s,r),o=n.minFilter;return n.minFilter===Hi&&(n.minFilter=Vn),new kh(1,10,this).update(t,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,s);t.setRenderTarget(r)}},Oi=class extends Mn{constructor(){super(),this.isGroup=!0,this.type="Group"}},RT={type:"move"},_o=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let M of t.hand.values()){let m=n.getJointPose(M,i),f=this._getHandJoint(c,M);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(RT)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Oi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}};var vo=class extends Mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var fc=class extends Sn{constructor(t=null,n=1,i=1,s,r,a,o,l,c=Cn,u=Cn,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var fg=new N,CT=new N,DT=new Wt,Ni=class{constructor(t=new N(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=fg.subVectors(i,n).cross(CT.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(fg),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:n.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||DT.getNormalMatrix(t),s=this.coplanarPoint(fg).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Hr=new po,UT=new gt(.5,.5),Ch=new N,yo=class{constructor(t=new Ni,n=new Ni,i=new Ni,s=new Ni,r=new Ni,a=new Ni){this.planes=[t,n,i,s,r,a]}set(t,n,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=vi,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],p=r[7],g=r[8],M=r[9],m=r[10],f=r[11],_=r[12],v=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-a,p-u,f-g,A-_).normalize(),s[1].setComponents(c+a,p+u,f+g,A+_).normalize(),s[2].setComponents(c+o,p+d,f+M,A+v).normalize(),s[3].setComponents(c-o,p-d,f-M,A-v).normalize(),i)s[4].setComponents(l,h,m,y).normalize(),s[5].setComponents(c-l,p-h,f-m,A-y).normalize();else if(s[4].setComponents(c-l,p-h,f-m,A-y).normalize(),n===vi)s[5].setComponents(c+l,p+h,f+m,A+y).normalize();else if(n===sc)s[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hr)}intersectsSprite(t){Hr.center.set(0,0,0);let n=UT.distanceTo(t.center);return Hr.radius=.7071067811865476+n,Hr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hr)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(Ch.x=s.normal.x>0?t.max.x:t.min.x,Ch.y=s.normal.y>0?t.max.y:t.min.y,Ch.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ch)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var qr=class extends Sn{constructor(t,n,i,s,r,a,o,l,c){super(t,n,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},dc=class extends Sn{constructor(t,n,i=lr,s,r,a,o=Cn,l=Cn,c,u=uo,d=1){if(u!==uo&&u!==Do)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:n,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new fo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},pc=class extends Sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var kn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,s=this.getPoint(0),r=0;n.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),n.push(r),s=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){let i=this.getLengths(),s=0,r=i.length,a;n?a=n:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let u=i[s],h=i[s+1]-u,p=(a-u)/h;return(s+p)/(r-1)}getTangent(t,n){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=n||(a.isVector2?new gt:new N);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n=!1){let i=new N,s=[],r=[],a=[],o=new N,l=new Ae;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(jt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(n===!0){let p=Math.acos(jt(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},xo=class extends kn{constructor(t=0,n=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,n=new gt){let i=n,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*d+this.aX,c=h*d+p*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Xh=class extends xo{constructor(t,n,i,s,r,a){super(t,n,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Jg(){let e=0,t=0,n=0,i=0;function s(r,a,o,l){e=r,t=o,n=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,p=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,p*=u,s(a,o,h,p)},calc:function(r){let a=r*r,o=a*r;return e+t*r+n*a+i*o}}}var Dh=new N,dg=new Jg,pg=new Jg,mg=new Jg,So=class extends kn{constructor(t=[],n=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=s}getPoint(t,n=new N){let i=n,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Dh.subVectors(s[0],s[1]).add(s[0]),c=Dh);let d=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Dh.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Dh),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),p),M=Math.pow(d.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),dg.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,M,m),pg.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,M,m),mg.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,M,m)}else this.curveType==="catmullrom"&&(dg.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),pg.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),mg.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(dg.calc(l),pg.calc(l),mg.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function dS(e,t,n,i,s){let r=(i-t)*.5,a=(s-n)*.5,o=e*e,l=e*o;return(2*n-2*i+r+a)*l+(-3*n+3*i-2*r-a)*o+r*e+n}function LT(e,t){let n=1-e;return n*n*t}function NT(e,t){return 2*(1-e)*e*t}function IT(e,t){return e*e*t}function tc(e,t,n,i){return LT(e,t)+NT(e,n)+IT(e,i)}function OT(e,t){let n=1-e;return n*n*n*t}function PT(e,t){let n=1-e;return 3*n*n*e*t}function BT(e,t){return 3*(1-e)*e*e*t}function zT(e,t){return e*e*e*t}function ec(e,t,n,i,s){return OT(e,t)+PT(e,n)+BT(e,i)+zT(e,s)}var mc=class extends kn{constructor(t=new gt,n=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new gt){let i=n,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ec(t,s.x,r.x,a.x,o.x),ec(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},qh=class extends kn{constructor(t=new N,n=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new N){let i=n,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ec(t,s.x,r.x,a.x,o.x),ec(t,s.y,r.y,a.y,o.y),ec(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},gc=class extends kn{constructor(t=new gt,n=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new gt){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new gt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Yh=class extends kn{constructor(t=new N,n=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new N){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new N){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_c=class extends kn{constructor(t=new gt,n=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new gt){let i=n,s=this.v0,r=this.v1,a=this.v2;return i.set(tc(t,s.x,r.x,a.x),tc(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Zh=class extends kn{constructor(t=new N,n=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new N){let i=n,s=this.v0,r=this.v1,a=this.v2;return i.set(tc(t,s.x,r.x,a.x),tc(t,s.y,r.y,a.y),tc(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},vc=class extends kn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new gt){let i=n,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(dS(o,l.x,c.x,u.x,d.x),dS(o,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new gt().fromArray(s))}return this}},Mg=Object.freeze({__proto__:null,ArcCurve:Xh,CatmullRomCurve3:So,CubicBezierCurve:mc,CubicBezierCurve3:qh,EllipseCurve:xo,LineCurve:gc,LineCurve3:Yh,QuadraticBezierCurve:_c,QuadraticBezierCurve3:Zh,SplineCurve:vc}),Kh=class extends kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mg[i](n,t))}return this}getPoint(t,n){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,n)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],n=0;for(let i=0,s=this.curves.length;i<s;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){let n=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){let s=this.curves[n];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(new Mg[s.type]().fromJSON(s))}return this}},Yr=class extends Kh{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){let i=new gc(this.currentPoint.clone(),new gt(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,s){let r=new _c(this.currentPoint.clone(),new gt(t,n),new gt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,n,i,s,r,a){let o=new mc(this.currentPoint.clone(),new gt(t,n),new gt(i,s),new gt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let n=[this.currentPoint.clone()].concat(t),i=new vc(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,n+l,i,s,r,a),this}absarc(t,n,i,s,r,a){return this.absellipse(t,n,i,i,s,r,a),this}ellipse(t,n,i,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,n+u,i,s,r,a,o,l),this}absellipse(t,n,i,s,r,a,o,l){let c=new xo(t,n,i,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},sr=class extends Yr{constructor(t){super(t),this.uuid=Uo(),this.type="Shape",this.holes=[]}getPointsHoles(t){let n=[];for(let i=0,s=this.holes.length;i<s;i++)n[i]=this.holes[i].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,i=this.holes.length;n<i;n++){let s=this.holes[n];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(new Yr().fromJSON(s))}return this}};function FT(e,t,n=2){let i=t&&t.length,s=i?t[0]*n:e.length,r=hM(e,0,s,n,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=WT(e,t,r,n)),e.length>80*n){o=1/0,l=1/0;let u=-1/0,d=-1/0;for(let h=n;h<s;h+=n){let p=e[h],g=e[h+1];p<o&&(o=p),g<l&&(l=g),p>u&&(u=p),g>d&&(d=g)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return yc(r,a,n,o,l,c,0),a}function hM(e,t,n,i,s){let r;if(s===eA(e,t,n,i)>0)for(let a=t;a<n;a+=i)r=pS(a/i|0,e[a],e[a+1],r);else for(let a=n-i;a>=t;a-=i)r=pS(a/i|0,e[a],e[a+1],r);return r&&Mo(r,r.next)&&(Sc(r),r=r.next),r}function Zr(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(Mo(n,n.next)||Le(n.prev,n,n.next)===0)){if(Sc(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function yc(e,t,n,i,s,r,a){if(!e)return;!a&&r&&KT(e,i,s,r);let o=e;for(;e.prev!==e.next;){let l=e.prev,c=e.next;if(r?VT(e,i,s,r):HT(e)){t.push(l.i,e.i,c.i),Sc(e),e=c.next,o=c.next;continue}if(e=c,e===o){a?a===1?(e=GT(Zr(e),t),yc(e,t,n,i,s,r,2)):a===2&&kT(e,t,n,i,s,r):yc(Zr(e),t,n,i,s,r,1);break}}}function HT(e){let t=e.prev,n=e,i=e.next;if(Le(t,n,i)>=0)return!1;let s=t.x,r=n.x,a=i.x,o=t.y,l=n.y,c=i.y,u=Math.min(s,r,a),d=Math.min(o,l,c),h=Math.max(s,r,a),p=Math.max(o,l,c),g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=p&&$l(s,o,r,l,a,c,g.x,g.y)&&Le(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function VT(e,t,n,i){let s=e.prev,r=e,a=e.next;if(Le(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,h=a.y,p=Math.min(o,l,c),g=Math.min(u,d,h),M=Math.max(o,l,c),m=Math.max(u,d,h),f=bg(p,g,t,n,i),_=bg(M,m,t,n,i),v=e.prevZ,y=e.nextZ;for(;v&&v.z>=f&&y&&y.z<=_;){if(v.x>=p&&v.x<=M&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&$l(o,u,l,d,c,h,v.x,v.y)&&Le(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=p&&y.x<=M&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&$l(o,u,l,d,c,h,y.x,y.y)&&Le(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=f;){if(v.x>=p&&v.x<=M&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&$l(o,u,l,d,c,h,v.x,v.y)&&Le(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=_;){if(y.x>=p&&y.x<=M&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&$l(o,u,l,d,c,h,y.x,y.y)&&Le(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function GT(e,t){let n=e;do{let i=n.prev,s=n.next.next;!Mo(i,s)&&dM(i,n,n.next,s)&&xc(i,s)&&xc(s,i)&&(t.push(i.i,n.i,s.i),Sc(n),Sc(n.next),n=e=s),n=n.next}while(n!==e);return Zr(n)}function kT(e,t,n,i,s,r){let a=e;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&jT(a,o)){let l=pM(a,o);a=Zr(a,a.next),l=Zr(l,l.next),yc(a,t,n,i,s,r,0),yc(l,t,n,i,s,r,0);return}o=o.next}a=a.next}while(a!==e)}function WT(e,t,n,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,l=r<a-1?t[r+1]*i:e.length,c=hM(e,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(QT(c))}s.sort(XT);for(let r=0;r<s.length;r++)n=qT(s[r],n);return n}function XT(e,t){let n=e.x-t.x;if(n===0&&(n=e.y-t.y,n===0)){let i=(e.next.y-e.y)/(e.next.x-e.x),s=(t.next.y-t.y)/(t.next.x-t.x);n=i-s}return n}function qT(e,t){let n=YT(e,t);if(!n)return t;let i=pM(n,e);return Zr(i,i.next),Zr(n,n.next)}function YT(e,t){let n=t,i=e.x,s=e.y,r=-1/0,a;if(Mo(e,n))return n;do{if(Mo(e,n.next))return n.next;if(s<=n.y&&s>=n.next.y&&n.next.y!==n.y){let d=n.x+(s-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=i&&d>r&&(r=d,a=n.x<n.next.x?n:n.next,d===i))return a}n=n.next}while(n!==t);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;n=a;do{if(i>=n.x&&n.x>=l&&i!==n.x&&fM(s<c?i:r,s,l,c,s<c?r:i,s,n.x,n.y)){let d=Math.abs(s-n.y)/(i-n.x);xc(n,e)&&(d<u||d===u&&(n.x>a.x||n.x===a.x&&ZT(a,n)))&&(a=n,u=d)}n=n.next}while(n!==o);return a}function ZT(e,t){return Le(e.prev,e,t.prev)<0&&Le(t.next,e,e.next)<0}function KT(e,t,n,i){let s=e;do s.z===0&&(s.z=bg(s.x,s.y,t,n,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==e);s.prevZ.nextZ=null,s.prevZ=null,JT(s)}function JT(e){let t,n=1;do{let i=e,s;e=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<n&&(o++,a=a.nextZ,!!a);c++);let l=n;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:e=s,s.prevZ=r,r=s;i=a}r.nextZ=null,n*=2}while(t>1);return e}function bg(e,t,n,i,s){return e=(e-n)*s|0,t=(t-i)*s|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function QT(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function fM(e,t,n,i,s,r,a,o){return(s-a)*(t-o)>=(e-a)*(r-o)&&(e-a)*(i-o)>=(n-a)*(t-o)&&(n-a)*(r-o)>=(s-a)*(i-o)}function $l(e,t,n,i,s,r,a,o){return!(e===a&&t===o)&&fM(e,t,n,i,s,r,a,o)}function jT(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!$T(e,t)&&(xc(e,t)&&xc(t,e)&&tA(e,t)&&(Le(e.prev,e,t.prev)||Le(e,t.prev,t))||Mo(e,t)&&Le(e.prev,e,e.next)>0&&Le(t.prev,t,t.next)>0)}function Le(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Mo(e,t){return e.x===t.x&&e.y===t.y}function dM(e,t,n,i){let s=Lh(Le(e,t,n)),r=Lh(Le(e,t,i)),a=Lh(Le(n,i,e)),o=Lh(Le(n,i,t));return!!(s!==r&&a!==o||s===0&&Uh(e,n,t)||r===0&&Uh(e,i,t)||a===0&&Uh(n,e,i)||o===0&&Uh(n,t,i))}function Uh(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Lh(e){return e>0?1:e<0?-1:0}function $T(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&dM(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function xc(e,t){return Le(e.prev,e,e.next)<0?Le(e,t,e.next)>=0&&Le(e,e.prev,t)>=0:Le(e,t,e.prev)<0||Le(e,e.next,t)<0}function tA(e,t){let n=e,i=!1,s=(e.x+t.x)/2,r=(e.y+t.y)/2;do n.y>r!=n.next.y>r&&n.next.y!==n.y&&s<(n.next.x-n.x)*(r-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function pM(e,t){let n=Eg(e.i,e.x,e.y),i=Eg(t.i,t.x,t.y),s=e.next,r=t.prev;return e.next=t,t.prev=e,n.next=s,s.prev=n,i.next=n,n.prev=i,r.next=i,i.prev=r,i}function pS(e,t,n,i){let s=Eg(e,t,n);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Sc(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Eg(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function eA(e,t,n,i){let s=0;for(let r=t,a=n-i;r<n;r+=i)s+=(e[a]-e[r])*(e[r+1]+e[a+1]),a=r;return s}var Tg=class{static triangulate(t,n,i=2){return FT(t,n,i)}},Pi=class e{static area(t){let n=t.length,i=0;for(let s=n-1,r=0;r<n;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(t,n){let i=[],s=[],r=[];mS(t),gS(i,t);let a=t.length;n.forEach(mS);for(let l=0;l<n.length;l++)s.push(a),a+=n[l].length,gS(i,n[l]);let o=Tg.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function mS(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function gS(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var bo=class e extends Gn{constructor(t=new sr([new gt(.5,.5),new gt(-.5,.5),new gt(-.5,-.5),new gt(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new en(s,3)),this.setAttribute("uv",new en(r,2)),this.computeVertexNormals();function a(o){let l=[],c=n.curveSegments!==void 0?n.curveSegments:12,u=n.steps!==void 0?n.steps:1,d=n.depth!==void 0?n.depth:1,h=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:p-.1,M=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3,f=n.extrudePath,_=n.UVGenerator!==void 0?n.UVGenerator:nA,v,y=!1,A,C,w,U;f&&(v=f.getSpacedPoints(u),y=!0,h=!1,A=f.computeFrenetFrames(u,!1),C=new N,w=new N,U=new N),h||(m=0,p=0,g=0,M=0);let E=o.extractPoints(c),x=E.shape,R=E.holes;if(!Pi.isClockWise(x)){x=x.reverse();for(let nt=0,j=R.length;nt<j;nt++){let K=R[nt];Pi.isClockWise(K)&&(R[nt]=K.reverse())}}function k(nt){let K=10000000000000001e-36,Y=nt[0];for(let ut=1;ut<=nt.length;ut++){let rt=ut%nt.length,dt=nt[rt],Ht=dt.x-Y.x,zt=dt.y-Y.y,T=Ht*Ht+zt*zt,S=Math.max(Math.abs(dt.x),Math.abs(dt.y),Math.abs(Y.x),Math.abs(Y.y)),L=K*S*S;if(T<=L){nt.splice(rt,1),ut--;continue}Y=dt}}k(x),R.forEach(k);let Z=R.length,W=x;for(let nt=0;nt<Z;nt++){let j=R[nt];x=x.concat(j)}function q(nt,j,K){return j||console.error("THREE.ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(j,K)}let st=x.length;function G(nt,j,K){let Y,ut,rt,dt=nt.x-j.x,Ht=nt.y-j.y,zt=K.x-nt.x,T=K.y-nt.y,S=dt*dt+Ht*Ht,L=dt*T-Ht*zt;if(Math.abs(L)>Number.EPSILON){let V=Math.sqrt(S),tt=Math.sqrt(zt*zt+T*T),X=j.x-Ht/V,Lt=j.y+dt/V,at=K.x-T/tt,vt=K.y+zt/tt,Et=((at-X)*T-(vt-Lt)*zt)/(dt*T-Ht*zt);Y=X+dt*Et-nt.x,ut=Lt+Ht*Et-nt.y;let it=Y*Y+ut*ut;if(it<=2)return new gt(Y,ut);rt=Math.sqrt(it/2)}else{let V=!1;dt>Number.EPSILON?zt>Number.EPSILON&&(V=!0):dt<-Number.EPSILON?zt<-Number.EPSILON&&(V=!0):Math.sign(Ht)===Math.sign(T)&&(V=!0),V?(Y=-Ht,ut=dt,rt=Math.sqrt(S)):(Y=dt,ut=Ht,rt=Math.sqrt(S/2))}return new gt(Y/rt,ut/rt)}let ft=[];for(let nt=0,j=W.length,K=j-1,Y=nt+1;nt<j;nt++,K++,Y++)K===j&&(K=0),Y===j&&(Y=0),ft[nt]=G(W[nt],W[K],W[Y]);let _t=[],At,Vt=ft.concat();for(let nt=0,j=Z;nt<j;nt++){let K=R[nt];At=[];for(let Y=0,ut=K.length,rt=ut-1,dt=Y+1;Y<ut;Y++,rt++,dt++)rt===ut&&(rt=0),dt===ut&&(dt=0),At[Y]=G(K[Y],K[rt],K[dt]);_t.push(At),Vt=Vt.concat(At)}let Jt;if(m===0)Jt=Pi.triangulateShape(W,R);else{let nt=[],j=[];for(let K=0;K<m;K++){let Y=K/m,ut=p*Math.cos(Y*Math.PI/2),rt=g*Math.sin(Y*Math.PI/2)+M;for(let dt=0,Ht=W.length;dt<Ht;dt++){let zt=q(W[dt],ft[dt],rt);Ot(zt.x,zt.y,-ut),Y===0&&nt.push(zt)}for(let dt=0,Ht=Z;dt<Ht;dt++){let zt=R[dt];At=_t[dt];let T=[];for(let S=0,L=zt.length;S<L;S++){let V=q(zt[S],At[S],rt);Ot(V.x,V.y,-ut),Y===0&&T.push(V)}Y===0&&j.push(T)}}Jt=Pi.triangulateShape(nt,j)}let ae=Jt.length,Yt=g+M;for(let nt=0;nt<st;nt++){let j=h?q(x[nt],Vt[nt],Yt):x[nt];y?(w.copy(A.normals[0]).multiplyScalar(j.x),C.copy(A.binormals[0]).multiplyScalar(j.y),U.copy(v[0]).add(w).add(C),Ot(U.x,U.y,U.z)):Ot(j.x,j.y,0)}for(let nt=1;nt<=u;nt++)for(let j=0;j<st;j++){let K=h?q(x[j],Vt[j],Yt):x[j];y?(w.copy(A.normals[nt]).multiplyScalar(K.x),C.copy(A.binormals[nt]).multiplyScalar(K.y),U.copy(v[nt]).add(w).add(C),Ot(U.x,U.y,U.z)):Ot(K.x,K.y,d/u*nt)}for(let nt=m-1;nt>=0;nt--){let j=nt/m,K=p*Math.cos(j*Math.PI/2),Y=g*Math.sin(j*Math.PI/2)+M;for(let ut=0,rt=W.length;ut<rt;ut++){let dt=q(W[ut],ft[ut],Y);Ot(dt.x,dt.y,d+K)}for(let ut=0,rt=R.length;ut<rt;ut++){let dt=R[ut];At=_t[ut];for(let Ht=0,zt=dt.length;Ht<zt;Ht++){let T=q(dt[Ht],At[Ht],Y);y?Ot(T.x,T.y+v[u-1].y,v[u-1].x+K):Ot(T.x,T.y,d+K)}}}Q(),et();function Q(){let nt=s.length/3;if(h){let j=0,K=st*j;for(let Y=0;Y<ae;Y++){let ut=Jt[Y];Dt(ut[2]+K,ut[1]+K,ut[0]+K)}j=u+m*2,K=st*j;for(let Y=0;Y<ae;Y++){let ut=Jt[Y];Dt(ut[0]+K,ut[1]+K,ut[2]+K)}}else{for(let j=0;j<ae;j++){let K=Jt[j];Dt(K[2],K[1],K[0])}for(let j=0;j<ae;j++){let K=Jt[j];Dt(K[0]+st*u,K[1]+st*u,K[2]+st*u)}}i.addGroup(nt,s.length/3-nt,0)}function et(){let nt=s.length/3,j=0;bt(W,j),j+=W.length;for(let K=0,Y=R.length;K<Y;K++){let ut=R[K];bt(ut,j),j+=ut.length}i.addGroup(nt,s.length/3-nt,1)}function bt(nt,j){let K=nt.length;for(;--K>=0;){let Y=K,ut=K-1;ut<0&&(ut=nt.length-1);for(let rt=0,dt=u+m*2;rt<dt;rt++){let Ht=st*rt,zt=st*(rt+1),T=j+Y+Ht,S=j+ut+Ht,L=j+ut+zt,V=j+Y+zt;Xt(T,S,L,V)}}}function Ot(nt,j,K){l.push(nt),l.push(j),l.push(K)}function Dt(nt,j,K){oe(nt),oe(j),oe(K);let Y=s.length/3,ut=_.generateTopUV(i,s,Y-3,Y-2,Y-1);D(ut[0]),D(ut[1]),D(ut[2])}function Xt(nt,j,K,Y){oe(nt),oe(j),oe(Y),oe(j),oe(K),oe(Y);let ut=s.length/3,rt=_.generateSideWallUV(i,s,ut-6,ut-3,ut-2,ut-1);D(rt[0]),D(rt[1]),D(rt[3]),D(rt[1]),D(rt[2]),D(rt[3])}function oe(nt){s.push(l[nt*3+0]),s.push(l[nt*3+1]),s.push(l[nt*3+2])}function D(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return iA(n,i,t)}static fromJSON(t,n){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=n[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Mg[s.type]().fromJSON(s)),new e(i,t.options)}},nA={generateTopUV:function(e,t,n,i,s){let r=t[n*3],a=t[n*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],u=t[s*3+1];return[new gt(r,a),new gt(o,l),new gt(c,u)]},generateSideWallUV:function(e,t,n,i,s,r){let a=t[n*3],o=t[n*3+1],l=t[n*3+2],c=t[i*3],u=t[i*3+1],d=t[i*3+2],h=t[s*3],p=t[s*3+1],g=t[s*3+2],M=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new gt(a,1-l),new gt(c,1-d),new gt(h,1-g),new gt(M,1-f)]:[new gt(o,1-l),new gt(u,1-d),new gt(p,1-g),new gt(m,1-f)]}};function iA(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,s=e.length;i<s;i++){let r=e[i];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Kr=class e extends Gn{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let r=t/2,a=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=t/o,h=n/l,p=[],g=[],M=[],m=[];for(let f=0;f<u;f++){let _=f*h-a;for(let v=0;v<c;v++){let y=v*d-r;g.push(y,-_,0),M.push(0,0,1),m.push(v/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<o;_++){let v=_+c*f,y=_+c*(f+1),A=_+1+c*(f+1),C=_+1+c*f;p.push(v,y,C),p.push(y,A,C)}this.setIndex(p),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(M,3)),this.setAttribute("uv",new en(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};var Mc=class e extends Gn{constructor(t=new sr([new gt(0,.5),new gt(-.5,-.5),new gt(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};let i=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new en(s,3)),this.setAttribute("normal",new en(r,3)),this.setAttribute("uv",new en(a,2));function c(u){let d=s.length/3,h=u.extractPoints(n),p=h.shape,g=h.holes;Pi.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=g.length;m<f;m++){let _=g[m];Pi.isClockWise(_)===!0&&(g[m]=_.reverse())}let M=Pi.triangulateShape(p,g);for(let m=0,f=g.length;m<f;m++){let _=g[m];p=p.concat(_)}for(let m=0,f=p.length;m<f;m++){let _=p[m];s.push(_.x,_.y,0),r.push(0,0,1),a.push(_.x,_.y)}for(let m=0,f=M.length;m<f;m++){let _=M[m],v=_[0]+d,y=_[1]+d,A=_[2]+d;i.push(v,y,A),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes;return sA(n,t)}static fromJSON(t,n){let i=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=n[t.shapes[s]];i.push(a)}return new e(i,t.curveSegments)}};function sA(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){let s=e[n];t.shapes.push(s.uuid)}else t.shapes.push(e.uuid);return t}var Eo=class e extends Gn{constructor(t=1,n=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let a=[],o=[],l=[],c=[],u=new N,d=new N,h=new N;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let M=g/s*r,m=p/i*Math.PI*2;d.x=(t+n*Math.cos(m))*Math.cos(M),d.y=(t+n*Math.cos(m))*Math.sin(M),d.z=n*Math.sin(m),o.push(d.x,d.y,d.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let M=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,_=(s+1)*p+g;a.push(M,m,_),a.push(m,f,_)}this.setIndex(a),this.setAttribute("position",new en(o,3)),this.setAttribute("normal",new en(l,3)),this.setAttribute("uv",new en(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var To=class extends ir{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xg,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},rr=class extends To{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new gt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Jh=class extends ir{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=QS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Qh=class extends ir{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Nh(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function rA(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var Jr=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],r=n[i-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=n[++i],t<s)break e}a=n.length;break n}if(!(t>=r)){let o=n[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=n[--i-1],t>=r)break e}a=i,i=0;break n}break t}for(;i<a;){let o=i+a>>>1;t<n[o]?a=o:i=o+1}if(s=n[i],r=n[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)n[a]=i[r+a];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},jh=class extends Jr{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_g,endingEnd:_g}}intervalChanged_(t,n,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case vg:r=t,o=2*n-i;break;case yg:r=s.length-2,o=n+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case vg:a=t,l=2*i-n;break;case yg:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,n,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(i-n)/(s-n),M=g*g,m=M*g,f=-h*m+2*h*M-h*g,_=(1+h)*m+(-1.5-2*h)*M+(-.5+h)*g+1,v=(-1-p)*m+(1.5+p)*M+.5*g,y=p*m-p*M;for(let A=0;A!==o;++A)r[A]=f*a[u+A]+_*a[c+A]+v*a[l+A]+y*a[d+A];return r}},$h=class extends Jr{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-n)/(s-n),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},tf=class extends Jr{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Wn=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Nh(n,this.TimeBufferType),this.values=Nh(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:Nh(t.times,Array),values:Nh(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new tf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new $h(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new jh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case nc:n=this.InterpolantFactoryMethodDiscrete;break;case zh:n=this.InterpolantFactoryMethodLinear;break;case Ih:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nc;case this.InterpolantFactoryMethodLinear:return zh;case this.InterpolantFactoryMethodSmooth:return Ih}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>n;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&rA(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ih,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,h=d-i,p=d+i;for(let g=0;g!==i;++g){let M=n[d+g];if(M!==n[h+g]||M!==n[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,h=a*i;for(let p=0;p!==i;++p)n[h+p]=n[d+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)n[l+c]=n[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=n.slice(0,a*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};Wn.prototype.ValueTypeName="";Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=zh;var ar=class extends Wn{constructor(t,n,i){super(t,n,i)}};ar.prototype.ValueTypeName="bool";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=nc;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;var ef=class extends Wn{constructor(t,n,i,s){super(t,n,i,s)}};ef.prototype.ValueTypeName="color";var nf=class extends Wn{constructor(t,n,i,s){super(t,n,i,s)}};nf.prototype.ValueTypeName="number";var sf=class extends Jr{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let u=c+o;c!==u;c+=4)Dn.slerpFlat(r,0,a,c-o,a,c,l);return r}},bc=class extends Wn{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new sf(this.times,this.values,this.getValueSize(),t)}};bc.prototype.ValueTypeName="quaternion";bc.prototype.InterpolantFactoryMethodSmooth=void 0;var or=class extends Wn{constructor(t,n,i){super(t,n,i)}};or.prototype.ValueTypeName="string";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=nc;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;var rf=class extends Wn{constructor(t,n,i,s){super(t,n,i,s)}};rf.prototype.ValueTypeName="vector";var af=class{constructor(t,n,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},mM=new af,of=class{constructor(t){this.manager=t!==void 0?t:mM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,r){i.load(t,s,n,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};of.DEFAULT_MATERIAL_NAME="__DEFAULT";var lf=class extends Mn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}};var gg=new Ae,_S=new N,vS=new N,Ag=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=Si,this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yo,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new Ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera,i=this.matrix;_S.setFromMatrixPosition(t.matrixWorld),n.position.copy(_S),vS.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(vS),n.updateMatrixWorld(),gg.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gg,n.coordinateSystem,n.reversedDepth),n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(gg)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Ec=class extends uc{constructor(t=-1,n=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},wg=class extends Ag{constructor(){super(new Ec(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ao=class extends lf{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new wg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var cf=class extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Qg="\\[\\]\\.:\\/",aA=new RegExp("["+Qg+"]","g"),jg="[^"+Qg+"]",oA="[^"+Qg.replace("\\.","")+"]",lA=/((?:WC+[\/:])*)/.source.replace("WC",jg),cA=/(WCOD+)?/.source.replace("WCOD",oA),uA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jg),hA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jg),fA=new RegExp("^"+lA+cA+uA+hA+"$"),dA=["material","materials","bones","map"],Rg=class{constructor(t,n,i){let s=i||Te.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Te=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(aA,"")}static parseTrackName(t){let n=fA.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);dA.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,r=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=Rg;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var w3=new Float32Array(1);var yS=new Ae,Tc=class{constructor(t,n,i=0,s=1/0){this.ray=new oc(t,n),this.near=i,this.far=s,this.camera=null,this.layers=new mo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return yS.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yS),this}intersectObject(t,n=!0,i=[]){return Cg(t,this,i,n),i.sort(xS),i}intersectObjects(t,n=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Cg(t[s],this,i,n);return i.sort(xS),i}};function xS(e,t){return e.distance-t.distance}function Cg(e,t,n,i){let s=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(s=!1),s===!0&&i===!0){let r=e.children;for(let a=0,o=r.length;a<o;a++)Cg(r[a],t,n,!0)}}function $g(e,t,n,i){let s=pA(i);switch(n){case Vg:return e*t;case kg:return e*t/s.components*s.byteLength;case Ef:return e*t/s.components*s.byteLength;case Wg:return e*t*2/s.components*s.byteLength;case Tf:return e*t*2/s.components*s.byteLength;case Gg:return e*t*3/s.components*s.byteLength;case ci:return e*t*4/s.components*s.byteLength;case Af:return e*t*4/s.components*s.byteLength;case Rc:case Cc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Dc:case Uc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Rf:case Df:return Math.max(e,16)*Math.max(t,8)/4;case wf:case Cf:return Math.max(e,8)*Math.max(t,8)/2;case Uf:case Lf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Nf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case If:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Of:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Pf:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Bf:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case zf:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ff:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Hf:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Vf:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Gf:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case kf:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Wf:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Xf:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case qf:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Yf:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Zf:case Kf:case Jf:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Qf:case jf:return Math.ceil(e/4)*Math.ceil(t/4)*8;case $f:case td:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function pA(e){switch(e){case Si:case Bg:return{byteLength:1,components:1};case wo:case zg:case Ro:return{byteLength:2,components:1};case Mf:case bf:return{byteLength:2,components:4};case lr:case Sf:case Vi:return{byteLength:4,components:1};case Fg:case Hg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function FM(){let e=null,t=!1,n=null,i=null;function s(r,a){n(r,a),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function gA(e){let t=new WeakMap;function n(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=e.createBuffer();e.bindBuffer(l,h),e.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){let g=d[h],M=d[p];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++h,d[h]=M)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){let M=d[p];e.bufferSubData(c,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var _A=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,MA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,EA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,TA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,AA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,RA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,CA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,DA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,UA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,LA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,NA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,IA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,OA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,PA=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,BA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,FA=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,HA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,VA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,GA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,WA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,XA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,YA="gl_FragColor = linearToOutputTexel( gl_FragColor );",ZA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,KA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,JA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,QA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$A=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ew=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,iw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,aw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ow=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,uw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_w=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ew=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Aw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ww=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Nw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ow=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ww=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$w=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,aR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,uR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_R=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,SR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,bR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ER=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,TR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,AR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,DR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,UR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,OR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PR=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,BR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,VR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GR=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kR=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,XR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ZR=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,KR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:_A,alphahash_pars_fragment:vA,alphamap_fragment:yA,alphamap_pars_fragment:xA,alphatest_fragment:SA,alphatest_pars_fragment:MA,aomap_fragment:bA,aomap_pars_fragment:EA,batching_pars_vertex:TA,batching_vertex:AA,begin_vertex:wA,beginnormal_vertex:RA,bsdfs:CA,iridescence_fragment:DA,bumpmap_pars_fragment:UA,clipping_planes_fragment:LA,clipping_planes_pars_fragment:NA,clipping_planes_pars_vertex:IA,clipping_planes_vertex:OA,color_fragment:PA,color_pars_fragment:BA,color_pars_vertex:zA,color_vertex:FA,common:HA,cube_uv_reflection_fragment:VA,defaultnormal_vertex:GA,displacementmap_pars_vertex:kA,displacementmap_vertex:WA,emissivemap_fragment:XA,emissivemap_pars_fragment:qA,colorspace_fragment:YA,colorspace_pars_fragment:ZA,envmap_fragment:KA,envmap_common_pars_fragment:JA,envmap_pars_fragment:QA,envmap_pars_vertex:jA,envmap_physical_pars_fragment:cw,envmap_vertex:$A,fog_vertex:tw,fog_pars_vertex:ew,fog_fragment:nw,fog_pars_fragment:iw,gradientmap_pars_fragment:sw,lightmap_pars_fragment:rw,lights_lambert_fragment:aw,lights_lambert_pars_fragment:ow,lights_pars_begin:lw,lights_toon_fragment:uw,lights_toon_pars_fragment:hw,lights_phong_fragment:fw,lights_phong_pars_fragment:dw,lights_physical_fragment:pw,lights_physical_pars_fragment:mw,lights_fragment_begin:gw,lights_fragment_maps:_w,lights_fragment_end:vw,logdepthbuf_fragment:yw,logdepthbuf_pars_fragment:xw,logdepthbuf_pars_vertex:Sw,logdepthbuf_vertex:Mw,map_fragment:bw,map_pars_fragment:Ew,map_particle_fragment:Tw,map_particle_pars_fragment:Aw,metalnessmap_fragment:ww,metalnessmap_pars_fragment:Rw,morphinstance_vertex:Cw,morphcolor_vertex:Dw,morphnormal_vertex:Uw,morphtarget_pars_vertex:Lw,morphtarget_vertex:Nw,normal_fragment_begin:Iw,normal_fragment_maps:Ow,normal_pars_fragment:Pw,normal_pars_vertex:Bw,normal_vertex:zw,normalmap_pars_fragment:Fw,clearcoat_normal_fragment_begin:Hw,clearcoat_normal_fragment_maps:Vw,clearcoat_pars_fragment:Gw,iridescence_pars_fragment:kw,opaque_fragment:Ww,packing:Xw,premultiplied_alpha_fragment:qw,project_vertex:Yw,dithering_fragment:Zw,dithering_pars_fragment:Kw,roughnessmap_fragment:Jw,roughnessmap_pars_fragment:Qw,shadowmap_pars_fragment:jw,shadowmap_pars_vertex:$w,shadowmap_vertex:tR,shadowmask_pars_fragment:eR,skinbase_vertex:nR,skinning_pars_vertex:iR,skinning_vertex:sR,skinnormal_vertex:rR,specularmap_fragment:aR,specularmap_pars_fragment:oR,tonemapping_fragment:lR,tonemapping_pars_fragment:cR,transmission_fragment:uR,transmission_pars_fragment:hR,uv_pars_fragment:fR,uv_pars_vertex:dR,uv_vertex:pR,worldpos_vertex:mR,background_vert:gR,background_frag:_R,backgroundCube_vert:vR,backgroundCube_frag:yR,cube_vert:xR,cube_frag:SR,depth_vert:MR,depth_frag:bR,distanceRGBA_vert:ER,distanceRGBA_frag:TR,equirect_vert:AR,equirect_frag:wR,linedashed_vert:RR,linedashed_frag:CR,meshbasic_vert:DR,meshbasic_frag:UR,meshlambert_vert:LR,meshlambert_frag:NR,meshmatcap_vert:IR,meshmatcap_frag:OR,meshnormal_vert:PR,meshnormal_frag:BR,meshphong_vert:zR,meshphong_frag:FR,meshphysical_vert:HR,meshphysical_frag:VR,meshtoon_vert:GR,meshtoon_frag:kR,points_vert:WR,points_frag:XR,shadow_vert:qR,shadow_frag:YR,sprite_vert:ZR,sprite_frag:KR},Mt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},Gi={basic:{uniforms:gn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:gn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:gn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:gn([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:gn([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:gn([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:gn([Mt.points,Mt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:gn([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:gn([Mt.common,Mt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:gn([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:gn([Mt.sprite,Mt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:gn([Mt.common,Mt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:gn([Mt.lights,Mt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};Gi.physical={uniforms:gn([Gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};var ed={r:0,b:0,g:0},ta=new yi,JR=new Ae;function QR(e,t,n,i,s,r,a){let o=new qt(0),l=r===!0?0:1,c,u,d=null,h=0,p=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?n:t).get(y)),y}function M(v){let y=!1,A=g(v);A===null?f(o,l):A&&A.isColor&&(f(A,1),y=!0);let C=e.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(v,y){let A=g(y);A&&(A.isCubeTexture||A.mapping===Ac)?(u===void 0&&(u=new Fe(new go(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:$r(Gi.backgroundCube.uniforms),vertexShader:Gi.backgroundCube.vertexShader,fragmentShader:Gi.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,w,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ta.copy(y.backgroundRotation),ta.x*=-1,ta.y*=-1,ta.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ta.y*=-1,ta.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(JR.makeRotationFromEuler(ta)),u.material.toneMapped=he.getTransfer(A.colorSpace)!==pe,(d!==A||h!==A.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=A,h=A.version,p=e.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Fe(new Kr(2,2),new xi({name:"BackgroundMaterial",uniforms:$r(Gi.background.uniforms),vertexShader:Gi.background.vertexShader,fragmentShader:Gi.background.fragmentShader,side:ps,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=he.getTransfer(A.colorSpace)!==pe,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||h!==A.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,d=A,h=A.version,p=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function f(v,y){v.getRGB(ed,Kg(e)),i.buffers.color.setClear(ed.r,ed.g,ed.b,y,a)}function _(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,f(o,l)},render:M,addToRenderList:m,dispose:_}}function jR(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(x,R,z,k,Z){let W=!1,q=d(k,z,R);r!==q&&(r=q,c(r.object)),W=p(x,k,z,Z),W&&g(x,k,z,Z),Z!==null&&t.update(Z,e.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,y(x,R,z,k),Z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return e.createVertexArray()}function c(x){return e.bindVertexArray(x)}function u(x){return e.deleteVertexArray(x)}function d(x,R,z){let k=z.wireframe===!0,Z=i[x.id];Z===void 0&&(Z={},i[x.id]=Z);let W=Z[R.id];W===void 0&&(W={},Z[R.id]=W);let q=W[k];return q===void 0&&(q=h(l()),W[k]=q),q}function h(x){let R=[],z=[],k=[];for(let Z=0;Z<n;Z++)R[Z]=0,z[Z]=0,k[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:z,attributeDivisors:k,object:x,attributes:{},index:null}}function p(x,R,z,k){let Z=r.attributes,W=R.attributes,q=0,st=z.getAttributes();for(let G in st)if(st[G].location>=0){let _t=Z[G],At=W[G];if(At===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(At=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(At=x.instanceColor)),_t===void 0||_t.attribute!==At||At&&_t.data!==At.data)return!0;q++}return r.attributesNum!==q||r.index!==k}function g(x,R,z,k){let Z={},W=R.attributes,q=0,st=z.getAttributes();for(let G in st)if(st[G].location>=0){let _t=W[G];_t===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(_t=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(_t=x.instanceColor));let At={};At.attribute=_t,_t&&_t.data&&(At.data=_t.data),Z[G]=At,q++}r.attributes=Z,r.attributesNum=q,r.index=k}function M(){let x=r.newAttributes;for(let R=0,z=x.length;R<z;R++)x[R]=0}function m(x){f(x,0)}function f(x,R){let z=r.newAttributes,k=r.enabledAttributes,Z=r.attributeDivisors;z[x]=1,k[x]===0&&(e.enableVertexAttribArray(x),k[x]=1),Z[x]!==R&&(e.vertexAttribDivisor(x,R),Z[x]=R)}function _(){let x=r.newAttributes,R=r.enabledAttributes;for(let z=0,k=R.length;z<k;z++)R[z]!==x[z]&&(e.disableVertexAttribArray(z),R[z]=0)}function v(x,R,z,k,Z,W,q){q===!0?e.vertexAttribIPointer(x,R,z,Z,W):e.vertexAttribPointer(x,R,z,k,Z,W)}function y(x,R,z,k){M();let Z=k.attributes,W=z.getAttributes(),q=R.defaultAttributeValues;for(let st in W){let G=W[st];if(G.location>=0){let ft=Z[st];if(ft===void 0&&(st==="instanceMatrix"&&x.instanceMatrix&&(ft=x.instanceMatrix),st==="instanceColor"&&x.instanceColor&&(ft=x.instanceColor)),ft!==void 0){let _t=ft.normalized,At=ft.itemSize,Vt=t.get(ft);if(Vt===void 0)continue;let Jt=Vt.buffer,ae=Vt.type,Yt=Vt.bytesPerElement,Q=ae===e.INT||ae===e.UNSIGNED_INT||ft.gpuType===Sf;if(ft.isInterleavedBufferAttribute){let et=ft.data,bt=et.stride,Ot=ft.offset;if(et.isInstancedInterleavedBuffer){for(let Dt=0;Dt<G.locationSize;Dt++)f(G.location+Dt,et.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Dt=0;Dt<G.locationSize;Dt++)m(G.location+Dt);e.bindBuffer(e.ARRAY_BUFFER,Jt);for(let Dt=0;Dt<G.locationSize;Dt++)v(G.location+Dt,At/G.locationSize,ae,_t,bt*Yt,(Ot+At/G.locationSize*Dt)*Yt,Q)}else{if(ft.isInstancedBufferAttribute){for(let et=0;et<G.locationSize;et++)f(G.location+et,ft.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let et=0;et<G.locationSize;et++)m(G.location+et);e.bindBuffer(e.ARRAY_BUFFER,Jt);for(let et=0;et<G.locationSize;et++)v(G.location+et,At/G.locationSize,ae,_t,At*Yt,At/G.locationSize*et*Yt,Q)}}else if(q!==void 0){let _t=q[st];if(_t!==void 0)switch(_t.length){case 2:e.vertexAttrib2fv(G.location,_t);break;case 3:e.vertexAttrib3fv(G.location,_t);break;case 4:e.vertexAttrib4fv(G.location,_t);break;default:e.vertexAttrib1fv(G.location,_t)}}}}_()}function A(){U();for(let x in i){let R=i[x];for(let z in R){let k=R[z];for(let Z in k)u(k[Z].object),delete k[Z];delete R[z]}delete i[x]}}function C(x){if(i[x.id]===void 0)return;let R=i[x.id];for(let z in R){let k=R[z];for(let Z in k)u(k[Z].object),delete k[Z];delete R[z]}delete i[x.id]}function w(x){for(let R in i){let z=i[R];if(z[x.id]===void 0)continue;let k=z[x.id];for(let Z in k)u(k[Z].object),delete k[Z];delete z[x.id]}}function U(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:E,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:M,enableAttribute:m,disableUnusedAttributes:_}}function $R(e,t,n){let i;function s(c){i=c}function r(c,u){e.drawArrays(i,c,u),n.update(u,i,1)}function a(c,u,d){d!==0&&(e.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];n.update(p,i,1)}function l(c,u,d,h){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let M=0;M<d;M++)g+=u[M]*h[M];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function tC(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==ci&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let U=w===Ro&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Si&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Vi&&!U)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),_=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),v=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,C=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:A,maxSamples:C}}function eC(e){let t=this,n=null,i=0,s=!1,r=!1,a=new Ni,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){n=u(d,h,0)},this.setState=function(d,h,p){let g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,f=e.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{let _=r?0:i,v=_*4,y=f.clippingState||null;l.value=y,y=u(g,h,v,p);for(let A=0;A!==v;++A)y[A]=n[A];f.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,p,g){let M=d!==null?d.length:0,m=null;if(M!==0){if(m=l.value,g!==!0||m===null){let f=p+M*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,y=p;v!==M;++v,y+=4)a.copy(d[v]).applyMatrix4(_,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}function nC(e){let t=new WeakMap;function n(a,o){return o===vf?a.mapping=Qr:o===yf&&(a.mapping=jr),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===vf||o===yf)if(t.has(a)){let l=t.get(a).texture;return n(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Wh(l.height);return c.fromEquirectangularTexture(e,a),t.set(a,c),a.addEventListener("dispose",s),n(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var No=4,gM=[.125,.215,.35,.446,.526,.582],ia=20,t0=new Ec,_M=new qt,e0=null,n0=0,i0=0,s0=!1,na=(1+Math.sqrt(5))/2,Lo=1/na,vM=[new N(-na,Lo,0),new N(na,Lo,0),new N(-Lo,0,na),new N(Lo,0,na),new N(0,na,-Lo),new N(0,na,Lo),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],iC=new N,Oo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,s=100,r={}){let{size:a=256,position:o=iC}=r;e0=this._renderer.getRenderTarget(),n0=this._renderer.getActiveCubeFace(),i0=this._renderer.getActiveMipmapLevel(),s0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=SM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(e0,n0,i0),this._renderer.xr.enabled=s0,t.scissorTest=!1,nd(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Qr||t.mapping===jr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),e0=this._renderer.getRenderTarget(),n0=this._renderer.getActiveCubeFace(),i0=this._renderer.getActiveMipmapLevel(),s0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:Ro,format:ci,colorSpace:Wr,depthBuffer:!1},s=yM(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yM(t,n,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sC(r)),this._blurMaterial=rC(r,t,n)}return s}_compileMaterial(t){let n=new Fe(this._lodPlanes[0],t);this._renderer.compile(n,t0)}_sceneToCubeUV(t,n,i,s,r){let l=new mn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(_M),d.toneMapping=_s,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let M=new Xr({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1}),m=new Fe(new go,M),f=!1,_=t.background;_?_.isColor&&(M.color.copy(_),t.background=null,f=!0):(M.color.copy(_M),f=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[v],r.y,r.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[v],r.z)):(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[v]));let A=this._cubeSize;nd(s,y*A,v>2?A:0,A,A),d.setRenderTarget(s),f&&d.render(m,l),d.render(t,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=h,t.background=_}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===Qr||t.mapping===jr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=SM()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xM());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Fe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;nd(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,t0)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=vM[(s-r-1)%vM.length];this._blur(t,r-1,r,a,o)}n.autoClear=i}_blur(t,n,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,n,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new Fe(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ia-1),M=r/g,m=isFinite(r)?1+Math.floor(u*M):ia;m>ia&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ia}`);let f=[],_=0;for(let w=0;w<ia;++w){let U=w/M,E=Math.exp(-U*U/2);f.push(E),w===0?_+=E:w<m&&(_+=2*E)}for(let w=0;w<f.length;w++)f[w]=f[w]/_;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-i;let y=this._sizeLods[s],A=3*y*(s>v-No?s-v+No:0),C=4*(this._cubeSize-y);nd(n,A,C,3*y,2*y),l.setRenderTarget(n),l.render(d,t0)}};function sC(e){let t=[],n=[],i=[],s=e,r=e-No+1+gM.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);n.push(o);let l=1/o;a>e-No?l=gM[a-e+No-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,M=3,m=2,f=1,_=new Float32Array(M*g*p),v=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let C=0;C<p;C++){let w=C%3*2/3-1,U=C>2?0:-1,E=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];_.set(E,M*g*C),v.set(h,m*g*C);let x=[C,C,C,C,C,C];y.set(x,f*g*C)}let A=new Gn;A.setAttribute("position",new cn(_,M)),A.setAttribute("uv",new cn(v,m)),A.setAttribute("faceIndex",new cn(y,f)),t.push(A),s>No&&s--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function yM(e,t,n){let i=new zi(e,t,n);return i.texture.mapping=Ac,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nd(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function rC(e,t,n){let i=new Float32Array(ia),s=new N(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:ia,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:p0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gs,depthTest:!1,depthWrite:!1})}function xM(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:p0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gs,depthTest:!1,depthWrite:!1})}function SM(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:p0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gs,depthTest:!1,depthWrite:!1})}function p0(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function aC(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===vf||l===yf,u=l===Qr||l===jr;if(c||u){let d=t.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Oo(e)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return c&&p&&p.height>0||u&&p&&s(p)?(n===null&&(n=new Oo(e)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function oC(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&ho("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function lC(e,t,n,i){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(t.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,n.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)t.update(h[p],e.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,g=d.attributes.position,M=0;if(p!==null){let _=p.array;M=p.version;for(let v=0,y=_.length;v<y;v+=3){let A=_[v+0],C=_[v+1],w=_[v+2];h.push(A,C,C,w,w,A)}}else if(g!==void 0){let _=g.array;M=g.version;for(let v=0,y=_.length/3-1;v<y;v+=3){let A=v+0,C=v+1,w=v+2;h.push(A,C,C,w,w,A)}}else return;let m=new(Zg(h)?cc:lc)(h,1);m.version=M;let f=r.get(d);f&&t.remove(f),r.set(d,m)}function u(d){let h=r.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function cC(e,t,n){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,p){e.drawElements(i,p,r,h*a),n.update(p,i,1)}function c(h,p,g){g!==0&&(e.drawElementsInstanced(i,p,r,h*a,g),n.update(p,i,g))}function u(h,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];n.update(m,i,1)}function d(h,p,g,M){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)c(h[f]/a,p[f],M[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,h,0,M,0,g);let f=0;for(let _=0;_<g;_++)f+=p[_]*M[_];n.update(f,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function uC(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(r/3);break;case e.LINES:n.lines+=o*(r/2);break;case e.LINE_STRIP:n.lines+=o*(r-1);break;case e.LINE_LOOP:n.lines+=o*r;break;case e.POINTS:n.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function hC(e,t,n){let i=new WeakMap,s=new Ne;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let E=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],v=0;p===!0&&(v=1),g===!0&&(v=2),M===!0&&(v=3);let y=o.attributes.position.count*v,A=1;y>t.maxTextureSize&&(A=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let C=new Float32Array(y*A*4*d),w=new ac(C,y,A,d);w.type=Vi,w.needsUpdate=!0;let U=v*4;for(let x=0;x<d;x++){let R=m[x],z=f[x],k=_[x],Z=y*A*4*x;for(let W=0;W<R.count;W++){let q=W*U;p===!0&&(s.fromBufferAttribute(R,W),C[Z+q+0]=s.x,C[Z+q+1]=s.y,C[Z+q+2]=s.z,C[Z+q+3]=0),g===!0&&(s.fromBufferAttribute(z,W),C[Z+q+4]=s.x,C[Z+q+5]=s.y,C[Z+q+6]=s.z,C[Z+q+7]=0),M===!0&&(s.fromBufferAttribute(k,W),C[Z+q+8]=s.x,C[Z+q+9]=s.y,C[Z+q+10]=s.z,C[Z+q+11]=k.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new gt(y,A)},i.set(o,h),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:r}}function fC(e,t,n,i){let s=new WeakMap;function r(l){let c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:r,dispose:a}}var HM=new Sn,MM=new dc(1,1),VM=new ac,GM=new Gh,kM=new hc,bM=[],EM=[],TM=new Float32Array(16),AM=new Float32Array(9),wM=new Float32Array(4);function Po(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,r=bM[s];if(r===void 0&&(r=new Float32Array(s),bM[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(r,o)}return r}function Ze(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ke(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function rd(e,t){let n=EM[t];n===void 0&&(n=new Int32Array(t),EM[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function dC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function pC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ze(n,t))return;e.uniform2fv(this.addr,t),Ke(n,t)}}function mC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ze(n,t))return;e.uniform3fv(this.addr,t),Ke(n,t)}}function gC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ze(n,t))return;e.uniform4fv(this.addr,t),Ke(n,t)}}function _C(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ze(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ke(n,t)}else{if(Ze(n,i))return;wM.set(i),e.uniformMatrix2fv(this.addr,!1,wM),Ke(n,i)}}function vC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ze(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ke(n,t)}else{if(Ze(n,i))return;AM.set(i),e.uniformMatrix3fv(this.addr,!1,AM),Ke(n,i)}}function yC(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ze(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ke(n,t)}else{if(Ze(n,i))return;TM.set(i),e.uniformMatrix4fv(this.addr,!1,TM),Ke(n,i)}}function xC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function SC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ze(n,t))return;e.uniform2iv(this.addr,t),Ke(n,t)}}function MC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ze(n,t))return;e.uniform3iv(this.addr,t),Ke(n,t)}}function bC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ze(n,t))return;e.uniform4iv(this.addr,t),Ke(n,t)}}function EC(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function TC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ze(n,t))return;e.uniform2uiv(this.addr,t),Ke(n,t)}}function AC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ze(n,t))return;e.uniform3uiv(this.addr,t),Ke(n,t)}}function wC(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ze(n,t))return;e.uniform4uiv(this.addr,t),Ke(n,t)}}function RC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(MM.compareFunction=qg,r=MM):r=HM,n.setTexture2D(t||r,s)}function CC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||GM,s)}function DC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||kM,s)}function UC(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||VM,s)}function LC(e){switch(e){case 5126:return dC;case 35664:return pC;case 35665:return mC;case 35666:return gC;case 35674:return _C;case 35675:return vC;case 35676:return yC;case 5124:case 35670:return xC;case 35667:case 35671:return SC;case 35668:case 35672:return MC;case 35669:case 35673:return bC;case 5125:return EC;case 36294:return TC;case 36295:return AC;case 36296:return wC;case 35678:case 36198:case 36298:case 36306:case 35682:return RC;case 35679:case 36299:case 36307:return CC;case 35680:case 36300:case 36308:case 36293:return DC;case 36289:case 36303:case 36311:case 36292:return UC}}function NC(e,t){e.uniform1fv(this.addr,t)}function IC(e,t){let n=Po(t,this.size,2);e.uniform2fv(this.addr,n)}function OC(e,t){let n=Po(t,this.size,3);e.uniform3fv(this.addr,n)}function PC(e,t){let n=Po(t,this.size,4);e.uniform4fv(this.addr,n)}function BC(e,t){let n=Po(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function zC(e,t){let n=Po(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function FC(e,t){let n=Po(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function HC(e,t){e.uniform1iv(this.addr,t)}function VC(e,t){e.uniform2iv(this.addr,t)}function GC(e,t){e.uniform3iv(this.addr,t)}function kC(e,t){e.uniform4iv(this.addr,t)}function WC(e,t){e.uniform1uiv(this.addr,t)}function XC(e,t){e.uniform2uiv(this.addr,t)}function qC(e,t){e.uniform3uiv(this.addr,t)}function YC(e,t){e.uniform4uiv(this.addr,t)}function ZC(e,t,n){let i=this.cache,s=t.length,r=rd(n,s);Ze(i,r)||(e.uniform1iv(this.addr,r),Ke(i,r));for(let a=0;a!==s;++a)n.setTexture2D(t[a]||HM,r[a])}function KC(e,t,n){let i=this.cache,s=t.length,r=rd(n,s);Ze(i,r)||(e.uniform1iv(this.addr,r),Ke(i,r));for(let a=0;a!==s;++a)n.setTexture3D(t[a]||GM,r[a])}function JC(e,t,n){let i=this.cache,s=t.length,r=rd(n,s);Ze(i,r)||(e.uniform1iv(this.addr,r),Ke(i,r));for(let a=0;a!==s;++a)n.setTextureCube(t[a]||kM,r[a])}function QC(e,t,n){let i=this.cache,s=t.length,r=rd(n,s);Ze(i,r)||(e.uniform1iv(this.addr,r),Ke(i,r));for(let a=0;a!==s;++a)n.setTexture2DArray(t[a]||VM,r[a])}function jC(e){switch(e){case 5126:return NC;case 35664:return IC;case 35665:return OC;case 35666:return PC;case 35674:return BC;case 35675:return zC;case 35676:return FC;case 5124:case 35670:return HC;case 35667:case 35671:return VC;case 35668:case 35672:return GC;case 35669:case 35673:return kC;case 5125:return WC;case 36294:return XC;case 36295:return qC;case 36296:return YC;case 35678:case 36198:case 36298:case 36306:case 35682:return ZC;case 35679:case 36299:case 36307:return KC;case 35680:case 36300:case 36308:case 36293:return JC;case 36289:case 36303:case 36311:case 36292:return QC}}var a0=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=LC(n.type)}},o0=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=jC(n.type)}},l0=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,n[o.id],i)}}},r0=/(\w+)(\])?(\[|\.)?/g;function RM(e,t){e.seq.push(t),e.map[t.id]=t}function $C(e,t,n){let i=e.name,s=i.length;for(r0.lastIndex=0;;){let r=r0.exec(i),a=r0.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){RM(n,c===void 0?new a0(o,e,t):new o0(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new l0(o),RM(n,d)),n=d}}}var Io=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(n,s),a=t.getUniformLocation(n,r.name);$C(r,a,this)}}setValue(t,n,i,s){let r=this.map[n];r!==void 0&&r.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let r=0,a=n.length;r!==a;++r){let o=n[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in n&&i.push(a)}return i}};function CM(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var t2=37297,e2=0;function n2(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}var DM=new Wt;function i2(e){he._getMatrix(DM,he.workingColorSpace,e);let t=`mat3( ${DM.elements.map(n=>n.toFixed(4))} )`;switch(he.getTransfer(e)){case ic:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function UM(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+n2(e.getShaderSource(t),o)}else return r}function s2(e,t){let n=i2(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function r2(e,t){let n;switch(t){case WS:n="Linear";break;case XS:n="Reinhard";break;case qS:n="Cineon";break;case YS:n="ACESFilmic";break;case KS:n="AgX";break;case _f:n="Neutral";break;case ZS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var id=new N;function a2(){he.getLuminanceCoefficients(id);let e=id.x.toFixed(4),t=id.y.toFixed(4),n=id.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function o2(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lc).join(`
`)}function l2(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function c2(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=e.getActiveAttrib(t,s),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Lc(e){return e!==""}function LM(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function NM(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var u2=/^[ \t]*#include +<([\w\d./]+)>/gm;function c0(e){return e.replace(u2,f2)}var h2=new Map;function f2(e,t){let n=Kt[t];if(n===void 0){let i=h2.get(t);if(i!==void 0)n=Kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return c0(n)}var d2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function IM(e){return e.replace(d2,p2)}function p2(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function OM(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function m2(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Ug?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===bS?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Fi&&(t="SHADOWMAP_TYPE_VSM"),t}function g2(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case Qr:case jr:t="ENVMAP_TYPE_CUBE";break;case Ac:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _2(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case jr:t="ENVMAP_MODE_REFRACTION";break}return t}function v2(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Og:t="ENVMAP_BLENDING_MULTIPLY";break;case GS:t="ENVMAP_BLENDING_MIX";break;case kS:t="ENVMAP_BLENDING_ADD";break}return t}function y2(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function x2(e,t,n,i){let s=e.getContext(),r=n.defines,a=n.vertexShader,o=n.fragmentShader,l=m2(n),c=g2(n),u=_2(n),d=v2(n),h=y2(n),p=o2(n),g=l2(r),M=s.createProgram(),m,f,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Lc).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Lc).join(`
`),f.length>0&&(f+=`
`)):(m=[OM(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lc).join(`
`),f=[OM(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_s?"#define TONE_MAPPING":"",n.toneMapping!==_s?Kt.tonemapping_pars_fragment:"",n.toneMapping!==_s?r2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,s2("linearToOutputTexel",n.outputColorSpace),a2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Lc).join(`
`)),a=c0(a),a=LM(a,n),a=NM(a,n),o=c0(o),o=LM(o,n),o=NM(o,n),a=IM(a),o=IM(o),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===Yg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Yg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let v=_+m+a,y=_+f+o,A=CM(s,s.VERTEX_SHADER,v),C=CM(s,s.FRAGMENT_SHADER,y);s.attachShader(M,A),s.attachShader(M,C),n.index0AttributeName!==void 0?s.bindAttribLocation(M,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function w(R){if(e.debug.checkShaderErrors){let z=s.getProgramInfoLog(M)||"",k=s.getShaderInfoLog(A)||"",Z=s.getShaderInfoLog(C)||"",W=z.trim(),q=k.trim(),st=Z.trim(),G=!0,ft=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(G=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,M,A,C);else{let _t=UM(s,A,"vertex"),At=UM(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+_t+`
`+At)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(q===""||st==="")&&(ft=!1);ft&&(R.diagnostics={runnable:G,programLog:W,vertexShader:{log:q,prefix:m},fragmentShader:{log:st,prefix:f}})}s.deleteShader(A),s.deleteShader(C),U=new Io(s,M),E=c2(s,M)}let U;this.getUniforms=function(){return U===void 0&&w(this),U};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let x=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(M,t2)),x},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=e2++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=C,this}var S2=0,u0=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new h0(t),n.set(t,i)),i}},h0=class{constructor(t){this.id=S2++,this.code=t,this.usedTimes=0}};function M2(e,t,n,i,s,r,a){let o=new mo,l=new u0,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,x,R,z,k){let Z=z.fog,W=k.geometry,q=E.isMeshStandardMaterial?z.environment:null,st=(E.isMeshStandardMaterial?n:t).get(E.envMap||q),G=st&&st.mapping===Ac?st.image.height:null,ft=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let _t=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,At=_t!==void 0?_t.length:0,Vt=0;W.morphAttributes.position!==void 0&&(Vt=1),W.morphAttributes.normal!==void 0&&(Vt=2),W.morphAttributes.color!==void 0&&(Vt=3);let Jt,ae,Yt,Q;if(ft){let ue=Gi[ft];Jt=ue.vertexShader,ae=ue.fragmentShader}else Jt=E.vertexShader,ae=E.fragmentShader,l.update(E),Yt=l.getVertexShaderID(E),Q=l.getFragmentShaderID(E);let et=e.getRenderTarget(),bt=e.state.buffers.depth.getReversed(),Ot=k.isInstancedMesh===!0,Dt=k.isBatchedMesh===!0,Xt=!!E.map,oe=!!E.matcap,D=!!st,nt=!!E.aoMap,j=!!E.lightMap,K=!!E.bumpMap,Y=!!E.normalMap,ut=!!E.displacementMap,rt=!!E.emissiveMap,dt=!!E.metalnessMap,Ht=!!E.roughnessMap,zt=E.anisotropy>0,T=E.clearcoat>0,S=E.dispersion>0,L=E.iridescence>0,V=E.sheen>0,tt=E.transmission>0,X=zt&&!!E.anisotropyMap,Lt=T&&!!E.clearcoatMap,at=T&&!!E.clearcoatNormalMap,vt=T&&!!E.clearcoatRoughnessMap,Et=L&&!!E.iridescenceMap,it=L&&!!E.iridescenceThicknessMap,xt=V&&!!E.sheenColorMap,Pt=V&&!!E.sheenRoughnessMap,It=!!E.specularMap,yt=!!E.specularColorMap,Bt=!!E.specularIntensityMap,I=tt&&!!E.transmissionMap,ct=tt&&!!E.thicknessMap,mt=!!E.gradientMap,Ct=!!E.alphaMap,ot=E.alphaTest>0,J=!!E.alphaHash,Nt=!!E.extensions,Ft=_s;E.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Ft=e.toneMapping);let de={shaderID:ft,shaderType:E.type,shaderName:E.name,vertexShader:Jt,fragmentShader:ae,defines:E.defines,customVertexShaderID:Yt,customFragmentShaderID:Q,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Dt,batchingColor:Dt&&k._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&k.instanceColor!==null,instancingMorph:Ot&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:et===null?e.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Wr,alphaToCoverage:!!E.alphaToCoverage,map:Xt,matcap:oe,envMap:D,envMapMode:D&&st.mapping,envMapCubeUVHeight:G,aoMap:nt,lightMap:j,bumpMap:K,normalMap:Y,displacementMap:h&&ut,emissiveMap:rt,normalMapObjectSpace:Y&&E.normalMapType===$S,normalMapTangentSpace:Y&&E.normalMapType===Xg,metalnessMap:dt,roughnessMap:Ht,anisotropy:zt,anisotropyMap:X,clearcoat:T,clearcoatMap:Lt,clearcoatNormalMap:at,clearcoatRoughnessMap:vt,dispersion:S,iridescence:L,iridescenceMap:Et,iridescenceThicknessMap:it,sheen:V,sheenColorMap:xt,sheenRoughnessMap:Pt,specularMap:It,specularColorMap:yt,specularIntensityMap:Bt,transmission:tt,transmissionMap:I,thicknessMap:ct,gradientMap:mt,opaque:E.transparent===!1&&E.blending===Gr&&E.alphaToCoverage===!1,alphaMap:Ct,alphaTest:ot,alphaHash:J,combine:E.combine,mapUv:Xt&&M(E.map.channel),aoMapUv:nt&&M(E.aoMap.channel),lightMapUv:j&&M(E.lightMap.channel),bumpMapUv:K&&M(E.bumpMap.channel),normalMapUv:Y&&M(E.normalMap.channel),displacementMapUv:ut&&M(E.displacementMap.channel),emissiveMapUv:rt&&M(E.emissiveMap.channel),metalnessMapUv:dt&&M(E.metalnessMap.channel),roughnessMapUv:Ht&&M(E.roughnessMap.channel),anisotropyMapUv:X&&M(E.anisotropyMap.channel),clearcoatMapUv:Lt&&M(E.clearcoatMap.channel),clearcoatNormalMapUv:at&&M(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&M(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&M(E.iridescenceMap.channel),iridescenceThicknessMapUv:it&&M(E.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&M(E.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&M(E.sheenRoughnessMap.channel),specularMapUv:It&&M(E.specularMap.channel),specularColorMapUv:yt&&M(E.specularColorMap.channel),specularIntensityMapUv:Bt&&M(E.specularIntensityMap.channel),transmissionMapUv:I&&M(E.transmissionMap.channel),thicknessMapUv:ct&&M(E.thicknessMap.channel),alphaMapUv:Ct&&M(E.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Y||zt),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!W.attributes.uv&&(Xt||Ct),fog:!!Z,useFog:E.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:bt,skinning:k.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Vt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:e.shadowMap.enabled&&R.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Xt&&E.map.isVideoTexture===!0&&he.getTransfer(E.map.colorSpace)===pe,decodeVideoTextureEmissive:rt&&E.emissiveMap.isVideoTexture===!0&&he.getTransfer(E.emissiveMap.colorSpace)===pe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Xn,flipSided:E.side===bn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Nt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&E.extensions.multiDraw===!0||Dt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return de.vertexUv1s=c.has(1),de.vertexUv2s=c.has(2),de.vertexUv3s=c.has(3),c.clear(),de}function f(E){let x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(let R in E.defines)x.push(R),x.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(_(x,E),v(x,E),x.push(e.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function _(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function v(E,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){let x=g[E.type],R;if(x){let z=Gi[x];R=uM.clone(z.uniforms)}else R=E.uniforms;return R}function A(E,x){let R;for(let z=0,k=u.length;z<k;z++){let Z=u[z];if(Z.cacheKey===x){R=Z,++R.usedTimes;break}}return R===void 0&&(R=new x2(e,x,E,r),u.push(R)),R}function C(E){if(--E.usedTimes===0){let x=u.indexOf(E);u[x]=u[u.length-1],u.pop(),E.destroy()}}function w(E){l.remove(E)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:A,releaseProgram:C,releaseShaderCache:w,programs:u,dispose:U}}function b2(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function i(a){e.delete(a)}function s(a,o,l){e.get(a)[o]=l}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function E2(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function PM(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function BM(){let e=[],t=0,n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function a(d,h,p,g,M,m){let f=e[t];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:M,group:m},e[t]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=M,f.group=m),t++,f}function o(d,h,p,g,M,m){let f=a(d,h,p,g,M,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):n.push(f)}function l(d,h,p,g,M,m){let f=a(d,h,p,g,M,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):n.unshift(f)}function c(d,h){n.length>1&&n.sort(d||E2),i.length>1&&i.sort(h||PM),s.length>1&&s.sort(h||PM)}function u(){for(let d=t,h=e.length;d<h;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function T2(){let e=new WeakMap;function t(i,s){let r=e.get(i),a;return r===void 0?(a=new BM,e.set(i,[a])):s>=r.length?(a=new BM,r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function A2(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new N,color:new qt};break;case"SpotLight":n={position:new N,direction:new N,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new qt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":n={color:new qt,position:new N,halfWidth:new N,halfHeight:new N};break}return e[t.id]=n,n}}}function w2(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var R2=0;function C2(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function D2(e){let t=new A2,n=w2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let s=new N,r=new Ae,a=new Ae;function o(c){let u=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,M=0,m=0,f=0,_=0,v=0,y=0,A=0,C=0,w=0;c.sort(C2);for(let E=0,x=c.length;E<x;E++){let R=c[E],z=R.color,k=R.intensity,Z=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=z.r*k,d+=z.g*k,h+=z.b*k;else if(R.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(R.sh.coefficients[q],k);w++}else if(R.isDirectionalLight){let q=t.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let st=R.shadow,G=n.get(R);G.shadowIntensity=st.intensity,G.shadowBias=st.bias,G.shadowNormalBias=st.normalBias,G.shadowRadius=st.radius,G.shadowMapSize=st.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=W,i.directionalShadowMatrix[p]=R.shadow.matrix,_++}i.directional[p]=q,p++}else if(R.isSpotLight){let q=t.get(R);q.position.setFromMatrixPosition(R.matrixWorld),q.color.copy(z).multiplyScalar(k),q.distance=Z,q.coneCos=Math.cos(R.angle),q.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),q.decay=R.decay,i.spot[M]=q;let st=R.shadow;if(R.map&&(i.spotLightMap[A]=R.map,A++,st.updateMatrices(R),R.castShadow&&C++),i.spotLightMatrix[M]=st.matrix,R.castShadow){let G=n.get(R);G.shadowIntensity=st.intensity,G.shadowBias=st.bias,G.shadowNormalBias=st.normalBias,G.shadowRadius=st.radius,G.shadowMapSize=st.mapSize,i.spotShadow[M]=G,i.spotShadowMap[M]=W,y++}M++}else if(R.isRectAreaLight){let q=t.get(R);q.color.copy(z).multiplyScalar(k),q.halfWidth.set(R.width*.5,0,0),q.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=q,m++}else if(R.isPointLight){let q=t.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),q.distance=R.distance,q.decay=R.decay,R.castShadow){let st=R.shadow,G=n.get(R);G.shadowIntensity=st.intensity,G.shadowBias=st.bias,G.shadowNormalBias=st.normalBias,G.shadowRadius=st.radius,G.shadowMapSize=st.mapSize,G.shadowCameraNear=st.camera.near,G.shadowCameraFar=st.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=R.shadow.matrix,v++}i.point[g]=q,g++}else if(R.isHemisphereLight){let q=t.get(R);q.skyColor.copy(R.color).multiplyScalar(k),q.groundColor.copy(R.groundColor).multiplyScalar(k),i.hemi[f]=q,f++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let U=i.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==M||U.rectAreaLength!==m||U.hemiLength!==f||U.numDirectionalShadows!==_||U.numPointShadows!==v||U.numSpotShadows!==y||U.numSpotMaps!==A||U.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=M,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+A-C,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=w,U.directionalLength=p,U.pointLength=g,U.spotLength=M,U.rectAreaLength=m,U.hemiLength=f,U.numDirectionalShadows=_,U.numPointShadows=v,U.numSpotShadows=y,U.numSpotMaps=A,U.numLightProbes=w,i.version=R2++)}function l(c,u){let d=0,h=0,p=0,g=0,M=0,m=u.matrixWorldInverse;for(let f=0,_=c.length;f<_;f++){let v=c[f];if(v.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(v.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){let y=i.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){let y=i.hemi[M];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),M++}}}return{setup:o,setupView:l,state:i}}function zM(e){let t=new D2(e),n=[],i=[];function s(u){c.camera=u,n.length=0,i.length=0}function r(u){n.push(u)}function a(u){i.push(u)}function o(){t.setup(n)}function l(u){t.setupView(n,u)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function U2(e){let t=new WeakMap;function n(s,r=0){let a=t.get(s),o;return a===void 0?(o=new zM(e),t.set(s,[o])):r>=a.length?(o=new zM(e),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var L2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function I2(e,t,n){let i=new yo,s=new gt,r=new gt,a=new Ne,o=new Jh({depthPacking:jS}),l=new Qh,c={},u=n.maxTextureSize,d={[ps]:bn,[bn]:ps,[Xn]:Xn},h=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:L2,fragmentShader:N2}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let g=new Gn;g.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new Fe(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ug;let f=this.type;this.render=function(C,w,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let E=e.getRenderTarget(),x=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),z=e.state;z.setBlending(gs),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let k=f!==Fi&&this.type===Fi,Z=f===Fi&&this.type!==Fi;for(let W=0,q=C.length;W<q;W++){let st=C[W],G=st.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let ft=G.getFrameExtents();if(s.multiply(ft),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ft.x),s.x=r.x*ft.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ft.y),s.y=r.y*ft.y,G.mapSize.y=r.y)),G.map===null||k===!0||Z===!0){let At=this.type!==Fi?{minFilter:Cn,magFilter:Cn}:{};G.map!==null&&G.map.dispose(),G.map=new zi(s.x,s.y,At),G.map.texture.name=st.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();let _t=G.getViewportCount();for(let At=0;At<_t;At++){let Vt=G.getViewport(At);a.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),z.viewport(a),G.updateMatrices(st,At),i=G.getFrustum(),y(w,U,G.camera,st,this.type)}G.isPointLightShadow!==!0&&this.type===Fi&&_(G,U),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(E,x,R)};function _(C,w){let U=t.update(M);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new zi(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(w,null,U,h,M,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(w,null,U,p,M,null)}function v(C,w,U,E){let x=null,R=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)x=R;else if(x=U.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let z=x.uuid,k=w.uuid,Z=c[z];Z===void 0&&(Z={},c[z]=Z);let W=Z[k];W===void 0&&(W=x.clone(),Z[k]=W,w.addEventListener("dispose",A)),x=W}if(x.visible=w.visible,x.wireframe=w.wireframe,E===Fi?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:d[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let z=e.properties.get(x);z.light=U}return x}function y(C,w,U,E,x){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&x===Fi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);let k=t.update(C),Z=C.material;if(Array.isArray(Z)){let W=k.groups;for(let q=0,st=W.length;q<st;q++){let G=W[q],ft=Z[G.materialIndex];if(ft&&ft.visible){let _t=v(C,ft,E,x);C.onBeforeShadow(e,C,w,U,k,_t,G),e.renderBufferDirect(U,null,k,_t,C,G),C.onAfterShadow(e,C,w,U,k,_t,G)}}}else if(Z.visible){let W=v(C,Z,E,x);C.onBeforeShadow(e,C,w,U,k,W,null),e.renderBufferDirect(U,null,k,W,C,null),C.onAfterShadow(e,C,w,U,k,W,null)}}let z=C.children;for(let k=0,Z=z.length;k<Z;k++)y(z[k],w,U,E,x)}function A(C){C.target.removeEventListener("dispose",A);for(let U in c){let E=c[U],x=C.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}var O2={[uf]:hf,[ff]:mf,[df]:gf,[kr]:pf,[hf]:uf,[mf]:ff,[gf]:df,[pf]:kr};function P2(e,t){function n(){let I=!1,ct=new Ne,mt=null,Ct=new Ne(0,0,0,0);return{setMask:function(ot){mt!==ot&&!I&&(e.colorMask(ot,ot,ot,ot),mt=ot)},setLocked:function(ot){I=ot},setClear:function(ot,J,Nt,Ft,de){de===!0&&(ot*=Ft,J*=Ft,Nt*=Ft),ct.set(ot,J,Nt,Ft),Ct.equals(ct)===!1&&(e.clearColor(ot,J,Nt,Ft),Ct.copy(ct))},reset:function(){I=!1,mt=null,Ct.set(-1,0,0,0)}}}function i(){let I=!1,ct=!1,mt=null,Ct=null,ot=null;return{setReversed:function(J){if(ct!==J){let Nt=t.get("EXT_clip_control");J?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT),ct=J;let Ft=ot;ot=null,this.setClear(Ft)}},getReversed:function(){return ct},setTest:function(J){J?et(e.DEPTH_TEST):bt(e.DEPTH_TEST)},setMask:function(J){mt!==J&&!I&&(e.depthMask(J),mt=J)},setFunc:function(J){if(ct&&(J=O2[J]),Ct!==J){switch(J){case uf:e.depthFunc(e.NEVER);break;case hf:e.depthFunc(e.ALWAYS);break;case ff:e.depthFunc(e.LESS);break;case kr:e.depthFunc(e.LEQUAL);break;case df:e.depthFunc(e.EQUAL);break;case pf:e.depthFunc(e.GEQUAL);break;case mf:e.depthFunc(e.GREATER);break;case gf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}Ct=J}},setLocked:function(J){I=J},setClear:function(J){ot!==J&&(ct&&(J=1-J),e.clearDepth(J),ot=J)},reset:function(){I=!1,mt=null,Ct=null,ot=null,ct=!1}}}function s(){let I=!1,ct=null,mt=null,Ct=null,ot=null,J=null,Nt=null,Ft=null,de=null;return{setTest:function(ue){I||(ue?et(e.STENCIL_TEST):bt(e.STENCIL_TEST))},setMask:function(ue){ct!==ue&&!I&&(e.stencilMask(ue),ct=ue)},setFunc:function(ue,qn,Yn){(mt!==ue||Ct!==qn||ot!==Yn)&&(e.stencilFunc(ue,qn,Yn),mt=ue,Ct=qn,ot=Yn)},setOp:function(ue,qn,Yn){(J!==ue||Nt!==qn||Ft!==Yn)&&(e.stencilOp(ue,qn,Yn),J=ue,Nt=qn,Ft=Yn)},setLocked:function(ue){I=ue},setClear:function(ue){de!==ue&&(e.clearStencil(ue),de=ue)},reset:function(){I=!1,ct=null,mt=null,Ct=null,ot=null,J=null,Nt=null,Ft=null,de=null}}}let r=new n,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h=new WeakMap,p=[],g=null,M=!1,m=null,f=null,_=null,v=null,y=null,A=null,C=null,w=new qt(0,0,0),U=0,E=!1,x=null,R=null,z=null,k=null,Z=null,W=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,st=0,G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(G)[1]),q=st>=1):G.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),q=st>=2);let ft=null,_t={},At=e.getParameter(e.SCISSOR_BOX),Vt=e.getParameter(e.VIEWPORT),Jt=new Ne().fromArray(At),ae=new Ne().fromArray(Vt);function Yt(I,ct,mt,Ct){let ot=new Uint8Array(4),J=e.createTexture();e.bindTexture(I,J),e.texParameteri(I,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(I,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Nt=0;Nt<mt;Nt++)I===e.TEXTURE_3D||I===e.TEXTURE_2D_ARRAY?e.texImage3D(ct,0,e.RGBA,1,1,Ct,0,e.RGBA,e.UNSIGNED_BYTE,ot):e.texImage2D(ct+Nt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ot);return J}let Q={};Q[e.TEXTURE_2D]=Yt(e.TEXTURE_2D,e.TEXTURE_2D,1),Q[e.TEXTURE_CUBE_MAP]=Yt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[e.TEXTURE_2D_ARRAY]=Yt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Q[e.TEXTURE_3D]=Yt(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(e.DEPTH_TEST),a.setFunc(kr),K(!1),Y(Dg),et(e.CULL_FACE),nt(gs);function et(I){u[I]!==!0&&(e.enable(I),u[I]=!0)}function bt(I){u[I]!==!1&&(e.disable(I),u[I]=!1)}function Ot(I,ct){return d[I]!==ct?(e.bindFramebuffer(I,ct),d[I]=ct,I===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=ct),I===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=ct),!0):!1}function Dt(I,ct){let mt=p,Ct=!1;if(I){mt=h.get(ct),mt===void 0&&(mt=[],h.set(ct,mt));let ot=I.textures;if(mt.length!==ot.length||mt[0]!==e.COLOR_ATTACHMENT0){for(let J=0,Nt=ot.length;J<Nt;J++)mt[J]=e.COLOR_ATTACHMENT0+J;mt.length=ot.length,Ct=!0}}else mt[0]!==e.BACK&&(mt[0]=e.BACK,Ct=!0);Ct&&e.drawBuffers(mt)}function Xt(I){return g!==I?(e.useProgram(I),g=I,!0):!1}let oe={[er]:e.FUNC_ADD,[TS]:e.FUNC_SUBTRACT,[AS]:e.FUNC_REVERSE_SUBTRACT};oe[wS]=e.MIN,oe[RS]=e.MAX;let D={[CS]:e.ZERO,[DS]:e.ONE,[US]:e.SRC_COLOR,[Oh]:e.SRC_ALPHA,[BS]:e.SRC_ALPHA_SATURATE,[OS]:e.DST_COLOR,[NS]:e.DST_ALPHA,[LS]:e.ONE_MINUS_SRC_COLOR,[Ph]:e.ONE_MINUS_SRC_ALPHA,[PS]:e.ONE_MINUS_DST_COLOR,[IS]:e.ONE_MINUS_DST_ALPHA,[zS]:e.CONSTANT_COLOR,[FS]:e.ONE_MINUS_CONSTANT_COLOR,[HS]:e.CONSTANT_ALPHA,[VS]:e.ONE_MINUS_CONSTANT_ALPHA};function nt(I,ct,mt,Ct,ot,J,Nt,Ft,de,ue){if(I===gs){M===!0&&(bt(e.BLEND),M=!1);return}if(M===!1&&(et(e.BLEND),M=!0),I!==ES){if(I!==m||ue!==E){if((f!==er||y!==er)&&(e.blendEquation(e.FUNC_ADD),f=er,y=er),ue)switch(I){case Gr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Lg:e.blendFunc(e.ONE,e.ONE);break;case Ng:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ig:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Gr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Lg:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ng:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ig:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}_=null,v=null,A=null,C=null,w.set(0,0,0),U=0,m=I,E=ue}return}ot=ot||ct,J=J||mt,Nt=Nt||Ct,(ct!==f||ot!==y)&&(e.blendEquationSeparate(oe[ct],oe[ot]),f=ct,y=ot),(mt!==_||Ct!==v||J!==A||Nt!==C)&&(e.blendFuncSeparate(D[mt],D[Ct],D[J],D[Nt]),_=mt,v=Ct,A=J,C=Nt),(Ft.equals(w)===!1||de!==U)&&(e.blendColor(Ft.r,Ft.g,Ft.b,de),w.copy(Ft),U=de),m=I,E=!1}function j(I,ct){I.side===Xn?bt(e.CULL_FACE):et(e.CULL_FACE);let mt=I.side===bn;ct&&(mt=!mt),K(mt),I.blending===Gr&&I.transparent===!1?nt(gs):nt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let Ct=I.stencilWrite;o.setTest(Ct),Ct&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),rt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?et(e.SAMPLE_ALPHA_TO_COVERAGE):bt(e.SAMPLE_ALPHA_TO_COVERAGE)}function K(I){x!==I&&(I?e.frontFace(e.CW):e.frontFace(e.CCW),x=I)}function Y(I){I!==SS?(et(e.CULL_FACE),I!==R&&(I===Dg?e.cullFace(e.BACK):I===MS?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):bt(e.CULL_FACE),R=I}function ut(I){I!==z&&(q&&e.lineWidth(I),z=I)}function rt(I,ct,mt){I?(et(e.POLYGON_OFFSET_FILL),(k!==ct||Z!==mt)&&(e.polygonOffset(ct,mt),k=ct,Z=mt)):bt(e.POLYGON_OFFSET_FILL)}function dt(I){I?et(e.SCISSOR_TEST):bt(e.SCISSOR_TEST)}function Ht(I){I===void 0&&(I=e.TEXTURE0+W-1),ft!==I&&(e.activeTexture(I),ft=I)}function zt(I,ct,mt){mt===void 0&&(ft===null?mt=e.TEXTURE0+W-1:mt=ft);let Ct=_t[mt];Ct===void 0&&(Ct={type:void 0,texture:void 0},_t[mt]=Ct),(Ct.type!==I||Ct.texture!==ct)&&(ft!==mt&&(e.activeTexture(mt),ft=mt),e.bindTexture(I,ct||Q[I]),Ct.type=I,Ct.texture=ct)}function T(){let I=_t[ft];I!==void 0&&I.type!==void 0&&(e.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function S(){try{e.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function L(){try{e.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function V(){try{e.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function tt(){try{e.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Lt(){try{e.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function at(){try{e.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function vt(){try{e.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Et(){try{e.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function it(){try{e.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(I){Jt.equals(I)===!1&&(e.scissor(I.x,I.y,I.z,I.w),Jt.copy(I))}function Pt(I){ae.equals(I)===!1&&(e.viewport(I.x,I.y,I.z,I.w),ae.copy(I))}function It(I,ct){let mt=c.get(ct);mt===void 0&&(mt=new WeakMap,c.set(ct,mt));let Ct=mt.get(I);Ct===void 0&&(Ct=e.getUniformBlockIndex(ct,I.name),mt.set(I,Ct))}function yt(I,ct){let Ct=c.get(ct).get(I);l.get(ct)!==Ct&&(e.uniformBlockBinding(ct,Ct,I.__bindingPointIndex),l.set(ct,Ct))}function Bt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},ft=null,_t={},d={},h=new WeakMap,p=[],g=null,M=!1,m=null,f=null,_=null,v=null,y=null,A=null,C=null,w=new qt(0,0,0),U=0,E=!1,x=null,R=null,z=null,k=null,Z=null,Jt.set(0,0,e.canvas.width,e.canvas.height),ae.set(0,0,e.canvas.width,e.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:bt,bindFramebuffer:Ot,drawBuffers:Dt,useProgram:Xt,setBlending:nt,setMaterial:j,setFlipSided:K,setCullFace:Y,setLineWidth:ut,setPolygonOffset:rt,setScissorTest:dt,activeTexture:Ht,bindTexture:zt,unbindTexture:T,compressedTexImage2D:S,compressedTexImage3D:L,texImage2D:Et,texImage3D:it,updateUBOMapping:It,uniformBlockBinding:yt,texStorage2D:at,texStorage3D:vt,texSubImage2D:V,texSubImage3D:tt,compressedTexSubImage2D:X,compressedTexSubImage3D:Lt,scissor:xt,viewport:Pt,reset:Bt}}function B2(e,t,n,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,u=new WeakMap,d,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return p?new OffscreenCanvas(T,S):rc("canvas")}function M(T,S,L){let V=1,tt=zt(T);if((tt.width>L||tt.height>L)&&(V=L/Math.max(tt.width,tt.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let X=Math.floor(V*tt.width),Lt=Math.floor(V*tt.height);d===void 0&&(d=g(X,Lt));let at=S?g(X,Lt):d;return at.width=X,at.height=Lt,at.getContext("2d").drawImage(T,0,0,X,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+X+"x"+Lt+")."),at}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){e.generateMipmap(T)}function _(T){return T.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?e.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function v(T,S,L,V,tt=!1){if(T!==null){if(e[T]!==void 0)return e[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=S;if(S===e.RED&&(L===e.FLOAT&&(X=e.R32F),L===e.HALF_FLOAT&&(X=e.R16F),L===e.UNSIGNED_BYTE&&(X=e.R8)),S===e.RED_INTEGER&&(L===e.UNSIGNED_BYTE&&(X=e.R8UI),L===e.UNSIGNED_SHORT&&(X=e.R16UI),L===e.UNSIGNED_INT&&(X=e.R32UI),L===e.BYTE&&(X=e.R8I),L===e.SHORT&&(X=e.R16I),L===e.INT&&(X=e.R32I)),S===e.RG&&(L===e.FLOAT&&(X=e.RG32F),L===e.HALF_FLOAT&&(X=e.RG16F),L===e.UNSIGNED_BYTE&&(X=e.RG8)),S===e.RG_INTEGER&&(L===e.UNSIGNED_BYTE&&(X=e.RG8UI),L===e.UNSIGNED_SHORT&&(X=e.RG16UI),L===e.UNSIGNED_INT&&(X=e.RG32UI),L===e.BYTE&&(X=e.RG8I),L===e.SHORT&&(X=e.RG16I),L===e.INT&&(X=e.RG32I)),S===e.RGB_INTEGER&&(L===e.UNSIGNED_BYTE&&(X=e.RGB8UI),L===e.UNSIGNED_SHORT&&(X=e.RGB16UI),L===e.UNSIGNED_INT&&(X=e.RGB32UI),L===e.BYTE&&(X=e.RGB8I),L===e.SHORT&&(X=e.RGB16I),L===e.INT&&(X=e.RGB32I)),S===e.RGBA_INTEGER&&(L===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),L===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),L===e.UNSIGNED_INT&&(X=e.RGBA32UI),L===e.BYTE&&(X=e.RGBA8I),L===e.SHORT&&(X=e.RGBA16I),L===e.INT&&(X=e.RGBA32I)),S===e.RGB&&(L===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),L===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),S===e.RGBA){let Lt=tt?ic:he.getTransfer(V);L===e.FLOAT&&(X=e.RGBA32F),L===e.HALF_FLOAT&&(X=e.RGBA16F),L===e.UNSIGNED_BYTE&&(X=Lt===pe?e.SRGB8_ALPHA8:e.RGBA8),L===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),L===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(T,S){let L;return T?S===null||S===lr||S===Co?L=e.DEPTH24_STENCIL8:S===Vi?L=e.DEPTH32F_STENCIL8:S===wo&&(L=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===lr||S===Co?L=e.DEPTH_COMPONENT24:S===Vi?L=e.DEPTH_COMPONENT32F:S===wo&&(L=e.DEPTH_COMPONENT16),L}function A(T,S){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Cn&&T.minFilter!==Vn?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function C(T){let S=T.target;S.removeEventListener("dispose",C),U(S),S.isVideoTexture&&u.delete(S)}function w(T){let S=T.target;S.removeEventListener("dispose",w),x(S)}function U(T){let S=i.get(T);if(S.__webglInit===void 0)return;let L=T.source,V=h.get(L);if(V){let tt=V[S.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&E(T),Object.keys(V).length===0&&h.delete(L)}i.remove(T)}function E(T){let S=i.get(T);e.deleteTexture(S.__webglTexture);let L=T.source,V=h.get(L);delete V[S.__cacheKey],a.memory.textures--}function x(T){let S=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(S.__webglFramebuffer[V]))for(let tt=0;tt<S.__webglFramebuffer[V].length;tt++)e.deleteFramebuffer(S.__webglFramebuffer[V][tt]);else e.deleteFramebuffer(S.__webglFramebuffer[V]);S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[V])}else{if(Array.isArray(S.__webglFramebuffer))for(let V=0;V<S.__webglFramebuffer.length;V++)e.deleteFramebuffer(S.__webglFramebuffer[V]);else e.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let V=0;V<S.__webglColorRenderbuffer.length;V++)S.__webglColorRenderbuffer[V]&&e.deleteRenderbuffer(S.__webglColorRenderbuffer[V]);S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let L=T.textures;for(let V=0,tt=L.length;V<tt;V++){let X=i.get(L[V]);X.__webglTexture&&(e.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(L[V])}i.remove(T)}let R=0;function z(){R=0}function k(){let T=R;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),R+=1,T}function Z(T){let S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function W(T,S){let L=i.get(T);if(T.isVideoTexture&&dt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&L.__version!==T.version){let V=T.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(L,T,S);return}}else T.isExternalTexture&&(L.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,L.__webglTexture,e.TEXTURE0+S)}function q(T,S){let L=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){Q(L,T,S);return}n.bindTexture(e.TEXTURE_2D_ARRAY,L.__webglTexture,e.TEXTURE0+S)}function st(T,S){let L=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){Q(L,T,S);return}n.bindTexture(e.TEXTURE_3D,L.__webglTexture,e.TEXTURE0+S)}function G(T,S){let L=i.get(T);if(T.version>0&&L.__version!==T.version){et(L,T,S);return}n.bindTexture(e.TEXTURE_CUBE_MAP,L.__webglTexture,e.TEXTURE0+S)}let ft={[Bi]:e.REPEAT,[Ii]:e.CLAMP_TO_EDGE,[Bh]:e.MIRRORED_REPEAT},_t={[Cn]:e.NEAREST,[JS]:e.NEAREST_MIPMAP_NEAREST,[wc]:e.NEAREST_MIPMAP_LINEAR,[Vn]:e.LINEAR,[xf]:e.LINEAR_MIPMAP_NEAREST,[Hi]:e.LINEAR_MIPMAP_LINEAR},At={[tM]:e.NEVER,[aM]:e.ALWAYS,[eM]:e.LESS,[qg]:e.LEQUAL,[nM]:e.EQUAL,[rM]:e.GEQUAL,[iM]:e.GREATER,[sM]:e.NOTEQUAL};function Vt(T,S){if(S.type===Vi&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Vn||S.magFilter===xf||S.magFilter===wc||S.magFilter===Hi||S.minFilter===Vn||S.minFilter===xf||S.minFilter===wc||S.minFilter===Hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(T,e.TEXTURE_WRAP_S,ft[S.wrapS]),e.texParameteri(T,e.TEXTURE_WRAP_T,ft[S.wrapT]),(T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY)&&e.texParameteri(T,e.TEXTURE_WRAP_R,ft[S.wrapR]),e.texParameteri(T,e.TEXTURE_MAG_FILTER,_t[S.magFilter]),e.texParameteri(T,e.TEXTURE_MIN_FILTER,_t[S.minFilter]),S.compareFunction&&(e.texParameteri(T,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(T,e.TEXTURE_COMPARE_FUNC,At[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Cn||S.minFilter!==wc&&S.minFilter!==Hi||S.type===Vi&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let L=t.get("EXT_texture_filter_anisotropic");e.texParameterf(T,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Jt(T,S){let L=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",C));let V=S.source,tt=h.get(V);tt===void 0&&(tt={},h.set(V,tt));let X=Z(S);if(X!==T.__cacheKey){tt[X]===void 0&&(tt[X]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,L=!0),tt[X].usedTimes++;let Lt=tt[T.__cacheKey];Lt!==void 0&&(tt[T.__cacheKey].usedTimes--,Lt.usedTimes===0&&E(S)),T.__cacheKey=X,T.__webglTexture=tt[X].texture}return L}function ae(T,S,L){return Math.floor(Math.floor(T/L)/S)}function Yt(T,S,L,V){let X=T.updateRanges;if(X.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,S.width,S.height,L,V,S.data);else{X.sort((it,xt)=>it.start-xt.start);let Lt=0;for(let it=1;it<X.length;it++){let xt=X[Lt],Pt=X[it],It=xt.start+xt.count,yt=ae(Pt.start,S.width,4),Bt=ae(xt.start,S.width,4);Pt.start<=It+1&&yt===Bt&&ae(Pt.start+Pt.count-1,S.width,4)===yt?xt.count=Math.max(xt.count,Pt.start+Pt.count-xt.start):(++Lt,X[Lt]=Pt)}X.length=Lt+1;let at=e.getParameter(e.UNPACK_ROW_LENGTH),vt=e.getParameter(e.UNPACK_SKIP_PIXELS),Et=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,S.width);for(let it=0,xt=X.length;it<xt;it++){let Pt=X[it],It=Math.floor(Pt.start/4),yt=Math.ceil(Pt.count/4),Bt=It%S.width,I=Math.floor(It/S.width),ct=yt,mt=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(e.UNPACK_SKIP_ROWS,I),n.texSubImage2D(e.TEXTURE_2D,0,Bt,I,ct,mt,L,V,S.data)}T.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,at),e.pixelStorei(e.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Et)}}function Q(T,S,L){let V=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(V=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(V=e.TEXTURE_3D);let tt=Jt(T,S),X=S.source;n.bindTexture(V,T.__webglTexture,e.TEXTURE0+L);let Lt=i.get(X);if(X.version!==Lt.__version||tt===!0){n.activeTexture(e.TEXTURE0+L);let at=he.getPrimaries(he.workingColorSpace),vt=S.colorSpace===vs?null:he.getPrimaries(S.colorSpace),Et=S.colorSpace===vs||at===vt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let it=M(S.image,!1,s.maxTextureSize);it=Ht(S,it);let xt=r.convert(S.format,S.colorSpace),Pt=r.convert(S.type),It=v(S.internalFormat,xt,Pt,S.colorSpace,S.isVideoTexture);Vt(V,S);let yt,Bt=S.mipmaps,I=S.isVideoTexture!==!0,ct=Lt.__version===void 0||tt===!0,mt=X.dataReady,Ct=A(S,it);if(S.isDepthTexture)It=y(S.format===Do,S.type),ct&&(I?n.texStorage2D(e.TEXTURE_2D,1,It,it.width,it.height):n.texImage2D(e.TEXTURE_2D,0,It,it.width,it.height,0,xt,Pt,null));else if(S.isDataTexture)if(Bt.length>0){I&&ct&&n.texStorage2D(e.TEXTURE_2D,Ct,It,Bt[0].width,Bt[0].height);for(let ot=0,J=Bt.length;ot<J;ot++)yt=Bt[ot],I?mt&&n.texSubImage2D(e.TEXTURE_2D,ot,0,0,yt.width,yt.height,xt,Pt,yt.data):n.texImage2D(e.TEXTURE_2D,ot,It,yt.width,yt.height,0,xt,Pt,yt.data);S.generateMipmaps=!1}else I?(ct&&n.texStorage2D(e.TEXTURE_2D,Ct,It,it.width,it.height),mt&&Yt(S,it,xt,Pt)):n.texImage2D(e.TEXTURE_2D,0,It,it.width,it.height,0,xt,Pt,it.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){I&&ct&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Ct,It,Bt[0].width,Bt[0].height,it.depth);for(let ot=0,J=Bt.length;ot<J;ot++)if(yt=Bt[ot],S.format!==ci)if(xt!==null)if(I){if(mt)if(S.layerUpdates.size>0){let Nt=$g(yt.width,yt.height,S.format,S.type);for(let Ft of S.layerUpdates){let de=yt.data.subarray(Ft*Nt/yt.data.BYTES_PER_ELEMENT,(Ft+1)*Nt/yt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ot,0,0,Ft,yt.width,yt.height,1,xt,de)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ot,0,0,0,yt.width,yt.height,it.depth,xt,yt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ot,It,yt.width,yt.height,it.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?mt&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,ot,0,0,0,yt.width,yt.height,it.depth,xt,Pt,yt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,ot,It,yt.width,yt.height,it.depth,0,xt,Pt,yt.data)}else{I&&ct&&n.texStorage2D(e.TEXTURE_2D,Ct,It,Bt[0].width,Bt[0].height);for(let ot=0,J=Bt.length;ot<J;ot++)yt=Bt[ot],S.format!==ci?xt!==null?I?mt&&n.compressedTexSubImage2D(e.TEXTURE_2D,ot,0,0,yt.width,yt.height,xt,yt.data):n.compressedTexImage2D(e.TEXTURE_2D,ot,It,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?mt&&n.texSubImage2D(e.TEXTURE_2D,ot,0,0,yt.width,yt.height,xt,Pt,yt.data):n.texImage2D(e.TEXTURE_2D,ot,It,yt.width,yt.height,0,xt,Pt,yt.data)}else if(S.isDataArrayTexture)if(I){if(ct&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Ct,It,it.width,it.height,it.depth),mt)if(S.layerUpdates.size>0){let ot=$g(it.width,it.height,S.format,S.type);for(let J of S.layerUpdates){let Nt=it.data.subarray(J*ot/it.data.BYTES_PER_ELEMENT,(J+1)*ot/it.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,J,it.width,it.height,1,xt,Pt,Nt)}S.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,xt,Pt,it.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,It,it.width,it.height,it.depth,0,xt,Pt,it.data);else if(S.isData3DTexture)I?(ct&&n.texStorage3D(e.TEXTURE_3D,Ct,It,it.width,it.height,it.depth),mt&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,xt,Pt,it.data)):n.texImage3D(e.TEXTURE_3D,0,It,it.width,it.height,it.depth,0,xt,Pt,it.data);else if(S.isFramebufferTexture){if(ct)if(I)n.texStorage2D(e.TEXTURE_2D,Ct,It,it.width,it.height);else{let ot=it.width,J=it.height;for(let Nt=0;Nt<Ct;Nt++)n.texImage2D(e.TEXTURE_2D,Nt,It,ot,J,0,xt,Pt,null),ot>>=1,J>>=1}}else if(Bt.length>0){if(I&&ct){let ot=zt(Bt[0]);n.texStorage2D(e.TEXTURE_2D,Ct,It,ot.width,ot.height)}for(let ot=0,J=Bt.length;ot<J;ot++)yt=Bt[ot],I?mt&&n.texSubImage2D(e.TEXTURE_2D,ot,0,0,xt,Pt,yt):n.texImage2D(e.TEXTURE_2D,ot,It,xt,Pt,yt);S.generateMipmaps=!1}else if(I){if(ct){let ot=zt(it);n.texStorage2D(e.TEXTURE_2D,Ct,It,ot.width,ot.height)}mt&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,xt,Pt,it)}else n.texImage2D(e.TEXTURE_2D,0,It,xt,Pt,it);m(S)&&f(V),Lt.__version=X.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function et(T,S,L){if(S.image.length!==6)return;let V=Jt(T,S),tt=S.source;n.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+L);let X=i.get(tt);if(tt.version!==X.__version||V===!0){n.activeTexture(e.TEXTURE0+L);let Lt=he.getPrimaries(he.workingColorSpace),at=S.colorSpace===vs?null:he.getPrimaries(S.colorSpace),vt=S.colorSpace===vs||Lt===at?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Et=S.isCompressedTexture||S.image[0].isCompressedTexture,it=S.image[0]&&S.image[0].isDataTexture,xt=[];for(let J=0;J<6;J++)!Et&&!it?xt[J]=M(S.image[J],!0,s.maxCubemapSize):xt[J]=it?S.image[J].image:S.image[J],xt[J]=Ht(S,xt[J]);let Pt=xt[0],It=r.convert(S.format,S.colorSpace),yt=r.convert(S.type),Bt=v(S.internalFormat,It,yt,S.colorSpace),I=S.isVideoTexture!==!0,ct=X.__version===void 0||V===!0,mt=tt.dataReady,Ct=A(S,Pt);Vt(e.TEXTURE_CUBE_MAP,S);let ot;if(Et){I&&ct&&n.texStorage2D(e.TEXTURE_CUBE_MAP,Ct,Bt,Pt.width,Pt.height);for(let J=0;J<6;J++){ot=xt[J].mipmaps;for(let Nt=0;Nt<ot.length;Nt++){let Ft=ot[Nt];S.format!==ci?It!==null?I?mt&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt,0,0,Ft.width,Ft.height,It,Ft.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt,Bt,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?mt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt,0,0,Ft.width,Ft.height,It,yt,Ft.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt,Bt,Ft.width,Ft.height,0,It,yt,Ft.data)}}}else{if(ot=S.mipmaps,I&&ct){ot.length>0&&Ct++;let J=zt(xt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,Ct,Bt,J.width,J.height)}for(let J=0;J<6;J++)if(it){I?mt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,xt[J].width,xt[J].height,It,yt,xt[J].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Bt,xt[J].width,xt[J].height,0,It,yt,xt[J].data);for(let Nt=0;Nt<ot.length;Nt++){let de=ot[Nt].image[J].image;I?mt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt+1,0,0,de.width,de.height,It,yt,de.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt+1,Bt,de.width,de.height,0,It,yt,de.data)}}else{I?mt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,It,yt,xt[J]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Bt,It,yt,xt[J]);for(let Nt=0;Nt<ot.length;Nt++){let Ft=ot[Nt];I?mt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt+1,0,0,It,yt,Ft.image[J]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,Nt+1,Bt,It,yt,Ft.image[J])}}}m(S)&&f(e.TEXTURE_CUBE_MAP),X.__version=tt.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function bt(T,S,L,V,tt,X){let Lt=r.convert(L.format,L.colorSpace),at=r.convert(L.type),vt=v(L.internalFormat,Lt,at,L.colorSpace),Et=i.get(S),it=i.get(L);if(it.__renderTarget=S,!Et.__hasExternalTextures){let xt=Math.max(1,S.width>>X),Pt=Math.max(1,S.height>>X);tt===e.TEXTURE_3D||tt===e.TEXTURE_2D_ARRAY?n.texImage3D(tt,X,vt,xt,Pt,S.depth,0,Lt,at,null):n.texImage2D(tt,X,vt,xt,Pt,0,Lt,at,null)}n.bindFramebuffer(e.FRAMEBUFFER,T),rt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,V,tt,it.__webglTexture,0,ut(S)):(tt===e.TEXTURE_2D||tt>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,V,tt,it.__webglTexture,X),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ot(T,S,L){if(e.bindRenderbuffer(e.RENDERBUFFER,T),S.depthBuffer){let V=S.depthTexture,tt=V&&V.isDepthTexture?V.type:null,X=y(S.stencilBuffer,tt),Lt=S.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,at=ut(S);rt(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,at,X,S.width,S.height):L?e.renderbufferStorageMultisample(e.RENDERBUFFER,at,X,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,X,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Lt,e.RENDERBUFFER,T)}else{let V=S.textures;for(let tt=0;tt<V.length;tt++){let X=V[tt],Lt=r.convert(X.format,X.colorSpace),at=r.convert(X.type),vt=v(X.internalFormat,Lt,at,X.colorSpace),Et=ut(S);L&&rt(S)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Et,vt,S.width,S.height):rt(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Et,vt,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,vt,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Dt(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let V=i.get(S.depthTexture);V.__renderTarget=S,(!V.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),W(S.depthTexture,0);let tt=V.__webglTexture,X=ut(S);if(S.depthTexture.format===uo)rt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,tt,0,X):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,tt,0);else if(S.depthTexture.format===Do)rt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,tt,0,X):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Xt(T){let S=i.get(T),L=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){let V=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),V){let tt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,V.removeEventListener("dispose",tt)};V.addEventListener("dispose",tt),S.__depthDisposeCallback=tt}S.__boundDepthTexture=V}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");let V=T.texture.mipmaps;V&&V.length>0?Dt(S.__webglFramebuffer[0],T):Dt(S.__webglFramebuffer,T)}else if(L){S.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[V]),S.__webglDepthbuffer[V]===void 0)S.__webglDepthbuffer[V]=e.createRenderbuffer(),Ot(S.__webglDepthbuffer[V],T,!1);else{let tt=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=S.__webglDepthbuffer[V];e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,tt,e.RENDERBUFFER,X)}}else{let V=T.texture.mipmaps;if(V&&V.length>0?n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=e.createRenderbuffer(),Ot(S.__webglDepthbuffer,T,!1);else{let tt=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=S.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,tt,e.RENDERBUFFER,X)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function oe(T,S,L){let V=i.get(T);S!==void 0&&bt(V.__webglFramebuffer,T,T.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),L!==void 0&&Xt(T)}function D(T){let S=T.texture,L=i.get(T),V=i.get(S);T.addEventListener("dispose",w);let tt=T.textures,X=T.isWebGLCubeRenderTarget===!0,Lt=tt.length>1;if(Lt||(V.__webglTexture===void 0&&(V.__webglTexture=e.createTexture()),V.__version=S.version,a.memory.textures++),X){L.__webglFramebuffer=[];for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0){L.__webglFramebuffer[at]=[];for(let vt=0;vt<S.mipmaps.length;vt++)L.__webglFramebuffer[at][vt]=e.createFramebuffer()}else L.__webglFramebuffer[at]=e.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){L.__webglFramebuffer=[];for(let at=0;at<S.mipmaps.length;at++)L.__webglFramebuffer[at]=e.createFramebuffer()}else L.__webglFramebuffer=e.createFramebuffer();if(Lt)for(let at=0,vt=tt.length;at<vt;at++){let Et=i.get(tt[at]);Et.__webglTexture===void 0&&(Et.__webglTexture=e.createTexture(),a.memory.textures++)}if(T.samples>0&&rt(T)===!1){L.__webglMultisampledFramebuffer=e.createFramebuffer(),L.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let at=0;at<tt.length;at++){let vt=tt[at];L.__webglColorRenderbuffer[at]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,L.__webglColorRenderbuffer[at]);let Et=r.convert(vt.format,vt.colorSpace),it=r.convert(vt.type),xt=v(vt.internalFormat,Et,it,vt.colorSpace,T.isXRRenderTarget===!0),Pt=ut(T);e.renderbufferStorageMultisample(e.RENDERBUFFER,Pt,xt,T.width,T.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+at,e.RENDERBUFFER,L.__webglColorRenderbuffer[at])}e.bindRenderbuffer(e.RENDERBUFFER,null),T.depthBuffer&&(L.__webglDepthRenderbuffer=e.createRenderbuffer(),Ot(L.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(X){n.bindTexture(e.TEXTURE_CUBE_MAP,V.__webglTexture),Vt(e.TEXTURE_CUBE_MAP,S);for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0)for(let vt=0;vt<S.mipmaps.length;vt++)bt(L.__webglFramebuffer[at][vt],T,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt);else bt(L.__webglFramebuffer[at],T,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(S)&&f(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Lt){for(let at=0,vt=tt.length;at<vt;at++){let Et=tt[at],it=i.get(Et),xt=e.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(xt=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(xt,it.__webglTexture),Vt(xt,Et),bt(L.__webglFramebuffer,T,Et,e.COLOR_ATTACHMENT0+at,xt,0),m(Et)&&f(xt)}n.unbindTexture()}else{let at=e.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(at=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(at,V.__webglTexture),Vt(at,S),S.mipmaps&&S.mipmaps.length>0)for(let vt=0;vt<S.mipmaps.length;vt++)bt(L.__webglFramebuffer[vt],T,S,e.COLOR_ATTACHMENT0,at,vt);else bt(L.__webglFramebuffer,T,S,e.COLOR_ATTACHMENT0,at,0);m(S)&&f(at),n.unbindTexture()}T.depthBuffer&&Xt(T)}function nt(T){let S=T.textures;for(let L=0,V=S.length;L<V;L++){let tt=S[L];if(m(tt)){let X=_(T),Lt=i.get(tt).__webglTexture;n.bindTexture(X,Lt),f(X),n.unbindTexture()}}}let j=[],K=[];function Y(T){if(T.samples>0){if(rt(T)===!1){let S=T.textures,L=T.width,V=T.height,tt=e.COLOR_BUFFER_BIT,X=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Lt=i.get(T),at=S.length>1;if(at)for(let Et=0;Et<S.length;Et++)n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Et,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Et,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);let vt=T.texture.mipmaps;vt&&vt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Et=0;Et<S.length;Et++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(tt|=e.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(tt|=e.STENCIL_BUFFER_BIT)),at){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Lt.__webglColorRenderbuffer[Et]);let it=i.get(S[Et]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,it,0)}e.blitFramebuffer(0,0,L,V,0,0,L,V,tt,e.NEAREST),l===!0&&(j.length=0,K.length=0,j.push(e.COLOR_ATTACHMENT0+Et),T.depthBuffer&&T.resolveDepthBuffer===!1&&(j.push(X),K.push(X),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,K)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,j))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),at)for(let Et=0;Et<S.length;Et++){n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Et,e.RENDERBUFFER,Lt.__webglColorRenderbuffer[Et]);let it=i.get(S[Et]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Et,e.TEXTURE_2D,it,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let S=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[S])}}}function ut(T){return Math.min(s.maxSamples,T.samples)}function rt(T){let S=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function dt(T){let S=a.render.frame;u.get(T)!==S&&(u.set(T,S),T.update())}function Ht(T,S){let L=T.colorSpace,V=T.format,tt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||L!==Wr&&L!==vs&&(he.getTransfer(L)===pe?(V!==ci||tt!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),S}function zt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=st,this.setTextureCube=G,this.rebindTextures=oe,this.setupRenderTarget=D,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=rt}function z2(e,t){function n(i,s=vs){let r,a=he.getTransfer(s);if(i===Si)return e.UNSIGNED_BYTE;if(i===Mf)return e.UNSIGNED_SHORT_4_4_4_4;if(i===bf)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Fg)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Hg)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Bg)return e.BYTE;if(i===zg)return e.SHORT;if(i===wo)return e.UNSIGNED_SHORT;if(i===Sf)return e.INT;if(i===lr)return e.UNSIGNED_INT;if(i===Vi)return e.FLOAT;if(i===Ro)return e.HALF_FLOAT;if(i===Vg)return e.ALPHA;if(i===Gg)return e.RGB;if(i===ci)return e.RGBA;if(i===uo)return e.DEPTH_COMPONENT;if(i===Do)return e.DEPTH_STENCIL;if(i===kg)return e.RED;if(i===Ef)return e.RED_INTEGER;if(i===Wg)return e.RG;if(i===Tf)return e.RG_INTEGER;if(i===Af)return e.RGBA_INTEGER;if(i===Rc||i===Cc||i===Dc||i===Uc)if(a===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Rc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Dc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Uc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Rc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Dc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Uc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===wf||i===Rf||i===Cf||i===Df)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===wf)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Rf)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Cf)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Df)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Uf||i===Lf||i===Nf)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Uf||i===Lf)return a===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Nf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===If||i===Of||i===Pf||i===Bf||i===zf||i===Ff||i===Hf||i===Vf||i===Gf||i===kf||i===Wf||i===Xf||i===qf||i===Yf)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===If)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Of)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ff)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===kf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Xf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Yf)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zf||i===Kf||i===Jf)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Zf)return a===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kf)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jf)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Qf||i===jf||i===$f||i===td)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Qf)return r.COMPRESSED_RED_RGTC1_EXT;if(i===jf)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$f)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===td)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Co?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var F2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,f0=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new pc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new xi({vertexShader:F2,fragmentShader:H2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Fe(new Kr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},d0=class extends ms{constructor(t,n){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null,M=typeof XRWebGLBinding<"u",m=new f0,f={},_=n.getContextAttributes(),v=null,y=null,A=[],C=[],w=new gt,U=null,E=new mn;E.viewport=new Ne;let x=new mn;x.viewport=new Ne;let R=[E,x],z=new cf,k=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let et=A[Q];return et===void 0&&(et=new _o,A[Q]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Q){let et=A[Q];return et===void 0&&(et=new _o,A[Q]=et),et.getGripSpace()},this.getHand=function(Q){let et=A[Q];return et===void 0&&(et=new _o,A[Q]=et),et.getHandSpace()};function W(Q){let et=C.indexOf(Q.inputSource);if(et===-1)return;let bt=A[et];bt!==void 0&&(bt.update(Q.inputSource,Q.frame,c||a),bt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function q(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",st);for(let Q=0;Q<A.length;Q++){let et=C[Q];et!==null&&(C[Q]=null,A[Q].disconnect(et))}k=null,Z=null,m.reset();for(let Q in f)delete f[Q];t.setRenderTarget(v),p=null,h=null,d=null,s=null,y=null,Yt.stop(),i.isPresenting=!1,t.setPixelRatio(U),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",q),s.addEventListener("inputsourceschange",st),_.xrCompatible!==!0&&await n.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(w),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Ot=null,Dt=null;_.depth&&(Dt=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,bt=_.stencil?Do:uo,Ot=_.stencil?Co:lr);let Xt={colorFormat:n.RGBA8,depthFormat:Dt,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Xt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new zi(h.textureWidth,h.textureHeight,{format:ci,type:Si,depthTexture:new dc(h.textureWidth,h.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let bt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,n,bt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new zi(p.framebufferWidth,p.framebufferHeight,{format:ci,type:Si,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Yt.setContext(s),Yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function st(Q){for(let et=0;et<Q.removed.length;et++){let bt=Q.removed[et],Ot=C.indexOf(bt);Ot>=0&&(C[Ot]=null,A[Ot].disconnect(bt))}for(let et=0;et<Q.added.length;et++){let bt=Q.added[et],Ot=C.indexOf(bt);if(Ot===-1){for(let Xt=0;Xt<A.length;Xt++)if(Xt>=C.length){C.push(bt),Ot=Xt;break}else if(C[Xt]===null){C[Xt]=bt,Ot=Xt;break}if(Ot===-1)break}let Dt=A[Ot];Dt&&Dt.connect(bt)}}let G=new N,ft=new N;function _t(Q,et,bt){G.setFromMatrixPosition(et.matrixWorld),ft.setFromMatrixPosition(bt.matrixWorld);let Ot=G.distanceTo(ft),Dt=et.projectionMatrix.elements,Xt=bt.projectionMatrix.elements,oe=Dt[14]/(Dt[10]-1),D=Dt[14]/(Dt[10]+1),nt=(Dt[9]+1)/Dt[5],j=(Dt[9]-1)/Dt[5],K=(Dt[8]-1)/Dt[0],Y=(Xt[8]+1)/Xt[0],ut=oe*K,rt=oe*Y,dt=Ot/(-K+Y),Ht=dt*-K;if(et.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ht),Q.translateZ(dt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Dt[10]===-1)Q.projectionMatrix.copy(et.projectionMatrix),Q.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let zt=oe+dt,T=D+dt,S=ut-Ht,L=rt+(Ot-Ht),V=nt*D/T*zt,tt=j*D/T*zt;Q.projectionMatrix.makePerspective(S,L,V,tt,zt,T),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function At(Q,et){et===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(et.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let et=Q.near,bt=Q.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(bt=m.depthFar)),z.near=x.near=E.near=et,z.far=x.far=E.far=bt,(k!==z.near||Z!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),k=z.near,Z=z.far),z.layers.mask=Q.layers.mask|6,E.layers.mask=z.layers.mask&3,x.layers.mask=z.layers.mask&5;let Ot=Q.parent,Dt=z.cameras;At(z,Ot);for(let Xt=0;Xt<Dt.length;Xt++)At(Dt[Xt],Ot);Dt.length===2?_t(z,E,x):z.projectionMatrix.copy(E.projectionMatrix),Vt(Q,z,Ot)};function Vt(Q,et,bt){bt===null?Q.matrix.copy(et.matrixWorld):(Q.matrix.copy(bt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(et.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(et.projectionMatrix),Q.projectionMatrixInverse.copy(et.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Fh*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(Q){return f[Q]};let Jt=null;function ae(Q,et){if(u=et.getViewerPose(c||a),g=et,u!==null){let bt=u.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Ot=!1;bt.length!==z.cameras.length&&(z.cameras.length=0,Ot=!0);for(let D=0;D<bt.length;D++){let nt=bt[D],j=null;if(p!==null)j=p.getViewport(nt);else{let Y=d.getViewSubImage(h,nt);j=Y.viewport,D===0&&(t.setRenderTargetTextures(y,Y.colorTexture,Y.depthStencilTexture),t.setRenderTarget(y))}let K=R[D];K===void 0&&(K=new mn,K.layers.enable(D),K.viewport=new Ne,R[D]=K),K.matrix.fromArray(nt.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(nt.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(j.x,j.y,j.width,j.height),D===0&&(z.matrix.copy(K.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ot===!0&&z.cameras.push(K)}let Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();let D=d.getDepthInformation(bt[0]);D&&D.isValid&&D.texture&&m.init(D,s.renderState)}if(Dt&&Dt.includes("camera-access")&&M){t.state.unbindTexture(),d=i.getBinding();for(let D=0;D<bt.length;D++){let nt=bt[D].camera;if(nt){let j=f[nt];j||(j=new pc,f[nt]=j);let K=d.getCameraImage(nt);j.sourceTexture=K}}}}for(let bt=0;bt<A.length;bt++){let Ot=C[bt],Dt=A[bt];Ot!==null&&Dt!==void 0&&Dt.update(Ot,et,c||a)}Jt&&Jt(Q,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),g=null}let Yt=new FM;Yt.setAnimationLoop(ae),this.setAnimationLoop=function(Q){Jt=Q},this.dispose=function(){}}},ea=new yi,V2=new Ae;function G2(e,t){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Kg(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,_,v,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),M(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,_,v):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===bn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===bn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let _=t.get(f),v=_.envMap,y=_.envMapRotation;v&&(m.envMap.value=v,ea.copy(y),ea.x*=-1,ea.y*=-1,ea.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ea.y*=-1,ea.z*=-1),m.envMapRotation.value.setFromMatrix4(V2.makeRotationFromEuler(ea)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,_,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=v*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===bn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function M(m,f){let _=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function k2(e,t,n,i){let s={},r={},a=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){let y=v.program;i.uniformBlockBinding(_,y)}function c(_,v){let y=s[_.id];y===void 0&&(g(_),y=u(_),s[_.id]=y,_.addEventListener("dispose",m));let A=v.program;i.updateUBOMapping(_,A);let C=t.render.frame;r[_.id]!==C&&(h(_),r[_.id]=C)}function u(_){let v=d();_.__bindingPointIndex=v;let y=e.createBuffer(),A=_.__size,C=_.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,A,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,y),y}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){let v=s[_.id],y=_.uniforms,A=_.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let C=0,w=y.length;C<w;C++){let U=Array.isArray(y[C])?y[C]:[y[C]];for(let E=0,x=U.length;E<x;E++){let R=U[E];if(p(R,C,E,A)===!0){let z=R.__offset,k=Array.isArray(R.value)?R.value:[R.value],Z=0;for(let W=0;W<k.length;W++){let q=k[W],st=M(q);typeof q=="number"||typeof q=="boolean"?(R.__data[0]=q,e.bufferSubData(e.UNIFORM_BUFFER,z+Z,R.__data)):q.isMatrix3?(R.__data[0]=q.elements[0],R.__data[1]=q.elements[1],R.__data[2]=q.elements[2],R.__data[3]=0,R.__data[4]=q.elements[3],R.__data[5]=q.elements[4],R.__data[6]=q.elements[5],R.__data[7]=0,R.__data[8]=q.elements[6],R.__data[9]=q.elements[7],R.__data[10]=q.elements[8],R.__data[11]=0):(q.toArray(R.__data,Z),Z+=st.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,z,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(_,v,y,A){let C=_.value,w=v+"_"+y;if(A[w]===void 0)return typeof C=="number"||typeof C=="boolean"?A[w]=C:A[w]=C.clone(),!0;{let U=A[w];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return A[w]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function g(_){let v=_.uniforms,y=0,A=16;for(let w=0,U=v.length;w<U;w++){let E=Array.isArray(v[w])?v[w]:[v[w]];for(let x=0,R=E.length;x<R;x++){let z=E[x],k=Array.isArray(z.value)?z.value:[z.value];for(let Z=0,W=k.length;Z<W;Z++){let q=k[Z],st=M(q),G=y%A,ft=G%st.boundary,_t=G+ft;y+=ft,_t!==0&&A-_t<st.storage&&(y+=A-_t),z.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=st.storage}}}let C=y%A;return C>0&&(y+=A-C),_.__size=y,_.__cache={},this}function M(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){let v=_.target;v.removeEventListener("dispose",m);let y=a.indexOf(v.__bindingPointIndex);a.splice(y,1),e.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function f(){for(let _ in s)e.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var sd=class{constructor(t={}){let{canvas:n=oM(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),M=new Int32Array(4),m=null,f=null,_=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_s,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,A=!1;this._outputColorSpace=ln;let C=0,w=0,U=null,E=-1,x=null,R=new Ne,z=new Ne,k=null,Z=new qt(0),W=0,q=n.width,st=n.height,G=1,ft=null,_t=null,At=new Ne(0,0,q,st),Vt=new Ne(0,0,q,st),Jt=!1,ae=new yo,Yt=!1,Q=!1,et=new Ae,bt=new N,Ot=new Ne,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xt=!1;function oe(){return U===null?G:1}let D=i;function nt(b,O){return n.getContext(b,O)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"180"}`),n.addEventListener("webglcontextlost",mt,!1),n.addEventListener("webglcontextrestored",Ct,!1),n.addEventListener("webglcontextcreationerror",ot,!1),D===null){let O="webgl2";if(D=nt(O,b),D===null)throw nt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let j,K,Y,ut,rt,dt,Ht,zt,T,S,L,V,tt,X,Lt,at,vt,Et,it,xt,Pt,It,yt,Bt;function I(){j=new oC(D),j.init(),It=new z2(D,j),K=new tC(D,j,t,It),Y=new P2(D,j),K.reversedDepthBuffer&&h&&Y.buffers.depth.setReversed(!0),ut=new uC(D),rt=new b2,dt=new B2(D,j,Y,rt,K,It,ut),Ht=new nC(y),zt=new aC(y),T=new gA(D),yt=new jR(D,T),S=new lC(D,T,ut,yt),L=new fC(D,S,T,ut),it=new hC(D,K,dt),at=new eC(rt),V=new M2(y,Ht,zt,j,K,yt,at),tt=new G2(y,rt),X=new T2,Lt=new U2(j),Et=new QR(y,Ht,zt,Y,L,p,l),vt=new I2(y,L,K),Bt=new k2(D,ut,K,Y),xt=new $R(D,j,ut),Pt=new cC(D,j,ut),ut.programs=V.programs,y.capabilities=K,y.extensions=j,y.properties=rt,y.renderLists=X,y.shadowMap=vt,y.state=Y,y.info=ut}I();let ct=new d0(y,D);this.xr=ct,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let b=j.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=j.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(b){b!==void 0&&(G=b,this.setSize(q,st,!1))},this.getSize=function(b){return b.set(q,st)},this.setSize=function(b,O,H=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=b,st=O,n.width=Math.floor(b*G),n.height=Math.floor(O*G),H===!0&&(n.style.width=b+"px",n.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(q*G,st*G).floor()},this.setDrawingBufferSize=function(b,O,H){q=b,st=O,G=H,n.width=Math.floor(b*H),n.height=Math.floor(O*H),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(R)},this.getViewport=function(b){return b.copy(At)},this.setViewport=function(b,O,H,F){b.isVector4?At.set(b.x,b.y,b.z,b.w):At.set(b,O,H,F),Y.viewport(R.copy(At).multiplyScalar(G).round())},this.getScissor=function(b){return b.copy(Vt)},this.setScissor=function(b,O,H,F){b.isVector4?Vt.set(b.x,b.y,b.z,b.w):Vt.set(b,O,H,F),Y.scissor(z.copy(Vt).multiplyScalar(G).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(b){Y.setScissorTest(Jt=b)},this.setOpaqueSort=function(b){ft=b},this.setTransparentSort=function(b){_t=b},this.getClearColor=function(b){return b.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor(...arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,H=!0){let F=0;if(b){let P=!1;if(U!==null){let lt=U.texture.format;P=lt===Af||lt===Tf||lt===Ef}if(P){let lt=U.texture.type,St=lt===Si||lt===lr||lt===wo||lt===Co||lt===Mf||lt===bf,Ut=Et.getClearColor(),wt=Et.getClearAlpha(),B=Ut.r,ht=Ut.g,pt=Ut.b;St?(g[0]=B,g[1]=ht,g[2]=pt,g[3]=wt,D.clearBufferuiv(D.COLOR,0,g)):(M[0]=B,M[1]=ht,M[2]=pt,M[3]=wt,D.clearBufferiv(D.COLOR,0,M))}else F|=D.COLOR_BUFFER_BIT}O&&(F|=D.DEPTH_BUFFER_BIT),H&&(F|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",mt,!1),n.removeEventListener("webglcontextrestored",Ct,!1),n.removeEventListener("webglcontextcreationerror",ot,!1),Et.dispose(),X.dispose(),Lt.dispose(),rt.dispose(),Ht.dispose(),zt.dispose(),L.dispose(),yt.dispose(),Bt.dispose(),V.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Yn),ct.removeEventListener("sessionend",Bo),Un.stop()};function mt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let b=ut.autoReset,O=vt.enabled,H=vt.autoUpdate,F=vt.needsUpdate,P=vt.type;I(),ut.autoReset=b,vt.enabled=O,vt.autoUpdate=H,vt.needsUpdate=F,vt.type=P}function ot(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function J(b){let O=b.target;O.removeEventListener("dispose",J),Nt(O)}function Nt(b){Ft(b),rt.remove(b)}function Ft(b){let O=rt.get(b).programs;O!==void 0&&(O.forEach(function(H){V.releaseProgram(H)}),b.isShaderMaterial&&V.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,H,F,P,lt){O===null&&(O=Dt);let St=P.isMesh&&P.matrixWorld.determinant()<0,Ut=Fo(b,O,H,F,P);Y.setMaterial(F,St);let wt=H.index,B=1;if(F.wireframe===!0){if(wt=S.getWireframeAttribute(H),wt===void 0)return;B=2}let ht=H.drawRange,pt=H.attributes.position,Tt=ht.start*B,Gt=(ht.start+ht.count)*B;lt!==null&&(Tt=Math.max(Tt,lt.start*B),Gt=Math.min(Gt,(lt.start+lt.count)*B)),wt!==null?(Tt=Math.max(Tt,0),Gt=Math.min(Gt,wt.count)):pt!=null&&(Tt=Math.max(Tt,0),Gt=Math.min(Gt,pt.count));let ie=Gt-Tt;if(ie<0||ie===1/0)return;yt.setup(P,F,Ut,H,wt);let se,le=xt;if(wt!==null&&(se=T.get(wt),le=Pt,le.setIndex(se)),P.isMesh)F.wireframe===!0?(Y.setLineWidth(F.wireframeLinewidth*oe()),le.setMode(D.LINES)):le.setMode(D.TRIANGLES);else if(P.isLine){let Rt=F.linewidth;Rt===void 0&&(Rt=1),Y.setLineWidth(Rt*oe()),P.isLineSegments?le.setMode(D.LINES):P.isLineLoop?le.setMode(D.LINE_LOOP):le.setMode(D.LINE_STRIP)}else P.isPoints?le.setMode(D.POINTS):P.isSprite&&le.setMode(D.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)ho("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),le.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))le.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{let Rt=P._multiDrawStarts,ge=P._multiDrawCounts,$t=P._multiDrawCount,nn=wt?T.get(wt).bytesPerElement:1,xs=rt.get(F).currentProgram.getUniforms();for(let Pe=0;Pe<$t;Pe++)xs.setValue(D,"_gl_DrawID",Pe),le.render(Rt[Pe]/nn,ge[Pe])}else if(P.isInstancedMesh)le.renderInstances(Tt,ie,P.count);else if(H.isInstancedBufferGeometry){let Rt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ge=Math.min(H.instanceCount,Rt);le.renderInstances(Tt,ie,ge)}else le.render(Tt,ie)};function de(b,O,H){b.transparent===!0&&b.side===Xn&&b.forceSinglePass===!1?(b.side=bn,b.needsUpdate=!0,aa(b,O,H),b.side=ps,b.needsUpdate=!0,aa(b,O,H),b.side=Xn):aa(b,O,H)}this.compile=function(b,O,H=null){H===null&&(H=b),f=Lt.get(H),f.init(O),v.push(f),H.traverseVisible(function(P){P.isLight&&P.layers.test(O.layers)&&(f.pushLight(P),P.castShadow&&f.pushShadow(P))}),b!==H&&b.traverseVisible(function(P){P.isLight&&P.layers.test(O.layers)&&(f.pushLight(P),P.castShadow&&f.pushShadow(P))}),f.setupLights();let F=new Set;return b.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;let lt=P.material;if(lt)if(Array.isArray(lt))for(let St=0;St<lt.length;St++){let Ut=lt[St];de(Ut,H,P),F.add(Ut)}else de(lt,H,P),F.add(lt)}),f=v.pop(),F},this.compileAsync=function(b,O,H=null){let F=this.compile(b,O,H);return new Promise(P=>{function lt(){if(F.forEach(function(St){rt.get(St).currentProgram.isReady()&&F.delete(St)}),F.size===0){P(b);return}setTimeout(lt,10)}j.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let ue=null;function qn(b){ue&&ue(b)}function Yn(){Un.stop()}function Bo(){Un.start()}let Un=new FM;Un.setAnimationLoop(qn),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(b){ue=b,ct.setAnimationLoop(b),b===null?Un.stop():Un.start()},ct.addEventListener("sessionstart",Yn),ct.addEventListener("sessionend",Bo),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(O),O=ct.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,O,U),f=Lt.get(b,v.length),f.init(O),v.push(f),et.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ae.setFromProjectionMatrix(et,vi,O.reversedDepth),Q=this.localClippingEnabled,Yt=at.init(this.clippingPlanes,Q),m=X.get(b,_.length),m.init(),_.push(m),ct.enabled===!0&&ct.isPresenting===!0){let lt=y.xr.getDepthSensingMesh();lt!==null&&ur(lt,O,-1/0,y.sortObjects)}ur(b,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ft,_t),Xt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Xt&&Et.addToRenderList(m,b),this.info.render.frame++,Yt===!0&&at.beginShadows();let H=f.state.shadowsArray;vt.render(H,b,O),Yt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();let F=m.opaque,P=m.transmissive;if(f.setupLights(),O.isArrayCamera){let lt=O.cameras;if(P.length>0)for(let St=0,Ut=lt.length;St<Ut;St++){let wt=lt[St];Mi(F,P,b,wt)}Xt&&Et.render(b);for(let St=0,Ut=lt.length;St<Ut;St++){let wt=lt[St];Bc(m,b,wt,wt.viewport)}}else P.length>0&&Mi(F,P,b,O),Xt&&Et.render(b),Bc(m,b,O);U!==null&&w===0&&(dt.updateMultisampleRenderTarget(U),dt.updateRenderTargetMipmap(U)),b.isScene===!0&&b.onAfterRender(y,b,O),yt.resetDefaultState(),E=-1,x=null,v.pop(),v.length>0?(f=v[v.length-1],Yt===!0&&at.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function ur(b,O,H,F){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||ae.intersectsSprite(b)){F&&Ot.setFromMatrixPosition(b.matrixWorld).applyMatrix4(et);let St=L.update(b),Ut=b.material;Ut.visible&&m.push(b,St,Ut,H,Ot.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||ae.intersectsObject(b))){let St=L.update(b),Ut=b.material;if(F&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ot.copy(b.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Ot.copy(St.boundingSphere.center)),Ot.applyMatrix4(b.matrixWorld).applyMatrix4(et)),Array.isArray(Ut)){let wt=St.groups;for(let B=0,ht=wt.length;B<ht;B++){let pt=wt[B],Tt=Ut[pt.materialIndex];Tt&&Tt.visible&&m.push(b,St,Tt,H,Ot.z,pt)}}else Ut.visible&&m.push(b,St,Ut,H,Ot.z,null)}}let lt=b.children;for(let St=0,Ut=lt.length;St<Ut;St++)ur(lt[St],O,H,F)}function Bc(b,O,H,F){let P=b.opaque,lt=b.transmissive,St=b.transparent;f.setupLightsView(H),Yt===!0&&at.setGlobalState(y.clippingPlanes,H),F&&Y.viewport(R.copy(F)),P.length>0&&ra(P,O,H),lt.length>0&&ra(lt,O,H),St.length>0&&ra(St,O,H),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function Mi(b,O,H,F){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[F.id]===void 0&&(f.state.transmissionRenderTarget[F.id]=new zi(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?Ro:Si,minFilter:Hi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));let lt=f.state.transmissionRenderTarget[F.id],St=F.viewport||R;lt.setSize(St.z*y.transmissionResolutionScale,St.w*y.transmissionResolutionScale);let Ut=y.getRenderTarget(),wt=y.getActiveCubeFace(),B=y.getActiveMipmapLevel();y.setRenderTarget(lt),y.getClearColor(Z),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),Xt&&Et.render(H);let ht=y.toneMapping;y.toneMapping=_s;let pt=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),f.setupLightsView(F),Yt===!0&&at.setGlobalState(y.clippingPlanes,F),ra(b,H,F),dt.updateMultisampleRenderTarget(lt),dt.updateRenderTargetMipmap(lt),j.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let Gt=0,ie=O.length;Gt<ie;Gt++){let se=O[Gt],le=se.object,Rt=se.geometry,ge=se.material,$t=se.group;if(ge.side===Xn&&le.layers.test(F.layers)){let nn=ge.side;ge.side=bn,ge.needsUpdate=!0,hr(le,H,F,Rt,ge,$t),ge.side=nn,ge.needsUpdate=!0,Tt=!0}}Tt===!0&&(dt.updateMultisampleRenderTarget(lt),dt.updateRenderTargetMipmap(lt))}y.setRenderTarget(Ut,wt,B),y.setClearColor(Z,W),pt!==void 0&&(F.viewport=pt),y.toneMapping=ht}function ra(b,O,H){let F=O.isScene===!0?O.overrideMaterial:null;for(let P=0,lt=b.length;P<lt;P++){let St=b[P],Ut=St.object,wt=St.geometry,B=St.group,ht=St.material;ht.allowOverride===!0&&F!==null&&(ht=F),Ut.layers.test(H.layers)&&hr(Ut,O,H,wt,ht,B)}}function hr(b,O,H,F,P,lt){b.onBeforeRender(y,O,H,F,P,lt),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),P.onBeforeRender(y,O,H,F,b,lt),P.transparent===!0&&P.side===Xn&&P.forceSinglePass===!1?(P.side=bn,P.needsUpdate=!0,y.renderBufferDirect(H,O,F,P,b,lt),P.side=ps,P.needsUpdate=!0,y.renderBufferDirect(H,O,F,P,b,lt),P.side=Xn):y.renderBufferDirect(H,O,F,P,b,lt),b.onAfterRender(y,O,H,F,P,lt)}function aa(b,O,H){O.isScene!==!0&&(O=Dt);let F=rt.get(b),P=f.state.lights,lt=f.state.shadowsArray,St=P.state.version,Ut=V.getParameters(b,P.state,lt,O,H),wt=V.getProgramCacheKey(Ut),B=F.programs;F.environment=b.isMeshStandardMaterial?O.environment:null,F.fog=O.fog,F.envMap=(b.isMeshStandardMaterial?zt:Ht).get(b.envMap||F.environment),F.envMapRotation=F.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,B===void 0&&(b.addEventListener("dispose",J),B=new Map,F.programs=B);let ht=B.get(wt);if(ht!==void 0){if(F.currentProgram===ht&&F.lightsStateVersion===St)return Zn(b,Ut),ht}else Ut.uniforms=V.getUniforms(b),b.onBeforeCompile(Ut,y),ht=V.acquireProgram(Ut,wt),B.set(wt,ht),F.uniforms=Ut.uniforms;let pt=F.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(pt.clippingPlanes=at.uniform),Zn(b,Ut),F.needsLights=Ho(b),F.lightsStateVersion=St,F.needsLights&&(pt.ambientLightColor.value=P.state.ambient,pt.lightProbe.value=P.state.probe,pt.directionalLights.value=P.state.directional,pt.directionalLightShadows.value=P.state.directionalShadow,pt.spotLights.value=P.state.spot,pt.spotLightShadows.value=P.state.spotShadow,pt.rectAreaLights.value=P.state.rectArea,pt.ltc_1.value=P.state.rectAreaLTC1,pt.ltc_2.value=P.state.rectAreaLTC2,pt.pointLights.value=P.state.point,pt.pointLightShadows.value=P.state.pointShadow,pt.hemisphereLights.value=P.state.hemi,pt.directionalShadowMap.value=P.state.directionalShadowMap,pt.directionalShadowMatrix.value=P.state.directionalShadowMatrix,pt.spotShadowMap.value=P.state.spotShadowMap,pt.spotLightMatrix.value=P.state.spotLightMatrix,pt.spotLightMap.value=P.state.spotLightMap,pt.pointShadowMap.value=P.state.pointShadowMap,pt.pointShadowMatrix.value=P.state.pointShadowMatrix),F.currentProgram=ht,F.uniformsList=null,ht}function zo(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=Io.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function Zn(b,O){let H=rt.get(b);H.outputColorSpace=O.outputColorSpace,H.batching=O.batching,H.batchingColor=O.batchingColor,H.instancing=O.instancing,H.instancingColor=O.instancingColor,H.instancingMorph=O.instancingMorph,H.skinning=O.skinning,H.morphTargets=O.morphTargets,H.morphNormals=O.morphNormals,H.morphColors=O.morphColors,H.morphTargetsCount=O.morphTargetsCount,H.numClippingPlanes=O.numClippingPlanes,H.numIntersection=O.numClipIntersection,H.vertexAlphas=O.vertexAlphas,H.vertexTangents=O.vertexTangents,H.toneMapping=O.toneMapping}function Fo(b,O,H,F,P){O.isScene!==!0&&(O=Dt),dt.resetTextureUnits();let lt=O.fog,St=F.isMeshStandardMaterial?O.environment:null,Ut=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Wr,wt=(F.isMeshStandardMaterial?zt:Ht).get(F.envMap||St),B=F.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,ht=!!H.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),pt=!!H.morphAttributes.position,Tt=!!H.morphAttributes.normal,Gt=!!H.morphAttributes.color,ie=_s;F.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ie=y.toneMapping);let se=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,le=se!==void 0?se.length:0,Rt=rt.get(F),ge=f.state.lights;if(Yt===!0&&(Q===!0||b!==x)){let Re=b===x&&F.id===E;at.setState(F,b,Re)}let $t=!1;F.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==ge.state.version||Rt.outputColorSpace!==Ut||P.isBatchedMesh&&Rt.batching===!1||!P.isBatchedMesh&&Rt.batching===!0||P.isBatchedMesh&&Rt.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&Rt.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&Rt.instancing===!1||!P.isInstancedMesh&&Rt.instancing===!0||P.isSkinnedMesh&&Rt.skinning===!1||!P.isSkinnedMesh&&Rt.skinning===!0||P.isInstancedMesh&&Rt.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&Rt.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&Rt.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&Rt.instancingMorph===!1&&P.morphTexture!==null||Rt.envMap!==wt||F.fog===!0&&Rt.fog!==lt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==at.numPlanes||Rt.numIntersection!==at.numIntersection)||Rt.vertexAlphas!==B||Rt.vertexTangents!==ht||Rt.morphTargets!==pt||Rt.morphNormals!==Tt||Rt.morphColors!==Gt||Rt.toneMapping!==ie||Rt.morphTargetsCount!==le)&&($t=!0):($t=!0,Rt.__version=F.version);let nn=Rt.currentProgram;$t===!0&&(nn=aa(F,O,P));let xs=!1,Pe=!1,Ss=!1,ee=nn.getUniforms(),Be=Rt.uniforms;if(Y.useProgram(nn.program)&&(xs=!0,Pe=!0,Ss=!0),F.id!==E&&(E=F.id,Pe=!0),xs||x!==b){Y.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ee.setValue(D,"projectionMatrix",b.projectionMatrix),ee.setValue(D,"viewMatrix",b.matrixWorldInverse);let sn=ee.map.cameraPosition;sn!==void 0&&sn.setValue(D,bt.setFromMatrixPosition(b.matrixWorld)),K.logarithmicDepthBuffer&&ee.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&ee.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),x!==b&&(x=b,Pe=!0,Ss=!0)}if(P.isSkinnedMesh){ee.setOptional(D,P,"bindMatrix"),ee.setOptional(D,P,"bindMatrixInverse");let Re=P.skeleton;Re&&(Re.boneTexture===null&&Re.computeBoneTexture(),ee.setValue(D,"boneTexture",Re.boneTexture,dt))}P.isBatchedMesh&&(ee.setOptional(D,P,"batchingTexture"),ee.setValue(D,"batchingTexture",P._matricesTexture,dt),ee.setOptional(D,P,"batchingIdTexture"),ee.setValue(D,"batchingIdTexture",P._indirectTexture,dt),ee.setOptional(D,P,"batchingColorTexture"),P._colorsTexture!==null&&ee.setValue(D,"batchingColorTexture",P._colorsTexture,dt));let ne=H.morphAttributes;if((ne.position!==void 0||ne.normal!==void 0||ne.color!==void 0)&&it.update(P,H,nn),(Pe||Rt.receiveShadow!==P.receiveShadow)&&(Rt.receiveShadow=P.receiveShadow,ee.setValue(D,"receiveShadow",P.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(Be.envMap.value=wt,Be.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&O.environment!==null&&(Be.envMapIntensity.value=O.environmentIntensity),Pe&&(ee.setValue(D,"toneMappingExposure",y.toneMappingExposure),Rt.needsLights&&zc(Be,Ss),lt&&F.fog===!0&&tt.refreshFogUniforms(Be,lt),tt.refreshMaterialUniforms(Be,F,G,st,f.state.transmissionRenderTarget[b.id]),Io.upload(D,zo(Rt),Be,dt)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Io.upload(D,zo(Rt),Be,dt),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&ee.setValue(D,"center",P.center),ee.setValue(D,"modelViewMatrix",P.modelViewMatrix),ee.setValue(D,"normalMatrix",P.normalMatrix),ee.setValue(D,"modelMatrix",P.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){let Re=F.uniformsGroups;for(let sn=0,fr=Re.length;sn<fr;sn++){let ki=Re[sn];Bt.update(ki,nn),Bt.bind(ki,nn)}}return nn}function zc(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Ho(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(b,O,H){let F=rt.get(b);F.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),rt.get(b.texture).__webglTexture=O,rt.get(b.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:H,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){let H=rt.get(b);H.__webglFramebuffer=O,H.__useDefaultFramebuffer=O===void 0};let Vo=D.createFramebuffer();this.setRenderTarget=function(b,O=0,H=0){U=b,C=O,w=H;let F=!0,P=null,lt=!1,St=!1;if(b){let wt=rt.get(b);if(wt.__useDefaultFramebuffer!==void 0)Y.bindFramebuffer(D.FRAMEBUFFER,null),F=!1;else if(wt.__webglFramebuffer===void 0)dt.setupRenderTarget(b);else if(wt.__hasExternalTextures)dt.rebindTextures(b,rt.get(b.texture).__webglTexture,rt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let pt=b.depthTexture;if(wt.__boundDepthTexture!==pt){if(pt!==null&&rt.has(pt)&&(b.width!==pt.image.width||b.height!==pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(b)}}let B=b.texture;(B.isData3DTexture||B.isDataArrayTexture||B.isCompressedArrayTexture)&&(St=!0);let ht=rt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ht[O])?P=ht[O][H]:P=ht[O],lt=!0):b.samples>0&&dt.useMultisampledRTT(b)===!1?P=rt.get(b).__webglMultisampledFramebuffer:Array.isArray(ht)?P=ht[H]:P=ht,R.copy(b.viewport),z.copy(b.scissor),k=b.scissorTest}else R.copy(At).multiplyScalar(G).floor(),z.copy(Vt).multiplyScalar(G).floor(),k=Jt;if(H!==0&&(P=Vo),Y.bindFramebuffer(D.FRAMEBUFFER,P)&&F&&Y.drawBuffers(b,P),Y.viewport(R),Y.scissor(z),Y.setScissorTest(k),lt){let wt=rt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,wt.__webglTexture,H)}else if(St){let wt=O;for(let B=0;B<b.textures.length;B++){let ht=rt.get(b.textures[B]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+B,ht.__webglTexture,H,wt)}}else if(b!==null&&H!==0){let wt=rt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,wt.__webglTexture,H)}E=-1},this.readRenderTargetPixels=function(b,O,H,F,P,lt,St,Ut=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=rt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&St!==void 0&&(wt=wt[St]),wt){Y.bindFramebuffer(D.FRAMEBUFFER,wt);try{let B=b.textures[Ut],ht=B.format,pt=B.type;if(!K.textureFormatReadable(ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-F&&H>=0&&H<=b.height-P&&(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ut),D.readPixels(O,H,F,P,It.convert(ht),It.convert(pt),lt))}finally{let B=U!==null?rt.get(U).__webglFramebuffer:null;Y.bindFramebuffer(D.FRAMEBUFFER,B)}}},this.readRenderTargetPixelsAsync=async function(b,O,H,F,P,lt,St,Ut=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=rt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&St!==void 0&&(wt=wt[St]),wt)if(O>=0&&O<=b.width-F&&H>=0&&H<=b.height-P){Y.bindFramebuffer(D.FRAMEBUFFER,wt);let B=b.textures[Ut],ht=B.format,pt=B.type;if(!K.textureFormatReadable(ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Tt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Tt),D.bufferData(D.PIXEL_PACK_BUFFER,lt.byteLength,D.STREAM_READ),b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ut),D.readPixels(O,H,F,P,It.convert(ht),It.convert(pt),0);let Gt=U!==null?rt.get(U).__webglFramebuffer:null;Y.bindFramebuffer(D.FRAMEBUFFER,Gt);let ie=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await lM(D,ie,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Tt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,lt),D.deleteBuffer(Tt),D.deleteSync(ie),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,H=0){let F=Math.pow(2,-H),P=Math.floor(b.image.width*F),lt=Math.floor(b.image.height*F),St=O!==null?O.x:0,Ut=O!==null?O.y:0;dt.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,St,Ut,P,lt),Y.unbindTexture()};let Go=D.createFramebuffer(),Fc=D.createFramebuffer();this.copyTextureToTexture=function(b,O,H=null,F=null,P=0,lt=null){lt===null&&(P!==0?(ho("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=P,P=0):lt=0);let St,Ut,wt,B,ht,pt,Tt,Gt,ie,se=b.isCompressedTexture?b.mipmaps[lt]:b.image;if(H!==null)St=H.max.x-H.min.x,Ut=H.max.y-H.min.y,wt=H.isBox3?H.max.z-H.min.z:1,B=H.min.x,ht=H.min.y,pt=H.isBox3?H.min.z:0;else{let ne=Math.pow(2,-P);St=Math.floor(se.width*ne),Ut=Math.floor(se.height*ne),b.isDataArrayTexture?wt=se.depth:b.isData3DTexture?wt=Math.floor(se.depth*ne):wt=1,B=0,ht=0,pt=0}F!==null?(Tt=F.x,Gt=F.y,ie=F.z):(Tt=0,Gt=0,ie=0);let le=It.convert(O.format),Rt=It.convert(O.type),ge;O.isData3DTexture?(dt.setTexture3D(O,0),ge=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(dt.setTexture2DArray(O,0),ge=D.TEXTURE_2D_ARRAY):(dt.setTexture2D(O,0),ge=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);let $t=D.getParameter(D.UNPACK_ROW_LENGTH),nn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),xs=D.getParameter(D.UNPACK_SKIP_PIXELS),Pe=D.getParameter(D.UNPACK_SKIP_ROWS),Ss=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,se.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,se.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,B),D.pixelStorei(D.UNPACK_SKIP_ROWS,ht),D.pixelStorei(D.UNPACK_SKIP_IMAGES,pt);let ee=b.isDataArrayTexture||b.isData3DTexture,Be=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){let ne=rt.get(b),Re=rt.get(O),sn=rt.get(ne.__renderTarget),fr=rt.get(Re.__renderTarget);Y.bindFramebuffer(D.READ_FRAMEBUFFER,sn.__webglFramebuffer),Y.bindFramebuffer(D.DRAW_FRAMEBUFFER,fr.__webglFramebuffer);for(let ki=0;ki<wt;ki++)ee&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,rt.get(b).__webglTexture,P,pt+ki),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,rt.get(O).__webglTexture,lt,ie+ki)),D.blitFramebuffer(B,ht,St,Ut,Tt,Gt,St,Ut,D.DEPTH_BUFFER_BIT,D.NEAREST);Y.bindFramebuffer(D.READ_FRAMEBUFFER,null),Y.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(P!==0||b.isRenderTargetTexture||rt.has(b)){let ne=rt.get(b),Re=rt.get(O);Y.bindFramebuffer(D.READ_FRAMEBUFFER,Go),Y.bindFramebuffer(D.DRAW_FRAMEBUFFER,Fc);for(let sn=0;sn<wt;sn++)ee?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ne.__webglTexture,P,pt+sn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ne.__webglTexture,P),Be?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Re.__webglTexture,lt,ie+sn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Re.__webglTexture,lt),P!==0?D.blitFramebuffer(B,ht,St,Ut,Tt,Gt,St,Ut,D.COLOR_BUFFER_BIT,D.NEAREST):Be?D.copyTexSubImage3D(ge,lt,Tt,Gt,ie+sn,B,ht,St,Ut):D.copyTexSubImage2D(ge,lt,Tt,Gt,B,ht,St,Ut);Y.bindFramebuffer(D.READ_FRAMEBUFFER,null),Y.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Be?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(ge,lt,Tt,Gt,ie,St,Ut,wt,le,Rt,se.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(ge,lt,Tt,Gt,ie,St,Ut,wt,le,se.data):D.texSubImage3D(ge,lt,Tt,Gt,ie,St,Ut,wt,le,Rt,se):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,lt,Tt,Gt,St,Ut,le,Rt,se.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,lt,Tt,Gt,se.width,se.height,le,se.data):D.texSubImage2D(D.TEXTURE_2D,lt,Tt,Gt,St,Ut,le,Rt,se);D.pixelStorei(D.UNPACK_ROW_LENGTH,$t),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,nn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,xs),D.pixelStorei(D.UNPACK_SKIP_ROWS,Pe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ss),lt===0&&O.generateMipmaps&&D.generateMipmap(ge),Y.unbindTexture()},this.initRenderTarget=function(b){rt.get(b).__webglFramebuffer===void 0&&dt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?dt.setTextureCube(b,0):b.isData3DTexture?dt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?dt.setTexture2DArray(b,0):dt.setTexture2D(b,0),Y.unbindTexture()},this.resetState=function(){C=0,w=0,U=null,Y.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=he._getDrawingBufferColorSpace(t),n.unpackColorSpace=he._getUnpackColorSpace()}};function WM(e,t,n){let i=e.width*e.height,s=Math.max(0,Math.min(t,e.left+e.width)-Math.max(0,e.left)),r=Math.max(0,Math.min(n,e.top+e.height)-Math.max(0,e.top)),a=s*r;return{isIntersecting:i>0&&a>0,intersectionRatio:i>0?a/i:0}}function XM({onEnter:e,onPause:t,initialPageVisible:n=!0}){let i=!1,s=n,r=!1,a=0,o=!0,l=!1;function c(){let u=i&&s&&r&&(!o||a>=.55);if(u&&!l){let d=o;o=!1,l=!0,e(d)}else!u&&l&&(l=!1,t())}return{setReady(u){i=u,c()},setIntersection(u){a=u.intersectionRatio,r=u.isIntersecting&&a>0,r||(o=!0),c()},setPageVisible(u){s=u,c()},isRunning:()=>l}}var ub=la(Nc()),KM={portrait:[1.6,2.25],landscape:[2.25,1.6]},Z2={left:.27,center:.5,right:.73},Pc=.018,En=.007,We=4,JM=1/.05,K2=1/960,J2=2,ys=72,QM=24,m0=.36,sb=.095,Q2=.0135,od=.036,Oc=.15,jM=1024,$M={glossy:{roughness:.42,metalness:0,clearcoat:1,clearcoatRoughness:.06,foil:0,anisotropy:0},matte:{roughness:.85,metalness:0,clearcoat:0,clearcoatRoughness:.6,foil:0,anisotropy:0},holographic:{roughness:.3,metalness:0,clearcoat:1,clearcoatRoughness:.04,foil:1,anisotropy:0},metallic:{roughness:.36,metalness:.75,clearcoat:.5,clearcoatRoughness:.18,foil:0,anisotropy:.7}},cd=[0,.07,.93,1],j2=[-.95,-.28,.28,.95],$2=9,t3=`
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;
`,e3=`
vFoilUv = uv;
vFoilX = normalize((modelViewMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
vFoilY = normalize((modelViewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
`,n3=`
uniform float foilStrength;
uniform float foilAspect;
uniform vec3 foilKey;
uniform vec3 foilFill;
uniform vec3 foilTop;
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;

float foilHash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float foilBump(float t, float center, float width) {
  float x = (t - center) / width;
  return max(0.0, 1.0 - x * x);
}

vec3 foilSpectrum(float t) {
  return vec3(
    foilBump(t, 0.82, 0.32) + 0.4 * foilBump(t, 0.02, 0.12),
    foilBump(t, 0.5, 0.26),
    foilBump(t, 0.18, 0.24)
  );
}

vec3 foilGrating(float u, float spacing) {
  vec3 color = vec3(0.0);
  for (int m = 1; m <= 2; m++) {
    float order = float(m);
    float t = (spacing * abs(u) / order - 0.38) / 0.32;
    color += foilSpectrum(t) / order;
  }
  return color;
}

vec3 foilShard(vec2 p) {
  vec2 base = floor(p);
  float best = 9.0;
  float edge = 9.0;
  vec2 id = base;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 cell = base + vec2(float(i), float(j));
      vec2 site = cell + vec2(foilHash(cell), foilHash(cell + 7.31)) * 0.9 + 0.05;
      float d = length(site - p);
      if (d < best) {
        edge = best;
        best = d;
        id = cell;
      } else if (d < edge) {
        edge = d;
      }
    }
  }
  return vec3(foilHash(id + 3.17), foilHash(id + 11.73), edge - best);
}
`,i3=`
if (foilStrength > 0.0) {
  vec3 foilView = normalize(vViewPosition);
  vec3 foilNormal = normalize(normal);
  vec2 foilP = vec2(vFoilUv.x, vFoilUv.y * foilAspect);
  vec3 shard = foilShard(foilP * 26.0);
  vec2 ray = foilP - vec2(-1.6, 2.6 * foilAspect);
  float angle = atan(ray.y, ray.x) + (shard.x - 0.5) * 0.16;
  vec3 grating = normalize(vFoilX * cos(angle) + vFoilY * sin(angle));
  float spacing = 1.7 * (0.95 + shard.y * 0.1);
  vec3 rainbow = foilGrating(dot(foilKey + foilView, grating), spacing);
  rainbow += 0.6 * foilGrating(dot(foilTop + foilView, grating), spacing);
  rainbow *= 0.8 + 0.2 * smoothstep(0.0, 0.04, shard.z);
  rainbow = max(rainbow - 0.35 * min(rainbow.r, min(rainbow.g, rainbow.b)), 0.0);
  vec2 grid = foilP * 64.0;
  vec2 cell = floor(grid);
  vec2 jitter = vec2(foilHash(cell + 1.7), foilHash(cell + 9.2));
  float flake = smoothstep(0.32, 0.06, length(fract(grid) - jitter * 0.6 - 0.2)) * step(0.45, foilHash(cell + 4.4));
  vec3 facet = normalize(foilNormal + (vFoilX * (jitter.x - 0.5) + vFoilY * (jitter.y - 0.5)) * 0.8);
  float glint = pow(max(dot(reflect(-foilKey, facet), foilView), 0.0), 28.0);
  glint += 0.7 * pow(max(dot(reflect(-foilTop, facet), foilView), 0.0), 28.0);
  float fine = 1.0 - smoothstep(0.35, 0.9, max(fwidth(grid.x), fwidth(grid.y)));
  vec3 sparkle = flake * glint * fine * (vec3(0.7) + foilGrating(dot(foilKey + foilView, grating) + jitter.x * 0.4, spacing));
  float ink = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  float foil = foilStrength * (0.08 + 0.92 * smoothstep(0.04, 0.7, ink));
  float facing = clamp(dot(foilNormal, foilView), 0.0, 1.0);
  float tint = clamp(dot(rainbow, vec3(0.4)), 0.0, 1.0);
  outgoingLight = outgoingLight * (1.0 - foil * (0.3 + 0.32 * tint)) + (rainbow * 0.62 * (0.4 + 0.6 * facing) + sparkle * 1.6) * foil;
}
`,tb={silver:{color:"#d9dce2",roughness:.16},gold:{color:"#e4b965",roughness:.2},graphite:{color:"#4d4f55",roughness:.28}},cr=(e,t,n)=>Math.min(n,Math.max(t,e)),Ic=(e,t,n)=>e+(t-e)*n,g0=(e,t)=>{try{let n=document.createElement("canvas").getContext("2d");if(!n)return t;n.fillStyle="#000000",n.fillStyle=e;let i=n.fillStyle;if(i.startsWith("#")){let r=parseInt(i.slice(1),16);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}let s=i.match(/[\d.]+/g);return!s||s.length<3?t:[Number(s[0])/255,Number(s[1])/255,Number(s[2])/255]}catch{return t}},s3=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],ud=(e,t=1)=>`rgba(${Math.round(e[0]*255)}, ${Math.round(e[1]*255)}, ${Math.round(e[2]*255)}, ${t})`,rb=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}},y0=(e,t,n,i,s,r)=>{let a=Math.max(0,Math.min(r,i/2,s/2)),o=a*.4477;e.moveTo(t+a,n),e.lineTo(t+i-a,n),e.bezierCurveTo(t+i-o,n,t+i,n+o,t+i,n+a),e.lineTo(t+i,n+s-a),e.bezierCurveTo(t+i,n+s-o,t+i-o,n+s,t+i-a,n+s),e.lineTo(t+a,n+s),e.bezierCurveTo(t+o,n+s,t,n+s-o,t,n+s-a),e.lineTo(t,n+a),e.bezierCurveTo(t,n+o,t+o,n,t+a,n)},_0=(e,t)=>{if(!t)return Promise.resolve(null);let n=e.get(t);if(n)return n;let i=new Promise(s=>{let r=new Image;r.crossOrigin="anonymous",r.decoding="async",r.onload=()=>s(r),r.onerror=()=>s(null),r.src=t});return e.set(t,i),i},eb=(e,t)=>{let[n,i]=KM[e]||KM.portrait,s=Ic(.03,Math.min(n,i)*.2,cr(t,0,1)),r={width:.34,height:.07,y:i/2-.13},a=i/2-.055;return{width:n,height:i,radius:s,slot:r,ringY:a,hangY:a+sb}},r3=e=>{let{width:t,height:n,radius:i,slot:s}=e,r=new sr;y0(r,-t/2+En,-n/2+En,t-En*2,n-En*2,Math.max(i-En,.005));let a=new Yr;y0(a,-s.width/2-En,s.y-s.height/2-En,s.width+En*2,s.height+En*2,s.height/2+En),r.holes.push(a);let o=new bo(r,{depth:Pc,bevelEnabled:!0,bevelThickness:En,bevelSize:En,bevelSegments:5,curveSegments:24});o.translate(0,0,-Pc/2);let l=new Mc(r,24),c=l.getAttribute("position"),u=l.getAttribute("uv");for(let d=0;d<c.count;d++)u.setXY(d,(c.getX(d)+t/2)/t,(c.getY(d)+n/2)/n);return u.needsUpdate=!0,{body:o,face:l}},nb=e=>{let t=new sr,n=e*1.16;y0(t,-n/2+.014,-Oc/2+.014,n-.028,Oc-.028,.024);let i=new bo(t,{depth:.02,bevelEnabled:!0,bevelThickness:.014,bevelSize:.014,bevelSegments:6,curveSegments:10});return i.translate(0,0,-.01),i},a3=e=>{let t=cd.length,n=new Gn;n.setAttribute("position",new cn(new Float32Array(e*t*3),3)),n.setAttribute("normal",new cn(new Float32Array(e*t*3),3)),n.setAttribute("uv",new cn(new Float32Array(e*t*2),2));let i=[];for(let s=0;s<e-1;s++)for(let r=0;r<t-1;r++){let a=s*t+r;i.push(a,a+t,a+1,a+1,a+t,a+t+1)}return n.setIndex(i),n},o3=e=>{let t=new vo;t.background=new qt(.035,.035,.04);let n=new Kr(1,1),i=[],s=(o,l,c,u=0)=>{let d=new Xr({color:new qt(o,o,o),side:Xn});i.push(d);let h=new Fe(n,d);h.position.set(...l),h.scale.set(c[0],c[1],1),h.lookAt(0,0,0),h.rotateZ(u),t.add(h)};s(2.6,[0,4.5,8],[9,4]),s(6,[-5.5,.5,7],[.9,14]),s(4,[5,-.5,8],[.6,14]),s(3.5,[0,-1,9],[24,.35],Math.PI/3),s(2.5,[1,2.5,9],[24,.2],Math.PI/3),s(1.4,[0,6,-6],[12,4]),s(.5,[0,-7,1],[16,6]),s(.9,[8,0,-2],[4,10]);let r=new Oo(e),a=r.fromScene(t,.035);return r.dispose(),n.dispose(),i.forEach(o=>o.dispose()),a},v0=(e,t)=>{let n=new qr(e);return n.colorSpace=ln,n.anisotropy=t,n},l3=()=>{let t=document.createElement("canvas");t.width=128,t.height=128;let n=t.getContext("2d");if(!n)return new qr(t);let i=rb(7),s=Float32Array.from({length:16384},()=>i()),r=(l,c)=>{let u=0;for(let d=-1;d<=1;d++)for(let h=-1;h<=1;h++)u+=s[(c+d+128)%128*128+(l+h+128)%128];return u/9*1.6},a=n.createImageData(128,128);for(let l=0;l<128;l++)for(let c=0;c<128;c++){let u=r((c-1+128)%128,l)-r((c+1)%128,l),d=r(c,(l-1+128)%128)-r(c,(l+1)%128),h=Math.hypot(u,d,1),p=(l*128+c)*4;a.data[p]=(u/h*.5+.5)*255,a.data[p+1]=(d/h*.5+.5)*255,a.data[p+2]=(1/h*.5+.5)*255,a.data[p+3]=255}n.putImageData(a,0,0);let o=new qr(t);return o.wrapS=Bi,o.wrapT=Bi,o.repeat.set(5,7),o},c3=()=>{let n=rb(19),i=Float32Array.from({length:16384},()=>n()),s=l=>Math.sqrt(Math.max(0,1-4*l*l)),r=(l,c)=>{let u=(l%128+128)%128,d=(c%128+128)%128,h=u/128*8,p=d/128*8,g=Math.floor(h),M=Math.floor(p),m=h-g-.5,f=p-M-.5,_=(g+M)%2===0,v=s(m)*(.55+.45*Math.cos(f*Math.PI*(_?1:.6))),y=s(f)*(.55+.45*Math.cos(m*Math.PI*(_?.6:1)));return(_?Math.max(v,y*.7):Math.max(y,v*.7))+i[d*128+u]*.08},a=new Uint8Array(16384*4);for(let l=0;l<128;l++)for(let c=0;c<128;c++){let u=(r(c-1,l)-r(c+1,l))*1.6,d=(r(c,l-1)-r(c,l+1))*1.6,h=Math.hypot(u,d,1),p=(l*128+c)*4;a[p]=(u/h*.5+.5)*255,a[p+1]=(d/h*.5+.5)*255,a[p+2]=(1/h*.5+.5)*255,a[p+3]=255}let o=new fc(a,128,128);return o.wrapS=Bi,o.wrapT=Bi,o.magFilter=Vn,o.minFilter=Hi,o.generateMipmaps=!0,o.needsUpdate=!0,o},u3=(e,t,n,i,s)=>{let r=(s==="contain"?Math.min:Math.max)(n/t.width,i/t.height),a=t.width*r,o=t.height*r;e.drawImage(t,(n-a)/2,(i-o)/2,a,o)},ib=(e,t,n,i)=>{let s=e.getContext("2d");s&&(s.fillStyle=ud(n),s.fillRect(0,0,e.width,e.height),t&&u3(s,t,e.width,e.height,i))},h3=(e,t,n)=>{let s=t?Math.max(64,Math.round(t.width/t.height*192)):384;e.width=192,e.height=s;let r=e.getContext("2d");if(!r)return s/192;if(r.fillStyle=ud(n),r.fillRect(0,0,192,s),t)return r.save(),r.translate(192,0),r.rotate(Math.PI/2),r.drawImage(t,0,0,s,192),r.restore(),s/192;let a=s3(n)>.5?[0,0,0]:[1,1,1];r.fillStyle=ud(a,.05);for(let o=0;o<s;o+=4)r.fillRect(0,o,192,1);r.fillStyle=ud(a,.2);for(let o=0;o<s;o+=14)r.fillRect(192*.075,o,2,8),r.fillRect(192*.925-2,o,2,8);return s/192},f3=()=>{let e=()=>Array.from({length:We+1},()=>new N);return{nodes:e(),previous:e(),velocities:e(),lengths:new Float64Array(We),impulses:new Float64Array(We),rest:1,anchor:new N,body:{position:new N,previous:new N,velocity:new N,quaternion:new Dn,previousQuaternion:new Dn,angular:new N,mass:1,inverseInertia:new N(1,1,1),hang:new N},grab:null,turn:0,twist:0,twistRaw:0,calm:0}},me={a:new N,b:new N,c:new N,d:new N,e:new N,f:new N,g:new N,pin:new N,q:new Dn,r:new Dn},x0=(e,t,n)=>(me.r.copy(e.quaternion).invert(),n.copy(t).applyQuaternion(me.r),n.set(n.x*e.inverseInertia.x,n.y*e.inverseInertia.y,n.z*e.inverseInertia.z),n.applyQuaternion(e.quaternion)),ab=(e,t)=>{let{x:n,y:i,z:s,w:r}=e;e.x+=.5*(t.x*r+t.y*s-t.z*i),e.y+=.5*(t.y*r+t.z*n-t.x*s),e.z+=.5*(t.z*r+t.x*i-t.y*n),e.w+=.5*(-t.x*n-t.y*i-t.z*s),e.normalize()},ob=(e,t,n)=>{let i=me.c.crossVectors(t,n);return 1/e.mass+i.dot(x0(e,i,me.d))},lb=(e,t,n)=>{e.position.addScaledVector(n,1/e.mass),ab(e.quaternion,x0(e,me.e.crossVectors(t,n),me.f))},d3=(e,t,n,i)=>{let{nodes:s,body:r}=e,a=s[t],o=t===0?0:JM,l=t===We-1,c=me.g,u=s[t+1];l&&(c.copy(r.hang).applyQuaternion(r.quaternion),u=me.b.copy(r.position).add(c));let d=me.a.subVectors(u,a),h=d.length(),p=h-e.rest;if(p<=0||h<1e-9)return;let g=d.divideScalar(h),M=l?ob(r,c,g):JM,m=(h-e.lengths[t])/n,_=(i.hold*Math.tanh(i.stiffness*p/i.hold)+i.spring*p+i.bandDamping*Math.max(0,m))*n*n-e.impulses[t];if(_<=0)return;let v=Math.min(p/(o+M),_);e.impulses[t]+=v,o&&a.addScaledVector(g,v*o),l?lb(r,c,g.multiplyScalar(-v)):u.addScaledVector(g,-v*M)},p3=(e,t,n)=>{let i=me.g.copy(t.local).applyQuaternion(e.quaternion),s=me.a.copy(n).sub(e.position).sub(i),r=s.length();if(r<1e-9)return;let a=s.divideScalar(r),o=r/ob(e,i,a);lb(e,i,a.multiplyScalar(o))},ld=(e,t,n)=>{let{nodes:i,previous:s,velocities:r,body:a,anchor:o}=e;i[0].copy(o);for(let c=1;c<=We;c++)i[c].copy(i[c-1]),n?i[c].x+=e.rest:i[c].y-=e.rest;a.quaternion.identity(),n&&a.quaternion.setFromAxisAngle(new N(0,0,1),Math.PI/2),a.hang.set(0,t.hangY,0);let l=me.a.copy(a.hang).applyQuaternion(a.quaternion);a.position.copy(i[We]).sub(l),a.previous.copy(a.position),a.previousQuaternion.copy(a.quaternion),a.velocity.set(0,0,0),a.angular.set(0,0,0);for(let c=0;c<=We;c++)s[c].copy(i[c]),r[c].set(0,0,0);e.lengths.fill(e.rest),e.turn=0,e.twist=0,e.twistRaw=0,e.calm=0},m3=(e,t,n)=>{e.rest=n/We;let{width:i,height:s}=t,r=e.body,a=Pc+En*2;r.mass=1,r.inverseInertia.set(12/(s*s+a*a),12/(i*i+a*a),12/(i*i+s*s)),r.hang.set(0,t.hangY,0)},g3=(e,t,n,i)=>{let s=Math.max(1,Math.ceil(t/K2-1e-6)),r=t/s,{nodes:a,previous:o,velocities:l,body:c}=e,u=n.breeze*(Math.sin(i*.53)*.7+Math.sin(i*1.31+1.7)*.3)*3,d=n.breeze*Math.sin(i*.37+.6)*2,h=e.grab,p=me.pin,g=Math.exp(-n.nodeDrag*r),M=Math.exp(-n.linearDrag*r),m=Math.exp(-n.angularDrag*r);for(let _=0;_<s;_++){for(let x=1;x<We;x++){let R=l[x];R.y-=n.gravity*r,R.x+=u*r,R.z+=d*r,o[x].copy(a[x]),a[x].addScaledVector(R,r)}c.previous.copy(c.position),c.previousQuaternion.copy(c.quaternion);let v=c.quaternion;if(h){let x=me.q.copy(h.rotation).multiply(me.r.copy(v).invert());x.w<0&&x.set(-x.x,-x.y,-x.z,-x.w);let R=me.a.set(x.x,x.y,x.z).multiplyScalar(2*n.grip);R.addScaledVector(c.angular,-n.gripDamping),c.angular.addScaledVector(x0(c,R,me.b),r)}let y=me.a.set(0,1,0).applyQuaternion(v),A=me.b.set(-y.x*y.z,-y.y*y.z,1-y.z*y.z);if(A.lengthSq()>.001){let x=me.d.set(0,0,1).applyQuaternion(v),R=Math.atan2(me.e.crossVectors(A,x).dot(y),A.dot(x)),z=R-e.twistRaw;z>Math.PI?z-=Math.PI*2:z<-Math.PI&&(z+=Math.PI*2),e.twist+=z,e.twistRaw=R}if(!h){let x=c.angular.dot(y);c.angular.addScaledVector(y,(n.twist*(e.turn-e.twist)-n.twistDamping*x)*r)}c.velocity.y-=n.gravity*r,c.velocity.x+=u*.35*r,c.velocity.z+=d*.35*r,c.position.addScaledVector(c.velocity,r),ab(c.quaternion,me.f.copy(c.angular).multiplyScalar(r)),e.impulses.fill(0),h&&p.lerpVectors(h.from,h.target,(_+1)/s);for(let x=0;x<J2;x++){for(let R=0;R<We;R++)d3(e,R,r,n);h&&p3(c,h,p)}for(let x=1;x<We;x++){let R=l[x].subVectors(a[x],o[x]).divideScalar(r).multiplyScalar(g);R.multiplyScalar(1/(1+n.nodeAir*R.length()*r))}c.velocity.subVectors(c.position,c.previous).divideScalar(r);let C=me.q.copy(c.previousQuaternion).invert().premultiply(c.quaternion);c.angular.set(C.x,C.y,C.z).multiplyScalar(2/r*(C.w<0?-1:1));let w=me.a.set(0,0,1).applyQuaternion(c.quaternion),U=c.velocity.dot(w),E=me.b.copy(c.velocity).addScaledVector(w,-U);E.multiplyScalar(1/(1+n.air*E.length()*r)),c.velocity.copy(E).addScaledVector(w,U/(1+n.broadside*Math.abs(U)*r)).multiplyScalar(M),c.angular.multiplyScalar(m/(1+n.spinAir*c.angular.length()*r)),c.velocity.lengthSq()>3600&&c.velocity.setLength(60),c.angular.lengthSq()>1600&&c.angular.setLength(40),a[We].copy(c.hang).applyQuaternion(c.quaternion).add(c.position);for(let x=0;x<We;x++)e.lengths[x]=a[x].distanceTo(a[x+1])}h&&h.from.copy(h.target);let f=c.velocity.lengthSq()+c.angular.lengthSq()*.3;for(let _=1;_<We;_++)f+=l[_].lengthSq()*.05;e.calm=f<2e-4?e.calm+t:0},_3=({frontImage:e,backImage:t,imageFit:n="cover",cardColor:i="#ffffff",orientation:s="portrait",finish:r="glossy",cornerRadius:a=.3,size:o=.6,anchor:l="center",strapLength:c=.5,strapImage:u,strapColor:d="#111111",strapWidth:h=.65,metal:p="silver",gravity:g=1,damping:M=.5,elasticity:m=.5,breeze:f=.5,interactive:_=!0,intro:v=!0,className:y="",style:A})=>{let C=(0,sa.useRef)(null),w=(0,sa.useRef)(null),U=(0,sa.useRef)(null);return w.current={frontImage:e,backImage:t,imageFit:n==="contain"?"contain":"cover",cardColor:i,orientation:s==="landscape"?"landscape":"portrait",finish:r,cornerRadius:a,size:o,anchor:l,strapLength:c,strapImage:u,strapColor:d,strapWidth:h,metal:p,gravity:g,damping:M,elasticity:m,breeze:f,interactive:_,intro:v},(0,sa.useEffect)(()=>{U.current?.()}),(0,sa.useEffect)(()=>{let E=C.current;if(!E)return;let x;try{x=new sd({antialias:!0,alpha:!0,powerPreference:"high-performance"})}catch{return}x.setClearColor(0,0),x.outputColorSpace=ln,x.toneMapping=_f,x.toneMappingExposure=1;let R=x.domElement;R.className="lanyard-canvas",R.setAttribute("aria-hidden","true"),E.tabIndex=0,E.setAttribute("role","button"),E.setAttribute("aria-label","\u6302\u7EF3\u5361\u7247\uFF0C\u6309\u56DE\u8F66\u6216\u7A7A\u683C\u7FFB\u9762\uFF0C\u65B9\u5411\u952E\u6446\u52A8"),E.appendChild(R);let z=Math.min(8,x.capabilities.getMaxAnisotropy()),k=new vo,Z=o3(x);k.environment=Z.texture;let W=new mn(QM,1,.1,200),q=new Ao(16777215,1.6);q.position.set(-2.5,4,6);let st=new Ao(16777215,.35);st.position.set(3,-1,4),k.add(q,st);let G=new Map,ft={front:null,back:null,strap:null},_t=document.createElement("canvas"),At=document.createElement("canvas"),Vt=document.createElement("canvas"),Jt=v0(_t,z),ae=v0(At,z),Yt=v0(Vt,z);Yt.wrapS=Ii,Yt.wrapT=Bi;let Q=l3(),et=c3(),bt={foilStrength:{value:0},foilAspect:{value:1.4},foilKey:{value:new N},foilFill:{value:new N},foilTop:{value:new N}},Ot=B=>{Object.assign(B.uniforms,bt),B.vertexShader=B.vertexShader.replace("#include <common>",`#include <common>
${t3}`).replace("#include <project_vertex>",`#include <project_vertex>
${e3}`),B.fragmentShader=B.fragmentShader.replace("#include <common>",`#include <common>
${n3}`).replace("#include <opaque_fragment>",`${i3}
#include <opaque_fragment>`)},Dt=new rr({map:Jt,normalMap:Q,normalScale:new gt(.06,.06)}),Xt=new rr({map:ae,normalMap:Q,normalScale:new gt(.06,.06)});Dt.onBeforeCompile=Ot,Xt.onBeforeCompile=Ot;let oe=new rr,D=new To({metalness:1}),nt=new rr({map:Yt,normalMap:et,normalScale:new gt(.7,.7),roughness:.68,sheen:1,sheenRoughness:.42,sheenColor:new qt(.32,.32,.34),side:Xn}),j=new Oi,K=new Fe(void 0,oe),Y=new Fe(void 0,Dt),ut=new Fe(void 0,Xt),rt=new Fe(new Eo(sb,Q2,18,72),D);rt.rotation.y=Math.PI/2-.7,j.add(K,Y,ut,rt),k.add(j);let dt=a3(ys),Ht=new Fe(dt,nt);Ht.frustumCulled=!1,k.add(Ht);let zt=new Oi,T=new Fe(nb(m0),D);T.position.y=od+Oc/2-.004;let S=new Fe(new Eo(od,.0105,14,40),D);zt.add(T,S),k.add(zt);let L=f3(),V=[],tt=new N,X=new N,Lt=new So(V,!1,"centripetal"),at={width:1,height:1},vt=eb("portrait",.3),Et={},it=m0,xt=2,Pt=0,It=performance.now(),yt=0,Bt,I=0,ct=!1,mt=!0,Ct=!1,ot=!1,J=null,Nt=0,Ft=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;R.style.visibility="hidden",E.dataset.lanyardEntrance="waiting",E.dataset.lanyardEntrances="0";let de=()=>{Bt?.setIntersection(WM(E.getBoundingClientRect(),window.innerWidth,window.innerHeight)),Bt?.setReady(ct&&Ct&&at.width>1&&at.height>1)},ue=()=>{let B=w.current,ht=g0(B.cardColor,[1,1,1]),pt=jM,Tt=Math.round(jM*vt.height/vt.width);(_t.width!==pt||_t.height!==Tt)&&(_t.width=pt,_t.height=Tt,At.width=pt,At.height=Tt,Jt.dispose(),ae.dispose()),ib(_t,ft.front,ht,B.imageFit),ib(At,ft.back||ft.front,ht,B.imageFit),Jt.needsUpdate=!0,ae.needsUpdate=!0,Zn()},qn=()=>{let B=w.current;xt=h3(Vt,ft.strap,g0(B.strapColor,[.07,.07,.07])),et.repeat.set(2,2*xt),Yt.dispose(),Yt.needsUpdate=!0,Zn()},Yn=()=>{let B=w.current,ht=at.width/at.height,pt=vt.height/cr(B.size,.15,.9),Tt=vt.width/.72;pt*ht<Tt&&(pt=Tt/ht);let Gt=pt*ht;W.aspect=ht,W.position.set(0,0,pt/2/Math.tan(QM*Math.PI/360)),W.lookAt(0,0,0),W.updateProjectionMatrix(),W.updateMatrixWorld(),bt.foilKey.value.set(-2.5,4,6).normalize().transformDirection(W.matrixWorldInverse),bt.foilFill.value.set(3,-1,4).normalize().transformDirection(W.matrixWorldInverse),bt.foilTop.value.set(.5,4.5,8).normalize().transformDirection(W.matrixWorldInverse);let ie=((Z2[B.anchor]??.5)-.5)*Gt,se=pt/2+.2,Rt=pt/2-pt*Ic(.12,.42,cr(B.strapLength,0,1))+(vt.hangY-vt.height/2);L.anchor.set(ie,se,0),m3(L,vt,se-Rt),L.nodes[0].copy(L.anchor),L.previous[0].copy(L.anchor)},Bo=()=>{let B=w.current,ht=`${B.orientation}|${B.cornerRadius}`;if(ht!==Et.layoutKey){vt=eb(B.orientation,B.cornerRadius);let Rt=r3(vt);K.geometry.dispose(),Y.geometry.dispose(),ut.geometry.dispose(),K.geometry=Rt.body,Y.geometry=Rt.face,ut.geometry=Rt.face.clone(),Y.position.z=Pc/2+En+6e-4,ut.rotation.y=Math.PI,ut.position.z=-(Pc/2+En+6e-4),rt.position.set(0,vt.ringY,0),Et.framingKey=""}let pt=`${ht}|${B.size}|${B.anchor}|${B.strapLength}|${at.width}|${at.height}`;pt!==Et.framingKey&&(Yn(),Ct?ht!==Et.layoutKey&&ld(L,vt,!1):(ld(L,vt,!1),Ct=!0));let Tt=`${B.frontImage}|${B.backImage}|${B.strapImage}`;if(Tt!==Et.imageKey){ct=!1,Bt?.setReady(!1);let Rt=++Nt;Promise.all([_0(G,B.frontImage),_0(G,B.backImage),_0(G,B.strapImage)]).then(([ge,$t,nn])=>{!mt||Rt!==Nt||(ft.front=ge,ft.back=$t,ft.strap=nn,ue(),qn(),ct=!0,de())})}let Gt=`${ht}|${B.cardColor}|${B.imageFit}`;Gt!==Et.faceKey&&ue(),B.strapColor!==Et.strapColor&&qn();let ie=$M[B.finish]||$M.glossy,se=g0(B.cardColor,[1,1,1]);[Dt,Xt].forEach(Rt=>{Rt.roughness=ie.roughness,Rt.metalness=ie.metalness,Rt.clearcoat=ie.clearcoat,Rt.clearcoatRoughness=ie.clearcoatRoughness,Rt.anisotropy=ie.anisotropy}),bt.foilStrength.value=ie.foil,bt.foilAspect.value=vt.height/vt.width,oe.color.setRGB(se[0]*.92,se[1]*.92,se[2]*.92,ln),oe.roughness=Math.min(ie.roughness,.35),oe.metalness=ie.metalness,oe.clearcoat=1,oe.clearcoatRoughness=.08;let le=tb[B.metal]||tb.silver;D.color.set(le.color),D.roughness=le.roughness,it=m0*cr(B.strapWidth,.4,2),it!==Et.strapScale&&(T.geometry.dispose(),T.geometry=nb(it)),R.style.touchAction=B.interactive?"pan-y":"auto",Et={layoutKey:ht,framingKey:pt,imageKey:Tt,faceKey:Gt,strapColor:B.strapColor,strapScale:it},de(),Zn()},Un=Array.from({length:ys},()=>new N),ur=Array.from({length:ys},()=>new N),Bc=j2.map(B=>[Math.cos(B),Math.sin(B)]),Mi={tangent:new N,toCamera:new N,basis:new Ae,up:new N,across:new N,facing:new N,end:new N},ra=()=>{let B=L.nodes[We],ht=od+Oc+.05,pt=We-1;for(;pt>0&&L.nodes[pt].distanceTo(B)<ht*1.1;)pt--;let Tt=Mi.up.subVectors(L.nodes[pt],B);Tt.lengthSq()<1e-8&&Tt.set(0,1,0).applyQuaternion(L.body.quaternion),Tt.normalize(),tt.copy(B).addScaledVector(Tt,ht),X.copy(B).addScaledVector(Tt,od+Oc*.35),V.length=0;for(let ne=0;ne<=pt;ne++)V.push(L.nodes[ne]);V.push(tt,X),Lt.updateArcLengths();for(let ne=0;ne<ys;ne++)Lt.getPointAt(ne/(ys-1),Un[ne]);let Gt=Lt.getLength(),ie=1-tt.distanceTo(X)/Math.max(Gt,.001),se=dt.getAttribute("position"),le=dt.getAttribute("normal"),Rt=dt.getAttribute("uv"),ge=cd.length,$t=L.rest*We,nn=$t/(it*xt),xs=it/Math.pow(Math.max(1,Gt/Math.max($t,.001)),.35),{tangent:Pe,toCamera:Ss,across:ee,facing:Be}=Mi;for(let ne=0;ne<ys;ne++){Pe.subVectors(Un[Math.min(ys-1,ne+1)],Un[Math.max(0,ne-1)]),Pe.lengthSq()<1e-12&&Pe.set(0,-1,0),Pe.normalize(),Ss.subVectors(W.position,Un[ne]).normalize();let Re=ur[ne].crossVectors(Ss,Pe);Re.lengthSq()<1e-10&&Re.copy(ne>0?ur[ne-1]:me.a.set(1,0,0)),Re.normalize(),ne>0&&Re.dot(ur[ne-1])<0&&Re.negate();let sn=-L.twist*Math.pow(Math.min(1,ne/(ys-1)/ie),1.3);Be.crossVectors(Pe,Re),ee.copy(Re).multiplyScalar(Math.cos(sn)).addScaledVector(Be,Math.sin(sn)),Be.crossVectors(Pe,ee);let fr=Un[ne],ki=(1-ne/(ys-1))*nn;for(let oa=0;oa<ge;oa++){let hd=ne*ge+oa,fd=(cd[oa]-.5)*xs,[dd,pd]=Bc[oa];se.setXYZ(hd,fr.x+ee.x*fd,fr.y+ee.y*fd,fr.z+ee.z*fd),le.setXYZ(hd,Be.x*dd+ee.x*pd,Be.y*dd+ee.y*pd,Be.z*dd+ee.z*pd),Rt.setXY(hd,cd[oa],ki)}}Mi.end.copy(ee),se.needsUpdate=!0,le.needsUpdate=!0,Rt.needsUpdate=!0,ee.copy(Mi.end).addScaledVector(Tt,-Mi.end.dot(Tt)).normalize(),Be.crossVectors(ee,Tt).normalize(),Mi.basis.makeBasis(ee,Tt,Be),zt.quaternion.setFromRotationMatrix(Mi.basis),zt.position.copy(B)},hr=()=>{j.position.copy(L.body.position),j.quaternion.copy(L.body.quaternion),ra(),x.render(k,W)},aa=()=>{let B=w.current,ht=40*cr(B.gravity,0,3),pt=Math.max(ht,20),Tt=cr(B.elasticity,0,1),Gt=cr(B.damping,0,1);return{gravity:ht,hold:pt*Ic(2.2,5.5,Tt),stiffness:pt*10*We,spring:pt*Ic(.1,.4,Tt)*We,bandDamping:pt*Ic(.3,.08,Tt)*We,linearDrag:.25*Math.pow(16,Gt),angularDrag:.5*Math.pow(12,Gt),air:.15,broadside:.5,spinAir:.03,nodeDrag:2,nodeAir:.2,twist:30,twistDamping:3,grip:40,gripDamping:6,breeze:Ft?0:cr(B.breeze,0,1)}},zo=B=>{if(Pt=0,!mt||!Bt?.isRunning())return;let ht=Math.min(1/30,Math.max(1/240,(B-It)/1e3));It=B,yt+=ht;let pt=aa();g3(L,ht,pt,yt);let Tt=L.body;Number.isFinite(Tt.position.x+Tt.position.y+Tt.position.z+Tt.quaternion.w)||(L.grab=null,ld(L,vt,!1)),hr();let Gt=L.calm>1.2&&!L.grab&&pt.breeze===0;Bt.isRunning()&&!Gt&&(Pt=requestAnimationFrame(zo))},Zn=()=>{Pt||!Bt?.isRunning()||!mt||(L.calm=0,It=performance.now(),Pt=requestAnimationFrame(zo))},Fo=new Tc,zc=new gt,Ho=B=>{let ht=R.getBoundingClientRect();zc.set((B.clientX-ht.left)/ht.width*2-1,-((B.clientY-ht.top)/ht.height)*2+1),Fo.setFromCamera(zc,W)},Vo=()=>(j.updateMatrixWorld(),Fo.intersectObjects([K,Y,ut],!1)[0]||null),Go=B=>{R.style.cursor!==B&&(R.style.cursor=B)},Fc=B=>{let ht=L.body,pt=me.a.set(0,1,0).applyQuaternion(ht.quaternion),Tt=L.turn>0?-1:1;if(L.turn===0){let Gt=me.c.subVectors(B,W.position).normalize();Tt=me.b.subVectors(B,ht.position).cross(Gt).dot(pt)<0?-1:1}if(L.turn=L.turn===0?Math.PI*Tt:0,Ft){ht.quaternion.setFromAxisAngle(new N(0,1,0),L.turn),ht.angular.set(0,0,0),hr();return}ht.angular.addScaledVector(pt,$2*Tt)},b=B=>{if(w.current.interactive){if(B.key==="Enter"||B.key===" ")B.preventDefault(),Fc(L.body.position.clone().add(new N(.3,0,0))),Zn();else if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(B.key)){if(B.preventDefault(),Ft)return;L.body.velocity.x+=B.key==="ArrowLeft"?-3:B.key==="ArrowRight"?3:0,L.body.velocity.y+=B.key==="ArrowUp"?2:B.key==="ArrowDown"?-2:0,Zn()}}},O=B=>{if(!w.current.interactive||B.button>0)return;Ho(B);let ht=Vo();ht&&(L.grab={local:ht.point.clone().sub(L.body.position).applyQuaternion(L.body.quaternion.clone().invert()),rotation:L.body.quaternion.clone(),reach:ht.distance,from:ht.point.clone(),target:ht.point.clone()},J={x:B.clientX,y:B.clientY,time:performance.now(),point:ht.point.clone()},R.setPointerCapture?.(B.pointerId),Go("grabbing"),B.preventDefault(),Zn())},H=B=>{if(w.current.interactive){if(Ho(B),L.grab){J&&Math.hypot(B.clientX-J.x,B.clientY-J.y)>6&&(J=null),Fo.ray.at(L.grab.reach,L.grab.target),Zn();return}B.pointerType!=="touch"&&(ot=!!Vo(),Go(ot?"grab":""))}},F=B=>{L.grab&&(L.grab=null,J&&B.type==="pointerup"&&performance.now()-J.time<450&&Fc(J.point),J=null,R.releasePointerCapture?.(B.pointerId),Go(ot&&B.pointerType!=="touch"?"grab":""),Zn())},P=B=>{!w.current.interactive||B.touches.length!==1||(Ho(B.touches[0]),Vo()&&B.preventDefault())};R.addEventListener("pointerdown",O),R.addEventListener("pointermove",H),R.addEventListener("pointerup",F),R.addEventListener("pointercancel",F),R.addEventListener("lostpointercapture",F),R.addEventListener("touchstart",P,{passive:!1}),E.addEventListener("keydown",b);let lt=()=>{at.width=Math.max(1,E.clientWidth),at.height=Math.max(1,E.clientHeight),x.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),x.setSize(at.width,at.height,!1),Bo(),hr()};Bt=XM({initialPageVisible:!document.hidden,onEnter:B=>{B&&(ld(L,vt,w.current.intro&&!Ft),E.dataset.lanyardEntrances=String(++I)),E.dataset.lanyardEntrance=Ft?"still":"active",R.style.visibility="visible",hr(),Zn()},onPause:()=>{cancelAnimationFrame(Pt),Pt=0,R.style.visibility="hidden",E.dataset.lanyardEntrance="waiting"}});let St=new ResizeObserver(lt);St.observe(E);let Ut=new IntersectionObserver(([B])=>{Bt.setIntersection(B)},{threshold:[0,.55]});Ut.observe(E);let wt=()=>{Bt.setPageVisible(!document.hidden)};return document.addEventListener("visibilitychange",wt),U.current=Bo,lt(),()=>{mt=!1,cancelAnimationFrame(Pt),U.current=null,St.disconnect(),Ut.disconnect(),document.removeEventListener("visibilitychange",wt),R.removeEventListener("pointerdown",O),R.removeEventListener("pointermove",H),R.removeEventListener("pointerup",F),R.removeEventListener("pointercancel",F),R.removeEventListener("lostpointercapture",F),R.removeEventListener("touchstart",P),E.removeEventListener("keydown",b),[K,Y,ut,rt,T,S,Ht].forEach(B=>B.geometry?.dispose()),[Dt,Xt,oe,D,nt].forEach(B=>B.dispose()),[Jt,ae,Yt,Q,et].forEach(B=>B.dispose()),Z.dispose(),x.dispose(),R.parentNode&&R.parentNode.removeChild(R)}},[]),(0,ub.jsx)("div",{ref:C,className:`lanyard ${y}`.trim(),style:A})},cb=_3;var fb=la(Nc());function YL(e){let t=(0,hb.createRoot)(e);return t.render((0,fb.jsx)(cb,{frontImage:"/veylo-process/lanyard/assets/card-front-employee-color.svg",backImage:"/veylo-process/lanyard/assets/card-back-chaoxi.svg",strapImage:"/veylo-process/lanyard/assets/lanyard-chaoxi-white.svg",imageFit:"cover",cardColor:"#ffffff",orientation:"portrait",finish:"glossy",cornerRadius:.3,size:.5,anchor:"center",strapLength:.4,strapColor:"#111111",strapWidth:.65,metal:"silver",gravity:1,damping:.5,elasticity:.5,breeze:.5,interactive:!0,intro:!0})),()=>t.unmount()}export{YL as mountLanyard};
/*! For license information please see runtime.mjs.LEGAL.txt */
