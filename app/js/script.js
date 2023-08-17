// GET DATA
let DATA;
async function getData() {															
	let resp = await fetch('https://jsonplaceholder.typicode.com/photos');		
	if(resp.ok) {								
		DATA = await resp.json();	
		btnLoadMore.onclick = addImage;
	}
}
getData();


// ADD CARD
const cardList 		= document.querySelector('.cards__list');
const btnLoadMore 	= document.querySelector('.cards__btn-load-more');
let loaded = Array.from(cardList.children);
let availableData = [];
let maxCount = 30;

function addImage() {
	availableData = DATA.slice([loaded.length], [maxCount]);
	if(loaded.length < maxCount) {
		for(i=0; i<5; i++) {
			loaded.push(availableData[i]);
			let html = `
				<li class="card">
					<a href="" class="card__link">
						<div class="card__img-wrap">
							<img src="${availableData[i].url}" alt="" class="card__img">
						</div>
						<div class="card__text">
							<h4 class="card__title">bridge</h4>
							<h6 class="card__subtitle">How to increase your productivity with a Music</h6>
							<p class="card__description">
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem santium doloremque laudantium, totam rem sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolo…
							</p>
							<span class="card__author-post">Posted by <b>Eugenia</b>, on July  24, 2019</span>
							<button class="card__btn">
								<span class="card__btn-text">Continue reading</span>
							</button>
						</div>
					</a>
				</li>
			`;
			cardList.insertAdjacentHTML('beforeend', html);
		}
	}
	else {
		alert('не более 30 карточек');
	}
}

// POPUP
const popup 				= document.querySelector('.popup');
const popupForm 			= document.querySelector('.popup__form');
const popupClose 			= document.querySelector('.popup__btn-close');
const send 					= document.querySelector('.popup__btn-send');

let reg = {
	username: /^[a-zA-Zа-яёА-ЯЁ]+$/u,
	email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
	tel: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11,11}$/,
}


function validation(form) {


	function removeError(input) {
		const parent = input.parentNode;
		if(parent.classList.contains('error')) {
			parent.querySelector('.error-label').remove();
			parent.classList.remove('error');
		}
		parent.classList.remove('error');
	}
	function createError(input, text) {
		const parent = input.parentNode;
		const errorLabel = document.createElement('label');
		errorLabel.classList.add('error-label');
		errorLabel.textContent = text;
		parent.classList.add('error');
		parent.append(errorLabel);
	}
	let result = true;

	form.querySelectorAll('input').forEach(input=> {
		removeError(input);
		if(reg[input.name].test(input.value)) {
			input.classList.add('valid');
		}
		else {
			input.classList.add('invalid');
			if(input.value == '') {
				createError(input, 'Заполните это поле!');
			}
			else {
				createError(input, 'Некорректный ввод');
			}
			result = false;
		}

	})
	return result;
}

popupForm.addEventListener('submit', function(event) {
	event.preventDefault();
	if(validation(this) == true) {
		send.classList.add('done');
		send.querySelector('span').innerHTML = 'Заявка отправлена';
		this.querySelectorAll('input').forEach(item=> {
			item.disabled = true;
		})
	}
})


document.querySelectorAll('.send-application').forEach(btn=> {
	btn.addEventListener('click', function(event) {
		popup.classList.add('active');
	})
})

popupClose.addEventListener('click', function(event) {
	popup.classList.remove('active');
})


// MOBILE MENU
const burger = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');

burger.addEventListener('click', function(event) {
	this.classList.toggle('active');
	this.closest('.header').classList.toggle('fixed');
	mobileMenu.classList.toggle('active');

})