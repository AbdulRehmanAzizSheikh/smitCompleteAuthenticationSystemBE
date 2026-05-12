const otpEmailTemplate = (otp) => {
  return `
    <div>
        <h1>OTP Verification</h1>
        <p>Your OTP is ${otp}</p>
        <p>Please verify your email address by entering this OTP.</p>
        <p>This OTP is valid for 10 minutes.</p>
    </div>
  `;
};

export default otpEmailTemplate;
