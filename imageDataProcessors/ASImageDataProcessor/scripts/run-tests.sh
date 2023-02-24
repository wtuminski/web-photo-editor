trap "rm -rf temp" exit;

yarn build:debug;
yarn exec "tsc --p tests/ --outDir temp";
node --test temp;