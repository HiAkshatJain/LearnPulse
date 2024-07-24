// Function to generate a 6-digit OTP (One Time Password)
export function generateOTP() {
  let digits = "0123456789"; // Define the characters from which OTP will be generated
  let OTP = ""; // Initialize an empty string to store the OTP
  let len = digits.length; // Get the length of the digits string (which is 10)

  // Loop to generate a 6-digit OTP
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)]; // Append a random digit from 'digits' to OTP
  }

  return OTP; // Return the generated OTP
}
