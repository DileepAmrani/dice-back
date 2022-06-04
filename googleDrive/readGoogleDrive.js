const path = require('path')
const { google } = require('googleapis')
// const GOOGLE_API_FOLDER_ID = '15L1eHBvhEzELGNfhkrlKSV2jc7Nk9lQR'
const GOOGLE_API_FOLDER_ID = '1_Lt_DpTZGcQlctTaQu-ja9ypnNwWqxmT'

const readGoogleDrive = async () => {
  try {
    const googlekey = path.join(`${__dirname}`, './googlekey.json')
    console.log('readGoogleDrive 1', ` ${googlekey}`)
    const auth = new google.auth.GoogleAuth({
      keyFile: googlekey,
      scopes: ['https://www.googleapis.com/auth/drive'],
    })

    console.log('readGoogleDrive 2')

    const driveServie = google.drive({
      version: 'v3',
      auth,
    })
    let _RESULT = null
    const response = await driveServie.files.list({
      pageSize: 150,
      q: `'${GOOGLE_API_FOLDER_ID}' in parents and trashed=false`,
    })

    if (response && response.data && response.data.files) {
      _RESULT = response.data.files
    }
    console.log('Result: ', _RESULT)
    return _RESULT
  } catch (error) {
    console.log('Upload file error: ', error)
  }
}

module.exports = readGoogleDrive
