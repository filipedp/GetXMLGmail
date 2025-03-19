# 🚚 **Automation of NFe XML Reading and Google Sheets Population**

This project automates the reading of XML files from Electronic Invoices (NFe) received via email, extracts specific information, and inserts it into a Google Sheets spreadsheet. It was developed to streamline the processing of NFe data, such as issue date, series, invoice number, issuer name, quantity, total value, vehicle plate, and odometer.

---

## 🛠️ **Features**

1. **Automatic Email Reading:**
   - Searches for unread emails with XML attachments from specific senders.
   - Filters emails by authorized addresses.

2. **XML Processing:**
   - Extracts relevant data from the NFe XML, such as:
     - Issue date (`<dhEmi>`)
     - Series (`<serie>`)
     - Invoice number (`<nNF>`)
     - Issuer name (`<xNome>`)
     - Quantity (`<qCom>`)
     - Total value (`<vNF>`)
     - Vehicle plate (`<obsCont xCampo="placa">`)
     - Odometer (`<obsCont xCampo="odometro">`)

3. **Data Insertion into Google Sheets:**
   - Converts extracted data into appropriate formats (dates, decimal numbers).
   - Adds the data to the next available row in the spreadsheet.

4. **Error Handling:**
   - Logs errors during XML processing.
   - Skips invalid emails or attachments without interrupting the flow.

---

## 📂 **Project Structure**

- **`parseNewEmailsAndPopulateSheet`:** Main function that searches emails, processes XML attachments, and inserts data into the spreadsheet.
- **`processMessage`:** Processes each email, extracts XML attachments, and calls functions for data manipulation.
- **`extractAdditionalInfo`:** Extracts additional information, such as vehicle plate and odometer, from the NFe XML.

---

## 🚀 **How to Use**

1. **Initial Setup:**
   - Create a spreadsheet in Google Sheets.
   - Open Google Apps Script (`Extensions > Apps Script`) and paste the provided code.
   - Define authorized senders in the `allowedSenders` variable.

2. **Execution:**
   - Run the `parseNewEmailsAndPopulateSheet` function manually or set up a trigger to run it automatically (e.g., every 5 minutes).

3. **Results:**
   - NFe data will be automatically inserted into the spreadsheet, organized by columns.

---

## 🛠️ **Technologies Used**

- **Google Apps Script:** For integration with Gmail and Google Sheets.
- **XMLService:** For XML file manipulation and reading.
- **JavaScript:** For programming logic and data handling.

---

## 📝 **Example Output in Google Sheets**

| Issue Date   | Series | Invoice Number | Issuer Name | Quantity | Total Value | Plate   | Odometer |
|--------------|--------|----------------|-------------|----------|-------------|---------|----------|
| 10/25/2023   | 1      | 12345          | Company XYZ | 10       | 1500.50     | RBI9C44 | 32837    |

---

## 📄 **License**

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute as needed.

---

## 🙋 **How to Contribute**

1. Fork the project.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.
