var marked = require('marked');

module.exports = function (grunt) {

	var baseUrl = (grunt.option('baseUrl') || '').replace(/\/$/, '') + '/';
	var minifyAssets = grunt.option('minifyAssets');
	var scope = grunt.option('private') ? 'private' : 'public';

	var markdown = {
		gfm: true,
		smartypants: true,
		highlight: function(code) {
			return  require('highlight.js').highlightAuto(code).value;
		}
	};

	var privateProcess = function(contents) {
		return contents.replace(/[\r\n]<private>([\s\S]*?)<\/private>/gi, function(match, md) {
			return '<div class="private"><div class="private--vertical-bar"><span class="glyphicon glyphicon-lock"></span></div>' + marked(md, markdown) + '</div>';
		});
	};

	var publicProcess = function(contents) {
		return contents.replace(/[\r\n]<private>[\s\S]*?<\/private>/gi, '')
	};

	// configure the tasks
	var config = {

		clean: {
			build: { src: [ 'build/**/*' ] },
			'post-build': { src: [ 'build/api/raml/**' ] }
		},

		mkdir: {
			stylesheets: { options: { mode: 0770, create: [ 'build/css' ] } }
		},

		stylus: {
			build: {
				options: { linenos: false, compress: false },
				files: [ {
					expand: true,
					cwd: 'templates/css',
					src: [ '*.styl' ],
					dest: 'build/css',
					ext: '.css'
				} ]
			}
		},

		copy: {
			static: { files: [ {
					expand: true,
					cwd: 'static',
					src: [ '**/*' ],
					dest: 'build',
					filter: 'isFile'
				} ]
			},
			content: {
				files: [ {
					expand: true,
					cwd: 'src',
					src: [ '**/*.png', '**/*.jpg' ],
					dest: 'build',
					filter: 'isFile'
				} ]
			}
		},

		metalsmith: {
			build: {
				dest: 'build',
				src: 'src',
				options: {
					clean: false,
					metadata: {},
					plugins: {

						'lotaris-metalsmith-scoping': {
							scope: scope,
							marked: markdown,
							privateProcess: privateProcess,
							publicProcess: publicProcess
						},
						'metalsmith-collections': {
							sections: {
								pattern: '*/index.md',
								sortBy: 'menuIndex'
							},
							blogs: {
								pattern: 'blog/[0-9]*.md',
								sortBy: 'date'
							}
						},
						'metalsmith-markdown': markdown,
						'metalsmith-permalinks': {
							relative: false
						},
						'lotaris-metalsmith-links': {
							absolute: true,
							permalinks: true
						},
						'lotaris-metalsmith-sections': {
							name: 'subsections'
						},
						'lotaris-metalsmith-raml': {
							src: 'src',
							files: {
								'myApi': { src: 'api/raml/index.raml', dest: 'api/reference' }
							},
							section: 'api',
							scope: scope,
							template: {
								engine: 'jade',
								file: 'templates/raml/template.jade',
								params: {
									pretty: true
								},
								minifyAssets: minifyAssets
							},
							marked: markdown,
							privateProcess: privateProcess,
							publicProcess: publicProcess
						},
						'metalsmith-templates': {
							engine: 'jade',
							directory: 'templates',
							minifyAssets: minifyAssets
						}
					}
				}
			}
		},

		replace: {
			html: {
				src: [ 'build/**/*.html' ],
				overwrite: true,
				replacements: [ 
					{ from: /href="\//g, to: 'href="' + baseUrl }, 
					{ from: /src=\"\//g, to: 'src="' + baseUrl } 
				]
			},
			css: {
				src: [ 'build/**/*.css' ],
				overwrite: true,
				replacements: [ 
					{ from: /url\("\//g, to: 'url(\"' + baseUrl }, 
					{ from: /url\('\//g, to: 'url(\'' + baseUrl } 
				]
			},
			googleFonts: {
				src: [ 'build/**/*.html' ],
				overwrite: true,
				replacements: [ 
					{ from: /http:\/\/fonts\.googleapis\.com/g, to: "https://fonts.googleapis.com" } ]
			}
		},

		cssmin: {
			minify: {
				expand: false,
				cwd: '.',
				src: [ // list files separately to guarantee the correct order
					'build/css/bootstrap.css',
					'build/css/main.css',
					'build/css/app.css',
					'build/css/colors.css',
					'build/css/raml.css',
					'build/css/highlight.github.min.css'
				],
				dest: 'build/css/global.css',
				ext: '.css'
			}
		},

		uglify: {
			build: {
				options: { mangle: false, compress: false, beautify: false },
				files: [{
					expand: false,
					cwd: '.',
					src: [// list files separately to guarantee the correct order
						'build/js/jquery.min.js',
						'build/js/bootstrap.js',
						'build/js/smoothscroll.js',
						'build/js/app.js'
					],
					dest: 'build/js/global.js'
				}]
			}
		},

		watch: {
			documentation: {
				files: [ 'src/**/*.md', 'src/**/*.raml' ],
				tasks: [ 'metalsmith' ],
				options: {
					livereload: true
				}
			},
			stylesheets: {
				files: [ 'templates/css/**' ],
				tasks: [ 'build-stylesheets' ],
				options: {
					livereload: true
				}
			},
			templates: {
				files: [ 'templates/**/*.jade' ],
				tasks: [ 'metalsmith' ],
				options: {
					livereload: true
				}
			},
			static: {
				files: [ 'static/**/*' ],
				tasks: [ 'copy:static' ],
				options: {
					livereload: true
				}
			}
		},

		'http-server': {
			'dev': {
				root: './build',
				port: 7000,
				host: "127.0.0.1",
				showDir: true,
				autoIndex: true,
				defaultExt: "html",
				runInBackground: true
			},
			'standalone': {
				root: './build',
				port: 7000,
				host: "127.0.0.1",
				showDir: true,
				autoIndex: true,
				defaultExt: "html",
				runInBackground: false
			}
		}

	};

	grunt.config.init(config);

	// load the tasks
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-metalsmith');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask(
		'build-stylesheets',
		'Compiles stylesheets.',
		[ 'mkdir:stylesheets', 'stylus', 'copy:static' ]
	);

	grunt.registerTask(
		'build',
		'Compiles everything.',
		[ 'clean:build', 'build-stylesheets', 'metalsmith', 'copy:content', 'clean:post-build' ]
	);

	grunt.registerTask(
		'prod',
		'Be sure the result of the genereated sources is ready for production',
		['build', 'replace:html', 'replace:css', 'replace:googleFonts', 'uglify', 'cssmin']
	);

	grunt.registerTask(
		'dev',
		'Starts HTTP server and watches src folder for changes.',
		[ 'prod', 'http-server:dev', 'watch' ]
	);

	grunt.registerTask(
		'serve',
		'Starts HTTP server',
		[ 'http-server:standalone' ]
	);

};
