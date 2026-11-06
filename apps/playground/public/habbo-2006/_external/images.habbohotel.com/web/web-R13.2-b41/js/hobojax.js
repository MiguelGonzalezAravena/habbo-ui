var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function hijaxLinks(componentId, action, targetId) {
	var component = $(componentId);
	var target = (targetId) ? $(targetId) : component;
	var links = component.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
	    if (Element.hasClassName(link, "hijaxTarget")) {
			link.onclick = function() {
				new Ajax.Updater(target, action + getParameters(this), {
					onComplete : function() {
					   	hijaxLinks(componentId, action, targetId);
					   },
					evalScripts : true
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
				},
				evalScripts : true				
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
     FILE ARCHIVED ON 11:40:19 Jul 03, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:14:15 Mar 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.266
  exclusion.robots: 0.136
  exclusion.robots.policy: 0.123
  esindex: 0.009
  cdx.remote: 83.545
  LoadShardBlock: 124.215 (3)
  PetaboxLoader3.datanode: 148.047 (4)
  load_resource: 28.006
*/