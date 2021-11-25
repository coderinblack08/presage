export function commaSeparatedToList(input: string): string[] {
  return input.split(",").map((s) => s.trim());
}
