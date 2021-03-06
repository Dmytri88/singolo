// Выключение экрана теефонов

const iPhones = document.querySelectorAll('.iPhone');
iPhones.forEach((iPhone) => {
  const screen = iPhone.querySelector('.iPhone_background');
  const touch = iPhone.querySelectorAll('.touch');
  touch.forEach((el) => {
    el.addEventListener('click', () => {screen.classList.toggle('background_no-image')})
  })
})

// Слайдер с телефонами

const slider = (function () {

  const section = document.getElementById('slider-section');
  section.addEventListener('mousedown', (e)=>{e.preventDefault()});

  const slides = document.querySelectorAll('.slide');

  const btnNext = document.getElementById('slider-next');
  const btnPrevious = document.getElementById('slider-previous');

  let action;

  let current  = (function () {
      for (let i=0; i<slides.length; i++) {
        if (slides[i].classList.contains('visible_slide')) {
          return i;
        }
      }
    })();
  
  function prepare () {
    for (let i=0; i<slides.length; i++) {
      slides[i].classList.remove('previous_slide', 'next_slide', 'trash_next', 'trash_previous');
      if (i !== current) {
        slides[i].classList.remove('visible_slide');
      }
    }
  }

  function next () {
    action = false;
    removeBtnListeners();
    setTimeout(addActionListeners, 500);
    
    prepare();
    
    let nextIndex;
    if (current < slides.length - 1) {
      nextIndex = current + 1;
    }else{
      nextIndex = 0;
    }
    
    const currentSlide = slides[current];
    const nextSlide = slides[nextIndex];
    current = nextIndex;
    nextSlide.classList.add('next_slide');
    currentSlide.classList.add('trash_next');
    nextSlide.addEventListener('animationend', () => {
      nextSlide.classList.add('visible_slide');
      removeActionListeners();
      if (action) {
        setTimeout(action);
      }else{
        addBtnListeners();
      }
    }, {once:true});

    section.style.backgroundColor = current % 2 === 0 ? '#ef6c64' : '#648BF0';
  }

  function previous () {

    action = false;
    removeBtnListeners();
    setTimeout(addActionListeners, 500);

    prepare();
    let previousIndex;
    if (current > 0) {
      previousIndex = current - 1;
    }else{
      previousIndex = slides.length - 1;
    }
    
    const currentSlide = slides[current];
    const previousSlide = slides[previousIndex];
    current = previousIndex;
    previousSlide.classList.add('previous_slide');
    currentSlide.classList.add('trash_previous');
    previousSlide.addEventListener('animationend', () => {
      previousSlide.classList.add('visible_slide');
      removeActionListeners();
      if (action) {
        setTimeout(action);
      }else{
        addBtnListeners();
      }
    }, {once:true});

    section.style.backgroundColor = current % 2 === 0 ? '#ef6c64' : '#648BF0';
  }

  function setActionNext () {
    action = next;
  }

  function setActionPrevious () {
    action = previous;
  }
  
  function addActionListeners () {
    btnPrevious.addEventListener('click', setActionPrevious);
    btnNext.addEventListener('click', setActionNext);
  }

  function removeActionListeners () {
    btnPrevious.removeEventListener('click', setActionPrevious);
    btnNext.removeEventListener('click', setActionNext);
  }

  function addBtnListeners () {
    btnNext.addEventListener('click', next);
    btnPrevious.addEventListener('click', previous);
  }

  
  function removeBtnListeners () {
    btnNext.removeEventListener('click', next);
    btnPrevious.removeEventListener('click', previous);
  }

  return {
    next,
    previous,
    start: addBtnListeners
  }
})();

slider.start();

//Меню + Хедер


const anchors = document.querySelectorAll('.anchor');
const navigationItems = document.querySelectorAll('.navigation_list>li');
let currentNavigationItem = document.getElementById('anchor_home');

const followCurrentNavigationItem = () => {
  
  currentNavigationItem.classList.remove('current');

  let currentItem = anchors[0];
  anchors.forEach((el) => {
    const currTop = currentItem.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    
    if (elTop < window.innerHeight/2 && currTop < elTop) {
      currentItem = el;
    }
  });
  
  currentNavigationItem = document.getElementById(`${currentItem.dataset.anchor}`);
  currentNavigationItem.classList.add('current');
}

window.addEventListener('scroll', followCurrentNavigationItem);



// Портфолио

const filter = document.getElementById('filter');
const wall = document.getElementById('wall');
const projects = wall.querySelectorAll('[data-category]');
let currentCategory = filter.querySelector('[data-category]');

filter.addEventListener('click', (e) => {
  currentCategory.classList.remove('selected');
  currentCategory = e.target;
  currentCategory.classList.add('selected');

  projects.forEach((project) => {
    if (project.dataset.category === currentCategory.dataset.category) {
      project.classList.add('current-category');
    }else{
      project.classList.remove('current-category');
    }
  })
})

let selectedProject;
wall.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
    if (selectedProject) {
      selectedProject.classList.remove('selected_project');
    }
    selectedProject = e.target;
    selectedProject.classList.add('selected_project');
  }
})
  
  
//Форма

const name = document.querySelector('.form_name');
const email = document.querySelector('.form_email');
const subject = document.querySelector('.form_subject');
const detail = document.querySelector('.form_detail');
const formSubmit = document.querySelector('.form_submit');

const modalWindow = document.getElementById('modal_window');
const modalAlert = document.getElementById('modal_alert');
const modalMessage = document.getElementById('modal_message');
const modalButton = document.getElementById('modal_button');

const validateEmail = () => {
  if (/^.+@.+\..+$/i.test(email.value)) {
    email.classList.remove('invalid');
    return true;
  }else{
    email.classList.add('invalid');
    return false;
  }
}

const validateName = () => {
  if (/^[a-zа-яё\s]{2,}$/i.test(name.value)) {
    name.classList.remove('invalid');
    return true;
  }else{
    name.classList.add('invalid');
    return false;
  }
}

name.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!validateEmail() || !validateName()) {
    if (!validateName()) {
       name.focus();
    }else{
      email.focus();
    }
  }else{
    modalWindow.classList.add('visible');
    modalButton.addEventListener('click', () => {
      modalWindow.classList.remove('visible');
      
      modalMessage.innerHTML ='';
      name.value = '';
      email.value = '';
      subject.value = '';
      detail.value = '';      
    }, {once:true});

    const theme = document.createElement('p');
    theme.textContent = subject.value !== '' ? `Subject: ${subject.value}` : 'No subject';
    modalMessage.append(theme);
    
    const description = document.createElement('p');
    description.textContent = detail.value !== '' ? `Description: ${detail.value}` : 'No description';
    modalMessage.append(description);
  }
});
