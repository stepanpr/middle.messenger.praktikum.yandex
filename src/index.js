export { router } from './router.js';

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
