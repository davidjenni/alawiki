"use strict";

module.exports = {
  home : function (req, res) {
    res.render('home', { title : 'CBT build guide'});
  }
};
