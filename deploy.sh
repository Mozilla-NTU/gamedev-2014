git checkout master && \
  git pull upstream master && \
  git checkout gh-pages && \
  git merge master && \
  git push upstream gh-pages && \
  git checkout master && \
  echo "Deployed"

