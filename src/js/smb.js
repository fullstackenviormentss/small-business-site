// scrollspy section
$(function($){
  // mobile navigation

  $('.usa-menu-btn').on('click', function(e) {
    var mobile = $("#nav-mobile").attr('id');

    mobile.addClass('is-visible');
    $('.usa-overlay').addClass('is-visible');

    $('.usa-accordion-button').on('click', function() {
      $(this).attr('aria-expanded', 'true');
      $(this).children().attr('aria-hidden', 'false');
    });

  });

  $('.usa-overlay').click(function(event) {
    var mobile = $("#nav-mobile").attr('id');

    if(!$(event.target).closest(mobile).length) {
        if(mobile.is(":visible")) {
            mobile.removeClass('is-visible');
            $('.usa-overlay').removeClass('is-visible');
        }
    }
  });


  // navigation drop down

  $('.all-links').hover(function(e){
    $(this).children('.sub-nav-container').eq(0).slideDown(200);
    $(this).css("background-color", "#dce4ef");

    }, function(e) {
      $(this).css("background-color", "white");
      $(this).children('.sub-nav-container').eq(0).slideUp(50);
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


  // drop down
  var sections = [];
  var id = false;
  var $navbara = $('.usa-sidenav-list a');
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

  // function that takes in zipcode
  // uses Census Reporter api to retrieve data
  var getData = function() {
    var zipcode = $('#zipcode').val();
    var income = "B19013_001E";
    var age = "B01002_001E";
    var employment = "B23025_001E";
    var key = "6980d91653a1f78acd456d9187ed28e23ea5d4e3"

    $.getJSON("https://api.census.gov/data/2015/acs5?get=" + income + "&for=zip+code+tabulation+area:" + zipcode + '&key=' + key, function(getIncome){
        var value = getIncome[1][0]
        var income_output = '$' + value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $('#income').html(income_output);
    });


    $.getJSON("https://api.census.gov/data/2015/acs5?get=" + age + "&for=zip+code+tabulation+area:" + zipcode + '&key=' + key, function(getAge){
        var age_num = getAge[1][0]
        $('#age').html(age_num);
    });

    $.getJSON("https://api.census.gov/data/2015/acs5?get=" + employment + "&for=zip+code+tabulation+area:" + zipcode + '&key=' + key, function(getEmployment){
        var employment_num = getEmployment[1][0]
        $('#employment').html(commaSeparateNumber(employment_num));
    });


    $('#city').html(zipcode);
    $('#data-section').css("min-height", "60vh");
    $('#data-results-section').slideDown(300);
    //$(window).scrollTop($('#data-results-section').offset().top);
    var target = $('#data-results-section');
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
  };


  String.getNumber= function(o, s){
    var n = o.indexOf(s);
    var index = n + 23;
    var value = o.substring(index, index+8);
    var num = parseInt(value);
    return num;

  };

  function commaSeparateNumber(val){
      while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
      }
      return val;
  };


  // Get user input upon click or enter, return data
  $('#search').click(getData);
  $('#zipcode').keypress(function (e) {
    if(e.which == 13){
      getData();
      return false;
    }
  });


  // function that takes in user input for NAICS and zipcode
  var getReport = function() {
    console.log('infunction');
    var zipcode = $('#location').val();
    var industry = $('#industry').val();

    var reportUrl = "https://cbb.census.gov/sbe/#industry0=" + industry + "&geoId=" + zipcode + "&geoType=zcta&view=report&reportType=summary";

    window.open(reportUrl, '_blank');

  };


  // Get user input upon click or enter, open up in another tab
  $('#report').click(getReport);
  $('#location').keypress(function (e) {
    if(e.which == 13){
      getReport();
      return false;
    }
  });


});
