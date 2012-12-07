test "summary with 4 chars", ->
  equal aiko.summary('すうどん'), '藍子「すうどん」'

test "summary with 5 chars", ->
  equal aiko.summary('こんにちは'), '藍子「こんにち…」'

test "parse Query with url encoded text", ->
  equal aiko.parseQuery("%E9%AB%98%E6%A3%AE%E8%97%8D%E5%AD%90"), "高森藍子"

test "parse Query with punycode", ->
  equal aiko.parseQuery("i8st03asrwvvs"), "高森藍子"

test "url encoded punycode", ->
  equal aiko.parseQuery("%3E%3E1-j73b4bb2a5hl3urf7ctz6w2663frbra"), 
        ">>1さんスレ立てお疲れさまです"
