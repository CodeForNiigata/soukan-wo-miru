function calcAverage(values) {
  const length = values.length;
  const total = values.reduce((total, value) => total + value, 0);
  return total / length;
}

function calcStandardDeviation(values) {
  const average = calcAverage(values);
  const length = values.length;
  const sum = values.reduce((total, value) => {
    return total + Math.pow(value - average, 2);
  }, 0);
  return Math.sqrt(sum / length);
}

function calcCovariance(xValues, yValues) {
  const xAverage = calcAverage(xValues);
  const yAverage = calcAverage(yValues);
  const length = xValues.length;
  let total = 0;
  for (let i = 0; i < length; i++) {
    total += (xValues[i] - xAverage) * (yValues[i] - yAverage);
  }
  return total / length;
}

function round(value, digit = 0) {
  const v1 = Math.pow(10, digit);
  const v2 = Math.round(value * v1);
  return v2 / v1;
}

export function calcCorrelation(xValues, yValues) {
  const xStandardDeviation = calcStandardDeviation(xValues);
  const yStandardDeviation = calcStandardDeviation(yValues);
  const covariance = calcCovariance(xValues, yValues);
  return round(covariance / (xStandardDeviation * yStandardDeviation), 2);
}
