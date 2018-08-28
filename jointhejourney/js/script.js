$(function(){
	"use strict";
	
	
	var scrollOffset = 100;
	
	$(window).on('scroll', function(){
		
		
		if( $(window).scrollTop() < scrollOffset ){
			$('body').removeClass('scrolled');
		}else{
			$('body').addClass('scrolled');
		}
		
		
		var scrollPos = $(document).scrollTop(),
			nav_height = $('#navbar').outerHeight();
		
		$('.navbar li a').each(function () {
			var currLink = $(this),
				refElement = $(currLink.attr('href'));
			if( refElement.size() > 0 ){
				if ( ( refElement.position().top - nav_height ) <= scrollPos ) {
					$('.navbar li').removeClass('active');
					currLink.closest('li').addClass('active');
				}else{
					currLink.removeClass('active');
				}
			}
		});
		
		
	});
	
	
	//Initialize smoothscroll plugin
	smoothScroll.init({
		updateURL: false
	});
	
    
/*=================================================================*/
/*                      INI WOW                             
/*=================================================================*/
	new WOW().init({
		mobile: false
	});
	
    
/*=================================================================*/
/*                      MAGNIFIC POPUP                           
/*=================================================================*/
	$('.view-btn').magnificPopup({
		type: 'image',
		mainClass: 'mfp-with-zoom',
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function(openerElement) {
			  return openerElement.is('img') ? openerElement : openerElement.closest('figure').find('img');
			}
		  }
	});
	
	
/*=================================================================*/
/*                      VIDEO POPUP                             
/*=================================================================*/
	$('.play-btn').magnificPopup({
		type: 'iframe'
	});
	
	
/*=================================================================*/
/*                      HIDE LOADING                            
/*=================================================================*/
	$(window).on('load',function(){
		$('body').addClass('loaded');
	});
	
	
/*=================================================================*/
/*                      SOME STYLES                            
/*=================================================================*/
	Waves.attach('.btn-custom', 'waves-classic');
	Waves.init();

	
	
/*=================================================================*/
/*                      CONTACT FORM                            
/*=================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}

	$('#contact-form').validator().on('submit', function (e) {
		if (!e.isDefaultPrevented()) {
            var url = "mail.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.contact-form-result').html(alertBox);
                        // empty the form
                        $("#contact-form :input").prop("disabled", true);
                        $("#contact-form").find('#buttonDisable').prop("hidden", true);
  
                        // $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
	});
	
});