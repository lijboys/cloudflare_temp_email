import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt'

import { api } from './router';
import { api as adminApi } from './admin_api';
import { api as apiV1 } from './api_v1';
import { api as apiSendMail } from './send_mail_api'
import { email } from './email';
import { getAdminPasswords, getPasswords } from './utils';

const app = new Hono()
app.use('/*', cors());
app.use('/api/*', async (c, next) => {
	// check header x-custom-auth
	const passwords = getPasswords(c);
	if (passwords && passwords.length > 0) {
		const auth = c.req.raw.headers.get("x-custom-auth");
		if (!auth || !passwords.includes(auth)) {
			return c.text("Need Password", 401)
		}
	}
	if (c.req.path.startsWith("/api/new_address")) {
		const reqIp = c.req.raw.headers.get("cf-connecting-ip")
		if (reqIp && c.env.RATE_LIMITER) {
			const { success } = await c.env.RATE_LIMITER.limit({ key: reqIp })
			if (!success) {
				return c.text(`IP=${reqIp} Rate limit exceeded for /api/new_address`, 429)
			}
		}
		await next();
		return;
	};
	return jwt({ secret: c.env.JWT_SECRET })(c, next);
});

app.use('/admin/*', async (c, next) => {
	// check header x-admin-auth
	const adminPasswords = getAdminPasswords(c);
	if (adminPasswords && adminPasswords.length > 0) {
		const adminAuth = c.req.raw.headers.get("x-admin-auth");
		if (adminAuth && adminPasswords.includes(adminAuth)) {
			await next();
			return;
		}
	}
	return c.text("Need Admin Password", 401)
});


app.route('/', api)
app.route('/', adminApi)
app.route('/', apiV1)
app.route('/', apiSendMail)

app.all('/*', async c => c.text("Not Found", 404))


export default {
	fetch: app.fetch,
	email: email,
}
