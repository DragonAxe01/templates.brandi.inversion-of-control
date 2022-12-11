/** A logger service that we use to inject in many services. */
export class Logger {
  public log = (message: string) => {
    console.log(`LOGGER: ${message}`);
  };
}
