$(document).ready(function () {
  $(document).on("click", ".forModal", showModal)
  var count = 1
  $(document).on("click", ".cart", () => {

    $('.badge').attr('data-value', count)
    count++
    alertify.notify('Added to Cart. <i class="fas fa-shopping-cart"></i>', 'custom', 2)
  })
})
const BASE_URL = 'https://gaming-world-tt.web.app/'
let modal = document.querySelector('.gameModal')

let hideModal = () => {
  modal.classList.remove('is-active')
  modal.classList.remove('opacityActive')
}
let showModal = (e) => {
  let id = parseInt(e.target.attributes[1].textContent)
  // ajax call 
  // jquery modal is-active
  // filter => id
  $.ajax({
    type: 'GET',
    url: `${BASE_URL}/assets/json/games.json`,
    dataType: 'json',
    success: (data) => {
      //filter
      let game = data.filter(game => id === game.id)[0]
      let gallery = ''
      game.screens.forEach(screen => {
        gallery += `<a data-fancybox="gallery" href="${screen}"><img src="${screen}"/></a>`
      })
	//using string interpolation to render data on the Document Object Model (DOM)
      let content = `   
                   <div class="modal-background" onclick="hideModal()"></div>
                    <div class="modal-card">
                    <section class="modal-card-body">

                      <button class="delete modal-delete" onclick="hideModal()" aria-label="close"></button>
                      <div class="top">
                        <div>
                            <h1 class="title has-text-weight-bold">${game.title}</h1>
                            <h2 class="subtitle">${game.devStudio}</h2>
                        </div>
                        <div>
                            <span class="tag is-link">${game.released}</span>
                            <span class="tag is-warning">${game.genre}</span>
                            <span class="tag is-primary price is-rounded">${game.price}</span>
                        </div>
                      </div>
                      <div class="content has-text-justified">
                        <p>${game.description}</p>
                      </div>
                      <hr>
                      <div>
                          <h1 class="title has-text-weight-bold">Game Modes</h1>
                          <h2 class="subtitle">${game.modes}</h2>
                      </div>
                      <hr>
                      <div>
                          <h1 class="title has-text-weight-bold">Publisher</h1>
                          <h2 class="subtitle">${game.publisher}</h2>
                      </div>
                      <hr>
                      <h1 class="title has-text-weight-bold">Screenshots</h1>
                      <div class="game-gallery">
                          ${gallery}
                      </div>
                    </section>
                  </div>
                      `
      modal.innerHTML = content
      modal.classList.add('is-active')
      setTimeout(() => {
        modal.classList.add('opacityActive')
      }, 100)
    }
  })
}


/*
JAVASCRIPT CODE FOR USER AUTHENTICATION VIA GOOGLE
No semicolons used due to Automatic Semicolon Insertion (ASI) rules in javascript ;)
*/
let auth2, googleUser

let appStart = function() {
  gapi.load('auth2', initSignInV2)
}


let initSignInV2 = function() {
  auth2 = gapi.auth2.init({
    client_id: '814165126315-nadlnjfl6tgrvcbkplq53of558qo9ikq.apps.googleusercontent.com',
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
  googleUser = user

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
// Begin app
appStart()
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
// Begin app
appStart()

