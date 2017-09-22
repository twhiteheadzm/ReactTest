var chai=require('chai');
var assert = chai.assert;

describe('getSuggestions', function() {
    it('Check API returns a result', function() {
        assert.equal(getSuggestions('apple', []));
    });
});


