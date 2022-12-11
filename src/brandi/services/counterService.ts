/** A counter service that we use to check if multiple containers are using the same singleton instance. */
export class CounterService {
  private _val: number = 0;

  public increment = () => {
    this._val++;
  };

  public getValue = () => {
    return this._val;
  };
}
