import { HttpParams } from '@angular/common/http';


const ARGUMENT_TO_PARAM_NAME: Record<string, string> = {
  sex: 'sex',
  ageRange: 'age-range',
  bmiRange: 'bmi-range',
  tmc: 'tmc',
  technologies: 'technologies',
  ontologyTerms: 'ontology-terms',
  debug: 'debug',
  organIri: 'organ-iri'
};

const ARGUMENT_DEFAULTS: Record<string, string> = {
  sex: 'Both',
  ageRange: stringifyValue([1, 110]),
  bmiRange: stringifyValue([13, 83]),
  ontologyTerms: stringifyValue(['http://purl.obolibrary.org/obo/UBERON_0013702'])
};


function isEmptyArray(value: unknown): boolean {
  return Array.isArray(value) && value.length === 0;
}

function isArgumentDefault(key: string, value: string): boolean {
  return key in ARGUMENT_DEFAULTS && value === ARGUMENT_DEFAULTS[key];
}

function stringifyValue(value: unknown): string {
  return Array.isArray(value) ? value.join(',') : `${value}`;
}

function encodeValue(key: string, value: unknown): string | undefined {
  if (value == null || isEmptyArray(value)) {
    return undefined;
  }

  const result = stringifyValue(value);
  return isArgumentDefault(key, result) ? undefined : result;
}


// --------------------------------
// API
// --------------------------------

export function encodeArguments<T>(args: T): HttpParams {
  const entries = Object.entries(ARGUMENT_TO_PARAM_NAME);
  const obj = entries.reduce<Record<string, string>>((result, [arg, param]) => {
    const value = encodeValue(arg, args[arg]);
    if (value !== undefined) {
      result[param] = value;
    }

    return result;
  }, {});

  return new HttpParams({ fromObject: obj });
}
