(function() {

  test("summary with 4 chars", function() {
    return equal(aiko.summary('すうどん'), '藍子「すうどん」');
  });

  test("summary with 5 chars", function() {
    return equal(aiko.summary('こんにちは'), '藍子「こんにち…」');
  });

}).call(this);
