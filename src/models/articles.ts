import type { User } from './users';

export interface Article {
	id: number;
	author: User;
	title: string;
	content: string;
	slug: string;
	created_at: string; // ISO 8601
	updated_at: string; // ISO 8601
}
