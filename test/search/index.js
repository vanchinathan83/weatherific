'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('/search', function () {

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


    it('should return a 200 when searching for news', function (done) {
        request(mock)
            .get('/search/news/austin/tx')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                done(err);
            });
    });

    it('should return a 200 when searching for image', function (done) {
        request(mock)
            .get('/search/image/austin/tx')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                done(err);
            });
    });

    it('should return a 404 when url is invalid', function(done){
        request(mock)
            .get('/search/invalidurl')
            .expect(404)
            .end(function(err,res){
                done(err);
            });
    });

});