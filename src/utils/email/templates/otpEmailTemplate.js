const otpEmailTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
    <body>
        <h1>OTP Verification</h1>
        <p>Your OTP is ${otp}</p>
        <p>Please verify your email address by entering this OTP.</p>
        <p>This OTP is valid for 10 minutes.</p>
    </body>
</html>
  `;
};

export default otpEmailTemplate;
