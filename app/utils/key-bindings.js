// Home row
export const A_KEY = 65;
export const S_KEY = 83;
export const D_KEY = 68;
export const F_KEY = 70;
export const G_KEY = 71;
export const H_KEY = 72;
export const J_KEY = 74;
export const K_KEY = 75;
export const L_KEY = 76;
export const SEMICOLON_KEY = 186;
export const SINGLE_QUOTE_KEY = 222;

// Top row
export const Q_KEY = 81;
export const W_KEY = 87;
export const E_KEY = 69;
export const R_KEY = 82;
export const T_KEY = 84;
export const Y_KEY = 89;
export const U_KEY = 85;
export const I_KEY = 73;
export const O_KEY = 79;
export const P_KEY = 80;
export const OPEN_BRACKET_KEY = 219;
export const CLOSE_BRACKET_KEY = 221;

/**
 * Map of const name to an object containt data about the computer key including `keyCode` and
 * `keyName`
 */
export const KEY_BINDINGS = {
  A_KEY: {
    keyCode: A_KEY,
    keyName: 'A',
  },
  S_KEY: {
    keyCode: S_KEY,
    keyName: 'S',
  },
  D_KEY: {
    keyCode: D_KEY,
    keyName: 'D',
  },
  F_KEY: {
    keyCode: F_KEY,
    keyName: 'F',
  },
  G_KEY: {
    keyCode: G_KEY,
    keyName: 'G',
  },
  H_KEY: {
    keyCode: H_KEY,
    keyName: 'H',
  },
  J_KEY: {
    keyCode: J_KEY,
    keyName: 'J',
  },
  K_KEY: {
    keyCode: K_KEY,
    keyName: 'K',
  },
  L_KEY: {
    keyCode: L_KEY,
    keyName: 'L',
  },
  SEMICOLON_KEY: {
    keyCode: SEMICOLON_KEY,
    keyName: ';',
  },
  SINGLE_QUOTE_KEY: {
    keyCode: SINGLE_QUOTE_KEY,
    keyName: '\'',
  },
  Q_KEY: {
    keyCode: Q_KEY,
    keyName: 'Q',
  },
  W_KEY: {
    keyCode: W_KEY,
    keyName: 'W',
  },
  E_KEY: {
    keyCode: E_KEY,
    keyName: 'E',
  },
  R_KEY: {
    keyCode: R_KEY,
    keyName: 'R',
  },
  T_KEY: {
    keyCode: T_KEY,
    keyName: 'T',
  },
  Y_KEY: {
    keyCode: Y_KEY,
    keyName: 'Y',
  },
  U_KEY: {
    keyCode: U_KEY,
    keyName: 'U',
  },
  I_KEY: {
    keyCode: I_KEY,
    keyName: 'I',
  },
  O_KEY: {
    keyCode: O_KEY,
    keyName: 'O',
  },
  P_KEY: {
    keyCode: P_KEY,
    keyName: 'P',
  },
  OPEN_BRACKET_KEY: {
    keyCode: OPEN_BRACKET_KEY,
    keyName: '[',
  },
  CLOSE_BRACKET_KEY: {
    keyCode: CLOSE_BRACKET_KEY,
    keyName: ']',
  },
};

/**
 * All the keys in the home row
 */
export const HOME_ROW = [
  KEY_BINDINGS.A_KEY,
  KEY_BINDINGS.S_KEY,
  KEY_BINDINGS.D_KEY,
  KEY_BINDINGS.F_KEY,
  KEY_BINDINGS.G_KEY,
  KEY_BINDINGS.H_KEY,
  KEY_BINDINGS.J_KEY,
  KEY_BINDINGS.K_KEY,
  KEY_BINDINGS.L_KEY,
  KEY_BINDINGS.SEMICOLON_KEY,
  KEY_BINDINGS.SINGLE_QUOTE_KEY
];

/**
 * Export all the keys in the top row
 */
export const TOP_ROW = [
  KEY_BINDINGS.Q_KEY,
  KEY_BINDINGS.W_KEY,
  KEY_BINDINGS.E_KEY,
  KEY_BINDINGS.R_KEY,
  KEY_BINDINGS.T_KEY,
  KEY_BINDINGS.Y_KEY,
  KEY_BINDINGS.U_KEY,
  KEY_BINDINGS.I_KEY,
  KEY_BINDINGS.O_KEY,
  KEY_BINDINGS.P_KEY,
  KEY_BINDINGS.OPEN_BRACKET_KEY,
  KEY_BINDINGS.CLOSE_BRACKET_KEY
];
