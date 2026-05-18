import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const apiKey      = process.env['BREVO_API_KEY'];
  const senderEmail = process.env['BREVO_SENDER_EMAIL'];
  const senderName  = process.env['BREVO_SENDER_NAME'] ?? 'Portfolio Contact';

  if (!apiKey || !senderEmail) {
    res.status(500).json({ error: 'Email service is not configured.' });
    return;
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept':       'application/json',
        'api-key':      apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender:      { name: senderName, email: senderEmail },
        to:          [{ email: 'mustuzoh53@gmail.com', name: 'Mustafa Zohair' }],
        replyTo:     { email, name },
        subject:     `Portfolio Contact: ${subject}`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#7c3aed">New message from your portfolio</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;font-weight:bold;color:#555">Name</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#555">Subject</td><td style="padding:8px">${subject}</td></tr>
            </table>
            <hr style="border:1px solid #eee;margin:16px 0">
            <h3 style="color:#555">Message</h3>
            <p style="line-height:1.7;color:#333">${message.replace(/\n/g, '<br>')}</p>
          </div>
        `,
      }),
    });

    if (brevoRes.ok) {
      res.json({ success: true });
    } else {
      const errBody = await brevoRes.json().catch(() => ({}));
      console.error('Brevo error:', errBody);
      res.status(502).json({ error: 'Failed to send email. Try again later.' });
    }
  } catch (err) {
    console.error('Contact API error:', err);
    res.status(500).json({ error: 'Server error. Try again later.' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
