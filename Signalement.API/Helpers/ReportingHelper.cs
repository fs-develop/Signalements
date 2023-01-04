namespace Signalement.API.Helpers
{
    using Microsoft.AspNetCore.Mvc.ModelBinding;

    /// <summary>
    /// Reporting Helper class.
    /// </summary>
    public static class ReportingHelper
    {
        /// <summary>
        /// Gets the model state errors.
        /// </summary>
        /// <param name="ModelState">State of the model.</param>
        /// <returns>String with model state errors separated by pipe.</returns>
        public static string GetModelStateErrors(ModelStateDictionary ModelState)
        {
            return string.Join("|", ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage));
        }
    }
}
