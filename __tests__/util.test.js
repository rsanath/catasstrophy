import {replace} from '../src/helpers/util'

test('should replace the given array with the given replacement item at the given item', () => {
    const arr = [{name: 'ram'}, {name: 'rahul'}, {name: 'narayanan'}]
    const item = {name: 'rahul'}
    const replacement = {name: 'jagadesh'}
    const result = replace(arr, item, replacement)
    const expected = [{name: 'ram'}, {name: 'jagadesh'}, {name: 'narayanan'}]
    expect(result).toEqual(expected)
});