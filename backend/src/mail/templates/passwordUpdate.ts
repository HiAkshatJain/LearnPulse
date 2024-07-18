export const passwordUpdated = (email: string, name: string) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Password Update Confirmation</title>
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
            color: #6a0dad; /* Purple color */
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
            font-weight: bold;
            color: #6a0dad; /* Purple color */
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
          <div class="message">Password Update Confirmation</div>
          <div class="body">
            <p>Hey ${name},</p>
            <p>
              Your password has been successfully updated for the email
              <span class="highlight">${email}</span>.
            </p>
            <p>
              If you did not request this password change, please contact us
              immediately to secure your account.
            </p>
          </div>
          <div class="support">
            If you have any questions or need further assistance, please feel free
            to reach out to us at
            <a href="mailto:realakshatjain@gmail.com">realakshatjain@gmail.com</a>.
            We are here to help!
          </div>
        </div>
      </body>
    </html>
    `;
};
