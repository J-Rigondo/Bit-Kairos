export const limitDigit = (value, d = 10) => {
  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
  const digits = d - Math.round(Math.log10(parsedValue));
  const fixed = value.toFixed(digits > d ? d : digits);
  const float = parseFloat(fixed);
  if (float > 1000) {
    return float.toLocaleString();
  }
  return fixed;
};
