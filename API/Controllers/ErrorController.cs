using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    /*
        

           This class handel  the issue of trying to request a non-existent any End point
        That is, he tried to connect via an incorrect endpoint, for example
            https://localhost:5001/anything
            Here we have a line in the Startup class
          app.UseStatusCodePagesWithReExecute("/errors/{0}");
            And turns it into a class
            So we create an object from the class returned
            ApiResponse
            Which we control the shape of the returned error in general
            
    
    */
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}