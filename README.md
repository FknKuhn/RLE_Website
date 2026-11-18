# RLE Enterprises website

## Running on Unraid (Docker)

Every push to `main` builds and publishes a Docker image to:

```
ghcr.io/fknkuhn/rle_website:latest
```

1. In Unraid, go to **Docker → Add Container**.
2. **Repository:** `ghcr.io/fknkuhn/rle_website:latest`
3. Add a port mapping: container port `3000` → any host port (e.g. `3000`).
4. Add the environment variables from `.env.example` (Cloudinary and Gmail values).
5. Put it behind your reverse proxy (Nginx Proxy Manager, SWAG or a Cloudflare Tunnel) for HTTPS. Set `CLIENT_IP_HEADER` to `x-real-ip` for NPM/SWAG or `cf-connecting-ip` for Cloudflare.

Or copy `unraid/rle-website.xml` to `/boot/config/plugins/dockerMan/templates-user/` on the server and pick **rle-website** from the template list; it has all the fields filled in.

The Cloudinary cloud name is baked into the gallery page at build time, so set it once in GitHub under **Settings → Secrets and variables → Actions → Variables** as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.

---

# Next.js & HeroUI Template

This is a template for creating applications using Next.js 14 (app directory) and HeroUI (v2).

[Try it on CodeSandbox](https://githubbox.com/heroui-inc/heroui/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/heroui-inc/next-app-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-app-template/blob/main/LICENSE).
