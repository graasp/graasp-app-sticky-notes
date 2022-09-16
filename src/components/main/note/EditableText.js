import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import EditableTextInput from './EditableTextInput';
import './note_style.css';

const RETURN_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

const EditableText = forwardRef(
  ({ isEditing, onToggleEdit, onChange, text }, ref) => {
    const htmlContainer = useRef();
    const cleanText = DOMPurify.sanitize(text, {
      USE_PROFILES: { html: true },
    });

    const handleEscapeKeys = (e) => {
      if ((e.key === RETURN_KEY && e.shiftKey) || e.key === ESCAPE_KEY) {
        onToggleEdit();
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
        // The class content is styled in `note_style.css`
        className="content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: cleanText }}
      />
    );
  },
);

EditableText.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
};

EditableText.defaultProps = {
  text: 'Edit me...',
};

export default EditableText;
