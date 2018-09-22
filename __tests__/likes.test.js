import MockAsyncStorage from 'mock-async-storage';

const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}

mock();

import {attachLikeInfo, setLikedImages} from '../src/helpers/likes-helper'

test('should attach liked flag property to the array of cat objects', async () => {

    const data = [{
        id: '1',
        source_url: 'aaaa',
        url: 'https://jestjs.io/docs/en/getting-started.html'
    }, {
        id: '2',
        source_url: 'bbbb',
        url: 'https://medium.com/react-native-training/learning-to-test-react-native-with-jest-part-1-f782c4e30101'
    }, {
        id: '3',
        source_url: 'cccc',
        url: 'https://www.npmjs.com/package/mock-async-storage'
    }];

    const liked = [{
        url: 'https://jestjs.io/docs/en/getting-started.html'
    }, {
        url: 'https://stackoverflow.com/questions/40952566/how-to-test-async-storage-with-jest'
    }];

    await setLikedImages(liked)

    const expected = [{
        id: '1',
        source_url: 'aaaa',
        url: 'https://jestjs.io/docs/en/getting-started.html',
        liked: true
    }, {
        id: '2',
        source_url: 'bbbb',
        url: 'https://medium.com/react-native-training/learning-to-test-react-native-with-jest-part-1-f782c4e30101',
        liked: false
    }, {
        id: '3',
        source_url: 'cccc',
        url: 'https://www.npmjs.com/package/mock-async-storage',
        liked: false
    }];
    const actual = await attachLikeInfo(data);

    expect(actual).toEqual(expected)
});