####!/usr/bin/env just --working-directory . --justfile
# vim: set ft=make :

usage:
	yarn build
	basic-http-server .
	echo "open http://4000.local/dist"

webpack name mode='production':
	yarn webpack build --mode {{mode}} --config-name {{name}}

clean name='dist':
	yarn rimraf {{name}}

default:
	yarn info webpack

prettier:
	yarn prettier --write "src/**/*.js"

clone dest:
	# rm -rf XXX
	git clone --depth 1 . {{dest}}

jql scripts='"scripts"' json='package.json':
	jql {{scripts}} {{json}}

emptydb dbname='xok' dbuser='xapp':
	#!/bin/bash
	dropdb --if-exists {{dbname}}
	psql <<< 'CREATE DATABASE {{dbname}}; GRANT ALL PRIVILEGES ON DATABASE {{dbname}} TO {{dbuser}};'
	echo "postgres://{{dbuser}}:_Foo42_56Bar_@localhost/{{dbname}}"
	#diesel migration run
	#diesel migration list
	#diesel print-schema > diesel-print-schema.rs
	# psql -f scheduler/crates/infra/migrations/dbinit.sql  xapp-db xapp

tables dbname='xok':
	psql {{dbname}} -c '\d+'

deno-run +args:
	deno run --allow-read --allow-env --allow-net {{args}}

x +args:
	deno run --allow-env --allow-net --allow-read --unstable -c tsconfig.json {{args}}

watch-run:
	cargo watch -x run

build:
	yarn routify -b
	yarn snowpack build --polyfill-node

migrations-down:
	#!/bin/bash
	for df in `fd down.sql migrations `; do
		psql xapp -f ${df}
	done
	for tab in __diesel_schema_migrations _sqlx_migrations ; do
		psql xapp -c "drop table if exists ${tab}"
	done

print-schema:
	diesel print-schema > diesel-print-schema.rs

_:
	# select * from users; select * from posts; select * from sessions;

# alias xsql='/bin/cat | psql'

create-feapp dirname:
	npx create-snowpack-app {{dirname}} --template @snowpack/app-template-svelte-typescript --use-yarn

sql:
	psql obsidian  <<< 'SELECT * FROM obsidian_demo_schema.films;'

esbuild:
	esbuild --bundle src/index.tsx --outdir=tmp --minify --platform=node

# yarn prisma migrate dev

windows-wasm-pack:
	cargo install wasm-pack --no-default-features


