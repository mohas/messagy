describe("messyjs: ", function() {
    var messy;
    var MockObject = function() {
        return {
            fnCallbackExeCount: 0,
            fnCallbackParamExeCount: 0,
            fnCallback: function () { },
            fnCallback2: function () { },
            fnCallbackWParams: function (p) { },
            fnCallback2WParams: function (p) { },
            fnCallbackW2Params: function (p1,p2) { },
            fnCallback2W2Params: function (p1,p2) { }
        };
    };
    var mockObject;

    beforeEach(function() {
        messy = new Messy();
        mockObject = new MockObject();
        spyOn(mockObject, 'fnCallback');
        spyOn(mockObject, 'fnCallback2');
        spyOn(mockObject, 'fnCallbackWParams');
        spyOn(mockObject, 'fnCallback2WParams');
        spyOn(mockObject, 'fnCallbackW2Params');
        spyOn(mockObject, 'fnCallback2W2Params');
    });

    describe("on()", function() {

        it("should subscribe a callback function to an event", function() {

            messy.on('eventhappened', mockObject.fnCallback);

            messy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling add()", function() {

            messy.add('eventhappened', mockObject.fnCallback);

            messy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling subscribe()", function() {

            messy.subscribe('eventhappened', mockObject.fnCallback);

            messy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
        });
    });

    describe("off()", function() {

        beforeEach(function() {
            messy.on('eventhappened', mockObject.fnCallback);
        });

        it("should un-subscribe a callback function from an event", function() {

            messy.off('eventhappened', mockObject.fnCallback);

            messy.trigger('eventhappened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
        });

        it("should un-subscribe all callback functions from the specified event when called with one parameter", function() {

            messy.on('eventhappened', mockObject.fnCallback);
            messy.on('eventhappened', mockObject.fnCallbackWParams);
            messy.on('event2happened', mockObject.fnCallback2);

            messy.off('eventhappened');

            messy.trigger('eventhappened');
            messy.trigger('event2happened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
            expect(mockObject.fnCallbackWParams).not.toHaveBeenCalled();
            expect(mockObject.fnCallback2).toHaveBeenCalled();
        });

        it("should un-subscribe all callback functions when called without parameter", function() {

            messy.on('eventhappened', mockObject.fnCallback);
            messy.on('eventhappened', mockObject.fnCallbackWParams);
            messy.on('event2happened', mockObject.fnCallback2);

            messy.off();

            messy.trigger('eventhappened');
            messy.trigger('event2happened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
            expect(mockObject.fnCallbackWParams).not.toHaveBeenCalled();
            expect(mockObject.fnCallback2).not.toHaveBeenCalled();
        });

        it("should be equivalent to calling remove()", function() {

            messy.remove('eventhappened', mockObject.fnCallback);

            messy.trigger('eventhappened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
        });

        it("should be equivalent to calling unsubscribe()", function() {

            messy.unsubscribe('eventhappened', mockObject.fnCallback);

            messy.trigger('eventhappened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
        });
    });

    describe("trigger()", function() {

        it("should execute callbacks according to the subscribed event", function() {

            messy.on('eventhappened', mockObject.fnCallback);
            messy.on('event2happened', mockObject.fnCallback2);

            messy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
            expect(mockObject.fnCallback2).not.toHaveBeenCalled();

            messy.trigger('event2happened');
            expect(mockObject.fnCallback.calls.count()).toEqual(1);
            expect(mockObject.fnCallback2).toHaveBeenCalled();
        });

        it("should execute all callbacks subscribing to an event", function() {

            messy.on('eventhappened', mockObject.fnCallback);
            messy.on('eventhappened', mockObject.fnCallback2);

            messy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
            expect(mockObject.fnCallback2).toHaveBeenCalled();
        });

        it("should pass any arguments to all callbacks subscribing to an event", function() {

            messy.on('eventhappened', mockObject.fnCallbackWParams);
            messy.on('eventhappened', mockObject.fnCallback2WParams);

            messy.trigger('eventhappened', 'parameter!');
            expect(mockObject.fnCallbackWParams).toHaveBeenCalledWith('parameter!');
            expect(mockObject.fnCallback2WParams).toHaveBeenCalledWith('parameter!');
        });

        it("should pass as many arguments as it can to all callbacks subscribing to an event", function() {

            messy.on('eventhappened', mockObject.fnCallbackWParams);
            messy.on('event2happened', mockObject.fnCallbackW2Params);

            messy.trigger('eventhappened', 'a', 'b', 'c');
            expect(mockObject.fnCallbackWParams).toHaveBeenCalledWith('a', 'b', 'c');

            messy.trigger('event2happened', 'a', 'b', 'c');
            expect(mockObject.fnCallbackW2Params).toHaveBeenCalledWith('a', 'b', 'c');
        });

        it("should be equivalent to calling broadcast()", function() {

            messy.on('eventhappened', mockObject.fnCallback);

            messy.broadcast('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling propagate()", function() {

            messy.on('eventhappened', mockObject.fnCallback);

            messy.propagate('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling emit()", function() {

            messy.on('eventhappened', mockObject.fnCallback);

            messy.emit('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling publish()", function() {

            messy.on('eventhappened', mockObject.fnCallback);

            messy.publish('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });
    });
});
