const CANVAS_DIMENSIONS = new Map([
  [
    'A4',
    {
      name: 'A4',
      height: '210mm',
      width: '297mm',
    },
  ],
  [
    'A3',
    {
      name: 'A3',
      height: '297mm',
      width: '420mm',
    },
  ],
  [
    'A2',
    {
      name: 'A2',
      height: '420mm',
      width: '594mm',
    },
  ],
  [
    'A1',
    {
      name: 'A1',
      height: '594mm',
      width: '841mm',
    },
  ],
  [
    'custom',
    {
      name: 'Custom',
      height: 'auto',
      width: 'auto',
    },
  ],
  [
    'screen',
    {
      name: 'Screen size',
      height: '100%',
      width: '100%',
    },
  ],
]);

export default CANVAS_DIMENSIONS;
