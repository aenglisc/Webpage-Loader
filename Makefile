install:
	npm install

start:
	npm run babel-node -- src/bin/loader.js

build:
	rm -rf dist
	npm run build

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test

.PHONY: test