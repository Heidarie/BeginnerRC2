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
}
