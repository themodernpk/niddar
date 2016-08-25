'use strict'

const Schema = use('Schema')

class CoreRolePermissionSchema extends Schema {

  up () {
    this.create('core_role_permission', (table) => {
      table.increments()
      table.integer('core_role_id').unsigned().nullable().references('id').inTable('core_roles')
      table.integer('core_permission_id').unsigned().nullable().references('id').inTable('core_permissions')
      table.timestamps()
    })
  }

  down () {
    this.drop('core_role_permission')
  }

}

module.exports = CoreRolePermissionSchema
