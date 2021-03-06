'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('/weather', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd()
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should return a 200', function (done) {
        request(mock)
            .get('/weather')
            .expect('Content-Type', /html/)
            .expect(200,done);
    });

    it('should return a 404 when url is invalid', function(done){
        request(mock)
            .get('/invalidurl')
            .expect(404,done);
    });

});