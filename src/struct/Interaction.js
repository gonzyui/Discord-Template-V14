global.Interaction = module.exports = class Interaction {
    constructor(options) {
        this.name = options.name || 'unnamed';
        this.type = options.type || 1; // 1: Slash Command, 2: User Context, 3: Message Context
        this.description = this.type === 1 ? options.description || 'No description provided' : undefined;
        this.options = options.options || [];
        this.defaultPermission = options.defaultPermission || true;
    }
    toJSON() {
        const base = {
            name: this.name,
            type: this.type,
        };

        // Add description and options for type 1 slashes
        if (this.type === 1) {
            return {
                ...base,
                description: this.description,
                options: this.options,
                default_permission: this.defaultPermission,
            };
        }

        // For context command
        return base;
    }
    async exec(...args) {
        throw new Error(`${this.name} does not provide exec method!`);
    }
};
