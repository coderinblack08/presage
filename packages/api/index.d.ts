declare module "random-username-generator" {
  function generate(): string;
  function setNames(names: string[]): void;
  function setAdjectives(adjectives: string[]): void;
  function setSeperator(new_seperator: string): void;
}

declare namespace Express {
  export interface Request {
    userId?: string;
    // fields: { [fieldname: string]: any };
  }
}
