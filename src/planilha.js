var GoogleSpreadsheet = require("google-spreadsheet");
var creds = require("./client_secret.json");


const getList = (linkPlanilha) => {
	var doc = new GoogleSpreadsheet(linkPlanilha);
	const listaCartas = [];
	return new Promise((resolve, reject) => {
		try {
			doc.useServiceAccountAuth(creds, function (err) {
				doc.getRows(1, (err, rows) => {
					for (const row of rows) {
						listaCartas.push({
							nome: row.nome,
							quantidade: (row.quantidade == "") ? 1 : row.quantidade
						});
					}
					resolve(listaCartas);
				});
			});
		} catch (err) {
			console.log(err);
			reject(err);
		}
	});
};
module.exports = getList;