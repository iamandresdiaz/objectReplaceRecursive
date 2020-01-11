const objectReplaceRecursive = require('../index.js');

test('It throws an Error when arguments min length are invalid', () => {
    expect(() => objectReplaceRecursive({})).toThrowError('There should be at least 2 arguments passed to replaceRecursive()');
});

test('It throws an Error when the first argument have an unexpected property', () => {
    expect(() => objectReplaceRecursive(2, {})).toThrowError('Arguments passed to ReplaceRecursive() does not have property [object Array]|[object CustomObject]');
});


test('It replace properties of the first argument with the information of the second', () => {
    const object = objectReplaceRecursive(
        {
            "citrus": ["orange"],
            "berries": ["blackberry", "raspberry"],
            "datetime": "2020-01-10T00:00:00"
        },
        {
            "citrus": ["pineapple"],
            "berries": ["blueberry"],
            "other": {
                "citrus": ["pineapple"],
                "berries": ["blueberry"],
                "other": {
                    "citrus": ["pineapple"],
                    "berries": ["blueberry"]
                }
            },
            "datetime": "2020-01-11T00:00:00"
        }
    );

    const expectedObject = {
        "citrus": ["pineapple"],
        "berries": ["blueberry", "raspberry"],
        "other": {
            "citrus": ["pineapple"],
            "berries": ["blueberry"],
            "other": {
                "citrus": ["pineapple"],
                "berries": ["blueberry"]
            }
        },
        "datetime": "2020-01-11T00:00:00"
    };

    expect(object).toStrictEqual(expectedObject);
});