import DOMPurify from 'dompurify';

import React, { forwardRef, useRef } from 'react';

import EditableTextInput, {
  EditableTextInputRefType,
} from './EditableTextInput';
import './note_style.css';

const RETURN_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

interface EditableTextProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onChange: (t: string) => void;
  text: string;
}

const EditableText = forwardRef<EditableTextInputRefType, EditableTextProps>(
  (props: EditableTextProps, ref): JSX.Element => {
    const { isEditing, onToggleEdit, onChange, text } = props;
    const htmlContainer = useRef<HTMLDivElement>(null);
    const cleanText = DOMPurify.sanitize(text, {
      USE_PROFILES: { html: true },
      RETURN_DOM_FRAGMENT: true,
    });

    cleanText.querySelectorAll('a').forEach((a) => {
      a?.setAttribute('target', '_blank');
      a?.setAttribute('rel', 'noopener noreferrer');
    });

    const content = document.createElement('div');
    content.appendChild(cleanText);

    const handleEscapeKeys = (e: React.KeyboardEvent): void => {
      if ((e.key === RETURN_KEY && e.shiftKey) || e.key === ESCAPE_KEY) {
        onToggleEdit();
      }
    };

    const handleTextChange = (e: string): void => {
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
        dangerouslySetInnerHTML={{ __html: content.innerHTML }}
      />
    );
  },
);

EditableText.displayName = 'EditableText';

export default EditableText;
