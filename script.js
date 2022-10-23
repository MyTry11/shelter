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

// const modalh3 = document.querySelector('.modal_h3')
// modalh3.textContent = 'Woody'
// console.log(modalh3);


const petsObj = {
    Katrine: {
        img: 'images/4cbff971ed3cff4fcdd44ba6ce66e1be.png',
        name: 'Katrine',
        animal: 'Cat - Chartreux Cat Breed',
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi commodi perspiciatis eligendi dolore corporis quisquam minima, dicta atque vitae nisi quidem ipsa voluptas enim repudiandae in quasi? Blanditiis, labore! Nostrum!",
        age: '7 months',
        innoculations: 'none',
        diseases: 'none',
        parasites: 'none'
    },
    Jennifer: {
        img: 'images/b523e1700aa8817d3357edad5cf38558.png',
        name: 'Jennifer',
        animal: 'Dog - Labrador',
        about: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        age: '2 months',
        innoculations: 'none',
        diseases: 'none',
        parasites: 'none'
    },
    Woody: {
        img: 'images/d18a0a8b1c7ed291ade3e2e10ff4ebfe.png',
        name: 'Woody',
        animal: 'Dog - NeLabrador',
        about: "Animi commodi perspiciatis eligendi dolore corporis quisquam minima, dicta atque vitae nisi quidem ipsa voluptas enim repudiandae in quasi? Blanditiis, labore! Nostrum!",
        age: '2 years',
        innoculations: 'none',
        diseases: 'none',
        parasites: 'none'
    }
}

function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)

const colors = [
    'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red',
    'silver', 'teal', 'yellow'
]

const randomPet = function (obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]]
};

function moveToSlide(slider, currentSlide, targetSlide) {

    if (!targetSlide) {
        
        targetSlide = document.createElement('li')
        targetSlide.classList.add('slide')
        currentSlide === slides[slides.length - 1]
          ? (slider.append(targetSlide), slides.push(targetSlide))
          : (slider.prepend(targetSlide), slides.unshift(targetSlide))
        slides.forEach(setSlidePosition);

        const sliderCardNames = targetSlide.querySelectorAll('.slider_card_p')
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')
        div1.classList.add('slider_card')
        div2.classList.add('slider_card')
        div3.classList.add('slider_card')
        targetSlide.append(div1)
        targetSlide.append(div2)
        targetSlide.append(div3)
        
        const pet1 = randomPet(petsObj);
        const pet2 = randomPet(petsObj);
        const pet3 = randomPet(petsObj);
        const img1 = document.createElement('img')
        const img2 = document.createElement('img')
        const img3 = document.createElement('img')
        img1.classList.add('slider_card_img')
        img2.classList.add('slider_card_img')
        img3.classList.add('slider_card_img')
            
        img1.src = pet1.img
        img2.src = pet2.img
        img3.src = pet3.img
        div1.append(img1)
        div2.append(img2)
        div3.append(img3)

        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        const p3 = document.createElement('p')
        p1.innerHTML = pet1.name
        p2.innerHTML = pet2.name
        p3.innerHTML = pet3.name
        p1.classList.add('slider_card_p')
        p2.classList.add('slider_card_p')
        p3.classList.add('slider_card_p')
        div1.append(p1)
        div2.append(p2)
        div3.append(p3)

        const btn1 = document.createElement('button')
        const btn2 = document.createElement('button')
        const btn3 = document.createElement('button')
        btn1.innerHTML = 'Learn more';
        btn2.innerHTML = 'Learn more';
        btn3.innerHTML = 'Learn more';
        btn1.classList.add('slider_card_btn')
        btn2.classList.add('slider_card_btn')
        btn3.classList.add('slider_card_btn')
        btn1.classList.add('open-modal')
        btn2.classList.add('open-modal')
        btn3.classList.add('open-modal')
        div1.append(btn1)
        div2.append(btn2)
        div3.append(btn3)

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
    moveToSlide(slider, currentSlide, nextSlide);
})

prevButton.addEventListener('click', () => {
    const currentSlide = slider.querySelector('.current_slide')
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(slider, currentSlide, prevSlide)
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
        console.log(nameM);

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