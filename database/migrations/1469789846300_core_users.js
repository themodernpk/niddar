'use strict'

const Schema = use('Schema')

class CoreUsersSchema extends Schema {

  up () {
    this.dropIfExists('core_users')
    this.create('core_users', (table) => {
      table.increments()
      table.integer('core_country_id').unsigned().nullable().references('id').inTable('core_countries')
      table.string('email').notNullable().unique()
      table.string('mobile').unique()
      table.string('username').unique()
      table.string('password').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name')
      table.enum('gender', ['m', 'f']).nullable()
      table.date('birth_date').nullable()
      table.boolean('enable').default(0)
      table.string('activation_code').unique().nullable()
      table.datetime('activated_at').nullable()
      table.string('apikey').nullable().unique()
      table.string('reset_code').unique().nullable()
      table.datetime('reset_at').nullable()
      table.datetime('last_login').nullable()
      table.string('last_login_ip').nullable()
      table.integer('created_by').nullable()
      table.integer('updated_by').nullable()
      table.integer('deleted_by').nullable()
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('core_users')
  }

}

module.exports = CoreUsersSchema
