var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function tdGetCookie(name)
{
	var prefix = name + "=";
	var namePos = document.cookie.indexOf(prefix);
	if (namePos == -1)
		return (null);
	var valuePos = namePos + name.length + 1;
	var endPos = document.cookie.indexOf(";", valuePos);
	if (endPos == -1)
		endPos = document.cookie.length;
	return (unescape(document.cookie.substring(valuePos, endPos).replace(/\+/g, " ")));
}

function tdTrack()
{
	if (tdTrackBackUrl)
		tdTrackBackImg.src = tdTrackBackUrl;
}

function tdInit()
{
	var tduid = "";

	// Your organization ID
	//
	var organization = "973163";

	// Value of the sale.
	// Leave as "0.00" if not applicable.
	//
	var orderValue = "0.00";

	// Currency of the sale.
	// Leave as "EUR" if not applicable.
	//
	var currency = "EUR";

	// Event ID
	//
	var event = "93109";

	// Event type:
	//     true  = Sale
	//     false = Lead
	//
	var isSale = false;

	// Encrypted connection on this page:
	//     true  = Yes (https)
	//     false = No  (http)
	//
	var isSecure = true;

	// Here you must specify a unique identifier for the transaction.
	// For a sale, this is typically the order number.
	//
	var orderNumber = new Date().getTime();

	// OPTIONAL: You may transmit a list of items ordered in the reportInfo
	// parameter. See the implementation manual for details.
	//
	var reportInfo = "";
	var reportInfo = escape(reportInfo);


	/*****  IMPORTANT:                                                    *****/
	/*****  In most cases, you should not edit anything below this line.  *****/
	/*****  Please consult with TradeDoubler before modifying the code.   *****/


	if (tdGetCookie("TRADEDOUBLER"))
		tduid = tdGetCookie("TRADEDOUBLER");

	var domain, checkNumberName, scheme;

	if (isSale)
	{
		domain = "tbs.tradedoubler.com";
		checkNumberName = "orderNumber";
	}
	else
	{
		domain = "tbl.tradedoubler.com";
		checkNumberName = "leadNumber";
		orderValue = "1";
	}

	if (isSecure)
		scheme = "https";
	else
		scheme = "http";

	tdTrackBackUrl = scheme + "://" + domain + "/report"
				  + "?organization="            + organization
				  + "&event="                   + event
				  + "&" + checkNumberName + "=" + orderNumber
				  + "&tduid="                   + tduid
				  + "&reportInfo="              + reportInfo;

	if (isSale)
	{
		tdTrackBackUrl
			+= "&orderValue=" + orderValue
			+  "&currency="   + currency;
	}
}

}

/*
     FILE ARCHIVED ON 16:15:02 Dec 13, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:28:16 Mar 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 2.037
  exclusion.robots: 0.055
  exclusion.robots.policy: 0.042
  esindex: 0.01
  cdx.remote: 30.735
  LoadShardBlock: 116.313 (3)
  PetaboxLoader3.datanode: 127.334 (4)
  load_resource: 79.368
  PetaboxLoader3.resolve: 44.908
*/