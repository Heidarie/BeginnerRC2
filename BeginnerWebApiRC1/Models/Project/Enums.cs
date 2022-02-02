using System.ComponentModel.DataAnnotations;

namespace BeginnerWebApiRC1
{
    public enum Roles
    {
       [Display(Name = "Employee")]
       Employee = 1,
       [Display(Name = "Employer")]
       Employer = 2
    }

    public enum Professions
    {
        Brak = 1,
        Student = 2
    }

    public enum ApplicationStatusEnum
    {
        [Display(Name = "Aplikuj")]
        Aplikuj = 0,
        [Display(Name = "Zaaplikowano")]
        Zaaplikowano = 1,
        [Display(Name = "Rozpatrywana")]
        Rozpatrywana = 2,
        [Display(Name = "Odrzucona")]
        Odrzucona = 3

    }
}
