#!/bin/bash
DIRECTORY_TO_OBSERVE="policies_plugin"
function block_for_change {
  inotifywait --recursive \
    --event modify,move,create,delete \
    $DIRECTORY_TO_OBSERVE
}
BUILD_SCRIPT=install.bash
function build {
  bash $BUILD_SCRIPT
}
build
while block_for_change; do
  build
done