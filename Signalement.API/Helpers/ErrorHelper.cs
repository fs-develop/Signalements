namespace Signalement.API.Helpers
{
    public static class ErrorHelper
    {
        /// <summary>
        /// The author email error object.
        /// </summary>
        /// <param name="errorMessage">The error message.</param>
        /// <returns>Author email error object.</returns>
        public static dynamic AuthorEmailError(string errorMessage)
        {
            return new
            {
                author = new
                {
                    email = new string[] { errorMessage }
                }
            };
        }
    }
}
