# Famoco Test App

## Notes

- Responsive design of app is not perfect due to issues I had with @material-ui and typescript. This is mostly issue in case of Typography.
- I have issue with service worker on Heroku
- Normally, I would also add loading UI states for each scene, but I didn't really have time to finish this part
- I picked songkick.com API

## App UI flow

### User can:
- navigate using navigation (there is only Homepage item)
- search for places from homepage or reset search results
  - search input is being validated. empty input or less than 2 characters will trigger error
- navigate to places he found or load more
- navigate to event detail
- navigate from event detail to event list

## Structure

```
/build - build folder (this folder is in .gitignore, so it is not part of this repository)
/etc - webpack configuration
/public - app template
/src - app source files
|_ /client - frontend part of app
  |_ /components - common components
  |_ /scenes - app scenes, routing logic and sub components
  |_ /services - rest api services and interfaces
  |_ /strings - i18n content and string interfaces; it is using react context api. there is only one language, if there is more, i believe it would come in handy
  |_ /theme - styled components theme
  |_ /utils
|_ /server - backend part of app
.env - development env variables; production env variables are set manually on Heroku
config.js - env schema and setup for development version
...
```

## Technology

- react
- typescript
- styled-components
- @material-ui
- koa
- formik
- ...

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
