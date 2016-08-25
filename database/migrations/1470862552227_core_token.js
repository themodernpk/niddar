'use strict'

const Schema = use('Schema')

class CoreTokenSchema extends Schema {

  up () {
    this.create('core_tokens', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('core_users')
      table.string('token', 40).notNullable().unique()
      table.boolean('forever').defaultTo(false)
      table.boolean('is_revoked').defaultTo(false)
      table.timestamp('expiry')
      table.timestamps()
    })
  }

  down () {
    this.drop('core_tokens')
  }

}

module.exports = CoreTokenSchema
