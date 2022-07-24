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
| Get req All TIPs | [https://localhost:5000/getAllTIPs][Link1] |
| Get req for specific TIP  | [https://localhost:5000/getTIPs/:id][Link2] |
| Patch req for editing/updating specific TIP  | [https://localhost:5000/editTIPs/:id][Link3] |
| Delete req for delete specific TIP | [https://localhost:5000/deleteTIPs/:id][Link4] |
| Post req for Creating TIP | [https://localhost:5000/createTIPs][Link5] |

| Recipe DESC | Recipe Route |
| ------ | ------ |
| Get req All Recipes | [https://localhost:5000/getAllRecipe][Link6] |
| Get req for specific Recipe  | [https://localhost:5000/getRecipe/:id][Link7] |
| Get req for All Recipe that a specific user create it  | [https://localhost:5000/getAllRecipe/myRecipe/:id][Link8] |
| Patch req for editing/updating specific Recipe  | [https://localhost:5000/editRecipe/:id][Link9] |
| Delete req for delete specific Recipe  | [https://localhost:5000/deleteRecipe/:id][Link10] |
| Post req for Creating Recipe  | [https://localhost:5000/createRecipe][Link11] |

| Users DESC | Users Route |
| ------ | ------ |
| Get req for Facebook  | [https://localhost:5000/auth/facebook][Link12] |
| Get req for Facebook callback   | [https://localhost:5000/auth/facebook/callback][Link13] |
| Get req for Google  | [https://localhost:5000/auth/google][Link14] |
| Get req for Google callback   | [https://localhost:5000/auth/google/callback][Link15] |
| Get req for Login   | [https://localhost:5000/login][Link16] |
| Get req for Logout   | [https://localhost:5000/logout][Link17] |

| Uploads DESC | Uploads Route |
| ------ | ------ |
| Get req for specific TIP Image  | [https://localhost:5000/uploads/TIPs/IMG/...The_IMG_Name][Link18] |
| Get req for specific TIP Video   | [https://localhost:5000/getTIPs/:id][Link19] |
| Get req for specific Recipe Video  | [https://localhost:5000/uploads/Recipes/Video/...The_Video_Name][Link20] |
| Get req for specific Recipe Image | [https://localhost:5000/uploads/Recipes/IMG/...The_IMG_Name][Link21] |

| Dashboard DESC | Dashboard Route |
| ------ | ------ |
| GET req for every info that will display to the Admin  | [https://localhost:5000/Dashboard/Admin][Link22] |
| GET req for every info that will display to the User  | [https://localhost:5000/Dashboard][Link23] |

## License

MIT

**Free Software, Hell Yeah!**

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>