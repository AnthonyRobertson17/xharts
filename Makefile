.DEFAULT_GOAL:=help
.PHONY: help

help: ## Show all the available make commands
	@echo "======================================================================================================================================================================="
	@awk '/```ascii/{a=1; next}/```/{a=0}(a==1){print}' README.md
	@echo "=======================================================================================================================================================================\n\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

server: ## Start up the front end
	test -f /.dockerenv || docker-compose build xharts-dev
	test -f /.dockerenv || docker-compose run -p 3000:3000 --rm --name xharts xharts-dev
	test -f /.dockerenv && npm start

test: ## Launch the test runner in the interactive watch mode
	npm test

build: ## Builds the app for prod in the `build` folder
	test -f /.dockerenv && yarn # for dockerized
	test -f /.dockerenv || npm run build # for local
