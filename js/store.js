const BASE = 'https://gaming-world-tt.web.app/'
const container = document.getElementById('gameContainer')

/*A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness here.*/
$(document).ready( () => {
  setTimeout(() => {
	alertify.set('notifier','position', 'bottom-left');
    alertify.prompt('Gaming World TT Survey', 'What is your favourite game?', '', (evt, value) => {
      if (value != "") {
        alertify.notify('Thank you :) ', 'customSuccess', 2)
      } else {
        alertify.notify('Ok :( we\'ll ask next time!', 'customDanger', 2)
      }

    }, () => {
      alertify.notify('Ok :( we\'ll ask next time!', 'customDanger', 2)
    })
  }, 20000)


//For every object in the JSON file we want to render the image, title, developer, release date, genre, price, as well "Read More" and "Add to Cart" buttons, in the .gameContainer of the store.html page. This is done using AJAX.
  $.ajax({
    url: `${BASE}/assets/json/games.json`,
    dataType: 'json',
    success: (data) => {
      let content = ``
      container.innerHTML = ''
      data.forEach(game => {
        container.innerHTML += `
          <div class="column game is-one-third">
            <div class="card">
              <div class="card-image">
                <figure class="image is-2by3">
                  <img class="equal" src="${game.image}" alt="${game.title}">
                </figure>
              </div>
              <div class="card-content has-text-centered">
                <h1 class="is-size-5 has-text-weight-bold">${game.title}</h1>
                <h2 class="subtitle is-size-6">${game.devStudio}</h2>
                <span class="tag is-link">${game.released}</span>
                <span class="tag is-warning">${game.genre}</span>
                <span class="tag is-primary price is-rounded">${game.price}</span>
              </div>
              <div class="content has-text-centered" style="padding-bottom:10px">
                <a class="button forModal is-uppercase is-info is-inverted is-small has-text-weight-bold" data-game-id="${game.id}">Read More</a>
                <a class="button cart is-uppercase is-primary is-inverted is-small has-text-weight-bold">Add to Cart</a>
              </div>
            </div>
          </div>
          `
      })
    }
  })
})


//FILTERS
const platformChecks = document.querySelectorAll('.checkboxGenre')
let filters = []
platformChecks.forEach(check => {
  filters.push({
    param: check.value,
    checked: check.checked 
  })
})

platformChecks.forEach(check => {
  check.addEventListener('change', () => {
    const filter = filters.filter(filter => check.value === filter.param)[0] 
    filter.checked = !filter.checked 

    $.ajax({
      url: `${BASE}/assets/json/games.json`,
      dataType: 'json',
      success: (data) => {
        let content = ``
        container.innerHTML = ''
        let parsedData = []
		
        filters.forEach(filter => {
          if (filter.checked) {
            let res = data.filter(game => game.platform === filter.param)
            res.forEach(game => {
              parsedData.push(game)
            })
          }
        })
        let checkedFilters = filters.filter(filter => filter.checked)
        if (checkedFilters.length) {
          parsedData.forEach(game => {
            container.innerHTML += `
                <div class="column game is-one-third">
                  <div class="card">
                    <div class="card-image">
                      <figure class="">
                        <img class="equal" src="${game.image}" alt="${game.title}">
                      </figure>
                    </div>
                    <div class="card-content has-text-centered">
                	  <h1 class="is-size-5 has-text-weight-bold">${game.title}</h1>
                      <h2 class="subtitle is-size-6">${game.devStudio}</h2>
                      <span class="tag is-link">${game.released}</span>
                      <span class="tag is-warning">${game.genre}</span>
                      <span class="tag is-primary price is-rounded">${game.price}</span>
                    </div>
                    <div class="content has-text-centered" style="padding-bottom:10px">
                      <a class="button forModal is-uppercase is-info is-inverted is-small has-text-weight-bold" data-game-id="${game.id}" >Read more</a>
                      <a class="button cart is-uppercase is-primary is-inverted is-small has-text-weight-bold">Add to Cart</a>
                    </div>
                  </div>
                </div>
                `
          })
        } else {
          data.forEach(game => {
            container.innerHTML += `
                <div class="column game is-one-third">
                  <div class="card">
                    <div class="card-image">
                      <figure class="">
                        <img class="equal" src="${game.image}" alt="${game.title}">
                      </figure>
                    </div>
                    <div class="card-content has-text-centered">
                	  <h1 class="is-size-5 has-text-weight-bold">${game.title}</h1>
                      <h2 class="subtitle is-size-6">${game.devStudio}</h2>
                      <span class="tag is-link">${game.released}</span>
                      <span class="tag is-warning">${game.genre}</span>
                      <span class="tag is-primary price is-rounded">${game.price}</span>
                    </div>
                    <div class="content has-text-centered" style="padding-bottom:10px">
                      <a class="button forModal is-uppercase is-info is-inverted is-small has-text-weight-bold" data-game-id="${game.id}" >Read more</a>
                      <a class="button cart is-uppercase is-primary is-inverted is-small has-text-weight-bold">Add to Cart</a>
                    </div>
                  </div>
                </div>
                `
          })
        }
      }
    })
  })
})

