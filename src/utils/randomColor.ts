// returns a random bright color as 0xRRGGBB
export function randomColor(): number {
  // Keep colors reasonably saturated and visible on dark background
  const hue = Math.random() * 360;
  const saturation = 0.7 + Math.random() * 0.3;
  const lightness = 0.45 + Math.random() * 0.25;
  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h: number, s: number, l: number): number {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number): number => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return (f(0) << 16) | (f(8) << 8) | f(4);
}
