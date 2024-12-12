"use strict";(self.webpackChunkcuba=self.webpackChunkcuba||[]).push([[7680],{7680:(Z,z,m)=>{m.d(z,{NP:()=>O,_f:()=>T,bB:()=>S,dt:()=>x});var _=m(5861),t=m(5879),u=m(6814),C=m(6593);function D(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"ngx-dropzone-remove-badge",1),t.NdJ("click",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i._remove(r))}),t.qZA()}}const y=[[["ngx-dropzone-label"]]],P=["ngx-dropzone-label"],w=["fileInput"];function I(n,s){1&n&&t.Hsn(0,2,["*ngIf","!_hasPreviews"])}const N=[[["ngx-dropzone-preview"]],"*",[["ngx-dropzone-label"]]],M=["ngx-dropzone-preview","*","ngx-dropzone-label"];let O=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=t.lG2({type:n,selectors:[["ngx-dropzone-label"]]}),n})();function g(n){return null!=n&&"false"!=`${n}`}let F=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["ngx-dropzone-remove-badge"]],decls:3,vars:0,consts:[["x1","0","y1","0","x2","10","y2","10"],["x1","0","y1","10","x2","10","y2","0"]],template:function(e,o){1&e&&(t.O4$(),t.TgZ(0,"svg"),t._UZ(1,"line",0)(2,"line",1),t.qZA())},styles:["[_nghost-%COMP%]{display:flex;justify-content:center;align-items:center;height:22px;width:22px;position:absolute;top:5px;right:5px;border-radius:50%;background:#bbb;color:#333;cursor:pointer}[_nghost-%COMP%]:hover{background:#aeaeae}[_nghost-%COMP%] > svg[_ngcontent-%COMP%]{height:10px;width:10px}[_nghost-%COMP%] > svg[_ngcontent-%COMP%] > line[_ngcontent-%COMP%]{stroke-width:2px;stroke:#fff}"]}),n})();var f=function(n){return n[n.BACKSPACE=8]="BACKSPACE",n[n.DELETE=46]="DELETE",n}(f||{});let x=(()=>{class n{constructor(e){this.sanitizer=e,this._removable=!1,this.removed=new t.vpe,this.tabIndex=0}set file(e){this._file=e}get file(){return this._file}get removable(){return this._removable}set removable(e){this._removable=g(e)}keyEvent(e){switch(e.keyCode){case f.BACKSPACE:case f.DELETE:this.remove()}}get hostStyle(){return this.sanitizer.bypassSecurityTrustStyle("\n\t\t\tdisplay: flex;\n\t\t\theight: 140px;\n\t\t\tmin-height: 140px;\n\t\t\tmin-width: 180px;\n\t\t\tmax-width: 180px;\n\t\t\tjustify-content: center;\n\t\t\talign-items: center;\n\t\t\tpadding: 0 20px;\n\t\t\tmargin: 10px;\n\t\t\tborder-radius: 5px;\n\t\t\tposition: relative;\n\t\t")}_remove(e){e.stopPropagation(),this.remove()}remove(){this._removable&&this.removed.next(this.file)}readFile(){var e=this;return(0,_.Z)(function*(){return new Promise((o,r)=>{const i=new FileReader;if(i.onload=a=>{o(a.target.result)},i.onerror=a=>{console.error(`FileReader failed on file ${e.file.name}.`),r(a)},!e.file)return r("No file to read. Please provide a file using the [file] Input property.");i.readAsDataURL(e.file)})})()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(C.H7))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ngx-dropzone-preview"]],hostVars:3,hostBindings:function(e,o){1&e&&t.NdJ("keyup",function(i){return o.keyEvent(i)}),2&e&&(t.Ikx("tabindex",o.tabIndex),t.Akn(o.hostStyle))},inputs:{file:"file",removable:"removable"},outputs:{removed:"removed"},ngContentSelectors:P,decls:2,vars:1,consts:[[3,"click",4,"ngIf"],[3,"click"]],template:function(e,o){1&e&&(t.F$t(y),t.Hsn(0),t.YNc(1,D,1,0,"ngx-dropzone-remove-badge",0)),2&e&&(t.xp6(1),t.Q6J("ngIf",o.removable))},dependencies:[F,u.O5],styles:["[_nghost-%COMP%]{background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}[_nghost-%COMP%]:hover, [_nghost-%COMP%]:focus{background-image:linear-gradient(to top,#e3e3e3,#ebeaea,#e8e7e7,#ebeaea,#f4f4f4);outline:0}[_nghost-%COMP%]:hover   ngx-dropzone-remove-badge[_ngcontent-%COMP%], [_nghost-%COMP%]:focus   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:1}[_nghost-%COMP%]   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:0}[_nghost-%COMP%]     ngx-dropzone-label{overflow-wrap:break-word}"]}),n})(),b=(()=>{class n{parseFileList(e,o,r,i){const a=[],l=[];for(let p=0;p<e.length;p++){const c=e.item(p);this.isAccepted(c,o)?r&&c.size>r?this.rejectFile(l,c,"size"):!i&&a.length>=1?this.rejectFile(l,c,"no_multiple"):a.push(c):this.rejectFile(l,c,"type")}return{addedFiles:a,rejectedFiles:l}}isAccepted(e,o){if("*"===o)return!0;const r=o.split(",").map(d=>d.toLowerCase().trim()),i=e.type.toLowerCase(),a=e.name.toLowerCase();return!!r.find(d=>d.endsWith("/*")?i.split("/")[0]===d.split("/")[0]:d.startsWith(".")?a.endsWith(d):d==i)}rejectFile(e,o,r){const i=o;i.reason=r,e.push(i)}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})(),T=(()=>{class n{constructor(e){this.service=e,this.change=new t.vpe,this.accept="*",this._disabled=!1,this._multiple=!0,this._maxFileSize=void 0,this._expandable=!1,this._disableClick=!1,this._processDirectoryDrop=!1,this._isHovered=!1}get _hasPreviews(){return!!this._previewChildren.length}get disabled(){return this._disabled}set disabled(e){this._disabled=g(e),this._isHovered&&(this._isHovered=!1)}get multiple(){return this._multiple}set multiple(e){this._multiple=g(e)}get maxFileSize(){return this._maxFileSize}set maxFileSize(e){this._maxFileSize=function k(n){return isNaN(parseFloat(n))||isNaN(Number(n))?null:Number(n)}(e)}get expandable(){return this._expandable}set expandable(e){this._expandable=g(e)}get disableClick(){return this._disableClick}set disableClick(e){this._disableClick=g(e)}get processDirectoryDrop(){return this._processDirectoryDrop}set processDirectoryDrop(e){this._processDirectoryDrop=g(e)}_onClick(){this.disableClick||this.showFileSelector()}_onDragOver(e){this.disabled||(this.preventDefault(e),this._isHovered=!0)}_onDragLeave(){this._isHovered=!1}_onDrop(e){if(!this.disabled)if(this.preventDefault(e),this._isHovered=!1,this.processDirectoryDrop&&DataTransferItem.prototype.webkitGetAsEntry){const o=e.dataTransfer.items;if(o.length>0){const r=[],i=[];for(let l=0;l<o.length;l++){const d=o[l].webkitGetAsEntry();d.isFile?r.push(e.dataTransfer.files[l]):d.isDirectory&&i.push(d)}const a=new DataTransfer;if(r.forEach(l=>{a.items.add(l)}),!i.length&&a.items.length&&this.handleFileDrop(a.files),i.length){const l=[];for(const d of i)l.push(this.extractFilesFromDirectory(d));Promise.all(l).then(d=>{d.reduce((p,c)=>[...p,...c]).forEach(p=>{a.items.add(p)}),this.handleFileDrop(a.files)})}}}else this.handleFileDrop(e.dataTransfer.files)}extractFilesFromDirectory(e){function o(i){return r.apply(this,arguments)}function r(){return(r=(0,_.Z)(function*(i){try{return yield new Promise((a,l)=>i.file(a,l))}catch(a){console.log("Error converting a fileEntry to a File: ",a)}})).apply(this,arguments)}return new Promise((i,a)=>{const l=[],d=e.createReader(),p=()=>{d.readEntries(function(){var c=(0,_.Z)(function*(h){if(h.length){const j=h.filter(v=>v.isFile);for(const v of j){const B=yield o(v);l.push(B)}p()}else i(l)});return function(h){return c.apply(this,arguments)}}())};p()})}showFileSelector(){this.disabled||this._fileInput.nativeElement.click()}_onFilesSelected(e){this.handleFileDrop(e.target.files),this._fileInput.nativeElement.value="",this.preventDefault(e)}handleFileDrop(e){const o=this.service.parseFileList(e,this.accept,this.maxFileSize,this.multiple);this.change.next({addedFiles:o.addedFiles,rejectedFiles:o.rejectedFiles,source:this})}preventDefault(e){e.preventDefault(),e.stopPropagation()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(b,2))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ngx-dropzone"],["","ngx-dropzone",""]],contentQueries:function(e,o,r){if(1&e&&t.Suo(r,x,5),2&e){let i;t.iGM(i=t.CRH())&&(o._previewChildren=i)}},viewQuery:function(e,o){if(1&e&&t.Gf(w,7),2&e){let r;t.iGM(r=t.CRH())&&(o._fileInput=r.first)}},hostVars:8,hostBindings:function(e,o){1&e&&t.NdJ("click",function(){return o._onClick()})("dragover",function(i){return o._onDragOver(i)})("dragleave",function(){return o._onDragLeave()})("drop",function(i){return o._onDrop(i)}),2&e&&t.ekj("ngx-dz-disabled",o.disabled)("expandable",o.expandable)("unclickable",o.disableClick)("ngx-dz-hovered",o._isHovered)},inputs:{accept:"accept",disabled:"disabled",multiple:"multiple",maxFileSize:"maxFileSize",expandable:"expandable",disableClick:"disableClick",processDirectoryDrop:"processDirectoryDrop",id:"id",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],ariaDescribedBy:["aria-describedby","ariaDescribedBy"]},outputs:{change:"change"},features:[t._Bn([b])],ngContentSelectors:M,decls:5,vars:8,consts:[["type","file",3,"id","multiple","accept","disabled","change"],["fileInput",""],[4,"ngIf"]],template:function(e,o){1&e&&(t.F$t(N),t.TgZ(0,"input",0,1),t.NdJ("change",function(i){return o._onFilesSelected(i)}),t.qZA(),t.YNc(2,I,1,0,"ng-content",2),t.Hsn(3),t.Hsn(4,1)),2&e&&(t.Q6J("id",o.id)("multiple",o.multiple)("accept",o.accept)("disabled",o.disabled),t.uIk("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledby)("aria-describedby",o.ariaDescribedBy),t.xp6(2),t.Q6J("ngIf",!o._hasPreviews))},dependencies:[u.O5],styles:["[_nghost-%COMP%]{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}.ngx-dz-hovered[_nghost-%COMP%]{border-style:solid}.ngx-dz-disabled[_nghost-%COMP%]{opacity:.5;cursor:no-drop;pointer-events:none}.expandable[_nghost-%COMP%]{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}.unclickable[_nghost-%COMP%]{cursor:default}[_nghost-%COMP%]     ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus +   ngx-dropzone-label{outline:1px dotted #000;outline:-webkit-focus-ring-color auto 5px}"]}),n})(),S=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[u.ez]]}),n})()}}]);