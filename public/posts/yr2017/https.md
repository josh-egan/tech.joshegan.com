## Resources

- https://app.pluralsight.com/library/courses/https-every-developer-must-know/table-of-contents
- https://letsencrypt.org/
- https://badssl.com/
- https://hstspreload.org/

## How to correctly use https

1. Get a certificate from https://letsencrypt.org/
1. Configure your server to 301 redirect http traffic.
1. Configure your server to return a response header of `strict-transport-security: max-age=300; includeSubDomains`
1. Follow the steps outlined at https://hstspreload.org/ to get your website and sub-domains added to the HSTS preload list.

## How to secure your page

1. Ensure that all content is loaded via https. e.g. images, scripts, etc.
1. Add the following tag to the `<head>`: `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`. It's important to explicitly use https anyways, because this tag [is not supported by all browsers yet](https://caniuse.com/#search=upgrade).
