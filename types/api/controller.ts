import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "./api-response";

export type Controller<D = void, RequestParams = undefined> = (
	req: NextRequest,
	requestParams: RequestParams | undefined,
) => Promise<ApiResponse<D>>;

export type JSONApiController<D = void, RequestParams = undefined> = (
	req: NextRequest,
	requestParams: RequestParams | undefined,
) => Promise<NextResponse<ApiResponse<D>>>;
