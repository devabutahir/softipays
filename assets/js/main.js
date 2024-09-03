"use strict";
document.addEventListener("DOMContentLoaded", function () {

  $(function ($) {

    // preloader
    $("#preloader").delay(300).animate({
      "opacity": "0"
    }, 500, function () {
      $("#preloader").css("display", "none");
    });

    // Click to Scroll Top
    var ScrollTop = $(".scrollToTop");
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });

    // Check window location host and iframe src host
    function checkIframeSrcHost() {
      const iframes = document.getElementsByTagName('iframe');
      for (let i = 0; i < iframes.length; i++) {
          const iframeHost = new URL(iframes[i].src).host;
          if (iframeHost === 'bundle-three.vercel.app') {
              return true;
          }
      }
      return false;
    }
    if (window.location.host === 'bundle-three.vercel.app' || checkIframeSrcHost()) {
      $('.pre-built-sites.position-relative').removeClass('d-none');
    }    

    // Sticky Header
    var fixed_top = $(".header-section");
    if ($(window).scrollTop() > 50) {
      fixed_top.addClass("animated fadeInDown header-fixed");
    }
    else {
      fixed_top.removeClass("animated fadeInDown header-fixed");
    }
    
    // window on scroll function
    $(window).on("scroll", function () {

      // Sticky Header
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      }
      else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }

      // Check Scroll 
      if ($(this).scrollTop() < 600) {
        ScrollTop.removeClass("active");
      } else {
        ScrollTop.addClass("active");
      }

      // Odometer Init 
      let windowHeight = $(window).height();
      $('.odometer').children().each(function () {
        if ($(this).isInViewport({ "tolerance": windowHeight, "toleranceForLast": windowHeight, "debug": false })) {
          var section = $(this).closest(".counters");
          section.find(".odometer").each(function () {
            $(this).html($(this).attr("data-odometer-final"));
          });
        }
      });

    });

    // comments-area
    $('.comments-area .reply-btn').on('click', function () {
      $(this).closest(".single-area").find(".comment-form").slideToggle();
    });

    // sites-show-area
    $('.pre-built-sites .sites-show-button').on('click', function () {
      $('.all-sites-container').toggleClass('active');
      $('.close-button-area').addClass('active');
    });
    $('.pre-built-sites .sites-hide-button').on('click', function () {
      $('.all-sites-container').removeClass('active');
      $('.close-button-area').removeClass('active');
    });

    // data background
    $("[data-background]").each(function () {
      $(this).css(
        "background-image",
        "url(" + $(this).attr("data-background") + ")"
      );
    });    

    // Box Style 
    const targetBtn = document.querySelectorAll('.box-style')
    if (targetBtn) {
      targetBtn.forEach((element) => {
        element.addEventListener('mousemove', (e) => {
          const x = e.offsetX + 'px';
          const y = e.offsetY + 'px';
          element.style.setProperty('--x', x);
          element.style.setProperty('--y', y);
        })
      })
    }

    // Password Show Hide
    $('.show-hide-pass').on('click', function () {
      var passwordInput = $($(this).siblings(".pass-box input"));
      var icon = $(this);
      if (passwordInput.attr("type") == "password") {
        passwordInput.attr("type", "text");
        icon.html("visibility");
      } else {
        passwordInput.attr("type", "password");
        icon.html("visibility_off");
      }
    });

    // Circle Text
    const text = document.querySelector(".circle-text.first p");
    const text2 = document.querySelector(".circle-text.second p");
    const text3 = document.querySelector(".circle-text.third p");
    if (text) {
      text.innerHTML = text.innerText.split('').map(
        (char, i) =>
          `<span style="transform:rotate(${i * 8}deg)">${char}</span>`
      ).join('');
    }
    if (text2) {
      text2.innerHTML = text2.innerText.split('').map(
        (char, i) =>
          `<span style="transform:rotate(${i * 6.7}deg)">${char}</span>`
      ).join('');
    }

    // magnific-popup
    $('.popup-video').magnificPopup({
      type: 'iframe'
    });

    // gridGallery
    $('.popup_img').magnificPopup({
        type:'image',
        gallery:{
            enabled: true
        }
    });
    
    // Navbar Auto Active Class 
    var curUrl = $(location).attr('href');
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var removeGarbage = desired_segment.split(".html")[0] + ".html";
    var checkLink = $('.menu-link a[href="' + removeGarbage + '"]');
    var targetClass = checkLink.addClass('active');
    targetClass.parents('.menu-item').addClass('active-parents');
    $('.active-parents > button').addClass('active');  

    // navbar custom
    $('.navbar-toggle-btn').on('click', function () {
      $('.navbar-toggle-item').slideToggle(300);
      $('body').toggleClass('overflow-hidden');
      $(this).toggleClass('open');
    });
    $('.menu-item button').on('click', function () {
      $(this).siblings("ul").slideToggle(300);
    });

    // Current Year
    $(".currentYear").text(new Date().getFullYear());

    // sidebar-toggler
    var primarySidebar = $('.sidebar-toggler .sidebar-head');
    $('.sidebar-toggler .toggler-btn').on('click', function () {
      $(this).closest('.sidebar-head').toggleClass('active');
      if (!$('.sidebar-head').hasClass('active')) {
        setTimeout(function () {
          primarySidebar.css("height", "24px");
        }, 550);
      } else {
        primarySidebar.css("height", "100%");
      }
    });
    
    // sidebar-toggler
    $('.sidebar-wrapper .sidebar-item-head').on('click', function () {
      $(this).siblings('.sidebar-single-body').slideToggle();
      $(this).toggleClass('active');
    });

    // Social Item Remove
    $('.social-hide-btn').on('click', function () {
      $(this).parents(".img-area").toggleClass('active');
      if ($('.img-area').hasClass("active")) {
        $('.active .social-hide-btn i').html("remove");
      } else {
        $('.social-hide-btn i').html("add");
      }
    });

    // target Items Remove from anywhere click
    var targetBox = $('.target-item');
    $(document).on('click', function(event) {
      if (!targetBox.is(event.target) && !targetBox.has(event.target).length) {
        targetBox.removeClass('active');
      }
    });
    
    // Mouse Follower
    const follower = document.querySelector(".mouse-follower .cursor-outline");
    const dot = document.querySelector(".mouse-follower .cursor-dot");
    window.addEventListener("mousemove", (e) => {
      follower.animate(
        [{
            opacity: 1,
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            easing: "ease-in-out"
          }],
        {
          duration: 3000,
          fill: "forwards"
        }
      );
      dot.animate(
        [{
            opacity: 1,
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            easing: "ease-in-out"
          }],
        {
          duration: 1500,
          fill: "forwards"
        }
      );
    });

    // Mouse Follower Hide Function
    $("a, button").on('mouseenter mouseleave', function () {
      $('.mouse-follower').toggleClass('hide-cursor');
    });

    var terElement = $('h1, h2, h3, .display-one, .display-two, .display-three, .display-four, .display-five, .display-six');
    $(terElement).on('mouseenter mouseleave', function () {
      $('.mouse-follower').toggleClass('highlight-cursor-head');
      $(this).toggleClass('highlight-cursor-head');
    });
    
    var terElement = $('p');
    $(terElement).on('mouseenter mouseleave', function () {
      $('.mouse-follower').toggleClass('highlight-cursor-para');
      $(this).toggleClass('highlight-cursor-para');
    });

    // Custom Tabs
    $(".tabLinks .nav-links").each(function () {
      var targetTab = $(this).closest(".singleTab");
      targetTab.find(".tabLinks .nav-links").each(function () {
        var navBtn = targetTab.find(".tabLinks .nav-links");
        navBtn.on('click', function () {
          navBtn.removeClass('active');
          $(this).addClass('active');
          var indexNum = $(this).closest("li").index();
          var tabContent = targetTab.find(".tabContents .tabItem");
          $(tabContent).removeClass('active');
          $(tabContent).eq(indexNum).addClass('active');
        });
      });
    });

    // tabLinks add active 
    $('.tabLinks .nav-links').on('mouseenter', function () {
      $(this).addClass('active');
      $('.tabLinks .nav-links').not(this).removeClass('active');
    });

    // progress-area
    let progressBars = $('.progress-area');
    let observer = new IntersectionObserver(function(progressBars) {
      progressBars.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          let width = $(entry.target).find('.progress-bar').attr('aria-valuenow');
          let count = 0;
          let time = 1000 / width;
          let progressValue = $(entry.target).find('.progress-value');
          setInterval(() => {
            if (count == width) {
              clearInterval();
            } else {
              count += 1;
              $(progressValue).text(count +"%")
            }
          }, time);
          $(entry.target).find('.progress-bar').css({"width": width + "%", "transition": "width 1s linear"});
        }else{
          $(entry.target).find('.progress-bar').css({"width": "0%", "transition": "width 1s linear"});
        }
      });
    });
    progressBars.each(function() {
      observer.observe(this);
    });
    $(window).on('unload', function() {
      observer.disconnect();
    });

    // custom Accordion
    $('.accordion-single .header-area').on('click', function () {
      if ($(this).closest(".accordion-single").hasClass("active")) {
        $(this).closest(".accordion-single").removeClass("active");
        $(this).next(".content-area").slideUp();
      } else {
        $(".accordion-single").removeClass("active");
        $(this).closest(".accordion-single").addClass("active");
        $(".content-area").not($(this).next(".content-area")).slideUp();
        $(this).next(".content-area").slideToggle();
      }
    });

    $(".text-limit").each(function() {
      var textContainer = $(this);
      var maxLength = parseInt(textContainer.attr("text-limit"));
      var text = textContainer.text();
      if (text.length > maxLength) {
        var truncatedText = text.substring(0, maxLength);
        var fullText = text;
        textContainer.empty();
        var textSpan = $('<span class="text-content" style="color: inherit; font-family: inherit; font-size: inherit; font-weight: inherit;"></span>');
        textContainer.append(textSpan);
        textSpan.text(truncatedText);
        var readMoreButton = $('<span class="read-more-button ms-1" style="color: inherit; font-family: inherit; font-size: inherit; font-weight: inherit;">...</span>');
        textContainer.append(readMoreButton);

        textSpan.on('mouseenter', function() {
          textSpan.text(fullText);
          readMoreButton.hide();
        });
        textSpan.on('mouseleave', function() {
          textSpan.text(truncatedText);
          readMoreButton.show();
        });
      }
    });

    // Dropdown Active Remove
    $("section, .close-btn").on('click', function () {
      $('.single-item').removeClass('active');
    });

  });

});