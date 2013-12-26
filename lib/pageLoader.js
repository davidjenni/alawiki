'use strict';

var marked = require('marked');
var fs = require('fs');
var path = require('path');

/**
 * @param {String} directory to find and compile markdown files from
 * @param {Object} options
 */
function PageLoader(pagesDirectory, options) {
  options = options || {};
  this.pagesDirectory = pagesDirectory;
}

/**
 * callback:
 * @param {Error} error or null
 * @param {Array} markdown files list
 */
PageLoader.prototype.getPageList = function (callback) {
  var baseDir = this.pagesDirectory;
  fs.readdir(baseDir, function (err, files) {
    if (err) {
      callback(err);
    }
    var pages = files.map(function (file) {
      return path.join(baseDir, file);
    }).filter(function (file) {
      return fs.statSync(file).isFile() && path.extname(file) === '.md';
    });
    callback(null, pages);
  });
};

/**
 * @param {String} requested page
 * @param {function} callback(errror, html)
 */
PageLoader.prototype.loadPageAsHtml = function (pageName, callback) {
  fs.readFile(this._getFullPath(pageName), { flag: 'r', encoding: 'utf8'}, function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    marked(data, function (err, content) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, content);
      }
    });
  });
};

PageLoader.prototype._getFullPath = function (pageName) {
  return path.join(this.pagesDirectory, pageName);
};

module.exports = PageLoader;

