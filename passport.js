const passport = require('passport');

const GoogleStrategy=require('passport-google-oauth20').Strategy;
const GitHubStrategy=require('passport-github2').Strategy;

const model=require('./model/name')

const GOOGLE_CLIENT_ID="157018788429-k7ipm5a9njbkqugkehis9l23p1c1fgng.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"


// const GITHUB_CLIENT_ID="af96c93ddc33121f1ecb"
// const GITHUB_CLIENT_SECRET="09fa4fd82e3e10de5605ce9c39e59b4350b1b842"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken,res, refreshToken, profile, done) {
    done(null,profile)
    console.log('response',profile)
    //model.test.insert(profile)
    //     const sub = new model({
    //       id:profile.id,
    //     displayName:profile.displayName,
    //     name:profile.name.familyName,
    //     givenName:profile.name.givenName,
    //     provider:profile.provider,
    //     //email:profile.emails[0].value
    //     //console.log()
    // })
    try {
      console.log('entered into loop',sub)
        const savesub = await sub.save()
        // res.send(savesub)
        console.log(savesub)
    } catch (err) {
        console.log(err)
    }
  }
));

// passport.use(new GitHubStrategy({
//   clientID: GITHUB_CLIENT_ID,
//   clientSecret: GITHUB_CLIENT_SECRET,
//   callbackURL: "/auth/github/callback"
// },
// async function(accessToken, refreshToken, profile, done) {
//   done(null,profile)
//   const sub = new model({
//     id:profile.id,
//     displayName:profile.displayName,
//     //name:profile.name.familyName,
//     //givenName:profile.name.givenName,
//     profileURL:profile.profileUrl,
//     provider:profile.provider,
//     username:profile.username
//     //console.log()
// })
// try {
//   console.log('entered into loop',sub)
//     const savesub = await sub.save()
//    // res.send(savesub)
//     console.log(savesub)
// } catch (err) {
//     console.log(err)
// }

// }
// ));


passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

