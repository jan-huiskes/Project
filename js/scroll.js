// Jan Huiskes
// 10740929
// bron: http://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link

// smooth switching between sections
$(document).on('click', 'a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});
