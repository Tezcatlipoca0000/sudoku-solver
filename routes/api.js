'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log('testing post check req.body ', req.body);
      let puzzle = req.body.puzzle,
          coordinate = req.body.coordinate,
          value = req.body.value,
          re1 = /[a-i]/i,
          re2 = /[1-9]/,
          row = coordinate.match(re1),
          col = coordinate.match(re2);

      console.log('testing post check variables ', 'puzzle', puzzle, 'coordinate', coordinate, 'value', value, 'row', row, 'col', col);
      console.log('testing 2 veracity ', Boolean(coordinate), Boolean(value), Boolean(puzzle));
      if (!puzzle || !coordinate || !value) {
        console.log('testing post check req fields missing');
        res.json({error: 'Required field(s) missing'});
      } else if (!row || !col) {
        res.json({error: 'Invalid coordinate'});
      } else if (!re2.test(value)) {
        res.json({error: 'Invalid value'});
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
            console.log('valid ', valid);
            console.log('the server solution ', solution);
            res.json({solution: solution});
          }
          
        }
      }

    });
};
