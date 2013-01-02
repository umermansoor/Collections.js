// LinkedList.js 
// Part of Collections.js
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
	function initialize() {
		// Initialize all member variables to default values
		_head = null; 
		_tail = null; 
		_numberOfElements = 0;
		
		// If the `copyFromList` is not null, construct this list so that it 
		//  contains all the elements of `copyFromList` in the same order.
		if (arguments.length === 1) {
			if (_copy(arguments[0]) === false) {
				return false;
			}
		}	
	}
	// TODO: This is not working
	function _copy(copyFromList) {
		if (copyFromList === null || copyFromList.hasOwnProperty('size') === false 
						|| copyFromList.size() === 0 || copyFromList.hasOwnProperty('get') === false) {
			return false;
		}
		
		for (var i=0; i<copyFromList.size(); i++) {
			var e = copyFromList.get(i);
			console.log("ff-- " + e);
			_addElement(e);
		}
		return true;
	} 
	
	// Creates a new node containing `item` and append it to the end of the 
	// LinkedList.
	function _addElement(item) {
		// Create a new Node whose element holds`item` 
		var node = _createNode(item);
		
		// To add an item to the end of the LinkedList, use `_numberOfElements`
		// which specifies the size of the list, as index.
		return _addElementAtIndex(_numberOfElements, item);
	}
	
	// Creates a new node containing item` and insert it in the position 
	// specified by `index`. The list does not allow `null` items.
	// Return true on successfull insertion. Otherwise, return false.
	function _addElementAtIndex(index, item) {
		
		// Check that the arguments supplied are valid and adhere to the 
		// LinkedList's protocol.
		if(index === undefined || index<0 
				|| item === undefined || item === null)
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
	
	// Creates a new node and add it to the list. This `public` function can be
	// invoked with one or two arguments. When a single argument is passed, 
	// that argument is treated as an `item` which is enclosed in the node and 
	// the node is added to the LinkedList, i.e.,
	// add(item)
	// When two arguments are passed, the first argument is treated as the 
	// `index` where the node will be added. The second argument is treated as 
	// the `item` which is added to the LinkedList, i.e.,
	// add(index, item) 
	function add(args) {
		// Call the appropriate private function based on the number of 
		// arguments.
		if (arguments.length == 1) {
			var item = arguments[0];
			return _addElement(item);
		} else if (arguments.length == 2) {
			var index = arguments[0];
			var element = arguments[1];
			return _addElementAtIndex(index, element);
		} else {
			
			return undefined;
		}
	}
	
	// Retreives, but does not remove, the element at the position specified by
	// `index`.
	function _getNode(index)
	{
		// Check if the specified list `index` is valid or not. An index is 
		// valid if and only if it is greater than 0 and less than the number 
		// of items in the list.
		if (index === undefined || index < 0 || index >= _numberOfElements)
			return undefined;
		
		// To speed up the retrieval of the last element in the list without
		// traversing to the end.	
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
	
	// Removes the node at the position specified by `index` from the list and
	// return the element (data) of that node.
	function remove(index) {
		if (0 > index || index >= _numberOfElements || 0 === _numberOfElements )
			return undefined;
		// If the index is not intialized, remove the first node.
		if (index === undefined)
			index = 0;
			
		// Represents the data value of removed node to be returned.
		var element = undefined;
		
		if (0 === index) { 
			// Remove the first node.
			var oldHead = _head;
			_head = _head.next;
			element = oldHead.element;
		} else if (_numberOfElements-1 === index) { 
			// Remove the last node.
			var ancestorOfTail = _getNode(index-1);
			ancestorOfTail.next = null;
			var oldTail = _tail;
			_tail = ancestorOfTail;
			element = oldTail.element;
		} else {
			// Remove the node at the `index`.
			var previousNode = _getNode(index-1);
			var currentNode = _getNode(index);
			previousNode.next = currentNode.next;
			element = currentNode.element;
		}
		_numberOfElements--;
		return element;
	}
	
	// Removes the first node, also called head, of this list.
	function removeFirst() {
		return remove(0);
	}
	
	// Removes the last node, also called tail, of this list.
	function removeLast() {
		return remove(_numberOfElements-1);
	}
	
	// Clear the list by resetting the `_head` and `_tail` pointers and setting
	// `_numberOfElements` to 0.
	function clear()
	{
		_head = null;
		_tail = null;
		_numberOfElements = 0;	
	}
	
	// Create a new node which stores the `item` in the data field, called 
	// `element`. The reference to the `next` node is set to `null`.
	function _createNode(item)
	{
		if (item === undefined) {
			return undefined;
		}
		return {
			element: item, 
			next: null		
		}
	}
	// Return the size of the LinkedList.
	function size()
	{
		return _numberOfElements;
	}
	
	// Return an array containing all of the elements in this list in proper 
	// sequence (from first to last element).
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
	
	// Expose the public API of this module.
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
	
}());