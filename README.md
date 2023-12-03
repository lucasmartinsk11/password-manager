# Password Manager

## Overview
This password manger was created as college work for the discipline of Data Security. It has basic manager functions like store and retriever password and generate random passwords.

## Security

- **Encryption:** Passwords are stored using industry-standard encryption algorithms to ensure data security.

- **Master Password:** You need to set a master password to access the stored passwords, adding an extra layer of protection.

- **Local Storage:** All data is stored locally on your device, reducing the risk of unauthorized access.


## Running the Project

To run the project follow the next steps:

 1. Download and install [docker](https://docs.docker.com/desktop/install/mac-install/) - MACOS Version
 2. After install docker, you need to run the following code `docker run --name password-vault -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres`. It will create an docker instance with Postgres to be the vault of passwords.
 3. Using some tool that allows you communicate with databases as [DBeaver](https://dbeaver.io/download/). You need to connect to your Postgres database and run the following code
 ``
 create  table  passwords ( id  serial  primary  key, url  varchar(255) unique  not  null, user_name  varchar (255) not  null, secrect_key  varchar (255) not  NULL )``
 It will create the table that will store, the passwords
 4. Now you need to install [NodeJs](https://nodejs.org/en/download) to run the source files.
 5. Clone the rep by using it `git clone https://github.com/lucasmartinsk11/password-manager.git`
 6. Now inside the project folder run `npm install` to install all necessary dependencies.
 7. Now are you able to use the project.

**Notice**
After the above steps you are will be able to run the project. However there are some other configs that you can do but it are optionals, like change the master password that is `admin` by default. It will require some knowledge about the code to change, so do it by yourself.

## Some usages examples

- Adding a new password using the random password creation 
`node src/app.js -a/--add [url] [username]`

- Adding a new password using your own password
`node src/app.js -ap/--add_password [url] [username] [password]`

- Querying a password 
`node src/app.js -q/--query [url]`

- Deleting a password 
`node src/app.js -d/--delete [url]`

- Listing all passwords 
`node src/app.js -l/--list [url]`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This Password Manager is licensed under the MIT License

## Acknowledgments

Special thanks to the open-source community for their contributions and inspiration.

**Note:** This password manager is intended for personal use, and caution should be exercised when storing sensitive information. Always keep backups of your passwords and master password.