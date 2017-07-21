function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  } else if (elapsed < milliSecondsPerMinute) {
    return 'less than a minute ago';
  } else if (elapsed < milliSecondsPerHour) {
    return Math.floor(elapsed/milliSecondsPerMinute) + ' mins ago';
  } else if (elapsed < milliSecondsPerDay) {
    return Math.floor(elapsed/milliSecondsPerHour) + ' hours ago';
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.floor(elapsed/milliSecondsPerDay) + ' days ago'
  } else if (elapsed < milliSecondsPerYear) {
    return Math.floor(elapsed/milliSecondsPerMonth) + ' months ago';
  } else {
    return Math.floor(elapsed/milliSecondsPerYear) + ' years ago';
  }
}


export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const previousDate = new Date(date);
  return timeDifference(now, previousDate);
}