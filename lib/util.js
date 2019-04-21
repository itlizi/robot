
const xml2js = require('xml2js')
const compile = require('./tpl')

exports.parseXML = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, {trim: true}, (err, content) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(content)
      }
    })
  })
}

exports.tpl = (Content, message) => {
  let MsgType = 'text'
  const { ToUserName, FromUserName, MsgId, } = message

  let info = Object.assign({}, {
    Content,
    MsgType,
    CreateTime: Date.now(),
    ToUserName,
    FromUserName,
    MsgId
  })

  return compile(info)
}

const formatMsg = (result) => {
  let message = {}
  if (typeof result === 'object') {
    const keys = Object.keys(result)
    for (let i=0; i<keys.length; i++) {
      let key = keys[i]
      let item = result[key]

      if (!(Array.isArray(item) || item.length == 0)) {
        continue
      }

      if (item.length === 1) {
        let val = item[0]
        if (typeof val === 'object') {
          message[key] = formatMsg(val)
        }
        else {
          message[key] = val
        }
      }
      else {
        message[key] = []

        for (let j=0; j<item.length; j++) {
          message[key].push(formatMsg(item[j]))
        }
      }

    }
  }

  return message
}

exports.formatMsg = formatMsg
