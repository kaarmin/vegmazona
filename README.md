
# Vegmazona #
Web based project inspired to provide e-kirana platform for vendors using react and node.js




## Contributors ##

Dibyarupa Jena  <dibyarupajena@gmail.com>


### Documentation ###

1. Created an index.html of three areas

    - Header
    - Main
    - Footer


2. Created a grid container for products display

    - div grid-container class created
    - class styled, display as grid


3. Classes for header, main, footer created and styled


4. Grid area column and group set in style sheet

5. Effects styled to links on hovering
    - header links, cart and signin added


6. Homescreen created

    - Product, image, price, rating etc added and styled


7. Sidebar section created

    - hamburger menu added and styled
    - Shopping categories made
    - opening and closing functions onclick to x
    - script tags added at the end


8. Created react app and shifted files

    - to create app of the name "frontend" from terminal:
    - ``` npx create-react-app frontend ```
    
    - ```cd frontend``` (Inside created react app)

    - ```npm start``` (will open the app in default browser)

    - all html(from index.html inbetween the body tags) is copied to app.js inside src folder

    - all css(style.css in this case) is copied to index.css inside src folder

    - images copied to created images folder in public folder




9. Products rendered

    - Instead of static data, dynamic array data is created
    - Tomato replaced by {product.name} etc dynamic data
    - data.js is created and imported in app.js
    - Object containing objects of producted created

10. Two screens created

    - react-router-dom installed : 
    
    - ```cd frontend ```
    
    - ```npm install react-router-dom  ```

    - <BrowserRouter> start and end tags are closed across the divs  of app.js
    - ```<Routhe path="/" component={HomeScreen} />``` inside content class of main class of app.js, also 
    done for product screen. This means path "/" or "/products/:id" refer to component HomeScreen or ProductScreen.
    - Inside src, created folder Screens, inside which created HomeScreen.js with a function 
    homescreen(props) taking parameter, returning text HomeScreen. export default homescreen(why?). Same done for productScreen.js ...
    - Import both files to app.js 
    - also import ``` import {BrowserRouter, Routhe} from 'react-router-dom';``` in app.js
    - the ul component of product is cut pasted into homescreen.js and import as done

11. Linking done
    - Instead of <a href> tags search directs through changed url id on click
    - ```  <Link to={'/product/' + product._id}> ``` - for eg- localhost3000/product/2472    