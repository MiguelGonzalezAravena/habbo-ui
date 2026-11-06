var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function hijaxLinks(componentId, action) {
	var component = $(componentId);
	var links = component.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
	    if (link.className.match(new RegExp("(^|\\s)hijaxTarget(\\s|$)"))) {
			link.onclick = function() {
				new Ajax.Updater(componentId, action + getParameters(this), {
					onComplete : function() {
					   	hijaxLinks(componentId, action);
					   }
				});
				return false;
			}			
		}
	}
}

function getParameters(obj) {
	if (obj.name) {
		return obj.name;
	} else {
		return "";
	}
}

function hijaxForms(componentId, action, jump) {
	var component = $(componentId);
	
	var forms = component.getElementsByTagName('form');
	for (var i = 0; i < forms.length; i++) {
		var f = forms[i];
		f.onsubmit = function() {
			disableSubmit(this);
			new Ajax.Updater(componentId, action, {
				postBody: cleanup(Form.serialize(this), componentId),
				onComplete : function() {
					hijaxForms(componentId, action);
					if (jump) location.hash = componentId;
				}
			});
			return false;
		}		
	}
}

function disableSubmit(form) {
	var elements = Form.getInputs(form, "submit");
	for (var i = 0; i < elements.length; i++) {
		elements[i].disabled = 'true';
	}
}

function cleanup(query, componentId) {	
	var params = query.replace("&amp;", "&").split("&");
    var queryComponents = new Array();
    queryComponents.push("componentId=" + componentId);
	for (var i = 0; i < params.length; i++) {
		var keyValue = params[i].split('=');
		var newKey = keyValue[0].replace(componentId + "_", "");
		if (newKey != keyValue[0]) {
			queryComponents.push(newKey + "=" + keyValue[1]);	
		}
	}
	return queryComponents.join('&');
}
	
}

/*
     FILE ARCHIVED ON 20:40:47 Dec 05, 2006 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:12:10 Mar 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.696
  exclusion.robots: 0.082
  exclusion.robots.policy: 0.07
  esindex: 0.012
  cdx.remote: 6.792
  LoadShardBlock: 72.36 (3)
  PetaboxLoader3.datanode: 100.846 (4)
  load_resource: 114.408
  PetaboxLoader3.resolve: 74.063
*/