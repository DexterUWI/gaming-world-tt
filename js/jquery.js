var _this = this;
$(document).ready(() => {
	 alertify.set('notifier','position', 'bottom-left');
	alertify.notify('Welcome to Gaming World TT!', 'custom', 2);
	let a = document.querySelector('.servicesContainer'),
		b = ``;
	$.ajax({
		type: 'GET',
		url: `${'https://gaming-world-tt.web.app'}/assets/json/services.json`,
		dataType: 'json',
		success: d => {
			d.forEach(f => {
				//using string interpolation to render data on the Document Object Model (DOM)
				//for every object in the JSON file we want to render the icon, heading and description in the .servicesContainer of the index.html page
				b += `<div class="column">
                  <div class="box">
                    <figure class="image service-img is-256x256"> 
                      <img src="${f.icon}" alt="${f.heading}"/>
                    </figure>
                    <h1 class="has-text-weight-bold has-text-centered has-text-link is-size-4" style="padding-top: 20px">${f.heading}</h1>
                    <p class="has-text-weight-light has-text-centered">${f.desc}</p>
                  </div>
               </div>`, a.innerHTML = b
			})
		},
		error: (d, f, g) => console.log(g)
	}), $('.arrowToTop').click(() => {
		$('html,body').animate({
			scrollTop: 0
		}, 1e3)
	}), $(window).scroll(() => {
		400 < $(_this).scrollTop() ? (setTimeout(() => {
			$('.arrowToTop').addClass('opacityActive')
		}, 100), $('.arrowToTop').addClass('visible')) : $('.arrowToTop').removeClass('visible')
	}), $('#subscribeBtn').click(() => {
		$('#envelope').hasClass('icon-success') ? ($('#newsletter').val(''), $('#envelope').removeClass('icon-success'), alertify.notify('Thank you for subscribing!', 'customSuccess', 2)) : $('#envelope').hasClass('icon-danger') && ($('#envelope').removeClass('icon-danger'), alertify.notify('Invalid e-mail.', 'customDanger', 2))
	})
});

