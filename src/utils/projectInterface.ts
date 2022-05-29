export interface projectInterface {
  id: number;
  clientId: number;
  employeeIds: [number];
  contract: {
    startDate: string;
    endDate: string;
    size: number;
  };
}
