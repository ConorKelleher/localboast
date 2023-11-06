export const parseUnquotedJSON = (unquoted: string) =>
  JSON.parse(unquoted.replace(/([A-Za-z]+):/g, '"$1":'))
