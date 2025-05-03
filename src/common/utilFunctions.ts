export function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}
export const greenConsoleLog = (text: string) =>
  console.log(`\x1b[32m${text}\x1b[0m`);

export const redConsoleLog = (text: string) =>
  console.log(`\x1b[31m${text}\x1b[0m`);
