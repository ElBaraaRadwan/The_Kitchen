# The_Kitchen

_____
## Installation

The_Kitchen Project requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd The_Kitchen
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```
___
## Routes

| TIP DESC | TIP Route |
| ------ | ------ |
| Get req All TIPs | [https://localhost:5000/getAllTIPs][PlDb] |
| Get req for specific TIP  | [https://localhost:5000/getTIPs/:id][PlGh] |
| Patch req for editing/updating specific TIP  | [https://localhost:5000/editTIPs/:id][PlGd] |
| Delete req for delete specific TIP | [https://localhost:5000/deleteTIPs/:id][PlOd] |
| Post req for Creating TIP | [https://localhost:5000/createTIPs][PlMe] |

| Recipe DESC | Recipe Route |
| ------ | ------ |
| Get req All Recipes | [https://localhost:5000/getAllRecipe][PlDb] |
| Get req for specific Recipe  | [https://localhost:5000/getRecipe/:id][PlGh] |
| Get req for All Recipe that a specific user create it  | [https://localhost:5000/getAllRecipe/myRecipe/:id][PlGd] |
| Patch req for editing/updating specific Recipe  | [https://localhost:5000/editRecipe/:id][PlOd] |
| Delete req for delete specific Recipe  | [https://localhost:5000/deleteRecipe/:id][PlMe] |
| Post req for Creating Recipe  | [https://localhost:5000/createRecipe][PlGa] |

| Users DESC | Users Route |
| ------ | ------ |
Working on it

| Uploads DESC | Uploads Route |
| ------ | ------ |
| Get req for specific TIP Image  | [https://localhost:5000/uploads/TIPs/IMG/...The_IMG_Name][PlDb] |
| Get req for specific TIP Video   | [https://localhost:5000/getTIPs/:id][PlGh] |
| Get req for specific Recipe Video  | [https://localhost:5000/uploads/Recipes/Video/...The_Video_Name][PlGd] |
| Get req for specific Recipe Image | [https://localhost:5000/uploads/Recipes/IMG/...The_IMG_Name][PlOd] |

| Dashboard DESC | Dashboard Route |
| ------ | ------ |
| GET req for every info that will display to the Admin  | [https://localhost:5000/Dashboard/Admin][PlDb] |

## License

MIT

**Free Software, Hell Yeah!**

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>