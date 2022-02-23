const formatEmailTemplate = (bodyText: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html {
        font-size: 100%;
      }
    </style>
    <title>Document</title>
  </head>
  
  <body style="padding: 0">
    <table class="rabbit-email-template" align="center" style="border: 1px solid #cccccc; width: 100%; max-width: 600px;"
      cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="height: 5px">
          <td>
            <div style="height: 5px; background: #1067cc"></div>
          </td>
        </tr>
        <tr style="height: calc(30px + 1vw)">
          <td bgcolor="#fff" style="padding: 2pt 20pt 2pt 20pt">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td width="50%">
                  <img style="width: 55%;"
                    src="https://storage.googleapis.com/unified-firefly/sales-crm-assets/rabbit-care-logo.png" />
                </td>
                <td align="right">
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="height: 1.5px; background: #f5f5f5"></td>
        </tr>
        <tr style="height: calc(150px + 20vw); background: #fff ; width: 100%;">
          <td valign="top">
            <p style='padding: 2% 5% 2% 5% ; white-space: pre-wrap; word-break: break-word; overflow: hidden;'>${bodyText}
            </p>
          </td>
        </tr>
        <tr>
          <td style="height: 20%;">
            <img style="display: block; max-width: 600px; width: 100%"
              src='https://storage.googleapis.com/unified-firefly/sales-crm-assets/footer.png'>
          </td>
        </tr>
        </tr>
        <tr style="background: #f1f6ff">
          <td style="padding: 20px 20px 7px 20px">
            <table width="100%">
              <tr>
                <td style="width: 50%">
                  <table>
                    <tr>
                      <td style="width: 9%">
                        <img style="width: 90%"
                          src="https://storage.googleapis.com/unified-firefly/sales-crm-assets/address.png" />
                      </td>
                      <td style=" width: 41%">
                        <table>
                          <tr>
                            <span style="display: block; font-size: min(max(3px, 1.5vw), 12px);">Mon-Sat (8
                              A.M. - 7 P.M.)</span>
                          </tr>
                          <tr>
                            <span style="
                              display: block;
                              color: #1067cc;
                              font-family: Arial, Helvetica Neue, Helvetica,
                                sans-serif;
                                font-size: min(max(10px, 1vw), 17px); 
                              font-weight: bold;
                            ">02-022-1222</span>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
                <td align="right">
                  <table border="0" align="right" cellpadding="0" cellspacing="10">
                    <tbody width="100%">
                      <tr>
                        <td align="center">
                          <a>
                            <img width="100%"
                              src="https://storage.googleapis.com/unified-firefly/sales-crm-assets/phone.png"
                              alt="phone" />
                          </a>
                        </td>
                        <td align="center">
                          <a>
                            <img width="100%"
                              src="https://storage.googleapis.com/unified-firefly/sales-crm-assets/email.png"
                              alt="email" />
                          </a>
                        </td>
                        <td align="center">
                          <a href="https://www.messenger.com/">
                            <img width="100%"
                              src="https://storage.googleapis.com/unified-firefly/sales-crm-assets/messenger.png"
                              alt="messenger" />
                          </a>
                        </td>
                        <td align="center">
                          <a href="https://line.me/en/">
                            <img width="100%"
                              src="https://storage.googleapis.com/unified-firefly/sales-crm-assets/line.png" alt="line" />
                          </a>
                        </td>
                        <td align="center">
                          <a href="https://www.facebook.com/">
                            <img width="100%"
                              src="https://storage.googleapis.com/unified-firefly/sales-crm-assets/facebook.png"
                              alt="facebook" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="
                      color: #fff;
                      font-size: min(max(7px, 1.5vw), 12px);
                      padding: 6% 5%;
                      background: #1067cc;
                      text-align: center;
                    ">
            <table>
              <tr>
                <span style="display: block">You have received this email from
                  <a style="color: #fff" href="https://rabbitcare.com/">rabbitcare.com</a></span>
              </tr>
              <tr>
                <span style="display: block; margin-top: 20px">Rabbit Insurance Broker Co.,Ltd</span>
  
              </tr>
              <tr>
              <span style="display: block">Q.House Lumpini Building, 29th Floor, South Sathorn Road, Tungmahamek Sub District, Sathorn District, Bangkok 10120</span>
              </tr>
              <tr>
                <span style="display: block; margin-top: 20px">
                  <a style="color: #fff" href="https://rabbitcare.com/privacy-policy">Privacy policy</a>
                  <a style="color: #fff" href="https://rabbitcare.com/terms-and-conditions">Terms and condition</a>
                </span>
              </tr>
            </table>
          </td>
        </tr>
      <tbody>
    </table>
  </body>
  
  </html>
  `;
};

export default formatEmailTemplate;
