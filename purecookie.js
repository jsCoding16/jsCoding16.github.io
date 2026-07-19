//License MIT
var purecookieTitle = "Cookies";
var purecookieDesc = '...';
var purecookieLink = '...'; 
var purecookieButtonYes = "...";
var purecookieButtonNo = "...";

function initPureCookie(textoDesc,textoLink, textoBotaoYes, textoBotaoNo) {
    purecookieDesc = textoDesc;
    purecookieLink = textoLink;
    purecookieButtonYes = textoBotaoYes;
    purecookieButtonNo = textoBotaoNo;
    
}
    
function pureFadeIn(elem, display){
  var el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
	var val = parseFloat(el.style.opacity);
	if (!((val += .02) > 1)) {
	  el.style.opacity = val;
	  requestAnimationFrame(fade);
	}
  })();
};
function pureFadeOut(){
  var el = document.getElementById("cookieConsentContainer");
  el.style.opacity = 1;
  (function fade() {
	if ((el.style.opacity -= .02) < 0) {
	  el.style.display = "none";
	} else {
	  requestAnimationFrame(fade);
	}
  })();
};
function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {   
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'; 
}
function cookieConsent() {
  if (!getCookie('purecookieDismiss')) {
    var bannerHTML = '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' + purecookieTitle + '</a></div><div class="cookieDesc"><p>' + purecookieDesc + purecookieLink + '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' + purecookieButtonYes + '</a><a onClick="purecookieRefuse()">' + purecookieButtonNo + '</a></div></div>';
    
    // Insere o banner de forma limpa mesmo antes do fim do body
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
    pureFadeIn("cookieConsentContainer");
  }
}
function purecookieDismiss() {
  setCookie('purecookieDismiss','1',180);
  pureFadeOut();
}

function purecookieRefuse(){
	setCookie('purecookieDismiss', '0', 180); // Grava '0' para saber que ele recusou, mas não voltar a chatear com o banner
	pureFadeOut();
}

