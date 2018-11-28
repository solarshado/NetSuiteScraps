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

	function makeDelegator(eventName, hasReturn) {
		var delegateHandlers = [];

		for(var delegate of delegates)
			if(eventName in delegate && typeof delegate[eventName] === "function")
				delegateHandlers.push(delegate[eventName]);

		return hasReturn ?
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

	return {
		pageInit: makeDelegator("pageInit", false),
		fieldChanged: makeDelegator("fieldChanged", false),
		postSourcing: makeDelegator("postSourcing", false),
		sublistChanged: makeDelegator("sublistChanged", false),
		lineInit: makeDelegator("lineInit", false),
		validateField: makeDelegator("validateField", true),
		validateLine: makeDelegator("validateLine", true),
		validateInsert: makeDelegator("validateInsert", true),
		validateDelete: makeDelegator("validateDelete", true),
		saveRecord: makeDelegator("saveRecord", true)
	};
});
