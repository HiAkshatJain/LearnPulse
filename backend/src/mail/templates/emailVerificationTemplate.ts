export const otpTemplate = (otp: string, name: string) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification Email</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .message {
                font-size: 24px;
                font-weight: bold;
                color: #6A0DAD; /* Purple color */
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 18px;
                margin-bottom: 20px;
                text-align: left;
            }
    
            .body p {
                margin-bottom: 10px;
            }
    
            .highlight {
                font-size: 28px;
                font-weight: bold;
                color: #6A0DAD; /* Purple color */
                margin-top: 10px;
                margin-bottom: 10px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="message">OTP Verification Email</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Thank you for registering with LearnPulse. To complete your registration, please use the following OTP
                    (One-Time Password) to verify your account:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This OTP is valid for 3 minutes. If you did not request this verification, please disregard this email.
                    Once your account is verified, you will have access to our platform and its features.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at 
                <a href="mailto:realakshatjain@gmail.com">realakshatjain@gmail.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};
