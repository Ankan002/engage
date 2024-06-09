export type ApiResponse<D = void> =
	| {
			success: true;
			message?: string;
			data?: D;
			code: number;
	  }
	| {
			success: false;
			error: string;
			code: number;
	  };
