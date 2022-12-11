/** An api service that we will use as a dependency for other services. */
export class ApiService {
  constructor() {
    //
  }

  public get = () => {
    return "hello from api service";
  };
}
