// <auto-generated />
using System;
using BeginnerWebApiRC1.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BeginnerWebApiRC1.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220131213528_FinishDayAsDateTime")]
    partial class FinishDayAsDateTime
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.ApplicationStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ApplicationStatuses");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.EmployeeApplication", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("OffersId")
                        .HasColumnType("int");

                    b.Property<int>("ApplicationStatusId")
                        .HasColumnType("int");

                    b.Property<string>("PersonId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PersonId1")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "OffersId", "ApplicationStatusId")
                        .HasName("PRIMARY")
                        .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

                    b.HasIndex("ApplicationStatusId");

                    b.HasIndex("OffersId");

                    b.HasIndex("PersonId");

                    b.HasIndex("PersonId1");

                    b.ToTable("EmployeeApplications");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("Cd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Message1")
                        .HasColumnType("longtext");

                    b.Property<int>("ParticipantsId")
                        .HasColumnType("int");

                    b.Property<string>("PersonId")
                        .HasColumnType("varchar(255)");

                    b.Property<sbyte?>("Seen")
                        .HasColumnType("tinyint");

                    b.Property<string>("SenderId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ParticipantsId");

                    b.HasIndex("PersonId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Offer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AdditionalDataSerialized")
                        .HasColumnType("longtext")
                        .HasColumnName("additional_data");

                    b.Property<string>("BeginnerUserId")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("Cd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("City")
                        .HasColumnType("longtext");

                    b.Property<int>("CompanySize")
                        .HasColumnType("int");

                    b.Property<string>("Duties")
                        .HasColumnType("longtext");

                    b.Property<string>("ExperienceRequired")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Fd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("JobType")
                        .HasColumnType("longtext");

                    b.Property<string>("Lat")
                        .HasColumnType("longtext");

                    b.Property<string>("Lng")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Md")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("OfferText")
                        .HasColumnType("longtext");

                    b.Property<string>("PersonId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PostalCode")
                        .HasColumnType("longtext");

                    b.Property<int>("ProfessionId")
                        .HasColumnType("int");

                    b.Property<string>("SalaryFrom")
                        .HasColumnType("longtext");

                    b.Property<string>("SalaryTo")
                        .HasColumnType("longtext");

                    b.Property<int>("StatusId")
                        .HasColumnType("int");

                    b.Property<string>("Street")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("BeginnerUserId");

                    b.HasIndex("PersonId");

                    b.HasIndex("ProfessionId");

                    b.HasIndex("StatusId");

                    b.ToTable("Offers");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Participant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Person2Id")
                        .HasColumnType("int");

                    b.Property<string>("PersonId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PersonId1")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.HasIndex("PersonId1");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Person", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("Cd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CvFile")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Md")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<string>("PersonData")
                        .HasColumnType("longtext");

                    b.Property<int>("ProfessionId")
                        .HasColumnType("int");

                    b.Property<int>("RolesId")
                        .HasColumnType("int");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<int>("StatusId")
                        .HasColumnType("int");

                    b.Property<int>("SubscriptionTypesId")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("ProfessionId");

                    b.HasIndex("RolesId");

                    b.HasIndex("StatusId");

                    b.HasIndex("SubscriptionTypesId");

                    b.ToTable("Person");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Profession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Profession1")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Professions");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.SubscriptionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Subscription")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("SubscriptionTypes");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Role1")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Models.BeginnerUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("id");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("CvFile")
                        .HasMaxLength(60000)
                        .HasColumnType("longtext")
                        .HasColumnName("cv_file");

                    b.Property<string>("Email")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("email");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("Md")
                        .HasColumnType("timestamp")
                        .HasColumnName("MD");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PersonalDataSerialized")
                        .HasColumnType("longtext")
                        .HasColumnName("person_data");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ProfessionId")
                        .HasColumnType("int")
                        .HasColumnName("profession_id1");

                    b.Property<int>("RoleId")
                        .HasColumnType("int")
                        .HasColumnName("roles_id");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<int>("StatusId")
                        .HasColumnType("int")
                        .HasColumnName("status_id");

                    b.Property<int>("SubscriptionTypeId")
                        .HasColumnType("int")
                        .HasColumnName("subscription_types_id");

                    b.Property<string>("Surname")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("surname");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("ProfessionId");

                    b.HasIndex("RoleId");

                    b.HasIndex("StatusId");

                    b.HasIndex("SubscriptionTypeId");

                    b.ToTable("people", (string)null);
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Models.RefreshToken", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Token")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.EmployeeApplication", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Beginner.ApplicationStatus", "ApplicationStatus")
                        .WithMany("EmployeeApplications")
                        .HasForeignKey("ApplicationStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Beginner.Offer", "Offers")
                        .WithMany("EmployeeApplications")
                        .HasForeignKey("OffersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", "Person")
                        .WithMany("EmployeeApplications")
                        .HasForeignKey("PersonId");

                    b.HasOne("BeginnerWebApiRC1.Beginner.Person", null)
                        .WithMany("EmployeeApplications")
                        .HasForeignKey("PersonId1");

                    b.Navigation("ApplicationStatus");

                    b.Navigation("Offers");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Message", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Beginner.Participant", "Participants")
                        .WithMany("Messages")
                        .HasForeignKey("ParticipantsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Beginner.Person", null)
                        .WithMany("Messages")
                        .HasForeignKey("PersonId");

                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", "Sender")
                        .WithMany("Messages")
                        .HasForeignKey("SenderId");

                    b.Navigation("Participants");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Offer", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", "Person")
                        .WithMany("Offers")
                        .HasForeignKey("BeginnerUserId");

                    b.HasOne("BeginnerWebApiRC1.Beginner.Person", null)
                        .WithMany("Offers")
                        .HasForeignKey("PersonId");

                    b.HasOne("BeginnerWebApiRC1.Beginner.Profession", "Profession")
                        .WithMany("Offers")
                        .HasForeignKey("ProfessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Beginner.Status", "Status")
                        .WithMany("Offers")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");

                    b.Navigation("Profession");

                    b.Navigation("Status");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Participant", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", "Person")
                        .WithMany("Participants")
                        .HasForeignKey("PersonId");

                    b.HasOne("BeginnerWebApiRC1.Beginner.Person", null)
                        .WithMany("Participants")
                        .HasForeignKey("PersonId1");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Person", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Beginner.Profession", "ProfessionId1Navigation")
                        .WithMany()
                        .HasForeignKey("ProfessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Beginner.UserRole", "Roles")
                        .WithMany()
                        .HasForeignKey("RolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Beginner.Status", "StatusNavigation")
                        .WithMany("People")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Beginner.SubscriptionType", "SubscriptionTypes")
                        .WithMany("People")
                        .HasForeignKey("SubscriptionTypesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProfessionId1Navigation");

                    b.Navigation("Roles");

                    b.Navigation("StatusNavigation");

                    b.Navigation("SubscriptionTypes");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Models.BeginnerUser", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Beginner.Profession", "ProfessionId1Navigation")
                        .WithMany("People")
                        .HasForeignKey("ProfessionId")
                        .IsRequired()
                        .HasConstraintName("fk_person_profession1");

                    b.HasOne("BeginnerWebApiRC1.Beginner.UserRole", "Roles")
                        .WithMany("People")
                        .HasForeignKey("RoleId")
                        .IsRequired()
                        .HasConstraintName("fk_person_roles1");

                    b.HasOne("BeginnerWebApiRC1.Beginner.Status", "StatusNavigation")
                        .WithMany()
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Beginner.SubscriptionType", "SubscriptionTypes")
                        .WithMany()
                        .HasForeignKey("SubscriptionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProfessionId1Navigation");

                    b.Navigation("Roles");

                    b.Navigation("StatusNavigation");

                    b.Navigation("SubscriptionTypes");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("BeginnerWebApiRC1.Models.BeginnerUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.ApplicationStatus", b =>
                {
                    b.Navigation("EmployeeApplications");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Offer", b =>
                {
                    b.Navigation("EmployeeApplications");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Participant", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Person", b =>
                {
                    b.Navigation("EmployeeApplications");

                    b.Navigation("Messages");

                    b.Navigation("Offers");

                    b.Navigation("Participants");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Profession", b =>
                {
                    b.Navigation("Offers");

                    b.Navigation("People");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.Status", b =>
                {
                    b.Navigation("Offers");

                    b.Navigation("People");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.SubscriptionType", b =>
                {
                    b.Navigation("People");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Beginner.UserRole", b =>
                {
                    b.Navigation("People");
                });

            modelBuilder.Entity("BeginnerWebApiRC1.Models.BeginnerUser", b =>
                {
                    b.Navigation("EmployeeApplications");

                    b.Navigation("Messages");

                    b.Navigation("Offers");

                    b.Navigation("Participants");
                });
#pragma warning restore 612, 618
        }
    }
}
