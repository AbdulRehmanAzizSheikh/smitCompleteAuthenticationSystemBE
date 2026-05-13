const otpEmailTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div>
        <h1>OTP Verification</h1>
        <p>Your OTP is ${otp}</p>
        <p>Please verify your email address by entering this OTP.</p>
        <p>This OTP is valid for 10 minutes.</p>
    </div>
    </body>
  </html>
  `;
};

export default otpEmailTemplate;
