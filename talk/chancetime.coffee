$ = jQuery

# 画像が無いと困るので onload を使う
jQuery.event.add window, "load", ->
  $("#aiko").css("visibility", "visible")
  text = decodeURIComponent(location.search.substring(1))
  if text.length > 0
    # クエリ～ストリング付きで来た時
    talk(text)
  else
    start()

start = ->
  $("#serifu").css({top: "640px"})
  $(".face").not("#face0").css("opacity", "0.0")
  $("#face1").animate({opacity: "1.0"}, 1000).promise()
  .then -> $.when(
    $("#face2").animate({opacity: "1.0"}, 400),
    $("#serifu").animate({top: "448px"}, 200)
  )

# arrow
a1 = ->
  $("#arrow").animate({right: "20px", bottom: "20px"}, 300, a2)
a2 = ->
  $("#arrow").animate({right: "16px", bottom: "16px"}, 300, a1)
a1()

# petal
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

# しゃべる
talk = (text) ->
  $("#text").text(text)
  $("#input").val(text)
  start()
  # URL を書き換えたり
  document.title = "藍子「"+stripSerifu(text)+"」"
  history.replaceState(null, null, "?"+encodeURIComponent(text))
  updateShareURL()

stripSerifu = (s) ->
  len = 4
  if s.length <= len
    s
  else
    s.substring(0, len) + "…"

updateShareURL = ->
  url = "https://twitter.com/share?"+ $.param
    url: location.href
    text: document.title
  $("#twitter").prop("href", url)

# 入力した
$("#form").submit ->
  text = $("#input").val()
  talk(text)
  return false
