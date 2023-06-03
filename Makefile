.PHONY: clean deploy install

clean:
	./scripts/lint_clean_build.sh

deploy:
	./scripts/deploy.sh

build:
	./scripts/build.sh

install:
	# Check if Node.js is installed
	@command -v node >/dev/null 2>&1 || { \
		echo "Node.js is not installed. Installing..."; \
		curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -; \
		sudo apt-get install -y nodejs; \
	}

	# Install the Vercel CLI globally
	@command -v vercel >/dev/null 2>&1 || { \
		echo "Vercel CLI is not installed. Installing..."; \
		npm install -g vercel; \
	}

	# Set executable permission for script files in the scripts directory
	find scripts -type f -exec chmod +x {} +
