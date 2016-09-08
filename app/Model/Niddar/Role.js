'use strict'
const Lucid = use('Lucid');
const Validator = use('Validator');
const Niddar = use('App/Niddar');
const Encryption = use('Encryption');
const Database = use('Database');
const table = "core_roles";
class Role extends Lucid {

  //---------------------------------------------
  //---------------------------------------------
  static get table() {
    return table
  }

  //---------------------------------------------
  static get deleteTimestamp() {
    return null
  }

  //---------------------------------------------
  static get dateFormat() {
    return 'YYYY-MM-DD HH:mm:ss'
  }

  //---------------------------------------------
  permissions() {
    return this.belongsToMany('App/Model/Niddar/Permission')
  }

  //---------------------------------------------
  users() {
    return this.belongsToMany('App/Model/Niddar/User')
  }

  //---------------------------------------------
  static rules(roleId) {
    return {
      validation: {
        name: 'required',
        slug: 'unique:' + table + ',name,id,${roleId}'
      },
      messages: {
        'name.required': Niddar.helper.validationMessages('required', 'Role name'),
        'slug.unique': Niddar.helper.validationMessages('unique', 'Role name'),
      },
      sanitize: {
        name: 'camel_case',
        slug: 'slug|decapitalize'
      }
    }
  }

  //---------------------------------------------
  static rulesUpdate(roleId) {
    return {
      validation: {
        encryptedID: 'required',
        name: 'unique:' + table + ',name,id,${roleId}',
        slug: 'unique:' + table + ',slug,id,${roleId}'
      },
      messages: {
        'encryptedID.required': Niddar.helper.validationMessages('required', 'ID'),
        'name.required': Niddar.helper.validationMessages('required', 'Role name'),
        'name.unique': Niddar.helper.validationMessages('unique', 'Role name'),
        'slug.unique': Niddar.helper.validationMessages('unique', 'Role name'),
      },
      sanitize: {
        name: 'camel_case',
        slug: 'slug|decapitalize'
      }
    }
  }

  //---------------------------------------------
  *readItem(id) {
    var result = {};
    try {
      var item = yield Role.findOrFail(id);
      var en = Encryption.encrypt(id);
      item.encryptedID = en;
      result = {
        status: "success",
        data: item
      }
    } catch (e) {
      result = {
        status: "failed",
        errors: [
          {
            message: "Record does not exist"
          }
        ]
      }
    }
    return result;
  }

  //---------------------------------------------
  *createItem(input) {

    //..............validation
    const validation = yield Validator
      .validateAll(input, Role.rules().validation, Role.rules().messages);
    if (validation.fails()) {
      var result = {
        status: "failed",
        errors: validation.messages()
      };
      return result;
    }
    //..............if slug is not defined
    if (!input.slug) {
      input.slug = input.name;
    }
    //..............sensitization
    var input = Validator.sanitize(input, Role.rules().sanitize);
    //..............if exist
    const getRole = yield Role.query().where('slug', input.slug).first();
    if (getRole) {
      result = {
        status: "warning",
        data: getRole,
        messages: [
          {
            type: "error",
            message: "Record already exist"
          }
        ]
      };
      return result;
    }
    //..............create the record
    const role = new Role();
    Object.keys(input).forEach(function (key) {
      role[key] = input[key];
    });
    yield role.save();
    result = {
      status: "success",
      data: role,
      messages: [
        {
          type: "success",
          message: "Role created"
        }
      ]
    };
    return result;
  }

  //---------------------------------------------
  *updateItem(input) {

    //..............get id from encrypted ID
    input.id = Encryption.decrypt(input.encryptedID);

    //..............validation
    const validation = yield Validator
      .validateAll(input, Role.rulesUpdate(input.id).validation, Role.rulesUpdate(input.id).messages);
    if (validation.fails()) {
      var result = {
        status: "failed",
        errors: validation.messages()
      };
      return result;
    }
    //..............if slug is not defined
    if (!input.slug) {
      input.slug = input.name;
    }
    //..............sensitization
    var input = Validator.sanitize(input, Role.rulesUpdate(input.id).sanitize);

    delete input.encryptedID;



    //find the item or false
    try {
      var item = yield Role.findOrFail(input.id);
      Object.keys(input).forEach(function (key) {
        item[key] = input[key];
      });
      yield item.save();
      result = {
        status: "success",
        data: item,
        messages: [
          {
            type: "success",
            message: "Record is updated"
          }
        ]
      }
    } catch (e) {
      result = {
        status: "failed",
        errors: [
          {
            message: e.message
          }
        ]
      };
    }
    return result;
  }

  //---------------------------------------------
  *getList(data) {
    const role = yield Role.query().orderBy('id', 'desc').paginate(1, 5);
    return role.toJSON();
  }

  //---------------------------------------------
  //---------------------------------------------
  //---------------------------------------------
}
module.exports = Role
