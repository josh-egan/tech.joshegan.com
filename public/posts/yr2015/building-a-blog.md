Well, I've been wanting to get a blog up and running for quite a while now, and here it is. You're reading it. <i class="fa fa-smile-o"></i>

Writing helps me to internalize and remember, so I expect that this blog will help me in that area. I also hope that a few of you out there will find one of my blog posts as helpful as I have found so many of your blog posts.

When I set out to build this blog, I had a couple of requirements in mind.
- I wanted to host the blog for free, if possible.
- I wanted to have complete flexibility with the languages, tools, layout, and style.

As I looked around for hosting, I found several places where I could have a few free servers, such as [heroku](https://www.heroku.com/) and [aws](http://aws.amazon.com/). But I didn't want to be a second class citizen and I didn't want my free trial to eventually run out.

Enter GitHub Pages. I stumbled across [GitHub Pages](https://pages.github.com/) a while ago, and it seemed like this might be the perfect solution for accomplishing my goal of achieving free hosting. And it has worked great so far. This site is proudly hosted using GitHub Pages from [my repo for this blog](https://github.com/josh-egan/tech.joshegan.com/tree/master).

In order to host my blog using GitHub Pages, the blog would have to be a static site. I wanted to  keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), so I started looking for static site generators. Finding the right search terms to find what I was looking for proved to be a challenge, and after several hours of searching I had found several engines and frameworks, but none that could accomplish what I wanted.

So my first blogging solution was to [roll my own](https://github.com/josh-egan/tech.joshegan.com/tree/5ca6ca4f0f344fe16eb03c372b795cfea40e7214). Powered by a [gulpfile](http://gulpjs.com/), it compiled my files to produce a static site. It was still a bit ugly, but it worked great. But as I kept coming up with new ideas for what I wanted my blog to be able to do, I realized there was still a lot of code to write. So I started searching again.

The scales finally tipped. I found an awesome site called [StaticGen](https://www.staticgen.com/). StaticGen is a static site itself, which provides a list of static site generators. After looking through the examples and docs of half a dozen or more of the static site generators, I settled in on [harp](http://harpjs.com/). Harp is a very opinionated framework that uses conventions and requires very little configuration. It also allows very little configuration, which has been a bit of pain point for me in a couple of places, but overall I've been quite happy with what it has offered. If you're looking for a blogging solution, I highly recommend checking out StaticGen. One notable mention that I also explored that is not currently listed on StaticGen is [ghost](https://ghost.org/).

If you plan to build a blog using harp, I intend to write a few more posts about my experience getting going with harp, so stay tuned.
