import React from 'react';
import { mount } from 'enzyme';
import { Validations, Validation } from '.';

describe('Validations', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Validations
        validateForm={ () => console.log }
        validateField={ () => console.log }
      >
        <div> ED </div>
      </Validations>
    );
  });

  it('error count is incremented when the update function is called with a positive integer', () => {
    expect(wrapper.instance().state.errorCount).toEqual(0);
    wrapper.instance().updateErrorCount(1);
    expect(wrapper.instance().state.errorCount).toEqual(1);
  });

  it('error count is decremented when the update function is called with a negative integer', () => {
    wrapper.instance().updateErrorCount(1);
    expect(wrapper.instance().state.errorCount).toEqual(1);
    wrapper.instance().updateErrorCount(-1);
    expect(wrapper.instance().state.errorCount).toEqual(0);
  });

  it('error count is not decremented below zero', () => {
    expect(wrapper.instance().state.errorCount).toEqual(0);
    wrapper.instance().updateErrorCount(-1);
    expect(wrapper.instance().state.errorCount).toEqual(0);
  });
});
