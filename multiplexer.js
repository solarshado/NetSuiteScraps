/**
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
define([], function() {
	/**
	 * Builds a multiplexer that can be returned to NS for the given set of
	 * events using the given delegates.
	 *
	 * @param eventDescriptors an array of {name, hasReturn} objects describing the events to delegate
	 * @param delegates an array of other event-handling modules to delegate to
	 *
	 * @returns an object returnable from a module that can act as an event handler
	 */
	function buildMultiplexer(eventDescriptors, delegates) {
		// Note: returns undef if no delegates appear to be interested in the named event
		function makeDelegator(eventName, hasReturn) {
			var delegateHandlers = [];

			for(var i = 0; i < delegates.length; ++i)
				if(eventName in delegates[i] && typeof delegates[i][eventName] === "function")
					delegateHandlers.push(delegates[i][eventName]);

			return delegateHandlers.length === 0 ? undefined :
				hasReturn ?
				function delegatorWithoutReturn(param) {
					for(var i = 0; i < delegateHandlers.length; ++i)
						delegateHandlers[i](param);
				} :
				function delegatorWithReturn(param) {
					for(var i = 0; i < delegateHandlers.length; ++i)
						if(!delegateHandlers[i](param))
							return false;
						// else continue looping
					// all delegates returned true, so
					return true;
				};
		}

		var retVal = {};
		for(var i = 0; i < events.length; ++i) {
			var handler = makeDelegator(events[i].name, events[i].hasReturn);
			if(handler) // don't add undefs, NS might choke on them
				retVal[events[i].name] = handler;
		}
		return retVal;
	}

	var CLIENT_EVENTS = [
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

	// TODO get descriptor lists for other script types' events

	return {
		"buildMultiplexer": buildMultiplexer,
		"EVENTS": {
			"CLIENT": CLIENT_EVENTS,
			// TODO add other descriptor lists here
		}
	};
});
