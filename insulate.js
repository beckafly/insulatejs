	/*************************
	insulate.js v0.1
	created by Alex Becker
	byaxy@insulatejs.com
	insulate.js is a library to create indestructible and unchangeable objects, members and methods in ecma5 javascript (all modern browsers and ie9 and up).
	By running insulate.createObject() you can create an object in global namespace that can not be reset, redefined or in anyway messed with.
	Further, you can add members and methods  with insulate.createMember() and insulate.createMethod() that will not be vulnerable to any unwanted	changes
	initiated by other scripts. By keeping your important functions immutable you can improve security
	Infact, after you created an object with insulate and used insulate to add methods and members, they will all behave as constants, imitable!
	Every thing that you create with insulate can not be redefined!
	Insulate itself is created to be imitable by using it's createObject method. It can not be redefined. Try it.
	************************/



	(function() {
	    var cf = {};
	    var validName = /^[$A-Z_][0-9A-Z_$]*$/i;

	 

	    // main function creates objects
	    function createImtble(objName, context) {
	    	var cnt;
	        if (typeof context === "undefined") {
	            cnt = window;
	        } else {
	            cnt = context;
	        }

	        var localMYOBJ;
	        Object.defineProperty(cnt, objName, {
	            get: function() {
	                return localMYOBJ;
	            },
	            set: function(val) {
	                if (cnt[objName] && cnt[objName] != val) {
	                    throw "You can not redifine this object"
	                } else if (cnt[objName] && cnt[objName] == val) {
	                    throw "This object has already been defined"
	                }
	                localMYOBJ = cnt[objName] || val; 

	            }
	        });
	    }



		/****************
		insulate.createConstant() will create a constant in a global namespace. Needs a name and the data to set the constant
		
		example 
		insulate.createConstant("MYCONST", "hello world")
		If you choose not to pass the second argument, you can set the constant later.
		example
		insulate.createConstant("MYCONST"); MYCONST = "hello world".
		***************/
	    
	    cf.createConstant = function(constName, contents) {

	        if (typeof constName !== "string") {
	            throw "First argument needs to be constant name"
	        } else if (!constName.match(validName)) {
	            throw "Name needs to be a valid javascript name";
	        } else {
	            createImtble(constName);
	            if (contents) {
	            window[constName] = contents;
	        	}
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

	    cf.createObject = function(objName, context) {
	        //console.log(context);
	        context = context || window;
	        if (typeof objName !== "string") {
	            throw "First argument needs to be object name"
	        } else if (!objName.match(validName)) {
	            throw "Name needs to be a valid javascript name";
	        } else {
	            createImtble(objName, context);
	            context[objName] = {};
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

	    cf.createMethod = function(methodName, objName, methodFunc) {

	        if (typeof objName !== "object") {
	            throw "Second argument needs to be an object";
	        } else if (methodFunc && typeof methodFunc !== "function") {
	            throw "Third argument needs to be a function";
	        } else if (typeof methodName !== "string") {
	            throw "First argument needs to be Method name"
	        } else if (!methodName.match(validName)) {
	            throw "Name needs to be a valid javascript name";
	        } else {
	            createImtble(methodName, objName);
	            if(methodFunc){
	            	objName[methodName] = methodFunc;
	            }
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

	    cf.createMember = function(memberName, objName, contents) {

	        if (typeof memberName !== "string") {
	            throw "First argument needs to be member name"
	        } else if (typeof objName !== "object") {
	            throw "Second argument needs to be an object";
	        } else if (!memberName.match(validName)) {
	            throw "Name needs to be a valid javascript name";
	        } else if (typeof contents === "function") {
	            throw "Member can not be a function";
	        } else {
	            createImtble(memberName, objName);
	            if (contents){
	            objName[memberName] = contents;
	        	}
	        }

	    };


	    createImtble("insulate", window);
	    window["insulate"] = cf;
	}());