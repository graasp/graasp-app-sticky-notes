import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Html } from 'react-konva-utils';
import PropTypes from 'prop-types';
import { SMALL_DELAY_REFOCUS_MS } from '../../../constants/constants';

function getStyle(width, height) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: 'none',
    padding: '0px',
    margin: '0px',
    background: 'none',
    outline: 'none',
    resize: 'none',
    colour: 'black',
    fontSize: '24px',
    fontFamily: 'sans-serif',
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: '-4px',
  };
}

const EditableTextInput = forwardRef(
  ({ x, y, width, height, value, onChange, onKeyDown }, ref) => {
    const style = getStyle(width, height);

    const textInput = useRef();

    const focusOnText = () => {
      textInput.current.focus();
    };

    useImperativeHandle(ref, () => ({
      focus: focusOnText,
    }));

    return (
      <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          style={style}
          ref={textInput}
          onBlur={() => {
            setTimeout(focusOnText, SMALL_DELAY_REFOCUS_MS); // Need a small delay before refocusing.
          }}
        />
      </Html>
    );
  },
);

EditableTextInput.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default EditableTextInput;
