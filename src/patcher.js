import fs from 'fs/promises';
import * as recast from 'recast';
import * as acorn from 'acorn';

export async function patchDefaultsVariable(filePath, newProxyUrl) {
  const code = await fs.readFile(filePath, 'utf-8');

  const ast = recast.parse(code, {
    parser: {
      parse(source) {
        return acorn.parse(source, {
          ecmaVersion: 'latest',
          sourceType: 'module'
        });
      }
    }
  });

  let patched = false;

  recast.visit(ast, {
    visitVariableDeclarator(path) {
      if (path.node.id.name === 'Defaults') {
        
        recast.visit(path.node, {
          visitProperty(propPath) {
            if (propPath.node.key.name === 'url') {
              const valueNode = propPath.node.value;

              if (valueNode && valueNode.type === 'ConditionalExpression') {
                
                if (valueNode.alternate && valueNode.alternate.type === 'Literal') {
                  valueNode.alternate.value = newProxyUrl;
                  patched = true;
                }
              }
            }
            return this.traverse(propPath);
          }
        });
      }
      return this.traverse(path);
    }
  });

  if (!patched) {
    throw new Error('Could not find the Defaults.lyrics.api.url configuration structure.');
  }

  const output = recast.print(ast).code;
  await fs.writeFile(filePath, output, 'utf-8');
}
