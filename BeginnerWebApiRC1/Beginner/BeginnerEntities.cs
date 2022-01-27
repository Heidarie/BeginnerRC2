using System;
using System.Collections.Generic;
using BeginnerWebApiRC1.Models;
using BeginnerWebApiRC1.Models.Account;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BeginnerWebApiRC1.Beginner
{
    public partial class BeginnerEntities : DbContext //DbCreator, connect to this Entity to manipulate data on db
    {
      /*  public BeginnerEntities()
        {
        }

        public BeginnerEntities(DbContextOptions<BeginnerEntities> options): base(options)
        {

        }

        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<ApplicationStatus> ApplicationStatuses { get; set; }
        public virtual DbSet<EmployeeApplication> EmployeeApplications { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Offer> Offers { get; set; }
        public virtual DbSet<Participant> Participants { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<Profession> Professions { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<SubscriptionType> SubscriptionTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("YourDbConnection", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.27-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.UseCollation("utf8_general_ci")
                .HasCharSet("utf8");

            modelBuilder.Entity<ApplicationStatus>(entity =>
            {
                entity.ToTable("application_status");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<EmployeeApplication>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.OffersId, e.ApplicationStatusId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("employee_applications");

                entity.HasIndex(e => e.ApplicationStatusId, "fk_employee_applications_application_status1_idx");

                entity.HasIndex(e => e.OffersId, "fk_employee_applications_offers1_idx");

                entity.Property(e => e.UserId).HasColumnName("person_id");

                entity.Property(e => e.OffersId).HasColumnName("offers_id");

                entity.Property(e => e.ApplicationStatusId).HasColumnName("application_status_id");

                entity.HasOne(d => d.ApplicationStatus)
                    .WithMany(p => p.EmployeeApplications)
                    .HasForeignKey(d => d.ApplicationStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_applications_application_status1");

                entity.HasOne(d => d.Offers)
                    .WithMany(p => p.EmployeeApplications)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.OffersId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_applications_offers1");

                /*entity.HasOne(d => d.Person)
                    .WithMany(p => p.EmployeeApplications)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.PersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_applications_person1");
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.ToTable("messages");

                entity.HasIndex(e => e.ParticipantsId, "fk_messages_participants1_idx");

                entity.HasIndex(e => e.SenderId, "fk_messages_person1_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cd)
                    .HasColumnType("timestamp")
                    .HasColumnName("CD")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Message1)
                    .HasMaxLength(5000)
                    .HasColumnName("message");

                entity.Property(e => e.ParticipantsId).HasColumnName("participants_id");

                entity.Property(e => e.Seen).HasColumnName("seen");

                entity.Property(e => e.SenderId).HasColumnName("sender_id");

                entity.HasOne(d => d.Participants)
                    .WithMany(p => p.Messages)
                    .HasForeignKey(d => d.ParticipantsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_messages_participants1");

                /*entity.HasOne(d => d.Sender)
                    .WithMany(p => p.Messages)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_messages_person1");
            });

            modelBuilder.Entity<Offer>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.PersonId, e.ProfessionId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("offers");

                entity.HasIndex(e => e.PersonId, "fk_offers_person1_idx");

                entity.HasIndex(e => e.ProfessionId, "fk_offers_profession1_idx");

                entity.HasIndex(e => e.StatusId, "fk_offers_status1_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.PersonId).HasColumnName("person_id");

                entity.Property(e => e.ProfessionId).HasColumnName("profession_id");

                entity.Property(e => e.Cd)
                    .HasColumnType("timestamp")
                    .HasColumnName("CD")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .HasColumnName("city");

                entity.Property(e => e.Fd).HasColumnName("FD");

                entity.Property(e => e.Lat)
                    .HasMaxLength(100)
                    .HasColumnName("lat");

                entity.Property(e => e.Lng)
                    .HasMaxLength(100)
                    .HasColumnName("lng");

                entity.Property(e => e.Md)
                    .HasColumnType("timestamp")
                    .HasColumnName("MD");

                entity.Property(e => e.OfferText)
                    .IsRequired()
                    .HasColumnName("offer_text");

                entity.Property(e => e.PostalCode)
                    .HasMaxLength(6)
                    .HasColumnName("postal_code");

                entity.Property(e => e.SalaryFrom)
                    .HasMaxLength(45)
                    .HasColumnName("salary_from");

                entity.Property(e => e.SalaryTo)
                    .HasMaxLength(45)
                    .HasColumnName("salary_to");

                entity.Property(e => e.StatusId).HasColumnName("status_id");

                entity.Property(e => e.Street)
                    .HasMaxLength(100)
                    .HasColumnName("street");

                /*.HasOne(d => d.Person)
                    .WithMany(p => p.Offers)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.PersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_offers_person1");

                entity.HasOne(d => d.Profession)
                    .WithMany(p => p.Offers)
                    .HasForeignKey(d => d.ProfessionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_offers_profession1");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Offers)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_offers_status1");
            });

            modelBuilder.Entity<Participant>(entity =>
            {
                entity.ToTable("participants");

                entity.HasIndex(e => e.PersonId, "fk_participants_person1_idx");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Person2Id).HasColumnName("person2_id");

                entity.Property(e => e.PersonId).HasColumnName("person_id");

                /*entity.HasOne(d => d.Person)
                    .WithMany(p => p.Participants)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.PersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_participants_person1");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey(e => new {e.RolesId, e.ProfessionId, e.SubscriptionTypesId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                entity.ToTable("person");

                entity.HasIndex(e => e.ProfessionId, "fk_person_profession1_idx");

                entity.HasIndex(e => e.RolesId, "fk_person_roles1_idx");

                entity.HasIndex(e => e.StatusId, "fk_person_status1_idx");

                entity.HasIndex(e => e.SubscriptionTypesId, "fk_person_subscription_types1_idx");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.RolesId).HasColumnName("roles_id");

                entity.Property(e => e.SubscriptionTypesId).HasColumnName("subscription_types_id");

                entity.Property(e => e.Cd)
                    .HasColumnType("timestamp")
                    .HasColumnName("CD")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.CvFile)
                    .HasMaxLength(200)
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

                entity.Property(e => e.Password)
                    .HasMaxLength(1000)
                    .HasColumnName("password");

                entity.Property(e => e.PersonData).HasColumnName("person_data");

                entity.Property(e => e.ProfessionId).HasColumnName("profession_id1");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.StatusId).HasColumnName("status_id");

                entity.Property(e => e.Surname)
                    .HasMaxLength(100)
                    .HasColumnName("surname");

               // entity.HasOne(d => d.ProfessionId1Navigation)
               //     .WithMany(p => p.People)
               //     .HasForeignKey(d => d.ProfessionId1)
               //     .OnDelete(DeleteBehavior.ClientSetNull)
               //     .HasConstraintName("fk_person_profession1");

                //entity.HasOne(d => d.Roles)
                //    .WithMany(p => p.People)
                //    .HasForeignKey(d => d.RolesId)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("fk_person_roles1");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.People)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_person_status1");

                entity.HasOne(d => d.SubscriptionTypes)
                    .WithMany(p => p.People)
                    .HasForeignKey(d => d.SubscriptionTypesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_person_subscription_types1");
            });

            modelBuilder.Entity<Profession>(entity =>
            {
                entity.ToTable("profession");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Profession1, "profession_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Profession1)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnName("profession");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("roles");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Role1)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("role");
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.ToTable("status");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<SubscriptionType>(entity =>
            {
                entity.ToTable("subscription_types");

                entity.HasIndex(e => e.Id, "id_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Subscription, "subscription_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Subscription)
                    .HasMaxLength(45)
                    .HasColumnName("subscription");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder); */
    }
}
