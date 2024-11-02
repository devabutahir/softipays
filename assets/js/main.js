/**
 * Main JavaScript file for the website
 * 
 * This file contains various functionality for the website, including:
 * - Preloader animation
 * - Scroll to top button
 * - Sticky header
 * - Odometer initialization
 * - Comment area interactions
 * - Password show/hide toggle
 * - Circular text effect
 * - Magnific Popup for videos and images
 * - Navbar active class and toggle
 * - Sidebar toggler
 * - Mouse follower effect
 * - Custom tabs
 * - Progress bars
 * - Custom accordions
 * - Text truncation with "read more" functionality
 * - Custom select dropdowns
 * - Global chart (using amCharts)
 * 
 * The code is wrapped in a DOMContentLoaded event listener to ensure
 * all elements are loaded before executing the JavaScript.
 */


"use strict";
document.addEventListener("DOMContentLoaded", function () {

  $(function ($) {

    // preloader
    $("#preloader").delay(800).animate({
      "opacity": "0"
    }, 800, function () {
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

    //>> Project Hover Image Show Slider Start <<//
    const portfolioBoxItems = document.querySelectorAll(".portfolio-box-items");

    function followImageCursor(event, portfolioBoxItems) {
        const contentBox = portfolioBoxItems.getBoundingClientRect();
        const dx = event.clientX - contentBox.x;
        const dy = event.clientY - contentBox.y;
        portfolioBoxItems.children[2].style.transform = `translate(${dx}px, ${dy}px) rotate(0)`;
    }
    
    portfolioBoxItems.forEach((item, i) => {
        item.addEventListener("mousemove", (event) => {
            setInterval(followImageCursor(event, item), 1000);
        });
    });

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



  // Custom Select   
  // $(function () {

  //   // Global Variables //
  //   var ulList = $('.ulList'),
  //       ulImg  = $('.ulList .ulImg'),
  //       ulTxt  = $('.ulList .ulTxt'),
  //       liList = $('.liList'),
  //       liDiv  = $('.liList .li'),
  //       liImg  = $('.liList .li img');

  //   // Hide Li List When Click Away //
  //   $(window).on('mouseup', function (event) {
  //       if (!ulList.is(event.target) && ulList.has(event.target).length === 0 && !liList.is(event.target) && liList.has(event.target).length === 0) {
  //           liList.slideUp(); // Hide with smooth slide animation
  //       }
  //   });

  //   // Show And Hide Li List with Smooth Animation //
  //   ulList.on('click', function () {
  //       liList.slideToggle(); // Toggle with smooth slide animation
  //   });

  //   // Put Li List Img And Text In Ul List //
  //   liDiv.on('click', function () {
  //       ulImg.attr('src', $(this).children('img').attr('src')).show();
  //       ulTxt.text($(this).text());
  //       liList.slideUp(); // Hide the list with animation after selection
  //   });
  // });

  //Select Dropdown
    $(function () {

        // Initialize dropdowns
        $('.containerss').each(function () {
            var container = $(this); // Scope to the current container
            var ulList = container.find('.ulList');
            var ulImg  = container.find('.ulImg');
            var ulTxt  = container.find('.ulTxt');
            var liList = container.find('.liList');
            var liDiv  = container.find('.li');
            var liImg  = container.find('.liImg');

            // Hide Li List When Click Away //
            $(document).on('mouseup', function (event) {
                if (!ulList.is(event.target) && ulList.has(event.target).length === 0 && !liList.is(event.target) && liList.has(event.target).length === 0) {
                    liList.slideUp(); // Hide with smooth slide animation
                }
            });

            // Show And Hide Li List with Smooth Animation //
            ulList.on('click', function () {
                liList.slideToggle(); // Toggle with smooth slide animation
            });

            // Put Li List Img And Text In Ul List //
            liDiv.on('click', function () {
                ulImg.attr('src', $(this).children('img').attr('src')).show();
                ulTxt.text($(this).text());
                liList.slideUp(); // Hide the list with animation after selection
            });
        });

    });
    //Global Chart
  
  // Themes begin
  // am4core.useTheme(am4themes_animated);
  // Themes end

  var mapChart = am4core.create("chartdiv", am4maps.MapChart);

  // Set map definition
  mapChart.geodata = am4geodata_continentsLow;

  var colorSet = new am4core.ColorSet();
  var currentTime = new Date();

  // Set projection
  mapChart.projection = new am4maps.projections.Orthographic();
  mapChart.panBehavior = "rotateLongLat";
  mapChart.deltaLatitude = -30;
  mapChart.deltaLongitude = 60;
  // chart.padding(20,20,20,20);

  // Create map polygon series
  var polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#47c78a");
  polygonTemplate.stroke = am4core.color("#454a58");
  polygonTemplate.strokeWidth = 0.5;

  var graticuleSeries = mapChart.series.push(new am4maps.GraticuleSeries());
  graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
  graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
  graticuleSeries.fitExtent = false;


  mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
  mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#ffffff");

  // Shared
  var hoverColorHex = "#9a7bca";
  var hoverColor = am4core.color(hoverColorHex);

  // Continents 
  var continentsSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
  continentsSeries.geodata = am4geodata_continentsLow;
  continentsSeries.useGeodata = true;
  // continentsSeries.exclude = ["antarctica"];

  var continentTemplate = continentsSeries.mapPolygons.template;
  continentTemplate.tooltipText = "{name}: {population.formatNumber('#,000')}";
  continentTemplate.properties.fillOpacity = 0.8; // Reduce conflict with back to continents map label
  continentTemplate.propertyFields.fill = "color";
  continentTemplate.nonScalingStroke = true;
  continentTemplate.strokeOpacity = 0.5;
  continentTemplate.events.on("hit", function(event){
    if ( ! countriesSeries.visible) 
      countriesSeries.visible = true;
    mapChart.zoomToMapObject(event.target);
    // stateTemplate.show();
    countryTemplate.show();
      // imageSeriesTemplate.show();
        imageSeriesTemplate2.show();
    //    imageSeriesTemplate3.show();
    // imageSeriesTemplate4.show();
    labelContainer.show();
    
  });

  var contintentHover = continentTemplate.states.create("hover");
  contintentHover.properties.fill = hoverColor;
  contintentHover.properties.stroke = hoverColor;

  continentsSeries.dataFields.zoomLevel = "zoomLevel";
  continentsSeries.dataFields.zoomGeoPoint = "zoomGeoPoint";


  continentsSeries.data = [ {
    "id": "africa",
    "population": "1287920000",
    "color": mapChart.colors.getIndex(0),
    "zoomLevel": 2,
    "zoomGeoPoint": {
      "latitude": 18,
      "longitude": 20
    }
  }, {
    "id": "asia",
    "population": "4545133000",
    "color": mapChart.colors.getIndex(1),
    "zoomLevel": 2,
    "zoomGeoPoint": {
      "latitude": 46,
      "longitude": 89
    }
  }, {
    "id": "oceania",
    "population": "41261000",
    "color": mapChart.colors.getIndex(2),
    "zoomLevel": 2,
    "zoomGeoPoint": {
      "latitude": -7,
      "longitude": 129
    }
  }, {
    "id": "europe",
    "population": "742648000",
    "color": mapChart.colors.getIndex(3),
    "zoomLevel": 2,
    "zoomGeoPoint": {
      "latitude": 48,
      "longitude": 10
    }
  }, {
    "id": "northAmerica",
    "population": "587615000",
    "color": mapChart.colors.getIndex(4),
    "zoomLevel": 5,
    "zoomGeoPoint": {
      "latitude": 38,
      "longitude": -90
    }
  }, {
    "id": "southAmerica",
    "population": "428240000",
    "color": mapChart.colors.getIndex(5),
    "zoomLevel": 2,
    "zoomGeoPoint": {
      "latitude": -9,
      "longitude": -60
    }
  }];


  let animation;
  setTimeout(function(){
    animation = mapChart.animate({property:"deltaLongitude", to:100000}, 20000000);
  }, 6000)

  mapChart.seriesContainer.events.on("down", function(){
  if(animation){
    animation.stop();
  }
  })


  });

});


(function () {
  // Function to handle multiple sliders
  function RangeSlider(sliderOneId, sliderTwoId, minValId, maxValId, totalOutputId, sliderTrackSelector) {
      // Get DOM elements
      let sliderOne = document.getElementById(sliderOneId);
      let sliderTwo = document.getElementById(sliderTwoId);
      let displayValOne = document.getElementById(minValId);
      let displayValTwo = document.getElementById(maxValId);
      let totalOutput = document.getElementById(totalOutputId);
      let sliderTrack = document.querySelector(sliderTrackSelector);
      let minGap = 0;
      let sliderMaxValue = sliderOne.max;

      // Update first slider value
      function slideOne() {
          if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
              sliderOne.value = parseInt(sliderTwo.value) - minGap;
          }
          displayValOne.textContent = sliderOne.value;
          updateTotal();  // Update the total range after slider change
          fillColor();  // Update slider track color
      }

      // Update second slider value
      function slideTwo() {
          if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
              sliderTwo.value = parseInt(sliderOne.value) + minGap;
          }
          displayValTwo.textContent = sliderTwo.value;
          updateTotal();  // Update the total range after slider change
          fillColor();  // Update slider track color
      }

      // Update the total price range and display it
      function updateTotal() {
          let total = sliderTwo.value - sliderOne.value;
          totalOutput.textContent = `$${total}`;
      }

      // Update slider track background color
      function fillColor() {
          let percent1 = (sliderOne.value / sliderMaxValue) * 100;
          let percent2 = (sliderTwo.value / sliderMaxValue) * 100;
          sliderTrack.style.background = `linear-gradient(to right, #03FFB7 ${percent1}% , #03FFB7 ${percent1}% , #03FFB7 ${percent2}%, #EFF9F6 ${percent2}%)`;
      }

      // Attach event listeners for the sliders
      sliderOne.addEventListener('input', slideOne);
      sliderTwo.addEventListener('input', slideTwo);

      // Initialize the slider on load
      slideOne();
      slideTwo();
  }

  // Initialize all sliders on the page
  window.addEventListener('DOMContentLoaded', function () {
      // Initialize sliders only if elements exist
      if (document.getElementById('range-slider-1') && document.getElementById('range-slider-2')) {
          new RangeSlider('range-slider-1', 'range-slider-2', 'min-value', 'max-value', 'range-output', '.slider-track');
      }

      if (document.getElementById('range-slider-3') && document.getElementById('range-slider-4')) {
          new RangeSlider('range-slider-3', 'range-slider-4', 'min-value-2', 'max-value-2', 'range-output-2', '.slider-track-2');
      }
  });

  // Calculator logic, checking if elements exist
  const amount = document.getElementById('amount'),
      interest = document.getElementById('interest'),
      year = document.getElementById('year'),
      monthly_cost = document.getElementById('monthly_cost'),
      calculate = document.getElementById('calc_submit'),
      total_value = document.getElementById('total_value');

  const amount2 = document.getElementById('amount2'),
      interest2 = document.getElementById('interest2'),
      year2 = document.getElementById('year2'),
      monthly_cost2 = document.getElementById('monthly_cost2'),
      calculate2 = document.getElementById('calc_submit2'),
      total_value2 = document.getElementById('total_value2');

  if (calculate) {
      calculate.addEventListener('click', function (e) {
          e.preventDefault();
          // Loan 1 calculations
          if (amount && interest && year) {
              let total = (amount.value / 100 * interest.value) + parseInt(amount.value);
              total_value.innerHTML = total.toFixed(2);
              monthly_cost.innerHTML = (total / (year.value * 12)).toFixed(2);
          }

          // Loan 2 calculations
          if (amount2 && interest2 && year2) {
              let total2 = (amount2.value / 100 * interest2.value) + parseInt(amount2.value);
              total_value2.innerHTML = total2.toFixed(2);
              monthly_cost2.innerHTML = (total2 / (year2.value * 12)).toFixed(2);
          }
      });
  }

  // Additional event listener for second calculator (if applicable)
  if (calculate2) {
      calculate2.addEventListener('click', function (e) {
          e.preventDefault();
          // Loan 2 calculations
          if (amount2 && interest2 && year2) {
              let total2 = (amount2.value / 100 * interest2.value) + parseInt(amount2.value);
              total_value2.innerHTML = total2.toFixed(2);
              monthly_cost2.innerHTML = (total2 / (year2.value * 12)).toFixed(2);
          }
      });
  }
})();

const eggPrice = 60;
const soltPrice = 40;

const totalPrice = eggPrice + soltPrice;
console.log(totalPrice);
