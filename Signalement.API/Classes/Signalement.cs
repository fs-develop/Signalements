namespace Signalement.API.Classes
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Signalement class
    /// </summary>
    public class Signalement
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the author.
        /// </summary>
        /// <value>
        /// The author.
        /// </value>
        public Author Author { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        /// <value>
        /// The description.
        /// </value>
        [Required(AllowEmptyStrings = false, ErrorMessage = "La description du Signalement est obligatoire")]
        public string Description { get; set; }
    }
}
