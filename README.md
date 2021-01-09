# A Guide To Deploying A react-router-dom React App (to gh-pages or apache servers)

This is a walkthrough of a react app deployment. The set up works well, as all stages of this set up can be implemented and it will still work in all node environments (development or production).

The files in this project can be used as a reference - they are set up as explained in this guide. So feel free to clone/fork the project if that's helpful to you.

<br />

# Create .env files

- In the root of the app, create a file named '.env.production' and a file named '.env.development'.
- Both files will store 2 variables 'PUBLIC_URL' and 'REACT_APP_PUBLIC_PATH'.
- The variables in the '.env.development' will not have any value. The file should look like this;

```
  PUBLIC_URL=
  REACT_APP_PUBLIC_PATH=
```

- The '.env.development' file stores the same variables. PUBLIC_URL which is the domain plus the path to the root of the app and REACT_APP_PUBLIC_PATH which is the path to the root of the app, so should look like this;

```
  PUBLIC_URL=https://your.domain.com/at/some/path
  REACT_APP_PUBLIC_PATH=at/some/path
```

<br />

# Direct the Router/BrowserRouter

For this project,the BrowserRouter set up is in app.js .

- Change the basename to the REACT_APP_PUBLIC_PATH variable using 'basename={process.env.REACT_APP_PUBLIC_PATH}';

```
  <Router basename={`${process.env.REACT_APP_PUBLIC_PATH}`}>
  [OR]
  <BrowserRouter basename={`${process.env.REACT_APP_PUBLIC_PATH}`}>
```

- All routes should have 'path' properties that begin with '/';
- All routes should have 'exact' properties;

```
  <Route exact path="/" component={Index} />
  <Route exact path="/home" component={Home} />
```

- All media 'src' values should be from the app root not the domain root so should not start with "/" i.e.;

```
  <img src="media/images/img1.jpg"/>
```

<br />

# For gh-pages (can be changed without affecting apache server set up)

- Before you start this section, make sure the '.env.production' file is set up as explained in the 'Create .env files' section.
- Set up a 'gh-pages' branch in your github project.
- From the GitHub gui, in settings, change the repository details so that 'Website' matches the same url as the 'PUBLIC_PATH' variable in your .env.production file;

```
  Website
  https://your.domain.com/at/some/path
```

- Edit the 'package.json' file in the app root so that the value of scripts is;

```
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

- In the terminal, from the app root, run the command 'npm run deploy';

```
  npm run deploy
```

- In a browser check the url that you used as the PUBLIC_PATH variable - it should be up and running.

<br />

# For Apache Server

- Before you start this section, make sure the '.env.production' file is set up as explained in the 'Create .env files' section.

- In the terminal, from the app root, run the command 'npm run build';

```
  npm run build
```

- Once the build has finished, drag and drop the contents of the build folder using your FTP client into the folder that you used as the PUBLIC_PATH variable.

- In a browser check the url that you used as the PUBLIC_PATH variable - it should be up and running. If not, check the section below - you may have to configure apache.

<br />

# Further Apache Set Up

For this project, in the app root, there is a copy for reference of the .htaccess file and the apache2.conf file. The .htaccess file will need to be moved to or created in the correct location. Do not replace your existing apache.conf file unless you know what you are doing - just edit the line as instructed.

- In your browser, click on a react-router-dom Link so that your path is now https://your.domain.com/at/some/path/newPage - we will call this address the 'newPage' address.

- Copy the newPage address and in a different tab paste it into the address bar. If it works your apache settings are correct.

- If the address does not work, it is because the file does not exist and you will need to redirect to the index.html page.

- Create a '.htaccess' file in your app's build folder (now in the folder that you used as the PUBLIC_PATH variable) with the following contents;

```
  FallbackResource index.html
```

- Copy the newPage address and in a different tab paste it into the address bar. If it works your apache settings are correct.

- For this step you will need root access. If your app stil doesn't work from the newPage address, you will need to change the settings so that apache knows to use the .htaccess file.

- Edit the apache config file stored at '/etc/apache2/apache2.conf'. Change the directory settings to allow the .htaccess to override, like this;

```
  <Directory /var/www/>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
```

- You will now need to restart apache. In your terminal run the command 'service apache2 restart';

```
  service apache2 restart
```

- In a browser check the url that you used as the PUBLIC_PATH variable - it should be up and running.
