# apidoc-seed

*A boilerplate project for quickly getting your RAML documentation published.*

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


## Private Content

It's possible to mark parts of your content as *private* which results being
discarded depending on how you compile the documentation. For more
information, see [Private Content](src/howto/private-content.md)


## Documentation

This boilerplate project documents itself. Checkout the [Live Site](https://lotaris.github.com/apidoc-seed)


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