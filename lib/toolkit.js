const constants = require('../constants/constants')

const codeGenerator = () => {
  var code = "";
  var min = 0;
  var max = 9;
  for (var i = 1; i <= 6; i++) {
    code += `${Math.floor(Math.random() * (max - min) + min)}`;
  }
  return code;
}


const keyList = (collection) => {
  let keys = []
  keys.push('_id')
  for (let property in collection.schema.obj) {
    keys.push(property)
  }
  return keys
}


function uniqueArray(arr) {
  let data = []
  for (var d of arr) {
    let id = d.messageId.toString();
    if (!data.includes(id)) {
      data.push(id)
    }
  }
  console.log(data)
  return data
}

const verifyLogin = (req, res, fn) => {
  let { accountId, username, isAuthenticated } = req.session;
  if (!isAuthenticated) {
    return res.redirect(constants.ctx.DOMAIN_NAME + '/auth/login')
  }
  return fn(accountId, username)
}

function datetimenow() {
  return (new Date().toLocaleString({ hour12: true }, []))
}

function getMillisecondsByDays(days) {
  return (1000 * 60 * 60 * 24) * days
}

module.exports = {
  keyList: keyList,
  codeGenerator: codeGenerator,
  uniqueArray: uniqueArray,
  verifyLogin: verifyLogin,
  datetimenow: datetimenow,
  getMillisecondsByDays: getMillisecondsByDays
}