---
title: Add a new Page
template: layout.jade
subsectionIndex: 2
private: true
---
 
Pages are written in [Markdown][md]. Page have a so-called "front matter" header which contains a bunch of key-value parameters:

	---
	title: Example
	description: This is actually the front-matter
	---
	Markdown content starts here.

 
Pages are located under the `src` folder. Each folder has an `index.md` page,
subfolders represent the sections of the site.


### Adding a main section

To add a new main section, all you have to do is:

 - Create a new folder under `src`
 - Create an `index.md`
 - Put a `sectionName` parameter in its front-matter (used for the menu link)
 - Put a `menuIndex` parameter in its front-matter (used for the position in
   the menu)
 - Write some content


### Adding a subsection

To add a new subsection page, all you have to do is:

 - Create a new page under the relevant section folder
 - Put a `subsectionIndex` parameter in its front-matter (used for the position
   in the submenu)
 - Put a title parameter in its front-matter (used for the submenu link)
 - Write some content

Notice that if you omit to specify the `subsectionIndex` parameter in the 
front-matter, the page will exist but will not appear in the submenu. Also 
notice that a page can be both in the menu and in the submenu, all it takes is 
to give a `subsectionIndex` parameter to a section index page.
   

### Linking to the API reference

From a page, you can link to the RAML-generated documentation using a custom 
schema:

	api://{api-name}/{http-verb}/{resource-path}

For example if you wanted to link to the product retrieval resource, you'd use the normal Markdown syntax with the link:

	api://myApi/get/products

The path corresponds to the root node in your RAML file. If you have sub 
resources, use the same placeholder as in the RAML file:

	api://myApi/get/applications/{applicationId}

Note that `{api-name}` is the name of the file block in the
[metalsmith-raml][metalsmith-raml] configuration, which you can edit in the
project's [Gruntfile][gh-gruntfile].


[md]: http://daringfireball.net/projects/markdown/syntax
[gh-gruntfile]: https://github.com/lotaris/apidoc-seed/blob/master/Gruntfile.js
[metalsmith-raml]: https://github.com/lotaris/metalsmith-raml#files