# Font tester - Fonts made easy (chrome extension)


<p><img src="./public/logos/logox500.png" alt="font tester logo" width="100" height="100"></p>

Finding it difficult to choose the right font? 
Now test 1000+ free google font types on your website.

Font's adds personality to your website, a sans font on a page gives a different impression
of the page than a mono font. But picking the right one can be hard and time consuming. This is
one of the reason I created Font Tester. 

Now you can go to your website, click on the extension, test fonts and pick the one you like along with the code.

## Whom is the meant for?
* Frontend developers.
* Website Designers.
* Landing page designers.
* Solo SaaS developers.
* Freelancers and businesses
* People who want to learn how to create chrome extension with ReactJs.

## How to use Font Tester?
1. Go to chrome extensions and download: 
2. Now pin the extension from the puzzle extension icon, located at the top right.
3. Click on the extension, wait few seconds for it to load on your website.
4. Now highlight a text.
5. Select a font.
6. Copy the code and use it. Yes, that's it

## Features of Font Tester
✅ Test 1000+ google fonts <br>
✅ Move the modal around the webpage. <br>
✅ Set italics, underline, weights, line height <br>
✅ Set font size (coming soon...)<br>
🔥 More on [Roadmap](roadmap.md)

## License / support

Though the extension is free to use forever, there is an optional license you can buy to support open-source development. This will provide me with funds to develop upcoming tool for Python developers.

Pluse you get more advanced features, early access, Upcoming Edge/Firefox addons.



---
Other ways to support open-source

* Order a [custom work](https://tally.so/r/woO0Kx).
* Order a premium SaaS [Landing page template](https://foxcraft.gumroad.com/l/ai-saas-landingpage/saasboost)

### Follow for updates and open-source

* [Twitter](https://twitter.com)
* [Github](https://github.com/PaulleDemon)


### Tech stack
* Reactjs
* Tailwind css

### Contributing

The `manifest.json` required for extension is located inside the public folder.

To load the extension locally. Go to extension -> Load unpacked -> point to dist folder (the build folder).

For development use
```
npm run build:dev
```
This is because the extension requires to point to the build folder, using this command you
won't have to rebuild on every save.

For development you can also use 
`npm start`, but you won't be able to load it as extension but as a react app.