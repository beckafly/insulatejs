	/*************************
	insulate.js v1.2
	created by Alex Becker
	byaxy@insulatejs.com
	insulate.js is a library to create indestructible and unchangeable objects including the parent objects, members and methods in ecma5 javascript (all modern browsers and ie9 and up).
	By running insulate.createObject() you can create an object in global namespace that can not be reset, redefined or in anyway messed with.
	Further, you can add members and methods  with insulate.createMember() and insulate.createMethod() that will not be vulnerable to any unwanted	changes
	initiated by other scripts. By keeping your important functions immutable you can improve security
	Infact, after you created an object with insulate and used insulate to add methods and members, they will all behave as constants, imitable!
	Every thing that you create with insulate can not be redefined!
	Insulate itself is created to be imitable by using it's createObject method. It can not be redefined. Try it.
	************************/



	(function(window, undefined) {

	    var cf = {};
	    var validName = /^[$A-Z_][0-9A-Z_$]*$/i;
	    var console = window.console;
	    var log;
	    var odp = (Object.defineProperty) ? clone(Object.defineProperty) : null;  // call function to clone Object.defineProperty in case it's fucked with later

	    // clone Object.defineProperty
	    function clone(obj) {
	        if (obj == null || typeof(obj) !== "object"){
	            return obj;
	        }

	        var temp = obj.constructor(); // changed

	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                temp[key] = clone(obj[key]);
	            }
	        }
	        return temp;
	    }


	 

	    // to turn on error massages in console set insulate.logErrors() somwere in your code

	    function logErr(error) {
	        if (log) {
	            console.warn(error);
	        } else {
	            return;
	        }
	    }
	    // main function creates objects


	    function createImtble(name, context) {


	        var cnt;
	        if (typeof context === "undefined") {
	            cnt = window;
	        } else {
	            cnt = context;
	        }

	        
	        if (odp) {

	            var localMYOBJ;
	            try {
	                odp(cnt, name, {

	                    get: function() {
	                        return localMYOBJ;
	                    },
	                    set: function(val) {

	                        if (cnt[name]) {
	                            logErr("This proprty has already been set and will not be changed");
	                            return null;
	                        }
	                        localMYOBJ = val;

	                    }
	                });
	            } catch (err) {
	                logErr(err.message);
	            } finally {
	                return;
	            }
	        } else {
	            logErr("older browser, will not be secure");
	            cnt[name] = undefined;

	        }


	    }



	    /****************
		insulate.createConstant() will create a constant in a global namespace. Needs a name and the data to set the constant
		
		example 
		insulate.createConstant("MYCONST", "hello world")
		If you choose not to pass the second argument, you can set the constant later.
		example
		insulate.createConstant("MYCONST"); MYCONST = "hello world".
		***************/

	    cf.createConstant = function(name, contents) {
	        try {
	            if (window[name] && typeof Object.getOwnPropertyDescriptor(window, name).set !== "function") {
	                throw "This variable has been decleard without insulate, please pick another name";
	            } else if (typeof name !== "string") {
	                throw "First argument needs to be constant name";
	            } else if (!name.match(validName)) {
	                throw "Name needs to be a valid javascript name";
	            } else {
	                createImtble(name);
	                if (contents) {
	                    window[name] = contents;
	                }
	            }
	        } catch (err) {
	            logErr(err);
	        } finally {
	            return;
	        }
	    };


	    /***************
		insulate.createObject() will create an object in global space or in any context if supplied
		needs a name and optianoly context (an object). Nested objects can be passed with dotted notaition - obj1.obj2.obj3 or as a named refference

		example 
		insulate.createObject("myObj"); will create myObj in global namespace. This should be used as a starting point. 
		Creating nested objects with insulate library will insure imutabylity
		insulate.createObject("myObjInner", myObj) will create a myObjInner object as a myObj member. Can also be done with insulate.createMember.
		**************/

	    cf.createObject = function(name, context) {
	        //console.log(context);
	        context = context || window;
	        try {
	            if (typeof name !== "string") {
	                throw "First argument needs to be object name";
	            } else if (!name.match(validName)) {
	                throw "Name needs to be a valid javascript name";
	            } else {
	                createImtble(name, context);
	                context[name] = {};
	            }
	        } catch (err) {
	            logErr(err);
	        } finally {
	            return;
	        }
	    };


	    /**************
	    insulate.createMethod() will create a immutable  method (if created in an object made with insulate utility) 
		needs a name, object and a function.
		nested objects can be passed with dotted notaition - obj1.obj2.obj3 or as a named refference

		
		example
		insulate.createObject("myObj"); 
		insulate.createMethod("hello", myObj, function(){console.log("hello world")})
		
		If you choose not to pass a function as the third argument, you can set the method later

		example
		insulate.createObject("myObj"); 
		insulate.createMethod("hello", myObj);
		myObj.hello = function(){console.log("hello world")}
	    ************/

	    cf.createMethod = function(name, context, contents) {

	        try {
	            if (typeof context !== "object") {
	                throw "Second argument needs to be an object";
	            } else if (contents && typeof contents !== "function") {
	                throw "Third argument needs to be a function";
	            } else if (typeof name !== "string") {
	                throw "First argument needs to be Method name";
	            } else if (!name.match(validName)) {
	                throw "Name needs to be a valid javascript name";
	            } else {
	                createImtble(name, context);
	                if (contents) {
	                    context[name] = contents;
	                }
	            }
	        } catch (err) {
	            logErr(err);
	        } finally {
	            return;
	        }

	    };

	    /*************
		insulate.createMember() will create an imutable member in an object (created with insulate.createObject)
		needs a name, object and data of any type. 
		nested objects can be passed with dotted notaition - obj1.obj2.obj3 or as a named refference

		example 
		insulate.createObject("myObj");
		insulate.createMember("lirics", myObj, "lorem ipsum something, something");

		if you choose not to pass any data as  the third argument, you can set the member later

		example
		insulate.createObject("myObj");
		insulate.createMember("lirics", myObj);
		myObj.lirics = "lorem ipsum something, something";
		*************/

	    cf.createMember = function(name, context, contents) {

	        try {
	            if (typeof name !== "string") {
	                throw "First argument needs to be member name";
	            } else if (typeof context !== "object") {
	                throw "Second argument needs to be an object";
	            } else if (!name.match(validName)) {
	                throw "Name needs to be a valid javascript name";
	            } else if (typeof contents === "function") {
	                throw "Member can not be a function";
	            } else {
	                createImtble(name, context);
	                if (contents) {
	                    context[name] = contents;
	                }
	            }
	        } catch (err) {
	            logErr(err);
	        } finally {
	            return;
	        }
	    };

	    log = false;

	    cf.logErrors = function() {
	        log = true;
	    };

	    cf.muteErrors = function() {
	        log = false;
	    };



	    // create imutable insulate onject and methods

	    createImtble("insulate", window);
	    var insulate = window.insulate = {};
	    createImtble("createConstant", insulate);
	    createImtble("createObject", insulate);
	    createImtble("createMethod", insulate);
	    createImtble("createMember", insulate);
	    createImtble("logErrors", insulate);
	    createImtble("muteErrors", insulate);

	    // set insulate methods

	    for (var mtd in cf) {
	        if (cf.hasOwnProperty(mtd)) {
	            insulate[mtd] = cf[mtd];
	        }
	    }


	}(window));
