import { Router } from 'express';
import { requiresAuth } from 'express-openid-connect';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'SEIN Keycloack SSO',
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get('/profile', requiresAuth(), (req, res) => {
  const { email, username, name } = req.oidc.user!;

  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 4),
    name,
    email,
    username,
    title: `${req?.oidc?.user?.preferred_username}'s profile page`,
  });
});

export default router;
