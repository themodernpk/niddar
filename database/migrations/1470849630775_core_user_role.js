'use strict'

const Schema = use('Schema')

class CoreUserRoleSchema extends Schema {

  up () {
    this.create('core_user_role', (table) => {
      table.increments()
      table.integer('core_user_id').unsigned().nullable().references('id').inTable('core_users')
      table.integer('core_role_id').unsigned().nullable().references('id').inTable('core_roles')
      table.timestamps()
    })
  }

  down () {
    this.drop('core_user_role')
  }

}

module.exports = CoreUserRoleSchema
