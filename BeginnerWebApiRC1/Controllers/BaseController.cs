using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models;
using log4net;
using log4net.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeginnerWebApiRC1.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private ILog logger;

        private DatabaseManager databaseManager;
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

        protected virtual new BeginnerPrincipal User
        {
            get
            {
                if(HttpContext.User is BeginnerPrincipal)
                {
                    return HttpContext.User as BeginnerPrincipal;
                }
                else
                {
                    return new BeginnerPrincipal(HttpContext.User.Identity,"", null);
                }
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

        public RedirectToRouteResult RedirectToAction(string action, object routeValues, string fragments)
        {
            return base.RedirectToRoute(action, routeValues, fragments);
        }
    }
}
