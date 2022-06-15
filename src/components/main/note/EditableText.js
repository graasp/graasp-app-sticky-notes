import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';
// import ResizableText from './ResizableText';
import EditableTextInput from './EditableTextInput';

// const HEIGHT_MARGIN_TEXT = 20;

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
      onResize,
      onContentResize,
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

    const h = ref?.current?.height();
    const w = width;

    useEffect(() => {
      if (h && w) {
        onContentResize(null, h);
      }
    }, [h, w]);

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
      <Text
        ref={ref}
        x={x}
        y={y}
        text={text}
        fill="black"
        fontFamily="sans-serif"
        fontSize={24}
        perfectDrawEnabled={false}
        onTransform={onResize}
        onClick={onToggleTransform}
        onTap={onToggleTransform}
        onDblClick={onToggleEdit}
        onDblTap={onToggleEdit}
        width={width}
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
  onResize: PropTypes.func.isRequired,
  onContentResize: PropTypes.func.isRequired,
  text: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

EditableText.defaultProps = {
  text: 'Edit me...',
};

export default EditableText;
