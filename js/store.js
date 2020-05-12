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


//For every object in the JSON file we want to render the image, title, developer, release date, genre, and price attributes as well as "Read More" and "Add to Cart" buttons, in the .gameContainer of the store.html page. This is all done using AJAX.
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


/*
JAVASCRIPT CODE FOR USER AUTHENTICATION VIA GOOGLE
No semicolons used due to Automatic Semicolon Insertion (ASI) rules in javascript ;)
*/
let auth2, googleUser

let appStart = function() {
  gapi.load('auth2', initSignInV2) //load auth2 module to enable Google Sign-In 
}


let initSignInV2 = function() {
  auth2 = gapi.auth2.init({ //initialize 
    client_id: 'YOUR_CLIENT_ID_HERE',
    scope: 'profile'
  })

  // Listen for sign in changes
  auth2.isSignedIn.listen(signinChanged)

  // Listen for user changes
  auth2.currentUser.listen(userChanged)

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn()
  }

  refreshValues()

} // End of initSignInV2

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function(val) {
  console.log('Signin state changed to ', val)
  if (auth2.isSignedIn.get()) {
    buttonControl(false)
    document.getElementById('button-sign-out').addEventListener('click', function() {
      auth2.signOut()
				alertify.set('notifier', 'position', 'bottom-left');
		alertify.notify('Signed out!', 'customDanger', 2);
    })
	   document.getElementById('button-sign-out-mobile').addEventListener('click', function() {
      auth2.signOut()
				alertify.set('notifier', 'position', 'bottom-left');
		alertify.notify('Signed out!', 'customDanger', 2);
    })
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.notify('Successfully Signed in!', 'customSuccess', 2);
  } else {
    buttonControl(true)
  }

}

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function(user) {
  console.log('User now: ', user)
  googleUser = user //Google user object that is returned after sign-in
}


var buttonControl = function (command) {
	if (auth2.isSignedIn.get()) {
		console.log("Adding Event Listener")
		document.getElementById('g-sign-in-wrapper').addEventListener('click', openUserInfo, true)
		document.getElementById('sign-in-button-mobile').addEventListener('click', openUserInfo, true)
	} else {
		document.getElementById('g-sign-in-wrapper').removeEventListener('click', openUserInfo, true)
		document.getElementById('sign-in-button-mobile').removeEventListener('click', openUserInfo, true)

	}

	if (command) {
		document.getElementById('sign-in-button-text').innerText = 'Sign in with Google'
		document.getElementById('sign-in-button-mobile').innerText = 'Sign in'
		
		/* Create event listener and invoke sign-in when the button is clicked */
		document.getElementById('g-sign-in-wrapper').addEventListener('click', signIn, true)
		document.getElementById('sign-in-button-mobile').addEventListener('click', signIn, true)
		document.getElementById('button-sign-out').style.display = 'none'
		document.getElementById('button-sign-out-mobile').style.display = 'none'
		document.getElementById('user-img').style.display = 'none'

	} else {
		var profile = googleUser.getBasicProfile()
		document.getElementById('sign-in-button-text').innerText = `Hi, ${profile.getName()}`
		document.getElementById('sign-in-button-mobile').innerText = `Hi, ${profile.getName()}`

		//document.getElementById('sign-in-button-text').innerText = 'Signed in with Google'
		console.log("Removing Event Listener")
		document.getElementById('sign-in-button-mobile').removeEventListener('click', signIn, true)
		document.getElementById('g-sign-in-wrapper').removeEventListener('click', signIn, true)
		document.getElementById('button-sign-out').style.display = ''
		document.getElementById('button-sign-out-mobile').style.display = ''
		document.getElementById('user-img').style.display = ''
		document.getElementById('user-img').src = profile.getImageUrl()
	}
}

// Wrapping Google's signIn inside a function expression so we can add/remove it when needed.
var signIn = function() {
  auth2.signIn()
}


// Retrieves the current user and signed in states from the GoogleAuth object.
var refreshValues = function() {

  if (auth2.isSignedIn.get()) {
    buttonControl(false)
  } else {
    buttonControl(true)
  }

}

function openUserInfo() {

	var profile = googleUser.getBasicProfile()
	console.log(profile)

	// open an AlertifyJS custom alert, while passing HTML elements as strings to the title, and the body
	alertify.alert(
		"<b>USER DETAILS (logged in via Google)</b>",
		//using string interpolation to render data on the Document Object Model (DOM)
		`<p><strong>ACCOUNT NAME:</strong> ${profile.getName()}</p>
		<img style="padding: 15px; border-radius: 95%;" src="${profile.getImageUrl()}"/>
		<p><strong>EMAIL:</strong> <a href = "mailto:${profile.getEmail()}" target = "_blank">${profile.getEmail()}</a></p>`
	);
}

function aboutProject() {
	// open an AlertifyJS custom alert, while passing HTML elements as strings to the title, and the body
	alertify.alert(
		"<b>ABOUT THIS PROJECT</b>",
						//using string interpolation to render data on the Document Object Model (DOM)
		`<a id="projectImg" href="../assets/images/flyer_connectech.jpg"><img src="../assets/images/flyer_connectech.jpg" alt=""/></a>`
	);
	
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

// Begin app
appStart()

