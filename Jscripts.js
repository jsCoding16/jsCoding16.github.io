//License GNU GPL v2
var naFrente=0;
var clicado=false;
var mx,my,cx,cy;
function  roda(inc){
    naFrente+=inc;
    var ang=naFrente/7*-360;
    var elem=document.getElementById("crc");
    if (elem.classList.contains('carrocel0')){
        elem.classList.add('carrocel');
        elem.classList.remove('carrocel0');
    }
    var elem2=document.getElementById("crc2");
    if (elem2.classList.contains('carrocel0')){
        elem2.classList.add('carrocel');
        elem2.classList.remove('carrocel0');
    }
    if (window.matchMedia('(orientation:landscape)').matches){
        elem.style= 'transform:rotateY(' + ang +'deg)';
        elem2.style= 'transform:rotateY(' + ang +'deg)';
    }else{
        elem.style= 'transform:rotateX(' + ang +'deg)';
        elem2.style= 'transform:rotateX(' + ((-1)*ang) +'deg)';
    };
}
function reformula(){
    setCentro();
    var ang=naFrente/7*-360;
    var elem=document.getElementById("crc");
    var elem2=document.getElementById("crc2");
    if (window.matchMedia('(orientation:landscape)').matches){
        elem.style= 'transform:rotateY(' + ang +'deg)';
        elem2.style= 'transform:rotateY(' + ang +'deg)';
    }else{
        elem.style= 'transform:rotateX(' + ang +'deg)';
        elem2.style= 'transform:rotateX(' + ((-1)*ang) +'deg)';
    };
}
function setCentro(){
        var ztx,zty;
        var hi=document.getElementById("cena").offsetHeight-4;
        var hh = window.innerHeight;
        var hf=(hh/2)-(hi/2);
        var objeto=document.getElementById("cena").style;
        objeto.marginTop = hf-30+"px";
        objeto.visibility="visible";
        var objeto2=document.getElementById("cena2").style;
        objeto2.visibility="visible";
        if (window.matchMedia('(orientation:landscape)').matches){
            objeto2.marginTop =hf-30+"px";
            document.getElementById("filtro").style.top = hf+110+"px";
            document.getElementById("s2b").style.top = 0+"px";
        }else{
            objeto2.marginTop =140+"px";
            document.getElementById("filtro").style.top = hf+210+"px";
            document.getElementById("s2b").style.top = hf+210+"px";
        }
        if (window.matchMedia('(orientation:landscape)').matches){
            ztx=460;
            zty=210;
        }else{
            ztx=283;
            zty=316;
        };
        var hw = window.innerWidth;
        var zt=document.getElementById("zonaToque").style;
        zt.width=ztx+"px";
        zt.height=zty+"px";
        zt.left=((hw/2)-(ztx/2))+3+"px";
        zt.top=((hh/2)-(zty/2))-25+"px";
}
function mdown(event){
    mx=event.clientX;
    my=event.clientY;
    clicado=true;
    cx=mx;
    cy=my;
}
function tdown(event){
    mx=event.touches[0].clientX;
    my=event.touches[0].clientY;
    clicado=true;
    cx=mx;
    cy=my;
}
function tend(event){
    clicado=false;
    if( (cx==mx)&(cy==my)){linca()};
}
function desliza(event){
    if (clicado){
        cx=event.clientX;
        cy=event.clientY;
        if(window.matchMedia('(orientation:landscape)').matches){
            var dx=mx-cx;
            if (dx>200){
                roda(1);
                mx=cx;
            };
            if (dx<-200){
                roda(-1);
                mx=cx;
            };
        }else{
            var dy=my-cy;
            if (dy>100){
                roda(-1);
                my=cy;
            };
            if (dy<-100){
                roda(1);
                my=cy;
            };
        };   
    }
}
function tdesliza(event){
    if (clicado){
        cx=event.touches[0].clientX;
        cy=event.touches[0].clientY;
        if(window.matchMedia('(orientation:landscape)').matches){
            var dx=mx-cx;
            if (dx>200){
                roda(1);
                mx=cx;
            };
            if (dx<-200){
                roda(-1);
                mx=cx;
            };
        }else{
            var dy=my-cy;
            if (dy>100){
                roda(-1);
                my=cy;
            };
            if (dy<-100){
                roda(1);
                my=cy;
            };
        };   
    }
}
function linca(){
    var quadro=naFrente;
    if (naFrente<0){
        quadro=7+(naFrente%7);
    };
    if (naFrente>6){quadro=naFrente%7};
    quadro+=1;
    if (quadro==8){quadro=1};
    switch(quadro){
        case 1:            
			setCookie('Snavid','0',3);            
            window.location.href="./triflyke.html";
            break;
        case 2:          
			setCookie('Snavid','1',3);           
            window.location.href="./tifloho.html";
            break;
        case 3:           
			setCookie('Snavid','2',3);
            window.location.href="./diff.html";
            break;
        case 4:
			setCookie('Snavid','3',3);
            window.location.href="./cadeirao.html";
            break;
        case 5:
			setCookie('Snavid','4',3);
            window.location.href="./mansao.html";
            break;
        case 6:
			setCookie('Snavid','5',3);
            window.location.href="./robta.html";
            break;
        case 7:
			setCookie('Snavid','6',3);
            window.location.href="./contact.html";
            break;
    }
}
function getParametros(){
	langOnLoad()
    cookieConsent();
    var statusCookie = getCookie('purecookieDismiss');
	var n=0;
	if (!getCookie('Snavid')) {
		setCookie('Snavid','1',3);
	}else{
		n=parseInt(getCookie('Snavid'));
	};
	if (n!=0 & n!=null){
		var elem=document.getElementById("crc");
		var elem2=document.getElementById("crc2");
		elem.classList.remove('carrocel');
		elem.classList.add('carrocel0');
		elem2.classList.remove('carrocel');
		elem2.classList.add('carrocel0');
		naFrente=parseInt(n);
		var ang=naFrente/7*-360;
		if (window.matchMedia('(orientation:landscape)').matches){
			elem.style= 'transform:rotateY(' + ang +'deg)';
			elem2.style= 'transform:rotateY(' + ang +'deg)';
		}else{
			elem.style= 'transform:rotateX(' + ang +'deg)';
			elem2.style= 'transform:rotateX(' + ((-1)*ang) +'deg)';
		};
	};  
  
}
async function changeLanguage(lang) {
  try {
    const response = await fetch(`${lang}.json`);
    const translations = await response.json();
    
    // Atualiza o HTML com base nas chaves do JSON
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });	
	// Guarda a preferência no cookie por 365 dias
	setCookie('user-lang', lang, 365);
	document.documentElement.lang = lang; // Atualiza o atributo lang do HTML
  } catch (error) {
    console.error("Erro ao carregar as traduções:", error);
  }
}

