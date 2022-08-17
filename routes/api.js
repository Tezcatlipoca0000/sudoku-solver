'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

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
