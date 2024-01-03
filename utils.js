/*

You may need to add utils.js as a dependency to import it

-----------------------------------------------------------------------------------------------------
import "./utils.js";
import { Vertex, Grid, Fraction, utils } from "./utils"; // Vertex, Grid, Fraction, utils are optional, may be added or removed
-----------------------------------------------------------------------------------------------------

Importable: Vertex, Grid, Fraction, utils

version 1.5

*/

// fraction object
export class Fraction {
  constructor(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.numer = numerator; // shorthand
    this.denom = denominator; // shorthand
  }
  simplify = function () {
    return utils.math.simplifyFraction(this);
  };
  toDecimal = function () {
    return this.numerator / this.denominator;
  };
}

// grid object
export class Grid {
  constructor(array, width) {
    this.grid = [];
    for (let i = 0; i < array.length; i++) {
      if (i % width === 0) {
        this.grid.push([array[i]]);
      } else {
        this.grid[this.grid.length - 1].push(array[i]);
      }
    }
    this.width = width;
    this.height = this.grid.length;
  }
  get = function (x, y) {
    if (x >= this.width) {
      return undefined;
    }
    if (y >= this.height) {
      return undefined;
    }
    return this.grid[y][x];
  };
  set = function (x, y, value) {
    if (x >= this.width) {
      return undefined;
    }
    if (y >= this.height) {
      return undefined;
    }
    this.grid[y][x] = value;
  };
  empty = function (x, y) {
    if (x >= this.width) {
      return undefined;
    }
    if (y >= this.height) {
      return undefined;
    }
    this.grid[y][x] = undefined;
  };
  addRow = function () {
    this.height++;
    let add = [];
    for (let i = 0; i < this.width; i++) {
      add.push(undefined);
    }
    this.grid.push(add);
  };
  addColumn = function () {
    this.width++;
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].push(undefined);
    }
  };
}

