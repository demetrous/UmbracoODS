using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace UmbracoODS.Controllers.Api
{
  public static class MultipleResultSets
  {
    public static MultipleResultSetWrapper MultipleResults(this IAPWebReportsEntities db, string storedProcedure)
    {
      return new MultipleResultSetWrapper(db, storedProcedure);
    }

    public class MultipleResultSetWrapper
    {
      private readonly IAPWebReportsEntities _db;
      private readonly string _storedProcedure;
      public List<Func<IObjectContextAdapter, DbDataReader, IEnumerable>> _resultSets;

      public MultipleResultSetWrapper(IAPWebReportsEntities db, string storedProcedure)
      {
        _db = db;
        _storedProcedure = storedProcedure;
        _resultSets = new List<Func<IObjectContextAdapter, DbDataReader, IEnumerable>>();
      }

      public MultipleResultSetWrapper With<TResult>()
      {
        _resultSets.Add((adapter, reader) => adapter
          .ObjectContext
          .Translate<TResult>(reader)
          .ToList());

        return this;
      }

      public List<IEnumerable> Execute()
      {
        var results = new List<IEnumerable>();

        using (var connection = _db.Database.Connection)
        {
          connection.Open();
          var command = connection.CreateCommand();
          command.CommandText = "EXEC " + _storedProcedure;

          using (var reader = command.ExecuteReader())
          {
            var adapter = ((IObjectContextAdapter)_db);
            foreach (var resultSet in _resultSets)
            {
              results.Add(resultSet(adapter, reader));
              reader.NextResult();
            }
          }

          return results;
        }
      }
    }
  }
}
