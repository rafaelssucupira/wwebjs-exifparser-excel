import { client, MessageMedia } from './utils/client.js';
import fs from 'node:fs/promises';
import Utils from './utils/utils.js';
import moment from 'moment-timezone';

import inject from './utils/inject.js';
fs.writeFile = inject( fs.writeFile );

import { createRequire } from 'module';
const require 		= createRequire(import.meta.url);
const saveFileXlsx 	= require('./utils/writeXlsx.cjs');

const args 		= process.argv.slice(2);
const params 	= {}
args.forEach(arg => {
	const [key, value] = arg.split('=');
	params[key] = (value.toLowerCase() === "true" ? true : value.toLowerCase() === "false" ? false : value);
});


client.on("message", async msg => {

	const { isGroup } = await client.getContactById(msg.from)


	if( msg.body.toLocaleLowerCase() === "relatorio" && isGroup === params.isGroup && msg.type === "chat" )
		{

			const result = JSON.parse( (await fs.readFile( "./database/database.txt", "utf-8" )) );
			const resultPath 	= await saveFileXlsx(result);
			const mediaDown 	= MessageMedia.fromFilePath( "./reports/"+resultPath )

			for(const data of result) {

				const filename = `./images/${msg.from}/${data.filename}`
				try {
					const mediaImg = MessageMedia.fromFilePath(filename)
					const datahora = moment.utc(data.datahorafoto).format('DD/MM/YYYY HH:mm:ss')
					const location = data.latitude === "?" || data.longitude === "?" ? "" : `\n\nhttps://www.google.com/maps?q=${data.latitude},${data.longitude}`
					const caption = `🎯 *${data.description.toUpperCase()}*\n🕗 _${datahora}_${location}`

					await client.sendMessage(msg.from, mediaImg, { caption } );
				}
				catch(e) {
					console.error( `O Arquivo ${data.filename} não foi encontrado!` )
				}

			}


			await client.sendMessage(msg.from, mediaDown, { caption : "✅ Relatório para timesheet!" } );

		}


	if( isGroup === params.isGroup && msg.hasMedia === true && msg.type !== "chat" && msg.type !== "ptt" )
		{
			const utils 				= new Utils();
			const { path, filename } 	= await utils.saveFile( msg )

			//PARSE
			const parseded	= await utils.parsed( path );

			//DATAS
			let dataPhoto = msg.type === "document" ? utils.secondsInMiliseconds( (parseded.tags.DateTimeOriginal || msg.timestamp) ) : utils.dateCurrent()
			let file ;
			try {
				file = await fs.readFile( "./database/database.txt", "utf-8")
			}
			catch {
				file = JSON.stringify([]);
			}

			const database = JSON.parse(file)
			database.push({
				id 			: msg.from,
				name 		: (msg._data.notifyName || "DESCONHECIDO"),
				datahora 	: utils.dateCurrent(),
				datahorafoto : dataPhoto,
				description : (msg.body === "" || msg.body === filename ? "?" : msg.body),
				filename 	: filename,
				latitude 	: parseded.tags.GPSLatitude || "?",
				longitude 	: parseded.tags.GPSLongitude || "?"

			});

			await fs.writeFile( "./database/database.txt", JSON.stringify(database), { flag : "w"} )
			client.sendMessage(msg.from, "✅ Log recebido com sucesso!");

		}


});

client.initialize();
