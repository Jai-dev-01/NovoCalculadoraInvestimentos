const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new error(
      "Para a correta execução, precisamos de um arry com colunas, outro com a informação das linhas e o Id da tabela"
    );
  }
  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new error("Id informado não corresponde a nenhum elemento table");
  }

  createTableHeader(tableElement, columsArray);
  createTableBody(tableElement, dataArray, columsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }
  const tableHeaderReference =
    tableReference.querySelector("thead") ?? createTheadElement(tableReference);
  const headerRow = document.createElement("tr");
  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/ `<th class="text-center">${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(thead);
    return tbody;
  }
  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement("tr");
    for (const tableColumn of columnsArray) {
      tableRow.innerHTML += /*html*/ `<td class="text-center">${
        tableItem[tableColumn.accessor]
      }</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
}
