import { EnumBtn } from '..';
import { shallow } from 'enzyme';
import React from 'react';

const wrapper = shallow(<EnumBtn value={0} enumList={[{text: 'x', value: 0}]} title="enumlist"/>);

describe('component APP test', () => {
  it('测试hello world', () => {
    expect(wrapper.find('.iotp-enum-btn-title span').text()).toBe('enumlist');
  });
});

