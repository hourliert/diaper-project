# react-boilerplate
Yet Another React Boilerplate.

## Getting started
```
npm install
npm start
```

## Why creating another seed?
### Once upon a time...
I started to learn React one week ago. I have a strong background in front-end development and made several apps (currently in production) with *Angular.js* and *Polymer*.

I was pretty optimistic at the beginning. After learning Polymer 3 month ago very easily (Thanks to the awesome doc and the starter kit), I believed that learning React would be as easy. But wait...

I found that React is as understandable as Polymer. Awesome, so what's the problem? The tooling around it is pretty awful.

In Polymer, the [starter kit][3] is **straightforward**. Moreover, if you have knowledge in gulp, you can understand and appropriate it in few minutes.
I am aware that its simplicity is not only due to good tools. Another major factor is that there are no server rendering.

For me as a TOTAL beginner in React and all the stuff that goes with it (server rendering, flux, etc.). I found the [starter kit][2] really **foggy**.
* You don't know where your app start
* You don't understand why there are an `api` folder
* How to debug since the server renders the front-end?
* Why gulp is missing?
* Etc.

I guess you get it, I believe that the RSK is too complicated. And since the react documentation is very weak, it is very hard to start learning react with this colossal starter kit.

### The seed
This project is as simple as possible. It only shows a counter (the same that [the redux example][1]) and 2 pages to show off the router.
However, this boilerplate is solid and could perfectly work in production.
I have tried to document every file to help you to understand and put links in comments to guide you to related content.

## Tasks
First, little explanation on why **gulp** is missing from this boilerplate.
**gulp** is an awesome tool that help you to run tasks related to the project (eg. clean the build folder, build the project, serve the project, etc.) It has a tons of good plugins that handle everything for you. You just have to play *Lego* with all these plugins and you're project is building perfectly.
In our case, we are using **webpack** which handle almost everything for us (css compilation, js compilation, building). That means that gulp would have almost no role. It would be useful to coordinate the few dependents tasks but that's it.
I have chose to follow the choice of the RSK creator and to not include gulp in the seed.

Therefore, I have borrowed some [tools][4] from the RSK and basically simplified them.

The boilerplate is shipped with:

* `npm run lint`: run javascript linters on the code. The linters used are **JSCS** and **eslint**
* `npm run csslint`: run css linter on the code. The linter used is **csscomb**
* `npm run csscomb`: run **csscomb** on the code.
* `npm run test`: run the tests written with **Jest**
* `npm run clean`: remove the build folder
* `npm run copy`: copy assets into the build folder
* `npm run build`: build the app
* `npm run serve`: build and serve the app without **browser-sync**
* `npm start`: build, serve the app with **browser-sync**

## Testing
I have chose to include **Jest** in the project rather than **Mocha**. I am a big fan of **Mocha** and use it in almost all my projects.
The reason why I have chose **Jest** is just for 'trying' purpose.

Finally, the `npm run test` task could receive arguments. So you could run Jest in watch mode by running `npm run test -- watch`. Good point for TDD.

## Understand the seed
It's time to get in the code.
* To understand the tooling process, open the file `tools/start.js`.
* To understand the boilerplate, open the file `src/server.js`.


[1]: https://github.com/rackt/redux/tree/master/examples/counter
[2]: https://github.com/kriasoft/react-starter-kit
[3]: https://github.com/PolymerElements/polymer-starter-kit
[4]: https://github.com/kriasoft/react-starter-kit/tree/master/tools
