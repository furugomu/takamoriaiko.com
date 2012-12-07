$ = jQuery

aiko =
  text: ""

  updateLocation: ->
    history.replaceState(null, null, "?"+encodeURIComponent(@text))

  updateShareButton: ->
    url = "https://twitter.com/share?"+ $.param
      url: location.href
      text: @summary(@text)
    $("#twitter").show().prop("href", url)

  summary: (text)->
    len = 4
    if text.length <= len
      s = text
    else
      s = text.substring(0, len)+'…'
    '藍子「'+s+'」'

  animate: ->
    $("#serifu").css({top: "640px"})
    $(".face").not("#face0").css("opacity", "0.0")
    $("#face1").animate({opacity: "1.0"}, 1000).promise()
    .then -> $.when(
      $("#face2").animate({opacity: "1.0"}, 400),
      $("#serifu").animate({top: "448px"}, 200)
    )

  setText: (text)->
    @text = text
    $("#text").text(text)
    $("#input").val(text)

  talk: (text)->
    @setText(text)
    @updateLocation()
    @updateShareButton()
    @animate()

  onload: (event)->
    $("#aiko").css("visibility", "visible")
    text = @parseQuery(location.search.substring(1))
    if text.length > 0
      @talk(text)
    else
      @animate()

  parseQuery: (qs)->
    decodeURIComponent(qs)

exports?.aiko = aiko
window?.aiko = aiko

# 画像が無いと困るので onload を使う
jQuery.event.add window, "load", ->
  aiko.onload()

# 入力した
$("#form").submit ->
  text = $("#input").val()
  aiko.talk(text)
  return false

## 常時動くアニメーション

# 右下の矢印
a1 = ->
  $("#arrow").animate({right: "20px", bottom: "20px"}, 300, a2)
a2 = ->
  $("#arrow").animate({right: "16px", bottom: "16px"}, 300, a1)
a1()

# はなびら
# 未完成
animatePetal = (element, duration) ->
  r = $(element).parent().width();
  obj = {angle: 0}
  anim = $.Animation(obj, {angle: Math.PI*0.6}, {duration: duration})
  anim.progress ->
    angle = obj.angle
    x = Math.cos(angle) * r
    y = Math.sin(angle) * r
    transform = petalTransform(angle)
    $(element).css
      position: "absolute"
      left: x+'px', top: y+'px'
      transform: transform
  return anim

petalTransform = (angle) ->
  a = angle + Math.PI * -0.5
  'rotate('+a+'rad)'
