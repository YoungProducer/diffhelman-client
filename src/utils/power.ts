export const power = (x: number, y: number, mod: number) => {
  // Initialize result
  let res = 1;

  while (y) {
    // If power is odd, then update the answer
    if (y & 1) res = (res * x) % mod;

    // Square the number and reduce
    // the power to its half
    y = y >> 1;
    x = (x * x) % mod;
  }

  // Return the result
  return res;
};