// vertex object
export class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// main utils
export const utils = {
  math: {
    factor: (number) => {
      const factors = [];
      factors.push(Number(number));
      for (let i = 2; i <= number / 2; i++) {
        if (number / i === Math.round(number / i)) {
          factors.push(number / i);
        }
      }
      factors.push(1);
      return factors;
    },
    gcf: (number_1, number_2) => {
      let num1 = number_1;
      let num2 = number_2;
      const factors1 = utils.math.factor(num1);
      const factors2 = utils.math.factor(num2);
      var gcf = null;
      for (let i = 0; i < factors1.length; i++) {
        if (factors2.includes(factors1[i])) {
          gcf = factors1[i];
          break;
        }
      }
      return gcf;
    },
    avg: (number_array) => {
      const vars = number_array;
      let total = 0;
      for (let i = 0; i < vars.length; i++) {
        total += vars[i];
      }
      total = total / vars.length;
      return total;
    },
    invertNumInRange: (number, min, max) => {
      return min + (max - number);
    },
    clamp: (number, min, max) => {
      if (number < min) {
        number = min;
      }
      if (number > max) {
        number = max;
      }
      return number;
    },
    sumOfArray: (array) => {
      let count = 0;
      for (let i = 0; i < array.length; i++) {
        count += array[i];
      }
      return count;
    },
    // requires: fraction object
    floatToBasicFraction: (float) => {
      let multiplier = 1;
      let save_dec = float;
      while (true) {
        save_dec = save_dec * 10;
        multiplier = multiplier * 10;
        if (save_dec === Math.round(save_dec)) {
          break;
        }
      }
      return new Fraction(save_dec, multiplier);
    },
    // requires: fraction object
    simplifyFraction: (fractionObject) => {
      const frac = fractionObject;
      let div = utils.math.gcf(frac.numerator, frac.denominator);
      return new Fraction(frac.numerator / div, frac.denominator / div);
    },
    // requires: fraction object
    floatToFraction: (float) => {
      return utils.math.simplifyFraction(
        utils.math.floatToBasicFraction(float)
      );
    },
    factorial: (number) => {
      let result = number;
      for (let i = number - 1; i > 0; i--) {
        result = result * i;
      }
      return result;
    },
    // requires: vertex object
    changeOrigin: (pointVertex, newOriginVertex) => {
      return new Vertex(
        pointVertex.x - newOriginVertex.x,
        pointVertex.y - newOriginVertex.y
      );
    }
  },
  tools: {
    ensuredPrompt: (text, allowEmpty = false) => {
      let answer = prompt(text);
      while (answer === "" || answer === null) {
        answer = prompt(text);
        if (answer === "" && allowEmpty) {
          break;
        }
      }
      return answer;
    },
    confirmedAlert: (text) => {
      alert(text);
      return confirm("Are you sure?");
    },
    removeItem: (array, index) => {
      array.splice(index, 1);
      return array;
    },
    threshold: (number, min, max, inclusive = true) => {
      return inclusive
        ? number >= min && number <= max
        : number > min && number < max;
    },
    secondsToMinutes: (seconds) => {
      return seconds / 60;
    },
    checkType: (value, type) => {
      return typeof value === type;
    },
    beforeWindowClose: (action) => {
      window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        action();
      });
    },
    fancyNumber: (num, decimals = 2) => {
      const order = ["k", "m", "b", "t", "q", "Q", "s", "S", "o", "n", "d"];
      for (let i = order.length - 1; i >= 0; i--) {
        let updatednum = num / 10 ** (i * 3 + 3);
        if (updatednum < 1000 && updatednum >= 1) {
          return (
            (Math.floor(updatednum * 10 ** decimals) / 10 ** decimals).toFixed(
              decimals
            ) + order[i]
          );
        }
      }
      return Math.round(num);
    },
    repeat: (times, action) => {
      for (let i = 0; i < times; i++) {
        action(i);
      }
    },
    parseUrlParams: (url = location.search) => {
      const params = [];
      for (const [key, value] of new URLSearchParams(url).entries()) {
        params.push([key, value]);
      }
      return params;
    },
    percentBar: (
      percent,
      fullChar = "|",
      emptyChar = " ",
      startChar = "[",
      endChar = "]",
      width = 10
    ) => {
      let output = startChar;
      for (let i = 0; i < width; i++) {
        output =
          output + (Math.floor(percent * width) <= i ? emptyChar : fullChar);
      }
      output = output + endChar;
      return output;
    }
  },
  localStorage: {
    getObject: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
    setObject: (key, object) => {
      localStorage.setItem(key, JSON.stringify(object));
    },
    checkKey: (key) => {
      return !(localStorage.getItem(key) === null);
    },
    setDefault: (key, defaultValue) => {
      if (!utils.localStorage.checkKey(key)) {
        localStorage.setItem(key, defaultValue);
      }
    }
  },
  randomTools: {
    randBool: () => {
      return Math.random() >= 0.5;
    },
    biasedRandBool: (percentChanceOfTrue) => {
      return Math.random() <= percentChanceOfTrue;
    },
    rangedRandInt: (min, max) => {
      return Math.round(min + Math.random() * (max - min));
    },
    rangedRandFloat: (min, max) => {
      return min + Math.random() * (max - min);
    },
    randInArray: (array) => {
      return array[utils.randomTools.rangedRandInt(0, array.length - 1)];
    }
  },
  htmlTools: {
    dropdown: (title, valuesArray, defaultValue = valuesArray[0], id = "") => {
      const main = document.createElement("select");
      main.id = id;
      main.title = title;
      main.innerHTML = "<optgroup label=" + title + "></optgroup>";
      for (let i = 0; i < valuesArray.length; i++) {
        const current = document.createElement("option");
        current.setAttribute("value", valuesArray[i]);
        current.innerHTML = valuesArray[i];
        main.appendChild(current);
      }
      main.value = defaultValue;
      return main;
    },
    searchbar: (searchAction, id) => {
      const main = document.createElement("input");
      main.id = id;
      main.setAttribute("onkeyup", searchAction);
      main.placeholder = "search";
      main.setAttribute("type", "text");
      return main;
    },
    text: (text, ID = "text") => {
      const toAppend = document.createElement("p");
      toAppend.innerHTML = text;
      toAppend.id = ID;
      return toAppend;
    },
    whitelist: (characters, textBoxID) => {
      let textbox = document.getElementById(textBoxID);
      textbox.meta = textBoxID;
      textbox.addEventListener("keyup", () => {
        let newText = "";
        for (let i = 0; i < this.value.length; i++) {
          if (characters.indexOf(i) != -1) newText += i;
        }
        this.value = newText;
      });
    }
  },
  session: {
    usernames: [],
    passwords: [],
    login: (username, password, sessionLength = 600000) => {
      if (
        utils.session.passwords[utils.session.usernames.indexOf(username)] ===
        password
      ) {
        utils.localStorage.setObject("utilsSession", {
          sessionLength: sessionLength,
          currentUser: username,
          sessionActive: true,
          startTime: new Date().getTime()
        });
        return true;
      } else {
        return false;
      }
    },
    end: () => {
      const session = utils.localStorage.getObject("utilsSession");
      session.sessionActive = false;
      utils.localStorage.setObject("utilsSession", session);
    },
    validate: (endIfFalse = true) => {
      utils.localStorage.setDefault(
        "utilsSession",
        JSON.stringify({
          sessionLength: 600000,
          currentUser: null,
          sessionActive: false,
          startTime: new Date().getTime()
        })
      );
      const session = utils.localStorage.getObject("utilsSession");
      if (
        new Date().getTime() - session.startTime <= session.sessionLength &&
        session.sessionActive
      ) {
        return true;
      } else {
        if (endIfFalse) {
          utils.session.end();
        }
        return false;
      }
    },
    currentUser: () => {
      return utils.localStorage.getObject("utilsSession").currentUser;
    },
    continue: () => {
      const session = utils.localStorage.getObject("utilsSession");
      session.startTime = new Date().getTime();
      utils.localStorage.setObject("utilsSession", session);
    },
    timeLeft: () => {
      const session = utils.localStorage.getObject("utilsSession");
      return session.startTime + session.sessionLength - new Date().getTime();
    }
  }
};
