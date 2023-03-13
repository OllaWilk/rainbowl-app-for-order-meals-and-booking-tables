const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0; let slideInterval;
function showSlide(n) {   slides.forEach(slide => slide.style.display = 'none');
slides[n].style.display = 'block'; }
function activateDot(n) {
      dots.forEach(dot => dot.classList.remove('active'));
       dots[n].classList.add('active'); }  function changeSlide(n)
       {   currentSlide = (n + slides.length) % slides.length;   showSlide(currentSlide);   activateDot(currentSlide); }  function startSlideInterval()
{   slideInterval = setInterval(() =>