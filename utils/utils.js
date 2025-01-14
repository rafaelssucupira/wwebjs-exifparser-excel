import fs from 'fs/promises';
import parser from 'exif-parser';
import moment from 'moment-timezone';
class Utils {

	secondsInMiliseconds(seconds) {
		const timestampInMilliseconds 	= seconds * 1000; // Converte para milissegundos
		const date 						= moment.utc(timestampInMilliseconds)
		const formatted 				= date.format('YYYY-MM-DD HH:mm:ss');

		return formatted
	}

	dateCurrent() {
		const timestamp = new Date().getTime()
		const currentTz = moment.tz(timestamp, 'America/Fortaleza')
		return currentTz.format('YYYY-MM-DD HH:mm:ss');

	}

	async parsed(filename) {
		//PARSER
		const buffer    = await fs.readFile(filename);
		const result    = parser.create(buffer);
		return result.parse();

	}

	async saveFile( msg )
	{

		const media = await msg.downloadMedia();

		if(msg.type === "document") {

			const filename = media.filename;
			const path = "./images/"+msg.from+"/"+filename;
			await fs.writeFile( path , media.data, 'base64' )

			return {
				path,
				filename
			}

		}

		else if(msg.type === "image") {

			const filename = new Date().getTime()+".jpg"
			const path = "./images/"+msg.from+"/"+filename;
			await fs.writeFile( path, media.data , 'base64' )

			return {
				path,
				filename
			}
		}

	}

}

export default Utils
