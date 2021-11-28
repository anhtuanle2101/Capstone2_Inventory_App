const { BadRequestError } = require("../expressError");

/**
 * 
 * @param {*} dataToUpdate {Object} { field1: val1, field2: val2 }
 * @param {*} jsToSql {Object} maps js-style data fields to database column names
 *  for example { firstName: "first_name", age: "age" }
 * 
 * @returns {Object} { setCols, values }
 * 
 * @example dataToUpdate = { firstName: "test", age: 22 } 
 *          jsToSql = { firstName: "first_name", age: "age"}
 *      =>{ setCols: `"first_name"=$1, "age"=$2`,
 *          values: ["test", 22] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate)
  };
}

module.exports = { sqlForPartialUpdate };