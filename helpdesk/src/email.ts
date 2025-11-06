import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendTicketCreatedEmail(ticketId: string, title: string, fromEmail: string) {
  const admin = process.env.ADMIN_EMAIL!;
  await mailer.sendMail({
    from: `Helpdesk <${admin}>`,
    to: admin,
    subject: `New Ticket ${ticketId}`,
    text: `A new ticket was created.\n\nID: ${ticketId}\nTitle: ${title}\nFrom: ${fromEmail}`,
  });
}
