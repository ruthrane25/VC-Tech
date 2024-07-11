// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string
				role:string
				// email: string
			}
		}
		interface PageData {
			user:
			{
				id: string;
				username: string;
				email: string;
				createdAt: Date;
				role: string;
				image: string;
			}
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
