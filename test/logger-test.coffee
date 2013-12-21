tmp = require 'tmp'
config = {}


describe 'Logger', ->
    beforeEach (done) ->
        @logger = require '../lib/utils/logger'
        tmpDirOpts =
            prefix: 'tmpLoggerTest'
            unsafeCleanup: true

        tmp.setGracefulCleanup()
        tmp.dir tmpDirOpts, (err, path) ->
            if (err)
                throw err
            @tstAppDir = path

            config =
                appDirectory:  @tstAppDir
                logger:
                    logFile: 'logs/init.log'
                    expressFile: 'logs/init-express.log'

            done()

    after (done) ->
        @logger.finish()
        done()

    describe '#init', ->
        it 'throws with missing appDirectory', (done) ->
            thisLogger = @logger
            expect( ->
                thisLogger.init {}
            ).to.throw(/appDirectory/)
            done()

        it 'can create log directory if not present', ->
            @logger.init config

    describe '#log', ->
        it 'without meta', ->
            @logger.log 'info', 'a info message'

        it 'with meta', ->
            @logger.log 'info', 'a info message', { foo: "abc" }

