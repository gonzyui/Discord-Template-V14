const { embed } = require('../../utils/Utils');
const PokemonAPI = require('pokemon-api-wrapper');
const api = new PokemonAPI();

module.exports = class PokemonCommand extends Command {
    constructor() {
        super({
            name: "pokemon",
            aliases: ["poke"],
            description: "Find a pokemon, a type, a chain evolves",
            usage: "<pokemon>",
            category: "Fun",
            ownerOnly: false,
            cooldown: 5000,
            memberPerms: ['SEND_MESSAGES'],
            clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS', 'EMBED_MESSAGES'],
        });
    }

    async exec(message, args) {
        await message.channel.sendTyping();

        if (!args || args.length === 0) {
            try {
                const randomPokemon = await api.getRandomPokemon();
                if (!randomPokemon || !randomPokemon.name) {
                    throw new Error('Random Pokemon data is incomplete or missing.');
                }
                const embedMessage = embed(message.client)
                    .setTitle(randomPokemon.name.charAt(0).toUpperCase() + randomPokemon.name.slice(1))
                    .addFields(
                        { name: 'Type', value: randomPokemon.types.join(', '), inline: true, },
                        { name: 'Attacks', value: randomPokemon.moves.slice(0, 3).join(', '), inline: true,},
                    )
                    .setImage(randomPokemon.sprites.front_default);

                message.channel.send({ embeds: [embedMessage] });
            } catch (error) {
                message.client.logger.error(error);
                message.channel.send('An error occurred while fetching the Pokémon.');
            }
        } else {
            try {
                const pokemonName = args[0].toLowerCase();
                const pokemonData = await api.getPokemon(pokemonName); // Correction : usage de 'getPokemon'
                if (!pokemonData || !pokemonData.name) {
                    message.channel.send("Pokémon not found.");
                    return;
                }
                const embedMessage = embed(message.client)
                    .setTitle(pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1))
                    .addFields(
                        { name: 'Type', value: pokemonData.types.join(', '), inline: true},
                        { name: 'Attacks', value: pokemonData.moves.slice(0, 3).join(', '), inline: true},
                    )
                    .setImage(pokemonData.sprites.front_default);

                message.channel.send({ embeds: [embedMessage] });
            } catch (error) {
                message.client.logger.error(error);
                message.channel.send('Pokémon not found or unable to fetch data.');
            }
        }
    }
};
