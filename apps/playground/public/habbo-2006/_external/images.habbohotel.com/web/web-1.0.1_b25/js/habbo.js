var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function openHabbo(link) {
    var openedHabbo = window.open(link.href, (link.target || "_blank"), "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=740,height=589");
    
    if (openedHabbo && openedHabbo.focus) {
        openedHabbo.focus();
        return false;
    } else {
        return true;
    }
}

var currentPromo = 1;
function showPromo(el, num) {
	if (num != currentPromo) {
		var i = 1;
		$A(el.parentNode.parentNode.childNodes).each(function(node) {
			if (node.nodeName == "LI") {
				if (i == num) node.firstChild.className = "selected";
				else node.firstChild.className = "";
				i++;
			}
		});
		
		$("promobody-" + currentPromo).style.display = "none";
		$("promobody-" + num).style.display = "block";
		
		currentPromo = num;
	}
}

}

/*
     FILE ARCHIVED ON 03:31:34 May 30, 2006 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:37:40 Mar 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.793
  exclusion.robots: 0.075
  exclusion.robots.policy: 0.063
  esindex: 0.011
  cdx.remote: 24.03
  LoadShardBlock: 96.012 (3)
  PetaboxLoader3.datanode: 68.812 (4)
  load_resource: 55.846
  PetaboxLoader3.resolve: 42.762
*/