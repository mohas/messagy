(function () {

    var hasModule = (typeof module !== 'undefined' && module && module.exports);
    var globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this;

    if(hasModule)
        module.exports = Messy;
    //use with amd
    else if (typeof define === 'function' && define.amd) {
        define("messy", [], function () {
            return Messy;
        });
    }
    //for use in browser
    else{
        globalScope.Messy = Messy;
    }

    function Messy() {

        var mesh = [];

        var messy = {};

        messy.on = on;
        messy.add = on;
        messy.subscribe = on;

        messy.broadcast = broadcast;
        messy.trigger = broadcast;
        messy.emit = broadcast;
        messy.propagate = broadcast;
        messy.publish = broadcast;

        messy.off = off;
        messy.remove = off;
        messy.unsubscribe = off;

        return messy;

        //Private functions/////////////////

        function on(event, callback) {
            if (typeof mesh[event] === 'undefined') {
                mesh[event] = [];
            }
            mesh[event].push(callback);
        }

        function off(event, callback) {
            if (arguments.length === 0) {
                mesh = [];
                return;
            }
            if (typeof callback === 'undefined') {
                mesh[event] = [];
                return;
            }
            if (typeof mesh[event] === 'undefined') {
                return;
            }
            var i = indexOf(mesh[event], callback);
            if (i !== -1)
                mesh[event].splice(i);
        }

        function broadcast(event) {
            if (typeof mesh[event] === 'undefined') {
                return;
            }

            var args = [];
            for (var i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            for (var j = 0; j < mesh[event].length; j++) {
                if (typeof mesh[event][j] !== 'undefined') {
                    mesh[event][j].apply(null, args);
                }
            }
        }

        function indexOf(array, member) {
            if (typeof Array.prototype.indexOf !== 'undefined')
                return array.indexOf(member);
            for (var i = 0; i < array.length; i++)
                if (array[i] === member)
                    return i;
            return -1;
        }
    }
})();