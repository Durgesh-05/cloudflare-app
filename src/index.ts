export default {
	async fetch(request, env, ctx): Promise<Response> {
		return Response.json({ message: 'Hey there from Cloudflare!' });
	},
} satisfies ExportedHandler<Env>;

// We can deploy worker directly using wrangler
// first login your cloudflare account - npx wrangler login
// Then deploy this is a very minimalistic application since routing and other things are very bad in this we have to use request object everytime and see url request so we need library to work along with it
// To deploy - npm run deploy
