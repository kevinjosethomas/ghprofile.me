# Opensource ghprofile.me ⭐
First of all, thanks for taking the time to contribute! 🎉👍

The following is a set of guidelines and conventions you must follow to get your contributions
accepted and accounted for. At the same time, these are mostly guidelines, not rules. Use your
best judgment, and feel free to propose changes to this document in a pull request.

**I don't want to read all of this, I just have a question!**
Please do not create an issue to ask a question, instead contact me in my [discord server](https://ghprofile.me/)

## Contributing
Before contributing in any manner, please read the
[code of conduct](https://github.com/trustedmercury/ghprofile.me/blob/main/CODE_OF_CONDUCT.md) and
make sure you follow all the mentioned guidelines!

* [Reporting bugs](#reporting-bugs)
* [Requesting features](#requesting-features)
* [Contributing with code](#contributing-with-code)

### Reporting Bugs
There are two places you can report bugs at -
* [Support Discord Server](https://dsc.gg/tm)
* [Creating GitHub Issues](https://github.com/trustedmercury/ghprofile.me/issues/new?assignees=&labels=bug&template=bug-report.md)

Follow the template and provide all essential information and we'll fix those pesky bugs you find!

### Requesting Features
There are two places you can request and suggest features -
* [Support Discord Server](https://dsc.gg/tm)
* [Creating GitHub Issues](https://github.com/trustedmercury/ghprofile.me/issues/new?assignees=&labels=suggestion&template=feature-request.md)

Follow the template and provide all essential information and we might implement the features you suggest!

### Contributing with code
If you decide to contribute with code, here's what you must do -
* create an issue (preferably using one of the issue templates provided)
* fork the repository and clone it locally
* make your changes while adhering to the [code of conduct](https://github.com/trustedmercury/ghprofile.me/blob/main/CODE_OF_CONDUCT.md)
and [styleguide](#conventions-and-styleguide) below
* create a new pull request [here](https://github.com/trustedmercury/ghprofile.me/compare)

I will go over your contributions and might -
* request for changes, or
* deny your PR

but we'll most likely merge your PR if you do everything you must!

## Conventions and Styleguide

### Code
* use asynchronous functions instead of promises or callbacks
* respond in API endpoints with the following format - ``return res.status().json({}).end();`` and leave lines in json!

### Style
* use ``"`` instead of ``'``, everywhere possible!
* use semicolons everywhere except after closing ``}``s like in ``if`` statements
* use ``} else {`` don't move to the next line

Implement all style changes in your PR if a manager requests them.

### Thanks for contributing and happy coding! 🎉
