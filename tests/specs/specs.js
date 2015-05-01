describe("messagyjs: ", function() {
    var messagy;
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
        messagy = new Messagy();
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

            messagy.on('eventhappened', mockObject.fnCallback);

            messagy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling add()", function() {

            messagy.add('eventhappened', mockObject.fnCallback);

            messagy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling subscribe()", function() {

            messagy.subscribe('eventhappened', mockObject.fnCallback);

            messagy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
        });
    });

    describe("off()", function() {

        beforeEach(function() {
            messagy.on('eventhappened', mockObject.fnCallback);
        });

        it("should un-subscribe a callback function from an event", function() {

            messagy.off('eventhappened', mockObject.fnCallback);

            messagy.trigger('eventhappened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
        });

        it("should un-subscribe all callback functions from the specified event when called with one parameter", function() {

            messagy.on('eventhappened', mockObject.fnCallback);
            messagy.on('eventhappened', mockObject.fnCallbackWParams);
            messagy.on('event2happened', mockObject.fnCallback2);

            messagy.off('eventhappened');

            messagy.trigger('eventhappened');
            messagy.trigger('event2happened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
            expect(mockObject.fnCallbackWParams).not.toHaveBeenCalled();
            expect(mockObject.fnCallback2).toHaveBeenCalled();
        });

        it("should un-subscribe all callback functions when called without parameter", function() {

            messagy.on('eventhappened', mockObject.fnCallback);
            messagy.on('eventhappened', mockObject.fnCallbackWParams);
            messagy.on('event2happened', mockObject.fnCallback2);

            messagy.off();

            messagy.trigger('eventhappened');
            messagy.trigger('event2happened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
            expect(mockObject.fnCallbackWParams).not.toHaveBeenCalled();
            expect(mockObject.fnCallback2).not.toHaveBeenCalled();
        });

        it("should be equivalent to calling remove()", function() {

            messagy.remove('eventhappened', mockObject.fnCallback);

            messagy.trigger('eventhappened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
        });

        it("should be equivalent to calling unsubscribe()", function() {

            messagy.unsubscribe('eventhappened', mockObject.fnCallback);

            messagy.trigger('eventhappened');

            expect(mockObject.fnCallback).not.toHaveBeenCalled();
        });
    });

    describe("trigger()", function() {

        it("should execute callbacks according to the subscribed event", function() {

            messagy.on('eventhappened', mockObject.fnCallback);
            messagy.on('event2happened', mockObject.fnCallback2);

            messagy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
            expect(mockObject.fnCallback2).not.toHaveBeenCalled();

            messagy.trigger('event2happened');
            expect(mockObject.fnCallback.calls.count()).toEqual(1);
            expect(mockObject.fnCallback2).toHaveBeenCalled();
        });

        it("should execute all callbacks subscribing to an event", function() {

            messagy.on('eventhappened', mockObject.fnCallback);
            messagy.on('eventhappened', mockObject.fnCallback2);

            messagy.trigger('eventhappened');
            expect(mockObject.fnCallback).toHaveBeenCalled();
            expect(mockObject.fnCallback2).toHaveBeenCalled();
        });

        it("should pass any arguments to all callbacks subscribing to an event", function() {

            messagy.on('eventhappened', mockObject.fnCallbackWParams);
            messagy.on('eventhappened', mockObject.fnCallback2WParams);

            messagy.trigger('eventhappened', 'parameter!');
            expect(mockObject.fnCallbackWParams).toHaveBeenCalledWith('parameter!');
            expect(mockObject.fnCallback2WParams).toHaveBeenCalledWith('parameter!');
        });

        it("should pass as many arguments as it can to all callbacks subscribing to an event", function() {

            messagy.on('eventhappened', mockObject.fnCallbackWParams);
            messagy.on('event2happened', mockObject.fnCallbackW2Params);

            messagy.trigger('eventhappened', 'a', 'b', 'c');
            expect(mockObject.fnCallbackWParams).toHaveBeenCalledWith('a', 'b', 'c');

            messagy.trigger('event2happened', 'a', 'b', 'c');
            expect(mockObject.fnCallbackW2Params).toHaveBeenCalledWith('a', 'b', 'c');
        });

        it("should be equivalent to calling broadcast()", function() {

            messagy.on('eventhappened', mockObject.fnCallback);

            messagy.broadcast('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling propagate()", function() {

            messagy.on('eventhappened', mockObject.fnCallback);

            messagy.propagate('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling emit()", function() {

            messagy.on('eventhappened', mockObject.fnCallback);

            messagy.emit('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });

        it("should be equivalent to calling publish()", function() {

            messagy.on('eventhappened', mockObject.fnCallback);

            messagy.publish('eventhappened');

            expect(mockObject.fnCallback).toHaveBeenCalled();
        });
    });
});
