import Axios, { AxiosInstance } from 'axios';
import QueryString from 'qs';
import { HTTP_METHOD } from '../definitions/Http.d';

class Request {
  public static create(
    method: HTTP_METHOD,
    url: string,
    params: object | null = null,
    axiosOptions: any = {}
  ): Request {
    const req = new Request(axiosOptions);
    req.method = method;
    req.url = url;
    if (params) req.params = params;
    return req;
  }

  public method: HTTP_METHOD;
  public url: string;
  public params: object;
  public tokenId: string;
  public axiosInstance: any;
  public baseAxios: AxiosInstance;

  constructor(axiosOptions: any = {}) {
    this.baseAxios = Axios.create(axiosOptions);
  }

  /**
   * What some cool libraries do is extend the Promise "then" function,
   * which means you don't even need a separately-named function
   * But that involves a lot of code to simulate the promise
   * For example:
   * https://github.com/Vincit/objection.js/blob/master/lib/queryBuilder/QueryBuilder.js
   * For now we can just require the .call() function to be made to return the axios instance
   *
   * @return {Promise<any>}
   */
  public async call(): Promise<any> {
    let headers: object = {};

    // If there's a token, then include it in the HTTP header
    if (this.tokenId) {
      headers = {
        Authorization: `Bearer ${this.tokenId}`,
      };
    }

    switch (this.method.toUpperCase()) {
      case 'GET':
        this.axiosInstance = this.getRequest(this.url, this.params, {
          headers,
        });
        break;
      case 'POST':
        this.axiosInstance = this.postRequest(this.url, this.params, {
          headers,
        });
        break;
      case 'PUT':
        this.axiosInstance = this.putRequest(this.url, this.params, {
          headers,
        });
        break;
      case 'DELETE':
        this.axiosInstance = this.deleteRequest(this.url, this.params, {
          headers,
        });
        break;
      default:
        this.axiosInstance = this.baseAxios;
        break;
    }

    return this.axiosInstance;
  }

  /**
   * To give the user an option to set a specific token by themselves
   *
   * @param {string} token
   * @return {Request} so to be made as chainable
   */
  public withToken(token: string): Request {
    this.tokenId = token;
    return this;
  }

  /**
   * To initiate a POST request
   * @param {string} endpoint
   * @param {object | null} params
   * @param {object} headers
   * @return {Promise<any>}
   */
  public async postRequest(
    endpoint: string,
    params: object | null = null,
    headers: object = {}
  ): Promise<any> {
    const response: any = await this.baseAxios.post(endpoint, params, headers);
    return response.data;
  }

  /**
   * To initiate a GET request
   * @param {string} endpoint
   * @param {object | null} params
   * @param {object} headers
   * @return {Promise<any>}
   */
  public async getRequest(
    endpoint: string,
    params: object | null = null,
    headers: object = {}
  ): Promise<any> {
    let queryString: string;
    let url: string = endpoint;
    if (params) {
      queryString = QueryString.stringify(params, { arrayFormat: 'brackets' });
      url += `?${queryString}`;
    }
    const response: any = await this.baseAxios.get(url, headers);
    return response.data;
  }

  /**
   * To initiate a PUT request
   * @param {string} endpoint
   * @param {object | null} params
   * @param {object} headers
   * @return {Promise<any>}
   */
  public async putRequest(
    endpoint: string,
    params: object | null = null,
    headers: object = {}
  ): Promise<any> {
    const response: any = await this.baseAxios.put(endpoint, params, headers);
    return response.data;
  }

  /**
   * To initiate a DELETE request
   * @param {string} endpoint
   * @param {object} headers
   * @return {Promise<any>}
   */
  public async deleteRequest(
    endpoint: string,
    params: object | null = null,
    headers: object = {}
  ): Promise<any> {
    const config = {
      ...headers,
      data: params,
    };
    const response: any = await this.baseAxios.delete(endpoint, config);
    return response.data;
  }
}

export default Request;
