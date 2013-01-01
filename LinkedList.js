// Collections.js
// (c) 2012 -2013 Umer Mansoor
// Collections.js may be freely distributed under the MIT license
// For more information, email: umermk3@gmail.com
// The programming style of this module is decribed at: 
//  10kloc.wordpress.com/??


var util = require('util');

module.exports = (function() { 

	// Points to the first node in the LinkedList
	var _head; 
	// Points to the last node in the LinkedList
	var _tail;
	// Represents the number of elements in the LinkedList
	var _numberOfElements; 
	
	// Constructor
	function initialize(copyFromList) {
		// If the `copyFromList` is not null, construct this list so that it 
		//  contains all the elements of `copyFromList` in the same order.
		if (typeof copyFromList !== 'undefined') {
			//TODO: Check if copyFrom is a valid LinkedList
		}
	
		// Initialize all member variables to default values
		_head = null; 
		_tail = null; 
		_numberOfElements = 0;
		
		util.debug('initialized');
	}
	
	// Create a new node containing `item` and append it to the end of the 
	// LinkedList.
	function _addElement(item) {
		// Create a new Node whose element holds`item` 
		var node = _createNode(item);
		
		// To add an item to the end of the LinkedList, use `_numberOfElements`
		// which specifies the size of the list, as index.
		return _addElementAtIndex(_numberOfElements, item);
	}
	
	// Check if the specified list `index` is valid or not *for traversing the
	// LinkedList*. An index is valid if and only if it is greater than 0 and 
	// less than  the number of items in the list.
	function _isValidIndex(index) {
		if (index > 0 || index > _numberOfElements) {
			return false;
		} else {
			return true;
		}
	}
	
	// Create a new node containing item` and insert it in the position 
	// specified by `index`. The list does not allow `null` items.
	// Return true on successfull insertion. Otherwise, return false.
	function _addElementAtIndex(index, item) {
		
		// Check that the arguments supplied are valid and adhere to the 
		// LinkedList's protocol.
		if(typeof index === 'undefined' || index<0 
				|| typeof item === 'undefined' || item === null)
			return false;
			
		// Create a new Node whose element holds `item` 
		var node = _createNode(item);
		
		// If the LinkedList is empty, add item at the beginning of the list.
		if (0 === _numberOfElements)
		{
			_head = node;
			_tail = node;
		// If the `index` is equal to the number of items in the LinkedList, 
		// add item at the end of list. 
		} else if (index === _numberOfElements) {
			//last node
			_tail.next = node;
			_tail = node;
		// If the `index` is equal to the 0, add item at the beginning of list.
		} else if (0 === index) {
			node.next = _head;
			_head = node;
		// Insert the item at the specified `index` in the LinkedList
		} else {
			var previousNode = _getNode(index-1);
			node.next = previousNode.next;
			previousNode.next = node;
		}
		
		// Increment the number of elements the LinkedList has.
		_numberOfElements++;
		return true;
	}

	function add(args) {
		if (arguments.length == 1) {
			_addElement(arguments[0]);
		} else if (arguments.length == 2) {
			index = arguments[0];
			element = arguments[1];
			return _addElementAtIndex(index, element);
		} else {
			return false;
		}
		return true;
	}
	
	return {
		initialize: initialize,
		add: add,
		traverse: traverse,
		size: size,
		toArray: toArray,
		getFirst: getFirst,
		getLast: getLast,
		get: get,
		remove: remove,
		removeFirst: removeFirst,
		removeLast: removeLast,
		indexOf: indexOf
	};
	
	function _getNode(index)
	{
		if (index < 0 || index >= _numberOfElements)
			return undefined;
		
		// for speed	
		if (_numberOfElements - 1 === index)
			return _tail;
			
		var node = _head;
		for (var i = 0; i < index; i++) {
			node = node.next;
		}

		return node;
	}
	
	function get(index)
	{
		var node = _getNode(index);
		
		if (node === undefined) {
			return undefined;
		} else {
			return node.element;
		}
		
	}
	
	
	//Retrieves, but does not remove, the head (first element) of this list.
	function getFirst()
	{
		return get(0);
	}
	
	//Retrieves, but does not remove, the head (first element) of this list.
	function getLast()
	{
		return get(_numberOfElements-1);
	}
	


	//Removes the element at the specified position in this list.
	function remove(index) {
		if (0 > index || index >= _numberOfElements || 0 === _numberOfElements )
			return undefined;
		
		if (index === undefined)
			index = 0;
			
		var element = undefined;
		
		if (0 === index) { //remove the first element
			var oldHead = _head;
			_head = _head.next;
			element = oldHead.element;
		} else if (_numberOfElements-1 === index) { //remove last
			var ancestorOfTail = _getNode(index-1);
			ancestorOfTail.next = null;
			var oldTail = _tail;
			_tail = ancestorOfTail;
			element = oldTail.element;
		} else {
			var previousNode = _getNode(index-1);
			var currentNode = _getNode(index);
			previousNode.next = currentNode.next;
			element = currentNode.element;
		}
		
		_numberOfElements--;
		return element;
	}
	
	function removeFirst() {
		return remove(0);
	}
	
	function removeLast() {
		return remove(_numberOfElements-1);
	}
	
	function clear()
	{
		_head = null;
		_tail = null;
		_numberOfElements = 0;	
	}
	
	function _createNode(item)
	{
		return {
			element: item,
			next: null		
		}
	}
	
	function size()
	{
		return _numberOfElements;
	}
	
	//Returns an array containing all of the elements in this list in proper sequence (from first to last element).
	function toArray()
	{
		var listArray = [];
		var node = _head;
		
		while (node != null)
		{
			listArray.push(node.element);
			node = node.next;
		}
		
		return listArray;
	}
	
	function indexOf(item) {
		return _search(item);
	}
	
	function _search(item) {
		var node = _head;
		var i = 0;
		
		if (0 > index || index >= _numberOfElements || undefined === item) {
			return undefined;
		}

		while (node != null)
		{
			if (node.element === item) {
				return i;
			}
			node = node.next;
			i++;
		}
		
		return undefined;
		
	}
	
	function traverse()
	{
		if (_numberOfElements === 0) {
			util.log('--empty list--');
			return;
		}
		var node = _head;
		util.log('start--');
		while (node != null)
		{
			util.log(node.element);
			node = node.next;
		}
		util.log('--end');
	}
	
}());

var ll = module.exports;
ll.initialize();
ll.add(11);
ll.add(1,12);
ll.add(2,13);
ll.add(14);
console.log('size: ' + ll.size());
console.log('at(3): ' + ll.get(2));
console.log('array: ' + ll.toArray());

ll.traverse();
