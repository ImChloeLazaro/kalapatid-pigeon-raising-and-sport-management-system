
function uniqueIDArray(arr) {
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


module.exports.uniqueIDArray = uniqueIDArray