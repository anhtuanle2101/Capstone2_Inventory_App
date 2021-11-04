# Final Project Proposal @Springboard


### 1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.
    - To build a **Node/Express** backend with **React** on the frontend.
### 2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application? 
    - My plan is going to build a full-stack application with a focus more on the back-end side.  
### 3. Will this be a website? A mobile app? Something else? 
    - This will be a website application with possibility development into a mobile app later on.
### 4. What goal will your project be designed to achieve?
    - This will help materialize the concepts on React, Node/Express, and other more advanced topics like database design, APIs, authentication and authorization, possibly apply a few complex data structures and algorithms, etc.
    
    - This application will be an inventory app where it can help keep track of a restaurants’ inventory items, then can be filtered/ searched/ sorted quickly with shortcut buttons, and also create a graph for the items over time for business insights.
### 5. What kind of users will visit your app? In other words, what is the demographic of your users? 
    - Users would be restaurant owners/ managers that might find struggled doing the inventory in daily/ weekly basis plus the analysis from the graphs the program which can  help which items are the best-sellers (customers coming back for) or the behind (low purchased items on menu)
### 6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API. 
    - I might create an API with user authentication/ authorization, data input/output between the client and the database ( save/get inventory items to/from databases), data processing ( create insight graphs/ analysis on data ), etc. with a possible of populating data for the different item’s description or using data processing function helper from different APIs.
### 7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: 
#### a. What does your database schema look like?

- **Users** {
        Id (PK): int
        Username*: varchar unique
        Password*: varchar
        Email*: varchar (email validator)
        is_admin*: boolean 
    }
- **Items** {
        Id (PK): int
        Name*: varchar
        Description: varchar 
        Department*(FK to `departments.code`): varchar(3)
    }
- **Departments** {
        Id (PK): int
        Code*: varchar(3) 
        Description: varchar
    }
- **Inventories** {
        Id (PK): int
        name*: varchar
        inventory_date*: datetime
        complate_flag*: boolean
        templated_by*(FK to `template_lists.id`): int
        inventory_by*(FK to `users.id`): int
    }
- **Inventories_Items** {
        Inventory_id (PK, FK to `inventories.id`): int
        item_id(PK, FK to items.id): int
        Quantity*: int default = 0 | last_quantity
        quantity_flag*: boolean
        complete_flag*: boolean
    }
- **Template_Lists** {
        Id (PK): int
        name*: varchar
        Description: varchar
        created_date*: datetime
        created_by*(FK to `users.id`): int
    }
- **Users_Lists** {
        user_id(PK, FK `users.id`): int
        list_id(PK, FK `lists.id`): int
        read_access*: boolean
        edit_access*: boolean
        delete_access*: boolean
    }
- **Items_Lists** {
        item_id(PK, FK to `items.id`): int
        list_id(PK, FK to `template_list.id`): int
        quantity_lower_bound*: int
        last_quantity*: int
    }

#### b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data. 
    - I might run into issues with analysing the data from inventory, which is that I do not have a large dataset in the beginning, so it won’t be very effective. Also, as I use an outside API for the analysis, very high chances that the inventory items data schema won’t match.
    
    - Also, I don’t have much experience in creating a business graph for the analysis part in the application which will be quite anxious to tackle. 
#### c. Is there any sensitive information you need to secure? 
    - Account password and private information

    - Inventory Lists (only admin and authorized users can make changes)
#### d. What functionality will your app include? 
    - Create/manage multiple inventory list
  
    - Inventory processing

    - Manage data from inventory
#### e. What will the user flow look like? 
    - It will be built as a single page web application with tools from React
    
    - Users will be asked to log in if they already have an account or signed up if not.
    
    - User can choose either to manage the inventory lists or do an inventory
    
    - In inventory lists management, users can see the inventory lists’ information and the items information they have read access to and the items within, users might edit or delete them depending on whether they have access to. Users also create a new inventory from these inventory list templates.
    
    - For doing an inventory, the inventory must be chosen with an existing template list, then we can edit over the inventory list and when every item is completed the list will be marked as completed.
#### f. What features make your site more than a CRUD app? What are your stretch goals?
    - Some analysis feature helps to figure out the high-demand or best profitable items from the inventory.
    
    - Can be used as useful extension/ API to other different restaurants applications.

### Sources:

#### Database Schema 

**Link:** [Inventory Database Schema](https://dbdiagram.io/d/6184117cd5d522682df909e2)

#### Figma Prototype

**Link:** [Inventory App Figma Prototype](https://www.figma.com/file/6XQrQmTnFBX0mGSgAsc3dw/Inventory-App-Figma-Prototyping?node-id=0%3A1)

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




