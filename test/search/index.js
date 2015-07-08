'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('/search', function () {

    var app, mock;


    before(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd()
        }));

        mock = app.listen(1337);
    });


    after(function (done) {
        mock.close(done);
    });


    it('should return a 200 when searching for news', function (done) {
        request(mock)
            .get('/search/news/austin/tx')
            .expect('Content-Type', /html/)
            .expect(200,done);
    });

    it('should return a 200 when searching for image', function (done) {
        request(mock)
            .get('/search/image/austin/tx')
            .expect('Content-Type', /html/)
            .expect(200,done);
    });

    it('should return a 404 when url is invalid', function(done){
        request(mock)
            .get('/search/invalidurl')
            .expect(404,done);
    });

});