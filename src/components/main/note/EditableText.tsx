import DOMPurify from 'dompurify';

import React, { useRef } from 'react';

import './note_style.css';

interface EditableTextProps {
  text: string;
}

const EditableText = (props: EditableTextProps): JSX.Element => {
  const { text } = props;
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

  // if (isEditing) {
  //   return (
  //     <EditableTextInput
  //       ref={ref}
  //       value={text}
  //       onChange={handleTextChange}
  //       onKeyDown={handleEscapeKeys}
  //     />
  //   );
  // }
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
};

EditableText.displayName = 'EditableText';

export default EditableText;
