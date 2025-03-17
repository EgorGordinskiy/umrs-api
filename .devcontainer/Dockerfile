ARG VARIANT=bullseye

FROM mcr.microsoft.com/vscode/devcontainers/base:${VARIANT}

RUN apt-get update && apt-get clean && rm -rf /var/lib/apt/lists/*

USER vscode

COPY .devcontainer/welcome.txt /usr/local/etc/vscode-dev-containers/first-run-notice.txt
