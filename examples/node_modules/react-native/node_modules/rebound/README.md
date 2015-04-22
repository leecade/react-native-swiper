[![Build
Status](https://travis-ci.org/facebook/rebound-js.svg?branch=master)](https://travis-ci.org/facebook/rebound-js)

###REBOUND

Rebound is a simple library that models Spring dynamics for the purpose of
driving physical animations.

###ORIGIN

Rebound was originally written in Java to provide a lightweight physics system
for Facebook Home and Chat Heads on Android. It’s now been adopted by several
other Android applications. This JavaScript port was written to provide a quick
way to demonstrate Rebound animations on the web for a conference talk. Since
then the JavaScript version has been used to build some really nice interfaces.
Check out [brandonwalkin.com](http://brandonwalkin.com) for an example.

###OVERVIEW

The Library provides a SpringSystem for maintaining a set of Spring objects and
iterating those Springs through a physics solver loop until equilibrium is
achieved. The Spring class is the basic animation driver provided by Rebound.
By attaching a listener to a Spring, you can observe its motion. The observer
function is notified of position changes on the spring as it solves for
equilibrium. These position updates can be mapped to an animation range to
drive animated property updates on your user interface elements (translation,
    rotation, scale, etc).

Check out the [docco](http://facebook.github.io/rebound-js/docs/rebound.html),
[tests](http://facebook.github.io/rebound-js/browser_test/index.html), and
[examples](http://facebook.github.io/rebound-js/examples) for more details.
