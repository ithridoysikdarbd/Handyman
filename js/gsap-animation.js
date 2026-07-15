(function ($) {
	"use strict";

	gsap.registerPlugin(ScrollTrigger, SplitText);
	gsap.config({
		nullTargetWarn: false,
		trialWarn: false
	});

	jQuery.fn.pbmit_is_bound = function(type) {
		if (this.data('events') !== undefined) {
			if (this.data('events')[type] === undefined || this.data('events')[type].length === 0) {
				return false;
			}
			return (-1 !== $.inArray(fn, this.data('events')[type]));
		} else {
			return false;
		}
	};

	/*----  Functions  ----*/
	function getpercentage(x, y, elm) { 
		elm.find('.pbmit-fid-inner').html(y + '/' + x);
		var cal = Math.round((y * 100) / x);
		return cal;
	}

	function pbmit_title_animation() {
		ScrollTrigger.matchMedia({
			"(min-width: 1025px)": function() {
				var pbmit_var = jQuery('.pbmit-custom-heading, .pbmit-heading-subheading');
				if (!pbmit_var.length) {
					return;
				}
				const quotes = document.querySelectorAll(".pbmit-custom-heading .pbmit-title , .pbmit-heading-subheading .pbmit-title");
				quotes.forEach(quote => {
					var getclass = quote.closest('.pbmit-custom-heading ,.pbmit-heading-subheading').className;
					var animation = getclass.split('animation-');
					if (animation[1] == "style1") return
					//Reset if needed
					if (quote.animation) {
						quote.animation.progress(1).kill();
						quote.split.revert();
					}
					quote.split = new SplitText(quote, {
						type: "lines,words",
						linesClass: "split-line"
					});
					gsap.set(quote, { perspective: 400 });
					if (animation[1] == "style2") {
						gsap.set(quote.split.words, {
							opacity: 0,
							y: "90%",
							rotateX: "-40deg"
						});
					}
					if (animation[1] == "style3") {
						gsap.set(quote.split.words, {
							opacity: 0,
							x: "50"
						});
					}
					if (animation[1] == "style4") {
						gsap.set(quote.split.words, {
							opacity: 0,
						});
					}
					quote.animation = gsap.to(quote.split.words, {
						scrollTrigger: {
							trigger: quote,
							start: "top 90%",
						},
						x: "0",
						y: "0",
						rotateX: "0",
						opacity: 1,
						duration: 1,
						ease: Back.easeOut,
						stagger: .02
					});
				});
			},
		});
	}

	/*----  Sticky Header ----*/
	var pbmit_sticky_header = function() {
		if (jQuery('.pbmit-header-sticky-yes').length > 0) {
			var header_html = jQuery('#masthead .pbmit-main-header-area').html();
			jQuery('.pbmit-sticky-header').append(header_html);
			jQuery('.pbmit-sticky-header #menu-toggle').attr('id', 'menu-toggle2');
			jQuery('#menu-toggle2').on('click', function() {
				jQuery("#menu-toggle").trigger("click");
			});
			jQuery('.pbmit-sticky-header .main-navigation ul, .pbmit-sticky-header .main-navigation ul li, .pbmit-sticky-header .main-navigation ul li a').removeAttr('id');
			jQuery('.pbmit-sticky-header h1').each(function() {
				var thisele = jQuery(this);
				var thisele_class = jQuery(this).attr('class');
				thisele.replaceWith('<span class="' + thisele_class + '">' + jQuery(thisele).html() + '</span>');
			});
			// For infostack header
			if (jQuery('.pbmit-main-header-area').hasClass('pbmit-infostack-header')) {
				jQuery('.pbmit-sticky-header .pbmit-pre-header-wrapper').remove();
			}
		}
	}
	
	var pbmit_sticky_header_class = function () {
		var lastScroll = 0;

		if (jQuery('#wpadminbar').length > 0) {
			jQuery('#masthead').addClass('pbmit-adminbar-exists');
		}

		jQuery(window).on('scroll', function () {
			var scroll = jQuery(window).scrollTop();
			var header_height = 0;

			if (jQuery('.pbmit-main-header-area').length > 0) {                
				header_height = jQuery('.pbmit-main-header-area').height();
			}

			if (scroll === 0) {
				jQuery('#masthead .pbmit-sticky-header').removeClass('pbmit-fixed-header');
			} else {
				if (scroll > lastScroll) {
					// Scrolling down → hide sticky
					jQuery('#masthead .pbmit-sticky-header').removeClass('pbmit-fixed-header');
				} else {
					// Scrolling up
					if (scroll > 300) {
						// Above 300px → show sticky
						jQuery('#masthead .pbmit-sticky-header').addClass('pbmit-fixed-header');
					} else {
						// Below 300px → hide sticky
						jQuery('#masthead .pbmit-sticky-header').removeClass('pbmit-fixed-header');
					}
				}
			}
			lastScroll = scroll;
		});
	};

	var pbmit_toggleSidebar = function() {
		jQuery('#menu-toggle').on('click', function() {
			jQuery("body:not(.mega-menu-pbminfotech-top) .pbmit-navbar > div, body:not(.mega-menu-pbminfotech-top)").toggleClass("active");
		})
		if (jQuery('.pbmit-navbar > div > .closepanel').length == 0) {
			jQuery('.pbmit-navbar > div').append('<span class="closepanel"><svg class="qodef-svg--close qodef-m" xmlns="http://www.w3.org/2000/svg" width="20.163" height="20.163" viewBox="0 0 26.163 26.163"><rect width="36" height="1" transform="translate(0.707) rotate(45)"></rect><rect width="36" height="1" transform="translate(0 25.456) rotate(-45)"></rect></svg></span>');
			jQuery('.pbmit-navbar > div > .closepanel, .mega-menu-pbminfotech-top .nav-menu-toggle').on('click', function() {
				jQuery(".pbmit-navbar > div, body, .mega-menu-wrap").toggleClass("active");
			});
			return false;
		}
	}
	var pbmit_flotingbar = function() {
		jQuery('.pbmit-nav-menu-toggle').on('click', function() {
			jQuery("body .floting-bar-wrap").toggleClass("active");
		})
		if (jQuery('.floting-bar-wrap .closepanel').length == 0) {
			jQuery('.floting-bar-wrap').append('<span class="closepanel"><svg class="qodef-svg--close qodef-m" xmlns="http://www.w3.org/2000/svg" width="26.163" height="26.163" viewBox="0 0 26.163 26.163"><rect width="36" height="1" transform="translate(0.707) rotate(45)"></rect><rect width="36" height="1" transform="translate(0 25.456) rotate(-45)"></rect></svg></span>');
			jQuery('.floting-bar-wrap .closepanel').on('click', function() {
				jQuery(".floting-bar-wrap").toggleClass("active");
			});
			return false;
		}
	}

	var pbmit_navbar = function() {
		if (!jQuery('ul#pbmit-top-menu > li > a[href="#"]').pbmit_is_bound('click')) {
			jQuery('ul#pbmit-top-menu > li > a[href="#"]').on('click', function() { return false; });
		}
		jQuery('.pbmit-navbar li:has(ul)').append("<span class='sub-menu-toggle'><i class='pbmit-base-icon-angle-right'></i></span>");
		jQuery('.pbmit-navbar li').on('mouseover', function() {
			if (jQuery(this).children("ul").length == 1) {
				var parent = jQuery(this);
				var child_menu = jQuery(this).children("ul");
				if (jQuery(parent).offset().left + jQuery(parent).width() + jQuery(child_menu).width() > jQuery(window).width()) {
					jQuery(child_menu).addClass('pbmit-nav-left');
				} else {
					jQuery(child_menu).removeClass('pbmit-nav-left');
				}
			}
		});
		jQuery('.sub-menu-toggle').on('click', function() {
			if (jQuery(this).siblings('.sub-menu, .children').hasClass('show')) {
				jQuery(this).siblings('.sub-menu, .children').removeClass('show');
				jQuery('i', jQuery(this)).removeClass('pbmit-base-icon-up-open-big').addClass('pbmit-base-icon-angle-right');
			} else {
				jQuery(this).siblings('.sub-menu, .children').addClass('show');
				jQuery('i', jQuery(this)).removeClass('pbmit-base-icon-angle-right').addClass('pbmit-base-icon-up-open-big');
			}
			return false;
		});
		jQuery('.nav-menu-toggle').on('click', function() {
			jQuery('.pbmit-navbar ul.menu > li > a').on('click', function() {
				if (jQuery(this).attr('href') == '#' && jQuery(this).siblings('ul.sub-menu, ul.children').length > 0) {
					jQuery(this).siblings('.sub-menu-toggle').trigger('click');
					return false;
				}
			});
		})
	}

	/*---- Search Btn ----*/
	var pbmit_search_btn = function() {
		jQuery(function() {
			var search_form = jQuery(".pbmit-header-search-form");
			var search_field = jQuery('.pbmit-header-search-form .search-field');
			var $body = jQuery('body');
			jQuery(".pbmit-header-search-btn").on('click', function(e) {
				if (!search_form.hasClass('active')) {
					search_form.addClass('active');
					setTimeout(function() { search_field.get(0).focus(); }, 500);
				} else if (search_field.val() === '') {
					search_form.removeClass('active');
					search_field.get(0).focus();
				}
				e.preventDefault();
				return false;
			});
			jQuery(".pbmit-header-search-form .pbmit-search-overlay, .pbmit-header-search-form .pbmit-search-close").on('click', function (e) {
				$body.addClass('pbmit-search-animation-out');
				setTimeout(function () {
					$body.removeClass('pbmit-search-animation-out');
				}, 800);
				setTimeout(function () {
					search_form.removeClass('active');
				}, 800);
				e.preventDefault();
				return false;
			});
		});
	}

	/*---- Active Hover ----*/
	var pbmit_active_hover = function() {
		var pbmit_var = jQuery('.pbmit-element-service-style-4, .pbmit-element-service-style-2, .pbmit-element-service-style-5, .pbmit-element-testimonial-style-3, .pbmit-element-team-style-2');
		if (!pbmit_var.length) {
			return;
		}
		pbmit_var.each(function() {
			var pbmit_Class = '.pbmit-hover-inner .pbmit-title-wrapper, .pbmit-testimonial-style-3, .pbmit-team-style-2, .pbmit-hover-inner li';
			jQuery(this)
				.find(pbmit_Class).first()
				.addClass('pbmit-active');
			jQuery(this)
				.find(pbmit_Class)
				.on('mouseover', function() {
					jQuery(this).addClass('pbmit-active').siblings().removeClass('pbmit-active');
				});
		});
	}

	/*---- Hover Slider ----*/
	var pbmit_hover_slide = function() {
		if (typeof Swiper !== 'undefined') {
			var pbmit_hover_slide = new Swiper(".pbmit-element-service-style-2 .pbmit-hover-image, .pbmit-element-service-style-5 .pbmit-hover-image", {
				grabCursor: true,
				allowTouchMove: false,
				effect: 'slide',
				direction: 'horizontal',
				mousewheel: false,
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 800,
			});
			jQuery('.pbmit-main-hover-slider li').on('mouseover', function(e) {
				e.preventDefault();
				var hover_index = jQuery(this).index();
				pbmit_hover_slide.slideTo(hover_index, 500, false);
			});
		}
	}

	/*---- Static Box Slider ----*/
	var pbmit_staticbox_hover_slide = function () {
		if (typeof Swiper === 'undefined') return;

		var pbmit_hover1 = null;
		var pbmit_hover2 = null;

		// Image swiper
		if (document.querySelector(".pbmit-element-service-style-4 .pbmit-service-image")) {
			pbmit_hover1 = new Swiper(".pbmit-element-service-style-4 .pbmit-service-image", {
				speed: 600,
				effect: "creative",
				grabCursor: false,
				slidesPerView: 1,
				allowTouchMove: false,
				virtualTranslate: true,
				creativeEffect: {
					prev: {
						translate: [0, "-100%", 0],
					},
					next: {
						translate: [0, "100%", 0],
					},
				},
			});
		}

		// Content swiper
		if (document.querySelector(".pbmit-element-service-style-4 .pbmit-short-description")) {
			pbmit_hover2 = new Swiper(".pbmit-element-service-style-4 .pbmit-short-description", {
				speed: 600,
				effect: "creative",
				grabCursor: false,
				slidesPerView: 1,
				allowTouchMove: false,
				virtualTranslate: true,
				creativeEffect: {
					prev: {
						translate: [0, "-100%", 0],
					},
					next: {
						translate: [0, "100%", 0],
					},
				},
			});
		}

		// Hover trigger
		jQuery('.pbmit-element-service-style-4 .pbmit-hover-inner li').on('mouseenter', function () {
			var myIndex = jQuery(this).index();

			if (pbmit_hover1) {
				pbmit_hover1.slideTo(myIndex);
			}
			if (pbmit_hover2) {
				pbmit_hover2.slideTo(myIndex);
			}
		});
	};

	/*---- Team Fade Style ----*/
	var pbmit_team_fade_style = function(){
		let slides = jQuery(".pbmit-team-slide");
		let nextBtn = jQuery(".pbmit-team-next");
		let prevBtn = jQuery(".pbmit-team-prev");

		let index = 0;
		let isAnimating = false;

		function showSlide(newIndex) {
			if (isAnimating || newIndex === index) return;

			isAnimating = true;

			let current = slides.eq(index);
			let next = slides.eq(newIndex);

			// Fade out current
			current.removeClass("active");

			// Fade in next
			next.addClass("active");

			index = newIndex;

			setTimeout(function () {
			isAnimating = false;
			}, 800); // match CSS
		}

		function nextSlide() {
			let newIndex = (index + 1) % slides.length;
			showSlide(newIndex);
		}

		function prevSlide() {
			let newIndex = (index - 1 + slides.length) % slides.length;
			showSlide(newIndex);
		}

		// Buttons
		nextBtn.on("click", function () {
			nextSlide();
		});

		prevBtn.on("click", function () {
			prevSlide();
		});

		// Init (first active)
		slides.eq(0).addClass("active");
	}

	/*---- Tween Effect ----*/
	var pbmit_tween_effect = function() {
		if (jQuery(window).width() < 768) return;
		jQuery(window).on('scroll resize', function () {
			jQuery('.pbmit-tween-effect').each(function () {
			let $el = jQuery(this),
				rect = this.getBoundingClientRect(),
				inView = rect.top < window.innerHeight && rect.bottom > 0;
			if (!inView) return;
			let progress = 1 - (rect.top / window.innerHeight);
			progress = Math.max(0, Math.min(1, progress)); // Clamp 0–1
			const getVal = (attr) => parseFloat($el.data(attr)) || 0;
			let tx = getVal('x-start') + (getVal('x-end') - getVal('x-start')) * progress,
				ty = getVal('y-start') + (getVal('y-end') - getVal('y-start')) * progress,
				scale = getVal('scale-x-start') + (getVal('scale-x-end') - getVal('scale-x-start')) * progress,
				skewX = getVal('skew-x-start') + (getVal('skew-x-end') - getVal('skew-x-start')) * progress,
				skewY = getVal('skew-y-start') + (getVal('skew-y-end') - getVal('skew-y-start')) * progress,
				rotate = getVal('rotate-x-start') + (getVal('rotate-x-end') - getVal('rotate-x-start')) * progress;
			$el.css('transform', `translate(${tx}%, ${ty}%) scale(${scale}) skew(${skewX}deg, ${skewY}deg) rotate(${rotate}deg)`);
			});
		}).trigger('scroll');
	}

	/*---- Portfolio Style ----*/
	var pbmit_portfolio_style = function() {
		jQuery(".pbmit-element-portfolio-style-2, .pbmit-element-portfolio-style-4").each(function () {
			var $wrapper = jQuery(this);
			var $items = $wrapper.find(".pbmit-portfolio-style-2, .pbmit-portfolio-style-4");

			// Activate first item inside each wrapper
			$items.removeClass('pbmit-active');
			$items.eq(0).addClass('pbmit-active');

			// Click event
			$items.on("click", function () {
				$items.removeClass('pbmit-active');
				jQuery(this).addClass('pbmit-active');
			});

		});
	};

	/*---- Portfolio Hover ----*/
	var pbmit_portfolio_hover = function () {

		if (typeof Swiper !== "undefined") {

			var pbmit_hover = new Swiper(".pbmit-element-portfolio-style-2 .pbmit-hover-image-faded", {
				speed: 1700,
				effect: "fade",
				mousewheel: false,
				fadeEffect: { crossFade: true },
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});

			var pbmit_desc_hover = new Swiper(".pbmit-element-portfolio-style-2 .pbmit-desc-faded", {
				speed: 1700,
				effect: "creative",
				mousewheel: false,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				creativeEffect: {
					prev: { translate: [0, "-100%", 0] },
					next: { translate: [0, "100%", 0] },
				},
			});

			var pbmit_desc_hover_btn = new Swiper(".pbmit-element-portfolio-style-2 .pbmit-portfolio-desc-wrapper", {
				speed: 1700,
				effect: "creative",
				mousewheel: false,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				creativeEffect: {
					prev: { translate: [0, "-100%", 0] },
					next: { translate: [0, "100%", 0] },
				},
			});

			var pbmit_cat_btn_hover = new Swiper(".pbmit-element-portfolio-style-2 .pbmit-cat-btn", {
				speed: 1700,
				effect: "creative",
				mousewheel: false,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				creativeEffect: {
					prev: { translate: [0, "-100%", 0] },
					next: { translate: [0, "100%", 0] },
				},
			});

		}
	};

	/* Pricingtable Switcher */
	var pbmit_pricingtable_switcher = function () {
		var flt_monthly = document.getElementById("filt-monthly"),
			flt_yearly = document.getElementById("filt-yearly"),
			toggle_switch = document.getElementById("switcher"),
			// Select any element whose ID starts with "monthly" or "yearly"
			content_monthly = document.querySelectorAll('[id^="monthly"]'),
			content_yearly = document.querySelectorAll('[id^="yearly"]');

		if (!flt_monthly || !flt_yearly || !toggle_switch) return;

		function showMonthly() {
			toggle_switch.checked = false;
			flt_monthly.classList.add("toggler-active");
			flt_yearly.classList.remove("toggler-active");

			content_monthly.forEach(el => el.classList.remove("hide"));
			content_yearly.forEach(el => el.classList.add("hide"));
		}

		function showYearly() {
			toggle_switch.checked = true;
			flt_yearly.classList.add("toggler-active");
			flt_monthly.classList.remove("toggler-active");

			content_monthly.forEach(el => el.classList.add("hide"));
			content_yearly.forEach(el => el.classList.remove("hide"));
		}

		// Click listeners
		flt_monthly.addEventListener("click", showMonthly);
		flt_yearly.addEventListener("click", showYearly);

		toggle_switch.addEventListener("change", function () {
			if (toggle_switch.checked) showYearly();
			else showMonthly();
		});

		// Default state
		showMonthly();
	};

	var pbmit_service_active_hover = function () {
		var pbmit_var = jQuery('.pbmit-element-service-style-3');
		if (!pbmit_var.length) return;
		pbmit_var.each(function () {
			var pbmit_Class = '.pbmit-service-style-3';
			var $items = jQuery(this).find(pbmit_Class);
			// Set second item active initially
			$items.removeClass('pbmit-active');
			$items.eq(1).addClass('pbmit-active');
			// Mouse over: activate hovered item
			$items.on('mouseover', function () {
				$items.removeClass('pbmit-active');
				jQuery(this).addClass('pbmit-active');
			});
			// Mouse leave: revert to second item
			jQuery(this).on('mouseleave', function () {
				$items.removeClass('pbmit-active');
				$items.eq(1).addClass('pbmit-active');
			});
		});
	};

	function pbmit_service_scroll() {
		const section = document.querySelector('.pbmit-element-service-style-7');
		const center  = section?.querySelector('.pbmit-service-center-inner');
		if (!section || !center) return;

		ScrollTrigger.matchMedia({

		"(min-width: 1025px)": function () {
			let sectionHeight = section.offsetHeight;
			let viewportHeight = window.innerHeight;

			ScrollTrigger.create({
			trigger: section,
			start: "top top",
			end: "+=" + (sectionHeight - viewportHeight),
			pin: center,
			pinSpacing: true,
			anticipatePin: 1
			});

		},
		"(max-width: 992px)": function () {
			ScrollTrigger.getAll().forEach(st => st.kill());
			// Reset position on mobile
			gsap.set(center, { yPercent: 0 });
		}
		});
	}

	var portfolio_pbmit_active = function(){
		var $pbmit_ele = jQuery('.pbmit-element-portfolio-style-4 .pbmit-element-posts-wrapper .pbmit-portfolio-style-4');
		$pbmit_ele.removeClass('pbmit-active');
		$pbmit_ele.first().addClass('pbmit-active');
		$pbmit_ele.on('mouseenter', function() {
			$pbmit_ele.removeClass('pbmit-active');
			jQuery(this).addClass('pbmit-active');
		});
	}

	var pbmit_service_style6 = function() {
		jQuery(".pbmit-element-service-style-6 .pbmit-service-style-6").eq(0).addClass('pbmit-active');
		jQuery(".pbmit-element-service-style-6 .pbmit-service-style-6").on("click", function() {
			if (jQuery(this).hasClass('pbmit-active')) return;
			var main_row = jQuery(this).closest('.pbmit-element-service-style-6');
			jQuery('.pbmit-service-style-6', main_row).removeClass('pbmit-active');
			jQuery(this).addClass('pbmit-active');
			setTimeout(function(){
				if (typeof ScrollTrigger !== "undefined") {
					ScrollTrigger.refresh();
				}
			}, 900);
		});
	}

	function pbmit_heading_subheading_gallery() {
		new Swiper('.pbmit-slider-1', {
			loop: true,
			autoplay: {
				delay: 800,
			},
			speed: 800,
			slidesPerView: 1,
			allowTouchMove: false, // disable dragging if you want
		});
		new Swiper('.pbmit-slider-2', {
			loop: true,
			autoplay: {
				delay: 900,
			},
			speed: 900,
			slidesPerView: 1,
			allowTouchMove: false, // disable dragging if you want
		});
	}

	var pbmit_thia_sticky = function() {
		if(typeof jQuery.fn.theiaStickySidebar == "function"){
			jQuery('.pbmit-sticky-sidebar').theiaStickySidebar({
				additionalMarginTop: 100
			});
			jQuery('.pbmit-sticky-column').theiaStickySidebar({
				additionalMarginTop: 0
			});
		}
	}
	
	/*---- Sortable ----*/
	var pbmit_sorting = function() {
		jQuery('.pbmit-sortable-yes:not(.pbmit-ajax-sortable-yes)').each(function() {
			var boxes = jQuery('.pbmit-element-posts-wrapper', this);
			var links = jQuery('.pbmit-sortable-list a', this);
			boxes.isotope({
				animationEngine: 'best-available',
				layoutMode: 'masonry',
				masonry: {
					horizontalOrder: true
				}
			});
			if( jQuery('body').hasClass('rtl') ){
				boxes.isotope({
					isOriginLeft: false,
					originLeft: false,
				});
			}
			links.on('click', function(e) {
				var selector = jQuery(this).data('sortby');
				if (selector != '*') {
					var selector = '.' + selector;
				}
				boxes.isotope({
					animationEngineString : 'best-available',
					filter: selector,
					itemSelector: '.pbmit-ele',
					layoutMode: 'masonry',
					masonry: {
						horizontalOrder: true
					}
				});
				if( jQuery('body').hasClass('rtl') ){
					boxes.isotope({
						isOriginLeft: false,
						originLeft: false,
					});
				}
				links.removeClass('pbmit-selected');
				jQuery(this).addClass('pbmit-selected');
				e.preventDefault();
			});
		});
	}

	/* ====================================== */
	/* Add Animation
	/* ====================================== */
	function add_animation(threshold = 0.2) {
		const reveals = document.querySelectorAll(".animation");

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("loaded");

				// STOP observing → animation will NOT repeat
				observer.unobserve(entry.target);
			}
			});
		}, { threshold });

		reveals.forEach(el => observer.observe(el));
	}

	function demoOneVideoPopup() {
		$('.demo-1 .pbmit-lightbox-video').magnificPopup({
			type: 'iframe',
			mainClass: 'demo-1-popup'
		});
	}

	ScrollTrigger.matchMedia({
		"(max-width: 1200px)": function() {
			ScrollTrigger.getAll().forEach(t => t.kill());
		}
	});

	// on load
	jQuery(window).on('load', function(){
		pbmit_title_animation();
		pbmit_sticky_header();
		pbmit_sticky_header_class();
		pbmit_toggleSidebar();
		pbmit_navbar();
		pbmit_search_btn();
		pbmit_active_hover();
		pbmit_hover_slide();
		pbmit_staticbox_hover_slide();
		pbmit_team_fade_style();
		pbmit_tween_effect();
		pbmit_portfolio_style();
		pbmit_portfolio_hover();
		pbmit_pricingtable_switcher();
		pbmit_service_active_hover();
		pbmit_service_scroll();
		portfolio_pbmit_active();
		pbmit_service_style6();
		pbmit_heading_subheading_gallery();
		pbmit_thia_sticky();
		pbmit_sorting();
		add_animation();
		demoOneVideoPopup();
		gsap.delayedCall(1, () =>
			ScrollTrigger.getAll().forEach((t) => {
				t.refresh();
			})
		);
	});
})($);