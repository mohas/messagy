[![MIT License][license-image]][license-url]

# messy
Simple messaging in ~750 bytes of code

## What is it?
messyjs is yet another javascript messaging library and a very very tiny and minimalistic one.

## Why another messaging library?
There are lots of robust messaging libraries supporting many patterns, but sometimes you just want something very simple
for your small project or sample code or prototype so if things got serious you can easily replace it with something more robust and
heavy-duty. And so messy saves the day. messy is a piece of simple code and it is here so you don't have to write your own or use a bit more
complicated alternatives and focus on getting things started.

## How can I use it?
There are only three methods in the library: on(), trigger() and off().

### Example
```javascript
    var messy = new Messy();
    messy.on('case of event', function(){ alert('event happened!'); });
    messy.trigger('case of event');
```

It's that simple.

You can also pass arguments to the listening callback:

```javascript
    var messy = new Messy();
    messy.on('case of event', function(value){ alert(value); });
    messy.trigger('case of event', 'event happened!');
```

To remove your subscription:

```javascript
    messy.off('case of event', your_callback_here);
    //or to remove all subscribers to an event indiscriminately
    messy.off('case of event');
    //or to remove all subscribers altogether
    messy.off();
```

For convenience each method have a set of synonyms that you can call interchangeably:

* on: add or subscribe
* off: remove or unsubscribe
* trigger: broadcast or emit or propagate or publish

Calling these synonyms have no advantage over each other and they are present just so anyone can use the ones that is more comfortable with, as they are
used in other libraries (jquery uses on/off/trigger in angular we have on/emit/broadcast and so on...)

## Applications
messy can thrive it simple applications:

* small applications
* prototyping
* where you don't want to use jQuery, postal, etc.
* where performance is of utmost importance
* where you just want no fuss simple messaging

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE