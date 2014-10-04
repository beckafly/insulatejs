insulatejs
==========

Library to create constants in and immutable objects, members and methods in javascript

	insulatejs v0.1
	created by Alex Becker
	byaxy@insulatejs.com
	insulate.js is a library to create indestructible and unchangeable objects, members and methods in ecma5 javascript (all modern browsers and ie9 and up).
	By running insulate.createObject() you can create an object in global namespace that can not be reset, redefined or in anyway messed with.
	Further, you can add members and methods  with insulate.createMember() and insulate.createMethod() that will not be vulnerable to any unwanted	changes
	initiated by other scripts. By keeping your important functions immutable you can improve security
	Infact, after you created an object with insulate and used insulate to add methods and members, they will all behave as constants, imitable!
	Every thing that you create with insulate can not be redefined!
	Insulate itself is created to be imitable by using it's createObject method. It can not be redefined. Try it.

To use, include this script in your page.

To create a global constant:

	insulate.createConstant() will create a constant in a global namespace. Needs a name and optional data to set the constant
	
	example 
	insulate.createConstant("MYCONST", "hello world")
	If you choose not to pass the second argument, you can set the constant later.
	example
	insulate.createConstant("MYCONST"); MYCONST = "hello world";
	Now MYCONST will always return "hello world".
	Try to rest it
	MYCONST = 123;
	console.log(MYCONST); Still "hello world". 



To create immutable objects:
	
	insulate.createObject() will create an object in global space or in any context if supplied
	needs a name and optianoly context (an object). All members and methods of this the top level object will be immutable, as long as you create eaxh of them with insulate library. 
	Nested objects can be passed with dotted notaition - obj1.obj2.obj3 or as a named refference.

	example 
	insulate.createObject("myObj"); will create myObj in global namespace. This should be used as a starting point. 
	Creating nested objects with insulate library will insure imutabylity
	insulate.createObject("myObjInner", myObj) will create a myObjInner object as a myObj member. Can also be done with insulate.createMember.
	
To create immutable members:

	insulate.createMethod() will create a immutable  method (if created in an object made with insulate utility) 
	needs a name, object and an optional function.
	nested objects can be passed with dotted notaition - obj1.obj2.obj3 or as a named refference

	
	example
	insulate.createObject("myObj"); 
	insulate.createMethod("hello", myObj, function(){console.log("hello world")})
	
	If you choose not to pass a function as the third argument, you can set the method later.

	example
	insulate.createObject("myObj"); 
	insulate.createMethod("hello", myObj);
	myObj.hello = function(){console.log("hello world")}	

	insulate.createMember() will create an imutable member in an object (created with insulate)
	needs a name, object and optinal data of any type. 
	nested objects can be passed with dotted notaition - obj1.obj2.obj3 or as a named refference

	example 
	insulate.createObject("myObj");
	insulate.createMember("lirics", myObj, "lorem ipsum something, something");

	if you choose not to pass any data as  the third argument, you can set the member later

	example
	insulate.createObject("myObj");
	insulate.createMember("lirics", myObj);
	myObj.lirics = "lorem ipsum something, something";
