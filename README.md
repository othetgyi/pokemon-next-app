This project was developed within the framework of the Christmas Coding Challenge 2025, organised by Women Coding Community.

## Run Project

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependency Hygiene
### Version pinning and lockfile
 - Pin all dependency versions to an exact version in package.json. No carets (^), tildes (~), or greater than/equals (>=). 
 - All dependencies, including transitive dependencies, should be pinned in `package-lock.json`.
 - Don't edit `package-lock.json` by hand.

### Adding or updating dependencies

To add or change a dependency:

1. Install it with an explicit version:

   ```bash
   npm install <package-name>@<version> --save
   # or
   npm install <package-name>@<version> --save-dev
   ```

2. This will update `package-lock.json`.
3. Review the changes to both `package.json` and `package-lock.json`.

### Lifecycle scripts

- Installing dependencies without lifecycle scripts should be the default. Run

  ```bash
  npm ci --ignore-scripts
  ```

- The repository should not define `preinstall`, `install`, or `postinstall` scripts in `package.json`. Setup and project tasks are run via explicit npm scripts (e.g. `npm run build`, `npm test`).




