
const axios = require('axios')
const URL = 'http://openapi.tuling123.com/openapi/api/v2'

exports.reply = async (ctx, next) => {
  const { MsgType, Event, Content='', PicUrl, FromUserName } = ctx.message
  console.log('----ctx.message----')
  console.log(ctx.message)
  let reply = ''
  let params = {}
  const options = {
    "userInfo": {
      "apiKey": "72742a4f2cb343099903e1ec4c87f46b",
      "userId": FromUserName
    }
  }

  if(MsgType == 'event') {
    if(Event == 'subscribe') {
      reply = `嗨您好！我叫知音！`
    }
  } else {
    switch(MsgType) {
      case 'text':
        params = {    
          "reqType":0,
          "perception": {
            "inputText": {
              "text": Content
            }
          }
        }
      break;
      case 'voice':
        params = {    
          "reqType":0,
          "perception": {
            "inputText": {
              "text": ctx.message.Recognition
            }
          }
        }
      break;
      case 'image':
        params = {    
          "reqType":1,
          "perception": {
            "inputImage": {
              "url": PicUrl
            }
          }
        }
      break;
    }
  
    Object.assign(options, params)
    const result = await axios.post(URL, options)
    const { results } = result.data
    console.log('----results----')
    console.log(results)
    reply = results[0].values.text
  }
  
  ctx.body = reply
  await next()
}