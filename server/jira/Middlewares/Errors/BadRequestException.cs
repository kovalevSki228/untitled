using System;

namespace Jira.Middlewares.Errors
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message)
        {

        }
    }
}
