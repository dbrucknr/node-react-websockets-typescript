# Steps to create the base server project:

Step 1: `mkdir server && cd server`

Step 2: `npm init -y `

Step 3: `touch index.ts`

Step 4: `npm i -D typescript ts-node nodemon`

Step 5: `tsc --init`

- Configure TS file
- Configure package.json "start" command to use nodemon dev-dependency
- Add nodemon.json file with rules

Step 6: `npm i express cors`

Step 7: `npm i -D @types/express @types/cors`
