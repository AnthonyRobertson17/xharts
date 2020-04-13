```ascii
                       .,'          .·¨'`;        ,.·´¨;\                   ,.,   '           ,. -  .,                       ,  . .,  °                 ,. -,
     ,.,           ,'´  ;\         ';   ;'\       ';   ;::\                ;´   '· .,        ,' ,. -  .,  `' ·,          ;'´    ,   ., _';\'         ,.·'´,    ,'\
     \`, '`·.    ,·' ,·´\::'\       ;   ;::'\      ,'   ;::';             .´  .-,    ';\      '; '·~;:::::'`,   ';\       \:´¨¯:;'   `;::'\:'\    ,·'´ .·´'´-·'´::::\'
      \:';  '`·,'´,·´::::'\:;'       ;  ;::_';,. ,.'   ;:::';°           /   /:\:';   ;:'\'     ;   ,':\::;:´  .·´::\'       \::::;   ,'::_'\;'   ;    ';:::\::\::;:'
       `';'\    ,':::::;·´        .'     ,. -·~-·,   ;:::'; '         ,'  ,'::::'\';  ;::';     ;  ·'-·'´,.-·'´:::::::';          ,'  ,'::;'       \·.    `·;:'-·'´
         ,·´,   \:;·´    '       ';   ;'\::::::::;  '/::::;       ,.-·'  '·~^*'´¨,  ';::;   ;´    ':,´:::::::::::·´'           ;  ;:::;  °      \:`·.   '`·,  '
     .·´ ,·´:\   '\               ;  ';:;\;::-··;  ;::::;        ':,  ,·:²*´¨¯'`;  ;::';    ';  ,    `·:;:-·'´                ;  ;::;'           `·:'`·,   \'
  ,·´  .;:::::'\   ';    '         ':,.·´\;'    ;' ,' :::/  '       ,'  / \::::::::';  ;::';    ; ,':\'`:·.,  ` ·.,               ;  ;::;'            ,.'-:;'  ,·\
 ;    '.·'\::::;'   ,'\'             \:::::\    \·.'::::;         ,' ,'::::\·²*'´¨¯':,'\:;     \·-;::\:::::'`:·-.,';             ',.'\::;'       ,·'´     ,.·´:::'\
 ;·-'´:::::\·´ \·:´:::\              \;:·´     \:\::';          \`¨\:::/          \::\'      \::\:;'` ·:;:::::\::\'            \::\:;'        \`*'´\::::::::;·'
  \::::;:·'     '\;:·'´                          `·\;'            '\::\;'            '\;'  '     '·-·'       `' · -':::''            \;:'           \::::\:;:·´
   `*'´                                           '               `¨'                                                           °              '`*'´
```

# Purpose
Web Front-end for [metrix](https://github.com/woodgern/metrix)

We want to render timeseries data, with arbitrary schemas.

# Expected schema

## Basic Metric

```bash
$ curl 'http://localhost:8000/metrics?start_datetime=2019-12-24T17%3A38%3A00&end_datetime=2019-12-24T17%3A42%3A00'
```

```
{
  "id": <Number>,
  "metric_name": <String>,
  "data": <JSON>,
  "created_at": <UTCDatetimeString>,
  "updated_at": <UTCDatetimeString>
}
```

## Aggregate Functions


```bash
$ curl 'http://localhost:8000/metrics/count?start_datetime=2019-12-24T17%3A38%3A00&end_datetime=2019-12-24T17%3A42%3A00&metric_name=data.latency&bucket_count=1'
```

```
{
  data: {
    buckets: [
      {
        "value": <Number>,
        "bucket": <UTCDatetimeString>
      },
      ...
    ]
  }
}
```

# Current state:
![](/docs/screenshot.png)

# Development

## Available Scripts

In the project directory, you can run:

### `make local`

Runs the app in development mode **LOCALLY** with yarn.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `make server`

Runs the app in the development mode in **DOCKER**.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## CRA Boilerplate

*** BELOW THIS IS ALL BOILERPLATE FROM REACT-CREATE-APP ***

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
