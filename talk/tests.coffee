test "summary with 4 chars", ->
  equal aiko.summary('すうどん'), '藍子「すうどん」'

test "summary with 5 chars", ->
  equal aiko.summary('こんにちは'), '藍子「こんにち…」'
