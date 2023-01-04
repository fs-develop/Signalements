namespace Signalement.API.Data
{
    using Signalement.API.Classes;
    using Signalement.API.Contracts;
    using Signalement.API.Enums;
    using Signalement.API.Models;

    public static class ApiData
    {
        private static readonly List<Author> _authors = ReadAllAuthors();
        private static readonly List<Observation> _observation = ReadAllObservations();
        private static readonly List<SignalementContract> _signalements = ReadAllSignalements();

        /// <summary>
        /// Gets the author.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns>Author if found, otherwise Null.</returns>
        public static Author? GetAuthor(string email)
        {
            return _authors.SingleOrDefault(a => a.Email.Equals(email, StringComparison.Ordinal));
        }

        /// <summary>
        /// Gets the observation.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Observation if found, otherwise Null.</returns>
        public static Observation? GetObservation(int id)
        {
            return _observation.SingleOrDefault(o => o.Id == id);
        }

        /// <summary>
        /// Gets the reportings.
        /// </summary>
        /// <returns>Reportings list</returns>
        public static List<SignalementContract> GetReportings()
        {
            return _signalements;
        }

        /// <summary>
        /// Gets the reporting by author email.
        /// </summary>
        /// <param name="authorEmail">The author email.</param>
        /// <returns>Reports object if found, otherwise Null.</returns>
        public static SignalementContract? GetReportingByAuthorEmail(string authorEmail)
        {
            return _signalements.SingleOrDefault(s => s.Author.Email.Equals(authorEmail, StringComparison.Ordinal));
        }

        /// <summary>
        /// Gets the observations.
        /// </summary>
        /// <returns>Observations list</returns>
        public static List<Observation> GetObservations()
        {
            return _observation;
        }

        /// <summary>
        /// Saves the reporting.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="action">The action.</param>
        /// <remarks>Add or Update DATA in DataBase.</remarks>
        /// <returns>Added object or Null.</returns>
        public static SignalementContract? SaveReporting(ReportingModel model, DBAction action)
        {
            if (action == DBAction.Add)
            {
                return AddReporting(model);
            }
            else if (action == DBAction.Update)
            {
                return UpdateReporting(model);
            }

            return null;
        }

        /* Add or Update DATA in DataBase */

        private static SignalementContract AddReporting(ReportingModel model)
        {
            List<Observation> observations = new List<Observation>();
            foreach (int idx in model.Observations)
            {
                Observation? observation = ApiData.GetObservation(idx);
                if (observation is not null)
                {
                    observations.Add(observation);
                }
            }

            // Create and add a new author
            Author author = new Author(model);
            _authors.Add(author);

            // Get maximum reporting list id.
            int maxId = _signalements.DefaultIfEmpty().Max(r => (r is null) ? 0 : r.Id);

            // Create a new signalement
            SignalementContract signalement = new()
            {
                Id = maxId + 1,
                Author = author,
                Description = model.Description,
                Observations = observations
            };

            // Add signalement to list
            _signalements.Add(signalement);

            // Return the new signalement object
            return signalement;
        }

        private static SignalementContract? UpdateReporting(ReportingModel model)
        {
            List<Observation> observations = new List<Observation>();
            foreach (int idx in model.Observations)
            {
                Observation? observation = ApiData.GetObservation(idx);
                if (observation is not null)
                {
                    observations.Add(observation);
                }
            }

            // Get signalement in list
            SignalementContract? signalement = _signalements.SingleOrDefault(s => s.Id == model.Id);
            if (signalement is not null)
            {
                // Update the author linked to the signalement
                signalement.Author.First_name = model.Author.First_name;
                signalement.Author.Last_name = model.Author.Last_name;
                signalement.Author.Birth_date = model.Author.Birth_date;
                signalement.Author.Sex = model.Author.Sex;

                // Update signalement
                signalement.Description = model.Description;

                signalement.Observations.Clear();
                signalement.Observations.AddRange(observations);
            }

            // Return the updated signalement object
            return signalement;
        }

        /* Fake 'Get DATA' from DataBase */

        private static List<Author> ReadAllAuthors()
        {
            List<Author> authorList = new()
            {
                new Author()
                {
                    First_name = "John",
                    Last_name = "Doe",
                    Email = "j.doe@mobireport.com",
                    Birth_date = "1990-01-01",
                    Sex = "Homme"
                },
                new Author()
                {
                    First_name = "Leanne",
                    Last_name = "Graham",
                    Email = "sincere@april.biz",
                    Birth_date = "1980-06-10",
                    Sex = "Femme"
                }
            };

            return authorList;
        }

        private static List<Observation> ReadAllObservations()
        {
            List<Observation> observationList = new()
            {
                new Observation() { Id = 1, Name = "Observation 1" },
                new Observation() { Id = 2, Name = "Observation 2" },
                new Observation() { Id = 3, Name = "Observation 3" }
            };

            return observationList;
        }

        private static List<SignalementContract> ReadAllSignalements()
        {
            SignalementContract signalement1 = new()
            {
                Id = 1,
                Author = ApiData.GetAuthor("j.doe@mobireport.com"),
                Description = "Un soucis sur mon réseau",
            };
            signalement1.Observations.Add(ApiData.GetObservation(1));

            SignalementContract signalement2 = new()
            {
                Id = 2,
                Author = ApiData.GetAuthor("sincere@april.biz"),
                Description = "Un soucis sur mon réseau",
            };
            signalement2.Observations.Add(ApiData.GetObservation(2));
            signalement2.Observations.Add(ApiData.GetObservation(3));

            return new List<SignalementContract> { signalement1, signalement2 };
        }
    }
}

