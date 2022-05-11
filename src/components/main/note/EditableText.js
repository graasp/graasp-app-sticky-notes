import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ResizableText from './ResizableText';
import EditableTextInput from './EditableTextInput';

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

const EditableText = forwardRef(
  (
    {
      x,
      y,
      isEditing,
      isTransforming,
      onToggleEdit,
      onToggleTransform,
      onChange,
      onResize,
      text,
      width,
      height,
    },
    ref,
  ) => {
    const handleEscapeKeys = (e) => {
      if (
        (e.keyCode === RETURN_KEY && !e.shiftKey) ||
        e.keyCode === ESCAPE_KEY
      ) {
        onToggleEdit(e);
      }
    };

    const handleTextChange = (e) => {
      onChange(e.currentTarget.value);
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
      <ResizableText
        x={x}
        y={y}
        isSelected={isTransforming}
        onClick={onToggleTransform}
        onDoubleClick={onToggleEdit}
        onResize={onResize}
        text={text}
        width={width}
      />
    );
  },
);

EditableText.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isTransforming: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleTransform: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  text: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

EditableText.defaultProps = {
  text: 'Edit me...',
};

export default EditableText;
