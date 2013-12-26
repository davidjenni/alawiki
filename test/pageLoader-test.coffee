PageLoader = require '../lib/pageLoader'
pageLoader = new PageLoader(__dirname + '/pageLoader')


describe 'pageLoader', ->
    describe 'getPageList', ->
      it 'should find 2 md files', (done) ->
        pageLoader.getPageList (err, pages) ->
          expect(pages).not.to.be.null
          expect(pages).to.have.length(2)
          done()

    describe '#loadPageAsHtml', ->
      it 'should return error if page not found', (done) ->
        pageLoader.loadPageAsHtml 'unknown page', (err, content) ->
          expect(err).to.exist
          done()

      it 'should return rendered html', (done) ->
        pageLoader.loadPageAsHtml 'foo.md', (err, content) ->
          expect(err).to.not.exist
          expect(content).to.exist
          expect(content).to.match(/\<h2 id=/)
          expect(content).to.match(/<code>some code<\/code>/)
          done()


