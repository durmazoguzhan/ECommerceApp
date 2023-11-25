using Inveon.Services.EmailAPI.Models;

namespace Inveon.Services.EmailAPI.Repositories
{
    public interface IEmailRepository
    {
        Task<bool> SendEmail(EmailContent emailContent);
    }
}
