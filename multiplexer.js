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

    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     */
    function pageInit(scriptContext) {
        for(var delegate of delegates)
            if("pageInit" in delegate && typeof delegate.pageInit === "function")
                delegate.pageInit(scriptContext);
    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     */
    function fieldChanged(scriptContext) { /* TODO, but same as pageInit */ }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     */
    function postSourcing(scriptContext) { /* TODO, but same as pageInit */ }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     */
    function sublistChanged(scriptContext) { /* TODO, but same as pageInit */ }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     */
    function lineInit(scriptContext) { /* TODO, but same as pageInit */ }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     */
    function validateField(scriptContext) {
        for(var delegate of delegates)
            if("validateField" in delegate && typeof delegate.validateField === "function") {
                // could shorten this, but for the sake of clarity
                var val = delegate.validateField(scriptContext);
                if(!val) return false
                // else continue looping
            }
        // all delegates returned true, so
        return true;
    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     */
    function validateLine(scriptContext) { /* TODO, but same as validateField */ }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     */
    function validateInsert(scriptContext) { /* TODO, but same as validateField */ }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     */
    function validateDelete(scriptContext) { /* TODO, but same as validateField */ }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     *
     * @returns {boolean} Return true if record is valid
     */
    function saveRecord(scriptContext) { /* TODO, but same as validateField */ }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
});