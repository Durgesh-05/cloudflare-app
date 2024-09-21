import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
// To use prisma in cloudflare worker we have to use connection pool from databases and remove dependency that is related to nodejs because we know that cloudflare workers created their own runtime thats why express wont work on it so to use prisma for orm we need to do this

// We will use prisma accelerate for connection pooling and generate the client using the flag --no-engine to work in serverless

interface Env {
	DATABASE_URL: string;
}

export default {
	async fetch(request, env: Env, ctx): Promise<Response> {
		// console.log(request.method);
		// console.log(request.url);
		// console.log(request.headers);

		// // Based on url and methods we have to do routing
		// if (request.method === 'POST' && request.url === '/api/v1/user/signup') {
		// 	return Response.json({ message: 'You are on signup page' });
		// }

		// return new Response('Hello World!');

		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL,
		}).$extends(withAccelerate());

		await prisma.log.create({
			data: {
				level: 'Info',
				message: `${request.method} ${request.url}`,
				meta: {
					headers: JSON.stringify(request.headers),
				},
			},
		});

		const { data, info } = await prisma.log
			.findMany({
				take: 20,
				orderBy: {
					id: 'desc',
				},
			})
			.withAccelerateInfo();
		console.log(JSON.stringify(info));
		return Response.json({ logs: data });
	},
} satisfies ExportedHandler<Env>;

// We can deploy worker directly using wrangler
// first login your cloudflare account - npx wrangler login
// Then deploy this is a very minimalistic application since routing and other things are very bad in this we have to use request object everytime and see url request so we need library to work along with it
// To deploy - npm run deploy
