using log4net;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace BeginnerWebApiRC1.Helpers
{
    public static class FileHelper
    {
        private static ILog Logger
        {
            get
            {
                return LogManager.GetLogger(typeof(FileHelper));
            }
        }

        public static string ConvertImageToBase64(string path)
        {
            try
            {
                string image = "";
                path = Path.Combine("Content/Images/User", path + ".jpg");
                if (File.Exists(path)) 
                    image = System.Convert.ToBase64String(System.IO.File.ReadAllBytes(path));
                else
                    image = System.Convert.ToBase64String(System.IO.File.ReadAllBytes("Content/Images/User/no_image_company.png"));
                return image;
            }
            catch
            {
                Logger.Info(string.Format("Image not found", path));
                return "";
            }
        }

        public static void UploadImage(IFormFile photo, string userId)
        {
            if (photo.Length > 0)
            {
                string fileName = userId + ".jpg";
                string path = Path.Combine("Content/Images/User", fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    photo.CopyTo(stream);
                }
            }
        }

        public static string ConvertPDF(IFormFile file)
        {
            string fileBytes = "";
            if (file.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var bytes = ms.ToArray();
                    fileBytes = Convert.ToBase64String(bytes);
                }
            }
            return fileBytes;
        }
    }
}
