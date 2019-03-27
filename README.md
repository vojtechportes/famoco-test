# Famoco Test App

## Notes

Responsive design of app is not perfect due to issues I had with @material-ui and typescript. This is mostly issue in case of Typography.

## Structure

```
/etc - webpack configuration
/public - app template
/src - app source files
|_ /client - frontend part of app
  |_ /components - common components
  |_ /scenes - app scenes and sub components
  |_ /services - rest api services and interfaces
  |_ /strings - i18n content and string interfaces
  |_ /theme - styled components theme
  |_ /utils
|_ /server - backend part of app
.env - development env variables. Production env variables are set manually on Heroku
...
```

## Technology

- react
- typescript
- styled-components
- @material-ui

...

## Scripts

- `clean` - will remove build folder
- `build` - will create production bundle
- `build:server` - will create server side part of bundle
- `build:client` - wii create client side part of bundle
- `start` - will run production version
- `dev` - will run dev version
- `postinstall` - will run postinstall scripts
- `lint` - will run css and js linters
- `lint:css` - will run only css linter

## Production deployment

https://famoco-event-app.herokuapp.com
