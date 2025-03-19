# 🚚 **Automatização de Leitura de XML de NFe e População de Planilha no Google Sheets**

Este projeto automatiza a leitura de arquivos XML de Notas Fiscais Eletrônicas (NFe) recebidos por e-mail, extrai informações específicas e as insere em uma planilha do Google Sheets. Ele foi desenvolvido para facilitar o processamento de dados de NFes, como data de emissão, série, número, nome do emissor, quantidade, valor total, placa do veículo e odômetro.

---

## 🛠️ **Funcionalidades**

1. **Leitura Automática de E-mails:**
   - Busca e-mails não lidos com anexos XML de remetentes específicos.
   - Filtra e-mails por endereços autorizados.

2. **Processamento de XML:**
   - Extrai dados relevantes do XML da NFe, como:
     - Data de emissão (`<dhEmi>`)
     - Série (`<serie>`)
     - Número da NFe (`<nNF>`)
     - Nome do emissor (`<xNome>`)
     - Quantidade (`<qCom>`)
     - Valor total (`<vNF>`)
     - Placa do veículo (`<obsCont xCampo="placa">`)
     - Odômetro (`<obsCont xCampo="odometro">`)

3. **Inserção de Dados no Google Sheets:**
   - Converte os dados extraídos em formatos adequados (datas, números decimais).
   - Adiciona os dados na próxima linha disponível da planilha.

4. **Tratamento de Erros:**
   - Registra erros durante o processamento do XML.
   - Ignora e-mails ou anexos inválidos sem interromper o fluxo.

---

## 📂 **Estrutura do Projeto**

- **`parseNewEmailsAndPopulateSheet`:** Função principal que busca e-mails, processa anexos XML e insere dados na planilha.
- **`processMessage`:** Processa cada e-mail, extrai anexos XML e chama funções para manipulação dos dados.
- **`extractAdditionalInfo`:** Extrai informações adicionais, como placa e odômetro, do XML da NFe.

---

## 🚀 **Como Usar**

1. **Configuração Inicial:**
   - Crie uma planilha no Google Sheets.
   - Abra o Google Apps Script (`Extensões > Apps Script`) e cole o código fornecido.
   - Defina os remetentes autorizados na variável `allowedSenders`.

2. **Execução:**
   - Execute a função `parseNewEmailsAndPopulateSheet` manualmente ou configure um trigger para rodar automaticamente (por exemplo, a cada 5 minutos).

3. **Resultados:**
   - Os dados das NFes serão automaticamente inseridos na planilha, organizados por colunas.

---

## 🛠️ **Tecnologias Utilizadas**

- **Google Apps Script:** Para integração com Gmail e Google Sheets.
- **XMLService:** Para manipulação e leitura de arquivos XML.
- **JavaScript:** Para lógica de programação e tratamento de dados.

---

## 📝 **Exemplo de Saída no Google Sheets**

| Data de Emissão | Série | Número da NFe | Nome do Emissor | Quantidade | Valor Total | Placa   | Odômetro |
|-----------------|-------|---------------|-----------------|------------|-------------|---------|----------|
| 25/10/2023      | 1     | 12345         | Empresa XYZ     | 10         | 1500.50     | RBI9C44 | 32837    |

---

## 📄 **Licença**

Este projeto é licenciado sob a [MIT License](LICENSE). Sinta-se à vontade para usar, modificar e distribuir conforme necessário.

---

## 🙋 **Como Contribuir**

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
