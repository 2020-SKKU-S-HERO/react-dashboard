export function abbreviateNumber(num: number): string {
  let abbreviatedNum: number;
  let abbreviatedStr: string;
  let unit: string;
  
  if (num >= 1000000000) {
    abbreviatedNum = num / 1000000000;
    unit = 'B';
  } else if (num >= 1000000) {
    abbreviatedNum = num / 1000000;
    unit = 'M';
  } else if (num >= 1000) {
    abbreviatedNum = num / 1000;
    unit = 'K';
  } else if (num > 0) {
    abbreviatedNum = num;
    unit = '';
  } else {
    return '0';
  }
  
  abbreviatedStr = abbreviatedNum.toFixed(2);
  
  if (abbreviatedStr.length >= 6) {
    abbreviatedStr = abbreviatedStr.replace(/\.(\S*)/, '');
  } else if (abbreviatedStr.length === 5) {
    abbreviatedStr = Number(abbreviatedStr).toFixed(1);
  }
  
  return abbreviatedStr + unit;
}