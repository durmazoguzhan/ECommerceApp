using Inveon.Services.EmailAPI.Models;
using System.Net.Mail;
using System.Net;
using Razor.Templating.Core;

namespace Inveon.Services.EmailAPI.Repositories
{
    public class EmailRepository : IEmailRepository
    {
        async Task<bool> IEmailRepository.SendEmail(EmailContent emailContent)
        {
            var smtpClient = new SmtpClient();
            smtpClient.Host = "smtp-mail.outlook.com";
            smtpClient.Port = 587;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("testinveontest@outlook.com", "Inveon.test");
            smtpClient.EnableSsl = true;

            var mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("testinveontest@outlook.com");
            mailMessage.To.Add(emailContent.Email);
            mailMessage.Subject = "InveShop | Siparişiniz Oluşturuldu";
            mailMessage.IsBodyHtml = true;

            var body = await RazorTemplateEngine.RenderPartialAsync("~/EmailTemplates/OrderEmail.cshtml", emailContent);
            mailMessage.Body = body;

            try
            {
                smtpClient.Send(mailMessage);
                return true;
            }
            catch (Exception) { return false; }
        }
    }
}
