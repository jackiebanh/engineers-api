# Ocean Sensation

## Team Members
- Jackie Banh
- Karlo Diamante

## Cloud Platform and Services
- Digital Ocean (App Platform, MongoDB)

## Insights
DigitalOcean provides developers cloud services that help to deploy and scale applications that run simultaneously on multiple computers. DigitalOcean also runs Hacktoberfest which is a month-long celebration (October 1-31) of open source software run in partnership with GitHub and Twilio. (from Wikipedia)

### Things we Liked
- Source to image support
- Auto deploy enabled
- CLI / REST API support is good
- IaC support is good

### Limitations
- App Platform can only integrate with GitHub repositories, GitLab repositories, or public Git repositories over HTTPS. Support for other source providers is planned.
- Deploy logs disappear on errors, and therefore hard to get more info on the error
- No VPC support for App platform, public networking - public by default, so have to do whitelisting
- App Spec not supporting mongodb - had to reverse engineer
- Unable to upgrade DB from 'development' to 'production'. Mongo is considered a 'Production Database'. Had to create Mongo DB manually and attach
- Closest region is Singapore
- CRON jobs not supported

## Digital Ocean Drama
https://joel.net/how-one-guy-ruined-hacktoberfest2020-drama

## How to Get Started
0. Make sure you create a [Digital Ocean](https://www.digitalocean.com) account
1. Download the Digital Ocean `doctl` CLI. Instructions can be found [here](https://github.com/digitalocean/doctl)
2. On your terminal, go to the root folder of this app and run `doctl apps create --spec .do/app.yaml`
3. ???
4. Profit