export class InvalidXmlError extends Error {
  constructor(
    line: number,
    message: string,
    public xmlDocument: string,
  ) {
    super(`Error on line ${line}: ${message}`);
  }
}
