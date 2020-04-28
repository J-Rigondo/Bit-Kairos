import React, { Component } from 'react';
import styles from './Selector.scss';
import className from 'classnames/bind';
import onClickOutside from 'react-onclickoutside';
import { TiArrowSortedDown } from 'react-icons/ti';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const cx = className.bind(styles);

const SelectorOption = ({ children, value, onClick }) => {
  return (
    <div className={cx('selector-option')} onClick={onClick}>
      {children}
    </div>
  );
};

class Options extends Component {
  handleClickOutside = (evt) => {
    const { onClose } = this.props;
    onClose();
  };

  handleSelect = (value) => {
    const { onSelect, onClose } = this.props;
    onSelect(value);
    onClose();
  };

  render() {
    const { options, onSelect } = this.props;

    const optionList = options.map(({ name, text }) => (
      <SelectorOption
        key={name}
        name={name}
        onClick={() => this.handleSelect(name)}
      >
        {text}
      </SelectorOption>
    ));

    return <div className={cx('options')}>{optionList}</div>;
  }
}

Options = onClickOutside(Options);

class Selector extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { open } = this.state;
    const { handleOpen, handleClose } = this;
    const { options, sortBy, onSelect } = this.props;
    const selected = options.find((option) => option.name === sortBy);

    return (
      <div className={cx('selector-wrapper')}>
        <div className={cx('selector')} onClick={handleOpen}>
          {selected.text}
          <TiArrowSortedDown />
        </div>
        <CSSTransitionGroup
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
          transitionName={{
            enter: cx('options-enter'),
            leave: cx('options-leave')
          }}
        >
          {open && (
            <Options
              eventTypes={['click', 'touchend']}
              onClose={handleClose}
              options={options}
              onSelect={onSelect}
            />
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Selector;
