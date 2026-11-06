var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

if (window.Prototype) {
	// patch html comments and evalScripts
	Prototype.ScriptFragment = '(?:<script.*?>\\s*(?:<!--)*)((\n|\r|.)*?)(?:<\/script>)';

	// from <http://www.vivabit.com/bollocks/2006/06/21/a-dom-ready-extension-for-prototype>
	Object.extend(Event, {
		_domReady : function() {
			if (arguments.callee.done) return;
			arguments.callee.done = true;
			if (this._timer) clearInterval(this._timer);
			this._readyCallbacks.each(function(f) { f() });
			this._readyCallbacks = null;
		},
		onDOMReady : function(f) {
			if (!this._readyCallbacks) {
				var domReady = this._domReady.bind(this);
				if (document.addEventListener) document.addEventListener("DOMContentLoaded", domReady, false);
				/*@cc_on @*/
				/*@if (@_win32)
					var proto = "javascript:void(0)";
					if (location.protocol == "https:") proto = "//0";
					document.write("<script id=__ie_onload defer src=" + proto + "><\/script>");
					document.getElementById("__ie_onload").onreadystatechange = function() {
						if (this.readyState == "complete") domReady();
					};
				/*@end @*/
				if (/WebKit/i.test(navigator.userAgent)) {
					this._timer = setInterval(function() {
						if (/loaded|complete/.test(document.readyState)) domReady();
					}, 10);
				}
				Event.observe(window, 'load', domReady);
				Event._readyCallbacks =  [];
			}
			Event._readyCallbacks.push(f);
		}
	});

	Ajax.Responders.register({
	  onCreate: function(request, transport) {
	  	var sc = readCookie("JSESSIONID");
	  	if (sc) {
		    if (typeof request.options.requestHeaders == 'object') {
		      request.options.requestHeaders["X-App-Key"] = sc;
		    } else {
		      request.options.requestHeaders = { "X-App-Key" : sc };
		    }
	    }
	  }
	});
}

var openedHabbo;

function openHabbo(link) {
    openedHabbo = _openHabboWindow(link.href, (link.target || "_blank"));
    if (_isHabboPopupOpen()) { openedHabbo.focus(); return false; } else { return true; }
}

function openOrFocusHabbo(link) {
	var targetUrl = (link.href ? link.href : link)
	var win = openEmptyHabboWindow("habboPopup");
	var isHabboClient = false;
	try { isHabboClient = (win.habboClient && win.document.habboLoggedIn == true); } catch(error) {}
	if (isHabboClient) {
		win.focus();
		if (win.updateHabboCount) {
			win.updateHabboCount($('topbar-count').innerHTML);
		}
	} else {
		win.location.href=targetUrl;
		win.focus();
	}
}

