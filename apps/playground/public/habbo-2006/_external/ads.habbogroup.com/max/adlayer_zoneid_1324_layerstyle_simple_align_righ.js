var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
var phpadsbanner = '';

phpadsbanner += '\n<'+'div id="phpads_74c40153" style="position:absolute; width:6';
phpadsbanner += 'px; height:17px; z-index:99; left: 0px; top: 0px; visibility';
phpadsbanner += ': hidden"> \n\t<'+'table cellspacing="0" cellpadding="0">\n\t\t<'+'tr> ';
phpadsbanner += '\n\t\t\t<'+'td align="right" style="padding: 2px"><'+'a href="javascri';
phpadsbanner += 'pt:;" onClick="phpAds_simplepop_74c40153(\'close\'); return fa';
phpadsbanner += 'lse;" style="color:#0000ff"><'+'img src="https://web.archive.org/web/20070726183432/http://ads.habbogroup.';
phpadsbanner += 'com/max/libraries/layerstyles/simple/images/close.gif" width';
phpadsbanner += '="7" height="7" alt="Close" border="0"><'+'/a><'+'/td>\n\t\t<'+'/tr>\n\t\t<'+'';
phpadsbanner += 'tr> \n\t\t\t<'+'td  align="center">\n\t\t\t\t<'+'table border="0" cellspaci';
phpadsbanner += 'ng="0" cellpadding="0">\n\t\t\t\t\t<'+'tr>\n\t\t\t\t\t\t<'+'td width="" height=';
phpadsbanner += '"" align="center" valign="middle" style="padding: 2px"><'+'/td>';
phpadsbanner += '\n\t\t\t\t\t<'+'/tr>\n\t\t\t\t<'+'/table>\n\t\t\t<'+'/td>\n\t\t<'+'/tr>\n\t<'+'/table>\n<'+'/div>\n';

document.write(phpadsbanner);

function phpAds_findObj(n, d) { 
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
  d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i>d.layers.length;i++) x=phpAds_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function phpAds_adlayers_place_74c40153()
{
	var c = phpAds_findObj('phpads_74c40153');

	if (!c)
		return false;
	
	if (c.style)
		c = c.style;
	
	if (window.innerHeight)
		ih = window.innerHeight;
	else
		ih = document.body.clientHeight;
	
	if (window.innerWidth)
		iw = window.innerWidth;
	else
		iw = document.body.clientWidth;
	
	
	if (document.all) { 
		
		c.pixelLeft = iw + document.body.scrollLeft - 6;
		c.pixelTop = 0 + document.body.scrollTop;
	
	} else {
		c.left = iw + window.pageXOffset - 6 - 16;
		c.top = 0 + window.pageYOffset;
	
	}

	c.visibility = phpAds_adlayers_visible_74c40153;
}


function phpAds_simplepop_74c40153(what)
{
	var c = phpAds_findObj('phpads_74c40153');

	if (!c)
		return false;

	if (c.style)
		c = c.style;

	switch(what)
	{
		case 'close':
			phpAds_adlayers_visible_74c40153 = 'hidden';
			phpAds_adlayers_place_74c40153();
			window.clearInterval(phpAds_adlayers_timerid_74c40153);
			break;

		case 'open':
			phpAds_adlayers_visible_74c40153 = 'visible';
			phpAds_adlayers_place_74c40153();
			phpAds_adlayers_timerid_74c40153 = window.setInterval('phpAds_adlayers_place_74c40153()', 10);

			return window.setTimeout('phpAds_simplepop_74c40153(\'close\')', 20000);
			break;
	}
}


var phpAds_adlayers_timerid_74c40153;
var phpAds_adlayers_visible_74c40153;


phpAds_simplepop_74c40153('open');

}

/*
     FILE ARCHIVED ON 18:34:32 Jul 26, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:20:31 Mar 25, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.056
  exclusion.robots: 0.196
  exclusion.robots.policy: 0.184
  esindex: 0.012
  cdx.remote: 47.152
  LoadShardBlock: 57.329 (3)
  PetaboxLoader3.datanode: 101.686 (4)
  load_resource: 152.269
  PetaboxLoader3.resolve: 80.292
*/