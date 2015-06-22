# meme-generator

## Deployment
`cd app`  
`meteor deploy <site> --settings ../settings.json`  

## settings.json
```javascript
{
  "imgflip": {
    "template_id": "XXXXXXXX",
    "username": "XXXXXXXXXX",
    "password": "XXXXXXXXXXXX",
    "top_text": "TOP",
    "bottom_text": "BOTTOM"
  },
  "slack": {
    "webhook_url": "https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX"
  },
  "twitter": {
    "consumer_key": "XXXXXXXXXXXXXXXXXXXXXXXXX",
    "consumer_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "access_token_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "id": XXXXXXXXX
  }
}
```
