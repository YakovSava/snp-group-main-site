export function translate(dictionary, key, vars) {
  const value = key.split('.').reduce(
    (node, part) => (node === undefined || node === null ? undefined : node[part]),
    dictionary,
  );
  if (value === undefined) {
    return key;
  }
  if (typeof value !== 'string' || !vars) {
    return value;
  }
  return value.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? vars[name] : match));
}

export function pickLocalized(field, lang) {
  return field[lang] || field.en;
}
