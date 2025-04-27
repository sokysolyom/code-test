export interface IProformaInvoiceResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  issueDate: string;
  dueDate: string;
  variableSymbol: string;
  totalPriceInclVat: number;
  sumOfPayments: number;
  partner: IPayersData;
  beneficiary: IPayersData;
  items: IProformaInvoiceItem[];
}

interface IPayersData {
  businessName: string;
  street: string;
  streetNumber: string;
  zipCode: string;
}

interface IProformaInvoiceItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  description: string;
  amount: number;
  vatRate: number;
  totalPriceInclVat: number;
}
