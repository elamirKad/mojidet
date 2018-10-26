<div align="center">
<br>
<h1>Mojidet. Landing page.</h1>
</div>

<br>

<p align="center">
Landing page for Mojidet.
</p>

<div align="center">
<br>
<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
<img src="https://forthebadge.com/images/badges/for-you.svg" />
</div>

<br>

<hr>

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/I0bSTeR/mojidet/issues)**

First, clone the repo via git:

```bash
git clone https://github.com/I0bSTeR/mojidet.git 
```

And then install dependencies with npm.

```bash
$ cd mojidet
$ npm install
```

## Run

Start the app with command by default it is set task watch:

```bash
$ gulp
```

Alternatively, you can run with command:

```bash
$ gulp watch
```

## Building

To build apps for the local platform:

```bash
$ gulp build
```

Before building app:
1. Comment script from `./libs/` directory in `index.html`
2. Comment style from `./libs/` directory in `index.html`
3. Then build app

## How to add modules to the project

You will need to add other modules to this app, depending on the requirements of your project. For example, you may want to add [bootstrap](https://github.com/twbs/bootstrap) to use Twitter Bootstrap Grid.

⚠️ Please read the following section before installing any dependencies ⚠️

### Module Structure

This app uses a bower. This means, you will have two install packages via following command.

```bash
$ bower install [package-name]
```

1. packages will be installed to `./app/libs/`


## Maintainers

- [I0bSTeR](https://github.com/I0bSTeR)
- [ElamanGOD](https://github.com/ElamanGOD)
- [Elamir](https://github.com/)

## License

MIT © [I0bSTeR](https://github.com/I0bSTeR)