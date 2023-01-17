export function ansiWordBound(c: string) {
  return ' ' === c || '\n' === c || '\r' === c || '\t' === c;
}

interface IReadTimeOptions {
  wordsPerMinute: number;
  wordBound(c: string): boolean;
}

export interface IReadTime {
  text: string;
  minutes: number;
  seconds: number;
  time: number;
  words: number;
}

export function getReadingTime(
  text: string,
  options: IReadTimeOptions = {
    wordBound: ansiWordBound,
    wordsPerMinute: 200
  }
): IReadTime {
  const { wordBound, wordsPerMinute } = options;
  let words = 0;
  let start = 0;
  let end = text.length - 1;
  // fetch bounds
  while (wordBound(text[start])) {
    start++;
  }
  while (wordBound(text[end])) {
    end--;
  }

  // calculate the number of words
  for (let i = start; i <= end; ) {
    while (i <= end && !wordBound(text[i])) {
      i++;
    }
    words++;
    while (i <= end && wordBound(text[i])) {
      i++;
    }
  }

  // reading time stats
  const minutes = words / wordsPerMinute;
  const seconds = minutes * 60;
  const time = minutes * 60 * 1000;
  const displayed = Math.ceil(Number(minutes.toFixed(2)));

  return {
    text: `${displayed} min`,
    minutes,
    seconds,
    time,
    words
  };
}
