$(document).ready(function() {
	$("a#projectImg").fancybox();
});

let toggle = document.querySelector('.navbar-burger'),
	sidebar = document.querySelector('.sidebar'),
	arrowToTop = document.querySelector('.arrowToTop'),
	newsletter = document.querySelector('#newsletter'),
	subscribeBtn = document.querySelector('#subscribeBtn');
window.onload = () => {
	toggle.addEventListener('click', showSideBar), newsletter.addEventListener('blur', newsletterValidatation), subscribeBtn.addEventListener('click', newsletterNotification)
};
let showSideBar = () => {
		sidebar.classList.toggle('sidebar-active'), toggle.classList.toggle('is-active')
	},
	newsletterValidatation = () => {
		let a = newsletter.value,
			b = /^[a-zšđžćč]{4,}(\.)?[a-zšđžćč]{4,}([0-9]{0,5})?\@((gmail)|(outlook)|(msn)|(live)|(hotmail)|(yahoo)|\w)\.com$/,
			c = document.querySelector('#envelope');
		b.test(a) ? c.classList.add('icon-success') : c.classList.add('icon-danger')
	};

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
