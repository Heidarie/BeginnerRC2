using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeginnerWebApiRC1.Token
{
    public class DbRefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly ApplicationDbContext _context;

        public DbRefreshTokenRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task Create(RefreshToken refreshToken)
        {
            refreshToken.Id = Guid.NewGuid();
            _context.RefreshTokens.Add(refreshToken);
            _context.SaveChanges();
            return Task.CompletedTask;
        }

        public Task Delete(RefreshToken token)
        {
            _context.RefreshTokens.Remove(token);
            _context.SaveChanges();
            return Task.CompletedTask;
        }

        public Task DeleteAll(string userId)
        {
            IEnumerable<RefreshToken> refreshTokens = _context.RefreshTokens.Where(x => x.UserId == userId).ToList();
            _context.RefreshTokens.RemoveRange(refreshTokens);
            _context.SaveChanges();
            return Task.CompletedTask;
        }

        public Task<RefreshToken> GetByToken(string token)
        {
            RefreshToken refreshToken = _context.RefreshTokens.FirstOrDefault(r => r.Token == token);
            _context.SaveChanges();
            return Task.FromResult(refreshToken);
        }
    }
}
