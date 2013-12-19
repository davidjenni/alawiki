'use strict';

exports.main = function (req, res) {
  res.render('main', {
    title : 'ala.wiki',
    wikiContent : '<p><b>wiki</b> content</p>',
    subTitle: 'sample content'
  });
};

