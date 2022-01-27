using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BeginnerWebApiRC1.Models
{
    public class ErrorMessage
    {
        public ErrorMessage(string error)
        {
            this.Error = error;
        }
        public string Error;
    }
}
