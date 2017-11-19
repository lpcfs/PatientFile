// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyC7P5U1O1iu77NA2nQMTaX98GPog6ZGoHw",
    authDomain: "cfs-patientfile.firebaseapp.com",
    databaseURL: "https://cfs-patientfile.firebaseio.com",
    projectId: "cfs-patientfile",
    storageBucket: "cfs-patientfile.appspot.com",
    messagingSenderId: "665427709555"
  }
};
