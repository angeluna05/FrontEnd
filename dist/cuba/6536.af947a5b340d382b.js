(self.webpackChunkcuba=self.webpackChunkcuba||[]).push([[6536],{4414:(V,J,K)=>{"use strict";K.d(J,{L:()=>m});var h=K(5879),A=K(6814),G=K(6505);function Et(U,it){if(1&U&&(h.O4$(),h.kcU(),h.TgZ(0,"li",5),h._uU(1),h.qZA()),2&U){const Z=it.$implicit;h.xp6(1),h.Oqu(Z)}}let m=(()=>{class U{constructor(){}ngOnInit(){}static#t=this.\u0275fac=function(O){return new(O||U)};static#e=this.\u0275cmp=h.Xpm({type:U,selectors:[["app-breadcrumb"]],inputs:{title:"title",items:"items",active_item:"active_item"},decls:15,vars:4,consts:[[1,"container-fluid"],[1,"page-title"],[1,"row"],[1,"col-6"],[1,"breadcrumb"],[1,"breadcrumb-item"],[3,"routerLink"],[1,"stroke-icon"],["href","assets/svg/icon-sprite.svg#stroke-home"],["class","breadcrumb-item",4,"ngFor","ngForOf"],[1,"breadcrumb-item","active"]],template:function(O,I){1&O&&(h.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h3"),h._uU(5),h.qZA()(),h.TgZ(6,"div",3)(7,"ol",4)(8,"li",5)(9,"a",6),h.O4$(),h.TgZ(10,"svg",7),h._UZ(11,"use",8),h.qZA()()(),h.YNc(12,Et,2,1,"li",9),h.kcU(),h.TgZ(13,"li",10),h._uU(14),h.qZA()()()()()()),2&O&&(h.xp6(5),h.Oqu(I.title),h.xp6(4),h.Q6J("routerLink","/dashboard/default"),h.xp6(3),h.Q6J("ngForOf",I.items),h.xp6(2),h.Oqu(I.active_item))},dependencies:[A.sg,G.rH]})}return U})()},7271:(V,J,K)=>{var h;!function(A,G,Et,m){"use strict";var b,U=["","webkit","Moz","MS","ms","o"],it=G.createElement("div"),Z="function",O=Math.round,I=Math.abs,Q=Date.now;function nt(t,e,r){return setTimeout(ht(t,r),e)}function z(t,e,r){return!!Array.isArray(t)&&(k(t,r[e],r),!0)}function k(t,e,r){var i;if(t)if(t.forEach)t.forEach(e,r);else if(t.length!==m)for(i=0;i<t.length;)e.call(r,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(r,t[i],i,t)}function yt(t,e,r){var i="DEPRECATED METHOD: "+e+"\n"+r+" AT \n";return function(){var n=new Error("get-stack-trace"),o=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=A.console&&(A.console.warn||A.console.log);return f&&f.call(A.console,i,o),t.apply(this,arguments)}}b="function"!=typeof Object.assign?function(e){if(e===m||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(e),i=1;i<arguments.length;i++){var n=arguments[i];if(n!==m&&null!==n)for(var o in n)n.hasOwnProperty(o)&&(r[o]=n[o])}return r}:Object.assign;var st=yt(function(e,r,i){for(var n=Object.keys(r),o=0;o<n.length;)(!i||i&&e[n[o]]===m)&&(e[n[o]]=r[n[o]]),o++;return e},"extend","Use `assign`."),Lt=yt(function(e,r){return st(e,r,!0)},"merge","Use `assign`.");function S(t,e,r){var n,i=e.prototype;(n=t.prototype=Object.create(i)).constructor=t,n._super=i,r&&b(n,r)}function ht(t,e){return function(){return t.apply(e,arguments)}}function at(t,e){return typeof t==Z?t.apply(e&&e[0]||m,e):t}function ft(t,e){return t===m?e:t}function P(t,e,r){k(_(e),function(i){t.addEventListener(i,r,!1)})}function s(t,e,r){k(_(e),function(i){t.removeEventListener(i,r,!1)})}function a(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function c(t,e){return t.indexOf(e)>-1}function _(t){return t.trim().split(/\s+/g)}function M(t,e,r){if(t.indexOf&&!r)return t.indexOf(e);for(var i=0;i<t.length;){if(r&&t[i][r]==e||!r&&t[i]===e)return i;i++}return-1}function R(t){return Array.prototype.slice.call(t,0)}function ot(t,e,r){for(var i=[],n=[],o=0;o<t.length;){var f=e?t[o][e]:t[o];M(n,f)<0&&i.push(t[o]),n[o]=f,o++}return r&&(i=e?i.sort(function(N,D){return N[e]>D[e]}):i.sort()),i}function B(t,e){for(var r,i,n=e[0].toUpperCase()+e.slice(1),o=0;o<U.length;){if((i=(r=U[o])?r+n:e)in t)return i;o++}return m}var It=1;function ut(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||A}var Pt="ontouchstart"in A,At=B(A,"PointerEvent")!==m,u=Pt&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),v="touch",p="mouse",w=25,l=1,d=4,y=8,lt=1,j=2,pt=4,Tt=8,dt=16,Y=j|pt,tt=Tt|dt,Gt=Y|tt,Zt=["x","y"],Ct=["clientX","clientY"];function L(t,e){var r=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(i){at(t.options.enable,[t])&&r.handler(i)},this.init()}function fe(t,e,r){var i=r.pointers.length,n=r.changedPointers.length,o=e&l&&i-n==0,f=e&(d|y)&&i-n==0;r.isFirst=!!o,r.isFinal=!!f,o&&(t.session={}),r.eventType=e,function ve(t,e){var r=t.session,i=e.pointers,n=i.length;r.firstInput||(r.firstInput=zt(e)),n>1&&!r.firstMultiple?r.firstMultiple=zt(e):1===n&&(r.firstMultiple=!1);var o=r.firstInput,f=r.firstMultiple,C=f?f.center:o.center,N=e.center=Bt(i);e.timeStamp=Q(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=kt(C,N),e.distance=Ot(C,N),function pe(t,e){var r=e.center,i=t.offsetDelta||{},n=t.prevDelta||{},o=t.prevInput||{};(e.eventType===l||o.eventType===d)&&(n=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},i=t.offsetDelta={x:r.x,y:r.y}),e.deltaX=n.x+(r.x-i.x),e.deltaY=n.y+(r.y-i.y)}(r,e),e.offsetDirection=Jt(e.deltaX,e.deltaY);var D=$t(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=D.x,e.overallVelocityY=D.y,e.overallVelocity=I(D.x)>I(D.y)?D.x:D.y,e.scale=f?function me(t,e){return Ot(e[0],e[1],Ct)/Ot(t[0],t[1],Ct)}(f.pointers,i):1,e.rotation=f?function de(t,e){return kt(e[1],e[0],Ct)+kt(t[1],t[0],Ct)}(f.pointers,i):0,e.maxPointers=r.prevInput?e.pointers.length>r.prevInput.maxPointers?e.pointers.length:r.prevInput.maxPointers:e.pointers.length,function Te(t,e){var n,o,f,C,r=t.lastInterval||e,i=e.timeStamp-r.timeStamp;if(e.eventType!=y&&(i>w||r.velocity===m)){var N=e.deltaX-r.deltaX,D=e.deltaY-r.deltaY,q=$t(i,N,D);o=q.x,f=q.y,n=I(q.x)>I(q.y)?q.x:q.y,C=Jt(N,D),t.lastInterval=e}else n=r.velocity,o=r.velocityX,f=r.velocityY,C=r.direction;e.velocity=n,e.velocityX=o,e.velocityY=f,e.direction=C}(r,e);var q=t.element;a(e.srcEvent.target,q)&&(q=e.srcEvent.target),e.target=q}(t,r),t.emit("hammer.input",r),t.recognize(r),t.session.prevInput=r}function zt(t){for(var e=[],r=0;r<t.pointers.length;)e[r]={clientX:O(t.pointers[r].clientX),clientY:O(t.pointers[r].clientY)},r++;return{timeStamp:Q(),pointers:e,center:Bt(e),deltaX:t.deltaX,deltaY:t.deltaY}}function Bt(t){var e=t.length;if(1===e)return{x:O(t[0].clientX),y:O(t[0].clientY)};for(var r=0,i=0,n=0;n<e;)r+=t[n].clientX,i+=t[n].clientY,n++;return{x:O(r/e),y:O(i/e)}}function $t(t,e,r){return{x:e/t||0,y:r/t||0}}function Jt(t,e){return t===e?lt:I(t)>=I(e)?t<0?j:pt:e<0?Tt:dt}function Ot(t,e,r){r||(r=Zt);var i=e[r[0]]-t[r[0]],n=e[r[1]]-t[r[1]];return Math.sqrt(i*i+n*n)}function kt(t,e,r){return r||(r=Zt),180*Math.atan2(e[r[1]]-t[r[1]],e[r[0]]-t[r[0]])/Math.PI}L.prototype={handler:function(){},init:function(){this.evEl&&P(this.element,this.evEl,this.domHandler),this.evTarget&&P(this.target,this.evTarget,this.domHandler),this.evWin&&P(ut(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&s(this.element,this.evEl,this.domHandler),this.evTarget&&s(this.target,this.evTarget,this.domHandler),this.evWin&&s(ut(this.element),this.evWin,this.domHandler)}};var _e={mousedown:l,mousemove:2,mouseup:d},ge="mousedown",Ee="mousemove mouseup";function Nt(){this.evEl=ge,this.evWin=Ee,this.pressed=!1,L.apply(this,arguments)}S(Nt,L,{handler:function(e){var r=_e[e.type];r&l&&0===e.button&&(this.pressed=!0),2&r&&1!==e.which&&(r=d),this.pressed&&(r&d&&(this.pressed=!1),this.callback(this.manager,r,{pointers:[e],changedPointers:[e],pointerType:p,srcEvent:e}))}});var ye={pointerdown:l,pointermove:2,pointerup:d,pointercancel:y,pointerout:y},Ie={2:v,3:"pen",4:p,5:"kinect"},Qt="pointerdown",jt="pointermove pointerup pointercancel";function wt(){this.evEl=Qt,this.evWin=jt,L.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}A.MSPointerEvent&&!A.PointerEvent&&(Qt="MSPointerDown",jt="MSPointerMove MSPointerUp MSPointerCancel"),S(wt,L,{handler:function(e){var r=this.store,i=!1,n=e.type.toLowerCase().replace("ms",""),o=ye[n],f=Ie[e.pointerType]||e.pointerType,C=f==v,N=M(r,e.pointerId,"pointerId");o&l&&(0===e.button||C)?N<0&&(r.push(e),N=r.length-1):o&(d|y)&&(i=!0),!(N<0)&&(r[N]=e,this.callback(this.manager,o,{pointers:r,changedPointers:[e],pointerType:f,srcEvent:e}),i&&r.splice(N,1))}});var Pe={touchstart:l,touchmove:2,touchend:d,touchcancel:y};function te(){this.evTarget="touchstart",this.evWin="touchstart touchmove touchend touchcancel",this.started=!1,L.apply(this,arguments)}function Oe(t,e){var r=R(t.touches),i=R(t.changedTouches);return e&(d|y)&&(r=ot(r.concat(i),"identifier",!0)),[r,i]}S(te,L,{handler:function(e){var r=Pe[e.type];if(r===l&&(this.started=!0),this.started){var i=Oe.call(this,e,r);r&(d|y)&&i[0].length-i[1].length==0&&(this.started=!1),this.callback(this.manager,r,{pointers:i[0],changedPointers:i[1],pointerType:v,srcEvent:e})}}});var Ne={touchstart:l,touchmove:2,touchend:d,touchcancel:y},Se="touchstart touchmove touchend touchcancel";function St(){this.evTarget=Se,this.targetIds={},L.apply(this,arguments)}function Me(t,e){var r=R(t.touches),i=this.targetIds;if(e&(2|l)&&1===r.length)return i[r[0].identifier]=!0,[r,r];var n,o,f=R(t.changedTouches),C=[],N=this.target;if(o=r.filter(function(D){return a(D.target,N)}),e===l)for(n=0;n<o.length;)i[o[n].identifier]=!0,n++;for(n=0;n<f.length;)i[f[n].identifier]&&C.push(f[n]),e&(d|y)&&delete i[f[n].identifier],n++;return C.length?[ot(o.concat(C),"identifier",!0),C]:void 0}S(St,L,{handler:function(e){var r=Ne[e.type],i=Me.call(this,e,r);i&&this.callback(this.manager,r,{pointers:i[0],changedPointers:i[1],pointerType:v,srcEvent:e})}});var De=2500;function Ft(){L.apply(this,arguments);var t=ht(this.handler,this);this.touch=new St(this.manager,t),this.mouse=new Nt(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function Ue(t,e){t&l?(this.primaryTouch=e.changedPointers[0].identifier,re.call(this,e)):t&(d|y)&&re.call(this,e)}function re(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var r={x:e.clientX,y:e.clientY};this.lastTouches.push(r);var i=this.lastTouches;setTimeout(function(){var o=i.indexOf(r);o>-1&&i.splice(o,1)},De)}}function be(t){for(var e=t.srcEvent.clientX,r=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var n=this.lastTouches[i],o=Math.abs(e-n.x),f=Math.abs(r-n.y);if(o<=25&&f<=25)return!0}return!1}S(Ft,L,{handler:function(e,r,i){var o=i.pointerType==p;if(!(o&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(i.pointerType==v)Ue.call(this,r,i);else if(o&&be.call(this,i))return;this.callback(e,r,i)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var ie=B(it.style,"touchAction"),ne=ie!==m,se="compute",Yt="manipulation",et="none",mt="pan-x",_t="pan-y",Mt=function Le(){if(!ne)return!1;var t={},e=A.CSS&&A.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(r){t[r]=!e||A.CSS.supports("touch-action",r)}),t}();function Ht(t,e){this.manager=t,this.set(e)}Ht.prototype={set:function(t){t==se&&(t=this.compute()),ne&&this.manager.element.style&&Mt[t]&&(this.manager.element.style[ie]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return k(this.manager.recognizers,function(e){at(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),function Re(t){if(c(t,et))return et;var e=c(t,mt),r=c(t,_t);return e&&r?et:e||r?e?mt:_t:c(t,Yt)?Yt:"auto"}(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,r=t.offsetDirection;if(!this.manager.session.prevented){var i=this.actions,n=c(i,et)&&!Mt[et],o=c(i,_t)&&!Mt[_t],f=c(i,mt)&&!Mt[mt];if(n&&1===t.pointers.length&&t.distance<2&&t.deltaTime<250)return;return f&&o||!(n||o&&r&Y||f&&r&tt)?void 0:this.preventSrc(e)}e.preventDefault()},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var Dt=1,H=32;function W(t){this.options=b({},this.defaults,t||{}),this.id=function vt(){return It++}(),this.manager=null,this.options.enable=ft(this.options.enable,!0),this.state=Dt,this.simultaneous={},this.requireFail=[]}function oe(t){return 16&t?"cancel":8&t?"end":4&t?"move":2&t?"start":""}function ue(t){return t==dt?"down":t==Tt?"up":t==j?"left":t==pt?"right":""}function Ut(t,e){var r=e.manager;return r?r.get(t):t}function F(){W.apply(this,arguments)}function bt(){F.apply(this,arguments),this.pX=null,this.pY=null}function qt(){F.apply(this,arguments)}function Xt(){W.apply(this,arguments),this._timer=null,this._input=null}function Wt(){F.apply(this,arguments)}function Vt(){F.apply(this,arguments)}function Rt(){W.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function rt(t,e){return(e=e||{}).recognizers=ft(e.recognizers,rt.defaults.preset),new Kt(t,e)}function Kt(t,e){this.options=b({},rt.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=function he(t){return new(t.options.inputClass||(At?wt:u?St:Pt?Ft:Nt))(t,fe)}(this),this.touchAction=new Ht(this,this.options.touchAction),ce(this,!0),k(this.options.recognizers,function(r){var i=this.add(new r[0](r[1]));r[2]&&i.recognizeWith(r[2]),r[3]&&i.requireFailure(r[3])},this)}function ce(t,e){var i,r=t.element;r.style&&(k(t.options.cssProps,function(n,o){i=B(r.style,o),e?(t.oldCssProps[i]=r.style[i],r.style[i]=n):r.style[i]=t.oldCssProps[i]||""}),e||(t.oldCssProps={}))}W.prototype={defaults:{},set:function(t){return b(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(z(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=Ut(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return z(t,"dropRecognizeWith",this)||(t=Ut(t,this),delete this.simultaneous[t.id]),this},requireFailure:function(t){if(z(t,"requireFailure",this))return this;var e=this.requireFail;return-1===M(e,t=Ut(t,this))&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(z(t,"dropRequireFailure",this))return this;t=Ut(t,this);var e=M(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){var e=this,r=this.state;function i(n){e.manager.emit(n,t)}r<8&&i(e.options.event+oe(r)),i(e.options.event),t.additionalEvent&&i(t.additionalEvent),r>=8&&i(e.options.event+oe(r))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=H},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(H|Dt)))return!1;t++}return!0},recognize:function(t){var e=b({},t);if(!at(this.options.enable,[this,e]))return this.reset(),void(this.state=H);56&this.state&&(this.state=Dt),this.state=this.process(e),30&this.state&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},S(F,W,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,r=t.eventType,i=6&e,n=this.attrTest(t);return i&&(r&y||!n)?16|e:i||n?r&d?8|e:2&e?4|e:2:H}}),S(bt,F,{defaults:{event:"pan",threshold:10,pointers:1,direction:Gt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Y&&e.push(_t),t&tt&&e.push(mt),e},directionTest:function(t){var e=this.options,r=!0,i=t.distance,n=t.direction,o=t.deltaX,f=t.deltaY;return n&e.direction||(e.direction&Y?(n=0===o?lt:o<0?j:pt,r=o!=this.pX,i=Math.abs(t.deltaX)):(n=0===f?lt:f<0?Tt:dt,r=f!=this.pY,i=Math.abs(t.deltaY))),t.direction=n,r&&i>e.threshold&&n&e.direction},attrTest:function(t){return F.prototype.attrTest.call(this,t)&&(2&this.state||!(2&this.state)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=ue(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),S(qt,F,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[et]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||2&this.state)},emit:function(t){1!==t.scale&&(t.additionalEvent=this.options.event+(t.scale<1?"in":"out")),this._super.emit.call(this,t)}}),S(Xt,W,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return["auto"]},process:function(t){var e=this.options,r=t.pointers.length===e.pointers,i=t.distance<e.threshold,n=t.deltaTime>e.time;if(this._input=t,!i||!r||t.eventType&(d|y)&&!n)this.reset();else if(t.eventType&l)this.reset(),this._timer=nt(function(){this.state=8,this.tryEmit()},e.time,this);else if(t.eventType&d)return 8;return H},reset:function(){clearTimeout(this._timer)},emit:function(t){8===this.state&&(t&&t.eventType&d?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=Q(),this.manager.emit(this.options.event,this._input)))}}),S(Wt,F,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[et]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||2&this.state)}}),S(Vt,F,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Y|tt,pointers:1},getTouchAction:function(){return bt.prototype.getTouchAction.call(this)},attrTest:function(t){var r,e=this.options.direction;return e&(Y|tt)?r=t.overallVelocity:e&Y?r=t.overallVelocityX:e&tt&&(r=t.overallVelocityY),this._super.attrTest.call(this,t)&&e&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&I(r)>this.options.velocity&&t.eventType&d},emit:function(t){var e=ue(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),S(Rt,W,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[Yt]},process:function(t){var e=this.options,r=t.pointers.length===e.pointers,i=t.distance<e.threshold,n=t.deltaTime<e.time;if(this.reset(),t.eventType&l&&0===this.count)return this.failTimeout();if(i&&n&&r){if(t.eventType!=d)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,f=!this.pCenter||Ot(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,f&&o?this.count+=1:this.count=1,this._input=t,0==this.count%e.taps)return this.hasRequireFailures()?(this._timer=nt(function(){this.state=8,this.tryEmit()},e.interval,this),2):8}return H},failTimeout:function(){return this._timer=nt(function(){this.state=H},this.options.interval,this),H},reset:function(){clearTimeout(this._timer)},emit:function(){8==this.state&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),rt.VERSION="2.0.7",rt.defaults={domEvents:!1,touchAction:se,enable:!0,inputTarget:null,inputClass:null,preset:[[Wt,{enable:!1}],[qt,{enable:!1},["rotate"]],[Vt,{direction:Y}],[bt,{direction:Y},["swipe"]],[Rt],[Rt,{event:"doubletap",taps:2},["tap"]],[Xt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},Kt.prototype={set:function(t){return b(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var r,i=this.recognizers,n=e.curRecognizer;(!n||n&&8&n.state)&&(n=e.curRecognizer=null);for(var o=0;o<i.length;)r=i[o],2===e.stopped||n&&r!=n&&!r.canRecognizeWith(n)?r.reset():r.recognize(t),!n&&14&r.state&&(n=e.curRecognizer=r),o++}},get:function(t){if(t instanceof W)return t;for(var e=this.recognizers,r=0;r<e.length;r++)if(e[r].options.event==t)return e[r];return null},add:function(t){if(z(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(z(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,r=M(e,t);-1!==r&&(e.splice(r,1),this.touchAction.update())}return this},on:function(t,e){if(t!==m&&e!==m){var r=this.handlers;return k(_(t),function(i){r[i]=r[i]||[],r[i].push(e)}),this}},off:function(t,e){if(t!==m){var r=this.handlers;return k(_(t),function(i){e?r[i]&&r[i].splice(M(r[i],e),1):delete r[i]}),this}},emit:function(t,e){this.options.domEvents&&function ke(t,e){var r=G.createEvent("Event");r.initEvent(t,!0,!0),r.gesture=e,e.target.dispatchEvent(r)}(t,e);var r=this.handlers[t]&&this.handlers[t].slice();if(r&&r.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<r.length;)r[i](e),i++}},destroy:function(){this.element&&ce(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},b(rt,{INPUT_START:l,INPUT_MOVE:2,INPUT_END:d,INPUT_CANCEL:y,STATE_POSSIBLE:Dt,STATE_BEGAN:2,STATE_CHANGED:4,STATE_ENDED:8,STATE_RECOGNIZED:8,STATE_CANCELLED:16,STATE_FAILED:H,DIRECTION_NONE:lt,DIRECTION_LEFT:j,DIRECTION_RIGHT:pt,DIRECTION_UP:Tt,DIRECTION_DOWN:dt,DIRECTION_HORIZONTAL:Y,DIRECTION_VERTICAL:tt,DIRECTION_ALL:Gt,Manager:Kt,Input:L,TouchAction:Ht,TouchInput:St,MouseInput:Nt,PointerEventInput:wt,TouchMouseInput:Ft,SingleTouchInput:te,Recognizer:W,AttrRecognizer:F,Tap:Rt,Pan:bt,Swipe:Vt,Pinch:qt,Rotate:Wt,Press:Xt,on:P,off:s,each:k,merge:Lt,extend:st,assign:b,inherit:S,bindFn:ht,prefixed:B}),(typeof A<"u"?A:typeof self<"u"?self:{}).Hammer=rt,(h=function(){return rt}.call(J,K,J,V))!==m&&(V.exports=h)}(window,document)},1499:(V,J,K)=>{var h;!function(A,G,Et){if(A){for(var O,m={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},U={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},it={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},Z={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},I=1;I<20;++I)m[111+I]="f"+I;for(I=0;I<=9;++I)m[I+96]=I.toString();P.prototype.bind=function(s,a,c){var _=this;return _._bindMultiple.call(_,s=s instanceof Array?s:[s],a,c),_},P.prototype.unbind=function(s,a){return this.bind.call(this,s,function(){},a)},P.prototype.trigger=function(s,a){var c=this;return c._directMap[s+":"+a]&&c._directMap[s+":"+a]({},s),c},P.prototype.reset=function(){var s=this;return s._callbacks={},s._directMap={},s},P.prototype.stopCallback=function(s,a){if((" "+a.className+" ").indexOf(" mousetrap ")>-1||ft(a,this.target))return!1;if("composedPath"in s&&"function"==typeof s.composedPath){var _=s.composedPath()[0];_!==s.target&&(a=_)}return"INPUT"==a.tagName||"SELECT"==a.tagName||"TEXTAREA"==a.tagName||a.isContentEditable},P.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)},P.addKeycodes=function(s){for(var a in s)s.hasOwnProperty(a)&&(m[a]=s[a]);O=null},P.init=function(){var s=P(G);for(var a in s)"_"!==a.charAt(0)&&(P[a]=function(c){return function(){return s[c].apply(s,arguments)}}(a))},P.init(),A.Mousetrap=P,V.exports&&(V.exports=P),void 0!==(h=function(){return P}.call(J,K,J,V))&&(V.exports=h)}function Q(s,a,c){s.addEventListener?s.addEventListener(a,c,!1):s.attachEvent("on"+a,c)}function nt(s){if("keypress"==s.type){var a=String.fromCharCode(s.which);return s.shiftKey||(a=a.toLowerCase()),a}return m[s.which]?m[s.which]:U[s.which]?U[s.which]:String.fromCharCode(s.which).toLowerCase()}function z(s,a){return s.sort().join(",")===a.sort().join(",")}function st(s){return"shift"==s||"ctrl"==s||"alt"==s||"meta"==s}function S(s,a,c){return c||(c=function Lt(){if(!O)for(var s in O={},m)s>95&&s<112||m.hasOwnProperty(s)&&(O[m[s]]=s);return O}()[s]?"keydown":"keypress"),"keypress"==c&&a.length&&(c="keydown"),c}function at(s,a){var c,_,M,R=[];for(c=function ht(s){return"+"===s?["+"]:(s=s.replace(/\+{2}/g,"+plus")).split("+")}(s),M=0;M<c.length;++M)Z[_=c[M]]&&(_=Z[_]),a&&"keypress"!=a&&it[_]&&(_=it[_],R.push("shift")),st(_)&&R.push(_);return{key:_,modifiers:R,action:a=S(_,R,a)}}function ft(s,a){return null!==s&&s!==G&&(s===a||ft(s.parentNode,a))}function P(s){var a=this;if(s=s||G,!(a instanceof P))return new P(s);a.target=s,a._callbacks={},a._directMap={};var _,c={},M=!1,R=!1,ot=!1;function B(u){u=u||{};var T,v=!1;for(T in c)u[T]?v=!0:c[T]=0;v||(ot=!1)}function It(u,v,T,p,g,w){var l,E,d=[],y=T.type;if(!a._callbacks[u])return[];for("keyup"==y&&st(u)&&(v=[u]),l=0;l<a._callbacks[u].length;++l)E=a._callbacks[u][l],!p&&E.seq&&c[E.seq]!=E.level||y!=E.action||("keypress"!=y||T.metaKey||T.ctrlKey)&&!z(v,E.modifiers)||((!p&&E.combo==g||p&&E.seq==p&&E.level==w)&&a._callbacks[u].splice(l,1),d.push(E));return d}function vt(u,v,T,p){a.stopCallback(v,v.target||v.srcElement,T,p)||!1===u(v,T)&&(function yt(s){s.preventDefault?s.preventDefault():s.returnValue=!1}(v),function b(s){s.stopPropagation?s.stopPropagation():s.cancelBubble=!0}(v))}function ut(u){"number"!=typeof u.which&&(u.which=u.keyCode);var v=nt(u);if(v){if("keyup"==u.type&&M===v)return void(M=!1);a.handleKey(v,function k(s){var a=[];return s.shiftKey&&a.push("shift"),s.altKey&&a.push("alt"),s.ctrlKey&&a.push("ctrl"),s.metaKey&&a.push("meta"),a}(u),u)}}function At(u,v,T,p,g){a._directMap[u+":"+T]=v;var l,w=(u=u.replace(/\s+/g," ")).split(" ");w.length>1?function Pt(u,v,T,p){function g(y){return function(){ot=y,++c[u],function xt(){clearTimeout(_),_=setTimeout(B,1e3)}()}}function w(y){vt(T,y,u),"keyup"!==p&&(M=nt(y)),setTimeout(B,10)}c[u]=0;for(var l=0;l<v.length;++l){var d=l+1===v.length?w:g(p||at(v[l+1]).action);At(v[l],d,p,u,l)}}(u,w,v,T):(l=at(u,T),a._callbacks[l.key]=a._callbacks[l.key]||[],It(l.key,l.modifiers,{type:l.action},p,u,g),a._callbacks[l.key][p?"unshift":"push"]({callback:v,modifiers:l.modifiers,action:l.action,seq:p,level:g,combo:u}))}a._handleKey=function(u,v,T){var g,p=It(u,v,T),w={},l=0,E=!1;for(g=0;g<p.length;++g)p[g].seq&&(l=Math.max(l,p[g].level));for(g=0;g<p.length;++g)if(p[g].seq){if(p[g].level!=l)continue;E=!0,w[p[g].seq]=1,vt(p[g].callback,T,p[g].combo,p[g].seq)}else E||vt(p[g].callback,T,p[g].combo);var d="keypress"==T.type&&R;T.type==ot&&!st(u)&&!d&&B(w),R=E&&"keydown"==T.type},a._bindMultiple=function(u,v,T){for(var p=0;p<u.length;++p)At(u[p],v,T)},Q(s,"keypress",ut),Q(s,"keydown",ut),Q(s,"keyup",ut)}}(typeof window<"u"?window:null,typeof window<"u"?document:null)}}]);