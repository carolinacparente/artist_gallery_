
/* Start READ MORE button */
function read() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read More";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read Less";
      moreText.style.display = "inline";
    }
  }
/* End READ MORE button */

/* Start RETURN TO TOP button */
/*var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);*/


/*function handleScroll() {
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
  if ((rootElement.scrollTop / scrollTotal) > 0.80) {
    //show button
    scrollToTopBtn.classList.add("showBtn")
  } else {
    //hide button
    scrollToTopBtn.classList.remove("showBtn")
  }
}
document.addEventListener("scroll", handleScroll);*/



/* End RETURN TO TOP button */
