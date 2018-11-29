/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["myCustomScriptOne","myCustomScriptTwo"], function(delegateOne,delegateTwo) {
	// myCustomScriptOne and myCustomScriptTwo are normal client scripts

	//var delegates = Array.from(arguments);
	// if Array.from isn't supported:
	//var delegates = Array.prototype.slice.call(arguments);
	// unfortunate last resort:
	//var delegates = [delegateOne,delegateTwo];

	// this should work...
	var delegates = (Array.from || Array.prototype.slice.call)(arguments);

	// Note: returns undef if no delegates appear to be interested in the named event
	function makeDelegator(eventName, hasReturn) {
		var delegateHandlers = [];

		for(var delegate of delegates)
			if(eventName in delegate && typeof delegate[eventName] === "function")
				delegateHandlers.push(delegate[eventName]);

		return delegateHandlers.length === 0 ? undefined :
			hasReturn ?
			function delegatorWithoutReturn(param) {
				for(var handler of delegateHandlers)
					handler(param);
			} :
			function delegatorWithReturn(param) {
				for(var handler of delegateHandlers)
					if(!handler(param))
						return false;
					// else continue looping
				// all delegates returned true, so
				return true;
			};
	}

	// this may make it easier to generalize this code for other script types
	var events = [
		{name: "pageInit", hasReturn: false},
		{name: "fieldChanged", hasReturn: false},
		{name: "postSourcing", hasReturn: false},
		{name: "sublistChanged", hasReturn: false},
		{name: "lineInit", hasReturn: false},
		{name: "validateField", hasReturn: true},
		{name: "validateLine", hasReturn: true},
		{name: "validateInsert", hasReturn: true},
		{name: "validateDelete", hasReturn: true},
		{name: "saveRecord", hasReturn: true},
	];

	var retVal = {};
	for(var event of events) {
		var handler = makeDelegator(event.name, event.hasReturn);
		if(handler) // don't add undefs, NS might choke on them
			retVal[event.name] = handler;
	}
	return retVal;
});
