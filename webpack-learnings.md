[Resource](https://blog.ag-grid.com/webpack-tutorial-understanding-how-it-works/)

# What is Webpack? How it works?
Webpack is a module bundler. It takes disparate dependencies, creates modules for them and bundles the entire network up into manageable output files. 
This is especially useful for Single Page Applications (SPAs).

Let's say we have 3 different js files one depend on other, and to use them in html file, we have to maintain the order of how they have implemented otherwise we are not able to process the changes. so webpack will handle this better hence we no need to worry about the order now.

Bundling and Modularisation are Webpack’s main features. Through plugins & loaders we can further extend this (we’ll see this later) but primarily this is what Webpack is for.

Loaders are how Webpack can process content other than JavaScript. With Loaders we can get Webpack to process many types of files — CSS, Images, TypeScript and ES2015 code and so on
```javascript
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/, // We need to tell the Loader that we only want it to process JavaScript files. We don't want it to look for CSS, HTML, images and so on - only JavaScript (.js) files. In order to do so, we provide a regex expression that will match .js files
                loader: 'babel-loader', // The loader to use - in this case the Babel Loader
                exclude: /node_modules/, // We don't want Babel to process any files under node_modules
                query: {
                    presets: ['es2015'] // which Babel Preset (or rules) we want to apply - in our case we're looking for Babel to convert ES2015 code
                }
            },
            {
                test: /\.css$/, // as before, we need to tell the Loaders that we only want it to process CSS files - this regex will only process .css files
                loaders: ['style-loader', 'css-loader'] // the loaders to use. Note that this time it's plural as we're supplying an array of Loaders. Also note that Webpack processes Loaders from right to left, so the results of css-loader (the file contents) are passed to style-loader (adding the styles to the HTML document)
            },
            // add other loaders
        ]
    }
};
```
Let's think about 
[more info]https://blog.ag-grid.com/webpack-tutorial-understanding-how-it-works/ has very good examples must see to understand what is it for
