const app = require('./app');

async function  main() {
    await app.listen('3000', () => {
        console.log('Server up and running');
    });
};

main();