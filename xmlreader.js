function parseNewEmailsAndPopulateSheet() {
  // Configurações
  const allowedSenders = [
    'postojaracatia@gmail.com',
    'postobeninca1@gmail.com'
  ];
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ns = XmlService.getNamespace('http://www.portalfiscal.inf.br/nfe'); // Namespace padrão da NFe

  // Buscar e-mails não lidos dos remetentes específicos com XML
  const query = `is:unread has:attachment filename:xml (${allowedSenders.map(email => `from:${email}`).join(' OR ')})`;
  const threads = GmailApp.search(query);

  threads.forEach(thread => {
    thread.getMessages().forEach(message => {
      if (allowedSenders.includes(message.getFrom().match(/<(.+?)>/)?.[1] || message.getFrom())) {
        processMessage(message, sheet, ns);
        message.markRead(); // Marcar como lido após processamento
      }
    });
  });
}

function processMessage(message, sheet, ns) {
  const attachments = message.getAttachments();
  
  attachments.forEach(attachment => {
    if (attachment.getName().endsWith('.xml')) {
      try {
        const xmlContent = attachment.getDataAsString();
        const document = XmlService.parse(xmlContent);
        const root = document.getRootElement();
        
        // Extrair dados do XML (estrutura típica de NFe)
        const infNFe = root.getChild('NFe', ns).getChild('infNFe', ns);
        const emit = infNFe.getChild('emit', ns);
        const dhEmiText = infNFe.getChild('ide', ns).getChild('dhEmi', ns).getText(); //pega o texto do xml
        const det = infNFe.getChild('det', ns);
        const prod = det.getChild('prod', ns);
        const total = infNFe.getChild('pag', ns).getChild('detPag', ns);
        const pag = total.getChild('card', ns);
        const infAdic = infNFe.getChild('infAdic', ns);
        const {placa, odometro} = extractAdditionalInfo(infAdic, ns);
        
        const rowData = [
          pag.getChild('cAut', ns).getText(), //Código de Autorização (ABNUM da PRIMME)
          dhEmiDate = new Date(dhEmiText), //data já em formato reconhecível pelo google docs
          infNFe.getChild('ide', ns).getChild('serie', ns).getText(), //série
          infNFe.getChild('ide', ns).getChild('nNF', ns).getText(), //número da nota fiscal
          emit.getChild('xNome', ns).getText(), //Nome do postoo de combustívle
          parseFloat(prod.getChild('qCom', ns).getText()), //quantidade de combustível abastecido
          parseFloat(total.getChild('vPag', ns).getText()), //Valor pago na nota fiscal, já tranformadopara float
          placa,
          odometro
        ];

        // Adicionar dados na próxima linha disponível
        sheet.appendRow(rowData);
        
      } catch (e) {
        Logger.log(`Erro no processamento do XML: ${e}`);
      }
    }
  });
}


function extractAdditionalInfo(infAdic, ns) {
  let placa = '';
  let odometro = '';

  // Verifica se <infAdic> existe
  if (infAdic) {
    // Obtém todos os elementos <obsCont>
    const obsContList = infAdic.getChildren('obsCont', ns);

    // Itera sobre cada <obsCont>
    obsContList.forEach(obsCont => {
      const xCampo = obsCont.getAttribute('xCampo').getValue(); // Pega o valor do atributo xCampo
      const xTexto = obsCont.getChild('xTexto', ns).getText(); // Pega o valor da tag <xTexto>

      // Verifica se é a placa ou o odômetro
      if (xCampo === 'placa') {
        placa = xTexto;
      } else if (xCampo === 'odometro') {
        odometro = xTexto;
      }
    });
  }

  return { placa, odometro };
}
