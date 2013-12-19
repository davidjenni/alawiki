'use strict';

module.exports = {
  home : function (req, res) {
    res.render('home', {
      title : 'ala.wiki',
      wikiContent : '<p><b>wiki</b> content</p>',
      subTitle: 'sample content'
    });
  }
};
