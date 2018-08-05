import 'bootstrap';
import 'popper.js'
import $ from 'jquery';
window.$ = $;
import iziModal from 'izimodal/js/iziModal';
$.fn.iziModal = iziModal;
$("#modal").iziModal();



$('.collapse').collapse()


/* Seletores */

const showsPage = document.querySelector('.shows-page')
const btnSearch = document.querySelector('.btn-search')
const searchShow = document.querySelector('.search-show')

/* API's */
const all = 'https://api.tvmaze.com/shows'
const search = (nome) => `https://api.tvmaze.com/search/shows?q=${nome}`
const cast = (id) => `https://api.tvmaze.com/shows/${id}/cast`
const eps = (id) => `https://api.tvmaze.com/shows/${id}/episodes`
let seasons = (id) => `https://api.tvmaze.com/shows/${id}/seasons`
let episode = (id) => `https://api.tvmaze.com/seasons/${id}?embed=episodes`

/* Página principal */

/* Favoritas */

function favorite(url) {
  fetch(url)
    .then(res => res.json())
    .then(json => favoritePage(json))
}


favorite(all)


/* Funções de inserção no HTML */

function favoritePage(json) {
  json.map(serie => {
    let text = ''
    if (serie.rating.average > 8.6 && serie.language == 'English')
      text = `
      <div class="serie mr-2 autoplay" onclick="colocarSerie('${serie.name.replace(/'/, '')}')">
        <img class="rounded float-left" src="${serie.image.medium.replace('http', 'https')}" alt="Imagem serie">
        <div class="topright text-center"><p>${serie.rating.average.toFixed(1)}</p><i class="fas fa-star"></i></div>
      </div>
      `
      showsPage.insertAdjacentHTML('beforeend', text)
  }) 
}


/* Pesquisa */

async function searchBar(valor) {
  showsPage.innerHTML = ''
  if (validarSerie(valor)) {
    event.preventDefault()
    await fetch(search(valor))
      .then(res => res.json())
      .then(json => getBusca(json))
  } else {
    alert('O nome não pode começar com simbolos!')
  }
}

function getBusca(json) {
  json.map(serie => {
    serie = serie.show
    if (serie.rating.average != null) {
      let text = `
        <div class="serie mr-2 autoplay" onclick="colocarSerie('${serie.name.replace(/'/, '')}')">
          <img class="rounded float-left" src="${serie.image.medium}" alt="Imagem serie">
          <div class="topright text-center"><p>${serie.rating.average.toFixed(1)}</p><i class="fas fa-star"></i></div>
        </div>
        `
      showsPage.insertAdjacentHTML('beforeend', text)
    }
  })
}

/* TV Show Page */

btnSearch.addEventListener('click', () => searchBar(searchShow.value))
//btnSearch.addEventListener('click', () => colocarSerie(searchShow.value))


window.colocarSerie = function(valor) {
  if (validarSerie(valor)) {
    showsPage.innerHTML = ''
    //this.blur()
    event.preventDefault()
    let url = `https://api.tvmaze.com/search/shows?q=${valor}`
    fetch(url)
      .then(res => res.json())
      .then(json => {      
        searchShow.value = ''
        showsPage.insertAdjacentHTML('afterbegin', boxShow(json[0].show))
      })
  } else {
    alert('O nome não pode começar com simbolos!')
  }  
  //.catch(err => console.log(err))
}

function boxShow(json) { 
  elencoCast(json.id)
  return `
      <div class="show-page">
        <img src="${json.image.medium.replace('http', 'https')}" class="rounded float-left" alt="imagem serie">
        <h1 class="text-center text-uppercase">${json.name}</h1>
        <div class="topright text-center icon-show"><p>${json.rating.average.toFixed(1)}</p><i class="fas fa-star"></i></div>
        <div class="info">
          <div class="row"><p>${json.summary}</p></div>
          <div class="row"><p class="col"><b>Genre:</b> ${json.genres.join(' | ')}</p></div>
          <div class="row"><p class="col"><b>Premiered:</b> ${json.premiered.replace(/(\d{4})-(\d{2})-(\d{2})/, `$3/$2/$1`)}</p><p class="col"><b>Status:</b> ${json.status}</p></div>
        </div>
      </div>
      `
}


async function elencoCast(id) {
  let text = `
  <div class="col">
    <h3>Cast</h3>
    <div class="cast d-flex flex-wrap row">${await setCast(id)}</div>  
  </div>
  <div class="col episodios">
    <h3>Seasons</h3>
    <div class="eps d-flex flex-wrap row"><div class="eps container">${await setEps(id)}</div></div>
  `
  showsPage.insertAdjacentHTML('beforeend', text)
}


function setCast(id) {
  return fetch(cast(id))
    .then(res => res.json())
    .then(json => {
      return json.map(cast => {
        return `
        <div class="actor">
          <img src="${cast.person.image.medium.replace('http', 'https')}" class="rounded float-left" alt="image actor">
          <div class="cast-name">
            <p class="font-weight-bold">${cast.person.name}</p>
            <p>${cast.character.name}</p>
          </div>  
        </div>
        `
      }).join('')  
    })
}


