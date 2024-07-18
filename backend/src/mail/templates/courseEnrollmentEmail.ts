export const courseEnrollmentEmail = (courseName: string, name: string) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
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
    
            .cta {
                display: inline-block;
                padding: 12px 24px;
                background-color: #6A0DAD; /* Purple color */
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
                transition: background-color 0.3s;
            }
    
            .cta:hover {
                background-color: #4B0864; /* Darker purple on hover */
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
                color: #6A0DAD; /* Purple color */
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="message">Course Registration Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
                    are excited to have you as a participant!</p>
                <p>Please log in to your learning dashboard to access the course materials and start your learning journey.
                </p>
                <a class="cta" href="/">Go to Dashboard</a>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at 
            <a href="mailto:realakshatjain@gmail.com">realakshatjain@gmail.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};
