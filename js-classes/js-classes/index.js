function BaseBuilder(value) {
  this._value = value;
  this._operations = [];
}
 
BaseBuilder.prototype.get = function () {
  return this._operations.reduce(function (acc, op) {
    return op(acc);
  }, this._value);
};
 
BaseBuilder.prototype._addOp = function (op) {
  this._operations.push(op);
  return this;
};
 
class IntBuilder extends BaseBuilder {
  constructor(int = 0) {
    super(int);
  }
 
  plus(...n) {
    return this._addOp((val) => n.reduce((acc, num) => acc + num, val));
  }
 
  minus(...n) {
    return this._addOp((val) => n.reduce((acc, num) => acc - num, val));
  }
 
  multiply(n) {
    return this._addOp((val) => val * n);
  }
 
  divide(n) {
    return this._addOp((val) => Math.floor(val / n));
  }
 
  mod(n) {
    return this._addOp((val) => val % n);
  }
 
  static random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}
 
function StringBuilder(str) {
  BaseBuilder.call(this, str !== undefined ? str : "");
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;
 
StringBuilder.prototype.plus = function (...str) {
  return this._addOp(function (val) {
    return str.reduce(function (acc, s) {
      return acc + s;
    }, val);
  });
};
 
StringBuilder.prototype.minus = function (n) {
  return this._addOp(function (val) {
    return val.slice(0, val.length - n);
  });
};
 
StringBuilder.prototype.multiply = function (int) {
  return this._addOp(function (val) {
    var result = "";
    for (var i = 0; i < int; i++) {
      result += val;
    }
    return result;
  });
};
 
StringBuilder.prototype.divide = function (n) {
  return this._addOp(function (val) {
    return val.slice(0, Math.floor(val.length / n));
  });
};
 
StringBuilder.prototype.remove = function (str) {
  return this._addOp(function (val) {
    var result = val;
    var idx = result.indexOf(str);
    while (idx !== -1) {
      result = result.slice(0, idx) + result.slice(idx + str.length);
      idx = result.indexOf(str);
    }
    return result;
  });
};
 
StringBuilder.prototype.sub = function (from, n) {
  return this._addOp(function (val) {
    return val.slice(from, from + n);
  });
};
