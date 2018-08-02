/* Seletores */

const showsPage = document.querySelector('.shows-page')
const btnSearch = document.querySelector('.btn-search')
const searchShow = document.querySelector('.search-show')

/* API's */
const all = 'http://api.tvmaze.com/shows'
const search = (nome) => `http://api.tvmaze.com/search/shows?q=${nome}`
const cast = (id) => `http://api.tvmaze.com/shows/${id}/cast`
const eps = (id) => `http://api.tvmaze.com/shows/${id}/episodes`


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
      <div class="serie mr-2 autoplay" onclick="colocarSerie('${serie.name}')">
        <img class="rounded float-left" src="${serie.image.medium}" alt="Imagem serie">
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
        <div class="serie mr-2 autoplay" onclick="colocarSerie('${serie.name}')">
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


function colocarSerie(valor) {
  if (validarSerie(valor)) {
    showsPage.innerHTML = ''
    //this.blur()
    event.preventDefault()
    let url = `http://api.tvmaze.com/search/shows?q=${valor}`
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
        <img src="${json.image.medium}" class="rounded float-left" alt="imagem serie">
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
  <div class="container">
    <h3>Elenco</h3>
    <div class="cast d-flex justify-content-around flex-wrap row">${await setCast(id)}</div>  
  </div>
  <div class="container episodios">
    <h3>Episódios</h3>
    <div class="eps d-flex justify-content-around flex-wrap row"><div class="eps container">${await setEps(id)}</div></div>
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
          <img src="${cast.person.image.medium}" class="rounded float-left" alt="image actor">
          <div class="cast-name">
            <p class="font-weight-bold">${cast.person.name}</p>
            <p>${cast.character.name}</p>
          </div>  
        </div>
        `
      }).join('')  
    })
}

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
  slidesToShow: 3,
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


/* 
// Se for fazer por genero
fetch(rating)
  .then(res => res.json())
  .then(json => {
    for (let i of json) {
      for (let e of i.genres) {
        if (e == 'Comedy')
          console.log(i.name)
      }
    }
  })
*/