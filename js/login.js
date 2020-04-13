let deleteBtn = document.querySelector('#modalHide'),
	loginBtn = document.querySelector('#loginBtn'),
	loginMail = document.querySelector('#loginMail'),
	loginPwd = document.querySelector('#loginPwd'),
	mailEnvelope = document.querySelector('#mailEnvelope'),
	pwdLock = document.querySelector('#pwdLock'),
	hideModal = () => {
		let a = document.querySelector('#loginModal');
		a.classList.add('opacityHide')
	},
	loginNotification = () => {
		let a = document.querySelector('#loginModal');
		a.classList.add('opacity1to0'), mailEnvelope.classList.contains('icon-danger') || pwdLock.classList.contains('icon-danger') ? loginBtn.setAttribute('disabled', !0) : mailEnvelope.classList.contains('icon-success') && pwdLock.classList.contains('icon-success') && (loginBtn.classList.add('is-loading'), alertify.set('notifier', 'position', 'top-center'), alertify.notify('You have been successfully logged in.', 'custom'), setTimeout(() => {
			window.location.href = 'store.html'
		}, 1500))
	},
	mailBlur = () => {
		let a = /^[a-zšđžćč]{4,}(\.)?[a-zšđžćč]{4,}([0-9]{0,5})?\@((gmail)|(outlook)|(msn)|(live)|(hotmail)|(yahoo)|\w)\.com$/;
		a.test(loginMail.value) ? (mailEnvelope.classList.add('icon-success'), loginBtn.removeAttribute('disabled', !0)) : (mailEnvelope.classList.add('icon-danger'), loginBtn.setAttribute('disabled', !0))
	},
	pwdBlur = () => {
		let a = /^[a-zšđžćč]{2,20}[0-9]{1,}$/;
		a.test(loginPwd.value) ? (pwdLock.classList.add('icon-success'), loginBtn.removeAttribute('disabled', !0)) : (pwdLock.classList.add('icon-danger'), loginBtn.setAttribute('disabled', !0))
	};
window.onload = () => {
	loginMail.focus(), loginBtn.addEventListener('click', loginNotification), deleteBtn.addEventListener('click', hideModal), loginMail.addEventListener('blur', mailBlur), loginPwd.addEventListener('blur', pwdBlur), loginMail.addEventListener('focus', removeClasses), loginPwd.addEventListener('focus', removeClasses)
};
let removeClasses = a => {
	a.target.classList.contains('icon-danger') ? a.target.classList.remove('icon-danger') : a.target.classList.contains('icon-success') && a.target.classList.remove('icon-success'), mailEnvelope.classList.contains('icon-success') && pwdLock.classList.contains('icon-success') && loginBtn.hasAttribute('disabled') && loginBtn.removeAttribute('disabled')
};