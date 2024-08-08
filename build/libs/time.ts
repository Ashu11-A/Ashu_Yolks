export function timestamp (start: string, end: string): string {
  const startTime = new Date(start)
  const endTime = new Date(end)

  const differenceInSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)

  const minutes = Math.floor(differenceInSeconds / 60);
  const seconds = differenceInSeconds % 60;

  return `${minutes} min${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}`;

}