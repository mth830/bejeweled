const Screen = require("./screen");
//const Bejeweled  = require("./bejeweled")

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;
    this.markMode = false;
    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render();
  }

  up() {
    // Move cursor up
  
    this.resetBackgroundColor()
    if (this.row >= 1) {
      this.row--;
    }
    this.setBackgroundColor()

  }


  down(grid) {
    // Move cursor down

    this.resetBackgroundColor();
    if (this.row + 1 < this.numRows) {
      this.row++;
    }
    this.setBackgroundColor();
  }

  left(grid) {
    this.resetBackgroundColor()
    // Move cursor left

    if (this.col >= 1) {
      this.col--;
    }

    this.setBackgroundColor();
  }

  right(grid) {
    this.resetBackgroundColor()
    // Move cursor right

    if (this.col + 1 < this.numCols) {
      this.col++;
    }

    this.setBackgroundColor();
  }

}


module.exports = Cursor;
