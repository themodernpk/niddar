'use strict'

const Schema = use('Schema')

class CoreUserContactsSchema extends Schema {

  up () {
    this.dropIfExists('core_user_contacts')
    this.create('core_user_contacts', (table) => {
      table.increments()
      table.string('type')
      table.integer('core_country_id').unsigned().nullable().references('id').inTable('core_countries')
      table.string('value')
      table.integer('created_by').unsigned().nullable().references('id').inTable('core_users')
      table.integer('updated_by').unsigned().nullable().references('id').inTable('core_users')
      table.integer('deleted_by').unsigned().nullable().references('id').inTable('core_users')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('core_user_contacts')
  }

}

module.exports = CoreUserContactsSchema
