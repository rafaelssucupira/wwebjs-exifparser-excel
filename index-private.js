import { client, MessageMedia } from './utils/client.js';
import fs from 'fs/promises';
import SQL from '@rafaelssucupira/sequelize-sql';
import Utils from './utils/utils.js';
import { INSERT, SELECT } from './utils/sqls/querys.js';



import inject from './utils/inject.js';
fs.writeFile = inject( fs.writeFile );

import { createRequire } from 'module';
const require 		= createRequire(import.meta.url);
const saveFileXlsx 	= require('./utils/writeXlsx.cjs');

client.on("message", async msg => {

	console.log("msg", msg)

	if( msg.body.toLocaleLowerCase() === "durango2018" && msg.from !== "status@broadcast" ) {

		const db 		= new SQL( "108.179.241.242", "rastza11_fotolog_flx", "rastza11_root", "durango2018" )
		await db.isConnected()	;
		if(db.error !== null) { //SEND_MESSAGE
			new Error("Erro ao conectar com o banco de dados: " + db.error)
			return
		}

		db.setParams( SELECT, [] )
		await db.execQuery()
		await db.sqlCommand()
		const result = await db.build();
		await db.close();

		const resultPath 	= await saveFileXlsx(result);
		const mediaDown 	= MessageMedia.fromFilePath( "./reports/"+resultPath )
		await client.sendMessage(msg.from, mediaDown, { caption : "✅ Relatório para timesheet!" } );

	}

    if(msg.hasMedia === true && msg.from !== "status@broadcast") {

        const media = await msg.downloadMedia(); //converte para base64;

        if(media !== undefined) {

            const filename = "./images/"+msg.from+"/"+media.filename;
            await fs.writeFile( filename , media.data, 'base64' )
			const utils 	= new Utils();
			//PARSE
			const parseded	= await utils.parsed( filename );
			//DATAS
			let dataPhoto = "";
			if( msg.type === "document" ) {
				dataPhoto = utils.secondsInMiliseconds( (parseded.tags.DateTimeOriginal || msg.timestamp) );
			}
			else {
				dataPhoto = utils.dateCurrent( msg.timestamp );
			}


            const db 		= new SQL( "108.179.241.242", "rastza11_fotolog_flx", "rastza11_root", "durango2018" )
			await db.isConnected()	;
			if(db.error !== null) { //SEND_MESSAGE
				new Error("Erro ao conectar com o banco de dados: " + db.error)
				return
			}

			//INSERT
			db.setParams(INSERT,
				[
					{"key" : ":FTO_IDNUMERO", "value" : msg.from, "type" : "normal"},
					{"key" : ":FTO_IDNOME", "value" : (msg.notifyName || "DESCONHECIDO"), "type" : "normal"},
					{"key" : ":FTO_DATAHORA", "value" : utils.dateCurrent(), "type" : "normal"},
					{"key" : ":FTO_DATAHORAFOTO", "value" : dataPhoto, "type" : "normal"},
					{"key" : ":FTO_ACAO", "value" : (msg.body === media.filename ? "?" : msg.body), "type" : "normal"},
					{"key" : ":FTO_ARQUIVO", "value" : (media.filename || "DESCONHECIDO"), "type" : "normal"},
					{"key" : ":FTO_LATITUDE", "value" : parseded.tags.GPSLatitude || "?", "type" : "normal"},
					{"key" : ":FTO_LONGITUDE", "value" : parseded.tags.GPSLongitude || "?", "type" : "normal"}

				]
			);

			await db.execQuery()
			await db.sqlCommand()
			const result = await db.build();
			await db.close();
			console.log("INSERT", result);

			client.sendMessage(msg.from, "✅ Log recebido com sucesso!");

        }

    }
});

client.initialize();
