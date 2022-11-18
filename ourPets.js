import petsObj from "./petsObj.js"

const navToggle = document.querySelector('.header_burger_btn')
const body = document.querySelector('body')
const main = document.querySelector('.main')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open')
})

main.addEventListener('click', () => {
    document.body.classList.remove('nav-open')
})

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
const dotsNav = document.querySelector('.carousel_nav')
const dots = Array.from(dotsNav.children) 
const btnSlideWidth = dots[0].getBoundingClientRect().width;
// console.log(btnSlideWidth);

function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)

function setBtnSlidePosition(slide, index) {
    slide.style.left = btnSlideWidth * index + 'px';
}
dots.forEach(setBtnSlidePosition)



const fixExistingCards = function() {
    for (let i = 0; i < names.length; i++) {
        existingPets.push(names[i].textContent)
    }
    if(slideWidth === 580) {
        existingPets.splice(0, 4)
    } else if(slideWidth === 270) {
        existingPets.splice(0, 10)
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
        cardsCount = 8
    } else if(slideWidth >= 580) {
        cardsCount = 6
    } else if(slideWidth >= 270) {
        cardsCount = 3
    }
}
cardsCounter()

function removeCards() {
    const firstSlide = document.querySelector('.first_slide')
    const secondSlide = document.querySelector('.second_slide')
    if(slideWidth >= 1096) {
        for(let i = 11; i >= 0; i--) {
            if(i > 5 ) {
                dotsNav.children[i].remove()
            }
        }
    } else if(slideWidth === 270) {
        for(let i = 7; i >= 0; i--) {
            if(i > 2){
                firstSlide.children[i].remove()
                secondSlide.children[i].remove()
            }
        }
    } else if(slideWidth === 580) {
        for(let i = 7; i >= 0; i--) {
            if (i > 5) {
                firstSlide.children[i].remove();
                secondSlide.children[i].remove()
            }
        }
        for(let i = 11; i >= 0; i--) {
            if(i > 7 ) {
                dotsNav.children[i].remove()
            }
        }

    }
     
}

window.addEventListener('load', () => {
    removeCards()
})


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
            img.classList.add('img_270')
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
    const currentDot = dotsNav.querySelector('.current_slide')
    const nextDot = currentDot.nextElementSibling

    if((slideWidth === 1200 && currentSlide.style.left != `${1200 * 5}px`) || 
        (slideWidth === 580 && `${currentSlide.style.left}` != `${580 * 7}px`) ||
        (slideWidth === 270 && `${currentSlide.style.left}` != `${270 * 15}px`)) {
        moveToSlide(slider, currentSlide, nextSlide);
        updateDots(currentDot, nextDot)
    }
    
})

prevButton.addEventListener('click', () => {
    const currentSlide = slider.querySelector('.current_slide')
    let prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide')
    const prevDot = currentDot.previousElementSibling

    if(prevSlide != null) {
        moveToSlide(slider, currentSlide, prevSlide);
        updateDots(currentDot, prevDot) 
    }
})

const updateDots = (currentDot, targetDot) => {
    console.log(targetDot.style.left);
    console.log(slideWidth);
    if(targetDot.style.left <= '168px' && slideWidth === 1200){
        dotsNav.style.transform = `translateX(-${targetDot.style.left})`;
    } else if(targetDot.style.left <= '280px' && slideWidth === 580) {
        dotsNav.style.transform = `translateX(-${targetDot.style.left})`;
    } 
    else if(targetDot.style.left <= '504px' && slideWidth === 270) {
        dotsNav.style.transform = `translateX(-${targetDot.style.left})`;
    }
    
    currentDot.classList.remove('current_slide')
    targetDot.classList.add('current_slide')
    
}

dotsNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentSlide = slider.querySelector('.current_slide')
    const currentDot = dotsNav.querySelector('.current_slide')
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(slider, currentSlide, targetSlide)
    updateDots(currentDot, targetDot)
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

