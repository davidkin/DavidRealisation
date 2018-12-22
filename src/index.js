/* eslint no-param-reassign: ["error", { "props": false }]*/

class MyArray {
  constructor(...value) {
    if (value.length === 1 && typeof value[0] === 'string') {
      this[0] = value[0];
      this.length = value.length;
    } else if (value.length === 1) {
      for (let i = 0; i < value[0]; i++) {
        this[i] = undefined;
      }
      this.length = value[0];
    } else {
      for (let i = 0; i < value.length; i++) {
        this[i] = value[i];
      }

      this.length = value.length;
    }
  }

  // -------------------------------------

  static from(value, callback, thisArg) {
    const newArr = new MyArray();

    if (callback === undefined && thisArg === undefined) {
      for (let i = 0; i < value.length; i++) {
        newArr.push(value[i]);
      }
    }

    if (Boolean(callback) && Boolean(thisArg)) {
      for (let i = 0; i < value.length; i++) {
        newArr.push(callback.call(thisArg, value[i], i, value));
      }
    }

    if (Boolean(callback) && !thisArg) {
      for (let i = 0; i < value.length; i++) {
        newArr.push(callback(value[i], i, value));
      }
    }

    return newArr;
  }

  push(...value) {
    for (let i = 0; i < value.length; i++) {
      this[this.length] = value[i];
      this.length += 1;
    }

    return this.length;
  }

  pop() {
    const elem = this[this.length - 1];

    if (this.length === 0) {
      return;
    }

    delete this[this.length - 1];

    this.length -= 1;

    return elem;
  }

  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    const newArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newArr.push(callback.call(thisArg, this[i], i, this));
    }

    return newArr;
  }

  filter(callback, thisArg) {
    const newArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        newArr.push(this[i]);
      }
    }

    return newArr;
  }

  toString() {
    let newStr = '';

    if (this.length === 0) {
      return '';
    }

    for (let i = 0; i < this.length - 1; i++) {
      newStr += `${String(this[i])},`;
    }

    newStr += this[this.length - 1];

    return newStr;
  }

  reduce(callback, startValue) {
    let acc = startValue === undefined ? this[0] : startValue;

    for (let i = 0; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }

    return acc;
  }

  sort(callback) {
    let cb = callback;

    if (!cb) {
      cb = (a, b) => {
        const a1 = String(a);
        const b1 = String(b);

        if (a1 > b1) {
          return 1;
        } else if (b1 > a1) {
          return -1;
        } else {
          return 0;
        }
      };
    }

    for (let i = 0; i < this.length; i++) {
      const swapElem = this[i];
      let lastValue = i - 1;

      while (lastValue >= 0 && cb(this[lastValue], swapElem) > 0) {
        this[lastValue + 1] = this[lastValue];
        lastValue -= 1;
      }
      this[lastValue + 1] = swapElem;
    }

    return this;
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export default MyArray;


