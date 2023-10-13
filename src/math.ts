export function sum(nums: number[]): number {
  let total = 0;
  for (const n of nums) {
    total += n;
  }
  return total;
}

export function calcAverage(nums: number[]): number {
  const total = sum(nums);
  const len = nums.length;
  const avg = total / len;
  return avg;
}
