(function () {

    var hasModule = (typeof module !== 'undefined' && module && module.exports);
    var globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this;

    if(hasModule)
        module.exports = Messagy;
    //use with amd
    else if (typeof define === 'function' && define.amd) {
        define("messagy", [], function () {
            return Messagy;
        });
    }
    //for use in browser
    else{
        globalScope.Messagy = Messagy;
    }

    function Messagy() {

        var mesh = [];

        var messagy = {};

        messagy.on = on;
        messagy.add = on;
        messagy.subscribe = on;

        messagy.broadcast = broadcast;
        messagy.trigger = broadcast;
        messagy.emit = broadcast;
        messagy.propagate = broadcast;
        messagy.publish = broadcast;

        messagy.off = off;
        messagy.remove = off;
        messagy.unsubscribe = off;

        return messagy;

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