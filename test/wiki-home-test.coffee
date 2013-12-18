request = require 'supertest'
app = require '../'

describe 'wiki home', ->
    describe 'GET / (main page)', ->
        it 'should respond with html page', (done) ->
            request(app)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200, done)

    describe 'GET /random', ->
        it 'should respond with 404', (done) ->
            request(app)
                .get('/random')
                .expect(404, done)

