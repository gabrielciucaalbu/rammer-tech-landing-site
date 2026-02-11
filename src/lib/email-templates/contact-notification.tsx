export function buildContactEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}): string {
  const serviceLabels: Record<string, string> = {
    "web-mobile": "Dezvoltare Web & Mobile",
    enterprise: "Solutii Enterprise",
    consultanta: "Consultanta IT",
    produs: "Produs Software",
    altceva: "Altceva",
  };

  const budgetLabels: Record<string, string> = {
    "sub-5000": "Sub 5.000 EUR",
    "5000-15000": "5.000 - 15.000 EUR",
    "15000-50000": "15.000 - 50.000 EUR",
    "peste-50000": "Peste 50.000 EUR",
    "nu-stiu": "Nu stiu inca",
  };

  const serviceLabel = data.service
    ? serviceLabels[data.service] || data.service
    : "—";
  const budgetLabel = data.budget
    ? budgetLabels[data.budget] || data.budget
    : "—";

  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mesaj nou de contact</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f4; color: #292524;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #8B1A1A 0%, #4A1010 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">
                Rammer Tech
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #fecaca;">
                Mesaj nou de contact
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5; color: #44403c;">
                Ai primit un mesaj nou prin formularul de contact de pe site:
              </p>

              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <strong style="font-size: 14px; color: #57534e;">Nume:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; text-align: right;">
                    <span style="font-size: 14px; color: #292524;">${escapeHtml(data.name)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <strong style="font-size: 14px; color: #57534e;">Email:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; text-align: right;">
                    <a href="mailto:${escapeHtml(data.email)}" style="font-size: 14px; color: #8B1A1A; text-decoration: none;">${escapeHtml(data.email)}</a>
                  </td>
                </tr>
                ${
                  data.phone
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <strong style="font-size: 14px; color: #57534e;">Telefon:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; text-align: right;">
                    <a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="font-size: 14px; color: #8B1A1A; text-decoration: none;">${escapeHtml(data.phone)}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.company
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <strong style="font-size: 14px; color: #57534e;">Companie:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; text-align: right;">
                    <span style="font-size: 14px; color: #292524;">${escapeHtml(data.company)}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <strong style="font-size: 14px; color: #57534e;">Serviciu:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; text-align: right;">
                    <span style="font-size: 14px; color: #292524;">${serviceLabel}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4;">
                    <strong style="font-size: 14px; color: #57534e;">Buget estimat:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; text-align: right;">
                    <span style="font-size: 14px; color: #292524;">${budgetLabel}</span>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 20px; background-color: #fafaf9; border-left: 4px solid #8B1A1A; border-radius: 4px;">
                <strong style="display: block; margin-bottom: 8px; font-size: 14px; color: #57534e;">Mesaj:</strong>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #292524; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e7e5e4;">
                <p style="margin: 0; font-size: 13px; color: #78716c;">
                  <strong>Sfat:</strong> Poti raspunde direct la acest email pentru a contacta persoana.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; border-radius: 0 0 8px 8px; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0; font-size: 12px; color: #a8a29e; text-align: center;">
                Acest email a fost generat automat de formularul de contact de pe <a href="https://rammertech.ro" style="color: #8B1A1A; text-decoration: none;">rammertech.ro</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/** Escape HTML special characters to prevent XSS */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
