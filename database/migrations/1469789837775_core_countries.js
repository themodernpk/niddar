'use strict'

const Schema = use('Schema')

class CoreCountriesSchema extends Schema {

  up () {
    this.dropIfExists('core_countries')
    this.create('core_countries', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('slug').unique()
      table.string('country_iso2_code').unique()
      table.string('country_iso3_code').unique()
      table.string('currency').unique()
      table.string('currency_code').unique()
      table.string('dialing_code').unique()
      table.integer('created_by').nullable()
      table.integer('updated_by').nullable()
      table.integer('deleted_by').nullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('core_countries')
  }

}

module.exports = CoreCountriesSchema
