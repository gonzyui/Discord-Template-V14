const { PermissionsBitField } = require("discord.js");

global.Command = module.exports = class Command {
    constructor(options) {

        this.name = options.name || "";
        this.aliases = options.aliases || [];
        this.description = options.description || "";
        this.usage = options.usage || "";
        this.category = options.category || "Misc";
        this.ownerOnly = Boolean(options.ownerOnly) || false;
        this.cooldown = Number(options.cooldown) || 3000;
        this.memberPerms = this.resolvePermissions(options.memberPerms);
        this.clientPerms = this.resolvePermissions(options.clientPerms);
    }

    resolvePermissions(permissionsArray) {
        return permissionsArray.reduce((acc, perm) => acc | PermissionsBitField.Flags[perm.toUpperCase()], 0);
    }

    async exec(...args) {
        throw new Error(`${this.name} ne possède pas la méthode exec !!`);
    }
}
