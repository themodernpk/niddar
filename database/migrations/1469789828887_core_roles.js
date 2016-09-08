'use strict'

const Schema = use('Schema')

class CoreRolesSchema extends Schema {

  up () {
    this.dropIfExists('core_roles')
    this.create('core_roles', (table) => {
        table.increments()
        table.string('name')
        table.string('slug').unique()
        table.string('details')
        table.boolean('enable').default(0)
        table.integer('created_by').nullable()
        table.integer('updated_by').nullable()
        table.integer('deleted_by').nullable()
        table.timestamps()
        table.softDeletes()
      })
  }

  down () {
    this.drop('core_roles')
  }

}

module.exports = CoreRolesSchema
