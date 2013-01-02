// (c) 2012 -2013 Umer Mansoor
// Collections.js may be freely distributed under the MIT license
// For more information, email: umermk3@gmail.com

var should = require('should');
var ll;
describe('LinkedList', function() {
	beforeEach( function ( done ) {
		ll = require(__dirname + '/../src/LinkedList');
	    done();
	  });
	
	afterEach( function ( done ) {
		ll = null;
		delete ll;
	    done();
	});
	
	describe('Copy', function() {
		var ll2;
		beforeEach( function (done) {
			ll2 = require(__dirname + '/../src/LinkedList');
			
			ll.initialize();
			ll.add("leonardo");
			ll.add("michelangelo");
			ll.add("raphael");
			ll.add("donatello");
		    done();
		  });
		
		it('should be able to recover from copying a null or a non-LinkedList object', function(done) {
			ll2.initialize(null).should.equal(false);
			ll2.initialize({}).should.equal(false); 
			ll2.initialize({size: function() {return 2;}}).should.equal(false);
			ll2.initialize("bogus").should.equal(false);
			done();
		});
		
		it('should be able to copy a list', function(done) {
			ll.size().should.equal(4);

			ll2.initialize(ll);
			//ll.size().should.equal(4);
				//ll2.size().should.equal(4);
			done();

		});
	});
	
	describe('Iterate', function() {
		beforeEach( function (done) {
			ll.initialize();
			ll.add("0");
			ll.add("1");
			ll.add("2");
			ll.add("3");
		    done();
		  });
		
		it('should be able to iterate a list', function() {
			for(var i=0; i<ll.size(); i++) {
				ll.get(i).should.equal(i.toString());
			}
		});
		
		it('should be able to iterate a list in reverse order', function() {
			// Traverse from the end. This also ensure that the previous 
			// traversal only retrieved the elements without removing them.
			for (var j=ll.size()-1; j>=0; j--) {
				ll.get(j).should.equal(j.toString());
			}
		});
	});
	
	describe('Array Conversion', function () {
		it('should be able to convert an empty list to an array', function() {
			ll.initialize();
			ll.toArray().length.should.equal(0);
		});
		
		it('should be able to get an array of 3 elements and verify their positions', function() {
			ll.add(1);
			ll.add(2);
			ll.add(3);
			ll.toArray().length.should.equal(3);
			ll.toArray()[0].should.equal(1);
			ll.toArray()[1].should.equal(2);
			ll.toArray()[2].should.equal(3);
		});
		
		it('should be able to add and remove elements from the list', function() {
			// Picking up from the last test. Remove the first element.
			ll.remove(0); 
			// The array should only have two elements left.
			ll.toArray().length.should.equal(2);
			// The first element should now be 2
			ll.toArray()[0].should.equal(2);
			// Remove the tail.
			ll.remove(ll.size()-1);
			ll.size().should.equal(1);
			// The only element left should  be 2
			ll.toArray()[0].should.equal(2);
		});
	});
	
	describe('Retrieval', function() {
		it('should be able to handle retrieval from an empty list and bogus values', function(done) {
			ll.initialize();
			should.not.exist(ll.get(0));
			should.not.exist(ll.get(-1));
			should.not.exist(ll.get(1000));
			should.not.exist(ll.get());
			should.not.exist(ll.get("1"));
			done();
		});
		
		it('should be able to handle retrieval of first and last element from a list', function(done) {
			ll.add("first");
			ll.add("last");

			ll.getFirst().should.equal("first");
			ll.getLast().should.equal("last");
			
			// Make sure the the `getFirst()` and `getLast()` are symmetric 
			// with `get()`
			ll.get(0).should.equal(ll.getFirst());
			ll.get(ll.size()-1).should.equal(ll.getLast());
			done();
		});
	});
	
	describe('Add & Remove', function() {
		it('should be able to add 3 elements', function(done) {
			ll.initialize();
			ll.add(1);
			ll.add(2);
			ll.add(3);
			ll.size().should.equal(3);
			done();
		});
		it('should be able to add more elements and verify their positions', function() {
			// Picking up from the last test. Add a new element to the front.
			ll.add(0, 0);
			ll.size().should.equal(4);
			ll.add(4, ll.size());
			ll.size().should.equal(5);
			
			// Verify the position of each item in the list by iterating it.
			for (var i=0; i<ll.size(); i++) {
				ll.get(i).should.equal(i);	
			}
		});
		it('should be able to remove items from the list and verify existing items', function () {
			// Picking up from the last test. Remove the second item
			ll.remove(1);
			ll.size().should.equal(4);
			// The first element should now be equal to 2.
			ll.get(1).should.equal(2); 
			// Remove elements from the front and the end.
			ll.remove(0);
			ll.remove(ll.size()-1);
			ll.size().should.equal(2);
			// The first element should now be equal to 2 and the last element
			// should equal 3.
			ll.get(0).should.equal(2);
			ll.get(ll.size()-1).should.equal(3);	
		});
		it('should be able to handle the removal of the first and last element of the list', function() {
			// Add an additional item to the end of list
			ll.add(4);
			ll.size().should.equal(3);
			ll.removeFirst().should.equal(2);
			ll.removeLast().should.equal(4);
			// Now the list is left with one element. 
			ll.removeFirst().should.equal(3);
			ll.size().should.equal(0);
			// The list is empty now
			should.not.exist(ll.removeFirst());
			should.not.exist(ll.removeLast());
		});
		it('should be able to handle retrieval by index at non-existent and bogus indices', function() {
			// Pick up from the last test. The list should be empty.
			ll.size().should.equal(0);
			should.not.exist(ll.remove(-1));
			should.not.exist(ll.remove("first"));
			should.not.exist(ll.remove(1));
			// Now add few items to the list
			ll.add(1);
			ll.add(2);
			ll.add(3);
			ll.add("fourth");
			ll.size().should.equal(4);
			ll.remove(1).should.equal(2);
			ll.remove(2).should.equal("fourth");
			
			should.not.exists(ll.remove(ll.size()));
		});
	});
})
