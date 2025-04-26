//contrato
// 1 - Sistema deve usar o tailwind css
//2 - Sistema deve ter um elemento html do tipo table com id definido, preparado e sem informações dentro
//3 - são necessarios 2 arrays para a geração da tabela
//  3.1 - um array de dados
//  3.2 - um array com objetos que caracterizam as colunas
//  3.3 - não é necessario, mas pode-se passar uma função de formatação dos dados daquela coluna

type columnObject = {
  columnLabel: string;
  accessor: string;
  formatFN?: (info: number | string) => string;
};

type columnsArray = columnObject[];
