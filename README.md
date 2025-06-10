 # Folder structure:
    
   1. -- /components :   Contains modules for pages 
   2. -- /src/components : Components used in the website like header , footer etc
   3. -- /pages      : Contains the main 5 pages of the website
   4. -- /assets     : static files like images , videos , logo etc
   4. -- /styles     : Contains css files for pages and component
   4. -- /lib/api     : Contains api for pages data

# How to use

Install all the dependencies required by the Next to do that just run the command\
``` sudo yarn install ```

To run the Next Application in development mode run the command\
``` sudo yarn run dev ```

To run the Next Application in Production mode run the command\
``` sudo yarn run build ```
``` sudo yarn run start ```

1. To create new pages in your application go to create pages inside /pages folder

2. In /lib/api.js change api url and bearer token with your api and token to get access

3. open wordpress admin with 
    username : admin
    password : *******

4. To obtain graphql endpoint open GrahQL settings you can get graphql endpoint from their

5. To obtain auth token open graphql playground and run the following mutation
    mutation MyMutation {
        login(input: {password: "{wordpress-password}", username: "{wordpress-username}"}) {
        authToken
        refreshToken
    }
}
    



