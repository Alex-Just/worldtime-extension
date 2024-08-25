function adjustColorLightness(hex: string, amount: number): string {
  const hexToDecimal = (hex: string): number => parseInt(hex, 16);
  const decimalToHex = (dec: number): string => dec.toString(16).padStart(2, '0');

  const r = hexToDecimal(hex.slice(1, 3));
  const g = hexToDecimal(hex.slice(3, 5));
  const b = hexToDecimal(hex.slice(5, 7));

  const newR = Math.round(r + (255 - r) * (amount / 100));
  const newG = Math.round(g + (255 - g) * (amount / 100));
  const newB = Math.round(b + (255 - b) * (amount / 100));

  return `#${decimalToHex(newR)}${decimalToHex(newG)}${decimalToHex(newB)}`.toUpperCase();
}

export default adjustColorLightness;
