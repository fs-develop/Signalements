namespace Signalement.API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Signalement.API.Classes;
    using Signalement.API.Contracts;
    using Signalement.API.Data;
    using Signalement.API.Enums;
    using Signalement.API.Helpers;
    using Signalement.API.Models;

    public class ReportingController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<SignalementContract>> GetReporting()
        {
            try
            {
                return this.Ok(ApiData.GetReportings());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<List<SignalementContract>> GetObservations()
        {
            try
            {
                return this.Ok(ApiData.GetObservations());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult AddReporting([FromBody] ReportingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ReportingHelper.GetModelStateErrors(ModelState));
            }

            if (string.IsNullOrEmpty(model.Author.Email))
            {
                return this.BadRequest(ErrorHelper.AuthorEmailError("The email address is invalid!"));
            }

            try
            {
                // Check if the Author email address exists
                Author? author = ApiData.GetAuthor(model.Author.Email);
                if (author is null)
                {
                    // If the author's email address does not exist, add the report
                    SignalementContract? signalement = ApiData.SaveReporting(model, DBAction.Add);
                    return this.Ok(signalement);
                }

                return this.BadRequest(ErrorHelper.AuthorEmailError("This value already exist"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public ActionResult UpdateReporting([FromRoute] int id, [FromBody] ReportingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ReportingHelper.GetModelStateErrors(ModelState));
            }

            if (id != model.Id)
            {
                return BadRequest("Impossible d'identifier correctement les données à mettre à jour");
            }

            try
            {
                bool executeUpdate = false;

                SignalementContract? linkedReporting = ApiData.GetReportingByAuthorEmail(model.Author.Email);
                if (linkedReporting is not null)
                {
                    // Yes, the author's email exists,
                    // so check if the linked report is the current report to update
                    executeUpdate = linkedReporting.Id == id;
                }

                if (executeUpdate)
                {
                    // The author's email address does not exist or 
                    // is linked to the current report to be updated
                    ApiData.SaveReporting(model, DBAction.Update);
                    return this.NoContent();

                    // Always returns the updated object
                    // SignalementContract? signalement = ApiData.SaveReporting(model, DBAction.Update);
                    // return this.Ok(signalement);
                }

                return this.BadRequest(ErrorHelper.AuthorEmailError("This value already exist"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}