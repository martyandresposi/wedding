//-- UTILS

function isMobile(){
    return window.matchMedia("(max-width: 767px)").matches;
}

function countDown(){

    // Data del matrimonio
    var countDownDate = new Date("Apr 29, 2023 17:00:00").getTime();
    //var countDownDate = new Date("Nov 08, 2022 18:46:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements
        document.getElementById("day").innerHTML = days;
        document.getElementById("hour").innerHTML = hours;
        document.getElementById("minute").innerHTML = minutes;
        document.getElementById("second").innerHTML = seconds;
        
        // If the count down is finished, write some text
        if (distance <= 0) {
            clearInterval(x);
            finalCountDown();
        }

    }, 1000);
}

function finalCountDown(){
    document.getElementById("day").innerHTML = 0;
    document.getElementById("hour").innerHTML = 0;
    document.getElementById("minute").innerHTML = 0;
    document.getElementById("second").innerHTML = 0;

    var idyeah =  document.createElement("div");
    idyeah.setAttribute("id", "yeah");
    var imgYeah = document.createElement("img");
    imgYeah.setAttribute("src", "img/sposiFun.gif");
    idyeah.appendChild(imgYeah);

    document.getElementById("countdownTime").appendChild(idyeah);
}

function motion(event) {
    console.log(event);
    var imgFlower = document.querySelectorAll(".additionalFlower img");
    for (var i = 0; i < imgFlower.length; i++) {
        imgFlower[i].style.transform = "rotate("+ Math.round(event.acceleration.x) / 100 +"deg)";
    }
}


//-- HEADER HANDLER

function toogleMenu(){
    
    if(isMobile()){
        var hamBtn = document.getElementById("inputBtn");
        var container = document.getElementById("container");
        var containerMobile = document.getElementById("menu");
        var body = document.getElementsByTagName("body")[0];
        
        hamBtn.classList.toggle("menuActive");
        container.classList.toggle("menuActive");
        containerMobile.classList.toggle("menuActive");
        body.classList.toggle("hidden");
    }
    
}

function headerLinks(){

    //-- Se clicchi sull'ham chiudi/apri il menù
    var menuMobile = document.getElementById("btnMobile");
    menuMobile.addEventListener('click', function(e) {
        toogleMenu();
    });

    var menuObj = document.getElementById("menu");
    var dataLink = menuObj.querySelectorAll("[data-section]");

    for (var i = 0; i < dataLink.length; i++) {
        
        dataLink[i].addEventListener('click', function(e) {

            var liElement = e.target.parentElement;
            var liElements = liElement.parentElement.children;

            //-- Spegni menu mobile on click
            toogleMenu();

            //-- Togli righetta/ Aggiungi righetta sotto le voci di menù
            activeToggle(liElement, liElements);
                   
            //-- Vai alla sezione corrispondente
            var idSection = liElement.getAttribute('data-section');
            var offsetScroll = isMobile() ? 40 : 50;
            gsap.to(window, {duration: 2, scrollTo: {y: "#" + idSection, offsetY: offsetScroll}});
        });
    }

}

function activeToggle(e, elems) {
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    e.className = "active";
}

function arrowClick() {
    var arrow = document.getElementById("arrowBack");
    arrow.addEventListener('click', function(e) {
        gsap.to(window, {duration: 2, scrollTo: {y: 0}});
    });
}

//-- ANIMATIONS
function animationSet() {

    gsap.set("header", {top: "-50px", opacity: 0});
    gsap.set("#imgIntro", {scale: 0.8, opacity: 0});
    gsap.set(".titleHome", {y: 30, opacity: 0});
    gsap.set(".additionalFlower img", {scale: 0.5, opacity: 0});
    gsap.set(".gsapY", {y: -20, opacity: 0});
    gsap.set(".gsapXL", {x: -20, opacity: 0});
    gsap.set(".gsapXR", {x: 20, opacity: 0});

}

function animation() {

    //-- Home Intro
    var introTl = gsap.timeline({ onComplete: function(){ document.getElementsByTagName("body")[0].classList.remove("hidden")}});
    introTl.to("#imgIntro", {opacity: 1, scale: 1, duration: 1.2});
    introTl.to(".additionalFlower img", {opacity: 1, scale: 1, duration: 0.6, stagger: 0.1});
    introTl.to(".titleHome", {opacity: 1, y: 0, duration: 0.5, delay: 0.3});
    introTl.to("header", {top: 0, opacity: 1, duration: 0.5}, "<");

    var sections = gsap.utils.toArray('section');

    sections.forEach(function(section){

        gsap.to('#'+ section.id +' .gsapY', {
            scrollTrigger: { 
                trigger: "#"+section.id,
                start: "top bottom-=50%"
            },
            opacity: 1,
            duration: 1,
            y: 0,
            stagger: 0.2
        });

        gsap.to('#'+ section.id +' .gsapXL, #'+ section.id +' .gsapXR', {
            scrollTrigger: { 
                trigger: "#"+section.id,
                start: "top bottom-=50%"
            },
            opacity: 1,
            duration: 1,
            x: 0
        });  
    });

}

//-- SLIDER HANDLER

function sliderInit(){

    var sliderObj = tns({
        container: '.slider-cd',
        controlsContainer: ".arrows-countdown",
        nav: false,
        autoplayButtonOutput: false,
        items: 1,
        slideBy: 'page',
        center: true,
        autoplay: true,
        autoHeight: true,
        speed: 1000,
        autoplayTimeout: 2500
    });

}

function loaded(){

    animationSet();

    headerLinks();

    sliderInit();

    countDown();

    arrowClick();

    animation();
}

window.onload = loaded;