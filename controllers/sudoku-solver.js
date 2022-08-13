class SudokuSolver {

  validate(puzzleString) {
    // check it to see if it has 81 valid characters
    // 1-9 and . 
    // return true or false
    if (puzzleString.length != 81) {
      return false;
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    // this points to SudokuSolver >> this.validate()

  }
}

module.exports = SudokuSolver;

/* 

{ "valid": false, "conflict": [ "column" ] }
{ "error": "Invalid coordinate" }
{ "valid": false, "conflict": [ "row", "column" ] }
{ "valid": false, "conflict": [ "column", "region" ] }
{ "valid": true }

*/