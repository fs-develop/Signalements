using Signalement.API.Models;
using Signalement.API.Validators;
using System.ComponentModel.DataAnnotations;

namespace Signalement.API.Classes
{
    /// <summary>
    /// Author class
    /// </summary>
    public class Author
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Author"/> class.
        /// </summary>
        /// <param name="model">The Reporting Model object.</param>
        /// <exception cref="System.ArgumentNullException">Invalid model</exception>
        public Author(ReportingModel model)
        {
            if (model == null) throw new ArgumentNullException("Invalid model");

            this.First_name = model.Author.First_name;
            this.Last_name = model.Author.Last_name;
            this.Email = model.Author.Email;
            this.Birth_date = model.Author.Birth_date;
            this.Sex = model.Author.Sex;
        }
        /// <summary>
        /// Initializes a new instance of the <see cref="Author"/> class.
        /// </summary>
        public Author()
        {
        }

        /// <summary>
        /// Gets or sets the first name.
        /// </summary>
        /// <value>
        /// The first name.
        /// </value>
        [MaxLength(GlobalConstants.MaxLenUserData)]
        public string? First_name { get; set; }

        /// <summary>
        /// Gets or sets the last name.
        /// </summary>
        /// <value>
        /// The last name.
        /// </value>
        [MaxLength(GlobalConstants.MaxLenUserData)]
        public string? Last_name { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>
        /// The email.
        /// </value>
        [Required(AllowEmptyStrings = false, ErrorMessage = "L'adresse email est obligatoire")]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the birth date.
        /// </summary>
        /// <value>
        /// The birth date.
        /// </value>
        [BirthDateValidation("La date d'anniversaire est invalide")]
        public string? Birth_date { get; set; }

        /// <summary>
        /// Gets or sets the sex.
        /// </summary>
        /// <value>
        /// The sex.
        /// </value>
        public string? Sex { get; set; }
    }
}
