const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {

    test('Logic handles a valid puzzle string of 81 characters', function() {
        let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        solver = new Solver();

        assert.isTrue(solver.validate(puzzle), 'validate function returns true at a valid input');
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function() {
        let puzzle ='invalid84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        solver = new Solver();

        assert.isFalse(solver.validate(puzzle), 'validate function returns false at an invalid input');
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function() {
        let puzzle ='invalid1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        solver = new Solver();

        assert.equal(solver.validate(puzzle), 'not81', 'validate function returns equals to "not81"');
    });

    test('Logic handles a valid row placement', function() {
        let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
            row = 1,
            col = 1,
            val = 1;
        solver = new Solver(); 

        assert.isTrue(solver.checkRowPlacement(puzzle, row, col, val), 'check row function returns true at a valid row placement');
    });

    test('Logic handles an invalid row placement', function() {
        let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
            row = 0,
            col = 1,
            val = 1;
        solver = new Solver(); 

        assert.isFalse(solver.checkRowPlacement(puzzle, row, col, val), 'check row function returns false at an invalid row placement');
    });

    test('Logic handles a valid column placement', function() {
        let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
            row = 1,
            col = 1,
            val = 1;
        solver = new Solver(); 

        assert.isTrue(solver.checkColPlacement(puzzle, row, col, val), 'check col function returns true at a valid col placement');
    });

    test('Logic handles an invalid column placement', function() {
        let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
            row = 1,
            col = 10,
            val = 1;
        solver = new Solver(); 

        assert.isFalse(solver.checkColPlacement(puzzle, row, col, val), 'check col function returns false at an invalid col placement');
    });

    test('Logic handles a valid region (3x3 grid) placement', function() {
        
    });

});
