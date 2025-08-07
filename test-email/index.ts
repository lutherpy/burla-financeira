// test.ts
import { smtpTransport } from "@/services/email/smtp";

async function sendTestEmail() {
  try {
    const info = await smtpTransport.sendMail({
      from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`, // Remetente
      to: "pedro.samuel@cmc.ao", // Destinatário
      subject: "Teste de envio de e-mail ✔", // Assunto
      text: "Olá! Este é um teste de envio de e-mail via SMTP usando Node.js.", // Texto simples
      html: "<b>Olá!</b><br>Este é um teste de envio de e-mail via <strong>SMTP</strong> usando Node.js.", // HTML
    });
    console.log(info);

    console.log("Email enviado com sucesso:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  } finally {
    smtpTransport.close(); // Fecha a conexão
  }
}

sendTestEmail();
