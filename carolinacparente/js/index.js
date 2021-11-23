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
