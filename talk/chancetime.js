(function() {
  var $, a1, a2, aiko, animatePetal, petalTransform;

  $ = jQuery;

  aiko = {
    text: "",
    updateLocation: function() {
      return history.replaceState(null, null, "?" + punycode.encode(this.text));
    },
    updateShareButton: function() {
      var url;
      url = "https://twitter.com/share?" + $.param({
        url: location.href,
        text: this.summary(this.text)
      });
      return $("#twitter").show().prop("href", url);
    },
    summary: function(text) {
      var len, s;
      len = 4;
      if (text.length <= len) {
        s = text;
      } else {
        s = text.substring(0, len) + '…';
      }
      return '藍子「' + s + '」';
    },
    animate: function() {
      $("#serifu").css({
        top: "640px"
      });
      $(".face").not("#face0").css("opacity", "0.0");
      return $("#face1").animate({
        opacity: "1.0"
      }, 1000).promise().then(function() {
        return $.when($("#face2").animate({
          opacity: "1.0"
        }, 400), $("#serifu").animate({
          top: "448px"
        }, 200));
      });
    },
    setText: function(text) {
      this.text = text;
      $("#text").text(text);
      return $("#input").val(text);
    },
    talk: function(text) {
      this.setText(text);
      this.updateLocation();
      this.updateShareButton();
      return this.animate();
    },
    onload: function(event) {
      var text;
      $("#aiko").css("visibility", "visible");
      text = this.parseQuery(location.search.substring(1));
      if (text.length > 0) {
        return this.talk(text);
      } else {
        return this.animate();
      }
    },
    parseQuery: function(qs) {
      if (qs.indexOf("%") >= 0) {
        return decodeURIComponent(qs);
      } else {
        try {
          return punycode.decode(qs);
        } catch (e) {
          return "";
        }
      }
    }
  };

  if (typeof exports !== "undefined" && exports !== null) {
    exports.aiko = aiko;
  }

  if (typeof window !== "undefined" && window !== null) {
    window.aiko = aiko;
  }

  jQuery.event.add(window, "load", function() {
    return aiko.onload();
  });

  $("#form").submit(function() {
    var text;
    text = $("#input").val();
    aiko.talk(text);
    return false;
  });

  a1 = function() {
    return $("#arrow").animate({
      right: "20px",
      bottom: "20px"
    }, 300, a2);
  };

  a2 = function() {
    return $("#arrow").animate({
      right: "16px",
      bottom: "16px"
    }, 300, a1);
  };

  a1();

  animatePetal = function(element, duration) {
    var anim, obj, r;
    r = $(element).parent().width();
    obj = {
      angle: 0
    };
    anim = $.Animation(obj, {
      angle: Math.PI * 0.6
    }, {
      duration: duration
    });
    anim.progress(function() {
      var angle, transform, x, y;
      angle = obj.angle;
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r;
      transform = petalTransform(angle);
      return $(element).css({
        position: "absolute",
        left: x + 'px',
        top: y + 'px',
        transform: transform
      });
    });
    return anim;
  };

  petalTransform = function(angle) {
    var a;
    a = angle + Math.PI * -0.5;
    return 'rotate(' + a + 'rad)';
  };

}).call(this);
