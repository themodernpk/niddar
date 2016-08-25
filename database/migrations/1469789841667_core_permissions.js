'use strict'

const Schema = use('Schema')

class CorePermissionsSchema extends Schema {

  up () {
    this.dropIfExists('core_permissions')
    this.create('core_permissions', (table) => {
      table.increments()
      table.integer('core_module_id').unsigned().nullable().references('id').inTable('core_modules')
      table.string('name')
      table.string('slug').unique()
      table.string('details')
      table.boolean('enable').default(1)
      table.integer('created_by').nullable()
      table.integer('updated_by').nullable()
      table.integer('deleted_by').nullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('core_permissions')
  }

}

module.exports = CorePermissionsSchema
