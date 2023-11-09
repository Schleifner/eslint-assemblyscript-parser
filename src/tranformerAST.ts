import * as ts from "typescript";

const filename = "test.ts";
const code = `@aaa\nconst test: number = 1 + 2;`;

const sourceFile = ts.createSourceFile(
    filename, code, ts.ScriptTarget.Latest
);

const transformerFactory: ts.TransformerFactory<ts.Node> = (
    context: ts.TransformationContext
) => {
    return (rootNode) => {
        function visit(node: ts.Node): ts.Node {
            node = ts.visitEachChild(node, visit, context);

            if (ts.isDecorator(node)) {
                return  context.factory.createNull();
            } else {
                return node;
            }
        }

        return ts.visitNode(rootNode, visit);
    };
};

const transformationResult = ts.transform(
    sourceFile, [transformerFactory]
);

const transformedSourceFile = transformationResult.transformed[0];
const printer = ts.createPrinter();

const result = printer.printNode(
    ts.EmitHint.Unspecified,
    transformedSourceFile,
    undefined
);

console.log(result); // const testsuffix: number = 1 + 2;