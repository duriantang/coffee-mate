// Generated by CoffeeScript 1.7.1
var Y, accumulate, all, any, best, bool, cart, chr, church, cube, dict, extend, float, hex, int, json, log, max, max_index, memorize, min, min_index, obj, ord, random_gen, ranged_random_gen, reversed, size, sleep, square, str, sum, url_encode, zip,
  __slice = [].slice;

log = (function() {
  var foo, logs;
  logs = [];
  if (typeof window !== "undefined" && window !== null) {
    window.logs = logs;
  }
  foo = function() {
    var args, ball, expr, f, op, _i, _len, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    op = (_ref = args.slice(-1)[0]) === 'log' || _ref === 'warn' || _ref === 'error' ? args.pop() : 'log';
    ball = [];
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      f = args[_i];
      if (typeof f === 'function') {
        expr = f.toString().replace(/^\s*function\s?\(\s?\)\s?{\s*return\s*([^]*?);?\s*}$/, '$1');
        if (expr.length <= 100) {
          expr = expr.replace(/[\r\n]{1,2}\s*/g, '');
        }
        ball.push("## " + expr + " ==>", f());
      } else {
        ball.push('##', f);
      }
    }
    console[op].apply(console, ball);
    return logs.push(ball);
  };
  foo.logs = logs;
  return foo;
})();

sleep = function(seconds, callback) {
  return setTimeout(callback, seconds * 1000);
};

dict = function(pairs) {
  var d, k, v, _i, _len, _ref;
  d = {};
  for (_i = 0, _len = pairs.length; _i < _len; _i++) {
    _ref = pairs[_i], k = _ref[0], v = _ref[1];
    d[k] = v;
  }
  return d;
};

int = function(s, base) {
  var r;
  r = parseInt(s, base);
  if (!((s.slice != null) && r === parseInt(s.slice(0, -1), base))) {
    return r;
  } else {
    return null;
  }
};

float = function(s) {
  if (/^-?[0-9]*(\.[0-9]+)?([eE]-?[0-9]+)?$/.test(s)) {
    return parseFloat(s);
  } else {
    return null;
  }
};

str = function(x, base) {
  return x.toString(base);
};

bool = function(x) {
  if (x === true || x === false) {
    return x;
  } else {
    return null;
  }
};

hex = function(x) {
  return x.toString(16);
};

ord = function(c) {
  return c.charCodeAt();
};

chr = function(x) {
  return String.fromCharCode(x);
};

json = function(it, indent) {
  return JSON.stringify(it, null, indent);
};

obj = function(s) {
  return JSON.parse(s);
};

String.prototype.format = function(args) {
  return this.replace(/\{(\w+)\}/g, function(m, i) {
    if (args[i] != null) {
      return args[i];
    } else {
      return m;
    }
  });
};

String.prototype.repeat = function(n) {
  var pat, r, _ref;
  _ref = ['', this], r = _ref[0], pat = _ref[1];
  while (n > 0) {
    if (n & 1) {
      r += pat;
    }
    n >>= 1;
    pat += pat;
  }
  return r;
};

Object.defineProperties(Array.prototype, {
  first: {
    get: function() {
      return this[0];
    },
    set: function(v) {
      return this[0] = v;
    }
  },
  last: {
    get: function() {
      return this[this.length - 1];
    },
    set: function(v) {
      return this[this.length - 1] = v;
    }
  }
});

reversed = function(arr) {
  return arr.slice().reverse();
};

extend = function() {
  var base, d, defaults, k, r, v, _i, _len;
  base = arguments[0], defaults = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  r = base != null ? dict((function() {
    var _results;
    _results = [];
    for (k in base) {
      v = base[k];
      _results.push([k, v]);
    }
    return _results;
  })()) : {};
  for (_i = 0, _len = defaults.length; _i < _len; _i++) {
    d = defaults[_i];
    if (d != null) {
      for (k in d) {
        v = d[k];
        if (r[k] == null) {
          r[k] = v;
        }
      }
    }
  }
  return r;
};

size = function(obj) {
  return Object.keys(obj).length;
};

url_encode = function(obj) {
  var k, v;
  return ((function() {
    var _results;
    _results = [];
    for (k in obj) {
      v = obj[k];
      _results.push("" + (encodeURIComponent(k)) + "=" + (encodeURIComponent(v)));
    }
    return _results;
  })()).join('&');
};

random_gen = function(seed) {
  if (seed == null) {
    seed = Math.random();
  }
  return function() {
    var x;
    x = Math.sin(++seed) * 1e4;
    return x - Math.floor(x);
  };
};

ranged_random_gen = function(range, seed) {
  var random;
  if (seed == null) {
    seed = 0;
  }
  random = random_gen(seed);
  return function() {
    return Math.floor(random() * range);
  };
};

accumulate = function(fruit, nutri, foo) {
  var it, _i, _len;
  for (_i = 0, _len = nutri.length; _i < _len; _i++) {
    it = nutri[_i];
    fruit = foo(fruit, it);
  }
  return fruit;
};

