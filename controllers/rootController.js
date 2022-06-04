const readGoogleDrive = require('../googleDrive/readGoogleDrive')
const respond = require('../util/respond')

const readIcons = async (req, res) => {
  let list = []
  const icons = await readGoogleDrive()
  icons.map((icon) => {
    return list.push({
      url: `https://drive.google.com/uc?export=view&id=${icon.id}`,
    })
  })
  respond.data(res, list)
}

module.exports = readIcons
