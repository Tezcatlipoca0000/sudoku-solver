class SudokuSolver {

  validate(puzzleString) {
    // check it to see if it has 81 valid characters
    // 1-9 and . 
    // return true or false
    let re = /[^1-9|^\.]/;
    if (puzzleString.length != 81) return 'not81';
    for (let i = 0; i < puzzleString.length; i++) {
      if (re.test(puzzleString[i])) {
        //console.log('re test 2 negative ', re.source, puzzleString[i]);
        return false;
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let answer = true,
        idx = (row * 9) - (10 - column);
  
    if (puzzleString[idx] === '.') {
      // Is there another number same as value in that row?
      for (let i = (row * 9) - 9; i < (row * 9); i++) {
        if (puzzleString[i] == value) answer = false;
      }
    } else {
      for (let i = (row * 9) - 9; i < (row * 9); i++) {
        if (i != idx) {
          if (puzzleString[i] == value) answer = false;
        }
      }
      // Is there another number in that spot?
      if (puzzleString[idx] != value) answer = false;
    }

    return answer;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let answer = true,
        idx = (row * 9) - (10 - column);

    if (puzzleString[idx] === '.') {
      for (let i = column - 1 ; i < (column + 72); i+=9) {
        if (puzzleString[i] == value) answer = false;
      }
    } else {
      for (let i = column - 1 ; i < (column + 72); i+=9) {
        if (i != idx) {
          if (puzzleString[i] == value) answer = false;
        }
      }
      if (puzzleString[idx] != value) answer = false;
    }
    
    return answer;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let idx = (row * 9) - (10 - column),
        I = [0, 1, 2, 9, 10, 11, 18, 19, 20],
        II = [3, 4, 5, 12, 13, 14, 21, 22, 23],
        III = [6, 7, 8, 15, 16, 17, 24, 25, 26],
        IV = [27, 28, 29, 36, 37, 38, 45, 46, 47],
        V = [30, 31, 32, 39, 41, 41, 48, 49, 50],
        VI = [33, 34, 35, 42, 43, 44, 51, 52, 53],
        VII = [54, 55, 56, 63, 64, 65, 72, 73, 74],
        VIII = [57, 58, 59, 66, 67, 68, 75, 76, 77],
        IX = [60, 61, 62, 69, 70, 71, 78, 79, 80],
        capturedReg = [];

    if (column < 4 && row < 4) {
      for (let i of I) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column > 3 && column < 7 && row < 4) {
      for (let i of II) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column > 6 && row < 4) {
      for (let i of III) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column < 4 && row > 3 && row < 7) {
      for (let i of IV) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column > 3 && column < 7 && row > 3 && row < 7) {
      for (let i of V) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column > 6 && row > 3 && row < 7) {
      for (let i of VI) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column < 4 && row > 6) {
      for (let i of VII) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column > 3 && column < 7 && row > 6) {
      for (let i of VIII) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    } else if (column > 6 && row > 6) {
      for (let i of IX) {
        if (i != idx) {
          capturedReg.push(puzzleString[i]);
        }
      }
    }
    //console.log('tst reg ', reg, capturedReg, value);

    if (capturedReg.includes(`${value}`)) {
      return false
    } else {
      return true
    }
  }

  solve(puzzleString) {
    let solvedString = '',
        tryAgain = false;
    //console.log('begin solving ', puzzleString);
    for (let i = 0; i < puzzleString.length; i++) {
      let row = 0,
          col = 0,
          rowSol = [],
          colSol = [],
          regSol = [],
          matched = [];
      
      // What coordinate?
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

      // Is it an open spot?
      if (puzzleString[i] === '.') {

        // All posible solutions for row
        for (let j = 1; j < 10; j++) {
          if (this.checkRowPlacement(puzzleString, row, col, j)) {
            rowSol.push(j);
          }
        }
        //console.log(`row solutions for row: ${row} col: ${col} --- ${rowSol} ||| ${i}`);

        // All posible solutions for col
        for (let j = 1; j < 10; j++) {
          if (this.checkColPlacement(puzzleString, row, col, j)) {
            colSol.push(j);
          }
        }
        //console.log(`col solutions for row: ${row} col: ${col} --- ${colSol} ||| ${i}`);

        // All posible solutions for region
        for (let j = 1; j < 10; j++) {
          if (this.checkRegionPlacement(puzzleString, row, col, j)) {
            regSol.push(j);
          }
        }
        //console.log(`reg solutions for row: ${row} col: ${col} --- ${regSol} ||| ${i}`);

        // All matched posible solutions for coordinate
        rowSol.forEach(n => {
          if (colSol.includes(n) && regSol.includes(n)) matched.push(n);
        });
        //console.log(`matched solutions for row: ${row} col: ${col} --- ${matched} ||| ${i}`);

        // if matched only by 1 number write that as solved and signal to re-start at the end
        if (matched.length === 1) {
          //console.log('matched only with 1 num');
          solvedString += matched[0];
          tryAgain = true;
        } else {
          solvedString += '.';
        }
      
      // If it's not an empty spot?
      } else {
        // first validate
        let valRow = this.checkRowPlacement(puzzleString, row, col, puzzleString[i]),
            valCol = this.checkRowPlacement(puzzleString, row, col, puzzleString[i]),
            valReg = this.checkRegionPlacement(puzzleString, row, col, puzzleString[i]);
        //console.log('tst puzzle validity row col reg ', valRow, valCol, valReg);

        // if not valid return impossible
        if (!valRow || !valCol || !valReg) {
          return 'Imposible';
        } else {
          solvedString += puzzleString[i]; 
        }
      }
    }

    //console.log('finished the loop ', solvedString, 'tryagain? ', tryAgain);
    if (tryAgain) {
      return this.solve(solvedString);
    } else {
      //console.log('finishedddddd', solvedString);
      if (solvedString.includes('.')) {
        //console.log('impossible ', solvedString);
        return 'Imposible';
      } else {
        return solvedString;
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