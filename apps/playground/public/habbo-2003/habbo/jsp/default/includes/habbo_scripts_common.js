var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function openClient()
{
	var client = window.open("", "client", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,dependent,width=740,height=560");
	client.focus();
}

function openPopup(width,height,name)
{
	if (!width) width = 740;
	if (!height) height = 560;
	if (!name) name = "habbopopup";
	
	client = window.open("", name, "width="+width+",height="+height);
}


}
/*
     FILE ARCHIVED ON 11:16:50 Oct 05, 2003 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:35:44 Aug 27, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 249.462
  exclusion.robots: 0.23
  exclusion.robots.policy: 0.218
  cdx.remote: 0.072
  esindex: 0.01
  LoadShardBlock: 188.808 (3)
  PetaboxLoader3.datanode: 197.719 (4)
  load_resource: 81.873
  PetaboxLoader3.resolve: 35.558
*/