import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import qs from "qs";
import baseAxios from "./baseAxios";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export function formatUrl(route: string, params?: number[] | string[]) {
  let result = new URL(route, backendUrl).toString();

  if (params == null || params.length === 0) {
    return result;
  }

  for (let param of params) {
    const safeParam = encodeURIComponent(param);
    result = new URL(safeParam, result).toString();
  }

  return result;
}

export type ApiResult<T> = (AxiosResponse<T> | AxiosError<T>) & { ok: boolean };

export class ApiService {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  // GET
  private async getImplementation<T>(
    params?: number[] | string[],
    queryParams?: unknown,
    axiosConfig?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    return await this.tryRequest(
      baseAxios.get(formatUrl(this.url, params), this.getAxiosConfWithParams(axiosConfig, params))
    );
  }
  async getById<T>(id: number, axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.getImplementation([id], undefined, axiosConfig);
  }
  async getAll<T>(axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.getImplementation(undefined, undefined, axiosConfig);
  }
  async getAllByQueryParams<T>(queryParams: unknown, axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.getImplementation(undefined, queryParams, axiosConfig);
  }

  // PUT
  private async putImplementation<T>(
    params?: number[] | string[],
    queryParams?: unknown,
    body?: unknown,
    axiosConfig?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    return await this.tryRequest(
      baseAxios.put(formatUrl(this.url, params), body, this.getAxiosConfWithParams(axiosConfig, params))
    );
  }
  async put<T>(body: unknown, axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.putImplementation(undefined, undefined, body, axiosConfig);
  }
  async putById<T>(id: number, body: unknown, axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.putImplementation([id], undefined, body, axiosConfig);
  }

  // POST
  private async postImplementation<T>(
    params?: number[] | string[],
    queryParams?: unknown,
    body?: unknown,
    axiosConfig?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    return await this.tryRequest(
      baseAxios.post(formatUrl(this.url, params), body, this.getAxiosConfWithParams(axiosConfig, params))
    );
  }
  async post<T>(body?: unknown, axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.postImplementation(undefined, undefined, body, axiosConfig);
  }

  // DELETE
  private async deleteImplementation<T>(
    params?: number[] | string[],
    queryParams?: unknown,
    axiosConfig?: AxiosRequestConfig
  ): Promise<ApiResult<T>> {
    return await this.tryRequest(
      baseAxios.delete(formatUrl(this.url, params), this.getAxiosConfWithParams(axiosConfig, params))
    );
  }
  async deleteById<T>(id: number, axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.deleteImplementation([id], undefined, axiosConfig);
  }
  async deleteAll<T>(axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.deleteImplementation(undefined, undefined, axiosConfig);
  }
  async deleteAllByQueryParams<T>(queryParams: unknown, axiosConfig?: AxiosRequestConfig): Promise<ApiResult<T>> {
    return await this.deleteImplementation(undefined, queryParams, axiosConfig);
  }

  // Private
  private getAxiosConfWithParams(axiosConfig?: AxiosRequestConfig, queryParams?: unknown): AxiosRequestConfig {
    return {
      params: queryParams,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params);
        },
      },
      ...axiosConfig,
    };
  }
  private async tryRequest<T>(promise: Promise<AxiosResponse<T>>): Promise<ApiResult<T>> {
    try {
      const result = await promise;
      return { ...result, ok: true };
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err as AxiosError<T>;
        return { ...error, ok: false };
      }
      throw err;
    }
  }
}

export function baseApiFactory(url: string) {
  return new ApiService(url);
}
