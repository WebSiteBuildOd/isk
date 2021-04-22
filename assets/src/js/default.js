$(function(){
    var optionsPopups = {
      
      openLocation : {
        tClose: 'Закрыть',
			removalDelay: 600,
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'hidden',			
			closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-close" viewBox="0 0 612 612"><use xlink:href="assets/app/icons/sprite.svg#close"></use></svg></div>',
			mainClass: 'css-modal-animate',				
			items: {
				src: '#location',
				type: 'inline'
			},
			callbacks: {
				beforeOpen: () => {
				},

				beforeClose: () => {
				}
			}
      }
        
    };
   
   $(window).on('load', function(){
			
			$('.js-gerb-animate').each(function(){
				$(this).addClass('show');
			});
			
			$(".js-animateme").each(function(){
				let animate_delay = $(this).data("animate-delay");
				let animate = $(this).data("animate-class");

				$(this).css("transition-delay",animate_delay+"ms");
				$(this).addClass(animate);
			});
			
		});
		
		
		$(window).scroll(function(){
			
			let viewport_height = $(window).height();
			let viewport_width = $(window).width();
			let scroll_top = $(window).scrollTop();

			$(".js-paralax").each(function(){
				let paralax_pos = $(this).offset().top;
				let paralax_side = $(this).data("paralax-side");
				let paralax_step = $(this).data("paralax-step");
				if ( paralax_side == 'bottom') {
					$(this).attr("style","transform: translateY(" + (-scroll_top - paralax_pos )/paralax_step + "px)" );
				} 
				if ( paralax_side == 'left') {
					$(this).attr("style","transform: translateX(" + (scroll_top - paralax_pos + viewport_height )/paralax_step + "px)" );
					if ( viewport_width < viewport_height ) {
						$(this).attr("style","transform: translateX(" + (scroll_top - paralax_pos + ( viewport_height/2 ) )/paralax_step + "px)" );
					}
				} else {
					$(this).attr("style","transform: translateY(" + (scroll_top - paralax_pos )/paralax_step + "px)" );
				}
			});

		});
		
		/* viewport width */
		function viewport(){
			var e = window, 
				a = 'inner';
			if ( !( 'innerWidth' in window ) )
			{
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
		};
		/* viewport width */
		$('.service-preview__row').each(function(){
			let serviceHeight = $('.service-preview__row').height();
			let servicePos = $('.service-preview__row').offset().top;
			let calcHeight = serviceHeight + servicePos;
			let winHeight = viewport().height;

			if ( winHeight > calcHeight ) {
				$(window).on('load', function(){

					$(".js-scroll-animateme").each(function(){
						let animate_delay = $(this).data("animate-delay");
						let animate = $(this).data("animate-class");

						$(this).css("transition-delay",animate_delay+"ms");
						$(this).addClass(animate);
					});

				});
			} else {

				$(window).scroll(function(){
					var viewport_height = viewport().height;
					var scroll_top = $(window).scrollTop();
					$(".js-scroll-animateme").each(function(){
						var animate_pos = $(this).offset().top;
						var animate_offset = $(this).data("animate-offset");
						var animate_delay = $(this).data("animate-delay");
						var animate = $(this).data("animate-class");
						var win_scroll = scroll_top + viewport_height - animate_offset;
						$(this).css("transition-delay",animate_delay+"ms");
						if ( win_scroll >= animate_pos ) {
							$(this).addClass(animate);
						}
					});
				});
			}
		});
		
		$(".js-scroll-to").click(function() {
			var attr_href = $(this).attr("href");
			var data_href = $(this).data("href");
			if ( data_href ) {
				attr_href = data_href;
			}
			$("html, body").animate({
				scrollTop: $(attr_href).offset().top + "px"
			}, {
				duration: 1000
			});
			return false;
		});
		
		/*$('.js-confirm-number').click(function(){
			
			$('.js-sms').slideDown(300);
			
			setTimeout(function(){
				$('.js-confirm-number').addClass('is-active');
			},500);
			
			if( $(this).hasClass('is-active') ) {
				
				$('.js-sms').slideUp(300);
				
				$('.js-sucsess').fadeIn(300);
				
				$(this).hide();
				
			}
			
		});*/
		
		/*$('.js-toggle-sesult').click(function(){
			
			$('.js-result-box').fadeToggle(300);
			
			$(this).toggleClass('is-disabled');
			
		});*/
		
		$('.faq__item-head').click(function(){
			
			if ( $(this).closest('.faq__item').hasClass('is-active') ) {
				
				$(this).closest('.faq__item').removeClass('is-active');
				$(this).closest('.faq__item').find('.faq__item-content').slideUp(300);
			} else {
				
				$('.faq__item.is-active').removeClass('is-active');
				$('.faq__item-content:visible').slideUp(300);
				$(this).closest('.faq__item').find('.faq__item-content').slideDown(300);
				$(this).closest('.faq__item').addClass('is-active');
				
			}
			
		});
		
		let stepLength = $('.quiz__top-item').length;
		let percent = 100/stepLength;
		
		
		$('.js-step-status').click(function(){
			$(this).closest('.quiz__step').hide();
			$('.quiz__step_status').fadeIn(300);
			
			setTimeout(function(){
				$('.status-list__item:nth-child(1)').removeClass('is-wait').addClass('is-complete');
				$('.status-list__item:nth-child(2)').addClass('is-wait');
				setTimeout(function(){
					$('.status-list__item:nth-child(2)').removeClass('is-wait').addClass('is-complete');
					$('.status-list__item:nth-child(3)').addClass('is-wait');
					setTimeout(function(){
						$('.status-list__item:nth-child(3)').removeClass('is-wait').addClass('is-complete');
						$('.status-list__item:nth-child(4)').addClass('is-wait');
						setTimeout(function(){
							$('.status-list__item:nth-child(4)').removeClass('is-wait').addClass('is-complete');
							$('.status-list__item:nth-child(5)').addClass('is-wait');
						}, 3000);
					}, 3000);
				}, 3000);
			}, 3000);
			
			return false;
		});
		
		$('.js-to-pay').click(function(){
			$('.status-list__item:nth-child(5)').removeClass('is-wait').addClass('is-complete');
			$('.status-list__item:nth-child(6)').addClass('is-wait');
			
			let width = $('.quiz__line').width()/6;
			let scaleWidth = $('.quiz__scale').width();
			let resultWidth = width + scaleWidth;
			$('.quiz__scale').css('width', resultWidth);
			$('.quiz__top-item.is-active').addClass('is-complete').removeClass('is-active').next().addClass('is-active');
		});
		
		$('.js-to-docs').click(function(){
			$('.status-list__item:nth-child(6)').removeClass('is-wait').addClass('is-complete');
			$('.status-list__item:nth-child(7)').addClass('is-wait');
			setTimeout(function(){
				$('.status-list__item:nth-child(7)').removeClass('is-wait').addClass('is-complete');
				$('.quiz__top-item.is-active').addClass('is-complete').removeClass('is-active').next().addClass('is-active');
				$('.quiz__scale').css('width', '100%');
			}, 5000);
			
			return false;
		});
		
		$('.quiz .radio__input').change(function(){
			$(this).closest('.quiz__step').find('.btn_blue').removeClass('is-hidden');
		});

		$('.js-series, .js-date').on('keyup blur', function(){
			
			if( ( $('.js-series').val().length >= 8 ) &&  ( $('.js-date').val().length >= 8 ) ) {
				$(this).closest('.quiz__step').find('.btn_blue').removeClass('is-hidden');
			} else {
				$(this).closest('.quiz__step').find('.btn_blue').addClass('is-hidden');
			}
			
		});
		
		$('.header__location-adress').click(function(e){
		    e.preventDefault();
		    
		    $.magnificPopup.open(optionsPopups['openLocation'], 0);
		    
		});
		
		$('.js-state').change(function(){
			$('.location__btn').removeClass('is-disabled');
		});
		
		$('.js-city').change(function(){
		
			$('.location__field').slideDown(300);
			
		});
		
		$('.js-auto').change(function(){
		
			$('.location__field').slideUp(300);
			
		});
		
		$('#define-location').click(function(e){
		   e.preventDefault();
		   
		   let data = 'type='+$('#location [name="city"]:checked').val();
		   if($('#location [name="city"]:checked').val() == 'manually') {
		        if(!$('#location [name="city-name"]').val().length) {
		            $('#location .error-popup').fadeIn(300);
		            setTimeout(function(){
		                $('#location .error-popup').fadeOut(300);
		            },3000);
		            return false;
		        }
		       data += '&cityName='+$('#location [name="city-name"]').val();
		   }
		   
		   $.ajax({
            url: 'assets/snippets/setSessionCity.php',
            method: 'GET',
            data: data,
            beforeSend: function(){
                
            },
            success: function(data){
                console.log(data);
                if(!data.length) { return false; }
                let d = JSON.parse(data);
                if(d.status) {
                    
                    $('#success-send .p-success-send').html(d.description + '<br> - '+d['city-name']);
                    $.magnificPopup.open({
                      items: {
                        src: '#success-send'
                      },
                      type: 'inline'
                    
                   
                    }, 0);
                    setTimeout(function(){
                        document.location.reload();
                    },2000);
                }
            }
            
        });
		   
		   
		});
		
		$('.js-gender').change(function(){
			
			let index = $(this).closest('.radio').index()+1;
			
			$('.service-form__points .service-form__list:visible').hide();
			$('.service-form__points .service-form__list:nth-child(' +index+ ')').fadeIn(500);
			
			$('.service-form__points .checkbox__input').removeAttr('disabled');
			$('.service-form__box_points').removeClass('is-hidden');
			
			
		});
		
		$('.js-child-radio').change(function(){
			
			if ( $('.js-show-form').hasClass('is-hidden') ) {
				$('.js-show-form').removeClass('is-hidden');
			}
			
		});
		
		$('.service-form__points .checkbox__input').change(function(){
			
			if ( $('.service-form__points .checkbox__input').is(':checked') ) {
				$('.service-form__box_child').removeClass('is-hidden');
			} else {
				$('.service-form__box_child').addClass('is-hidden');
			}
			
		});
		
		$('.service-form__points .checkbox__input').not('.service-form__points .checkbox__input.js-not-value').change(function(){
			$('.js-not-value').prop('checked', '');
		});
		
		$('.js-not-value').change(function(){
			
			$('.service-form__points .checkbox__input').not('.service-form__points .checkbox__input.js-not-value').prop('checked', '');
			
		});
		
		$('.js-phone-input').on('keyup blur', function(){
			
			let phoneVal = $(this).val();
			
			if ( phoneVal.length >= 8 ) {
				$('.js-phone-btn').fadeIn(300);
			} else {
				$('.js-phone-btn').fadeOut(300);
			}
			
		});
		
		$('.header__select').click(function(){
			$(this).toggleClass('is-active');
		});
		
		$('.header__select-item').click(function(){
			$('.header__select-item.is-active').removeClass('is-active');
			$(this).addClass('is-active');
			$('.header__select-text').text( $(this).text() );
		});
   
   /* Inputmask  */
   
    var phone = document.querySelectorAll("input[name='phone']");
	var series = document.querySelectorAll("input[name='series']");
	var date = document.querySelectorAll("input[name='date']");

	var im = new Inputmask({
		mask: "+7 (999) 999-99-99",
		clearMaskOnLostFocus: true,
		clearIncomplete: false,
	});
	
	var seriesMask = new Inputmask({
		mask: "99 999999",
		clearMaskOnLostFocus: true,
		clearIncomplete: false,
	});
	
	var dateMask = new Inputmask({
		mask: "99.99.9999",
		clearMaskOnLostFocus: true,
		clearIncomplete: false,
	});

	im.mask(phone);
	
	seriesMask.mask(series);
	dateMask.mask(date);
	
	/* Forms */
	
	$(".input__field")
	.on("focus", (e) => {
		let $input = $(e.target);
		$input.parent().addClass("is-focus");
	})
	.on("blur change", (e) => {
		let $input = $(e.target);

		if ($input.val() == "") $input.parent().removeClass("is-focus");
	});

    $('.field__input').each(function(){
		let placeholder = $(this).attr('placeholder');
		$(this).parent().append('<label class="field__mask">' +placeholder+ '</label>');
		$(this).attr('placeholder','');
		if ( $(this).val().length >= 1 ) {
			$(this).closest('.field').find('.field__mask').addClass('is-focus');
		}
	}).blur(function(){
		if ( $(this).val().length >= 1 ) {
			$(this).parent().find('.field__mask').addClass('is-focus');
		} else {
			$(this).parent().find('.field__mask').removeClass('is-focus');
		}
	});
	
	$('.field__mask').click(function(){
		$(this).parent().find('.field__input').focus();
	});
	
	/* Modals */
	
	var modals = {

    	close: (e) => {
    
    		if(!e)
    			return false;
    
    		e.preventDefault();
    
    		$.magnificPopup.close();	
    
    	},
    
    	open: (e, modal) => {
    
    		e = e || false;
    
    		if(e) e.preventDefault();
    
    		$.magnificPopup.close();		
    
    		modal = modal || (e != false ? ($(e.currentTarget).attr('href') ? $(e.currentTarget).attr('href') : $(e.currentTarget).data('modal')) : e);
    
    		if(!modal)
    			return false;
    
    		if(e && $(e.currentTarget).attr('data-youtube')){
    			$(modal + ' iframe').attr('src', 'https://www.youtube.com/embed/'+$(e.currentTarget).data('youtube')+'?autoplay=1&showinfo=0&rel=0&controls=0')
    		}
    
    		if(e && $(e.currentTarget).attr('data-input')){
    			$(modal + ' input[name="form"]').val($(e.currentTarget).data('input'))
    		}	
    
    		config.log('modal open')
    
    		$.magnificPopup.open({
    			tClose: 'Закрыть',
    			removalDelay: 600,
    			fixedContentPos: true,
    			fixedBgPos: true,
    			overflowY: 'hidden',			
    			closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-close" viewBox="0 0 612 612"><use xlink:href="assets/app/icons/sprite.svg#close"></use></svg></div>',
    			mainClass: 'css-modal-animate',				
    			items: {
    				src: modal,
    				type: 'inline'
    			},
    			callbacks: {
    				beforeOpen: () => {
    				},
    
    				beforeClose: () => {
    				}
    			}
    		}, 0);
    
    	},
    
    
    	init: (e) => {
    		
    		$(document).on('click', '.js-close-modal', modals.close);
    
    		$(document).on('click', '.js-modal', modals.open);
    		
    		$(window).on('load', function(){
    			$('#location').each(function(){
    			    
    			    if($(this).attr('data-show') != '1') { return false; }
    				setTimeout(function(){
    					$.magnificPopup.open(optionsPopups['openLocation'], 0);
    				}, 3000);
    			});
    		});
    
    	}
    
    };
	modals.init();
	
	/* Slider */
	
	var sliders = {
    	selector: ".js-slider",
    
    	settings: {
    		items: 1,
    		nav: true,
    		dots: false,
    		loop: true,
    		autoplay: false,
    		smartSpeed: 600,
    		margin: 20,
    		navText: [
    			'<svg class="icon icon-arrowLeft" viewBox="0 0 12 19"><use xlink:href="assets/app/icons/sprite.svg#arrowLeft"></use></svg>',
    			'<svg class="icon icon-arrowRight" viewBox="0 0 12 19"><use xlink:href="assets/app/icons/sprite.svg#arrowRight"></use></svg>',
    		],
    	},
    
    	bar: (el, value) => {
    		$(el).find(".owl-progress-bar").css("width", `${value}%`);
    	},
    
    	build: (selector) => {
    		let data = $(selector).attr("data-settings")
    			? $(selector).data("settings")
    			: {};
    
    		let clone = JSON.parse(JSON.stringify(sliders.settings));
    
    		let current = Object.assign(clone, data);
    
    		$(selector)
    			.addClass("owl-carousel")
    			.on("initialized.owl.carousel", (e) => {
    				let $slider = $(e.target);
    				let $logos = $slider.find(".js-logo:not([style])");
    
    				if ($logos.length) {
    					$logos.each((i, el) => {
    						if ($(el).hasClass("is-changed")) return false;
    
    						defaults.logoLoading(el);
    					});
    				}
    
    				// counter
    				let $counter = $(e.target).find(".owl-counter");
    				let carousel = e.relatedTarget;
    				let length = carousel.items().length;
    				let current = carousel.relative(carousel.current()) + 1;
    
    				if ($slider.attr("data-progress-bar")) {
    					let bar = $slider.data("progress-bar");
    
    					sliders.bar(bar, 100 / (length / current));
    					console.log("bar is", bar, 100 / (length / current));
    				}
    
    				if ($slider.attr("data-counter")) {
    					let counter = $slider.data("counter");
    					$(counter).html(
    						`<div class="owl-counter"><span class="owl-counter-current">${current}</span>/${length}</div>`
    					);
    				}
    			})
    
    			.on("drag.owl.carousel", (event) => {
    				document.ontouchmove = (e) => {
    					e.preventDefault();
    				};
    			})
    			.on("dragged.owl.carousel", (event) => {
    				document.ontouchmove = (e) => {
    					return true;
    				};
    			})
    			.on("changed.owl.carousel", (e) => {
    				if (!e.namespace) {
    					return;
    				}
    				let carousel = e.relatedTarget;
    				let length = carousel.items().length;
    				let current = carousel.relative(carousel.current()) + 1;
    
    				if ($(e.target).attr("data-progress-bar")) {
    					let bar = $(e.target).data("progress-bar");
    
    					sliders.bar(bar, 100 / (length / current));
    
    					console.log("bar is", bar, 100 / (length / current));
    				}
    
    				if ($(e.target).attr("data-counter")) {
    					let counter = $(e.target).data("counter");
    					$(counter).find('.owl-counter-current').text(current);
    				}
    			})
    			.owlCarousel(current);
    		
    		if ( $(sliders.selector).hasClass('js-product-slider') ) {
    
    			
    			
    			$('.js-product-slider').on('changed.owl.carousel', event => {
    				let $slider = $(event.target);
    				let $parent = $slider.closest('.js-slider-parent');
    
    				let carousel = event.relatedTarget;
    				let current = carousel.relative(carousel.current());
    
    				$parent.find('.js-product-thumbnails').sly('activate', current);
    			})
    		}
    		
    	},
    
    	destroy: (selector) => {
    		if ($(selector).hasClass("owl-loaded"))
    			$(selector)
    				.trigger("destroy.owl.carousel")
    				.removeClass("owl-carousel");
    		$(selector).find(".owl-counter").remove();
    	},
    
    	run: (selector) => {
    		sliders.build(selector);
    	},
    	
    	resize: () => {
    		
    		if ( $(sliders.selector).hasClass("owl-resize") && ( $(window).innerWidth() > 1100 ) ) {
    			
    			let bigSelector = $('.blog__item_big');
    			let smallSelector = $('.blog__item_small');
    			let containerWidth = $(sliders.selector).innerWidth();
    			
    			bigSelector.css('width', (containerWidth/2) - 15);
    			
    			smallSelector.css('width', (containerWidth/4) - 23);
    			
    		} else {
    			$('.blog__item').css('width','');
    		}
    	},
    
    	init: () => {
    		if (!$(sliders.selector).length) return false;
    
    		$(window).on("load", (e) => {
    			$(sliders.selector).each((i, el) => {
    				sliders.run(el);
    			});
    		});
    		
    		sliders.resize();
    			
    		$(window).on('resize', sliders.resize);
    	},
    };
    
    sliders.init();
    
    var wrapSlider = {
    	selector: ".js-wrapSlider",
    	resolution: 769,
    
    	run: (selector) => {
    		let resolution = $(selector).attr("data-resolution")
    			? $(selector).data("resolution")
    			: wrapSlider.resolution;
    
    		$(window).on("load resize", () => {
    			let windowWidth = $(window).width();
    
    			if (windowWidth <= resolution) {
    				sliders.build(selector);
    			} else {
    				sliders.destroy(selector);
    			}
    		});
    	},
    
    	init: () => {
    		if (!$(wrapSlider.selector).length) return false;
    
    		$(wrapSlider.selector).each((i, el) => {
    			wrapSlider.run(el);
    		});
    	},
    };
    
    wrapSlider.init();
    
});