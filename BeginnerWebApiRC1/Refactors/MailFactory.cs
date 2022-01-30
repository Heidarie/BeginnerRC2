using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Project;
using BeginnerWebApiRC1.Models.Shared;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.IO;

namespace BeginnerWebApiRC1.Refactors
{
    public static class MailFactory
    {
        public static async void SendConfirmationMail(RegistrationModel model, string token)
        {
            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("Beginner", "NoReply.Beginner@gmail.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress(model.Username, model.Email);
            message.To.Add(to);

            message.Subject = "Account Verification";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = EmailConfirmAccountBody();

            message.Body = bodyBuilder.ToMessageBody();


            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Connect("smtp.gmail.com", 587, false);
            smtpClient.Authenticate("NoReply.Beginner@gmail.com", "Beginner135");
            await smtpClient.SendAsync(message);
            smtpClient.Disconnect(true);
            smtpClient.Dispose();
        }

        public static async void ResendConfirmationMail(string email, string username, string token)
        {
            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("Beginner", "NoReply.Beginner@gmail.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress(username, email);
            message.To.Add(to);

            message.Subject = "Account Verification";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = EmailConfirmAccountBody();

            message.Body = bodyBuilder.ToMessageBody();


            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Connect("smtp.gmail.com", 587, false);
            smtpClient.Authenticate("NoReply.Beginner@gmail.com", "Beginner135");
            await smtpClient.SendAsync(message);
            smtpClient.Disconnect(true);
            smtpClient.Dispose();
        }

        public static async void SendStatusChangeNotification(ChangedStatusNotification notification)
        {
            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("Beginner", "NoReply.Beginner@gmail.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress(notification.OfferName,notification.Email);
            message.To.Add(to);

            message.Subject = "Pracodawca zmienił status twojej aplikacji";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = EmailStatusNotificationBody(notification);
            
            message.Body = bodyBuilder.ToMessageBody();


            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Connect("smtp.gmail.com", 587, false);
            smtpClient.Authenticate("NoReply.Beginner@gmail.com", "Beginner135");
            await smtpClient.SendAsync(message);
            smtpClient.Disconnect(true);
            smtpClient.Dispose();
        }

        public static async void SendUserVisitNotification(VisitorNotification notification)
        {
            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("Beginner", "NoReply.Beginner@gmail.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress(notification.Name, notification.Email);
            message.To.Add(to);

            message.Subject = "Ktoś odwiedził twój profil";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = EmailUserVisitBody(notification);

            message.Body = bodyBuilder.ToMessageBody();


            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Connect("smtp.gmail.com", 587, false);
            smtpClient.Authenticate("NoReply.Beginner@gmail.com", "Beginner135");
            await smtpClient.SendAsync(message);
            smtpClient.Disconnect(true);
            smtpClient.Dispose();
        }

        private static string EmailStatusNotificationBody(ChangedStatusNotification notification)
        {
            string body = string.Empty;
            var root = AppDomain.CurrentDomain.BaseDirectory; using (var reader = new System.IO.StreamReader(@"Content/mailbody.txt"))
            {
                string readFile = reader.ReadToEnd();
                string StrContent = string.Empty;
                StrContent = readFile;
                //Assing the field values in the template
                StrContent = StrContent.Replace("[USER_ID]", notification.UserId);
                StrContent = StrContent.Replace("[NAME]", notification.Name);
                StrContent = StrContent.Replace("[PLACE]", notification.Place);
                StrContent = StrContent.Replace("[NOTIFICATION]", "Twoja aplikacja zmieniła status na: " 
                    + ((ApplicationStatusEnum)notification.Status).ToString());
                body = StrContent.ToString();
            }
            return body;
        }

        private static string EmailConfirmAccountBody()
        {
            string body = string.Empty;
            var root = AppDomain.CurrentDomain.BaseDirectory; using (var reader = new System.IO.StreamReader(@"Content/mailbodyConfirmAccount.txt"))
            {
                string readFile = reader.ReadToEnd();
                string StrContent = string.Empty;
                StrContent = readFile;
                //Assing the field values in the template
                body = StrContent.ToString();
            }
            return body;
        }

        private static string EmailUserVisitBody(VisitorNotification notification)
        {
            string body = string.Empty;
            var root = AppDomain.CurrentDomain.BaseDirectory; using (var reader = new System.IO.StreamReader(@"Content/mailbodyUserVisit.txt"))
            {
                string readFile = reader.ReadToEnd();
                string StrContent = string.Empty;
                StrContent = readFile;
                //Assing the field values in the template
                StrContent = StrContent.Replace("[USER_ID]", notification.UserId);
                StrContent = StrContent.Replace("[NAME]", notification.Name + " " + notification.Surname);
                body = StrContent.ToString();
            }
            return body;
        }

    }
}
