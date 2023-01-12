interface PrimitiveColor {
  r: number;
  g: number;
  b: number;
}

export const lighten = (hexColor: string, percentage: number): string => {
  const R = parseInt(hexColor.substring(1, 3), 16);
  const G = parseInt(hexColor.substring(3, 5), 16);
  const B = parseInt(hexColor.substring(5, 7), 16);
  const curr_total_dark = 255 * 3 - (R + G + B);

  // calculate how much of the current darkness comes from the different channels
  const RR = (255 - R) / curr_total_dark;
  const GR = (255 - G) / curr_total_dark;
  const BR = (255 - B) / curr_total_dark;

  // calculate how much darkness there should be in the new color
  const new_total_dark = (255 - 255 * (percentage / 100)) * 7;

  // make the new channels contain the same % of available dark as the old ones did
  const NR = 255 - Math.round(RR * new_total_dark);
  const NG = 255 - Math.round(GR * new_total_dark);
  const NB = 255 - Math.round(BR * new_total_dark);

  const RO =
    NR.toString(16).length === 1 ? '0' + NR.toString(16) : NR.toString(16);
  const GO =
    NG.toString(16).length === 1 ? '0' + NG.toString(16) : NG.toString(16);
  const BO =
    NB.toString(16).length === 1 ? '0' + NB.toString(16) : NB.toString(16);

  return '#' + RO + GO + BO;
};

export const getRGBString = (color: PrimitiveColor): string => {
  if (typeof color === 'undefined' || !color) return '';
  const { r, g, b } = color;
  return `rgb(${r}, ${g}, ${b})`;
};

export const getRGBAString = (color: PrimitiveColor, alpha = 1): string => {
  const rgb = getRGBString(color);
  return rgb.replace('rgb', 'rgba');
};

export const primitiveToHex = ({ r, g, b }: PrimitiveColor): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const hexToPrimitive = (hex: string): PrimitiveColor | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export class Colors {
  public static palette = {
    dark: '#171923',
    deep_blue: '#142848',
    cinnamon: '#81332D',
    pumpkin: '#C55530',
    light: '#D8EBF4',
    ocean: '#00a6fb',
    forest: '#6b8f71'
  };
}