/* function setSeason(id) {
  return fetch(seasons(id))
      .then(res => res.json())
      .then(json => {
        return json.map(s => {
          return `
            <div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${s.number}" aria-expanded="true" aria-controls="collapse${s.number}" >
                      Season ${s.number}
                    </button>
                  </h5>
                </div>
                <div id="collapse${s.number}" id="modal"  class="collapse" aria-labelledby="heading${s.number}" data-parent="#accordionExample">
                  <div class="card-body">
                    ${setEps(s.id)}
                  </div>
                </div>  
              </div>
            </div>
            `
          }).join('')
        })
}
 */
/* async function setEps(id) {
  return await fetch(episode(id))
      .then(res => res.json())
      .then(json => {
        json = json._embedded.episodes
        return json.map(ep => ep.number == null ? `<p>Special episode - ${ep.name}</p>` : `<p>Episode ${ep.number} - ${ep.name}</p>`).join('')
        })
}        
 */


/* 
function setSeason(id) {
  return fetch(eps(id))
    .then(res => res.json())
    .then(json => {
      let season = json.map(e => e.season)
      season = season.filter((e, i, arr) => arr.indexOf(e) == i)
      return season.map( se => {
        return `
        <div class="accordion" id="accordionExample">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${se}" aria-expanded="true" aria-controls="collapse${se}" >
                  Season ${se.length == 1 ? '0'+ se : se}
                </button>
              </h5>
            </div>
            <div id="collapse${se}" class="collapse" aria-labelledby="heading${se}" data-parent="#accordionExample">
              <div class="card-body">
              ${setEps(json)}
              </div>
            </div>  
          </div>
        </div>
        `}).join('')
      })
    }
 */

//season.filter((e, i, arr) => arr.indexOf(e) == i)

function setEps(id) {
  return fetch(eps(id))
    .then(res => res.json())
    .then(json => {
      return json.map(ep => {
        return `
          <p>S${ep.season}EP${ep.number} - ${ep.name} - airdate: ${ep.airdate.replace(/(\d{4})-(\d{2})-(\d{2})/, `$3/$2/$1`)}</p>
        `
      }).join('')
    })
}

/* Validação */

function validarSerie(string) {
  return string.match(/^[0-9A-Z]+/gi) ? true : false
}

/* Slick */


/* $('.autoplay').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});
 */

/* Botão de scroll */

$(document).ready(function() {
  // esconder o botão ao usar o scroll do mouse
  $(window).scroll(function(){
    if ($(this).scrollTop() > 200) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });
  // voltar ao top devagar
    $('.scrollToTop').click(function(){
      $('html,body').animate({scrollTop: 0},1000)
    });
});


$(document).on('click', '.trigger', function (event) {
  event.preventDefault();
  // $('#modal').iziModal('setZindex', 99999);
  // $('#modal').iziModal('open', { zindex: 99999 });
  $('#modal').iziModal('open');
});

/* // Se for fazer por genero
function comedy(all) {
  fetch(all)
    .then(res => res.json())
    .then(json => {
      for (let i of json) {
        let text = ''
        if (i.genres[0] == 'Comedy')
          if (i.rating.average > 7 && i.language == 'English')
            text = `
              <div class="serie mr-2" onclick="colocarSerie('${i.name.replace(/'/, '')}')">
                <img class="rounded float-left autoplay" src="${i.image.medium.replace('http', 'https')}" alt="Imagem serie">
                <div class="topright text-center"><p>${i.rating.average.toFixed(1)}</p><i class="fas fa-star"></i></div>
              </div>
              `
        showsPage.insertAdjacentHTML('beforeend', text)
      }
    })
}
comedy(all) */

/* 
function setEps(id) {
  return fetch(eps(id))
    .then(res => res.json())
    .then(json => {
      return json.map(ep => {
         return `
        <div class="eps container">
          <h4>Season ${ep.season}</h4>
          <p>Episode ${ep.number} - ${ep.name} - airdate: ${ep.airdate.replace(/(\d{4})-(\d{2})-(\d{2})/, `$3/$2/$1`)}</p>
        </div>`
      }).join('')
    })
}

*/
/*  Barra de pesquisa */

/* searchShow.addEventListener('keyup', (event) => {
  searchShow.value 
})
 */



/* async function episodios(id) {
  let texto = `
  <div class="container">
    <h3>Episódios</h3>
    <div class="eps d-flex justify-content-around flex-wrap row">${await setEps(id)}</div>
  `
  showsPage.insertAdjacentHTML('beforeend', texto)
} */


/* function episodios(id) {
  fetch(eps(id))
    .then(res => res.json())
    .then(json => {
      json.map(ep => {
        console.log(ep)
        //console.log(ep.airdate.replace(/(\d{4})-(\d{2})-(\d{2})/, `$3/$2/$1`))
        let texto = `
        <h4>Season ${ep.season}</h4>
        <p>Episode ${ep.number} - ${ep.name} - airdate: ${ep.airdate.replace(/(\d{4})-(\d{2})-(\d{2})/, `
        $3 / $2 / $1 `)}</p>
        `
        showsPage.insertAdjacentHTML('beforeend', texto)
      })
    })
} */




