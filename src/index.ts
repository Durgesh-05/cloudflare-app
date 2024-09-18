export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log(request.method);
		console.log(request.url);
		console.log(request.headers);

		// Based on url and methods we have to do routing
		if (request.method === 'POST' && request.url === '/api/v1/user/signup') {
			return Response.json({ message: 'You are on signup page' });
		}

		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;

// We can deploy worker directly using wrangler
// first login your cloudflare account - npx wrangler login
// Then deploy this is a very minimalistic application since routing and other things are very bad in this we have to use request object everytime and see url request so we need library to work along with it
// To deploy - npm run deploy
