$(window).scroll(function() {
	var fixSidebar = $('.usa-nav').innerHeight() + $('.usa-navbar').innerHeight();
	var contentHeight = $('.usa-layout-docs-main_content').innerHeight();
	var sidebarHeight = $('.usa-layout-docs-sidenav').height();
	var footerHeight = $('footer').height();
	var sidebarBottomPos = contentHeight - sidebarHeight - footerHeight;
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
