const INSERT = `INSERT into fto (
fto_idnumero,
fto_idnome,
fto_datahora,
fto_datahorafoto,
fto_acao,
fto_arquivo,
fto_latitude,
fto_longitude
) VALUES (
:FTO_IDNUMERO,
:FTO_IDNOME,
:FTO_DATAHORA,
:FTO_DATAHORAFOTO,
:FTO_ACAO,
:FTO_ARQUIVO,
:FTO_LATITUDE,
:FTO_LONGITUDE
)`

const SELECT = `SELECT * FROM fto`

export { INSERT, SELECT }
