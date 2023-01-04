namespace Signalement.API.Models
{
    using Signalement.API.Classes;

    /// <summary>
    /// Reporting Model class.
    /// </summary>
    /// <remarks>Model class to get reporting data from client for add or update.</remarks>
    /// <seealso cref="Signalement.API.Classes.Signalement" />
    public class ReportingModel : Signalement
    {
        /// <summary>
        /// Gets or sets the observations identifier.
        /// </summary>
        /// <value>
        /// The observations identifier.
        /// </value>
        public int[] Observations { get; set; } = Array.Empty<int>();
    }
}
