export const ObjectReplaceRecursive = (...args: any[]) => {
  const assertMinLengthOf = (elements: any[], length: number) => {
    if (elements.length < length) {
      throw new Error(`There should be at least ${length} arguments passed to replaceRecursive()`);
    }
  };

  const objectDeepCloneFn = (object: any, objectDeepClone: any) => {
    for (const property in object) {
      if (object.hasOwnProperty(property)) {
        objectDeepClone[property] = object[property];
      }
    }
  };

  const arrayDeepCloneFn = (object: any, objectDeepClone: any) => {
    for (const property in object) {
      if (object.hasOwnProperty(property)) {
        objectDeepClone.push(object[property]);
      }
    }
  };

  assertMinLengthOf(args, 2);

  let objectReplace: any[string] | { [key: string]: any };
  const objectProperty = Object.prototype.toString.call(args[0]);

  switch (objectProperty) {
    case '[object Array]':
      arrayDeepCloneFn(args[0], (objectReplace = []));
      break;
    case '[object Object]':
      objectDeepCloneFn(args[0], (objectReplace = {}));
      break;
    default:
      throw new TypeError(
        'Arguments passed to ReplaceRecursive() does not have property [object Array]|[object CustomObject]',
      );
  }

  for (let index = 1; index < args.length; index++) {
    for (const property in args[index]) {
      if (args[index].hasOwnProperty(property)) {
        if (objectReplace[property] && typeof objectReplace[property] === 'object') {
          objectReplace[property] = ObjectReplaceRecursive(objectReplace[property], args[index][property]);
        } else {
          objectReplace[property] = args[index][property];
        }
      }
    }
  }

  return objectReplace;
};
