# ghprofile.me
Essential tools to spice up your GitHub Profile READMEs!

#### This API is currently in BETA. We're constantly adding new features to make it easier for you to make 🔥 GitHub READMEs! I would really appreciate it if you give us a ⭐ so this README can become awesome too 💖

# Important Links
- [**Documentation**](https://docs.ghprofile.me/)
- [Discord Server](https://discord.kevinthomas.codes/)
- [Support this project](https://paypal.me/tmkev)

# Features
- README View Counter - [Documentation](https://docs.ghprofile.me/features/view-counter)
- More coming soon!

# GitHub Documentation

## README View Counter
![](https://api.ghprofile.me/view?username=TrustedMercury-ghprofile.me&label=repository%20view%20count)

### Quickstart
#### Profile READMEs
Add the code below to your Profile README. Replace ``YOUR_USERNAME`` with your GitHub username. Now your GitHub Profile Views will automatically increment every time someone views your profile. Unfortunately, we cannot differentiate unique views yet :(
```
![](https://api.ghprofile.me/view?username=YOUR_USERNAME)
```

#### Repository READMEs
Add the code below to your Repository README. Replace ``YOUR_USERNAME`` with your GitHub username, then replace ``YOUR_REPOSITORY_NAME`` with your GitHub repository name! Now your GitHub Profile Views will automatically increment every time someone views your profile. Unfortunately, we cannot differentiate unique views yet :(
```
![](https://api.ghprofile.me/view?username=YOUR_USERNAME-YOUR_REPOSITORY_NAME&label=repository%20view%20count)
```

### Customization
Customize your counter image by adding the URLs of the desired styles and colors you want to the end of your counter URL!

#### Custom Styles
```
![](https://api.ghprofile.me/view?username=trustedmercury-ghprofile.me&style=YOUR_STYLE)
```
- ``&style=plastic``
![](https://api.ghprofile.me/view?username=TESTING&style=plastic)
- ``&style=flat``
![](https://api.ghprofile.me/view?username=TESTING&style=flat-)
- ``&style=flat-square``
![](https://api.ghprofile.me/view?username=TESTING&style=flat-square)
- ``&style=for-the-badge``
![](https://api.ghprofile.me/view?username=TESTING&style=for-the-badge)
- ``&style=social``
![](https://api.ghprofile.me/view?username=TESTING&style=social)

#### Custom Colors
![](https://api.ghprofile.me/view?username=TESTING&color=green)
```
![](https://api.ghprofile.me/view?username=YOUR_USERNAME&color=YOUR_COLOR)
```
Colours can be -
- CSS Named Colours (``red``, ``green``, ``blue``)
- Hex Codes (``FF0000``, ``00FF00``, ``0000FF``)

#### Custom Text
![](https://api.ghprofile.me/view?username=TESTING&label=hello)
```
![](https://api.ghprofile.me/view?username=YOUR_USERNAME&label=YOUR_CUSTOM_TEXT_HERE)
```

### Coming Soon
- Intuitive web dashboard for statistics and configuration


## Development
1. Install docker.
2. Setup a dev container with the following commands.
```bash
# Add a container for postgres
docker run --rm --name postgres-db -p 5432:5432 -e POSTGRES_PASSWORD=mypassword -d postgres
# Enter the container
docker exec -it postgres-db bash
# Start the postgres cli
psql --host=0.0.0.0 --user postgres
# Copy + paste the text from the setup.sql
# This will create the needed tables
# Close the postgres cli
exit
# Exit the container
```
3. Start the app with. Feel free to use PM2 instead.
```bash
PORT=9000 DATABASE=postgres DATABASE_HOST=localhost DATABASE_USER=postgres DATABASE_PASSWORD=mypassword npm start
```
