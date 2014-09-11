---
title: Private Content
template: layout.jade
subsectionIndex: 5
private: true
---

## Summary
 
You might have internal or classified parts in your documentation that you
don't want to publish. For this reason, you can tag resources, methods, pages
and parts of a page or description as *private*.

When compiling the documentation, you can indicate if you wish to include
private blocks as well. If you do so, it will be included and marked as such 
with a small "lock" icon. This allows you to maintain all your documentation 
in a single set of source files while being able to produce multiple builds 
public and internal usage.

When compiling the documentation, the options are:

```
# build the public site (remove private content)
> grunt dev

# build the private site
> grunt dev --private=true

```

Private content can be added at different levels:

  - As an [entire page](#private-page)
  - As a [block within a page](#private-block-within-a-page)
  - In an [API resource](#private-api-resource)


## Private Page

To make a whole page private, add `private: true` to the front-matter of the
page:

```markdown
---
title: My Private Page
private: true
---

Private content here...
```

When building the private site, a little "lock" icon shows up besides the menu
pointing to that page and it will be completely discarded for the public site.


## Private Block Within a Page

To add some private content within a public page, just enclose your content 
in `<private>` tags as follows:

	Some public content here

	<private>
	Some private content here ...
	You can also use **Markdown** here.
	</private>

	Moving along...

This will generate a private frame inlined in your documentation (and will 
not appear in the public documentation nor in the source code of the page).

Note that:

  - The `<private>` element needs to be at the beginning of a new line in
    order to be correctly recognized. This behavior makes it possible re-use
    it in a different context without being scraped (like in this 
    documentation)
  - You can also use the `<private>` element in the markdown file of the RAML 
    documentation (to add private notes to resources descriptions)


## Private API Resource

It's equally possible to tag a resource or method in your RAML documentation
as private. This can be achieved by using the `private` trait. Resources and 
methods that are marked private won't show up in the public site and are
tagged with a small "lock" icon.

```yaml
/applications
  is: [private]
  ...

/orders
  ...
  patch:
    is: [private]
    ...
```

## References

For the static content, the [metalsmith-scoping](scoping) plugin is used.
Check out the documentation if you want to customize the way private blocks 
are rendered.

[scoping]: https://github.com/lotaris/metalsmith-scoping