best = function(better) {
  return function(iter) {
    var it, r, _i, _len;
    r = null;
    for (_i = 0, _len = iter.length; _i < _len; _i++) {
      it = iter[_i];
      r = r === null || better(it, r) ? it : r;
    }
    return r;
  };
};

all = function(f) {
  if (typeof f === 'function') {
    return function(iter) {
      var x, _i, _len;
      for (_i = 0, _len = iter.length; _i < _len; _i++) {
        x = iter[_i];
        if (!f(x)) {
          return false;
        }
      }
      return true;
    };
  } else {
    return function(iter) {
      var x, _i, _len;
      for (_i = 0, _len = iter.length; _i < _len; _i++) {
        x = iter[_i];
        if (x !== f) {
          return false;
        }
      }
      return true;
    };
  }
};

any = function(f) {
  if (typeof f === 'function') {
    return function(iter) {
      var x, _i, _len;
      for (_i = 0, _len = iter.length; _i < _len; _i++) {
        x = iter[_i];
        if (f(x)) {
          return true;
        }
      }
      return false;
    };
  } else {
    return function(iter) {
      var x, _i, _len;
      for (_i = 0, _len = iter.length; _i < _len; _i++) {
        x = iter[_i];
        if (x === f) {
          return true;
        }
      }
      return false;
    };
  }
};

zip = function() {
  var a, arrs, i, j, len, _i, _j, _len, _results;
  arrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  len = Infinity;
  for (_i = 0, _len = arrs.length; _i < _len; _i++) {
    a = arrs[_i];
    if (a.length < len) {
      len = a.length;
    }
  }
  _results = [];
  for (i = _j = 0; 0 <= len ? _j < len : _j > len; i = 0 <= len ? ++_j : --_j) {
    _results.push((function() {
      var _k, _ref, _results1;
      _results1 = [];
      for (j = _k = 0, _ref = arrs.length; 0 <= _ref ? _k < _ref : _k > _ref; j = 0 <= _ref ? ++_k : --_k) {
        _results1.push(arrs[j][i]);
      }
      return _results1;
    })());
  }
  return _results;
};

cart = function() {
  var len, rec, rst, sets;
  sets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  rst = [];
  len = sets.length;
  rec = function(st, d) {
    var x, _i, _len, _ref, _results;
    if (d === len) {
      return rst.push(st);
    } else {
      _ref = sets[d];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push(rec(st.concat([x]), d + 1));
      }
      return _results;
    }
  };
  rec([], 0);
  return rst;
};

church = function(n) {
  var iter;
  iter = function(f, n, r) {
    if (n === 0) {
      return r;
    } else {
      return iter(f, n - 1, f(r));
    }
  };
  return function(f) {
    return function(x) {
      return iter(f, n + 0, x);
    };
  };
};

Y = function(f) {
  return (function(x) {
    return x(x);
  })((function(x) {
    return f((function(y) {
      return (x(x))(y);
    }));
  }));
};

memorize = function(f) {
  var cache;
  cache = {};
  return function() {
    var args, cached, key, r;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    key = json(args);
    cached = cache[key];
    if (cached != null) {
      return cached;
    } else {
      r = f.apply(null, args);
      cache[key] = r;
      return r;
    }
  };
};

square = function(n) {
  return n * n;
};

cube = function(n) {
  return n * n * n;
};

sum = function(arr) {
  var r, x, _i, _len;
  r = 0;
  for (_i = 0, _len = arr.length; _i < _len; _i++) {
    x = arr[_i];
    r += x;
  }
  return r;
};

max = function(arr) {
  return best(function(a, b) {
    return a > b;
  })(arr);
};

min = function(arr) {
  return best(function(a, b) {
    return a < b;
  })(arr);
};

max_index = function(arr) {
  var _i, _ref, _results;
  return best(function(i, j) {
    return arr[i] > arr[j];
  })((function() {
    _results = [];
    for (var _i = 0, _ref = arr.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this));
};

min_index = function(arr) {
  var _i, _ref, _results;
  return best(function(i, j) {
    return arr[i] < arr[j];
  })((function() {
    _results = [];
    for (var _i = 0, _ref = arr.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this));
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = {
    log: log,
    sleep: sleep,
    dict: dict,
    int: int,
    float: float,
    str: str,
    hex: hex,
    ord: ord,
    chr: chr,
    json: json,
    obj: obj,
    reversed: reversed,
    extend: extend,
    size: size,
    url_encode: url_encode,
    random_gen: random_gen,
    ranged_random_gen: ranged_random_gen,
    accumulate: accumulate,
    best: best,
    all: all,
    any: any,
    zip: zip,
    cart: cart,
    church: church,
    Y: Y,
    memorize: memorize,
    square: square,
    cube: cube,
    sum: sum,
    max: max,
    min: min,
    max_index: max_index,
    min_index: min_index
  };
}
