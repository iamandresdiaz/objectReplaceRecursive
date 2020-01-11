'use strict';

function objectReplaceRecursive() {
    function assertMinLengthOf(args, length) {
        if (args.length < length) {
            throw new Error('There should be at least ' + length + ' arguments passed to replaceRecursive()');
        }
    }

    function objectDeepCloneFn(object, objectDeepClone) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                objectDeepClone[property] = object[property];
            }
        }
    }

    function arrayDeepCloneFn(object, objectDeepClone) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                objectDeepClone.push(object[property]);
            }
        }
    }

    assertMinLengthOf(arguments, 2);

    var objectReplace;
    var objectProperty = Object.prototype.toString.call(arguments[0]);

    switch (objectProperty) {
        case '[object Array]':
            arrayDeepCloneFn(arguments[0], objectReplace = []);
            break;
        case '[object Object]':
            objectDeepCloneFn(arguments[0], objectReplace = {});
            break;
        default:
            throw new Error('Arguments passed to ReplaceRecursive() does not have property [object Array]|[object CustomObject]');
    }

    for (var index = 1; index < arguments.length; index++) {
        for (var property in arguments[index]) {
            if (arguments[index].hasOwnProperty(property)) {
                if (objectReplace[property] && typeof objectReplace[property] === 'object') {
                    objectReplace[property] = objectReplaceRecursive(objectReplace[property], arguments[index][property]);
                } else {
                    objectReplace[property] = arguments[index][property];
                }
            }
        }
    }

    return objectReplace;
}

module.exports = objectReplaceRecursive;