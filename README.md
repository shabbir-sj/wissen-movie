# wissen-movie

### Website Link: [https://obscure-cliffs-31908.herokuapp.com/](https://obscure-cliffs-31908.herokuapp.com/)

### Install node and npm:

verify you have nvm installed with version 5 of node. If you already have node and nodemon installed, you can skip this step.

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
nvm install 5.0
nvm use 5.0
npm install -g nodemon
```

### Project Setup:
Go into project directory and install all dependencies, which are required for our project.

```sh
npm install
```

### Creating final project build:

verify you have grunt cli intalled globally.

```sh
npm install -g grunt-cli.
```

verify you have karma cli intalled globally.

```sh
npm install -g karma-cli.
```

After executing below command, it will create a dist directory in your current path, which will contain minified version of code, which we can use in production for deployment.

```sh
grunt
```


### Testing project build:

```sh
karma start
```

### Run project locally in browser:

Move your terminal to project directory where package.json exist: cd <path-to-project>
Now Start the server:

```sh
npm start
```

Open localhost:3010 in a browser.
