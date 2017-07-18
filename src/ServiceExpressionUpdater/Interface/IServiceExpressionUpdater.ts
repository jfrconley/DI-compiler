import {ICompilerResult} from "../../Compiler/Interface/ICompiler";
import {ICallExpression, IClassIndexer} from "@wessberg/codeanalyzer";

export interface IServiceExpressionUpdaterUpdateMethodOptions {
	codeContainer: ICompilerResult;
	expressions: ICallExpression[];
	classes: IClassIndexer;
	mappedInterfaces: IMappedInterfaceToImplementationMap;
}

export interface IServiceExpressionUpdaterRegisterExpressionHandlerOptions {
	codeContainer: ICompilerResult;
	expression: ICallExpression;
	classes: IClassIndexer;
}

export interface IMappedInterfaceToImplementationMap {
	[key: string]: string;
}

export interface IServiceExpressionUpdater {
	update (options: IServiceExpressionUpdaterUpdateMethodOptions): IMappedInterfaceToImplementationMap;
}