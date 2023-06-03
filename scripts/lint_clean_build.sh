#!/bin/bash

lint() {
  echo "Running lint..."
  # Add your linting command here
  npm run lint
}

clean() {
  echo "Cleaning build..."
  # Add your clean command here
  rm -rf .next
}

build() {
  echo "Building..."
  # Add your build command here
  npm run build
}

lint_clean_build() {
  lint
  clean
  build
}

lint_clean_build
