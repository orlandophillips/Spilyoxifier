import fs from 'fs/promises';
import * as recast from 'recast';
import * as acorn from 'acorn';

export async function patchDefaultsVariable(filePath, newProxyUrl) {
  const code = await fs.readFile(filePath, 'utf-8');

  // Parse the file into a Syntax Tree structure
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

  // Traverse the file code objects to find 'var Defaults'
  recast.visit(ast, {
    visitVariableDeclarator(path) {
      if (path.node.id.name === 'Defaults') {
        
        // Walk inside the Defaults object structure to find the 'url' property
        recast.visit(path.node, {
          visitProperty(propPath) {
            if (propPath.node.key.name === 'url') {
              const valueNode = propPath.node.value;

              // Target the ternary operator (ConditionalExpression)
              if (valueNode && valueNode.type === 'ConditionalExpression') {
                
                // Target the alternate path (the false/production side of the ternary)
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

  // Save the code back to disk preserving all original spaces and layout
  const output = recast.print(ast).code;
  await fs.writeFile(filePath, output, 'utf-8');
}
