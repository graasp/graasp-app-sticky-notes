import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import EditableTextInput from './EditableTextInput';

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

const EditableText = forwardRef(
  ({ isEditing, onToggleEdit, onToggleTransform, onChange, text }, ref) => {
    const htmlContainer = useRef();
    const cleanText = DOMPurify.sanitize(text, {
      USE_PROFILES: { html: true },
    });

    const handleEscapeKeys = (e) => {
      if (
        (e.keyCode === RETURN_KEY && e.shiftKey) ||
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: cleanText }}
      />
    );
  },
);

EditableText.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleTransform: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
};

EditableText.defaultProps = {
  text: 'Edit me...',
};

export default EditableText;
