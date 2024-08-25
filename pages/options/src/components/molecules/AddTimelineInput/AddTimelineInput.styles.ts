import type { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  addTimelineContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  timelineForm: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    height: '50px',
  },
  autocompleteRoot: {
    flexBasis: '40%',
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '24px',
  },
  optionOffset: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
  },
  inputProps: {
    height: '50px',
  },
  inputLabelProps: {},
  textField: {
    height: '50px',
    flex: 1,
  },
  button: {
    height: '50px',
  },
};
