using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models;
using log4net;
using log4net.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;

namespace BeginnerWebApiRC1.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private ILog logger;
        private DatabaseManager databaseManager;
        private BeginnerUser beginnerUser;
        
        protected BeginnerUser LoggedUser
        {
            get
            {
                return beginnerUser;
            }
        }

        protected DatabaseManager DatabaseManager
        {
            get
            {
                if(databaseManager == null)
                {
                    databaseManager = new DatabaseManager();
                }
                return databaseManager;
            }
        }

        protected ILog Logger
        {
            get
            {
                if (logger == null)
                    logger = LogManager.GetLogger(this.GetType());
                return logger;
            }
        }

        public void SetBeginnerUser(IMemoryCache cache)
        {
            cache.TryGetValue("BeginnerUser", out beginnerUser);
        }

        public void RefreshUserDetails()
        {
            beginnerUser.ClearDetails();
            DatabaseManager.SetUpLoggedUser(beginnerUser);
        }

        public void ReloadUserData()
        {
            beginnerUser = null;
            DatabaseManager.RefreshLoggedUser(beginnerUser);
            DatabaseManager.SetUpLoggedUser(beginnerUser);
        }

        public RedirectToRouteResult RedirectToAction(string action, object routeValues, string fragments)
        {
            return base.RedirectToRoute(action, routeValues, fragments);
        }
    }
}
