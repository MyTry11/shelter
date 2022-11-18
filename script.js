import petsObj from './petsObj.js';

const navToggle = document.querySelector('.header_burger_btn')
const body = document.querySelector('body')
const gradientTop = document.querySelector('.gradient_top')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open')
})

gradientTop.addEventListener('click', () => {
    document.body.classList.remove('nav-open')
})

// carousel
const slider = document.querySelector('.pets_cards_container');
const slides = Array.from(slider.children)
const prevButton = document.querySelector('.slider_prev_btn')
const nextButton = document.querySelector('.slider_next_btn')
const slideWidth = slides[0].getBoundingClientRect().width;
const modal = document.querySelector("#modal");
const openModal = document.querySelectorAll(".open-modal");

const closeModal = document.querySelector(".close-modal");
let cardsCount = '';
let existingPets = []
const names = document.querySelectorAll('.slider_card_p')
// const dotsNav = document.querySelector('.carousel_nav')
// const dots = Array.from(dotsNav.children) 
// const btnSlideWidth = dots[0].getBoundingClientRect().width;

function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)

// function setBtnSlidePosition(slide, index) {
//     slide.style.left = btnSlideWidth * index + 'px';
// }
// dots.forEach(setBtnSlidePosition)

const fixExistingCards = function() {
    for (let i = 0; i < names.length; i++) {
        existingPets.push(names[i].textContent)
    }
    if(slideWidth === 580) {
        existingPets.splice(0, 2)
    } else if(slideWidth === 270) {
        existingPets.splice(0, 4)
    }
    
}
fixExistingCards()

const randomPet = function (obj) {
    const keys = Object.keys(obj);
    let thePet = obj[keys[keys.length * Math.random() << 0]]
    if(existingPets.includes(thePet.name)) {
        return randomPet(obj)
    }
    else { 
        existingPets.push(thePet.name)
        return thePet
    }
    
};

function cardsCounter() {
    if(slideWidth >= 1096) {
        cardsCount = 3
    } else if(slideWidth >= 580) {
        cardsCount = 2
    } else if(slideWidth >= 270) {
        cardsCount = 1
    }
}
cardsCounter()

// function removeCards() {
//     const firstSlide = document.querySelector('.first_slide')
//     const secondSlide = document.querySelector('.second_slide')
//     if(slideWidth >= 1096) {
//         
//     } else if(slideWidth === 270) {
//         for(let i = 7; i >= 0; i--) {
//             if(i > 2){
//                 firstSlide.children[i].remove()
//                 secondSlide.children[i].remove()
//             }
//         }
//     } else if(slideWidth === 580) {
//         for(let i = 7; i >= 0; i--) {
//             if (i > 5) {
//                 firstSlide.children[i].remove();
//                 secondSlide.children[i].remove()
//             }
//         }
//         for(let i = 11; i >= 0; i--) {
//             if(i > 7 ) {
//                 dotsNav.children[i].remove()
//             }
//         }

//     }
     
// }

// window.addEventListener('load', () => {
//     removeCards()
// })


function moveToSlide(slider, currentSlide, targetSlide) {
    if (!targetSlide) {
        targetSlide = document.createElement('li')
        targetSlide.classList.add('slide')
        currentSlide === slides[slides.length - 1]
          ? (slider.append(targetSlide), slides.push(targetSlide))
          : (slider.prepend(targetSlide), slides.unshift(targetSlide))
        slides.forEach(setSlidePosition);
        for(let i = 0; i <= cardsCount - 1; i++) {
            targetSlide.append(document.createElement('div'));
            const divs = targetSlide.childNodes;
            divs[i].classList.add('slider_card');
            const pet = randomPet(petsObj);
            const img = document.createElement('img')
            img.classList.add('slider_card_img')
            img.src = pet.img
            divs[i].append(img)
            const p = document.createElement('p')
            p.innerHTML = pet.name
            p.classList.add('slider_card_p')
            divs[i].append(p)
            const btn = document.createElement('button')
            btn.innerHTML = 'Learn more';
            btn.classList.add('slider_card_btn')
            btn.classList.add('open-modal')
            divs[i].append(btn)
        }

        const openModalFnc = document.querySelectorAll(".open-modal");
        for (let i = 0; i < openModalFnc.length; i++) {
            openModalFnc[i].addEventListener("click", () => {
                modal.showModal();
            });
        }
    }
    slider.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current_slide')
    targetSlide.classList.add('current_slide')
}



nextButton.addEventListener('click', () => {
    const currentSlide = slider.querySelector('.current_slide');
    const nextSlide = currentSlide.nextElementSibling;
console.log(currentSlide.style.left);
    if((slideWidth === 1200 && currentSlide.style.left != `${1200 * 5}px`) || 
    (slideWidth === 580 && `${currentSlide.style.left}` != `${580 * 7}px`) ||
    (slideWidth === 270 && `${currentSlide.style.left}` != `${270 * 15}px`)) {
    moveToSlide(slider, currentSlide, nextSlide);
    }
})

prevButton.addEventListener('click', () => {
    const currentSlide = slider.querySelector('.current_slide')
    const prevSlide = currentSlide.previousElementSibling;
    if(prevSlide != null) {
        moveToSlide(slider, currentSlide, prevSlide);
    }
})

window.addEventListener('load', () => {
    const currentSlide = slider.querySelector('.current_slide')
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(slider, currentSlide, nextSlide)
})
    
for (let i = 0; i < openModal.length; i++) {
    openModal[i].addEventListener("click", () => {
        modal.showModal();
        
    });
}
window.addEventListener('click', (event) => {
    const target = event.target
    if(target.textContent === 'Learn more') {
        const petName = event.target.previousElementSibling;
        const imgM = document.querySelector('.modal_img')
        const nameM = document.querySelector('.modal_h3')

        const animalM = document.querySelector('.modal_h4')
        const aboutM = document.querySelector('.modal_h5')
        const ageM = document.querySelector('.age')
        for (const [key, value] of Object.entries(petsObj)) {
            if(petName.textContent === key) {
                nameM.textContent = value.name;
                imgM.src = value.img;
                animalM.textContent = value.animal;
                aboutM.textContent = value.about;
                ageM.textContent = value.age;
            }
        }
    }
})
  
closeModal.addEventListener("click", () => {
    modal.close();
});