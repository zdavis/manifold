import {expect} from 'chai';
import {currentTextSelector} from '../../src/selectors/text'

describe('currentTextSelector', () => {

  it('selects the correct text from the route param', () => {
    const text = {}
    const state = {
      router: { params: { textId: 1 }},
      entities: { texts: { 1: text }}
    }
    expect(currentTextSelector(state)).to.equal(text)
  });

});