export interface ApiResponse {
  name: {
    common: string;
  };
  population: number;
  capital: string;
  flags: {
    svg: string;
  };
}
