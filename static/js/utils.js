$(window).load(function () {
    $("#preloader-wrapper").fadeOut("slow");
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

$(document).ready(function () {

    $(".gallery-slider").owlCarousel(
        {
            pagination: true,
            autoPlay: 5000,
            itemsDesktop: [1500, 4],
            itemsDesktopSmall: [979, 3]
        }
    );
});
