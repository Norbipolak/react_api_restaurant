/*
Importing useParams:
First, you need to import useParams from react-router-dom:
*/
import { useParams } from 'react-router-dom';
/*
Defining Route with Parameters:
In your routing configuration, you define routes with parameters using a colon (:) followed by the parameter name. For example, if you have a route that should capture an id, you would define it like this:
*/
<Route path="/recipes/:id" component={RecipeDetail} />
/*
Using useParams in a Component:
Inside the component rendered by this route (e.g., RecipeDetail), you call useParams to extract the parameters from the URL:
*/
const { id } = useParams();
/*
The useParams hook returns an object where the keys are the parameter names and the values are the corresponding segments from the URL.
****************************************************************************************************************************************
*/

/*
localStorage is a web storage API provided by HTML5 that allows you to store data locally within a user's browser. This data persists even after the browser is closed and reopened, making it different from sessionStorage, which only lasts for the duration of the page session.

Methods of localStorage

1. setItem(key, value):
Stores a key-value pair in localStorage.
Example: localStorage.setItem('username', 'john_doe');

2. getItem(key):
Retrieves the value associated with the given key.
Example: const username = localStorage.getItem('username');

3. removeItem(key):
Removes the key-value pair associated with the given key.
Example: localStorage.removeItem('username');

4. clear():
Clears all key-value pairs in localStorage.
Example: localStorage.clear();

5. key(index):
Returns the name of the key at the specified index.
Example: const firstKey = localStorage.key(0);

6. length (Property):
Returns the number of key-value pairs in localStorage.
Example: const totalItems = localStorage.length;

Most Used Methods
setItem(key, value):
This method is commonly used to store data. For instance, when a user logs in, you might store their session token or user details.
*/
localStorage.setItem('token', 'abc123');
/*
getItem(key)
This is frequently used to retrieve stored data. For example, you might retrieve a user's session token to make authenticated API requests.
*/
const token = localStorage.getItem('token');
/*
removeItem(key):
This method is often used to remove specific data. For example, when a user logs out, you might remove their session token.
*/
localStorage.removeItem('token');
/*
clear():
Useful for logging out a user or resetting the application state. It removes all stored data.
*/
localStorage.clear();
/*
Practical Example
*/
// Store user information
localStorage.setItem('username', 'john_doe');
localStorage.setItem('email', 'john@example.com');

// Retrieve user information
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
console.log(username, email); // Output: john_doe john@example.com

// Remove a specific item
localStorage.removeItem('email');

// Clear all items
localStorage.clear();
/*
Considerations
Data stored in localStorage is limited to about 5-10MB, depending on the browser.
Data is stored as strings, so you may need to serialize complex data structures (e.g., using JSON.stringify and JSON.parse).
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
localStorage is synchronous, so it might block the main thread if used extensively for large data.
*/
