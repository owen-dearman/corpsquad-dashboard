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

export interface fullEmployeeInterface {
  id: string;
  name: string;
}

export interface fullClientInterface {
  id: string;
  name: string;
}

export interface fullProjectInterface {
  id: string;
  client: fullClientInterface;
  employees: fullEmployeeInterface[];
  contract: {
    startDate: string;
    endDate: string;
    size: string;
  };
}
