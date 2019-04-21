
const ejs = require('ejs')

const tpl = `
<xml>
  <ToUserName><![CDATA[<%= FromUserName %>]]></ToUserName>
  <FromUserName><![CDATA[<%= ToUserName %>]]></FromUserName>
  <CreateTime><%= CreateTime %></CreateTime>
  <MsgType><![CDATA[<%= MsgType %>]]></MsgType>
  <% if (MsgType === 'event') { %>
    <Event><![CDATA[<%= Event %>]]></Event>
  <% } else if (MsgType === 'text') { %>
    <Content><![CDATA[<%- Content %>]]></Content>
  <% } else if (MsgType === 'image') { %>
    <PicUrl><![CDATA[<%= PicUrl %>]]></PicUrl>
    <MediaId><![CDATA[<%= MediaId %>]]></MediaId>
  <% } else if (MsgType === 'video') { %>
    <MediaId><![CDATA[<%= MediaId %>]]></MediaId>
  <% } %>
  <MsgId><%= MsgId %></MsgId>
</xml>
`

const compile = ejs.compile(tpl)
module.exports = compile