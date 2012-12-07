(function() {

  test("summary with 4 chars", function() {
    return equal(aiko.summary('すうどん'), '藍子「すうどん」');
  });

  test("summary with 5 chars", function() {
    return equal(aiko.summary('こんにちは'), '藍子「こんにち…」');
  });

  test("parse Query with url encoded text", function() {
    return equal(aiko.parseQuery("%E9%AB%98%E6%A3%AE%E8%97%8D%E5%AD%90"), "高森藍子");
  });

  test("parse Query with punycode", function() {
    return equal(aiko.parseQuery("i8st03asrwvvs"), "高森藍子");
  });

}).call(this);
