#!/bin/bash
/app/node_modules/.bin/prisma migrate deploy
/app/node_modules/.bin/prisma generate
/app/node_modules/.bin/prisma db seed
npx nest start