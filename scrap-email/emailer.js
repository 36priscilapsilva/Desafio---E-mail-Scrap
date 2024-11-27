process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nodemailer = require("nodemailer");
const { scrapePage } = require("./scraper");

/**
 * @param {string} subject 
 * @param {string} body
 * @param {string} senderEmail 
 * @param {string} senderPassword 
 * @param {string} receiverEmail 
 */
async function sendEmail(subject, body, senderEmail, senderPassword, receiverEmail) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: senderEmail,
                pass: senderPassword,
            },
            tls: {
                rejectUnauthorized: false, 
            },
        });

        const mailOptions = {
            from: senderEmail,
            to: receiverEmail,
            subject,
            text: body,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar email:", error.message);
    }
}

(async () => {
    
    const url = "https://g1.globo.com"; 
    const senderEmail = "priscila.psilva31@gmail.com"; 
    const senderPassword = "usid vqjz okbh xjde"; 
    const receiverEmail = "sharon.vipp@gmail.com"; 

    console.log("Realizando o scrap da página...");
    const scrapedData = await scrapePage(url);

    if (scrapedData.length > 0) {
        const emailBody = "Aqui estão os títulos extraídos:\n\n" + scrapedData.join("\n");
        await sendEmail(
            "Dados do Scrap",
            emailBody,
            senderEmail,
            senderPassword,
            receiverEmail
        );
    } else {
        console.log("Nenhum dado foi extraído.");
    }
})();