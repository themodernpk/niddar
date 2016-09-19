'use strict'
const Lucid = use('Lucid');
const Validator = use('Validator');
const Encryption = use('Encryption');
const Niddar = use("App/Niddar");
const Setting = use("App/Model/Niddar/Setting");
const table = "core_permissions";
var result;
class Permission extends Lucid {

    //---------------------------------------------
    static get table() {
        return table;
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
    static createRules() {
        return {
            validation: {
                name: 'required',
                slug: 'unique:' + table + ',slug'
            },
            messages: {
                'name.required': Niddar.helper.validationMessages('required', 'Permission name'),
                'slug.unique': Niddar.helper.validationMessages('unique', 'Permission name'),
            },
            sanitize: {
                name: 'title',
                slug: 'slug|decapitalize'
            }
        }
    }

    //---------------------------------------------
    static updateRules(ID) {
        return {
            validation: {
                encryptedID: 'required',
                name: 'unique:' + table + ',name,id,${ID}',
                slug: 'unique:' + table + ',slug,id,${ID}'
            },
            messages: {
                'encryptedID.required': Niddar.helper.validationMessages('required', 'ID'),
                'name.required': Niddar.helper.validationMessages('required', 'Permission name'),
                'name.unique': Niddar.helper.validationMessages('unique', 'Permission name'),
                'slug.unique': Niddar.helper.validationMessages('unique', 'Permission name'),
            },
            sanitize: {
                name: 'title',
                slug: 'slug|decapitalize'
            }
        }
    }

    //---------------------------------------------
    *createItem(input) {
        //..............validation
        const validation = yield Validator
            .validateAll(input, Permission.createRules().validation, Permission.createRules().messages);
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
        var input = Validator.sanitize(input, Permission.createRules().sanitize);
        //..............if exist record exist then return value with warning
        var item = yield Permission.query().where('slug', input.slug).first();
        if (item) {
            result = {
                status: "warning",
                data: item,
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
        var item = new Permission();
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
                    message: "Record created"
                }
            ]
        };
        return result;
    }

    //---------------------------------------------
    *listItems(page) {
        try {
            const list = yield Permission.query().orderBy('id', 'desc').paginate(page, Setting.recordPerPage());
            result = {
                status: "success",
                data: list.toJSON()
            };
            return result;
        } catch (e) {
            result = {
                status: "failed",
                errors: [{message: e.message}]
            };
            return result;
        }
    }

    //---------------------------------------------
    *toggleStatus(input) {
        console.log("response", input);
        //..............validation
        var rules = {
            id: 'required'
        };
        const validation = yield Validator.validateAll(input, rules);

        if (validation.fails()) {
            var result = {
                status: "failed",
                errors: validation.messages()
            };
            return result;
        }

        try {
            const item = yield Permission.findBy('id', input.id);
            if (item.enable == 1) {
                item.enable = 0;
            } else {
                item.enable = 1;
            }
            yield item.save();
            result = {
                status: "success",
                data: item.toJSON()
            };
            return result;
        } catch (e) {
            result = {
                status: "failed",
                errors: [{message: e.message}]
            };
            return result;
        }
    }

    //---------------------------------------------
    *deleteItem(input) {
        console.log("response", input);
        //..............validation
        var rules = {
            id: 'required'
        };
        const validation = yield Validator.validateAll(input, rules);

        if (validation.fails()) {
            var result = {
                status: "failed",
                errors: validation.messages()
            };
            return result;
        }

        try {
            const item = yield Permission.findBy('id', input.id);
            item.enable = 0;
            yield item.save();
            yield item.delete()
            result = {
                status: "success",
                data: item.toJSON()
            };
            return result;
        } catch (e) {
            result = {
                status: "failed",
                errors: [{message: e.message}]
            };
            return result;
        }
    }
    //---------------------------------------------
    static check(slug) {
        //if slug not exist then create
        /*
         if exist then check whether permission is
         allowed to the current logged in user of not
         */
    }

    //---------------------------------------------
    //---------------------------------------------
    //---------------------------------------------
    //---------------------------------------------
}
module.exports = Permission
