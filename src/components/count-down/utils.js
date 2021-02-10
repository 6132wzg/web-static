const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// 补零
export function padZero(num, targetLength = 2) {
  let str = `${num}`;
  while (str.length < targetLength) {
    str = `0${str}`;
  }
  return str;
}

// 拆分时间 天时分秒毫秒
export function parseTimeData(time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    days: padZero(days),
    hours: padZero(hours),
    minutes: padZero(minutes),
    seconds: padZero(seconds),
    milliseconds: padZero(milliseconds, 3)
  };
}

// 格式化时间
export function parseFormat(format, timeData, isShowZeroDays) {
  const { days } = timeData;
  let {
    hours, minutes, seconds, milliseconds
  } = timeData;

  if (format.indexOf('DD') === -1) {
    if (days !== '00') {
      hours += days * 24;
    }
  } else {
    format = format.replace('DD', days);
    if (!isShowZeroDays) {
      format = format.replace('00:', '');
    }
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', hours);
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', minutes);
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', seconds);
  }

  if (format.indexOf('S') !== -1) {
    const ms = milliseconds;

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms);
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }
  return format;
}

export function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
