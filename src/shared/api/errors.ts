// API 호출 오류 표현
export class ApiError extends Error {
  status: number;
  body: unknown;
  request: {
    url: string;
    method: string;
  };

  constructor(params: {
    message: string;
    status: number;
    body: unknown;
    url: string;
    method: string;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.body = params.body;
    this.request = {
      url: params.url,
      method: params.method,
    };
  }
}
