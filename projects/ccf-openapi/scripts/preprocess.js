const { Command } = require('commander');
const { readFileSync, writeFileSync } = require('fs');
const { parse, format } = require('path');
const { isMap, isPair, isScalar, isSeq, parseDocument, stringify, visit } = require('yaml');


const isString = node =>
  isScalar(node) &&
  typeof node.value === 'string';

const isRef = node =>
  isMap(node) &&
  isString(node.get('$ref', true));

const getRef = node =>
  isRef(node) ? node.get('$ref') : undefined;

const getRefPath = node => {
  const ref = getRef(node);
  return ref ? ref.slice(2).split('/') : [];
}

const resolveRef = (ref, root) => root.getIn(getRefPath(ref));

const matchesKey = (node, key) =>
  isPair(node) &&
  isString(node.key) &&
  node.key.value === key;


const processDeletions = yaml => {
  const deleteComment =
  ' One or more properties have been removed by the preprocessor\n' +
  ' from this object or one of it\'s bases.' +
  ' `additionalProperties` is used instead.';

  const addDeleteComment = node => {
    const old = node.commentBefore;
    const pre = old ? old + '\n\n' : '';
    if (!old || old.indexOf(deleteComment) < 0) {
      node.commentBefore = pre + deleteComment;
    }
  };

  const isPropertiesPath = path => path.length >= 2 && path[path.length - 2] === 'properties';
  const filterRequiredProperties = (map, key) => {
    const requiredSeq = map.get('required');
    const requiredVisitor = (_, prop) => prop.value === key ? visit.REMOVE : undefined;

    visit(requiredSeq, { Scalar: requiredVisitor });
    if (requiredSeq && requiredSeq.items.length === 0) {
      map.delete('required');
    }
  }

  const additionalPropertiesNode = yaml.createPair('additionalProperties', true)
  const hasAdditionalProperties = map => map.get('additionalProperties') !== undefined;
  const ensureAdditionalProperties = map => {
    if (!hasAdditionalProperties(map)) {
      map.add(additionalPropertiesNode);
      addDeleteComment(map);
    }
  };

  const schemas = new Set();
  const isDerived = map => {
    const allOf = map.get('allOf');
    if (allOf && isSeq(allOf)) {
      const bases = allOf.items.map(node => resolveRef(node, yaml));
      return bases.some(base => schemas.has(base) || isDerived(base));
    }

    return false;
  };

  const doDelete = (map, _, key) => {
    if (isString(key)) {
      const path = key.value.split('/');
      map.deleteIn(path);

      if (isPropertiesPath(path)) {
        schemas.add(map);
        ensureAdditionalProperties(map);
        filterRequiredProperties(map, path[path.length - 1]);
      }
    }
  };

  const deleteVisitor = (_, pair, stack) => {
    if (matchesKey(pair, 'x-preprocessor-delete')) {
      const parent = stack[stack.length - 1];
      visit(pair.value, { Scalar: doDelete.bind(undefined, parent) });
      return visit.SKIP;
    }
  };

  const derivedVisitor = (_, map) => {
    if (isDerived(map)) {
      schemas.add(map);
      ensureAdditionalProperties(map);
    }
  };

  visit(yaml, { Pair: deleteVisitor });
  visit(yaml, { Map: derivedVisitor });
}

const process = yaml => {
  processDeletions(yaml);
}

const program = new Command()
  .name('preprocess')
  .description('CLI to preprocess OpenAPI specs before using openapi-generator-cli to generate code')
  .requiredOption('-i, --input <file>', 'file to process')
  .option('-o, --output <file>', 'file to write new spec');

program.parse();

const options = program.opts();
const input = options.input;
const output = options.output || (() => {
  const { base, name, ext } = parse(input);
  return format({ base, name: name + '.out', ext });
})();

const content = readFileSync(input, 'utf-8');
const yaml = parseDocument(content);

process(yaml);
writeFileSync(output, stringify(yaml), 'utf-8');
