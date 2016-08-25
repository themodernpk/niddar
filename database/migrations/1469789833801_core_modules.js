'use strict'

const Schema = use('Schema')

class CoreModulesSchema extends Schema {

  up () {
    this.dropIfExists('core_modules')
    this.create('core_modules', (table) => {
      table.increments()
      table.string("name")
      table.string("slug").unique()
      table.string("version").nullable()
      table.boolean("enable").default(0)
      table.integer('created_by').nullable()
      table.integer('updated_by').nullable()
      table.integer('deleted_by').nullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('core_modules')
  }

}

module.exports = CoreModulesSchema
