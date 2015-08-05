In this post I will describe the path that I followed to bootstrap my static harp blog template. Harp is a conventions based framework, which I think is great. You just have to know the conventions. :) So I'll explain the conventions as I go.

Begin by creating a [git repo on GitHub](https://github.com/josh-egan/harp-static-blog-template) and clone the repo to my machine.

Create a `harp.json` file at the root of the project. Harp, by convention, will look for a harp.json file at the root of the project. This file is not required, but we're going to want it. The harp.json file holds global variables. It will be read in by harp at the beginning of the compile process. In this file, paste the following to get started:

```json
{
  "globals": {
    "site_title": "SITE TITLE"
  }
}
```

Next, create a folder named `public`. Harp will look for a folder with the name of "public" for the source assets. The files in the public folder will get compiled by harp into the web pages. Inside of the `public` folder, create the following files:

```cmd
mkdir public
cd public
touch index.jade
touch _layout.jade
touch 404.jade
```

Harp comes with several built-in processors. Harp will look for an index file at the root of the public folder. Since it is a jade file, it will be compiled into an html file. The _layout.jade file will hold the base layout for the site. There are two conventions that are introduced at this point. First, any file that begins with an underscore will not be copied or compiled into the distribution folder. Second, harp will search for _layout files and will use them when processing the content files.

Let's throw some content in the `_layout.jade` file.
