module.exports={
    mailer:{
        service:'Gmail',
        auth:{
            user:'reacheventup@gmail.com',
            pass:'qazwsx369',
        }
    },
    database : 'mongodb+srv://sanjay:sanjay123@cluster0.49i3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    secret:'glorious',
    facebook:{
        clientID:'255732381795481',
        clientSecret:'9483f0e90a568e7b46b5dea15d752b68',
        callbackURL:'https://itutorsanjay.herokuapp.com/auth/facebook/call',
        profileFields:['id','displayName','email']
    },
    google:{
        googleClientID:'676597316116-1u8paqloho548350i48o09up3bslbj2m.apps.googleusercontent.com',
        googleClientSecret:'F1shVAxm4U4Lq5qhWr6nljLz',
        callbackURL:'/auth/google/call'
    }
}

