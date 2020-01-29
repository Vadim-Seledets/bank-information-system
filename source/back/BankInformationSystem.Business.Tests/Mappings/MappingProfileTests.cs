using System;
using AutoMapper;
using BankInformationSystem.Business.Mappings;
using FluentAssertions;
using NUnit.Framework;

namespace BankInformationSystem.Business.Tests.Mappings
{
    [TestFixture]
    public class MappingProfileTests
    {
        [Test]
        public void MappingProfile_Should_BeValid()
        {
            // Arrange
            var configuration = new MapperConfiguration(
                config => config.AddProfile(new MappingProfile()));

            // Act
            Action configCheck = () => configuration.AssertConfigurationIsValid();

            // Assert
            configCheck.Should().NotThrow();
        }
    }
}