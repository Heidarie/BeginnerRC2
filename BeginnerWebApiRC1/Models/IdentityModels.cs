using BeginnerWebApiRC1.Beginner;
using BeginnerWebApiRC1.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace BeginnerWebApiRC1.Models
{
    public class BeginnerPrincipal : ClaimsPrincipal
    {
        public BeginnerPrincipal(System.Security.Principal.IIdentity identity, string name, BeginnerUser user) : base(identity)
        {
            this.Identity = identity;
            if(identity != null)
            {
                this.Name = identity.Name;
            }
            this.Name = name;
            if (user != null)
            {
                this.Id = user.Id;
                this.Roles = (Roles)user.RoleId;
                this.Surname = user.Surname;
                this.PersonData = user.PersonData;
                this.EmployeeApplications = user.EmployeeApplications;
                this.Messages = user.Messages;
                this.Offers = user.Offers;
                this.Participants = user.Participants;

            }
        }
        public System.Security.Principal.IIdentity Identity { get; private set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Status { get; set; }
        public List<string> RefreshTokens { get; set; }
        public UserPersonalData PersonData { get; set; }
        public Roles Roles { get; set; }
        public virtual ICollection<EmployeeApplication> EmployeeApplications { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<Beginner.Offer> Offers { get; set; }
        public virtual ICollection<Participant> Participants { get; set; }
        
        public bool IsStatusActivated()
        {
            if(this.Status == 2)
            {
                return true;
            }
            return false;
        }

    }

    public class BeginnerUser : IdentityUser
    {
        public BeginnerUser()
        {

        }
        public int ProfessionId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        [NotMapped]
        public UserPersonalData PersonData { get; set; }
        public string PersonalDataSerialized
        {
            get
            {
                string result = null;
                System.Runtime.Serialization.DataContractSerializer ser = new System.Runtime.Serialization.DataContractSerializer(typeof(UserPersonalData));
                try
                {
                    using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
                    {
                        ser.WriteObject(ms, PersonData);
                        ms.Seek(0, System.IO.SeekOrigin.Begin);
                        using (var sr = new System.IO.StreamReader(ms))
                        {
                            result = sr.ReadToEnd();
                        }
                    }
                }
                catch (Exception ex)
                {

                }
                return result;
            }
            set
            {
                if (string.IsNullOrEmpty(value)) return;
                try
                {

                    System.Runtime.Serialization.DataContractSerializer ser = new System.Runtime.Serialization.DataContractSerializer(typeof(UserPersonalData));
                    using (System.IO.MemoryStream ms = new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(value)))
                    {
                        PersonData = (UserPersonalData)ser.ReadObject(ms);
                    }
                }
                catch (Exception ex)
                {
                    //log
                }

                if (PersonData == null)
                    PersonData = new UserPersonalData();
            }
        }
        public string CvFile { get; set; }
        public int RoleId { get; set; }
        public int SubscriptionTypeId { get; set; }
        public int StatusId { get; set; }
        public DateTime Md { get; set; }
        [NotMapped]
        public List<string> RefreshTokens { get; set; }
        public virtual Profession ProfessionId1Navigation { get; set; }
        public virtual UserRole Roles { get; set; }
        public virtual Status StatusNavigation { get; set; }
        public virtual SubscriptionType SubscriptionTypes { get; set; }
        public virtual ICollection<EmployeeApplication> EmployeeApplications { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<Beginner.Offer> Offers { get; set; }
        public virtual ICollection<Participant> Participants { get; set; }

        public void ClearDetails()
        {
            this.ProfessionId1Navigation = null;
            this.EmployeeApplications = null;
            this.Offers = null;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<BeginnerUser>
    {
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<ApplicationStatus> ApplicationStatuses { get; set; }
        public virtual DbSet<EmployeeApplication> EmployeeApplications { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Beginner.Offer> Offers { get; set; }
        public virtual DbSet<Participant> Participants { get; set; }
        
        public virtual DbSet<Profession> Professions { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<SubscriptionType> SubscriptionTypes { get; set; }

        public ApplicationDbContext()
        {

        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=127.0.0.1;port=3306;user=root;password=Haslo.To.Dawcio135;database=test123", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.27-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EmployeeApplication>(entity =>
                entity.HasKey(e => new { e.UserId, e.OffersId, e.ApplicationStatusId })
                        .HasName("PRIMARY")
                        .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 }));
            

            //modelBuilder.Entity<IdentityUser>().ToTable("person");
            modelBuilder.Entity<BeginnerUser>().HasOne(d => d.ProfessionId1Navigation)
                    .WithMany(p => p.People)
                    .HasForeignKey(d => d.ProfessionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_person_profession1");

            modelBuilder.Entity<BeginnerUser>(entity =>
            {
                entity.ToTable("people");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.RoleId).HasColumnName("roles_id");

                entity.Property(e => e.ProfessionId).HasColumnName("profession_id1");

                entity.Property(e => e.SubscriptionTypeId).HasColumnName("subscription_types_id");

                entity.Property(p => p.PersonalDataSerialized).HasColumnName("person_data");

                entity.Property(e => e.CvFile)
                    .HasMaxLength(60000)
                    .HasColumnName("cv_file");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Md)
                    .HasColumnType("timestamp")
                    .HasColumnName("MD");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.StatusId).HasColumnName("status_id");

                entity.Property(e => e.Surname)
                    .HasMaxLength(100)
                    .HasColumnName("surname");

                entity.HasOne(d => d.Roles)
                    .WithMany(p => p.People)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_person_roles1");
            }
            );
            modelBuilder.Entity<Beginner.Offer>(entity =>
            {
                entity.Property(e => e.AdditionalDataSerialized).HasColumnName("additional_data");
            });
            modelBuilder.Entity<BeginnerUser>().Ignore(p => p.PersonData);
            modelBuilder.Entity<BeginnerUser>().Ignore(p => p.RefreshTokens);
            modelBuilder.Entity<Beginner.Offer>().Ignore(p => p.AdditionalData);


        }
    }
}
