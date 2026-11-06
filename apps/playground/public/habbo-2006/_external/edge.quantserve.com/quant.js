var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
_qacct='';_qmeta='';
function _qcdst(){
 if(_qctzoff(0)!=_qctzoff(6))return 1;return 0;
}
function _qctzoff(m){
 var d1=new Date(2000,m,1,0,0,0,0);
 var t=d1.toGMTString();
 var d3=new Date(t.substring(0,t.lastIndexOf(" ")-1));
 return d1-d3;
}
function _qceuc(s){
 if (typeof(encodeURIComponent) == 'function') { return encodeURIComponent(s); }
 else { return escape(s); }
}
function _qcrnd(){return Math.round(Math.random()*2147483647);}
function _qvoid(){return;}
function _qcgc(n){
 var v='';
 var c=document.cookie;
 var i = c.indexOf(n+"=");
 var len = i + n.length + 1;
 if(i > -1){
  var end = c.indexOf(";", len);
  if (end < 0){end = c.length;}
  v=c.substring(len,end);
 }
 return v;
}
function _qcdomain(){
 var d=document.domain;
 if(d.substring(0,4)=="www."){d=d.substring(4,d.length);}
 var a=d.split(".");var len=a.length;
 if(len<3){return d;}
 var e=a[len-1];
 if(e.length<3){return d;}
 d=a[len-2]+"."+a[len-1];
 return d;
}
function _qcsc(dc){
 var s="";var u=document;var d=_qcdomain();var a=_qcgc("__qca");
 if(a.length > 0){s+=";fpan=0;fpa="+a;}
 else{
  u.cookie="__qca="+dc+"; expires=Sun, 18 Jan 2038 00:00:00 GMT; path=/; domain="+d;
  a=_qcgc("__qca");
  if(a.length > 0){s+=";fpan=1;fpa="+dc;}
  else{s+=";fpan=u;fpa=";}
 }
 var b=_qcgc("__qcb");
 if(b.length > 0){s+=";fpbn=0;fpb="+b;}
 else{b=_qcrnd();
  u.cookie="__qcb="+b+"; path=/; domain="+d;
  b=_qcgc("__qcb");
  if(b.length > 0){s+=";fpbn=1;fpb="+b;}
  else{s+=";fpbn=u;fpb=";}
 }
 return s;
}
function quantserve(){
 var r=_qcrnd();
 var ce=(navigator.cookieEnabled)?"1":"0";
 var je="u";if(typeof navigator.javaEnabled != 'undefined')je=(navigator.javaEnabled())?"1":"0";
 var sr='';
 if(self.screen){sr=screen.width+"x"+screen.height+"x"+screen.colorDepth;}
 var url='',ref='';
 var d=new Date();
 var dst=_qcdst();
 var dc="45b47004-7792a-cbe7a-617d1";
 var fp=_qcsc(dc);
 if(window.location && window.location.href) url=_qceuc(window.location.href);
 if(window.document && window.document.referrer) ref=_qceuc(window.document.referrer);
 var img=new Image(1,1);
 img.src="https://web.archive.org/web/20070122080420/http://pixel.quantserve.com/pixel"+';r='+r+fp+';url='+url+';ref='+ref+';ce='+ce+';je='+je+';sr='+sr+';dc='+dc+';dst='+dst+';et='+d.getTime()+';tzo='+d.getTimezoneOffset()+';m='+_qmeta+';a='+_qacct;
 img.onload=function() {_qvoid();}
}

}

/*
     FILE ARCHIVED ON 08:04:20 Jan 22, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:28:04 Mar 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.866
  exclusion.robots: 0.063
  exclusion.robots.policy: 0.049
  esindex: 0.01
  cdx.remote: 414.444
  LoadShardBlock: 2030.087 (6)
  PetaboxLoader3.datanode: 260.794 (7)
  PetaboxLoader3.resolve: 1097.757 (4)
  load_resource: 169.872
*/