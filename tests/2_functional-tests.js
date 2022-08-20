const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .type('form')
            .send({puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'})
            .end(function(err, res) {
                assert.isNull(err, 'error to post is null');
                assert.equal(res.status, 200, 'res status is 200');
                assert.isString(res.body.solution, 'solution is a string');
                assert.notInclude(res.body.solution, '.', 'solution does not include "." dots');
                assert.lengthOf(res.body.solution, 81, 'solution has length of 81');
                assert.equal(res.body.solution, '827549163531672894649831527496157382218396475753284916962415738185763249374928651', 'solution is equal to expected');
                done();
            });
    });

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .end(function(err, res) {
                assert.isNull(err, 'error to post is null');
                assert.equal(res.status, 200, 'res status is 200');
                assert.equal(res.body.error, 'Required field missing', 'res is "Required field missing"');
                done();
            });
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .type('form')
            .send({puzzle: 'invalid1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'})
            .end(function(err, res) {
                assert.isNull(err, 'error to post is null');
                assert.equal(res.status, 200, 'res status is 200');
                assert.equal(res.body.error, 'Invalid characters in puzzle', 'response is "Invalid characters in puzzle"');
                done();
            });
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .type('form')
            .send({puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...'})
            .end(function(err, res) {
                assert.isNull(err, 'error to post is null');
                assert.equal(res.status, 200, 'res status is 200');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'response is "Expected puzzle to be 81 characters long"');
                done();
            });
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
        chai
            .request(server)
            .post('/api/solve')
            .type('form')
            .send({puzzle: '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'})
            .end(function(err, res) {
                assert.isNull(err, 'error to post is null');
                assert.equal(res.status, 200, 'res status is 200');
                assert.equal(res.body.error, 'Puzzle cannot be solved', 'response is "Puzzle cannot be solved"');
                done();
            });
    });

});

