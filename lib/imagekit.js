require("dotenv").config()
const Imagekit = require('imagekit');
const fs = require('fs');
const { bgRed } = require("colors");

const imagekit = new Imagekit({
	publicKey: process.env.PUBLIC_KEY,
	urlEndpoint: process.env.END_POINT,
	privateKey: process.env.PRIVATE_KEY,
})




function profileUpload(type, username, dirname, files, callback) {
	if (files !== null) {
		let folderName, fileName;
		if (type == "user") {
			folderName = "profiles"
			fileName = "profile"
		} else if (type == "club") {
			folderName = "clubs"
			fileName = "club"
		} else if (type == "event") {
			folderName = "events"
			fileName = "event"
		}
		try {
			let path = dirname + `/public/www/${folderName}/` + files.profile.name
			files.profile.mv(path, (err) => {
				if (err) {
					return res.status(500).send(err)
				} else {
					let oldname = dirname + `/public/www/${folderName}/` + files.profile.name
					let profile = dirname + `/public/www/${folderName}/${fileName}.jpg`
					fs.rename(oldname, profile, function (err) {
						if (err) console.log('ERROR: ' + err)
						let data = fs.readFileSync(profile)
						imagekit.upload({
							file: data,
							fileName: `${fileName}`,
							folder: `/${folderName}/${username}`,
							useUniqueFileName: false,
							overwriteFile: true,
							overwriteAITags: false,
							overwriteTags: false
						})
							.then((response) => {
								imagekit.updateFileDetails(response.fileId, {}, function (error, result) {
									console.log(result);
									let datetime = result.embeddedMetadata.DateTimeCreated;
									let dateUpdated = new Date(datetime).getTime();
									callback(error, response.url + "?updatedAt=" + dateUpdated.toString())
								})
							}).catch((error) => {
								callback(error, null);
							})
					})
				}
			})
		} catch (err) {
			console.log(err);
		}
	} else {
		callback(null, null);
	}

}





module.exports.profileUpload = profileUpload;