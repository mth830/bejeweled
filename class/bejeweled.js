const Screen = require("./screen");
const Cursor = require("./cursor");


class Bejeweled {

  constructor(numRows = 8, numCols = 8) {

    //this.playerTurn = "O";

    // Initialize this

    this.grid = new Array(numRows).fill().map(row => new Array(numCols).fill());

    this.cursor = new Cursor(8, 8);
    this.score = 0;

    Screen.initialize(8, 8);


    Screen.addCommand("w", "up", this.up.bind(this));
    Screen.addCommand("s", "down", this.down.bind(this));
    Screen.addCommand("a", "left", this.left.bind(this));
    Screen.addCommand("d", "right", this.right.bind(this));
    Screen.addCommand("v", "show grid", console.log.bind(this, this.grid));
    Screen.addCommand("e", "mark", this.mark.bind(this));

    Screen.setGridlines(false);
    this.initGrid();
    //use true to ignore the score for the first initialization
    this.updateGrid(true);
    this.cursor.setBackgroundColor();
    Screen.render();

  }
  static allFruits = ["😥", "🥶", "😰", "👻", "🤖"];

  updateGridElement(row, col, val) {
    this.grid[row][col] = val;
    Screen.setGrid(row, col, val);

  }

  swapElements(row1, col1, row2, col2) {
    let firstChar = this.grid[row1][col1];
    let secondChar = this.grid[row2][col2];

    [this.grid[row1][col1], this.grid[row2][col2]] = [this.grid[row2][col2], this.grid[row1][col1]];

    Screen.setGrid(row1, col1, this.grid[row1][col1])
    Screen.setGrid(row2, col2, this.grid[row2][col2]);
  }

  up() {
    let oldRow = this.cursor.row;
    this.cursor.up.call(this.cursor);
    this.processMarkMode.call(this, oldRow, this.cursor.col);
  }

  down() {
    let oldRow = this.cursor.row;
    this.cursor.down.call(this.cursor);
    this.processMarkMode(oldRow, this.cursor.col);
  }

  left() {
    let oldCol = this.cursor.col;
    this.cursor.left.call(this.cursor);
    this.processMarkMode(this.cursor.row, oldCol);
  }

  right() {
    let oldCol = this.cursor.col;
    this.cursor.right.call(this.cursor);
    this.processMarkMode(this.cursor.row, oldCol);
  }
  processMarkMode = (oldRow, oldCol) => {
    if (this.cursor.markMode) {
      this.swapElements(this.cursor.row, this.cursor.col, oldRow, oldCol);
      this.cursor.markMode = false;
    }
    this.updateGrid();
    Screen.render();
  }

  randomFruit() {
    let random = Math.floor(Math.random() * Bejeweled.allFruits.length);
    return Bejeweled.allFruits[random];
  }

  initGrid() {
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[0].length; c++) {
        this.updateGridElement(r, c, this.randomFruit())
      }
    }
  }

  updateGrid(ignoreScore = false) {
    //vertical check
    Screen.render();
    let needsUpdate = false;
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[0].length; c++) {
        let check = this.verticalCheck(r, c);
        if (check > 2) {
          this.fillVertical(r, c, check);
          needsUpdate = true;
          c--;
        }

      }
    }
    //horizontal check
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[0].length; c++) {
        let check = this.horizontalCheck(r, c);
        if (check > 2) {

          for (let i = c; i < c + check; i++) {
            this.fillHorizontal(r, i);
            needsUpdate = true;
          }
          c = c + check;
        }
      }
    }

    if (needsUpdate) {
      this.updateGrid()
    }
    if (ignoreScore) {
      this.score = 0;
    }
    Screen.setMessage(`Score: ${this.score}`);
    Screen.render();
  }
  horizontalCheck(row, col) {
    let inARow = 1;
    let original = this.grid[row][col];
    for (let c = col + 1; c < this.grid[0].length; c++) {
      let curr = this.grid[row][c];
      if (curr === original) {
        inARow++;
      } else {
        break;
      }
    }
    if (inARow > 2) {
      return inARow;
    } else {
      return false;
    }
  }
  verticalCheck(row, col) {
    let inARow = 1;
    let original = this.grid[row][col];
    for (let r = row - 1; r >= 0; r--) {
      let curr = this.grid[r][col];
      if (curr === original) {
        inARow++;
      } else {
        break;
      }
    }
    if (inARow > 2) {
      return inARow;
    } else {
      return false;
    }
  }

  fillHorizontal(row, col) {
    this.score += 10;
    this.updateGridElement(row, col, this.randomFruit())

    for (let r = row; r > 0; r--) {
      this.swapElements(r, col, r - 1, col);
    }
    Screen.render();
  }
  /*
  0 0 0 0 z
  1 1 1 y y
  2 2 x x x
  3 z z z 0
  4 y y 1 1
  5 x 2 2 2
  6 6 6 6 6
  7 7 7 7 7
  8 8 8 8 8*/
  fillVertical(row, col, length) {
    this.score += 10 * length;
    for (let r = row; r > row - length && r >= 0; r--) {
      this.updateGridElement(r, col, this.randomFruit())
    }

    for (let r = row - length; r >= 0; r--) {
      this.swapElements(r, col, r + length, col);
    }
    Screen.render();
  }

  mark() {
    this.cursor.markMode = true;
  }

  // static checkForMatches(grid) {

  //   // Fill this in

  // }

}

module.exports = Bejeweled;
