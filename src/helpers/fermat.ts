// C++ program to check if N is Fermat pseudoprime
// to the base A or not

// Function to check if the given number is composite
const checkcomposite = (n: number) => {
  // Check if there is any divisor of n less than sqrt(n)
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) return true;
  }
  return false;
};

// Effectively calculate (x^y) modulo mod
const power = (x: number, y: number, mod: number) => {
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

// Function to check for Fermat Pseudoprime
export const fermat = (n: number, a: number) => {
  // If it is composite and satisfy Fermat criterion
  if (a > 1 && checkcomposite(n) && power(a, n - 1, n) == 1) return true;

  // Else return 0
  return false;
};
