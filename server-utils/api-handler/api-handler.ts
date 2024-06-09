import { Controller, JSONApiController } from "@/types/api";
import { APIError } from "@/types/error";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const APIHandler =
	<D = void, RequestParams = void>(
		handlerFunction: Controller<D, RequestParams>,
	): JSONApiController<D> =>
	async (request: NextRequest, requestParams?: RequestParams) => {
		try {
			const response = await handlerFunction(request, requestParams);

			return NextResponse.json(response, {
				status: response.code,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (
					error.code === "P2002" &&
					error.meta?.target === "admin_email_key"
				) {
					return NextResponse.json(
						{
							success: false,
							error: "Admin with same email exists!!",
							code: 400,
						},
						{
							status: 400,
						},
					);
				}

				if (error.code === "P2002") {
					return NextResponse.json(
						{
							success: false,
							error: "Some unique item collision occurred!!",
							code: 400,
						},
						{
							status: 400,
						},
					);
				}

				if (error.code === "P2025") {
					return NextResponse.json(
						{
							success: false,
							error: "Record does not exists!!",
							code: 404,
						},
						{
							status: 404,
						},
					);
				}
			}

			if (error instanceof APIError) {
				return NextResponse.json(
					{
						success: false,
						error: error.message,
						code: error.code,
					},
					{
						status: error.code,
					},
				);
			}

			if (error instanceof Error) {
				return NextResponse.json(
					{
						success: false,
						error: error.message,
						code: 400,
					},
					{
						status: 400,
					},
				);
			}

			return NextResponse.json(
				{
					success: false,
					error: "Internal Server Error",
					code: 500,
				},
				{
					status: 500,
				},
			);
		}
	};
