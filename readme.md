# wwebjs-exifparser-excel
### Este é um bot que recebe fotos em documento para capturar `metadados exifs` para depois retorná-los em relatorio .xlsx

# Problema?
 desta maneira não precisamos mais que o cliente envie duas mensagens contendo imagem e posteriormente uma localização, resolvemos tudo de uma vez só, além disso os metadados exifs permitem que obtenhamos latitude e longitude do remetente da mensagem, algo muito bom se quisermos controlar algo ou alguém.
 Para funcionar pegandos todos os dados voce deve enviar a foto como documento.

# Guia
- [Preparando o projeto](#Preparando-o-projeto)
- [Instruções de uso](#Instruções-de-uso)
- [Relatórios](#Relatórios)
- [Contribua](#Contribua)

# Preparando o projeto
- Faça o download do projeto
```
git clone https://github.com/rafaelssucupira/wwebjs-exifparser-excel.git
```
- Instale Dependências
```
npm install
```
- Inicie o projeto, podemos executar tanto em um grupo quanto no privado.

`Privado`
```
npm run start-private
```
`Grupo`
```
npm run start-group
```

# Instruções de uso
Abra nas opçoes de mensagem do whatsapp e envie uma foto como documento para coleta de dados exifs.

> [!IMPORTANT]
> Se voce enviar como uma foto da galeria ele não capturará os metadados, mas funcionará normalmente, além disso voce deve está com o modo exif habilitado em seu celular!

![Anexando via documento](./exif.jpg)

# Relatórios
Para obter o relatório, envie a palavra `relatorio`, você receberá um  arquivo com as seguintes colunas:
- Data/Hora Foto
- Recebido em
- Número
- Nome
- Descrição		
- Coordenadas										
<br/>

![relatorio](./report.jpg)

# Contribua
Estou muito feliz em saber que você está interessado em contribuir com esse projeto! Se você quer nos ajudar, dê uma olhadinha nas nossas issues abertas e siga uma das seguintes opções:

- Reportar um novo bug.
- Discutir a respeito das issues atuais e possíveis novas features.
- Corrigir um Bug ou implementar uma nova feature.
- Corrigir erros de digitação ou adicionar traduções.

Para enviar novos **Pull Requests**, siga os seguintes passos:
- Crie um fork do projeto
- Faça suas mudanças e implemente testes pra ela.
- Garanta que todos os testes passem.
- Crie seu Pull Request e aguarde o review.
