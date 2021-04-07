<!-- SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<p>
  <a href="https://github.com/helsingborg-stad/">
    <img src="public/hbg-github-logo-combo.png" alt="Logo" width="300">
  </a>
</p>
<h3>Haffa (återbruket web app)</h3>

Service for recycling office furniture.

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run app](#run-app)
- [Deploy](#deploy)
- [Contributing](#contributing)
- [License](#license)


## Built With

* [AWS Amplify](https://aws.amazon.com/amplify/)
* [React](https://reactjs.org/)


## Getting Started

To get a local copy up and running follow these simple steps.


### Prerequisites

* NPM
* Amplify CLI
```
npm install -g @aws-amplify/cli
```
* AWS account

Follow our [documentation](https://github.com/helsingborg-stad/dev-guide) to setup an AWS account and configure AWS vault.


### Installation

1. Create a new directory
```
mkdir <folder-name>
```
2. Navigate to directory
```
cd <folder-name>
```
3. Set session token with your AWS profile
```
aws-vault exec <aws-profile>
```
4. Initialize Amplify project
```
amplify init --app https://github.com/helsingborg-stad/aterbruket-webapp.git
```
5. Pull existing backend
```
amplify pull --appId <app-id>
```
6. Install dependencies
```
npm install
```

### Run app

```
npm run start
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## License

Distributed under the [MIT License][license-url].



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/helsingborg-stad/aterbruket-webapp.svg?style=flat-square
[contributors-url]: https://github.com/helsingborg-stad/aterbruket-webapp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/helsingborg-stad/aterbruket-webapp.svg?style=flat-square
[forks-url]: https://github.com/helsingborg-stad/aterbruket-webapp/network/members
[stars-shield]: https://img.shields.io/github/stars/helsingborg-stad/aterbruket-webapp.svg?style=flat-square
[stars-url]: https://github.com/helsingborg-stad/aterbruket-webapp/stargazers
[issues-shield]: https://img.shields.io/github/issues/helsingborg-stad/aterbruket-webapp.svg?style=flat-square
[issues-url]: https://github.com/helsingborg-stad/aterbruket-webapp/issues
[license-shield]: https://img.shields.io/github/license/helsingborg-stad/aterbruket-webapp.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/helsingborg-stad/aterbruket-webapp/master/LICENSE
[product-screenshot]: images/screenshot.png
