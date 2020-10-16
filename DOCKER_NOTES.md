BUILD:
1 - docker build -t storefront:dev .
```
2: docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:dev
```
If you run into an "ENOENT: no such file or directory, open '/app/package.json". error,
you may need to add an additional volume: -v /app/package.json.

All of this from your [reference](https://mherman.org/blog/dockerizing-a-react-app/)

