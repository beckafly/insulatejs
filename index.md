# insulatejs v0.1

>Library to create constants, immutable objects, members and methods in javascript (constants polyfil for ecma5)  

*Created by Alex Becker byaxy@insulatejs.com.*    
*_also available on bower._ `bower install insulatejs`.*


One of the main reasons for this library, are some security concerns with malicious javascript being able to override your methods and variables, thus making your code potentially dangerous. 
With insulate you can address some of these concerns, or, simply  protect the intended functionality of your code from being accidentally overwritten. 
Also, you can even make safe global objects and constants. 

Another reason I've created this library were web components. Their amazing ability to encapsulate all that they need to function, html, css and js. Unfortunately they are still in draft stage. With the ability of insulatejs library to create immutable objects, you can insulate your code from any interference. You can make an immutable methods and properties for you “component’s” js. Though insulatejs is not a component polyfil, but it can be used to make something with a similar functionality, as one of possible uses.

How ever, you can use it just to set constants or protected objects anywhere in your code. 
It's a thin library and there are many possible uses.

 
By running `insulate.createObject()` you can create an object in global namespace that can not be reset, redefined or in anyway messed with.  

Further, you can add members and methods  with `insulate.createMember()` and `insulate.createMethod()` that will not be vulnerable to any unwanted changes initiated by other scripts. By keeping your important functions immutable you can improve security   
In fact, after you created an object with insulate and used insulate to add methods and members, they will all behave as constants, imitable!
Every thing that you create with insulate can not be redefined!
Insulate itself is created to be imitable by using it's `createObject()` method. It can not be redefined. Try it.


To use, include insulate.js script in head of your page.   
To turn on error messages in console, use `insulate.logErrors();`, highly recommended to do so, when using for a first time. To turn  error messages  back off, `insulate.muteErrors();`

To create a global constant:   
`insulate.createConstant()` will create a constant in a global namespace. Needs a name and optional value to set the constant   

    example  
    insulate.createConstant("MYCONST", "hello world");   
    Try to reset it  
    MYCONST = 123;
    console.log(MYCONST); //will still print out "hello world"! 

If you choose not to pass the second argument, you can set the constant later.   

    example
    insulate.createConstant("MYCONST"); MYCONST = "hello world";   
    Now MYCONST will always return "hello world".  
    Try to reset it  
    MYCONST = 123;
    console.log(MYCONST); //will print out "hello world"!    

	
It is important not to declare your constants before you create them with insulate, if you do, before ruining `insulate.createConstant()`, insulate will ask you to pick a different name!
	
To create a constant in another scope, other than  global, use `insulate.createMember();`  
  
To create immutable objects:
	
`insulate.createObject();` will create an object in global space or in any context, if supplied.  
Needs a name and optionally context (an object).    
All members and methods of this the top level object will be immutable, as long as you create  
each of them with insulate library.  
Nested objects can be passed with dotted notation - obj1.obj2.obj3 or as a named reference.  

    example 
    insulate.createObject("myObj"); will create myObj in global namespace.   
    This should be used as a starting point. 
    Creating nested objects with insulate library will insure immutability.   
    insulate.createObject("myObjInner", myObj); will create a myObjInner object    
    as a myObj member. Can also be done with insulate.createMember();.  
    Now try to reset either one:   
    myObj = "I am trying to hack you";   
    console.log(typeof myObj); //will print out an object!   
    myObj.myObjInner = "I am trying to hack you";   
    console.log(typeof myObj.myObjInner); //will still print out an object!  
    
	
To create immutable methods:

`insulate.createMethod()` will create a immutable  method (if created in an object made with insulate utility) 
needs a name, object and an optional function.    
Nested objects can be passed with dotted notation - obj1.obj2.obj3 or as a named reference   

    example
    insulate.createObject("myObj"); // in case you have not created it before.
    insulate.createMethod("hello", myObj, function(){console.log("hello world")});  
    Let's try to reset it:  
    myObj.hello = function(){console.log("i'm trying to hack you")};  
    myObj.hello(); // will still print out "hello world"!

If you choose not to pass a function as the third argument, you can set the method later.   

    example
    insulate.createObject("myObj"); // in case you have not created it before.
    insulate.createMethod("hello", myObj);
    myObj.hello = function(){console.log("hello world")};   
    Let's try to reset it:  
    myObj.hello = function(){console.log("i'm trying to hack you")};  
    myObj.hello(); // will still print out "hello world"!
	
To create immutable members:

`insulate.createMember()` will create an imitable member in an object (created with insulate).   
Needs a name, object and optional value.   
Nested objects can be passed with dotted notaition - obj1.obj2.obj3 or as a named reference

    example 
    insulate.createObject("myObj"); // in case you have not created it before.
    insulate.createMember("lirics", myObj, "lorem ipsum something, something");   
    Let's try to reset it:  
    myObj.lirics = "i'm trying to hack you";  
    console.log(myObj.lirics); // will still print out "lorem ipsum something, something"!



if you choose not to pass any value as  the third argument, you can set the member later  

    example
    insulate.createObject("myObj");
    insulate.createMember("lirics", myObj);
    myObj.lirics = "lorem ipsum something, something";  
    Let's try to reset it:  
    myObj.lirics = "i'm trying to hack you";  
    console.log(myObj.lirics); // will still print out "lorem ipsum something, something"!    

    
 
*Your feedback is quite welcome!*  
byaxy@insulatejs.com
