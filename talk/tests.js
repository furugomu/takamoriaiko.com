(function() {

  test("summary with 4 chars", function() {
    return equal(aiko.summary('すうどん'), '藍子「すうどん」');
  });

  test("summary with 5 chars", function() {
    return equal(aiko.summary('こんにちは'), '藍子「こんにち…」');
  });

  test("parseQuery with url encoded text", function() {
    return equal(aiko.parseQuery("%E9%AB%98%E6%A3%AE%E8%97%8D%E5%AD%90"), "高森藍子");
  });

  test("parseQuery with punycode", function() {
    return equal(aiko.parseQuery("i8st03asrwvvs"), "高森藍子");
  });

  test("parseQuery with url encoded punycode", function() {
    return equal(aiko.parseQuery("%3E%3E1-j73b4bb2a5hl3urf7ctz6w2663frbra"), ">>1さんスレ立てお疲れさまです");
  });

  test("toQuery", function() {
    return equal(aiko.toQuery("ポポポ"), punycode.encode("ポポポ"));
  });

  test("toQuery URL エンコードする", function() {
    return equal(aiko.toQuery("&> "), encodeURIComponent(punycode.encode("&> ")));
  });

  test("toQuery 空白文字はそのまま", function() {
    return equal(aiko.toQuery("ポ\nポ\t \nポ"), encodeURIComponent(punycode.encode("ポ\nポ\t \nポ")));
  });

}).call(this);
