/* eslint-disable no-unused-vars */
import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
// import ResizableText from './ResizableText';
import EditableTextInput from './EditableTextInput';

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

const EditableText = forwardRef(
  (
    {
      x,
      y,
      isEditing,
      onToggleEdit,
      onToggleTransform,
      onChange,
      text,
      width,
      height,
    },
    ref,
  ) => {
    const htmlContainer = useRef();
    const cleanText = DOMPurify.sanitize(text, {
      USE_PROFILES: { html: true },
    });

    const handleEscapeKeys = (e) => {
      if (
        (e.keyCode === RETURN_KEY && !e.shiftKey) ||
        e.keyCode === ESCAPE_KEY
      ) {
        onToggleEdit(e);
      }
    };

    const handleTextChange = (e) => {
      onChange(e);
    };

    if (isEditing) {
      return (
        <EditableTextInput
          ref={ref}
          x={x}
          y={y}
          width={width}
          height={height}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleEscapeKeys}
        />
      );
    }
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        ref={htmlContainer}
        onClick={onToggleTransform}
        onTap={onToggleTransform}
        onDblClick={onToggleEdit}
        onDblTap={onToggleEdit}
        dangerouslySetInnerHTML={{ __html: cleanText }}
      />
    );
  },
);

EditableText.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleTransform: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

EditableText.defaultProps = {
  text: 'Edit me...',
};

export default EditableText;
