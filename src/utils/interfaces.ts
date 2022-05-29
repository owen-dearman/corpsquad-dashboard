export interface projectInterface {
  id: string;
  clientId: string;
  employeeIds: string[];
  contract: {
    startDate: string;
    endDate: string;
    size: string;
  };
}

export interface clientInterface {
  id: string;
  name: string;
}
