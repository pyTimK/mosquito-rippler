function formatNumber(x: number): string {
  if (Number.isInteger(x)) {
    return x.toString(); // Convert integer to string without decimal places
  } else {
    return x.toFixed(2); // Convert float to string with up to two decimal places
  }
}

export default formatNumber;

export function toZeroIfNAN(value: any) {
  if (isNaN(value)) {
    return 0;
  } else {
    return Number(value);
  }
}
