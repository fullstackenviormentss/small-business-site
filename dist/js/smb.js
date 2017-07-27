// scrollspy section
$(function($){
  
  // navigation drop down

  $('.all-links').hover(function(e){
    $(this).children('.sub-nav-container').eq(0).slideDown(200);
    $(this).css("background-color", "#dce4ef");

    }, function(e) {
      $(this).css("background-color", "white");
      $(this).children('.sub-nav-container').eq(0).slideUp(200);
  });

  // smooth scroll links on page
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
  });
  

  //variable that will hold the href attr of the links in the menu
  var sections = [];
  //variable that stores the id of the section
  var id = false;
  //variable for the selection of the anchors in the navbar
  var $navbara = $('.usa-sidenav-list a');
  //li 
  var toCurrent = $('.usa-sidenav-list li')
  
  $navbara.click(function(e){
    //prevent the page from refreshing
    e.preventDefault();
    //set the top offset animation and speed
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
	},1000);
    
    hash($(this).attr('href'));
  });
  
  //select all the anchors in the navbar one after another
  $navbara.each(function(){
   // and adds them in the sections variable
    sections.push($($(this).attr('href')));
    
  })

  $(window).scroll(function(e){
    // scrollTop retains the value of the scroll top with the reference at the middle of the page
    var scrollTop = $(this).scrollTop() + ($(window).height()/12);
    //cycle through the values in sections array
    for (var i in sections) {
      var section = sections[i];
      //if scrollTop variable is bigger than the top offset of a section in the sections array then 
      if (scrollTop > section.offset().top){
        var scrolled_id = section.attr('id');
      }
    }
    if (scrolled_id !== id) {
      id = scrolled_id;
      $($navbara).removeClass('current');
      $('.usa-sidenav-list a[href="#' + id + '"]').addClass('current'); 
    }
  });

  $(window).scroll(function() {
  var fixSidebar = $('.usa-layout-docs-main_content').offset().top;
  var contentHeight = $('.usa-layout-docs-main_content').innerHeight();
  var sidebarHeight = $('.usa-sidenav-list').innerHeight();
  var footerHeight = $('footer').height();
  var sidebarBottomPos = contentHeight - sidebarHeight;
  var trigger = $(window).scrollTop() - fixSidebar;

  if ($(window).scrollTop() >= fixSidebar) {
    $('.usa-sidenav-list').addClass('fixed');
  } else {
    $('.usa-sidenav-list').removeClass('fixed');
  }

  if (trigger >= sidebarBottomPos) {
    
    $('.usa-sidenav-list').addClass('bottom');
  } else {
    $('.usa-sidenav-list').removeClass('bottom');
  }
});

hash = function(h){
  if (history.pushState){
    history.pushState(null, null, h);
  }else{
    location.hash = h;
  }
};



});


