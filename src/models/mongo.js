'use strict';

/** Class representing a generic mongo model. */
class Model {

  /**
   * Model Constructor
   * @param schema {object} - mongo schema
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Retrieves one or more records
   * @param filters {object} optional mongo filters
   * @returns {array} array of records
   */
  async get(filters) {
    if (filters === null || filters === undefined) {
      filters = {};
    } else if (typeof filters === 'number' || typeof filters === 'string'){
      filters = {id: Number.parseInt(filters.toString())};
    }
    const query = this.schema.find(filters);
    const result = await query.exec();
    return result;
  }
  

  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */
  post(record) {
    // Call the appropriate mongoose method to create a new record
    return this.schema.create(record);
  }

  /**
   * Replaces a record in the database
   * @param id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */
  put(id, record) {
    // Call the appropriate mongoose method to update a record
    return this.schema.findByIdAndUpdate(id, record, { new: true });
  }

  /**
   * Deletes a recod in the model
   * @param id {string} Mongo Record ID
   * @returns {*}
   */
  delete(id) {
    // Call the appropriate mongoose method to delete a record
    return this.schema.findByIdAndDelete(id);
  }

  deleteMany(filters) {
    return this.schema.deleteMany(filters);
  }
}

module.exports = Model;
