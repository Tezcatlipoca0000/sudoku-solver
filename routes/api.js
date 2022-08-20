'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      //console.log('testing post check req.body ', req.body);
      let puzzle = req.body.puzzle,
          coordinate = req.body.coordinate,
          value = req.body.value,
          re1 = /[a-i]/i,
          re2 = /[1-9]/,
          row = 0,
          col = 0;

      try {
        row = coordinate.slice(0,1);
        col = coordinate.slice(1);
      } catch {
        row = null;
        col = null;
      }

      //console.log('testing post check variables ', 'puzzle', puzzle, 'coordinate', coordinate, 'value', value, 'row', row, 'col', col);
      if (!puzzle || !coordinate || !value) {
        //console.log('testing post check req fields missing');
        res.json({error: 'Required field(s) missing'});
      } else if (!row || !col || !re1.test(row) || !re2.test(col) || col.length > 1) {
        //console.log('testing post check invalid coordinate');
        res.json({error: 'Invalid coordinate'});
      } else if (!re2.test(value) || value.length > 1) {
        //console.log('testing post check invalid value');
        res.json({error: 'Invalid value'});
      } else {
        //console.log('testing post check not catched by err handlers ', req.body);
        let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        row = row.toLowerCase();
        rows.forEach((v, i) => {
          if (v === row) row = i + 1;
        });
        //console.log('testing post check after validation ', row, col, value);

        let valRow = solver.checkRowPlacement(puzzle, row, col, value),
            valCol = solver.checkColPlacement(puzzle, row, col, value),
            valReg = solver.checkRegionPlacement(puzzle, row, col, value),
            valPuz = solver.validate(puzzle);
        //console.log('the final check ', valRow, valCol, valReg, valPuz);

        if (valPuz === 'not81') {
          res.json({error: 'Expected puzzle to be 81 characters long'});
        } else if (!valPuz) {
          res.json({error: 'Invalid characters in puzzle'});
        } else if (valPuz && valRow && valCol && valReg) {
          res.json({valid: true});
        } else {
          let conflicted = [];
          if (!valRow) conflicted.push('row');
          if (!valCol) conflicted.push('column');
          if (!valReg) conflicted.push('region');
          res.json({valid: false, conflict: conflicted});
        }
      }  

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;

      if (!puzzle) {
        res.json({error: 'Required field missing'});
      } else{
        let valid = solver.validate(puzzle);

        if (valid === 'not81') {
          res.json({error: 'Expected puzzle to be 81 characters long'})
        } else if (!valid) {
          res.json({error: 'Invalid characters in puzzle'});
        } else {
          let solution = solver.solve(puzzle);

          if (solution === 'Imposible') {
            res.json({error: 'Puzzle cannot be solved'});
          } else {
            //console.log('valid ', valid);
            //console.log('the server solution ', solution);
            res.json({solution: solution});
          }
          
        }
      }

    });
};
