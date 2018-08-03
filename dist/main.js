/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.mjs");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.mjs":
/*!*********************!*\
  !*** ./js/main.mjs ***!
  \*********************/
/*! no exports provided */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* Seletores */\n\nconst showsPage = document.querySelector('.shows-page')\nconst btnSearch = document.querySelector('.btn-search')\nconst searchShow = document.querySelector('.search-show')\n\n/* API's */\nconst all = 'http://api.tvmaze.com/shows'\nconst search = (nome) => `http://api.tvmaze.com/search/shows?q=${nome}`\nconst cast = (id) => `http://api.tvmaze.com/shows/${id}/cast`\nconst eps = (id) => `http://api.tvmaze.com/shows/${id}/episodes`\n\n\n/* Página principal */\n\n/* Favoritas */\n\nfunction favorite(url) {\n  fetch(url)\n    .then(res => res.json())\n    .then(json => favoritePage(json))\n}\n\n\nfavorite(all)\n\n/* Funções de inserção no HTML */\n\nfunction favoritePage(json) {\n  json.map(serie => {\n    let text = ''\n    if (serie.rating.average > 8.6 && serie.language == 'English')\n      text = `\n      <div class=\"serie mr-2 autoplay\" onclick=\"colocarSerie('${serie.name}')\">\n        <img class=\"rounded float-left\" src=\"${serie.image.medium}\" alt=\"Imagem serie\">\n        <div class=\"topright text-center\"><p>${serie.rating.average.toFixed(1)}</p><i class=\"fas fa-star\"></i></div>\n      </div>\n      `\n      showsPage.insertAdjacentHTML('beforeend', text)\n  }) \n}\n\n\n/* Pesquisa */\n\nasync function searchBar(valor) {\n  showsPage.innerHTML = ''\n  if (validarSerie(valor)) {\n    event.preventDefault()\n    await fetch(search(valor))\n      .then(res => res.json())\n      .then(json => getBusca(json))\n  } else {\n    alert('O nome não pode começar com simbolos!')\n  }\n}\n\nfunction getBusca(json) {\n  json.map(serie => {\n    serie = serie.show\n    if (serie.rating.average != null) {\n      let text = `\n        <div class=\"serie mr-2 autoplay\" onclick=\"colocarSerie('${serie.name}')\">\n          <img class=\"rounded float-left\" src=\"${serie.image.medium}\" alt=\"Imagem serie\">\n          <div class=\"topright text-center\"><p>${serie.rating.average.toFixed(1)}</p><i class=\"fas fa-star\"></i></div>\n        </div>\n        `\n      showsPage.insertAdjacentHTML('beforeend', text)\n    }\n  })\n}\n\n/* TV Show Page */\n\nbtnSearch.addEventListener('click', () => searchBar(searchShow.value))\n//btnSearch.addEventListener('click', () => colocarSerie(searchShow.value))\n\n\nfunction colocarSerie(valor) {\n  if (validarSerie(valor)) {\n    showsPage.innerHTML = ''\n    //this.blur()\n    event.preventDefault()\n    let url = `http://api.tvmaze.com/search/shows?q=${valor}`\n    fetch(url)\n      .then(res => res.json())\n      .then(json => {      \n        searchShow.value = ''\n        showsPage.insertAdjacentHTML('afterbegin', boxShow(json[0].show))\n      })\n  } else {\n    alert('O nome não pode começar com simbolos!')\n  }  \n  //.catch(err => console.log(err))\n}\n\nfunction boxShow(json) { \n  elencoCast(json.id)\n  return `\n      <div class=\"show-page\">\n        <img src=\"${json.image.medium}\" class=\"rounded float-left\" alt=\"imagem serie\">\n        <h1 class=\"text-center text-uppercase\">${json.name}</h1>\n        <div class=\"topright text-center icon-show\"><p>${json.rating.average.toFixed(1)}</p><i class=\"fas fa-star\"></i></div>\n        <div class=\"info\">\n          <div class=\"row\"><p>${json.summary}</p></div>\n          <div class=\"row\"><p class=\"col\"><b>Genre:</b> ${json.genres.join(' | ')}</p></div>\n          <div class=\"row\"><p class=\"col\"><b>Premiered:</b> ${json.premiered.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, `$3/$2/$1`)}</p><p class=\"col\"><b>Status:</b> ${json.status}</p></div>\n        </div>\n      </div>\n      `\n}\n\nasync function elencoCast(id) {\n  let text = `\n  <div class=\"container\">\n    <h3>Elenco</h3>\n    <div class=\"cast d-flex justify-content-around flex-wrap row\">${await setCast(id)}</div>  \n  </div>\n  <div class=\"container episodios\">\n    <h3>Episódios</h3>\n    <div class=\"eps d-flex justify-content-around flex-wrap row\"><div class=\"eps container\">${await setEps(id)}</div></div>\n  `\n  showsPage.insertAdjacentHTML('beforeend', text)\n}\n\nfunction setCast(id) {\n  return fetch(cast(id))\n    .then(res => res.json())\n    .then(json => {\n      return json.map(cast => {\n        return `\n        <div class=\"actor\">\n          <img src=\"${cast.person.image.medium}\" class=\"rounded float-left\" alt=\"image actor\">\n          <div class=\"cast-name\">\n            <p class=\"font-weight-bold\">${cast.person.name}</p>\n            <p>${cast.character.name}</p>\n          </div>  \n        </div>\n        `\n      }).join('')  \n    })\n}\n\nfunction setEps(id) {\n  return fetch(eps(id))\n    .then(res => res.json())\n    .then(json => {\n      return json.map(ep => {\n        return `\n          <p>S${ep.season}EP${ep.number} - ${ep.name} - airdate: ${ep.airdate.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, `$3/$2/$1`)}</p>\n        `\n      }).join('')\n    })\n}\n\n/* Validação */\n\nfunction validarSerie(string) {\n  return string.match(/^[0-9A-Z]+/gi) ? true : false\n}\n\n/* Slick */\n\n/* $('.autoplay').slick({\n  slidesToShow: 3,\n  slidesToScroll: 1,\n  autoplay: true,\n  autoplaySpeed: 2000,\n});\n */\n\n/* Botão de scroll */\n\n$(document).ready(function() {\n  // esconder o botão ao usar o scroll do mouse\n  $(window).scroll(function(){\n    if ($(this).scrollTop() > 200) {\n      $('.scrollToTop').fadeIn();\n    } else {\n      $('.scrollToTop').fadeOut();\n    }\n  });\n  // voltar ao top devagar\n    $('.scrollToTop').click(function(){\n      $('html,body').animate({scrollTop: 0},1000)\n    });\n});\n\n\n\n/* \nfunction setEps(id) {\n  return fetch(eps(id))\n    .then(res => res.json())\n    .then(json => {\n      return json.map(ep => {\n         return `\n        <div class=\"eps container\">\n          <h4>Season ${ep.season}</h4>\n          <p>Episode ${ep.number} - ${ep.name} - airdate: ${ep.airdate.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, `$3/$2/$1`)}</p>\n        </div>`\n      }).join('')\n    })\n}\n\n*/\n/*  Barra de pesquisa */\n\n/* searchShow.addEventListener('keyup', (event) => {\n  searchShow.value \n})\n */\n\n\n\n/* async function episodios(id) {\n  let texto = `\n  <div class=\"container\">\n    <h3>Episódios</h3>\n    <div class=\"eps d-flex justify-content-around flex-wrap row\">${await setEps(id)}</div>\n  `\n  showsPage.insertAdjacentHTML('beforeend', texto)\n} */\n\n\n/* function episodios(id) {\n  fetch(eps(id))\n    .then(res => res.json())\n    .then(json => {\n      json.map(ep => {\n        console.log(ep)\n        //console.log(ep.airdate.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, `$3/$2/$1`))\n        let texto = `\n        <h4>Season ${ep.season}</h4>\n        <p>Episode ${ep.number} - ${ep.name} - airdate: ${ep.airdate.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, `\n        $3 / $2 / $1 `)}</p>\n        `\n        showsPage.insertAdjacentHTML('beforeend', texto)\n      })\n    })\n} */\n\n\n/* \n// Se for fazer por genero\nfetch(rating)\n  .then(res => res.json())\n  .then(json => {\n    for (let i of json) {\n      for (let e of i.genres) {\n        if (e == 'Comedy')\n          console.log(i.name)\n      }\n    }\n  })\n*/\n\n//# sourceURL=webpack:///./js/main.mjs?");

/***/ })

/******/ });