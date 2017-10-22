# nagios-telegram-notify-me

## Project Setup
```bash
$ yarn install
```

```bash
$ cp src/config/config.yml.dist src/config/config.yml
```

## Configuration
To configure the script, set the follow parameters:
```bash
.
└── src
    └── config
        └── config.yml
```
- src/config/config.yml - Add your telegram bot id and chat ids.

## RUN
Examples:

```bash
$ node main.js --verbose --messenger=telegram --object_type=service --servicestate="OK" --hostname="rsilveira.com" --servicedesc="load" --output="OK - load average: 0.02 0.01 0.01"
```

```bash
$ node main.js --verbose --messenger=telegram --object_type=service --servicestate="WARNING" --hostname="rsilveira.com" --servicedesc="load" --output="WARNING - load average: 3.48 4.19 2.74"
```

```bash
$ node main.js --verbose --messenger=telegram --object_type=service --servicestate="CRITICAL" --hostname="rsilveira.com" --servicedesc="load" --output="CRITICAL - load average: 233.29 154.35 15.05"
```

```bash
$ node main.js --verbose --messenger=telegram --object_type=host --hoststate="UNREACHABLE" --hostname="rsilveira.com" --output="Network Unreachable (rsilveira.com)"
```

```bash
$ node main.js --verbose --messenger=telegram --object_type=host --hoststate="DOWN" --hostname="rsilveira.com" --output="PING CRITICAL - Packet loss = 100%"
```

```bash
$ node main.js --verbose --messenger=telegram --object_type=host --hoststate="DOWN" --hostname="rsilveira.com" --hoststate="UP" --output="PING OK - Packet loss = 0%, RTA = 3.74 ms"
```