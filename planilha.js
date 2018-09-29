var GoogleSpreadsheet = require("google-spreadsheet");
var creds = require("./client_secret.json");
var doc = new GoogleSpreadsheet("1YOwMXbg0_r7_Mz3OmFNXNFn9ywD4zaeeSDS-NiIKU3w");

const getList = () => {
	const listaCartas = [];
	return new Promise((resolve, reject) => {
		doc.useServiceAccountAuth(creds, function (err) {
			doc.getRows(1, (err, rows) => {
				if (err) {
					reject(err);
				}
				for (const row of rows) {
					listaCartas.push({
						nome: row.nome,
						quantidade: row.quantidade
					});
				}
				resolve(listaCartas);
			});
		});
	});
};
module.exports = getList;