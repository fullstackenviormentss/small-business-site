# Census for Small Business
A site for small businesses to understand how they can use and be empowered by Census data using the [U.S. Web Design Standards](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

Created by the [Civic Digital Fellowship](https://blog.codingitforward.com/introducing-the-2017-civic-digital-fellows-60970e35391)

## Getting Started
To run this site locally you will need to install gulp globally through [npm](https://docs.npmjs.com/getting-started/installing-node)
```
npm install --global gulp
```
Then install the dependencies by running
```
npm install
```
This creates a local `node_modules` directory with all the plugins referenced in `gulpfile.js`


## Editing content
This project is structured to easily incorporate updates in the U.S. Web Design Standards. Before editing content you'll need to understand how the files are structured.  

### File structure
The files are structured as follows:
```
├── dist
├── src
├── .gitignore
├── gulpfile.js
├── package.json
```
Files in the `dist` folder are never touched. Any changes or additions to content are made in the `src` files. In order to have changes or additions reflected in the `dist` folder, run:
```
> gulp
```
which will call the default method in `gulpfile.js`, which is all of the methods including a `watch` method that will actively watch for changes as you edit and compile files to `dist` with each save. 

### Publishing content to github pages

The project repository [census-small-business](https://github.com/uscensusbureau/census-small-business) is the production-ready version of the `dist` folder. To release a new version, clone the `census-small-business` repository locally and commit the `dist` folder contents to the repository.

_______________________________________________________________________________________________________________

#### Concept
The goal of this project was to demonstrate how the Census Bureau can begin to orient itself as a user-centered agency, as well as demonstrate what using the U.S. Web Design Standards could look like for the Census Bureau. 

To see the full presentation shown at the Department of Commerce on August 8, 2017, please take a look at the [Census for Small Business](https://github.com/uscensusbureau/cdfdemoday) deck. 







