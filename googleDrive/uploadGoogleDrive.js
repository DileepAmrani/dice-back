const fs = require('fs')
const folder = './src/assets/'
const { google } = require('googleapis')
const GOOGLE_API_FOLDER_ID = '15L1eHBvhEzELGNfhkrlKSV2jc7Nk9lQR'

async function uploadFile() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    })
    const driveServie = google.drive({
      version: 'v3',
      auth,
    })

    fs.readdir(folder, (err, files) => {
      files.forEach(async (file) => {
        const fileMetaData = {
          name: file,
          parents: [GOOGLE_API_FOLDER_ID],
        }

        const media = {
          MimeTypeArray: ['image/png'],
          body: fs.createReadStream(`./src/assets/${file}`),
        }

        const response = await driveServie.files.create({
          resource: fileMetaData,
          media: media,
          fields: 'id',
        })
        console.log(
          `https://drive.google.com/uc?export=view&id=${response.data.id}`,
        )
        return response.data.id
      })
    })
  } catch (error) {
    console.log('Upload file error: ', error)
  }
}

uploadFile()
