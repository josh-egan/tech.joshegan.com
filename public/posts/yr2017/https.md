## Resources

- https://app.pluralsight.com/library/courses/https-every-developer-must-know/table-of-contents
- https://letsencrypt.org/
- https://badssl.com/
- https://hstspreload.org/

## How to ensure that your site is always loaded over https

1. Get a certificate from https://letsencrypt.org/
1. Use https://certbot.eff.org/ to automatically renew your certificate.
1. Configure your server to 302 (temporary redirect) http traffic.
1. Once you are confident that everything is working as expected, configure your server to 301 (permanent redirect) http traffic.
1. Configure your server to return a response header of `strict-transport-security: max-age=300; includeSubDomains`
1. Once you have confirmed that the browser is performing a `307` internal redirect as expected, increase the max-age to 1 year: `strict-transport-security: max-age=31536000; includeSubDomains` 
1. Follow the steps outlined at https://hstspreload.org/ to get your website and sub-domains added to the HSTS preload list.

## How to secure your page

1. Ensure that all content is loaded via https. e.g. images, scripts, etc.
    1. For all internal content, use relative paths. e.g. `/images/logo.png` instead of `http://www.my-site.com/images/logo.png`
    1. For all external content, use relative-scheme urls. e.g. `//www.youtube.com/video-id` instead of `http://www.youtube.com/video-id` 
1. Add a CSP meta tag to the `<head>`
    1. Start with `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`. This will force all content to load over https. However, it's important to explicitly use https anyways, because this tag [is not supported by all browsers yet](https://caniuse.com/#search=upgrade).
    1. When you're confident that everything is being loaded over https, switch to `<meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">`. This will block any content that attempts to load over http.
    1. These meta tag security policies can also be implemented as headers.
1. Ensure that all cookies are `secure` 