function _openHabboWindow(url, target) { return window.open(url, target, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=740,height=597"); }
function openEmptyHabboWindow(target) { return _openHabboWindow('', target); }

function _isHabboPopupOpen() { return openedHabbo && !openedHabbo.closed && openedHabbo.focus; }

function roomForward(link, roomId, roomType, loggedIn) {
	var isHabboClient = false;
	try { isHabboClient = window.habboClient; } catch(error) {}
	if (isHabboClient) {
		window.location.href=link.href;
		return;
	}

	if (loggedIn) {
	    new Ajax.Request(habboReqPath + "/components/roomNavigation",
	    {
	        method: "get",
	        parameters: "roomId=" + roomId + "&roomType=" + roomType + "&move=true"

	    }, false);
    }

    openOrFocusHabbo(link);
}

function resizeWin() {
	if (!document.all || screen.height > 600) {
		if (document.all) {
			document.all["client-topbar"].style.display = "block";
		} else if (document.getElementById) {
			document.getElementById("client-topbar").style.display = "block";
		}
	}
	if (window.opener != null) {
		var pageSize = getPageSize();
		if (document.all) {
			if (typeof document.body.style.maxHeight == "undefined") { pageSize[0] = 720; pageSize[1] += 20; } // IE 6
			else { pageSize[0] = 750; pageSize[1] += 20; } // IE 7
		}
		window.resizeTo(pageSize[0], pageSize[1]);
		window.setTimeout(function() {
			var newSize = getPageSize();
			window.resizeBy(newSize[0]-newSize[2], newSize[1]-newSize[3]);
		}, 500);
	}
}

var currentPromo = 0;
function showPromo(num) {
	if (num != currentPromo) {
		$("promoimage").innerHTML = promoPages[num].image;
		$("promotext-content").innerHTML = promoPages[num].text;
		var listEl = $("promolinks-list");
		$A(listEl.childNodes).each(function(el) {
			el.parentNode.removeChild(el);
		});
		promoPages[num].links.each(function(link) {
			listEl.appendChild(document.createElement("li")).innerHTML = link;
		});

		var i = 0;
		$A($("promoheader-selectors").childNodes).each(function(node) {
			if (node.nodeName == "LI") {
				if (i == num) node.firstChild.className = "selected";
				else node.firstChild.className = "";
				i++;
			}
		});

		currentPromo = num;
	}
}


function validatorAddError(element, name, message, errorBoxId) {
	var errorBoxId = errorBoxId || "process-errors";
	var errorcontent = $(errorBoxId + "-content");
	errorcontent.appendChild(document.createTextNode(message));
	errorcontent.appendChild(document.createElement("br"));
	$(errorBoxId).style.display = "block";
}

function validatorBeforeSubmit(errorBoxId) {
	var errorBoxId = errorBoxId || "process-errors";
	$A($(errorBoxId + "-content").childNodes).each(function(el) { el.parentNode.removeChild(el); });
}

// for registration wizard
var backClicked = false;

function showOverlay(clickCallback, progressText) {
	var pageSize = getPageSize();
	var overlay = $("overlay");
	overlay.style.display = "block";
	overlay.style.height = pageSize[1] + "px";
	try {
		var topWidth = Element.getDimensions("top").width;
		if (topWidth > pageSize[2]) { overlay.style.minWidth = topWidth + "px"; }
	} catch(ex) {}
	overlay.style.zIndex = "9000";

	if (progressText) {
		var progress = overlay.parentNode.insertBefore(Builder.node("div", { id:"overlay_progress" }, [
			Builder.node("p", [ Builder.node("img", { src:habboStaticFilePath+"/images/progress_habbos.gif", alt:progressText }) ]),
			Builder.node("p", progressText)
		]), overlay.nextSibling);
		var dim = Element.getDimensions(progress);
		var x = 0, y = 0;

		x = Math.round(pageSize[2] / 2) - Math.round(dim.width / 2);
		if (x < 0) { x = 0; }
		y = getViewportScrollY() + (Math.round(pageSize[3] / 2) - Math.round(dim.height / 2));
		if (y < 0) { y = 0; }

		progress.style.left = x + "px";
		progress.style.top = y + "px";
	}

	if (clickCallback) {
		Event.observe($("overlay"), "click", function(e) { clickCallback(); }, false);
		if (progressText) { Event.observe($("overlay_progress"), "click", function(e) { clickCallback(); }, false); }
	}
}

function hideOverlay() {
	if ($("overlay_progress")) { Element.remove($("overlay_progress")); }
	var overlay = $("overlay");
	overlay.style.zIndex = "9000";
	overlay.style.display = "none";
}

function moveOverlay(zIndex) {
	$("overlay").style.zIndex = zIndex;
	if ($("overlay_progress")) { $("overlay_progress").style.zIndex = zIndex; }
}

function hideOverlayIfMacFirefox() {
	/* detecting firefox on mac, hiding the overlay to tackle render bug */
	var c_os = navigator.platform;
	var c_ua = navigator.appName;
	if ((c_os=="Mac" || c_os=="MacIntel" || c_os=="MacPPC") && (c_ua=="Netscape" || c_ua=="Mozilla" || c_ua=="Firefox")) {
		hideOverlay();
	}
}

// From Lightbox by Lokesh Dhakar - http://www.huddletogether.com
// Core code from - quirksmode.org
// Edit for Firefox by pHaez
function getPageSize(){

	var xScroll, yScroll;

	if (window.innerHeight && window.scrollMaxY) {
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}

	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
	return arrayPageSize;
}

function getQueryParamValue(searchKey) {
	if (window.location.search) {
		var query = window.location.search.substring(1);
		var params = query.split('&');
		for (var i = 0; i < params.length; i++) {
			var pos = params[i].indexOf('=');
			if (pos > 0) {
				var key = params[i].substring(0, pos);
				if (key == searchKey) { return params[i].substring(pos + 1); }
			}
		}
	}
	return null;
}

function ensureOpenerIsLoggedOut() {
	try {
	if (window.opener != null && window.opener.document.habboLoggedIn != null) {
		if (window.opener.document.habboLoggedIn == true) {
			window.opener.location.reload();
		}
	}
	} catch(error) {}
}

function ensureOpenerIsLoggedIn() {
	try {
	if (window.opener != null) {
		if(window.opener.document.logoutPage != null && window.opener.document.logoutPage == true) {
			window.opener.location.href="/";
		} else
		if(window.opener.document.habboLoggedIn != null && window.opener.document.habboLoggedIn == false) {
			window.opener.location.reload();
		}
	}
	} catch(error) {}
}

function clearOpener() {
	if (window.opener && window.opener.openedHabbo) { window.opener.openedHabbo = null; }
}

function closePurchase(e) {
	if (e) Event.stop(e);
	Element.remove("purchase_dialog");
	hideOverlay();
}

function showPurchaseResult(productCode) {
    $("single-confirmation-button-area").innerHTML = getProgressNode();
    new Ajax.Request(
		habboReqPath + "/furnipurchase/purchase_ajax",
		{ method: "post", parameters: "product="+encodeURIComponent(productCode)+"&webwork.token.name=webwork.token&webwork.token"+"="+document.getElementsByName("webwork.token").item(0).value, onComplete: function(req, json) {
   			if ($("purchase_dialog")) Element.remove("purchase_dialog");
			moveOverlay("92");
            if (!$("purchase_result")) {
                var resultDialog = createDialog("purchase_result", "", "9003", 0, -1000);
			    appendDialogBody(resultDialog, req.responseText, true);
			    moveDialogToCenter(resultDialog);
            }
		} }
	);
}

function closePurchaseResult() {
   	if ($("purchase_result")) Element.remove("purchase_result");
    if ($("purchase_dialog")) Element.remove("purchase_dialog");
    if ($("group_purchase_form")) Element.remove("group_purchase_form");
    hideOverlay();

   	// update credits tab
   	creditsUpdated = false;
}

var currentTab = "myhabbo";
var timer = null;
function switchTab(tabName) {
	if (timer) { window.clearTimeout(timer); }
	if (tabName != currentTab) {
		$(currentTab).className = "";
		$(currentTab + "-content").className = "tabmenu-inner";
		$(tabName).className = "selected";
		$(tabName + "-content").className = "tabmenu-inner selected"
		currentTab = tabName;
		return true;
	}
	return false;
}
function fadeTab(tabName) { timer = window.setTimeout("switchTab('" + tabName + "')", 1500); }
function lockCurrentTab() { if (timer) { window.clearTimeout(timer); } }

var creditsUpdated = false;
var creditsUpdateOn = false;
function updateCredits() {
	if (!creditsUpdated && !creditsUpdateOn) {
		creditsUpdateOn = true;
		new Ajax.Updater("credits-status", habboReqPath + "/topbar/credits", { onComplete: function() { creditsUpdateOn = false; }, evalScripts: true });
		creditsUpdated = true;
	}
}
var habboClubUpdated = false;
var habboClubUpdateOn = false;
function updateHabboClub() {
	if (!habboClubUpdated && !habboClubUpdateOn) {
		habboClubUpdateOn = true;
		new Ajax.Updater("habboclub-status", habboReqPath + "/topbar/habboclub", { onComplete: function() { habboClubUpdateOn = false; }, evalScripts : true });
		habboClubUpdated = true;
	}
}

function updateHabboCreditAmounts(newAmount) {
	var elements = document.getElementsByClassName('habbocredits');
	elements.each(function(element) {
		element.update(newAmount);
	});
}

function createDialog(dialogId, header, dialogZIndex, dialogLeft, dialogTop, exitCallback) {
	if (!dialogId) return;
	var overlay = $("overlay");
	var headerBar = [Builder.node("div", [ Builder.node("h3", [ Builder.node("span", header) ]) ])];
	if (exitCallback) {
		var exitButton = Builder.node("a", {href:"#", className:"dialog-grey-exit"}, [
			Builder.node("img", {src:habboStaticFilePath+"/images/dialogs/grey-exit.gif", width:12, height:12, alt:""})
		]);
		Event.observe(exitButton, "click", exitCallback, false);
		headerBar.push(exitButton);
	}
	var dialog = overlay.parentNode.insertBefore(Builder.node("div", {id:dialogId, className:"dialog-grey"}, [
		Builder.node("div", {className:"dialog-grey-top dialog-grey-handle"}, headerBar),
		Builder.node("div", {className:"dialog-grey-content"}, [
			Builder.node("div", {id:dialogId+"-body", className:"dialog-grey-body"}, [ Builder.node("div", {className:"clear"}) ])
		]),
		Builder.node("div", {className:"dialog-grey-bottom"}, [ Builder.node("div") ])
	]), overlay.nextSibling);
	dialog.style.zIndex = (dialogZIndex || 9001);
	dialog.style.left = (dialogLeft || -1000) + "px";
	dialog.style.top = (dialogTop || 0) + "px";
	return dialog;
}

function showInfoDialog(dialogId, message, buttonText, buttonOnClick){
    showOverlay();
    var dialog = createDialog(dialogId, "", "9003");
    var link = Builder.node("a", { href:"#", className:"colorlink noarrow dialogbutton" }, [ Builder.node("span", buttonText) ]);
    appendDialogBody(dialog, Builder.node("p", {id:dialogId+"content"}));
    $(dialogId+"content").innerHTML = message;
    appendDialogBody(dialog, Builder.node("p", [ link ]));
    if(buttonOnClick == null){
      Event.observe(link, "click", function(e) { Event.stop(e); Element.hide($(dialogId)); hideOverlay();}, false);
    }
    else{
        Event.observe(link, "click", buttonOnClick, false);
    }
  
    moveOverlay("9002");
	moveDialogToCenter(dialog);
}

function appendDialogBody(dialog, bodyEl, useInnerHTML) {
	var el = $(dialog);
	if (el) { var el2 = $(el.id + "-body"); (useInnerHTML) ? el2.innerHTML += bodyEl : el2.insertBefore(bodyEl, el2.lastChild); if (bodyEl.innerHTML) bodyEl.innerHTML.evalScripts(); }
}

function setDialogBody(dialog, bodyEl) {
	var el = $(dialog);
	if (el) {
		var el2 = $(el.id + "-body");
		el2.innerHTML = bodyEl;
	}
}

function moveDialogToView(dialog, e, coordinates) {
	var dim = Element.getDimensions(dialog);
	var pageSize = getPageSize();
	var x = 0, y = 0;

	if (coordinates) {
		x = coordinates.x;
		y = coordinates.y;
	} else if (e) {
		x = Event.pointerX(e) - 35;
		y = Event.pointerY(e) - 15;
	}

	if (x + dim.width > pageSize[2]) { x = pageSize[2] - dim.width; }
	if (x < 0) { x = 0; }
	if (y + dim.height > pageSize[3]) { y = pageSize[3] - dim.height; }
	if (y < 0) { y = 0; }

	dialog.style.left = x + "px";
	dialog.style.top = y + "px";
}

function moveDialogToCenter(dialog) {
	var topPos = Position.cumulativeOffset($("top"));

	var dim = Element.getDimensions(dialog);
	var pageSize = getPageSize();
	var x = 0, y = 0;

	x = Math.round(pageSize[2] / 2) - Math.round(dim.width / 2);
	if ($("ad_sidebar")) {
		var adPos = Position.cumulativeOffset($("ad_sidebar"));
		if (x + dim.width > adPos[0]) { x = adPos[0] - dim.width; }
	}
	if (x < 0) { x = 0; }
	y = getViewportScrollY() + 80;
	if (y + dim.height > pageSize[1]) { y = pageSize[1] - dim.height; }
	if (y < topPos[1]) { y = topPos[1] + 20; }

	dialog.style.left = x + "px";
	dialog.style.top = y + "px";
}

function moveDivToCenterOfDiv(innerDiv, outerDiv) {
	var innerDim = Element.getDimensions(innerDiv);
	var outerDim = Element.getDimensions(outerDiv);
	var outerPos = Position.cumulativeOffset(outerDiv);

	var x = 0, y = 0;
	x = outerPos[0] + Math.round((outerDim.width - innerDim.width) / 2);
	if (x < 0) { x = 0; }
	y = outerPos[1] + Math.round((outerDim.height - innerDim.height) / 2);
	if (y < 0) { y = 0; }

	innerDiv.style.left = x + "px";
	innerDiv.style.top = y + "px";
}

function getViewportScrollY() {
	var scrollY = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollY = document.documentElement.scrollTop;
	}
	else if (document.body && document.body.scrollTop) {
		scrollY = document.body.scrollTop;
	}
	else if (window.pageYOffset) {
		scrollY = window.pageYOffset;
	}
	else if (window.scrollY) {
		scrollY = window.scrollY;
	}
	return scrollY;
};

function getProgressNode() {
	var div = Builder.node("div", { className:"progressbar" }, [ Builder.node("img", { src:habboStaticFilePath+"/images/progress_bubbles.gif", width:"29", height:"6", alt:"" }) ]);
	div.style.textAlign = "center";
	return Builder.node("p", [ div ]).innerHTML;
}

if (window.Prototype) {
	var imgDo = false, origImg = false, newImg = false;
	Event.observe(window, "load", function() {
		if (document.habboLoggedIn) { var el = $("myimage"); if (el) {
			Event.observe(document, "keydown", function(e) { if (e.keyCode == Event.KEY_UP) { imgDo = true; } }, false);
			Event.observe(document, "keyup", function(e) { if (imgDo) { imgDo = false; } }, false);
			Event.observe(el, "click", function(e) { if (imgDo) { if (!origImg) { origImg = el.src; if (!newImg) { new Ajax.Request(habboReqPath + "/topbar/myimage", { onSuccess: function(t) { newImg = t.responseText; $("myimage").src = newImg; } }); } else { el.src = newImg; } } else { el.src = origImg; origImg = false; }} }, false);
		}}
	}, false);
}

function addClientUnloadHook() {
	if (habboClient == true && determineSWVersion() != "undefined") {
		Event.observe(window, "unload", function () {
			new Ajax.Request(habboReqPath + "/account/unloadclient", { asynchronous : false });
		});
	}
}

function determineSWVersion () {
	if (navigator.mimeTypes && navigator.mimeTypes["application/x-director"] && navigator.mimeTypes["application/x-director"].enabledPlugin) {
		if (navigator.plugins && navigator.plugins["Shockwave for Director"] && (tVersionIndex = navigator.plugins["Shockwave for Director"].description.indexOf(".")) != - 1) {
			return navigator.plugins["Shockwave for Director"].description.substring(tVersionIndex-2, tVersionIndex+2);
		}
	} else  {
		try {
			var swControl = new ActiveXObject('SWCtl.SWCtl')
			if (swControl) {
				return swControl.ShockwaveVersion("");
			}
		} catch(e) {}
	}
	return "undefined";
}

function limitTextarea(id, maxLength, limitCallback) {
	new Form.Element.Observer($(id), .1, function(e) {
		var f = $(id);
		if (limitCallback) {
			limitCallback(f.value.length >= maxLength);
		}
		if (f.value.length > maxLength) {
			f.value = f.value.substring(0, maxLength);
		}
	});
}

/* habbo club subscription */
function closeSubscription(e) {
	if (e) {
		Event.stop(e);
	}
	if($("subscription_dialog")) {
		Element.remove("subscription_dialog");
	}
	if($("subscription_result")) {
		Element.remove("subscription_result");
	}
	hideOverlay();
}

function showSubscriptionResult(optionNumber,res_dialog_header) {
	new Ajax.Request(
		habboReqPath + "/habboclub/habboclub_subscribe",
		{ method: "post", parameters: "optionNumber="+encodeURIComponent(optionNumber), onComplete: function(req, json) {
   			if ($("subscription_dialog")) Element.remove("subscription_dialog");
			var resultDialog = createDialog("subscription_result", res_dialog_header, "9003", 0, -1000, closeSubscription);
			appendDialogBody(resultDialog, req.responseText, true);
			moveDialogToCenter(resultDialog);
		} }
	);
	Element.remove("hc_confirm_box");
}

function closeSubscriptionResult() {
   	if ($("subscription_dialog")) {
   		Element.remove("subscription_dialog");
   		hideOverlay();
   	}
   	if ($("subscription_result")) {
   		Element.remove("subscription_result");
   		hideOverlay();
		new Ajax.Updater($("hc_ajax_content"), habboReqPath + "/habboclub/habboclub_meter_update", {asynchronous:true});
   	}
}

function closeSubscriptionError() {
	Element.remove("subscription_result");
	hideOverlay();
}
/* \habbo club subscription */

var HabboCounter = {
	init : function(refreshFrequency) {
		this.refreshFrequency = refreshFrequency;
		this.start();
		this.lastValue = "0";
	},

	start : function() {
		new PeriodicalExecuter(this.onTimerEvent.bind(this), this.refreshFrequency);
	},

	onTimerEvent : function() {
		new Ajax.Request("/components/updateHabboCount", {
			onSuccess: function(response, obj) {
				if (obj && typeof obj.habboCountText != "undefined" && this.lastValue != obj.habboCountText) {
					new Effect.Fade('habboCountUpdateTarget', { duration: 0.5, afterFinish : function() {
						Element.update('habboCountUpdateTarget', obj.habboCountText);
						new Effect.Appear('habboCountUpdateTarget', { duration: 0.5 });
					}});
					this.lastValue = obj.habboCountText;
				}
			}
		});
	}

}

function showGroupPurchaseResult(productCode, name, description, dialog_title) {
    $("group-confirmation-button-area").innerHTML = getProgressNode();
    new Ajax.Request(
		habboReqPath + "/grouppurchase/purchase_ajax",
		{ method: "post", parameters: "product="+encodeURIComponent(productCode)+"&name="+encodeURIComponent(name)+"&description="+encodeURIComponent(description)+"&webwork.token.name=webwork.token&webwork.token"+"="+document.getElementsByName("webwork.token").item(0).value, onComplete: function(req, json) {
   			if ($("group_purchase_form")) { Element.remove("group_purchase_form");}
            if ($("group_purchase_confirmation")) Element.remove("group_purchase_confirmation");
            if (!$("group_purchase_result")) {
                var resultDialog = createDialog("group_purchase_result", dialog_title, "9003", 0, -1000, closeGroupPurchase);
			    appendDialogBody(resultDialog, req.responseText, true);
			    moveDialogToCenter(resultDialog);
            }
		} }
	);
}

function showGroupPurchaseConfirmation(productCode, dialog_title) {
    new Ajax.Request(
		habboReqPath + "/grouppurchase/purchase_confirmation",
		{ method: "post", parameters: "product="+encodeURIComponent(productCode)+"&name="+encodeURIComponent($("group_name").value)+"&description="+encodeURIComponent($("group_description").value),
            onComplete: function(req) {
                var groupPurchaseDialog = $('group_purchase_form');
                if (req.responseText.indexOf('purchase-group-form-id') < 0) {
                    moveOverlay('9002');
                    groupPurchaseDialog = createDialog("group_purchase_confirmation", dialog_title, "9003", 0, -1000, cancelGroupPurchase);
                }
                setDialogBody(groupPurchaseDialog, req.responseText);
                moveDialogToCenter(groupPurchaseDialog);
            }

        }
	);
}

function closeGroupPurchase() {
    if ($("group_purchase_result")) {Element.remove("group_purchase_result");}
    if ($("group_purchase_confirmation")) Element.remove("group_purchase_confirmation");
    moveOverlay('9000');
}

function cancelGroupPurchase() {
   	closeGroupPurchase();
    if ($("group_purchase_form")) Element.remove("group_purchase_form");
    hideOverlay();
}

function validateGroupElements(fieldId, maxLength, message) {
    var groupElement = $(fieldId);
    if (groupElement.value.length >= maxLength) {
       groupElement.value = groupElement.value.substring(0, maxLength);
       $(fieldId+"_message_error").innerHTML = message;
       $(fieldId+"_message_error").style.display = "block";
    } else {
       $(fieldId+"_message_error").innerHTML = "";
       $(fieldId+"_message_error").style.display = "none";
    }

    if ($(fieldId+"-counter")) {
        var charatersLeft = maxLength - groupElement.value.length;
        $(fieldId+"-counter").value = charatersLeft;
    }
}

/* Pocket and Mobile Highscores token functionality */

function closeAuthTokenDialog() {
	if ($("auth-token-dialog")) Element.remove("auth-token-dialog");
    hideOverlay();
}

function confirmPhoneNumber() {
	var mobile = $F('msisdn_value');
	new Ajax.Updater("auth-token-dialog-body",
		habboReqPath + "/authtoken/numberconfirm",
		{ method: "post", parameters:
		"mobile="+encodeURIComponent(mobile) }
		);
}

function generatePocketAuthToken(origin,title,send_btn,body_txt,important_txt,msisdn_field_header,numberformat,confirm_btn) {
		if(origin=="adminPage") {
			var number_field = "<input type=\"text\" style=\"width:250px;\" id=\"msisdn_value\"><br />";
			var authTokenDialog = createDialog("auth-token-dialog", title, "9003", 0, -1000, closeAuthTokenDialog);
				appendDialogBody(authTokenDialog, "<p>" + body_txt + "</p>", true);
				appendDialogBody(authTokenDialog, "<b>" + msisdn_field_header + "</b><br />", true);
				appendDialogBody(authTokenDialog, number_field, true);
				appendDialogBody(authTokenDialog, numberformat, true);
			var confirm_btn = "<br clear=\"all\" /><a href=\"#\" class=\"colorlink orange dialogbutton\" onclick=\"confirmPhoneNumber(); return false;\"><span>" + confirm_btn + "</span></a><br clear=all>";
				appendDialogBody(authTokenDialog, confirm_btn, true);
				appendDialogBody(authTokenDialog, important_txt, true);
				moveDialogToCenter(authTokenDialog);
			showOverlay();
		}
		if(origin=="componentPage") {
			var mobile = $F('msisdn_value');
				var authTokenDialog = createDialog("auth-token-dialog", title, "9003", 0, -1000, closeAuthTokenDialog);
					moveDialogToCenter(authTokenDialog);
					showOverlay();
					confirmPhoneNumber();
		}
}

function generateMobileAuthToken(origin,title) {
	 	if(origin=="adminPage") {
			new Ajax.Request(
				habboReqPath + "/authtoken/genmobiletoken",
				{ method: "post", onComplete: function(req, json) {
				var authTokenDialog = createDialog("auth-token-dialog", title, "9003", 0, -1000, closeAuthTokenDialog);
				appendDialogBody(authTokenDialog, req.responseText, true);
				moveDialogToCenter(authTokenDialog);
				showOverlay();
			} }
		);
	 	}
	 	if(origin=="componentPage") {
	 		new Ajax.Updater("highscores_token_ajax_content",
			habboReqPath + "/authtoken/gencmobiletoken");
	 	}
}

function sendMobileNumber(mobile) {
	new Ajax.Updater("auth-token-dialog-body",
		habboReqPath + "/authtoken/genpockettoken",
		{ method: "post", parameters: "mobile="+encodeURIComponent(mobile) });
}

function removeAuthToken(tokenid) {
    new Ajax.Updater("auth-token-dialog-body",
		habboReqPath + "/authtoken/removetoken",
		{ method: "post", parameters: "tokenId="+encodeURIComponent(tokenid) });
}

function confirmTokenRemoval(title,msg,tokenid,removetitle,canceltitle) {
	var btn1 = "<a href=\"#\" class=\"colorlink noarrow dialogbutton\" onclick=\"closeAuthTokenDialog(); return false;\"><span>" + canceltitle + "</span></a>";
	var btn2 = "<br clear=\"all\" /><a href=\"#\" class=\"colorlink noarrow dialogbutton\" onclick=\"removeAuthToken(" + tokenid + "); return false;\"><span>" + removetitle + "</span></a>";
	var theDiv = "<div class=\"clear\"></div>";
	var authTokenDialog = createDialog("auth-token-dialog", title, "9003", 0, -1000, closeAuthTokenDialog);
		appendDialogBody(authTokenDialog, msg, true);
		appendDialogBody(authTokenDialog, btn1, true);
		appendDialogBody(authTokenDialog, btn2, true);
		appendDialogBody(authTokenDialog, theDiv, true);
		moveDialogToCenter(authTokenDialog);
		showOverlay();
}

function closeTokenDialogAndReload() {
	closeAuthTokenDialog();
	document.location.reload();
}

var ClientMessageHandler = {
	
	call: function(msg, data) {
		switch (msg) {
			case "google": if (window.urchinTracker) { urchinTracker(data); } break;
			case "url": var img = new Image(1,1); img.src = data; break;
			case "hello": alert(data); break;
		}
	}
	
};
}

/*
     FILE ARCHIVED ON 11:40:32 Jul 03, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:14:14 Mar 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.72
  exclusion.robots: 0.099
  exclusion.robots.policy: 0.086
  esindex: 0.011
  cdx.remote: 9.253
  LoadShardBlock: 82.052 (3)
  PetaboxLoader3.datanode: 197.968 (4)
  load_resource: 190.355
  PetaboxLoader3.resolve: 58.403
*/