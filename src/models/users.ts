export interface User {
	id: number;
	email: string;
	first_name?: string;
	last_name?: string;
	is_active?: boolean;
	is_staff?: boolean;
	is_superuser?: boolean;
	date_joined?: string; // ISO 8601 date string
}

export type NewUserPayload = {
	email: string;
	password: string;
	first_name?: string;
	last_name?: string;
};
