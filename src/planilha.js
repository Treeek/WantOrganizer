var GoogleSpreadsheet = require("google-spreadsheet");
var creds = require("./client_secret.json");


const getList = (linkPlanilha) => {
	var doc = new GoogleSpreadsheet(linkPlanilha);
	const listaCartas = [];
	return new Promise((resolve, reject) => {
		doc.useServiceAccountAuth(creds, function (err) {
			if (err) {
				reject(err);
			}
			doc.getRows(1, (err, rows) => {
				if (err) {
					reject(err);
				}
				for (const row of rows) {
					listaCartas.push({
						nome: row.nome,
						quantidade: (row.quantidade == "") ? 1 : row.quantidade
					});
				}
				resolve(listaCartas);
			});
		});
	});
};
module.exports = getList;