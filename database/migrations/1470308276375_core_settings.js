'use strict'

const Schema = use('Schema')

class CoreSettingsSchema extends Schema {

  up () {
    this.create('core_settings', (table) => {
      table.increments()
      table.string('group').nullable()
      table.string('key').nullable()
      table.string('value').nullable()
      table.string('details').nullable()
      table.integer('created_by').nullable()
      table.integer('updated_by').nullable()
      table.integer('deleted_by').nullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('core_settings')
  }

}

module.exports = CoreSettingsSchema
