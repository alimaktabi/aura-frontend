export const valueColorMap = {
  '-4': '#924848',
  '-3': '#DA6A6A',
  '-2': '#EE9D9D',
  '-1': '#F5BFBF',
  '1': '#D5ECDA',
  '2': '#B4E6C0',
  '3': '#72BF83',
  '4': '#5B9969',
};

export const findNearestColor = (value: any, colorMap: any) => {
  const nearestValue = Object.keys(colorMap).reduce((prev, curr) =>
    Math.abs(Number(curr) - value) < Math.abs(Number(prev) - value)
      ? curr
      : prev,
  );
  return colorMap[nearestValue];
};
