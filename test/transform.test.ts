import path from "crosspath";
import test from "ava";
import {generateTransformResult} from "./setup/setup-transform.js";
import {formatCode} from "./util/format-code.js";
import {withTypeScript} from "./util/ts-macro.js";

test("The transform API goes from TypeScript to TypeScript. #1", withTypeScript, (t, {typescript}) => {
	const {code} = generateTransformResult(
		`import {DIContainer} from "@wessberg/di";
		import Foo, {IFoo} from "./foo";
		
		const container = new DIContainer();
		container.registerSingleton<IFoo, Foo>();`,
		{
			typescript,
			compilerOptions: {
				sourceMap: false
			}
		}
	);

	t.deepEqual(
		formatCode(code),
		formatCode(`\
		import { DIContainer } from "@wessberg/di";
		import Foo, { IFoo } from "./foo";
		const container = new DIContainer();
		container.registerSingleton<IFoo, Foo>(undefined, {
		  identifier: \`IFoo\`,
		  implementation: Foo,
		});`)
	);
});

test("The transform API goes from TypeScript to TypeScript. #2", withTypeScript, (t, {typescript}) => {
	const {code, map, filename} = generateTransformResult(
		`import {DIContainer} from "@wessberg/di";
		import Foo, {IFoo} from "./foo";
		
		const container = new DIContainer();
		container.registerSingleton<IFoo, Foo>();`,
		{
			typescript,
			compilerOptions: {
				sourceMap: true
			}
		}
	);

	t.deepEqual(
		formatCode(code),
		formatCode(`\
		import { DIContainer } from "@wessberg/di";
		import Foo, { IFoo } from "./foo";
		const container = new DIContainer();
		container.registerSingleton<IFoo, Foo>(undefined, {
		  identifier: \`IFoo\`,
		  implementation: Foo,
		});
		//# sourceMappingURL=${filename}.map`)
	);

	t.true(map != null);
});

test("The transform API goes from TypeScript to TypeScript. #3", withTypeScript, (t, {typescript}) => {
	const {code} = generateTransformResult(
		{
			fileName: "file.ts",
			text: `import {DIContainer} from "@wessberg/di";
		import Foo, {IFoo} from "./foo";
		
		const container = new DIContainer();
		container.registerSingleton<IFoo, Foo>();`
		},
		{
			typescript,
			compilerOptions: {
				sourceMap: true,
				inlineSourceMap: true
			}
		}
	);

	t.deepEqual(
		formatCode(code),
		formatCode(`\
		import { DIContainer } from "@wessberg/di";
		import Foo, { IFoo } from "./foo";
		const container = new DIContainer();
		container.registerSingleton<IFoo, Foo>(undefined, {
		  identifier: \`IFoo\`,
		  implementation: Foo,
		});
		//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS50cyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUVoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ3BDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyx5REFBRyxDQUFDIn0=`)
	);
});

test("The transform API goes from TypeScript to TypeScript. #4", withTypeScript, (t, {typescript}) => {
	const {code, map, filename} = generateTransformResult(
		{
			fileName: `C:/foo/bar/baz.ts`,
			text: `import {DIContainer} from "@wessberg/di";
			import Foo, {IFoo} from "./foo";
			
			const container = new DIContainer();
			container.registerSingleton<IFoo, Foo>();`
		},
		{
			typescript,
			compilerOptions: {
				sourceMap: true
			}
		}
	);

	t.deepEqual(
		formatCode(code),
		formatCode(`\
		import { DIContainer } from "@wessberg/di";
		import Foo, { IFoo } from "./foo";
		const container = new DIContainer();
		container.registerSingleton<IFoo, Foo>(undefined, {
		  identifier: \`IFoo\`,
		  implementation: Foo,
		});
		//# sourceMappingURL=${path.basename(filename)}.map`)
	);

	t.true(map != null);
});
