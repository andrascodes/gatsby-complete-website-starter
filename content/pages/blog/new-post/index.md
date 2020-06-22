---
title: New Post
published: true
author: andrew0szucs@gmail.com
subtitle: Subtitle of New Post
date: 2020-06-15T21:54:01.436Z
template: post
---
Check out our other post: [Using Remark](/blog/using-remark/)

Hello, world! This is a demo post for `gatsby-theme-novela`. Novela is built by the team at [Narative](https://narative.co), and built for everyone that loves the web.

In my experience, the challenges that growing companies struggle with rarely stem from a lack of good ideas. Good ideas are everywhere. In my experience, the challenges that growing companies struggle with rarely stem from a lack of good ideas. Good ideas are everywhere. In my experience, the challenges that growing companies struggle with rarely stem from a lack of good ideas. Good ideas are everywhere.

But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves? Do they have the resources necessary to execute on their ideas? Or are they constantly under pressure to pluck only the lowest-hanging fruit through bare minimum means, while putting their greatest ambitions on the back-burner?

<rich-image position="float-right"><img src="small.jpg" alt="man writing on a paper" /><figcaption><p>An image that is floating right</p></figcaption></rich-image>

These are the circumstances that suffocate creativity and destroy value in an organization. That’s why I knew that if I was going to start a company, our first product would have to be the company itself.

But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves?

<blockquote><p>There is also the ability to define <strong>blockquotes</strong> that look like this and can span multiple lines</p></blockquote>

But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves?

<rich-image position="float-left"><img src="medium.jpg" alt="two people having a conversation" /><figcaption><p>Image floating to the left</p></figcaption></rich-image>

But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves? But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves? But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves? But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves?

<rich-image position="wide"><img src="large.jpg" alt="man walking into the room" /><figcaption><p>Wide image</p></figcaption></rich-image>

But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves?

## This is a secondary heading

But it takes more than good ideas to build and grow a business. It takes people to bring them into reality. Are those people collaborating and sharing their expertise, or are they in conflict and keeping it to themselves?

At Narative, we’ve been fans of Gatsby from day one, using it to build performant and flexible products for both clients and ourselves. With the growing community interest in Gatsby, we hope to create more resources that make it easier for anyone to grasp the power of this incredible tool.

One of the challenges I had when learning Gatsby was trying to understand the Gatsby lifecycle. React introduced me to the concept of a Component Lifecycle, but when I started learning Gatsby I felt at a loss again. I remember looking through example repositories and seeing Gatsby specific files in every project and thinking to myself, “What are these files for? Why are gatsby-node.js, gatsby-browser.js, and gatsby-ssr.js generated in the default starter kit? Can I really delete these files?”

## How does Gatsby work?

To understand what these files are for, we must first understand how Gatsby works. Gatsby is a static site generator that pulls data from sources you provide and generates a website/app for you.

<pullquote><p>Gatsby requires Node to be installed to run the Bootstrap and Build sequences. <strong>Under the hood,</strong> Gatsby uses Webpack to build and start a development server amongst other things.</p></pullquote>

### Step 1

During the Bootstrap sequence, which occurs every time you run $ gatsby develop, there are about 20 events that fire ranging from validating your gatsby-config.js to building the data schemas and pages for your site. For example, the Bootstrap sequence is where Gatsby will create pages. If you want an in depth look of all 20 Bootstrap steps Swyx shared a fantastic Gist that goes into more detail.

### Step 2

The Build sequence is very similar to the Bootstrap sequence, except it’s run with production optimizations and will output static files ready for deployment. Think of it as building your React application in production mode vs development.

### Step 3

And finally, once the generated files are deployed, Gatsby lives in the browser. Gatsby cleverly generates a static website that turns into a web app after initial load, which extends the lifecycle to the browser.

What’s important to remember is that Gatsby’s lifecycle can be aggregated into 3 main sequences:

* Bootstrap
* Build
* Browser
* These three sequences makeup the Gatsby lifecycle.

<divider type="dotted"></divider>

## What are the Gatsby specific files for?

gatsby-config.js A place to put all your site configurations such as plugins, metadata, and polyfills. This file is the blueprint of your application and is where Gatsby really shines with its plugin system. When you run $ gatsby develop or $ gatsby build gatsby-config.js is the first file to be read and validated.

Most of your time spent in gatsby-config.js will likely revolve around source plugins, image plugins, offline support, styling options, and site metadata.

### gatsby-node.js

Gatsby runs a Node process when you develop or build your website and uses Webpack under the hood to spin up a development server with hot reloading. During the Node process Gatsby will load plugins, check the cache, bootstrap the website, build the data schema, create pages, and deal with some configuration and data management.

Everything that occurs during the Bootstrap and Build sequences occurs in gatsby-node.js. This means it’s the perfect place to create pages dynamically based off data from a source plugin or modify Gatsby’s Webpack or Babel configs.

For example, if you want to move some files manually, such as a Netlify _redirects file, a good place to do it is in your gatsby-node.js file at the onPostBuild lifecycle hook.

From experience, most of my time has revolved around handling data and building pages in gatsby-node.js. This file quickly becomes the piping of your entire website.

### Examples of gatsby-node.js hooks:

* createPages
* onCreateBabelConfig
* onCreateWebpackConfig
* onPostBuild
* gatsby-ssr.js

When you think Server Side Rendering you think of a server that takes in requests and dynamically builds pages and sends it to the client. Gatsby doesn’t do that, but it does server side render — it generates all the pages during build time.

Naturally, gatsby-ssr.js allows developers to hook into that lifecycle. In my experience, most use cases revolve around injecting CSS, HTML, or Redux state information into the generated output. For example, if you need to insert third party scripts such as Analytics Tracking or a Pixel it can be done on the onRenderBody gatsby-ssr.js hook.

### Examples of gatsby-ssr.js hooks:

* onPreRenderHTML
* onRenderBody
* replaceRenderer
* gatsby-browser.js

Gatsby is a static site that loads a dynamic application after initial load, which means you get the benefits of a static site in a web application. gatsby-browser.js provides convenient hooks to deal with app loading, route updates, service worker updates, scroll positioning, and more.

Everything that occurs after your static site has loaded can be hooked in gatsby-browser.js. For apps that I’ve built, gatsby-browser.js was mostly used for keeping track of routes, scroll positioning, and sending analytics events.

### Examples of gatsby-browser.js hooks:

* onClientEntry
* onRouteUpdate
* onServiceWorkerInstalled
* registerServiceWorker
* shouldUpdateScroll

## Conclusion

Gatsby is built with React at its core and shares a common API pattern, the lifecycle. This lifecycle gives developers access to key moments in their website’s process through specific hooks. For example, adding analytics can be achieved through the Browser lifecycle hook onClientEntry. Gatsby reserves specific filenames as an entry point to access every lifecycle; these files are named gatsby-node.js, gatsby-ssr.js and gatsby-browser.js.

Without the Gatsby lifecycle, it would be impossible to customize and modify your project beyond the base configuration, leaving developers with a rigid and poor developer experience. This power and flexibility has helped us build amazing web projects for clients like Hopper!

Gatsby is a staple within our engineering process at Narative, helping us help our clients build the products they’ve always dreamed of, and the ones they’re yet to dream up.