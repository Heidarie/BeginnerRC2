namespace BeginnerWebApiRC1.Models.Shared
{
    public class MessageResult
    {
        public MessageResult(string messageText, bool success = true)
        {
            this.success = success; 
            this.message = messageText;
        }
        public string message { get; set; }
        public bool success { get; set; }
    }
}
