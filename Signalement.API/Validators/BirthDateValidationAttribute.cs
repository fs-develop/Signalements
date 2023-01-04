namespace Signalement.API.Validators
{
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;

    /// <summary>
    /// Custom birthdate validation attribute class.
    /// </summary>
    /// <seealso cref="System.ComponentModel.DataAnnotations.ValidationAttribute" />
    public class BirthDateValidationAttribute : ValidationAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BirthDateValidationAttribute"/> class.
        /// </summary>
        /// <param name="errorMessage">The error message to associate with a validation control.</param>
        public BirthDateValidationAttribute(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        /// <summary>
        /// Returns true if ... is valid.
        /// </summary>
        /// <param name="value">The value of the object to validate.</param>
        /// <returns>
        ///   <see langword="true" /> if the specified value is valid; otherwise, <see langword="false" />.
        /// </returns>
        public override bool IsValid(object value)
        {
            string? strDate = value.ToString();
            if (string.IsNullOrEmpty(strDate))
            {
                return true;
            }

            DateTime birthDate;
            if (DateTime.TryParseExact(strDate,
                                       "yyyy-MM-dd",
                                       CultureInfo.InvariantCulture,
                                       DateTimeStyles.None,
                                       out birthDate))
            {
                // Valid birthDate format
                DateTime minDate = DateTime.Now.AddYears(-100);
                return (minDate <= birthDate) && (birthDate <= DateTime.Now);
            }

            return false;
        }
    }
}
