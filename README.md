Applause
========

Applause is a like button that's really simple to set up. It's designed for static sites - no backend required (we take care of that.) You should probably look at the [demo](http://jacksondc.com/applause) before reading any further.

##What is it exactly?
It's kind of like Facebook's like button or Medium's recommend button, but anonymous. Or like Svbtle's [Kudos button](http://dcurt.is/unkudo), without the infuriatingly unintuitive part.

##Installation
1. Add `<div id="applause"></div>` where you want the button
2. Add `<script src="http://applause.jacksondc.com/script.js"></script>` after your body
3. Done!

##Customization
Add a `color` parameters to the script URL to change the outline and background:

```
<script src="http://applause.jacksondc.com/script.js?color=C01025"></script>
```

By default, Applause loads Open Sans for the button. To disable font loading (and inherit a font), use:

```
<script src="http://applause.jacksondc.com/script.js?font=false"></script>
```

Applause aggressively resets your styles with [Cleanslate](https://github.com/premasagar/cleanslate), so if you want to modify things further, you'll have to overrride the CSS (look in /public/embed-raw.css for some clues.)

##Server
A few details: the server is built in Meteor and hosted on Heroku. It counts Applause based on URL, so if you have multiple URLs showing the same content (e.g. an index with links to article pages) you'll only be able to put the button on one of the pages. It also only allows one vote per IP, which is probably good-enough system considering that you can cheat and show whatever number you want anyway.
