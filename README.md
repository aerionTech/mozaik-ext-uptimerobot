# mozaik-ext-uptimerobot
[Uptime Robot](https://uptimerobot.com/) widget for [Mozaïk](http://mozaik.rocks/) v1

## Setup
- Install module from npm:
  ```shell
  npm install mozaik-ext-uptimerobot
  ```
- Register client api by adding to dashboard `src/server.js`:

  ```javascript
  import uptimerobot from 'mozaik-ext-uptimerobot/client';
  mozaik.bus.registerApi('uptimerobot', uptimerobot);
  ```

- Register widgets by adding to dashboard ``src/App.jsx``:

  ```javascript
  import uptimerobot from 'mozaik-ext-uptimerobot';

  Mozaik.Registry.addExtensions({
      uptimerobot
  });
  ```
- Add UPTIMEROBOT_API_KEY to `.env`

- Build the dashboard:

  ```shell
  npm run build-assets
  ```

## Configuring widget
### example

```javascript
{
    type: 'uptimerobot.monitors',
    statuses: "9", // only down monitors
    columns: 1, rows: 1,
    x: 0, y: 1
}
```

### parameters

key           | required | description
--------------|----------|---------------
`statuses`    | no       | If not used, will return all monitors statuses (up, down, paused) in an account. Else, it is possible to define any number of monitor statuses like: statuses="2-9")