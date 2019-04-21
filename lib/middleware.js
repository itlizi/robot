
const sha1 = require('sha1')
const rawBody = require('raw-body')
const util = require('./util')

module.exports = (config, reply) => {
  return async (ctx, next) => {
    const {
      signature, timestamp, nonce, echostr
    } = ctx.query
    console.log(ctx.query)
    const token = config.wechat.Token
    let str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
  
    if(ctx.method === 'GET') {
      if(signature !== sha) {
        ctx.body = '签名有误'
      } 
      else {
        ctx.body = echostr
      }
    }
    else if(ctx.method === 'POST') {
      if(signature !== sha) {
        ctx.body = '签名有误'
      } 
      
      const data = await rawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      })

      const content = await util.parseXML(data);
      const message = await util.formatMsg(content.xml);
      ctx.message = message
      console.log('message')
      console.log(message)

      await reply.apply(ctx, [ctx, next])
      const xml = util.tpl(ctx.body, message)
      ctx.status = 200
      ctx.type = 'application/xml'
      ctx.body = xml
    }
  }
}
