using BeginnerWebApiRC1.Models;
using System.Threading.Tasks;

namespace BeginnerWebApiRC1.Token
{
    public interface IRefreshTokenRepository
    {
        Task Create(RefreshToken refreshToken);

        Task<RefreshToken> GetByToken(string token);
        Task Delete(RefreshToken token);
        Task DeleteAll(string userId);
    }
}