async function changeLanguageAM(lang) {
  try {
    const response = await fetch(`${lang}.json`);
    const translations = await response.json();
    
    // Atualiza o HTML com base nas chaves do JSON
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });	
	// Guarda a preferência no cookie por 365 dias
	//setCookie('user-lang', lang, 365);
	document.documentElement.lang = lang; // Atualiza o atributo lang do HTML
  } catch (error) {
    console.error("Erro ao carregar as traduções:", error);
  }
}

function langOnLoad(){
	const finalLang = detectUserLanguage();
  
  // Atualiza o seletor visual e aplica o idioma das tags HTML
  document.getElementById('language-selector').value = finalLang;
  changeLanguage(finalLang);

  // Deteta os textos certos do Cookie e inicia o purecookie.js
  const texts = cookieTranslations[finalLang] || cookieTranslations['pt'];
  if (typeof initPureCookie === "function") {
    initPureCookie(texts.desc,texts.link, texts.btny, texts.btnn);
  }
}

function detectUserLanguage() {
  const savedLang = getCookie('user-lang');
  if (savedLang) {
    return savedLang;
  }
  const browserLang = navigator.language.slice(0, 2);
  const supportedLanguages = ['pt', 'en', 'es'];
  return supportedLanguages.includes(browserLang) ? browserLang : 'pt';
}



const cookieTranslations = {
  pt: {
    desc: "Utilizamos cookies para garantir que lhe damos a melhor experiência no nosso site. ",
    link: '<a href="politica-cookies.html">Política de cookies</a>'+'.',
    btny: "Aceitar",
    btnn: "Recusar"
  },
  en: {
    desc: "We use cookies to ensure that we give you the best experience on our website. ",
    link: '<a href="politica-cookies.html">Cookie policy</a>'+'.',
    btny: "Accept",
    btnn: "Reject"
  },
  es: {
    desc: "Utilizamos cookies para asegurar que damos la mejor experiencia en nuestro sitio web. ",
    link: '<a href="politica-cookies.html">Política de cookies</a>'+'.',
    btny: "Aceptar",
    btnn: "Rechazar"
  }
};


async function atualizarTextoBotao(elemento) {
	try {
		const lang = detectUserLanguage();
		const response = await fetch(`${lang}.json`);
		const translations = await response.json();
		const key = elemento.getAttribute('data-i18n');
		
		if (translations[key]) {
			elemento.innerHTML = translations[key];
		}
	} catch (error) {
		console.error("Erro ao atualizar o texto do botão:", error);
	}
};
