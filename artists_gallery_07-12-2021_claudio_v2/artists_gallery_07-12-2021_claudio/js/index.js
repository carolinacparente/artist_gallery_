var num_slide = 1; 
slide(num_slide); /* Slide Inicial */

function slide_seg(n) {
    slide(num_slide += n);
}

function slide_atual(n) { /* Selecao de slide pelos dots */
    slide(num_slide = n);
}

function slide(n) {
    var i;
    var slides = document.getElementsByClassName("carousel_slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {   /* Reinicia carousel */
        num_slide = 1
    }    
    if (n < 1) {   /* Permite recuar */
        num_slide = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[num_slide-1].style.display = "block";  
    dots[num_slide-1].className += " active";
}

$(function() {
    var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
    slideCount = $('.carousel_slide').length;
    
    $('html').on('mousedown touchstart', slideStart);
    $('html').on('mouseup touchend', slideEnd);
    $('html').on('mousemove touchmove', slide);
    
    /**
    / Triggers when slide event started
    */
    function slideStart(event) {
      // If it is mobile device redefine event to first touch point
      if (event.originalEvent.touches)
        event = event.originalEvent.touches[0];
      // If sliding not started yet store current touch position to calculate distance in future.
      if (sliding == 0) {
        sliding = 1; // Status 1 = slide started.
        startClientX = event.clientX;
      }
    }
    
    /** Occurs when image is being slid.
    */
    function slide(event) {
      event.preventDefault();
      if (event.originalEvent.touches)
        event = event.originalEvent.touches[0];
      // Distance of slide.
      var deltaSlide = event.clientX - startClientX;
      // If sliding started first time and there was a distance.
      if (sliding == 1 && deltaSlide != 0) {
        sliding = 2; // Set status to 'actually moving'
        startPixelOffset = pixelOffset; // Store current offset
      }
      
      //  When user move image
      if (sliding == 2) {
        // Means that user slide 1 pixel for every 1 pixel of mouse movement.
        var touchPixelRatio = 1;
        // Check for user doesn't slide out of boundaries
        if ((currentSlide == 0 && event.clientX > startClientX) ||
           (currentSlide == slideCount - 1 && event.clientX < startClientX))
          // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
          touchPixelRatio = 3;
        // Calculate move distance.
        pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
        // Apply moving and remove animation class
        $('#carousel_slide').css('transform', 'translateX(' + pixelOffset + 'px').removeClass();
      }
    }
    
    /** When user release pointer finish slide moving.
    */
    function slideEnd(event) {
      if (sliding == 2){
        // Reset sliding.
        sliding = 0;
        // Calculate which slide need to be in view.
        currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide -1;
        // Make sure that unexisting slides weren't selected.
        currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
        // Since in this example slide is full viewport width offset can be calculated according to it.
        pixelOffset = currentSlide * -$('body').width();
        // Remove style from DOM (look below)
        $('#temp').remove();
        // Add a translate rule dynamically and asign id to it
        $('<style id="temp">#slides.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
        // Add animate class to slider and reset transform prop of this class.
        $('#slides').addClass('animate').css('transform', '');
      }
    }
    
  });

/*
const images = [
    "https://images.unsplash.com/photo-1543777166-81504743e51e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=1920",
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1543777166-81504743e51e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=1920"
  ];



  const images = ["src/dentes_1.jpg", "src/dentes_2.jpg", "src/dentes_1.jpg", "src/dentes_2.jpg"]
  function myImages{
      document.getElementById("images").src = images [0]
  }  
 

  
  
// content setup
const texts = [
   ["Tooth Fairy", "Beatriz Martins"],
   ["Sun", "Lara"],
   ["Project", "Joana"],
   ["Future Robot", "Ines Bernardo"],
]

// init plugin 
rgbKineticSlider = new rgbKineticSlider({
    // images and content sources
    slideImages: images, // array of images >demo size : 1920 x 1080
    itemsTitles: texts, // array of titles / subtitles
    
    // displacement images sources
    backgroundDisplacementSprite: 'https://i.ibb.co/KrVr51f/displace-circle.png', // slide displacement image 
    cursorDisplacementSprite: 'https://i.ibb.co/KrVr51f/displace-circle.png', // cursor displacement image                    ver porque nao assimila a pasta 
    
    // cursor displacement effect 
    cursorImgEffect : true, // enable cursor effect
    cursorTextEffect : false, // enable cursor text effect
    cursorScaleIntensity : 0.65, // cursor effect intensity
    cursorMomentum : 0.14, // lower is slower
    
    // swipe 
    swipe: true, // enable swipe
    swipeDistance : window.innerWidth * 0.4, // swipe distance - ex : 580
    swipeScaleIntensity: 2, // scale intensity during swipping
    
    // slide transition
    slideTransitionDuration : 1, // transition duration
    transitionScaleIntensity : 30, // scale intensity during transition
    transitionScaleAmplitude : 20, // scale amplitude during transition inicialmente a 160
    
    // regular navigation
    nav: true, // enable navigation
    navElement: '.main-nav', // set nav class
    
    
    // image rgb effect
    imagesRgbEffect : false, // enable img rgb effect
    imagesRgbIntensity : 0.9, // set img rgb intensity
    navImagesRgbIntensity : 80, // set img rgb intensity for regular nav 
    
    // texts settings
    textsDisplay : true, // show title
    textsSubTitleDisplay : true, // show subtitles
    textsTiltEffect : true, // enable text tilt
    googleFonts : ['Roboto:700', 'Roboto:400'], // select google font to use
    buttonMode : false, // enable button mode for title
    textsRgbEffect : true, // enable text rgb effect
    textsRgbIntensity : 0.03, // set text rgb intensity
    navTextsRgbIntensity : 15, // set text rgb intensity for regular nav
    
    textTitleColor : 'white', // title color
    textTitleSize : 90, // title size
    mobileTextTitleSize : 125, // title size
    textTitleLetterspacing : 3, // title letterspacing
    
    textSubTitleColor : 'white', // subtitle color ex : 0x000000
    textSubTitleSize : 24, // subtitle size
    mobileTextTitleSize : 55, // mobile title 
    mobileTextSubTitleSize : 18, // mobile subtitle size
    textSubTitleLetterspacing : 2, // subtitle letter spacing
    textSubTitleOffsetTop : 90, // subtitle offset top
    mobileTextSubTitleOffsetTop : 90, // mobile subtitle offset top
    });;*/