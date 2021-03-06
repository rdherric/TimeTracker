﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using TimeTracker.Data.Context;

namespace TimeTracker.Data.Migrations
{
    [DbContext(typeof(TimeTrackerContext))]
    [Migration("20171114175524_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TimeTracker.Data.Entity.Project", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Client")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("Description")
                        .HasMaxLength(1024);

                    b.Property<bool>("IsDefault");

                    b.HasKey("Id");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("TimeTracker.Data.Entity.Task", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1024);

                    b.Property<DateTime>("EndDateTime");

                    b.Property<bool>("IsInSystemOfRecord");

                    b.Property<long>("ProjectId");

                    b.Property<DateTime>("StartDateTime");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("Task");
                });

            modelBuilder.Entity("TimeTracker.Data.Entity.Task", b =>
                {
                    b.HasOne("TimeTracker.Data.Entity.Project", "Project")
                        .WithMany("Tasks")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
