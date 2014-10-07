 describe('Insulate', function() {
 
     it('should be defined in global', function() {

         expect(window.insulate).toBeDefined();
     });

     it('should stay immutable', function() {
         window.insulate = 123;
         expect(window.insulate).not.toEqual(123);
     });
 });

 describe('Insulate methods defenition', function() {
     it('createConstant should be defined', function() {
         expect(insulate.createConstant).toBeDefined();
     });

     it('createObject should be defined', function() {
         expect(insulate.createObject).toBeDefined();
     });

     it('createMethod should be defined', function() {
         expect(insulate.createMethod).toBeDefined();
     });

     it('createMember should be defined', function() {
         expect(insulate.createMember).toBeDefined();
     });
 });

 describe('Insulate methods immutability', function() {
     it('createConstant should stay immutable', function() {
         insulate.createConstant = 123;
         expect(insulate.createConstant).not.toEqual(123);
     });

     it('createObject should stay immutable', function() {
         insulate.createObject = 123;
         expect(insulate.createObject).not.toEqual(123);
     });

     it('createMethod should stay immutable', function() {
         insulate.createMethod = 123;
         expect(insulate.createMethod).not.toEqual(123);
     });

     it('createMember should stay immutable', function() {
         insulate.createMember = 123;
         expect(insulate.createMember).not.toEqual(123);
     });
 });

 describe('Insulate methods functionalyty', function() {
     describe('createConstant', function() {
         it('should create a constant', function() {
             insulate.createConstant('CONSTANT', 123);
             expect(CONSTANT).toEqual(123);
         });

         it('created contsant should be not resetable', function() {
             CONSTANT = null;
             expect(CONSTANT).toEqual(123);
         });

         it('created contsant should not be redifinable', function() {
             insulate.createConstant('CONSTANT', 444);
             expect(CONSTANT).toEqual(123);
         });
     });

     describe('createObject', function() {
         it('should create an object', function() {
             insulate.createObject('obj');
             expect(obj).toBeDefined();
         });

         it('created object should be not resetable', function() {
             obj = 123;
             expect(obj).not.toEqual(123);
         });

         it('created object should not be redifinable', function() {
             insulate.createObject('obj');
             var tm = function() {
                 var localMYOBJ;
                 return Object.defineProperty(window, 'obj', {

                     get: function() {
                         return localMYOBJ;
                     },
                     set: function(val) {
                         localMYOBJ = val;

                     }
                 });
             };
             expect(tm).toThrow();
         });
     });

     describe('createMethod', function() {
         beforeEach(function() {
             insulate.createObject('obj2');
             insulate.createMethod('met', obj2, function() {
                 return 123;
             });
         });

         it('should create a method', function() {
             var getmet = obj2.met();
             expect(getmet).toEqual(123);
         });

         it('shuld not be resatable', function() {
             obj2.met = 111;
             expect(obj2.met).not.toEqual(111);
         });

         it('should not be refefinable', function() {
             var tm = function() {
                 var localMYOBJ;
                 return Object.defineProperty(obj2, 'met', {

                     get: function() {
                         return localMYOBJ;
                     },
                     set: function(val) {
                         localMYOBJ = val;

                     }
                 });
             };
             expect(tm).toThrow();
         });
     });

     describe('createMember', function() {
         beforeEach(function() {
             insulate.createObject('obj3');
             insulate.createMember('mem', obj3, 123);
         });

         it('should create a member', function() {
             expect(obj3.mem).toEqual(123);
         });

         it('should not be resetable', function() {
             insulate.createMember = 111;
             expect(obj3.mem).not.toEqual(111);
         });

         it('should not be redefinable', function() {
             var tm = function() {
                 var localMYOBJ;
                 return Object.defineProperty(obj3, 'mem', {

                     get: function() {
                         return localMYOBJ;
                     },
                     set: function(val) {
                         localMYOBJ = val;

                     }
                 });
             };
             expect(tm).toThrow();

         });

     });
 });


describe('insulate hack attampt', function() {
	beforeEach(function() {
		Object.defineProperty = undefined;
	});

	it('should create global', function() {
		insulate.createConstant('SECOND', 123);
		expect(SECOND).toEqual(123);
	});
	
	it('should be immutable', function() {
		insulate.createConstant('SECOND', 1234);
		expect(SECOND).not.toEqual(1234);
	});

});