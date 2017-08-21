$(document).ready(function(){

  // Loading
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  Pace.on('done', function(event) {
  });

  // Animations
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  new WOW().init();

  // Responsive videos
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  $(".row").fitVids();

  // Images gallery
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  $.each($(".gallery[rows]"), function (_,gallery) {
    var $gallery = $(gallery),
      rows = $gallery.attr("rows").split(" "),
      $imgs = $gallery.find("img");
    $.each(rows, function(_, rowQty) {
      var $row = $("<div></div>", {'class': "gallery-row"});
      rowQty = parseInt(rowQty, 10);
      $row.appendTo($gallery);
      while (rowQty--) {
        var $img = $([].shift.call($imgs));
        $("<a></a>", {
          href: $img.attr("src")
        }).append($img).appendTo($row)
      }
    })
  });

  $('.gallery a').simpleLightbox({close:true});

  // Navigation toggle
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('body').toggleClass('no-scroll');
  });

  // Search results
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  $('#search-field').ghostHunter({
    results: '#results',
    info_template   : "<p>Number of posts found: {{amount}}</p>",
    result_template : "<h4 class='results-title'><a href='{{link}}'>{{title}}</a></h4><time class='results-date'>{{pubDate}}</time><hr>",
    onKeyUp: true
  });

  // Social icons
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  if ( typeof social_icons !== 'undefined' ) {
    $.each( social_icons, function(index, val) {
       $(".social-navigation ul").append('<li><a href="' + val + '">' + extractDomain(val) + '</a></li>');
    });
  } else {
    $(".social-navigation").remove();
  }

  // Instagram feed
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  if ( typeof userId !== 'undefined' ) {

    if ( $("#instafeed").length > 0) {
      var feed = new Instafeed({
        //To get a User account
        get: 'user',
        userId: userId,
        accessToken: accessToken,
        limit: 8,
        template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
      });
      feed.run();
    }
  } else {
    $(".widget-instagram").remove();
  }

  // Scroll to top
  // ––––––––––––––––––––––––––––––––––––––––––––––––––

  $('.scroll-top').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

});

// Extract domain
// ––––––––––––––––––––––––––––––––––––––––––––––––––

function extractDomain(url) {
  var domain;

  // Find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  // Find & remove port number
  domain = domain.split(':')[0];
  domain = domain.replace("www.", "");
  domain = domain.replace(".com", "");
  return domain;
}
