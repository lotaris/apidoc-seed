var
	_ = require('underscore'),
	s = require('underscore.string'),
	highlightLib = require('highlight.js'),
	marked = require('marked');

function highlight(code) {
	return code ? highlightLib.highlightAuto('' + code).value : '';
}

var markedConfig = {
	gfm: true,
	smartypants: true,
	highlight: highlight
};

marked.setOptions(markedConfig);

module.exports = {
	marked: markedConfig,
	helpers: {
		highlight: highlight,
		marked: function(content) {
			return content ? marked('' + content) : '';
		},
		isShortable: function(content) {
			return content && content.indexOf('.') > 0 && content.substr(content.indexOf('.') + 1).length > 0;
		},
		shorten: function(content) {
			if (content && content.indexOf('.') > 0) {
				var substr = content.substr(content.indexOf('.') + 1);

				if (substr.length > 0) {
					return content.substr(0, content.indexOf('.')) + '...';
				}
			}

			return content;
		},
		contentLessShorten: function(content) {
			if (content && content.indexOf('.')) {
				return content.substr(content.indexOf('.') + 1);
			}
			else {
				return content;
			}
		}
	}
};