const shades = [
  50,
  ...Array.from({ length: 9 }).map((_, i) => (i + 1) * 100),
  950,
];

// Pre-calculated chroma values for consistent saturation across shades
// const chromaValues: Record<number, number> = {
//   50: 0.0114,
//   100: 0.0331,
//   200: 0.0774,
//   300: 0.1275,
//   400: 0.1547,
//   500: 0.1355,
//   600: 0.1164,
//   700: 0.0974,
//   800: 0.0782,
//   900: 0.0588,
//   950: 0.0491,
// };

// Pre-calculated lightness values for consistent lightness across shades
// const lightness = shades.reduce((acc, shade) => {
//   acc[shade] = calculateLightness(shade);
//   return acc;
// }, {} as Record<number, number>);

// const serializeColor = (c: Oklch): string =>
//   `${c.l.toFixed(3)} ${c.c.toFixed(3)} ${c.h?.toFixed(3)}`;

// const oklchConverter = converter("oklch");
// function consistentChroma(shade: number, hue: number) {
//   const color = `oklch(${lightness[shade]} ${chromaValues[shade]} ${hue})`;
//   const oklch = oklchConverter(
//     toGamut(
//       "p3",
//       "oklch",
//       differenceEuclidean("oklch") as unknown as number,
//       0,
//     )(color),
//   );

//   return serializeColor(oklch);
// }

// Calculate the lightness value for each shade
// This creates a perceptually uniform distribution of lightness values
// function calculateLightness(shade: number): number {
//   const highestLightness = 89; // Brightest shade (89%)
//   const lowestLightness = 13; // Darkest shade (13%)
//   const lightnessRange = highestLightness - lowestLightness;

//   // Calculate the relative position of this shade in our scale
//   const shadeDiff = shades[shades.length - 1] - shades[0];
//   const multiplier = (shade - shades[0]) / shadeDiff;

//   // Convert to a decimal between 0 and 1
//   return (
//     (lowestLightness + (highestLightness - lightnessRange * multiplier)) / 100
//   );
// }

export function generateTwClasses(varName: string) {
  return Object.fromEntries(
    shades.map((shade) => {
      return [shade, `oklch(var(--${varName}-${shade}) / <alpha-value>)`];
    }),
  );
}
