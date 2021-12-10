import './index.less';
import React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';

const types = {
  switch: 'switch',
  checkbox: 'check',
};
function parseType(type) {
  if (!types[type]) throw new Error('unexpected type');
  return types[type];
}

interface SwitchProps {
  checked: boolean
  onChange: (e: any) => void
  className?: string
  color?: string
  type: 'switch' | 'checkbox'
}

export class Switch extends React.Component<SwitchProps, {checked: boolean}> {
  constructor(props: SwitchProps) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
    this.switchChange = this.switchChange.bind(this);
  }

  switchChange(e) {
    const { onChange } = this.props;
    onChange && onChange({
      ...e,
      detail: {value: e.target.checked}
    });
    this.setState({
      checked: e.target.checked,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('checked')) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  render() {
    const { type = 'switch', className, color } = this.props;
    const cls = classNames(
      {
        [`weui-${parseType(type)}`]: true,
      },
      className,
    );
    let sty;
    if (this.state.checked) {
      sty = {
        borderColor: color || '04BE02',
        backgroundColor: color || '04BE02',
      };
    } else {
      sty = {};
    }
    return (
      <input
        {...omit(this.props, ['className', 'checked', 'onChange'])}
        className={cls}
        checked={this.state.checked}
        type='checkbox'
        onChange={this.switchChange}
        style={sty}
      />
    );
  }
}
