import { promises as fs } from "fs";
import path from "path";

function processArgs() {
  // 포지션에 따라 값의 해석이 달라진다.
  const args = process.argv.slice(2);

  // check condition
  if (args.length < 2) {
    console.error("Usage: tw.ts <baseName> <hue>");
    process.exit(1);
  }

  const baseName = args[0];
  const hue = parseInt(args[1]);

  return { baseName, hue };
}

// Define the shade values we'll use to generate our color palette
// These numbers represent different brightness levels
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Helper function to create CSS variable names
function makeVariable({
  name,
  shade,
}: {
  name: string;
  shade: number;
}): string {
  return `--${name}-${shade}`;
}

// Calculate the lightness value for each shade
// This creates a perceptually uniform distribution of lightness values
function calculateLightness(shade: number): number {
  const highestLightness = 89; // Brightest shade (89%)
  const lowestLightness = 13; // Darkest shade (13%)
  const lightnessRange = highestLightness - lowestLightness;

  // Calculate the relative position of this shade in our scale
  const shadeDiff = shades[shades.length - 1] - shades[0];
  const multiplier = (shade - shades[0]) / shadeDiff;

  // Convert to a decimal between 0 and 1
  return (
    (lowestLightness + (highestLightness - lightnessRange * multiplier)) / 100
  );
}

// Pre-calculated chroma values for consistent saturation across shades
const chromaValues: Record<number, number> = {
  50: 0.0114,
  100: 0.0331,
  200: 0.0774,
  300: 0.1275,
  400: 0.1547,
  500: 0.1355,
  600: 0.1164,
  700: 0.0974,
  800: 0.0782,
  900: 0.0588,
  950: 0.0491,
};

// Generate a color in OKLCH format
function generateColor(
  shade: number,
  hue: number,
  mode: "bright" | "consistent" = "consistent",
  withFn: boolean = false,
): string {
  const lightness = calculateLightness(shade);

  // For bright mode, we use a higher chroma value
  const chroma = mode === "bright" ? 0.4 : chromaValues[shade];

  // Return the color in OKLCH format
  return withFn
    ? `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(3)});`
    : `${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(3)};`;
}

// Main function to generate CSS variables
function generateColorVariables(options: {
  baseName: string;
  hue: number;
  mode?: "bright" | "consistent";
}): Array<[string, string]> {
  const { baseName, hue, mode = "consistent" } = options;

  // Return array of tuple
  return shades.map((shade) => [
    makeVariable({ name: baseName, shade }),
    generateColor(shade, hue, mode),
  ]);
}

function logColors(colors: Array<[string, string]>) {
  colors.forEach(([name, value]) => {
    console.log(`${name}: ${value}`);
  });
}

async function updateGlobalsCss(newColors: Array<[string, string]>) {
  const globalsPath = path.join(process.cwd(), "src", "app", "globals.css");

  try {
    const content = await fs.readFile(globalsPath, "utf-8");
    console.log("content", content);

    // Find the :root section
    const rootStart = content.indexOf(":root {");
    if (rootStart === -1) {
      throw new Error("Could not find :root section in globals.css");
    }

    const rootEnd = content.indexOf("}", rootStart);
    const beforeRoot = content.slice(0, rootStart + 7); // Include ":root {"
    const afterRoot = content.slice(rootEnd);

    // Extract existing CSS variables
    const rootContent = content.slice(rootStart + 7, rootEnd);
    const existingVars = new Map(
      rootContent
        .split("\n")
        .map((line) => line.trim())
        // pick only css variables
        .filter((line) => line.startsWith("--"))
        // extract name and value
        .map((line) => {
          const [name, value] = line.split(": ");
          return [name, value];
        }),
    );

    // Update or add new variables
    for (const [name, value] of newColors) {
      existingVars.set(name, value);
    }

    // Generate updated CSS variables
    const updatedVars = Array.from(existingVars.entries())
      // normalize name
      .map(([name, value]) => `  ${name}: ${value}`)
      // merge lines
      .join("\n");

    // Combine everything
    const updatedContent = `${beforeRoot}\n${updatedVars}\n${afterRoot}`;

    // Write back to the file
    await fs.writeFile(globalsPath, updatedContent, "utf-8");
    console.log("Successfully updated globals.css");
  } catch (error) {
    console.error("Error updating globals.css:", error);
    process.exit(1);
  }
}

// Modify the main execution
const colors = generateColorVariables(processArgs());
logColors(colors);
await updateGlobalsCss(colors);
