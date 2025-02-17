# DISCORD BOT TEMPLATE

An easy-to-use Discord bot using [DISCORD.JS](https://discord.js.org) v14.

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Issues & Contributions](#issues--contributions)
- [License](#license)

## Overview

This repository is a modern and scalable discord bot built using [discord.js](https://discord.js.org) v14.
It's made to help you get started quickly with features like slash commands, context commands and MongoDB integration.
Multi-language support is built-in, supporting both French and English out-of-the-box.

For more details, check out our [Wiki](https://github.com/gonzyui/Discord-Template-V14/wiki)

## Features

- **Slash Commands**: Easily create and manage slash commands.
- **Context Commands**: Support for user and message context menus.
- **Database Integration**: MongoDB support for persistent data.
- **Multi-Language Support**: Switch between French and English.
- **Modular Structure**: Clean and scalable codebase.
- **Open Source**: Contributions are welcome!

## Requirements

- **Node.js**: Version **22.13** or higher.
- **MongoDB**: A MongoDB cluster (Free clusters are supported).
- **Discord OAuth Scopes**: Make sure to include the `application.commands` scope when adding the bot.

## Installation

1. **Clone the repository**
    - Use:
```
git clone https://github.com/gonzyui/Discord-Template-V14.git
```
or download the `.zip` file.
2. **Install dependencies**
    - Navigate into the projet folder and run:
```
npm install
## or
yarn add
```
3. **Configure Environment Variables**

- Copy `.env.example` to `.env`
- Edit the `.env` file to include your discord token, MongoDB connection string.

4. **Run the Bot**
    - Start the bot with:
```
npm start
```

## Usage

### **Commands**

The bot includes pre-built slash and context commands.

- `/ping`
- `/help`
- `/language`
- `Avatar`

### Multi-Language

The bot supports both French and English.
You can switch the language using the `/language command.
All responses (including error messages) are automatically translated based on your server settings.

### Database

The bot uses MongoDB for storing guild settings and other persistent data.
Make sure your MongoDB instance is running and your credentials are correctly configured in the `.env` file.

## Issues & Contributions

If you encounter any issues, please open an [Issue](https://github.com/gonzyui/Discord-Template-V14/issue).
Want to contribute? Open a [Pull Request](https://github.com/gonzyui/Discord-Template-V14/pulls) and join the community !

## Known Issues

- Currently, there are no known issues.

## Contributors

Want to contribute and see your name here ? Open a [PR](https://github.com/gonzyui/Discord-Template-V14/pulls) and join us!

<table> <tr> <td> <a href="https://github.com/gonzyui"> <img src="https://avatars.githubusercontent.com/u/78351336?s=400&u=f473042a40be2436a085c0fc4ed6130125b619d7&v=4" width="100px;" alt=""/> <br /><sub><b>gonzyui</b></sub> </a> <br /><span>👑 Project Lead</span> </td> </tr> </table>

## License

This project is licensed under the MIT License. See the [License](https://github.com/gonzyui/Discord-Template-V14/blob/master/LICENSE) file for details.