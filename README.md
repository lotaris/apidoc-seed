# apidoc-seed

*A boilerplate project for quickly getting your RAML documentation published.*

### [Live Site](https://lotaris.github.com/apidoc-seed)

This is a generator that compiles [Markdown][md] and [RAML][raml] files into a
static site. The following [Node.js][node] stack is used:

 - Build tasks using [Grunt][grunt]
 - Content assembling with [Metalsmith][metalsmith]
 - Templating using [Jade][jade]
 - CSS-preprocessing with [Stylus][stylus]
 - Basic styling using [Twitter Bootstrap][bootstrap]

Note that apart from Markdown support within the RAML spec it also supports 
plain `.md` files that are compiled independently from the API documentation.


## Quickstart

### Prerequisites

  - Make sure [Node.js][node] is installed and in your `PATH`
  - Install Grunt: `npm install -g grunt-cli`


### Installation

  1. Clone the repo: `git clone https://github.com/lotaris/apidoc-seed.git`
  2. Open the folder: `cd apidoc-seed`
  3. Install dependencies: `npm install`
  4. Run the dev server: `grunt dev --private=true`
  5. Open a browser at [`http://localhost:7000/`](http://localhost:7000/)


## Documentation

This boilerplate project documents itself. Checkout the HOWTO section at the
[Live Site](https://lotaris.github.com/apidoc-seed).


## Build Options

If you're building for production, there are a few more options you can speficy
when compiling the documentation.

### Private vs. Public

It's possible to mark parts of your content as *private* which results being
discarded depending on how you compile the documentation. In order to build in
private mode (like the live site), use `--private=true` when building. For 
more information, see [Private Content][doc-private].

### Production Builds

In production you might want to have your Javascript and CSS minified and 
concatenated. Also your final documentation site might be sitting in a 
different context root of your web server.

In order to build for production with assets minified, run

	grunt prod --minifyAssets=true

If you're building for a different context root, run

	grunt prod --minifyAssets=true --baseUrl=/foobar

### Other Goals

There are a few more Grunt tasks that can make your life easier:

 - `grunt build` builds the site and exits. Assets are not minifed.
 - `grunt serve` launches a local webserver and serves a previously built site
   at [`http://localhost:7000/`](http://localhost:7000/).

## Credits

To [Kevin Renskers](https://github.com/kevinrenskers) for his excellent
[raml2html](https://github.com/kevinrenskers/raml2html). Although this project
doesn't make use of raml2html directly, the included HTML template for the 
compiled documentation is derived from it.


## License

MIT, see [LICENSE](LICENSE).


[node]: http://nodejs.org/
[md]: http://daringfireball.net/projects/markdown/syntax
[raml]: http://raml.org/
[grunt]: http://gruntjs.com/
[metalsmith]: http://www.metalsmith.io/
[jade]: http://jade-lang.com/
[stylus]: http://learnboost.github.io/stylus/
[bootstrap]: http://getbootstrap.com/
[doc-private]: http://lotaris.github.io/apidoc-seed/howto/private-content/