/* SEARCH */
let searchBtn = document.querySelector('#searchBtn')
let searchGames = () => {
  let searchTerm = document.querySelector('#searchField')
  if (searchTerm.value.toLowerCase()) {
    $.ajax({
      url: `${BASE}/assets/json/games.json`,
      dataType: 'json',
      success: (data) => {
        let result = data.filter(game => game.title.toLowerCase().startsWith(searchTerm.value.toLowerCase()))
        console.log(result)

        let content = ``
        container.innerHTML = ''

        result.forEach(game => {
          container.innerHTML += `
            <div class="column game is-one-third">
              <div class="card">
                <div class="card-image">
                  <figure class="">
                    <img class="equal" src="${game.image}" alt="${game.title}">
                  </figure>
                </div>
                <div class="card-content has-text-centered">
                  <h1 class="is-size-5 has-text-weight-bold">${game.title}</h1>
                  <h2 class="subtitle is-size-6">${game.devStudio}</h2>
                  <span class="tag is-link">${game.released}</span>
                  <span class="tag is-warning">${game.genre}</span>
                  <span class="tag is-primary price is-rounded">${game.price}</span>
                </div>
                <div class="content has-text-centered" style="padding-bottom:10px">
                  <a class="button forModal is-uppercase is-info is-inverted is-small has-text-weight-bold" data-game-id="${game.id}" >Read more</a>
                  <a class="button cart is-uppercase is-primary is-inverted is-small has-text-weight-bold">Add to Cart</a>
                </div>
              </div>
            </div>
            `
        })
      }
    })
  } else {
    alertify.set('notifier', 'position', 'top-center');
    alertify.notify('No games found. Please try again!', 'customDanger', 2)
    data.forEach(game => {
      container.innerHTML += `
        <div class="column game is-one-third">
          <div class="card">
            <div class="card-image">
              <figure class="">
                <img class="equal" src="${game.image}" alt="${game.title}">
              </figure>
            </div>
            <div class="card-content has-text-centered">
              <h1 class="is-size-5 has-text-weight-bold">${game.title}</h1>
              <h2 class="subtitle is-size-6">${game.devStudio}</h2>
              <span class="tag is-link">${game.released}</span>
              <span class="tag is-warning">${game.genre}</span>
              <span class="tag is-primary price is-rounded">${game.price}</span>
            </div>
            <div class="content has-text-centered" style="padding-bottom:10px">
              <a class="button forModal is-uppercase is-info is-inverted is-small has-text-weight-bold" data-game-id="${game.id}" >Read more</a>
              <a class="button cart is-uppercase is-primary is-inverted is-small has-text-weight-bold">Add to Cart</a>
            </div>
          </div>
        </div>
        `
    })
  }

}

let toggle = document.querySelector('.navbar-burger'),
	sidebar = document.querySelector('.sidebar');

//Arrow function
window.onload = () => {
	searchBtn.addEventListener('click', searchGames)
	toggle.addEventListener('click', showSideBar)
}

let showSideBar = () => {
	sidebar.classList.toggle('sidebar-active'), toggle.classList.toggle('is-active')
};

