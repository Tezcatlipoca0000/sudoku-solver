class SudokuSolver {

  validate(puzzleString) {
    // check it to see if it has 81 valid characters
    // 1-9 and . 
    // return true or false
    let re = /[^1-9|^\.]/;
    if (puzzleString.length != 81) return false;
    for (let i = 0; i < puzzleString.length; i++) {
      if (re.test(puzzleString[i])) {
        //console.log('re test 2 negative ', re.source, puzzleString[i]);
        return false;
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // i = ((row * 9) - 9); ((row * 9) + 9); i++
  }

  checkColPlacement(puzzleString, row, column, value) {
    // i = col-1 i+=9
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    // this points to SudokuSolver >> this.validate()
    let row = 0,
        col = 0,
        solvedPuzzle = puzzleString;
    for (let i = 0; puzzleString.length; i++) {
      if (puzzleString[i] === '.') {

        if (i < 9) {
          row = 1;
          col = i + 1;
        } else if (i > 8 && i < 18) {
          row = 2;
          col = (i + 1) - 9;
        } else if (i > 17 && i < 27) {
          row = 3;
          col = (i + 1) - 18;
        } else if (i > 26 && i < 36) {
          row = 4;
          col = (i + 1) - 27;
        } else if (i > 35 && i < 45) {
          row = 5;
          col = (i + 1) - 36;
        } else if (i > 44 && i < 54) {
          row = 6;
          col = (i + 1) - 45;
        } else if (i > 53 && i < 63) {
          row = 7;
          col = (i + 1) - 54;
        } else if (i > 62 && i < 72) {
          row = 8;
          col = (i + 1) - 63;
        } else if (i > 71 && i < 81) {
          row = 9;
          col = (i + 1) - 72;
        }

        for (let j = 1; j < 10; j++) {
          if (this.checkRowPlacement(puzzleString, row, col, j)) {
            solvedPuzzle[i] = j;
          }
        }
      }
    }
  }
}

module.exports = SudokuSolver;

/* 

{ "valid": false, "conflict": [ "column" ] }
{ "error": "Invalid coordinate" }
{ "valid": false, "conflict": [ "row", "column" ] }
{ "valid": false, "conflict": [ "column", "region" ] }
{ "valid": true }

{ "error": "Expected puzzle to be 81 characters long" }
{ "error": "Invalid characters in puzzle" }
{ "error": "Puzzle cannot be solved" }

*/