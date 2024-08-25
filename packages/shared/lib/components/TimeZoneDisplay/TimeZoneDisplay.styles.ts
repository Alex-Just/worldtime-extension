import type { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  timeZoneWrapper: {
    width: '100%',
    marginBottom: '20px',
    position: 'relative',
  },
  timeZoneHeader: {
    width: '675px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1px',
    position: 'relative',
    paddingRight: '50px',
  },
  cityInfo: {
    textAlign: 'left' as const,
    display: 'flex',
    alignItems: 'center',
  },
  city: {
    fontSize: '16px',
    fontWeight: 400,
    marginRight: '10px',
  },
  info: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#c1c1c1',
  },
  time: {
    fontSize: '16px',
  },
  timeRow: {
    width: '624px',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap' as const,
    height: '24px',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.5em',
    color: 'rgba(0, 0, 0, 0.87)',
    background: 'rgb(227, 242, 253)',
    borderBottom: 'rgb(48, 48, 48)',
  },
  hourContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '26px',
    height: '100%',
    position: 'relative',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  hour: {
    color: '#404040',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    height: '100%',
    boxSizing: 'border-box',
  },
  newDay: {
    color: '#fff',
    fontSize: '9px',
    position: 'absolute' as const,
    top: '80%',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap' as const,
    zIndex: 200, // Increase z-index to ensure it's on top
    padding: '2px 4px',
    borderRadius: '3px',
  },
  highlight: {
    color: '#fff',
  },
  midnightHighlight: {
    // backgroundColor: '#8dc3f6',
  },
  nighttimeHighlight: {
    // backgroundColor: '#b3d6f6',
  },

  buttonsContainer: {
    display: 'flex',
    gap: '8px',
    position: 'absolute',
    right: '-85px', // Align to the right
    top: '145%',
    transform: 'translateY(-50%)',
    visibility: 'hidden', // Managed with hover state
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
  },
};
