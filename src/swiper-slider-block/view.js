(function ($) {
	$(document).ready(function () {
		// Default Slider
		$(".afca-blocks-library--default").each(function (index, element) {
			const coverBlocks = $(element).find(
				".block-slider-normal .wp-block-cover"
			);

			// Add custom class
			coverBlocks.each(function () {
				$(this).addClass("swiper-slide");
			});

			// Initialize the slider
			const $slider = new Swiper($(element).find(".block-slider-normal")[0], {
				autoplay: $(element).attr("autoplay") !== "undefined" ? true : false,
				loop: $(element).attr("loop") !== "undefined" ? true : false,
				slidesPerView:
					$(element).attr("slidesperview") !== "undefined"
						? $(element).attr("slidesperview")
						: 1,
				spaceBetween:
					$(element).attr("spacebetweenimages") !== "undefined"
						? $(element).attr("spacebetweenimages")
						: 1,
				speed:
					$(element).attr("speed") !== "undefined"
						? $(element).attr("speed")
						: 300,
				pagination:
					$(element).attr("pagination") !== "undefined"
						? {
								el: ".swiper-pagination",
								type:
									$(element).attr("paginationtype") == 2
										? "progressbar"
										: "bullets",
								clickable: true,
						  }
						: false,
				navigation:
					$(element).attr("navigation") !== "undefined"
						? {
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
						  }
						: false,
				on: {
					click: function (swiper) {
						// Allow Full Screen
						if ($(element).attr("allowfullscreen") !== "undefined") {
							openFullscreenSwiper(swiper.clickedIndex);
						}
					},
				},
			});

			// Apply border radius to the slides
			setSliderColorScheme($slider, $slider.slides);

			/**
			 * Open the fullscreen swiper with the specified initial slide number.
			 *
			 * @param {number} initialSlideNumber - The initial slide number to display.
			 */
			function openFullscreenSwiper(initialSlideNumber) {
				var mainSwiperMarkup = $(element).find(".block-slider-normal").html();

				$(element)
					.find("#fullscreen-swiper")
					.append(mainSwiperMarkup + "<div id='fullscreen-swiper-close'></div>")
					.fadeIn();

				const $fullscreenSwiper = new Swiper(
					$(element).find("#fullscreen-swiper")[0],
					{
						autoplay:
							$(element).attr("autoplay") !== "undefined" ? true : false,
						loop: $(element).attr("loop") !== "undefined" ? true : false,
						slidesPerView: 1,
						centeredSlides: true,
						paginationClickable: true,
						speed:
							$(element).attr("speed") !== "undefined"
								? $(element).attr("speed")
								: 300,

						pagination:
							$(element).attr("pagination") !== "undefined"
								? {
										el: ".swiper-pagination",
										type:
											$(element).attr("paginationtype") == 2
												? "progressbar"
												: "bullets",
										clickable: true,
								  }
								: false,
						navigation:
							$(element).attr("navigation") !== "undefined"
								? {
										nextEl: ".swiper-button-next",
										prevEl: ".swiper-button-prev",
								  }
								: false,

						initialSlide: initialSlideNumber,
					}
				);

				$(element).find("#fullscreen-swiper-backdrop").fadeIn();
				$("body, html").addClass("no-scroll");

				$(element)
					.find("#fullscreen-swiper-close")
					.html($(element).find("#fullscreen-swiper-icon-close").html());

				$(element)
					.find("#fullscreen-swiper-close")
					.on("click", function () {
						$(element).find("#fullscreen-swiper").hide().empty();
						$(element).find("#fullscreen-swiper-backdrop").fadeOut();
						$("body, html").removeClass("no-scroll");
						$fullscreenSwiper.destroy();
					});

				setSliderColorScheme($fullscreenSwiper, $fullscreenSwiper.slides);
			}

			/**
			 * Sets the color scheme of a slider.
			 *
			 * @param {jQuery} $slider - The slider element.
			 * @param {Array} slides - The array of slide elements.
			 */
			function setSliderColorScheme($slider, slides) {
				for (let i = 0; i < slides.length; i++) {
					const slide = slides[i];
					slide.style.borderRadius =
						$(element).attr("sliderborderradius") + "px";
				}

				// Pagination
				if ($(element).attr("pagination") !== "undefined") {
					if ($(element).attr("paginationtype") == 0) {
						// Change color
						const bullets = $slider.pagination.bullets;
						for (let i = 0; i < bullets.length; i++) {
							let bullet = bullets[i];
							$(bullet).css({
								"background-color": $(element).attr(
									"paginationbackgroundcolor"
								),
							});
						}
					} else if ($(element).attr("paginationtype") == 1) {
						// Change color
						const bullets = $slider.pagination.bullets;
						for (let i = 0; i < bullets.length; i++) {
							let bullet = bullets[i];
							$(bullet).css({
								"background-color": $(element).attr(
									"paginationbackgroundcolor"
								),
							});
						}

						// Type bars
						for (let i = 0; i < bullets.length; i++) {
							let bullet = bullets[i];
							$(bullet).css({
								width: "18px",
								"border-radius": "2px",
								margin: "5px",
							});
						}
					} else if ($(element).attr("paginationtype") == 2) {
						// Change color
						const progressbar = $slider.pagination.el;

						$(progressbar)
							.find(".swiper-pagination-progressbar-fill")
							.css({
								"background-color": $(element).attr(
									"paginationbackgroundcolor"
								),
								"border-radius": "8px",
								width: "99.8%",
								"margin-left": "1px",
							});

						// Type progress bar
						$(progressbar).css({
							"border-radius": "8px",
							height: "4px",
							top: "99%",
						});
					}
				}

				// Close Fullscreen
				if ($(element).attr("allowfullscreen") !== "undefined") {
					$(element)
						.find("#fullscreen-swiper-close")
						.css({
							color: $(element).attr("fullscreenclosebuttoncolor"),
							"border-color": $(element).attr("fullscreenclosebuttoncolor"),
							"background-color": $(element).attr(
								"fullscreenclosebuttonbackgroundcolor"
							),
						});
				}
			}
		});

		// Mosaic Gallery
		$(".afca-blocks-library--mosaic-gallery").each(function (
			index,
			element
		) {
			const coverBlocksAuxiliaryImageGallery = $(
				".afca-blocks-library--mosaic-gallery .wp-block-image"
			);

			coverBlocksAuxiliaryImageGallery.each(function () {
				$(this).addClass("swiper-slide");
			});

			const $slider = new Swiper($(element).find(".block-slider-normal")[0], {
				slidesPerView: 1,
				spaceBetween: "10px",
				noSwiping: true,
				allowTouchMove: false,
				on: {
					click: function (swiper) {
						// Allow Full Screen
						if ($(element).attr("allowfullscreen") !== "undefined") {
							openFullscreenSwiper(swiper.clickedIndex);
						}
					},
				},
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView:
							$(element).attr("slidesperview") !== "undefined"
								? $(element).attr("slidesperview")
								: 4,
					},
				},
			});

			function setDisplayCount() {
				const checkMedium = window.matchMedia("(min-width: 640px)");
				const checkLarge = window.matchMedia("(min-width: 1200px)");

				if (checkLarge.matches) {
					$(element)
						.find(".afca-blocks-library__items-number span")
						.text("+" + ($(element).attr("itemscount") - 4));
				} else if (checkMedium.matches) {
					$(element)
						.find(".afca-blocks-library__items-number span")
						.text("+" + ($(element).attr("itemscount") - 2));
				} else {
					$(element)
						.find(".afca-blocks-library__items-number span")
						.text("+" + ($(element).attr("itemscount") - 1));
				}
			}

			setDisplayCount();

			$( window ).on( "resize", function() {
				setDisplayCount();
			});

			/**
			 * Open the fullscreen swiper with the specified initial slide number.
			 *
			 * @param {number} initialSlideNumber - The initial slide number to display.
			 */
			function openFullscreenSwiper(initialSlideNumber) {
				var mainSwiperMarkup = $(element).find(".block-slider-normal").html();

				$(element)
					.find("#fullscreen-swiper")
					.append(mainSwiperMarkup + "<div id='fullscreen-swiper-close'></div>")
					.fadeIn();

				const $fullscreenSwiper = new Swiper(
					$(element).find("#fullscreen-swiper")[0],
					{
						slidesPerView: 1,
						pagination: {
							el: ".swiper-pagination",
							type: "custom",
							renderCustom: function (swiper, current, total) {
								return current + "/" + total;
							},
						},
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
						initialSlide: initialSlideNumber,
						centeredSlides: true,
						loop: true,
					}
				);

				$(element).find("#fullscreen-swiper-backdrop").fadeIn();
				$("body, html").addClass("no-scroll");

				$(element)
					.find("#fullscreen-swiper-close")
					.html($(element).find("#fullscreen-swiper-icon-close").html());

				$(element)
					.find("#fullscreen-swiper-close")
					.on("click", function () {
						$(element).find("#fullscreen-swiper").hide();
						$(element)
							.find("#fullscreen-swiper")
							.find(
								".swiper-wrapper, .swiper-notification, #fullscreen-swiper-close"
							)
							.remove();
						$(element).find("#fullscreen-swiper-backdrop").fadeOut();
						$("body, html").removeClass("no-scroll");
						$fullscreenSwiper.destroy();
					});

				setSliderColorScheme($fullscreenSwiper, $fullscreenSwiper.slides);
			}

			/**
			 * Sets the color scheme of a slider.
			 *
			 * @param {jQuery} $slider - The slider element.
			 * @param {Array} slides - The array of slide elements.
			 */
			function setSliderColorScheme($slider, slides) {
				// Close Fullscreen
				if ($(element).attr("allowfullscreen") !== "undefined") {
					$(element)
						.find("#fullscreen-swiper-close")
						.css({
							color: $(element).attr("fullscreenclosebuttoncolor"),
							"border-color": $(element).attr("fullscreenclosebuttoncolor"),
							"background-color": $(element).attr(
								"fullscreenclosebuttonbackgroundcolor"
							),
						});
				}
			}
		});
	});
})(jQuery);
