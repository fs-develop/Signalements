namespace Signalement.API.Contracts
{
    using Signalement.API.Classes;

    /// <summary>
    /// Signalement Contract class.
    /// </summary>
    /// <remarks>Contract class to send reporting data to client.</remarks>
    /// <seealso cref="Signalement.API.Classes.Signalement" />
    public class SignalementContract : Signalement
    {
        /// <summary>
        /// Gets or sets the observations.
        /// </summary>
        /// <value>
        /// The observations.
        /// </value>
        public List<Observation> Observations { get; set; } = new List<Observation>();
    }
}
