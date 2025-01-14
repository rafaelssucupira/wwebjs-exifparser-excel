const writeXlsxFile = require('write-excel-file/node')

module.exports = async function writeXlsx( result ) {
// async function writeXlsx() {
	const HEADER = [
		{ value : 'Data/Hora Foto', align : "center", span : 3, height : 20, alignVertical : "center", backgroundColor : "#ededed", borderColor : "#d7d0e5"},
		null,
		null,
		{ value : 'Recebido em', align : "center", span : 3, height : 20, alignVertical : "center", backgroundColor : "#ededed", borderColor : "#d7d0e5"},
		null,
		null,
		{ value : 'Número', align : "center", span : 3, height : 20, alignVertical : "center", backgroundColor : "#ededed", borderColor : "#d7d0e5" },
		null,
		null,
		{ value : 'Nome', align : "center", span : 3, height : 20, alignVertical : "center", backgroundColor : "#ededed", borderColor : "#d7d0e5" },
		null,
		null,
		{ value : 'Descrição', align : "center", span : 4, height : 20, alignVertical : "center", backgroundColor : "#ededed", borderColor : "#d7d0e5" },
		null,
		null,
		null,
		{ value : 'Coordenadas',align : "center", span : 11, height : 20, alignVertical : "center", backgroundColor : "#ededed", borderColor : "#d7d0e5" },
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null


	]

	const data = [
		HEADER,
	]

	for(let i = 0; i < result.length; i++) {


		data.push([
			{
				// column	: 'Data/Hora',
				type : Date,
				format : "dd/mm/yyyy hh:mm:ss",
				value	: new Date(result[i]["datahorafoto"]),
				span : 3,
				height : 20,
				align : 'left',
				alignVertical : "center"
			},
			null,
			null,
			{
				// column	: 'Data/Hora',
				type : Date,
				format : "dd/mm/yyyy hh:mm:ss",
				value	: new Date(result[i]["datahora"]),
				span : 3,
				height : 20,
				align : 'left',
				alignVertical : "center"
			},
			null,
			null,
			{
				// column	: 'Número',
				type : String,
				value	: result[i]["id"],
				fontWeight : 'bold',
				span : 3,
				alignVertical : "center"
			},
			null,
			null,
			{
				// column	: 'Nome',
				type : String,
				value	: result[i]["name"],
				span : 3,
				alignVertical : "center"
			},
			null,
			null,
			{
				// column	: 'Descrição',
				type : String,
				value	: result[i]["description"],
				span : 4,
				wrap : true,
				alignVertical : "center"
			},
			null,
			null,
			null,
			{

				type : String,
				value : `https://www.google.com/maps?q=${result[i]["latitude"]},${result[i]["longitude"]}`,
				span 	: 11,
				alignVertical : "center"
			},
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null

		])
	}
	const actual = new Date().getTime();
	const results = await writeXlsxFile(data, {
		filePath: './reports/'+actual+'.xlsx',
		fontFamily : "Tahoma",
		fontSize : 10
	})

	return actual+'.xlsx';
}

