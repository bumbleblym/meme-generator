var Tweets = new Mongo.Collection('tweets');

var tokenizer = Meteor.npmRequire('sbd');

Tweets.before.insert(function(userId, doc) {
  var sentences = tokenizer.sentences(doc.text).map(_.unescape);
  var text0 = sentences.slice(0, sentences.length / 2).join(' ') || Meteor.settings.imgflip.top_text;
  var text1 = sentences.slice(sentences.length / 2).join(' ') || Meteor.settings.imgflip.bottom_text;

  // Generate meme
  var res = request.postSync('https://api.imgflip.com/caption_image', {
    formData: {
      template_id: Meteor.settings.imgflip.template_id,
      username: Meteor.settings.imgflip.username,
      password: Meteor.settings.imgflip.password,
      text0: text0,
      text1: text1
    },
    json: true
  });

  // Add img/url fields to doc
  doc.imgflip = {
    img: res.body.data.url,
    url: res.body.data.page_url
  };

  // Post img to Slack
  request.postSync(Meteor.settings.slack.webhook_url, {
    body: {
      'text': doc.imgflip.img
    },
    json: true
  });
});

Meteor.startup(function() {
  var Twit = Meteor.npmRequire('twit');
  var T = new Twit(Meteor.settings.twitter);
  var stream = T.stream('statuses/filter', {
    follow: Meteor.settings.twitter.id
  });

  stream.on('tweet', Meteor.bindEnvironment(function(tweet) {
    Tweets.insert(tweet);
  }));
});
