---
title: Introduction
sectionName: HOWTO
template: layout.jade
menuIndex: 100
subsectionIndex: 1
private: true
---

These pages serve as additional documentation to the GitHub repository. You'll
find information how to setup and leverage this project seed for your own 
project.

We assume that you've already read through the README at the 
[GitHub page](https://github.com/lotaris/apidoc-seed) how to get a first build
going.


### Tools

 - You can use any text editor to work with markdown and RAML files. 
   [Sublime Text][sublime] has packages for RAML syntax highlighting (as well 
   as for [Jade][jade], [Stylus][stylus] and [Markdown][md] which makes it 
   very convenient.
 - When running in dev mode (`grunt dev`), [Livereload][lr] is enabled which 
   will automatically refresh your page after editing your files if you install
   the Livereload browser extension.

[sublime]: http://www.sublimetext.com/
[md]: http://daringfireball.net/projects/markdown/syntax
[jade]: http://jade-lang.com/
[stylus]: http://learnboost.github.io/stylus/
[lr]: http://livereload.com/


### File Structure

These are the main folders:

 - `src` is the root of the documentation sources. Each folder here represents 
   a section of the site.
 - `templates` contains the Jade templates as well as the Stylus files used on
   client side.
 - `static` contains everything that is just copied over, such as images, 
   scripts or static stylesheets.
 - `build` is the destination folder of the build. This is the root folder of
   the generated site.


### Sources

The site is divided in sections and subsections. For now, the sections are:
 
 - **API Reference** - The API reference. This contains generic articles about 
   how the API works, as well as a generated documentation from the RAML files.
 - **Blog** - Various articles such as release notes, success stories, 
   technical hints, etc.
 - **Support** - FAQ and contact form (server-side not implemented)
