request = require 'supertest'
app = require '../'

describe 'wiki home', ->
    describe 'GET / (main page)', ->
        it 'should respond with main landing html page', (done) ->
            request(app)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(/CBT/)
                .expect(200, done)

        it 'should have compiled style.css (from Stylus)', (done) ->
            request(app)
                .get('/stylesheets/style.css')
                .expect('Content-Type', /text\/css/)
                .expect(200, done)

    describe 'GET /random', ->
        it 'should respond with 404', (done) ->
            request(app)
                .get('/random')
                .expect(404, done)

