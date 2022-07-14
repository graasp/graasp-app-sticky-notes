import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
// import { SMALL_DELAY_REFOCUS_MS } from '../../../constants/constants';

// function getStyle(width, height) {
//   const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
//   const baseStyle = {
//     width: `${width - 30}px`,
//     height: `${height}px`,
//     border: 'none',
//     padding: '0px',
//     margin: '0px',
//     background: 'none',
//     outline: 'none',
//     resize: 'none',
//     colour: 'black',
//     fontSize: '12px',
//     fontFamily: 'sans-serif',
//   };
//   if (isFirefox) {
//     return baseStyle;
//   }
//   return {
//     ...baseStyle,
//     margintop: '-4px',
//   };
// }

const EditableTextInput = forwardRef(
  ({ value, onChange, onKeyDown }, ref) => {
    // const style = getStyle(width, height);

    const textInput = useRef();
    const htmlContainer = useRef();

    const focusOnText = () => {
      textInput.current.focus();
    };

    const getHeight = () => htmlContainer?.current?.height();

    useImperativeHandle(ref, () => ({
      focus: focusOnText,
      height: getHeight,
    }));

    return (
      <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          // style={style}
          ref={textInput}
        />
    );
  },
);

EditableTextInput.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default EditableTextInput;
